---
name: fix-meta-descriptions
description: Rewrite the search-result snippet for a page on smartatest.se so it leads with the phrase buyers actually type, carries the category's synonyms and ends on a crisp call to action. Takes no argument for all three page types, or a page type, a category key, a slug, or `auto` to run without stopping — test-page, category and tool each have their own keyword shape, and tools take no "bäst i test" and no year. Works one page at a time and confirms each rewrite before moving on. Use when asked to fix, rewrite or improve meta descriptions, SERP snippets or search descriptions.
---

# Rewrite the meta descriptions

The search-result snippet, and nothing else on the page. Which field that is
depends on the type: `description` in `export const metadata` for test pages
and categories, `metaDescription` in `lib/tools.ts` for tools.

Measured 2026-08-07, across all 76 pages that have one:

| | |
|---|---|
| Average length | 223 characters |
| Range | 61 to 318 |
| In the 120–150 band | **0** |
| Opening with the search phrase | **0** |
| Carrying a call to action | **0** |

They are good sentences. They are the wrong shape for a search result: the
phrase a buyer types is missing, and nothing asks for the click.

## The argument

**The grammar is shared across the four page-run skills and lives in
`.claude/references/page-runs.md`.** Read it. It covers how a bare word
resolves, why a near match is never guessed, and what `auto` does and does not
loosen.

```
/fix-meta-descriptions                 all three types, test pages first
/fix-meta-descriptions test-page       one type
/fix-meta-descriptions robotdammsugare one page
/fix-meta-descriptions sakerhet        one category's test pages
/fix-meta-descriptions test-page auto  a type, no questions
```

| Type | Pages | Field | Section |
|---|---|---|---|
| `test-page` | 63 | `description` in `app/{slug}/page.tsx` | below |
| `category` | 5 | `description` in `app/{slug}/page.tsx` | "Categories" |
| `tool` | 27 + `/guider` | `metaDescription` in `lib/tools.ts` | "Tools" |

A **category key** and the **`category` page type** are different arguments and
this is the one place in the four skills where they collide. `sakerhet` is a
category key and selects the 21 test pages inside that hub. `category` is a page
type and selects the five hub pages themselves. Resolution order settles it —
page type first — but say back in one line which reading you took before you
start, because the two runs share no pages at all.

The static pages — `/om-oss`, `/annonsmarkning`, `/integritetspolicy`,
`/kontakt`, `/sa-testar-vi`, `/rattelser`, `/ordlista`, `/sok` — are **not a
type and never will be.** A call to action on the privacy policy is wrong, and
there is no search phrase to lead with. Leave them.

Every section shares "The line you may not cross", "What fails" and "The loop".
The four requirements are different per type and each section states its own.
**Do not carry the test-page formula into another type.** The single most likely
failure in this whole job is a tool description that opens
`Bäst i test lumenräknare 2026`.

## Read first

| Before you | Read |
|---|---|
| Write a single sentence | Skill `swedish-voice`, plus `references/writing-guide.md` and `references/boundaries.md` |
| Pick a synonym | `.claude/context/research.md` |
| Wonder what a page type is called | `.claude/references/page-anatomy.md` |

## The line you may not cross

`boundaries.md` is categorical: **we prove nothing physically.** That governs
the call to action more than anything else here.

The category phrase and the claim of ownership are different things.
`bäst i test brandvarnare 2026` is what the market searches for and already
stands in every H1 — use it freely. `vårt test`, `testet hos oss`,
`vi testade`, `så testade vi` attribute a test to us. Those are out, and on a
published site that is marketing law rather than tone.

| Out | In |
|---|---|
| Läs testet hos oss | Läs hela jämförelsen |
| Se vårt test | Se vinnaren här |
| Vi testade tio varnare | Tio varnare jämförda |

`Se vinnaren här` passes. The winner is our ranking, not a measurement.

## `test-page` — what a description has to do

Four requirements, in the order you fill them.

**1. The search phrase, first.** Word order follows the page's own `title`. If
the H1 reads `Bäst i test smart belysning 2026`, write that. If it reads
`Brandvarnare bäst i test 2026`, write that. The two must agree — a snippet
that reorders its own H1 looks like a different page. The year is always there.

