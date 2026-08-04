#!/usr/bin/env node
/**
 * Fails when en rankad produkt saknar packshot.
 *
 * En sida utan produktbilder foerlorar mot varje konkurrent paa den axel en
 * laesare maerker foerst. Bilden ligger paa `public/bilder/{slug}/{id}-produkt.webp`
 * och haerleds ur produktens id, saa en saknad fil syns ingenstans i koden.
 *
 * Bara `image:`-produkter raeknas; bortvalda i considered-listan har inga.
 * Koers med `pnpm check:bilder`.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "lib/data";
const BILD = "public/bilder";
const problems = [];
let ok = 0;

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith(".ts") && x !== "index.ts")) {
  const slug = f.replace(/\.ts$/, "");
  const src = fs.readFileSync(path.join(DIR, f), "utf8");
  /* Tjaenstefiler (_SERVICES) har inga packshots. Verisure saeljer ett abonnemang,
     inte en produkt i en kartong. */
  if (!/export const [A-Z0-9_]+_PRODUCTS/.test(src)) continue;
  const block = src.slice(0, src.search(/CONSIDERED|_OVERVAGDA|considered:/) >>> 0 || undefined);
  const ids = [...block.matchAll(/^\s{4}id: "([^"]+)",$/gm)].map((m) => m[1]);
  for (const id of ids) {
    const p = path.join(BILD, slug, `${id}-produkt.webp`);
    if (fs.existsSync(p)) { ok++; continue; }
    problems.push(`${DIR}/${f}\n    ${id} saknar ${p}.\n    Kor \`pnpm images --category ${slug}\`.`);
  }
}

if (problems.length) {
  console.error(`\n  ${problems.length} rankade produkter utan packshot.\n`);
  for (const p of problems) console.error(`  ${p}\n`);
  process.exit(1);
}
console.log(`  ${ok} rankade produkter, alla med packshot.`);
