---
name: fix-ingress
description: Improve the opening paragraph of a test page on smartatest.se so its first sentence recommends the winner rather than ordering the reader to buy it. Takes no argument to walk every live test page, a slug for one page, a category key for a group, or `auto` to run without stopping. Offers the user three rewrites and a keep option per page, one page at a time. Use when asked to fix, improve or rewrite ingresses, opening paragraphs, leads or the text under the H1.
---

# Improve the ingresses

The `<p className="max-w-2xl text-lg text-muted-foreground">` under the H1 in
`app/{slug}/page.tsx`. Nothing else on the page.

This is an improvement pass, **not a linter.** It flags nothing and it has no
pass mark. It walks the pages in scope one at a time, shows what each one says
now, and offers the user a choice. A page whose ingress is already the best
sentence on the site still gets its turn, because the only judgement that counts
here is the user's and the cost of showing them a good one is four seconds.

## What is wrong today

Measured 2026-08-07, across the 63 live test pages in `lib/catalog.ts`:

| Opening | Pages |
|---|---|
| `Köp {produkt} för {pris} kronor.` | **20** |
| A verdict with no reason, `SONOFF TRVZB vinner.` | **9** |
| Product, price and a reason in the first sentence | 31 |
| `{produkt} är den {kategori} vi rekommenderar` | 3 |

The count of bare verdicts was 7 when this file was written and is 9 on a full
read: `/utomhustimer` names the product and stops, and `/inomhuskamera` opens on
Swedish camera law and does not reach a product until sentence five.

The twenty are the reason this skill exists. `Köp Tefal Versalio Deluxe för
1 112 kronor.` names a winner and a price, so it satisfies the rule in
`page-anatomy.md` on paper, and it is still an advertisement: a command anyone
selling the fryer could have written, spending the most valuable sentence on the
page without saying why.

The seven fail differently and cost the same. `SONOFF TRVZB vinner.` is 21
characters of assertion in the one paragraph the buyer is guaranteed to read.

## Read first

| Before you | Read |
|---|---|
| Write a single sentence | Skill `swedish-voice`, plus `references/writing-guide.md` and `references/boundaries.md` |
| Judge what belongs above the fold | `.claude/references/page-anatomy.md` |
| Take a price or a figure from anywhere | `.claude/context/data.md` |

## The argument

**The grammar is shared across the four page-run skills and lives in
`.claude/references/page-runs.md`.** Read it. It covers how a bare word
resolves, why a near match is never guessed, and what `auto` does and does not
loosen.

```
/fix-ingress                every live test page, worst first
/fix-ingress fritos         one page
/fix-ingress sakerhet       one category
/fix-ingress auto           the whole sweep, no questions
/fix-ingress sakerhet auto  a category, no questions
```

**Scope: test pages only.** There is no other type here — a category hub and a
tool have no ingress in this sense. `test-page` is accepted as a synonym for the
bare form; the other type words are an error, not an invitation.

Order, whenever the run covers more than one page: **worst first.** The twenty
`Köp {produkt} för {pris} kronor.` openings, then the seven bare verdicts, then
the rest.

⚠️ **`auto` fits this skill worst of the four.** Keeping the current ingress is
a first-class outcome here, and a machine that rewrites 63 opening sentences in
one pass produces 63 sentences with one rhythm — the exact failure the
`är den {kategori} vi rekommenderar` warning below is about. Use `auto` on a
category, read the result, and only then widen it.

## What the first sentence has to do

**1. Name the winner.** The product, not the category and not the finding.

**2. Say what it costs**, in digits, taken from the data file today and never
carried over from the sentence you are replacing. Prices move; the ingress you
are reading may be months old.

**Round to whole kronor. Never a decimal in the ingress.** `449,90` becomes
`450 kronor`, `1 098,90` becomes `1 099 kronor`, `99,50` becomes `100 kronor`.
Settled by Peter 2026-08-07. The öre are noise in the one sentence that has to
land in a second, they read as a shop's price tag rather than as our
recommendation, and they go stale faster than the krona does. This applies to
**every** price in the ingress paragraph, including the runner-up and the budget
pick further down it, not only the winner's.

The rounded figure is a reading of the exact price in `lib/data/{slug}.ts`,
which stays exact. Do not round the data file, the comparison table, the winner
card or `priceCaption` — the table is where a buyer checks the number before
paying, and 450 in the table where the shop charges 449,90 is a wrong price.
Round in prose, keep the data exact.

**3. Give the reason in the same sentence.** The single property that makes it
the one to buy, with its consequence attached where the consequence is not
obvious. This is the requirement the twenty imperative pages miss entirely.

**4. Recommend, do not order**, in the house form:

```
Vår testvinnare är {produkt} för {pris} kronor, eftersom den {skäl}.
```