**2. One broader search word.** `jämförda`, `jämförelse`, `köpguide`, `test`.
One, not three. `jämförda` usually solves itself in the same clause as the
count: `åtta luftrenare jämförda`.

**3. One synonym or variant of the topic.** `robotdammsugare` → `städrobot`,
`robotdammsugare med mopp`. `airfryer` → `varmluftsfritös`.
`kolmonoxidvarnare` → `CO-varnare`. It must be a **category name someone shops
on**, never a concept — `boundaries.md`, "Kategorinamn, inte konceptnamn".
Nobody searches for `smart`.

**4. A crisp call to action.** Information-bearing when it fits
(`Se vad filtret kostar per år`), short and direct when it does not
(`Se vinnaren här`, `Se hela jämförelsen`, `Se vilka som föll`).

**Read the call to action back against the lure before you offer it.** It is
the last thing written and the least reread, and two of the first twenty-six
pages needed a correction there and nowhere else:

| Lure | Wrong | Right | Why |
|---|---|---|---|
| `En 25-litersapparat tar 10,7 liter vid 20 grader.` | `Se vilka.` | `Se vilken.` | The lure set up one apparat, so the plural has nothing to refer back to |
| `Fem av åtta provade spred bakterier i rummet.` | `Se vilken teknik som slipper det.` | `Se vilken teknik som håller dem kvar i filtret.` | A technology is not *spared* something; `slippa` needs a subject that can suffer |

Both classes are the same mistake: the call to action was written to sound
crisp rather than to follow the sentence in front of it. Check that its number
agrees with the lure's, that every `det`, `den` and `dem` has something to point
at, and that the verb can take the subject you gave it.

Between 3 and 4 sits **the lure**: the page's single strongest finding. It is
usually already in the `title` after the colon — `sugkraften på kartongen är
reklam`, `fyra av tjugo klarade inte ozongränsen`. Take it from there and
rewrite it, so the title and the snippet are not word for word identical.

### The price is a floor, never a range

`från 2 290 kr`. Never `2 290 till 14 890 kr`, and never öre.

**Round to the nearest krona.** 99,90 becomes `100 kr`, 39,40 becomes `39 kr`.
Landing a krona below the real cheapest is fine and needs no hedge; what is not
fine is `99,90` in a search result, because four characters of öre buy nothing
and cost the lure a word.

The top of the range is the weakest thing that can occupy those characters. It
answers a question nobody typing `bäst i test airfryer` is asking, it is the
first number to go stale, and it makes the category look expensive at the exact
moment you want the reader to click. The floor does the opposite work: it is the
lowest true price, it reads as an invitation, and it costs eight characters less.

Decided 2026-08-07 by Peter, mid-run, after twenty pages. It replaced *"vary
whether the price range appears at all, and whether it is a range or a floor"*,
which had been one of the four things candidates were told to vary. **It is no
longer a variable.** The three candidates on a page now differ on the lure and
the call to action, and carry the same floor.

A price clause is still optional. `/espressomaskin` and `/hemlarm` carry none,
because on those pages the figures in the lure are doing better work than a floor
would.

### The budget, and why the winner loses

The prefix costs 31 to 35 characters. Synonym plus `jämförda`/`jämförelse`
about 25. The call to action 15 to 20. That leaves **around 60 characters for
the lure** — one sentence.

`Dreame Aqua10 Ultra Roller` alone is 26 characters, almost half of it. So:

**Priority when it will not all fit:** search phrase → call to action → lure →
synonym → price range. The keyword is what earns the visit; the winner's name is
what the page delivers once they arrive.

### The winner's name does not go in the description

Not "goes last" and not "drops if it will not fit". **It does not go in, and a
candidate that names it is not offered.**

This was a trade-off in the priority list until 2026-08-07, when the first
twelve pages of the run were decided one at a time with a winner-named candidate
on the table every time. Peter picked it **zero times out of eleven**, including
on `/robotdammsugare` and `/dorr-och-fonstersensor`, where the winning candidate
carried the winner's own reason with the name lifted out — *"En enda mopp sköljs
ren medan roboten kör"*, *"Bästa sensorn är 35 mm och håller tre år"*. The one
page kept unchanged that day, `/blender`, was the page whose existing
description opened on a product name.

