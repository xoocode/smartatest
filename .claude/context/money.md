# Money

**Decides:** which merchant each product links to, how the link is built, and
which test pages are worth building next.

It never decides the ranking, the weights or the scores. Those follow the
weighting the user approved. Ranking a weaker product first because its shop
pays better is precisely what the AI-generated competitors do, and it is the
one thing our model cannot survive.

**Credentials:** `C:\code\credentials\adtraction\credentials.json`.
Registrar and DNS: `C:\code\credentials\hostup\credentials.json`.

---

## Default to yes, then engineer the path there

**Read this before the trap sections below, because they are longer than this
one and that asymmetry is deliberate to work against.**

This file spends five screens on how a programme can look real without being
usable. Every one of those warnings is correct and was paid for. But a reader
who absorbs only them ends up treating every obstacle as a verdict, and that
costs far more money than the traps ever did. The traps stop us publishing
something false. Timidity stops us publishing at all.

So: a supply obstacle is a **task with an owner**, not a disqualification. When
you find one, your job is to enumerate the ways to yes *before* you write down a
no. Usually there are three or four, and usually one is cheap.

### Things that are never a reason to drop a product or a merchant

| Obstacle | The actual move |
|---|---|
| **The price moves daily** | `scripts/priskoll.mjs` already runs nightly and exists precisely because prices move. Add the merchant to it. Or render "senast hämtat {datum}" for that shop. Or drop the price cell for that merchant and keep the product. The site has never required a price to be *stable*, only *dated* |
| **We are not in the programme yet** | Every page ships before the programme. Apply in parallel; the page does not wait |
| **The shop renders in JavaScript** | Shopify `/products.json`, the sitemap, the JSON-LD, the embedded state blob. A shop that "needs a browser" has usually just not been probed properly |
| **A spec cell is empty** | That is the gap pass, `.claude/references/spec-sourcing.md`. It is a work order |
| **A component does not support it** | Components get built. See @build.md. The data model bends to the category, not the other way round |
| **The programme's terms are unusual** | Read them and work out what they permit. Most terms forbid something narrow and allow the rest |

If your reason for excluding something is on that list, you have not found a
reason yet. Go back and cost the fix. A day of scripting against a 12 percent
programme is not a close call.

### What genuinely blocks

Short on purpose, and none of it is operational:

- A measurement we did not make, or one attributed to the wrong tester.
- A price we cannot establish **at all**, as opposed to one that changes.
- Ranking, weights or scores moved by what a merchant pays.
- A product that is not actually for sale in Sweden.

Everything else is engineering, and engineering is what we are here to do.

### Say what it is worth before you say it is hard

When you report an obstacle, report the size of the prize in the same breath. "A
12 percent programme, and the price needs a nightly fetch" is a decision someone
can make. "The price moves daily so I left it out" hides the trade from the
person whose money it is.

And where the number that sizes the prize is behind a login or otherwise
unverified, that is a reason to **go and get it**, not a reason to shelve the
idea. An unknown commission is an open question, not a small one.

---

## The supply sweep

Runs in phase 1, before the questions to the user, because it decides which
merchant every product links to. Two searches, every test page, never skipped:

```
"{kategori} affiliate"          # svenska
"{category} affiliate program"  # engelska
```

That is literally all it took to surface a 10 % Levoit programme that no amount
of reading competitor HTML had revealed. `node scripts/sok.mjs --brand {namn}`
runs the whole brand sweep for you.

### Mine the competitors' outbound links first

They have already done this work. It costs one grep over HTML you fetched
during competitor research anyway.

```bash
grep -oE 'href="https?://[^"]+"' comp.html | sed 's/href="//;s/"$//' \
  | grep -EiC0 'adtraction|adrecord|awin|awin1|zenaps|tradedoubler|partner-ads|addrevenue|impact|pxf\.io|sjv\.io|prf\.hn|dpbolvw|anrdoezrs|kqzyfj|jdoqocy|tkqlhce|shareasale|prisjakt|pricerunner|utm_source=' \
  | sort -u
```

