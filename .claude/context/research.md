# Research

**Decides:** which products are candidates, which independent tests we cite,
what competitors already do, and what buyers actually search for.

Everything here happens *before* the first question to the user, because the
questions have to be informed by findings. The supply sweep runs in this same
pass but belongs to `.claude/context/money.md`, because it decides which
merchant every product links to.

---

## Write findings to disk as you go

A full research pass is long enough to be compacted mid-way. Research lives in
context and context does not survive. Anything re-derived from memory is
invented, and invented prices are the one failure that must never ship.

Save to `.agent/research/{slug}.md` **as you gather**, not at the end:

- Every competitor measured, with its numbers and affiliate network
- Every source URL, its resolved form, and its 200 check
- Every product with price, merchant, GTIN and canonical URL, dated
- The supply sweep, including an explicit *inget program* where there is none.
  An absence is a finding, not a blank
- Every claim you could not verify, and why

If you resume and that file exists, trust it over your memory. If it does not
exist, re-run the research rather than reconstructing it.

---

## 1. Competitors

### Fetch raw HTML, not rendered text

```bash
curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 \
(KHTML, like Gecko) Chrome/126.0 Safari/537.36" "$URL" -o comp.html
```

WebFetch converts to markdown and loses `href` targets and JSON-LD. The link
targets are the most valuable thing on a competitor page: they reveal the
monetisation model, which shapes the whole design.

### What to extract

```bash
# outbound links, grouped
grep -oE 'href="[^"]+"' comp.html | sed 's/href="//;s/"$//' \
  | grep -E '^https?://' | grep -viE 'THEIR-DOMAIN' | sort | uniq -c | sort -rn
```

Then, with node: body word count excluding nav and sidebar, `<img>` count,
`<table>` count, heading outline, every `application/ld+json` block and its
`@type`, and `rel` on each money link.

### What the outbound links tell you

From the smart-belysning pass:

- **bast-i-test.se** monetises entirely through Prisjakt
  (`prisjakt.nu/go-to-shop/...?ref=61634`). Prisjakt pays per click-out, so
  their page is built for click volume rather than persuasion. It also lets
  them mark up live prices safely.
- **diginytt.se** uses Adtraction (`track.adtraction.com/t/t?a=...`), plus
  `ion.kjell.com`, which is Adtraction on a vanity tracking domain. A
  first-party-looking host sails past adblock lists. Worth copying as
  `go.smartatest.se`.
- They also had three untracked links, including their number-two product.
  Competitors leave money on the floor; check for it.

The full grep for network parameters, and what `awinmid` and
`utm_source=adtraction` reveal, is in `.claude/context/money.md`. Run it on the
HTML you already have on disk.

### Markets to cover

Two or three Swedish, two German, two American.

American search results are heavily polluted with AI-generated affiliate spam
carrying confident fabricated test claims. Fetch the real publications
directly: tomsguide.com, reviewed.com, rtings.com, pcmag.com. If a site you
have never heard of claims an 8-week lab test, it did not run one.

German pages worth reading: testberichte.de, netzwelt.de, homeandsmart.de.
`stiftung-warentest.de` is usually paywalled.

**The two structural references for the site as a whole:**

- `gesundheitsvergleich-deutschland.de/blogs/produktratgeber/vitamind3k2-tropfen-testsieger`
  — German testsieger format, aggressive PPC
- `xn--kostnrd-e1a.se/kosttillskott/energidryck` — Swedish single-product deep dive

## 2. Independent tests, which become our sources

Search Swedish first, then Nordic, then English. Råd & Rön, Ljud & Bild,
Tek.no, Dinside, PC för Alla, plus TechRadar and Expert Reviews for depth.

Verify every URL and store the resolved one:

```bash
curl -sL -o /dev/null -w '%{http_code} -> %{url_effective}\n' -A "Mozilla/5.0 ..." "$URL"
```

Three of eight URLs redirected on the smart-belysning pass. A competitor
linking a stale URL is not a reason to copy it. Record `kind: "standard"` for
spec bodies and authorities (CSA, Thread Group, Elsäkerhetsverket) so they are
excluded from the "tests we read" count.

**Note where sources disagree.** That is the most valuable content we produce
and nobody else writes it.

## 3. Products

For each candidate, from the retailer's own page: exact name, brand, GTIN,
current price, the merchant, the canonical URL after redirects, and the image
URL.

