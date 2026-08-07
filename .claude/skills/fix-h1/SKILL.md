---
name: fix-h1
description: Improve the H1 on smartatest.se so a test-page heading carries something the buyer can act on and a category heading carries the keyword and the count, and end the drift between the H1 and the metadata title. Takes no argument to walk every live test page, a slug for one page, a category key for a group, a page type, or `auto` to run without stopping — test-page and category are the written types, tool and utility are not. Shows the current H1, then offers three rewrites and a keep option per page, one page at a time. Use when asked to fix, improve or rewrite H1s, page headings or the heading above the ingress.
---

# Improve the H1s

The `<h1>` in `app/{slug}/page.tsx`. Nothing else on the page.

An improvement pass, **not a linter.** It walks the pages in scope one at a
time, shows what each one says now, and lets the user choose. **Keeping the
current H1 is a first-class outcome** — in the calibration run on 2026-08-07,
four of eight pages were kept. A run where the user never keeps one means the
options were framed as an obligation.

## How the H1 is built, and where it breaks

Measured 2026-08-07:

| Page type | Pages | H1 comes from | Argument |
|---|---|---|---|
| Test page | 62 | 35 from `{TEST_PAGE.title}`, 27 hardcoded in the page file | `test-page` — **written** |
| Category | 5 | Hardcoded, with `metadata.title` written separately | `category` — **written** |
| Tool / guide | 37 | `{tool.title}`, `lib/tools.ts` | `tool` — **not written** |
| Utility | 9 | Hardcoded literal: `Kontakt`, `Orden som avgör köpet` | `utility` — **not written** |

Do not improvise a type that is not written. Stop and say so.

The two written types have **different rules and different hit rates**. A
test-page H1 needs a finding and is kept about half the time; a category H1 needs
a keyword and a count, and all five were rewritten. Read the section for the type
you are on and do not carry one across to the other.

## The argument

**The grammar is shared across the four page-run skills and lives in
`.claude/references/page-runs.md`.** Read it. It covers how a bare word
resolves, why a near match is never guessed, and what `auto` does and does not
loosen.

```
/fix-h1                     every live test page — the only written type
/fix-h1 test-page           the same thing, said explicitly
/fix-h1 smartwatch          one page
/fix-h1 sakerhet            one category
/fix-h1 auto                the whole sweep, no questions
/fix-h1 sakerhet auto       a category, no questions
```

Order, whenever the run covers more than one page: **the nine drifted pages
first**, worst grade first — the factual disagreement on `/garageportsoppnare`,
then the five wording drifts, then the three word-order ones. Those are the
pages where the H1 and the `title` are two strings nothing keeps equal, so the
run also settles a second-source-of-truth problem while it is there.

⚠️ **`auto` costs more here than on any of the four.** The calibration run kept
four H1s out of eight, and this skill's entire method — write three shapes,
then choose — exists because the first candidate to mind is the flattest. See
the note in step 3.

### The 27 hardcoded H1s are a second source of truth

Those pages still set `metadata.title` from `TEST_PAGE.title`, so the heading
and the `<title>` are two strings that nothing keeps equal. **Nine had already
drifted** when this was measured, in three grades:

| Grade | Pages | Example |
|---|---|---|
| Word order | 3 | H1 `Smartwatch bäst i test 2026: …`, title `Bäst i test smartwatch 2026` |
| Wording | 5 | H1 `tolv skyddsskal till iPhone 17`, title `tolv skal` |
| **Factual** | 1 | `/garageportsoppnare` H1 `fem motorer`, title `sex motorer`, `count: 5` |

**The H1 wins.** It is what the reader sees and what `fix-meta-descriptions`
takes its word order from. When they differ, correct the title to the H1 —
including on `/garageportsoppnare`, where the title carries the error.

`pnpm check:refs` compares dates, not titles, so nothing fails today. That
comparison is machine-settleable and belongs in `scripts/` under
`routing.md` question 1; until it exists, this skill is the only thing looking.

