#!/usr/bin/env node
/**
 * Kontrollerar varje rankat pris mot butikens egen produktsida.
 *
 * ⚠️ Kommentarerna är på riktig svenska, men **allt som skrivs ut håller sig
 * till ASCII**. Terminalen på den här maskinen mojibakar å, ä och ö, och en
 * rapport som ska läsas i ett nattligt jobb ska gå att läsa.
 *
 * ## Varför kontrollen finns
 *
 * Ett fel pris är det enda felet på sajten som kostar läsaren pengar, och det
 * är också det enda som ändrar sig utan att någon rör koden. Priset styr
 * dessutom kriteriet prisvärde, så ett gammalt pris kan göra hela rankningen
 * fel. Vid den första genomgången 2026-08-03 hade tolv av 155 produkter glidit,
 * en av dem med 599 kronor.
 *
 * ## Vad skriptet gör
 *
 * 1. Läser id, pris, butik och `merchantUrl` ur `lib/data/*.ts` med regex.
 *    Mallsträngar löses genom att `const`-deklarationerna i samma fil
 *    substitueras in, så `${KJELL_BASE}/...` fungerar.
 * 2. Hämtar butikens sida och plockar priset enligt REGLER nedan.
 * 3. Skriver ut avvikelser och avslutar med kod 1 om någon hittas, så att den
 *    kan köras som schemalagt jobb.
 *
 * ## Butiksregler
 *
 * Tre sätt att publicera pris täcker nästan hela sortimentet:
 *
 * - **JSON-LD** `Product.offers.price`. Kjell, Bygghemma, Proshop, Apotea.
 * - **Open Graph** `<meta property="product:price:amount">`. Bauhaus och
 *   Brandvarnare.se, som båda kör WooCommerce-liknande mallar.
 * - **Egen JSON i sidan.** Biltema lägger `"priceIncVAT":489.000000000`.
 *
 * ⚠️ **Variantmedvetenhet.** Everglow och Stegfabriken publicerar en egen
 * `Product` per steglängd på samma sida. Ett pris räknas som rätt om det
 * matchar **något** av sidans publicerade priser. Utan den regeln flaggades
 * Modum Original som fel med 9 621 mot 2 964 kronor, och båda talen var rätt.
 *
 * ## Butiker som kräver webbläsare
 *
 * Clas Ohlson och Hornbach ligger bakom samma botkontroll och svarar med en
 * 3 kB stor `Client Challenge` som kräver JavaScript. `fetch` kommer inte förbi
 * den, och den slår till efter några anrop även när de första gick igenom. De
 * märks `needsBrowser` och hoppas över som standard.
 *
 * Kör med `--browser`: då laddas sidorna i Chromium via Playwright i stället.
 * Det är vanlig sidladdning, ingenting kringgås.
 *
 * ⚠️ **Hornbach går inte att automatisera och ska inte försökas.** Deras
 * kontroll eskalerar till en bildruta med tecken som ska skrivas av, alltså en
 * CAPTCHA. Vi löser inte CAPTCHA-rutor, varken för hand eller med verktyg.
 * Butiken är märkt `manuell` och listas som en post någon får öppna i sin egen
 * webbläsare. Gäller i dag en enda produkt.
 *
 * ## Användning
 *
 *   node scripts/priskoll.mjs                  alla butiker utom de bevakade
 *   node scripts/priskoll.mjs --browser        även Clas Ohlson
 *   node scripts/priskoll.mjs --sida avfuktare bara en sida
 *   node scripts/priskoll.mjs --json ut.json   sparar hela resultatet
 */

import fs from "node:fs";
import path from "node:path";

const DATA_DIR = "lib/data";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
const HEADERS = {
  "User-Agent": UA,
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "sv-SE,sv;q=0.9,en;q=0.8",
  "Upgrade-Insecure-Requests": "1",
};
const SAMTIDIGA = 6;
const TIMEOUT_MS = 25000;
/* Under en krona är avrundning i butikens egen data, inte en prisändring. */
const TOLERANS = 0.5;

/* ------------------------------------------------------------ utplock -- */

