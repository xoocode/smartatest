#!/usr/bin/env node
/**
 * Fails when a product reference cannot resolve.
 *
 * ## Varför kontrollen finns
 *
 * `<ProductRef id="..." />` i en MDX-koepguide slaar upp produkten i
 * `ALL_PRODUCTS`. Hittas den inte returnerar komponenten `null` med flit,
 * eftersom ett kraschat bygge vore saemre aen ett tappat produktnamn. Priset
 * aer att felet blir helt tyst: prosan tappar ett namn mitt i en mening och
 * varken tsc, eslint eller `next build` saeger ett ord.
 *
 * Det haende. Fram till 2026-08-01 saknades tvaa produktlistor i
 * `lib/data/index.ts`, vilket slaeckte sjutton referenser i tvaa koepguider.
 * Kommentaren daer haenvisade till en `pnpm check:refs` som inte fanns. Det
 * haer aer den.
 *
 * ## Tre kontroller
 *
 * 1. **Oregistrerad datafil.** Varje `lib/data/*.ts` som exporterar en
 *    `*_PRODUCTS`-lista maaste finnas i `ALL_PRODUCTS`. Det aer grundorsaken:
 *    en ny kategori faar sin datafil och ingen kommer ihaag registreringen.
 * 2. **Okaend referens.** Varje `<ProductRef id>` i `content/` maaste peka paa
 *    en produkt i en registrerad fil.
 * 3. **Dubblerat id.** Tvaa produkter med samma id goer `findProduct`
 *    godtycklig, och `/till/{id}` skickar laesaren till fel butik.
 * 4. **Datum som glidit isaer.** Sidans `const UPDATED` och katalogens
 *    `updated` maaste vara samma dag. Se avsnittet vid kontrollen.
 * 5. **Verktyg som halkat efter.** Ett verktygs `updated` faar inte vara
 *    aeldre aen den nyaste kategorin i dess `usedOn`.
 *
 * Koers med `pnpm check:refs`.
 */

import fs from "node:fs";
import path from "node:path";

const DATA_DIR = "lib/data";
const INDEX_FILE = path.join(DATA_DIR, "index.ts");
const CONTENT_DIR = "content";

/** Produkter deklareras som `id: "..."`. Typrader (`id: string;`) matchar inte. */
const ID_RE = /^\s*id: "([^"]+)"/gm;
/*
 * Tjaenster foeljer samma moenster som produkter men med egna namn: en datafil
 * exporterar `*_SERVICES`, index.ts sprider in dem i ALL_SERVICES och MDX
 * refererar dem med <ServiceRef>. Utan de haer tre raderna hade hemlarmsfilen
 * legat utanfoer grinden, alltsaa exakt den blinda flaeck skriptet skrevs foer
 * att staenga.
 */
const EXPORT_RE = /export const ([A-Z0-9_]+_(?:PRODUCTS|SERVICES))\b/g;
const REF_RE = /<(?:Product|Service)Ref\b[^>]*\bid="([^"]+)"/g;

const problems = [];

/**
 * Blankar MDX-kommentarer men behaller radnumren.
 *
 * Varje koepguide inleds med ett `{/* ... *\/}` som foerklarar hur filen
 * fungerar, och den texten namner `<ProductRef id="..." />` som exempel. Utan
 * det haer rapporterades id:t `...` som en trasig referens i varenda fil,
 * alltsaa nio falska larm som hade laert laesaren att ignorera utfallet.
 */