Read the parameters, not just the domain:

- `awin1.com/cread.php?awinmid=15605&awinaffid=773541` — `awinmid` names the
  **merchant**, so it names an advertiser worth applying to. `awinaffid` is the
  competitor's own publisher id.
- `utm_source=adtraction` on a shop URL means that shop runs an Adtraction
  programme even when your catalogue grep missed it.
- `pricerunner.se/…/gotostore/…/api_se_m3` is PriceRunner's paid click-out.
  Publishers using it are paid per click, not per sale, which is why their
  pages optimise for click volume rather than persuasion.

Two cautions from the robotdammsugare pass:

- **A brand mentioned in an article is not a brand linked from it.** The M3
  ROMO review was cited as evidence of a DJI affiliate link; the article
  contains zero `dji.com` links and monetises entirely through PriceRunner.
  Grep for the brand domain before believing it.
- **Money links are often injected with JavaScript.** bäst-i-test.se shows zero
  outbound money links in raw HTML while carrying Adrecord and Prisjakt in the
  page source. A zero means "look in the scripts", not "unmonetised".

### The ladder, cheapest check first

1. **`.agent/adtraction-se-katalog.json`** — 480 SE programmes, local, instant.
   Grep the brand and the retailer. Sanity-check your grep against a known hit
   (`kjell` returns Kjell & Company at 5 % / 30 d) so a zero means absence
   rather than a broken query.

   **Adtraction is where you start, not where you stop.** On the
   robotdammsugare pass the catalogue returned *inget program* for Roborock,
   iRobot, Ecovacs, Dreame, Tineco, Eufy and Shark. Every one of those brands
   runs a programme on another network: Roborock 4–8 % on Impact via
   `se.roborock.com`, SharkNinja on Awin via `sharkninja.se`, Neatsvor on
   Addrevenue. An absence in Adtraction is an absence in Adtraction.
2. **The brand's own site.** `/pages/affiliate`, `/pages/affiliates`,
   `/pages/partner`, then grep the footer:
   `href="[^"]*(affiliat|partner|samarbet|influenc|reseller)[^"]*"`.
3. **Partner-ads.** `partner-ads.com/{se,dk,no}/showprogram2.php?id=N` for a
   known id, plus `kategori-bolig-have-og-interioer.php` and
   `kategori-computer-og-elektronik.php` for all three markets.
4. **The shop's own tracking.** Grep raw HTML for
   `adtraction|adrecord|awin|tradedoubler|partner-ads|daisycon|impact|refersion|goaffpro|shareasale`.
   A shop that runs a programme carries the pixel.

### Six ways a programme looks real without being usable

Every one produced a confident wrong answer before it was checked.

| Trap | What it looked like | How to catch it |
|---|---|---|
| **Real but closed** | Levoit.no printed "Provisjon for salg: 10.00 %" | `PROGRAM CLOSED` sat two lines above. Read the whole page, not the number you searched for |
| **Real but wrong market** | The 10 % was `.no` | Try the same id on `/se/` and `/dk/`. An empty page means the programme is not yours |
| **Indexed but dead** | Google served `levoit.se/collections/luftrenare` | `levoit.se` has no A-record. Resolve every domain over DoH before believing a search result |
| **Fake outlet** | `levoit.com.se`, "Levoit Officiella Outlet i Sverige" | Not on Shopify's IP, TLS fails. Check what the real store runs on and compare |
| **Brand site, not shop** | `klarstein.com` returns 200 | It sells nothing and points visitors elsewhere. A 200 is not a storefront |
| **JS-rendered catalogue** | Ozoneair "kräver Playwright" | It was Shopify. `/products.json?limit=250` gave 30 products, prices, stock and descriptions in one call |