Retailer JSON-LD is the fastest route. Kjell, Power, Proshop, IKEA, NetOnNet
and Komplett all publish `Product` schema with `offers`. Prisjakt has good
aggregate data but blocks search with a 403.

**Verify the product still exists.** Every colour IKEA TRÅDFRI E27 URL 302'd to
the series page: IKEA had discontinued it, and the fixture data claimed to test
a product that was no longer sold. Finding that is worth more than any amount
of prose.

Grab `aggregateRating` while you are on the page. Kjell separates `ratingCount`
from `reviewCount`, and the two differ by a factor of three to five. The count
of people who rated is the honest figure. See `.claude/context/data.md`.

## 4. Specs, which become the comparison table

Everything above finds *products*. This step finds their *properties*, and it
is the step that did not exist until 2026-08-04. `/fonsterputsrobot` shipped
with four of five highlighted rows nearly empty, not because the numbers were
unavailable but because nothing in the process ever went looking for them.

The field schema, the source ladder, the harvester and the traps that produced
wrong values are all in `.claude/context/data.md` §Specifications. **Read that
first; it owns the subject.** What follows is only what belongs to the research
pass: how hard to work the grid, and where to go when the ladder runs out.

### Two passes, and the second is where coverage comes from

1. **Sweep.** Normal sourcing. Manufacturer documentation and the retailer
   pages you are already on for price and GTIN.
2. **Gap attack.** List the cells still empty, then hit each one with a
   *different modality than the one that already failed*. Searching the same
   Swedish product page harder returns the same nothing.

The playbook of modalities, ranked by yield, is
`.claude/references/spec-sourcing.md`. Read it before the gap pass, not before
the sweep.

### Source tiers

Broader sourcing is allowed and expected — retailer data, datasheets, PIM
feeds, regulatory filings, forums, other review sites. It is **tiered**, because
a wrong number about something that hangs three storeys up is worse than an
empty cell. The tier table is in `.claude/context/data.md` §2b.

The two rules worth carrying in your head while searching: a safety-shaped value
needs tier A, or two independent tier-B sources that agree. And other "bäst i
test" sites are a **lead, never a source** — they tell you a figure exists, and
you then go find it at A or B.

### What the reader sees

Nothing about any of this. Tier and source are recorded in the data file and
never rendered; see `.claude/context/data.md`. A value we could not establish
renders as a dash, and the weighting explains what that costs — once, in the
methodology block. It never appears in prose. See the `swedish-voice` skill,
`references/who-you-are.md`.

### Log the dead ends

Write to `.agent/research/{slug}.md`: every cell you could not fill, **and
where you looked**. A refresh six months out should not burn the same hours
rediscovering that HOBOT does not publish a line rating anywhere.

## 5. Also-rans

Five or six products we looked at and left out, each with a real reason and a
verified retailer URL. "We ran out of time" is not a reason.

A brand with no affiliate programme anywhere is worth noting here: an also-ran
carrying no conflict of interest in either direction is a cleaner rejection
than one where we had money on the table.

## 6. Search intent

Swedish buyers search the product category: `robotdammsugare`, `brandvarnare`,
`smart belysning`. They do not search "smart hem". Keep concept words out of
slugs and titles.

Collect the long-tail questions people ask. They become the FAQ, and the FAQ is
what wins featured snippets.

### Search that reaches Sweden

The built-in `WebSearch` tool is US-only, which is the wrong market for every
query this project makes. Use the Brave key:

```bash
node scripts/sok.mjs "luftrenare affiliate"
node scripts/sok.mjs --brand levoit      # hela varumärkessvepet
```

`C:\code\credentials\google-cse\credentials.json` exists but the Custom Search
JSON API is not enabled on that Google Cloud project: every call returns 403.
Brave works. Neither needs an MCP server.

---

## What the research summary has to contain

Before any question to the user:

- A measured comparison table of every page fetched
- Which affiliate network each competitor uses, and any gaps
- The verified source list
- The product shortlist with prices, merchants and URLs
- **Which claims you could not verify**

That last one matters. A Swedish site claimed standby draw was 20 to 70 percent
of a smart bulb's annual consumption, which would have carried a whole section.
The site returned HTTP 500 to every fetcher, so the calculator shipped on the
verified 0.2 to 0.5 W range instead and the claim stayed out.

Report unverifiable claims as unverifiable rather than quietly using or
dropping them.
