#!/usr/bin/env node
/**
 * Faeller text som handlar om vad en kaella publicerat i staellet foer om
 * produkten.
 *
 * ## Varfoer kontrollen finns
 *
 * `check:lackor` faeller naer vi beraettar om **vaart eget** arbete. Det haer
 * aer samma fel med naagon annan som subjekt: vad tillverkaren, butiken,
 * manualen eller rapporten har eller inte har skrivit. Det aer svaarare att
 * upptaecka, eftersom det ser ut som research.
 *
 * `/fonsterputsrobot` byggde hela sin premiss paa det. Naer premissen togs bort
 * 2026-08-04 kom samma moenster tillbaka paa `/nyckelskap` en dag senare, men
 * flyttat: ut ur omdoemena och in i sektionernas `description`. Regeln i prosa
 * raeckte alltsaa inte.
 *
 * ## Varfoer den maaste vara faeltmedveten
 *
 * Kaellaeget har ett sanktionerat hem: viktningen. `methodology` i
 * lib/test-pages.ts och `footnote` paa MethodologyBlock **ska** foerklara att
 * en okontrollerbar uppgift kostar poaeng. En helfilssoekning hade faellt just
 * de straengarna, vilket aer skaelet till att den haer kontrollen laeser faelt
 * och inte filer.
 *
 *   Laeses:  verdict, tagline, superlative, pros, cons, answer i lib/data/*.ts
 *            description= och title= i app/<slug>/page.tsx
 *   Laeses inte: methodology, criteria[].description, footnote=, reason,
 *            kommentarer, allt utanfoer de tvaa katalogerna
 *
 * `reason` i oevervaegda produkter aer undantagen med flit: den ska foerklara
 * varfoer en produkt inte rankas, och "gick inte att hitta hos naagon
 * aaterfoersaeljare" aer daa raett svar.
 *
 * ## Tvaa nivaaer
 *
 * FAELLER paa formuleringar som aldrig kan vara raett i ett saeljande faelt.
 * RAEKNAS paa saadant som kan vara befogat: att en produkt aer provad av ett
 * institut aer i vissa kategorier ett verkligt koepargument.
 *
 * ## Rapporterar globalt, faeller per sida
 *
 * Foersta koerningen gav **167 traeffar oever 25 sidor**. Moenstret aer alltsaa
 * sajtens vana och inte ett misstag paa en sida, och en faellande kontroll hade
 * blockerat repot paa arbete som kraever att naagon skriver om varje mening.
 *
 * Daerfoer: `pnpm check` rapporterar summan, och `/fix-page` koer
 * `--sida <slug> --strict` paa den sida som haaller paa att fixas. En sida som
 * aer omgjord ska komma ut paa noll, medan resten av sajten faar staa kvar tills
 * den ocksaa aer omgjord.
 *
 *   node scripts/check-kallprat.mjs                     rapport, exit 0
 *   node scripts/check-kallprat.mjs --sida nyckelskap   bara den sidan
 *   node scripts/check-kallprat.mjs --strict            exit 1 vid traeff
 *
 * Koers med `pnpm check:kallprat`.
 */

import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const STRICT = argv.includes("--strict");
const SIDA = (() => {
  const i = argv.indexOf("--sida");
  return i === -1 ? undefined : argv[i + 1];
})();

/** Aldrig raett i ett laesarfaelt. */
const FAELLER = [
  [/(?<![\wåäöÅÄÖ])vi (lånar|fyller|flyttar|hämtar) (aldrig|inte)/gi, "vår egen källpolicy"],
  [/inte kontrollerade av oss/gi, "vår egen källpolicy"],
  [/läst i (sin helhet|original)/gi, "berättad research"],
  [/(anger|publicerar|skriver|redovisar|uppger) (ingen|inget|inga|inte)(?![\wåäöÅÄÖ])/gi, "vad en källa inte skrivit"],
  [/ingen (annan |)(tillverkare|butik|leverantör) (anger|publicerar|skriver)/gi, "vad en källa inte skrivit"],
  [/(tillverkaren|tillverkarna|butiken|manualen|produktbladet|rapporten)s? (egna |)(anger|skriver|publicerar|säger|nämner|tiger)/gi, "dokumentet som subjekt"],
  [/(?<![\wåäöÅÄÖ])(står|finns) (det |)ingenstans/gi, "vad en källa inte skrivit"],
  [/ej angiv(en|et|na)/gi, "tabellvärde i prosa"],
  [/(vi |)vet minst om/gi, "vårt eget kunskapsläge"],
  [/opröva(d|t|de|des)(?![\wåäöÅÄÖ])/gi, "bevisläget som egenskap"],
  [/publicerad(e|) uppgift/gi, "vad en källa inte skrivit"],
  [/får du (inget |)besked/gi, "dokumentet som subjekt"],
];

/** Kan vara befogat. Raeknas, faeller inte. */
const RAEKNAS = [
  [/eget (test|prov)?resultat/gi, "produktens provstatus som argument"],
  [/provad av/gi, "produktens provstatus som argument"],
  [/enligt tillverkaren/gi, "attribuering i prosa"],
];

