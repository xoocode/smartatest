# Where a new rule belongs

Read when a session has produced something worth keeping: a correction, a
preference, a trap, a decision. `/calibrate` reaches step 2 and asks where the
fix goes. This is the answer for this repo.

**The default gravity is wrong.** `CLAUDE.md` is the easiest place to put
anything, which is how it grew to duplicate three other documents and load 57
lines on every session before it was rebuilt. Assume the answer is *not*
`CLAUDE.md` until the last question rules everything else out.

---

## The five questions, in order

### 1. Can a machine settle it?

If the rule can be expressed as a pattern in text or a check over the tree, it
becomes a script in `scripts/` and a line in `pnpm check`. Not a paragraph
anywhere.

A rule in prose is a rule someone has to remember. A rule in `pnpm check` is a
rule that cannot be forgotten, and it fails at the moment it is broken rather
than at review. `check:refs` catches a silent failure that `tsc`, `lint` and
`build` all stay quiet about; that is the standard to aim at.

Worked example: *a new tool needs four registrations and one fails silently*
lived as a memory for weeks and broke twice. It is a script.

### 2. Is it durable truth about how this site works?

Then it belongs to a department, and each owns one thing:

| It concerns | File |
|---|---|
| Competitors, tests, products, search intent | @research.md |
| Prices, specs, images, ratings, the data model | @data.md |
| Programmes, merchant links, PPC | @money.md |
| Components, tools, what may be built | @build.md |
| Schema, sitemap, dates, citation | @seo.md |
| Checks, the quality bar, deploy | @ship.md |
| A framework behaviour that surprised us | @traps.md |

If it fits two, it belongs in one and is referenced from the other. Two copies
drift, and the drift is discovered by someone acting on the stale one.

### 3. Is it about writing Swedish?

Then it goes to the `swedish-voice` skill, and *which file* matters:

- A hard boundary, legal or commercial → `references/boundaries.md`
- A measurement against the corpus → `references/measurements.md`
- A ruling from Peter, **with the reasoning** → `references/rulings.md`
- Something about the writer's stance or the reader → `references/who-you-are.md`
  or `references/who-reads.md`

Before writing any of it, read `references/method.md`. No language rule enters
this repo on the strength of the assistant's ear, and the test for whether it
belongs here at all rather than in a global skill is in that file.

### 4. Is it about how Peter works, or what he has decided?

Then it is a memory, not a guidance file. Preferences, working style, standing
decisions about scope.

A memory that describes the code's behaviour is a department file that landed
in the wrong place. A memory that describes a judgement is correctly placed.

### 5. Is it true for every task, whatever the work?

Only then `CLAUDE.md`, and it has to earn its line against everything else that
loads on every session. In practice this is limited to gates that are cheap to
follow and expensive to miss: deploying, writing to the repo root, flipping a
a test page live.

If you cannot say which task it would *not* apply to, look again at questions 1
to 4 before adding it here.

---

## Also worth doing at calibrate time

- A rule that turned out to be wrong gets **deleted**, not softened. A hedged
  rule reads as a live rule and costs the same to follow.
- A memory that has become a department file gets removed from `MEMORY.md`.
- If a department file has grown past roughly 200 lines, ask whether half of it
  is a sub-reference that should load separately, the way @traps.md split out
  of @build.md.

`/doctor-plus` audits the whole context against the six shifts and is the right
tool when the question is "has this drifted", rather than "where does this one
finding go".
