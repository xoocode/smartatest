import { testPageOgAlt, testPageOgImage, OG_SIZE } from "@/lib/og-test-page";

/*
 * Delningsbild för den här kategorin. Allt innehåll och all formgivning ligger
 * i lib/og-test-page.tsx, så ett byte av kortets utseende är en fil och inte
 * fjorton. Next plockar upp filen på namnet; sidans egen metadata behöver
 * inte röras.
 */
const HREF = "/kolmonoxidvarnare";

export const alt = testPageOgAlt(HREF);
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return testPageOgImage(HREF);
}
