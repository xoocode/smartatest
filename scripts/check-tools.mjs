#!/usr/bin/env node
/**
 * Fails when a verktyg saknar naagon av sina registreringar.
 *
 * ## Varfoer kontrollen finns
 *
 * Ett verktyg bor paa fem staellen och inget av dem faangas av tsc, eslint
 * eller `next build`:
 *
 *   lib/tools.ts                    registret, med slug, updated och usedOn
 *   components/tools/registry.tsx   TOOL_WIDGETS, slug -> komponent
 *   lib/tool-logic/{namn}.ts        raekningen som ren funktion
 *   mdx-components.tsx              TOOL_SLUGS, MDX-namn -> slug
 *   lib/agent-tools.ts              AGENT_TOOLS, slug -> agentverktyg
 *
 * Den fjaerde aer den som faller tyst. `TOOL_SLUGS` renderar varje namn genom
 * `ToolWidget`, och `ToolWidget` aer det som monterar `AgentTools`. Pekar ett
 * MDX-namn direkt paa sin komponent i staellet renderas kalkylatorn exakt som
 * foerut, ser raett ut i webblaesaren, och exponerar ingenting foer en agent paa
 * just den sidan. Verktygssidan fortsaetter fungera, eftersom
 * `/guider/[slug]` gaar via `ToolWidget` aendaa, saa glappet syns bara paa
 * kategorisidorna.
 *
 * Saa shippade det 2026-08-03 och saa laag det tills naagon raakade fraaga om
 * verktygen fanns paa baada staellena.
 *
 * ## Sex kontroller
 *
 * 1. **Verktyg utan widget.** Slug i registret men inte i TOOL_WIDGETS.
 *    `/guider/{slug}` renderar daa ingenting.
 * 2. **Widget utan verktyg.** Tvaertom: en komponent som ingen sida naar.
 * 3. **MDX-namn mot okaend slug.** TOOL_SLUGS pekar paa naagot registret inte
 *    kaenner till.
 * 4. **Agentverktyg mot okaend slug.** Samma sak i AGENT_TOOLS.
 * 5. **Verktyg i prosa utan TOOL_SLUGS-post.** Den tysta. Ett komponentnamn i
 *    en koepguide som inte gaar via ToolWidget.
 * 6. **usedOn som inte staemmer.** Verktyget baeddas in i en koepguide men
 *    kategorin saknas i dess usedOn, saa verktygssidan laenkar inte tillbaka.
 *
 * Att sakna agentverktyg aer **inget fel**. Daer hela svaret vore den rankade
 * listan vore en produktfri version tom, och raett beslut aer att hoppa oever
 * det. Se .claude/context/build.md.
 *
 * Koers med `pnpm check:tools`.
 */

import fs from "node:fs";
import path from "node:path";

const TOOLS_FILE = "lib/tools.ts";
const WIDGETS_FILE = "components/tools/registry.tsx";
const MDX_FILE = "mdx-components.tsx";
const AGENT_FILE = "lib/agent-tools.ts";
const CONTENT_DIR = "content";

/** MDX-komponenter som inte aer verktyg och alltsaa inte hoer till TOOL_SLUGS. */
const NON_TOOL_COMPONENTS = new Set(["ProductRef", "ServiceRef", "ToolFrame"]);

const problems = [];
const read = (f) => fs.readFileSync(f, "utf8");

/* ------------------------------------------------------------ registret -- */

const toolSrc = read(TOOLS_FILE);
const slugMatches = [...toolSrc.matchAll(/^ {4}slug: "([^"]+)",$/gm)];
const registry = new Map();

for (const [i, m] of slugMatches.entries()) {
  const next = slugMatches[i + 1];
  const block = toolSrc.slice(m.index, next ? next.index : toolSrc.length);
  const usedOn = block.match(/usedOn:\s*\[([\s\S]*?)\]/);
  registry.set(m[1], {
    usedOn: usedOn ? [...usedOn[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]) : [],
  });
}