Settled by Peter 2026-08-07, mid-run, in two steps. First the `eftersom`
construction replaced four competing shapes, under the opening
`Vi rekommenderar`; thirteen pages were converted. Four pages later he tried
`Vår testvinnare är` on `/smartwatch`, `/kompaktkamera`,
`/bluetooth-hogtalare` and `/galaxy-s26-fodral`, and settled on it as **the only
opening this skill may write from now on**. Do not offer `Vi rekommenderar`
again.

It ties the ingress to the award badge beside it, which says the same thing, and
it puts the product rather than us in the reader's first noun phrase.

**Do not backfill.** Peter was asked and said no, twice, the second time
unprompted while the conversion was being prepared. Twenty-six live pages carry
`Vi rekommenderar … eftersom den …` from the first half of the 2026-08-07 run,
and they stay: the argument in each was chosen deliberately, the reader sees one
page and not two, and a sweep that rewrites twenty-six openings to change four
words is churn against a diff nobody asked for. Both forms therefore exist on
the site, and that is the settled state rather than debt. Leave a page alone
until something else brings you to it.

**Why a single form, when the previous version of this file forbade exactly
that.** The earlier text warned that sixty pages sharing an opening is one
machine writing sixty ingresses. That warning was about `X är den {kategori} vi
rekommenderar`, a shape that names the product and stops. This one cannot stop:
`eftersom` is a subordinating conjunction, so the sentence is grammatically
unfinished until a reason arrives. The form that was banned made the reason
optional. This one makes it compulsory, and the reason is the thing that differs
on all 63 pages. Uniform frame, different substance in every instance.

Permitted variation inside the frame:

| Variation | When | Example |
|---|---|---|
| `eftersom den både … och …` | Two reasons where the second answers the objection the first raises | `… eftersom den både går 65 minuter i ekoläge med borsten igång och tar ett laddat batteri när de minuterna är slut.` |
| `eftersom {plural}` | The winner is a system or a multipack, so `den` has no referent | `… eftersom varnarna larmar ihop över egen radio utan hubben.` |
| An appositive before `eftersom` | The price needs its comparison attached to be read right | `Vår testvinnare är ABUS KeyGarage 787 för 490 kronor, en femtedel av det dyraste skåpet här, eftersom …` |

Two things the frame does not excuse. **The product is still the subject of the
consequence clause** — `så den startar långsamt i majonnäsen`, never `så du
startar långsamt`; the reader is the subject only when the consequence is
something they are spared. And **the reason still carries its own follow-through
where the number is not self-explanatory**; `eftersom den gör 688 Mbit/s` is a
specification, and specifications are already in the table.

## What fails

Inherited from `swedish-voice`. Nothing new except the first two rows.

- `Köp X för N kronor.` as the opening, and `Klicka`, `Beställ`, `Skaffa` for
  the same reason
- an opening on our method, our sourcing or what a manufacturer failed to
  publish — `/fonsterputsrobot` opened on *ingen tillverkare publicerar alla
  tre*, `/nyckelskap` on *alla fyra gick upp*
- in a security category, an opening on the catastrophe rather than the
  protection. `writing-guide.md`, *Rädsla är inget säljargument*
- `vi testade`, `vårt test`, `vi mätte`. We compared. `boundaries.md`
- `sidans billigaste`, `av de tolv`, `i jämförelsen` without a noun —
  `references/measurements.md`
- em dashes, which `pnpm check:emdash` fells
- a number with no consequence attached, where the consequence is not obvious
  to someone who does not know the category
- a stock claim, ever

## The loop

**One page at a time, and the user chooses every rewrite.** Never apply a batch,
never carry a decision from one page to the next, and never skip the question
because the answer looks obvious.

### 1. List the pages in scope and what they say now

```bash
node -e '
const fs=require("fs");
const f=process.argv[1]||"";
const src=fs.readFileSync("lib/catalog.ts","utf8");
const body=src.slice(src.indexOf("TEST_PAGE_INDEX"));
const re=/href:\s*"\/([a-z0-9-]+)",\s*\n\s*label:[\s\S]*?category:\s*([A-Z_]+),[\s\S]*?status:\s*"(live|planned)"/g;
const sel=/<h1[^>]*>[\s\S]*?<\/h1>[\s\S]{0,600}?<p className="max-w-2xl text-lg text-muted-foreground">([\s\S]*?)<\/p>/;
let m,n=0;
while((m=re.exec(body))){
  if(m[3]!=="live")continue;
  const [,slug,cat]=m;
  if(f&&f!==slug&&f.toUpperCase().replace(/-/g,"_")!==cat)continue;
  const p="app/"+slug+"/page.tsx";
  const mm=fs.existsSync(p)&&fs.readFileSync(p,"utf8").match(sel);
  if(!mm){console.log("  !!  "+slug+"  ingen ingress hittad");continue;}
  const t=mm[1].replace(/\{"\s*"\}/g," ").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
  console.log(slug+"  ["+cat+"]\n    "+t.split(/(?<=\.)\s/)[0]);
  n++;
}
console.log("\n"+n+" sidor");' "$ARG"
```

The regex is scoped to `TEST_PAGE_INDEX` on purpose. Started at the top of the
file it runs from a `Category` constant into the first page entry and reports
`/smart-hem` as a test page, which it is not.

