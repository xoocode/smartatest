#!/usr/bin/env node
/*
 * Specifikationssvep: hittar uppgifter vi saknar i jamforelsetabellerna.
 *
 *   node scripts/specsvep.mjs avfuktare
 *   node scripts/specsvep.mjs avfuktare --produkt meaco-arete-one-25l
 *   node scripts/specsvep.mjs robotdammsugare --falt Ljudniva,Vikt
 *
 * ## Varfor
 *
 * Tabellerna var fyllda till 49 procent nar de mattes 2026-08-04, och 126
 * rader pa hela sajten fanns for en enda produkt. Tva orsaker, och bara den
 * ena handlar om saknad data:
 *
 *  1. **Etikettdrift.** Samma egenskap under olika namn. Avfuktarsidan bar
 *     Arbetsyta, Max rumsstorlek och Max storlek rum som tre rader.
 *  2. **En kalla per produkt.** Priset hamtades hos butiken, och det som rakade
 *     sta bredvid priset blev specifikationen. Proshop publicerar till exempel
 *     ingen specifikationstabell alls, bara marknadsforingstext.
 *
 * Svepet angriper bada. Det normaliserar mot `lib/spec-schema.mjs` och letar
 * sedan efter de fait som saknas hos flera kallor per produkt.
 *
 * ## Metoden: skorda alla nyckel-vardepar, normalisera efterat
 *
 * I stallet for att leta efter ett falt i taget skordas **varje** etikett och
 * varde en sida publicerar, ur tre former: definitionslistor, tabellrader och
 * "Etikett: varde" i loptext. Sedan mappas skorden genom aliastabellen.
 *
 * Det ar bade enklare och battre: en tillverkares specifikationsblad ger
 * tjugo falt i ett anrop, och vi behover inte veta i forvag vad de kallar dem.
 *
 * ## Vad svepet inte gor
 *
 * Det skriver aldrig i `lib/data/*.ts`. Det skriver en rapport till
 * `.agent/specsvep/{kategori}.md` som en manniska gar igenom. Skalet ar att en
 * felaktig specifikation ar tystare an ett felaktigt pris och darfor lever
 * langre.
 *
 * Harkomst foljer med varje forslag. En bedomd uppgift far aldrig se ut som en
 * uppmatt, och pris och testomdome far aldrig vara bedomda alls.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { HARKOMST, ALDRIG_BEDOMD, faltFor, aliasMap } from "../lib/spec-schema.mjs";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const BRAVE = "C:/code/credentials/brave-search/credentials.json";

function credentials() {
  try {
    return JSON.parse(readFileSync(BRAVE, "utf8"));
  } catch {
    return null;
  }
}

/* Samma anropsform som scripts/sok.mjs: nyckelfilen bar baseUrl, webEndpoint,
   authHeader och apiKey, och headern heter inte samma sak overallt. */
async function braveSok(fraga, antal = 6) {
  const c = credentials();
  if (!c?.apiKey) return [];
  const url = new URL(c.baseUrl.replace(/\/$/, "") + c.webEndpoint);
  url.searchParams.set("q", fraga);
  url.searchParams.set("count", String(antal));
  url.searchParams.set("country", "SE");
  url.searchParams.set("search_lang", "sv");
  try {
    const r = await fetch(url, {
      headers: { [c.authHeader]: c.apiKey, Accept: "application/json" },
    });
    if (!r.ok) return [];
    const j = await r.json();
    return (j.web?.results ?? []).map((x) => ({ url: x.url, titel: x.title }));
  } catch {
    return [];
  }
}

async function hamta(url) {
  try {
    const r = await fetch(url, {
      headers:{"User-Agent":UA,"Accept-Encoding":"gzip, deflate, br", "Accept-Language": "sv-SE,sv;q=0.9" },
      redirect: "follow",
      signal: AbortSignal.timeout(25000),
    });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  }
}

/* ── skorden ───────────────────────────────────────────────────────────────
 *
 * Tre former tacker i praktiken allt vi motter. Manufacturer-datablad och
 * butiksspecifikationer anvander nastan alltid dl eller table; loptextformen
 * fangar Shopifys body_html, som skriver "Kapacitet: 25 l/dygn" i en punktlista.
 */
