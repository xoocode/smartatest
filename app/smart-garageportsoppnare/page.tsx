import type { Metadata } from "next";

import { testPageTrail, SMART_GARAGEPORTSOPPNARE } from "@/lib/test-pages";
import { SMART_GARAGEPORTSOPPNARE_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  SMART_GARAGEPORTSOPPNARE_FAQ,
  SMART_GARAGEPORTSOPPNARE_CONSIDERED,
  SMART_GARAGEPORTSOPPNARE_PRODUCTS,
} from "@/lib/data/smart-garageportsoppnare";
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

import Kopguide from "@/content/smart-garageportsoppnare/kopguide.mdx";

/*
 * ⚠️ Systersida till /garageportsoppnare. Den här rankar modulerna som kopplas
 * till en öppnare du redan har; motorerna ligger på moderssidan.
 *
 * Priser, GTIN och butiks-URL:er är verkliga, lästa hos butikerna på
 * PRICE_CHECKED. Uppgifter om ekosystem och kontosäkerhet kommer från
 * tillverkarnas produktsidor och från Kjells specifikation.
 *
 * ⚠️ Yale länkas till Kjell trots att Proshop är 251 kr billigare, efter
 * användarbeslut 2026-08-05. Motiveringen står i lib/data/smart-garageportsoppnare.ts.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = SMART_GARAGEPORTSOPPNARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-05";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "SwitchBot vinner för 483 kronor: den enda modulen med Matter, så den fungerar med Apple, Google, Alexa och Samsung, och den monteras med en skruvmejsel. Vill du kunna läsa hur kontot skyddas tar du Yale Smart Opener. Kontrollera strömförsörjningen först: de två billigaste modulerna kräver elinstallatör.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "strommen", label: "Den billigaste kräver elektriker" },
  { id: "jamforelse", label: "Jämför alla sex" },
  { id: "recensioner", label: "Recensioner av varje modul" },
  { id: "andra-moduler", label: "Andra moduler vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function SmartGarageportsoppnarePage() {
  const style = await getStyle();
  const products = SMART_GARAGEPORTSOPPNARE_PRODUCTS;
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
            {/* H1 bär avgränsningen: sidan rankar modulerna som kopplas till en
                befintlig öppnare. Motorerna ligger på /garageportsoppnare.
                Samma delning som /brandvarnare mot /smart-brandvarnare. */}
            <h1 className="text-h1">
              Smart garageportsöppnare bäst i test 2026: sex moduler till porten
              du redan har
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Köp SwitchBot för 483 kronor. Den är den enda modulen här som
              talar Matter, alltså den fungerar med Apple Home, Google, Alexa
              och Samsung utan att du behöver välja rätt artikelvariant, och den
              monteras med en skruvmejsel på en halvtimme. Vill du kunna läsa
              hur kontot skyddas innan du betalar är Yale Smart Opener den enda
              som publicerar det. Kontrollera strömförsörjningen först: de två
              billigaste modulerna matas med 230 volt och kräver elinstallatör.
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
        id="strommen"
        width="default"
        title="De två billigaste kräver elektriker, och det står inte på prislappen"
        description="Strömförsörjningen avgör vad du får montera själv, och den vänder på kategorins prisordning."
      >
        <Prose>
          <p>
            <strong>
              Fyra av modulerna går på USB eller matas från portöppnaren.
            </strong>{" "}
            Två kablar till plinten, en strömadapter i ett uttag, och du är klar
            på en halvtimme med en skruvmejsel. Det gäller SwitchBot för 483
            kronor, Meross för 499, Yale för 1 690 och iSmartGate för 2 109.
          </p>
          <p>
            <strong>
              De två billigaste matas i stället med 230 volt och ska sitta i en
              kopplingsdosa
            </strong>{" "}
            bakom väggknappen. Att lägga in en relämodul i den fasta
            installationen är en förändring av den, och det kräver ett
            registrerat elinstallationsföretag. Det gäller oavsett hur enkel
            kopplingen ser ut i anvisningen och oavsett att produkten säljs i
            konsumentledet.
          </p>
          <p>
            <strong>Räkna därför om priset innan du jämför.</strong> En modul för
            384 kronor plus ett par timmars elarbete kostar mer än en för 499
            kronor som du sätter upp själv. I den här kategorin är de två
            produkter som ser billigast ut i hyllan i praktiken de två dyraste,
            och skillnaden syns ingenstans i butiken.
          </p>
          <p>
            <strong>
              Det finns ett läge där de ändå är rätt val:
            </strong>{" "}
            när en elektriker redan är inbokad för annat i garaget. Då är
            modulen ett billigt tillägg medan väggen ändå är öppen, och Tuya
            WGM2 ger dig dessutom larm vid obehörig öppning och en
            händelsehistorik som de dyrare modulerna inte marknadsför.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa smarta garageportsöppnarna 2026`}
        description="Varje modul passar en egen sorts hem. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sex"
        description="Samma kriterier och samma viktning för alla sex modulerna."
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
        title="Recensioner av varje modul"
        description="Alla sex bedöms mot samma fem kriterier."
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
        id="andra-moduler"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra moduler vi övervägde"
        description="Fyra moduler som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={SMART_GARAGEPORTSOPPNARE_CONSIDERED} />
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
          footnote="Installation och säkerhet väger 25 var därför att de avgör två saker som inte syns på prislappen: vad du får montera själv, och vad som skyddar kontot som kan öppna garaget. Där en uppgift om kryptering eller tvåstegsverifiering inte gått att fastställa räknas det som en brist, eftersom en produkt du inte kan kontrollera före köpet är sämre för dig än en du kan. En hypotes prövades och föll under arbetet: att billiga reläer bara kan trycka på knappen medan dyrare också vet var porten står. Samtliga moduler från 374 kronor och uppåt levereras med sensor och visar portens läge, så den skillnaden finns inte och blev därför inget kriterium. Kategorin saknar oberoende provning så när som på ett test, som täcker en av sex produkter, och därför finns inget kriterium för testomdöme."
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
        description="Ljud & Bilds test av Yale Smart Opener, tillverkarnas produktsidor, butikernas specifikationer och Elsäkerhetsverkets regler för egenarbete."
      >
        <SourceList sources={SMART_GARAGEPORTSOPPNARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={SMART_GARAGEPORTSOPPNARE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