## Read first

| Before you | Read |
|---|---|
| Write a single sentence | Skill `swedish-voice`, plus `references/writing-guide.md` |
| Judge what belongs above the fold | `.claude/references/page-anatomy.md` |
| Touch the word order | Skill `fix-meta-descriptions`, "The search phrase, first" |
| Take a figure from anywhere | `.claude/context/data.md` |

## What a test-page H1 has to do

**1. The search phrase, first.** `{Kategori} bäst i test 2026`. Sixty of 62
pages already do; two still carry the old `Bäst i test {kategori} 2026` and
should be flipped. The year is always there. `fix-meta-descriptions` takes its
word order from here, so changing this changes that page's snippet too.

**2. A colon, then something the buyer can act on.** This is the whole
judgement, and it is not "state a finding with a number". Four tails work:

| Tail | Live example | Why it earns its place |
|---|---|---|
| The plain promise | `vad den faktiskt ser` · `vilken du ska ha hemma` | Frames the question the reader arrived with |
| The corrected assumption | `hubben avgör, inte sensorn` | Kills a wrong belief in six words |
| The mechanism | `dimringen är där de billiga lamporna blinkar` | Says where the money actually goes |
| Scope **with fit or audience** | `fem motorer till villagaraget` · `tolv skal till iPhone 17, från 99 till 1 099 kr` | Answers "does this page cover my case" |

**3. Nothing the reader has to already know.** A code is not a finding.
`55A eller 43A, och vad siffran betyder` was rejected in favour of
`vilken du ska ha hemma`: the buyer does not yet know what 55A is, and an H1 is
the wrong place to teach them. Codes belong in the table and the buying guide.

**4. No word repeated from its own prefix.** `Galaxy S26-skal … till Samsung
Galaxy S26` and `iPhone-skal … tolv skyddsskal` were both cut. This is the one
fault that is always worth fixing.

### The two that are actually broken

Everything else is a judgement call. These two are not:

- **A bare keyword with no colon.** `Bäst i test smart belysning 2026` says
  nothing after the search phrase. Two pages: `/smart-belysning`, `/smart-plug`.
- **Scope with no fit and no audience.** `elva klockor från 2 972 till 9 294 kr`
  is a stock list. Compare `tolv skal till iPhone 17` — same shape, but the
  model tells a buyer whether the page is about their phone. The count and the
  price range alone never do that.

### Length

54 to 80 characters, as a guide. No script enforces it and none should. The
eight chosen in calibration ran 54 to 78; the current median is 67 and the
longest was 95, which was cut. **Length is not itself a fault** — three of the
four H1s kept ran 54 to 68 and one chosen rewrite ran 78. Redundancy is the
fault, and cutting it usually solves the length.

### What the corpus rule does not reach

`writing-guide.md` measures contrastive definition — `A, inte B` — as the site's
clearest tic at 18,4x the reference corpus, and four H1s use it. **That rule
governs prose and does not extend to the H1.** `hubben avgör, inte sensorn` was
kept deliberately. A paragraph has room to state the thing positively; a heading
has one line, and correcting a wrong assumption is the most useful thing it can
do with it. Do not offer to remove the construction on its own account.

## What a category H1 has to do

Five pages, and they are a different job from a test page. A test-page H1 has
one product category and needs a finding; a category H1 has no single topic and
needs to say **what is behind the click**. Nothing below applies to a test page.

**The form:** `Bäst i test 2026 {det sökbara}: {antal} jämförelser`

**1. `Bäst i test 2026` first**, in the collective form. Same word order
`fix-meta-descriptions` uses for these five, so the heading and the snippet stop
describing different pages.

**2. Then whichever of these is a phrase people actually type.** This is the
whole judgement on this page type:

| If the category noun is searched | Use it | Example |
|---|---|---|
| Yes | The collective noun | `smart hem`, `köksapparater` |
| No | Three product names instead | `elektronik` → `laddare, powerbanks och mobilskal` |

