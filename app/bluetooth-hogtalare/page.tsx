import type { Metadata } from "next";

import { testPageTrail, BLUETOOTH_HOGTALARE } from "@/lib/test-pages";
import { BLUETOOTH_HOGTALARE_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  BLUETOOTH_HOGTALARE_FAQ,
  BLUETOOTH_HOGTALARE_CONSIDERED,
  BLUETOOTH_HOGTALARE_PRODUCTS,
} from "@/lib/data/bluetooth-hogtalare";
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

import Kopguide from "@/content/bluetooth-hogtalare/kopguide.mdx";

/*
 * ⚠️ Produkter, priser och specifikationer är verkliga, lästa hos Elon på
 * PRICE_CHECKED med scripts/fetch.mjs.
 *
 * ⚠️ LJUDET ÄR INTE BETYGSATT. Ingen har satt poäng på det i kategorin, och vi
 * har inte lyssnat på en enda högtalare. Ljud & Bild provade sju av modellerna
 * men publicerar prosaomdömen utan betyg, vilket är kontrollerat recension för
 * recension: noll av sju bär ett betyg. Deras omdömen återges per modell med
 * publikationen namngiven och påverkar inga poäng.
 *
 * ⚠️ Speltiden anges två gånger på butikens produktsida och talen skiljer sig
 * för de två modeller som anger flest timmar. Båda talen står i tabellen och
 * betygen använder det lägre. Se lib/spec-schema.mjs, ALDRIG_BEDOMD.
 *
 * ⚠️ Vikten kommer aldrig från butikens fält, som för en modell anger mer än
 * dubbla den verkliga vikten.
 *
 * ⚠️ Vi bedömer ALDRIG om en enskild högtalare omfattas av undantaget i artikel
 * 11.2 a i batteriförordningen. Det är tillverkarens bedömning.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 */

