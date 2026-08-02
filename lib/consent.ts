/**
 * ============================================================================
 * SAMTYCKE — en egen lösning, medvetet.
 * ============================================================================
 *
 * ## Varför vi inte köper en CMP
 *
 * Kravet på en Google-certifierad CMP gäller *publicister* som säljer
 * annonsplats via AdSense, Ad Manager eller AdMob. Vi är annonsör och köper
 * trafik. För oss gäller Googles EU User Consent Policy, som kräver tre saker
 * och inte nämner något verktyg: giltigt samtycke, **bevarat bevis** på det,
 * och tydlig information om hur det återkallas. Googles egen
 * utvecklardokumentation för Consent Mode är dessutom uttryckligen skriven
 * "for developers who maintain their own consent solution".
 *
 * ## Vad IMY kräver av utformningen
 *
 * I april 2025 riktade Integritetsskyddsmyndigheten kritik mot tre bolag för
 * mörka mönster i just kakrutor. Regeln de tillämpade: tar det ett klick att
 * godkänna ska det ta ett klick att neka, och knapparna ska väga lika tungt
 * visuellt. Vår tidigare ruta hade en orange godkänn-knapp mot en avtonad
 * neka-knapp, alltså precis det som fälldes.
 *
 * ## Rutan visas bara när det finns något att fråga om
 *
 * `MARKETING_CONFIGURED` är falsk tills ett Google Ads-id är satt. Utan tagg
 * sätter sajten noll icke-nödvändiga kakor, och då finns det ingenting att
 * inhämta samtycke till. Att fråga ändå är den slentrian regelverket finns för
 * att motverka. Dagen id:t landar tänds rutan av sig själv.
 *
 * ## Vad som INTE kräver samtycke
 *
 * Vidarelänken till butiken. En 302 lagrar ingenting på läsarens enhet, och
 * affiliatenätverkets kaka sätts av nätverket, på nätverkets domän, efter att
 * läsaren lämnat oss. Den är deras personuppgiftsansvar och täcks av deras
 * policy. Vi tappar alltså ingen provision på ett nej, vilket är hela skälet
 * till att vi kan hålla rutan så liten.
 *
 * Det som verkligen gated är vår egen gclid-kaka i `lib/r9track/`, och Google
 * Ads-taggen. Se `hasAdConsent` där, som failar stängt.
 */

declare global {
  interface Window {
    /** Satt av `ConsentMode`. Frånvarande tills ett Ads-id finns. */
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Kakans namn. Speglas av `R9_TRACK_CONSENT_COOKIE`. */
export const CONSENT_COOKIE = "st_consent";

/**
 * Höj när ändamålen eller mottagarna ändras.
 *
 * Ett samtycke till en uppsättning mottagare är inte ett samtycke till en
 * annan. Bumpen gör tidigare svar ogiltiga och rutan visas igen, vilket är
 * skillnaden mellan ett bevarat bevis och ett påstående.
 */
export const CONSENT_VERSION = 1;

/** Hur länge ett svar gäller innan vi frågar igen. */
export const CONSENT_MAX_AGE_DAYS = 180;

export type ConsentChoice = "granted" | "denied";

export type ConsentRecord = {
  version: number;
  choice: ConsentChoice;
  /** När svaret gavs, sekunder sedan epok. Beviset. */
  at: number;
};

/**
 * Finns det något att inhämta samtycke till?
 *
 * Läses vid bygget. `NEXT_PUBLIC_` krävs för att värdet ska nå klienten.
 */
export const MARKETING_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
);

/** `1:granted:1754150400` */
export function serialiseConsent(record: ConsentRecord): string {
  return `${record.version}:${record.choice}:${record.at}`;
}

/**
 * Läser kakan. Returnerar null när den saknas, är oläsbar eller gäller en
 * äldre version av ändamålen.
 */
export function parseConsent(raw: string | undefined): ConsentRecord | null {
  if (!raw) return null;

  const [rawVersion, choice, rawAt] = raw.split(":");
  const version = Number(rawVersion);
  const at = Number(rawAt);

  if (!Number.isFinite(version) || version !== CONSENT_VERSION) return null;
  if (choice !== "granted" && choice !== "denied") return null;
  if (!Number.isFinite(at)) return null;

  return { version, choice, at };
}

/**
 * Predikat för `lib/r9track/`, som annars bara känner igen "1", "true" och
 * "granted". Skickas in via `options.config` i `/till`-routen, vilket är den
 * seam modulen tillhandahåller just för det här.
 *
 * Failar stängt: allt som inte är ett giltigt, aktuellt ja är ett nej.
 */
export function isMarketingGranted(raw: string | undefined): boolean {
  return parseConsent(raw)?.choice === "granted";
}
