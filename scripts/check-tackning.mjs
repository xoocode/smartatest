#!/usr/bin/env node
/**
 * Rapporterar hur maanga celler i jaemfoerelsetabellen som faktiskt aer ifyllda.
 *
 * ## Varfoer kontrollen finns
 *
 * `/fonsterputsrobot` gick i produktion med fyra av fem markerade rader naestan
 * tomma. Ingen kontroll saa det, eftersom varje enskild produkt var korrekt:
 * `Ej angiven` aer ett giltigt vaerde och `tsc`, `lint` och `pnpm check` hade
 * ingen aasikt. Felet syntes foerst naer en maenniska laeste sidan.
 *
 * En markerad rad aer ett loefte om att raden skiljer produkterna aat. Aer den
 * mestadels streck aer loeftet inte infriat, och laesaren betalar med en
 * skaermhoejd som saeger ingenting.
 *
 * ## Vad den maeter
 *
 * Bara `highlight: true`-specar, alltsaa de som blir rader i tabellen. Detaljer
 * laengre ner paa produktkortet raeknas inte: daer aer luckor gratis.
 *
 * `Ej angiven` raeknas som **tom**. Att vi letat aendrar ingenting foer den som
 * laeser tabellen.
 *
 * ## Ojaemn markering, som doeljer en hel rad
 *
 * `ComparisonTable` bygger radlistan ur **foersta produktens** markerade
 * specar: `products[0].specs.filter(s => s.highlight)`. En etikett som aer
 * markerad paa naagon annan produkt men inte paa den foersta blir daerfoer
 * ingen rad alls, och vaerdet syns ingenstans i jaemfoerelsen.
 *
 * `/nyckelskap` hade `Vaederskydd` markerat enbart paa Master Lock. Raden
 * renderades aldrig, trots att kriteriet vaeger 15 av 100 och trots att hela
 * produktens saeljargument staar i den. Foersta versionen av den haer
 * kontrollen saag det inte: den summerade per etikett oever alla produkter och
 * hoppade oever etiketter med faerre aen tre foerekomster, vilket aer exakt den
 * blinda flaecken.
 *
 * Markering aer ett beslut om **raden**, inte om produkten. Aer en etikett
 * markerad naagonstans ska den vara markerad hos alla.
 *
 * ## Varfoer den inte faeller
 *
 * Vissa tal finns inte att haemta. Tillverkare undviker att publicera
 * dimensionerande saekerhetslaster av ansvarsskael, och ingen maengd sökande
 * aendrar det. En kontroll som faeller paa saadant skulle bara laera oss att
 * fylla i gissningar, vilket aer vaerre aen ett streck.
 *
 * Daerfoer rapporterar den. Aatgaerden staar i
 * .claude/references/spec-sourcing.md och aer en av tvaa: koer gap-passet igen,
 * eller byt ut raden mot en egenskap som faktiskt skiljer produkterna aat.
 *
 * Koers med `pnpm check:tackning`.
 */

import fs from "node:fs";
import path from "node:path";

const DIR = "lib/data";
const GRANS = 0.5;

/**
 * Markerade rader som aer glesa **med flit**, och skaelet.
 *
 * Kontrollen utgaar fraan att en gles rad aer ofaerdig research, och det aer
 * raett i de allra flesta fall. Men det finns en klass daer glesheten aer hela
 * poaengen: sidor vars fynd aer att bara ett faatal tillverkare publicerar en
 * uppgift alls. Att fylla cellen aat de oevriga vore en gissning, och en gissad
 * specifikation aer samma sak som en paahittad maetning — se ALDRIG_BEDOMD i
 * lib/spec-schema.mjs. Att ta bort raden raderar det sidan finns foer att visa.
 *
 * Baada utvaegarna goer alltsaa sidan saemre, och en kontroll som driver dit aer
 * en kontroll som ska raettas. Samma laerdom som naer den haer kontrollen raeknade
 * omarkerade etiketter till 2026-08-06 och fick /babyvakt att radera fyra rader
 * belagd tier A-data.
 *
 * Undantaget aer **inte** en tyst allowlist. Raderna nedan rapporteras aendaa,
 * men som deklarerade beslut i staellet foer som skuld, saa att den som laeser
 * kan pruova skaelet. Laegg bara till en rad haer naer baada dessa gaeller:
 *
 *  1. Uppgiften finns inte publicerad hos de tillverkare som saknas — kontrollerat
 *     mot deras egna sidor och dokument, inte bara mot butiken.
 *  2. Raden baer sidans fynd, alltsaa spridningen aer det laesaren kommer foer.
 */
