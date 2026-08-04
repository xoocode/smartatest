import { PUBLISHER } from "@/lib/site";

/*
 * Utgivarens namn, länkat till utgivarens sajt.
 *
 * ## Varför en komponent för en enda länk
 *
 * Namnet står på fyra sidor: om oss, kontakt, integritetspolicyn och
 * llms.txt. Tre av dem ska länka, och gjorde man det för hand skulle adressen,
 * skrivningen och `rel`-attributen finnas i tre kopior som glider isär. Nu
 * finns målet i `PUBLISHER.url` och resten här.
 *
 * ## Ny flik
 *
 * Länken lämnar sajten, och den gör det mitt i en text vars hela ärende är att
 * svara på vem som står bakom betygen. Läsaren som klickar ska kunna gå
 * tillbaka till stycket där länken satt. `rel="noopener noreferrer"` följer med
 * eftersom `target="_blank"` annars ger måldokumentet en referens till vårt
 * fönster.
 *
 * `target=_blank` är dessutom ett av de mönster `lib/speculation.ts` utesluter,
 * så länken förhämtas inte. Det är rätt utfall: det är inte vår sida.
 */
export function PublisherLink({ className }: { className?: string }) {
  return (
    <a
      href={PUBLISHER.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {PUBLISHER.name}
    </a>
  );
}
