import type { Metadata } from "next";
import Link from "next/link";

import { PUBLISHER, SITE } from "@/lib/site";
import { sortedCorrections } from "@/lib/corrections";
import { DEFAULT_REVIEWER } from "@/lib/people";
import { graph, pageEntity } from "@/lib/schema";
import { formatDate } from "@/lib/products";
import { Container } from "@/components/site/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Prose } from "@/components/site/prose";
import { Button } from "@/components/ui/button";

/*
 * Rättelseloggen.
 *
 * ## Den tomma sidan är poängen
 *
 * Sidan publiceras innan det finns något att rätta, och det är avsiktligt. En
 * rättelsesida som dyker upp först när ett fel redan begåtts ser ut som
 * skadekontroll. En som funnits hela tiden är ett åtagande.
 *
 * Tomläget säger rakt ut att inget rättats ännu i stället för att dölja att
 * listan är tom, eftersom en tom lista utan förklaring lika gärna kan betyda
 * att vi inte för någon.
 *
 * ## Märkningen beskriver sidan, inte varje rättelse
 *
 * `CorrectionComment` finns men är avsedd för en enskild rättelse kopplad till
 * den artikel som rättats. Den hör alltså hemma på testsidan det gäller, inte
 * i en samlad logg. Här är sidan en `CollectionPage` och listan en `ItemList`
 * vars `numberOfItems` är noll så länge inget rättats.
 */

const PAGE_URL = "/rattelser";

export const metadata: Metadata = {
  title: "Rättelser",
  description:
    "Sakfel vi rättat, vad som stod fel och när det ändrades. Rättelser som påverkat en placering märks ut särskilt.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Rättelser",
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

export default function RattelserPage() {
  const corrections = sortedCorrections();

  /*
   * Sidentitet, men fortfarande ingen märkning per rättelse.
   *
   * `CorrectionComment` finns i schema.org men hör hemma på den artikel som
   * rättats, inte i en samlad logg. Rätt plats för den är alltså testsidan,
   * den dagen en rättelse faktiskt gäller en. Här beskriver vi sidan och
   * håller antalet ärligt via `numberOfItems`, som blir noll så länge listan
   * är tom.
   */
  const jsonLd = graph([
    pageEntity({
      type: "CollectionPage",
      pageUrl: PAGE_URL,
      name: "Rättelser",
      description:
        "Sakfel vi rättat, med datum och vad som ändrades. Rättelser som påverkat en placering märks ut särskilt.",
      reviewer: DEFAULT_REVIEWER,
      mainEntity: {
        "@type": "ItemList",
        "@id": `${SITE.url}${PAGE_URL}#logg`,
        name: "Publicerade rättelser",
        url: `${SITE.url}${PAGE_URL}`,
        numberOfItems: corrections.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: corrections.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            "@id": `${SITE.url}${PAGE_URL}#${c.date}-${i}`,
            name: `Rättelse ${c.page}`,
            url: `${SITE.url}${c.href}`,
            datePublished: c.date,
            text: c.changed,
          },
        })),
      },
    }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Container size="narrow" className="pt-6">
        <Breadcrumbs items={[{ label: "Rättelser" }]} schema />
      </Container>

      <Container size="narrow" className="pt-3 pb-[var(--space-section)]">
        <p className="eyebrow text-brand">Öppen redovisning</p>
        <h1 className="mt-2 text-h1">Rättelser</h1>

        <Prose className="mt-[var(--space-block)]">
          <p>
            Vi kommer att ha fel ibland. En specifikation läses av från fel rad,
            en källa återges slarvigt, ett betyg bygger på en uppgift som inte
            stämmer. När det händer rättar vi det och skriver upp det här, med
            datum och vad som faktiskt ändrades.
          </p>
          <p>
            Rättelser som påverkat en placering eller ett betyg märks ut
            särskilt. Det är de som spelar roll för någon som redan läst sidan
            och fattat ett beslut på den.
          </p>
        </Prose>

        <div className="mt-[var(--space-block)]">
          {corrections.length === 0 ? (
            <div className="themed-border rounded-lg bg-muted pad-card">
              <p className="font-medium">Inga rättelser ännu.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Sidan finns på plats från början, inte för att vi tror oss vara
                felfria utan för att en rättelsesida som skapas först när ett
                fel upptäckts är värd mindre. Hittar du något som inte stämmer
                är det den här listan det hamnar i.
              </p>
            </div>
          ) : (
            <ol className="flex flex-col gap-stack">
              {corrections.map((c) => (
                <li
                  key={`${c.date}-${c.href}`}
                  className="themed-border rounded-lg bg-card pad-card"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <time
                      dateTime={c.date}
                      className="text-sm text-muted-foreground tabular-nums"
                    >
                      {formatDate(c.date)}
                    </time>
                    <Link
                      href={c.href}
                      className="font-medium text-primary underline-offset-2 hover:underline"
                    >
                      {c.page}
                    </Link>
                    {c.affectedRanking ? (
                      <span className="rounded bg-warning/15 px-2 py-0.5 text-xs font-medium text-warning-foreground">
                        Påverkade placering
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm">{c.changed}</p>
                  {c.reportedBy ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Påpekat av {c.reportedBy}.
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="mt-[var(--space-block)] themed-border rounded-lg bg-muted pad-card">
          <h2 className="text-h3">Hittade du ett fel?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Skriv till{" "}
            <a
              href={`mailto:${PUBLISHER.email}`}
              className="text-primary underline underline-offset-2"
            >
              {PUBLISHER.email}
            </a>{" "}
            eller använd formuläret. Rättelser ligger först i listan över
            ärendetyper och går före allt annat.
          </p>
          <Button asChild variant="brand" className="mt-4">
            <Link href="/kontakt">Rapportera ett fel</Link>
          </Button>
        </div>

        <Prose className="mt-[var(--space-block)]">
          <p className="text-sm text-muted-foreground">
            Priser ändras hela tiden och räknas inte som rättelser. När en sida
            senast setts över står i datumstämpeln högst upp på den. Hur betygen
            räknas fram står på <Link href="/sa-testar-vi">så testar vi</Link>.
          </p>
        </Prose>
      </Container>
    </>
  );
}
