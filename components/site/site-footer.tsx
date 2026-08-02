import Link from "next/link";

import { NAV, PUBLISHER, SITE, publisherAddress } from "@/lib/site";
import { Container } from "@/components/site/container";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";
import { LegalDisclaimer } from "@/components/site/legal-disclaimer";
import { ConsentReopen } from "@/components/site/consent-reopen";

/* `/om-oss` är också redaktionens nav: personsidorna ligger under den. */
const LEGAL = [
  { href: "/om-oss", label: "Om oss" },
  { href: "/sa-testar-vi", label: "Så testar vi" },
  { href: "/rattelser", label: "Rättelser" },
  { href: "/ordlista", label: "Ordlista" },
  { href: "/annonsmarkning", label: "Annonsmärkning" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/integritetspolicy", label: "Integritetspolicy" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted">
      <Container size="wide" className="pad-section">
        <div className="grid gap-[var(--space-block)] sm:grid-cols-2 lg:grid-cols-4">
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
                  <Link href={item.href} className="hover:underline">
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
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* Återkallelse ska vara lika lätt som samtycke. Renderar
                  ingenting när ingen marknadsföringstagg är konfigurerad. */}
              <li>
                <ConsentReopen className="cursor-pointer hover:underline" />
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <p className="eyebrow mb-3 text-muted-foreground">Annonsmärkning</p>
            <AffiliateDisclosure variant="footer" />
          </div>
        </div>

        <div className="mt-[var(--space-block)] flex flex-col gap-2 border-t border-border pt-6">
          <LegalDisclaimer variant="footer" items={["pricing", "general"]} />
          {/* Utgivaren utskriven. En affiliatesajt utan synlig avsändare är
              precis vad en granskare hos Google Ads letar efter, och en läsare
              som undrar vem som står bakom betygen ska slippa leta. */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.domain}. Ges ut av{" "}
            {PUBLISHER.name}, {publisherAddress()}.{" "}
            <a
              href={`mailto:${PUBLISHER.email}`}
              className="underline underline-offset-2"
            >
              {PUBLISHER.email}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
