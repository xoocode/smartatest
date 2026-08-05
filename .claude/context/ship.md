# Ship

**Decides:** whether a page is finished, and what happens between finished and
live.

---

## The checks

```bash
pnpm check          # tsc, lint, emdash, refs, läckor
pnpm build          # kills the dev server; restart after
```

| Command | Fails on |
|---|---|
| `check:emdash` | Em dashes in reader-facing text, including `aria-label` |
| `check:refs` | A data file not spread into `ALL_PRODUCTS`; test page `updated` disagreeing with the page's `UPDATED`; a tool older than the newest test page in its `usedOn` |
| `check:lackor` | Narrated research, word counts, business model as self-defence, machine vocabulary, first person in verdict fields. **Owns the affiliate-wording route allowlist**; nothing else should re-implement it |
| `check:tools` | Any of a tool's registrations missing, an MDX name not routed through `ToolWidget`, or a guide embedding a tool whose `usedOn` omits that test page |
| `check:vikter` | Criterion weights not summing to 100, or a test page with fewer than three or more than seven criteria |
| `check:upplysning` | The same disclosure variant twice on one page, or a page repeating the footer's |
| `check:fraser` | The confirmed overtramp from `measurements.md`, in reader-facing text with comments stripped. Two tiers: a short hard list that fails, and a counted list that only reports |
| `check:kallprat` | Reports site-wide, fails with `--strict`: reader-facing fields that describe what a source published rather than what the product does. Field-aware — `methodology`, `footnote` and `reason` are exempt by design |
| `check:omdomen` | Reports: verdicts over 500 characters in a single paragraph, `superlative` repeating the award, two products sharing a superlative |
| `check:tackning` | Reports: highlighted specs that never become a row, and rows under 50 % filled |
| `check:lankar` | Outbound links that no longer resolve |
| `sprak "<fras>"` | Comparison against the 151k-word reference corpus |
| `priskoll` | Price drift against the merchant pages |

`check:refs` is the one that catches an invisible failure. It stays quiet in
`tsc`, `lint` and `build`, and it silently blanks every `<ProductRef>` in a
buying guide. Run it before calling a test page done; that is exactly the moment
the registration gets forgotten.

### `check:tackning` reports and does not fail, deliberately

A highlighted spec row is a promise that the row separates the products. Mostly
dashes means the promise is broken and the reader paid a screen height for
nothing.

It does not fail, because some numbers genuinely are not obtainable —
manufacturers avoid publishing rated safety loads for liability reasons. A check
that failed on that would only teach us to fill cells with guesses, which is
worse than a dash.

So it is a to-do list, and there are exactly two ways to clear a line: run the
gap pass again (`.claude/references/spec-sourcing.md`), or **change the row**.
`Linans hållfasthet` had a value for one product in seven; an attribute that is
knowable and differentiating beats a prestigious row nobody publishes.

Treat a line here as unfinished work on the page it names, not as a permanent
property of the category.

### Why three checks report instead of failing

`check:kallprat`, `check:omdomen` and `check:tackning` all found that what
looked like one page's mistake was the site's habit: 167 källprat hits across 30
pages, 28 single-paragraph verdicts, 44 invisible highlighted specs, 10 winners
labelled `Bäst i test`. Failing on any of them would block the repo on work that
requires someone to write new text, page by page.

So they are a worklist, and `/fix-page` is what works it. That skill runs
`check:kallprat --sida <slug> --strict`, so **the page being fixed must come out
clean even while the rest of the site does not.** Global report, per-page gate.

When a list empties, make it fail so no new page can reinvent the fault.

## Verify in a browser at 1440px and 390px

- No horizontal page overflow at either width
- One `h1`, no heading-level jumps
- Every image has `alt`
- The comparison table is a real `<table>` at both widths, frozen first column
  scrolls
- Nothing truncated that should not be
- Every outbound link resolves through `resolveMerchantLink`

**Measure, never eyeball.** Test `scrollWidth > clientWidth`; do not look at it.

### Long Swedish compounds burst the glossary at 390px

Found on `/robotgrasklippare`: the page sat at `scrollWidth` 407 against
`clientWidth` 390, and the cause was one word —
`standardiseringsorganisationen`, 30 characters, in the glossary table's first
column.

Markdown tables in `Prose` sit in no horizontal scroller, unlike
`ComparisonTable`. A cell cannot be narrower than its longest unbreakable word,
and Swedish compounds get long. Keep glossary cells under roughly 25
characters, and rewrite rather than hyphenate: `standardiseringsorgan`, `prov
för igelkottssäkerhet` instead of `igelkottssäkerhetsprov`. It is shorter and
better Swedish anyway.

```bash
node -e "const s=require('fs').readFileSync('content/{slug}/kopguide.mdx','utf8');
console.log([...new Set(s.slice(s.indexOf('## Ordlista')).split(/[^A-Za-zÅÄÖåäö]+/).filter(w=>w.length>=25))])"
```

The failure shows **only at 390px** and only in the page's total `scrollWidth`.
The table looks normal; it is the page behind it that widened. Find the root
cause by skipping elements whose parent also overflows.

