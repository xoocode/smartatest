/**
 * Typed surface over the shared image convention.
 * The definitions live in lib/image-config.mjs so the sharp script can import
 * the same ones. See that file for the naming scheme.
 */
import {
  IMAGE_ROLES,
  MASTER_WIDTH,
  categoryImage,
  personImage,
  productImage,
} from "@/lib/image-config.mjs";

export type ImageRole = (typeof IMAGE_ROLES)[number];

const typedProductImage = productImage as (
  categorySlug: string,
  productId: string,
  role?: ImageRole,
) => string;

const typedCategoryImage = categoryImage as (
  categorySlug: string,
  role?: ImageRole,
) => string;

const typedPersonImage = personImage as (slug: string) => string;

const typedMasterWidth = MASTER_WIDTH as Record<ImageRole, number>;

export {
  typedProductImage as productImage,
  typedCategoryImage as categoryImage,
  typedPersonImage as personImage,
  typedMasterWidth as MASTER_WIDTH,
};
