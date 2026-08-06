import type { Metadata } from "next";

import { testPageTrail, SKAFTDAMMSUGARE } from "@/lib/test-pages";
import { SOURCES_BY_HREF } from "@/lib/sources";
import {
  PRICE_CHECKED,
  SKAFTDAMMSUGARE_CONSIDERED,
  SKAFTDAMMSUGARE_FAQ,
  SKAFTDAMMSUGARE_FILTERS,
  SKAFTDAMMSUGARE_PRODUCTS,
} from "@/lib/data/skaftdammsugare";
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

import Kopguide from "@/content/skaftdammsugare/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, GTIN, drifttider, sugkraft, vikter, behållarvolymer,
 * filtreringsgrader, ljudnivåer och laddtider är riktiga. Priser och GTIN lästa
 * på butikernas egna produktsidor på PRICE_CHECKED. Drifttidsstegen är lästa i
 * Boschs tekniska datablad, hos Philips och Electrolux på tillverkarnas egna
 * sidor och hos NetOnNet och Kjell i butikens specifikationsruta.
 * Kriteriebetygen är redaktionell bedömning utifrån de specifikationerna, inte
 * mätningar. Vi har inte haft en enda maskin i handen, och det står på sidan.
 *
 * Produktbilderna är butikernas och Icecats packshots och ligger som
 * WebP-masters under public/bilder/skaftdammsugare.
 *
 * ⚠️ Råd & Rön förbjuder vidarepublicering av testresultat och betyg. Sidan får
 * säga att provningen finns, vilket datum den bär och vad det fria utdraget
 * säger om hela fältet, aldrig vad en enskild modell fick. Se lib/sources.ts.
 *
 * AFFILIATE-SWAP — LINK_MODE avgör hur länkarna byggs, se lib/links.ts. Av de
 * fem butikerna sidan länkar har vi program hos ingen; Kjell ligger i
 * Adtractions katalog på 5 procent och Proshop på 3,2, men ansökan är inte
 * inskickad. Alltså ingen provision och varken rel="sponsored" eller
 * annonsmärkning än.
 */

