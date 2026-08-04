#!/usr/bin/env node
/**
 * Kontrollerar att varje källa i lib/sources.ts fortfarande finns.
 *
 * ⚠️ **Ligger med flit inte i `pnpm check`.** Skriptet gör ett par hundra
 * nätanrop och tar en dryg minut, och en källa som råkar vara nere skulle
 * fälla ett bygge som inte har något fel. Kör det för hand före lansering och
 * med jämna mellanrum: `pnpm check:lankar`.
 *
 * ## Statuskoden räcker inte
 *
 * Bygghemmas avfuktarsida flyttade från `/inspiration/` till
 * `/reportage-och-guider/`, och den gamla adressen svarade **200** genom att
 * skicka besökaren till startsidan. En kontroll som bara läser statuskoden
 * kallar den länken frisk. Skriptet följer därför omdirigeringar och fäller
 * dem som landar på en rot eller på en sida vars titel säger att den inte
 * finns.
 *
 * Samma vecka gav en MSB-adress 404 sedan myndigheten delats, och Stiftung
 * Warentests luftfuktartest hade flyttat från en nyhetsnotis till testets egen
 * sida. Båda hittades av det här skriptet.
 *
 * ## Botskydd är inte ett fel
 *
 * Arlo, Jula, ANSI och Intertek svarar 403 med Cloudflares
 * "Just a moment"-utmaning mot allt som inte är en webbläsare. Sidorna lever
 * för en läsare. De redovisas för sig och fäller ingenting, eftersom
 * alternativet vore att stryka riktiga källor för att vi inte kommer åt dem
 * från ett skript.
 *
 * `--jamforelser` begränsar körningen till `kind: "comparison"`.
 */

import fs from "node:fs";

const BARA_JAMFORELSER = process.argv.includes("--jamforelser");

const src = fs.readFileSync("lib/sources.ts", "utf8");
/* Kommentarer nollas: exempeladresser i en förklaring ska inte kontrolleras. */
const utanKommentarer = src.replace(/\/\*[\s\S]*?\*\//g, " ");

const adresser = [];
for (const m of utanKommentarer.matchAll(/\{[^{}]*?url:\s*"([^"]+)"[^{}]*?\}/g)) {
  if (BARA_JAMFORELSER && !/kind:\s*"comparison"/.test(m[0])) continue;
  if (!adresser.includes(m[1])) adresser.push(m[1]);
}

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Accept-Language": "sv-SE,sv;q=0.9,en;q=0.8",
};

/** Cloudflare och liknande: sidan lever, vi kommer bara inte åt den. */
function arBotskydd(status, titel) {
  return (
    (status === 403 || status === 503) &&
    /just a moment|attention required|checking your browser|client challenge/i.test(titel)
  );
}

const trasiga = [];
const flyttade = [];
const olasbara = [];

for (const url of adresser) {
  let res;
  let html = "";
  try {
    res = await fetch(url, { headers: HEADERS, redirect: "follow" });
    html = await res.text();
  } catch (err) {
    trasiga.push({ url, varfor: `gick inte att hamta: ${err?.message ?? err}` });
    continue;
  }

  const titel = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "")
    .replace(/\s+/g, " ")
    .trim();

  if (arBotskydd(res.status, titel)) {
    olasbara.push({ url, status: res.status });
    continue;
  }

  if (res.status !== 200) {
    trasiga.push({ url, varfor: `svarade ${res.status}`, slut: res.url, titel });
    continue;
  }

  /* Samma adress så när som på ett avslutande snedstreck är ingen flytt. */
  const flyttad = res.url.replace(/\/$/, "") !== url.replace(/\/$/, "");
  if (!flyttad) continue;

  const tillRot = new URL(res.url).pathname.replace(/\/$/, "") === "";
  const borta = /hittades inte|sidan finns inte|not found|404/i.test(titel);
  if (tillRot || borta) {
    trasiga.push({
      url,
      varfor: "omdirigerar till en sida som inte ar kallan",
      slut: res.url,
      titel,
    });
  } else {
    flyttade.push({ url, slut: res.url, titel });
  }
}

console.log(`  ${adresser.length} kalladresser kontrollerade.\n`);

if (trasiga.length) {
  console.log(`  ${trasiga.length} trasig(a):`);
  for (const t of trasiga) {
    console.log(`     ${t.url}\n        ${t.varfor}`);
    if (t.slut && t.slut !== t.url) console.log(`        -> ${t.slut}`);
    if (t.titel) console.log(`        titel: ${t.titel.slice(0, 70)}`);
  }
  console.log();
}

if (flyttade.length) {
  console.log(`  ${flyttade.length} flyttad(e). Citera den upplosta adressen:`);
  for (const f of flyttade) console.log(`     ${f.url}\n     -> ${f.slut}`);
  console.log();
}

if (olasbara.length) {
  console.log(`  ${olasbara.length} bakom botskydd, lever men gar inte att lasa harifran:`);
  for (const o of olasbara) console.log(`     ${o.status}  ${o.url}`);
  console.log();
}

if (!trasiga.length && !flyttade.length) {
  console.log("  Alla kallor lever och pekar ratt.");
}

/* Flyttade fäller också: en adress som omdirigerar i dag kan sluta göra det. */
process.exit(trasiga.length || flyttade.length ? 1 : 0);
