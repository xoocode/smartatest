import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PUBLISHER, SITE } from "@/lib/site";
import { browsableTestPages } from "@/lib/catalog";
import {
  DEFAULT_AUTHOR,
  PEOPLE,
  getPerson,
  isBylineAuthor,
  isBylineReviewer,
  personHref,
} from "@/lib/people";
import { graph, pageEntity, personNode } from "@/lib/schema";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { Prose } from "@/components/site/prose";
import { ArticleList } from "@/components/site/article-list";
import { PersonCard } from "@/components/site/person-card";
import { PersonCredentials } from "@/components/site/person-credentials";
import { PullQuote } from "@/components/site/pull-quote";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PEOPLE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) return {};

  return {
    title: person.name,
    description: `${person.name}, ${person.role} på ${SITE.name}. ${person.short}.`,
    alternates: { canonical: personHref(person) },
  };
}

export default async function PersonPage({ params }: Params) {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) notFound();

  /* Kategorierna, inte menyn. NAV listar sedan menyomläggningen gruppernas
     navsidor plus Verktyg, så den här listan påstod att personen ansvarar för
     "Bäst i test verktyg 2026". `browsableTestPages()` är samma källa sitemapen
     och sökindexet läser, alltså kan en opublicerad kategori inte dyka upp.

     Listan visas bara för den som faktiskt står som skribent. Tidigare fick
     alla tre samma uppsättning kort, vilket gjorde det uppenbart vid två
     öppna flikar att ingen av dem skrivit något särskilt. Granskaren får en
     rad text i stället: kort läses som författarskap. */
  const categories = browsableTestPages();
  const isAuthor = isBylineAuthor(person);
  const isReviewer = isBylineReviewer(person);

  /*
   * ProfilePage med personen som mainEntity.
   *
   * Person-noden fanns redan, men låg ensam och utan sidentitet. Google har
   * sedan 2023 en egen behandling av `ProfilePage` för just författarsidor,
   * och den kräver att personen sitter som `mainEntity` på en sidnod snarare
   * än att flyta fritt.
   *
   * `@id` är detsamma som `personNode()` i lib/schema.ts bygger, så personen
   * som står som författare på en jämförelse och personen på den här sidan är
   * en och samma nod i grafen, inte två som råkar dela namn.
   */
  const url = `${SITE.url}${personHref(person)}`;

  const personNodeFull = {
    ...personNode(person),
    description: person.short,
    /* Redaktionens brevlåda, inte en personlig adress. Ingen `sameAs`: den
       ska peka på personens egna profiler någon annanstans, och när det inte
       finns några är ett utelämnat fält rätt svar. */
    email: PUBLISHER.email,
    /* Bara för den som faktiskt står som skribent. Alla tre hade tidigare
       samma `knowsAbout`, vilket är samma påstående som de identiska
       kortlistorna gjorde, fast i maskinläsbar form. */
    ...(isAuthor ? { knowsAbout: categories.map((c) => c.label) } : {}),
    alumniOf: person.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.split(", ").slice(-1)[0],
    })),
    mainEntityOfPage: { "@id": `${url}#page` },
  };

  const jsonLd = graph([
    pageEntity({
      type: "ProfilePage",
      pageUrl: personHref(person),
      name: person.name,
      description: `${person.name}, ${person.role} på ${SITE.name}.`,
      mainEntity: { "@id": `${url}#person` },
    }),
    personNodeFull,
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="bg-muted">
        <Container size="narrow" className="py-[var(--space-section)]">
          <Breadcrumbs
            items={[
              { label: "Om oss", href: "/om-oss" },
              { label: person.name },
            ]}
            schema
            className="mb-block"
          />
          <PersonCard person={person} variant="hero" link={false} />
        </Container>
      </div>

      <Container size="narrow" className="pad-section">
        <div className="grid gap-block lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="flex flex-col gap-block">
            {person.quote ? (
              <PullQuote label={person.quoteLabel}>{person.quote}</PullQuote>
            ) : null}

            <Prose>
              {person.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </Prose>
          </div>

          <PersonCredentials person={person} variant="sidebar" />
        </div>
      </Container>

      {isAuthor && categories.length > 0 ? (
        <Section
          tone="muted"
          width="wide"
          title={`Jämförelser av ${person.name.split(" ")[0]}`}
          description={`Kategorierna ${person.name.split(" ")[0]} arbetar med. Fler publiceras löpande.`}
        >
          <ArticleList
            variant="cards"
            items={categories.map((c) => ({
              href: c.href,
              title: `Bäst i test ${c.label.toLowerCase()} 2026`,
              kicker: c.label,
              author: person.name,
            }))}
          />
        </Section>
      ) : null}

      {isReviewer && categories.length > 0 ? (
        <Section
          tone="muted"
          width="default"
          title={`Vad ${person.name.split(" ")[0]} granskar`}
        >
          <Prose>
            <p>
              {person.name.split(" ")[0]} faktagranskar samtliga jämförelser
              innan de publiceras och står som granskare i bylinen på var och en
              av dem. Namnet står alltså på sidor som någon annan skrivit,
              vilket är avsikten: en sida som granskats av den som skrev den
              är inte granskad.
            </p>
            <p>
              Jämförelserna hittar du hos{" "}
              <Link href={personHref(DEFAULT_AUTHOR)}>
                {DEFAULT_AUTHOR.name}
              </Link>
              , som är skribent på dem.
            </p>
          </Prose>
        </Section>
      ) : null}
    </>
  );
}
