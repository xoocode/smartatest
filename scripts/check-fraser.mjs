#!/usr/bin/env node
/**
 * Svepet innan texten laemnas ifraan sig: de bekraeftade oevertrampen ur
 * `swedish-voice/references/measurements.md`, koerda mot laesartexten.
 *
 * ## Varfoer kontrollen finns
 *
 * Prosa faangar inte sjaelvfoervaallade aaterfall. `Två saker ändrar kalkylen`
 * skrevs in paa doerrklockssidan av den som just tagit bort samma fras naagon
 * annanstans. En regel man nyss tillaempat aer precis den man bryter mot i
 * ersaettningen, och det syns bara i en koerning paa slutet.
 *
 * ## Tvaa nivaaer
 *
 * **FAELLER** aer fraser daer referenskorpusen staar paa noll och det inte
 * finns naagon rimlig anvaendning. Dem gaar det att foerbjuda.
 *
 * **RAEKNAS** aer fraser daer referensen staar paa noll men trafikljuset aer
 * gult: de kan vara raett i ett enskilt fall. Skriptet visar antalet och
 * exitkoden paaverkas inte. Sjunker talet oever tid goer sveper jobbet.
 *
 * ⚠️ Koden aer undantagen. Kommentarer i .ts och .tsx aer inte laesartext, och
 * en naiv grep raeknade 149 `sidans` daer laesaren ser en broekdel. Strippa
 * foerst, raekna sedan.
 *
 * Koers med `pnpm check:fraser`.
 */

import fs from "node:fs";
import path from "node:path";

const ROOTS = ["content", "lib", "components", "app"];
const EXT = new Set([".ts", ".tsx", ".mdx"]);

/** Filer som aer verktyg eller data om oss, inte text en laesare moeter. */
const UNDANTAG = ["lib/spec-schema.mjs", "app/styleguide/", "lib/r9track/"];

/** Referensen staar paa noll och ingen rimlig anvaendning finns. */
const FAELLER = [
  ["skriver rakt ut", /skriver rakt ut/gi],
  ["lämna X utanför", /lämnar? \w+ helt utanför/gi],
];

/** Referensen staar paa noll men enskilda fall kan vara raett. */
const RAEKNAS = [
  ["sidans", /\bsidans\b/gi],
  ["kategorins", /\bkategorins\b/gi],
  ["på sidan", /\bpå sidan\b/gi],
  ["i jämförelsen", /\bi jämförelsen\b/gi],
  ["två saker", /\btvå saker\b/gi],
  ["av de {räkneord}", /\bav de (två|tre|fyra|fem|sex|sju|åtta|nio|tio|elva|tolv|tretton|fjorton)\b/gi],
  /* Hittade 2026-08-04 naer `skriver rakt ut` skulle ersaettas: baada staar paa
     noll i referensen och vi anvaende dem redan. Att byta till dem hade varit
     att byta en formel mot en annan. */
  ["säger rakt ut", /säger rakt ut/gi],
  ["slår fast", /slår fast/gi],
];

/** Blankar kommentarer men behaaller radnumren. */
function strip(src, ext) {
  let out = src.replace(/\{\/\*[\s\S]*?\*\/\}/g, (m) => m.replace(/[^\n]/g, " "));
  if (ext === ".mdx") return out;
  out = out.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
  return out.replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + " ".repeat(m.length - p.length));
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (EXT.has(path.extname(e.name))) out.push(full);
  }
  return out;
}

const norm = (p) => p.split(path.sep).join("/");
const files = ROOTS.flatMap((r) => walk(r)).filter(
  (f) => !UNDANTAG.some((u) => norm(f).startsWith(u)),
);

const hard = [];
const soft = new Map(RAEKNAS.map(([label]) => [label, []]));

for (const file of files) {
  const ext = path.extname(file);
  const src = strip(fs.readFileSync(file, "utf8"), ext);
  const lines = src.split("\n");

  for (const [i, line] of lines.entries()) {
    for (const [label, re] of FAELLER) {
      re.lastIndex = 0;
      if (re.test(line)) hard.push(`${norm(file)}:${i + 1}  [${label}]`);
    }
    for (const [label, re] of RAEKNAS) {
      re.lastIndex = 0;
      const n = (line.match(re) || []).length;
      if (n) soft.get(label).push(`${norm(file)}:${i + 1}`);
    }
  }
}

const softTotal = [...soft.values()].reduce((a, b) => a + b.length, 0);

console.log(`  ${files.length} filer genomsökta, kommentarer bortstrippade.\n`);

if (softTotal) {
  console.log("  Räknas, fäller inte:");
  for (const [label, hits] of soft) {
    if (hits.length) console.log(`    ${String(hits.length).padStart(4)}  ${label}`);
  }
  console.log(
    `\n  Referensen står på noll för samtliga. Enskilda fall kan vara rätt;\n` +
      `  ett tal som stiger är däremot en formel som sprider sig.\n` +
      `  Kör \`pnpm sprak "<fras>"\` innan du ersätter, och mät ersättningen också.\n`,
  );
}

if (hard.length) {
  console.error(`  ${hard.length} bekräftade övertramp i läsartext:\n`);
  for (const h of hard) console.error(`    ${h}`);
  console.error("");
  process.exit(1);
}

console.log("  Inga bekräftade övertramp.");