The reason it loses is not length. A product name is the one thing in the
sentence that **nobody is searching for and that the page will tell them
anyway.** `Melitta Barista T Smart` earns no impression; `espressomaskin bäst i
test` earns the impression and the name is on screen two seconds later.

So the winner's *reason* is excellent lure material and its *name* is not. Write
the property, the figure or the claim that won it, and let the call to action
point at it: `Se vilken det är`, `Se vinnaren här`.

Everything else in the shape stayed genuinely open across the same twelve pages
— price range against price floor split 6 to 5, and short call to action against
information-bearing split 6 to 5. **Those two keep varying. This one does not.**

### Length

120 to 150 characters, as a guide. No script enforces it and none should.
Under 120 reads thin. Over 160 pushes the lure past where a phone truncates.

`app/layout.tsx` sets `max-snippet: -1` on purpose, so Google *may* render the
whole paragraph and AI overviews may quote it. That is why this is a
front-loading rule and not a truncation rule: the first 150 characters have to
work alone, and anything after them is a bonus, never the argument.

## Worked examples

All six ran 135 to 142 characters. **Every prefix below is that page's real
`title`, checked against `lib/test-pages.ts`** — see the warning under the list.

> Robotdammsugare bäst i test 2026: sju städrobotar med mopp jämförda från 2 290 kr. En enda mopp sköljs ren medan roboten kör. Se vilken det är.

> Luftrenare bäst i test 2026: åtta luftrenare med HEPA-filter jämförda från 599 kr. Fyra av tjugo klarade inte ozongränsen. Se vilka.

> Brandvarnare bäst i test 2026: jämförelse och köpguide för seriekopplade varnare från 139 kr. Sju av tio larmar var för sig. Se vinnaren.

> Kolmonoxidvarnare bäst i test 2026: jämförelse av CO-varnare för hem och husvagn. Del 1 eller del 2 av EN 50291 avgör. Se vilken du behöver.

> Hemlarm bäst i test 2026: åtta larm med larmcentral jämförda, från 349 kr i månaden. Hälften skriver ut priset. Se vad de kostar på fem år.

> Fönsterputsrobot bäst i test 2026: sju fönsterputsare jämförda från 2 190 kr. Minsta rutan någon klarar mäter 22 × 25 cm. Se vinnaren här.

### Do not copy the word order out of an example

Five of these six read `Bäst i test {kategori} 2026` until 2026-08-07, and all
five were wrong for the page they named. The site's real distribution, counted
in `lib/test-pages.ts`: **43 of 48 titles are `{Kategori} bäst i test 2026`**,
and the five exceptions are `/smart-belysning`, `/smart-plug`, `/smartwatch`,
`/dorr-och-fonstersensor` and `/fonsterlarm`.

An example list is where a rule goes to die. Requirement 1 says the prefix
follows the page's own `title`, so the prefix is something you **read out of
`lib/test-pages.ts` for the page in front of you**, every time. Copying it from
the nearest example is how the snippet ends up reordering its own H1, which is
the exact failure requirement 1 exists to prevent.

```bash
grep -A3 'slug: "{slug}"' lib/test-pages.ts | grep -A1 'title:'
```

**These are not a template.** Nine descriptions built to the same four beats in
the same order read as nine descriptions written by one machine, which is what
they would be. The requirements are the constraint; the sentence is yours. Vary
where the lure sits, vary what the lure is, and vary the call to action between
short-and-direct and information-bearing.

**The two that used to be on that list are not variables any more.** The price
is always a floor and the winner's name is never in the sentence — both settled
2026-08-07 and both written out above. A candidate that varies either of those
is not offered.

---

# Categories

Five pages: `/sakerhet` (21 test pages), `/elektronik` (15), `/hem-hushall`
(10), `/smart-hem` (8), `/kok` (8).