const TEST_PAGE = SKAFTDAMMSUGARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Bosch Unlimited 10 vinner för 6 498 kronor: batteriet lyfts ur och sitter i Power for All 18V, och motorn har tio års garanti. Vi jämförde åtta skaftdammsugare från 1 290 till 8 990 kronor och läste tillverkarnas egna datablad.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "drifttiden", label: "Dela drifttiden med fyra" },
  { id: "jamforelse", label: "Jämför alla åtta" },
  { id: "recensioner", label: "Recensioner av varje skaftdammsugare" },
  { id: "andra-skaftdammsugare", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function SkaftdammsugarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = SKAFTDAMMSUGARE_PRODUCTS;
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
              Bosch Unlimited 10 vinner för 6 498 kronor. Batteriet lyfts ur och
              byts mot ett laddat, det sitter i samma Power for All 18V som
              Boschs häcksax, och motorn har tio års garanti. Vi jämförde åtta
              skaftdammsugare från 1 290 till 8 990 kronor och läste
              tillverkarnas egna datablad, eftersom det är där drifttiden står
              för det läge du faktiskt städar i.
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
        <TocNav variant="inline" entries={TOC} className="mt-block lg:hidden" />
      </Section>

      {/* ---------------------------------------------------- the finding -- */}
      {/* Ligger högt med flit. Minuttalet är det varje konkurrent leder med och
          det enda på kartongen som är uppmätt i ett läge kategorin sällan
          används i. Läsaren behöver kunna räkna om det innan hon tittar i
          tabellen, annars läser hon fel rad. */}
      <Section
        id="drifttiden"
        width="default"
        title="Dela drifttiden med fyra"
        description="Fem tillverkare publicerar både ekotalet och turbotalet för samma maskin. De är påfallande överens om förhållandet mellan dem."
      >
        <Prose>
          <p>
            Minuttalet på kartongen gäller det svagaste läget, och hos flera
            tillverkare dessutom ett tillbehör utan motor. Det är alltså mätt
            utan den roterande borste som är hela skälet att köpa en
            skaftdammsugare i stället för en slang.
          </p>
          <p>
            De fem som anger båda talen landar på samma härad: Bosch Unlimited 10
            på 11 minuter mot 80, Philips 5000 Series på 15 mot 60, Electrolux
            Animal 700 på 10 mot 40, Electrolux Clean 500 på 13 mot 45 och Xiaomi
            G20 Lite på 15 mot 45.
          </p>
          <p>
            Kvoterna blir 0,14 till 0,33 och medianen en fjärdedel. Tumregeln är
            enkel: <strong>dela talet på kartongen med fyra.</strong> 60 minuter
            blir alltså omkring 15 med borsten igång, vilket räcker till ungefär
            50 kvadratmeter.
          </p>
          <p>
            Bosch går längst och anger fyra tal för samma maskin och samma
            batteri: 80 minuter i ekoläge utan elektriskt tillbehör, 65 i ekoläge
            med golvmunstycket, 25 i autoläge och 11 i turboläge. Råd & Rön mätte
            sju minuter till en kvart vid maximal effekt för de skaftdammsugare
            som toppar deras test av 65 modeller, alltså samma storleksordning.
          </p>
          <p>
            Det är också skälet till att batteri och drifttid väger 25 av 100 i
            vår viktning, lika tungt som munstycket. En skaftdammsugare som inte
            kommer runt bostaden blir en handdammsugare med långt skaft.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      {/* Parked. Hidden unless the admin toggle is on; kept in the template so
          new test pages still get the section. See lib/theme.ts. */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa skaftdammsugarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla åtta"
        description="Raden att läsa noggrannast är Turbo. Den säger hur länge maskinen orkar med borsten igång, och den skiljer mer mellan produkterna än priset gör."
      >
        <FilterableComparison
          products={products}
          filters={SKAFTDAMMSUGARE_FILTERS}
          legend="Filtrera på pris, batteri, filtrering och vikt"
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED)}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje skaftdammsugare"
        description="Alla åtta bedöms mot samma fem kriterier. Samtliga ingår i Råd & Röns provning av 65 skaftdammsugare, men betygen per modell ligger bakom betalvägg, så det finns inget kriterium för testomdöme här."
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
        id="andra-skaftdammsugare"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex maskiner som fanns i urvalet men inte i rankningen. En av dem har utgått ur handeln och en är för ny för att ha provats."
      >
        <ConsideredList items={SKAFTDAMMSUGARE_CONSIDERED} />
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
          footnote="Vi har inte haft en enda av de här maskinerna i handen. Underlaget är tillverkarnas egna datablad och produktsidor plus butikernas specifikationsrutor, alla lästa i original, och priserna är hämtade hos den butik vi länkar till. Kategorin har en riktig svensk labbprovning: Råd & Rön provade 46 golvdammsugare och 65 skaftdammsugare och publicerade 13 augusti 2025, och alla åtta maskiner här ingår. Betygen per modell ligger bakom en betalvägg vi inte betalat och Råd & Rön förbjuder vidarepublicering av testresultat, så det finns inget kriterium för testomdöme och ingen produkt bär ett betyg därifrån. Det vi använder är provprogrammet och de slutsatser som gäller hela fältet. Sugkraften vägs försiktigt, eftersom luftwatt och pascal är olika mått som dessutom mäts under olika villkor. Bosch, Dreame, Dyson och Xiaomi saknar betyg på enstaka rader i tabellen där uppgiften inte gått att belägga; vikten fördelas då om på övriga kriterier i stället för att ett tomrum ska bli ett avdrag."
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
        title="Källor"
        description="Åtta av de fjorton källorna är tillverkarnas egna datablad och produktsidor. Det är avsiktligt: de bär drifttiden per effektläge, och ingen jämförelse i kategorin återger den."
      >
        <SourceList sources={SOURCES_BY_HREF[PAGE_URL] ?? []} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={SKAFTDAMMSUGARE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
