import type { Metadata } from "next";

import { testPageTrail, SMART_BRANDVARNARE } from "@/lib/test-pages";
import { SMART_BRANDVARNARE_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  SMART_BRANDVARNARE_CONSIDERED,
  SMART_BRANDVARNARE_FAQ,
  SMART_BRANDVARNARE_FILTERS,
  SMART_BRANDVARNARE_PRODUCTS,
} from "@/lib/data/smart-brandvarnare";
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

import Kopguide from "@/content/smart-brandvarnare/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, batterityper, batteritider, protokoll, ljudnivåer,
 * mått, GTIN och kundbetyg är riktiga, lästa på butikernas egna produktsidor på
 * PRICE_CHECKED. Kriteriebetygen är redaktionell bedömning utifrån de
 * specifikationerna. Vi har inte tänt eld på något, och det står på sidan.
 *
 * Nedläggningen av Google Nest Protect är belagd i tre oberoende källor, varav
 * en är First Alert själva. Se lib/sources.ts.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 * Se lib/links.ts.
 */

const TEST_PAGE = SMART_BRANDVARNARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Housegard Luma-systemet vinner för 1 098,90 kronor: varnarna larmar ihop över egen radio även utan hubb, app och internet. Nio uppkopplade brandvarnare jämförda på app, oberoende och pris per skyddat rum.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "nest-protect", label: "Vad Nest Protect lärde oss" },
  { id: "jamforelse", label: "Jämför alla nio" },
  { id: "recensioner", label: "Recensioner av varje varnare" },
  { id: "andra-varnare", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra jämförelser" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function SmartBrandvarnarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = SMART_BRANDVARNARE_PRODUCTS;
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
              Housegard Luma-systemet är bäst i test för 1 098,90 kronor. Det
              är den enda lösningen här där varnarna larmar ihop över egen
              radio helt utan hubben, alltså tjuter det i sovrummet när det
              brinner i källaren även vid strömavbrott och även den dag appen
              stängs av. Ska fler än fyra rum täckas är X-Sense FS61 billigare:
              316 kronor per skyddat rum mot 549.
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

      {/* --------------------------------------------------- nest protect -- */}
      {/* Ligger högt med flit. Det är sidans skäl att existera och förklarar
          varför ett kriterium som ingen konkurrent har väger en fjärdedel. */}
      <Section
        id="nest-protect"
        width="default"
        title="Vad Nest Protect lärde oss"
        description="Kategorins mest kända produkt lades ner efter exakt tio år. En brandvarnare ska sitta uppe i tio."
      >
        <Prose>
          <p>
            Google Nest Protect lanserades 2015. Den 28 mars 2025 upphörde Google
            med tillverkningen och hänvisar i dag till First Alerts SC5, som är
            byggd för att passa Nest Protects befintliga fästplatta. Befintliga
            enheter fungerar och får säkerhetsuppdateringar sin tioåriga
            livslängd ut.
          </p>
          <p>
            Ändå ligger den kvar i svenska jämförelser. En av dem, daterad 2026,
            rankar den som en av åtta rekommenderade modeller. Vi hittade den
            markerad som utgången hos Proshop.
          </p>
          <p>
            Smarta brandvarnare är alltså inte dåliga. Men
            <strong> vad som händer när tillverkaren slutar</strong> är en
            köpfråga i den här kategorin, inte en filosofisk fråga. Därför är den
            ett eget kriterium här och väger en fjärdedel av betyget.
          </p>
          <p>
            Skillnaden är stor. En varnare på ett öppet protokoll lyder din egen
            styrenhet och påverkas inte alls. En varnare som larmar ihop över
            egen radio behåller larmet och tappar bara notiserna. En varnare vars
            hela funktion går genom tillverkarens moln blir en vanlig siren.
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
        title={`De ${products.length} bästa smarta brandvarnarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla nio"
        description="Raden att läsa noggrannast är Larmar utan app, eftersom den säger vad du har kvar om tjänsten stängs. Därefter Antal varnare, som avgör vad produkten kostar per rum."
      >
        <FilterableComparison
          products={products}
          filters={SMART_BRANDVARNARE_FILTERS}
          legend="Filtrera på vad som ingår"
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Housegard Luma-systemet är prissatt som tvåpack plus hubb, den konfiguration som faktiskt når telefonen.`)}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje varnare"
        description="Vad varje varnare gör, vad den kostar per skyddat rum och vem den passar. Alla nio bedöms mot samma fem kriterier och samma viktning."
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
        description="Sex produkter som fanns i urvalet men inte i rankningen. Först den som fortfarande toppar andras listor och inte går att köpa."
      >
        <ConsideredList items={SMART_BRANDVARNARE_CONSIDERED} />
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
          footnote="Det finns ingen oberoende provning av smarta brandvarnare att luta sig mot. Stiftung Warentest tänder visserligen eld på rökvarnare, men deras test omfattar vanliga och radiosammankopplade modeller. Smarta varnare testade de separat 2018, åtta år sedan, och den undersökningen gäller produkter som inte längre säljs. De två svenska sidor som gjort en egen smart-jämförelse redovisar ingen provning alls, och en tredje rankar en produkt Google lade ner i mars 2025. Vi rankar därför på specifikationer lästa på butikernas egna sidor, med datum, och kallar det inte ett test. Priserna är hos den butik vi länkar till."
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
        description="Nedläggningen av Nest Protect är belagd i tre oberoende källor, varav en är First Alert själva. Övriga är svenska jämförelser, citerade för vad de utsett och inte som tester."
      >
        <SourceList sources={SMART_BRANDVARNARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={SMART_BRANDVARNARE_FAQ} schema />
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
