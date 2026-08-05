import type { Metadata } from "next";

import { testPageTrail, SLACKSPRAY } from "@/lib/test-pages";
import { SLACKSPRAY_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  SLACKSPRAY_FAQ,
  SLACKSPRAY_CONSIDERED,
  SLACKSPRAY_PRODUCTS,
} from "@/lib/data/slackspray";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
import { getStyle } from "@/lib/style-server";
import { priceCaption } from "@/lib/captions";
import { SITE } from "@/lib/site";
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

import Kopguide from "@/content/slackspray/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, kundbetyg och butiks-URL:er är verkliga, lästa hos
 * butikerna på PRICE_CHECKED.
 *
 * ⚠️ Två av fem produkter har provats mot eld, i ett examensarbete från
 * Avdelningen för Brandteknik vid Lunds universitet med släckförsök på
 * övningsfältet Revinge. Det är inte en ackrediterad provning och inte en
 * myndighetsgranskning, vilket sidan skriver ut. Övriga tre bedöms på vad som
 * är publicerat om dem och får aldrig ett lånat provresultat.
 *
 * ⚠️ Effektivitetsklassen får aldrig gissas. Se ALDRIG_BEDOMD i
 * lib/spec-schema.mjs: att Biltema inte anger någon är ett utfall, inte ett
 * tomrum att fylla.
 *
 * ⚠️ Housegards påstående om att sprayen ligger nära en handbrandsläckare är
 * LTH:s citat från omkring 2020 och får inte skrivas i presens; tillverkarens
 * sida svarar 404 i dag. Se lib/data/slackspray.ts.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = SLACKSPRAY;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-05";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Släcksprayer klassas enligt samma standard som brandsläckare, och klassen står på burken. De som anger den ligger på 5A och 3A. För hemmet rekommenderas 43A. Vi rankar fem sprayer på klass, användning, pris och tömningstid.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "jamforelse", label: "Jämför alla fem" },
  { id: "recensioner", label: "Recensioner av varje spray" },
  { id: "andra-sprayer", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function SlacksprayPage() {
  const style = await getStyle();
  const products = SLACKSPRAY_PRODUCTS;
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
        sections={TOC}
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
            <h1 className="text-h1">
              Släckspray bäst i test 2026: fem sprayer och klassen som står på
              burken
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Släcksprayer klassas enligt samma standard som handbrandsläckare,
              och koden på burken går att jämföra rakt av. De sprayer som anger
              den ligger på 5A och 3A. För hemmet rekommenderas 43A, alltså ett
              testbål ungefär åtta gånger större.
            </p>
            <UpdatedStamp
              date={UPDATED}
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
        <TocNav variant="inline" entries={TOC} className="mt-block lg:hidden" />
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa släcksprayerna 2026`}
        description="Varje spray fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla fem"
        description="Samma kriterier och samma viktning för alla fem sprayerna. Raden att läsa först är effektivitetsklassen: den säger hur stor brand produkten är provad mot, och två av fem anger den inte."
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
        title="Recensioner av varje spray"
        description="Två av sprayerna har gått genom släckförsök i det examensarbete sidan bygger på. Övriga tre bedöms på vad som är publicerat om dem, och vi lånar aldrig ett provresultat från en produkt till en annan."
      >
        <div className="flex flex-col gap-block">
          {products.map((product, i) => (
            <ProductReview key={product.id} product={product} rank={i + 1}>
              <VerdictText
                text={product.verdict}
                className="text-muted-foreground"
              />
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
        id="andra-sprayer"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra produkter vi övervägde"
        description="Tre poster som inte fick en egen rad, och skälet till det. Den sista är ingen spray alls, och den är med just därför."
      >
        <ConsideredList items={SLACKSPRAY_CONSIDERED} />
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
          footnote="Angiven släckeffekt väger 30 därför att det är den enda uppgift som gör sprayerna jämförbara med varandra och med en brandsläckare. Sidan har fyra kriterier och inte fem: ett femte hade behövt fyllas med uppgifter som bara en eller två av produkterna publicerar, och en kolumn med streck är sämre än färre kriterier. Där en tillverkare inte anger klass, släckmedel eller temperaturområde räknas det som en brist och inte som ett neutralt tomrum, eftersom en produkt du inte kan jämföra är sämre för dig än en du kan."
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
        description="Examensarbetet från Lunds tekniska högskola är läst i original, alla 61 sidor. Standarden bakom klasserna är inte köpt, så vi återger ingenting om provvillkoren utöver det rapporten beskriver."
      >
        <SourceList sources={SLACKSPRAY_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={SLACKSPRAY_FAQ} schema />
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
