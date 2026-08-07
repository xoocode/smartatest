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

import Kopguide from "@/content/powerbank/kopguide.mdx";

/*
 * ⚠️ Sidan rankar vardagsklassen, 5 000 till 10 000 mAh. Rese- och
 * laptopklassen från 20 000 mAh får /powerbank-20000, efter användarbeslut
 * 2026-08-05. Systersida till /usb-c-laddare och /usb-c-kabel.
 *
 * Priser, artikelnummer och kundbetyg är lästa hos Kjell på PRICE_CHECKED.
 * Specifikationerna är kompletterade ur tillverkarnas manualer 2026-08-06.
 *
 * ⚠️ Kriteriet `Öppen redovisning` togs bort 2026-08-06 och vinnaren ändrades.
 * Se lib/corrections.ts och filhuvudet i lib/data/powerbank.ts.
 *
 * ⚠️ Alla åtta länkar går till Kjell. Koncentrationen står utskriven på sidan,
 * samma lösning som /smart-hem-hubb och /usb-c-laddare.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = POWERBANK;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Anker Nano 45 W vinner för 699 kronor: 45 watt räcker till en bärbar dator, kabeln rullas ut ur enheten och 37 wattimmar laddas fulla på två timmar. Vill du ha mest energi per krona kostar Linocell 10000 249,90 och rymmer lika många wattimmar. Räkna med två telefonladdningar av 10 000 mAh, inte tre.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "wattimmen", label: "Talet på kartongen är inte energin" },
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
              Köp Anker Nano 45 W för 699 kronor. Den ger 45 watt ut, vilket
              räcker till en lättare bärbar dator och inte bara till telefonen,
              kabeln dras ut ur enheten och rullas in själv, och dess 37
              wattimmar fylls på två timmar. Ska pengarna räcka längst rymmer
              Linocell 10000 lika många wattimmar för 249,90. Räkna med att
              10 000 mAh ger en telefon två laddningar, inte tre.
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
        title="Samma 10 000 mAh rymmer 36, 37 eller 38,5 wattimmar"
        description="Talet på kartongen är inte energin. Skillnaden mellan de fyra tiotusenmodellerna här är sju procent."
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
              Fyra av produkterna här heter 10 000 mAh och rymmer olika mycket.
            </strong>{" "}
            Linocell Premium anger 36 wattimmar, Anker Nano och Linocell 10000
            anger 37, och Linocell Magnetisk anger 38,5. Skillnaden är
            cellspänningen: 3,6 volt i den första, 3,7 i de två i mitten och
            3,85 i den sista. Det är sju procent mer energi i den ena änden än i
            den andra, bakom ett identiskt tal på förpackningen.
          </p>
          <p>
            <strong>Praktiskt betyder det två saker.</strong> Jämför du två
            märken mot varandra är milliamperetimmen inte ett mått du kan lita
            på, utan wattimmen. Och räknar du själv om mAh till Wh kan du hamna
            sju procent fel, vilket är skälet till att vi bara publicerar det tal
            tillverkaren själv angett.
          </p>
          <p>
            <strong>
              Transportstyrelsen sätter dessutom sina gränser i wattimmar:
            </strong>{" "}
            upp till 100 Wh i handbagage, 100 till 160 Wh med flygbolagets
            godkännande och högst två batterier, och över 160 Wh inte alls. I den
            här storleken är det ingen praktisk risk: 18,5 till 38,5 wattimmar
            ligger tryggt under varje gräns. Den regel som oftare ställer till
            det gäller alla storlekar, nämligen att en powerbank aldrig får
            ligga i det incheckade bagaget. Inte den minsta, inte den billigaste.
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
          footnote={
            "Kapaciteten väger 41 därför att det är den fråga läsaren kommer med, och den mäts i wattimmar eftersom milliamperetimmen svajar sju procent mellan tillverkarna. Där en tillverkare inte publicerat sin wattimme står ett streck, och produkten betygsätts på sin kapacitet i milliamperetimmar. Vi räknar aldrig om åt någon, och en uppgift vi inte hittat sänker aldrig ett betyg.\n\n" +
            "Specifikationerna är hämtade ur tillverkarnas egna manualer och användarguider 2026-08-06, i flera fall ur dokument butiken själv länkar från produktsidan. Kategorin har en riktig labbprovning, men resultaten per modell ligger bakom en betalvägg vi inte betalat, och den svenska provning som finns täcker en av de åtta. Därför har sidan inget kriterium för testomdöme.\n\n" +
            "Samtliga åtta länkar går till samma butik, eftersom den för hela storleksklassen i ett sortiment som gick att kartlägga produkt för produkt."
          }
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
        description="Stiftung Warentests provning av 24 powerbanks, Ljud & Bilds test av fjorton, Transportstyrelsens regler för batterier i bagage och tillverkarnas egna manualer."
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
