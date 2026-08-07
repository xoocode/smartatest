#!/usr/bin/env node
/**
 * Lists the H1 of every live test page next to its `title` in lib/test-pages.ts,
 * and reports where the two have drifted apart.
 *
 * Read by the `fix-h1` skill. Reports only; it changes nothing and never fails
 * the build.
 *
 * ## Why the drift exists at all
 *
 * 35 test pages render `{TEST_PAGE.title}`, so the heading and the `<title>`
 * are one string. The other 27 hardcode the heading in app/{slug}/page.tsx
 * while `metadata.title` still reads `TEST_PAGE.title`. That is two strings
 * with nothing keeping them equal, and on 2026-08-07 nine of the 27 had
 * drifted: three in word order, five in wording, and /garageportsoppnare in
 * fact — the H1 said "fem motorer", the title said "sex", and `count: 5` in
 * lib/catalog.ts says the H1 was right.
 *
 * The H1 wins. It is what the reader sees and what `fix-meta-descriptions`
 * takes its word order from.
 *
 * ## ⚠️ Indentation decides whether this works
 *
 * Test pages live at two different depths in lib/test-pages.ts: most are their
 * own `export const` with keys at 2 spaces, but 13 are nested in an array with
 * keys at 4. A `\n  title:` pattern misses those 13 silently and under-reports
 * drift by five. So the title is matched at the *same* indentation as the
 * `slug:` it belongs to, and never at a fixed one.
 *
 * Usage:
 *   node scripts/h1-inventory.mjs              every live test page
 *   node scripts/h1-inventory.mjs test-page    the same, said explicitly
 *   node scripts/h1-inventory.mjs category     the five category hubs
 *   node scripts/h1-inventory.mjs smartwatch   one slug
 *   node scripts/h1-inventory.mjs elektronik   one category key
 *
 * Argument resolution follows .claude/references/page-runs.md: page type first,
 * then category key, then slug. `category` is the page type; `elektronik` is a
 * category key and lists the test pages *inside* Elektronik, not the hub.
 */

import fs from "node:fs";

/* `test-page` is the default scope, so it resolves to no filter at all. */
const raw = (process.argv[2] || "").trim();
const filter = raw === "test-page" ? "" : raw;

const catalog = fs.readFileSync("lib/catalog.ts", "utf8");
const testPages = fs.readFileSync("lib/test-pages.ts", "utf8");

/* Anchor on each `slug:`, then take the nearest `title:` at the same
   indentation — forwards first, backwards if the object lists title first. */
const titleBySlug = new Map();
const slugRe = /\n( +)slug:\s*"([a-z0-9-]+)"/g;
let s;
while ((s = slugRe.exec(testPages))) {
  const [, indent, slug] = s;
  const titleRe = new RegExp(`\\n${indent}title:\\s*\\n?\\s*("(?:[^"\\\\]|\\\\.)*")`);
  const forward = testPages.slice(s.index, s.index + 8000).match(titleRe);
  const back = forward
    ? null
    : testPages.slice(Math.max(0, s.index - 8000), s.index).match(titleRe);
  const hit = forward || back;
  if (hit) titleBySlug.set(slug, JSON.parse(hit[1]));
}

/* Scoped to TEST_PAGE_INDEX on purpose: started at the top of the file the
   pattern runs from a Category constant into the first page entry and reports
   /smart-hem as a test page, which it is not. */
const index = catalog.slice(catalog.indexOf("TEST_PAGE_INDEX"));
const entryRe =
  /href:\s*"\/([a-z0-9-]+)",\s*\n\s*label:[\s\S]*?category:\s*([A-Z_]+),[\s\S]*?status:\s*"(live|planned)"/g;