const DEKLARERAT_GLESA = [
  {
    fil: "smartwatch",
    label: "Batteritid med GPS",
    skal:
      "Apple publicerar inget GPS-tal foer naagon av sina tre modeller. Att raekna om " +
      "fraan ett annat laege hade raderat spridningen sidan finns foer att visa.",
  },
  {
    fil: "stavmixer",
    label: "Varvtal",
    skal:
      "Aatta av tolv tillverkare anger inget varvtal alls, och det aer sidans fynd: " +
      "watt maeter vaegguttaget, varvtal maeter kniven. Bosch tekniska oeversikt " +
      "utelaemnar det och OBH har faeltet tomt.",
  },
];

const deklarerat = (fil, label) =>
  DEKLARERAT_GLESA.find(
    (d) => d.fil === fil.replace(/\.ts$/, "") && d.label === label,
  );

/* `Ej angiven` i alla boejningar, plus streckvarianterna. Samma lista som
   EJ_ANGIVET och TOMMA_VARDEN i components/product/comparison-table.tsx. */
const TOMMA = new Set([
  "",
  "-",
  "–",
  "—",
  "ej angiven",
  "ej angivet",
  "ej angivna",
  "saknas",
  "okaend",
]);

const tomt = (v) => TOMMA.has(v.trim().toLowerCase());

const rader = [];
/* Glesa rader som staar i DEKLARERAT_GLESA. Rapporteras separat, aldrig som skuld. */
const forklarade = [];
const ojamna = [];
/* Etiketter som bara finns paa naagra faa produkter. En tabell daer varje rad
   gaeller en tredjedel av faeltet aer inte en jaemfoerelse, den aer en lista
   med haal. /brandstege hade 18 etiketter paa 8 produkter, de flesta paa en
   till tre, plus `Max utrymningshoejd` och `Max evakueringshoejd` som skilda
   rader foer samma maatt. Hittat 2026-08-06. */
const fragment = [];
const dubbletter = [];

/** Ordmaengd utan boejning, saa att omkastade etiketter matchar varandra. */
/**
 * Etiketten normaliserad till en jaemfoerbar nyckel, foer synonymkontrollen.
 *
 * ⚠️ **Siffror behaalls.** Fram till 2026-08-07 stroeks allt utom bokstaever,
 * och daa foell `Hastighet 5 GHz` och `Hastighet 2,4 GHz` ihop till samma
 * nyckel `ghz hastighet`. Kontrollen bad alltsaa `/wifi-repeater` att slaa ihop
 * de tva raderna, vilket aer precis den sammanblandning sidan finns foer att ta
 * isaer: talet AC1750 aer 1 300 Mbit/s paa 5 GHz plus 450 paa 2,4, och en klient
 * sitter paa ett band i taget.
 *
 * Synonymerna kontrollen faktiskt jagar skiljer sig i ORD och inte i tal —
 * `Maatt hopfaelld` mot `Hopfaellt maatt`, `Max utrymningshoejd` mot
 * `Max evakueringshoejd` — saa siffrorna kostar ingen traeffsaekerhet. Tvaa
 * etiketter som skiljer sig bara paa ett tal aer daeremot naestan alltid tvaa
 * olika egenskaper.
 */
const nyckel = (label) =>
  label
    .toLowerCase()
    .replace(/[^a-zåäö0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/(en|et|ad|d|t|a)$/, ""))
    .sort()
    .join(" ");