`fix-meta-descriptions` established the premise and it holds here: **nobody
types `elektronik`, `säkerhet i hemmet` or `hem & hushåll` into a search box.**
`smart hem` and `köksapparater` they do. Three names, not five — the fourth and
fifth stop being read and the category grid below the heading lists them all
anyway.

**3. The count of live comparisons, from `lib/catalog.ts`.** It is the one
number that says how much is behind the link, and it is the only tail this page
type needs. Spelled out below ten, digits from ten: `åtta jämförelser`,
`10 jämförelser`, `21 jämförelser`.

Counts drift as pages go live. Take them from `node scripts/h1-inventory.mjs`,
never from the existing copy — `fix-meta-descriptions` has `16 jämförelser` in
its worked example for `/elektronik` where 15 are live.

44 to 74 characters, on the five settled. The bare nouns they replaced ran 3 to
17, which is why this type went five for five where the test pages kept four of
eight. **Do not carry that hit rate back to the test pages.**

### The title follows the H1 here too

Four of five category pages have a `<title>` richer than their heading —
`/kok` renders `Kök` under a title reading `Kök: apparaterna som står framme på
bänken`. That is the same second-source-of-truth problem as the 27 hardcoded
test pages, inverted.

The rule does not change: **the H1 wins, and `metadata.title` is corrected to
match it.** These are hub pages whose title tag has no other job, and the new
form is the better title tag of the two.

The tail you are replacing is often good prose. Check the ingress before you
delete it — on all five it says the same thing two lines further down, which is
why losing it from the heading costs nothing.

`&` is `&amp;` in the JSX on `/hem-hushall`. Match the literal.

## What fails

Inherited from `swedish-voice`.

- `vi testade`, `vårt test`, `vi mätte`. We compared. `boundaries.md`
- in a security category, a heading on the catastrophe rather than the
  protection. `writing-guide.md`, *Rädsla är inget säljargument*
- a heading about the source state — what a manufacturer failed to publish is
  not what the reader is buying
- `sidans`, `av de tolv`, `i jämförelsen` without a noun — `measurements.md`
- em dashes, which `pnpm check:emdash` fells
- counts in letters where they are comparable, prices and measurements in
  digits. `tolv skal` is fine; `2 972 kr` is never `tvåtusen`
- a superlative claim we cannot stand behind

## The loop

**One page at a time, and the user chooses every H1.** Never apply a batch and
never carry a decision from one page to the next.

### 1. List the pages in scope, with their H1, title and drift

```bash
node scripts/h1-inventory.mjs            # every live test page
node scripts/h1-inventory.mjs test-page  # the same, said explicitly
node scripts/h1-inventory.mjs category   # the five hubs, with their live counts
node scripts/h1-inventory.mjs smartwatch # one page
node scripts/h1-inventory.mjs elektronik # the test pages inside Elektronik
```

The last two lines are the collision worth knowing: `category` is the page type
and lists the five hubs; `elektronik` is a category key and lists the 15 test
pages *inside* Elektronik, not the hub itself. `page-runs.md` resolves types
before keys, and so does the script.

**Take the comparison count from here**, never from the copy you are replacing.
It is what the category form is built on and it moves every time a page goes
live.

⚠️ **If you ever rewrite that script, match `title:` at the same indentation as
the `slug:` it belongs to.** 35 test pages sit at 2 spaces as their own
`export const`, 13 more are nested in an array at 4. A fixed 2-space pattern
misses those 13 in silence and under-reports the drift by five — it reported
four when the real number was nine, and the run looked clean.

Order: the two bare keywords first, then the nine drifted, then the rest.

**Check `git status --porcelain` first.** This repo runs concurrent sessions. On
2026-08-07 `/rorelsevakt-utomhus` had its products swapped and its H1 rewritten
from `vad den orkar tända` to `vad den faktiskt ser` mid-session, and a listing
taken four minutes earlier was already wrong. Re-read the page immediately
before you offer options on it.

### 2. Read the page before you write

