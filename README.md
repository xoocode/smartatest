# smartatest.se

Swedish comparison site for smart home, home security and household products.
50 live test pages, 34 interactive tools, Next.js on Vercel.

---

## What the site is

**smartatest.se answers one question: which one should I buy?**

Swedish shoppers search *"bäst i test"* before spending money on a doorbell
camera, a dehumidifier or a fire ladder. What they usually find is a page that
ranks whatever the writer earns most on, or a wall of specifications copied off
the manufacturer's own product sheet. We built the alternative.

### We do not run a laboratory, and we say so

Nobody here has weighed a vacuum cleaner or held a stopwatch to a baby monitor.
What we do instead is read **every independent test that exists** — Råd & Rön,
Stiftung Warentest, Which?, Tekniikan Maailma and the rest — reconcile what they
found, and combine it with what manufacturers publish in their manuals, their
CE filings and their energy-label registrations.

Then we publish the weighting. Every test page states the criteria it ranks on,
what each is worth as a percentage, and why. Every figure in the tables is
sourced and dated. If two sources disagree, the page says so.

**We never claim to have measured anything ourselves.** That model is the
product, not a limitation we hide.

### What that gets you

- **A ranking you can argue with.** The weighting is on the page. Disagree with
  it, and you can see exactly which criterion moved a product up or down.
- **The number that actually applies.** Box figures are measured under flattering
  conditions. A stick vacuum rated 80 minutes runs 11 with the brush spinning; a
  baby monitor rated 300 metres means 300 metres across an empty field. The
  pages say which is which, and the tools do the arithmetic for your home.
- **The thing the seller left out.** Most of what matters sits in a manual
  nobody opens. That a fire ladder may be deployed exactly once and thrown away
  afterwards. That switching on a baby monitor's "zero radiation" mode disables
  its out-of-range alarm. We open the manuals.
- **Mistakes, published.** When we get something wrong we correct it, date it
  and explain what changed, at **/rattelser**. Corrections that changed a ranking
  say so.

### How it is paid for

Affiliate links: buy through the site and a retailer may pay us a commission,
at no cost to you. It never buys a placement. Rankings are set before any
retailer is chosen, prices are read from the shop's own page, and the
disclosure is on every page carrying a link.

---

## Developer overview

### Stack

| | |
|---|---|
| Framework | Next.js 16.2 (App Router, RSC) · React 19.2 |
| Language | TypeScript, strict |
| Styling | Tailwind + shadcn/ui (`components.json`) |
| Content | MDX for buying guides, TS modules for everything else |
| Hosting | Vercel. The `.se` domain is registered through HostUp |
| Package manager | pnpm |

Content is Swedish. Code, comments and documentation are English.

### Layout

```
app/{slug}/page.tsx        one route per test page, composed from components
app/guider/{slug}          interactive tools
content/{slug}/kopguide.mdx buying guide prose
components/                105 components: product, tools, site, ui
lib/                       all data and logic (below)
scripts/                   check suite, fetch ladder, image pipeline
public/bilder/{slug}/      packshots, optimised at build
.claude/                   the rules: context/, references/, skills/
.agent/                    research notes, plans, build logs
```

### How a test page is assembled

Four files, each with one job:

1. **`lib/catalog.ts`** — the page exists. Slug, label, category, `status`,
   `updated`. Feeds navigation and the sitemap.
2. **`lib/test-pages.ts`** — how it is judged. Criteria, weights summing to 100,
   scale descriptions, methodology.
3. **`lib/data/{slug}.ts`** — what is judged. Products with per-criterion
   scores, prices, specs, sources, verdicts, FAQ.
4. **`app/{slug}/page.tsx`** — how it renders, plus
   `content/{slug}/kopguide.mdx` for the guide.

Scores are **derived, never stored**. `resolveProducts` in `lib/products.ts`
computes each product's rating from its criterion scores and the page's
weights, then sorts. Change a weight and the ranking recomputes. Ties fall back
to array order, so check sorted output rather than rounded scores.

Supporting modules: `sources.ts` (every cited URL), `tools.ts` +
`tool-logic/` (the 34 calculators), `corrections.ts` (feeds `/rattelser`),
`links.ts` (all outbound links; `LINK_MODE` decides tracked vs direct —
read the constant, not the docs), `spec-schema.mjs` (allowed spec labels).

### Commands

```bash
pnpm dev            # a server is kept on :3000
pnpm build
pnpm check          # tsc + eslint + 13 editorial checks; run after any multi-file change
pnpm typecheck
```

`pnpm check` chains `tsc` first, so one broken line anywhere hides every check
after it. Individual checks run standalone:

| Check | Fails when |
|---|---|
| `check:tackning` | spec rows invisible, under 50 % filled, or fragmented |
| `check:omdomen` | single-block verdicts, superlatives repeating the award |
| `check:redovisning` | a criterion scores whether a fact was *published* |
| `check:avdrag` | a scale rung deducts for a *missing* figure |
| `check:refs` | `UPDATED` and the catalog `updated` disagree |
| `check:priser` `check:lankar` `check:bilder` | stale prices, dead links, missing packshots |
| `check:emdash` `check:lackor` `check:fraser` | prose tells: em dashes, AI tics, worn phrases |

Also: `pnpm priskoll` (price sweep), `pnpm sprak "<phrase>"` (corpus check),
`node scripts/fetch.mjs <url> --find "a,b"` (curl → r.jina.ai → Playwright
escalation, `--gtin` for Icecat, PDF extraction).

### Editorial rules that are enforced, not advisory

- **A criterion may never score whether a fact was published.** It ranks the
  seller's paperwork, not the goods. `check:redovisning`.
- **A missing figure may never reduce a score.** A fact we failed to find is our
  research gap, not the product's defect. `check:avdrag`.
- **Never state or imply we measured anything.**
- Reader-facing prose describes the product, never the source's behaviour.

### Working in this repo

`CLAUDE.md` is a router, not a manual. It points at `.claude/context/` for
department rules (research, data, money, build, seo, ship, traps) and
`.claude/skills/` for the three page workflows: `new-page`, `fix-page`,
`update-pages`.

**This file is a summary, not a source.** Everything below is stated properly
in `.claude/context/`; where the two disagree, that is a bug in this file. Read
the code or the context file before relying on a detail here — `money.md`
described the outbound-link mode wrongly for weeks and cost a build an
afternoon.

Hard gates:

- **Never deploy automatically.** Only on explicit instruction.
- **Never write working files to the project root.** They go in `.agent/`.
- **Never set `status: "live"`** before a page is genuinely publishable — a
  planned page in the sitemap feeds Google 404s.
