# Data

**Decides:** what goes in `lib/data/{slug}.ts`, `lib/test-pages.ts` and
`lib/sources.ts`, and where every number in them came from.

Canonical example: `lib/data/smart-belysning.ts`. Read it before writing a new
one; it is more precise than any description of it.

---

## Scoring is derived, never authored

```ts
TestPage.criteria: { key, label, weight, description }[]   // must sum to 100
Product.scores:    Record<key, number>                     // 0-5, authored
Product.score / .rating                                    // DERIVED
```

`resolveProducts(testPage, seeds)` computes both totals and sorts by score
descending. Never hand-write a total. When this was introduced it immediately
caught two hand-entered totals matching no weighting of their own criterion
scores, and a rank order that no longer followed score. A list where rank 4
outscores rank 3 reads as rigged.

`weightedRating` redistributes weight across missing criteria, so a partially
scored product is not dragged toward zero.

**A criterion nobody can score is a criterion to drop.** Where the independent
tests cover too few of the ranked products, the criterion produces mostly
blanks and a weighting that leans on two products. Remove it and redistribute
rather than shipping a column of dashes.

## Product fields that matter

| Field | Rule |
|---|---|
| `id` | Also the image filename segment. Stable, lowercase, hyphenated. |
| `name` | Full product name. |
| `shortName` | Only where the full name overflows a shortlist or table. An unnecessary one is a second string to keep in sync. |
| `merchantUrl` | Canonical retailer URL after redirects. Always set. |
| `affiliateUrl` | Absent until we join the programme. |
| `priceCheckedAt` | ISO date. An undated price is a claim we cannot stand behind. |
| `userRating` | The merchant's own `aggregateRating`, from the merchant we link to. Display only, never weighted. |
| `specs[].shortLabel` | For narrow table columns. Keep unambiguous: "Färg" for färgtemperatur reads as whether the product does colour. |
| `specs[].label` | A property of the product, never a state of the shop. |
| `award` | One of the five presets. |
| `superlative` | Free text per product: "Bäst för Thread-hem". |

## Stock is not a product property

Sold-out products are ranked anyway. Stock is neither checked before publishing
nor shown, and only a wrong price blocks a launch.

Never add a `Lagerstatus` spec or a stock row of any name. Stock is the shop's
state right now, not the product's, and it is the one fact on the page that can
go stale within a day. A row reading "Slut hos Kjell 2026-08-02" keeps looking
like a fact about the product long after the shelf has been refilled, and it
invites the reader to discount a product we ranked on its merits.

`ComparisonTable` filters these out in `ALDRIG_I_TABELLEN`. That is a safety
net, not permission.

If a product genuinely is unavailable for a long stretch, that belongs in the
editorial verdict as a sentence with a date and a caveat, not in a cell.

## `highlight` is a decision about the row, not about the product

`ComparisonTable` builds its row list from **the first product's** highlighted
specs: `products[0].specs.filter(s => s.highlight)`. A label highlighted on some
other product and not on the first becomes no row at all, and its value appears
nowhere in the comparison.

`/nyckelskap` shipped with `Väderskydd` highlighted on Master Lock alone. The
row never rendered, even though the criterion carries 15 of 100 and the
product's whole selling case rests on it. Site-wide the first run of the check
found **44 highlighted specs that never become a row, across 15 categories.**

So: if a label is highlighted anywhere, highlight it on every product. If it is
not worth a row, highlight it nowhere. `pnpm check:tackning` reports both this
and rows under 50 % filled.

## Two variants of the same product, ranked twice

Rank one and put the other in the considered list with the difference stated.

The reader gains nothing from two near-identical entries competing for the same
slot, and the ranking loses a position it could have given to a genuinely
different product. `/fonsterputsrobot` excluded Winbot W2S Omni on exactly this
basis, and `/nyckelskap`'s own considered list excludes KeyGarage 787 LED with
the reasoning written out — while ranking Top Safe T7 and T26, which differ by
two key slots and by one criterion score.

The test: could the two verdicts be told apart if you swapped the names? If not,
the second one belongs in the considered list.

## Empty spec rows disappear on their own

A row where every product's value is a dash is hidden by the table. Do not
delete such rows to tidy it: leave them, and the row returns by itself the day
one product gets a real value.

`Ej angiven` does **not** count as empty, deliberately. It means we looked and
the figure is not obtainable, which is different from a field nobody filled in.
Write `Ej angiven` rather than a dash whenever it is true — the distinction is
what keeps a row alive when no product has the value yet.

**The reader never sees the words.** `comparison-table.tsx` renders `Ej angiven`
as `–`; the value stays in the data file and the row filter reads the raw value,
not the rendered one. Peter's ruling 2026-08-04: repeated across four rows and
seven columns, the phrase turned the table into a report on our sourcing instead
of a comparison of products. Table captions must not explain the distinction
either. The weighting explains what an unobtainable value costs, once.

## Why `userRating` is never weighted

Ratings are not comparable across shops. 3,3 from 7 ratings and 5,0 from 73 are
not the same evidence, and each shop has a different customer base. It is
displayed with its scale and count, attributed to the shop, and excluded from
the score.

It must also never enter `ProductSchema`. Google's review-snippet guidelines
forbid marking up a rating aggregated from another site as your own.

**Count ratings, not reviews.** Kjell publishes both `ratingCount` and
`reviewCount`, and they differ by a factor of three to five. The number of
people who gave a score is the honest figure; the number who also wrote prose
is a different, smaller thing.

**There is no Google API for product reviews.** Do not go looking. Content API
for Shopping is for merchants submitting their own data; Business Profile API
returns business reviews, not product ones. The Shopping panel rating is not
exposed. Scraping Google breaches their terms, and we are a business whose
entire value depends on their rankings. Retailer JSON-LD gives the same signal,
attributable and linkable.

