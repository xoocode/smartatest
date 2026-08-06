/* Inventering av påståenden om frånvaro i produktdatan.
   Plockar bara ut strängar som är fält i en post, inte kodkommentarer. */

import fs from 'node:fs';

const MONSTER = [
  /publiceras inte/i, /anges inte/i, /anger inte/i, /redovisas inte/i,
  /uppger inte/i, /uppges inte/i, /inte publicerat?/i, /inte angiven?t?/i,
  /finns inte (?:någon|angiven|publicerad|hos)/i, /går inte att (?:hitta|få|ta reda)/i,
  /saknas/i, /saknar (?:uppgift|angivelse|besked)/i, /ingen (?:uppgift|tillverkare|av)/i,
  /inget (?:pris|besked|svar|test)/i, /inga uppgifter/i, /okänd/i,
  /ingenstans/i, /vet inte/i, /ej publicerad/i, /ej angiven/i,
  /nämner (?:det )?inte/i, /skriver inte/i, /står inte/i, /framgår inte/i,
];

/* Fälten som blir läsartext. Kodkommentarer och rubriker filtreras bort.

   ⚠️ Ankaret får INTE vara `^\s*`. Specrader skrivs på en rad i flera filer:
   `{ label: "Mantel", value: "Ej angiven", highlight: true },`
   Med radstartsankare missades varenda sådan rad, och verktyget rapporterade
   98 påståenden i hela lib/data när det verkliga antalet var över 800. På
   /usb-c-kabel hittades 1 av 67, vilket lät som en ren sida och var en
   oläst. Fångat 2026-08-06 under /fix-page. */
const FALT = /(?:^|[,{])\s*(value|tagline|verdict|note|superlative|label|description)\s*:\s*/;

const rader = [];
for (const f of fs.readdirSync('lib/data').filter((f) => f.endsWith('.ts') && f !== 'index.ts')) {
  const src = fs.readFileSync('lib/data/' + f, 'utf8').split('\n');
  let id = '?', iKommentar = false, iCons = false, iPros = false;

  src.forEach((rad, n) => {
    const t = rad.trim();
    if (t.startsWith('/*') || t.startsWith('/**')) iKommentar = true;
    if (iKommentar) { if (t.includes('*/')) iKommentar = false; return; }
    if (t.startsWith('//') || t.startsWith('*')) return;

    const mId = rad.match(/^\s*id:\s*"([a-z0-9-]+)"/);
    if (mId) { id = mId[1]; return; }
    if (/^\s*cons:\s*\[/.test(rad)) iCons = true;
    if (/^\s*pros:\s*\[/.test(rad)) iPros = true;
    if (/^\s*\],\s*$/.test(rad)) { iCons = false; iPros = false; }

    /* Varje fält på raden plockas med SIN EGEN sträng. En specrad bär både
       `label:` och `value:`, och att ta radens första sträng gav labeln —
       alltså "Mantel" i stället för "Ej angiven", som aldrig matchar ett
       mönster. Därav matchAll i stället för en enda match. */
    const traffar = [];
    const parRe = new RegExp(FALT.source + /\s*"((?:[^"\\]|\\.)*)"/.source, 'g');
    for (const m of rad.matchAll(parRe)) traffar.push({ falt: m[1], text: m[2] });

    if ((iCons || iPros) && /^\s*"/.test(t)) {
      const s = (t.match(/"((?:[^"\\]|\\.)*)"/) || [])[1];
      if (s) traffar.push({ falt: iCons ? 'cons' : 'pros', text: s });
    }

    for (const { falt, text } of traffar) {
      if (!text || text.length < 8) continue;
      if (!MONSTER.some((re) => re.test(text))) continue;
      rader.push({ fil: f, id, rad: n + 1, falt, text });
    }
  });
}

/* Gruppera: samma påstående på flera produkter är ett arbete, inte flera. */
console.log('# Påståenden om frånvaro i lib/data\n');
const prosa = rader.filter((r) => r.falt !== 'value');
console.log(rader.length + ' påståenden i ' + new Set(rader.map((r) => r.fil)).size + ' filer');
console.log('  ' + prosa.length + ' i prosa (tagline, pros, cons)  <- ta bort dessa först');
console.log('  ' + (rader.length - prosa.length) + ' tomma celler, som renderas som streck och är i sin ordning');
console.log('');

const perFil = {};
rader.forEach((r) => (perFil[r.fil] ??= []).push(r));
for (const [fil, rs] of Object.entries(perFil).sort((a, b) => b[1].length - a[1].length)) {
  console.log('\n## ' + fil + '  (' + rs.length + ')');
  rs.forEach((r) =>
    console.log('   ' + String(r.rad).padStart(4) + '  ' + r.id.padEnd(34) + ' ' +
      (r.falt || '').padEnd(11) + ' ' + r.text.slice(0, 150).replace(/\\n/g, ' ')));
}
