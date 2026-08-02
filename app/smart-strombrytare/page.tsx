import type { Metadata } from "next";

import { categoryTrail, SMART_STROMBRYTARE } from "@/lib/categories";
import { SMART_STROMBRYTARE_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  SMART_STROMBRYTARE_FAQ,
  SMART_STROMBRYTARE_CONSIDERED,
  SMART_STROMBRYTARE_PRODUCTS,
} from "@/lib/data/smart-strombrytare";
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
import { ComparisonTable } from "@/components/product/comparison-table";
import { CriteriaScores } from "@/components/product/criteria-scores";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { MethodologyBlock } from "@/components/product/methodology-block";
import { ProductReview } from "@/components/product/product-review";
import { ProductSchema } from "@/components/product/product-schema";
import { QuickPickPanel } from "@/components/product/quick-pick-panel";
import { WinnerCard } from "@/components/product/winner-card";
import { WinnerGrid } from "@/components/product/winner-grid";

import Kopguide from "@/content/smart-strombrytare/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, maxlaster, mått, protokoll och butiks-URL:er är
 * riktiga, lästa ur butikernas egna sidor på PRICE_CHECKED. Ännu inte
 * publicerbar: kriteriebetygen är redaktionell bedömning utifrån källorna
 * snarare än mätningar.
 *
 * Behörighetsuppgifterna är återgivna från Elsäkerhetsverkets egna sidor och
 * länkade i källistan. De är sammandrag, inte juridisk rådgivning, och sidan
 * upprepar myndighetens egen uppmaning att kontakta ett elinstallationsföretag
 * vid minsta osäkerhet.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårade och dofollow.
 * Se lib/links.ts.
 */

const CATEGORY = SMART_STROMBRYTARE;
const PAGE_URL = `/${CATEGORY.slug}`;
const UPDATED = "2026-08-01";

export const metadata: Metadata = {
  title: CATEGORY.title,
  description:
    "Vi jämförde fem smarta strömbrytare och inbyggnadsreläer på nolledare, ekosystem och drift utan moln. Den typ alla rekommenderar kräver elektriker, och den du får montera själv nämns knappt.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: CATEGORY.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "jamforelse", label: "Jämför alla fem" },
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
              Vi jämförde fem smarta strömbrytare och inbyggnadsreläer, alltså
              det som sitter i väggdosan och inte i uttaget. Appen och
              röststyrningen skiljer mindre än marknadsföringen antyder.
              Skillnaden ligger i två frågor som avgörs innan du valt märke: om
              du har nolledare i dosan, och om produkten är något du får
              installera själv.
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
        title="Jämför alla fem"
        description="Samma kriterier och samma viktning för alla fem. Raden Nolledare avgör mer än någon annan: saknas nolla i din dosa faller fyra av fem bort direkt."
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
        description="Tre av fem saknar oberoende test och får då Ej testat på den raden. Det finns inget svenskt grupptest av inbyggnadsreläer, och de sidor som ser ut som ett har inte testat något själva. Vi sätter hellre ingenting än ett påhittat betyg, och vikten fördelas då på de övriga kriterierna."
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
        id="andra-brytare"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Sex produkter som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort. Fyra av dem är uteslutna på kategori och inte på kvalitet: dimrar gör något annat än att slå av och på, och en batteridriven brytarmodul bryter ingen ström alls."
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
        description="Viktningen nedan är exakt den som räknar fram betygen på den här sidan."
      >
        <MethodologyBlock
          criteria={CATEGORY.criteria}
          intro={CATEGORY.methodology}
          variant="cards"
          footnote="Saknas ett kriteriebetyg för en produkt fördelas det kriteriets vikt på de övriga. Plejd CTR-01, Tapo S110E och Philips inbyggnadsrelä saknar oberoende test och bedöms därför på 85 av 100 viktpoäng, vilket står i deras recensioner. Omdöme i oberoende tester väger 15 här mot 30 på vår smart plug-sida, eftersom bara två av fem produkter har ett publicerat test. Vi tar inte betalt för placeringar, och affiliatelänkar påverkar varken betyg eller ordning."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi testar inte alla produkterna själva fysiskt. Det här är vad vi faktiskt gör i stället, och hur vi tjänar pengar."
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
        title="Källor och andra tester"
        description="Betygen bygger på specifikationer, på Elsäkerhetsverkets regler för vad du får göra själv, och på de oberoende tester som finns. Underlaget är tunnare i den här kategorin än i någon annan vi jämfört, och det står i klartext i stället för att döljas."
      >
        <SourceList sources={SMART_STROMBRYTARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={SMART_STROMBRYTARE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "electrical", "pricing"]}
          className="mb-[var(--space-block)]"
        />
        <AffiliateDisclosure />
      </Container>
    </>
  );
}
