import type { Product } from "@/lib/products";
import { SMART_BELYSNING_PRODUCTS } from "@/lib/data/smart-belysning";
import { SMART_PLUG_PRODUCTS } from "@/lib/data/smart-plug";
import { SMART_STROMBRYTARE_PRODUCTS } from "@/lib/data/smart-strombrytare";
import { ELEKTRISK_RULLGARDIN_PRODUCTS } from "@/lib/data/elektrisk-rullgardin";
import { UTOMHUSTIMER_PRODUCTS } from "@/lib/data/utomhustimer";
import { VATTENLARM_PRODUCTS } from "@/lib/data/vattenlarm";
import { BRANDVARNARE_PRODUCTS } from "@/lib/data/brandvarnare";
import { SMART_BRANDVARNARE_PRODUCTS } from "@/lib/data/smart-brandvarnare";
import { BRANDSLACKARE_PRODUCTS } from "@/lib/data/brandslackare";
import { BRANDFILT_PRODUCTS } from "@/lib/data/brandfilt";

/**
 * Every resolved product across all categories, so prose can name one by id.
 *
 * Editorial MDX cannot pass a typed object, so `<ProductRef id="..." />` looks
 * it up here. Register a category's products the same day its data file lands,
 * or the guide's references silently render nothing.
 *
 * ⚠️ Det hände. Fram till 2026-08-01 saknades både SMART_STROMBRYTARE_PRODUCTS
 * och ELEKTRISK_RULLGARDIN_PRODUCTS här, vilket gjorde att sjutton
 * `<ProductRef>` i de två köpguiderna renderade ingenting alls. Felet syns
 * varken i tsc, lint eller bygget: `ProductRef` returnerar `null` på en okänd
 * id med flit, så prosan tappar bara ett produktnamn mitt i en mening. Den
 * `pnpm check:refs` som kommentaren i product-ref.tsx hänvisar till finns inte,
 * och det är den kontrollen som hade fångat det.
 */
export const ALL_PRODUCTS: Product[] = [
  ...SMART_BELYSNING_PRODUCTS,
  ...SMART_PLUG_PRODUCTS,
  ...SMART_STROMBRYTARE_PRODUCTS,
  ...ELEKTRISK_RULLGARDIN_PRODUCTS,
  ...UTOMHUSTIMER_PRODUCTS,
  ...VATTENLARM_PRODUCTS,
  ...BRANDVARNARE_PRODUCTS,
  ...SMART_BRANDVARNARE_PRODUCTS,
  ...BRANDSLACKARE_PRODUCTS,
  ...BRANDFILT_PRODUCTS,
];

export function findProduct(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}
