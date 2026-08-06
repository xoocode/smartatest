/*
 * Sokning mot Brave Search, och ett fardigt utbudssvep per varumarke.
 *
 * Varfor inte den inbyggda WebSearch: den ar US-only, vilket ar fel marknad
 * for varenda fraga det har projektet staller. Brave tar country=SE.
 *
 * Google CSE-nyckeln i C:\code\credentials\google-cse\ gar inte att fa att
 * fungera, och det ar inte ett konfigurationsfel. Custom Search JSON API ar
 * stangd for nya kunder och laggs ned 1 januari 2027. Googles egen sida sager
 * ordagrant "This API is not available for new customers". Projekt
 * 702154798234 ar inte en befintlig kund, alltsa svarar varje anrop 403 med
 * "This project does not have the access to Custom Search JSON API".
 *
 * Aktivera inget, lank ingen betalning. Kollat i detalj 2026-08-05: nyckeln ar
 * giltig och fungerar mot Search Console API, API:et ar aktiverat och raknar
 * anrop, och sokmotorn cx=95bba626b0b9f44a3 existerar och gar att sla upp.
 * Bara sjalva ratten saknas, och den gar inte att skaffa.
 *
 * Anteckningen ovan sa fram till 2026-08-05 att API:et inte var aktiverat. Det
 * var fel och kostade en timme. Vill nagon anda ha Googles index: Serper.dev
 * eller SerpAPI, ungefar en dollar per tusen fragor, utan Google Cloud alls.
 *
 *   node scripts/sok.mjs "luftrenare affiliate"
 *   node scripts/sok.mjs --en "air purifier affiliate program"
 *   node scripts/sok.mjs --brand levoit
 *
 * Utbudssvepet i --brand ar stegen ur .claude/skills/new-page/references/
 * research.md, i ordning fran billigast till dyrast kontroll.
 */

import { readFileSync } from "node:fs";

const CRED = "C:/code/credentials/brave-search/credentials.json";
const KATALOG = new URL("../.agent/adtraction-se-katalog.json", import.meta.url);

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0 Safari/537.36";

function credentials() {
  try {
    return JSON.parse(readFileSync(CRED, "utf8"));
  } catch {
    console.error(`Hittar inte ${CRED}. Se CLAUDE.md om credentials.`);
    process.exit(1);
  }
}

async function sok(fraga, { svenska = true, antal = 8 } = {}) {
  const c = credentials();
  const url = new URL(c.baseUrl.replace(/\/$/, "") + c.webEndpoint);
  url.searchParams.set("q", fraga);
  url.searchParams.set("count", String(antal));
  if (svenska) {
    url.searchParams.set("country", "SE");
    url.searchParams.set("search_lang", "sv");
  }

  const res = await fetch(url, {
    headers: { [c.authHeader]: c.apiKey, Accept: "application/json" },
  });
  if (!res.ok) {
    console.error(`  Brave svarade ${res.status}`);
    return [];
  }
  const data = await res.json();
  return data.web?.results ?? [];
}

/* ─── Googles index, tva leverantorer ──────────────────────────────────────
 *
 * Brave ar standard och racker for det mesta. De har finns for det ena fallet
 * som betyder nagot: **innan du skriver att nagot inte publiceras**. En motor
 * som inte hittar nagot bevisar ingenting; tva motorer som bada kommer tomma
 * ar ett belagg.
 *
 * Uppmatt 2026-08-05 pa samma fraga: Brave hittade tillverkarens egen sida,
 * Serper och SearchAPI ledde bada med aterforsaljare. De kompletterar alltsa
 * varandra at olika hall, och Brave ar inte den svagaste.
 *
 * Serper ar POST med JSON-kropp, SearchAPI ar GET med parametrar. Blandar man
 * ihop dem svarar bada 403, vilket ser ut som en trasig nyckel.
 */

function las(tjanst) {
  try {
    return JSON.parse(
      readFileSync(`C:/code/credentials/${tjanst}/credentials.json`, "utf8"),
    );
  } catch {
    return null;
  }
}

async function sokSerper(fraga, { svenska = true, antal = 8 } = {}) {
  const c = las("serper");
  if (!c || c.apiKey.startsWith("PASTE")) return [];
  const res = await fetch(c.baseUrl + c.searchEndpoint, {
    method: "POST",
    headers: { [c.authHeader]: c.apiKey, "content-type": "application/json" },
    body: JSON.stringify({
      q: fraga,
      num: antal,
      ...(svenska ? { gl: "se", hl: "sv" } : {}),
    }),
  });
  if (!res.ok) {
    console.error(`  Serper svarade ${res.status}`);
    return [];
  }
  const data = await res.json();
  return (data.organic ?? []).map((o) => ({ title: o.title, url: o.link }));
}

async function sokSearchApi(fraga, { svenska = true, antal = 8 } = {}) {
  const c = las("searchapi");
  if (!c || c.apiKey.startsWith("PASTE")) return [];
  const url = new URL(c.baseUrl);
  url.searchParams.set("engine", c.defaultEngine ?? "google");
  url.searchParams.set("q", fraga);
  url.searchParams.set("num", String(antal));
  if (svenska) {
    url.searchParams.set("gl", "se");
    url.searchParams.set("hl", "sv");
  }
  const res = await fetch(url, {
    headers: { Authorization: `${c.authScheme ?? "Bearer"} ${c.apiKey}` },
  });
  if (!res.ok) {
    console.error(`  SearchAPI svarade ${res.status}`);
    return [];
  }
  const data = await res.json();
  return (data.organic_results ?? []).map((o) => ({
    title: o.title,
    url: o.link,
  }));
}

const MOTORER = {
  brave: sok,
  serper: sokSerper,
  searchapi: sokSearchApi,
};

