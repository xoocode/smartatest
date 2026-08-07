# How a page-run skill takes its argument

Four skills walk the site page by page and change one thing on each:
`fix-ingress`, `fix-h1`, `fix-meta-descriptions`, `update-pages`. They share
this grammar so that knowing one is knowing all four.

**This file owns the grammar. The skills own the scope.** Each states which
pages it is eligible for and what a page-unit means to it; none of them restates
what is below. Four copies of a convention drift, and the drift is found by
whoever acts on the stale one.

## The grammar

```
/<skill>                     every eligible page, in the skill's own order
/<skill> {page-type}         every page of one type
/<skill> {category-key}      every live test page in one category
/<skill> {slug}              one page
/<skill> <any of the above> auto
```

`auto` is a suffix, never the whole argument on its own unless the run is
site-wide: `/<skill> auto` and `/<skill> sakerhet auto` are both valid.

### Resolving a bare word

In this order, first match wins:

1. **A page type** — `test-page`, `category`, `tool`, `utility`. Not every
   skill implements every type; the skill's own table says which.
2. **A category key** — the `Category` constants in `lib/catalog.ts`:
   `smart-hem`, `sakerhet`, `hem-hushall`, `elektronik`, `kok`.
3. **A slug** in `lib/catalog.ts`.
4. **Otherwise: stop and say the word did not resolve.**

⚠️ **Never guess a near match.** `sakerhet` mistyped is a 21-page sweep the user
did not ask for, and on a run with `auto` nobody sees it start. Print the word,
print the closest candidates, and wait.

A slug that is `planned` rather than `live` is still fair game **when the user
names it directly** — say it is not live and carry on. A group or a site-wide
run covers live pages only.

### Always

- **Skip pages another session has uncommitted** (`git status --porcelain`), and
  name them in the report. A shared file half-written by someone else is the one
  way these runs corrupt work that was not theirs.
- **Say the scope back in one line before the first page**: how many pages, in
  what order, and which were skipped. A run that opens by editing has already
  spent the user's chance to say "not that group".

## What `auto` means

`auto` removes the per-page question. **It does not remove any judgement.**

The trade is the one `fix-page` already makes: because nobody approved it in
advance, every consequential decision has to be reviewable afterwards. So an
`auto` run must end with a report that names, per page, what changed and why —
not a count.

`auto` never loosens these, on any of the four:

- **Never deploys, never pushes**, and commits only the paths it touched.
- **A decision the evidence cannot settle is parked, not guessed.** Collect it
  and report it. Scope, money, a ranking that would move, a safety figure where
  two tier-A sources disagree.
- **A page that needs nothing is left alone.** `auto` is not a quota.

### On the improvement passes, `auto` is a different animal

`fix-ingress`, `fix-h1` and `fix-meta-descriptions` are improvement passes where
**keeping the current text is a first-class outcome** — in the `fix-h1`
calibration on 2026-08-07, four of eight pages were kept. The user's judgement
is not overhead in those skills; it is the product.

So `auto` there means: write the rewrite you would have recommended, **and keep
the same bar for leaving a page alone.** An `auto` run that rewrote every page
it touched did not apply judgement, it applied a template — and a template is
visible on a site this small, which is the failure each of those three skills
exists to prevent.

`update-pages` is the exception and the reason `auto` is worth having: its
per-page decision is usually "the price moved, apply it", which evidence settles
on its own.
