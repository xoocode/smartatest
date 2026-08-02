/**
 * TRACK-HMAC — signs a click report so the platform can trust it.
 *
 * Mirror of the platform's `lib/track/hmac.ts`. Signed string is
 * `{timestamp}.{rawBody}`, HMAC-SHA256 under the site secret, hex encoded.
 *
 * The body is inside the signature so a captured request cannot be edited into
 * a different product or a different gclid — this endpoint writes the rows
 * that decide what we tell Google we earned. The timestamp is inside it so
 * replays are bounded; true idempotency comes from the click id being the
 * platform's primary key.
 *
 * Web Crypto rather than `node:crypto`, so the same file works in middleware
 * (edge runtime) and in route handlers (Node.js).
 */

export const SITE_HEADER = "x-r9-site";
export const SIGNATURE_HEADER = "x-r9-signature";
export const TIMESTAMP_HEADER = "x-r9-timestamp";

const encoder = new TextEncoder();

export async function signPayload(
  secret: string,
  timestamp: number | string,
  rawBody: string
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`${timestamp}.${rawBody}`)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
