import type { Metadata } from "next";

import { testPageTrail, VATTENLARM } from "@/lib/test-pages";
import { VATTENLARM_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  VATTENLARM_CONSIDERED,
  VATTENLARM_FAQ,
  VATTENLARM_FILTERS,
  VATTENLARM_PRODUCTS,
} from "@/lib/data/vattenlarm";
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

import Kopguide from "@/content/vattenlarm/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, batterityper, batteritider, IP-klasser, EAN och
 * butiks-URL:er är riktiga, lästa på butikernas egna produktsidor på
 * PRICE_CHECKED. Kriteriebetygen är redaktionell bedömning utifrån de
 * specifikationerna, inte mätningar. Vi har inte provat ett enda larm, och det
 * står på sidan.
 *
 * Produktbilderna är butikernas egna packshots och ligger som WebP-masters
 * under public/bilder/vattenlarm.
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

const TEST_PAGE = VATTENLARM;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "X-Sense SWS54 är bäst i test: tre sensorer och basstation för 876 kronor, utan hubb och utan abonnemang. Vi jämförde nio vattenlarm från 179 kronor, varav tre aldrig når din telefon.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilket ska du köpa?" },
  { id: "tre-larmvagar", label: "Tre sätt att larma" },
  { id: "jamforelse", label: "Jämför alla nio" },
  { id: "recensioner", label: "Recensioner av varje larm" },
  { id: "andra-larm", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function VattenlarmPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = VATTENLARM_PRODUCTS;
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
              X-Sense SWS54 är bäst i test. För 876 kronor får du tre sensorer
              och en basstation, alltså det enda köpet här som täcker kök, tvätt
              och beredare på en gång och når din telefon utan att du äger en
              hubb sedan tidigare. Vi jämförde nio vattenlarm från 179 till 876
              kronor, och det avgörande är vad som händer när de känner vatten:
              tre tjuter bara där de ligger, tre kräver en hubb som kostar mer
              än larmet självt, och ett skickar ingen notis förrän du byggt en
              automation i appen. Snittkostnaden för en vattenskada är enligt
              Vattenskadecentrum 49 700 kronor.
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
        <TocNav
          variant="inline"
          entries={TOC}
          className="mt-block lg:hidden"
        />
      </Section>

      {/* ------------------------------------------------- tre larmvagar -- */}
      {/* Ligger högt med flit. Att två produkter i samma prisläge kan skilja
          sig i det enda som betyder något är det första en läsare behöver veta,
          och svaret får inte ligga nedanför en tabell där skillnaden syns som
          en rad bland tio. */}
      <Section
        id="tre-larmvagar"
        width="default"
        title="Tre sätt att larma"
        description="Alla nio känner vatten på golvet. Skillnaden ligger i vem som får veta, och det är den skillnaden viktningen bygger på."
      >
        <Prose>
          <p>
            <strong>Bara siren.</strong> Larmet tjuter där det ligger, ofta över
            hundra decibel. Det finns ingen app, inget konto och ingenting att
            koppla upp. Numens 204, Housegard och X-Sense SWS51 utan basstation
            fungerar så, och de kostar 190 till 230 kronor.
          </p>
          <p>
            <strong>Notis utan hubb.</strong> Larmet talar wifi rakt till din
            router och skickar en notis till telefonen. SQ400B gör det för 199
            kronor, samma pengar som ett larm med bara siren.
          </p>
          <p>
            <strong>Notis, men hubb krävs.</strong> Tapo T300, Aqara T1 och
            Fibaro kan inte nå din telefon på egen hand. De behöver en hubb av
            rätt märke, som säljs separat och normalt kostar mer än larmet. Har
            du redan hubben är de billigast i längden. Har du ingen har du köpt
            en tjutande dosa för 179 kronor.
          </p>
          <p>
            Frågan som avgör vilken sort du behöver är inte hur mycket du vill
            lägga, utan hur ofta bostaden står tom. En siren i ett tomt hus hörs
            inte, och en läcka som börjar på förmiddagen har hela arbetsdagen på
            sig. Väljaren i köpguiden ställer den frågan och två till.
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
        title={`De ${products.length} bästa vattenlarmen 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla nio"
        description="Filtrera på hur larmet når dig. Raden att läsa noggrannast är Hubb krävs, eftersom den avgör vad produkten faktiskt kostar. Därnäst Drifttemperatur, som avgör om larmet får ligga där du tänkt."
      >
        <FilterableComparison
          products={products}
          filters={VATTENLARM_FILTERS}
          legend="Filtrera på larmväg och underhåll"
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED)}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje larm"
        description="Alla nio bedöms mot samma fem kriterier, med larmvägen tyngst. Varje omdöme säger vad larmet gör, vad det kostar och vem som blir nöjd med det."
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
        id="andra-larm"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex produkter som fanns i urvalet men inte i rankningen. Två av dem är vattenfelsbrytare, som är en annan produkt i en annan prisklass, och en är utgången."
      >
        <ConsideredList items={VATTENLARM_CONSIDERED} />
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
          footnote={
            "Vi har inte provat de här larmen, och ingen annan har heller gjort det på ett sätt som går att kontrollera. Stiftung Warentest har inte testat kategorin, och de tyska sidor som ser ut som tester är jämförelsesajter utan mätvärden, varav en heter test-stiftung.de. Brandinfo har recenserat X-Sense-systemet, en av nio produkter, vilket är för lite för ett eget kriterium. Därför saknas kriteriet Omdöme i oberoende tester som finns på våra andra sidor.\n\n" +
            "Samtidigt påstår alla fem svenska konkurrentsidor i rubriker att de utfört egna tester, med avsnitt som Genomförandet av Testet, Så testar vi våra vattenlarm och Hur vi utförde detta test, utan att någon av dem redovisar ett enda mätvärde. De står namngivna i källistan, så påståendet går att kontrollera.\n\n" +
            "Specifikationerna i tabellen är hämtade hos tillverkarna, i flera fall ur manualen butiken själv länkar till. Priserna är hos den butik vi länkar till."
          }
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
        description="Svensk skadestatistik, försäkringsbolagens egna villkor och branschreglerna för kök, plus tillverkarnas specifikationer för varje larm i tabellen."
      >
        <SourceList sources={VATTENLARM_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={VATTENLARM_FAQ} schema />
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
