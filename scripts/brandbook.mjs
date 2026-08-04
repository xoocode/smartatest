#!/usr/bin/env node
/**
 * Genererar `.claude/references/brandbook.html` ur designsystemets egna
 * kaellor.
 *
 * ## Varfoer den genereras och inte skrivs
 *
 * En handskriven brandbook aer en beskrivning av koden, och beskrivningar
 * glider. Den haer laeser `lib/theme.ts` och `app/globals.css` och kan
 * daerfoer inte saega naagot annat aen vad sajten faktiskt goer.
 *
 * Filen aer en **rik referens** i den mening artikeln om kontextteknik menar:
 * en HTML-sida gaar att laesa baade foer en modell och foer en maenniska, till
 * skillnad fraan en tabell med hexkoder i markdown. `/styleguide` aer
 * fortfarande den levande baenken; det haer aer oeversikten som faar plats i
 * ett sammanhang.
 *
 * Koers med `pnpm brandbook`. Koer om den naer en axel eller ett tema aendras.
 */

import fs from "node:fs";
import path from "node:path";

const THEME_FILE = "lib/theme.ts";
const CSS_FILE = "app/globals.css";
const OUT = ".claude/references/brandbook.html";

const themeSrc = fs.readFileSync(THEME_FILE, "utf8");
const cssSrc = fs.readFileSync(CSS_FILE, "utf8");

/* ------------------------------------------------------------- axlarna -- */

/** Plockar ut `{ id, label, hint }` ur en `*_OPTIONS`-lista. */
function options(name) {
  const start = themeSrc.indexOf(`export const ${name}`);
  if (start === -1) return [];
  const end = themeSrc.indexOf("\n];", start);
  const block = themeSrc.slice(start, end === -1 ? undefined : end);
  return [
    ...block.matchAll(
      /id:\s*"([^"]+)",\s*label:\s*"([^"]+)",\s*hint:\s*"((?:[^"\\]|\\.)*)"/g,
    ),
  ].map((m) => ({ id: m[1], label: m[2], hint: m[3].replace(/\\"/g, '"') }));
}

const AXES = [
  ["theme", "Tema", "THEME_OPTIONS"],
  ["density", "Täthet", "DENSITY_OPTIONS"],
  ["radius", "Hörn", "RADIUS_OPTIONS"],
  ["table", "Jämförelsetabell", "TABLE_OPTIONS"],
  ["criteria", "Kriteriebetyg", "CRITERIA_OPTIONS"],
  ["cta", "Köpknapp", "CTA_OPTIONS"],
  ["link", "Länkstil", "LINK_OPTIONS"],
].map(([key, label, name]) => ({ key, label, options: options(name) }))
  .filter((a) => a.options.length);

/** DEFAULT_STYLE, saa arbetslaeget kan markeras i staellet foer beskrivas. */
const defaults = Object.fromEntries(
  [
    ...themeSrc
      .slice(themeSrc.indexOf("export const DEFAULT_STYLE"))
      .slice(0, 400)
      .matchAll(/^\s{2}([a-zA-Z]+): "([^"]+)",$/gm),
  ].map((m) => [m[1], m[2]]),
);

/* -------------------------------------------------------------- faerger -- */

/** Laeser variabelblocket foer en selektor, till exempel [data-theme="x"]. */
function vars(selector) {
  const i = cssSrc.indexOf(selector);
  if (i === -1) return {};
  const open = cssSrc.indexOf("{", i);
  const close = cssSrc.indexOf("\n}", open);
  const block = cssSrc.slice(open, close);
  return Object.fromEntries(
    [...block.matchAll(/^\s*(--[a-z0-9-]+):\s*([^;]+);/gm)].map((m) => [
      m[1],
      m[2].trim(),
    ]),
  );
}

/** De token en laesare faktiskt ser skillnad paa mellan teman. */
const SWATCHES = [
  ["--background", "Bakgrund"],
  ["--foreground", "Text"],
  ["--primary", "Primär"],
  ["--brand", "Varumärke"],
  ["--award", "Utmärkelse"],
  ["--accent", "Accent"],
  ["--muted", "Dämpad"],
  ["--border", "Kantlinje"],
];

const themeVars = Object.fromEntries(
  (AXES.find((a) => a.key === "theme")?.options ?? []).map((t) => [
    t.id,
    vars(`[data-theme="${t.id}"]`),
  ]),
);

/* ---------------------------------------------------- komponentinventarie -- */

function countTsx(dir) {
  if (!fs.existsSync(dir)) return 0;
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".tsx")).length;
}

const inventory = [
  ["components/product", "Produkt"],
  ["components/site", "Sajt"],
  ["components/tools", "Verktyg"],
  ["components/ui", "shadcn-primitiver"],
].map(([dir, label]) => ({ label, dir, n: countTsx(dir) }));

const total = inventory.reduce((a, b) => a + b.n, 0);

/* -------------------------------------------------------------- rendering -- */

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const today = new Date().toISOString().slice(0, 10);