Those counts move whenever a page goes live. Read them from
`node scripts/h1-inventory.mjs category`, which prints the live count per hub
and flags every string whose number disagrees — never from this paragraph.

## What is wrong with them

Worse than the test pages, and wrong in a different way. All five are the same
sentence:

> Våra jämförelser av **X**. Vi läser **[källor]**, redovisar viktningen och
> **säger rakt ut** när ingen har testat något.

Three faults stacked. It is a visible template on five pages out of five.
`säger rakt ut` stands in three of them and is a measured offence — 10 in our
text, 0 in the reference corpus (`references/measurements.md`). And above all:
**they are about us.** The reader asked what is behind the link and was told how
we work. `who-reads.md` calls that the site's most expensive misordering.

They are also nearly empty of keywords. Nobody types "säkerhet i hemmet" or
"elektronik" into a search box.

## What a category description has to do

There is no single `{topic}`, so the test-page prefix cannot be copied. **The
keyword is the list of product categories instead.** Each name is a real search
term, and together they say what is behind the click — which solves the keyword
and the reader's question with the same words.

**1. `Bäst i test 2026`, once, first**, in a collective form: `Bäst i test 2026
för hemmets säkerhet`, `Bäst i test 2026 köksapparater`.

**2. Four or five product category names.** This is the whole keyword play, and
the part that must not be cut for length. `brandvarnare, hemlarm,
övervakningskameror, kodlås`.

**3. The count of comparisons, plus an angle only that hub has.** Prices, the
winners, what the expert bodies say, which protocols work together.

**4. A call to action pointing at choosing a comparison**, not a product. `Se
alla.`, `Välj din.`, `Se vilken maskin som vinner.`

### Worked examples

> Bäst i test 2026 för hemmets säkerhet: brandvarnare, hemlarm, övervakningskameror, kodlås och brandsläckare. 21 jämförelser med priser. Se alla.

> Bäst i test 2026 elektronik: powerbank, USB-C-laddare, kablar, mobilskal och skärmskydd. 15 jämförelser med priser och vinnare. Välj din.

> Bäst i test 2026 för hemmet: luftrenare, avfuktare, robotdammsugare och luftfuktare. Tio jämförelser, med det expertorganen säger. Se alla tio.

> Bäst i test 2026 smart hem: smart belysning, smarta uttag, hubbar och termostater. Åtta jämförelser, och vad Matter, Zigbee och Thread klarar ihop.

> Bäst i test 2026 köksapparater: airfryer, espressomaskin, blender, pizzaugn och fritös. Åtta jämförelser med priser. Se vilken maskin som vinner.

**Five is too few for a template to pass unnoticed.** They sit in the same
footer and the same menu, and a reader who follows two of them sees the seam.
Point 3 has to be genuinely different on each. The `blurb` fields in
`lib/catalog.ts` are the raw material — one per member test page, each already
written as a hook.

Two of the five above are still weaker than they should be. Improve them; do
not reuse them as they stand.

## The counts go stale, and that is the decision

`Se alla 21` is untrue the day after the next `new-page` run.

**Accept the drift.** Settled 2026-08-07. The count is the only figure in the
description and it is what makes an abstract hub concrete, so it stays. A
separate skill will re-sync the counts roughly every two months, and an agent
editing one of these pages for any other reason will usually catch it in
passing.

**So: do not "fix" this by removing the counts.** That trade was made
deliberately and reversing it silently costs the descriptions their only
concrete fact. If a count is wrong when you arrive, correct it and move on.

Read the current numbers before you write:

```bash
grep -n "category:" lib/test-pages.ts | sed 's/.*category: //' | sort | uniq -c
```

Note that this counts rows in `lib/test-pages.ts`; `status` lives in
`lib/catalog.ts`. A page that is not live must not be counted.

## Out of scope, worth knowing

`/smart-hem` is titled "Smart hem: så väljer du rätt produkter". `boundaries.md`
says nobody shops on the word "smart". The title is a separate job — do not
change it here — but the description must carry real category names regardless.

---

# Tools

27 tools in `lib/tools.ts`, plus the `/guider` hub.

