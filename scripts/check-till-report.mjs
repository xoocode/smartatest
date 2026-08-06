/**
 * What `/till/{id}` actually reports.
 *
 * Two things were wrong and both were invisible in the database, because the
 * absent value and the never-sent value look identical once stored.
 *
 *  1. `placement` and `position` were read from `?pl=` and `?pos=`, which
 *     nothing set, so every click recorded a null slot and rank zero.
 *  2. `isBot` was hardcoded false. The user-agent test only catches crawlers
 *     that name themselves, so anything presenting a normal browser string was
 *     filed as a genuine click. On the first two days of real traffic that was
 *     23 of 31 clicks: one per product, never repeated, five inside 1.2
 *     seconds. All 8 clicks that carried a page behaved like people.
 *
 * A missing same-origin referrer turned out to separate the two populations
 * perfectly, so it is what marks a click automated now.
 *
 * This runs the redirect against a stub endpoint and reads the payload, rather
 * than clicking through to production and deleting rows afterwards.
 *
 *   node scripts/check-till-report.mjs   # starts its own server
 */
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { once } from "node:events";

const PORT = 3007;
const STUB_PORT = 3008;
const PRODUCT = "x-sense-sws54";

let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  ${detail}` : ""}`);
  if (!ok) failures++;
}

const received = [];

async function waitFor(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

async function main() {
  const stub = createServer((req, res) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      try {
        received.push(JSON.parse(body));
      } catch {
        received.push({ unparseable: body });
      }
      res.writeHead(200, { "content-type": "application/json" });
      res.end("{}");
    });
  });
  stub.listen(STUB_PORT);
  await once(stub, "listening");

  const site = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "dev", "-p", String(PORT)],
    {
      env: {
        ...process.env,
        R9_TRACK_ENDPOINT: `http://127.0.0.1:${STUB_PORT}/click`,
        R9_TRACK_SITE: "checkscript",
        R9_TRACK_SECRET: "checkscript-secret",
        R9_TRACK_ENABLED: "1",
      },
      stdio: process.env.DEBUG_SITE ? "inherit" : "ignore",
      shell: process.platform === "win32",
    }
  );

  /* Same hostname the referrer will use. `nextUrl.origin` compares as a
     string, so 127.0.0.1 and localhost are two different origins and the
     referrer would be discarded as off-site. */
  const up = await waitFor(`http://localhost:${PORT}/vattenlarm`, 120000);
  check("the site came up", up);
  if (!up) {
    site.kill();
    stub.close();
    process.exit(1);
  }

  const hit = async (path, headers) => {
    received.length = 0;
    const res = await fetch(`http://localhost:${PORT}${path}`, {
      redirect: "manual",
      headers,
    });
    /* `after()` runs the report once the response is out, so give it a moment
       rather than racing it. */
    for (let i = 0; i < 30 && received.length === 0; i++) {
      await new Promise((r) => setTimeout(r, 200));
    }
    return { status: res.status, payload: received[0] ?? null };
  };

  // ── A click from a page, the way a reader makes one ──────────────────────
  const human = await hit(`/till/${PRODUCT}?pl=comparison-table&pos=3`, {
    referer: `http://localhost:${PORT}/vattenlarm`,
  });
  check("a click redirects", human.status === 302, `HTTP ${human.status}`);
  check("it is reported", Boolean(human.payload));

  if (human.payload) {
    const p = human.payload;
    check("the page it came from is recorded", p.pagePath === "/vattenlarm", `${p.pagePath}`);
    check("the slot is recorded", p.placement === "comparison-table", `${p.placement}`);
    check("the rank is recorded", p.position === 3, `${p.position}`);
    check("it is not marked automated", p.isBot === false, `isBot ${p.isBot}`);
    check("the product is recorded", p.productId === PRODUCT, `${p.productId}`);
  }

  // ── The same URL fetched with no referrer, as the crawlers do ────────────
  const crawler = await hit(`/till/${PRODUCT}`, {});
  check("a referrer-less hit still redirects", crawler.status === 302, `HTTP ${crawler.status}`);
  check("it is still recorded rather than dropped", Boolean(crawler.payload));

  if (crawler.payload) {
    const p = crawler.payload;
    check("it has no page, truthfully", p.pagePath === null, `${p.pagePath}`);
    check(
      "it is marked automated",
      p.isBot === true,
      `isBot ${p.isBot} — this is what keeps it out of earnings per click`
    );
  }

  // ── A cross-origin referrer is not a page on this site ───────────────────
  const offsite = await hit(`/till/${PRODUCT}?pl=winner-card&pos=1`, {
    referer: "https://www.google.com/",
  });
  if (offsite.payload) {
    check(
      "an off-site referrer counts as no page",
      offsite.payload.pagePath === null,
      `${offsite.payload.pagePath}`
    );
    check(
      "and is marked automated too",
      offsite.payload.isBot === true,
      "a real reader arrives from our own page, not from a search result"
    );
  }

  site.kill();
  stub.close();
  console.log(failures === 0 ? "\nALL PASS" : `\n${failures} FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
