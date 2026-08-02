import type { Metadata } from "next";

import { BRANDSLACKARE, categoryTrail } from "@/lib/categories";
import { BRANDSLACKARE_SOURCES } from "@/lib/sources";
import {
  BRANDSLACKARE_CONSIDERED,
  BRANDSLACKARE_FAQ,
  BRANDSLACKARE_FILTERS,
  BRANDSLACKARE_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/brandslackare";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
import { getStyle } from "@/lib/style-server";
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
import { CriteriaScores } from "@/components/product/criteria-scores";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { FilterableComparison } from "@/components/product/filterable-comparison";
import { MethodologyBlock } from "@/components/product/methodology-block";
import { ProductReview } from "@/components/product/product-review";
import { ProductSchema } from "@/components/product/product-schema";
import { QuickPickPanel } from "@/components/product/quick-pick-panel";
import { WinnerCard } from "@/components/product/winner-card";
import { WinnerGrid } from "@/components/product/winner-grid";

import Kopguide from "@/content/brandslackare/kopguide.mdx";

/*
 * ⚠️ Priser, effektklasser, mått, temperaturområden, artikelnummer och
 * kundbetyg är riktiga, lästa på butikernas egna produktsidor på PRICE_CHECKED.
 * Kriteriebetygen är redaktionell bedömning utifrån de uppgifterna. Vi har inte
 * tänt eld på något, och det står på sidan.
 *
 * Kategorin är ovanlig på en punkt: effektklassen enligt EN 3 är ett
 * provningsframtaget prestandamått som står på varje etikett. Vi kan alltså
 * jämföra släckeffekt utan eget labb, till skillnad från i våra andra
 * kategorier.
 *
 * Viktningen ändrades 2026-08-02 efter att kriteriet för certifiering visat sig
 * mäta butikens produkttext i stället för produkten. Släckeffekt väger nu 40 och
 * tillförlitlighet 15. Se lib/data/brandslackare.ts.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårade och dofollow.
 * Se lib/links.ts.
 */

const CATEGORY = BRANDSLACKARE;
const PAGE_URL = `/${CATEGORY.slug}`;
const UPDATED = "2026-08-02";

export const metadata: Metadata = {
  title: CATEGORY.title,
  description:
    "Räddningstjänsten säger sex kilo pulver, men två sexkilos som ser identiska ut kan skilja 28 procent i släckeffekt. Vi jämförde sju släckare från 349 till 699 kronor och läste koden på varje etikett.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: CATEGORY.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "effektklassen", label: "Vilken som klarar mest brand" },
  { id: "jamforelse", label: "Jämför alla sju" },
  { id: "recensioner", label: "Recensioner av varje släckare" },
  { id: "andra-slackare", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function BrandslackarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = BRANDSLACKARE_PRODUCTS;
  const [winner] = products;
  const author = DEFAULT_AUTHOR;
  const reviewer = DEFAULT_REVIEWER;

  return (
    <>
      <ProductSchema
        category={CATEGORY}
        products={products}
        pageUrl={PAGE_URL}
        author={author}
        reviewed={UPDATED}
      />

      <Container size="wide" className="pt-6">
        <Breadcrumbs items={categoryTrail(CATEGORY)} schema />
      </Container>

      {/* ------------------------------------------------ above the fold -- */}
      <Container
        size="wide"
        className="pt-3 pb-[var(--space-section)] lg:pt-[var(--space-section)]"
      >
        <div className="grid gap-[var(--space-block)] lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-row">
            <h1 className="text-h1">{CATEGORY.title}</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              På varje brandsläckare står en kod: 55A 233B C. Den är det enda
              måttet på hur mycket eld släckaren faktiskt klarar, den är
              framtagen genom provning, och ingen svensk jämförelse förklarar
              den. Vi jämförde sju släckare från 349 till 699 kronor. Två
              sexkilos som ser identiska ut i hyllan skiljer 28 procent i
              släckyta, och priset följer inte skillnaden.
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
            title={`${CATEGORY.label} · Bäst i test`}
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
          className="mt-[var(--space-block)] lg:hidden"
        />
      </Section>

      {/* -------------------------------------------------- effektklassen -- */}
      {/* Ligger högt med flit. Utan den här förklaringen är tabellen nedanför
          obegriplig, och den är hela skälet till att sidan finns. */}
      <Section
        id="effektklassen"
        width="default"
        title="Vilken som klarar mest brand"
        description="Koden på etiketten är kategorins enda prestandamått, och den är framtagen genom provning enligt EN 3. Här är vad den betyder."
      >
        <Prose>
          <p>
            <strong>A-talet</strong> gäller brand i fasta material som trä,
            papper och textil, och anger hur stor brand släckaren klarar. Kjell
            översätter det på sin produktsida: 55A betyder släckyta upp till 5,5
            meter från släckaren.
          </p>
          <p>
            <strong>B-talet</strong> gäller brinnande vätska. 233B betyder 233
            liter bensin, olja eller färg. <strong>C</strong> betyder att den
            även klarar gasbränder.
          </p>
          <p>
            Skillnaden mellan 55A och 43A är alltså tjugoåtta procent släckyta,
            på två sexkilos som ser identiska ut i hyllan. I vår jämförelse
            kostar en 55A 579 kronor och en 43A 529, medan den dyraste släckaren
            på 699 kronor inte är den med högst klass.
          </p>
          <p>
            Det är därför kriteriet väger trettio procent, och det är därför
            sidan finns. Siffran står på varje förpackning och nämns inte i en
            enda svensk jämförelse vi mätt.
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
        title={`De ${products.length} bästa brandsläckarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla sju"
        description="Raden att läsa först är Effektklass. Därefter Typgodkännande, som bara en av sju butiker skriver ut och en skriver ut motsatsen till."
      >
        <FilterableComparison
          products={products}
          filters={BRANDSLACKARE_FILTERS}
          legend="Filtrera på storlek, klass och godkännande"
          layout={style.table}
          variant="bordered"
          caption={`Priser kontrollerade ${PRICE_CHECKED} hos respektive butik och kan ha ändrats sedan dess. Där en uppgift står som ej angiven betyder det att butiken inte publicerar den, inte att egenskapen saknas. En av släckarna var slut vid kontrollen.`}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje släckare"
        description="Alla sju bedöms mot samma fem kriterier. Effektklassen är provad enligt EN 3 av ett certifieringsorgan, inte av oss."
      >
        <div className="flex flex-col gap-[var(--space-block)]">
          {products.map((product, i) => (
            <ProductReview key={product.id} product={product} rank={i + 1}>
              <p className="text-muted-foreground">{product.verdict}</p>
              <CriteriaScores
                criteria={CATEGORY.criteria}
                scores={product.scores}
                size="sm"
                className="mt-1"
              />
            </ProductReview>
          ))}
        </div>
      </Section>

      <Section
        id="andra-slackare"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster som inte hamnade i rankningen, inklusive skum och kolsyra som i praktiken inte säljs till privatpersoner i Sverige."
      >
        <ConsideredList items={BRANDSLACKARE_CONSIDERED} />
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
        description="Viktningen nedan är exakt den som räknar fram betygen på den här sidan."
      >
        <MethodologyBlock
          criteria={CATEGORY.criteria}
          intro={CATEGORY.methodology}
          variant="cards"
          footnote="Den här kategorin skiljer sig från våra övriga på en punkt: effektklassen enligt EN 3 är ett prestandamått som provats fram av ett certifieringsorgan och står på varje etikett. Vi behöver alltså inte tända eld på något för att kunna jämföra släckeffekt, och gör det inte heller. Kriteriet för certifiering mäter vad butiken faktiskt skriver ut. En butik som anger typgodkännande får full poäng, en som inte nämner standarden får mittbetyg, eftersom en utelämnad uppgift inte bevisar att godkännandet saknas, och bara den som uttryckligen skriver att släckaren inte är klassad får bottenbetyg. Utan den regeln hade kriteriet straffat butiker för dålig produkttext i stället för att belöna dokumenterat godkännande. Priserna är hos den butik vi länkar till. Vi tar inte betalt för placeringar, och affiliatelänkar påverkar varken betyg eller ordning."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi testar inte produkterna fysiskt. Det här är vad vi gör i stället, och hur vi tjänar pengar."
      >
        <TrustBlock />
        <div className="mt-[var(--space-block)] grid gap-4 sm:grid-cols-2">
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
        title="Källor"
        description="Myndigheter och räddningstjänst för råden, standarden EN 3 för siffrorna, och butikernas egna produktsidor för de uppgifter vi jämfört."
      >
        <SourceList sources={BRANDSLACKARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={BRANDSLACKARE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "fireSafety", "pricing"]}
          className="mb-[var(--space-block)]"
        />
        <AffiliateDisclosure />
      </Container>
    </>
  );
}
