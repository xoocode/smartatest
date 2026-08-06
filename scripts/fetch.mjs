/*
 * One command for reading a page, with an escalation ladder.
 *
 *   node scripts/fetch.mjs <url>
 *   node scripts/fetch.mjs <url> --find "vikt,mått,standby"
 *   node scripts/fetch.mjs <url> --raw          full text, not the summary
 *   node scripts/fetch.mjs <url> --rung jina    force one rung
 *
 * ## Why this exists
 *
 * On 2026-08-05 we checked fifteen published claims that a fact was not
 * available. Nine were false. Every one of them came from a tool returning
 * nothing and that nothing being read as an answer:
 *
 *   - Kjell renders its specifications with JavaScript, so curl sees an empty
 *     page. Three false claims.
 *   - Kjell also writes them as prose rather than a table, so a scraper looking
 *     for <tr> finds nothing even after rendering. Same three.
 *   - Netatmo's help centre answers 403 to Playwright and to WebFetch alike.
 *     One claim published with no source read at all.
 *   - Delock answers 401 and renders the whole page anyway. One false claim.
 *
 * So the point of this script is not that it fetches. It is that it **says
 * which rung answered**. A run that reports "curl 0 bytes, jina 16 433 bytes"
 * makes silence impossible to mistake for absence, which is the single failure
 * behind every one of those nine.
 *
 * ## The ladder
 *
 * 1. curl      — fastest, and enough for server-rendered pages and JSON-LD.
 * 2. jina      — r.jina.ai renders JavaScript and returns markdown. Free, no
 *                key. Measured to walk through the Cloudflare bot check that
 *                stops both Playwright and WebFetch.
 * 3. playwright — a real browser. Handles single-page apps that jina returns
 *                empty, dismisses cookie banners, and opens the tabs that hide
 *                specifications and manuals.
 *
 * No rung wins everywhere, which is the reason there are three. Delock needs
 * playwright and defeats jina; Netatmo's help centre needs jina and defeats
 * playwright; Kjell is answered by either.
 *
 * When all three come back thin, that is still not an absence. Escalate to a
 * real browser session with the Chrome tools, which carry a genuine profile and
 * fingerprint. See .claude/references/establishing-absence.md.
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const args = process.argv.slice(2);
const url = args.find((a) => a.startsWith("http"));
const flag = (name) => {
  const i = args.indexOf("--" + name);
  return i === -1 ? undefined : (args[i + 1] ?? true);
};

const gtin = flag("gtin");

if (!url && !gtin) {
  console.error(
    "node scripts/fetch.mjs <url> [--find a,b] [--raw] [--rung curl|jina|playwright]\n" +
    "node scripts/fetch.mjs --gtin <gtin> [--lang sv]   structured specs from Icecat",
  );
  process.exit(1);
}

if (gtin) {
  const r = viaIcecat(String(gtin), String(flag("lang") ?? "sv"));
  console.log("\nGTIN " + gtin);
  if (!r.pairs?.length) {
    console.log("  ingen data: " + (r.note ?? "tomt svar"));
    console.log(
      "\n  Detta betyder INTE att uppgiften saknas hos tillverkaren. Icecats\n" +
      "  täckning följer varumärkessponsring. Gå vidare till tillverkarens\n" +
      "  egen sida. Se .claude/references/establishing-absence.md.",
    );
    process.exit(0);
  }
  console.log("  " + r.title + (r.supplier ? "   [" + r.supplier + "]" : ""));
  console.log("  " + r.pairs.length + " egenskaper, källa Icecat (tier B, inte tillverkaren)\n");
  r.pairs.forEach(([k, v]) => console.log("   " + k.slice(0, 38).padEnd(40) + v.slice(0, 60)));
  if (r.pdf?.length) console.log("\n  PDF: " + r.pdf.join("\n       "));
  console.log("\n  Pris finns inte här och ska läsas hos butiken.");
  process.exit(0);
}

const terms = String(flag("find") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
const only = flag("rung");
const raw = Boolean(flag("raw"));

/* ── helpers ─────────────────────────────────────────────────────────────── */

