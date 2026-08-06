#!/usr/bin/env node
/**
 * Rapporterar omdoemen och etiketter som har fel form.
 *
 * ## Varfoer kontrollen finns
 *
 * `/nyckelskap` levererades med sex omdoemen paa mellan 649 och 1 177 tecken,
 * **samtliga i ett enda stycke**. `VerdictText` finns just foer att foerhindra
 * det, och komponentens egen kommentar beskriver samma haveri fraan
 * 2026-08-03: 1 900 tecken blev 375 pixlar sammanhaengande loeptext, och ingen
 * laeser det.
 *
 * Ingen kontroll saa det. `tsc`, `lint` och `pnpm check` hade ingen aasikt,
 * eftersom en straeng utan radbrytningar aer en giltig straeng.
 *
 * ## Fyra saker den tittar paa
 *
 * 1. **Stycken.** Ett omdoeme oever GRANS_TECKEN tecken i ett enda stycke.
 *    Skrivguiden delar recensionen i fyra roerelser; de aer fyra stycken.
 * 2. **Superlativ som upprepar utmaerkelsen.** "Baest i test" staar redan i
 *    H1 och paa utmaerkelsebrickan. Etiketten ska saega *vem* produkten
 *    passar. Se references/writing-guide.md.
 * 3. **Tvaa produkter med samma superlativ** paa samma sida. Den avvaegande
 *    laesaren staar mellan just de tvaa och faar daa ingen hjaelp alls.
 * 4. **Superlativ oever GRANS_SUPERLATIV tecken.** Regeln fanns bara i prosa
 *    och i en kodkommentar paa `/mjolkskummare` ("fjaerde gaangen felet
 *    uppstaar"), och hade daa bitit fem sidor. `new-page` bad en agent raekna
 *    tecken foer hand och varnade samtidigt foer att `wc -c` oeverskattar
 *    svenska superlativ med tre eller fyra. Det aer precis ett skript.
 *
 * ## Varfoer den inte faeller
 *
 * Enstyckesomdoemena aer aeldre skuld: 29 stycken oever fem sidor naer
 * kontrollen skrevs, och 10 sidor haar `superlative: "Baest i test"`. Att
 * faella hade blockerat repot paa arbete som hoer hemma i `/fix-page`, en sida
 * i taget, eftersom varje rad kraever att naagon skriver ny text.
 *
 * Listan aer alltsaa en arbetsorder. Naer den aer tom boer GRANS_TECKEN goeras
 * faellande, saa att ingen ny sida kan aateruppfinna felet.
 *
 * Koers med `pnpm check:omdomen`.
 */

import fs from "node:fs";
import path from "node:path";

const DIR = "lib/data";
const GRANS_TECKEN = 500;

/*
 * Brickan boerjar klippa runt 39 tecken. 35 aer alltsaa graensen med
 * marginalen inraeknad, och 39 aer inte budgeten.
 */
const GRANS_SUPERLATIV = 35;

const enstycke = [];
const utmarkelsesuperlativ = [];
const dubbletter = [];
const langasuperlativ = [];

/** Plockar ut ett straengfaelt: `verdict: "..."`, oever radbrytning. */
function faelt(block, namn) {
  const m = block.match(new RegExp(namn + ':\\s*\\n?\\s*("(?:[^"\\\\]|\\\\.)*")'));
  if (!m) return undefined;
  try {
    return JSON.parse(m[1]);
  } catch {
    return undefined;
  }
}

