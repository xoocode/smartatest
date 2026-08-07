import type { Metadata } from "next";

import { testPageTrail, FRITOS } from "@/lib/test-pages";
import { SOURCES_BY_HREF } from "@/lib/sources";
import {
  PRICE_CHECKED,
  FRITOS_FAQ,
  FRITOS_CONSIDERED,
  FRITOS_PRODUCTS,
} from "@/lib/data/fritos";
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
import { ToolWidget } from "@/components/tools/registry";

import Kopguide from "@/content/fritos/kopguide.mdx";

/*
 * Fjärde sidan i gruppen Kök, byggd 2026-08-07.
 *
 * ⚠️ Sidan rankar oljefritöser mellan 412 och 1 345 kronor. Varmluftsfritöser
 * ligger på /airfryer, efter användarbeslut. Elgigantens egen kategori heter
 * ordagrant "Fritös med olja", vilket är marknadens egen avgränsning.
 *
 * ⚠️ OLJEÅTGÅNGEN PER KILO MAT ÄR SIDANS HELA ÄRENDE. Tefals egen
 * jämförelsetabell listar `Oljekapacitet` och `Livsmedelskapacitet` som två
 * skilda rader, och de följer inte varandra. Tefal Easy Pro, Princess 182727
 * och Severin FR 2431 tar alla tre 3,0 liter olja och friterar 1,2 kg, 0,6 kg
 * respektive 0,4 kg. Kvoten spänner 1,54 till 7,50 l/kg över fältet.
 *
 * ⚠️ INGET TESTOMDÖMEKRITERIUM. Test-Achats 24 fritöser, refererad fritt av
 * Stiftung Warentest 2025-12-23, är kategorins enda aktuella provning — men de
 * elva modeller den namnger säljs inte i svensk handel, så ett viktat testbetyg
 * hade gett noll till samtliga rankade. Råd & Rön, Testfakta, tek.no och RTINGS
 * har ingen provning av oljefritöser alls.
 *
 * ⚠️ KALLZONEN BÄR INGEN VIKT, trots att den är kategorins mest omtalade
 * konstruktion. Åtta av elva anger den, och de tre andra är maskiner där
 * uppgiften inte gått att belägga hos tillverkaren — inte maskiner utan
 * kallzon. Kriteriet `Oljans livslängd` vilar på filtreringen i stället.
 *
 * ⚠️ MAXTEMPERATUREN BÄR INGEN VIKT. Tio av elva anger 190 °C. Det är en grind
 * och inte en axel, samma beslut som på /pizzaugn. Att vinnaren är den enda som
 * stannar på 180 står i tabellen och i dess nackdelar.
 *
 * ⚠️ SEX AV DE SJU ÖVERSTA ÄR TEFAL. Det är vad viktningen ger, och skälet är
 * att deras maskiner friterar mer mat per liter olja. Princess anger sina tal
 * lika tydligt och förlorar på dem.
 *
 * Priser, artikelnummer, GTIN och lagerstatus är lästa hos butiken på
 * PRICE_CHECKED. Specifikationerna är lästa hos tillverkaren.
 *
 * AFFILIATE-SWAP — se lib/links.ts för vad LINK_MODE står på i dag.
 */

