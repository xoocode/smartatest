/**
 * Image naming convention and master sizes.
 *
 * Plain JS so both the app (via lib/images.ts) and the sharp script
 * (scripts/optimise-images.mjs) import the same definitions. Duplicating these
 * in the build script is exactly the drift the centralisation rule forbids.
 *
 * Convention, under /public:
 *
 *   /bilder/{kategori}/{produkt-id}-{roll}.webp     product imagery
 *   /bilder/{kategori}/_{roll}.webp                 category editorial
 *   /bilder/skribent/{slug}.webp                    portraits
 *
 * Examples:
 *   /bilder/smart-belysning/hue-white-color-e27-produkt.webp
 *   /bilder/smart-belysning/_hero.webp
 *
 * The product segment is `Product.id`, so a filename maps back to exactly one
 * product and no `image` field has to be maintained by hand. Sourcing an image
 * becomes a matter of putting the file where the code already looks.
 */

export const IMAGE_ROOT = "/bilder";

/** produkt = cutout, livsstil = in situ, hero = wide editorial, detalj = close-up. */
export const IMAGE_ROLES = ["produkt", "livsstil", "hero", "detalj"];

/**
 * Master width per role, sized for the largest place each role appears.
 * next/image derives responsive widths and AVIF from these at request time, so
 * we deliberately do not pre-generate size variants.
 */
export const MASTER_WIDTH = {
  produkt: 1200,
  livsstil: 1600,
  hero: 2400,
  detalj: 1200,
};

export function productImage(testPageSlug, productId, role = "produkt") {
  return `${IMAGE_ROOT}/${testPageSlug}/${productId}-${role}.webp`;
}

export function testPageImage(testPageSlug, role = "hero") {
  return `${IMAGE_ROOT}/${testPageSlug}/_${role}.webp`;
}

export function personImage(slug) {
  return `${IMAGE_ROOT}/skribent/${slug}.webp`;
}
