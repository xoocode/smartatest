# Data model and sourcing

Phase 4 of `new-page`. Mirror `lib/data/smart-belysning.ts`.

## Scoring is derived, never authored

```ts
Category.criteria: { key, label, weight, description }[]   // must sum to 100
Product.scores:    Record<key, number>                     // 0-5, authored
Product.score / .rating                                    // DERIVED
```

`resolveProducts(category, seeds)` computes both totals and **sorts by score
descending**. Never hand-write a total. When this was introduced on the pilot
it immediately caught two hand-entered totals that matched no weighting of
their own criterion scores, and a rank order that no longer followed score. A
list where rank 4 outscores rank 3 reads as rigged.

`weightedRating` redistributes weight across missing criteria, so a partially
scored product is not dragged toward zero.

## Product fields that matter

| Field | Rule |
|---|---|
| `id` | Also the image filename segment. Stable, lowercase, hyphenated. |
| `name` | Full product name. |
| `shortName` | Only where the full name overflows a shortlist or table. An unnecessary one is a second string to keep in sync. |
| `merchantUrl` | Canonical retailer URL after redirects. Always set. |
| `affiliateUrl` | Absent until we join the programme. |
| `priceCheckedAt` | ISO date. An undated price is a claim we cannot stand behind. |
| `userRating` | Merchant's own `aggregateRating`, from the merchant we link to. Display only, never weighted. |
| `specs[].shortLabel` | For narrow table columns. Keep unambiguous: "Färg" for färgtemperatur reads as whether the product does colour. |
| `award` | One of the five presets. |
| `superlative` | Free text per product: "Bäst för Thread-hem". |

## Why `userRating` is never weighted

Ratings are not comparable across shops. 3.3 from 7 ratings and 5.0 from 73 are
not the same evidence, and each shop has a different customer base. It is
displayed with its scale and count, attributed to the shop, and excluded from
the score.

It also must never enter `ProductSchema`. Google's review-snippet guidelines
forbid marking up a rating aggregated from another site as your own.

## There is no Google API for product reviews

Do not go looking. Content API for Shopping is for merchants submitting their
own data; Business Profile API returns business reviews, not product ones. The
Shopping panel rating is not exposed. Scraping Google breaches their terms, and
we are a business whose entire value depends on their rankings.

Retailer JSON-LD gives the same signal, attributable and linkable.

## Images

```bash
pnpm images --category {slug} --batch .agent/tmp/bilder
```

Filenames must be `{produkt-id}-{roll}.webp`; the pipeline derives the path so
no `image` field is hand-maintained. Roles: `produkt`, `livsstil`, `hero`,
`detalj`.

Masters are **WebP, not AVIF**. `next/image` re-encodes to AVIF at request
time, so storing AVIF would be lossy-on-lossy.

Pass the right `sizes` at every call site from `IMAGE_SIZES`. Getting this
wrong is invisible on a fast connection: the pilot was serving 359px files into
48px thumbnails, roughly eight times the pixels displayed.

**Source them from the retailer's own product page.** The packshots are public
on those pages, and the fastest route is the `image` field in the same JSON-LD
you already read the price from, falling back to `og:image`. Save them to
`.agent/tmp/bilder-{slug}/` named `{produkt-id}-produkt.{ext}` and run the batch
command above.

Do not treat licensing as a blocker. It is settled by joining the merchants'
programmes, whose product feeds grant image rights, and we build before that
rather than shipping pages with no images. A page without packshots loses to
every competitor in the category on the one axis a reader notices first.

## Affiliate links

Read the `AFFILIATE-SWAP` block in `lib/links.ts`. In short:

- `LINK_MODE` is `"direct"`: straight to the retailer, untracked, dofollow.
- Every outbound link goes through `resolveMerchantLink`. Never a raw `<a>`, never in MDX.
- `rel="sponsored"` is **derived** from whether the link can earn money. It is required once it can and wrong before that.
- Flipping to tracking links is one constant plus `affiliateUrl` on the products. No page or component changes.

### Do not rewrite the href on click

Shipping a clean URL and swapping it in a click handler is cloaking: the
crawler and the user get different destinations. It also loses money silently,
because middle-click, ⌘/Ctrl-click, "open in new tab" and copy-link all use the
raw `href`. `mode: "redirect"` through `/till/{id}` is the safe version of the
same idea.

### Programme constraints

Check `.agent/adtraction-se-katalog.json`, the full 480-programme SE catalogue,
before recommending a merchant. The older `.agent/adtraction-programs.json` is
an eleven-row excerpt and has been misread as "programmes we hold"; we hold
none. See `.agent/plan-affiliatenatverk.md`.

`ppcMarketing` looks like the paid-search permission flag, but it is
**undocumented** in Adtraction's API reference, which only defines
`approvalStatus`. The pattern is that the chains carry `0` and the niche shops
carry `2`. Treat `0` as "assume PPC is forbidden until support confirms
otherwise", and never state on a page or in a plan that it is confirmed.

### Try to get a payable, advertisable merchant to the top

Google Ads can only run against programmes that permit paid search, and those
are the same programmes that pay best: Brandvarnare.se and AIVIQ at 15 %, E-safe
at 7,5 %, Verisure per lead, against Kjell at 5 %, IKEA at 9 % and Proshop at
3,2 %. A page whose winner links only to a 3,2 % chain is one we cannot
advertise, however good it is.

So aim for **at least one high-commission, PPC-permitted shop at or near the
top of the list**. Two levers are legitimate:

1. **Which shop we link** for a product stocked in several places. At the same
   price, or near enough, take the one that pays more and allows PPC.
2. **Which candidates make the shortlist** when they are genuinely comparable.
   A product available only from a 3,2 % chain weighs slightly less than an
   equivalent one a niche shop carries.

What is never a lever: criterion weights, criterion scores, or the rank order.
Those follow the weighting the user approved, full stop. Ranking a weaker
product first because its shop pays better is precisely what the AI-generated
competitors do, and it is the one thing our model cannot survive.

When no such merchant carries the category, say so in `research-{slug}.md` and
link the best price. Do not manufacture it. `/utomhustimer` is the worked
example: five shops own the cheap half of that category and Adtraction has none
of them, so the page links Jula and Kjell and the research file records the gap.

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
editorial judgement from the sourced tests. Anyone
opening the file learns in five seconds what may ship.