const TEST_PAGE = BLUETOOTH_HOGTALARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "JBL Charge 6 för 1 690 kr vinner: 34 wattimmar batteri, IP68 och powerbank i samma paket. Vi jämför tio bärbara Bluetooth-högtalare från 790 till 3 490 kronor på batteri, tålighet och vikt.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "batteriet", label: "Batteriet blir utbytbart 2027" },
  { id: "jamforelse", label: "Jämför alla tio" },
  { id: "recensioner", label: "Recensioner av varje högtalare" },
  { id: "andra-hogtalare", label: "Andra högtalare vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function BluetoothHogtalarePage() {
  const style = await getStyle();
  const products = BLUETOOTH_HOGTALARE_PRODUCTS;
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
              Bluetooth-högtalare bäst i test 2026: tio bärbara från 790 till
              3&nbsp;490 kr
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              JBL Charge 6 för 1 690 kronor vinner: 34 wattimmar batteri mot de
              flestas 12 till 18, 24 timmars speltid och IP68, den högsta
              kapslingsklassen i jämförelsen. Den laddar dessutom telefonen ur
              samma batteri, vilket räddar kvällen när mobilen står på tjugo
              procent. Ska högtalaren i stället klippas fast i en ryggsäcksrem
              tar du JBL Clip 5 för 790 kronor, och ska varje krona räknas ger
              Charge Essential 3 samma powerbank och 20 timmars speltid för
              1&nbsp;290.
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
        id="batteriet"
        width="default"
        title="Batteriet blir utbytbart den 18 februari 2027"
      >
        <Prose>
          <p>
            En bärbar högtalare säljs nästan alltid med batteriet inbyggt.
            Cellen tappar kapacitet för varje laddcykel, och den dag den inte
            håller en kväll är högtalaren förbrukad, trots att element,
            förstärkare och kabinett fungerar. Det är den vanligaste orsaken till
            att en fungerande högtalare slängs.
          </p>
          <p>
            Den 18 februari 2027 börjar artikel 11 i EU:s batteriförordning
            tillämpas. Den kräver att ett bärbart batteri lätt ska kunna
            avlägsnas och ersättas av användaren själv, när som helst under
            produktens livslängd, med verktyg som finns i vanlig handel. Varken
            värme eller lösningsmedel får behövas, vilket är just det ett limmat
            och förseglat chassi kräver i dag.
          </p>
          <p>
            Det finns ett undantag, och det är skrivet för produkter som de här.
            Apparater som är särskilt utformade för att främst användas i en
            miljö med vattenstänk, strömmande vatten eller nedsänkning får nöja
            sig med att batteriet kan bytas av en oberoende yrkesutövare. Det
            tar alltså inte bort kravet, det flyttar vem som får utföra bytet.
            Och undantaget gäller bara om det behövs för användarens och
            apparatens säkerhet.
          </p>
          <p>
            Vattentätheten är samtidigt det kategorin säljer på. Nio av de tio
            högtalarna här bär en klassning som täcker nedsänkning. Samma
            egenskap som gör att högtalaren tål stranden är alltså den enda
            vägen till ett undantag från kravet på att du själv ska kunna byta
            batteri.
          </p>
          <p>
            Vad varje tillverkare kommer att göra vet vi inte, och vi gissar
            inte. Det som går att säga i dag är att frågan får ett svar inom
            arton månader, och att svaret avgör hur länge högtalaren du köper nu
            går att använda.
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
        title={`De ${products.length} bästa bärbara Bluetooth-högtalarna 2026`}
        description="Varje högtalare fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tio"
        description="Samma kriterier och samma viktning för alla tio. Raden att läsa först är batterikapaciteten i wattimmar: den är den enda energisiffran som går att jämföra rakt av mellan modeller."
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
        title="Recensioner av varje högtalare"
        description="Tio bärbara mellan 790 och 3 490 kronor, bedömda på batteri, tålighet, vikt och anslutning. Ljudet är inte betygsatt, och skälet står i metoden."
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
        id="andra-hogtalare"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra högtalare vi övervägde"
        description="Sex modeller som fanns i samma hylla men inte i rankningen. De flesta är för tunga för att räknas som bärbara, och två saknar batteri helt."
      >
        <ConsideredList items={BLUETOOTH_HOGTALARE_CONSIDERED} />
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
          footnote="Ljudkvaliteten är inte betygsatt, och det är sidans viktigaste begränsning. Vi har inte lyssnat på någon av högtalarna, och det finns ingen publicerad poängsättning att luta sig mot: Ljud & Bild provade sju av modellerna i juli 2025 men skriver prosaomdömen utan betyg, vilket vi kontrollerat genom att läsa alla sju recensionerna och söka efter betyg, poäng och stjärnor i var och en. Deras omdöme om en enskild modell återges i vår recension av just den modellen, med publikationen namngiven, och det påverkar inga poäng.\n\nBatteri och livslängd väger 28 därför att batteriet i praktiken avgör hur länge produkten finns till, och därför att ett EU-krav på utbytbara batterier börjar tillämpas i februari 2027 med ett undantag skrivet för vattentäta apparater. Vi betygsätter inte hur en tillverkare kommer att förhålla sig till det kravet.\n\nSpeltid, wattimmar och Bluetooth-version är hämtade från tillverkarens egen publicering där den finns, och annars från två oberoende butiker som anger samma tal. Vikt hämtas från tillverkaren eller från oberoende test och aldrig från butikens fält, som för en modell anger mer än dubbla den verkliga vikten. Kapslingsklassen är tillverkarens uppgift, men den är standardiserad och därför jämförbar. En uppgift som en tillverkare inte skriver ut sänker aldrig ett betyg.\n\nSex av tio högtalare kommer från JBL eller Harman Kardon, alltså samma koncern, vilket speglar butikens sortiment och inte vårt urval."
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
        description="Batteriförordningen i original, det enda svenska testet av kategorin, och butiken priserna är lästa hos."
      >
        <SourceList sources={BLUETOOTH_HOGTALARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={BLUETOOTH_HOGTALARE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
