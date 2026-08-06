#!/usr/bin/env node
/**
 * Fäller texten när den börjar berätta hur den kom till.
 *
 * Fem klasser, alla samma fel: sidan talar om sitt eget tillkomstsätt i
 * stället för om produkten. Läsaren ska köpa en avfuktare, inte granska vår
 * arbetsmetod.
 *
 *   A. Berättad research   "vi sökte igenom … och fick noll träffar"
 *   B. Ordräkning          "ordet ozon förekommer 33 gånger"
 *   C. Affärsmodellen      "vi tjänar ingenting på förstaplatsen"
 *   D. Maskinvokabulär     "strukturerad data", "svarar 403"
 *   E. Självmedvetenhet    "en sida där allt går till samma butik läser
 *                           som betald", "vi säger det hellre själva"
 *
 * Kommentarer är undantagna. De är till för oss. Fyra sidor och tre
 * komponenter handlar med rätta om affärsmodellen och står i UNDANTAG.
 *
 * Blanktecken plattas ut före sökningen, annars missas varje träff som
 * ligger över en radbrytning i MDX eller JSX.
 *
 * ⚠️ `\b` fungerar inte före å, ä och ö i JavaScript: både mellanslag och "ä"
 * är icke-ordtecken, så `\bär` matchar aldrig. Använd `(?<![\wåäöÅÄÖ])`.
 *
 * Kör med `pnpm check:lackor`.
 */

import fs from "node:fs";
import path from "node:path";

const ROTTER = ["content", "lib", "components", "app"];
const EXT = new Set([".ts", ".tsx", ".mdx"]);

/** Sidor och komponenter som ska handla om affärsmodellen. */
const UNDANTAG = [
  "app/annonsmarkning/", "app/integritetspolicy/", "app/om-oss/",
  "app/sa-testar-vi/", "app/kop-och-villkor/",
  "components/site/legal-disclaimer", "components/site/affiliate-disclosure",
  "components/site/trust-block", "components/site/cookie-consent",
  "lib/links.ts", "lib/site.ts",
  /* Filen är skriven för maskiner, så upplysningen hör hemma där. */
  "app/llms.txt/",
  /* Sökord för /annonsmarkning, alltså metadata om en tillåten sida. */
  "lib/search-index.ts",
  /* Lista över robotars user-agent, kod och inte text. */
  "lib/r9track/",
  /* Intern byggsida, ingen läsare kommer hit. */
  "app/styleguide/",
  /* Bylines och skribentcitat, där förstaperson är hela poängen. */
  "lib/people.ts",
];

const KLASSER = [
  /* Här låg en klass "vår egen källpolicy", ärvd från check-kallprat den
     5 augusti 2026 och borttagen samma dag. Den fällde `reason` på övervägda
     produkter och källnoterna i lib/sources.ts, alltså precis de ställen där
     formuleringen är riktig. Den här kontrollen läser filer och kan inte skilja
     på fält, och en kontroll som fäller på rätt ställe lär bara ut nästa
     omskrivning. Regeln lever som skrivråd i swedish-voice, inte som grind. */
  ["berättad research", [
    /vi sökte igenom/gi, /noll träffar/gi, /träffar på samtliga/gi,
    /fick (noll|inga) träffar/gi, /vi hämtade/gi, /automatiserad läsning/gi,
    /går inte att (söka|läsa) maskinellt/gi, /vi räknade upp/gi,
    /för hand och inte bara med sökning/gi,
    /sökords?körning/gi, /researchfil/gi, /i nästa mätning/gi,
    /sökvolym/gi, /jämförelse\w* vi mätt/gi, /sidor vi mätt/gi,
  ]],
  /* Texten oroar sig för hur den ser ut, eller berättar om vårt eget bygge.
     Läsaren är här för produkten, inte för redaktionens dagbok. */
  ["självmedvetenhet", [
    /läser som betald/gi, /tycker vi illa om/gi,
    /vi säger det hellre själva/gi, /än låter (det se ut|dig upptäcka)/gi,
    /när vi byggde sidan/gi, /när sidan skrevs/gi,
    /innan den här sidan publicerades/gi, /vi hellre säger själva/gi,
    /(vi har|har vi) (frågat|skrivit till) (varje|samtliga|alla|bolagen)/gi,
    /frågan har gått iväg/gi,
    /(på |för )en sida som (tjänar pengar|säljer)/gi,
    /det säger vi på en sida/gi, /och det är ändå det ärliga svaret/gi,
    /trots att vi (tjänar|får)/gi,
  ]],
  ["ordräkning", [
    /ordet \w+ förekommer/gi, /förekommer \d+ gånger/gi,
    /(nämner|skriver|anger) \w+ \d+ gånger/gi, /\d+ gånger på hela sidan/gi,
  ]],
  ["affärsmodellen", [
    /affiliate\w*/gi, /(vi (kan |))(har|saknar) (någon |ingen |)relation/gi,
    /vi kan söka till/gi, /betalar oss/gi, /vi tjänar (inget|ingenting|alltså)/gi,
    /provision/gi, /betalannonser/gi, /Adtraction/g, /Adrecord/g, /Tradedoubler/g,
    /spårar mot/gi, /intäktsväg/gi,
  ]],
  ["maskinvokabulär", [
    /strukturerad(e|) data/gi, /JSON-LD/g, /microdata/gi, /schema\.org/gi,
    /renderas/gi, /renderad sida/gi, /svarar 40\d/gi,
    /FAQ-uppmärkning/gi, /\bcurl\b/gi, /\buppmärkning\b/gi,
    /går inte att (söka|läsa) maskinellt/gi, /blockerar automatiser/gi,
  ]],
];

