import type { Metadata } from "next";

import { BRANDVARNARE, testPageTrail } from "@/lib/test-pages";
import { BRANDVARNARE_SOURCES } from "@/lib/sources";
import {
  BRANDVARNARE_CONSIDERED,
  BRANDVARNARE_FAQ,
  BRANDVARNARE_FILTERS,
  BRANDVARNARE_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/brandvarnare";
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
import { CriteriaScores } from "@/components/product/criteria-scores";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { FilterableComparison } from "@/components/product/filterable-comparison";
import { MethodologyBlock } from "@/components/product/methodology-block";
import { ProductReview } from "@/components/product/product-review";
import { ProductSchema } from "@/components/product/product-schema";
import { QuickPickPanel } from "@/components/product/quick-pick-panel";
import { WinnerCard } from "@/components/product/winner-card";
import { WinnerGrid } from "@/components/product/winner-grid";
import { VerdictText } from "@/components/product/verdict-text";

import Kopguide from "@/content/brandvarnare/kopguide.mdx";

/*
 * ⚠️ Produkter, priser och kundbetyg är riktiga, lästa på butikernas egna
 * produktsidor på PRICE_CHECKED. Specifikationerna är omgjorda 2026-08-06 mot
 * tillverkarnas egna sidor och manualer, se huvudet i lib/data/brandvarnare.ts.
 * Kriteriebetygen är redaktionell bedömning utifrån de specifikationerna. Vi
 * har inte tänt eld på något, och det står på sidan.
 *
 *
 * Lagerstatus anges inte, efter användarbeslut 2026-08-03: rankningen svarar
 * på vilken produkt som är bäst, inte på vad en butik råkar ha på hyllan.
 * Priserna kontrolleras med `pnpm priskoll`.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 * Se lib/links.ts.
 */

const TEST_PAGE = BRANDVARNARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Brandvarnare bäst i test 2026: tio brandvarnare jämförda från 139 kr. Sju av tio larmar var för sig. Se vilka som larmar ihop.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "sammankoppling", label: "Därför väger sammankoppling tyngst" },
  { id: "jamforelse", label: "Jämför alla tio" },
  { id: "recensioner", label: "Recensioner av varje varnare" },
  { id: "andra-varnare", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra jämförelser" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function BrandvarnarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = BRANDVARNARE_PRODUCTS;
  const [winner] = products;
  const author = DEFAULT_AUTHOR;
  const reviewer = DEFAULT_REVIEWER;

  return (
    <>
      <ProductSchema
        testPage={TEST_PAGE}
        products={products}
        pageUrl={PAGE_URL}
        sections={TOC}
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
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vår testvinnare är Housegard Luma i tvåpack för 599 kronor,
              eftersom det förseglade batteriet räcker varnarens hela tioåriga
              livslängd, så det aldrig behöver bytas. De två varnarna larmar
              dessutom tillsammans på 868 MHz. Vi jämförde tio brandvarnare från
              139 till 646
              kronor. Alla känner rök, alla klarar standardens 85 decibel och
              alla är optiska. Det som skiljer dem åt är om de larmar
              tillsammans, och tre av tio gör det. Det avgör om en brand i
              tvättstugan väcker någon som sover två våningar upp.
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

      {/* ------------------------------------------------ sammankoppling -- */}
      {/* Ligger högt med flit. Det är kriteriet som väger tyngst och det som
          skiljer en varnare som räddar liv från en som väsnas i ett tomt rum.
          Läsaren behöver veta det innan tabellen, inte efter. */}
      <Section
        id="sammankoppling"
        width="default"
        title="Därför väger sammankoppling tyngst"
        description="Alla tio känner rök lika väl på papperet. Frågan är vem som hör larmet."
      >
        <Prose>
          <p>
            En brand börjar sällan där du sover. Den börjar i köket, i
            tvättstugan eller vid en laddare i källaren, och en fristående
            brandvarnare tjuter då där den sitter. Ligger sovrummet två våningar
            upp med stängd dörr hör du ingenting förrän röken är framme.
          </p>
          <p>
            Sammankopplade varnare talar med varandra över radio. Känner den i
            källaren rök larmar alla samtidigt, även den ovanför din säng. Det
            kräver varken wifi, app eller konto, och det är den funktion
            räddningstjänsterna faktiskt trycker på.
          </p>
          <p>
            Tre av de tio klarar det. Frekvensen spelar dessutom roll och nämns
            nästan aldrig: 868 MHz tar sig genom betongbjälklag bättre än 433,
            och det är genom bjälklag signalen ska ta sig.
          </p>
          <p>
            Är hemmet en etta där en enda varnare hörs överallt är hela frågan
            irrelevant, och då finns bra köp från 139 kronor längre ner i listan.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      {/* Parked. Hidden unless the admin toggle is on; kept in the template so
          new category pages still get the section. See lib/theme.ts. */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa brandvarnarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla tio"
        description="Filtrera på det som avgör. Raden att läsa noggrannast är Sammankopplas, och därefter Batteri: förseglat tioårsbatteri betyder att du aldrig behöver göra någonting."
      >
        <FilterableComparison
          products={products}
          filters={BRANDVARNARE_FILTERS}
          legend="Filtrera på sammankoppling och batteri"
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Alla tio anger 85 dB på 3 meter, kravet i EN 14604. Specifikationerna är kontrollerade mot tillverkarnas egna sidor 2026-08-06.`)}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje varnare"
        description="Alla tio bedöms mot samma fyra kriterier och samma viktning."
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
        id="andra-varnare"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex produkter som fanns i urvalet men inte i rankningen. En är nedlagd av tillverkaren, en är den tyska testvinnaren som inte säljs här, och två hör hemma på vår sida om smarta brandvarnare."
      >
        <ConsideredList items={BRANDVARNARE_CONSIDERED} />
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
        description="Viktningen nedan är den som räknar fram betygen i tabellen."
      >
        <MethodologyBlock
          criteria={TEST_PAGE.criteria}
          intro={TEST_PAGE.methodology}
          variant="cards"
          footnote="Vi har inte tänt eld på något. Den enda verkliga brandprovningen i kategorin är Stiftung Warentests, och de testade den tyska marknaden: Ei Electronics, Abus, Busch-Jaeger, Pyrexx, Cavius och Hekatron. Ingen av de tio varnare vi rankar ingick, och deras vinnare Ei650 säljs inte hos någon svensk butik vi bevakar.

Betygen bygger därför på specifikationer, lästa hos tillverkaren och hos butiken och kontrollerade 2026-08-06. Tre varnare saknar betyg på Falsklarm och skötsel, eftersom ingen tillverkare anger om de har pausfunktion. Deras vikt fördelas då på de kriterier som går att bedöma, och de får inget avdrag för en uppgift vi inte fått fram. Priserna är hos den butik vi länkar till."
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
        title="Källor och andra jämförelser"
        description="En tysk brandprovning, fyra svenska jämförelser och två svenska källor om placering och lagkrav."
      >
        <SourceList sources={BRANDVARNARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={BRANDVARNARE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "fireSafety", "pricing"]}
          className="mb-block"
        />
      </Container>
    </>
  );
}
