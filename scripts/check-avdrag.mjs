import fs from 'node:fs';

/**
 * check:avdrag — betygssteg som drar av för vad VI inte vet.
 *
 * ## Varför den finns
 *
 * `check:redovisning` hittar kriterier vars hela syfte är publicering. Det här
 * är samma fel en nivå ned: kriteriet mäter något verkligt, men ett av stegen
 * i skalan sätter lågt betyg för att uppgiften saknas. Beskrivningen läser då
 * som en vanlig skala och passerar den andra kontrollen.
 *
 *     5,0 för angiven klass · 2,0 när ingen klass anges · 1,0 när standard saknas
 *                              ^^^^^^^^^^^^^^^^^^^^^^^^ det här steget
 *
 * **Ett avdrag ska svara mot något varan gör.** En uppgift vi inte lyckats
 * belägga är vårt problem, inte produktens.
 *
 * ## Vad det kostade i verkligheten
 *
 * `/smart-termostat` 2026-08-06: SONOFF TRVZB går på sju ventilfattningar och
 * skalan gav 5,0 för sju, men den stod på 4,0 eftersom förpackningsinnehållet
 * inte gått att belägga. Sidans egen köpguide räknade redan SONOFF till de tre
 * som klarar sju. Den enda poängen avgjorde förstaplatsen, och innehållet stod
 * i tillverkarens egen listningstext hela tiden.
 *
 * ## Två former där frånvaron faktiskt ÄR egenskapen
 *
 * Skriptet kan inte skilja dem åt, så det fäller aldrig. Läs träffen och avgör:
 *
 * - **Certifiering.** En ocertifierad produkt skiljer sig verkligen från en
 *   certifierad. Men betygsätt att den ÄR certifierad, aldrig att intyget var
 *   lätt att hitta, och blanda inte ihop "ingen klass anges" med "inte godkänd".
 *   Finns ingen tillämplig standard ska kriteriet inte finnas alls.
 * - **Villkor.** Ett pris du inte kan få utan säljarbesök är ett sämre
 *   erbjudande, och villkoret är varan. Se HEMLARM nedan, som är avsiktlig.
 *
 * Allt annat — tjocklek, CRI, watt, fattningar, noggrannhet, kapacitet — är
 * vad det är oavsett om någon skrivit ned det.
 */

/**
 * Radsluten normaliseras. `lib/test-pages.ts` ligger med CRLF i arbetsträdet,
 * och kriteriedelningen nedan ankrar på `\n    {\n`. Utan det här steget
 * hittade skriptet noll kriterier på hela sajten och rapporterade rent.
 * Funnet 2026-08-06 under /fix-page utrymningsstege.
 */
const src = fs.readFileSync('lib/test-pages.ts', 'utf8').replace(/\r\n/g, '\n');

const PAT = [
  [/(\d[,.]\d)\s*(?:när|om|vid)[^.]{0,80}(?:inte anges|inte angetts|saknas|inte publicer|ingen uppgift|inte går att|inte namnger|ej angiv)/gi, 'lågt betyg när uppgift saknas'],
  [/(?:inte anges|saknas|inte publicer|ingen uppgift|ej angiv)[^.]{0,60}(?:ger|räknas som)\s*(\d[,.]\d)/gi, 'saknad uppgift ger poäng'],
  [/(\d[,.]\d)\s*(?:när|om)\s*(?:ingen|inget|inga)\s/gi, 'lägsta steget = ingenting angivet'],
];

/** Sidor där frånvaron är egenskapen, med skälet utskrivet. */
const AVSIKTLIGA = {
  HEMLARM: 'villkoren ÄR varan: ett pris du inte får utan säljarbesök',
  /* Certifieringsundantaget. Träffen är formuleringen "1,0 när ingen oberoende
     provning för svensk marknad finns", som ser ut som ett avdrag för saknad
     uppgift men inte är det: CR 139 är RISE egen certifieringsregel, Säker
     Vatten hänvisar bara till den, och registret på cert.ri.se är därmed
     uttömmande för vad branschreglerna kräver. Frånvaron är alltså fastställd
     positivt produkt för produkt, inte antagen ur en misslyckad sökning.
     Se .agent/research/vattenfelsbrytare.md §10.4. */
  VATTENFELSBRYTARE:
    'certifieringen ÄR varan: CR 139 avgör intyg och rabatt, och frånvaron är belagd i RISE öppna register',
};

const traeffar = [];
const avsiktliga = [];

const blocks = [...src.matchAll(/^export const ([A-Z0-9_]+): TestPage = \{/gm)];
for (const [n, head] of blocks.entries()) {
  const next = blocks[n + 1];
  const body = src.slice(head.index, next ? next.index : src.length);
  for (const crit of body.split(/\n    \{\n/).slice(1)) {
    const label = (crit.match(/label: "([^"]+)"/) || [])[1];
    const weight = (crit.match(/weight: (\d+)/) || [])[1];
    const desc = (crit.match(/description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/) || [])[1];
    if (!desc) continue;
    for (const [re, why] of PAT) {
      re.lastIndex = 0;
      const m = re.exec(desc);
      if (!m) continue;
      const utdrag = `…${desc.slice(Math.max(0, m.index - 40), m.index + 90).replace(/\s+/g, ' ')}…`;
      const post = { sida: head[1], label, weight, why, utdrag };
      if (AVSIKTLIGA[head[1]]) avsiktliga.push(post);
      else traeffar.push(post);
      break;
    }
  }
}

if (!traeffar.length) {
  console.log('check:avdrag — inga betygssteg drar av för saknad uppgift.\n');
} else {
  console.log(
    `\ncheck:avdrag — ${traeffar.length} kriterier har ett steg som saenker\n` +
      `  betyget för att en uppgift saknas:\n`,
  );
  for (const t of traeffar.sort((a, b) => b.weight - a.weight)) {
    console.log(`    ${String(t.weight).padStart(3)}  ${t.sida.padEnd(24)} ${t.label}`);
    console.log(`         ${t.why}`);
    console.log(`         ${t.utdrag}`);
  }
  console.log(
    `\n  Ett avdrag ska svara mot något varan gör. Betygsätt det som är belagt\n` +
      `  och lämna resten utanför räkningen, hellre än att sätta lägsta steget.\n` +
      `  Går produkten inte att bedöma alls hör den hemma bland de övervägda.\n` +
      `  Undantagen är certifiering och villkor, se filhuvudet. Skriptet kan\n` +
      `  inte skilja dem åt och fäller därför aldrig.\n`,
  );
}

if (avsiktliga.length) {
  console.log(`  ${avsiktliga.length} träff är avsiktlig och står kvar:\n`);
  for (const a of avsiktliga) {
    console.log(`    ${String(a.weight).padStart(3)}  ${a.sida.padEnd(24)} ${a.label}`);
    console.log(`         ${AVSIKTLIGA[a.sida]}`);
  }
  console.log('');
}
