#!/usr/bin/env node
/**
 * Rapporterar hur maanga celler i jaemfoerelsetabellen som faktiskt aer ifyllda.
 *
 * ## Varfoer kontrollen finns
 *
 * `/fonsterputsrobot` gick i produktion med fyra av fem markerade rader naestan
 * tomma. Ingen kontroll saa det, eftersom varje enskild produkt var korrekt:
 * `Ej angiven` aer ett giltigt vaerde och `tsc`, `lint` och `pnpm check` hade
 * ingen aasikt. Felet syntes foerst naer en maenniska laeste sidan.
 *
 * En markerad rad aer ett loefte om att raden skiljer produkterna aat. Aer den
 * mestadels streck aer loeftet inte infriat, och laesaren betalar med en
 * skaermhoejd som saeger ingenting.
 *
 * ## Vad den maeter
 *
 * Bara `highlight: true`-specar, alltsaa de som blir rader i tabellen. Detaljer
 * laengre ner paa produktkortet raeknas inte: daer aer luckor gratis.
 *
 * `Ej angiven` raeknas som **tom**. Att vi letat aendrar ingenting foer den som
 * laeser tabellen.
 *
 * ## Varfoer den inte faeller
 *
 * Vissa tal finns inte att haemta. Tillverkare undviker att publicera
 * dimensionerande saekerhetslaster av ansvarsskael, och ingen maengd sökande
 * aendrar det. En kontroll som faeller paa saadant skulle bara laera oss att
 * fylla i gissningar, vilket aer vaerre aen ett streck.
 *
 * Daerfoer rapporterar den. Aatgaerden staar i
 * .claude/references/spec-sourcing.md och aer en av tvaa: koer gap-passet igen,
 * eller byt ut raden mot en egenskap som faktiskt skiljer produkterna aat.
 *
 * Koers med `pnpm check:tackning`.
 */

import fs from "node:fs";
import path from "node:path";

const DIR = "lib/data";
const GRANS = 0.5;

/* `Ej angiven` i alla boejningar, plus streckvarianterna. Samma lista som
   EJ_ANGIVET och TOMMA_VARDEN i components/product/comparison-table.tsx. */
const TOMMA = new Set([
  "",
  "-",
  "–",
  "—",
  "ej angiven",
  "ej angivet",
  "ej angivna",
  "saknas",
  "okaend",
]);

const tomt = (v) => TOMMA.has(v.trim().toLowerCase());

const rader = [];

for (const fil of fs.readdirSync(DIR).filter((f) => f.endsWith(".ts")).sort()) {
  const src = fs.readFileSync(path.join(DIR, fil), "utf8");

  /* Varje spec aer ett objektliteral. Vi vill bara aat dem med highlight: true,
     och etikett + vaerde staar alltid foere flaggan i samma objekt. */
  const specs = [
    ...src.matchAll(
      /\{\s*label:\s*"([^"]+)"[^}]*?value:\s*("(?:[^"\\]|\\.)*")[^}]*?highlight:\s*true[^}]*?\}/g,
    ),
  ];
  if (!specs.length) continue;

  /** label -> { fyllda, totalt } */
  const perRad = new Map();

  for (const [, label, rawValue] of specs) {
    let value;
    try {
      value = JSON.parse(rawValue);
    } catch {
      value = rawValue.slice(1, -1);
    }
    const post = perRad.get(label) ?? { fyllda: 0, totalt: 0 };
    post.totalt++;
    if (!tomt(value)) post.fyllda++;
    perRad.set(label, post);
  }

  for (const [label, { fyllda, totalt }] of perRad) {
    /* Pris och Butik bygger tabellen egna rader av ur andra faelt. */
    if (label === "Pris" || label === "Butik") continue;
    if (totalt < 3) continue;
    const kvot = fyllda / totalt;
    if (kvot < GRANS) {
      rader.push({ fil, label, fyllda, totalt, kvot });
    }
  }
}

rader.sort((a, b) => a.kvot - b.kvot);

if (rader.length) {
  console.log(`\n  ${rader.length} markerade rader under ${GRANS * 100} % ifyllda:\n`);
  for (const r of rader) {
    const procent = Math.round(r.kvot * 100);
    console.log(
      `    ${String(procent).padStart(3)} %  ${r.fil.replace(/\.ts$/, "")} · ${r.label}` +
        `  (${r.fyllda}/${r.totalt})`,
    );
  }
  console.log(
    `\n  En markerad rad lovar att den skiljer produkterna aat. Antingen behoever\n` +
      `  researchen ett gap-pass till, eller saa aer raden fel vald och boer bytas\n` +
      `  mot en egenskap som gaar att faa fram. Se .claude/references/spec-sourcing.md.\n`,
  );
} else {
  console.log(`  Alla markerade tabellrader minst ${GRANS * 100} % ifyllda.`);
}
