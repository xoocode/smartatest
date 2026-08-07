import type { Metadata } from "next";

import { testPageTrail, BABYVAKT } from "@/lib/test-pages";
import { BABYVAKT_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  BABYVAKT_CONSIDERED,
  BABYVAKT_FAQ,
  BABYVAKT_FILTERS,
  BABYVAKT_PRODUCTS,
} from "@/lib/data/babyvakt";
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

import Kopguide from "@/content/babyvakt/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, GTIN, räckvidder, frekvensband, sändareffekter,
 * batterikapaciteter och larmbeteenden är riktiga. Priser och GTIN lästa på
 * butikernas egna produktsidor på PRICE_CHECKED, larmbeteendena i elva av
 * tillverkarnas egna manualer. Kriteriebetygen är redaktionell bedömning
 * utifrån de specifikationerna, inte mätningar. Vi har inte haft en enda
 * apparat i handen, och det står på sidan.
 *
 * Produktbilderna är butikernas egna packshots och ligger som WebP-masters
 * under public/bilder/babyvakt.
 *
 * ⚠️ Råd & Rön förbjuder vidarepublicering av testresultat och betyg. Sidan får
 * säga att provningen finns och vilket datum den bär, aldrig vad den kom fram
 * till. Betygen ligger i .agent/research/babyvakt.md.
 *
 * AFFILIATE-SWAP — LINK_MODE avgör hur länkarna byggs, se lib/links.ts. Ingen
 * av butikerna i kategorin har vi program hos, alltså ingen provision och
 * varken rel="sponsored" eller annonsmärkning än.
 */

const TEST_PAGE = BABYVAKT;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Babyvakt bäst i test 2026: elva babymonitorer jämförda från 399 kr. Hos två är larmet vid bruten kontakt avstängt från start. Se vilka.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "rackvidden", label: "Dela räckvidden med sex" },
  { id: "jamforelse", label: "Jämför alla elva" },
  { id: "recensioner", label: "Recensioner av varje babyvakt" },
  { id: "andra-babyvakter", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function BabyvaktPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = BABYVAKT_PRODUCTS;
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
              Vi rekommenderar CAPiDi Premium Baby Alarm för 1 399 kronor,
              eftersom den når 1 000 meter i fri sikt, ungefär 165 genom väggar
              och ut till förrådet. Den larmar med både ljud och blinkande ikon
              efter 30 sekunder om kontakten med babyenheten bryts.
              Vi jämförde elva babyvakter från 399 till 3 899 kronor och
              läste tillverkarnas egna manualer, eftersom det är där svaret står
              på vad apparaten gör den stund den slutar fungera.
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
      {/* Ligger högt med flit. Räckvidden är det tal varje konkurrent leder med
          och det enda på kartongen som är uppmätt i ett förhållande produkten
          aldrig används i. Läsaren behöver kunna räkna om det innan hon tittar
          i tabellen, annars läser hon fel rad. */}
      <Section
        id="rackvidden"
        width="default"
        title="Dela räckvidden med sex"
        description="Fyra tillverkare publicerar både talet inomhus och talet i fri sikt. De är påfallande överens om förhållandet mellan dem."
      >
        <Prose>
          <p>
            Räckvidden på kartongen är uppmätt utomhus utan hinder. Det är
            därför en apparat avsedd för en trerumslägenhet står angiven till
            800 meter. De fyra tillverkare som anger båda talen landar alla på
            ungefär samma kvot: Motorola PIP10 på 49 mot 305 meter, Philips
            Avent SCD892 på 50 mot 300, VTech DM1212 på 75 mot 460 och Alecto på
            50 mot 300.
          </p>
          <p>
            Det är 6,0 till 6,2 gånger hos fyra fabrikat som inte har något med
            varandra att göra. Tumregeln blir enkel:{" "}
            <strong>dela talet på kartongen med sex.</strong> CAPiDis 1 000
            meter blir ungefär 165 inomhus, Neonates 800 blir ungefär 130, och
            Motorola VM483:s 300 blir ungefär 50, alltså en våning upp och två
            rum bort men inte ut i garaget.
          </p>
          <p>
            Betong och plåt tar mer än gips och trä, så ett sextiotalshus med
            bjälklag av betong äter mer än en villa från nittiotalet. Räkna med
            sex som utgångspunkt och köp marginal om du bor i betong.
          </p>
          <p>
            Det är också skälet till att räckvidd bara väger 15 av 100 i vår
            viktning, trots att det är den siffra kategorin marknadsförs på.
            Tyngst väger i stället vad föräldraenheten gör när den tappar
            babyenheten, eftersom en babyvakt som tystnar låter precis som ett
            barn som sover.
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
        title={`De ${products.length} bästa babyvakterna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla elva"
        description="Raden att läsa noggrannast är Larm vid brott. Den säger vad apparaten gör den stund den slutar fungera, och den skiljer mer mellan produkterna än priset gör."
      >
        <FilterableComparison
          products={products}
          filters={BABYVAKT_FILTERS}
          legend="Filtrera på typ, larm och räckvidd"
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED)}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje babyvakt"
        description="Alla elva bedöms mot samma fem kriterier. Kategorin saknar aktuell oberoende provning, så det finns inget kriterium för testomdöme här."
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
        id="andra-babyvakter"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex produkter som fanns i urvalet men inte i rankningen. Två av dem är andningslarm, som är en annan produkt för en annan köpare."
      >
        <ConsideredList items={BABYVAKT_CONSIDERED} />
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
          footnote="Vi har inte haft en enda av de här babyvakterna i handen. Den enda svenska laboratorieprovningen av kategorin är Råd & Röns, publicerad 15 juni 2012, och ingen av de tretton modeller den provade säljs i svensk handel i dag. Därför saknas kriteriet Omdöme i oberoende tester som finns på flera av våra andra sidor. Underlaget är i stället elva av tillverkarnas egna manualer, lästa i original, plus butikernas produktsidor för pris och artikeluppgifter. Det som skiljer manualerna från butikstexten är just larmbeteendet: ingen svensk produktsida beskriver fullständigt vad föräldraenheten gör när den tappar babyenheten. Sändareffekten vägs inte in, eftersom butikernas och tillverkarnas tal för samma apparat skiljer sig åt och eftersom lägre effekt betalas med kortare räckvidd, som redan vägs. VTech RM5756HD saknar betyg på räckvidd: varken tillverkaren eller butiken anger ett metertal för länken mellan enheterna, och att sätta ett lågt betyg på något vi inte har vore att betygsätta vår egen research. Vikten fördelas om på de övriga kriterierna i stället. Priserna är hos den butik vi länkar till."
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
        description="Elva av de sexton källorna är tillverkarnas egna manualer. Det är avsiktligt: de besvarar frågan hela sidan vilar på, och ingen butikstext i kategorin gör det."
      >
        <SourceList sources={BABYVAKT_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={BABYVAKT_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
