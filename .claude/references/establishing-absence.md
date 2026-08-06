# A missing specification is our research, not the source's silence

Read this the moment you are about to write that a fact is missing. Not before,
not after. The trigger is the sentence, not the phase.

The trigger phrases, in any field, in any file:

> *anges inte · publiceras inte · redovisas inte · framgår inte · står inte ·
> saknas · är okänd · Ej angiven · inget pris · ingen uppgift · ingenstans ·
> ingen tillverkare anger · ingen av testerna nämner*

**The default assumption is that we have not found it yet.** Not that the
manufacturer failed to publish it. That is not humility, it is the base rate:
of 20 such claims checked across six pages in August 2026, **11 were false**,
and in four of those the answer sat in a document our own data already linked.
The `/avfuktare` correction says it in one line — *felet låg i vår research*.

Three consequences, and they are the whole file:

1. **A gap never lowers a score.** A deduction must answer to something the
   product does. See `check:avdrag`.
2. **A gap never reaches the reader.** No con, no tagline, no verdict sentence,
   no FAQ answer. The table cell renders as a dash and says nothing, which is
   correct, because we have nothing to say.
3. **A gap is not a finding to report.** It goes in `.agent/research/{slug}.md`
   with the rungs you tried and the date, and nowhere else. Do not raise it as a
   blocker, do not headline it in a summary, do not write a paragraph about it.
   It is a routine outcome of an incomplete search.

The one thing that is *not* a specification gap: a **condition of purchase** the
buyer also runs into. A price you cannot get without a salesman in your living
room is established positively — you tried to buy and were stopped — and it is a
property of the offer. That is `/hemlarm`, and it is the only shape that earns a
sentence in reader text.

---

## Why the existing instructions did not prevent this

`spec-sourcing.md` already says the manual PDF is the highest-yield source and
that the manufacturer's home market beats the `.se` page. Both are correct, and
between them they would have caught five of the seven errors.

They did not fire, for one structural reason: **that file is scoped to the gap
pass, which is about empty table cells.** Writing "Ej angiven" in a cell and
writing "anges inte av tillverkaren" in a con are the same claim, but only the
first looks like a data gap. The second looks like prose, and prose gets
written without leaving the page you happen to be reading.

So the rule is not "read more references". It is: **the phrase is the trigger.**

---

## Start here: one command

```bash
node scripts/fetch.mjs <url> --find "vikt,mått,standby"
```

It runs curl, then r.jina.ai, then a real browser that dismisses cookie banners
and clicks through the specification, support and document tabs. It prints the
byte count and term hits **for every rung**, so a silent tool can never pass for
a silent source, and it lists any PDFs it found.

Measured against the four sources that beat us, each needing a different rung:

| Source | curl | jina | playwright |
|---|---|---|---|
| Kjell powerbank | **6 301 B** | — | — |
| Netatmo help centre (403 to Playwright and WebFetch) | **4 379 B** | — | — |
| Delock (401, renders anyway) | 50 B | 150 B | **7 730 B** |
| Netatmo product SPA | 5 223 B | 334 B | **19 304 B** |

Two things that surfaced only because the ladder reports every rung: **curl with
a proper user-agent walks straight through the Cloudflare check** that stops
Playwright and WebFetch, and the browser rung found a Netatmo PDF that five
manual attempts had missed. The source was never closed. The tool we happened to
reach for was.

When every rung comes back thin, that is still not an absence — escalate to a
real Chrome session, which carries a genuine profile and fingerprint.

## The ladder

Use the command above first; the rungs below are what to do with what it
returns, and where to go next. Stop as soon as you have the fact.

### 1. The retailer page — rendered, and read as text

The shop is where you start and never where you stop. Two traps, both of which
produced false claims on this site:

- **Specs are JavaScript.** `curl` on a Kjell product page returns zero spec
  rows. The page has them; the HTML does not.
- **Specs are prose, not tables.** Kjell writes `Mått och vikt · Mått: 161 × 59
  × 51 mm · Vikt: 625,1 g` as body text. A scraper looking for `<tr>` finds
  nothing and reports an absence that is on the screen.

Render the page and read `document.body.innerText`. Never conclude from a
table-shaped scrape.

While you are there, take the **article number and GTIN**. They are the keys to
every step below.

### 2. The manual, linked from that same page

The single highest-yield source, and the one most often skipped because the
product page looks like it ought to have the answer.

Kjell puts manuals behind a **Support** tab as
`kjell.com/globalassets/mediaassets/{id}_{artnr}_manual_*.pdf`. On the Linocell
140 W charger, that PDF held **five** spec rows the product page did not:
port-sharing table, PPS range, dimensions, weight, no-load draw. On the
Cleverio IP200 it held `Standby: <1 W`, which we had published as unstated.

Read the PDF. The `Read` tool takes PDFs directly.

### 3. The manufacturer's own site — product page *and* spec sheet

These are two sources, not one, and they disagree.