for (const fil of fs.readdirSync(DIR).filter((f) => f.endsWith(".ts")).sort()) {
  const src = fs.readFileSync(path.join(DIR, fil), "utf8");
  const slug = fil.replace(/\.ts$/, "");

  /* Ett produktblock loeper fraan sitt `id:` till naesta. Vi behoever dem var
     foer sig, eftersom det aer foersta produktens markeringar som avgoer
     vilka rader tabellen faar. */
  const ids = [...src.matchAll(/^\s{4}id:\s*"([^"]+)",$/gm)];
  const produkter = ids.map((head, i) => {
    const next = ids[i + 1];
    return { id: head[1], block: src.slice(head.index, next ? next.index : src.length) };
  });
  if (!produkter.length) continue;

  const SPEC = /\{\s*label:\s*"([^"]+)"[^}]*?value:\s*("(?:[^"\\]|\\.)*")([^}]*?)\}/g;

  /** Etiketter som blir rader: de foersta produkten markerat. */
  const forsta = new Set();
  for (const [, label, , svans] of produkter[0].block.matchAll(SPEC)) {
    if (/highlight:\s*true/.test(svans)) forsta.add(label);
  }

  /** label -> { fyllda, totalt } bland de etiketter som faktiskt blir rader. */
  const perRad = new Map();
  const specs = [];
  /** Varje etikett paa sidan, oavsett markering, foer fragmenteringen. */
  const alla = new Map();

  for (const produkt of produkter) {
    for (const [, label, rawValue, svans] of produkt.block.matchAll(SPEC)) {
      /* ⚠️ Bara etiketter som aer MARKERADE naagonstans raeknas som paaboerjade
         jaemfoerelserader. En omarkerad etikett paa faa produkter aer en
         produktegenhet i den produktens egen speclista, och den hoer hemma
         daer. Foersta versionen raeknade alla etiketter, och det kostade
         riktig data: bygget av /babyvakt 2026-08-06 hade `Standbytid` 4/11,
         `Garanti` 4/11, `Laddning` 3/11 och `Moerkerseende` 2/11, alla
         tier A ur tillverkarnas manualer, och raderade alla fyra foer att faa
         kontrollen groen. Kontrollen gjorde sidan saemre. */
      if (/highlight:\s*true/.test(svans)) alla.set(label, (alla.get(label) ?? 0) + 1);
      const markerad = /highlight:\s*true/.test(svans);
      if (markerad && !forsta.has(label)) {
        ojamna.push({ slug, id: produkt.id, label });
      }
      if (!forsta.has(label)) continue;
      let value;
      try {
        value = JSON.parse(rawValue);
      } catch {
        value = rawValue.slice(1, -1);
      }
      specs.push(label);
      const post = perRad.get(label) ?? { fyllda: 0, totalt: 0 };
      post.totalt++;
      if (!tomt(value)) post.fyllda++;
      perRad.set(label, post);
    }
  }
  if (!specs.length) continue;

  /* Fragmentering och namnkrockar, baada per sida. */
  const antal = produkter.length;
  if (antal >= 4) {
    /* En etikett paa exakt en produkt aer en produktegenhet och hoer hemma i
       den produktens egen speclista. Det aer etiketterna paa tva till haelften
       som aer paaboerjade jaemfoerelserader som ingen fyllde i. */
    const glesa = [...alla.entries()].filter(([, n]) => n >= 2 && n <= antal / 2);
    if (glesa.length >= 4) {
      fragment.push({ slug, antal, glesa: glesa.sort((a, b) => a[1] - b[1]) });
    }
    const perNyckel = new Map();
    for (const label of alla.keys()) {
      const k = nyckel(label);
      if (!perNyckel.has(k)) perNyckel.set(k, []);
      perNyckel.get(k).push(label);
    }
    for (const namn of perNyckel.values()) {
      if (namn.length > 1) dubbletter.push({ slug, namn });
    }
  }

  for (const [label, { fyllda, totalt }] of perRad) {
    /* Pris och Butik bygger tabellen egna rader av ur andra faelt. */
    if (label === "Pris" || label === "Butik") continue;
    if (totalt < 3) continue;
    const kvot = fyllda / totalt;
    if (kvot < GRANS) {
      const d = deklarerat(fil, label);
      if (d) forklarade.push({ fil, label, fyllda, totalt, kvot, skal: d.skal });
      else rader.push({ fil, label, fyllda, totalt, kvot });
    }
  }
}

