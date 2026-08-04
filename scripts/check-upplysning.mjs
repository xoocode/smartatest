#!/usr/bin/env node
/**
 * Fails when affiliateupplysningen upprepas i samma register paa en sida.
 *
 * ## Varfoer kontrollen finns
 *
 * Regeln aer inte ett antal utan en upprepning. Upplysningen faar staa paa tre
 * staellen, eftersom de tre har olika tyngd och naas av olika laesare:
 *
 *   balk    hoegst upp i artikeln, laenkar vidare till /annonsmarkning
 *   inline  en daempad rad i bylineblocket
 *   footer  sitewide, den juridiska
 *
 * Det som laeser som oro aer samma foersaekring **tvaa gaanger i samma
 * tonlaege**: tvaa balkar, tvaa inline-rader.
 *
 * ⚠️ Foersta versionen av det haer skriptet raeknade i staellet foerekomster
 * och kraevde hoegst tvaa per sida. Den foell paa alla 25 kategorisidor, som
 * var foer sig renderar en balk och en inline utoever sidfotens. Sidorna var
 * inte fel; regeln raeknade fel sak. Se rulings.md 2026-08-04.
 *
 * ## Vad kontrollen inte goer
 *
 * Den letar inte efter affiliateord utanfoer de tillaatna rutterna. Det aeger
 * `pnpm check:lackor`, med sin egen moensterlista och sitt eget undantag, och
 * tvaa kopior av den listan skulle glida isaer. Den haer raeknar varianter.
 *
 * Koers med `pnpm check:upplysning`.
 */

import fs from "node:fs";
import path from "node:path";

const APP_DIR = "app";
const FOOTER = "components/site/site-footer.tsx";

/** Fangar baade `variant="balk"` och en upplysning helt utan variant. */
const TAG = /<AffiliateDisclosure\b([^>]*)>/g;
const VARIANT = /variant="([a-z]+)"/;

/** Komponentens egen standard naer ingen variant anges. */
const DEFAULT_VARIANT = "box";

/**
 * Sidor som faar rendera samma variant flera gaanger.
 *
 * `/annonsmarkning` aer sjaelva foerklaringen som balken pekar paa, saa daer
 * aer upplysningen sidans aemne. `/styleguide` aer en intern baenk som visar
 * varje variant bredvid varandra.
 */
const UNDANTAG = ["app/annonsmarkning/", "app/styleguide/"];

const problems = [];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const norm = (p) => p.split(path.sep).join("/");

function variantsIn(src) {
  return [...src.matchAll(TAG)].map((m) => {
    const v = m[1].match(VARIANT);
    return v ? v[1] : DEFAULT_VARIANT;
  });
}

/* Sidfoten baer den juridiska, exakt en. Baer den fler aendras foerutsaettningen
   foer varje sida paa sajten samtidigt. */
const footerVariants = variantsIn(fs.readFileSync(FOOTER, "utf8"));
if (footerVariants.length !== 1) {
  problems.push(
    `${FOOTER}\n    sidfoten renderar ${footerVariants.length} upplysningar, foervaentat exakt 1.\n` +
      `    Den gaeller varje sida, saa en extra daer upprepas oeverallt.`,
  );
}

const pages = walk(APP_DIR).filter((f) => path.basename(f) === "page.tsx");
let ok = 0;

for (const file of pages) {
  const rel = norm(file);
  if (UNDANTAG.some((u) => rel.startsWith(u))) continue;

  const variants = variantsIn(fs.readFileSync(file, "utf8"));
  if (!variants.length) {
    ok++;
    continue;
  }

  const seen = new Map();
  for (const v of variants) seen.set(v, (seen.get(v) ?? 0) + 1);

  const repeated = [...seen].filter(([, n]) => n > 1);
  if (repeated.length) {
    problems.push(
      `${rel}\n    ${repeated.map(([v, n]) => `${n} × variant="${v}"`).join(", ")}.\n` +
        `    Samma foersaekring tvaa gaanger i samma tonlaege laeser som oro.\n` +
        `    Se .claude/skills/swedish-voice/references/boundaries.md.`,
    );
    continue;
  }

  /* Sidfotens footer-variant gaeller redan. En egen till paa sidan aer daerfoer
     alltid en dubblett, aeven om sidan bara har en. */
  if (seen.has("footer")) {
    problems.push(
      `${rel}\n    sidan renderar variant="footer", men sidfoten goer det redan paa varje sida.\n` +
        `    Tvaa identiska rader i samma tonlaege, tjugo rader isaer.`,
    );
    continue;
  }

  ok++;
}

if (problems.length) {
  console.error(`\n  ${problems.length} problem med affiliateupplysningen.\n`);
  for (const p of problems) console.error(`  ${p}\n`);
  process.exit(1);
}

console.log(`  ${ok} sidor, ingen upplysning upprepad i samma register.`);
