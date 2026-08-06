# Where product specs actually hide

The playbook for filling the comparison table. Read it before the **gap pass**
described in `.claude/context/research.md` §4, when you have a list of empty
cells and the obvious page has already failed you.

The tier rules and the reader-facing consequences live in that file. This one is
purely operational: given an empty cell, where do you go next.

**Be flexible.** This is a ranked list of places that have paid off, not a
procedure. If a category has an obvious source that is not here, use it and add
a line at the bottom.

---

## The ranking, by yield

### 1. The manual PDF, not the product page

The single highest-yield move, and the one most often skipped because the
product page looks like it should have the answer.

Battery chemistry, minimum dimensions, material limits and operating ranges live
in a *Technical data* appendix or inside the safety warnings — never in
marketing copy. On `/fonsterputsrobot`, both the frameless-glass rule and the
10 cm margin were in the manual and in none of the product sheets.

Search `"{model}" manual filetype:pdf` and `"{model}" bedienungsanleitung`.
Firecrawl handles PDFs; `WebFetch` often does not.

### 2. The manufacturer's home market, not the Swedish site

**Probably the biggest unexploited seam we have.** A `.se` page is a translated
marketing subset. The home-market site carries the engineering documentation.

| Brand origin | Go to |
|---|---|
| German (Kärcher, Bosch, Siemens, AVM) | `.de` — consistently the densest documentation of any market |
| Chinese/Taiwanese (Ecovacs, HOBOT, Xiaomi, Aqara, Roborock) | The global `.com` and the English or Chinese domestic site, not the EU one |
| Nordic (Electrolux, Nibe) | `.se` is home; already correct |
| US (Google, Amazon, Ring) | `.com` support pages |

Searching only in Swedish is why our tables are thin. Search the model number
in German and English before concluding a number does not exist.

### 3. Icecat and retailer PIM feeds

Proshop, Komplett, Dustin, Inet and many other EU retailers populate their
*Tekniska data* tab from Icecat's structured product catalogue — **queryable by
GTIN, which we already record**.

That makes it the one source keyed on a field we hold. When a retailer's spec
tab is richer than the manufacturer's own page, this is usually why, and going
to the catalogue directly beats scraping the tab.

```bash
node scripts/fetch.mjs --gtin <gtin>
```

**Try it on every GTIN, and expect it to miss four times in five.** Measured on
our own catalogue: **18 % open, 53 % behind Icecat's paid tier, 18 % not in the
database.** Icecat's free tier covers brands that sponsor their listing, so the
coverage follows marketing budgets rather than product categories — which is why
a Netatmo thermostat answers and a Spigen screen protector does not.

Two failure messages, and **neither is evidence about the manufacturer**:

- `You are not allowed to have Full Icecat access` — the data exists, we cannot
  see it. Nothing follows about what the manufacturer publishes.
- `The requested XML data-sheet is not present in the Icecat database` — Icecat
  has not catalogued it. Same.

The script prints that reminder itself. A hit is **tier B**, not the
manufacturer, and is labelled so; a safety-shaped number still needs tier A or a
second agreeing source.

⏳ **The 53 % is temporary. Full Icecat has been applied for and the answer is
pending, as of 2026-08-06.**

You will know it landed when `You are not allowed to have Full Icecat access`
stops appearing and a previously locked GTIN answers — `0190074000324` is locked
today and makes a good probe. When that happens the hit rate goes from roughly
one in five to roughly seven in ten, which changes how much of a gap pass is
manual work.

If you are the agent who notices it: swap the token in
`C:/code/credentials/icecat/credentials.json` if Icecat issues a new one, re-run
the measurement across the catalogue's GTINs, and update the 18/53/18 figures in
all four places they appear — here, `scripts/fetch.mjs`, both skills' gap pass,
and `.agent/nattpass-runbook.md`.

### 4. Regulatory filings

How you find a battery spec nobody publishes.

- **FCC ID lookup** — internal photographs routinely show the cell label with
  chemistry, capacity and voltage. Radio and power data come free.
- **CE declaration of conformity** — often a PDF on the manufacturer's support
  page; names the standards tested against.
- **EPREL** — the EU energy-label database, for anything carrying a label.

### 5. The packaging shot in the retailer's image gallery

Spec panels are photographed on the box constantly, and we are already
downloading these images for packshots. Open the full gallery and read them.

Cheap, frequently decisive, and almost never tried.

### 6. Retailer Q&A and marketplace listings

Amazon `.de` and `.co.uk` carry a *Technische Daten* block plus brand A+ content
that the Swedish retailer strips. The customer Q&A is better than it sounds:
brands answer exactly these questions there, and Elgiganten and Power run the
same thing.

### 7. Spare parts and accessories

Tank volume, cloth dimensions, cable length, filter size and battery part
numbers all fall out of the accessory listing when the main page omits them.

### 8. Teardowns, forums and video

Weight, noise, real-world runtime, and the failure modes nobody advertises. We
have transcript access through the youtube-search MCP, so a ten-minute teardown
is searchable text.

**Tier C.** These produce context, disqualifiers and leads — never a bare number
in a cell. If a forum post gives you a figure, it has told you the figure
exists; go find it at tier A or B.

---

## Tool routing

| Need | Use |
|---|---|
| Search that reaches Sweden | `node scripts/sok.mjs "..."` — the built-in `WebSearch` is US-only |
| Whole-brand sweep | `node scripts/sok.mjs --brand {brand}` |
| PDFs, JS-heavy spec tabs, whole-site crawls | the firecrawl skills |
| Spec tab that only renders after a click | playwright or chrome-devtools |
| Video teardowns | the youtube-search MCP, transcript first |
| Reading a box photo or a spec panel | just read the image |

---

## Discipline that stops wrong numbers

### Match on GTIN, never on series name

The top cause of a wrong spec. `W2` / `W2S` / `W2 Pro` / `W1 Pro` are four
different machines with the same family name, and a retailer's spec table will
cheerfully show the series figure against whichever one you are looking at.

**Never carry a value between models.** If HOBOT-388 states a line rating and
HOBOT-2S does not, HOBOT-2S has no line rating. Filling it in from the sibling
is the one failure that turns a thin table into a false one.

### Declare the unit, record the raw value

Pa vs kPa, Ah vs mAh, mm vs cm, dB(A) vs dB. Record what the source said and
what it normalises to. A tenfold error in a spec table is indistinguishable from
a deliberate claim.

### When two sources disagree

1. The manual wins.
2. With no manual, prefer the value two independent sources agree on.
3. Still split, and the value is safety-shaped: take the **more conservative**
   one and note the disagreement in `.agent/research/{slug}.md`.

Disagreement between sources is content elsewhere on the site, but not in a
spec cell. A cell holds one value or a dash.

### A dash is sometimes the right answer

Some numbers genuinely are not published anywhere, and rated safety loads are
the clearest example — manufacturers avoid stating them for liability reasons.
After a real gap pass, a dash is an honest result.

What is *not* acceptable is a highlighted row that is mostly dashes.
`pnpm check:tackning` reports fill rate per highlighted row. Under 50 % means
one of two things, and both are fixable:

- the research was thin — run the gap pass again, or
- **the row was the wrong choice.** `Linans hållfasthet` had a value for one
  product in seven. Demote it to the detail specs and highlight an attribute
  that separates the field instead. Weight, tank volume, control method and
  noise are usually well covered and usually more decisive than the prestigious
  row nobody publishes.

---

## Record what failed

In `.agent/research/{slug}.md`, per unfilled cell: what you searched, in which
languages, which of the eight routes above you tried, and what came back. A
refresh in six months should start from that list rather than rediscovering it.