const clean = (s) => (s ?? "").replace(/\s+/g, " ").trim();

/** Strip tags, scripts and styles. Good enough to tell content from a wall. */
function toText(html) {
  return clean(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&"),
  );
}

/** Newest installed Playwright chromium, so a version bump does not break us. */
function chromePath() {
  const base = path.join(process.env.LOCALAPPDATA ?? "", "ms-playwright");
  if (!fs.existsSync(base)) return undefined;
  const builds = fs
    .readdirSync(base)
    .filter((d) => d.startsWith("chromium-"))
    .map((d) => ({ d, n: Number(d.split("-")[1]) || 0 }))
    .sort((a, b) => b.n - a.n);
  /* ⚠️ Mappen heter olika i olika byggen: 1155 har `chrome-win`, 1208 och
     senare har `chrome-win64`. Tidigare provades bara `chrome-win`, vilket
     innebar att funktionen tyst hoppade foerbi de tre nyaste byggena och
     landade paa det aeldsta. Den hade slutat fungera helt den dag 1155
     rensas bort. Hittat 2026-08-06 naer /babyvakt byggdes. */
  for (const { d } of builds) {
    for (const mapp of ["chrome-win64", "chrome-win"]) {
      const exe = path.join(base, d, mapp, "chrome.exe");
      if (fs.existsSync(exe)) return exe;
    }
  }
  return undefined;
}

/* ── rung 0: icecat by GTIN ──────────────────────────────────────────────── */

/*
 * Structured specifications without fetching a page at all, when we hold a
 * GTIN. Worth trying first because it is one call and returns a parsed feature
 * list rather than text to be mined.
 *
 * ⚠️ Three things it is NOT, all measured 2026-08-05:
 *
 * 1. **Not a price.** Icecat carries no price, and ours must come from the
 *    retailer's own page regardless. That fetch still happens.
 * 2. **Not the manufacturer.** The response carries Quality="ICECAT", meaning
 *    Icecat's editors compiled it. That is a tier B source: a safety-shaped
 *    value still needs the manufacturer or two agreeing sources.
 * 3. **Not evidence of absence.** Coverage follows brand sponsorship, so a
 *    missing field means "not supplied to Icecat" and nothing more. Measured on
 *    our own catalogue: of 55 products with a GTIN, 18 % return data on the
 *    free tier, 53 % are locked behind Full Icecat, and 18 % are not in the
 *    catalogue at all. Never conclude "unpublished" from silence here.
 *
 * ## ⏳ Full Icecat är ansökt, svar inte inkommet (2026-08-06)
 *
 * De 53 procenten bakom betalnivån är alltså inte ett permanent tak. Peter har
 * ansökt om Full Icecat och väntar på besked.
 *
 * **Så här ser du att det landat:** felet `You are not allowed to have Full
 * Icecat access` slutar dyka upp och samma GTIN börjar svara. Prova
 * `0190074000324`, som i dag är låst.
 *
 * Händer det: byt token i `C:/code/credentials/icecat/credentials.json` om
 * Icecat utfärdar en ny, kör om mätningen över katalogens GTIN och **uppdatera
 * 18/53/18 på de fyra ställen talen står**: här, `spec-sourcing.md`, båda
 * skillarnas gap-pass och `nattpass-runbook.md`. Träffgraden går då från ungefär
 * en av fem till ungefär sju av tio, vilket ändrar hur mycket manuellt arbete
 * varje gap-pass kostar.
 */
