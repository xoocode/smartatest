#!/usr/bin/env node
/**
 * Prints, per live test page, the promise the search snippet makes next to the
 * reason the ingress gives — so the two can be read against each other.
 *
 * Read by the `align-usps` skill. Reports only; changes nothing, fails nothing.
 *
 * ## What it compares
 *
 * `metadata.description` ends on a lure and a call to action: *"Fyra av tolv
 * saknar termometer helt. Se vilka som har en."* The ingress gives the winner's
 * reason after `eftersom`. When those are different properties, a reader who
 * clicked for the first one lands on the second.
 *
 * ## ⚠️ The overlap score is a ranking, never a verdict
 *
 * It counts content words the lure and the reason share. That is a screen for
 * ordering the run, and it is wrong in both directions:
 *
 * - `/mjolkskummare` shares **zero** words and is perfectly aligned. *"En
 *   cappuccino tar 60 ml skum. Se vilka som räcker till fyra"* is answered by
 *   *"skummar 150 till 250 milliliter … så två till fyra koppar blir klara
 *   samtidigt"*. Different vocabulary, same promise kept.
 * - A shared word proves nothing either. Two sentences can both say `watt` and
 *   sell opposite properties.
 *
 * So read every pair. The score decides what you look at first, and nothing
 * else. Measured 2026-08-07: 16 of 28 pairs scored zero, and manual reading put
 * the real mismatch nearer half that.
 *
 * Usage:
 *   node scripts/usp-pairs.mjs              every page where both runs landed
 *   node scripts/usp-pairs.mjs --alla       include pages still on an old shape
 *   node scripts/usp-pairs.mjs pizzaugn     one page
 *   node scripts/usp-pairs.mjs kok          one category
 */

import fs from "node:fs";

const arg = (process.argv[2] || "").trim();
const showAll = arg === "--alla";
const filter = showAll ? "" : arg;

const catalog = fs.readFileSync("lib/catalog.ts", "utf8");
const index = catalog.slice(catalog.indexOf("TEST_PAGE_INDEX"));
const entryRe =
  /href:\s*"\/([a-z0-9-]+)",\s*\n\s*label:[\s\S]*?category:\s*([A-Z_]+),[\s\S]*?status:\s*"(live|planned)"/g;

const clean = (x) =>
  x
    .replace(/\{"\s*"\}/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const ingressRe =
  /<h1[^>]*>[\s\S]*?<\/h1>[\s\S]{0,600}?<p className="max-w-2xl text-lg text-muted-foreground">([\s\S]*?)<\/p>/;

/* Frame vocabulary every description and every ingress shares by construction.
   Left in, it scores two unrelated sentences as a match. */
const STOP = new Set(
  (
    "bäst test 2026 jämförda jämförelse jämförelser köpguide kronor från vilken " +
    "vilka vilket eftersom testvinnare rekommenderar dessutom alla samma varje " +
    "andra denna detta säger står finns göra gäller blir hela även utan mera " +
    "mest över under efter innan medan sedan ingen inget inte bara till för med " +
    "som och den det där här vad vem hur när både båda"
  ).split(/\s+/),
);

const tokens = (s) =>
  new Set(
    (s || "")
      .toLowerCase()
      .replace(/[^a-zåäö0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => /^\d+$/.test(w) || w.length >= 4)
      .filter((w) => !STOP.has(w)),
  );

const rows = [];
let m;
while ((m = entryRe.exec(index))) {
  const [, slug, category, status] = m;
  if (status !== "live") continue;
  if (filter && filter !== slug && filter.toUpperCase().replace(/-/g, "_") !== category)
    continue;

  const file = `app/${slug}/page.tsx`;
  if (!fs.existsSync(file)) continue;
  const src = fs.readFileSync(file, "utf8");
  const d = src.match(
    /export const metadata[\s\S]*?\n  description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/,
  );
  const i = src.match(ingressRe);
  if (!d || !i) continue;

  const desc = d[1];
  const ingress = clean(i[1]);
  const metaDone = /bäst i test/i.test(desc.slice(0, 60));
  const ingressDone = /^(Vår testvinnare|Vi rekommenderar)/.test(ingress);
  if (!showAll && !filter && !(metaDone && ingressDone)) continue;

  /* The lure sits between the count-and-price clause and the call to action. */
  const sentences = desc.split(/(?<=\.)\s+/);
  const lure = sentences.slice(1, -1).join(" ") || "";
  const cta = sentences.length > 1 ? sentences[sentences.length - 1] : "";
  /* The promise-bearing half of the ingress is the eftersom-clause. */
  const reason = (ingress.split(/,\s*eftersom\s+/)[1] || ingress).split(/(?<=\.)\s/)[0];

  const L = tokens(lure);
  const shared = [...L].filter((t) => tokens(reason).has(t));
  rows.push({
    slug,
    category,
    metaDone,
    ingressDone,
    desc,
    ingress,
    lure,
    cta,
    reason,
    shared,
    score: L.size ? shared.length / L.size : 1,
  });
}

rows.sort((a, b) => a.score - b.score || a.slug.localeCompare(b.slug));

for (const r of rows) {
  const todo = [];
  if (!r.metaDone) todo.push("meta i gammal form");
  if (!r.ingressDone) todo.push("ingress i gammal form");
  console.log(
    `\n${r.shared.length ? "  " : "→ "}/${r.slug}  [${r.category}]` +
      (todo.length ? `  ⚠️ ${todo.join(", ")}` : "") +
      `  gemensamt: ${r.shared.join(", ") || "–"}`,
  );
  console.log(`    lockbete : ${r.lure || "–"}`);
  console.log(`    uppmaning: ${r.cta || "–"}`);
  console.log(`    skäl     : ${r.reason || "–"}`);
}

const zero = rows.filter((r) => !r.shared.length);
const stale = rows.filter((r) => !r.metaDone || !r.ingressDone);
console.log(
  `\n${rows.length} ${rows.length === 1 ? "sida" : "sidor"}  ·  ` +
    `${zero.length} utan gemensamt innehållsord  ·  ` +
    `${stale.length} där en av texterna ännu inte körts`,
);
console.log(
  "Poängen rangordnar, den dömer inte. Läs varje par innan du kallar det fel.",
);
