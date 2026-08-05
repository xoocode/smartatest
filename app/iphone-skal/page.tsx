import type { Metadata } from "next";

import { testPageTrail, IPHONE_SKAL } from "@/lib/test-pages";
import { IPHONE_SKAL_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  IPHONE_SKAL_FAQ,
  IPHONE_SKAL_CONSIDERED,
  IPHONE_SKAL_PRODUCTS,
} from "@/lib/data/iphone-skal";
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

import Kopguide from "@/content/iphone-skal/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, artikelnummer och butiks-URL:er är verkliga, lästa hos
 * iPhonebutiken på PRICE_CHECKED. Specifikationerna kommer från butikens egna
 * produktsidor.
 *
 * ⚠️ Inget skal här är provat, varken av oss eller av någon annan. Kategorin
 * saknar oberoende provning helt: Råd & Rön provar mobiler men inte skal,
 * Testfakta har ingen provning, och Stiftung Warentests fallprov gäller
 * vattentäta dykhus. Därför finns inget kriterium för testomdöme, och sidan
 * säger det rakt ut enligt IDÉ-012.
 *
 * ⚠️ Angiven fallhöjd och angiven militärstandard ingår i inget betygsatt
 * mätvärde. MIL-STD-810 är läst i original i tre utgåvor, och del ett §1.2 b
 * säger att det inte är giltigt att betrakta en metods provvillkor som
 * oföränderliga. Se lib/spec-schema.mjs, ALDRIG_BEDOMD.
 *
 * ⚠️ H1 bär avgränsningen, som på /brandvarnare och /smart-termostat: ordet
 * skal täcker även plånboksfodral, skärmskydd och kameralinsskydd i samma
 * hylla, och den här jämförelsen rankar bara skyddsskal.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = IPHONE_SKAL;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-05";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Spigen Rugged Armor MagFit för 349 kr vinner: stötdämpande skum i hörnen och ett helt inbyggt kamerablock. Vi jämför tolv skal till iPhone 17 från 99 till 1 099 kronor på konstruktion, redovisat skydd och magnetring.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilket ska du köpa?" },
  { id: "plywooden", label: "Plywooden som byttes mot stål" },
  { id: "jamforelse", label: "Jämför alla tolv" },
  { id: "recensioner", label: "Recensioner av varje skal" },
  { id: "andra-skal", label: "Andra skal vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function IphoneSkalPage() {
  const style = await getStyle();
  const products = IPHONE_SKAL_PRODUCTS;
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
              iPhone-skal bäst i test 2026: tolv skyddsskal till iPhone 17, från
              99 till 1&nbsp;099 kr
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Spigen Rugged Armor MagFit för 349 kronor vinner, därför att den
              lägger stötdämpande skum i hörnen och bygger in hela kamerablocket
              så linserna aldrig möter bordet. Ska skalet bara hålla repor borta
              räcker Trolsks matta för 99. Talet om militärstandard som står på
              nästan varje kartong säger mindre än du tror, och det är hela
              anledningen till att sidan finns.
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
        id="plywooden"
        width="default"
        title="Plywooden i falltestet byttes mot stål 2014"
      >
        <Prose>
          <p>
            Nästan varje skal i hyllan säger något om fall. Ett anger 3 meter,
            ett annat 4,5, ett tredje 7,6. Några säger bara militärklassad.
            Talen går tillbaka på MIL-STD-810, ett amerikanskt försvarsdokument
            som beskriver hur utrustning provas, och det går att ladda ner och
            läsa.
          </p>
          <p>
            Varje förklaring av uttrycket som går att hitta beskriver samma prov:
            26 fall från 122 centimeter mot fem centimeter plywood ovanpå betong.
            Den beskrivningen stämde fram till den 15 april 2014. Då gjorde en
            ändring stålplåt till förvalt underlag, och utgåvan från 2019 behöll
            stålet och tillåter plywood bara i två namngivna undantagsfall.
          </p>
          <p>
            Skillnaden avgör utfallet, och skälet står i dokumentet: den
            värsta skadan uppstår vid stöt mot en massa som inte ger efter och
            absorberar minimalt med energi. Plywood ger efter. En stålplåt på
            minst 76 millimeter och 200 Brinell gör det inte.
          </p>
          <p>
            Två saker till är värda att veta. De 26 fallen får enligt tabellens
            fotnot delas på upp till fem provexemplar, alltså ungefär fem fall
            vardera. Och i dokumentets första del står att det inte är giltigt
            att betrakta en metods provvillkor som oföränderliga. Höjden,
            antalet och underlaget får alltså anpassas av den som provar.
          </p>
          <p>
            Därför betygsätter vi inga fallhöjder här. Det som går att jämföra är
            konstruktionen du kan se på skalet, och hur mycket säljaren skriver
            ut. Precisionen följer inte priset: skalet för 259 kronor anger både
            utgåva och metodnummer, medan det för 1 099 anger 7,6 meter utan att
            namnge någon standard alls.
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
        title={`De ${products.length} bästa iPhone-skalen 2026`}
        description="Varje skal fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tolv"
        description="Samma kriterier och samma viktning för alla tolv skalen. Raden att läsa först är hörnkonstruktionen: en telefon som faller landar nästan aldrig platt, och det är där kraften tas upp."
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
        title="Recensioner av varje skal"
        description="Tolv skal mellan 99 och 1 099 kronor, bedömda på hur de är byggda, hur mycket du får veta före köpet och om magneten sitter i."
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
        id="andra-skal"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra skal vi övervägde"
        description="Sju skal som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort. Flera av dem löser andra problem än det den här jämförelsen handlar om."
      >
        <ConsideredList items={IPHONE_SKAL_CONSIDERED} />
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
          footnote="Skydd du kan se väger 40 därför att det är det läsaren betalar för, och därför att det är det enda skyddet som går att bedöma på något annat än ett påstående. Sidan har inget kriterium för testomdöme, och den här gången är kategorin helt tom: Råd & Rön provar mobiler men inte skal, Testfakta har ingen provning, och Stiftung Warentests fallprov gäller vattentäta dykhus. Angiven fallhöjd och angiven militärstandard betygsätts inte som mätvärden. MIL-STD-810 är läst i original i tre utgåvor, och i del ett står att det inte är giltigt att betrakta en metods provvillkor som oföränderliga, samtidigt som tabellen tillåter att de 26 fallen delas på fem exemplar. Två sådana tal är därför inte jämförbara ens när båda anges. De väger i stället in under öppen redovisning, som mäter hur mycket av köpbeslutet du får ta själv. Garanti prövades som femte kriterium och ströks före insamlingen, eftersom märkena ger två år och husmärkena ett och kolumnen därmed skiljde produkterna åt på en axel ingen köper efter."
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
        description="Militärstandarden i tre utgåvor, plus de svenska jämförelser som rankar samma produkter."
      >
        <SourceList sources={IPHONE_SKAL_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={IPHONE_SKAL_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
