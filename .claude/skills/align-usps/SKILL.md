---
name: align-usps
description: Check each test page on smartatest.se for whether the search snippet and the ingress sell the same thing, and resolve it where they do not — the snippet promises a property, the reader clicks, and the first paragraph argues a different one. Takes no argument to walk every page where both texts are in the current shape, a slug for one page, a category key for a group, or `auto`. Offers to move the ingress to the meta, the meta to the ingress, or only the call to action, one page at a time. Use when asked to align USPs, check that the snippet and the ingress match, or fix a promise the page does not keep.
---

# Align the snippet and the ingress

Two strings sell the page and they were written by different runs.
`metadata.description` ends on a lure and a call to action; the ingress gives
the winner's reason after `eftersom`. **When those are different properties, the
click is wasted.** A reader who searched, read *"Fyra av tolv saknar termometer
helt. Se vilka som har en."* and clicked, lands on a paragraph about wood and
charcoal. Nothing on the page is wrong. The promise is.

This is a **judgement pass, not a linter.** No script can settle it, and the
last option is always to do nothing.

## Why the mismatch exists, and why it is nobody's mistake

`fix-meta-descriptions` picks the lure that earns the impression.
`fix-ingress` picks the property that makes the winner worth buying. Both are
right on their own terms, they ran as separate passes, and neither could see the
other. Measured 2026-08-07 while both runs were still in flight: **32 pages had
both texts in the current shape, and 21 shared no content word** between lure
and reason — with manual reading putting the real mismatch nearer half of that.

So do not treat a mismatch as a defect in either text. Both are usually good.
The job is to decide which promise the page keeps.

## Scope

Only pages where **both** texts are already in the current shape: the
description leads with the search phrase, the ingress opens `Vår testvinnare är`
or `Vi rekommenderar`. A page still carrying `Våra jämförelser av …` has nothing
to align yet — send it to `fix-meta-descriptions` first and come back.

The listing marks those, and `--alla` shows them.

## The argument

The grammar is shared across the page-run skills and lives in
`.claude/references/page-runs.md`. Read it.

```
/align-usps                every page where both texts have landed
/align-usps pizzaugn       one page
/align-usps kok            one category
/align-usps auto           the sweep, no questions
```

Order: worst overlap first, which is what the listing sorts by.

## Read first

| Before you | Read |
|---|---|
| Write a single sentence | Skill `swedish-voice`, plus `references/writing-guide.md` |
| Rewrite an ingress | Skill `fix-ingress` — the house form is not optional |
| Rewrite a description | Skill `fix-meta-descriptions` — price floor, no winner's name |
| Check a claim about the winner | `lib/data/{slug}.ts` |

## The three grades

**Aligned.** The reason answers the promise. Same claim, and often not the same
words — `/mjolkskummare` promises *"En cappuccino tar 60 ml skum. Se vilka som
räcker till fyra."* and delivers *"skummar 150 till 250 milliliter i en körning,
så två till fyra koppar blir klara samtidigt."* Zero shared vocabulary, promise
kept. **Leave it.**

**Answered late.** The promise is kept, but in the ingress's second sentence as
a `dessutom` rather than in the reason. `/iphone-fodral` promises *"Bara fem
laddar genom fodralet"* and argues full-grain leather, with the magnet ring
arriving a sentence later. Worth offering, not urgent.

**Broken.** The reason is a different property and the promise is nowhere above
the fold. `/pizzaugn`, `/smoothiemixer` (*"Se vilken som räcker längst"* against
700 watt from a wall socket), `/iphone-skal` (drop heights against the camera
block). This is the run's real target.

## The one thing that decides the direction

**Is the lure's property true of the winner?**

Check `lib/data/{slug}.ts` before offering anything. On `/pizzaugn` it was: the
winner carries `"Inbyggd termometer, som fyra av tolv saknar"` as a pro and
`Ja` in the spec row, so the ingress could be moved onto it honestly.

**If it is not true of the winner, `Meta → ingress` does not exist as an
option.** A category finding like *"tre av nio når aldrig din telefon"* is about
the field, not the winner, and an ingress rewritten to claim it would be false.
Then the honest choices are `Ingress → meta` or the call to action alone. Do not
offer a direction you have not checked; a mismatch is cheaper than an invention.

## The four options

Settled on `/pizzaugn`, 2026-08-07: **`Meta → ingress` is the default and goes
first.** The snippet earned the visit, the reader arrived for that specific
claim, and the ingress is the first thing they see — so where the winner can
carry the promise, the page should keep it rather than change the subject.