function viaIcecat(gtin, lang = "sv") {
  let c;
  try {
    c = JSON.parse(fs.readFileSync("C:/code/credentials/icecat/credentials.json", "utf8"));
  } catch {
    return { text: "", note: "no icecat credentials" };
  }
  if (!c.apiToken || c.apiToken.startsWith("PASTE")) return { text: "", note: "icecat token not set" };

  const r = spawnSync(
    "curl",
    ["-sL", "--max-time", "45", "-H", "Api-Token: " + c.apiToken,
      `${c.baseUrl}?ean_upc=${gtin}&lang=${lang}&output=productxml`],
    { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
  );
  const xml = r.stdout ?? "";
  const err = (xml.match(/ErrorMessage="([^"]+)"/) || [])[1];
  if (err) return { text: "", note: err.slice(0, 60) };

  /* Presentation_Value carries the human-readable value with its unit; the
     nested <Name Value> is the localised feature name. */
  const pairs = [...xml.matchAll(/<ProductFeature[^>]*Presentation_Value="([^"]*)"[\s\S]{0,400}?<Name[^>]*Value="([^"]*)"/g)]
    .map((m) => [m[2], m[1]])
    .filter(([k, v]) => k && v);

  return {
    pairs,
    text: pairs.map(([k, v]) => `${k}: ${v}`).join(" · "),
    title: (xml.match(/Title="([^"]{0,120})/) || [])[1] ?? "",
    supplier: (xml.match(/<Supplier[^>]*Name="([^"]+)/) || [])[1] ?? "",
    pdf: [...new Set([...xml.matchAll(/URL="([^"]+\.pdf[^"]*)"/gi)].map((m) => m[1]))].slice(0, 6),
  };
}

/* ── PDFs ────────────────────────────────────────────────────────────────── */

/*
 * The manual is the highest-yield source on this site, and until 2026-08-05
 * this script stopped at printing its URL. Five of the nine false claims we
 * corrected that day were answered by a PDF the product page linked to.
 *
 * pdftotext first because it is local and instant; r.jina.ai reads PDFs too and
 * covers the cases where the download is blocked but the reader is not.
 */
