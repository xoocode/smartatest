import type { Metadata } from "next";

import { testPageTrail, KOMPAKTKAMERA } from "@/lib/test-pages";
import { KOMPAKTKAMERA_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  KOMPAKTKAMERA_FAQ,
  KOMPAKTKAMERA_CONSIDERED,
  KOMPAKTKAMERA_PRODUCTS,
} from "@/lib/data/kompaktkamera";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
import { getStyle } from "@/lib/style-server";
import { priceCaption } from "@/lib/captions";
import { pageOpenGraph } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { Prose } from "@/components/site/prose";
import { TocNav } from "@/components/site/toc-nav";
import { UpdatedStamp } from "@/components/site/updated-stamp";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";
import { LegalDisclaimer } from "@/components/site/legal-disclaimer";
import { PersonCard } from "@/components/site/person-card";
import { SourceList } from "@/components/site/source-list";
import { TrustBlock } from "@/components/site/trust-block";
import { ConsideredList } from "@/components/product/considered-list";
import { ComparisonTable } from "@/components/product/comparison-table";
import { CriteriaScores } from "@/components/product/criteria-scores";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { MethodologyBlock } from "@/components/product/methodology-block";
import { ProductReview } from "@/components/product/product-review";
import { ProductSchema } from "@/components/product/product-schema";
import { QuickPickPanel } from "@/components/product/quick-pick-panel";
import { WinnerCard } from "@/components/product/winner-card";
import { WinnerGrid } from "@/components/product/winner-grid";
import { VerdictText } from "@/components/product/verdict-text";

import Kopguide from "@/content/kompaktkamera/kopguide.mdx";

/*
 * ⚠️ Priser, produktnamn, bilder och kundbetyg är lästa i butikernas egen
 * JSON-LD på PRICE_CHECKED. Samtliga specifikationer är hämtade hos
 * tillverkaren. Kriteriepoängen är redaktionell bedömning ur de sourcade
 * uppgifterna, inte mätningar, och det står i sidans metodavsnitt.
 *
 * AFFILIATE-SWAP — se lib/links.ts. Vi har inget program i kategorin, och
 * inget `affiliateUrl` finns på någon produkt.
 */

