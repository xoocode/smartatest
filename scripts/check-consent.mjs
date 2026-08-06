/**
 * Samtycke, klick-id och vad taggen får göra.
 *
 * Två saker som ser likadana ut i koden men är olika frågor, och som den här
 * kontrollen håller isär:
 *
 *  1. Får vi behålla klick-id:t (gclid) för provisionsspårning? På den här
 *     sajten ja, alltid — se `captureRequiresConsent` i lib/track-config.ts,
 *     där bedömningen och vem som gjort den står. Utan id:t kan nätverket inte
 *     knyta ett köp till besöket, och då finns ingen intäkt att mäta.
 *  2. Får vi säga till Google att läsaren samtyckt till annonspersonalisering?
 *     Bara när läsaren faktiskt sagt ja. Det är `consentAds` och Consent
 *     Mode-signalerna, och de ska följa svaret exakt.
 *
 * ⚠️ `_r9c` är httpOnly. `document.cookie` ser den inte, och en kontroll som
 * letar där rapporterar "ingen gclid sparad" oavsett sanning. En tidigare
 * version av den här mätningen gjorde precis det och matchade i stället
 * Googles egen `_gcl_aw`, vilket såg grönt ut och bevisade ingenting om vår
 * infångning. Läs via webbläsarkontexten.
 *
 *   node scripts/check-consent.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3000";
const GCLID = "ZZCHECKGCLID1";

let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  ${detail}` : ""}`);
  if (!ok) failures++;
}

const STATE = `(() => {
  const banner = document.querySelector("[data-slot=cookie-consent]");
  return {
    banner: !!banner,
    cookies: document.cookie,
    consentSignals: (window.dataLayer || [])
      .filter(a => a && a[0] === "consent")
      .map(a => a[1] + ":" + JSON.stringify(a[2])),
    buttons: banner
      ? Array.from(banner.querySelectorAll("button")).map(b => (b.textContent || "").trim())
      : [],
  };
})()`;

const choose = (page, label) =>
  page.evaluate(`(() => {
    const b = Array.from(document.querySelectorAll("[data-slot=cookie-consent] button"))
      .find(x => (x.textContent || "").trim() === ${JSON.stringify(label)});
    if (!b) return false;
    b.click();
    return true;
  })()`);

async function main() {
  const browser = await chromium.launch();

  /* answer: what the reader clicks, or null for leaving the banner alone.
     adCookies: whether Google may write its own advertising cookies. */
  const CASES = [
    { label: "no answer", answer: null, adCookies: false },
    { label: "Nej tack", answer: "Nej tack", adCookies: false },
    { label: "Godkänn", answer: "Godkänn", adCookies: true },
  ];

  for (const c of CASES) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 780 } });
    const page = await ctx.newPage();

    /* httpOnly cookies are invisible to page scripts; read them off the
       browser context instead. */
    const r9 = async () => {
      const found = (await ctx.cookies()).find((x) => x.name === "_r9c");
      return found ? decodeURIComponent(found.value) : null;
    };

    await page.goto(`${BASE}/?gclid=${GCLID}`, { waitUntil: "domcontentloaded" });
    /* Wait for the signal rather than sleeping a guessed number of
       milliseconds. Landing now costs an extra page load, because middleware
       strips the click id and redirects, and a fixed delay was sampling
       `dataLayer` before gtag had bootstrapped on the second load. That failed
       roughly one run in four, which is worse than not checking at all. */
    await page
      .waitForFunction(
        `(window.dataLayer || []).some(a => a && a[0] === "consent")`,
        { timeout: 15000 }
      )
      .catch(() => {});
    await page.waitForSelector("[data-slot=cookie-consent]", { timeout: 15000 });

    const before = await page.evaluate(STATE);
    check(`[${c.label}] the banner appears on a first visit`, before.banner);
    check(
      `[${c.label}] it offers both answers`,
      before.buttons.includes("Godkänn") && before.buttons.includes("Nej tack"),
      before.buttons.join(" / ")
    );
    check(
      `[${c.label}] Consent Mode starts denied`,
      before.consentSignals.some(
        (s) => s.startsWith("default") && s.includes('"ad_storage":"denied"')
      )
    );

    /* The point of the site's assessment: the identifier is kept from the
       landing request, before any answer exists to wait for. */
    check(
      `[${c.label}] the click id is captured on landing`,
      (await r9())?.includes(GCLID) ?? false,
      (await r9()) ?? "(not written)"
    );

    if (c.answer) {
      check(`[${c.label}] the button works`, await choose(page, c.answer));
      await new Promise((r) => setTimeout(r, 1400));
    }

    await page.goto(`${BASE}/vattenlarm`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 1000));
    const after = await page.evaluate(STATE);

    check(
      `[${c.label}] the click id survives browsing on`,
      (await r9())?.includes(GCLID) ?? false,
      (await r9()) ?? "(lost)"
    );

    /* Whatever we may keep for ourselves, Google's own advertising storage
       follows the reader's answer and nothing else. */
    /* `_gcl_au` specifically, not `/_gcl_/`. The loose pattern also matched
       `_gcl_aw`, and once we began stripping the parameter from the URL that
       one stopped being written entirely while the check stayed green. */
    const gcl = (await ctx.cookies())
      .filter((x) => x.name.startsWith("_gcl"))
      .map((x) => x.name);
    check(
      `[${c.label}] Google ad cookies ${c.adCookies ? "are allowed" : "are withheld"}`,
      gcl.includes("_gcl_au") === c.adCookies,
      gcl.join(", ") || "(none)"
    );
    /* The cost of cleaning the address bar, and a settled one. `_gcl_aw` is
       Google's conversion linker: gtag writes it only if it can read the click
       id off the URL, and by then middleware has removed it. Nothing in this
       design needs it. All three conversion actions, including the outbound
       click one, are uploaded from the platform keyed on the id we captured
       ourselves, because their values are computed there. See section 4.4 of
       .agent/google-ads/tool-design-document.md. */
    check(
      `[${c.label}] no conversion linker cookie, as expected while we strip the URL`,
      !gcl.includes("_gcl_aw"),
      gcl.join(", ") || "(none)"
    );

    if (c.answer) {
      /* The last signal of any kind, not specifically an `update`. On a fresh
         page load a stored "denied" needs no update: the defaults already say
         denied, and pushing one would be a no-op. Only a stored "granted"
         produces an update, because the default is always denied first.
         Asserting an update exists therefore fails on the correct behaviour. */
      const last = after.consentSignals[after.consentSignals.length - 1];
      check(
        `[${c.label}] the effective consent state matches the answer`,
        Boolean(last) &&
          last.includes(c.adCookies ? '"ad_storage":"granted"' : '"ad_storage":"denied"'),
        (last || "(none)").slice(0, 100)
      );
      check(`[${c.label}] the banner stays away afterwards`, !after.banner);
    } else {
      check(
        `[${c.label}] the banner keeps asking until answered`,
        after.banner,
        "an unanswered banner must not be treated as a yes or a no"
      );
    }

    await ctx.close();
  }

  await browser.close();
  console.log(failures === 0 ? "\nALL PASS" : `\n${failures} FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
