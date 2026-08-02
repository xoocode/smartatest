# Research method

Phase 1 of `new-page`. Everything here happens before the first question to the
user, because the questions have to be informed by findings.

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

### What the affiliate links tell you

Real findings from the smart-belysning pass:

- **bast-i-test.se** monetises entirely through Prisjakt (`prisjakt.nu/go-to-shop/...?ref=61634`). Prisjakt pays per click-out, so their page is built for click volume, not persuasion. It also lets them mark up live prices safely.
- **diginytt.se** uses Adtraction (`track.adtraction.com/t/t?a=...&as=1822777890`), plus `ion.kjell.com`, which is Adtraction on a vanity tracking domain. A first-party-looking host sails past adblock lists. Worth copying as `go.smartatest.se`.
- They also had **three untracked links**, including their number-two product. Competitors leave money on the floor; check for it.

### Markets to cover

Two or three Swedish, two German, two American. Search results for the American
ones are **heavily polluted with AI-generated affiliate spam** carrying
confident fabricated test claims. Fetch the real publications directly:
tomsguide.com, reviewed.com, rtings.com, pcmag.com. If a site you have never
heard of claims an 8-week lab test, it did not run one.

German pages worth reading: testberichte.de, netzwelt.de, homeandsmart.de.
`stiftung-warentest.de` is usually paywalled.

## 2. Independent tests, which become our sources

Search Swedish first, then Nordic, then English. Råd & Rön, Ljud & Bild,
Tek.no, Dinside, PC för Alla, plus TechRadar and Expert Reviews for depth.

**Verify every URL and store the resolved one.**

```bash
curl -sL -o /dev/null -w '%{http_code} -> %{url_effective}\n' -A "Mozilla/5.0 ..." "$URL"
```

In the smart-belysning pass, **three of eight URLs redirected**. A competitor
linking a stale URL is not a reason to copy it. Record `kind: "standard"` for
spec bodies and authorities (CSA, Thread Group, Elsäkerhetsverket) so they are
excluded from the "tests we read" count.

Note where sources **disagree**. That is the most valuable content we produce
and nobody else writes it.

## 3. Products

For each candidate, from the retailer's own page:

- Exact product name, brand, GTIN
- Current price and the merchant
- Canonical URL after redirects
- Image URL

Retailer JSON-LD is the fastest route. Kjell, Power, Proshop, IKEA, NetOnNet
and Komplett all publish `Product` schema with `offers`. Prisjakt has good
aggregate data but blocks search with a 403.

**Verify the product still exists.** In the smart-belysning pass every colour
IKEA TRÅDFRI E27 URL 302'd to the series page: IKEA had discontinued it. The
fixture data claimed to test a product that was no longer sold. Finding that is
worth more than any amount of prose.

Also grab `aggregateRating` while you are on the page. Kjell separates
`ratingCount` from `reviewCount`; the count of people who rated is the honest
figure.

## 4. Also-rans

Five or six products we looked at and left out, each with a **real reason**,
and each with a verified retailer URL. "We ran out of time" is not a reason.

## 5. Search intent

Swedish buyers search the product category: `robotdammsugare`, `brandvarnare`,
`smart belysning`. They do not search "smart hem". Keep concept words out of
slugs and titles.

Collect the long-tail questions people ask. They become the FAQ, and the FAQ
is what wins featured snippets.

## Output

Write a summary before Phase 2 containing:

- A measured comparison table of every page fetched
- Which affiliate network each competitor uses, and any gaps
- The verified source list
- The product shortlist with prices, merchants and URLs
- Which claims you could **not** verify

That last one matters. In the smart-belysning pass, a Swedish site claimed
standby draw was 20 to 70 percent of a smart bulb's annual consumption. It
would have carried a whole section. The site returned HTTP 500 to every
fetcher, so the calculator shipped on the verified 0.2 to 0.5 W range instead
and the claim stayed out. Report unverifiable claims as unverifiable rather
than quietly using or dropping them.