function skorda(html) {
  const par = new Map();
  const satt = (k, v) => {
    const nyckel = k.replace(/\s+/g, " ").trim().replace(/:$/, "");
    const varde = v
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
    if (!nyckel || !varde) return;
    if (nyckel.length > 45 || varde.length > 90) return;
    if (!par.has(nyckel)) par.set(nyckel, varde);
  };

  /* 1. definitionslistor */
  for (const m of html.matchAll(
    /<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/gi,
  )) {
    satt(m[1].replace(/<[^>]+>/g, " "), m[2]);
  }

  /* 2. tabellrader med tva celler */
  for (const m of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const celler = [...m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(
      (c) => c[1],
    );
    if (celler.length === 2) satt(celler[0].replace(/<[^>]+>/g, " "), celler[1]);
  }

  /* 3. "Etikett: varde" i loptext.
   *
   * Radbrytning racker inte. Butikernas beskrivningar skriver hela
   * specifikationen pa en rad med tankstreck emellan, som Bygghemmas
   * "Vikt: 16 kg - Matt (HWD) 61,8 x 36,6 x 27,2 cm - Koldmedium: R290 / 35g -
   * Ljudniva: 40 och 42 dB(A)". Den raden bar fyra falt som en radbaserad
   * lasning missar allihop, och tre av dem stod ingen annanstans pa sidan.
   *
   * Darfor delas texten aven pa tankstreck, punkt och rorstreck. */
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(li|p|div|br|h\d|td|th)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
  const bitar = text
    .split("\n")
    .flatMap((rad) => rad.split(/\s+[-–—•|]\s+/))
    .map((s) => s.replace(/\s+/g, " ").trim());
  for (const bit of bitar) {
    const m = /^([A-Za-zÅÄÖåäö][^:•\n]{2,40}):\s*(.{1,90})$/.exec(bit);
    if (m) satt(m[1], m[2]);
  }

  /* 4. JSON-LD additionalProperty, som flera butiker publicerar. */
  for (const m of html.matchAll(
    /application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const j = JSON.parse(m[1]);
      const gaIgenom = (nod) => {
        if (!nod || typeof nod !== "object") return;
        if (Array.isArray(nod)) return nod.forEach(gaIgenom);
        if (nod.name && (nod.value ?? nod.valueReference))
          satt(String(nod.name), String(nod.value ?? nod.valueReference));
        Object.values(nod).forEach(gaIgenom);
      };
      gaIgenom(j);
    } catch {
      /* trasig JSON-LD ar vanligt och inte vart ett avbrott */
    }
  }

  return par;
}

/* ── datafilen ─────────────────────────────────────────────────────────────
 *
 * Samma regexlasning som scripts/check-refs.mjs anvander. Ingen TS-laddare
 * finns i projektet, och specarna star i ett tillrackligt regelbundet format.
 */
function lasProdukter(kategori) {
  const src = readFileSync(`lib/data/${kategori}.ts`, "utf8");

  /* ⚠️ Butiks-URL:erna ar oftast mallstrangar, inte citerade strangar:
   *   merchantUrl: `${BYGGHEMMA_BASE}/avfuktare-.../p-1887651`
   * En regex som bara tog "..." hoppade darfor over butikssidan for nastan
   * varje produkt, alltsa exakt den kalla som sakert galler ratt exemplar
   * eftersom vi redan last priset dar. Konstanterna losts upp forst. */
  const konstanter = new Map(
    [...src.matchAll(/^const (\w+) =\s*\n?\s*"([^"]+)";/gm)].map((m) => [
      m[1],
      m[2],
    ]),
  );
  const losUpp = (mall) =>
    mall.replace(/\$\{(\w+)\}/g, (hela, namn) => konstanter.get(namn) ?? hela);

  const block = src.split(/\n  \{\n    id: /).slice(1);
  const ut = [];
  for (const b of block) {
    if (!b.includes("specs: [")) continue;
    const id = b.match(/^"([^"]+)"/)?.[1];
    if (!id) continue;
    const raUrl =
      b.match(/merchantUrl:\s*\n?\s*"([^"]+)"/)?.[1] ??
      b.match(/merchantUrl:\s*\n?\s*`([^`]+)`/)?.[1] ??
      null;
    ut.push({
      id,
      namn: b.match(/\n    name: "([^"]+)"/)?.[1] ?? id,
      marke: b.match(/\n    brand: "([^"]+)"/)?.[1] ?? "",
      butiksUrl: raUrl ? losUpp(raUrl) : null,
      specs: new Map(
        [...b.matchAll(/\{ label: "([^"]+)", value: "([^"]+)"/g)].map((m) => [
          m[1],
          m[2],
        ]),
      ),
    });
  }
  return ut;
}

/** Tillverkarens produktsida, via sokning. Returnerar flera kandidater. */
async function tillverkarsidor(produkt) {
  const fraga = `${produkt.marke} ${produkt.namn} specifikationer`;
  const traffar = await braveSok(fraga, 6);
  const markeslag = produkt.marke.toLowerCase().replace(/[^a-z0-9]/g, "");
  /* ⚠️ Bara vardnamnet far avgora om det ar tillverkarens sida.
   *
   * Ett tidigare utkast testade hela URL:en, och da matchade
   * furniturebox.se/.../avfuktare-meaco-meacodry-arete-one-25l som
   * "tillverkare" eftersom markesnamnet star i sokvagen. En butik fick alltsa
   * tillverkarens hogre harkomst, vilket ar precis den forvaxling harkomsten
   * finns for att hindra. */
  const egna = traffar.filter((t) => {
    try {
      const vard = new URL(t.url).hostname.toLowerCase().replace(/[^a-z0-9]/g, "");
      return vard.includes(markeslag);
    } catch {
      return false;
    }
  });
  const ovriga = traffar.filter((t) => !egna.includes(t));
  return [
    ...egna.map((t) => ({ ...t, harkomst: "tillverkare" })),
    ...ovriga.slice(0, 3).map((t) => ({ ...t, harkomst: "butik" })),
  ];
}

function normalisera(skord, alias) {
  const ut = new Map();
  for (const [k, v] of skord) {
    const kanon = alias.get(k.toLowerCase());
    if (kanon && !ut.has(kanon)) ut.set(kanon, v);
  }
  return ut;
}

/* Tillverkaren vinner over butiken nar de sager olika saker: butiker skriver
   av fel. Clas Ohlson anger 25,5 liter och 550 watt for Wood's SW42FW, medan
   Wood's sjalva anger 25 och 600. Rangordningen star i lib/spec-schema.mjs. */
function battre(a, b) {
  return (HARKOMST[a]?.rank ?? 0) >= (HARKOMST[b]?.rank ?? 0);
}

async function svepProdukt(produkt, falt, alias) {
  const saknas = falt
    .map((f) => f.key)
    .filter((k) => !produkt.specs.has(k) || /uppgift saknas/i.test(produkt.specs.get(k) ?? ""));
  if (!saknas.length) return { produkt, forslag: [], besokta: [] };

  const kallor = [];
  if (produkt.butiksUrl)
    kallor.push({ url: produkt.butiksUrl, harkomst: "butik", titel: "butiken vi länkar till" });
  kallor.push(...(await tillverkarsidor(produkt)));

  const funna = new Map(); // fält -> { varde, harkomst, url }
  const besokta = [];

  for (const k of kallor.slice(0, 6)) {
    const html = await hamta(k.url);
    besokta.push({ url: k.url, ok: !!html });
    if (!html) continue;
    const norm = normalisera(skorda(html), alias);
    for (const [falt_, varde] of norm) {
      if (!saknas.includes(falt_)) continue;
      const fanns = funna.get(falt_);
      if (!fanns || battre(k.harkomst, fanns.harkomst)) {
        funna.set(falt_, { varde, harkomst: k.harkomst, url: k.url });
      }
    }
  }

  const forslag = [...funna].map(([falt_, d]) => ({ falt: falt_, ...d }));
  return { produkt, forslag, besokta, saknas };
}

async function main() {
  const [, , kategori, ...flaggor] = process.argv;
  if (!kategori) {
    console.error("Ange kategori: node scripts/specsvep.mjs avfuktare");
    process.exit(1);
  }
  const falt = faltFor(kategori);
  if (!falt) {
    console.error(
      `Ingen faltlista for "${kategori}" i lib/spec-schema.mjs. Lagg till den forst.`,
    );
    process.exit(1);
  }
  const alias = aliasMap(kategori);

  const bara = flaggor.includes("--produkt")
    ? flaggor[flaggor.indexOf("--produkt") + 1]
    : null;

  let produkter = lasProdukter(kategori);
  if (bara) produkter = produkter.filter((p) => p.id === bara);

  console.log(`Sveper ${produkter.length} produkter i ${kategori}, ${falt.length} falt.\n`);

  const rader = [];
  for (const p of produkter) {
    const r = await svepProdukt(p, falt, alias);
    const n = r.forslag.length;
    console.log(
      `${p.id.padEnd(28)} saknade ${String(r.saknas?.length ?? 0).padStart(2)}  hittade ${String(n).padStart(2)}  (${r.besokta.filter((b) => b.ok).length}/${r.besokta.length} sidor svarade)`,
    );
    rader.push(r);
  }

  /* rapport */
  const nu = new Date().toISOString().slice(0, 10);
  const ut = [];
  ut.push(`# Specifikationssvep: ${kategori}`);
  ut.push("");
  ut.push(`Kort ${nu} med \`node scripts/specsvep.mjs ${kategori}\`.`);
  ut.push("");
  ut.push(
    "⚠️ **Ingenting harifran ar inskrivet i sajten.** Varje rad ska granskas mot",
  );
  ut.push(
    "kallan innan den flyttas till `lib/data/`. Pris och testomdome far aldrig",
  );
  ut.push("komma harifran.");
  ut.push("");

  let totalt = 0;
  for (const r of rader) {
    if (!r.forslag.length) continue;
    totalt += r.forslag.length;
    ut.push(`## ${r.produkt.marke} ${r.produkt.namn}`);
    ut.push("");
    ut.push("| Falt | Forslag | Harkomst | Kalla |");
    ut.push("|---|---|---|---|");
    for (const f of r.forslag) {
      const flagga = ALDRIG_BEDOMD.includes(f.falt) ? " ⚠️" : "";
      ut.push(
        `| ${f.falt}${flagga} | ${f.varde} | ${HARKOMST[f.harkomst].label} | ${f.url} |`,
      );
    }
    ut.push("");
  }

  ut.push("## Fait som fortfarande saknas");
  ut.push("");
  for (const r of rader) {
    const kvar = (r.saknas ?? []).filter(
      (k) => !r.forslag.some((f) => f.falt === k),
    );
    if (kvar.length) ut.push(`- **${r.produkt.id}**: ${kvar.join(", ")}`);
  }

  const fil = `.agent/specsvep/${kategori}.md`;
  writeFileSync(fil, ut.join("\n") + "\n");
  console.log(`\n${totalt} forslag skrivna till ${fil}`);
}

main();
