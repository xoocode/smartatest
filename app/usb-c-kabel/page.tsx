import type { Metadata } from "next";

import { testPageTrail, USB_C_KABEL } from "@/lib/test-pages";
import { USB_C_KABEL_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  USB_C_KABEL_FAQ,
  USB_C_KABEL_CONSIDERED,
  USB_C_KABEL_PRODUCTS,
} from "@/lib/data/usb-c-kabel";
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

import Kopguide from "@/content/usb-c-kabel/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, kundbetyg och butiks-URL:er är verkliga, lästa hos
 * butikerna på PRICE_CHECKED. Specifikationerna kommer från butikernas egna
 * produktsidor, utom Anker Nanos datahastighet som är hämtad från Ankers egen
 * europeiska produktsida: Amazons specifikationstabell anger den i gigabyte per
 * sekund, en enhet som inte finns.
 *
 * ⚠️ Ingen kabel här är provad, varken av oss eller av någon annan. Den enda
 * oberoende provningen i kategorin är Testfaktas, där PZT böjde tolv laddkablar
 * 5 000 gånger 2020, och samtliga sex USB-C-kablar där är USB-A-formen. Sidan
 * rankar bara USB-C till USB-C, alltså noll överlapp. Metoden och resultaten bär
 * köpguiden, aldrig en betygskolumn.
 *
 * ⚠️ Tillverkarnas böjtal ingår i inget kriterium. Anker anger 5 000 till
 * 300 000 böjningar över sitt eget sortiment utan publicerad metod. Se
 * lib/spec-schema.mjs, ALDRIG_BEDOMD.
 *
 * ⚠️ Kriteriet öppen redovisning togs bort 2026-08-06 och vikten fördelades
 * proportionellt över de fyra som är kvar. Samtidigt rättades nio felaktiga
 * påståenden om att en uppgift inte gick att få tag på. Tabellen över vad som
 * stod var, och de två påståenden som höll, ligger i lib/data/usb-c-kabel.ts.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = USB_C_KABEL;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "USB-C-kabel bäst i test 2026: tretton laddkablar jämförda från 59 kr. Sju av tretton kör USB 2-fart. Se vilka som är snabbare.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "tva-kablar", label: "Trettio kronor, 83 gånger" },
  { id: "jamforelse", label: "Jämför alla tretton" },
  { id: "recensioner", label: "Recensioner av varje kabel" },
  { id: "andra-kablar", label: "Andra kablar vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function UsbCKabelPage() {
  const style = await getStyle();
  const products = USB_C_KABEL_PRODUCTS;
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
                ordet kabel täcker även USB-A, Lightning och HDMI i samma hylla,
                och den här jämförelsen rankar bara USB-C i båda ändar. */}
            <h1 className="text-h1">
              USB-C-kabel bäst i test 2026: tretton kablar med USB-C i båda
              ändar, från 59 till 1&nbsp;099 kr
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vår testvinnare är Delock 240 W för 199 kronor, eftersom den
              överför 40 gigabit i sekunden och tål 240 watt, till samma pris som
              kablarna som bara laddar. Den driver dessutom en 8K-skärm.
              Ska sladden enbart ladda en telefon räcker IKEA:s för 59
              kronor, och skillnaden mellan de två syns inte på kontakten.
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

      {/* --------------------------------------- fyndet, före tabellen -- */}
      <Section
        id="tva-kablar"
        width="default"
        title="Trettio kronor isär, 83 gånger i skillnad"
      >
        <Prose>
          <p>
            Två USB-C-kablar bredvid varandra säger ingenting om vad de gör.
            Kontakten är densamma i hela kategorin, och innanför den skiljer
            produkterna mer än i någon annan tillbehörshylla.
          </p>
          <p>
            Hos Kjell ligger en flätad 240-wattskabel på 299,90 kronor och anger
            480 megabit i sekunden. Trettio kronor högre upp, i samma butik,
            ligger en USB4-kabel på 329 kronor som anger 40 gigabit. Det är
            83 gånger mer data, och den dyrare av de två är den långsamma. Hos
            Teknikdelar kostar en kabel som gör 40 gigabit och 240 watt 199
            kronor, alltså hundra kronor mindre än den som gör 480 megabit.
          </p>
          <p>
            Anledningen är att effekt och data går genom olika ledare. En
            USB-C-kontakt har 24 stift, och en tillverkare som vill spara kopplar
            helt enkelt inte de åtta som bär de snabba datakanalerna. En kabel
            kan därför vara märkt 240 W och samtidigt vara den långsammaste i
            butiken.
          </p>
          <p>
            Det gäller uppåt i pris också. Den dyraste rena laddkabeln i
            jämförelsen kostar 399 kronor, och Clas Ohlson anger i sin
            specifikation att dataöverföringen sker i USB 2-hastighet, alltså
            samma dataklass som IKEA:s kabel för 59.
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
        title={`De ${products.length} bästa USB-C-kablarna 2026`}
        description="Varje kabel fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tretton"
        description="Samma kriterier och samma viktning för alla tretton kablarna. Raden att läsa först är datahastigheten: den skiljer 83 gånger mellan topp och botten, och den syns inte på kabeln."
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
        title="Recensioner av varje kabel"
        description="Tretton kablar mellan 59 och 1 099 kronor, bedömda på vad de flyttar, vad metern kostar och hur mycket effekt de släpper fram."
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
        id="andra-kablar"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra kablar vi övervägde"
        description="Sju kablar som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort. Två av dem löser andra problem än det den här jämförelsen handlar om."
      >
        <ConsideredList items={USB_C_KABEL_CONSIDERED} />
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
          footnote="Datahastigheten väger 35 därför att den är den egenskap som skiljer kategorin mest och syns minst, och prisvärde per meter 30 därför att modellerna säljs i allt från 0,3 till 3 meter: utan den normaliseringen hade den kortaste kabeln vunnit på att vara kort. Sidan har inget kriterium för testomdöme. Den enda oberoende provningen i kategorin är Testfaktas från 2020, och samtliga sex USB-C-kablar där är USB-A-formen, som den här sidan inte rankar, så en betygskolumn hade blivit tom för varenda kabel. Tillverkarnas egna böjtal betygsätts inte heller: ingen publicerar en metod, och samma tillverkare anger allt mellan 5 000 och 300 000 böjningar för olika produkter i sitt eget sortiment. Fram till den 6 augusti 2026 vägde ett femte kriterium, öppen redovisning, 15 av 100. Det är borttaget: hur lätt en uppgift är att hitta säger något om säljaren och ingenting om kabeln, och två kablar som gör samma sak hamnade på olika plats av ett skäl köparen inte kan använda. Vikten är fördelad proportionellt över de fyra som är kvar, och en uppgift vi inte har står som ett streck i tabellen."
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
        description="Direktivet om den gemensamma laddaren, USB-IF:s regler för certifiering, och den svenska provningen där tyska laboratoriet PZT böjde tolv laddkablar 5 000 gånger åt Testfakta."
      >
        <SourceList sources={USB_C_KABEL_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={USB_C_KABEL_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
