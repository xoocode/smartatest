#!/usr/bin/env node
/**
 * Skickar prisforfragan till larmbolagen via Resend.
 *
 * ## Las det har innan du kor
 *
 * Skriptet skickar riktig e-post till riktiga foretag. Det gar inte att ta
 * tillbaka. Darfor:
 *
 * - Utan flaggan `--skicka` gor det ingenting utom skriver ut vad det skulle
 *   ha gjort. Det ar standardlaget, och det ar det du vill ha forst.
 * - Det vagrar korra om nagon mottagare saknar adress. Fem av atta saknas i
 *   dag, se .agent/drafts/hemlarm-prisforfragan.md.
 * - Det vagrar korra innan sajten ar live, eftersom brevet hanvisar till en
 *   publicerad jamforelse. Sätt SMARTATEST_LIVE=1 nar den ar det.
 *
 * ## Anvandning
 *
 *   node scripts/send-hemlarm-brev.mjs                  # torrkorning
 *   SMARTATEST_LIVE=1 node scripts/send-hemlarm-brev.mjs --skicka
 *   node scripts/send-hemlarm-brev.mjs --skicka --bara verisure
 *
 * Avsandaradressen maste ligga pa en doman som ar verifierad i Resend.
 */

import fs from "node:fs";
import path from "node:path";

/* ------------------------------------------------------------- inställningar */

const FROM = process.env.HEMLARM_FROM ?? "redaktionen@smartatest.se";
const SIGNATURE = process.env.HEMLARM_SIGNATURE ?? "Redaktionen";
const SUBJECT =
  "Fråga om exempelpriser till jämförelse av hemlarm på smartatest.se";

/**
 * Mottagare. `email: null` betyder att adressen inte ar bekraftad.
 *
 * Gissa aldrig en adress har. En felaktig mottagare ar varre an ingen: brevet
 * landar hos nagon som inte bett om det, och vi har da mejlat ett foretag vi
 * skriver om utan att na ratt person.
 */
const RECIPIENTS = [
  { id: "verisure", company: "Verisure", email: "kundservice@verisure.se" },
  { id: "svenska-alarm", company: "Svenska Alarm", email: "info@svenskaalarm.se" },
  { id: "avarn", company: "Avarn Security", email: null },
  { id: "sector", company: "Sector Alarm", email: null },
  { id: "securitashome", company: "SecuritasHome", email: null },
  { id: "gardio", company: "Gardio", email: null },
  { id: "garda", company: "Garda Alarm", email: null },
  { id: "safeland", company: "Safeland", email: null },
];

/* ------------------------------------------------------------------- brevet */

function body(company) {
  return `Hej,

Jag skriver från smartatest.se, en svensk jämförelsesajt för hem- och säkerhetsprodukter. Vi har publicerat en genomgång av åtta larmbolag som säljer hemlarm med larmcentral till privatpersoner i Sverige, där ${company} ingår.

Genomgången bygger på det ni själva publicerar: prisuppgifter från er webbplats och de avtalsvillkor ni lägger ut. Vi citerar villkoren med utgåva och punktnummer och länkar till dokumenten i original.

En sak har vi inte kunnat besvara, och den är den vanligaste frågan våra läsare ställer: vad kostar det per månad?

Därför frågar vi er direkt. Skulle ni kunna ge ungefärliga exempelpriser för tre typiska hushåll?

1. Lägenhet, tre rum, en ytterdörr, ingen kamera utomhus.
2. Villa på cirka 130 kvadratmeter, två ytterdörrar, källare och garage, med brand- och vattendetektor.
3. Fritidshus som står tomt större delen av året, utan fast bredband.

För varje scenario är vi tacksamma för:

- månadsavgift
- startavgift eller uppkopplingskostnad
- eventuell bindningstid, och om ni erbjuder både med och utan
- uppsägningstid
- vad som ingår i hårdvarupaketet
- om kunden äger eller hyr utrustningen, och vad som gäller vid uppsägning

Vi publicerar svaren som era uppgifter, med datum, och skriver ut om ni väljer att inte svara. Ungefärliga priser är helt i sin ordning, vi är ute efter storleksordningen och inte en offert.

Har jag missförstått något i era publicerade villkor tar jag tacksamt emot en rättelse. Vi rättar gärna och skriver ut när vi gjort det.

Tack på förhand,

${SIGNATURE}
smartatest.se`;
}

/* ----------------------------------------------------------------- körningen */

function readEnvFile() {
  /* Skriptet kors med `node` och inte genom Next, sa .env lases inte in
     automatiskt. Minimal parser: bara KEY=value, ingen expansion. */
  const file = path.join(process.cwd(), ".env");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const value = m[2].replace(/^["']|["']$/g, "");
    if (!process.env[m[1]] && value) process.env[m[1]] = value;
  }
}

async function main() {
  readEnvFile();

  const args = process.argv.slice(2);
  const send = args.includes("--skicka");
  const onlyIdx = args.indexOf("--bara");
  const only = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

  const targets = only
    ? RECIPIENTS.filter((r) => r.id === only)
    : RECIPIENTS;

  if (!targets.length) {
    console.error(`  Ingen mottagare matchar --bara ${only}.`);
    process.exit(1);
  }

  const missing = targets.filter((r) => !r.email);
  const ready = targets.filter((r) => r.email);

  console.log(`\n  Avsandare: ${FROM}`);
  console.log(`  Amne:      ${SUBJECT}\n`);
  console.log(`  Redo att skickas: ${ready.length}`);
  for (const r of ready) console.log(`    ${r.company} <${r.email}>`);
  if (missing.length) {
    console.log(`\n  Saknar adress: ${missing.length}`);
    for (const r of missing) console.log(`    ${r.company}`);
    console.log(
      "\n  Leta upp dem i .agent/drafts/hemlarm-prisforfragan.md innan du skickar.",
    );
  }

  if (!send) {
    console.log(
      "\n  Torrkorning. Inget skickades. Lagg till --skicka for att skicka pa riktigt.\n",
    );
    console.log("  Sa har ser brevet ut till forsta mottagaren:\n");
    console.log(body(targets[0].company).replace(/^/gm, "    "));
    console.log("");
    return;
  }

  if (process.env.SMARTATEST_LIVE !== "1") {
    console.error(
      "\n  Stoppat. Brevet hanvisar till en publicerad jamforelse, och sajten\n" +
        "  ar inte markt som live. Satt SMARTATEST_LIVE=1 nar /hemlarm ligger\n" +
        "  ute och ar natbar.\n",
    );
    process.exit(1);
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("\n  RESEND_API_KEY saknas i miljon och i .env.\n");
    process.exit(1);
  }

  if (missing.length) {
    console.error(
      `\n  Stoppat. ${missing.length} mottagare saknar adress. Fyll i dem eller\n` +
        "  kor med --bara <id> for att skicka till en i taget.\n",
    );
    process.exit(1);
  }

  let sent = 0;
  for (const r of ready) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [r.email],
        subject: SUBJECT,
        text: body(r.company),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`  MISSLYCKADES  ${r.company}: ${res.status} ${text}`);
      continue;
    }

    const json = await res.json();
    console.log(`  Skickat  ${r.company} <${r.email}>  id=${json.id ?? "?"}`);
    sent += 1;
  }

  console.log(`\n  ${sent} av ${ready.length} brev skickade.\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
