import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/site";
import { searchDocs, type SearchDoc } from "@/lib/search-index";
import { Container } from "@/components/site/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/*
 * Sökresultat.
 *
 * ## Varför sidan finns när det redan fanns en sökruta
 *
 * `SiteSearch` är en klientkomponent som hoppar direkt till första träffen vid
 * Enter. Det är bra när man vet vad man söker och värdelöst i tre andra fall:
 * när JavaScript inte kört, när någon delar en söklänk, och när Googles
 * `SearchAction` i `SiteSchema` pekar hit. Den strukturerade datan lovar att
 * /sok?q= fungerar, och då måste den göra det utan JavaScript.
 *
 * Sidan är därför ett vanligt GET-formulär utan en rad klientkod.
 *
 * ## Indexering
 *
 * `noindex` på hela sidan. Sökresultatsidor är den klassiska källan till
 * indexsvall: varje tänkbar fråga blir en egen adress med nästan samma
 * innehåll. `follow` är kvar så länkarna härifrån fortfarande räknas.
 */

const PAGE_URL = "/sok";

export const metadata: Metadata = {
  title: "Sök",
  description: `Sök bland jämförelser, verktyg och sidor på ${SITE.domain}.`,
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: true },
};

type Search = { q?: string };

export default async function SokPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query.length >= 2 ? searchDocs(query) : [];

  const grouped = results.reduce<Record<string, SearchDoc[]>>((acc, doc) => {
    (acc[doc.kind] ??= []).push(doc);
    return acc;
  }, {});

  return (
    <>
      <Container size="narrow" className="pt-6">
        <Breadcrumbs items={[{ label: "Sök" }]} />
      </Container>

      <Container size="narrow" className="pt-3 pb-[var(--space-section)]">
        <h1 className="text-h1">Sök</h1>

        <form
          action={PAGE_URL}
          method="get"
          role="search"
          className="mt-[var(--space-block)] flex gap-2"
        >
          <Input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Brandvarnare, smart plug, vattenlarm…"
            aria-label="Sök på sajten"
            autoFocus
          />
          <Button type="submit" variant="brand">
            Sök
          </Button>
        </form>

        {query.length === 0 ? (
          <p className="mt-[var(--space-block)] text-muted-foreground">
            Skriv vad du letar efter, så visar vi jämförelser, räknare och
            sidor som matchar.
          </p>
        ) : query.length < 2 ? (
          <p className="mt-[var(--space-block)] text-muted-foreground">
            Skriv minst två tecken.
          </p>
        ) : results.length === 0 ? (
          <div className="mt-[var(--space-block)]">
            <p className="text-muted-foreground">
              Ingen träff på <strong>{query}</strong>. Kategorierna finns i
              menyn, och räknarna under{" "}
              <Link
                href="/verktyg"
                className="text-primary underline underline-offset-2"
              >
                Verktyg
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="mt-[var(--space-block)] flex flex-col gap-[var(--space-block)]">
            <p className="text-sm text-muted-foreground">
              {results.length === 1
                ? `1 träff på ${query}`
                : `${results.length} träffar på ${query}`}
            </p>
            {Object.entries(grouped).map(([kind, docs]) => (
              <section key={kind}>
                <h2 className="eyebrow text-muted-foreground">{kind}</h2>
                <ul className="mt-3 flex flex-col gap-stack">
                  {docs.map((doc) => (
                    <li key={doc.href}>
                      <Link
                        href={doc.href}
                        className="font-medium text-primary underline-offset-2 hover:underline"
                      >
                        {doc.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
