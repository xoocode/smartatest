import type { Metadata } from "next";

import { testPageTrail, POWERSTATION } from "@/lib/test-pages";
import { POWERSTATION_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  POWERSTATION_FAQ,
  POWERSTATION_CONSIDERED,
  POWERSTATION_PRODUCTS,
} from "@/lib/data/powerstation";
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

import Kopguide from "@/content/powerstation/kopguide.mdx";

/*
 * ⚠️ Sidan rankar klassen 231 till 1 024 wattimmar, alltså camping, stugan och
 * ett strömavbrott. Hemreservklassen från 2 kWh får en systersida.
 * Avgränsningen nedåt är Stiftung Warentests egen: en powerstation har minst
 * ett 230 V-uttag. Storebror till /powerbank.
 *
 * ⚠️ Effekten står i tre skilda rader — kontinuerlig, topp och boost — eftersom
 * det är tre olika storheter och butikerna blandar dem i samma fält. Talen är
 * hämtade hos tillverkaren. Se lib/data/powerstation.ts.
 *
 * ⚠️ Länkarna går till bästa pris efter användarbeslut 2026-08-05. De två
 * butiker som har sortimentet saknar affiliateprogram, och den butik som har
 * programmet hade noll i lager online. Gapet står utskrivet i metodrutan.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = POWERSTATION;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Powerstation bäst i test 2026: tio portabla kraftstationer jämförda från 1 999 kr. Vid 1 800 watt startar mikron. Se vilka som klarar det.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "talet-i-namnet", label: "Talet i namnet är ingen enhet" },
  { id: "jamforelse", label: "Jämför alla tio" },
  { id: "recensioner", label: "Recensioner av varje powerstation" },
  { id: "andra-powerstations", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function PowerstationPage() {
  const style = await getStyle();
  const products = POWERSTATION_PRODUCTS;
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
            {/* H1 bär avgränsningen: sidan rankar de stationer som har ett
                riktigt vägguttag, alltså inte de större powerbankerna som
                marknadsförs under samma ord. */}
            <h1 className="text-h1">
              Powerstation bäst i test 2026: tio med ström i ett 230-voltsuttag
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vi rekommenderar EcoFlow Delta 3 för 8 799 kronor, eftersom den
              klarar 1 800 watt kontinuerligt, nog för kylskåp, vattenkokare och
              elverktyg. Fyra vägguttag,
              1 024 wattimmar och 4 000 laddcykler till 80 procents kapacitet.
              Ska stationen
              bäras kostar EcoFlow River 3 Plus 3 790 och väger 4,7 kilo mot
              Delta 3:s 12,5. Och läs aldrig kapaciteten ur modellnamnet: talet
              där är ibland watt, ibland wattimmar och ibland ingetdera.
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
        id="talet-i-namnet"
        width="default"
        title="Talet i produktnamnet är ibland watt, ibland wattimmar och ibland ingetdera"
        description="Watt säger vad som går att koppla in. Wattimmar säger hur länge det kan gå."
      >
        <Prose>
          <p>
            <strong>
              Cocraft Advance 240 lagrar 231 wattimmar och lämnar 200 watt.
            </strong>{" "}
            Talet i namnet är alltså varken kapaciteten eller effekten. Cocraft
            Advance 500 lagrar 386 wattimmar och lämnar 500 watt, så där är
            talet effekten. TogoPower Advance 650 lagrar 634 och lämnar 500.
            Jackery Explorer 1000 Pro lagrar 1 002 och lämnar 1 000, så där
            stämmer båda tolkningarna av en slump. EcoFlow numrerar inte alls.
          </p>
          <p>
            <strong>Watt-talet finns dessutom i tre versioner.</strong>{" "}
            Kontinuerlig effekt är vad växelriktaren orkar hela tiden.
            Toppeffekt är sekunderna när en motor startar och drar två till tre
            gånger sin märkeffekt. Boosteffekt heter X-Boost hos EcoFlow och
            SurgePad hos Anker, och där sänker stationen utspänningen för att
            klara mer än den egentligen orkar. Det fungerar på sådant som ska
            bli varmt, men inte på motorer och elektronik.
          </p>
          <p>
            <strong>
              Samma artikel kan därför bära två olika watt-tal i två svenska
              butiker.
            </strong>{" "}
            Anker Solix C2000 Gen 2 har samma streckkod var den än säljs.
            Tillverkarens egen specifikation anger 2 400 watt kontinuerligt och
            4 000 watt topp. Prisjakt publicerar 2 400. Elgigantens fält som
            heter Max. AC publicerar 4 000. Ingen har fel, men de har valt olika
            tal ur samma tabell utan att säga vilket.
          </p>
          <p>
            <strong>
              Därför står effekten i tre skilda rader i tabellen nedan,
            </strong>{" "}
            och varje kontinuerligt watt-tal är hämtat hos tillverkaren. Slås de
            ihop till en rad ser 1 800 och 2 400 ut som jämförbara tal för samma
            sak, och det är de inte.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa powerstationerna 2026`}
        description="Varje station löser en egen sorts strömbrist. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tio"
        description="Samma kriterier och samma viktning för alla tio."
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
        title="Recensioner av varje powerstation"
        description="Alla tio bedöms mot samma fem kriterier."
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
        id="andra-powerstations"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Sju stationer som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={POWERSTATION_CONSIDERED} />
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
          footnote="Viktningen följer formen i den enda riktiga labbprovning kategorin har, ett tyskt test av elva powerstations från juli 2023. Energi och effekt väger 30 därför att det är den fråga läsaren kommer med, och säkerhet och livslängd 25 därför att skillnaden mellan cellkemierna är en faktor tre till fyra på hur länge produkten lever och inte syns i priset. Effekten står i tre skilda rader eftersom kontinuerlig, topp och boost är tre olika storheter, och talen är hämtade hos tillverkaren sedan två svenska säljkanaler visat sig publicera 2 400 respektive 4 000 watt för samma streckkod. Där en uppgift saknas står ett streck, och strecket sänker aldrig ett betyg: ett batteri håller lika länge vare sig cykeltalet står tryckt någonstans eller inte. Vi räknar aldrig om ett cykeltal ur cellkemin och lånar aldrig ett värde från en systermodell. Kapslingsklasser som tillverkaren bara utfärdat för batteripaketet står utskrivna som just det. Provningen är för gammal för att knytas till någon produkt här och resultaten per modell ligger bakom en betalvägg vi inte betalat, så det finns inget kriterium för testomdöme. Länkarna går till lägsta pris hos den butik som faktiskt för produkten, vilket i den här kategorin betyder att flera av dem går till butiker vi inte tjänar något på."
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
        description="Stiftung Warentests provning av elva powerstations, M3:s svenska grupptest, Ankers och EcoFlows egna datablad matchade på streckkod, och bruksanvisningarna från Cocraft och TogoPower i original."
      >
        <SourceList sources={POWERSTATION_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={POWERSTATION_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing", "electrical"]} className="mb-block" />
      </Container>
    </>
  );
}
