import type { Metadata } from "next";

import { categoryTrail, SMART_BRANDVARNARE } from "@/lib/categories";
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
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårade och dofollow.
 * Se lib/links.ts.
 */

const CATEGORY = SMART_BRANDVARNARE;
const PAGE_URL = `/${CATEGORY.slug}`;
const UPDATED = "2026-08-02";

export const metadata: Metadata = {
  title: CATEGORY.title,
  description:
    "Google la ner Nest Protect i mars 2025 och svenska jämförelser rankar den fortfarande. Vi jämförde åtta uppkopplade brandvarnare på vad appen gör och vad som fungerar den dag tillverkaren slutar.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: CATEGORY.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "nest-protect", label: "Vad Nest Protect lärde oss" },
  { id: "jamforelse", label: "Jämför alla åtta" },
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
              Google slutade tillverka Nest Protect den 28 mars 2025. Den var
              kategorins mest kända produkt, och flera svenska jämförelser rankar
              den fortfarande. Vi jämförde åtta uppkopplade brandvarnare på två
              saker: vad appen faktiskt gör, och vad som fortsätter fungera den
              dag tillverkaren tröttnar.
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
            markerad som utgången hos Proshop och slut hos Kjell.
          </p>
          <p>
            Slutsatsen är inte att smarta brandvarnare är dåliga. Den är att
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
        title="Jämför alla åtta"
        description="Raden att läsa noggrannast är Larmar utan app, eftersom den säger vad du har kvar om tjänsten stängs. Därefter Antal varnare, som avgör vad produkten kostar per rum."
      >
        <FilterableComparison
          products={products}
          filters={SMART_BRANDVARNARE_FILTERS}
          legend="Filtrera på vad som ingår"
          layout={style.table}
          variant="bordered"
          caption={`Priser kontrollerade ${PRICE_CHECKED} hos respektive butik och kan ha ändrats sedan dess. Housegard Luma-systemet är prissatt som tvåpack plus hubb, alltså den konfiguration som faktiskt når telefonen.`}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje varnare"
        description="Alla åtta bedöms mot samma fem kriterier. Ingen oberoende part har provat de här produkterna, och det gäller även oss."
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
        description="Viktningen nedan är exakt den som räknar fram betygen på den här sidan."
      >
        <MethodologyBlock
          criteria={CATEGORY.criteria}
          intro={CATEGORY.methodology}
          variant="cards"
          footnote="Det finns ingen oberoende provning av smarta brandvarnare att luta sig mot. Stiftung Warentest tänder visserligen eld på rökvarnare, men deras test omfattar vanliga och radiosammankopplade modeller. Smarta varnare testade de separat 2018, alltså åtta år sedan, och den undersökningen gäller produkter som inte längre säljs. De två svenska sidor som gjort en egen smart-jämförelse är båda affiliatefinansierade och redovisar ingen provning, och en tredje rankar en produkt Google lade ner i mars 2025. Vi rankar därför på specifikationer lästa på butikernas egna sidor, med datum, och säger det rakt ut i stället för att kalla det ett test. Priserna är hos den butik vi länkar till. Vi tar inte betalt för placeringar, och affiliatelänkar påverkar varken betyg eller ordning."
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
        description="Nedläggningen av Nest Protect är belagd i tre oberoende källor, varav en är First Alert själva. Övriga är svenska jämförelser, samtliga affiliatefinansierade, citerade för vad de utsett och inte som tester."
      >
        <SourceList sources={SMART_BRANDVARNARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={SMART_BRANDVARNARE_FAQ} schema />
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
