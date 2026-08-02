import type { Metadata } from "next";

import { categoryTrail, ELEKTRISK_RULLGARDIN } from "@/lib/categories";
import { ELEKTRISK_RULLGARDIN_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  ELEKTRISK_RULLGARDIN_CONSIDERED,
  ELEKTRISK_RULLGARDIN_FAQ,
  ELEKTRISK_RULLGARDIN_FILTERS,
  ELEKTRISK_RULLGARDIN_PRODUCTS,
} from "@/lib/data/elektrisk-rullgardin";
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

import Kopguide from "@/content/elektrisk-rullgardin/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, GTIN och butiks-URL:er är riktiga, lästa ur
 * butikernas egen JSON-LD på PRICE_CHECKED. Fortfarande inte publicerbar:
 * kriteriebetygen är redaktionell bedömning utifrån källorna snarare än
 * mätningar.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårade och dofollow.
 * Se lib/links.ts.
 */

const CATEGORY = ELEKTRISK_RULLGARDIN;
const PAGE_URL = `/${CATEGORY.slug}`;
const UPDATED = "2026-08-01";

export const metadata: Metadata = {
  title: CATEGORY.title,
  description:
    "Vi jämförde åtta motorer för rullgardin, gardin och persienn på passform, ljudnivå och batteritid. Upphängningen avgör vad du kan köpa, och IKEA säljer inte längre några elektriska rullgardiner.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: CATEGORY.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "ikea", label: "IKEA har lämnat kategorin" },
  { id: "jamforelse", label: "Jämför alla åtta" },
  { id: "recensioner", label: "Recensioner av varje motor" },
  { id: "andra-motorer", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function SmartaGardinerPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = ELEKTRISK_RULLGARDIN_PRODUCTS;
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
      {/* Mobile trims the top: breadcrumb pt-6 plus a full section pad left a
          canyon between the trail and the h1 on a phone. Explicit paddings
          rather than pad-section + an override, because tailwind-merge cannot
          see a custom @utility and the winner would fall to stylesheet order. */}
      <Container
        size="wide"
        className="pt-3 pb-[var(--space-section)] lg:pt-[var(--space-section)]"
      >
        <div className="grid gap-[var(--space-block)] lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-row">
            <h1 className="text-h1">{CATEGORY.title}</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vi jämförde åtta motorer som gör rullgardinen, gardinen eller
              persiennen du redan har elektrisk. Det som avgör köpet är inte
              märket utan vad som hänger i fönstret, för motorerna säljs som
              olika artikelnummer för kedja, skena och stång. Sedan kommer
              ljudet, och där är det bara en tillverkare som talar om vad
              produkten låter.
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

            {/* Desktop only. The hero's left column is shorter than the
                quick-pick rail beside it, so the jump list fills real estate
                that was empty and puts navigation above the fold. On a phone
                the column is the whole width and the pills would push the
                quick-pick panel below the fold, so there they stay further
                down. */}
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
        {/* Mobile counterpart of the hero jump list. Only one renders at a
            time, so `display: none` keeps the hidden copy out of the
            accessibility tree rather than duplicating a landmark. */}
        <TocNav
          variant="inline"
          entries={TOC}
          className="mt-[var(--space-block)] lg:hidden"
        />
      </Section>

      {/* ---------------------------------------------------------- IKEA -- */}
      {/* Ligger högt med flit. Det är sidans enda uppgift som ingen annan
          svensk sida har rätt, och den som söker "FYRTUR ersättare" ska inte
          behöva scrolla förbi en jämförelsetabell för att hitta svaret. */}
      <Section
        id="ikea"
        width="default"
        title="IKEA har lämnat kategorin"
        description="Nästan alla guider och tester rekommenderar fortfarande IKEA FYRTUR. Det rådet går inte längre att följa."
      >
        <Prose>
          <p>
            IKEA skriver själva, i sin egen kundtjänst, att{" "}
            <strong>
              TREDANSEN och PRAKTLYSING rullgardiner inom Home Smart har utgått
              ur sortimentet under hösten 2025
            </strong>
            . FYRTUR och KADRILJ försvann dessförinnan.
          </p>
          <p>
            När vi kontrollerade den 1 augusti 2026 ledde både FYRTUR-sidan och
            TREDANSEN-sidan vidare till vanliga rullgardiner utan motor. IKEA:s
            kategorisida för elektriska rullgardiner ligger däremot kvar, med
            säljtexten om att styra dina smarta rullgardiner med medföljande
            fjärrkontroll intakt. Sidan innehåller inte en enda produkt.
          </p>
          <p>
            Det finns två vägar för den som letar en ersättare. En komplett
            motoriserad rullgardin, där SwitchBot Roller Shade är det närmaste
            som säljs i svensk handel. Eller en motor som drar i kedjan på den
            rullgardin du redan har, vilket kostar ungefär en tredjedel. Båda
            finns i jämförelsen nedan.
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
        title={`De ${products.length} bästa rullgardins- och gardinmotorerna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla åtta"
        description="Filtrera på vad du har i fönstret. Att persienn bara ger en träff är inte en lucka i vår genomgång utan i det svenska utbudet."
      >
        <FilterableComparison
          products={products}
          filters={ELEKTRISK_RULLGARDIN_FILTERS}
          legend="Filtrera på vad du har i fönstret"
          layout={style.table}
          variant="bordered"
          caption={`Priser kontrollerade ${PRICE_CHECKED} hos respektive butik och kan ha ändrats sedan dess.`}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje motor"
        description="Två av åtta produkter saknar ett publicerat omdöme om just den modellen och får då Ej testat på den raden. Vi sätter hellre ingenting än ett gissat betyg, och vikten fördelas då på de övriga kriterierna."
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
        id="andra-motorer"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex produkter som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort. Tre av dem är 230 V-moduler som kräver elektriker."
      >
        <ConsideredList items={ELEKTRISK_RULLGARDIN_CONSIDERED} />
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
          footnote="Saknas ett kriteriebetyg för en produkt fördelas det kriteriets vikt på de övriga. Aqara Roller Shade Driver E1 och Nedis SmartLife saknar publicerat test och bedöms därför på 90 av 100 viktpoäng, vilket står i deras recensioner. Priset i tabellen är priset hos den butik vi länkar till, inte marknadens lägsta: Inet är billigare på tre produkter men ingår inte i något affiliatenätverk, och vi visar hellre det pris du faktiskt betalar när du klickar. Det drar ner prisvärdet för de produkterna. Vi tar inte betalt för placeringar, och affiliatelänkar påverkar varken betyg eller ordning."
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
        description="Det finns inget svenskt eller nordiskt grupptest av gardinmotorer. De nordiska tester som finns gäller IKEA Fyrtur, alltså en produkt som utgått, och de citeras därför som dokumentation och aldrig som betygsunderlag."
      >
        <SourceList sources={ELEKTRISK_RULLGARDIN_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={ELEKTRISK_RULLGARDIN_FAQ} schema />
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