Order: the twenty imperatives first, then the seven bare verdicts, then the
rest. They gain the most and they are the fastest to decide.

**Check `git status --porcelain` first.** This repo runs concurrent sessions —
on 2026-08-07 `/rorelsevakt-utomhus` had its whole product set swapped from
Steinel to ESYLUX while this skill was being written, between two reads four
minutes apart. Skip any page another session has uncommitted, and re-read the
page immediately before you edit it rather than trusting a listing from earlier
in the run.

### 2. Read the page before you write

The data file `lib/data/{slug}.ts` gives you today's price, the winner and the
property that won it. `lib/test-pages.ts` gives you the criteria and their
weights, which is where the *reason* comes from — the ingress should lead on
whatever the heaviest criterion actually measured.

Read the rest of the existing ingress too, not just the sentence you are
replacing. Sentence two often already holds the reason; then the fix is to
promote it, not to invent one, and the sentence it vacates has to go.

### 3. Offer the user four options

Use `AskUserQuestion`. One question per page.

**Under `auto`, skip the question and take the option you would have put first —
including `Behåll nuvarande` when that is the honest answer.** Still write all
three candidates out for yourself before choosing; the reason this skill offers
three angles is that the first one to mind is usually the flattest, and that is
as true with nobody watching. Log the choice and the two you rejected per page,
so the run is reviewable. See `.claude/references/page-runs.md`.

- **three rewrites that share the house frame and differ in the reason.** All
  three open `Vi rekommenderar {produkt} för {pris} kronor, eftersom den …`, and
  what follows `eftersom` is three genuinely different arguments for the same
  product — not three wordings of one. Lead one of them on the heaviest
  criterion; that is usually, not always, the right answer.
- **a fourth option that changes nothing**, always last, labelled
  `Behåll nuvarande`.

Do not offer a candidate that fails the frame. Before 2026-08-07 this skill
offered four competing constructions per page and Peter picked between them; the
result was thirteen pages in four shapes, which is what made him settle the
question. The choice is now about the argument, never about the grammar.

Fill the option fields like this:

| Field | What goes in it |
|---|---|
| `label` | A short handle for the angle, plus the sentence's character count |
| `description` | **The sentence itself, verbatim and whole**, then what it trades away |
| `preview` | Leave it unset |

**The sentence goes in `description`, never in `preview`.** This is the one
mechanical thing in the whole skill that is easy to get wrong, and it defeats
the question completely when you do.

`description` renders under the label for every option at once, which is the
only place three candidates can be read against each other. `preview` renders
only for the option currently focused, in a side panel, and switches the whole
question to a side-by-side layout — so three candidates in `preview` are three
candidates the user has to arrow through one at a time to see at all. This
skill's first version said `preview`; the identical instruction in
`fix-meta-descriptions` produced a question Peter answered with *"the exact meta
description is still not in AskUserQuestion"*, twice, before it was traced to
the field rather than to the copy.

Length is not the constraint. `description` holds far more than an opening
sentence, so quote it in full and put the reasoning after it, where it cannot be
mistaken for part of the copy.

**The current opening goes in the fourth option**, on the same terms: verbatim,
in `description`. Not in the question text, and never repeated under the three
rewrites — four options each carrying the same old paragraph bury the three
sentences the user is being asked to read.

The keep option is not a formality. On the 33 pages that already carry a reason
it is frequently the right answer, and a run where the user never picks it means
the options were framed as an obligation.

If the ingress runs to a second or third sentence that your rewrite would make
redundant, say so after the sentence in that option's `description` — the user
is choosing a paragraph, not a sentence.

### 4. Apply with `Edit`

Never a script. `fix-page`'s section on scripted edits to shared files records
what a regex did to `lib/test-pages.ts` on 2026-08-06.

The ingress is JSX, so the source rarely matches the text you rendered in the
listing. Expect `{" "}` at line ends, `&nbsp;` inside prices, `<strong>` around
the winner on four pages, and prettier's line wrapping. Read the literal lines
and match those.

### 5. Verify

```bash
pnpm typecheck
pnpm check:emdash
pnpm check:fraser
```

`check:fraser` last. A rule you have just applied is the one you break in the
replacement, and it only shows in a run at the end.

If the page's factual content changed rather than only its phrasing, `UPDATED`
and the `updated` in `lib/catalog.ts` both move, and `pnpm check:refs` fells the
build if only one of them does. Promoting a reason from sentence two is
phrasing. Correcting a stale price you found on the way is not.

## Gates

1. **Never deploys.**
2. **Never pushes.**
3. **Commits only the pages it rewrote**, named by path. Never `git add .` —
   another session's work is in this tree.
4. **Never rewrites `metadata.description`.** It is a search result rather than
   an opening paragraph, its imperative call to action is deliberate, and skill
   `fix-meta-descriptions` owns it. Editing both from here would put
   `Se vinnaren här.` where a paragraph belongs.