for (const fil of fs.readdirSync(DIR).filter((f) => f.endsWith(".ts")).sort()) {
  const slug = fil.replace(/\.ts$/, "");
  const src = fs.readFileSync(path.join(DIR, fil), "utf8");

  /* Varje produkt boerjar paa `id: "..."`. Blocket loeper till naesta id. */
  const ids = [...src.matchAll(/^\s{4}id:\s*"([^"]+)",$/gm)];
  const seddaSuperlativ = new Map();

  for (const [i, head] of ids.entries()) {
    const next = ids[i + 1];
    const block = src.slice(head.index, next ? next.index : src.length);
    const id = head[1];

    const verdict = faelt(block, "verdict");
    if (verdict) {
      const stycken = verdict.split(/\n{2,}/).filter((s) => s.trim()).length;
      if (stycken === 1 && verdict.length >= GRANS_TECKEN) {
        enstycke.push({ slug, id, tecken: verdict.length });
      }
    }

    const superlative = faelt(block, "superlative");
    if (superlative) {
      if (/^b[äa]st i test/i.test(superlative.trim())) {
        utmarkelsesuperlativ.push({ slug, id, superlative });
      }
      const nyckel = superlative.trim().toLowerCase();
      if (seddaSuperlativ.has(nyckel)) {
        dubbletter.push({ slug, a: seddaSuperlativ.get(nyckel), b: id, superlative });
      } else {
        seddaSuperlativ.set(nyckel, id);
      }

      /* Tecken, inte bytes: aa, ae och oe aer tvaa bytes var. */
      const tecken = [...superlative.trim()].length;
      if (tecken > GRANS_SUPERLATIV) {
        langasuperlativ.push({ slug, id, superlative: superlative.trim(), tecken });
      }
    }
  }
}

let nagot = false;

if (enstycke.length) {
  nagot = true;
  enstycke.sort((a, b) => b.tecken - a.tecken);
  console.log(`\n  ${enstycke.length} omdoemen oever ${GRANS_TECKEN} tecken i ett enda stycke:\n`);
  for (const r of enstycke) {
    console.log(`    ${String(r.tecken).padStart(5)} tecken  ${r.slug} · ${r.id}`);
  }
  console.log(
    `\n  Recensionen har fyra roerelser och de aer fyra stycken: vad produkten aer,\n` +
      `  USP:arna med sina foeljder, en aerlig begraensning, rekommendationen.\n` +
      `  Separera med tom rad. Se writing-guide.md.\n`,
  );
}

if (utmarkelsesuperlativ.length) {
  nagot = true;
  console.log(`  ${utmarkelsesuperlativ.length} superlativ som upprepar utmaerkelsen:\n`);
  for (const r of utmarkelsesuperlativ) {
    console.log(`    ${r.slug} · ${r.id}  "${r.superlative}"`);
  }
  console.log(
    `\n  "Baest i test" staar redan i H1 och paa brickan. Etiketten ska saega vem\n` +
      `  produkten passar: "Baest foer uthyrning", "Baest foer stugan".\n`,
  );
}

if (dubbletter.length) {
  nagot = true;
  console.log(`  ${dubbletter.length} sidor daer tvaa produkter delar superlativ:\n`);
  for (const r of dubbletter) {
    console.log(`    ${r.slug}  "${r.superlative}"  ${r.a} och ${r.b}`);
  }
  console.log("");
}

if (langasuperlativ.length) {
  nagot = true;
  langasuperlativ.sort((a, b) => b.tecken - a.tecken);
  const klipper = langasuperlativ.filter((r) => r.tecken > 39).length;
  console.log(
    `  ${langasuperlativ.length} superlativ oever ${GRANS_SUPERLATIV} tecken` +
      `, varav ${klipper} oever 39 daer brickan boerjar klippa:\n`,
  );
  for (const r of langasuperlativ) {
    console.log(`    ${String(r.tecken).padStart(3)} tecken  ${r.slug} · ${r.id}  "${r.superlative}"`);
  }
  console.log(
    `\n  Etiketten ska rymmas paa brickan. Korta ned, eller maet om var\n` +
      `  klippningen faktiskt boerjar och flytta GRANS_SUPERLATIV daerefter.\n`,
  );
}

if (!nagot) console.log("  Alla omdoemen har stycken, alla superlativ aer egna.");