### Three ways a measurement lies

- **React batches.** Clicking four variants and reading synchronously returned
  four identical readings. Anything reporting "no change" after an interaction
  is suspect until you have awaited a tick.
- **A same-URL navigation with only a hash does not reload.** Setting a cookie
  then navigating to `path#hash` from `path#hash` is a no-op, so you measure
  the previous state and believe it changed.
- **Assumed guards are how truncation ships.** Inject a deliberately over-long
  string and confirm it ellipsises and the layout holds.

---

## The critique pass

The standard is the richness of `/smart-belysning`, **not its length**. That
page runs about 4 600 words because lighting genuinely has protocols, colour
temperature, flicker, sockets and a wiring regulation to explain. A category
with less to say should be shorter.

Never add a section to reach a number. Padding a thin topic to hit a word count
is exactly what the AI-generated affiliate spam does, and out-writing them on
volume is not the game. Being the page that actually answers the question is.

For each row: **yes**, **no, and here is what I will add**, or **not applicable
because X**. "Not applicable" is legitimate and must carry a reason. "We ran
out of time" is not a reason.

### Substance

| | Question |
|---|---|
| 1 | Does every product carry a real, dated price from a verified retailer URL? |
| 2 | Does the page name the independent tests it draws on, with working links? |
| 3 | Is the weighting published, and does the ranking follow the scores? |
| 4 | Does it say anywhere that the reader should **not** buy, or that a cheaper option is enough? |
| 5 | Does it name products we rejected, with real reasons? |
| 6 | Does it explain the criterion we weight heaviest, in the terms a buyer would use? |
| 7 | Is there a fact here no competitor has? The pilot had IKEA's discontinued colour E27 and the E14 that survived it. |
| 8 | Does anything claim a measurement we did not take? |

### Usefulness

| | Question |
|---|---|
| 9 | Does the guide answer the questions people search, or the ones convenient to write? |
| 10 | Is there a tool where a tool genuinely helps, and none where it would be decoration? |
| 11 | Does the FAQ stand alone, so one answer surfaced in search still makes sense? |
| 12 | Is the failure mode buyers do not anticipate covered? Flicker below 20 % was that for lighting. |
| 13 | Is there a Swedish angle a translated guide would miss? Regulation, elpris, housing stock, what shops actually stock. |
| 14 | Would someone who reads only the first screen get a correct answer? |

### Craft

| | Question |
|---|---|
| 15 | Section tones alternate, no two adjacent greys without a divider. |
| 16 | Zero to two new components, each with a styleguide bench. |
| 17 | Byline labelled, with a separate reviewer. |
| 18 | Is every claim in the file headers about what is real and what is not accurate? |

Rows about em dashes, links, schema and agent tools used to live here. They are
scripts now, which is why they are not questions.

### Then compare against the competitors

Re-run the phase 1 measurements with our page included. The comparison is for
**capabilities**, not word counts: schema types they have that we lack, content
kinds they have that we lack, and anything we have that none of them do, which
is the thing to protect.

Report as a table with effort and priority. Fix what is cheap and material;
stash the rest in `.agent/ideas-testsidor.md` with the reasoning intact.

Two passes is normal. If the second finds nothing, stop. A third pass by the
author who wrote the page is theatre, not review.

---

## Definition of done

- `tsc`, `lint`, `check` and `build` pass
- Verified at 1440px and 390px, by measurement rather than by eye
- Every rubric row a yes or a justified not applicable
- Every price, URL and source verified against the live page and dated
- Zero to two new components, each with a styleguide bench
- `.agent/research/{slug}.md` records what was checked and what could not be
- File headers state accurately what is real and what is placeholder

That list is complete. **A page that meets it is publishable, and `status:
"live"` follows in the same commit.**

## What does not block going live

Three things have been reported as blockers and are not. Each is ordinary work
that continues after publication, and none of them changes whether the page is
true.

- **Unmeasured search volume.** Keyword Planner tells us what a page is worth,
  not whether it is right. A page with a good slug and no volume figure earns
  nothing while it sits unpublished, and it cannot start ageing in the index
  either. Measure when convenient and rename only if the gap is big enough to
  pay for redirects. Never hold a finished page for it.
- **An affiliate programme we have not joined.** `LINK_MODE` is `"direct"` on
  every page on the site; we hold no programmes at all. Waiting for one would
  hold every page forever. Joining later is one constant plus `affiliateUrl`
  per product, with no page or component changes. See `money.md`.
- **A page we cannot advertise.** PPC permission decides whether Google Ads can
  run, which is a separate decision taken later and on different grounds.
  Organic traffic does not care.

Say them once in the research file as follow-up work. Do not repeat them in the
catalog entry, in a hand-off summary, or as a reason to leave `status:
"planned"`.

**Do not raise the byline.** It is a known, deliberate placeholder across the
whole site. Never list it as a blocker, never flag it in a file header, never
mention it in a hand-off summary.

## Deploy

**Never automatically.** Only when explicitly asked.

```bash
git add . && git commit -am "message" && git push origin main && vercel --prod
```
