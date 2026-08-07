import type { Metadata } from "next";

import { testPageTrail, SMART_BELYSNING } from "@/lib/test-pages";
import { SMART_BELYSNING_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  SMART_BELYSNING_FAQ,
  SMART_BELYSNING_CONSIDERED,
  SMART_BELYSNING_PRODUCTS,
} from "@/lib/data/smart-belysning";
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

import Kopguide from "@/content/smart-belysning/kopguide.mdx";

/*
 * ⚠️ Products, prices, GTINs and merchant URLs are real, read from the
 * retailers' own pages on PRICE_CHECKED. Still not publishable: the criterion
 * scores are editorial judgement from the sourced tests rather than
 * measurements.
 *
 * AFFILIATE-SWAP — links go direct to the retailer, untracked and dofollow.
 * See lib/links.ts.
 */

const TEST_PAGE = SMART_BELYSNING;
const PAGE_URL = `/${TEST_PAGE.slug}`;
/* Uppdaterat 2026-08-06: färgåtergivning hämtad för samtliga fem lampor, IKEA
   TRÅDFRI utbytt mot KAJPLATS, och kriteriet Omdöme i oberoende tester räknas
   inte längre om vid saknat betyg. Rankningen ändrades. Se lib/corrections.ts. */
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Bäst i test smart belysning 2026: fem E27-lampor jämförda från 99 kr. Lampan för 99 kr har bäst färgåtergivning. Se vinnaren här.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "jamforelse", label: "Jämför alla fem" },
  { id: "recensioner", label: "Recensioner av varje lampa" },
  { id: "andra-lampor", label: "Andra lampor vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function SmartBelysningPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = SMART_BELYSNING_PRODUCTS;
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
      {/* Mobile trims the top: breadcrumb pt-6 plus a full section pad left a
          canyon between the trail and the h1 on a phone. Explicit paddings
          rather than pad-section + an override, because tailwind-merge cannot
          see a custom @utility and the winner would fall to stylesheet order. */}
      <Container
        size="wide"
        className="pt-3 pb-[var(--space-section)] lg:pt-[var(--space-section)]"
      >
        <div className="grid gap-block lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-row">
            <h1 className="text-h1">{TEST_PAGE.title}</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vår testvinnare är Philips Hue Color Ambiance för 599 kronor,
              eftersom den går ner till 2 000 kelvin, levande ljus, där ingen
              annan lampa här kommer under 2 200. Den håller dessutom
              uppkopplingen när lamporna blir trettio. Men färgerna återger den
              sämre än
              IKEA KAJPLATS, som kostar 99 och ger mer ljus i varmt läge.
              Färgåtergivningen följer inte priset i den här kategorin.
            </p>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vi har också hämtat flimmermåttet ur EU:s produktregister för alla
              fem. Nanoleaf och Tapo deklarerar en tiondel av det tillåtna,
              medan Hue, WiZ och IKEA ligger på gränsvärdet. Det är där du
              hittar förklaringen till att ögonen blir trötta av ett rum utan
              att du kan säga varför.
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

            {/* Desktop only. The hero's left column is shorter than the
                quick-pick rail beside it, so the jump list fills real estate
                that was empty and puts navigation above the fold. On a phone
                the column is the whole width and the pills would push the
                quick-pick panel — the conversion element — below the fold, so
                there they stay in their original place further down. */}
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
        {/* Mobile counterpart of the hero jump list. Only one renders at a
            time, so `display: none` keeps the hidden copy out of the
            accessibility tree rather than duplicating a landmark. */}
        <TocNav
          variant="inline"
          entries={TOC}
          className="mt-block lg:hidden"
        />
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      {/* Parked. Hidden unless the admin toggle is on; kept in the template so
          new category pages still get the section. See lib/theme.ts. */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa lamporna 2026`}
        description="Varje lampa fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla fem"
        description="Samma kriterier och samma viktning för alla fem lamporna."
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
        title="Recensioner av varje lampa"
        description="Vad varje lampa gör bra, var den går sönder i argumentet, och vem som ska köpa den."
      >
        <div className="flex flex-col gap-block">
          {products.map((product, i) => (
            <ProductReview key={product.id} product={product} rank={i + 1}>
              <VerdictText text={product.verdict} className="text-muted-foreground" />
              {/* `total` måste skickas: sidan räknar utan omfördelning av
                  saknade kriterier, och komponenten skulle annars visa ett
                  annat betyg än produktkortet. Se lib/products.ts. */}
              <CriteriaScores
                criteria={TEST_PAGE.criteria}
                scores={product.scores}
                total={product.rating}
                size="sm"
                className="mt-1"
              />
            </ProductReview>
          ))}
        </div>
      </Section>

      <Section
        id="andra-lampor"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra lampor vi övervägde"
        description="Sex lampor som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={SMART_BELYSNING_CONSIDERED} />
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
          footnote="Nanoleaf Essentials, IKEA KAJPLATS och TP-Link Tapo L530E saknar ett publicerat omdöme om just den modellen. Raden står som Ej testat och kriteriet ger noll poäng, alltså bedöms alla fem mot samma 100 viktpoäng. Övriga kategorier på sajten fördelar i stället om vikten. Här gjorde det att lampor ingen mätt gick om Råd & Röns testvinnare, vilket är ett resultat av räknesättet och inte av lamporna."
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
        description="Betygen bygger på specifikationer och på de här oberoende testerna."
      >
        <SourceList sources={SMART_BELYSNING_SOURCES} title={null} />
      </Section>

      <Section
        id="vanliga-fragor"
        width="default"
        title="Vanliga frågor"
      >
        <FaqAccordion items={SMART_BELYSNING_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "electrical", "pricing"]}
          className="mb-block"
        />
      </Container>
    </>
  );
}
