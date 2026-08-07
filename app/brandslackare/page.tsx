import type { Metadata } from "next";

import { BRANDSLACKARE, testPageTrail } from "@/lib/test-pages";
import { BRANDSLACKARE_SOURCES } from "@/lib/sources";
import {
  BRANDSLACKARE_CONSIDERED,
  BRANDSLACKARE_FAQ,
  BRANDSLACKARE_FILTERS,
  BRANDSLACKARE_PRODUCTS,
  PRICE_CHECKED,
  SPECS_CHECKED,
} from "@/lib/data/brandslackare";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
import { getStyle } from "@/lib/style-server";
import { NOT_STATED, priceCaption } from "@/lib/captions";
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

import Kopguide from "@/content/brandslackare/kopguide.mdx";

/*
 * ⚠️ Priser är lästa på butikernas egna sidor på PRICE_CHECKED. Effektklasser,
 * certifieringar, mått, vikter, temperaturområden och artikelnummer kommer från
 * tillverkarnas och importörernas egna specifikationer på SPECS_CHECKED.
 * Kriteriebetygen är redaktionell bedömning utifrån de uppgifterna. Vi har inte
 * tänt eld på något, och det står på sidan.
 *
 * Kategorin är ovanlig på en punkt: effektklassen enligt EN 3 är ett
 * provningsframtaget prestandamått som står på varje etikett. Vi kan alltså
 * jämföra släckeffekt utan eget labb, till skillnad från i våra andra
 * kategorier.
 *
 * Viktningen ändrades 2026-08-06. Kriteriet `tillforlitlighet` betygsatte om
 * butiken skrivit ut sitt typgodkännande, och researchen visade att sex av sju
 * gör det. De 15 poängen ligger nu på `placeringsfrihet`: SS-EN 3-7 kräver röd
 * färg, så en vit släckare får bara sitta i en privatbostad. Se
 * lib/data/brandslackare.ts och lib/corrections.ts.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 * Se lib/links.ts.
 */

const TEST_PAGE = BRANDSLACKARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Housegards röda sexkilos har högsta effektklassen 55A, är godkänd för utomhusbruk och kostar 699 kronor. Samma klass i vitt kostar 579, men får inte hänga i trapphuset. Sju släckare jämförda, 349 till 699 kronor.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "effektklassen", label: "Vilken som klarar mest brand" },
  { id: "jamforelse", label: "Jämför alla sju" },
  { id: "recensioner", label: "Recensioner av varje släckare" },
  { id: "andra-slackare", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function BrandslackarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = BRANDSLACKARE_PRODUCTS;
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
              Housegards röda sexkilos klarar högsta effektklassen 55A, är den
              enda som är godkänd för utomhusbruk och kostar 699 kronor. Samma
              släckeffekt finns i vitt för 579, men färgen avgör var släckaren
              får sitta: standarden kräver rött, och en vit släckare får bara
              hänga innanför din egen dörr. Vi jämförde sju släckare från 349
              till 699 kronor.
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

      {/* -------------------------------------------------- effektklassen -- */}
      {/* Ligger högt med flit. Utan den här förklaringen är tabellen nedanför
          obegriplig, och den är hela skälet till att sidan finns. */}
      <Section
        id="effektklassen"
        width="default"
        title="Vilken som klarar mest brand"
        description="Koden på etiketten är släckarnas enda prestandamått, och den är framtagen genom provning enligt EN 3. Här är vad den betyder, och varför färgen hör ihop med den."
      >
        <Prose>
          <p>
            <strong>A-talet</strong> gäller brand i fasta material som trä,
            papper och textil, och anger hur stor brand släckaren klarar. Kjell
            översätter det på sin produktsida: 55A betyder släckyta upp till 5,5
            meter från släckaren.
          </p>
          <p>
            <strong>B-talet</strong> gäller brinnande vätska. 233B betyder 233
            liter bensin, olja eller färg. <strong>C</strong> betyder att den
            även klarar gasbränder.
          </p>
          <p>
            Skillnaden mellan 55A och 43A är alltså 28 procent släckyta, på två
            sexkilos som ser identiska ut i hyllan. I jämförelsen kostar en 55A
            579 kronor och en 43A 529, medan den dyraste släckaren på 699 kronor
            inte är den med högst klass.
          </p>
          <p>
            Det är därför kriteriet väger 40 procent. Siffran står på varje
            förpackning, den är framprovad mot standardiserade provbål, och den
            nämns inte i en enda svensk jämförelse vi läst.
          </p>
          <p>
            <strong>Färgen hör ihop med klassen.</strong> SS-EN 3-7 kräver röd
            färg i punkt 16.1, så en vit släckare kan inte vara certifierad mot
            standarden hur högt A-tal den än har. Två av de sju här är vita, och
            båda säljarna skriver ut följden: de får bara sitta i en
            privatbostad där de boende vet var släckaren hänger.
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
        title={`De ${products.length} bästa brandsläckarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla sju"
        description="Raden att läsa först är Effektklass. Därefter Får placeras, som avgör om släckaren duger i trapphuset eller bara innanför din egen dörr."
      >
        <FilterableComparison
          products={products}
          filters={BRANDSLACKARE_FILTERS}
          legend="Filtrera på storlek, klass och placering"
          layout={style.table}
          variant="bordered"
          caption={priceCaption(
            PRICE_CHECKED,
            `Specifikationer från tillverkarnas egna underlag, lästa ${SPECS_CHECKED}. ${NOT_STATED}`,
          )}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje släckare"
        description="Alla sju bedöms mot samma fem kriterier. Effektklassen är provad enligt EN 3 av ett certifieringsorgan, inte av oss."
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
        id="andra-slackare"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster som inte hamnade i rankningen, inklusive skum och kolsyra som i praktiken inte säljs till privatpersoner i Sverige."
      >
        <ConsideredList items={BRANDSLACKARE_CONSIDERED} />
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
          footnote={`Den här kategorin skiljer sig från våra övriga på en punkt: effektklassen enligt EN 3 provas fram av ett certifieringsorgan och står på varje etikett. Vi behöver alltså inte tända eld på något för att kunna jämföra släckeffekt, och gör det inte heller.\n\nViktningen räknades om ${SPECS_CHECKED}. Sidan bar tidigare ett kriterium som gav poäng för att butiken skrivit ut sitt typgodkännande. Det mätte vår egen research och inte produkten, och de 15 poängen ligger nu på var släckaren får sitta, vilket är en egenskap hos varan.\n\nPriserna är hos den butik vi länkar till.`}
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
        description="Myndigheter och räddningstjänst för råden, standarden EN 3 för siffrorna, och butikernas egna produktsidor för de uppgifter vi jämfört."
      >
        <SourceList sources={BRANDSLACKARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={BRANDSLACKARE_FAQ} schema />
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
