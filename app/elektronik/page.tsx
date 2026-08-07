import type { Metadata } from "next";

import { SITE } from "@/lib/site";
import { pageOpenGraph } from "@/lib/metadata";
import { graph, pageEntity } from "@/lib/schema";
import { ELEKTRONIK, testPagesInCategory, isBrowsable } from "@/lib/catalog";
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
 * Navsida för gruppen Elektronik, öppnad 2026-08-05 med /usb-c-laddare.
 *
 * Medvetet mager, av samma skäl som /sakerhet och /hem-hushall var det när de
 * öppnades: gruppen har en byggd sida, och en hubb som säger mer än den vet är
 * sämre än en som säger lite.
 *
 * Gruppen är sajtens första som inte handlar om huset. De tre andra bär hemmet,
 * säkerheten och hushållsarbetet; det här bär sakerna som följer med personen.
 * Se lib/catalog.ts för avvägningen mot Smart hem och Hem & hushåll.
 */

const PAGE_URL = "/elektronik";
const UPDATED = "2026-08-05";

export const metadata: Metadata = {
  title: "Bäst i test 2026 laddare, powerbanks och mobilskal: 15 jämförelser",
  description:
    "Våra jämförelser av laddare och elektroniktillbehör. Vi läser reglerna bakom orden på kartongen, redovisar viktningen öppet och säger rakt ut när ingen har provat något.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({
    title: "Bäst i test 2026 laddare, powerbanks och mobilskal: 15 jämförelser",
    path: PAGE_URL,
  }),
};

const FAQ = [
  {
    question:
      "Varför har en jämförelsesajt för hemmet en grupp för elektronik?",
    answer:
      "Därför att frågorna liknar varandra mer än produkterna gör. En laddare säljs med ett wattal på kartongen som ingen kontrollerat, precis som en robotdammsugare säljs med ett pascaltal och en brandfilt med ett årtal. Vårt arbete är detsamma oavsett produkt: läsa regeln eller standarden bakom ordet, läsa den provning som finns, och skriva ut vad som är uppmätt och vad som är ett påstående. Gruppen öppnades i augusti 2026 med USB-C-laddare.",
  },
  {
    question: "Vad ingår i gruppen framöver?",
    answer:
      "Närmast till hands ligger de kategorier som gränsar till laddarsidan och som den redan pekar vidare till: billaddare, powerbanker och USB-C-kablar. Alla tre köps på andra egenskaper än väggladdare, vilket är skälet till att de inte ligger i samma jämförelse. Vi bygger en sida när det finns något att säga som inte redan står någon annanstans, inte för att fylla en meny.",
  },
  {
    question: "Testar ni produkterna själva?",
    answer:
      "Nej. Vi har inget laboratorium och påstår aldrig en mätning vi inte gjort. Det vi gör i stället är att läsa det som faktiskt binder tillverkaren, och i den här gruppen betyder det ovanligt mycket: EU:s direktiv om den gemensamma laddaren visade sig reglera telefonen och inte laddaren, vilket vänder på hela kategorins vanligaste påstående. Där en oberoende provning finns citerar vi den och namnger vem som utfört den.",
  },
];

export default function ElektronikPage() {
  const groupSources_ = groupSources(ELEKTRONIK);

  const hubJsonLd = graph([
    pageEntity({
      type: "CollectionPage",
      pageUrl: PAGE_URL,
      name: ELEKTRONIK.label,
      reviewed: UPDATED,
      mainEntity: { "@id": `${SITE.url}${PAGE_URL}#kategorier` },
    }),
    {
      "@type": "ItemList",
      "@id": `${SITE.url}${PAGE_URL}#kategorier`,
      name: `Jämförelser inom ${ELEKTRONIK.label.toLowerCase()}`,
      url: `${SITE.url}${PAGE_URL}`,
      itemListElement: testPagesInCategory(ELEKTRONIK)
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
  const categories = testPagesInCategory(ELEKTRONIK);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: hubJsonLd }}
      />

      <Container size="wide" className="pt-6">
        <Breadcrumbs items={[{ label: ELEKTRONIK.label }]} schema />
      </Container>

      <Container
        size="wide"
        className="pt-3 pb-[var(--space-section)] lg:pt-[var(--space-section)]"
      >
        <div className="grid gap-block lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-row">
            <p className="eyebrow text-brand">Kategori</p>
            <h1 className="text-h1">
              Bäst i test 2026 laddare, powerbanks och mobilskal: 15 jämförelser
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Sakerna som följer med dig ut, och som säljs med tal på kartongen
              som låter exakta utan att vara kontrollerade av någon. Vi läser
              reglerna bakom orden, jämför det tillverkarna faktiskt anger om
              just sin modell, och redovisar viktningen öppet.
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
        description="Varje test bygger på samma metod: publicerade specifikationer och de provningar som finns, sammanvägda mot kriterier vi redovisar öppet."
      >
        <TestPageGrid entries={categories} columns={3} />
      </Section>

      <Section width="default" title="Så tänker vi om elektroniktillbehör">
        <Prose>
          <p>
            Kategorierna här delar ett problem med resten av sajten:{" "}
            <strong>
              talet på kartongen är inte kontrollerat av den du tror
            </strong>
            . Ett wattal på en laddare, en kapacitet på en powerbank och en
            strömtålighet på en kabel är alla tillverkarens egna uppgifter, och
            de går sällan att jämföra rakt av mellan två märken.
          </p>
          <p>
            Laddarsidan gav ett resultat vi inte väntade oss. EU:s direktiv om
            den gemensamma laddaren, som varje svensk jämförelse hänvisar till,
            ställer krav på telefonen och den bärbara datorn, inte på laddaren.
            Laddaren är alltså det enda ledet i kedjan där ingen myndighet satt
            ett krav, samtidigt som den är den enda delen köparen väljer fritt.
          </p>
          <p>
            Vår linje är densamma som i huset: läs regeln i original, citera den
            provning som finns och namnge vem som gjort den, och skriv ut vad
            som är uppmätt och vad som är ett påstående.
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
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
