import type { Product } from "@/lib/products";
import type { Service } from "@/lib/services";
import { HEMLARM_SERVICES } from "@/lib/data/hemlarm";
import { SMART_BELYSNING_PRODUCTS } from "@/lib/data/smart-belysning";
import { SMART_PLUG_PRODUCTS } from "@/lib/data/smart-plug";
import { SMART_STROMBRYTARE_PRODUCTS } from "@/lib/data/smart-strombrytare";
import { ELEKTRISK_RULLGARDIN_PRODUCTS } from "@/lib/data/elektrisk-rullgardin";
import { UTOMHUSTIMER_PRODUCTS } from "@/lib/data/utomhustimer";
import { VATTENLARM_PRODUCTS } from "@/lib/data/vattenlarm";
import { VATTENFELSBRYTARE_PRODUCTS } from "@/lib/data/vattenfelsbrytare";
import { BRANDVARNARE_PRODUCTS } from "@/lib/data/brandvarnare";
import { SMART_BRANDVARNARE_PRODUCTS } from "@/lib/data/smart-brandvarnare";
import { BRANDSLACKARE_PRODUCTS } from "@/lib/data/brandslackare";
import { BRANDFILT_PRODUCTS } from "@/lib/data/brandfilt";
import { KOLMONOXIDVARNARE_PRODUCTS } from "@/lib/data/kolmonoxidvarnare";
import { BRANDSTEGE_PRODUCTS } from "@/lib/data/brandstege";
import { UTRYMNINGSSTEGE_PRODUCTS } from "@/lib/data/utrymningsstege";
import { OVERVAKNINGSKAMERA_PRODUCTS } from "@/lib/data/overvakningskamera";
import { DORRKLOCKA_PRODUCTS } from "@/lib/data/dorrklocka-med-kamera";
import { INOMHUSKAMERA_PRODUCTS } from "@/lib/data/inomhuskamera";
import { KODLAS_PRODUCTS } from "@/lib/data/kodlas-ytterdorr";
import { LARM_UTAN_ABONNEMANG_PRODUCTS } from "@/lib/data/larm-utan-abonnemang";
import { LUFTRENARE_PRODUCTS } from "@/lib/data/luftrenare";
import { LUFTFUKTARE_PRODUCTS } from "@/lib/data/luftfuktare";
import { AVFUKTARE_PRODUCTS } from "@/lib/data/avfuktare";
import { ROBOTDAMMSUGARE_PRODUCTS } from "@/lib/data/robotdammsugare";
import { HYGROMETER_PRODUCTS } from "@/lib/data/hygrometer";
import { LUFTKVALITETSMATARE_PRODUCTS } from "@/lib/data/luftkvalitetsmatare";
import { ROBOTGRASKLIPPARE_PRODUCTS } from "@/lib/data/robotgrasklippare";
import { FONSTERPUTSROBOT_PRODUCTS } from "@/lib/data/fonsterputsrobot";
import { SMART_HEM_HUBB_PRODUCTS } from "@/lib/data/smart-hem-hubb";
import { SMART_TERMOSTAT_PRODUCTS } from "@/lib/data/smart-termostat";
import { NYCKELSKAP_PRODUCTS } from "@/lib/data/nyckelskap";
import { USB_C_LADDARE_PRODUCTS } from "@/lib/data/usb-c-laddare";
import { USB_C_KABEL_PRODUCTS } from "@/lib/data/usb-c-kabel";
import { GARAGEPORTSOPPNARE_PRODUCTS } from "@/lib/data/garageportsoppnare";
import { SMART_GARAGEPORTSOPPNARE_PRODUCTS } from "@/lib/data/smart-garageportsoppnare";
import { POWERBANK_PRODUCTS } from "@/lib/data/powerbank";
import { IPHONE_SKAL_PRODUCTS } from "@/lib/data/iphone-skal";
import { POWERBANK_20000_PRODUCTS } from "@/lib/data/powerbank-20000";

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
 * `pnpm check:refs` som kommentaren i product-ref.tsx hänvisade till finns nu,
 * i `scripts/check-refs.mjs`.
 *
 * ⚠️ Och det hände igen. 2026-08-02 saknades kolmonoxidvarnare, brandstege och
 * utrymningsstege här, vilket släckte 27 referenser i tre köpguider. Felet
 * hittades av kontrollen ovan, första gången den kördes. Kör den innan en ny
 * kategori anses klar.
 */
export const ALL_PRODUCTS: Product[] = [
  ...IPHONE_SKAL_PRODUCTS,
  ...POWERBANK_PRODUCTS,
  ...POWERBANK_20000_PRODUCTS,
  ...SMART_GARAGEPORTSOPPNARE_PRODUCTS,
  ...GARAGEPORTSOPPNARE_PRODUCTS,
  ...USB_C_LADDARE_PRODUCTS,
  ...USB_C_KABEL_PRODUCTS,
  ...NYCKELSKAP_PRODUCTS,
  ...SMART_BELYSNING_PRODUCTS,
  ...SMART_PLUG_PRODUCTS,
  ...SMART_STROMBRYTARE_PRODUCTS,
  ...ELEKTRISK_RULLGARDIN_PRODUCTS,
  ...UTOMHUSTIMER_PRODUCTS,
  ...VATTENLARM_PRODUCTS,
  ...VATTENFELSBRYTARE_PRODUCTS,
  ...BRANDVARNARE_PRODUCTS,
  ...SMART_BRANDVARNARE_PRODUCTS,
  ...BRANDSLACKARE_PRODUCTS,
  ...BRANDFILT_PRODUCTS,
  ...KOLMONOXIDVARNARE_PRODUCTS,
  ...BRANDSTEGE_PRODUCTS,
  ...UTRYMNINGSSTEGE_PRODUCTS,
  ...OVERVAKNINGSKAMERA_PRODUCTS,
  ...DORRKLOCKA_PRODUCTS,
  ...INOMHUSKAMERA_PRODUCTS,
  ...KODLAS_PRODUCTS,
  ...LARM_UTAN_ABONNEMANG_PRODUCTS,
  ...LUFTRENARE_PRODUCTS,
  ...LUFTFUKTARE_PRODUCTS,
  ...AVFUKTARE_PRODUCTS,
  ...ROBOTDAMMSUGARE_PRODUCTS,
  ...HYGROMETER_PRODUCTS,
  ...LUFTKVALITETSMATARE_PRODUCTS,
  ...ROBOTGRASKLIPPARE_PRODUCTS,
  ...FONSTERPUTSROBOT_PRODUCTS,
  ...SMART_HEM_HUBB_PRODUCTS,
  ...SMART_TERMOSTAT_PRODUCTS,
];

export function findProduct(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

/**
 * Samma sak för tjänster.
 *
 * Egen lista och inte en gemensam med produkterna, eftersom typerna skiljer
 * sig i allt som betyder något: en tjänst har ingen `price` och kan sakna
 * uppgift om vad den kostar. Att slå ihop dem hade tvingat fram en union som
 * varje anropare ändå måste smala av.
 *
 * ⚠️ Gäller samma regel som ovan: registrera samma dag datafilen landar.
 * `pnpm check:refs` kontrollerar numera både `*_PRODUCTS` och `*_SERVICES`.
 */
export const ALL_SERVICES: Service[] = [...HEMLARM_SERVICES];

export function findService(id: string): Service | undefined {
  return ALL_SERVICES.find((s) => s.id === id);
}
