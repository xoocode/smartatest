/**
 * Every tracked outbound link has to say where on the page it sits.
 *
 * `/till/{id}` reads `?pl=` and `?pos=` to record which slot and which rank
 * earned a click. Nothing set them for the whole life of the site, so
 * `placement` was null and `position` zero on all 31 clicks ever recorded, and
 * "does the winner card out-earn the comparison table" had no answer. The
 * components knew their own slot the entire time; it reached a `data-placement`
 * attribute in the DOM and went no further.
 *
 * The href is built in one place, but the context is passed by hand at each of
 * a dozen call sites, and a forgotten prop silently restores the old
 * behaviour. This is what makes that loud: it renders real pages and reads the
 * hrefs the browser would actually follow.
 *
 *   node scripts/check-click-context.mjs [baseUrl]
 */
const BASE = process.argv[2] ?? "http://localhost:3000";

/* Pages picked to cover the distinct slots rather than the whole catalogue:
   a full test page with a winner card, table and reviews, and a page whose
   products sit in a plain grid. */
const PAGES = ["/vattenlarm", "/brandstege", "/iphone-skal"];

let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  ${detail}` : ""}`);
  if (!ok) failures++;
}

const TILL = /href="(\/till\/[^"]*)"/g;

async function main() {
  for (const path of PAGES) {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) {
      check(`${path} renders`, false, `HTTP ${res.status}`);
      continue;
    }
    const html = await res.text();

    const hrefs = [...html.matchAll(TILL)].map((m) =>
      m[1].replace(/&amp;/g, "&")
    );
    check(`${path} has tracked links`, hrefs.length > 0, `${hrefs.length} links`);
    if (hrefs.length === 0) continue;

    const parsed = hrefs.map((h) => new URL(h, "https://x.invalid"));
    const noPlacement = parsed.filter((u) => !u.searchParams.get("pl"));
    const placements = new Set(
      parsed.map((u) => u.searchParams.get("pl")).filter(Boolean)
    );

    check(
      `${path}: every tracked link carries a placement`,
      noPlacement.length === 0,
      noPlacement.length
        ? `${noPlacement.length} without: ${noPlacement
            .slice(0, 3)
            .map((u) => u.pathname)
            .join(", ")}`
        : [...placements].join(", ")
    );

    /* Position is only meaningful where something is ranked, so this checks
       that ranked slots carry one rather than demanding it everywhere. */
    const ranked = parsed.filter((u) =>
      ["winner-card", "comparison-table", "product-review"].includes(
        u.searchParams.get("pl") ?? ""
      )
    );
    const rankedNoPos = ranked.filter((u) => {
      const pos = Number(u.searchParams.get("pos"));
      return !Number.isInteger(pos) || pos < 1;
    });
    check(
      `${path}: ranked slots carry a position`,
      ranked.length > 0 && rankedNoPos.length === 0,
      ranked.length === 0
        ? "no ranked slots on this page"
        : `${ranked.length} ranked, positions ${[
            ...new Set(ranked.map((u) => u.searchParams.get("pos"))),
          ]
            .sort()
            .join(",")}`
    );

    /* A rank that is 1 for every row means the index was captured outside the
       loop, which looks correct in the markup and is useless in the data. */
    const tablePositions = parsed
      .filter((u) => u.searchParams.get("pl") === "comparison-table")
      .map((u) => u.searchParams.get("pos"));
    if (tablePositions.length > 1) {
      check(
        `${path}: table positions actually vary`,
        new Set(tablePositions).size > 1,
        `${new Set(tablePositions).size} distinct across ${tablePositions.length} rows`
      );
    }
  }

  console.log(failures === 0 ? "\nALL PASS" : `\n${failures} FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
