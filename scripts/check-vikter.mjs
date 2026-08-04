#!/usr/bin/env node
/**
 * Fails when en kategoris kriterievikter inte summerar till 100.
 *
 * ## Varfoer kontrollen finns
 *
 * `resolveProducts` viktar varje kriteriebetyg och raeknar fram totalen. Gaar
 * vikterna inte ihop till 100 blir varje betyg paa sidan skevt, och skevheten
 * syns inte: alla produkter foerskjuts aat samma haall, saa rangordningen ser
 * rimlig ut medan talen aer fel.
 *
 * `MethodologyBlock` renderar en varning naer summan missar, men den varningen
 * naar bara den som oeppnar sidan och tittar paa metodrutan. Det haer aer
 * samma kontroll vid raett tidpunkt.
 *
 * ## Tvaa kontroller
 *
 * 1. **Summan.** Vikterna i varje `criteria`-lista maaste bli exakt 100.
 * 2. **Antalet.** Faerre aen tre kriterier aer ingen viktning, och fler aen
 *    sju goer varje enskild vikt betydelselös. Baada aer varningsvaerda nog att
 *    faella, eftersom baada normalt betyder att naagon gloemt en rad.
 *
 * Ett kriterium som de hämtade testerna taecker foer tunt ska tas bort och
 * vikten fördelas om, inte laemnas med mestadels blanka betyg. Se
 * .claude/context/data.md.
 *
 * Koers med `pnpm check:vikter`.
 */

import fs from "node:fs";

const FILE = "lib/test-pages.ts";
const src = fs.readFileSync(FILE, "utf8");

const problems = [];

/** Varje kategori deklareras som `export const NAMN: TestPage = {`. */
const heads = [...src.matchAll(/^export const ([A-Z0-9_]+)(?::[^=]*)?=\s*\{/gm)];

let checked = 0;

for (const [i, head] of heads.entries()) {
  const next = heads[i + 1];
  const block = src.slice(head.index, next ? next.index : src.length);

  const start = block.indexOf("criteria: [");
  if (start === -1) continue;

  /* Klipp vid raden som staenger listan paa samma indrag som den oeppnades.
     Kriteriebeskrivningarna innehaaller hakparenteser, saa en naive match paa
     naermaste ] tar fel slut. */
  const tail = block.slice(start);
  const end = tail.search(/^ {2}\],$/m);
  const criteria = end === -1 ? tail : tail.slice(0, end);

  const weights = [...criteria.matchAll(/^\s*weight: (\d+(?:\.\d+)?),$/gm)].map(
    (m) => Number(m[1]),
  );
  if (!weights.length) continue;

  checked++;
  const sum = weights.reduce((a, b) => a + b, 0);

  if (sum !== 100) {
    const line = src.slice(0, head.index).split("\n").length;
    problems.push(
      `${FILE}:${line}\n    ${head[1]} har ${weights.length} kriterier som summerar till ${sum}, inte 100.\n` +
        `    Vikterna: ${weights.join(" + ")}.\n` +
        `    Varje betyg paa sidan blir skevt, och skevheten syns inte i rangordningen.`,
    );
  }

  if (weights.length < 3 || weights.length > 7) {
    const line = src.slice(0, head.index).split("\n").length;
    problems.push(
      `${FILE}:${line}\n    ${head[1]} har ${weights.length} kriterier.\n` +
        `    Under tre aer ingen viktning; oever sju goer varje vikt betydelselös.`,
    );
  }
}

if (problems.length) {
  console.error(`\n  ${problems.length} problem med kriterievikter.\n`);
  for (const p of problems) console.error(`  ${p}\n`);
  process.exit(1);
}

console.log(`  ${checked} kategorier, alla med vikter som summerar till 100.`);