/** Nollar kommentarer men behåller radnumren. */
function utanKommentarer(src) {
  const tom = (m) => m.replace(/[^\n]/g, " ");
  return src
    .replace(/\/\*[\s\S]*?\*\//g, tom)
    .replace(/^\s*\/\/.*$/gm, tom)
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, tom);
}

/**
 * Plattar ut blanktecken och lämnar en karta tillbaka till originalindex,
 * så att radnumret i felutskriften pekar på rätt rad.
 */
function platta(src) {
  let ut = "";
  const karta = [];
  for (let i = 0; i < src.length; ) {
    if (/\s/.test(src[i])) {
      const start = i;
      while (i < src.length && /\s/.test(src[i])) i++;
      ut += " ";
      karta.push(start);
    } else {
      ut += src[i];
      karta.push(i);
      i++;
    }
  }
  return { ut, karta };
}

const träffar = [];

function gå(dir) {
  for (const post of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, post.name);
    if (post.isDirectory()) {
      gå(full);
      continue;
    }
    if (!EXT.has(path.extname(post.name))) continue;

    const rel = full.split(path.sep).join("/");
    if (UNDANTAG.some((u) => rel.includes(u))) continue;

    let src = utanKommentarer(fs.readFileSync(full, "utf8"));
    // URL:er, importsökvägar och identifierare är inte läsartext.
    src = src.replace(/https?:\/\/[^\s"')]+/g, (m) => "_".repeat(m.length));
    src = src.replace(/^\s*import[\s\S]*?from\s+"[^"]*";/gm, (m) => m.replace(/[^\n]/g, " "));
    /* FAQ-frågor ställs i läsarens röst. "Behöver jag en hubb?" är riktigt. */
    src = src.replace(/question:\s*"(?:[^"\\]|\\.)*"/g, (m) => m.replace(/[^\n]/g, " "));
    /* Identifierare och egenskapsnamn är kod, inte text: isAffiliate,
       affiliateUrl, <AffiliateCta>, data-affiliate, "affiliate-cta". */
    /* Kod skriver affiliate i camelCase eller PascalCase (affiliateUrl,
       AffiliateCta, isAffiliate, data-affiliate). Svensk prosa skriver
       sammansatta ord med gemener rakt igenom: affiliatelänk, affiliatesajt.
       Versalen efter, eller ett ordtecken före, skiljer alltså kod från text. */
    src = src.replace(/<\/?\s*\w*[Aa]ffiliate\w*/g, "___");
    src = src.replace(/[\w-]+[Aa]ffiliate\w*/g, "___");
    src = src.replace(/\b[Aa]ffiliate[A-Z-]\w*/g, "___");

    const { ut, karta } = platta(src);
    for (const [klass, monster] of KLASSER) {
      for (const re of monster) {
        for (const m of ut.matchAll(re)) {
          const rad = src.slice(0, karta[m.index] ?? 0).split("\n").length;
          träffar.push({
            fil: rel,
            rad,
            klass,
            utdrag: ut.slice(Math.max(0, m.index - 55), m.index + 80).trim(),
          });
        }
      }
    }
  }
}

for (const rot of ROTTER) if (fs.existsSync(rot)) gå(rot);

/**
 * Egen genomsökning: förstaperson i ett omdöme.
 *
 * "Det är den enda uppgiften jag hade velat ha innan jag skruvade upp den"
 * påstår att någon hållit i produkten. Vi provar ingenting fysiskt, så det är
 * samma fel som ett påhittat mätvärde.
 *
 * Bara fälten där vi själva talar om produkten genomsöks. Överallt annars är
 * förstaperson riktig: FAQ-frågor, svarsknappar i verktygen ("Ja, jag har
 * nolla"), köpknappar ("Visa mig priset") och skribentcitat.
 */
const JAG = /(?<![\wåäöÅÄÖ])(jag|mig|mitt eget|min egen)(?![\wåäöÅÄÖ])/g;
const FÄLT = /\b(verdict|reason|tagline|superlative):\s*("(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g;

for (const fil of fs.existsSync("lib/data") ? fs.readdirSync("lib/data") : []) {
  if (!fil.endsWith(".ts")) continue;
  const rel = `lib/data/${fil}`;
  const src = fs.readFileSync(rel, "utf8");
  for (const f of src.matchAll(FÄLT)) {
    for (const m of f[2].matchAll(JAG)) {
      träffar.push({
        fil: rel,
        rad: src.slice(0, f.index).split("\n").length,
        klass: "förstaperson i omdöme",
        utdrag: f[2].slice(Math.max(0, m.index - 60), m.index + 70).replace(/\\n/g, " ").trim(),
      });
    }
  }
}

if (träffar.length === 0) {
  console.log("  Inga lackor i anvandartext.");
  process.exit(0);
}

console.error(`\n  ${träffar.length} lacka(or) i anvandartext:\n`);
for (const t of träffar) {
  console.error(`  ${t.fil}:${t.rad}  [${t.klass}]`);
  console.error(`     ...${t.utdrag}...\n`);
}
console.error("  Sag vad du fann, inte hur du letade. Se skillen svensk-produktrecension-skrivstil\n");
process.exit(1);