## No `bäst i test`. No year.

The search intent is a different thing entirely. Nobody types "bäst i test
lumenräknare". They type *hur många lumen behöver jag*, *räkna ut lumen
vardagsrum*, *watt till lumen*. The query is informational and shaped like a
question.

The year does active harm here. A calculator is evergreen; `2026` in the snippet
makes it look stale in January 2027, and unlike a test page there is nothing to
update that would make it true again.

## What a tool description has to do

**1. The question, in the words someone types.** `Hur många lumen behöver
rummet?`, `Lönar sig en vattenfelsbrytare?`

**2. What you put in and what you get out.** This is the tool's unique value and
what makes the snippet worth trusting.

**3. A figure or an authority, where one exists.** `EN 50291`,
`Elsäkerhetsverket`, `10 procents rabatt hos Länsförsäkringar och Folksam`.
Roughly half the 27 already carry one; take it from `sections` or `intro`.

**4. A call to action in the tool's own verb.** The 27 fall into three shapes
and each takes its own family, otherwise all 27 end on `Räkna ut ditt behov`:

| Shape | Examples | Call to action |
|---|---|---|
| räknare | `lumenraknare`, `elkostnad-lampor`, `oljekostnad-fritos`, `aterbetalning-vattenfelsbrytare` | `Räkna ut ditt behov.` |
| väljare, three questions | `protokollvaljare-smart-hem`, `skaltypsvaljare`, `vattenlarmsvaljare`, `vilken-brandstege-passar` | `Svara på tre frågor.` |
| tabell or skala | `watt-till-lumen`, `fargtemperatur`, `co-halt-larmgrans` | `Se tabellen.` |

### Worked examples

> Hur många lumen behöver rummet? Ange yta och rumstyp, få ljusflödet och antal lampor för vardagsrum, kök, sovrum eller badrum. Räkna ut ditt behov.

> Vad kostar belysningen i el per år? Ange antal lampor, brinntid och elpris, så får du kronorna, inklusive det smarta lampor drar i viloläge.

> Lönar sig en vattenfelsbrytare? Länsförsäkringar och Folksam ger 10 procents rabatt på villaförsäkringen. Räkna ut hur många år den går ihop på.

> Vad motsvarar en 60-wattslampa i lumen? Omvandlingstabell från glödlampa till LED, så du vet vad du ska leta efter på förpackningen. Se tabellen.

> Behöver du en kolmonoxidvarnare? Ange vad du har i bostaden, så får du svaret och vilken del av EN 50291 varnaren måste vara provad enligt.

And the hub, which behaves like a category with no products in it:

> Räknare och guider för hemmet: lumen, elkostnad, brandskydd och vilket lås försäkringen godkänner. 27 verktyg, gratis och utan inloggning.

## Add the field, never touch `description`

The 27 existing `description` strings are **good as card text** — they say what
the tool does, which is what someone skimming `/guider` needs. They were only
ever failing because one field was doing two jobs.

So this run **adds `metaDescription` and leaves `description` alone.** Nothing
visible on the site changes, no schema changes, the search index does not
change, and a tool with no `metaDescription` keeps behaving exactly as before
(`app/guider/[slug]/page.tsx:35` falls back). It is the lowest-risk of the three
runs.

The confirmation rule still stands. Low risk is not no risk, and 27 snippets
written without a check between them is how the shapes above collapse into one.

`/guider` itself is an ordinary page — its description lives in
`app/guider/page.tsx`, not in `lib/tools.ts`.

---

# What fails

Inherited from `swedish-voice`. Nothing new here except the first row.

- `vårt test`, `testet hos oss`, `vi testade`, `vi provade` — the hard line
- `Läs mer`, `Se mer`, `Klicka här` — anyone selling the product could write
  the same sentence, which is the third question in `swedish-voice`
- `Vi jämförde…` as the opening. That is how we looked, not what we found.
  `Åtta jämförda` is scope and is fine
- `sidans`, `i jämförelsen` without a noun, `av de tolv` — the three measured
  offences in `references/measurements.md`