const TEST_PAGE = FRITOS;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-07";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Tefal Versalio Deluxe vinner för 1 112 kronor: 1,3 kilo mat på 2 liter olja, minst olja per kilo i jämförelsen. Bästa köpet är Tefal Easy Pro för 679 kronor. Litertalet på kartongen är oljan du köper och slänger, inte maten du lagar. Tre maskiner tar 3 liter och gör 1,2 kilo, 600 gram respektive 400 gram.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "olja-mot-mat", label: "Tre liter olja, tre olika matmängder" },
  { id: "oljekostnad", label: "Räkna ut vad oljan kostar dig" },
  { id: "jamforelse", label: "Jämför alla elva" },
  { id: "recensioner", label: "Recensioner av varje fritös" },
  { id: "andra-fritoser", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function FritosPage() {
  const style = await getStyle();
  const products = FRITOS_PRODUCTS;
  const [winner] = products;
  const author = DEFAULT_AUTHOR;
  const reviewer = DEFAULT_REVIEWER;
  const sources = SOURCES_BY_HREF[PAGE_URL] ?? [];

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
            {/* H1 bär fyndet: litertalet är oljan, inte maten. */}
            <h1 className="text-h1">
              Fritös bäst i test 2026: litertalet är oljan, inte maten
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Köp Tefal Versalio Deluxe för 1 112 kronor. Den friterar 1,3 kilo
              mat på 2 liter olja, alltså både den största matmängden och den
              minsta oljemängden här. Ska du lägga mindre är Tefal Easy Pro för
              679 kronor bästa köpet, med 1,2 kilo mat på 3 liter. Och läs inte
              litertalet som portioner: tre av maskinerna här tar exakt 3 liter
              olja och friterar 1,2 kilo, 600 gram respektive 400 gram mat.
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

      {/* --------------------------------------------------- the finding -- */}
      <Section
        id="olja-mot-mat"
        width="default"
        title="Tre liter olja, och tre helt olika matmängder"
        description="Talet på kartongen säger hur mycket olja maskinen behöver, inte hur mycket mat den gör."
      >
        <Prose>
          <p>
            <strong>
              Tefal Easy Pro, Princess 182727 och Severin FR 2431 tar alla tre
              exakt 3 liter olja.
            </strong>{" "}
            Den första friterar 1,2 kilo mat, den andra 600 gram och den tredje
            400 gram. Alla tre talen står hos respektive tillverkare, och de är
            inte ungefärliga: Severins eget produktblad skriver ut både
            oljemängden och friteringskapaciteten på samma rad. Samma oljeköp ger
            alltså tre gånger så mycket mat ur den ena maskinen som ur den andra.
          </p>
          <p>
            <strong>Tefal listar de två talen som två skilda rader.</strong> I
            deras egen jämförelsetabell heter de `Oljekapacitet` och
            `Livsmedelskapacitet`, och för Oleoclean Pro står det 3,5 liter mot
            1,2 kilo. Det är den ovanliga tydligheten i kategorin. I handeln är
            det nästan alltid bara litertalet som skyltas, och en köpare som
            jämför två treliters har ingen anledning att tro att de gör olika
            mycket mat.
          </p>
          <p>
            <strong>Räknat som liter olja per kilo mat spänner fältet 4,9
            gånger.</strong> Tefal Versalio Deluxe ligger på 1,54, Tefal Uno på
            1,80, Tefal Maxi-Fry på 2,00, och i andra änden ligger Princess
            184090, Princess 182727 och Tristar FR-6919 på 5,00 och Severin
            FR 2431 på 7,50. Det är den siffran som avgör vad maskinen kostar
            att använda, och den finns inte i någon annons.
          </p>
          <p>
            <strong>Oljan är en förbrukningsvara med publicerad livslängd.</strong>{" "}
            Test-Achats, som provat 24 fritöser i den provning Stiftung Warentest
            publicerade i december 2025, rekommenderar att frityrfettet byts
            efter fem till sex omgångar, eftersom matrester samlas i fettet och
            ändrar smaken. Tefals egen bruksanvisning säger fem till sju gånger.
            Två oberoende led som pekar åt samma håll, och de gör litertalet till
            en löpande utgift i stället för en engångskostnad.
          </p>
          <p>
            <strong>Kallzonen förlänger intervallet, filtret kortar arbetet.</strong>{" "}
            En kallzon är ett svalare område i botten dit smulor från paneringen
            sjunker utan att brännas fast mot värmeelementet, och Test-Achats
            underkände en av sina 24 fritöser bland annat för att den inte
            fungerade. Ett oljefilter går ett steg längre och silar bort smulorna.
            Tefals två Oleoclean-modeller gör det automatiskt och lagrar oljan i
            en sluten låda under maskinen, så den varken står kvar i grytan eller
            ska hällas genom en sil för hand.
          </p>
          <p>
            <strong>Två livsmedelskapaciteter förekommer, och de skiljer en
            fjärdedel.</strong> Tefal anger för Oleoclean Compact både 800 gram
            livsmedel och 600 gram pommes frites på samma sida. Det förklarar hur
            två butiker kan citera olika tal för samma maskin och båda ha rätt.
            Jämförelsen här använder livsmedelskapaciteten genomgående, eftersom
            det är den handeln citerar.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------------- the tool -- */}
      <Section
        id="oljekostnad"
        tone="muted"
        width="default"
        title="Räkna ut vad oljan kostar dig"
        description="Litertalet gånger hur ofta du friterar, med det bytesintervall tillverkarna själva anger."
      >
        <ToolWidget slug="oljekostnad-fritos" />
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa fritöserna 2026`}
        description="Varje maskin passar ett eget hushåll och ett eget matlagningstempo. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla elva"
        description="Samma fem kriterier och samma viktning för alla elva."
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
        title="Recensioner av varje fritös"
        description="Alla elva bedöms mot samma fem kriterier."
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
        id="andra-fritoser"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Sex maskiner som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={FRITOS_CONSIDERED} />
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
          footnote="Oljeåtgången per kilo mat väger 25 därför att oljan är en förbrukningsvara som ska bytas efter fem till sju omgångar, vilket gör litertalet till den löpande kostnaden att äga maskinen. Kvoten är räknad ur två tal tillverkaren själv publicerar, oljemängden och friteringskapaciteten, och är ingen mätning vi gjort. Matmängden är tillverkarens egen uppgift, och där två tal finns används livsmedelskapaciteten och inte pommeskapaciteten. Kallzonen bär ingen vikt: åtta av elva anger den, och de tre andra är maskiner där uppgiften inte gått att belägga hos tillverkaren snarare än maskiner utan kallzon. Kriteriet Oljans livslängd vilar därför på filtreringen, som är belagd för varenda produkt. Maxtemperaturen bär heller ingen vikt, eftersom tio av elva anger 190 grader. Det finns inget kriterium för testomdöme: Test-Achats provning av 24 fritöser är fritt läsbar, men ingen av de elva modeller den namnger säljs i svensk handel. Priser, artikelnummer och GTIN är lästa på butikens egen produktsida och daterade."
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
        description="Test-Achats provning av 24 fritöser, Icakurirens jämförelse mellan olja och varmluft, och tillverkarnas egna produktblad och bruksanvisningar."
      >
        <SourceList sources={sources} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={FRITOS_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