/**
 * Kor flera motorer och slar ihop. Dubbletter faller bort pa url, och varje
 * traff bar med sig vilka motorer som hittade den: en traff bara en motor har
 * ar precis den sorten man annars missar.
 */
async function sokAlla(fraga, opt = {}, motorer = Object.keys(MOTORER)) {
  const sedd = new Map();
  for (const namn of motorer) {
    const traffar = await MOTORER[namn](fraga, opt).catch(() => []);
    console.error(`  ${namn}: ${traffar.length} traffar`);
    for (const t of traffar) {
      const nyckel = (t.url ?? "").replace(/[?#].*$/, "").replace(/\/$/, "");
      if (!nyckel) continue;
      const post = sedd.get(nyckel) ?? { ...t, motorer: [] };
      post.motorer.push(namn);
      sedd.set(nyckel, post);
    }
  }
  /* Flest motorer forst: det som tva index ar overens om ar oftast ratt sida. */
  return [...sedd.values()].sort((a, b) => b.motorer.length - a.motorer.length);
}

function skriv(traffar) {
  if (!traffar.length) {
    console.log("  inga traffar");
    return;
  }
  for (const t of traffar) {
    const kalla = t.motorer ? `  [${t.motorer.join("+")}]` : "";
    console.log(`  - ${t.title}${kalla}`);
    console.log(`    ${t.url}`);
  }
}

/** A-post via DoH. Ett sokresultat bevisar inte att domanen lever. */
async function resolver(doman) {
  const res = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${doman}&type=A`,
    { headers: { accept: "application/dns-json" } },
  );
  const data = await res.json();
  const svar = (data.Answer ?? []).filter((a) => a.type === 1);
  return svar.length ? svar.map((a) => a.data) : null;
}

async function statuskod(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": UA },
      signal: AbortSignal.timeout(20000),
    });
    return `${res.status} ${res.url}`;
  } catch (e) {
    return `svarar inte (${e.message})`;
  }
}

function iAdtraction(term) {
  const katalog = JSON.parse(readFileSync(KATALOG, "utf8"));
  const program = katalog.program ?? [];
  const kontroll = program.filter((p) =>
    JSON.stringify(p).toLowerCase().includes("kjell"),
  );
  if (!kontroll.length) {
    console.log("  ⚠️ kontrollsokningen pa kjell gav noll, katalogen ar trasig");
    return;
  }
  const traffar = program.filter((p) =>
    JSON.stringify(p).toLowerCase().includes(term.toLowerCase()),
  );
  if (!traffar.length) {
    console.log(`  inget program (av ${program.length}, hamtat ${katalog.hamtad})`);
    return;
  }
  for (const p of traffar) {
    const ers = (p.commissions ?? [])
      .map((k) => `${k.value}${k.type} ${k.name}`)
      .join(", ");
    console.log(
      `  ${p.programName} | ${p.categoryName} | ${ers} | cookie ${p.cookieDuration} d | ppc ${p.ppcMarketing}`,
    );
  }
}

async function svep(marke) {
  const m = marke.toLowerCase();
  console.log(`\n=== Utbudssvep: ${marke} ===\n`);

  console.log("1. Adtractions SE-katalog");
  iAdtraction(m);

  console.log("\n2. Domaner, A-post via DoH");
  const levande = [];
  for (const d of [`${m}.se`, `${m}.com`, `www.${m}.se`]) {
    const ip = await resolver(d);
    console.log(`  ${d.padEnd(20)} ${ip ? ip.join(", ") : "INGEN A-POST"}`);
    if (ip) levande.push(d);
  }

  console.log("\n3. Affiliatesidor pa de domaner som lever");
  for (const d of levande.slice(0, 2)) {
    for (const stig of ["pages/affiliate", "pages/affiliates", "pages/partner"]) {
      console.log(`  ${d}/${stig} -> ${await statuskod(`https://${d}/${stig}`)}`);
    }
  }

  console.log(`\n4. Brave: "${marke} affiliate program"`);
  skriv(await sok(`${marke} affiliate program provision`, { svenska: true }));

  console.log(`\n5. Brave: "${marke} affiliate" (engelska)`);
  skriv(await sok(`"${marke}" affiliate program commission`, { svenska: false }));

  console.log(
    "\nLas hela programsidan innan du tror pa en procentsats. Levoit.no angav" +
      "\n10,00 % tva rader under texten PROGRAM CLOSED.",
  );
}

const argv = process.argv.slice(2);
if (!argv.length) {
  console.log(
    'Anvandning:\n' +
      '  node scripts/sok.mjs "fraga"               Brave, svenska traffar\n' +
      '  node scripts/sok.mjs --en "query"          Brave, utan landsfilter\n' +
      '  node scripts/sok.mjs --alla "fraga"        alla tre motorer, sammanslaget\n' +
      '  node scripts/sok.mjs --motor serper "..."  en vald motor\n' +
      '  node scripts/sok.mjs --brand levoit        utbudssvep for ett marke',
  );
  process.exit(0);
}

if (argv[0] === "--brand") {
  await svep(argv[1]);
} else if (argv[0] === "--alla" || argv[0] === "--all") {
  /* Alla tre motorerna. Anvand den innan du skriver att nagot inte finns. */
  skriv(await sokAlla(argv.slice(1).join(" ")));
} else if (argv[0] === "--motor") {
  const namn = argv[1];
  if (!MOTORER[namn]) {
    console.error(`Okand motor ${namn}. Valj brave, serper eller searchapi.`);
    process.exit(1);
  }
  skriv(await sokAlla(argv.slice(2).join(" "), {}, [namn]));
} else if (argv[0] === "--en") {
  skriv(await sok(argv.slice(1).join(" "), { svenska: false }));
} else {
  skriv(await sok(argv.join(" ")));
}
