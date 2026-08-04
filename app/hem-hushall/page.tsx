import type { Metadata } from "next";

import { SITE } from "@/lib/site";
import { graph, pageEntity } from "@/lib/schema";
import { HEM_HUSHALL, testPagesInCategory, isBrowsable } from "@/lib/catalog";
import { groupSources } from "@/lib/sources";
import { DEFAULT_AUTHOR } from "@/lib/people";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { TestPageGrid } from "@/components/site/test-page-grid";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { Prose } from "@/components/site/prose";
import { UpdatedStamp } from "@/components/site/updated-stamp";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";
import { LegalDisclaimer } from "@/components/site/legal-disclaimer";
import { PersonCard } from "@/components/site/person-card";
import { SourceList } from "@/components/site/source-list";
import { FaqAccordion } from "@/components/product/faq-accordion";

/*
 * Navsida för gruppen Hem & hushåll, öppnad 2026-08-03 med /luftrenare.
 *
 * Medvetet mager, av samma skäl som /sakerhet var det när den öppnades: gruppen
 * har en byggd sida och en hubb som säger mer än den vet är sämre än en som
 * säger lite. Guiden skrivs när fler kategorier finns.
 *
 * Gruppen är avsiktligt bred. Den ska bära två kluster: luften inomhus, alltså
 * luftrenare, luftfuktare och avfuktare, och maskinerna som gör hushållsarbetet,
 * alltså robotdammsugare och robotgräsklippare. Se lib/catalog.ts.
 */

const PAGE_URL = "/hem-hushall";
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: "Hem & hushåll: luftrenare och maskinerna som gör jobbet",
  description:
    "Våra jämförelser av luftrenare och hushållsmaskiner. Vi läser myndigheternas granskningar och standarderna bakom orden på kartongen, redovisar viktningen och säger rakt ut när ingen har testat något.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Hem & hushåll",
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const FAQ = [
  {
    question: "Varför ligger luftrenare inte under Smart hem?",
    answer:
      "För att ingen köper en luftrenare av det skälet. Sju av åtta apparater vi jämför är appstyrda, men appen är inte anledningen till köpet, luften är det. Samma resonemang gäller robotdammsugare, som ännu ligger fel hos oss och ska flyttas hit när den sidan byggs. Den som söker robotdammsugare tänker inte på den som en smart hem-produkt.",
  },
  {
    question: "Vad har luftrenare och robotdammsugare gemensamt?",
    answer:
      "Att de är maskiner som utför ett hushållsarbete du annars gör själv eller inte alls, och att de köps på prestanda snarare än på uppkoppling. Gruppen är avsiktligt bred: den rymmer både luften inomhus, med luftrenare, luftfuktare och avfuktare, och maskinerna, med robotdammsugare och robotgräsklippare. Alternativen vi övervägde var smalare men lämnade hälften av produkterna hemlösa.",
  },
  {
    question: "Testar ni produkterna själva?",
    answer:
      "Nej. Vi har inget laboratorium och påstår aldrig en mätning vi inte gjort. Det vi gör i stället är att läsa det som faktiskt finns: myndigheternas granskningar, standarderna bakom orden på kartongen, och varje produkts specifikation hos butiken med datum. På luftrenarsidan betyder det Kemikalieinspektionens och Elsäkerhetsverkets marknadskontroll och standarden EN 1822, som avgör vad HEPA betyder.",
  },
];

export default function HemHushallPage() {
  /* Hela gruppens källor, avdubblerade. Se `groupSources` i lib/sources.ts:
     sidan skickade tidigare en handplockad kategorilista hit. */
  const groupSources_ = groupSources(HEM_HUSHALL);

  /* Gruppnav. `CollectionPage` med kategorierna som ItemList, så gruppen blir
     en entitet i grafen och inte bara en rubrik i menyn. */
  const hubJsonLd = graph([
    pageEntity({
      type: "CollectionPage",
      pageUrl: PAGE_URL,
      name: HEM_HUSHALL.label,
      reviewed: UPDATED,
      mainEntity: { "@id": `${SITE.url}${PAGE_URL}#kategorier` },
    }),
    {
      "@type": "ItemList",
      "@id": `${SITE.url}${PAGE_URL}#kategorier`,
      name: `Jämförelser inom ${HEM_HUSHALL.label.toLowerCase()}`,
      url: `${SITE.url}${PAGE_URL}`,
      itemListElement: testPagesInCategory(HEM_HUSHALL)
        .filter(isBrowsable)
        .map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE.url}${c.href}`,
          name: c.label,
        })),
    },
  ]);

  const author = DEFAULT_AUTHOR;
  const categories = testPagesInCategory(HEM_HUSHALL);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: hubJsonLd }}
      />

      <Container size="wide" className="pt-6">
        <Breadcrumbs items={[{ label: HEM_HUSHALL.label }]} schema />
      </Container>

      <Container
        size="wide"
        className="pt-3 pb-[var(--space-section)] lg:pt-[var(--space-section)]"
      >
        <div className="grid gap-block lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-row">
            <p className="eyebrow text-brand">Kategori</p>
            <h1 className="text-h1">Hem &amp; hushåll</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Maskiner som gör ett arbete du annars gör själv, eller inte alls.
              De köps på prestanda och inte på uppkoppling, och de säljs med ord
              som låter tekniska utan att betyda något bestämt. Vi läser
              standarderna bakom orden och myndigheternas granskningar av
              produkterna, och redovisar viktningen öppet.
            </p>
            <UpdatedStamp date={UPDATED} variant="bar" className="self-start" />
            <PersonCard person={author} variant="byline" />
            <AffiliateDisclosure variant="inline" />
          </div>

          <SourceList
            sources={groupSources_}
            variant="summary"
            title="Det här har vi gått igenom"
            className="lg:sticky lg:top-20 lg:self-start"
          />
        </div>
      </Container>

      <Section
        id="jamforelser"
        tone="muted"
        width="wide"
        eyebrow="Våra jämförelser"
        title="Testerna i gruppen"
        description="Varje test bygger på samma metod: publicerade specifikationer och de granskningar som finns, sammanvägda mot kriterier vi redovisar öppet."
      >
        <TestPageGrid entries={categories} columns={3} />
      </Section>

      <Section width="default" title="Så tänker vi om hushållsmaskiner">
        <Prose>
          <p>
            Kategorierna här har ett gemensamt problem:{" "}
            <strong>orden på kartongen är inte reglerade på det sätt köparen tror</strong>.
            HEPA låter som ett godkännande men är en standard med klasser, och
            bara de två översta räknas. Samma sak gäller sugkraft i pascal och
            navigering med lidar: tal som går att skriva ut utan att någon
            kontrollerar dem.
          </p>
          <p>
            Vår linje är att läsa det som faktiskt binder tillverkaren.
            Standarden, om det finns en. Myndighetens granskning, om det gjorts
            en. Butikens egen specifikation, med datum, om det är allt som finns.
            Och att skriva ut vilket av de tre ett betyg vilar på.
          </p>
          <p>
            På luftrenarsidan gav det ett resultat vi inte väntade oss: två
            myndigheter hade granskat kategorin sju månader innan vi började, och
            ingen av de sex svenska jämförelserna nämnde det.
          </p>
        </Prose>
      </Section>

      <Section
        id="vanliga-fragor"
        tone="muted"
        width="default"
        title="Vanliga frågor"
      >
        <FaqAccordion items={FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "pricing"]}
          className="mb-block"
        />
      </Container>
    </>
  );
}
