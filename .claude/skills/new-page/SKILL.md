---
name: new-page
description: Build a complete "bäst i test" category page for smartatest.se, from competitor research through sourced products, buying guide, tools and verification. Use when creating a new product-category comparison page, adding a category to the catalog, or rebuilding an existing test page to the current template.
---

# New "bäst i test" page

Builds a category page to the template proven on `/smart-belysning`. That page
beat every Swedish competitor on schema depth, is the only page in the Swedish,
German or American markets with interactive tools, and is the only one that
cites the tests it collates.

**Read the references as you reach each phase, not up front:**

| File | When |
|---|---|
| `references/research.md` | Phase 1 |
| `references/data-and-sourcing.md` | Phase 4 |
| `references/components.md` | Phase 5. **Read before writing any component.** |
| `references/page-template.md` | Phase 5 |
| `references/gotchas.md` | Phase 5 and 7 |
| `references/quality-bar.md` | Phase 6 |

## The rule that shapes everything

We do not run a laboratory. Never write, imply, or leave standing any claim
that we measured something ourselves. The model is: **read every independent
test, reconcile them, publish the weighting, cite every source.**

That is not a limitation to hide. `testberichte.de` monetises exactly this
model in Germany, and it is the one thing the AI-generated affiliate spam
flooding this category cannot fake. Every phase below serves it.

---

## Phase 0: Orient

Do not ask anything yet.

1. Read `.agent/plan.md`, `.agent/plan-components.md`, `.agent/ideas-testsidor.md`, `.agent/planerade-sidor.md`.
2. Read `lib/catalog.ts` for which categories exist and their `status`.
3. Read `lib/data/smart-belysning.ts` and `app/smart-belysning/page.tsx` as the reference implementation. Everything new mirrors these.
4. Check `.agent/adtraction-programs.json` for which merchant programmes we hold and their `ppcMarketing` flag.

## Phase 1: Research, before any questions

Full method in `references/research.md`. Summary:

1. **Competitors.** Fetch the top Swedish results with `curl`, not WebFetch: you need raw HTML to read `href` targets and JSON-LD. Add two German and two American pages. Measure body words, images, schema types, and which affiliate network each uses.
2. **Independent tests.** Find every real test of the category in SE, NO, DK, DE, UK. These become `lib/sources.ts`. Verify each URL returns 200 and record the **resolved** URL after redirects.
3. **Products.** Identify 5 to 7 candidates plus 5 or 6 also-rans, with live prices and canonical retailer URLs.
4. **Search intent.** What people actually type. Swedish buyers search the product category, never "smart hem".

### Write findings to disk as you go

**A full run of this skill is long enough to be compacted mid-way.** Research
lives in context and context does not survive. Anything re-derived from memory
is invented, and invented prices are the one failure that must never ship.

Save to `.agent/research-{slug}.md` as you gather, not at the end:

- Every competitor measured, with its numbers and affiliate network
- Every source URL, its resolved form, and its 200 check
- Every product with price, merchant, GTIN and canonical URL, dated
- Every claim you could not verify, and why

If you resume and that file exists, trust it over your memory. If it does not
exist, re-run the research rather than reconstructing it.

Produce a written summary before asking anything. The questions in Phase 2 must
be informed by findings, not by assumptions.

## Phase 2: Confirm scope (AskUserQuestion)

Ask in one batch, each option carrying what the research found:

1. **Category and slug.** Existing `planned` entry in `lib/catalog.ts`, or new? Propose the flat slug. URLs stay flat; the group is taxonomy only.
2. **Taxonomy group.** `Smart hem` today. If the category is security-shaped, ask whether to open a `Säkerhet` group.
3. **Product shortlist.** Present the candidates found with prices and merchants. Let the user cut or add. Say which candidates a high-commission, PPC-permitted shop carries, because that is one of the two legitimate levers for getting such a shop near the top. See the programme section of `references/data-and-sourcing.md` for the limits on that.
4. **Anything the research surfaced as genuinely ambiguous.** A discontinued product, a category that splits by socket or size, a market where one brand owns 80% of results.

Do not ask about things the codebase already decides. Flat URLs, derived
scoring, the em-dash rule and the tools pattern are settled.

## Phase 3: Criteria and weights (AskUserQuestion)

Propose 5 criteria with weights summing to 100 and a one-line justification
each, drawn from what the sourced tests actually measure.

