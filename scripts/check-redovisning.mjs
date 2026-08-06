#!/usr/bin/env node
/**
 * Faeller kriterier som betygsaetter om en uppgift PUBLICERATS i staellet foer
 * vad produkten GOER.
 *
 * ## Regeln
 *
 * Anvaendarbeslut 2026-08-05, vid bygget av `/mjolkskummare`:
 * **redovisning aer aldrig ett kriterium och faar aldrig baera vikt.**
 *
 * ## Varfoer regeln finns
 *
 * `Oeppen redovisning` vaexte fram som ett saett att goera naagot av en tom
 * cell. Naer ingen tillverkare angav fallhoejd, boejtal eller wattimmar blev
 * tystnaden i sig ett betyg, och sidan fick en kolumn med siffror i.
 *
 * Priset var att rankningen slutade handla om produkten. En laesare som vaeljer
 * mjoelkskummare vill veta hur mycket skum den goer, inte hur foeredoemligt
 * butiken fyllt i sitt produktblad. Ett kriterium som belönar publicering
 * rankar **saeljarens dokumentation**, och tvaa produkter som goer exakt samma
 * sak hamnar daa paa olika platser av skael koeparen inte kan anvaenda.
 *
 * Det goer ocksaa sajtens egen kaellhantering till laesarens problem. Att en
 * uppgift saknas hoer hemma i viktningen och som streck i tabellen — det aer
 * precis vad `check:kallprat` finns foer att skydda. Ett kriterium som heter
 * `Oeppen redovisning` flyttar tillbaka samma sak in i betygen, genom en doerr
 * den kontrollen inte tittar paa.
 *
 * Fyndet foersvinner inte med kriteriet. Att Severin 500 skummar 260 ml, och
 * att Melitta inte anger naagot alls, baers av fyndavsnittet, koepguiden,
 * omdoemena och FAQ — dit `check:kallprat` slaepper in produktens egenskap men
 * inte kaellans beteende.
 *
 * ## Rapporterar globalt, faeller per sida
 *
 * Foersta koerningen gav **nio sidor**: AVFUKTARE 15, USB_C_LADDARE 15,
 * GARAGEPORTSOPPNARE 25, USB_C_KABEL 15, POWERBANK 15, GALAXY_S26_SKAL 20,
 * IPHONE_SKAL 22, POWERBANK_20000 15, IPHONE_SKARMSKYDD 25.
 *
 * Att ta bort ett kriterium som vaeger 25 raeknar om varje betyg paa sidan och
 * kastar om rangordningen. Det aer `/fix-page`-arbete per sida, inte en
 * soek-och-ersaett. Daerfoer rapporterar `pnpm check` summan, och den sida som
 * goers om koers med `--sida <slug> --strict`.
 *
 *   node scripts/check-redovisning.mjs                 hela sajten, faeller inte
 *   node scripts/check-redovisning.mjs --sida powerbank  bara den sidan
 *   node scripts/check-redovisning.mjs --strict          exit 1 vid traeff
 */

import fs from "node:fs";

const FILE = "lib/test-pages.ts";
const argv = process.argv.slice(2);
const STRICT = argv.includes("--strict");
const SIDA = (() => {
  const i = argv.indexOf("--sida");
  return i === -1 ? undefined : argv[i + 1];
})();

/* Matchar bade `key` och `label`, eftersom ett kriterium kan doepas om utan
   att bytas ut. `redovis` taecker redovisning, redovisad, redovisar. */
const MISSTAENKT = /redovis|oeppenhet|öppenhet|transparen|angiven uppgift/i;

/* ⚠️ Etiketten raecker inte. `/brandstege` bar kriteriet `Dokumenterad
   provning`, vikt 20, vars egen beskrivning sa att det maette "vad du kan
   kontrollera innan du betalar, inte vad stegen fysiskt klarar" — alltsaa
   exakt det haer felet, under ett namn som inte innehaaller ordet redovisning.
   Det passerade check:redovisning i tre veckor och hittades foerst naer
   sidans prosa laestes for hand 2026-08-06.

   Daerfoer laeses ocksaa beskrivningen. Ett kriterium som betygsaetter
   publicering avsloejar sig naestan alltid daer, eftersom skalan maaste
   foerklaras. Traeffarna aer svagare aen etikettraeffarna och rapporteras
   separat: de kraever ett omdoeme, inte en aatgaerd. */
const BESKRIVNING = [
  [/inte vad (?:den|det|produkten|stegen|skyddet|laddaren)[^.]{0,40}(?:fysiskt )?klarar/i, "saeger sig maeta annat aen vad varan goer"],
  [/vad du kan kontrollera (?:innan|foere|före)/i, "maeter vad koeparen kan kontrollera i foervaeg"],
  [/bel(?:oe|ö)nar (?:att uppgiften )?publicer/i, "beloenar publicering"],
  [/att uppgiften publiceras/i, "beloenar publicering"],
  [/publicerad skala/i, "skalan bygger paa vad som publicerats"],
  [/innan (?:asken|paketet|kartongen|foerpackningen|förpackningen) (?:aer|är) (?:oeppnad|öppnad|oeppnat|öppnat)/i, "maeter vad som staar innan koepet"],
  [/(?:staar|står) utskriv|skriver ut (?:aeven|även) det som/i, "beloenar att saeljaren skriver ut saker"],
];

