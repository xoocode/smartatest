import type { Metadata } from "next";
import Link from "next/link";

import { testPageTrail, GALAXY_S26_SKAL } from "@/lib/test-pages";
import { GALAXY_S26_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  GALAXY_S26_SKAL_FAQ,
  GALAXY_S26_SKAL_CONSIDERED,
  GALAXY_S26_SKAL_PRODUCTS,
} from "@/lib/data/galaxy-s26-skal";
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

import Kopguide from "@/content/galaxy-s26-skal/kopguide.mdx";

/*
 * ⚠️ Produkter, priser och butiks-URL:er är verkliga, lästa hos TheMobileStore
 * på PRICE_CHECKED. Butiken svarar tomt på curl och besvaras av r.jina.ai; en
 * tom hämtning därifrån betyder aldrig att uppgiften saknas.
 *
 * ⚠️ Inget skal här är provat, varken av oss eller av någon annan. Kategorin
 * saknar oberoende provning helt. Telefonerna är däremot väl provade av
 * Mobil.se, PC-tidningen och Prisjakt, och de testerna får aldrig citeras som
 * stöd för ett skalomdöme. Därför finns inget kriterium för testomdöme.
 *
 * ⚠️ Sidans fynd är att Galaxy S26-serien saknar inbyggda Qi2-magneter medan
 * Samsung säljer magnetiska tillbehör till just den serien. Magnetkriteriet
 * väger därför 38, mot 21 på systersidan /iphone-skal. Se lib/test-pages.ts.
 *
 * ⚠️ 2026-08-06 togs kriteriet "öppen redovisning av skydd" bort. Det vägde 20
 * och betygsatte hur mycket säljaren skrivit ut, alltså dokumentationen och
 * inte varan. Vikten är omfördelad proportionellt och Samsung Rugged Magnet
 * föll från andra till åttonde plats. Se lib/corrections.ts.
 *
 * ⚠️ Falltest enligt tillverkaren står i tabellen men ingår i inget betyg. Se
 * lib/spec-schema.mjs, ALDRIG_BEDOMD. Hämta alltid talet hos tillverkaren:
 * butiken skriver av det ofullständigt eller inte alls.
 *
 * ⚠️ H1 bär både avgränsningen och modellen: serien har tre storlekar och ett
 * skal passar exakt en av dem.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = GALAXY_S26_SKAL;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Ringke Magnetic Fusion X för 229 kr vinner: luftkuddar i hörnen, förhöjda kanter och den magnetring som Galaxy S26 saknar. Vi jämför tolv skyddsskal till Galaxy S26 från 159 till 779 kronor på magnet, konstruktion och pris.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilket ska du köpa?" },
  { id: "magneten", label: "Magneten sitter i skalet, inte i telefonen" },
  { id: "jamforelse", label: "Jämför alla tolv" },
  { id: "recensioner", label: "Recensioner av varje skal" },
  { id: "andra-skal", label: "Andra skal vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function GalaxyS26SkalPage() {
  const style = await getStyle();
  const products = GALAXY_S26_SKAL_PRODUCTS;
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
              Galaxy S26-skal bäst i test 2026: tolv skyddsskal till Samsung
              Galaxy S26, från 159 till 779 kr
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Ringke Magnetic Fusion X för 229 kronor vinner, därför att den har
              luftkuddar i hörnen, förhöjda kanter och den magnetring som
              telefonen själv saknar. Galaxy S26 har nämligen inga inbyggda
              magneter, så Samsungs egen powerbank och magnetladdare fäster bara
              om skalet bär ringen. Samma skal utan den kostar 30 kronor mindre
              och heter nästan likadant, och det är hela anledningen till att
              sidan finns.
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
        <TocNav variant="inline" entries={TOC} className="mt-block lg:hidden" />
      </Section>

      {/* ---------------------------------------- fyndet, före tabellen -- */}
      <Section
        id="magneten"
        width="default"
        title="Magneten sitter i skalet, inte i telefonen"
      >
        <Prose>
          <p>
            Galaxy S26-serien har inga inbyggda magneter på baksidan. Det gäller
            alla tre modellerna, och det är ett aktivt val: Samsung uppgav i
            februari 2026 att magneterna ströks som en del av arbetet med
            tunnare och lättare design, och att serien i stället stöder
            magnetiska skal.
          </p>
          <p>
            Samtidigt säljer Samsung en magnetisk powerbank och en magnetladdare
            till just den här serien. De två uppgifterna går ihop bara på ett
            sätt: tillbehören är byggda för att fästa mot ett skal, och du får
            köpa skalet själv. Tillverkaren hänvisar alltså köparen vidare för en
            funktion telefonen inte har.
          </p>
          <p>
            Det gör skalet till något annat än ett skydd på den här telefonen.
            Det är en laddningskomponent. Ett skal utan magnetring betyder att
            Samsungs egen powerbank glider av, att magnetladdaren inte sitter
            kvar och att en magnetisk bilhållare blir en klämma du får skruva
            fast.
          </p>
          <p>
            Priset för att välja fel är litet och skillnaden är nästan osynlig.
            Ringke säljer samma skal i två versioner: Fusion X för 199 kronor
            och Magnetic Fusion X för 229. Samma konstruktion, samma luftkuddar
            i hörnen, samma förhöjda kanter. Skillnaden är ett ord i namnet,
            trettio kronor, och om resten av dina tillbehör fungerar. Onyx och
            Magnetic Onyx skiljer femtio kronor på samma sätt.
          </p>
          <p>
            En sak till gör det svårare än det borde vara. Kategorin har inget
            svenskt ord för magnetringen. Varenda magnetskal här säljs som
            MagSafe-kompatibelt, alltså med Apples varumärke på en
            Samsung-telefon, och det gäller även Samsungs egna skal. UNIQ kallar
            sitt MagClick. Söker du på magnet missar du merparten av hyllan, så
            läs raden Magnetring i tabellen nedan i stället för produktnamnet.
          </p>
          <p>
            På en iPhone är det tvärtom: där sitter magneterna i telefonen och
            skalet behöver bara låta bli att vara i vägen. Jämförelsen av{" "}
            <Link href="/iphone-skal">skal till iPhone 17</Link> väger därför
            magneten betydligt lättare än den här sidan gör.
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
        title={`De ${products.length} bästa Galaxy S26-skalen 2026`}
        description="Varje skal fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tolv"
        description="Samma kriterier och samma viktning för alla tolv skalen. Raden att läsa först är magnetringen: den avgör om Samsungs egna tillbehör fäster, och den går inte att lägga till i efterhand."
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
        title="Recensioner av varje skal"
        description="Tolv skal mellan 159 och 779 kronor, bedömda på om magneten sitter i, hur de är byggda och vad de kostar."
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
        id="andra-skal"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra skal vi övervägde"
        description="Sex skal som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={GALAXY_S26_SKAL_CONSIDERED} />
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
          footnote="Magnetringen väger 38 och är sidans tyngsta kriterium, alltså nästan dubbelt mot vad motsvarande väger på jämförelsen av iPhone-skal. Skälet ligger i telefonen och inte i skalen: Galaxy S26 saknar inbyggda magneter, så ringen finns bara om du köper den, och den går inte att lägga till i efterhand. Sidan har inget kriterium för testomdöme, eftersom ingen provar skyddsskal. Telefonerna i serien är däremot väl provade av flera svenska publikationer, och de resultaten säger ingenting om ett skal. Falltest enligt tillverkaren står i tabellen men betygsätts inte. MIL-STD-810 är läst i original i tre utgåvor, och i del ett står att det inte är giltigt att betrakta en metods provvillkor som oföränderliga, samtidigt som tabellen tillåter att de 26 fallen delas på fem exemplar. Samsungs 1,22 meter i fem omgångar om 26 fall mot stål, Spigens 1,2 meter och 26 fall och UNIQ:s tre meter mäter därför inte samma sak, och att betygsätta dem hade rankat marknadsföringen. Sidan hade fram till den 6 augusti 2026 ett fjärde kriterium som gjorde just det, och det är borttaget."
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
        description="Militärstandarden i tre utgåvor, Samsungs egna uppgifter om serien, och den svenska guide som täcker samma ämne."
      >
        <SourceList sources={GALAXY_S26_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={GALAXY_S26_SKAL_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
