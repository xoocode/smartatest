/**
 * CLICK-ID — mints the identifier that connects an ad click to revenue.
 *
 * Mirror of the platform's `lib/track/click-id.ts`. The two must agree on the
 * alphabet and the layout, so if you change one, change both. It is duplicated
 * rather than shared because this folder has to stay copy-pasteable into a
 * project that knows nothing about the platform's repo.
 *
 * Layout: 10 bytes → 16 characters of Crockford base32. Six bytes of
 * millisecond timestamp, four bytes of randomness.
 *
 *   ┌──── 48 bits: when ────┐┌── 32 bits: entropy ──┐
 *
 * Time-prefixed so the platform can bound its lookups and prune old rows from
 * the key alone. Crockford base32 because the id gets read aloud and pasted
 * into affiliate dashboards, and it has no character that can be misread.
 * Sixteen characters survives every redirect chain we have seen intact, which
 * a 90-character gclid does not — the reason we carry our own id at all.
 *
 * Uses Web Crypto, so it runs unchanged in the edge and Node.js runtimes.
 */

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export const CLICK_ID_LENGTH = 16;

function encode(bytes: Uint8Array): string {
  let bits = 0;
  let value = 0;
  let out = "";
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

export function mintClickId(at: number = Date.now()): string {
  const bytes = new Uint8Array(10);
  let ms = at;
  for (let i = 5; i >= 0; i--) {
    bytes[i] = ms & 0xff;
    ms = Math.floor(ms / 256);
  }
  crypto.getRandomValues(bytes.subarray(6));
  return encode(bytes);
}
