# smartatest.se

Swedish comparison site for smart home and home security products, monetised by
affiliate links and purchase-intent traffic. Next.js 16 on Vercel, live with 25+
pages. Content is Swedish; code and these notes are English.

**The rule that shapes everything:** we do not run a laboratory. We read every
independent test, reconcile them, publish the weighting and cite every source.
Never write, imply, or leave standing any claim that we measured something
ourselves. That model is the product, not a limitation to hide.

## Where things are

| Working on | Read |
|---|---|
| Any sentence a visitor can see | Skill `swedish-voice` |
| A new test page, start to finish | Skill `new-page` |
| Lifting an existing page to the current standard | Skill `fix-page` |
| Competitors, tests, products, search intent | `.claude/context/research.md` |
| Prices, specs, images, ratings, `lib/data/*` | `.claude/context/data.md` |
| A spec cell you cannot fill | `.claude/references/spec-sourcing.md` |
| Affiliate programmes, merchant links, PPC | `.claude/context/money.md` |
| Components, tools, what may be built new | `.claude/context/build.md` |
| Schema, sitemap, dates, AI citation | `.claude/context/seo.md` |
| Checks, the quality bar, deploy | `.claude/context/ship.md` |
| Something renders wrong without erroring | `.claude/context/traps.md` |
| Writing that a price, spec or document is not published | `.claude/references/establishing-absence.md` |
| What a kind of page is called, and why a page is laid out as it is | `.claude/references/page-anatomy.md` |
| Running one edit across many pages: arguments, groups, `auto` | `.claude/references/page-runs.md` |
| The design system | `/styleguide`, `.claude/references/brandbook.html` |
| Where a new rule or learning belongs | `.claude/context/routing.md` |

Project background, keyword data and per-test-page research live in `.agent/`.

`README.md` introduces the site and the codebase to a human arriving at the
repo. It is **downstream of this file**: it summarises the stack, the four-file
page anatomy, the check suite and the gates, and it is the right thing to hand
someone new. It is never the source of a rule. Where it and `.claude/context/`
disagree, the context file is right and the README is stale — fix it there and
then. Do not add a rule to the README that does not already live in a context
file.

## Default: yes, and here is what it costs

The gates below are the only prohibitions. Everything else is a judgement call,
and the default on a judgement call is to find the way to yes and price it.

Worth naming because it is invisible: every failure this repo records is a false
positive. A wrong price, a borrowed test result, a variant mismatch. Each has a
story, a number and a warning written after it. **Nothing records the page we did
not build, the programme we did not apply to, or the product we dropped because
a shop rendered its price in JavaScript.** Those cost more and leave no trace, so
the written context tilts toward caution by roughly ten to one. Correct for it.

Before writing down a no, list the ways to yes and cost the cheapest one. An
obstacle that is *operational* — a price that moves, a shop that needs a browser,
a programme we have not joined, an empty spec cell, a component that does not
exist yet — is a task, not a verdict. State the size of the prize in the same
breath as the obstacle, so the trade is visible to the person whose money it is.
Worked example: `money.md`, "Default to yes, then engineer the path there".

This loosens nothing below. The gates, and the rule at the top of this file, are
not judgement calls: editorial integrity and irreversible actions stay hard.
Aligning on *scope* still comes first; this is about what is *possible*.

## Gates

- **Never deploy automatically.** Only when explicitly asked. The command lives
  once, in `.claude/context/ship.md`.
- **Never save files to the project root.** Working files go in `.agent/`, plans
  in `.agent/plans/`.
- **Never `status: "live"`** in `lib/catalog.ts` before the page is genuinely
  publishable. A planned test page in the sitemap feeds Google 404s.
- Align with AskUserQuestion before significant work, not after.
- Run `pnpm check` after multi-file changes. It is faster than reading the diff.
- Subagents only when asked for. The work here is sequential and research-heavy,
  and a subagent that re-derives a price from memory invents it.

## Notes

- `.se` domains go through HostUp, never Vercel or Cloudflare. Check
  availability via `whois.iis.se` port 43; DNS NXDOMAIN misses parked domains.
- Credentials in `C:\code\credentials\`: `adtraction/`, `hostup/`.

The Next.js rule — read the version-matched docs before writing framework code —
lives once, in `AGENTS.md`, which Next.js maintains and this line imports:

@AGENTS.md