function viaPdf(target) {
  const tmp = path.join(process.env.TEMP ?? ".", "fetch-" + Date.now() + ".pdf");
  const dl = spawnSync("curl", ["-sL", "--max-time", "60", "-A", UA, target, "-o", tmp], { encoding: "utf8" });
  if (!dl.error && fs.existsSync(tmp) && fs.statSync(tmp).size > 1000) {
    const t = spawnSync("pdftotext", ["-layout", "-enc", "UTF-8", tmp, "-"], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
    try { fs.unlinkSync(tmp); } catch { /* the temp file is not worth an error */ }
    if (t.stdout && t.stdout.trim().length > 200) return { text: clean(t.stdout), note: "pdftotext" };
  }
  const j = viaJina(target);
  return { ...j, note: "via jina" };
}

const isPdf = (u) => /\.pdf($|[?#])/i.test(u);

/* ── rung 1: curl ────────────────────────────────────────────────────────── */

function viaCurl(target) {
  const r = spawnSync(
    "curl",
    ["-sL", "--max-time", "45", "-A", UA, "-H", "accept-language: sv-SE,sv;q=0.9", target],
    { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
  );
  const html = r.stdout ?? "";
  return { html, text: toText(html) };
}

/* ── rung 2: jina reader ─────────────────────────────────────────────────── */

function viaJina(target) {
  const r = spawnSync("curl", ["-sL", "--max-time", "90", "https://r.jina.ai/" + target], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  const md = r.stdout ?? "";
  /* Jina answers 200 with a stub when it cannot render. Treat a stub as a
     failed rung rather than as a page with nothing on it. */
  return { html: "", text: clean(md), markdown: md };
}

/* ── rung 3: playwright ──────────────────────────────────────────────────── */

/* Cookie banners first: they cover the page and some sites gate content behind
   them. Always the most privacy-preserving choice, never "accept all". */
const REJECT = ["Avvisa alla", "Neka alla", "Endast nödvändiga", "Avvisa", "Neka", "Reject all", "Decline", "Deny"];

/* Specifications and manuals hide behind these. Clicking a heading that is not
   a control is harmless, so try them all rather than guessing per site. */
const TABS = [
  "Specifikation", "Specifikationer", "Tekniska data", "Teknisk information",
  "Material och teknik", "Produktinformation", "Support", "Dokument",
  "Mer information", "Features", "Specifications", "Documents", "Downloads",
];

async function viaPlaywright(target) {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    return { text: "", note: "playwright not installed" };
  }
  const exe = chromePath();
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width: 1440, height: 1400 }, locale: "sv-SE" });
  let status = 0;
  try {
    const res = await page.goto(target, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1200);
    status = res?.status() ?? 0;
  } catch {
    /* networkidle times out on pages that poll. The DOM is usually there. */
  }

  for (const label of REJECT) {
    const b = page.locator("button", { hasText: label }).first();
    if ((await b.count()) && (await b.isVisible().catch(() => false))) {
      await b.click().catch(() => {});
      await page.waitForTimeout(400);
      break;
    }
  }
  /* Tabs replace the panel rather than adding to it, so read after every click
     and keep the union. Delock's jacket material lives behind Features while
     Overview stays on screen; taking only the final state loses whichever tab
     is not last. Exact match first, because hasText matches substrings and
     "Support" hits a footer link on half the retail sites. */
  /* Every step here is best-effort. A tab click can navigate the page, which
     destroys the execution context and throws on the next evaluate — measured
     on hobot.com.tw, where it cost 164 seconds and returned nothing while jina
     answered the same page in 7. Never let the browser rung throw away what it
     already read, and never let it run unbounded. */
  const blocks = [];
  const readBody = async () => {
    const t = await page
      .evaluate(() => (document.body.innerText ?? "").replace(/\s+/g, " ").trim())
      .catch(() => "");
    if (t) blocks.push(t);
  };

  await readBody();
  const deadline = Date.now() + 25000;
  for (const label of TABS) {
    if (Date.now() > deadline) break;
    try {
      const exact = page.getByRole("tab", { name: label, exact: true }).first();
      const loose = page.locator("button, a, summary, h2, h3, [role=button]", { hasText: label }).first();
      const control = (await exact.count()) ? exact : loose;
      if (!(await control.count())) continue;
      await control.click({ timeout: 1500 }).catch(() => {});
      await page.waitForTimeout(400);
      await readBody();
    } catch {
      /* Context destroyed by a navigation. Keep the blocks already collected. */
      break;
    }
  }

  const out = await page.evaluate(() => {
    const tidy = (s) => (s ?? "").replace(/\s+/g, " ").trim();
    const pairs = [];
    for (const tr of document.querySelectorAll("tr")) {
      const c = [...tr.children].map((x) => tidy(x.textContent));
      if (c.length === 2 && c[0] && c[1]) pairs.push(c);
    }
    for (const dl of document.querySelectorAll("dl")) {
      const dt = [...dl.querySelectorAll("dt")];
      const dd = [...dl.querySelectorAll("dd")];
      dt.forEach((x, i) => dd[i] && pairs.push([tidy(x.textContent), tidy(dd[i].textContent)]));
    }
    return {
      text: tidy(document.body.innerText),
      pairs,
      pdf: [...new Set([...document.querySelectorAll('a[href*=".pdf"]')].map((a) => a.href))].slice(0, 10),
      ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent ?? ""),
    };
  });
  await browser.close();

  /* Longest unique blocks first, joined. Each tab click produced one snapshot;
     the union is what a human would have seen after clicking through. */
  const merged = [...new Set(blocks.filter(Boolean))].sort((a, b) => b.length - a.length);
  const text = merged.length ? merged.join(" · ") : out.text;
  return { ...out, text, status };
}

/* ── extraction, applied to whichever rung answered ──────────────────────── */

function jsonLd(html) {
  const out = [];
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      out.push(JSON.parse(m[1]));
    } catch {
      /* Malformed blocks are common and never worth failing over. */
    }
  }
  return out;
}

function prices(objs) {
  const found = new Set();
  const walk = (o) => {
    if (!o || typeof o !== "object") return;
    for (const [k, v] of Object.entries(o)) {
      if (k === "price" || k === "lowPrice") found.add(String(v));
      else walk(v);
    }
  };
  objs.forEach(walk);
  return [...found];
}

/* ── run ─────────────────────────────────────────────────────────────────── */