const TEST_PAGE = KOMPAKTKAMERA;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Kompaktkamera bäst i test 2026: tio fickkameror jämförda från 4 675 kr. Zoomen spänner från ingen alls till 40x. Se vilken du behöver.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "jamforelse", label: "Jämför alla tio" },
  { id: "recensioner", label: "Recensioner av varje kamera" },
  { id: "andra-kameror", label: "Andra kameror vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function KompaktkameraPage() {
  /* Läses bara i utvecklingsläge. Se lib/style-server.ts: produktion behåller
     standardlayouten och sidan förblir statisk. */
  const style = await getStyle();
  const products = KOMPAKTKAMERA_PRODUCTS;
  const [winner] = products;
  const author = DEFAULT_AUTHOR;
  const reviewer = DEFAULT_REVIEWER;

  return (
    <>
      <ProductSchema
        testPage={TEST_PAGE}
        products={products}
        pageUrl={PAGE_URL}
        author={author}
        reviewed={UPDATED}
      />

      <Container size="wide" className="pt-6">
        <Breadcrumbs items={testPageTrail(TEST_PAGE)} schema />
      </Container>

      {/* ------------------------------------------------ above the fold -- */}
      <Container
        size="wide"
        className="pt-3 pb-[var(--space-section)] lg:pt-[var(--space-section)]"
      >
        <div className="grid gap-block lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-row">
            <h1 className="text-h1">{TEST_PAGE.title}</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vår testvinnare är Canon PowerShot V1 för 9 490 kronor, eftersom
              den både har den största sensorn här på 1,4 tum och är ensam om
              att ha både mikrofoningång och hörlursuttag. Den väger 426 gram
              och når bara
              50 millimeter, så den som vill zooma får välja en annan.
            </p>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Under 7 000 kronor får du stor sensor eller lång zoom, aldrig
              båda. Sony ZV-1F kostar 5 790 med fyra gånger så stor sensor som
              Canon SX740 för 6 549, och SX740 når 960 millimeter där ZV-1F
              inte zoomar alls. Priset avslöjar inte vilken egenskap du får.
            </p>
            <UpdatedStamp
              date={UPDATED}
              slug={TEST_PAGE.slug}
              testedCount={products.length}
              variant="bar"
              className="self-start"
            />
            <PersonCard
              person={author}
              variant="byline"
              label="Av"
              reviewer={reviewer}
            />
            <AffiliateDisclosure variant="inline" />

            <TocNav
              variant="inline"
              entries={TOC}
              className="mt-auto hidden pt-2 lg:flex"
            />
          </div>

          <QuickPickPanel
            products={products}
            title={`${TEST_PAGE.label} · Bäst i test`}
            variant="sticky"
            footerHref="#jamforelse"
          />
        </div>
      </Container>

      {/* ------------------------------------------------------- verdict -- */}
      <Section id="snabbt-svar" tone="muted" width="wide">
        <WinnerCard
          product={winner}
          variant="split"
          awardLabel="Bäst i test 2026"
          ctaNote={`Pris kontrollerat ${PRICE_CHECKED}`}
          showSpecs
        />
        <TocNav
          variant="inline"
          entries={TOC}
          className="mt-block lg:hidden"
        />
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      {/* Parkerad. Dold om inte adminväxeln är på; ligger kvar i mallen så att
          nya kategorisidor får sektionen. Se lib/theme.ts. */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa kompaktkamerorna 2026`}
        description="Varje kamera fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tio"
        description="Samma kriterier och samma viktning för alla tio kamerorna."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED)}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        tone="muted"
        width="wide"
        title="Recensioner av varje kamera"
        description="Vad varje kamera gör bra, var den går sönder i argumentet, och vem som ska köpa den."
      >
        <div className="flex flex-col gap-block">
          {products.map((product, i) => (
            <ProductReview key={product.id} product={product} rank={i + 1}>
              <VerdictText text={product.verdict} className="text-muted-foreground" />
              <CriteriaScores
                criteria={TEST_PAGE.criteria}
                scores={product.scores}
                size="sm"
                className="mt-1"
              />
            </ProductReview>
          ))}
        </div>
      </Section>

      <Section
        id="andra-kameror"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra kameror vi övervägde"
        description="Sex kameror som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={KOMPAKTKAMERA_CONSIDERED} />
      </Section>

      {/* ---------------------------------------------------- editorial -- */}
      <Section id="kopguide" width="default" title="Köpguide">
        <Prose>
          <Kopguide />
        </Prose>
      </Section>

      <Section
        id="testmetod"
        tone="muted"
        width="default"
        title="Så gjorde vi testet"
        description="Viktningen nedan är den som räknar fram betygen på sidan."
      >
        <MethodologyBlock
          criteria={TEST_PAGE.criteria}
          intro={TEST_PAGE.methodology}
          variant="cards"
          footnote="OM System publicerar vikten för Tough TG-7 utan batteri och minneskort, medan de nio övriga tillverkarna anger vikten med. Raden står därför tom för den kameran i stället för att bära ett tal som inte går att jämföra. Ingen kamera får lägre betyg för en uppgift vi inte fått fram."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi provar inte produkterna fysiskt. Det här är vad vi gör i stället."
      >
        <TrustBlock />
        <div className="mt-block grid gap-4 sm:grid-cols-2">
          <PersonCard
            person={author}
            variant="box"
            label="Skriven av"
            meta="Skriver och betygsätter"
          />
          <PersonCard
            person={reviewer}
            variant="box"
            label="Granskad av"
            meta="Granskar siffror och källor"
          />
        </div>
      </Section>

      <Section
        id="kallor"
        tone="muted"
        width="default"
        title="Källor och andra tester"
        description="Betygen bygger på tillverkarnas specifikationer och på de här oberoende testerna."
      >
        <SourceList sources={KOMPAKTKAMERA_SOURCES} title={null} />
      </Section>

      <Section
        id="vanliga-fragor"
        width="default"
        title="Vanliga frågor"
      >
        <FaqAccordion items={KOMPAKTKAMERA_FAQ} schema />
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
