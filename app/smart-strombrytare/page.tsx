import type { Metadata } from "next";

import { testPageTrail, SMART_STROMBRYTARE } from "@/lib/test-pages";
import { SMART_STROMBRYTARE_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  SMART_STROMBRYTARE_FAQ,
  SMART_STROMBRYTARE_CONSIDERED,
  SMART_STROMBRYTARE_PRODUCTS,
} from "@/lib/data/smart-strombrytare";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
import { getStyle } from "@/lib/style-server";
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

import Kopguide from "@/content/smart-strombrytare/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, maxlaster, protokoll och butiks-URL:er är riktiga,
 * lästa ur butikernas egna sidor på PRICE_CHECKED. Måtten är lästa hos
 * tillverkarna 2026-08-06, med källa per produkt i lib/data. Kriteriebetygen är
 * redaktionell bedömning utifrån källorna snarare än mätningar, vilket står i
 * viktningen på sidan.
 *
 * Raden "Ännu inte publicerbar" stod kvar här långt efter att sidan gått live
 * den 3 augusti. Den är borttagen 2026-08-06.
 *
 * Behörighetsuppgifterna är återgivna från Elsäkerhetsverkets egna sidor och
 * länkade i källistan. De är sammandrag, inte juridisk rådgivning, och sidan
 * upprepar myndighetens egen uppmaning att kontakta ett elinstallationsföretag
 * vid minsta osäkerhet.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 * Se lib/links.ts.
 */

const TEST_PAGE = SMART_STROMBRYTARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Shelly 1 Gen4 för 269 kronor vinner: wifi, Bluetooth, Zigbee och Matter i samma modul, styrd lokalt utan molnkonto. Saknar dosan nolledare är Aqara H1 för 369 kronor den enda av de sex som fungerar ändå.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "jamforelse", label: "Jämför alla sex" },
  { id: "recensioner", label: "Recensioner av varje produkt" },
  { id: "andra-brytare", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function SmartStrombrytarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = SMART_STROMBRYTARE_PRODUCTS;
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
              Shelly 1 Gen4 kostar 269 kronor, talar wifi, Bluetooth, Zigbee
              och Matter i samma modul och styrs lokalt utan molnkonto. Den
              kräver nolledare i dosan, och saknas den bakom din knapp är Aqara
              H1 för 369 kronor den enda av de sex som fungerar ändå. Den frågan
              avgör köpet långt innan appen och röststyrningen gör det.
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

            {/* Desktop only. See smart-belysning for the reasoning: the hero's
                left column is shorter than the sticky rail beside it, and on a
                phone these pills would push the quick-pick below the fold. */}
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

      {/* -------------------------------------------------- ranked lists -- */}
      {/* Parked. Hidden unless the admin toggle is on; kept in the template so
          new category pages still get the section. See lib/theme.ts. */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa smarta strömbrytarna 2026`}
        description="Varje produkt fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sex"
        description="Samma kriterier och samma viktning för alla sex. Raden Nolledare avgör mer än någon annan: saknas nolla i din dosa faller fem av sex bort direkt."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={`Priser kontrollerade ${PRICE_CHECKED} hos Kjell & Company och kan ha ändrats sedan dess. Maxlast anges som tillverkaren själv anger den, vilket är skälet till att jämförelsen blandar ampere och watt: talet som gäller för belysning är ofta lägre än det som står i produktnamnet.`}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        tone="muted"
        width="wide"
        title="Recensioner av varje produkt"
        description="Sex moduler mellan 149,90 och 639 kronor, från den som bara lyder en fjärrkontroll till den som talar fyra protokoll i samma dosa."
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
        id="andra-brytare"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Fem produkter som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort. Fyra av dem är uteslutna på kategori och inte på kvalitet: dimrar gör något annat än att slå av och på, och en batteridriven brytarmodul bryter ingen ström alls."
      >
        <ConsideredList items={SMART_STROMBRYTARE_CONSIDERED} />
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
          footnote="Saknas ett kriteriebetyg för en produkt fördelas det kriteriets vikt på de övriga. Plejd CTR-01, Tapo S110E, Nexa infälld och Philips inbyggnadsrelä saknar oberoende test och bedöms därför på 85 av 100 viktpoäng. Omdöme i oberoende tester väger 15 här mot 30 på vår smart plug-sida, eftersom bara två av sex produkter har ett publicerat test."
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
        description="Betygen bygger på specifikationer, på Elsäkerhetsverkets regler för vad du får göra själv, och på de oberoende tester som finns."
      >
        <SourceList sources={SMART_STROMBRYTARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={SMART_STROMBRYTARE_FAQ} schema />
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
