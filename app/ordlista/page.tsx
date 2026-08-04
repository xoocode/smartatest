import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/site";
import {
  GLOSSARY,
  GLOSSARY_GROUPS,
  termsInGroup,
  type GlossaryTerm,
} from "@/lib/glossary";
import { TEST_PAGE_INDEX, isBrowsable } from "@/lib/catalog";
import { TOOLS, toolHref } from "@/lib/tools";
import { DEFAULT_REVIEWER } from "@/lib/people";
import { graph, orgRef, pageEntity } from "@/lib/schema";
import { Container } from "@/components/site/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Section } from "@/components/site/section";
import { Prose } from "@/components/site/prose";
import { TocNav } from "@/components/site/toc-nav";

/*
 * Ordlistan.
 *
 * ## Vad den är till för
 *
 * Två saker. Den svarar på frågor läsare faktiskt ställer innan ett köp,
 * "vad betyder IP44", "skillnad Zigbee Thread", och den ger testsidorna
 * någonstans att länka en term i stället för att förklara den en gång till på
 * varje sida.
 *
 * ## DefinedTermSet
 *
 * Varje term emitteras som `DefinedTerm` i en `DefinedTermSet`. Det är den
 * schematyp som faktiskt beskriver en ordlista, och den ger språkmodeller en
 * maskinläsbar koppling mellan termen och definitionen i stället för att de
 * ska gissa var i löptexten svaret börjar. Varje term har ett eget `@id` som
 * pekar på sitt ankare, så en citering kan landa på rätt rad.
 *
 * ## Länkar bara till publicerade sidor
 *
 * `href` på en term kan peka på en kategori som ännu står som planerad.
 * `resolveHref` släpper igenom verktyg alltid och kategorier bara när de är
 * live, av samma skäl som sitemapen: en länk till en opublicerad sida är en
 * återvändsgränd.
 */

const PAGE_URL = "/ordlista";

export const metadata: Metadata = {
  title: "Ordlista",
  description:
    "CRI, lumen, kelvin, Zigbee, Thread, Matter, IP-klass och nolledare. Korta förklaringar av orden som avgör vilken produkt du bör välja.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Ordlista",
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

/** Verktyg alltid, kategorier bara när de är publicerade. */
function resolveHref(href: string | undefined): string | null {
  if (!href) return null;
  if (TOOLS.some((tool) => toolHref(tool) === href)) return href;
  const entry = TEST_PAGE_INDEX.find((c) => c.href === href);
  if (entry) return isBrowsable(entry) ? href : null;
  return href;
}

export default function OrdlistaPage() {
  /*
   * Sidnod plus termuppsättning.
   *
   * Termuppsättningen fanns redan men saknade sidentitet, alltså fanns
   * granskare och avsnittsindelning inte maskinläsbart. Grupperna blir
   * `hasPart` mot sina verkliga ankare, så ett svar kan peka på just
   * protokollavsnittet.
   *
   * Varje term får `alternateName` från synonymerna. Det är den egenskap som
   * gör att en fråga om "kapslingsklass" kan matchas mot IP-klass utan att vi
   * behöver en egen sida per synonym.
   */
  const jsonLd = graph([
    pageEntity({
      type: "CollectionPage",
      pageUrl: PAGE_URL,
      name: "Ordlista",
      description:
        "Definitioner av begreppen som avgör vilken produkt du bör välja.",
      reviewer: DEFAULT_REVIEWER,
      mainEntity: { "@id": `${SITE.url}${PAGE_URL}#termset` },
      sections: GLOSSARY_GROUPS.map((g) => ({ id: g.key, label: g.label })),
    }),
    {
      "@type": "DefinedTermSet",
      "@id": `${SITE.url}${PAGE_URL}#termset`,
      name: "Ordlista för smarta hem och hemsäkerhet",
      url: `${SITE.url}${PAGE_URL}`,
      inLanguage: "sv-SE",
      publisher: orgRef(),
      hasDefinedTerm: GLOSSARY.map((term) => ({
        "@type": "DefinedTerm",
        "@id": `${SITE.url}${PAGE_URL}#${term.slug}`,
        name: term.term,
        url: `${SITE.url}${PAGE_URL}#${term.slug}`,
        description: term.definition,
        ...(term.aliases?.length ? { alternateName: term.aliases } : {}),
        /* Kopplar vår definition till entiteten resten av världen känner till.
           Ordlistan säger vad *vi* menar; `sameAs` säger att det är samma sak.
           Wikidata har fyra Thread, och tre handlar om garn, skruvgängor och
           ett tv-spel. Q-numren är uppslagna och kontrollerade, se
           lib/glossary.ts. Termer utan verifierad entitet får ingen. */
        ...(term.wikidata
          ? { sameAs: `https://www.wikidata.org/wiki/${term.wikidata}` }
          : {}),
        inDefinedTermSet: { "@id": `${SITE.url}${PAGE_URL}#termset` },
      })),
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Container size="narrow" className="pt-6">
        <Breadcrumbs items={[{ label: "Ordlista" }]} schema />
      </Container>

      <Container size="narrow" className="pt-3 pb-[var(--space-section)]">
        <p className="eyebrow text-brand">Ordlista</p>
        <h1 className="mt-2 text-h1">Orden som avgör köpet</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Produktblad är skrivna av folk som redan kan orden. Här är de{" "}
          {GLOSSARY.length} som oftast står mellan en läsare och ett vettigt
          köp, förklarade en gång.
        </p>

        <TocNav
          variant="inline"
          entries={GLOSSARY_GROUPS.map((g) => ({ id: g.key, label: g.label }))}
          className="mt-block"
        />
      </Container>

      {GLOSSARY_GROUPS.map((group, i) => (
        <Section
          key={group.key}
          id={group.key}
          width="narrow"
          tone={i % 2 === 0 ? "muted" : "default"}
          title={group.label}
        >
          <dl className="flex flex-col gap-block">
            {termsInGroup(group.key).map((term) => (
              <Term key={term.slug} term={term} />
            ))}
          </dl>
        </Section>
      ))}

      <Container size="narrow" className="pad-section">
        <Prose>
          <p className="text-sm text-muted-foreground">
            Saknas ett ord? Vi lägger gärna till det.{" "}
            <Link href="/kontakt">Hör av dig</Link>, så kommer det med nästa
            gång vi går igenom listan.
          </p>
        </Prose>
      </Container>
    </>
  );
}

function Term({ term }: { term: GlossaryTerm }) {
  const href = resolveHref(term.href);

  return (
    <div id={term.slug} style={{ scrollMarginTop: "5rem" }}>
      {/* dt som h2: rubriken ska synas i innehållsöversikter och kunna
          citeras, och en definitionslista utan rubriknivå gör varken. */}
      <dt>
        <h2 className="text-h3">{term.term}</h2>
      </dt>
      <dd className="mt-1.5">
        <p>{term.definition}</p>
        {term.matters ? (
          <p className="mt-2 text-muted-foreground">{term.matters}</p>
        ) : null}
        {href ? (
          <p className="mt-2 text-sm">
            <Link
              href={href}
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              Mer om {term.term.toLowerCase()}
            </Link>
          </p>
        ) : null}
      </dd>
    </div>
  );
}
