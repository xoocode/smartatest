import { NextResponse, type NextRequest } from "next/server";

import { captureClickId, getConfig } from "@/lib/r9track";
import { TRACK_CONFIG } from "@/lib/track-config";

/**
 * AFFILIATE-SWAP — captures Google's click identifier on landing so an
 * outbound click later in the session can be joined back to the ad that paid
 * for it.
 *
 * All logic lives in `lib/r9track/`, which is portable and knows nothing about
 * this site. This file is the adapter, and the only reason it exists is that
 * the identifier has to be written from the server: Safari caps cookies set
 * from `document.cookie` at seven days, and the conversion window we care
 * about is ninety.
 *
 * Consent-gated and fails closed. `TRACK_CONFIG` is what makes the gate here
 * agree with the one in `/till`; see lib/track-config.ts for why that is a
 * shared constant rather than two independent settings.
 *
 * Named `proxy` rather than `middleware`: Next 16.2 deprecated the middleware
 * file convention, and redpoint9.com already moved.
 */
export function proxy(request: NextRequest) {
  return captureClickId(request, NextResponse.next(), getConfig(TRACK_CONFIG));
}

export const config = {
  /* Page requests only. Assets, image optimisation and API routes never carry
     a landing gclid, and running this on them is pure latency. */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
