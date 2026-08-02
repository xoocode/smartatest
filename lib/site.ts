import { GROUPS } from "@/lib/catalog";

export const SITE = {
  name: "Smartatest",
  domain: "smartatest.se",
  url: "https://smartatest.se",
  tagline: "Vi testar och jämför så du slipper",
  /** Shown wherever we are legally obliged to disclose the affiliate model. */
  disclosure:
    "Vi finansieras av provision från länkarna på sidan. Det påverkar inte vilka produkter vi rekommenderar eller hur vi betygsätter dem.",
} as const;

/**
 * Vem som ger ut sajten.
 *
 * ## Gatuadress ja, organisationsnummer nej
 *
 * Adressen är kontorsadressen i Kista, samma som redpoint9.com redan
 * publicerar i sin strukturerade data. Den är inte en bostadsadress, och det
 * var hela invändningen mot att skriva ut en gata. En verklig gatuadress är
 * det enskilt starkaste förtroendetecknet på en affiliatesajt: Konsumentvalet
 * har en, och de flesta av de sämre konkurrenterna har ingen.
 *
 * Organisationsnumret står däremot fortfarande inte här. RedPoint9 är en
 * enskild firma, och en enskild firmas org.nr *är* innehavarens personnummer.
 * Konsumentvalet kan publicera sitt utan kostnad eftersom de är ett
 * aktiebolag. Ombildas firman till AB blir det värt att lägga till, både här
 * och i `SiteSchema`.
 *
 * Adressen renderas genom `publisherAddress()`, som hoppar över tomma fält, så
 * ett borttaget värde ger en kortare rad i stället för ett trasigt "null".
 */
export const PUBLISHER = {
  name: "RedPoint9",
  email: "kontakt@smartatest.se",
  street: "Färögatan 33" as string | null,
  postalCode: "164 51" as string | null,
  locality: "Kista" as string | null,
  /** Län. Bara för strukturerad data, syns inte i adressraden. */
  region: "Stockholm",
  country: "Sverige",
  /** Vad vi lovar om svarstid på /kontakt. Håll den sann. */
  responseTime: "Vi svarar normalt inom två arbetsdagar.",
} as const;

/**
 * Adressraden, utan tomma delar.
 *
 * Postnummer och ort skrivs ihop till ett fält, som på ett kuvert: "164 51
 * Kista", inte "164 51, Kista".
 */
export function publisherAddress(): string {
  const postal = [PUBLISHER.postalCode, PUBLISHER.locality]
    .filter(Boolean)
    .join(" ");

  return [PUBLISHER.street, postal, PUBLISHER.country].filter(Boolean).join(", ");
}

/**
 * Navigation is derived from the catalog, never hand-maintained.
 *
 * ## Grupper, inte kategorier
 *
 * Fram till 2026-08-02 listade menyn **varje kategori** platt. Det fungerade
 * med fem och sprack med elva: raden blev 1 214 px bred och sköt ut hela
 * sidhuvudet 18 px utanför fönstret vid 1440. Planen i
 * `.agent/plan-sidkarta-framat.md` har sexton kategorier, så felet var inte en
 * detalj utan en tidsinställd bomb.
 *
 * Menyn visar därför gruppernas navsidor. Kategorierna når man därifrån, från
 * `CategoryGrid` på startsidan och från sökrutan. En grupp utan `href` hoppas
 * över, eftersom en olänkad post i en meny inte gör någon nytta.
 */
export const NAV = [
  ...GROUPS.filter((g) => g.href).map((g) => ({ href: g.href as string, label: g.label })),
  { href: "/verktyg", label: "Verktyg" },
];