/** `namn: "..."` och `namn: ["...", "..."]` ur ett block. */
function straengfaelt(block, namn) {
  const ut = [];
  const enkel = new RegExp(namn + ':\\s*\\n?\\s*("(?:[^"\\\\]|\\\\.)*")', "g");
  for (const [, raw] of block.matchAll(enkel)) ut.push(raw);
  const lista = new RegExp(namn + ":\\s*\\[([\\s\\S]*?)\\n\\s*\\],", "g");
  for (const [, inre] of block.matchAll(lista)) {
    for (const [, raw] of inre.matchAll(/("(?:[^"\\]|\\.)*")/g)) ut.push(raw);
  }
  return ut.map((r) => {
    try {
      return JSON.parse(r);
    } catch {
      return r.slice(1, -1);
    }
  });
}

const traeffar = [];
const raeknade = new Map();

function granska(text, var_) {
  for (const [re, klass] of FAELLER) {
    for (const m of text.matchAll(re)) {
      traeffar.push({ var: var_, klass, text: m[0], rad: text.slice(0, m.index) });
    }
  }
  for (const [re, klass] of RAEKNAS) {
    const n = [...text.matchAll(re)].length;
    if (n) raeknade.set(klass, (raeknade.get(klass) ?? 0) + n);
  }
}

/* ---------------------------------------------------------- lib/data/*.ts */

const DATA = "lib/data";
for (const fil of fs.readdirSync(DATA).filter((f) => f.endsWith(".ts")).sort()) {
  const slug = fil.replace(/\.ts$/, "");
  if (SIDA && slug !== SIDA) continue;
  const src = fs.readFileSync(path.join(DATA, fil), "utf8");

  /* Kommentarer bort. De aer till foer oss och foerklarar med raetta
     kaellaeget. */
  const ren = src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/^\s*\/\/.*$/gm, (m) => m.replace(/[^\n]/g, " "));

  /* Oevervaegda produkter har `reason`, som ska foerklara bortvalet. Klipp
     bort hela listan innan naagot annat laeses. */
  const utanOvervagda = ren.replace(/_CONSIDERED[\s\S]*?\n\];/g, (m) =>
    m.replace(/[^\n]/g, " "),
  );

  for (const namn of ["verdict", "tagline", "superlative", "pros", "cons", "answer"]) {
    for (const text of straengfaelt(utanOvervagda, namn)) {
      granska(text, `${slug} · ${namn}`);
    }
  }
}

/* ------------------------------------------------------ app/<slug>/page.tsx */

for (const post of fs.readdirSync("app", { withFileTypes: true })) {
  if (!post.isDirectory()) continue;
  if (SIDA && post.name !== SIDA) continue;
  const fil = path.join("app", post.name, "page.tsx");
  if (!fs.existsSync(fil)) continue;

  const src = fs
    .readFileSync(fil, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, (m) => m.replace(/[^\n]/g, " "));

  /* `footnote=` aer viktningens hem och laeses inte. */
  const utanFotnot = src.replace(/footnote=\{?"[\s\S]*?"\}?/g, (m) =>
    m.replace(/[^\n]/g, " "),
  );

  for (const m of utanFotnot.matchAll(/\b(description|title)=\{?"((?:[^"\\]|\\.)*)"\}?/g)) {
    granska(m[2], `${post.name} · ${m[1]}=`);
  }
}

/* ------------------------------------------------------------------ utskrift */

const skriv = STRICT ? console.error : console.log;

if (traeffar.length) {
  const sidor = new Set(traeffar.map((t) => t.var.split(" · ")[0]));
  skriv(
    `\n  ${traeffar.length} fall av källprat i läsartext` +
      (SIDA ? ` på /${SIDA}` : ` över ${sidor.size} sidor`) +
      `.\n`,
  );

  const perVar = new Map();
  for (const t of traeffar) {
    if (!perVar.has(t.var)) perVar.set(t.var, []);
    perVar.get(t.var).push(t);
  }

  /* Utan --sida blir 167 rader oläsbart. Summera per sida i stället, och
     visa varje träff bara när någon faktiskt arbetar på en sida. */
  if (SIDA || STRICT) {
    for (const [var_, lista] of perVar) {
      skriv(`  ${var_}`);
      for (const t of lista) skriv(`      "${t.text}"  — ${t.klass}`);
      skriv("");
    }
  } else {
    const perSida = new Map();
    for (const t of traeffar) {
      const s = t.var.split(" · ")[0];
      perSida.set(s, (perSida.get(s) ?? 0) + 1);
    }
    for (const [s, n] of [...perSida].sort((a, b) => b[1] - a[1])) {
      skriv(`    ${String(n).padStart(4)}  ${s}`);
    }
    skriv("");
  }

  skriv(
    `  En okänd uppgift är produktens egenskap, aldrig källans beteende:\n` +
      `      "Ecovacs anger ingen hålltid"  →  "hur länge den sitter kvar är okänt"\n` +
      `      "Motståndet är oprövat"        →  "hur länge den håller mot en kofot är okänt"\n\n` +
      `  Källäget hör hemma i viktningen, en gång. Se swedish-voice,\n` +
      `  references/who-you-are.md. Kör med --sida <slug> för rad för rad.\n`,
  );

  if (STRICT) process.exit(1);
}

if (raeknade.size) {
  console.log("  Räknas, fäller inte:");
  for (const [klass, n] of [...raeknade].sort((a, b) => b[1] - a[1])) {
    console.log(`    ${String(n).padStart(4)}  ${klass}`);
  }
  console.log("");
} else {
  console.log("  Inget källprat i läsartext.");
}
