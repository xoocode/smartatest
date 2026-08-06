/**
 * Nothing that opens over the page may open off the side of it.
 *
 * The search panel did. It was `absolute right-0` with its width clamped to
 * `min(22rem, 100vw-2rem)`, which sounds safe and is not: clamping the width
 * without moving the anchor still lets a panel overflow, because the trigger
 * sits inboard of the hamburger and the panel grew leftward from there.
 * Measured before the fix, it ran -24..264 at 320px and -18..334 at 390px,
 * with the document no wider than the window, so the missing strip was clipped
 * rather than reachable by scrolling. It only came right at 430px and up,
 * which is why it looked fine on every desktop.
 *
 * This measures every overlay it can open rather than trusting a class list,
 * and it checks the scrolled state too: the header uses `backdrop-blur`, and a
 * backdrop-filter makes an element the containing block for its fixed
 * descendants, so "fixed" inside the header is not relative to the viewport.
 *
 *   node scripts/check-overlays.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3000";

/* 320 is the narrowest screen worth supporting, 390 a current iPhone, 430 the
   width where the old bug stopped showing, and 1440 proves the desktop layout
   is untouched. */
const WIDTHS = [320, 360, 390, 430, 768, 1440];

/* Every control that opens something, by accessible name. Matched against the
   visible one: the header mounts its search twice, once for each breakpoint,
   and clicking the `display:none` copy renders a panel inside a hidden subtree
   that measures as no panel at all and reads as a pass. */
const TRIGGERS = [
  /* Typed into, because an empty search panel is 88px tall and proves nothing.
     With results it was 862px with its bottom at 934px and no scroller, so the
     last hits were unreachable on every phone. */
  { name: "search", pattern: /^sök$/i, type: "brand" },
  /* The hamburger is `md:hidden`, so its absence above 768px is the design and
     not a failure. Without this the check reported "trigger not found" on
     desktop, which is the sort of noise that gets a whole check ignored. */
  { name: "menu", pattern: /meny|menu/i, upTo: 767 },
];

const MEASURE = `(() => {
  const out = [];
  for (const el of Array.from(document.querySelectorAll("div, ul, nav, dialog"))) {
    const cs = getComputedStyle(el);
    if (cs.position !== "absolute" && cs.position !== "fixed") continue;
    if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") continue;
    const r = el.getBoundingClientRect();
    if (r.width < 80 || r.height < 40) continue;
    /* Backdrops and full-bleed bars cover the screen on purpose. */
    if ((cs.backgroundColor || "").indexOf("rgba(0, 0, 0") === 0) continue;
    if (r.width >= window.innerWidth && r.left <= 0) continue;
    out.push({
      cls: (el.className || "").toString().slice(0, 56),
      left: Math.round(r.left), right: Math.round(r.right),
      top: Math.round(r.top), bottom: Math.round(r.bottom),
      w: Math.round(r.width), h: Math.round(r.height), pos: cs.position
    });
  }
  return out;
})()`;

let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  ${detail}` : ""}`);
  if (!ok) failures++;
}

const clickVisible = (page, source) =>
  page.evaluate(`(() => {
    const re = ${source};
    const b = Array.from(document.querySelectorAll("button")).filter(function (x) {
      const label = (x.getAttribute("aria-label") || "") + " " + (x.textContent || "");
      if (!re.test(label.trim())) return false;
      const r = x.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    })[0];
    if (!b) return null;
    b.click();
    return (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 20);
  })()`);

async function main() {
  const browser = await chromium.launch();

  for (const width of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height: 780 });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 1000));

    for (const trigger of TRIGGERS) {
      if (trigger.upTo && width > trigger.upTo) continue;
      await page.keyboard.press("Escape").catch(() => {});
      await page.evaluate(
        `document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))`
      );
      await new Promise((r) => setTimeout(r, 150));

      const label = await clickVisible(page, String(trigger.pattern));
      if (!label) {
        check(`${width}px ${trigger.name}: trigger present`, false, "not found");
        continue;
      }
      await new Promise((r) => setTimeout(r, 400));

      if (trigger.type) {
        await page.keyboard.type(trigger.type);
        await new Promise((r) => setTimeout(r, 600));
      }

      for (const [state, scrollTo] of [
        ["at rest", 0],
        ["scrolled", 600],
      ]) {
        await page.evaluate(`window.scrollTo(0, ${scrollTo})`);
        await new Promise((r) => setTimeout(r, 200));
        const panels = await page.evaluate(MEASURE);

        /* No panel is not a pass. It means the trigger did nothing, or the
           panel rendered somewhere this cannot see, and either way the check
           has learned nothing. */
        if (panels.length === 0) {
          check(
            `${width}px ${trigger.name} ${state}: panel is measurable`,
            false,
            "nothing opened — cannot conclude it is on screen"
          );
          continue;
        }

        const vh = await page.evaluate("window.innerHeight");
        const bad = panels.filter(
          (p) =>
            p.left < -1 ||
            p.right > width + 1 ||
            p.top < -1 ||
            p.bottom > vh + 1
        );
        check(
          `${width}px ${trigger.name} ${state}: stays on screen`,
          bad.length === 0,
          bad.length
            ? bad.map((p) => `${p.w}px at ${p.left}..${p.right}`).join("; ")
            : panels.map((p) => `${p.w}px at ${p.left}..${p.right}`).join("; ")
        );

        /* Fitting by being cut off is not fitting: whatever overflows has to
           have somewhere to scroll. */
        const unscrollable = await page.evaluate(`(() => {
          const out = [];
          for (const el of Array.from(document.querySelectorAll("div, ul"))) {
            const cs = getComputedStyle(el);
            if (cs.position !== "absolute" && cs.position !== "fixed") continue;
            if (cs.display === "none") continue;
            const r = el.getBoundingClientRect();
            if (r.width < 80 || r.height < 40) continue;
            const scroller = el.querySelector("ul, div");
            const overflows = el.scrollHeight > el.clientHeight + 1;
            const canScroll = ["auto", "scroll"].indexOf(cs.overflowY) !== -1 ||
              (scroller && ["auto","scroll"].indexOf(getComputedStyle(scroller).overflowY) !== -1);
            if (overflows && !canScroll) out.push(Math.round(el.scrollHeight - el.clientHeight));
          }
          return out;
        })()`);
        check(
          `${width}px ${trigger.name} ${state}: overflow can be scrolled to`,
          unscrollable.length === 0,
          unscrollable.length ? `${unscrollable[0]}px unreachable` : "nothing clipped"
        );

        /* A panel flush against the edge is technically on screen and horrible
           to use on a phone, where that is where the thumb and the rounded
           corner are. */
        if (width < 768) {
          const flush = panels.filter((p) => p.left < 8 || p.right > width - 8);
          check(
            `${width}px ${trigger.name} ${state}: keeps clear of the edges`,
            flush.length === 0,
            flush.length ? `${flush[0].left}..${flush[0].right}` : "≥8px both sides"
          );
        }
      }

      await page.keyboard.press("Escape").catch(() => {});
      await page.evaluate("window.scrollTo(0, 0)");
    }

    await page.close();
  }

  await browser.close();
  console.log(failures === 0 ? "\nALL PASS" : `\n${failures} FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