- em dashes — `pnpm check:emdash` catches them
- counts in letters (`sju robotar`), measurements and prices in digits
  (`2 290 kr`)
- `kr`, not `kronor`. Four characters every time, and this is the one field
  where four characters decide whether the call to action survives
- a stock claim, ever. `.claude/context/data.md`

## The loop

One page at a time. **Every page ends in an `AskUserQuestion` with three
candidates and the option to keep what is there.** This is the skill's own rule
and it does not lapse on a long run: page forty gets three written candidates
exactly like page one, and a run that quietly degrades into one-candidate prose
has stopped doing the job.

**Under `auto`, write the three candidates anyway and take the one you would
have put first — keeping the current description included.** Writing three is
not the courtesy part, it is the part that makes the alternatives exist before
one is picked, and it is what keeps 63 snippets from arriving in one rhythm.
That risk is higher without a user in the loop, not lower. Log the choice and
the two rejected, per page. See `.claude/references/page-runs.md`.

### 1. List the pages and their current state

```bash
node -e '
const fs=require("fs");
for(const d of fs.readdirSync("app",{withFileTypes:true}).filter(d=>d.isDirectory())){
  const p="app/"+d.name+"/page.tsx";
  if(!fs.existsSync(p))continue;
  const m=fs.readFileSync(p,"utf8").match(/export const metadata[\s\S]*?description:\s*([\s\S]*?)\n\s*alternates/);
  if(!m)continue;
  const t=m[1].trim().split("\n").map(l=>l.trim().replace(/^"|",?$/g,"")).join("");
  console.log(String(t.length).padStart(4)+"  "+d.name);
}'
```

Take the longest first. They carry the most slack and gain the most.

Skip anything another session has uncommitted — `git status --porcelain`.

For `tool`, list `lib/tools.ts` instead and take them in file order — there is
no length signal, since the field being added does not exist yet.

### 2. Read the page before you write

**Never carry a price, a count or any other figure over from the old
description without checking it against the source** — the old ones were
written months apart and the prices have moved.

| Type | Read |
|---|---|
| `test-page` | `title` in `lib/test-pages.ts` for the word order and usually the lure; `lib/data/{slug}.ts` for the count, the price range and the winner |
| `category` | `lib/catalog.ts` for the `blurb` fields, which are the raw material for point 3; the count command above for point 3's figure |
| `tool` | The tool's own `title`, `intro` and `sections` in `lib/tools.ts`. The authority for point 3 is almost always already in `sections` |

### 3. Write three, then ask

**Never a single candidate in prose.** Use `AskUserQuestion` with three written
descriptions plus a fourth option that keeps the current one. Then wait.

One candidate asks the user to approve or reject. Three ask the user to choose,
which is the cheaper question and the more useful answer: a rejection tells you
nothing about what was wrong, and a choice across 63 pages tells you what this
category should sound like. It also does something the prose loop cannot. The
warning under "Worked examples" is that nine descriptions built to the same four
beats in the same order read as one machine writing nine times — and that is
exactly what happens when you write one candidate per page and it gets approved
sixty-three times. **The variation has to exist before the user sees it.**

So the three must differ in *shape*, not in wording. Three candidates that all
run `prefix, count + synonym jämförda, price range, lure, CTA` are one candidate
typed three times. Vary at least two of:

- where the lure sits, and whether it is a figure or a claim
- which finding the lure takes, when the page has more than one
- whether a price floor appears at all
- the call to action: short and direct, or information-bearing

Two things that used to be on this list are now settled and must **not** vary
between the three: the winner is never named, and a price is always a floor and
never a range. See "The winner's name does not go in the description" and "The
price is a floor, never a range".

Fill the option fields like this:

| Field | What goes in it |
|---|---|
| `label` | A short handle for the lure, plus the character count: `Mjölkautomatiken, 145` |
| `description` | **The description itself, verbatim and whole**, then the trade-off after it |
| `preview` | Leave it unset |

**The sentence goes in `description`, never in `preview`.** This is the one
mechanical thing in the whole skill that is easy to get wrong, and it defeats
the question completely when you do.

