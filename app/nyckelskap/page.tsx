import type { Metadata } from "next";

import { testPageTrail, NYCKELSKAP } from "@/lib/test-pages";
import { NYCKELSKAP_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  NYCKELSKAP_FAQ,
  NYCKELSKAP_CONSIDERED,
  NYCKELSKAP_PRODUCTS,
} from "@/lib/data/nyckelskap";
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

import Kopguide from "@/content/nyckelskap/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, GTIN och butiks-URL:er är verkliga, lästa hos
 * butikerna på PRICE_CHECKED. Specifikationerna kommer från tillverkarnas egna
 * produktsidor och produktblad.
 *
 * Provningstiderna är avskrivna ur RISE P115210 och gäller endast de två
 * modeller som har ett eget resultat i rapporten. Se lib/data/nyckelskap.ts
 * för variantfällan kring ABUS 787C mot 787 Smart-BT.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = NYCKELSKAP;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "ABUS KeyGarage 787 vinner för 490 kronor: satt kvar längst mot skruvmejsel av de skåp som brutits upp, och tar 20 nycklar. Hyr du ut tar du Master Lock Select Access Smart. Vi jämförde fem nyckelskåp från 349 till 2 599 kronor.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilket ska du köpa?" },
  { id: "hammaren", label: "9 sekunder med en hammare" },
  { id: "jamforelse", label: "Jämför alla fem" },
  { id: "recensioner", label: "Recensioner av varje skåp" },
  { id: "andra-skap", label: "Andra skåp vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function NyckelskapPage() {
  const style = await getStyle();
  const products = NYCKELSKAP_PRODUCTS;
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
            {/* H1 bär avgränsningen, som på /brandvarnare och /smart-termostat:
                ordet nyckelskåp täcker även SSF 3492-klassade stålskåp från
                5 495 kr som rymmer 42 till 2 400 nycklar. */}
            <h1 className="text-h1">
              Nyckelskåp bäst i test 2026: fem boxar med kod till
              ytterdörrsnyckeln
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Köp ABUS KeyGarage 787 för 490 kronor. Den satt kvar längst av
              alla mot skruvmejsel när fyra nyckelskåp bröts upp under
              kontrollerade former, den tar 20 nycklar och den kostar en
              femtedel av det dyraste skåpet här. Hyr du ut och vill ge varje
              gäst en egen kod är Master Lock Select Access Smart värd sina
              2 599 kronor. Räkna med skydd mot tillfället, inte mot ett
              planerat inbrott.
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
        id="hammaren"
        width="default"
        title="9 sekunder med en hammare: därför är pris inte säkerhet"
        description="Det dyraste skåpet i jämförelsen var det snabbaste att öppna."
      >
        <Prose>
          <p>
            <strong>
              Master Lock Select Access Smart klarar sig bäst av alla mot
              standardens verktyg.
            </strong>{" "}
            Det är det enda skåpet vars lucka inte gick att bryta upp vid
            låssidan, och det enda som höll längre än tidsramen när angreppet
            flyttades till gångjärnen. På den mätningen är det överlägset.
          </p>
          <p>
            <strong>Sedan byttes verktyget.</strong> Åtta slag med en 700 grams
            snickarhammare, 9 sekunder, och luckan stod öppen. Hammaren ligger
            utanför verktygslistan i provningsmetoden och lades till som en
            extra angreppspunkt just för att den är trivial att få tag på.
          </p>
          <p>
            <strong>Slutsatsen är inte att skåpet är dåligt.</strong> Den är att
            pris och motstånd inte följs åt i den här kategorin, och att 2 599
            kronor köper delbara koder och ett väderskydd du använder varje
            vecka, inte ett skåp som står emot mer. Vill du ha motstånd för
            pengarna gör ABUS KeyGarage 787 samma jobb för 490.
          </p>
          <p>
            <strong>Det som gav vika först var samma sak på varje skåp:</strong>{" "}
            inte låset och inte luckan, utan de fyra skruvarna i väggen. Med
            kofot lossnade skåpen på mellan 16 sekunder och 1 minut och 15. Skruva
            i massivt trä, betong eller tegel, aldrig i fasadpanel, och sätt
            skåpet runt hörnet från dörren det går till i stället för bredvid
            den.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa nyckelskåpen 2026`}
        description="Varje skåp fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla fem"
        description="Samma kriterier och samma viktning för alla fem skåpen."
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
        title="Recensioner av varje skåp"
        description="Alla fem bedöms mot samma fem kriterier."
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
        id="andra-skap"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra skåp vi övervägde"
        description="Sju skåp som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={NYCKELSKAP_CONSIDERED} />
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
          footnote="Infästningen väger 30 därför att den gav vika på samtliga provade skåp, och lucka och lås 25 därför att spridningen mellan modellerna är störst där. Väderskyddet betygsätts på vad skåpet är byggt för: Master Lock Select Access Smart är ensam om både kapslingsklass och temperaturspann och får full poäng, ABUS Smart-BT har kapslingsklassen men inget spann, och de tre mekaniska skåpen har ett lock över kodhjulen och ett lås som aldrig behöver ström. En uppgift vi inte fått fram sänker aldrig ett betyg."
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
        description="Provningsrapporten från RISE, tillverkarnas produktblad och butikernas produktdata."
      >
        <SourceList sources={NYCKELSKAP_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={NYCKELSKAP_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "pricing"]}
          className="mb-block"
        />
      </Container>
    </>
  );
}