`lib/catalog.ts` `blurb` is the highest-yield field on the site for this job: a
one-line finding already written for every page, and the H1 frequently ignores
it. `/smartwatch` carried `Arton timmar och trettio dygn står under samma ord på
hyllan` in its blurb while its H1 listed eleven watches and a price range.

The ingress gives you the winner's decisive figure. `count` in `lib/catalog.ts`
gives you the number of products, and **it is the arbiter when the H1 and the
title disagree about a count.**

Build every option from what the page already publishes. Nothing invented.

### 3. Write three, then ask

**Never a single candidate in prose.** `AskUserQuestion`, one question per page,
three written H1s plus a fourth that keeps the current one. Then wait.

**Under `auto`, still write all four, then take the one you would have put
first — including keeping the current H1.** The three-shapes rule is not a
courtesy to the user, it is how the variation gets made: it forces the options
to exist *before* anything is chosen, which is the only defence against sixty
headings built to one formula, and that defence is needed more when nobody is
watching, not less. Log the winner and the three you set aside, per page.
Calibration kept four of eight; an `auto` run that keeps none has stopped
judging. See `.claude/references/page-runs.md`.

One candidate asks the user to approve or reject; three ask them to choose. A
rejection tells you nothing about what was wrong, and the choice is what taught
this skill everything in "The calibration run" below. It also forces the
variation to exist *before* the user sees it, which is the only defence against
sixty headings built to one formula.

**Above the form**, in your own message: the slug, the current H1 with its
character count, and the raw material — the `blurb`, and the `title` if it has
drifted. That is context for the choice, not one of the options.

Fill the option fields exactly as `fix-meta-descriptions` does, and for the same
reason:

| Field | What goes in it |
|---|---|
| `label` | A short handle for the angle, plus the character count: `Vinnarens tal, 75` |
| `description` | **The H1 itself, verbatim and whole**, then the trade-off after it |
| `preview` | Leave it unset |

**The heading goes in `description`, never in `preview`.** `description` renders
under the label for every option at once, which is the only place three
candidates can be read against each other. `preview` renders only for the
focused option, in a side panel, and switches the question to a side-by-side
layout — so three H1s in `preview` are three the user has to arrow through one
at a time. That was the first version of this question, and Peter's answer was
that he was getting "a description of what you will do in the form" instead of
the headings themselves.

An H1 is 54 to 80 characters and `description` takes far more, so quote it in
full, unwrapped, and put the trade-off after it where it cannot be mistaken for
part of the heading.

**The current H1 appears once inside the form, in the fourth option**, verbatim,
on the same terms. Do not repeat it under each candidate for comparison — it is
already above the form.

The fourth option is always **keep the current H1**, with its length in the
label. It won four times out of eight in calibration.

The three must differ in *shape*, not in wording. Three candidates that all
state a mechanism are one candidate typed three times. Vary at least two of:

- which of the four tails it uses — plain promise, corrected assumption,
  mechanism, scope with fit
- whether a figure appears, and whether it is the winner's or the category's
  spread
- whether the count or the price range survives
- whether it reframes to what the reader already owns

`AskUserQuestion` supplies "Other" on its own, so the user can dictate a fourth
heading without you offering one.

### 4. Apply with `Edit`

Never a script. `fix-page`'s section on scripted edits to shared files records
what a regex did to `lib/test-pages.ts` on 2026-08-06.

Which file depends on how the page is built, and **both may need it**:

| Page renders | Edit | And |
|---|---|---|
| `{TEST_PAGE.title}` | `title` in `lib/test-pages.ts` | nothing — one string feeds both |
| A hardcoded literal | the `<h1>` in `app/{slug}/page.tsx` | `title` in `lib/test-pages.ts`, to the same string |
| A category page | the `<h1>` in `app/{slug}/page.tsx` | `metadata.title` in the same file, to the same string |

The last two rows are the drift fix, and it is not optional. Leaving the title
behind is what produced the nine.

