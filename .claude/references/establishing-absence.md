# Establishing that something is not published

Read this the moment you are about to write that a fact is missing. Not before,
not after. The trigger is the sentence, not the phase.

The trigger phrases, in any field, in any file:

> *anges inte · publiceras inte · redovisas inte · framgår inte · står inte ·
> saknas · är okänd · Ej angiven · inget pris · ingen uppgift · ingenstans ·
> ingen tillverkare anger · ingen av testerna nämner*

Writing one of those is not a writing decision. **It is a research task that
has not been done yet.** Every one of them is a falsifiable claim about the
world, published in our name, and a reader with thirty seconds and a search box
can prove it wrong. On 2026-08-05 we checked ten of them. Seven were false, one
was unprovable as written, and two held up.

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

## The ladder

Work down until you find it or reach the bottom. Stop as soon as you have it.
Most facts fall out at step 2 or 3.

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

## How to write it when it really is missing

Two of the ten claims were true. One of them was well written:

> "Inget pris publicerat **på den sida vi läst**."

That formulation stays true even if a price exists elsewhere. It tells the
reader exactly how much weight to give it. It costs four words.

The other true one was not:

> "Inget pris publicerat, hela erbjudandet går via offertförfrågan."

Both describe the same situation. The first is defensible; the second is a
claim about a company's entire web presence made from one page.

**Name the boundary of what you checked.** Not as a hedge — as the finding.
"Priset står i butiken men inte på de två sidor som förklarar larmet" is more
useful to a buyer than either "publiceras inte" or a nervous "vi hittade inte".

And when the ladder comes up empty, record the rungs in
`.agent/research/{slug}.md`: which URLs, which documents, which searches, on
what date. The next agent then knows the difference between checked-and-absent
and never-looked, which is the distinction this whole file exists to protect.

---

## Evidence

`.agent/research/pastaenden-kontroll-2026-08-05.md` — the ten claims, what was
true, where the fact actually lived, and why we missed it each time.

`.agent/pastaenden-om-franvaro.md` — the standing inventory of every absence
claim in `lib/data`, with file, product and field. 65 of them as of
2026-08-05, of which 10 are checked.
