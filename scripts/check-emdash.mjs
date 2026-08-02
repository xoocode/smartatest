#!/usr/bin/env node
/**
 * Fails if an em dash reaches user-facing text.
 *
 * Standing editorial rule: no em dashes anywhere a reader can see them. They
 * read as machine-written to a Swedish audience and put people off, which is
 * the opposite of what a site selling trust needs.
 *
 * Comments are exempt. They are for us, not for readers, and stripping them
 * first is what keeps this check usable rather than noisy.
 *
 * En dashes are fine and expected: Swedish ranges like 2 200-6 500 K and
 * empty-value placeholders both use them correctly.
 *
 * Run with `pnpm check:emdash`.
 */

import fs from "node:fs";
import path from "node:path";

const ROOTS = ["content", "lib", "components", "app"];
const EXTS = new Set([".ts", ".tsx", ".mdx"]);
const EM_DASH = "—";

/** Blank out comments while preserving line numbers. */
function stripComments(src) {
  const blank = (m) => m.replace(/[^\n]/g, " ");
  return src
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, blank);
}

const hits = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!EXTS.has(path.extname(entry.name))) continue;

    stripComments(fs.readFileSync(full, "utf8"))
      .split("\n")
      .forEach((line, i) => {
        if (line.includes(EM_DASH)) {
          hits.push(`  ${full}:${i + 1}\n    ${line.trim().slice(0, 100)}`);
        }
      });
  }
}

for (const root of ROOTS) if (fs.existsSync(root)) walk(root);

if (hits.length) {
  console.error(
    `\n  ${hits.length} em-streck i text som lasaren ser.\n` +
      `  Byt mot punkt, kolon eller kommatecken.\n\n${hits.join("\n\n")}\n`,
  );
  process.exit(1);
}

console.log("  Inga em-streck i anvandartext.");