Aqara's spec sheet for the G410 lists the battery type and no life. Aqara's
**product page** says "up to 5 months". We read the spec sheet, which is the
more rigorous-looking document, and published the absence.

Check both. Marketing copy carries numbers the datasheet omits, and vice versa.

### 4. The manufacturer's home market

A `.se` page is a translated marketing subset. See `spec-sourcing.md` for the
per-origin table. Search the model number in German and English before
concluding anything.

Delock's datasheet for article 81192 gives `Cable jacket material: TPE`, plus
diameter and AWG. We had read nine spec rows at a Swedish retailer and written
"manteln anges inte".

### 5. Enumerate the site, do not browse it

For a company rather than a product — an alarm provider, a service — the front
page is the least informative page they own.

```bash
curl -s https://example.se/wp-sitemap.xml          # WordPress
curl -s https://example.se/sitemap_index.xml       # Yoast
curl -s https://example.se/sitemap.xml
```

Then pull prices straight out of the structured data:

```bash
curl -s "$URL" | grep -oE '"price"\s*:\s*"?[0-9.,]+' | sort -u
```

Gardio's front page has no price. Their shop has eleven products and **every
one** carries a price in JSON-LD, including the alarm at 249 kr/månad with
binding period and start fee written out. We published "inget pris publicerat
någonstans på sajten" for eighteen months.

Look for `/butik`, `/shop`, `/produkt/`, `/priser`, `/abonnemang`, `/kampanj`.

### 6. Search for the document, not the fact

Facts live in documents with predictable names. Search the document type:

```
"{model}" manual filetype:pdf
"{model}" datasheet | Datenblatt | merkmale
{company} säkerhetsdatablad filetype:pdf
{company} allmänna villkor filetype:pdf
```

Garda Alarm's terms PDF is indexed, returns 200 and runs to 551 kB. It is
linked from no page on their site. We had published "länken till villkoren
leder ingenstans".

Use `node scripts/sok.mjs "…"` — Brave with `country=SE`. The built-in
WebSearch is US-only and answers a different question.

### 7. The regulatory and packaging seams

FCC ID, CE declarations, EPREL, and the spec panel photographed on the box in
the retailer's own gallery. All covered in `spec-sourcing.md` §4–5.

---

## Traps that produce false absences

**A 401 or 403 is not an absence.** `delock.com` answers 401 and renders the
entire product page anyway. A check that reads the status code and stops
concludes the source is closed. It is open. Render it and read it.

**A 404 on a URL you guessed is not an absence.** `gardaalarm.se/butik.html`
404s while the site's own nav shows a BUTIK entry. Follow links; do not invent
paths and then report on your inventions.

**Zero results from your parser is not zero results.** Every JS-rendered page,
every prose-formatted spec block, and every PDF returns nothing to the wrong
tool. Before writing an absence, ask what would have to be true for your tool
to have missed it — and then check that instead.

**One page is not a site.** This is the single failure behind every one of the
seven: Gardio, Aqara, Delock, both Linocells, the Cleverio and Garda.

---

## When the ladder comes up empty

**You write nothing.** That is the whole instruction, and it is a change from
how this file read until 2026-08-06.

The old version taught how to phrase an absence well — *"Inget pris publicerat
på den sida vi läst"*, naming the boundary of what you checked. The phrasing was
careful and it was still the wrong move, because it teaches that a search which
came up empty is publishable if you hedge it precisely enough. It is not. It is
a search that came up empty, and the honest number says it is more likely our
failure than the manufacturer's.

So:

- **The cell** gets `Ej angiven` and renders as a dash. Silent, and correct.
- **The score** is left out of the arithmetic rather than set at the bottom.
  If the product cannot be placed on the scale at all, it belongs in the
  considered list, not in the ranking.
- **The prose** is about something else. There is always something else: what it
  does, what it costs, who it suits, what separates it from the one beside it.
- **The research file** gets the rungs — which URLs, which documents, which
  searches, on what date. That is the only place it goes.

That last one is not bookkeeping. It is what lets the next agent tell
checked-and-still-missing from never-looked, and it is the distinction this
whole file exists to protect.

### The one exception, and it is not a specification

A **condition of purchase** the buyer hits too. An alarm price that requires a
salesman in your living room is established positively: you tried to get it and
were stopped, and that is a property of the offer rather than a hole in our
notes. It earns **one sentence**, never a paragraph and never the spine of a
review.

The test is not "is this interesting". It is: *did it stop the buyer, or did it
only stop us?*

---

## Evidence

`.agent/research/pastaenden-kontroll-2026-08-05.md` — the first ten claims, what
was true, where the fact actually lived, and why we missed it each time. The
running total to 2026-08-06 is **20 checked, 11 false**, across /usb-c-laddare,
/brandstege, /iphone-skarmskydd, /hemlarm, /luftrenare and /smart-termostat.

`.agent/pastaenden-om-franvaro.md` — the standing inventory of every absence
claim in `lib/data`, with file, product and field. 65 of them as of
2026-08-05, of which 10 are checked.