/* ------------------------------------------------------------- widgetar -- */

const widgetSrc = read(WIDGETS_FILE);
const widgetBlock = widgetSrc.slice(widgetSrc.indexOf("TOOL_WIDGETS"));
/*
 * Nycklar utan bindestreck skrivs utan citattecken, eftersom de aer giltiga
 * JS-identifierare: `lumenraknare: LumenCalculator`. Foersta versionen av det
 * haer skriptet kraevde citattecken och rapporterade daerfoer tre verktyg som
 * saknade widget naer de laag daer hela tiden. Ta baada formerna.
 */
const widgets = new Set(
  [...widgetBlock.matchAll(/^ {2}"?([a-z0-9-]+)"?:/gm)].map((m) => m[1]),
);

for (const slug of registry.keys()) {
  if (!widgets.has(slug)) {
    problems.push(
      `${WIDGETS_FILE}\n    verktyget ${slug} finns i ${TOOLS_FILE} men saknas i TOOL_WIDGETS.\n` +
        `    /guider/${slug} renderar ingen widget.`,
    );
  }
}

for (const slug of widgets) {
  if (!registry.has(slug)) {
    problems.push(
      `${TOOLS_FILE}\n    TOOL_WIDGETS har ${slug} men registret kaenner inte till den.\n` +
        `    Komponenten naas av ingen sida och ligger utanfoer sitemapen.`,
    );
  }
}

/* ----------------------------------------------------------- TOOL_SLUGS -- */

const mdxSrc = read(MDX_FILE);
const slugsBlock = mdxSrc.slice(
  mdxSrc.indexOf("TOOL_SLUGS"),
  mdxSrc.indexOf("TOOL_COMPONENTS"),
);
/** MDX-namn -> slug. Namnet aer det prosan skriver. */
const mdxNames = new Map(
  [...slugsBlock.matchAll(/^ {2}([A-Za-z0-9]+): "([a-z0-9-]+)",$/gm)].map((m) => [
    m[1],
    m[2],
  ]),
);

for (const [name, slug] of mdxNames) {
  if (!registry.has(slug)) {
    problems.push(
      `${MDX_FILE}\n    TOOL_SLUGS mappar ${name} till ${slug}, som inte finns i ${TOOLS_FILE}.\n` +
        `    <${name} /> i en koepguide renderar ingenting.`,
    );
  }
}

/* ---------------------------------------------------------- agentverktyg -- */

const agentSrc = read(AGENT_FILE);
const agentBlock = agentSrc.slice(agentSrc.indexOf("AGENT_TOOLS"));
const agentSlugs = new Set(
  [...agentBlock.matchAll(/^ {2}"?([a-z0-9-]+)"?:/gm)].map((m) => m[1]),
);

for (const slug of agentSlugs) {
  if (!registry.has(slug)) {
    problems.push(
      `${AGENT_FILE}\n    AGENT_TOOLS har ${slug} som inte finns i ${TOOLS_FILE}.\n` +
        `    Agentverktyget naas aldrig, eftersom ToolWidget slaar upp paa slug.`,
    );
  }
}

/* ------------------------------------------------ verktygen i koepguiderna -- */

