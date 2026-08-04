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
| Competitors, tests, products, search intent | `.claude/context/research.md` |
| Prices, specs, images, ratings, `lib/data/*` | `.claude/context/data.md` |
| A spec cell you cannot fill | `.claude/references/spec-sourcing.md` |
| Affiliate programmes, merchant links, PPC | `.claude/context/money.md` |
| Components, tools, what may be built new | `.claude/context/build.md` |
| Schema, sitemap, dates, AI citation | `.claude/context/seo.md` |
| Checks, the quality bar, deploy | `.claude/context/ship.md` |
| Something renders wrong without erroring | `.claude/context/traps.md` |
| What a kind of page is called, and why a page is laid out as it is | `.claude/references/page-anatomy.md` |
| The design system | `/styleguide`, `.claude/references/brandbook.html` |
| Where a new rule or learning belongs | `.claude/context/routing.md` |

Project background, keyword data and per-test-page research live in `.agent/`.

## Gates

- **Never deploy automatically.** Only when explicitly asked.
  `git add . && git commit -am "…" && git push origin main && vercel --prod`
- **Never save files to the project root.** Working files go in `.agent/`, plans
  in `.agent/plans/`.
- **Never `status: "live"`** in `lib/catalog.ts` before the page is genuinely
  publishable. A planned test page in the sitemap feeds Google 404s.
- Align with AskUserQuestion before significant work, not after.
- Run `pnpm check` after multi-file changes. It is faster than reading the diff.
- Subagents only when asked for. The work here is sequential and research-heavy,
  and a subagent that re-derives a price from memory invents it.

## Notes

- This Next.js version differs from training data. Read
  `node_modules/next/dist/docs/` before writing framework code.
- `.se` domains go through HostUp, never Vercel or Cloudflare. Check
  availability via `whois.iis.se` port 43; DNS NXDOMAIN misses parked domains.
- Credentials in `C:\code\credentials\`: `adtraction/`, `hostup/`.
