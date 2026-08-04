import Link from "next/link";

import { NAV, PUBLISHER, SITE, publisherAddress } from "@/lib/site";
import { Container } from "@/components/site/container";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";
import { LegalDisclaimer } from "@/components/site/legal-disclaimer";
import { ConsentReopen } from "@/components/site/consent-reopen";

/*
 * `/om-oss` är också redaktionens nav: personsidorna ligger under den.
 *
 * Kontakt står först. Det är den enda raden i listan någon letar aktivt efter,
 * och den som vill rätta en uppgift ska hitta vägen dit utan att läsa igenom
 * sex andra länkar. Resten står i fallande ordning efter hur ofta de öppnas.
 */
const LEGAL = [
  { href: "/kontakt", label: "Kontakt" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/sa-testar-vi", label: "Så testar vi" },
  { href: "/rattelser", label: "Rättelser" },
  { href: "/ordlista", label: "Ordlista" },
  { href: "/annonsmarkning", label: "Annonsmärkning" },
  { href: "/integritetspolicy", label: "Integritetspolicy" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted">
      <Container size="wide" className="pad-section">
        <div className="grid gap-block sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-lg">
              {SITE.name}
              <span className="text-brand">.se</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{SITE.tagline}</p>
          </div>

          <div>
            <p className="eyebrow mb-3 text-muted-foreground">Kategorier</p>
            <ul className="flex flex-col gap-2 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-6 items-center hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3 text-muted-foreground">Om sajten</p>
            <ul className="flex flex-col gap-2 text-sm">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-6 items-center hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* Återkallelse ska vara lika lätt som samtycke. Renderar
                  ingenting när ingen marknadsföringstagg är konfigurerad. */}
              <li>
                <ConsentReopen className="inline-flex min-h-6 cursor-pointer items-center hover:underline" />
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <p className="eyebrow mb-3 text-muted-foreground">Annonsmärkning</p>
            <AffiliateDisclosure variant="footer" />
          </div>
        </div>

        <div className="mt-block flex flex-col gap-2 border-t border-border pt-6">
          <LegalDisclaimer variant="footer" items={["pricing", "general"]} />
          {/* Adress och e-post utskrivna. En affiliatesajt utan synlig
              avsändare är precis vad en granskare hos Google Ads letar efter,
              och en läsare som undrar vem som står bakom betygen ska slippa
              leta. Utgivarens namn står inte här utan på /om-oss,
              /integritetspolicy och /kontakt, där det hör hemma. */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.domain}. {publisherAddress()}.{" "}
            <a
              href={`mailto:${PUBLISHER.email}`}
              className="inline-flex min-h-6 items-center underline underline-offset-2"
            >
              {PUBLISHER.email}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
