import type { Metadata } from "next";

import { testPageTrail, USB_C_LADDARE } from "@/lib/test-pages";
import { USB_C_LADDARE_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  USB_C_LADDARE_FAQ,
  USB_C_LADDARE_CONSIDERED,
  USB_C_LADDARE_PRODUCTS,
} from "@/lib/data/usb-c-laddare";
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

import Kopguide from "@/content/usb-c-laddare/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, kundbetyg och butiks-URL:er är verkliga, lästa hos
 * butikerna på PRICE_CHECKED. Specifikationerna kommer från butikernas egna
 * specifikationstabeller, som i den här kategorin är mer detaljerade än
 * tillverkarnas svenska sidor: Ugreen och Samsung publicerar effekt per port
 * hos Kjell.
 *
 * ⚠️ Ingen laddare här är provad, varken av oss eller av någon annan. Den enda
 * labbprovning som finns är Testaankoops, och ingen av de nio modeller de
 * namnger med poäng säljs av butikerna i jämförelsen. Deras mätvärden bär
 * köpguiden och viktningen, aldrig en betygskolumn. Se
 * lib/data/usb-c-laddare.ts.
 *
 * ⚠️ Attributionsfällan: provningen är Testaankoops, inte Stiftung Warentests.
 * Warentest refererar den och skriver det själva. Se lib/sources.ts.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = USB_C_LADDARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Ugreen 200 W vinner: två datorer på 100 W var samtidigt, sex portar, 1 699 kr. Billigast per watt är IKEA SJÖSS för 179. Vi rankar tretton väggladdare på effekt per port, pris per watt och plats i uttaget.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "jamforelse", label: "Jämför alla tretton" },
  { id: "recensioner", label: "Recensioner av varje laddare" },
  { id: "andra-laddare", label: "Andra laddare vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function UsbCLaddarePage() {
  const style = await getStyle();
  const products = USB_C_LADDARE_PRODUCTS;
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
            {/* H1 bär avgränsningen, som på /brandvarnare och /smart-termostat:
                ordet laddare täcker även billaddare, powerbanker och kablar,
                och den här jämförelsen rankar bara väggladdare. */}
            <h1 className="text-h1">
              USB-C-laddare bäst i test 2026: tretton väggladdare från 179 till
              1&nbsp;699 kr
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Ugreen 200&nbsp;W vinner för 1&nbsp;699 kronor: två portar på
              100&nbsp;W var räcker till två datorer på full fart samtidigt, och
              ingen annan här klarar det. Ska du bara ladda en telefon kostar
              IKEA SJÖSS 179 kronor och är billigast per watt. Wattalet på en
              kartong är nämligen nästan alltid summan över alla portar, inte
              vad din enhet får.
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
        title={`De ${products.length} bästa USB-C-laddarna 2026`}
        description="Varje laddare fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tretton"
        description="Samma kriterier och samma viktning för alla tretton laddarna. Raden att läsa först är effekten vid två portar: den säger vad du faktiskt får när både datorn och telefonen sitter i."
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
        title="Recensioner av varje laddare"
        description="Tretton väggladdare mellan 20 och 200 W, bedömda på vad de ger per port, vad effekten kostar och hur mycket plats de tar i uttaget."
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
        id="andra-laddare"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra laddare vi övervägde"
        description="Sex laddare som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort. Tre av dem är labbprovade och hade rankats direkt om de gått att köpa här till ett konsumentpris."
      >
        <ConsideredList items={USB_C_LADDARE_CONSIDERED} />
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
          footnote="Effekten per port väger 35 därför att den avgör vad du faktiskt får ut, och pris per watt 29 därför att rankningen är en enda lista över allt från 20 till 200 W: utan den normaliseringen hade den största laddaren vunnit på storlek snarare än på förtjänst. Sidan har inget kriterium för testomdöme. Den enda labbprovningen i kategorin är Testaankoops, och ingen av de modeller de namnger med poäng säljs av butikerna här, så en betygskolumn hade blivit tom för varenda laddare."
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
        description="Direktivet är läst i original på EUR-Lex. Labbprovningen är belgiska Testaankoops, publicerad i april 2026 och refererad av Stiftung Warentest i maj; talen på den här sidan kommer från originalet."
      >
        <SourceList sources={USB_C_LADDARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={USB_C_LADDARE_FAQ} schema />
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