function stripMdxComments(src) {
  return src.replace(/\{\/\*[\s\S]*?\*\/\}/g, (m) =>
    m.replace(/[^\n]/g, " "),
  );
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

/* ---------------------------------------------- 1. registrerade datafiler -- */

const indexSrc = fs.readFileSync(INDEX_FILE, "utf8");

/** Namnen som faktiskt spreds in i ALL_PRODUCTS, inte bara importerats. */
const spreadIn = new Set(
  [...indexSrc.matchAll(/\.\.\.([A-Z0-9_]+_(?:PRODUCTS|SERVICES))/g)].map(
    (m) => m[1],
  ),
);

const dataFiles = fs
  .readdirSync(DATA_DIR)
  .filter((f) => f.endsWith(".ts") && f !== "index.ts")
  .map((f) => path.join(DATA_DIR, f));

/** id -> fil, bara for registrerade filer. Referenser loses mot den har. */
const known = new Map();
/** id -> fil, aven for oregistrerade, sa vi kan ge ett battre felmeddelande. */
const anywhere = new Map();
const duplicates = [];

for (const file of dataFiles) {
  const src = fs.readFileSync(file, "utf8");
  const exports = [...src.matchAll(EXPORT_RE)].map((m) => m[1]);
  if (!exports.length) continue;

  const missing = exports.filter((name) => !spreadIn.has(name));
  const registered = missing.length === 0;

  if (!registered) {
    problems.push(
      `${file}\n    ${missing.join(", ")} saknas i ALL_PRODUCTS/ALL_SERVICES i ${INDEX_FILE}.\n` +
        `    Varje <ProductRef> mot den har filen renderar ingenting.`,
    );
  }

  for (const m of src.matchAll(ID_RE)) {
    const id = m[1];
    if (anywhere.has(id) && anywhere.get(id) !== file) {
      duplicates.push(`${id} finns i bade ${anywhere.get(id)} och ${file}`);
    }
    anywhere.set(id, file);
    if (registered) known.set(id, file);
  }
}

/* ------------------------------------------------------- 2. referenserna -- */

const contentFiles = walk(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
let refCount = 0;

for (const file of contentFiles) {
  const src = stripMdxComments(fs.readFileSync(file, "utf8"));
  const lines = src.split("\n");

  for (const [i, line] of lines.entries()) {
    for (const m of line.matchAll(REF_RE)) {
      refCount++;
      const id = m[1];
      if (known.has(id)) continue;

      const hint = anywhere.has(id)
        ? `id:t finns i ${anywhere.get(id)}, men den filen ar inte registrerad`
        : "id:t finns inte i nagon datafil";
      problems.push(`${file}:${i + 1}\n    <ProductRef id="${id}"> ${hint}.`);
    }
  }
}

/* -------------------------------------------------------- 3. dubbletter -- */

for (const d of duplicates) problems.push(`Dubblerat produkt-id\n    ${d}.`);

/* ------------------------------------------------------------- 4. datum -- */

/**
 * Sidans `const UPDATED` mot sitemapens `updated`.
 *
 * Sitemapen kan inte laesa en konstant inuti en sidkomponent utan att dra in
 * hela komponenttraedet, saa datumet staar paa tvaa staellen: paa sidan, daer
 * `UpdatedStamp` och schemat laeser det, och i `lib/catalog.ts` eller
 * `lib/updated.ts`, daer `<lastmod>` laeser det.
 *
 * Tvaa kopior av samma datum glider isaer. Det haer aer varfoer det inte gaar
 * att goera tyst: en sida som redigeras utan att katalogen foeljer med skickar
 * ett foer gammalt `lastmod` till Google, och blir daerfoer inte omindexerad.
 *
 * Kontrollen faeller ocksaa en byggd kategorisida som helt saknar `updated` i
 * katalogen, eftersom den adressen daa hamnar i sitemapen utan datum alls.
 */

const APP_DIR = "app";
const CATALOG_FILE = "lib/catalog.ts";
const UPDATED_FILE = "lib/updated.ts";

/** Parar ihop varje `updated: "..."` med naermast foeregaaende `href: "..."`. */
function catalogDates(src) {
  const hrefs = [...src.matchAll(/^ {4}href: "([^"]+)",$/gm)];
  const out = new Map();
  for (const m of src.matchAll(/^ {4}updated: "([^"]+)",$/gm)) {
    const owner = hrefs.filter((h) => h.index < m.index).pop();
    if (owner) out.set(owner[1], m[1]);
  }
  return out;
}

const expected = new Map();
for (const [href, date] of catalogDates(fs.readFileSync(CATALOG_FILE, "utf8"))) {
  expected.set(href, { date, source: CATALOG_FILE });
}
for (const m of fs
  .readFileSync(UPDATED_FILE, "utf8")
  .matchAll(/^ {2}"(\/[^"]*)": "(\d{4}-\d{2}-\d{2})",$/gm)) {
  expected.set(m[1], { date: m[2], source: UPDATED_FILE });
}

/** Kategorier som har en sidfil, alltsaa de som faktiskt gaar att publicera. */
const catalogHrefs = new Set(
  [...fs.readFileSync(CATALOG_FILE, "utf8").matchAll(/^ {4}href: "([^"]+)",$/gm)].map(
    (m) => m[1],
  ),
);

let dateCount = 0;