rader.sort((a, b) => a.kvot - b.kvot);

if (dubbletter.length) {
  console.log(`\n  ${dubbletter.length} etikettpar som ser ut som samma egenskap:\n`);
  for (const d of dubbletter) {
    console.log(`    ${d.slug} · ${d.namn.join("  /  ")}`);
  }
  console.log(
    `\n  En egenskap, en etikett. Tva namn ger tva halvfyllda rader i staellet\n` +
      `  foer en hel, och laesaren ser ingen av dem.\n`,
  );
}

if (fragment.length) {
  console.log(`\n  ${fragment.length} tabeller aer fragmenterade:\n`);
  for (const f of fragment.sort((a, b) => b.glesa.length - a.glesa.length)) {
    console.log(
      `    ${f.slug}  (${f.antal} produkter, ${f.glesa.length} etiketter paa haelften eller faerre)`,
    );
    for (const [label, n] of f.glesa.slice(0, 4)) {
      console.log(`        ${String(n).padStart(2)}/${f.antal}  ${label}`);
    }
    if (f.glesa.length > 4) console.log(`        ... och ${f.glesa.length - 4} till`);
  }
  console.log(
    `\n  En rad som gaeller en tredjedel av faeltet jaemfoer ingenting. Kor ett\n` +
      `  gap-pass och fyll dem hos alla, eller byt raden mot en egenskap som gaar\n` +
      `  att faa fram. Se .claude/references/spec-sourcing.md och fix-page steg 6.\n`,
  );
}

if (ojamna.length) {
  console.log(`\n  ${ojamna.length} markerade specar som aldrig blir en rad:\n`);
  for (const o of ojamna) {
    console.log(`    ${o.slug} · ${o.label}  (markerad paa ${o.id}, inte paa foersta produkten)`);
  }
  console.log(
    `\n  Tabellen tar sin radlista ur foersta produktens markeringar, saa vaerdet\n` +
      `  syns ingenstans. Markera etiketten hos samtliga produkter, eller ta bort\n` +
      `  markeringen helt. Markering aer ett beslut om raden, inte om produkten.\n`,
  );
}

if (rader.length) {
  console.log(`\n  ${rader.length} markerade rader under ${GRANS * 100} % ifyllda:\n`);
  for (const r of rader) {
    const procent = Math.round(r.kvot * 100);
    console.log(
      `    ${String(procent).padStart(3)} %  ${r.fil.replace(/\.ts$/, "")} · ${r.label}` +
        `  (${r.fyllda}/${r.totalt})`,
    );
  }
  console.log(
    `\n  En markerad rad lovar att den skiljer produkterna aat. Antingen behoever\n` +
      `  researchen ett gap-pass till, eller saa aer raden fel vald och boer bytas\n` +
      `  mot en egenskap som gaar att faa fram. Se .claude/references/spec-sourcing.md.\n`,
  );
} else {
  console.log(`  Alla markerade tabellrader minst ${GRANS * 100} % ifyllda.`);
}

if (forklarade.length) {
  console.log(`\n  ${forklarade.length} glesa rader aer deklarerade och raeknas inte som skuld:\n`);
  for (const f of forklarade) {
    console.log(
      `    ${String(Math.round(f.kvot * 100)).padStart(3)} %  ` +
        `${f.fil.replace(/\.ts$/, "")} · ${f.label}  (${f.fyllda}/${f.totalt})`,
    );
    console.log(`           ${f.skal}`);
  }
  console.log(
    `\n  Glesheten aer sjaelva uppgiften paa de haer sidorna. Fyll aldrig cellen aat\n` +
      `  den som tiger, och ta inte bort raden. Skaelen staar i DEKLARERAT_GLESA\n` +
      `  hoegst upp i den haer filen och ska pruovas, inte foerutsaettas.\n`,
  );
}
