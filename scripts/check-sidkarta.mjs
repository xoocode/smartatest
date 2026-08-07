#!/usr/bin/env node
/**
 * Haaller `.agent/testsidor-tackning.md` aerlig mot `lib/catalog.ts`.
 *
 * Kartan aer koen som `/new-page` drar ur. En karta som saeger att en sida aer
 * kvar att bygga naer den redan ligger live faar naesta agent att bygga om den,
 * och en karta som saknar en rad goer att sidan aldrig blir byggd alls.
 *
 * Faeller inte bygget. Koers via `pnpm check:sidkarta`.
 */

import fs from "node:fs";

const FIL = ".agent/testsidor-tackning.md";
const md = fs.readFileSync(FIL, "utf8");
const cat = fs.readFileSync("lib/catalog.ts", "utf8");

/* Katalogens testsidor. Hela biten fram till naesta href aer posten — ingen
   fast foensterstorlek, flera poster bar kommentarer paa oever 5 000 tecken. */
const katalog = new Map();
for (const bit of cat.split(/href: "\//).slice(1)) {
  const slug = bit.match(/^([a-z0-9-]+)"/)?.[1];
  const status = bit.match(/status: "(\w+)"/)?.[1];
  if (slug && status && /updated: "/.test(bit)) katalog.set(slug, status);
}

/* Kartans rader. Fem former:
     - [x] `/slug` — live
     - [ ] `/slug` — suggested
     - 🟢 `/slug`  — ready
     - ✍️ `/slug`  — writing
     - ❌ `/slug`  — rejected                                            */
const rader = [];
for (const rad of md.split("\n")) {
  const m = rad.match(/^-\s*(\[x\]|\[ \]|🟢|✍️|❌)\s*`\/([a-z0-9-]+)`/);
  if (!m) continue;
  const status = { "[x]": "live", "[ ]": "suggested", "🟢": "ready", "✍️": "writing", "❌": "rejected" }[m[1]];
  rader.push({ status, slug: m[2] });
}

const iKartan = new Map(rader.map((r) => [r.slug, r.status]));
const fel = [];

for (const [slug, status] of katalog) {
  const kart = iKartan.get(slug);
  if (!kart) fel.push(`saknas i kartan: /${slug} (katalog: ${status})`);
  else if (status === "live" && kart !== "live") fel.push(`/${slug} aer live i katalogen men "${kart}" i kartan`);
  else if (status === "planned" && kart === "live") fel.push(`/${slug} aer planned i katalogen men kryssad i kartan`);
}
for (const { status, slug } of rader) {
  if (status === "live" && !katalog.has(slug)) fel.push(`kryssad men finns inte som testsida i katalogen: /${slug}`);
}

const dubbletter = rader.map((r) => r.slug).filter((s, i, a) => a.indexOf(s) !== i);
for (const d of new Set(dubbletter)) fel.push(`dubblettrad: /${d}`);

const per = new Map();
for (const r of rader) per.set(r.status, (per.get(r.status) ?? 0) + 1);

console.log(`check:sidkarta — ${rader.length} rader, ${katalog.size} testsidor i katalogen\n`);
for (const s of ["live", "ready", "writing", "suggested", "rejected"]) {
  if (per.get(s)) console.log(`  ${String(per.get(s)).padStart(4)}  ${s}`);
}

if (!fel.length) {
  console.log("\n  kartan stammer med katalogen.\n");
  process.exit(0);
}

console.log(`\n  ${fel.length} avvikelser:\n`);
for (const f of fel) console.log("    " + f);
console.log(
  `\n  Kartan aer koen /new-page drar ur. Staemmer den inte bygger naesta\n` +
    `  agent om en sida som redan finns, eller hoppar oever en som saknas.\n`,
);