for (const dir of fs.readdirSync(APP_DIR, { withFileTypes: true })) {
  if (!dir.isDirectory() || dir.name.startsWith("[")) continue;
  const page = path.join(APP_DIR, dir.name, "page.tsx");
  if (!fs.existsSync(page)) continue;

  const href = `/${dir.name}`;
  const found = fs
    .readFileSync(page, "utf8")
    .match(/^const UPDATED = "(\d{4}-\d{2}-\d{2})";$/m);

  const want = expected.get(href);

  /* Sidor helt utan datumstaempel, till exempel /kontakt och /ordlista. Deras
     datum staar bara i lib/updated.ts och har alltsaa inget att glida ifraan.
     Kategorisidorna aer undantaget: daer aer stampeln en del av mallen, och en
     saknad `updated` i katalogen faangas av naesta gren. */
  if (!found) continue;

  if (!want) {
    if (catalogHrefs.has(href)) {
      problems.push(
        `${page}\n    sidan har UPDATED ${found[1]} men posten i ${CATALOG_FILE} saknar \`updated\`.\n` +
          `    Adressen hamnar i sitemapen utan lastmod den dag kategorin gaar live.`,
      );
    } else {
      /* ⚠️ Den har grenen fanns inte fore 2026-08-04, och avsaknaden var ett
         verkligt fel. `/hem-hushall` hade `const UPDATED` och visade "Senast
         uppdaterad 3 augusti" for lasaren, men saknades i lib/updated.ts. Den
         gamla koden felade bara for kategorisidor, sa gruppsidan gled igenom
         tyst och hamnade i sitemapen helt utan lastmod.

         Varje sida som visar ett datum for lasaren ska ha samma datum i
         sitemapen. Har sidan ingen stampel alls hoppas den over ovan, och da
         finns inget att glida ifraan. */
      problems.push(
        `${page}\n    sidan har UPDATED ${found[1]} men varken ${UPDATED_FILE} eller ${CATALOG_FILE} anger ett datum.\n` +
          `    Lasaren ser ett datum som sitemapen saknar. Lagg till adressen i PAGE_UPDATED.`,
      );
    }
    continue;
  }

  if (found[1] !== want.date) {
    problems.push(
      `${page}\n    UPDATED ${found[1]} men ${want.source} anger ${want.date}.\n` +
        `    Sitemapens lastmod skulle bli fel. Aendra baada till samma dag.`,
    );
    continue;
  }

  dateCount++;
}

/**
 * Verktygens `updated` mot kategorierna i `usedOn`.
 *
 * Verktygssidan listar de tester som baeddar in verktyget, och den listan
 * kommer ur `usedOn`. Laeggs en kategori till daer aendras alltsaa sidan, och
 * daa maaste `updated` foelja med. Annars saeger sitemapen att sidan aer
 * oroerd sedan i foervaeg och Google laater bli att haemta om den.
 *
 * Kontrollen aer en olikhet och inte en likhet: ett verktyg faar mycket vael
 * vara nyare aen sina kategorier, till exempel naer bara dess egen FAQ
 * skrivits om. Det faar bara aldrig vara aeldre.
 */

const TOOLS_FILE = "lib/tools.ts";
const toolSrc = fs.readFileSync(TOOLS_FILE, "utf8");
const toolSlugs = [...toolSrc.matchAll(/^ {4}slug: "([^"]+)",$/gm)];

let toolCount = 0;

for (const m of toolSrc.matchAll(/^ {4}usedOn: (\[[^\]]*\]),$/gms)) {
  const owner = toolSlugs.filter((s) => s.index < m.index).pop();
  const slug = owner ? owner[1] : "(okaent)";

  const after = toolSrc.slice(m.index + m[0].length);
  const own = after.match(/^\s*updated: "(\d{4}-\d{2}-\d{2})",/);
  if (!own) {
    problems.push(
      `${TOOLS_FILE}\n    verktyget ${slug} saknar \`updated\`.\n` +
        `    Adressen hamnar i sitemapen utan lastmod.`,
    );
    continue;
  }

  const used = [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  const newest = used
    .map((u) => {
      const e = expected.get(`/${u}`);
      return e ? { slug: u, date: e.date } : null;
    })
    .filter(Boolean)
    .reduce((a, b) => (a && a.date > b.date ? a : b), null);

  if (newest && own[1] < newest.date) {
    problems.push(
      `${TOOLS_FILE}\n    verktyget ${slug} har updated ${own[1]} men bygger paa ${newest.slug} (${newest.date}).\n` +
        `    Sidan listar det testet, saa den aendrades minst den dagen. Bump verktygets updated.`,
    );
    continue;
  }

  toolCount++;
}

/* ------------------------------------------------------------- rapport -- */

if (problems.length) {
  console.error(`\n  ${problems.length} problem med produktreferenser.\n`);
  for (const p of problems) console.error(`  ${p}\n`);
  process.exit(1);
}

console.log(
  `  ${refCount} produktreferenser i ${contentFiles.length} filer, alla losta.`,
);
console.log(`  ${dataFiles.length} datafiler, alla registrerade i ALL_PRODUCTS/ALL_SERVICES.`);
console.log(`  ${dateCount} sidor, UPDATED stammer med sitemapens datum.`);
console.log(`  ${toolCount} verktyg, updated ar minst sa nytt som kategorierna.`);