const axesHtml = AXES.map(
  (axis) => `
  <section class="axis">
    <h3>${esc(axis.label)} <code>${esc(axis.key)}</code></h3>
    <ul>
      ${axis.options
        .map((o) => {
          const isDefault = defaults[axis.key] === o.id;
          return `<li${isDefault ? ' class="is-default"' : ""}>
        <strong>${esc(o.label)}</strong> <code>${esc(o.id)}</code>${isDefault ? '<span class="tag">arbetsläge</span>' : ""}
        <p>${esc(o.hint)}</p>
      </li>`;
        })
        .join("\n      ")}
    </ul>
  </section>`,
).join("\n");

const themesHtml = Object.entries(themeVars)
  .map(([id, v]) => {
    const cells = SWATCHES.map(([token, label]) => {
      const value = v[token];
      if (!value) return "";
      return `<div class="swatch">
        <span class="chip" style="background:${esc(value)}"></span>
        <span class="chip-label">${esc(label)}<code>${esc(value)}</code></span>
      </div>`;
    }).join("\n      ");
    return `<section class="theme">
    <h3>${esc(id)}${defaults.theme === id ? '<span class="tag">arbetsläge</span>' : ""}</h3>
    <div class="swatches">
      ${cells}
    </div>
  </section>`;
  })
  .join("\n");

const html = `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Brandbook — smartatest.se</title>
<style>
  :root { color-scheme: light dark; --ink:#111; --bg:#fff; --dim:#666; --line:#e5e5e5; }
  @media (prefers-color-scheme: dark) { :root { --ink:#eee; --bg:#141414; --dim:#999; --line:#333; } }
  body { margin:0; padding:2.5rem 1.5rem 5rem; background:var(--bg); color:var(--ink);
         font:16px/1.6 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif; }
  main { max-width:60rem; margin:0 auto; }
  h1 { font-size:1.9rem; margin:0 0 .3rem; letter-spacing:-.02em; }
  h2 { font-size:1.25rem; margin:3rem 0 .5rem; padding-bottom:.4rem; border-bottom:1px solid var(--line); }
  h3 { font-size:1rem; margin:1.6rem 0 .5rem; }
  p.lede { color:var(--dim); margin:0 0 .5rem; }
  code { font:.85em ui-monospace,SFMono-Regular,Menlo,monospace; color:var(--dim); }
  .axis ul { list-style:none; margin:0; padding:0; display:grid; gap:.5rem;
             grid-template-columns:repeat(auto-fill,minmax(15rem,1fr)); }
  .axis li { border:1px solid var(--line); border-radius:.5rem; padding:.7rem .8rem; }
  .axis li.is-default { border-color:currentColor; }
  .axis li p { margin:.3rem 0 0; font-size:.85rem; color:var(--dim); }
  .tag { font-size:.7rem; text-transform:uppercase; letter-spacing:.06em;
         border:1px solid currentColor; border-radius:1rem; padding:.05rem .45rem; margin-left:.4rem; }
  .swatches { display:grid; gap:.5rem; grid-template-columns:repeat(auto-fill,minmax(11rem,1fr)); }
  .swatch { display:flex; align-items:center; gap:.5rem; }
  .chip { width:2rem; height:2rem; border-radius:.35rem; border:1px solid var(--line); flex:none; }
  .chip-label { font-size:.8rem; display:flex; flex-direction:column; }
  table { border-collapse:collapse; width:100%; font-size:.9rem; }
  th,td { text-align:left; padding:.4rem .6rem; border-bottom:1px solid var(--line); }
  footer { margin-top:4rem; font-size:.8rem; color:var(--dim); }
  .overflow { overflow-x:auto; }
</style>
</head>
<body>
<main>
  <h1>Brandbook</h1>
  <p class="lede">smartatest.se — genererad ur <code>lib/theme.ts</code> och <code>app/globals.css</code> ${esc(today)}.</p>
  <p class="lede">Redigera inte den här filen. Ändra källan och kör <code>pnpm brandbook</code>.
     Den levande bänken är <code>/styleguide</code>.</p>

  <h2>Arbetsläget</h2>
  <p>Sajten byggs i <strong>${esc(defaults.theme ?? "?")} · ${esc(defaults.density ?? "?")} · ${esc(defaults.radius ?? "?")}</strong>.
     Övriga lägen finns för att kunna jämföras, inte för att blandas.</p>

  <h2>Teman</h2>
${themesHtml}

  <h2>Axlar</h2>
${axesHtml}

  <h2>Komponenter</h2>
  <div class="overflow">
  <table>
    <thead><tr><th>Grupp</th><th>Katalog</th><th>Antal</th></tr></thead>
    <tbody>
      ${inventory.map((i) => `<tr><td>${esc(i.label)}</td><td><code>${esc(i.dir)}</code></td><td>${i.n}</td></tr>`).join("\n      ")}
      <tr><td><strong>Totalt</strong></td><td></td><td><strong>${total}</strong></td></tr>
    </tbody>
  </table>
  </div>
  <p class="lede">En ny kategorisida lägger normalt till noll till två, och båda bör vara
     kategorispecifika verktyg. Bygger du ett kort, en tabell eller en bricka finns den redan.</p>

  <footer>Genererad av <code>scripts/brandbook.mjs</code>.</footer>
</main>
</body>
</html>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html, "utf8");

console.log(`  ${OUT} skriven.`);
console.log(`  ${AXES.length} axlar, ${Object.keys(themeVars).length} teman, ${total} komponenter.`);
