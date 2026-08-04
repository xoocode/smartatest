/*
 * Sokning mot Brave Search, och ett fardigt utbudssvep per varumarke.
 *
 * Varfor inte den inbyggda WebSearch: den ar US-only, vilket ar fel marknad
 * for varenda fraga det har projektet staller. Brave tar country=SE.
 *
 * Google CSE-nyckeln i C:\code\credentials\google-cse\ fungerar inte: Custom
 * Search JSON API ar inte aktiverat pa det Google Cloud-projektet och varje
 * anrop ger 403. Kollat 2026-08-03.
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

function skriv(traffar) {
  if (!traffar.length) {
    console.log("  inga traffar");
    return;
  }
  for (const t of traffar) {
    console.log(`  - ${t.title}`);
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
    'Anvandning:\n  node scripts/sok.mjs "fraga"\n  node scripts/sok.mjs --en "query"\n  node scripts/sok.mjs --brand levoit',
  );
  process.exit(0);
}

if (argv[0] === "--brand") {
  await svep(argv[1]);
} else if (argv[0] === "--en") {
  skriv(await sok(argv.slice(1).join(" "), { svenska: false }));
} else {
  skriv(await sok(argv.join(" ")));
}