function jsonLdPriser(html) {
  const priser = [];
  for (const m of html.matchAll(
    /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      continue;
    }
    const noder = Array.isArray(data) ? data : (data["@graph"] ?? [data]);
    for (const nod of noder) {
      const typ = nod?.["@type"];
      const arProdukt =
        typ === "Product" || (Array.isArray(typ) && typ.includes("Product"));
      if (!arProdukt || !nod.offers) continue;
      for (const erbjudande of [nod.offers].flat()) {
        const v = Number(erbjudande?.price ?? erbjudande?.lowPrice);
        if (Number.isFinite(v)) priser.push(v);
      }
    }
  }
  return priser;
}

function ogPriser(html) {
  return [...html.matchAll(/product:price:amount"[^>]*content="([\d.]+)"/g)]
    .concat([...html.matchAll(/content="([\d.]+)"[^>]*product:price:amount"/g)])
    .map((m) => Number(m[1]))
    .filter(Number.isFinite);
}

function biltemaPriser(html) {
  return [...html.matchAll(/"priceIncVAT":([\d.]+)/g)]
    .map((m) => Number(m[1]))
    .filter(Number.isFinite);
}

function wooBlobPriser(html) {
  return [...html.matchAll(/"price":([\d.]+),"stocklevel"/g)]
    .map((m) => Number(m[1]))
    .filter(Number.isFinite);
}

/**
 * En regel per butik. `plock` körs i ordning tills något ger ett pris, så
 * en butik kan ha både en primär och en reservmetod. Faller allt bort
 * används de generiska nedan, vilket gör att en ny butik ofta fungerar utan
 * att någon rör den här filen.
 */
const REGLER = [
  { vard: "kjell.com", namn: "Kjell & Company", plock: [jsonLdPriser] },
  { vard: "bygghemma.se", namn: "Bygghemma", plock: [jsonLdPriser] },
  { vard: "proshop.se", namn: "Proshop", plock: [jsonLdPriser] },
  { vard: "apotea.se", namn: "Apotea", plock: [jsonLdPriser] },
  { vard: "brandvarnare.se", namn: "Brandvarnare.se", plock: [ogPriser, wooBlobPriser] },
  { vard: "bauhaus.se", namn: "Bauhaus", plock: [ogPriser, jsonLdPriser] },
  { vard: "biltema.se", namn: "Biltema", plock: [biltemaPriser, jsonLdPriser] },
  { vard: "clasohlson.com", namn: "Clas Ohlson", plock: [jsonLdPriser], needsBrowser: true },
  /* Se varningen i filhuvudet: CAPTCHA, alltså manuell kontroll. */
  { vard: "hornbach.se", namn: "Hornbach", plock: [ogPriser, jsonLdPriser], manuell: true },
  /* Elgiganten renderar priset i JavaScript och publicerar det inte i någon
     städad form. Det är skälet till att Duux Bora Smart ligger bland de
     övervägda på /avfuktare i stället för i rankningen. */
  { vard: "elgiganten.se", namn: "Elgiganten", plock: [jsonLdPriser], needsBrowser: true },
];
const GENERISKA = [jsonLdPriser, ogPriser, wooBlobPriser];

/**
 * Produkter vars pris är en summa av flera artiklar.
 *
 * Housegards Luma-system är två varnare plus en hubb, och Kjell säljer dem
 * som skilda artiklar. Vi visar summan, eftersom systemet inte fungerar utan
 * båda delarna, men `merchantUrl` måste peka på en av dem och pekar på
 * varnarna. Utan den här listan flaggades produkten som fel varje natt.
 *
 * Kontrollen blir inte svagare av det, den blir starkare: **båda artiklarna
 * hämtas och summan jämförs**. Ändrar Kjell priset på hubben upptäcks
 * det, vilket en vanlig kontroll av bara länken hade missat.
 */
const SAMMANSATTA = {
  "housegard-luma-system": {
    delar: [
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-luma-tradlos-brandvarnare-2-pack-vit-p21220",
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-luma-smart-hubb-p21221",
    ],
    beskrivning: "tvapacket plus hubben",
  },
};

/**
 * Priser som en människa har läst i sin egen webbläsare, med datum.
 *
 * Gäller bara butiker märkta `manuell`. Datumet skrivs ut i rapporten så att
 * det syns hur gammal kontrollen är: en manuell uppgift åldras precis som ett
 * pris, och skillnaden mot en automatisk är att ingen upptäcker det åt oss.
 */
const MANUELLT_KONTROLLERADE = {
  "shelly-plug-s-gen3": "2026-08-03",
};

function regelFor(url) {
  return REGLER.find((r) => url.includes(r.vard)) ?? null;
}

function lasPriser(url, html) {
  const regel = regelFor(url);
  for (const plock of regel?.plock ?? []) {
    const p = plock(html);
    if (p.length) return p;
  }
  for (const plock of GENERISKA) {
    const p = plock(html);
    if (p.length) return p;
  }
  return [];
}

/* -------------------------------------------------------- datafilerna -- */

/** Löser `${KONST}` mot `const KONST = "..."` i samma fil. */
function fyllMall(mall, konstanter) {
  return mall.replace(/\$\{(\w+)\}/g, (helaMatchen, namn) =>
    namn in konstanter ? konstanter[namn] : helaMatchen,
  );
}

function lasProdukter() {
  const produkter = [];
  for (const fil of fs.readdirSync(DATA_DIR)) {
    if (!fil.endsWith(".ts") || fil === "index.ts") continue;
    const sida = fil.replace(/\.ts$/, "");
    const kaella = fs.readFileSync(path.join(DATA_DIR, fil), "utf8");

    const konstanter = {};
    for (const m of kaella.matchAll(/^const (\w+) =\s*\n?\s*"([^"]+)";/gm)) {
      konstanter[m[1]] = m[2];
    }

    for (const block of kaella.split(/\n {4}id: "/).slice(1)) {
      const id = block.slice(0, block.indexOf('"'));
      const pris = block.match(/\n {4}price: ([\d.]+)/);
      const url = block.match(/\n {4}merchantUrl:\s*\n?\s*[`"]([^`"]+)[`"]/);
      if (!pris || !url) continue;
      produkter.push({
        sida,
        id,
        pris: Number(pris[1]),
        url: fyllMall(url[1], konstanter),
      });
    }
  }
  return produkter;
}

/* ------------------------------------------------------------ hamtning -- */

async function hamta(url) {
  const styr = new AbortController();
  const klocka = setTimeout(() => styr.abort(), TIMEOUT_MS);
  try {
    const svar = await fetch(url, { headers: HEADERS, signal: styr.signal });
    return { status: svar.status, html: await svar.text() };
  } finally {
    clearTimeout(klocka);
  }
}

/** Botkontrollen svarar 200 med en pyttesida. Att kalla det ok vore lurigt. */
function arBotkontroll(html) {
  return html.length < 8000 && /Client Challenge|challenge-platform|enable JavaScript/i.test(html);
}

async function oppnaWebblasare() {
  try {
    const { chromium } = await import("playwright");
    const webblasare = await chromium.launch();
    return {
      async hamta(url) {
        const flik = await webblasare.newPage({ locale: "sv-SE" });
        try {
          const svar = await flik.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
          await flik.waitForTimeout(4000);
          return { status: svar?.status() ?? 0, html: await flik.content() };
        } finally {
          await flik.close();
        }
      },
      stang: () => webblasare.close(),
    };
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------- korning -- */

const argv = process.argv.slice(2);
const flagga = (namn) => {
  const i = argv.indexOf(namn);
  return i === -1 ? null : (argv[i + 1] ?? true);
};
const anvandWebblasare = argv.includes("--browser");
const baraSida = flagga("--sida");
const jsonUt = flagga("--json");

let produkter = lasProdukter();
if (typeof baraSida === "string") produkter = produkter.filter((p) => p.sida === baraSida);

const webblasare = anvandWebblasare ? await oppnaWebblasare() : null;
if (anvandWebblasare && !webblasare) {
  console.error("  playwright saknas, koer utan webblasare. `pnpm add -D playwright`");
}

console.error(`  kontrollerar ${produkter.length} priser`);

const rader = [];
let klara = 0;

async function kolla(p) {
  const rad = { ...p, butik: regelFor(p.url)?.namn ?? "okaend", butikspris: null, status: "" };
  const regel = regelFor(p.url);
  try {
    if (regel?.manuell) {
      const datum = MANUELLT_KONTROLLERADE[p.id];
      rad.status = datum
        ? `MANUELL: laest for hand ${datum}, butiken kraever CAPTCHA`
        : "MANUELL: butiken kraever CAPTCHA, aldrig kontrollerad";
      return;
    }
    if (regel?.needsBrowser && !webblasare) {
      rad.status = "HOPPAD: kraever webblasare";
      return;
    }
    const hamtare = regel?.needsBrowser ? webblasare : { hamta };

    const sammansatt = SAMMANSATTA[p.id];
    if (sammansatt) {
      const delpriser = [];
      for (const del of sammansatt.delar) {
        const svar = await hamtare.hamta(del);
        if (arBotkontroll(svar.html)) {
          rad.status = "BOTKONTROLL";
          return;
        }
        const funna = lasPriser(del, svar.html);
        if (!funna.length) {
          rad.status = `INGET PRIS PAA DELEN ${del.split("/").pop()}`;
          return;
        }
        delpriser.push(funna[0]);
      }
      const summa = delpriser.reduce((a, b) => a + b, 0);
      rad.butikspris = summa;
      rad.allaPriser = delpriser;
      rad.status =
        Math.abs(summa - p.pris) < TOLERANS
          ? "ok"
          : `PRIS: vi ${p.pris} butiken ${delpriser.join(" + ")} = ${summa} (${sammansatt.beskrivning})`;
      return;
    }

    const { status, html } = await hamtare.hamta(p.url);
    if (status >= 400) {
      rad.status = `HTTP ${status}`;
      return;
    }
    if (arBotkontroll(html)) {
      rad.status = "BOTKONTROLL";
      return;
    }
    const priser = lasPriser(p.url, html);
    if (!priser.length) {
      rad.status = "INGET PRIS PAA SIDAN";
      return;
    }
    /* Variantmedveten: rätt om något av sidans priser matchar. */
    const traeff = priser.find((v) => Math.abs(v - p.pris) < TOLERANS);
    rad.butikspris = traeff ?? priser[0];
    rad.allaPriser = priser.length > 1 ? priser : undefined;
    rad.status = traeff !== undefined ? "ok" : `PRIS: vi ${p.pris} butiken ${priser.join(" eller ")}`;
  } catch (fel) {
    rad.status = "FEL: " + String(fel.message).slice(0, 50);
  } finally {
    rader.push(rad);
    if (++klara % 25 === 0) console.error("   ...", klara, "av", produkter.length);
  }
}

const koe = [...produkter];
await Promise.all(
  Array.from({ length: SAMTIDIGA }, async () => {
    while (koe.length) await kolla(koe.shift());
  }),
);
await webblasare?.stang();

const fel = rader.filter((r) => r.status.startsWith("PRIS:"));
const oklara = rader.filter((r) => r.status !== "ok" && !r.status.startsWith("PRIS:"));

console.log(`\n  ${rader.length - fel.length - oklara.length} av ${rader.length} priser staemmer.`);

if (fel.length) {
  console.log(`\n  FEL PRIS (${fel.length}):`);
  for (const r of fel.sort((a, b) => a.sida.localeCompare(b.sida))) {
    console.log(`    ${r.sida.padEnd(21)} ${r.id.padEnd(34)} ${r.butik.padEnd(17)} ${r.status}`);
  }
}
if (oklara.length) {
  console.log(`\n  EJ KONTROLLERADE (${oklara.length}):`);
  for (const r of oklara.sort((a, b) => (a.butik + a.sida).localeCompare(b.butik + b.sida))) {
    console.log(`    ${r.sida.padEnd(21)} ${r.id.padEnd(34)} ${r.butik.padEnd(17)} ${r.status}`);
  }
}
if (typeof jsonUt === "string") {
  fs.writeFileSync(jsonUt, JSON.stringify(rader, null, 1));
  console.log(`\n  fullstaendigt resultat i ${jsonUt}`);
}

if (fel.length) {
  console.log("\n  Ett fel pris blockerar lansering. Raetta datafilen och bumpa PRICE_CHECKED.");
  /* exitCode i stället för process.exit: Windows klagar på öppna handtag
     om processen rivs medan sockets fortfarande stängs ner. */
  process.exitCode = 1;
}
