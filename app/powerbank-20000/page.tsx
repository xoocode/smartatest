import type { Metadata } from "next";

import { testPageTrail, POWERBANK_20000 } from "@/lib/test-pages";
import { POWERBANK_20000_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  POWERBANK_20000_FAQ,
  POWERBANK_20000_CONSIDERED,
  POWERBANK_20000_PRODUCTS,
} from "@/lib/data/powerbank-20000";
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

import Kopguide from "@/content/powerbank-20000/kopguide.mdx";

/*
 * ⚠️ Sidan rankar reseklassen, från 20 000 mAh och uppåt. Vardagsklassen som
 * laddar en telefon ligger på /powerbank. Delningen är ett användarbeslut
 * 2026-08-05, och Stiftung Warentest delar sitt eget test likadant.
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

const TEST_PAGE = POWERBANK_20000;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-05";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Linocell 165 W vinner för 999 kronor: 27 600 mAh och 99,36 wattimmar, alltså så nära flyggränsen på 100 Wh man kommer, med inbyggd kabel och 165 watt till datorn. Ska du ladda två datorer tar du Anker Prime 300 W. En powerbank får aldrig checkas in, oavsett storlek.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "gransen", label: "0,64 wattimmar från gränsen" },
  { id: "jamforelse", label: "Jämför alla åtta" },
  { id: "recensioner", label: "Recensioner av varje powerbank" },
  { id: "andra-powerbanks", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function Powerbank20000Page() {
  const style = await getStyle();
  const products = POWERBANK_20000_PRODUCTS;
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
            {/* H1 bär avgränsningen: sidan rankar reseklassen från 20 000 mAh.
                Den mindre klassen som laddar en telefon jämförs för sig. */}
            <h1 className="text-h1">
              Powerbank 20 000 mAh bäst i test 2026: åtta för resan och datorn
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Köp Linocell 165 W för 999 kronor. Den rymmer 27 600 mAh och
              anger 99,36 wattimmar, alltså 0,64 under gränsen för vad du får ta
              med i kabinen, och 165 watt räcker till en bärbar dator. Kabeln
              sitter dessutom fast i enheten. Ska du ladda två datorer samtidigt
              kostar Anker Prime 300 W 2 490 kronor och fyller sig själv på under
              en timme. En powerbank får aldrig checkas in, oavsett storlek.
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
        id="gransen"
        width="default"
        title="99,36 wattimmar mot ett tak på 100: den här klassen är byggd mot gränsen"
        description="Kapaciteten står i milliamperetimmar. Flygreglerna är skrivna i wattimmar."
      >
        <Prose>
          <p>
            <strong>
              Transportstyrelsen sätter gränsen vid 100 wattimmar
            </strong>{" "}
            för vad du får ta med i kabinen utan flygbolagets godkännande. Mellan
            100 och 160 krävs tillstånd och högst två batterier, och över 160 är
            de förbjudna. Den regel som oftast ställer till det gäller dessutom
            alla storlekar: en powerbank får aldrig ligga i det incheckade
            bagaget.
          </p>
          <p>
            <strong>Två av produkterna här är byggda alldeles intill taket.</strong>{" "}
            Linocell 165 W anger 99,36 wattimmar och Anker Prime 300 W anger
            99,75. Marginalerna är 0,64 respektive en fjärdedels wattimme. Det är
            konstruktion och inte slump: kapaciteten är lagd så högt reglerna
            tillåter och inte en wattimme mer.
          </p>
          <p>
            <strong>
              Det är också därför wattimmen plötsligt står utskriven här.
            </strong>{" "}
            I den mindre storleksklassen, där ingen produkt kan komma nära taket,
            anger två av åtta sitt energiinnehåll. I den här klassen gör sju av
            nio det. Talet publiceras när tillverkaren har ett skäl att visa att
            produkten ryms under gränsen.
          </p>
          <p>
            <strong>Men uppgifterna går inte alltid ihop.</strong> Tre powerbanks
            med samma nominella 20 000 milliamperetimmar anger 72, 72,36 och 100
            wattimmar. De två första är förenliga med varandra; den tredje ligger
            39 procent högre. Vi återger vad som står och räknar aldrig om åt
            någon, eftersom cellspänningen varierar. Ska du luta dig mot ett tal
            vid en incheckningsdisk är det värt att kontrollera det mot
            tillverkarens egen sida först.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa powerbankerna på 20 000 mAh 2026`}
        description="Varje powerbank passar en egen sorts resa. Klicka på ett namn för den fullständiga recensionen."
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
        <ConsideredList items={POWERBANK_20000_CONSIDERED} />
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
          footnote="Kapaciteten väger 30 och laddeffekten 25, eftersom den här storleken köps för att driva en bärbar dator och spannet mellan produkterna är tretton gånger. Vikt är ett eget kriterium på 15, vilket den mindre klassen inte har behov av: här väger produkterna mellan 400 och 535 gram och skillnaden märks på en resdag. Där energiinnehållet i wattimmar inte är angivet har vi låtit cellen stå tom i stället för att räkna om milliamperetimmarna, eftersom cellspänningen varierar. Tre produkter med samma nominella kapacitet anger 72, 72,36 och 100 wattimmar, och vi återger vad som står utan att avgöra vilken uppgift som är riktig. Att en uppgift saknas räknas som en brist, eftersom en egenskap du inte kan kontrollera före köpet är sämre för dig än en du kan. Kategorin har en riktig labbprovning, men resultaten per modell ligger bakom en betalvägg vi inte betalat, och därför finns inget kriterium för testomdöme. Sju av de åtta länkarna går till samma butik, eftersom den för nästan hela storleksklassen i ett sortiment som gick att kartlägga produkt för produkt. Den åttonde går till en annan butik som säljer samma artikel till samma pris."
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
        description="Transportstyrelsens regler för batterier i bagage, Stiftung Warentests provning av 24 powerbanks och butikens egna produktdata."
      >
        <SourceList sources={POWERBANK_20000_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={POWERBANK_20000_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
