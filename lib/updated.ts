import { TEST_PAGE_INDEX } from "@/lib/catalog";
import { TOOLS } from "@/lib/tools";

/**
 * När varje sida senast ändrades i sak.
 *
 * ## Varför den här filen finns
 *
 * `<lastmod>` i sitemapen låg tidigare på byggtidpunkten för samtliga adresser.
 * Det är inte fel i formatet, men det är en signal som Google slutar läsa: när
 * varje adress påstår sig ha ändrats i samma sekund som bygget kördes säger
 * fältet ingenting, och dokumentationen är tydlig med att `lastmod` ignoreras
 * för hela sajten när värdena inte visar sig stämma.
 *
 * Riktiga datum finns redan. Varje sidfil har en `const UPDATED` som visas för
 * läsaren genom `UpdatedStamp` och skickas till schemat som `lastReviewed`.
 * Sitemapen kan bara inte nå den: att importera en sidmodul därifrån drar in
 * hela komponentträdet.
 *
 * Kategorierna har därför fått `updated` i `lib/catalog.ts`, där de hör hemma
 * eftersom katalogen ändå får en post per kategori. Resten står här.
 *
 * Verktygen har på samma sätt ett `updated` på `Tool` i lib/tools.ts.
 *
 * ## Håll dem i takt
 *
 * Datumet finns på två ställen: här (eller i katalogen) och som `const UPDATED`
 * på sidan. `pnpm check:refs` jämför dem och fäller bygget om de glider isär.
 */

/** Sidor utanför katalogen som har ett känt ändringsdatum, `YYYY-MM-DD`. */
export const PAGE_UPDATED: Record<string, string> = {
  /* Gruppnaven. Ändras när en kategori i gruppen tillkommer, och när
     källpanelen på sidan ändras: den räknar gruppens alla källor, så en ny
     jämförelse på en kategorisida ändrar även navet.

     ⚠️ `/hem-hushall` saknades här fram till 2026-08-04. Sidan visade
     "Senast uppdaterad 3 augusti" för läsaren medan sitemapen inte hade någon
     `lastmod` alls för adressen. Alla tre navsidor ska stå med. */
  "/smart-hem": "2026-08-04",
  "/sakerhet": "2026-08-04",
  "/hem-hushall": "2026-08-04",
  "/elektronik": "2026-08-05",
  "/kok": "2026-08-05",

  /* Förtroendesidorna. */
  /* Personsidorna delar det här datumet, se sitemapen. Bumpat 2026-08-03 när
     kontaktknappen lades om till redaktionens adress och cv-raderna kortades. */
  "/om-oss": "2026-08-03",
  "/sa-testar-vi": "2026-08-02",
  "/ordlista": "2026-08-02",
  "/rattelser": "2026-08-02",

  /* Juridiskt och formellt. */
  "/annonsmarkning": "2026-08-02",
  "/integritetspolicy": "2026-08-03",
  "/kontakt": "2026-08-03",
};

/**
 * Startsidans datum, härlett i stället för underhållet.
 *
 * Sidan listar kategorierna, så den ändras i praktiken varje gång en kategori
 * gör det. Att räkna fram det senaste av dem är både sant och omöjligt att
 * glömma uppdatera.
 */
export function homeUpdated(): string | undefined {
  const dates = TEST_PAGE_INDEX.map((c) => c.updated).filter(
    (d): d is string => Boolean(d),
  );
  if (!dates.length) return undefined;
  return dates.reduce((a, b) => (a > b ? a : b));
}

/**
 * Verktygsöversiktens datum, härlett av samma skäl som startsidans.
 *
 * `/guider` är en lista över verktygen, så den ändras när något av dem gör
 * det. Ett eget datum här hade varit ett fjärde ställe att glömma.
 */
export function toolsUpdated(): string | undefined {
  if (!TOOLS.length) return undefined;
  return TOOLS.map((t) => t.updated).reduce((a, b) => (a > b ? a : b));
}

/** `YYYY-MM-DD` som `Date`, tolkat som UTC-midnatt så tidszonen inte flyttar dygnet. */
export function asDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}
