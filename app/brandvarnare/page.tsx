import type { Metadata } from "next";

import { BRANDVARNARE, categoryTrail } from "@/lib/categories";
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

import Kopguide from "@/content/brandvarnare/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, batterier, batteritider, frekvenser, systemstorlekar,
 * ljudnivåer, EAN och kundbetyg är riktiga, lästa på butikernas egna
 * produktsidor på PRICE_CHECKED. Kriteriebetygen är redaktionell bedömning
 * utifrån de specifikationerna. Vi har inte tänt eld på något, och det står på
 * sidan.
 *
 *
 * Två av de rankade produkterna var slut hos Kjell vid kontrollen och är
 * markerade i sina specifikationer. Kör om priskontrollen före lansering.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårade och dofollow.
 * Se lib/links.ts.
 */

const CATEGORY = BRANDVARNARE;
const PAGE_URL = `/${CATEGORY.slug}`;
const UPDATED = "2026-08-02";

export const metadata: Metadata = {
  title: CATEGORY.title,
  description:
    "Vi jämförde tio brandvarnare från 139 till 646 kronor. Fyra kan larma tillsammans, sex kan det inte, och det är den skillnaden som avgör om en brand i källaren väcker den som sover en trappa upp.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: CATEGORY.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
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
              Vi jämförde tio brandvarnare från 139 till 646 kronor. Alla känner
              rök, alla klarar standardens 85 decibel och alla är optiska. Det
              som skiljer dem åt är om de larmar tillsammans: fyra kan, sex kan
              inte. Det är den skillnaden som avgör om en brand i tvättstugan
              väcker någon som sover två våningar upp.
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
            Fyra av de tio klarar det. Frekvensen spelar dessutom roll och nämns
            nästan aldrig: 868 MHz tar sig genom betongbjälklag bättre än 433,
            vilket är precis den sträcka signalen ska klara.
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
          caption={`Priser kontrollerade ${PRICE_CHECKED} hos respektive butik och kan ha ändrats sedan dess. Två av produkterna var slut hos Kjell vid kontrollen, vilket står i deras specifikationer. Ljudnivå anges som ej angiven där butiken inte publicerar den; alla varnare som säljs lagligt klarar minst 85 dB.`}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje varnare"
        description="Alla tio bedöms mot samma fem kriterier. Raden Utsedd av visar vilka publicerade jämförelser som rankat produkten, eftersom det kriteriet räknar dem."
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
        description="Viktningen nedan är exakt den som räknar fram betygen på den här sidan."
      >
        <MethodologyBlock
          criteria={CATEGORY.criteria}
          intro={CATEGORY.methodology}
          variant="cards"
          footnote="Vi har inte tänt eld på något. Den enda verkliga brandprovningen i kategorin är Stiftung Warentests, och de testade den tyska marknaden: Ei Electronics, Abus, Busch-Jaeger, Pyrexx, Cavius och Hekatron. Ingen av de tio varnare vi rankar ingick, och deras vinnare Ei650 säljs inte hos någon svensk butik vi bevakar. Därför heter vårt kriterium omdöme i publicerade jämförelser och inte testomdöme: det räknar hur många av de sex svenska jämförelserna som utsett produkten till vinnare eller topplacering. Fyra av dem tjänar pengar på affiliatelänkar, tre av dem mot samma butiker som vi, och ingen redovisar ett mätvärde. Vi räknar dem ändå, men vi säger vilka de är, och en produkt som tillverkaren lagt ner får aldrig poäng här oavsett hur många som rankat den. Priserna är hos den butik vi länkar till. Vi tar inte betalt för placeringar, och affiliatelänkar påverkar varken betyg eller ordning."
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
        title="Källor och andra jämförelser"
        description="En verklig brandprovning och sex svenska jämförelser, var och en med en not om vad den faktiskt är. Fyra av dem är affiliatefinansierade, precis som vi."
      >
        <SourceList sources={BRANDVARNARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={BRANDVARNARE_FAQ} schema />
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