/* A PDF has one rung and needs no browser. */
const rungs = isPdf(url)
  ? [["pdf", viaPdf]]
  : [
      ["curl", viaCurl],
      ["jina", viaJina],
      ["playwright", viaPlaywright],
    ];

const report = [];
let answer = null;
let best = null;

for (const [name, fn] of rungs) {
  if (only && only !== name) continue;
  const t0 = Date.now();
  let r;
  try {
    r = await fn(url);
  } catch (e) {
    report.push({ name, bytes: 0, ms: Date.now() - t0, note: String(e.message).slice(0, 60) });
    continue;
  }
  const bytes = Buffer.byteLength(r.text ?? "");
  /* When --find is given, a rung only counts as an answer if it actually
     contains what you asked for. Netatmo's product page returns 5 kB to curl
     and looks like a win, but the technical tab is loaded separately and none
     of it is there. Byte count answers "did we get a page"; the terms answer
     "did we get the page we needed". */
  const hits = terms.length
    ? terms.filter((t) => new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(r.text ?? "")).length
    : null;
  report.push({
    name,
    bytes,
    ms: Date.now() - t0,
    hits,
    note: r.note ?? (r.status ? "HTTP " + r.status : ""),
  });

  /* Under ~1500 characters is a cookie wall, a bot check or a stub. */
  const readable = bytes > 1500;
  /* Stop early only when every term is present. Otherwise keep climbing and
     take whichever rung matched most: three fetches cost seconds, and a
     partial match is exactly the case where the missing term is behind a tab
     the next rung will open. */
  if (readable && (!terms.length || hits === terms.length)) {
    answer = { name, ...r };
    break;
  }
  if (readable && (!best || (hits ?? 0) > (best.hits ?? 0) || ((hits ?? 0) === (best.hits ?? 0) && bytes > best.bytes)))
    best = { name, bytes, hits, ...r };
}

if (!answer && best) answer = best;


console.log("\n" + url);
console.log("\nladder:");
for (const r of report) {
  const mark = answer && answer.name === r.name ? "  <- answered" : "";
  console.log(
    "  " + r.name.padEnd(11) + String(r.bytes).padStart(8) + " bytes  " +
    String(r.ms + " ms").padStart(8) +
    (r.hits === null ? "" : "  " + r.hits + "/" + terms.length + " terms") +
    "  " + (r.note ?? "") + mark,
  );
}

if (!answer) {
  console.log(
    "\nNo rung returned a readable page. That is NOT evidence the page is empty.\n" +
    "Escalate to a real browser session (Chrome tools) before writing anything\n" +
    "about what this source does or does not publish.\n" +
    "See .claude/references/establishing-absence.md.",
  );
  process.exit(0);
}

const ld = answer.ld ? answer.ld.map((s) => { try { return JSON.parse(s); } catch { return null; } }).filter(Boolean) : jsonLd(answer.html ?? "");
const p = prices(ld);
if (p.length) console.log("\nprices in structured data: " + p.join("  "));

if (answer.pairs?.length) {
  console.log("\nspec pairs (" + answer.pairs.length + "):");
  answer.pairs.slice(0, 40).forEach(([k, v]) =>
    console.log("  " + k.slice(0, 40).padEnd(42) + v.slice(0, 70)));
}

const pdf = answer.pdf ?? [...new Set([...(answer.html ?? "").matchAll(/href="([^"]+\.pdf[^"]*)"/gi)].map((m) => m[1]))].slice(0, 10);
if (pdf.length) {
  console.log("\ndocuments — open these before concluding anything is unstated:");
  pdf.forEach((u) => console.log("  " + u));
}

for (const term of terms) {
  const re = new RegExp(".{0,90}" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ".{0,90}", "gi");
  const hits = [...answer.text.matchAll(re)].slice(0, 4).map((m) => m[0].trim());
  console.log("\n[" + term + "] " + (hits.length ? hits.length + " hits" : "no hit on this rung"));
  hits.forEach((h) => console.log("   …" + h + "…"));
}

if (raw) {
  console.log("\n──────── full text ────────\n");
  console.log(answer.markdown ?? answer.text);
}
