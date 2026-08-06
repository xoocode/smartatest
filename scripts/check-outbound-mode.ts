/**
 * Vem räknar det utgående klicket, och gör bara en av dem det.
 *
 * Tre lägen: `off`, `client`, `server`. De två sista utesluter varandra, och
 * felet de förhindrar är tyst. Ingenting kraschar; siffran blir dubbelt så hög
 * som verkligheten, och fel åt det håll som smickrar kampanjen.
 *
 * Lägena styr tre saker som testas ihop eftersom de måste hänga ihop:
 *
 *  1. Vem som städar adressfältet. En konvertering i webbläsaren attribueras
 *     via `_gcl_aw`, som gtag bara skriver om den hinner läsa klick-id:t ur
 *     adressen. I `client` måste parametern alltså överleva landningen. I `off`
 *     och `server` tar servern bort den direkt.
 *  2. Vad klickrapporten säger. Läget följer med varje klick så att
 *     plattformen kan avgöra per klick i stället för att lita på att en andra
 *     inställning hålls i takt för hand.
 *  3. Att ett okänt värde tystar funktionen i stället för att gissa.
 *
 * Körs utan utvecklingsserver, med en riktig `NextRequest` mot rutten och en
 * liten stub som tar emot rapporten. Next 16 vägrar starta en andra dev-server
 * i samma katalog, och att bygga skulle skriva över `.next` som den som redan
 * kör använder.
 *
 *   npx tsx --env-file=.env scripts/check-outbound-mode.ts
 */
import { NextRequest } from "next/server";

import { captureAndClean, getConfig, resetConfigCache } from "@/lib/r9track";

const GCLID = "ZZMODE12345";
const ORIGIN = "https://smartatest.se";

let failures = 0;
function check(name: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  ${detail}` : ""}`);
  if (!ok) failures++;
}

type Mode = "off" | "client" | "server";

function configFor(mode: string) {
  resetConfigCache();
  process.env.R9_TRACK_OUTBOUND_CONVERSION = mode;
  process.env.R9_TRACK_ENDPOINT = "http://127.0.0.1:1/click";
  process.env.R9_TRACK_SITE = "modecheck";
  process.env.R9_TRACK_SECRET = "modecheck-secret";
  process.env.R9_TRACK_ENABLED = "1";
  return getConfig({
    /* Samtycke är redan bedömt som onödigt för infångningen på den här sajten,
       och det som testas här är läget, inte samtyckesgrinden. */
    captureRequiresConsent: false,
  });
}

async function main() {
  // ── Okända värden tystar funktionen ───────────────────────────────────────
  check(
    "ett stavfel i läget blir off, inte ett av de två sätten att räkna",
    configFor("serverr").outboundConversion === "off",
    configFor("serverr").outboundConversion
  );
  check(
    "ett tomt läge blir off",
    configFor("").outboundConversion === "off"
  );

  for (const mode of ["off", "client", "server"] as Mode[]) {
    console.log(`\n— ${mode} —`);
    const config = configFor(mode);
    check(`[${mode}] läget läses ur miljön`, config.outboundConversion === mode);

    // ── 1. Vem städar adressen ──────────────────────────────────────────────
    const landing = new NextRequest(`${ORIGIN}/vattenlarm?gclid=${GCLID}`);
    const response = captureAndClean(landing, config);
    const redirected = response.status === 307;
    const location = response.headers.get("location");

    check(
      `[${mode}] adressen städas av ${mode === "client" ? "webbläsaren" : "servern"}`,
      mode === "client" ? !redirected : redirected,
      redirected ? `307 → ${location}` : "ingen omdirigering"
    );
    if (mode !== "client") {
      check(
        `[${mode}] parametern är borta ur den nya adressen`,
        Boolean(location) && !location!.includes(GCLID),
        location ?? ""
      );
    }
    check(
      `[${mode}] klick-id:t sparas oavsett`,
      response.cookies.get(config.cookieName)?.value.includes(GCLID) ?? false
    );

    /* Att rapporten bär läget testas i check-till-report.mjs i stället.
       `after()` kräver en riktig förfrågningskontext och kastar när rutten
       anropas direkt, så den delen behöver en server som kör. */
  }

  console.log(failures === 0 ? "\nALL PASS" : `\n${failures} FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
