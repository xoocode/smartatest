#!/usr/bin/env node
/**
 * Fails when en kategoris priser aer foer gamla.
 *
 * Priset aer det enda paa sidan som blockerar en lansering naer det aer fel,
 * och det enda som blir fel av sig sjaelvt. `pnpm priskoll` jaemfoer mot
 * butikerna oever naetet; den haer laeser bara datumet och aer gratis.
 *
 * Varje datafil saetter `const PRICE_CHECKED = "YYYY-MM-DD"`.
 * Koers med `pnpm check:priser`. Graensen hoejs med --dagar N.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "lib/data";
const arg = process.argv.indexOf("--dagar");
const LIMIT = arg > -1 ? Number(process.argv[arg + 1]) : 90;

const today = new Date();
const problems = [];
let ok = 0;
let oldest = null;

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith(".ts") && x !== "index.ts")) {
  const src = fs.readFileSync(path.join(DIR, f), "utf8");
  const m = src.match(/const PRICE_CHECKED = "(\d{4}-\d{2}-\d{2})"/);
  if (!m) continue;
  const days = Math.floor((today - new Date(m[1])) / 86400000);
  if (!oldest || days > oldest.days) oldest = { f, days, date: m[1] };
  if (days > LIMIT) {
    problems.push(
      `${DIR}/${f}\n    priserna kontrollerade ${m[1]}, ${days} dagar sedan (graens ${LIMIT}).\n` +
        `    Koer \`pnpm priskoll\` och uppdatera, eller hoej graensen medvetet.`,
    );
  } else ok++;
}

if (problems.length) {
  console.error(`\n  ${problems.length} kategorier med foer gamla priser.\n`);
  for (const p of problems) console.error(`  ${p}\n`);
  process.exit(1);
}
console.log(`  ${ok} kategorier, alla priser yngre aen ${LIMIT} dagar (aeldst ${oldest?.date}, ${oldest?.days} d).`);
