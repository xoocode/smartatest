import type { Metadata } from "next";

import { testPageTrail, POWERBANK } from "@/lib/test-pages";
import { POWERBANK_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  POWERBANK_FAQ,
  POWERBANK_CONSIDERED,
  POWERBANK_PRODUCTS,
} from "@/lib/data/powerbank";
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

import Kopguide from "@/content/powerbank/kopguide.mdx";

/*
 * ⚠️ Sidan rankar vardagsklassen, 5 000 till 10 000 mAh. Rese- och
 * laptopklassen från 20 000 mAh får /powerbank-20000, efter användarbeslut
 * 2026-08-05. Systersida till /usb-c-laddare och /usb-c-kabel.
 *
 * Priser, artikelnummer, kundbetyg och specifikationer är lästa hos Kjell på
 * PRICE_CHECKED.
 *
 * ⚠️ Alla åtta länkar går till Kjell. Koncentrationen står utskriven på sidan,
 * samma lösning som /smart-hem-hubb och /usb-c-laddare.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = POWERBANK;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-05";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Anker Nano 30 W vinner för 799 kronor: kabeln sitter fast i enheten, 30 watt åt båda hållen och 10 000 mAh som motsvarar 37 wattimmar. Vill du ha samma fart billigare tar du Linocell Premium 30 W för 499,90. Räkna med två telefonladdningar av 10 000 mAh, inte tre.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "wattimmen", label: "Talet som avgör vid gaten" },
  { id: "jamforelse", label: "Jämför alla åtta" },
  { id: "recensioner", label: "Recensioner av varje powerbank" },
  { id: "andra-powerbanks", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function PowerbankPage() {
  const style = await getStyle();
  const products = POWERBANK_PRODUCTS;
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
            {/* H1 bär avgränsningen: sidan rankar den storlek som laddar en
                telefon och ryms i fickan. Rese- och laptopklassen från
                20 000 mAh jämförs för sig. */}
            <h1 className="text-h1">
              Powerbank bäst i test 2026: åtta som laddar telefonen i fickan
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Köp Anker Nano 30 W för 799 kronor. Kabeln sitter fast i enheten,
              så den kan inte glömmas hemma, den laddar med 30 watt åt båda
              hållen och dess 10 000 mAh motsvarar 37 wattimmar. Vill du ha
              samma fart billigare kostar Linocell Premium 30 W 499,90 och
              skriver också ut sina wattimmar. Räkna med att 10 000 mAh ger en
              telefon två laddningar, inte tre.
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
        id="wattimmen"
        width="default"
        title="Två av åtta anger wattimmar, och det är talet som avgör vid gaten"
        description="Kapaciteten står i milliamperetimmar. Flygreglerna är skrivna i wattimmar."
      >
        <Prose>
          <p>
            <strong>
              Milliamperetimmar mäter laddningsmängd vid en viss spänning.
            </strong>{" "}
            Wattimmar mäter energi. Det första talet står i produktnamnet på
            varenda powerbank i handeln, och det andra är det som avgör hur
            mycket som faktiskt kommer ut och om enheten får följa med ombord.
          </p>
          <p>
            <strong>
              Transportstyrelsen sätter sina gränser i wattimmar:
            </strong>{" "}
            upp till 100 Wh i handbagage, 100 till 160 Wh med flygbolagets
            godkännande och högst två batterier, och över 160 Wh inte alls. Den
            regel som oftast ställer till det är dock en annan och gäller alla
            storlekar: en powerbank får aldrig ligga i det incheckade bagaget.
            Inte den minsta, inte den billigaste.
          </p>
          <p>
            <strong>
              Av de åtta powerbanks som jämförs här anger två sitt
              energiinnehåll i wattimmar.
            </strong>{" "}
            Anker Nano 30 W anger 37 Wh och Linocell Premium 30 W anger 36 Wh för
            samma nominella 10 000 mAh. Att de två som räknat får olika svar
            beror på att cellspänningen skiljer sig, och det är skälet till att
            vi inte räknar om åt de sex som är tysta. Ett uträknat tal är inte
            ett publicerat.
          </p>
          <p>
            <strong>I den här storleksklassen är risken praktisk noll.</strong>{" "}
            5 000 till 10 000 mAh blir 18 till 37 wattimmar och ligger tryggt
            under varje gräns som finns. Talet börjar spela roll först runt
            27 000 mAh, där hundragränsen passeras, och det är också där
            tillverkarna plötsligt börjar skriva ut det.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa powerbankerna 2026`}
        description="Varje powerbank passar en egen sorts dag. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla åtta"
        description="Samma kriterier och samma viktning för alla åtta."
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
        title="Recensioner av varje powerbank"
        description="Alla åtta bedöms mot samma fem kriterier."
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
        id="andra-powerbanks"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Fyra powerbanks som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={POWERBANK_CONSIDERED} />
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
          footnote="Kapaciteten väger 35 därför att det är den fråga läsaren kommer med, och öppen redovisning 15 därför att den avgör om svaret går att kontrollera. Där energiinnehållet i wattimmar inte är angivet har vi låtit cellen stå tom i stället för att räkna om milliamperetimmarna, eftersom cellspänningen varierar: de två tillverkare som faktiskt räknat anger 36 respektive 37 wattimmar för samma nominella tiotusen. Att uppgiften saknas räknas som en brist, eftersom en egenskap du inte kan kontrollera före köpet är sämre för dig än en du kan, och konsekvensen bärs av dig. Tre av produkterna saknar teknisk specifikation helt i butiken, vilket syns som streck på flera rader. Kategorin har en riktig labbprovning, men resultaten per modell ligger bakom en betalvägg vi inte betalat, och därför finns inget kriterium för testomdöme. Samtliga åtta länkar går till samma butik, eftersom den för hela storleksklassen i ett sortiment som gick att kartlägga produkt för produkt."
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
        description="Stiftung Warentests provning av 24 powerbanks, Transportstyrelsens regler för batterier i bagage och butikens egna produktdata."
      >
        <SourceList sources={POWERBANK_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={POWERBANK_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