| # | Option | What changes |
|---|---|---|
| 1 | `Meta → ingress` | The ingress reason is rewritten to deliver the lure. Meta stands. |
| 2 | `Ingress → meta` | The lure is rewritten to sell what the page argues. Ingress stands. |
| 3 | `Bara uppmaningen` | Neither text moves; only the call to action stops promising a list. |
| 4 | `Do nothing` | Always last, always literally nothing. |

### The call to action travels with whichever option wins

Option 3 exists for the case where the lure is a real category finding the
winner cannot carry and both texts should stand. **But the call to action is not
option 3's private property.** Whenever the chosen direction leaves it pointing
at something that is no longer there, correct it *inside that option* and show
the corrected text — never leave it as a follow-up.

`Se vilka som har en` promises a list. `Se vinnaren här` and `Se vilken det är`
promise the thing the ingress actually delivers. The rules for making them agree
in number and referent are in `fix-meta-descriptions`, "Read the call to action
back against the lure" — they apply to every option here, not just the third.

## Presenting the choice

**Above the form**, in your own message: the slug, the current description and
the current ingress in full, and whether the lure's property is true of the
winner. That is the context; it is not an option.

**Inside `AskUserQuestion`**, one question, four options. Each option's
`description` carries **both strings**, so the pair can be read as the reader
would meet it:

```
META (oförändrad): {…}  ·  INGRESS (ny): {…}
```

- Mark each half `(ny)` or `(oförändrad)` so the change is unmistakable.
- Separate them with a mid dot.
- Quote both in full. Do not summarise the unchanged half.
- `preview` stays unset, for the reason in `fix-meta-descriptions`: only
  `description` renders for every option at once, and comparing is the whole
  point.
- Option 4's `description` shows both current strings, unchanged.

## Writing the replacement

**A rewritten ingress uses the current house form**, `Vår testvinnare är
{produkt} för {pris} kronor, eftersom den {skäl}.` — even when the page today
opens `Vi rekommenderar`. `fix-ingress` says not to *backfill* those 26 pages,
which means not to sweep them; it does not mean writing the superseded form when
something else has already brought you to the sentence. This skill is something
else bringing you to the sentence.

**A rewritten description obeys every settled rule in
`fix-meta-descriptions`**: the price is a floor and never a range, the winner's
name does not go in, and the prefix comes from the page's own `title`. You are
changing the lure, not reopening those.

**Neither rewrite invents a fact.** Every claim comes from `lib/data/{slug}.ts`
or the verdict that is already published. If the alignment needs a fact the page
does not have, that is research, and it is not this skill's job.

## The loop

### 1. List the pairs

```bash
node scripts/usp-pairs.mjs             # both texts landed, worst overlap first
node scripts/usp-pairs.mjs --alla      # including pages a run has not reached
node scripts/usp-pairs.mjs pizzaugn    # one page
node scripts/usp-pairs.mjs kok         # one category
```

⚠️ **The overlap score ranks, it does not judge.** `/mjolkskummare` scores zero
and is perfectly aligned; two sentences can share the word `watt` and sell
opposite properties. The score decides reading order and nothing else, and the
script says so itself.

**Check `git status --porcelain` first**, and re-read each page immediately
before you offer options on it. This skill was written while
`fix-meta-descriptions` and `fix-ingress` were **running in parallel in another
session** — the eligible page count went from 28 to 32 during the writing. A
listing from ten minutes ago is a different site.

### 2. Read the page before you write

`lib/data/{slug}.ts` for whether the lure is true of the winner — the pro
bullets and the spec rows, not the verdict prose alone. The verdict tells you
which property the page thinks is decisive, which is the argument for
`Ingress → meta`.

### 3. Ask

One question per page, four options, the format above. Then wait.

### 4. Apply with `Edit`

| Option | File and field |
|---|---|
| `Meta → ingress` | the `<p className="max-w-2xl …">` in `app/{slug}/page.tsx` |
| `Ingress → meta` | `description` in `export const metadata`, same file |
| `Bara uppmaningen` | the last sentence of that same `description` |

Both fields are in the same file, so a page needs one `Edit` either way. The
ingress is JSX — expect `{" "}` at line ends and prettier's wrapping.

### 5. Verify

```bash
pnpm typecheck
pnpm check:emdash
pnpm check:fraser
```

`check:fraser` last. An alignment pass is phrasing, so `UPDATED` and the
`updated` in `lib/catalog.ts` stay put.

## Gates

1. **Never deploys.**
2. **Never pushes.**
3. **Commits only the pages it changed**, named by path. Never `git add .`.
4. **Never touches the H1, the verdicts, the criteria or a price.** If the
   alignment makes you want to change a number, the number is a `update-pages`
   job and the mismatch waits.
