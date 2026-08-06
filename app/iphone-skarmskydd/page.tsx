import type { Metadata } from "next";

import { testPageTrail, IPHONE_SKARMSKYDD } from "@/lib/test-pages";
import { IPHONE_SKARMSKYDD_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  IPHONE_SKARMSKYDD_FAQ,
  IPHONE_SKARMSKYDD_CONSIDERED,
  IPHONE_SKARMSKYDD_PRODUCTS,
} from "@/lib/data/iphone-skarmskydd";
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

import Kopguide from "@/content/iphone-skarmskydd/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, artikelnummer och butiks-URL:er är verkliga, lästa hos
 * iPhonebutiken på PRICE_CHECKED. Specifikationerna kommer från butikens och
 * tillverkarnas egna produktsidor.
 *
 * ⚠️ Inget skärmskydd här är provat, varken av oss eller av någon annan.
 * Råd & Rön och Testfakta har ingen provning av kategorin. Den enda riktiga
 * labbprovning som hittats är connect 12/2014, som gäller folier och inte
 * innehåller någon av de rankade produkterna. Därför finns inget kriterium för
 * testomdöme, och sidan säger det rakt ut enligt IDÉ-012.
 *
 * ⚠️ Hårdhetstalet 9H ingår i inget betygsatt mätvärde. ASTM D3363 och
 * ISO 15184 är standarder för färg och lack, skalan slutar på 9H, och ISO
 * skriver i sitt eget abstract att metoden inte duger till att jämföra olika
 * beläggningar. Se lib/spec-schema.mjs, ALDRIG_BEDOMD.
 *
 * ⚠️ Lagerstatus väger inte in och nämns inte, efter användarbeslut
 * 2026-08-05.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = IPHONE_SKARMSKYDD;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Spigen Glas.tR EZ Fit för 249 kr vinner: två glas, en monteringsbygel och skydd även över sensorerna. Vi jämför femton skärmskydd till iPhone 17 Pro från 69 till 399 kronor på täckning, montering och pris per skydd.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilket ska du köpa?" },
  { id: "harheten", label: "9H är taket på en färgskala" },
  { id: "jamforelse", label: "Jämför alla femton" },
  { id: "recensioner", label: "Recensioner av varje skydd" },
  { id: "andra-skydd", label: "Andra skydd vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function IphoneSkarmskyddPage() {
  const style = await getStyle();
  const products = IPHONE_SKARMSKYDD_PRODUCTS;
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
              iPhone skärmskydd bäst i test 2026: femton skydd till iPhone 17
              Pro, från 69 till 399 kr
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Spigen Glas.tR EZ Fit för 249 kronor vinner, därför att asken
              innehåller två glas och en bygel som lägger dem rakt första
              gången, och för att skyddet också täcker sensorerna ovanför
              skärmen. Ska det bara bli billigt kostar Enkays tvåpack 99,50
              kronor per glas. Talet 9H som står på tio av femton kartonger säger
              mindre än du tror, och det är hela anledningen till att sidan
              finns.
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
        id="harheten"
        width="default"
        title="9H är taket på en skala för färg och lack"
      >
        <Prose>
          <p>
            Tio av de femton skydden här är märkta 9H. Talet ser ut som ett
            mätvärde, alltså något som skiljer ett bra skydd från ett sämre, men
            det är en beteckning på en skala som slutar där.
          </p>
          <p>
            Skalan går från 6B, mjukast, till 9H, hårdast, och den mäter hur hård
            en blyertspenna får vara innan den repar en yta. Metoden står i två
            standarder, ASTM D3363 och ISO 15184, och båda är skrivna för färg
            och lack. Den ena beskriver provet som ett sätt att bestämma
            hårdheten hos en organisk beläggning på metall.
          </p>
          <p>
            Att alla anger 9H betyder därför inte att alla är lika bra. Det
            betyder att ingen kan ange mer.
          </p>
          <p>
            Standarden säger dessutom själv att talet inte lämpar sig för det som
            butiken använder det till. ISO skriver att metoden inte har visat sig
            användbar för att jämföra pennhårdheten hos olika beläggningar.
            Utfallet varierar mellan laboratorier och mellan pennfabrikat, och
            det avgörs också av hur hårt pennan trycks mot ytan. Vilken last
            talet gäller vid är okänt för samtliga skydd i handeln.
          </p>
          <p>
            Talet förväxlas ofta med Mohs skala, den för mineraler där diamant är
            10 och korund 9. Det är en annan mätning. På den skalan ligger glas
            på ungefär 5,5 och kvarts, alltså vanlig sand, på 7. Sanden i fickan
            är hårdare än varje skärmskydd som säljs, oavsett vad som står på
            kartongen, medan en nyckel av stål oftast inte lämnar något märke.
          </p>
          <p>
            Därför betygsätter vi ingen hårdhet här. Det som går att jämföra är
            hur mycket av skärmen glaset täcker, vad som ligger i asken och vad
            ett skydd faktiskt kostar. Priset avgör inte heller det: det
            billigaste tvåpacket kostar 99,50 kronor per glas och är tunnare än
            skyddet för 399.
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
        title={`De ${products.length} bästa skärmskydden till iPhone 17 Pro 2026`}
        description="Varje skydd fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla femton"
        description="Samma kriterier och samma viktning för alla femton skydden. Raden att läsa först är täckningen: en tappad telefon landar på en kant, och det är där skydden skiljer sig mest."
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
        title="Recensioner av varje skydd"
        description="Femton skydd mellan 69 och 399 kronor, bedömda på hur mycket av skärmen de täcker, hur troligt det är att de hamnar rakt vid första försöket och vad ett skydd på skärmen kostar."
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
        id="andra-skydd"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra skydd vi övervägde"
        description="Sex artiklar som låg i samma hylla men inte i rankningen, och skälet till att de föll bort. De flesta av dem skyddar kameran och inte skärmen."
      >
        <ConsideredList items={IPHONE_SKARMSKYDD_CONSIDERED} />
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
            "Skydd och täckning väger 47 därför att det är det köparen betalar för, och därför att det är det enda i kategorin som går att bedöma på något annat än ett påstående.\n\nSidan har inget kriterium för testomdöme. Råd & Rön och Testfakta har ingen provning av skärmskydd, och den enda riktiga labbprovning vi hittat är från 2014, gäller folier och innehåller ingen av produkterna här.\n\nHårdhetstalet 9H betygsätts inte alls. Det är taket på pennskalan i ASTM D3363 och ISO 15184, alltså standarder för färg och lack, ISO skriver i sitt eget abstract att metoden inte duger till att jämföra olika beläggningar, och utfallet avgörs av en provlast som inte anges för något skydd i handeln. Talet står kvar i tabellen därför att köparen letar efter det, men det påverkar ingen placering.\n\nGarantitiden står i tabellen av samma skäl och väger inte heller in. Spannet går från 6 månader till livstid och är värt att läsa på ett skydd som byts oftare än telefonen, men vad butiken lovar efteråt är något annat än vad glaset gör på skärmen. Lagerstatus väger inte in, efter användarbeslut."
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
        description="De två standarderna bakom hårdhetstalet, mineralskalan de förväxlas med, och de svenska jämförelser som rankar samma produkter."
      >
        <SourceList sources={IPHONE_SKARMSKYDD_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={IPHONE_SKARMSKYDD_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
