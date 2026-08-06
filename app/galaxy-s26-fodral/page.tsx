import type { Metadata } from "next";
import Link from "next/link";

import { testPageTrail, GALAXY_S26_FODRAL } from "@/lib/test-pages";
import { GALAXY_S26_FODRAL_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  GALAXY_S26_FODRAL_FAQ,
  GALAXY_S26_FODRAL_CONSIDERED,
  GALAXY_S26_FODRAL_PRODUCTS,
} from "@/lib/data/galaxy-s26-fodral";
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

import Kopguide from "@/content/galaxy-s26-fodral/kopguide.mdx";

/*
 * ⚠️ Produkter, priser och butiks-URL:er är verkliga, lästa hos TheMobileStore
 * på PRICE_CHECKED.
 *
 * ⚠️ SIDANS FYND: magneten nästan varje fodral utlovar är spännet som håller
 * locket stängt, inte en laddmagnet. Två fodral laddar trådlöst genom sig och
 * ett bär magnettillbehör, medan fem tillverkare anger rakt ut att deras
 * fodral gör varken eller. Förväxlingen är särskilt dyr här eftersom Galaxy
 * S26 saknar inbyggda Qi2-magneter, se /galaxy-s26-skal. Tabellen bär därför
 * två skilda kolumner i stället för en.
 *
 * ⚠️ Inget fodral här är provat, varken av oss eller av någon annan.
 * Kategorin saknar oberoende provning helt, och därför finns inget kriterium
 * för testomdöme.
 *
 * ⚠️ Raderna Angivet RFID-skydd och Tjocklek är borttagna 2026-08-06: ingen av
 * de tolv produkterna hade ett värde, alltså en rad som bara stod tom. Raden
 * Fotofack föll samma dag av samma skäl i mildare form: en produkt av tolv
 * hade ett värde, och det värdet ligger nu i dess Kortfack-cell i stället.
 *
 * ⚠️ En rad är en konstruktion och inte ett mönster. Kategorin har 35 artiklar
 * till basmodellen men omkring tretton konstruktioner.
 *
 * ⚠️ H1 säger plånboksfodral och inte bara fodral, eftersom ordet fodral bär
 * två betydelser i svensk handel. Samma lösning som /iphone-fodral.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 */

const TEST_PAGE = GALAXY_S26_FODRAL;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Gear Plånboksfodral för 199 kr vinner: tre kortfack, eget sedelfack och trådlös laddning genom fodralet. Vi jämför tolv plånboksfodral till Galaxy S26 från 89 till 479 kronor.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilket ska du köpa?" },
  { id: "magneten", label: "Magneten är spännet, inte laddaren" },
  { id: "jamforelse", label: "Jämför alla tolv" },
  { id: "recensioner", label: "Recensioner av varje fodral" },
  { id: "andra-fodral", label: "Andra fodral vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function GalaxyS26FodralPage() {
  const style = await getStyle();
  const products = GALAXY_S26_FODRAL_PRODUCTS;
  const [winner] = products;
  const author = DEFAULT_AUTHOR;
  const reviewer = DEFAULT_REVIEWER;

  return (
    <>
      <ProductSchema
        testPage={TEST_PAGE}
        products={products}
        pageUrl={PAGE_URL}
        author={author}
        reviewed={UPDATED}
        sections={TOC}
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
            <h1 className="text-h1">
              Galaxy S26 plånboksfodral bäst i test 2026: tolv uppfällbara
              fodral, från 89 till 479 kr
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Gear Plånboksfodral för 199 kronor vinner, därför att det har tre
              kortfack, ett separat sedelfack och låter telefonen ligga kvar på
              laddplattan. Ska plånboken rymmas billigare tar Tender tre fickor
              för 129 kronor. Och nästan varje fodral här utlovar en magnet som
              inte är den du tror.
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

      {/* ---------------------------------------- fyndet, före tabellen -- */}
      <Section
        id="magneten"
        width="default"
        title="Magneten är spännet, inte laddaren"
      >
        <Prose>
          <p>
            Om du läst vår jämförelse av{" "}
            <Link href="/galaxy-s26-skal">skyddsskal till Galaxy S26</Link> vet
            du redan det viktigaste om den här telefonen: den saknar inbyggda
            Qi2-magneter. Samsung sålde in det som tunnare design, och säljer
            samtidigt en magnetisk powerbank och en magnetladdare till serien.
            På ett skyddsskal är magnetringen därför det som avgör om
            tillbehören fäster.
          </p>
          <p>
            Kommer du hit med den kunskapen och börjar leta efter ordet magnet
            hittar du det överallt. Magnetisk stängning. Kraftfull
            magnetstängning. Dubbel magnetstängning. Stark magnet.
          </p>
          <p>
            <strong>Det är spännet som håller locket stängt.</strong> Det har
            ingenting med laddning att göra.
          </p>
          <p>
            Två fodral laddar trådlöst genom sig, och ett enda bär magnetiska
            tillbehör som en laddare eller en bilhållare. Fem tillverkare anger
            tvärtom rakt ut att deras fodral varken gör det ena eller det andra,
            samtidigt som magnetstängningen står som en fördel i samma
            produkttext. Det är hela skillnaden, och den syns inte i
            produktnamnet.
          </p>
          <p>
            Därför har tabellen nedan två kolumner där andra jämförelser har en:
            en för vad magneten gör, och en för om laddning fungerar genom
            fodralet. Står det nej i den andra ska telefonen ur varje kväll,
            vilket är ett fumligt moment när det ligger kort i locket.
          </p>
          <p>
            Laddar du med sladd spelar hela den här frågan ingen roll för dig,
            och då öppnar sig hyllan. Det står i varje omdöme vilka fodral som
            duger ändå.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        tone="muted"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa Galaxy S26-fodralen 2026`}
        description="Varje fodral fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tolv"
        description="Samma kriterier och samma viktning för alla tolv fodralen. Läs de två magnetkolumnerna tillsammans: den ena säger vad magneten gör, den andra om telefonen kan laddas utan att tas ur."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED)}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        tone="muted"
        width="wide"
        title="Recensioner av varje fodral"
        description="Tolv fodral mellan 89 och 479 kronor, bedömda på vad som får plats, hur telefonen sitter fast och om den kan laddas utan att tas ur."
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
        id="andra-fodral"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra fodral vi övervägde"
        description="Sex fodral som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort. Fyra av dem går inte längre att köpa."
      >
        <ConsideredList items={GALAXY_S26_FODRAL_CONSIDERED} />
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
          footnote="Viktningen är densamma som på jämförelsen av iPhone-fodral, efter användarbeslut, vilket gör systersidorna direkt jämförbara."
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
        description="Samsungs egna uppgifter om serien, militärstandarden i tre utgåvor, och den svenska guide som täcker både skal och fodral."
      >
        <SourceList sources={GALAXY_S26_FODRAL_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={GALAXY_S26_FODRAL_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
