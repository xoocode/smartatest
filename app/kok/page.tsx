import type { Metadata } from "next";

import { SITE } from "@/lib/site";
import { pageOpenGraph } from "@/lib/metadata";
import { graph, pageEntity } from "@/lib/schema";
import { KOK, testPagesInCategory, isBrowsable } from "@/lib/catalog";
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
 * Navsida för gruppen Kök, öppnad 2026-08-05 med /mjolkskummare.
 *
 * Medvetet mager, av samma skäl som /elektronik, /sakerhet och /hem-hushall var
 * det när de öppnades: gruppen har en byggd sida, och en hubb som säger mer än
 * den vet är sämre än en som säger lite.
 *
 * Sajtens femte grupp. Elektronik öppnade fältet som följer med personen ut;
 * det här hör till bänken. Se lib/catalog.ts för avvägningen mot Hem & hushåll.
 */

const PAGE_URL = "/kok";
const UPDATED = "2026-08-05";

export const metadata: Metadata = {
  title: "Bäst i test 2026 köksapparater: åtta jämförelser",
  description:
    "Våra jämförelser av köksapparater. Vi läser vad tillverkaren faktiskt anger om just sin modell, redovisar viktningen öppet och säger rakt ut när vi inte vet vad en provning kom fram till.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({
    title: "Bäst i test 2026 köksapparater: åtta jämförelser",
    path: PAGE_URL,
  }),
};

const FAQ = [
  {
    question: "Varför har en jämförelsesajt för hemmet en grupp för köket?",
    answer:
      "Därför att problemet är detsamma som i resten av huset. En mjölkskummare säljs med ett tal i modellnamnet som visar sig betyda något annat än köparen tror, precis som en robotdammsugare säljs med ett pascaltal och en brandfilt med ett årtal. Vårt arbete är detsamma oavsett produkt: läsa vad talet faktiskt mäter, läsa den provning som finns, och skriva ut vad som är uppmätt och vad som är ett påstående. Gruppen öppnades i augusti 2026 med mjölkskummare.",
  },
  {
    question: "Vad ingår i gruppen framöver?",
    answer:
      "Närmast till hands ligger det som står bredvid mjölkskummaren på bänken: kaffebryggare, espressomaskin och kaffekvarn, och därefter vattenkokare, airfryer och blender. Ingen av dem är påbörjad. Vi bygger en sida när det finns något att säga som inte redan står någon annanstans, inte för att fylla en meny, och köksapparater är ett av få fält där svenska konsumenttester faktiskt finns och är värda att läsa i original.",
  },
  {
    question: "Testar ni produkterna själva?",
    answer:
      "Nej. Vi har inget kök och inget laboratorium, och vi påstår aldrig en mätning vi inte gjort. Där en oberoende provning finns citerar vi den och namnger vem som utfört den. I den här gruppen är den distinktionen ovanligt viktig: mjölkskummarna har provats av Råd & Rön i labb, men resultaten per modell ligger bakom betalvägg som vi inte betalat, och därför står det ingenstans på vår sida vilken modell som vann deras test. Vi återger deras metod och de slutsatser de publicerar fritt, och stannar där.",
  },
];

export default function KokPage() {
  const groupSources_ = groupSources(KOK);

  const hubJsonLd = graph([
    pageEntity({
      type: "CollectionPage",
      pageUrl: PAGE_URL,
      name: KOK.label,
      reviewed: UPDATED,
      mainEntity: { "@id": `${SITE.url}${PAGE_URL}#kategorier` },
    }),
    {
      "@type": "ItemList",
      "@id": `${SITE.url}${PAGE_URL}#kategorier`,
      name: `Jämförelser inom ${KOK.label.toLowerCase()}`,
      url: `${SITE.url}${PAGE_URL}`,
      itemListElement: testPagesInCategory(KOK)
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
  const categories = testPagesInCategory(KOK);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: hubJsonLd }}
      />

      <Container size="wide" className="pt-6">
        <Breadcrumbs items={[{ label: KOK.label }]} schema />
      </Container>

      <Container
        size="wide"
        className="pt-3 pb-[var(--space-section)] lg:pt-[var(--space-section)]"
      >
        <div className="grid gap-block lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-row">
            <p className="eyebrow text-brand">Kategori</p>
            <h1 className="text-h1">
              Bäst i test 2026 köksapparater: åtta jämförelser
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Apparaterna som står framme på bänken, och som säljs med ett tal i
              modellnamnet som sällan betyder det köparen tror. Vi läser vad
              talet faktiskt mäter, jämför det tillverkarna anger om just sin
              modell, och redovisar viktningen öppet.
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

      <Section width="default" title="Så tänker vi om köksapparater">
        <Prose>
          <p>
            Köket skiljer sig från resten av sajten på en punkt, och det är en
            fördel för läsaren:{" "}
            <strong>här finns faktiskt svenska labbprovningar</strong>. Råd
            &amp; Rön provar köksmaskiner löpande och gör det ordentligt, med
            mätvärden och ett provprogram som står utskrivet. Det är mer än vi
            kan säga om brandstegar, nyckelskåp eller mobilskal.
          </p>
          <p>
            Det ändrar inte vad vi får påstå. Deras resultat per modell ligger
            bakom betalvägg, och där vi inte betalat citerar vi metoden och de
            slutsatser som publiceras fritt, men aldrig ett betyg och aldrig en
            vinnare. Skillnaden mellan att veta något och att kunna hänvisa till
            det är hela vår affärsidé.
          </p>
          <p>
            Det andra vi tar med oss hit är vanan att läsa talet på kartongen en
            gång till. Mjölkskummarsidan blev byggd kring en enda upptäckt:
            talet i modellnamnet är hur mycket mjölk apparaten värmer, medan den
            skummar ungefär hälften. Samma sorts fynd som pascaltalet på
            robotdammsugarna och årtalet efter EN 1869 på brandfiltarna.
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