`lib/test-pages.ts` is shared and long. Match on the surrounding `slug:` line,
never on the title text alone — several titles differ only in the tail.

The H1 is JSX: expect `{" "}` at line ends, `&nbsp;` inside prices and
prettier's wrapping. Read the literal lines and match those.

### 5. Verify

```bash
pnpm typecheck
pnpm check:emdash
pnpm check:refs
pnpm check:fraser
```

`check:refs` because `lib/test-pages.ts` was touched. `check:fraser` last — a
rule you have just applied is the one you break in the replacement.

An H1 change is phrasing, so `UPDATED` and `updated` stay put. If you corrected
a **count** while you were there, that is a factual change and both dates move
together or `check:refs` fells the build.

## The calibration run, 2026-08-07

Eight pages, Peter choosing. This is the evidence the rules above are drawn
from; when a new case is genuinely unlike all eight, ask rather than extrapolate.

| Page | Was | Became |
|---|---|---|
| `/smartwatch` | `elva klockor från 2 972 till 9 294 kr` | `tolv dagar mellan laddningarna, eller ett dygn` |
| `/smart-belysning` | `Bäst i test smart belysning 2026` | `Smart belysning bäst i test 2026: dimringen är där de billiga lamporna blinkar` |
| `/iphone-skal` | `tolv skyddsskal till iPhone 17, från 99 till 1 099 kr` | `tolv skal till iPhone 17, från 99 till 1 099 kr` |
| `/galaxy-s26-skal` | `tolv skyddsskal till Samsung Galaxy S26, från 159 till 779 kr` | `tolv skal från 159 till 779 kr` |
| `/brandslackare` | `vilken du ska ha hemma` | **kept**, over `55A eller 43A, och vad siffran betyder` |
| `/dorr-och-fonstersensor` | `hubben avgör, inte sensorn` | **kept**, over three rewrites without the negation |
| `/rorelsevakt-utomhus` | `vad den faktiskt ser` | **kept**, over `12 meter på tvären, 3 meter rakt emot` |
| `/garageportsoppnare` | `fem motorer till villagaraget` | **kept**; the title's `sex motorer` was the error |

Read the keeps as carefully as the changes. Three of the four were headings a
generic quality pass would have called vague, and the fourth was the site's own
measured prose tic.

### The category run, same day

All five, and **all five changed** — the only page type where nothing was kept.

| Page | Was | Became |
|---|---|---|
| `/kok` | `Kök` | `Bäst i test 2026 köksapparater: åtta jämförelser` |
| `/smart-hem` | `Smart hem: så väljer du rätt produkter` | `Bäst i test 2026 smart hem: åtta jämförelser` |
| `/elektronik` | `Elektronik` | `Bäst i test 2026 laddare, powerbanks och mobilskal: 15 jämförelser` |
| `/sakerhet` | `Säkerhet i hemmet` | `Bäst i test 2026 brandvarnare, hemlarm och kodlås: 21 jämförelser` |
| `/hem-hushall` | `Hem & hushåll` | `Bäst i test 2026 luftrenare, avfuktare och robotdammsugare: 10 jämförelser` |

The split that decided rows one and two against rows three to five is whether
the collective noun is a phrase people type. `smart hem` and `köksapparater`
survived; `elektronik`, `säkerhet i hemmet` and `hem & hushåll` were replaced by
product names. `/smart-hem` is the proof it is not a rule about bare nouns: it
already had a written tail and still lost it, because `så väljer du rätt
produkter` is not a keyword and the count is.

## Gates

1. **Never deploys.**
2. **Never pushes.**
3. **Commits only the pages it rewrote**, named by path. Never `git add .` —
   another session's work is in this tree. `lib/test-pages.ts` is shared; check
   `git status --porcelain` before including it, and if another session has it
   open, leave the change in the tree and say so.
4. **Never rewrites `metadata.description`.** Skill `fix-meta-descriptions` owns
   it. Changing the H1's word order does change what that skill should write,
   so say which pages now need a snippet pass; do not do it here.