const clean = (jsx) =>
  jsx
    .replace(/\{"\s*"\}/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

/* Page type `category`: the five hubs, which are a different shape entirely.
   Their H1 is hardcoded and `metadata.title` is written separately in the same
   file, so the same drift applies — on 2026-08-07 four of five differed, and in
   every case the title was the richer string. The H1 still wins. */
if (filter === "category") {
  const catRe = /export const ([A-Z_]+) = \{\s*\n\s*key:\s*"([a-z-]+)",\s*\n\s*label:\s*"([^"]*)",/g;
  const hubs = [];
  let c;
  while ((c = catRe.exec(catalog))) hubs.push({ constant: c[1], key: c[2], label: c[3] });

  /* Counts below ten are spelled out on these pages, per the H1 rule. */
  const WORDS = {
    tre: 3,
    fyra: 4,
    fem: 5,
    sex: 6,
    sju: 7,
    åtta: 8,
    nio: 9,
    tio: 10,
    elva: 11,
    tolv: 12,
  };
  const statedCount = (text) => {
    if (!text) return null;
    const m2 = text.match(/(\d+|tre|fyra|fem|sex|sju|åtta|nio|tio|elva|tolv)\s+jämförelser/i);
    if (!m2) return null;
    const raw2 = m2[1].toLowerCase();
    return /^\d+$/.test(raw2) ? Number(raw2) : (WORDS[raw2] ?? null);
  };

  let drifted = 0;
  let stale = 0;
  for (const hub of hubs) {
    const file = `app/${hub.key}/page.tsx`;
    if (!fs.existsSync(file)) {
      console.log(`  !!  ${hub.key}  sidfilen saknas`);
      continue;
    }
    const src = fs.readFileSync(file, "utf8");
    const h = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const t = src.match(/export const metadata[\s\S]*?\n  title:\s*\n?\s*"((?:[^"\\]|\\.)*)"/);
    const og = src.match(/pageOpenGraph\(\{\s*\n?\s*title:\s*\n?\s*"((?:[^"\\]|\\.)*)"/);
    const d = src.match(/export const metadata[\s\S]*?\n  description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/);
    const h1 = h ? clean(h[1]) : null;
    const title = t ? t[1] : null;
    const ogTitle = og ? og[1] : null;
    const live = [...index.matchAll(entryRe)].filter(
      (e) => e[2] === hub.constant && e[3] === "live",
    ).length;

    /* Three strings carry the heading, and every one of them has been a
       separate source of truth at some point. The OG title was the last found:
       on 2026-08-07 four of five still read the bare noun while the H1 and the
       title had both moved on. */
    const heads = [h1, title, ogTitle].filter((x) => x != null);
    const drift = new Set(heads).size > 1;
    if (drift) drifted++;

    /* The count goes stale the moment a page in the group goes live, which is
       why new-page ends on this. Checked in all four strings that carry it. */
    const badCounts = [
      ["h1", statedCount(h1)],
      ["title", statedCount(title)],
      ["og", statedCount(ogTitle)],
      ["description", statedCount(d ? d[1] : null)],
    ].filter(([, n]) => n != null && n !== live);
    if (badCounts.length) stale++;

    const flags =
      (drift ? "  ⚠️ DRIFT" : "") +
      (badCounts.length
        ? `  ⚠️ FEL ANTAL i ${badCounts.map(([w, n]) => `${w}=${n}`).join(", ")}`
        : "");
    console.log(`${hub.key}  [${hub.label}]  ${live} live jämförelser${flags}`);
    console.log(`    h1    (${h1 ? h1.length : 0})  ${h1 ?? "?"}`);
    console.log(`    title (${title ? title.length : 0})  ${title ?? "?"}`);
    if (ogTitle !== h1) console.log(`    og    (${ogTitle ? ogTitle.length : 0})  ${ogTitle ?? "?"}`);
  }
  console.log(
    `\n${hubs.length} kategorisidor  ·  ${drifted} med drift  ·  ${stale} med fel antal`,
  );
  if (drifted) console.log("H1:n vinner. Rätta title och og-title i sidfilen till H1:ns sträng.");
  if (stale) console.log("Antalet kommer ur lib/catalog.ts. Rätta alla fyra strängarna.");
  process.exit(0);
}

const rows = [];
let m;
while ((m = entryRe.exec(index))) {
  const [, slug, category, status] = m;
  if (status !== "live") continue;
  if (filter && filter !== slug && filter.toUpperCase().replace(/-/g, "_") !== category)
    continue;

  const file = `app/${slug}/page.tsx`;
  if (!fs.existsSync(file)) {
    rows.push({ slug, category, error: "sidfilen saknas" });
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  const h = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!h) {
    rows.push({ slug, category, error: "ingen h1 hittad" });
    continue;
  }
  const raw = h[1].trim();
  const title = titleBySlug.get(slug) ?? null;
  const isRef = /^\{[A-Z0-9_.]+\.title\}$/.test(raw);
  const h1 = isRef ? title : clean(raw);
  rows.push({
    slug,
    category,
    mode: isRef ? "ref" : "hard",
    h1,
    title,
    drift: !isRef && title != null && h1 !== title,
  });
}

for (const r of rows) {
  if (r.error) {
    console.log(`  !!  ${r.slug}  ${r.error}`);
    continue;
  }
  const flag = r.drift ? " ⚠️ DRIFT" : "";
  console.log(`${r.slug}  [${r.category}] ${r.mode}${flag}`);
  console.log(`    h1    (${r.h1 ? r.h1.length : 0})  ${r.h1 ?? "?"}`);
  if (r.drift) console.log(`    title (${r.title.length})  ${r.title}`);
}

const live = rows.filter((r) => !r.error);
const drifted = live.filter((r) => r.drift);
console.log(
  `\n${live.length} ${live.length === 1 ? "sida" : "sidor"}  ·  ${live.filter((r) => r.mode === "ref").length} ur test-pages.ts  ·  ` +
    `${live.filter((r) => r.mode === "hard").length} hårdkodade  ·  ${drifted.length} med drift`,
);
if (drifted.length) {
  console.log(`Drift: ${drifted.map((r) => r.slug).join(", ")}`);
  console.log("H1:n vinner. Rätta title i lib/test-pages.ts till H1:ns sträng.");
}
