"use client";

import { MARKETING_CONFIGURED } from "@/lib/consent";
import { openConsent } from "@/components/site/cookie-consent";

/**
 * Länken som tar tillbaka ett samtycke.
 *
 * Googles EU User Consent Policy kräver tydlig information om hur samtycket
 * återkallas, och dataskyddsförordningen kräver att det ska vara lika lätt att
 * ta tillbaka som att ge. En sidfotslänk som öppnar samma ruta igen uppfyller
 * båda utan att lägga en flytande knapp över innehållet.
 *
 * Renderar ingenting när det inte finns någon marknadsföringstagg, av samma
 * skäl som rutan själv inte gör det.
 */
export function ConsentReopen({ className }: { className?: string }) {
  if (!MARKETING_CONFIGURED) return null;

  return (
    <button type="button" onClick={openConsent} className={className}>
      Kakor
    </button>
  );
}