/** Blankar MDX-kommentarer men behaaller radnumren. Se check-refs.mjs. */
function stripMdxComments(src) {
  return src.replace(/\{\/\*[\s\S]*?\*\/\}/g, (m) => m.replace(/[^\n]/g, " "));
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const guides = walk(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
let embedCount = 0;

for (const file of guides) {
  const src = stripMdxComments(read(file));
  const lines = src.split("\n");
  /** Kategorin aer mappen: content/{slug}/kopguide.mdx. */
  const category = path.relative(CONTENT_DIR, file).split(path.sep)[0];

  for (const [i, line] of lines.entries()) {
    for (const m of line.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)) {
      const name = m[1];
      if (NON_TOOL_COMPONENTS.has(name)) continue;

      if (!mdxNames.has(name)) {
        problems.push(
          `${file}:${i + 1}\n    <${name} /> saknas i TOOL_SLUGS i ${MDX_FILE}.\n` +
            `    Gaar namnet direkt paa sin komponent monteras ingen AgentTools,\n` +
            `    saa widgeten ser raett ut och exponerar ingenting foer en agent.`,
        );
        continue;
      }

      embedCount++;
      const slug = mdxNames.get(name);
      const entry = registry.get(slug);
      if (entry && !entry.usedOn.includes(category)) {
        problems.push(
          `${file}:${i + 1}\n    <${name} /> baeddas in i ${category} men ${slug} har inte\n` +
            `    den kategorin i usedOn. Verktygssidan laenkar inte tillbaka hit,\n` +
            `    och en usedOn-aendring kraever att verktygets updated bumpas.`,
        );
      }
    }
  }
}

/* --------------------------------- ventilpassningens produktlista i takt -- */

/**
 * Verktyget `vilken-termostat-passar-min-ventil` bar sin egen produktlista i
 * lib/tool-logic/ventilpassning.ts i staellet foer att laesa `specs`.
 *
 * Skaelet staar i filhuvudet: faeltet skiljer paa vad som ingaar, vad som
 * saeljs separat och vad tillverkaren uttryckligen inte levererar, och det
 * faar inte plats i en spec-rad. Priset foer det aer tvaa listor som kan glida
 * isaer, och en produkt som byts ut paa sidan utan att verktyget foeljer med
 * ger ett svar om en termostat vi inte laengre rankar.
 *
 * Kontrollen goer den risken till ett fel i staellet foer till en kommentar.
 */
const VENTILFIL = "lib/tool-logic/ventilpassning.ts";
const TERMOSTATDATA = "lib/data/smart-termostat.ts";
let ventilPar = 0;

if (fs.existsSync(VENTILFIL) && fs.existsSync(TERMOSTATDATA)) {
  const idn = (src) =>
    new Set([...src.matchAll(/^ {4}id: "([a-z0-9-]+)",/gm)].map((m) => m[1]));

  const verktygIds = idn(read(VENTILFIL));
  const sidIds = idn(read(TERMOSTATDATA));

  const saknasIVerktyget = [...sidIds].filter((id) => !verktygIds.has(id));
  const saknasPaSidan = [...verktygIds].filter((id) => !sidIds.has(id));

  if (saknasIVerktyget.length) {
    problems.push(
      VENTILFIL +
        "\n    " + saknasIVerktyget.length + " rankad(e) produkt(er) saknas i verktygets lista:" +
        "\n    " + saknasIVerktyget.join(", ") +
        "\n    Ventilvaeljaren svarar daa som om produkten inte fanns.",
    );
  }
  if (saknasPaSidan.length) {
    problems.push(
      VENTILFIL +
        "\n    " + saknasPaSidan.length + " produkt(er) i verktyget rankas inte laengre paa sidan:" +
        "\n    " + saknasPaSidan.join(", ") +
        "\n    Verktyget rekommenderar daa en termostat vi tagit bort.",
    );
  }

  ventilPar = verktygIds.size;
}

/* -------------------------------------------------------------- rapport -- */

if (problems.length) {
  console.error(`\n  ${problems.length} problem med verktygsregistreringar.\n`);
  for (const p of problems) console.error(`  ${p}\n`);
  process.exit(1);
}

console.log(`  ${registry.size} verktyg, alla med widget och registerpost.`);
console.log(`  ${mdxNames.size} MDX-namn, alla via ToolWidget.`);
console.log(`  ${embedCount} inbaeddningar i koepguider, alla med usedOn som staemmer.`);
console.log(`  ${agentSlugs.size} av ${registry.size} verktyg har agentverktyg.`);
if (ventilPar) {
  console.log(`  ${ventilPar} produkter i ventilvaeljaren, samma som sidan rankar.`);
}
