import type { Metadata } from "next";

import { testPageTrail, ELTANDBORSTE } from "@/lib/test-pages";
import { ELTANDBORSTE_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  ELTANDBORSTE_CONSIDERED,
  ELTANDBORSTE_FAQ,
  ELTANDBORSTE_FILTERS,
  ELTANDBORSTE_PRODUCTS,
} from "@/lib/data/eltandborste";
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

import Kopguide from "@/content/eltandborste/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, GTIN, laddtider, drifttider, borstlägen,
 * intensitetsnivåer, trycksensorernas beteende och borsthuvudspriser är
 * riktiga. Priser och GTIN lästa på butikernas egna produktsidor på
 * PRICE_CHECKED, laddtiderna i P&G:s egen kunskapsbas och Philips egen
 * bruksanvisning, drifttiderna hos tillverkarna. Kriteriebetygen är
 * redaktionell bedömning utifrån de uppgifterna, inte mätningar. Vi har inte
 * haft en enda borste i handen, och det står på sidan.
 *
 * Produktbilderna är butikernas egna packshots och ligger som WebP-masters
 * under public/bilder/eltandborste.
 *
 * ⚠️ Råd & Rön förbjuder vidarepublicering av testresultat och betyg. Sidan får
 * säga att provningen finns, vilket datum den bär och vad de skrivit fritt om
 * metoden, aldrig vilken modell som vann. Testet är inte köpt.
 *
 * ⚠️ Apotek, kosttillskotts- och hälsokostbolag får inte länkas, beslutat
 * 2026-08-06. Apoteas priser ligger kvar i researchfilen som referens.
 *
 * AFFILIATE-SWAP — LINK_MODE avgör hur länkarna byggs, se lib/links.ts. Vi har
 * inget program hos vare sig Proshop eller Teknikdelar, alltså ingen provision
 * och varken rel="sponsored" eller annonsmärkning än.
 */

const TEST_PAGE = ELTANDBORSTE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Oral-B Pro 3 3000 vinner för 494 kronor: borsthuvuden för 44 kronor styck och full laddning på 12 timmar. Vi jämförde tio eltandborstar från 285 till 3 189 kronor och räknade ut vad de kostar på fem år.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "femarskostnaden", label: "Räkna på fem år, inte på kassan" },
  { id: "jamforelse", label: "Jämför alla tio" },
  { id: "recensioner", label: "Recensioner av varje eltandborste" },
  { id: "andra-eltandborstar", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function EltandborstePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = ELTANDBORSTE_PRODUCTS;
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
              Oral-B Pro 3 3000 vinner för 494 kronor. Den tar borsthuvuden för
              44 kronor styck, laddar fullt på 12 timmar och har trycksensor,
              vilket gör den till den billigaste borsten att äga av dem som
              skyddar tandköttet. Vi jämförde tio eltandborstar från 285 till
              3 189 kronor och räknade på handtaget plus tjugo borsthuvuden,
              eftersom det är huvudena som kostar pengarna.
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
      {/* Ligger högt med flit. Priset i kassan är det enda konkurrenterna
          jämför, och det är det tal som säger minst om vad borsten kostar.
          Läsaren behöver kunna räkna om det innan hon läser tabellen. */}
      <Section
        id="femarskostnaden"
        width="default"
        title="Räkna på fem år, inte på kassan"
        description="Tillverkarna säger själva att borsthuvudet ska bytas var tredje månad. Fyra huvuden om året kostar mellan 176 och 700 kronor."
      >
        <Prose>
          <p>
            Handtaget köper du en gång. Borsthuvudet köper du fyra gånger om
            året, och det är där pengarna ligger. I svensk handel kostar ett
            Oral-B-huvud till den runda fattningen 44 kronor styck i tiopack,
            ett Philips Sonicare 81, ett Oral-B iO 87 och Philips dyraste
            borsthuvud A3 Premium 175.
          </p>
          <p>
            Över fem år blir det 880 kronor i den ena änden och 3 500 i den
            andra, alltså mer än nio av de tio handtagen här kostar. Räknar man
            ihop handtaget och tjugo huvuden ser hyllan annorlunda ut:{" "}
            <strong>
              Oral-B iO 2 kostar 35 kronor mindre än Pro 3 3000 i kassan och 825
              kronor mer på fem år.
            </strong>
          </p>
          <p>
            Fattningen är dessutom det enda på hela sidan som inte går att ändra
            efter köpet, och tillverkarna har gjort tvärtemot varandra. Philips
            skriver på varje Sonicare-borsthuvud att det passar alla
            Sonicare-handtag utom Philips One och Kids, så du kan välja huvud
            efter pris. Oral-B skriver om sina iO-huvuden att de är designade
            för att passa endast iO-handtag. Den runda Oral-B-fattningen är
            däremot gammal nog att andra tillverkare gör huvuden till den, från
            20 kronor styck.
          </p>
          <p>
            Det är därför borsthuvudets pris väger 25 av 100 i vår viktning.
            Tyngst väger batteri och laddning med 35, eftersom laddtiden skiljer
            åtta gånger mellan modellerna och inte följer priset alls.
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
        title={`De ${products.length} bästa eltandborstarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla tio"
        description="Raden att läsa noggrannast är Kr/huvud. Den säger vad borsten kostar varje kvartal så länge du äger den, och den skiljer mer mellan produkterna än prislappen gör."
      >
        <FilterableComparison
          products={products}
          filters={ELTANDBORSTE_FILTERS}
          legend="Filtrera på borsthuvudspris, laddning och lägen"
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED)}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje eltandborste"
        description="Alla tio bedöms mot samma fyra kriterier. Vi har inte köpt Råd & Röns testresultat, så det finns inget kriterium för testomdöme här."
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
        id="andra-eltandborstar"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex produkter som fanns i urvalet men inte i rankningen. Fyra av dem är tvåpack eller färgvarianter av borstar vi redan rankar."
      >
        <ConsideredList items={ELTANDBORSTE_CONSIDERED} />
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
          footnote="Vi har inte haft en enda av de här borstarna i handen. Underlaget är tillverkarnas egna uppgifter och butikernas strukturerade produktdata. Laddtiderna kommer ur Procter & Gambles egen kunskapsbas och Philips egen bruksanvisning, drifttiderna ur tillverkarnas produktsidor, och priserna ur butikernas egna sidor samma dag. Priset per borsthuvud är det lägsta vi kunnat belägga i svensk handel för ett flerpack av tillverkarens eget kompatibla huvud, vilket inte nödvändigtvis är priset i den butik vi länkar handtaget till. Oral-B anger ingen drifttid i dagar för sina iO-handtag, så de cellerna står tomma och räknas inte in i något betyg. Det var också skälet till att batteritid och laddning blev ett kriterium i stället för två: fyra av tio produkter hade annars stått obetygsatta på en axel som vägde 20. Priserna är hos den butik vi länkar till."
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
        description="Tolv av femton källor är tillverkarnas egna. Det är avsiktligt: laddtid och borsthuvudskompatibilitet står bara där, och ingen butik i kategorin publicerar dem."
      >
        <SourceList sources={ELTANDBORSTE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={ELTANDBORSTE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
