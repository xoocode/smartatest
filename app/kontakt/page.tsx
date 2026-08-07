import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock } from "lucide-react";

import { PUBLISHER, SITE, publisherAddress } from "@/lib/site";
import { pageOpenGraph } from "@/lib/metadata";
import { graph, orgRef, pageEntity } from "@/lib/schema";
import { Container } from "@/components/site/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ContactForm } from "@/components/site/contact-form";
import { PublisherLink } from "@/components/site/publisher-link";

/*
 * Kontaktsidan.
 *
 * Upplägget är samma som redpoint9.com/contact: formuläret till vänster,
 * uppgifterna till höger. Formuläret postar till /api/kontakt, som skickar
 * vidare till RedPoint9 där meddelandena lagras och mejlas ut.
 *
 * Sidan är en av dem Google Ads granskare letar efter på en affiliatesajt.
 * Den ska därför innehålla en verklig avsändare, en verklig adress att nå oss
 * på och ett löfte om svarstid som håller.
 */

const PAGE_URL = "/kontakt";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Hör av dig om ett faktafel, ett produkttips eller ett samarbete. Vi svarar normalt inom två arbetsdagar.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({
    title: "Kontakt",
    path: PAGE_URL,
    type: "website",
  }),
};

export default function KontaktPage() {
  /*
   * ContactPage, den exakta WebPage-subtypen för det här.
   *
   * `ContactPoint` med `contactType: "editorial"` är den maskinläsbara
   * motsvarigheten till löftet om svarstid på sidan. Organisationen beskrivs
   * i `SiteSchema` och refereras här, så det blir en avsändare i grafen och
   * inte två.
   */
  const jsonLd = graph([
    pageEntity({
      type: "ContactPage",
      pageUrl: PAGE_URL,
      name: "Kontakt",
      description:
        "Nå redaktionen om ett faktafel, ett produkttips eller ett samarbete.",
      mainEntity: {
        "@type": "ContactPoint",
        "@id": `${SITE.url}${PAGE_URL}#contactpoint`,
        name: `Redaktionen på ${SITE.name}`,
        url: `${SITE.url}${PAGE_URL}`,
        contactType: "editorial",
        email: PUBLISHER.email,
        availableLanguage: { "@type": "Language", name: "Svenska", alternateName: "sv" },
        areaServed: "SE",
      },
      about: orgRef(),
    }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Container size="roomy" className="pt-6">
        <Breadcrumbs items={[{ label: "Kontakt" }]} schema />
      </Container>

      <Container size="roomy" className="pt-3 pb-[var(--space-section)]">
        <h1 className="text-h1">Kontakt</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Har vi skrivit något som inte stämmer vill vi helst höra det från dig
          innan någon annan hittar det. Tips på produkter vi borde titta på är
          lika välkomna.
        </p>

        {/* Sidokolumnen tillbaka på 18 rem. I en 56-rems behållare med dubbel
            spaltluft lämnar 20 rem för lite kvar åt formuläret, som är sidans
            uppgift. */}
        <div className="mt-block grid gap-block lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-x-[calc(var(--space-block)*2)]">
          <ContactForm />

          <div className="flex flex-col gap-block lg:self-start">
            <div>
              <h2 className="text-h3">Mejla direkt</h2>
              <p className="mt-2 flex items-start gap-2 text-sm">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                />
                <a
                  href={`mailto:${PUBLISHER.email}`}
                  className="inline-flex min-h-6 items-center text-primary underline underline-offset-2"
                >
                  {PUBLISHER.email}
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-h3">Svarstid</h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {PUBLISHER.responseTime} Rättelser går före allt annat.
              </p>
            </div>

            <div>
              <h2 className="text-h3">Utgivare</h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>
                  {SITE.domain} ges ut av{" "}
                  <PublisherLink className="text-primary underline underline-offset-2" />
                  .
                  <br />
                  {publisherAddress()}
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-h3">Annonsering</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Undrar du hur sajten finansieras står det på{" "}
                <Link
                  href="/annonsmarkning"
                  className="text-primary underline underline-offset-2"
                >
                  sidan om annonsmärkning
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