**The weights are the user's call, not yours.** They decide the ranking, and a
weighting invented by the assistant is the same fabrication as an invented
measurement. Present a recommendation and let the user adjust.

`MethodologyBlock` renders a visible warning if weights do not sum to 100, so
an authoring error surfaces on the page rather than skewing scores silently.

## Phase 4: Source real data

Read `references/data-and-sourcing.md`. Non-negotiable:

- Prices, GTINs and URLs read from the retailer's own page, never invented.
- Store the **canonical URL after redirects**. Kjell 302s from campaign paths; linking to a redirect wastes a hop.
- `priceCheckedAt` on every product.
- `userRating` only from the merchant's own `aggregateRating`, and only from the merchant we link to.
- Images through `pnpm images`, sourced from the retailer product page you already read the price from. Every ranked product gets one; a page with no packshots loses on the axis a reader notices first.
- Criterion scores are editorial judgement from the sourced tests. Say so in the file header.

## Phase 5: Build

Read `references/components.md` first, then `references/page-template.md` for
the section order, then `references/gotchas.md` before writing any component.

**62 components already exist.** A new category page should normally add zero
to two, and both should be category-specific tools rather than layout. If you
find yourself building a card, a table or a badge, it exists already.

Order of work:

1. `lib/catalog.ts` entry, still `status: "planned"`.
2. `lib/categories.ts` category with criteria and a comparison-based `methodology` string.
3. `lib/sources.ts` source set, every URL verified.
4. `lib/data/{slug}.ts` products, considered list, FAQ.
5. `content/{slug}/kopguide.mdx`, 12 sections, roughly 1 800 words, widgets embedded.
6. Tools in `lib/tools.ts` and `components/tools/registry.tsx` if the category needs any beyond the shared ones. Reuse `RunningCostCalculator` and `ProtocolPicker` before building new.
7. `app/{slug}/page.tsx` composed from existing components. Pages compose; they never style.
8. Any genuinely new component gets a `/styleguide` bench in the same commit.

## Phase 6: Critical pass

Read `references/quality-bar.md` and work the rubric.

The standard is the richness of `/smart-belysning`, **not its length**. That
page is long because lighting has a lot to explain. A category with less to say
should be shorter, and padding to hit a word count is what the AI-spam
competitors do.

Then re-run the Phase 1 comparison with our page in it, looking for
capabilities rather than volume. Report gaps as a table with effort and
priority. Fix what is cheap and material; stash the rest in
`.agent/ideas-testsidor.md`.

Two passes is normal. Stop when every rubric row is a yes or a justified not
applicable.

## Phase 7: Verify

All of these must pass before reporting done:

```bash
npx tsc --noEmit
pnpm lint
pnpm check:emdash
pnpm build          # kills the dev server; restart after
```

Then in a browser at **1440px and 390px**:

- No horizontal page overflow at either width.
- One `h1`; no heading-level jumps.
- Every image has `alt`.
- Comparison table is a real `<table>` at both widths, frozen first column scrolls.
- No text truncated that should not be. Test `scrollWidth > clientWidth`, do not look at it.
- Schema emits `ItemList` → `Product` → `Review`, `BreadcrumbList`, `FAQPage`.
- Every outbound link resolves through `resolveMerchantLink`.

**Measure, never eyeball.** And when reading state after a React interaction,
wait a tick first: reading synchronously after a click returns the pre-render
value and produces confident, wrong results.

## Definition of done

The page is finished when all of these hold. Not before, and say so plainly if
one does not:

- `tsc`, `lint`, `check:emdash` and `build` all pass
- Verified at 1440px and 390px, by measurement rather than by eye
- Every rubric row in `references/quality-bar.md` is a yes or a justified not applicable
- Every price, URL and source verified against the live page and dated
- Zero to two new components, each with a styleguide bench
- `.agent/research-{slug}.md` records what was checked and what could not be
- The file headers state accurately what is real and what is placeholder

## Flip to live

Only when the page is genuinely publishable:

1. `status: "live"` in `lib/catalog.ts`. This adds it to the sitemap.
2. Product images must be in place for every ranked product.
3. Criterion scores must reflect the user's decisions.

Never set `status: "live"` early. A planned category in the sitemap feeds
Google 404s.

**Do not raise the byline.** It is a known, deliberate placeholder across the
whole site. Never list it as a blocker, never flag it in a file header, and
never mention it in the hand-off summary. The user knows, and repeating it on
every page is noise.