---

## Specifications: decide the fields first, source them broadly

This is the half of data work that was forgotten until 2026-08-04, when the
site's tables were 49 percent filled and the newest page 29 percent, with
twelve rows only one product had.

### 1. The field schema before the collection

The test page's rows are decided in `lib/spec-schema.mjs`, once, **before** any
product data is written. Let the rows grow out of whatever each product page
happens to brag about and you get seven spec sheets stacked on each other, not
a comparison.

A field in the schema that a product lacks is a **work order**, not a blank to
accept.

### 2. Source ladder, in the order that has worked

1. **The manufacturer's own Swedish product page.** Far and away the best.
   Wood's page for the LD40 gave six fields in one call.
2. **The manual.** Meaco's answered the display question for four models at once.
3. **Elon.** Publishes real spec tables for white goods and robots.
4. **Clas Ohlson via Playwright**, after dismissing the cookie banner.
5. **The test press's own tables.** Ljud & Bild publishes eight fields per
   robot vacuum in the same shape for every model.

**The shop you read the price at is rarely a spec source.** Proshop's product
pages contain zero spec tables, only marketing copy they themselves warn may be
machine-translated.

When the ladder runs out, the gap-pass playbook takes over:
`.claude/references/spec-sourcing.md`. It covers the routes this ladder does not
— the manufacturer's home market rather than the `.se` page, Icecat keyed on
GTIN, CE and FCC filings, the spec panel photographed on the box in the
retailer's own gallery, retailer Q&A, and spare-part listings.

### 2b. Tier every source, and record it

| Tier | What | May be used for |
|---|---|---|
| **A** | Manufacturer manual, datasheet, brand-domain spec page, CE/FCC filings | Anything, including safety-shaped values |
| **B** | Retailer spec tables, PIM feeds such as Icecat, brand A+ content, support articles | Cells and prose freely. Safety-shaped values only with two independent B sources agreeing |
| **C** | Forums, Reddit, YouTube, other review sites, owner reports | Failure modes and leads. Never a bare number in a cell |

A spec value may carry optional `source` and `tier`. **Neither is ever
rendered** — Peter's ruling 2026-08-04. We tier so we can audit ourselves and so
a tier-C figure cannot drift into a headline claim, not to show the reader a
provenance code.

Other "bäst i test" sites are a **lead, never a source**. They tell you a figure
exists; find it at A or B before it enters a cell.

### 3. The harvester is a prop, not an oracle

`scripts/specsvep.mjs` fetches broadly and prunes noise. **It decides nothing.**
It reads only explicit key–value pairs and is blind to "lättanvänd avfuktare
med display", to bullet lists without colons, to JavaScript-rendered tables and
to PDF manuals. Most product information on the web is running prose.

The working order: the script fetches twenty pages, **you read**, and you carry
on yourself with searches, manufacturer pages, manuals and images.

### 4. Three traps that all produced wrong values

| Trap | Example |
|---|---|
| **The shop's `Höjd` and `Vikt` are the base station's or the box's** | Elon lists 470 mm for the Saros 20 Sonic. The robot is 79,8 mm |
| **A value can belong to a sister model** | Meaco Arete One 25L was listed as R290 35 g. That is the ten-litre figure; the 25L is 90 g |
| **Cookie banners hide the whole product body** | Clas Ohlson's page looked empty until the banner was answered. Click **Avvisa alla**, never accept |

### 5. The percentage is not the measure

A test page where every decision-relevant row is filled is in better shape than
one with a higher figure and a tail of trivia. `/brandstege` yielded only three
new fields because `Angiven maxlast` and `Karmtjocklek` already stood 8/8. What
remains high up the scale is usually what manufacturers do not publish at all.

Method, sources and scoreboard: `.agent/specsvep/metod.md`.

---

## Images

```bash
pnpm images --category {slug} --batch .agent/tmp/bilder
```

Filenames must be `{produkt-id}-{roll}.webp`; the pipeline derives the path, so
no `image` field is hand-maintained. Roles: `produkt`, `livsstil`, `hero`,
`detalj`.

Masters are **WebP, not AVIF**. `next/image` re-encodes to AVIF at request
time, so storing AVIF would be lossy-on-lossy.

Pass the right `sizes` at every call site from `IMAGE_SIZES`. Getting this
wrong is invisible on a fast connection: the pilot served 359px files into 48px
thumbnails, roughly eight times the pixels displayed.

**Source them from the retailer's own product page** — the `image` field in the
same JSON-LD you read the price from, falling back to `og:image`. Save to
`.agent/tmp/bilder-{slug}/` as `{produkt-id}-produkt.{ext}` and run the batch
command.

Licensing is not a blocker. It is settled by joining the merchants' programmes,
whose product feeds grant image rights, and we build before that rather than
shipping pages with no images. A page without packshots loses to every
competitor on the one axis a reader notices first.

---

## Sources

```ts
{ publisher, title, url, market?, note?, kind?: "test" | "standard" }
```

Every URL verified 200, stored resolved. `sourceSummary()` derives the counts
for the "what we read" panel, so the numbers cannot drift from the list. Notes
say what the source contributes that we did not measure.

## Considered list

```ts
{ brand, name, reason, approxPrice?, merchant?, merchantUrl? }
```

The name links to the retailer through `resolveMerchantLink`. No CTA button: a
buy button on something we rejected would contradict the section.

## The file header

Every data file states, loudly, what is real and what is not. On the pilot:
prices, names, GTINs and URLs are real and dated; criterion scores are
editorial judgement from the sourced tests. Anyone opening the file learns in
five seconds what may ship.
