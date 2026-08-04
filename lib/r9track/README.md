# r9track — drop-in click tracking

Connects a Google Ads click to affiliate revenue that happens on someone else's
website. Copy this folder into any Next.js App Router project; it imports
nothing from the site around it.

Platform side lives in `redpoint9.com` (`lib/track/`, `app/api/track/click/`).
Design rationale: `smartatest/.agent/plans/conversion-tracking.md`.

---

## Install

### 1. Copy the folder

```
cp -r lib/r9track <new-project>/lib/r9track
```

Requires Next.js 15+ (for `after()`) and nothing else. No dependencies.

### 2. Register the site on the platform

Insert a row in `track_sites` with a slug, the origin, and a generated secret:

```sql
insert into track_sites (slug, origin, hmac_secret)
values ('minsajt', 'https://minsajt.se', '<64 hex chars>');
```

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Environment variables

| Variable | Required | Notes |
|---|---|---|
| `R9_TRACK_ENDPOINT` | yes | `https://redpoint9.com/api/track/click` |
| `R9_TRACK_SITE` | yes | the slug from step 2 |
| `R9_TRACK_SECRET` | yes | the secret from step 2. Server-side only. |
| `R9_TRACK_CONSENT_COOKIE` | to store gclids | cookie your CMP writes |
| `R9_TRACK_ENABLED` | no | `false` kills the whole module |
| `R9_TRACK_COOKIE` | no | defaults to `_r9c` |
| `R9_TRACK_CLICK_PARAM` | no | network sub-id parameter, defaults to `epi` |
| `R9_TRACK_GCLID_PARAM` | no | defaults to `gclid` |

With any of the first three missing the module disables itself. It never
half-works.

### 4. Wire the two entry points

**`proxy.ts`** — captures the click identifier on landing:

```ts
import { NextResponse, type NextRequest } from "next/server";
import { captureClickId } from "@/lib/r9track";

export function proxy(request: NextRequest) {
  return captureClickId(request, NextResponse.next());
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
```

> On Next 16.1 and earlier, name the file `middleware.ts` and the export
> `middleware`. The convention was renamed in 16.2; nothing else changes.
> Note that adding either file to a **running** dev server does not hot-reload
> — restart it, or every request 500s with "Cannot find the middleware module".

**`app/till/[id]/route.ts`** — the outbound redirect:

```ts
import { createTillRoute } from "@/lib/r9track";
import { findProduct } from "@/lib/data";

export const { GET } = createTillRoute({
  resolve: (id) => {
    const product = findProduct(id);
    if (!product) return null;
    return {
      url: product.affiliateUrl ?? product.merchantUrl,
      merchant: product.merchant,
      isAffiliate: Boolean(product.affiliateUrl),
    };
  },
});
```

`resolve` is the entire site-specific surface. Return `null` and the route
404s.

### 5. Keep the redirect out of the index

In `app/robots.ts`, add the prefix to `disallow`. The route also sends
`x-robots-tag: noindex, nofollow`, but a crawler should not spend the request
in the first place.

---

## Behaviour worth knowing

**Consent fails closed.** With no `R9_TRACK_CONSENT_COOKIE` configured, no
click identifier is ever stored. The click is still reported, anonymously, so
earnings-per-click keeps its denominator. A project that forgets to wire its
CMP gets no tracking rather than silent non-compliance.

**The platform is never in the money path.** The reader is redirected first and
the report is sent from `after()`. If the platform is down the reader still
reaches the shop and the affiliate cookie is still set.

**Nothing retries.** A dropped report loses one click's gclid join. The
affiliate network reports our click id back on the transaction, so
reconciliation recovers most of it, and a durable queue on the publisher is not
worth operating for the remainder.

**`isAffiliate` decides whether the sub-id is appended.** Before you join a
network, return `false`: clicks are measured, but nothing is appended to the
retailer's own URL.

---

## Files

| File | Role |
|---|---|
| `config.ts` | environment, defaults, master switch |
| `capture.ts` | middleware: reads gclid/wbraid/gbraid, writes the cookie |
| `redirect.ts` | `createTillRoute` — mint, redirect, then report |
| `report.ts` | signed POST to the platform |
| `sign.ts` | HMAC-SHA256, Web Crypto so it runs on both runtimes |
| `click-id.ts` | 16-character time-prefixed identifier |

`sign.ts` and `click-id.ts` are deliberate mirrors of the platform's
`lib/track/hmac.ts` and `lib/track/click-id.ts`. Change one, change both.
