# smartatest.se — Claude Code Instructions

## What this project is
Swedish comparison/testsieger affiliate site for **smart hem & säkerhet** products. Domain: `smartatest.se`. Deployment: Vercel. Registrar: HostUp.

**Read `.agent/plan.md` first** — full project plan, site scope, sub-categories to build, affiliate program supply, Google Ads strategy. Read `.agent/research.md` for the underlying keyword/vertical/program analysis.

## Reference sites (structure to model)
- https://gesundheitsvergleich-deutschland.de/blogs/produktratgeber/vitamind3k2-tropfen-testsieger — German testsieger format, aggressive PPC
- https://www.xn--kostnrd-e1a.se/kosttillskott/energidryck — Swedish single-product deep dive

## Deployment
- **Do NOT auto-deploy after changes.** Only deploy when explicitly asked.
- Deploy sequence: `git add . && git commit -am "message" && git push origin main && vercel --prod`

## Rules

### File organization
- **Never save files to the project root.** All working files, temporary outputs, drafts, and downloads go in `.agent/` with clear subfolder structure: `.agent/tmp/`, `.agent/drafts/`, etc.
- **Plan files** must be saved to `.agent/` with the prefix `plan-` and a descriptive name.

### Communication
- Use AskUserQuestion to align on requirements before doing significant work.

### Code quality
- Centralize components and shared logic. Before creating something new, check if a reusable version already exists.
- Do what has been asked; nothing more, nothing less.
- Do NOT use subagents (Task/TaskCreate) unless explicitly asked.

### Content language
Swedish. Follow the naturlig-svenska style (avoid AI-tells like em-dashes as glue, rule-of-three reflex, thread metaphors). **Write from inside the market, not about it**: "svensk text", "på svenska", "det svenska ordet för", "svensk handel" all mark the writer as an outsider describing Sweden. Inflections like "svenska hem" and "svensk vinter" are fine. Content targets purchase-intent queries — use product-category names (robotdammsugare, brandvarnare, övervakningskamera), NOT concept names ("smart hem"). Swedes don't shop by the word "smart".

## Credentials (in `C:\code\credentials\`)
- `adtraction/credentials.json` — affiliate network API (existing account)
- `hostup/credentials.json` — domain registrar + DNS API for `.se` domains

## Tech stack (planned — not yet scaffolded)
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- MDX for product-category content initially (add DB later if needed)
- Neon Postgres + Drizzle ORM if/when a DB is added
- Vercel deployment

## Debugging
- Run `tsc --noEmit` after multi-file TS changes.
- For .se domain availability checks, use `whois.iis.se` port 43 (not DNS NXDOMAIN — that misses parked domains).
- Vercel/Cloudflare cannot register `.se` — always via HostUp.
