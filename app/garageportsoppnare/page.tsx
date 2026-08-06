import type { Metadata } from "next";

import { testPageTrail, GARAGEPORTSOPPNARE } from "@/lib/test-pages";
import { GARAGEPORTSOPPNARE_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  GARAGEPORTSOPPNARE_FAQ,
  GARAGEPORTSOPPNARE_CONSIDERED,
  GARAGEPORTSOPPNARE_PRODUCTS,
} from "@/lib/data/garageportsoppnare";
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

import Kopguide from "@/content/garageportsoppnare/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, GTIN och butiks-URL:er är verkliga, lästa hos butikerna
 * på PRICE_CHECKED. Dragkraft, portmått och skyddsfunktioner kommer ur
 * tillverkarnas egna bruksanvisningar, hämtade som PDF.
 *
 * Kategorin saknar oberoende provning helt, så det finns inget
 * testomdömekriterium. Se lib/test-pages.ts.
 *
 * ⚠️ Ingen av butikerna har något affiliateprogram. Sidan tjänar i dag
 * ingenting och går inte att annonsera. Se lib/data/garageportsoppnare.ts.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = GARAGEPORTSOPPNARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Hard Head 377011 vinner för 499 kronor: 700 newton, 100 kilo port och byggd mot portstandarderna EN 12453 och EN 13241. Har du småbarn i garaget tar du Chamberlain ML810EV, som sätter ett tak för hur hårt porten får trycka när den stänger. Vi jämförde fem garageportsöppnare från 499 till 2 541 kronor.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "stangningskraften", label: "Kraften som kan skada någon" },
  { id: "jamforelse", label: "Jämför alla fem" },
  { id: "recensioner", label: "Recensioner av varje öppnare" },
  { id: "andra-oppnare", label: "Andra öppnare vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function GarageportsoppnarePage() {
  const style = await getStyle();
  const products = GARAGEPORTSOPPNARE_PRODUCTS;
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
            {/* H1 bär avgränsningen: sidan rankar motorerna, inte de smarta
                modulerna som kopplas till en öppnare du redan har. Samma
                lösning som /brandvarnare mot /smart-brandvarnare. */}
            <h1 className="text-h1">
              Garageportsöppnare bäst i test 2026: fem motorer till
              villagaraget
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Köp Hard Head 377011 för 499 kronor. Den drar en port på 100 kilo
              och 5 meters bredd, alltså även en dubbelport, och den är byggd
              mot EN 12453 och EN 13241, standarderna för maskindrivna portar.
              Har du småbarn som rör sig i garaget tar du Chamberlain ML810EV,
              som är den enda här som sätter ett tak för hur hårt porten får
              trycka på vägen ner. Räkna in en fotocell oavsett vilken du väljer:
              ingen av öppnarna har en i lådan.
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

      {/* --------------------------------------------------- the finding -- */}
      <Section
        id="stangningskraften"
        width="default"
        title="400 newton nedåt, 1000 uppåt: kraften som kan skada någon är en annan"
        description="Talet i produktnamnet beskriver hur tungt öppnaren lyfter, inte hur hårt porten trycker."
      >
        <Prose>
          <p>
            <strong>
              Garageportsöppnare säljs på dragkraft: 550, 700, 800, 1000 newton.
            </strong>{" "}
            Det talet beskriver hur tungt öppnaren orkar lyfta. Det säger
            ingenting om vad som händer på vägen ner, mot ett barn, en cykel
            eller en bilhuv.
          </p>
          <p>
            <strong>Chamberlains öppnare sätter ett tak åt det hållet.</strong>{" "}
            Kraften vid den stängande portkanten får inte överstiga 400 newton,
            och ställs den högre krävs fotocell. Det är mindre än hälften av vad
            samma öppnare drar uppåt, och skillnaden är hela poängen: uppåt ska
            den lyfta en tung port, nedåt ska den ge efter.
          </p>
          <p>
            <strong>Boxer 3000 IIII anger samma tal åt båda hållen.</strong> Max
            1000 newton för både öppning och stängning, alltså inget särskilt tak
            för den riktning som kan klämma någon. Den levereras dessutom med
            automatisk stängning påslagen, så porten kan börja gå ner utan att
            någon tryckt på något. Slå av den funktionen innan du börjar använda
            öppnaren.
          </p>
          <p>
            <strong>Ingen av de fem har fotocell i lådan.</strong> Utan den är
            hinderdetekteringen ditt enda skydd, och den fungerar genom att
            motorn känner motstånd. Porten måste alltså först träffa det som är i
            vägen. För en cykel spelar det ingen roll. För ett barn är det
            skillnaden mellan att porten stannar innan och efter. Räkna in ett par
            hundralappar för en fotocell, och kör hindertestet en gång i månaden:
            lägg ett föremål på golvet, kör porten nedåt, och se att den vänder.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa garageportsöppnarna 2026`}
        description="Varje öppnare passar en egen sorts port. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla fem"
        description="Samma kriterier och samma viktning för alla fem öppnarna."
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
        title="Recensioner av varje öppnare"
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
        id="andra-oppnare"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra öppnare vi övervägde"
        description="Fyra öppnare som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={GARAGEPORTSOPPNARE_CONSIDERED} />
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
          footnote="Skydd vid stängning väger 30 därför att det är den enda axeln där tillverkarna säger olika saker om samma fara, och dragkraften bara 25 därför att den inte är en fast egenskap: på Boxer ställs den i nio steg vid installationen och på Chamberlain lärs den in automatiskt, så talet på kartongen är ett tak och inte en leverans. Säkerhetsstandarder i försäkran väger lika tungt som kraften därför att det är det enda bindande påstående någon tillverkare gör om vad öppnaren gör mot det som står i vägen. En försäkran som åberopar EN 12453 säger något kontrollerbart; ett newtontal på en kartong säger bara hur tungt öppnaren orkar lyfta. Där en öppnare anger vridmoment i newtonmeter i stället för dragkraft i newton har vi låtit cellen stå tom i stället för att räkna om talet, eftersom omräkningen kräver utväxling och kuggdiameter som inte publiceras. Kategorin saknar oberoende provning helt, så det finns inget kriterium för testomdöme."
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
        description="Tillverkarnas bruksanvisningar och försäkringar om överensstämmelse, butikernas produktdata och EU:s register över direktiv."
      >
        <SourceList sources={GARAGEPORTSOPPNARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={GARAGEPORTSOPPNARE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