/* Radsluten normaliseras foerst. `lib/test-pages.ts` ligger med CRLF, och
   delningen paa `^\s*\{$` naedan ankrar paa radslut. Utan det haer steget
   foell hela kriterielistan ihop till ett block per sida och bara det
   foersta kriteriet laestes. Funnet 2026-08-06 tillsammans med samma fel i
   check-avdrag.mjs, som daa rapporterade noll traeffar paa hela sajten. */
const src = fs.readFileSync(FILE, "utf8").replace(/\r\n/g, "\n");
const heads = [...src.matchAll(/^export const ([A-Z0-9_]+)(?::[^=]*)?=\s*\{/gm)];

const traeffar = [];
/* Svagare signal: etiketten aer ren men beskrivningen laater som redovisning. */
const misstankar = [];

for (const [i, head] of heads.entries()) {
  const next = heads[i + 1];
  const block = src.slice(head.index, next ? next.index : src.length);

  const start = block.indexOf("criteria: [");
  if (start === -1) continue;
  const tail = block.slice(start);
  const end = tail.search(/^ {2}\],$/m);
  const criteria = end === -1 ? tail : tail.slice(0, end);

  /* Ett kriterium aer ett objekt med key, label och weight. Dela paa `key:`
     saa att label och weight hoer till raett kriterium. */
  const bitar = criteria.split(/^\s*\{$/m);
  for (const bit of bitar) {
    const key = bit.match(/key: "([^"]+)"/)?.[1];
    const label = bit.match(/label: "([^"]+)"/)?.[1];
    const weight = bit.match(/weight: (\d+(?:\.\d+)?)/)?.[1];
    if (!key && !label) continue;
    const line = src.slice(0, head.index + start).split("\n").length;

    if (MISSTAENKT.test(key ?? "") || MISSTAENKT.test(label ?? "")) {
      traeffar.push({ sida: head[1], key, label, weight, line });
      continue;
    }

    /* Etiketten aer ren. Laes beskrivningen. */
    const desc = bit.match(/description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    if (!desc) continue;
    const skal = BESKRIVNING.find(([re]) => re.test(desc));
    if (skal) misstankar.push({ sida: head[1], key, label, weight, line, skal: skal[1] });
  }
}

const passar = (t) =>
  !SIDA || t.sida.toLowerCase().replace(/_/g, "-") === SIDA.toLowerCase();
const valda = traeffar.filter(passar);
const svaga = misstankar.filter(passar);

/* Rapporteras alltid, ocksaa naer etikettlistan aer tom, eftersom det aer
   precis daa de aer laettast att missa. */
const svagRapport = svaga.length
  ? `\ncheck:redovisning — ${svaga.length} kriterier har ren etikett men en\n` +
    `  beskrivning som laater som redovisning. Laes dem och avgoer:\n\n` +
    svaga
      .map(
        (t) =>
          `    ${String(t.weight ?? "?").padStart(3)}  ${t.sida.padEnd(22)} ${t.label ?? t.key}\n` +
          `         ${t.skal}`,
      )
      .join("\n") +
    `\n\n  Ett kriterium doeps sallan till redovisning. /brandstege kallade sitt\n` +
    `  Dokumenterad provning och bar vikt 20 i tre veckor.\n`
  : "";

if (!valda.length) {
  console.log("check:redovisning — inga kriterier betygsätter publicering.\n");
  if (svagRapport) console.log(svagRapport);
  process.exit(0);
}

const rader = valda
  .map((t) => `    ${String(t.weight ?? "?").padStart(3)}  ${t.sida.padEnd(22)} ${t.label ?? t.key}`)
  .join("\n");

console.log(
  `check:redovisning — ${valda.length} kriterier betygsätter att en uppgift\n` +
    `  publicerats i stället för vad produkten gör.\n\n` +
    rader +
    `\n\n` +
    `  Ett kriterium som belönar publicering rankar säljarens dokumentation.\n` +
    `  Två produkter som gör samma sak hamnar då på olika plats av skäl\n` +
    `  köparen inte kan använda. Källäget hör hemma i viktningen och som\n` +
    `  streck i tabellen — aldrig som vikt.\n\n` +
    `  Ta bort kriteriet och fördela om vikten. Det räknar om varje betyg på\n` +
    `  sidan, så det är /fix-page-arbete per sida. Kör --sida <slug> --strict.\n` +
    svagRapport,
);

if (STRICT) process.exit(1);