**The Shopify trick earns its own line.** Any Shopify store exposes
`/products.json?limit=250`, `/products/{handle}.json` and a real `sitemap.xml`.
That closes most "requires a browser" items for free. The single-product
endpoint omits `available`; use the list endpoint or the page's JSON-LD for
stock.

---

## Which merchant a product links to

**Spread the links across retailers.** A page where every product links to
Kjell reads as paid placement even when the ranking is honest, and it puts the
whole page's revenue on one programme's approval. Where two shops carry the
same product at a comparable price, variety is worth something on its own.

`.agent/adtraction-se-katalog.json` is the full 480-programme catalogue. The
older `.agent/adtraction-programs.json` is an eleven-row excerpt and has been
misread as "programmes we hold"; we hold none. See
`.agent/plans/affiliatenatverk.md`.

`ppcMarketing` looks like the paid-search permission flag but is **undocumented**
in Adtraction's API reference, which only defines `approvalStatus`. The pattern
is that the chains carry `0` and the niche shops carry `2`. Treat `0` as
"assume PPC is forbidden until support confirms otherwise", and never state on
a page or in a plan that it is confirmed.

### Try to get a payable, advertisable merchant near the top

Google Ads can only run against programmes that permit paid search, and those
are the same programmes that pay best: Brandvarnare.se and AIVIQ at 15 %,
E-safe at 7,5 %, Verisure per lead, against Kjell at 5 %, IKEA at 9 % and
Proshop at 3,2 %. A page whose winner links only to a 3,2 % chain is one we
cannot advertise, however good it is.

Two levers are legitimate:

1. **Which shop we link** for a product stocked in several places. At the same
   price, or near enough, take the one that pays more and allows PPC.
2. **Which candidates make the shortlist** when they are genuinely comparable.
   A product available only from a 3,2 % chain weighs slightly less than an
   equivalent one a niche shop carries.

Never a lever: criterion weights, criterion scores, rank order.

When no such merchant carries those products, say so in `.agent/research/{slug}.md`
and link the best price. Do not manufacture it. `/utomhustimer` is the worked
example: five shops own the cheap half of that market, Adtraction has none of
them, so the page links Jula and Kjell and the research file records the gap.

---

## How the link is built

Read the `AFFILIATE-SWAP` block in `lib/links.ts`. In short:

- `LINK_MODE` is `"tracked"`. Outbound CTAs render as **relative** `/till/{id}`
  links that redirect, not as absolute merchant URLs.

  ⚠️ This file said `"direct"` until 2026-08-06, long after the constant
  changed. The `/skaftdammsugare` build audited its own CTAs with
  `a[href^='http']`, found zero anchors on a working page, and spent ten
  minutes chasing a bug that did not exist — then copied the stale
  `AFFILIATE-SWAP` comment into a new page header. **Read `lib/links.ts` for
  the current value rather than trusting this line.**
- Every outbound link goes through `resolveMerchantLink`. Never a raw `<a>`,
  never in MDX.
- `AffiliateCta` is the only component allowed to link to a merchant.
- `rel="sponsored"` is **derived** from whether the link can earn money. It is
  required once it can and wrong before that.
- Flipping to tracking links is one constant plus `affiliateUrl` on the
  products. No page or component changes.

### Do not rewrite the href on click

Shipping a clean URL and swapping it in a click handler is cloaking: the
crawler and the user get different destinations. It also loses money silently,
because middle-click, ⌘/Ctrl-click, "open in new tab" and copy-link all use the
raw `href`. `mode: "redirect"` through `/till/{id}` is the safe version of the
same idea.

---

## Google Ads

Only launch paid search on pages with proven organic CTR and CVR. Start bids at
the low end of the range and ride Quality Score up.

Avoid brand terms (Verisure, Roborock, Ring). Brand advertisers own those, and
programme terms often prohibit brand bidding outright.

CPC economics and the per-test-page volume data live in `.agent/plans/plan.md`.
