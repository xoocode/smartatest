import type { Metadata } from "next";

import { RORELSEVAKT_UTOMHUS, testPageTrail } from "@/lib/test-pages";
import { RORELSEVAKT_UTOMHUS_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  RORELSEVAKT_UTOMHUS_CONSIDERED,
  RORELSEVAKT_UTOMHUS_FAQ,
  RORELSEVAKT_UTOMHUS_FILTERS,
  RORELSEVAKT_UTOMHUS_PRODUCTS,
} from "@/lib/data/rorelsevakt-utomhus";
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

import Kopguide from "@/content/rorelsevakt-utomhus/kopguide.mdx";

/*
 * Produkter, priser, kundbetyg och butiks-URL:er är riktiga, lästa ur
 * butikernas egen JSON-LD på PRICE_CHECKED. Räckvidder, LED-laster, luxområden
 * och omgivningstemperaturer hämtade i tillverkarnas egna datablad: Steinels
 * produktdatablad per EAN, ESYLUX svenska produktsidor och Nexas bruksanvisning.
 * Kriteriebetygen är redaktionell bedömning utifrån specifikationer och källor
 * snarare än mätningar.
 *
 * ⚠️ Rankningen täcker bara Kjell, Proffsmagasinet, Proshop och Teknikproffset
 * efter användarbeslut 2026-08-07. Sex produkter hos butiker utan program ligger
 * bland övervägda, och skälet står utskrivet i den sektionens beskrivning.
 *
 * AFFILIATE-SWAP — läs lib/links.ts för vad LINK_MODE faktiskt står på i dag.
 */

const TEST_PAGE = RORELSEVAKT_UTOMHUS;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-07";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Rörelsevakt utomhus bäst i test 2026: nio rörelsedetektorer jämförda från 200 kr. Bästa vakten bevakar 804 kvadratmeter. Se vilken.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "rackvidden", label: "Räckvidden gäller tvärs, inte rakt emot" },
  { id: "jamforelse", label: "Jämför alla nio" },
  { id: "recensioner", label: "Recensioner av varje rörelsevakt" },
  { id: "andra-vakter", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function RorelsevaktUtomhusPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = RORELSEVAKT_UTOMHUS_PRODUCTS;
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
              Vår testvinnare är ESYLUX RC 230i för 1 645 kronor, eftersom den
              bevakar 804 kvadratmeter, fyra gånger så mycket som näst bästa vakt
              här. De två sensorhalvorna ställs dessutom var för sig. Ska den
              bara tända över garageporten gör
              Steinel IS 1 samma jobb för 269 kronor. Vi jämförde nio stycken,
              och talet att läsa noggrannast är räckvidden: den gäller den som
              går tvärs över synfältet, och rakt emot ser sensorn tre meter.
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

      {/* ------------------------------------------------------- fyndet -- */}
      {/* Ligger högt med flit. Det är sidans enda verkliga nyhet, och den
          avgör vilken vakt läsaren ska köpa innan hen ser en tabell. */}
      <Section
        id="rackvidden"
        width="default"
        title="Tolv meter tvärs blir tre meter rakt emot"
        description="Två tillverkare publicerar båda talen i sina egna datablad, och handeln för bara det större vidare. Skillnaden avgör var på huset sensorn ska sitta."
      >
        <Prose>
          <p>
            En pyrodetektor mäter inte värme. Den mäter förändring i värme mellan
            intilliggande segment i linsen. Går någon tvärs över synfältet
            passerar kroppen segment efter segment och sensorn ser en tydlig
            växling. Kommer någon rakt emot fyller kroppen samma segment hela
            vägen in, och växlingen uteblir tills personen är nära.
          </p>
          <p>
            Steinel och ESYLUX skriver ut båda avstånden i sina produktdatablad.
            Steinel IS 2160 ECO når 12 meter tvärs och 3 meter rakt emot; IS 1
            når 10 respektive 3. ESYLUX MD 120 når 12 respektive 5, MD 200 Ø 20
            mot Ø 10 och RC 230i Ø 40 mot Ø 16. Två tillverkare, fem produkter,
            och kvoten ligger mellan två och fyra gånger.
          </p>
          <p>
            <strong>
              Rikta därför vakten så att den som närmar sig korsar synfältet.
            </strong>{" "}
            En sensor som tittar rakt ut längs uppfarten ser en bil som kommer i
            det sämsta av alla lägen. Vrid den mot sidan i stället, så att
            uppfarten passerar tvärs framför linsen.
          </p>
          <p>
            Samma sak gäller wattalet. Det i annonsen är en glödlampssiffra:
            Steinel IS 2160 ECO är märkt 600 W för glödljus men tar 100 W av
            LED-lampor under 2 W, 125 W av lampor mellan 2 och 8 W och 250 W av
            lampor över 8 W. Det är kondensatorn i varje drivdon som laddas i
            tändögonblicket, så tio små lampor är hårdare mot reläet än två stora
            med samma sammanlagda effekt.
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
        title={`De ${products.length} bästa rörelsevakterna för utomhusbruk 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla nio"
        description="Filtrera på bevakningsvinkel. Räckviddsraden bär sitt villkor i cellen, eftersom tvärs och rakt emot är två olika tal. Raden Last LED anges av fyra tillverkare i fyra olika enheter, och de går inte att räkna om mellan sig."
      >
        <FilterableComparison
          products={products}
          filters={RORELSEVAKT_UTOMHUS_FILTERS}
          legend="Filtrera på bevakningsvinkel"
          layout={style.table}
          variant="bordered"
          caption={priceCaption(
            PRICE_CHECKED,
            "Rankningen täcker de butiker vi länkar till. Sex vakter som bara säljs på annat håll, däribland de två under hundralappen, ligger bland övervägda längre ned.",
          )}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje rörelsevakt"
        description="Alla nio bedöms mot samma fem kriterier. Kategorin saknar helt oberoende tester, så det finns inget kriterium för testomdöme här, till skillnad från på våra andra sidor."
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
        id="andra-vakter"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Tio produkter som fanns med i urvalet men inte i rankningen. Sex av dem säljs bara av butiker vi inte länkar till, och de är alltså inte bortvalda på egenskaper: Steinel IS 240 är kategorins bredaste 230-voltsvakt, och de två billigaste kostar under hundralappen. Pris och specifikationer står kvar så att du kan köpa dem ändå."
      >
        <ConsideredList items={RORELSEVAKT_UTOMHUS_CONSIDERED} />
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
          footnote="Den här kategorin saknar kriteriet Omdöme i oberoende tester, som finns på flera av våra övriga sidor. Skälet är att det inte existerar ett enda oberoende test av rörelsevakter för utomhusbruk på någon nordisk marknad: varken Råd & Rön, Ljud & Bild eller tek.no har provat kategorin, och de listor som ligger högst i sökresultatet rankar utan att ha provat en enda vakt. Vi väger hellre bort ett kriterium än fyller det med användarbetyg och kallar det test. Priserna är hos den butik vi länkar till."
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
        description="Notera vad som saknas: det finns inget oberoende test av rörelsevakter för utomhusbruk på någon nordisk marknad. Listan består därför av myndighetskällor, tillverkare och en distributörs tekniska data, citerade för vad de är."
      >
        <SourceList sources={RORELSEVAKT_UTOMHUS_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={RORELSEVAKT_UTOMHUS_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "electrical", "pricing"]}
          className="mb-block"
        />
      </Container>
    </>
  );
}
