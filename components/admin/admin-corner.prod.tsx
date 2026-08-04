import type { StyleState } from "@/lib/theme";

/**
 * Produktionsersättaren för `AdminCorner`.
 *
 * `next.config.ts` byter ut den riktiga modulen mot den här när adminläget är
 * avstängt, alltså i varje produktionsbygge utan `NEXT_PUBLIC_SHOW_ADMIN`.
 * Skälet står i konfigurationen: en `if`-sats räcker inte, eftersom modulen
 * hamnar i klientbunten så snart den importeras, oavsett om den renderas.
 *
 * Signaturen måste vara identisk med den riktiga. Byts propsen där ska de
 * bytas här, annars faller bygget på just den skillnaden, vilket är det bästa
 * felet den här filen kan ge.
 */
/* Propsen deklareras i typen men binds inte, så signaturen kontrolleras utan
   att lämna en oanvänd variabel efter sig. */
export const AdminCorner: (props: { style: StyleState }) => null = () => null;