`description` renders under the label for every option at once, which is the
only place the user can read three candidates against each other. `preview`
renders only for the option currently focused, in a side panel, and switches the
whole question to a side-by-side layout — so three candidates in `preview` are
three candidates the user has to arrow through one at a time to see at all. The
first version of this question did exactly that and Peter's answer was that the
description was "still not in the AskUserQuestion".

Length is not the constraint. These run 120 to 150 characters and `description`
takes far more, so quote the sentence in full, unwrapped, and put the reasoning
after it where it cannot be mistaken for part of the copy.

**Copy the string, never retype it.** You measured each candidate in a `node -e`
call; paste that exact string into `description`, and paste the same one into
`Edit` when it is chosen. Retyping produced `flyggänsen` for `flyggränsen` on
`/powerbank-20000` and `videdörrklockor` for `videodörrklockor` on
`/dorrklocka-med-kamera`, both on 2026-08-07, both inside two pages of each
other. The user is choosing between three sentences that differ by a few words,
so a silent character change means they approve one string and you apply
another, and the character count you showed them belongs to neither.

**The current description appears exactly once, in the fourth option**, on the
same terms: verbatim, in `description`. Do not repeat it under each candidate
for comparison. Four options each carrying the same 318 characters of old text
bury the three sentences the user is being asked to read.

The fourth option is always **keep the current description**, with its length in
the label. It is a real option and it wins sometimes: a short page whose
description already leads with the category name has less to gain than the run
average, and saying so is more useful than a rewrite for its own sake.

`AskUserQuestion` supplies "Other" on its own, so the user can dictate a fourth
sentence without you offering one.

### 4. Apply with `Edit`

`test-page` and `category`: the `description` in `export const metadata` in
`app/{slug}/page.tsx`. `tool`: a new `metaDescription` line in `lib/tools.ts`,
directly after that tool's `description`.

Use `Edit`, never a script. `fix-page`'s section on scripted edits to shared
files explains what a regex did to `lib/test-pages.ts` on 2026-08-06, and
`lib/tools.ts` is exactly the same kind of file: one long array of Swedish
strings, where any delimiter you might anchor on occurs hundreds of times.

### 5. Do not touch `pageOpenGraph()`

The share card already carries your sentence. `og:description` and
`twitter:description` are filled from `metadata.description` automatically, so
the helper needs no `description` argument and must not be given one. The Next
docs read as if the opposite were true, and the cost of acting on that is
recorded in `.claude/context/traps.md`, "Next.js" — read it before you touch
`lib/metadata.ts`.

For tools this flows through `generateMetadata`, so a `metaDescription` reaches
the share card too. That is wanted: a snippet written to be read cold is a
better card than one written for a grid.

**Check the rendered `<head>` before concluding anything about metadata.** Peter
keeps a dev server on port 3000; never start your own, and if it is down, stop
and ask.

```bash
curl -s http://localhost:3000/robotdammsugare | grep -o '<meta property="og:[^>]*>'
```

### 6. Verify

```bash
pnpm typecheck
pnpm check:emdash
pnpm check:fraser
```

`check:fraser` last, not first — a rule you have just applied is the one you
break in the replacement, and it only shows in a run at the end.

## Gates

1. **Never deploys.**
2. **Never pushes.**
3. **Commits only the pages it rewrote**, named by path. Never `git add .`.
   `lib/metadata.ts` is shared — check `git status --porcelain` before you
   include it, and if another session has it open, leave your change in the
   tree and say so.

## Why `tool` has two fields

`tool.description` is **visible card text** on `/guider` (line 73), and it also
feeds two schema blocks (`app/guider/[slug]/page.tsx:111` and `120`) and the
search index (`lib/search-index.ts:146`). One field was doing the snippet's job
and the card's job at once, and the two pull opposite ways: a card in a grid
wants a calm description, a snippet wants the question first and an imperative
last. `Se vinnaren här.` in the middle of a card list is what that looks like.

`metaDescription` was added 2026-08-07 to separate them. It is optional and
falls back, so a tool without one is unchanged.

**Do not fold them back together**, and do not rewrite `description` to look
like a snippet because it is the field you happened to open.
