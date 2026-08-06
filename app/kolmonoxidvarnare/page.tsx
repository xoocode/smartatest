import type { Metadata } from "next";

import { KOLMONOXIDVARNARE, testPageTrail } from "@/lib/test-pages";
import { KOLMONOXIDVARNARE_SOURCES } from "@/lib/sources";
import {
  KOLMONOXIDVARNARE_CONSIDERED,
  KOLMONOXIDVARNARE_FAQ,
  KOLMONOXIDVARNARE_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/kolmonoxidvarnare";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
import { getStyle } from "@/lib/style-server";
import { NOT_STATED, priceCaption } from "@/lib/captions";
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

import Kopguide from "@/content/kolmonoxidvarnare/kopguide.mdx";

/*
 * ⚠️ Priser och kundbetyg är lästa på butikernas egna produktsidor på
 * PRICE_CHECKED. Certifiering, sensorns livslängd, batteri, driftstemperatur,
 * ljudtryck, mått och vikt är hämtade ur tillverkarnas egna dokument på
 * SPECS_CHECKED. Kriteriebetygen är redaktionell bedömning. Vi har inte utsatt
 * någon varnare för kolmonoxid.
 *
 * ⚠️ Läs inte om certifieringen ur butiksledet. Sidan gjorde det till
 * 2026-08-06, och sex av sju kontrollerade uppgifter var fel. Detaljerna står
 * i filkommentaren i lib/data/kolmonoxidvarnare.ts.
 *
 * Sidans fynd är att fyra av sex varnare är provade enligt EN 50291-2 och får
 * sitta i fordon, och att en av dem inte fungerar under +4 °C. Ingen svensk
 * jämförelse nämner någotdera. Se .agent/research/kolmonoxidvarnare.md.
 *
 * Tre saker som byggdes in från start, efter självgranskningen av /brandfilt:
 *
 * 1. #kallor säger vad som finns och inte finns i vägen för oberoende tester,
 *    och varför Consumer Reports omdöme inte lånas.
 * 2. #vem-har-kontrollerat redovisar att ingen certifiering är granskad av
 *    tredje part och hur butikerna fördelar sig i rankningen.
 * 3. #behover-du-en säger nej till de läsare som inte behöver produkten.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 * Se lib/links.ts.
 */

const TEST_PAGE = KOLMONOXIDVARNARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Housegard CA108 för 449,90 vinner: provad för både bostad och husvagn, tio år på sensorn och halten i klartext på displayen. Vi jämförde sex kolmonoxidvarnare från 399 till 1 099 kronor mot tillverkarnas egna dokument.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "behover-du-en", label: "Behöver du ens en?" },
  { id: "tva-delar", label: "Del 1 eller del 2 av EN 50291" },
  { id: "jamforelse", label: "Jämför alla sex" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "recensioner", label: "Recensioner av varje varnare" },
  { id: "andra-varnare", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function KolmonoxidvarnarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = KOLMONOXIDVARNARE_PRODUCTS;
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
              Housegard CA108 för 449,90 kronor är den billigaste varnaren som är
              provad för både bostaden och husvagnen. Sensorn håller tio år,
              batterierna är två vanliga AA, och displayen visar halten i ppm
              plus högsta uppmätta värde i sju dagar. Standardens del 2 avgör om
              varnaren får sitta i ett fordon, och två av de sex vi jämförde är
              inte provade för det. Priser från 399 till 1 099 kronor.
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
        <TocNav
          variant="inline"
          entries={TOC}
          className="mt-block lg:hidden"
        />
      </Section>

      {/* --------------------------------------------------- do you need -- */}
      {/* Ligger före allt annat med flit. En jämförelsesajt som aldrig säger
          att du kan låta bli att köpa är en annonsplats. */}
      <Section
        id="behover-du-en"
        width="default"
        title="Behöver du ens en?"
        description="Det ärliga svaret är att många svenska hem inte behöver någon. Här är vad som avgör."
      >
        <Prose>
          <p>
            Kolmonoxid bildas när något förbränns ofullständigt. Finns det ingen
            förbränning i bostaden finns det ingen kolmonoxid, och då larmar
            varnaren aldrig.
          </p>
          <p>
            <strong>Du behöver en</strong> om du har braskamin, kakelugn,
            vedspis eller pelletskamin, olje- eller vedpanna, gasolkök,
            gasolkylskåp eller fotogenkamin, ett garage som ligger under
            bostaden eller har dörr rakt in i den, eller en husvagn, husbil
            eller båt med gasol eller förbränningsmotor.
          </p>
          <p>
            <strong>Du behöver troligen ingen</strong> om bostaden värms med
            fjärrvärme, bergvärme eller el, maten lagas på el eller induktion,
            och garaget är fristående.
          </p>
          <p>
            Undantaget är värt att känna till: i flerfamiljshus och radhus med
            gemensam skorstensstock kan gas ta sig in från någon annans eldning.
            Det är ovanligt, men det förekommer.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- the two parts -- */}
      {/* Utan det här är tabellens viktigaste kolumn obegriplig. */}
      <Section
        id="tva-delar"
        tone="muted"
        width="default"
        title="Del 1 eller del 2 av EN 50291"
        description="Den ena delen gäller bostäder, den andra fordon. Skillnaden avgör var varnaren du köper får sitta."
      >
        <Prose>
          <p>
            <strong>EN 50291-1</strong> gäller kolmonoxidvarnare i bostäder.
          </p>
          <p>
            <strong>EN 50291-2</strong> gäller husvagn, husbil och båt. Den
            lägger till provning för vibration, rörelse och temperaturväxling,
            alltså det en varnare utsätts för i ett fordon och aldrig i ett
            vardagsrum. En varnare som bara är provad enligt del 1 är avsedd för
            bostäder, inte för det fordon många köper den till.
          </p>
          <p>
            <strong>Fyra av de sex är provade enligt båda delarna:</strong>{" "}
            Housegard CA108, Fireblitz CO10-RF, Netatmo och Deltronic CO7BD. De
            får sitta både i huset och i fordonet. X-Sense XC01-M och Heiman
            WS-720ES är provade enligt del 1 och hör hemma i en bostad.
          </p>
          <p>
            <strong>Alla sex är provade mot 2018 års utgåva</strong> av del 1.
            Den utgåvan gjorde livslängdsindikering obligatorisk, alltså att
            varnaren själv säger till med ljud och synlig signal när sensorn är
            förbrukad. Utan den hänger det till slut en död varnare på väggen som
            ser ut precis som en fungerande, och det är kategorins värsta felläge.
          </p>
          <p>
            Det finns en andra sak att kontrollera som ingen svensk jämförelse
            nämner, och den avgör åt fler än man tror: <strong>vid vilken
            temperatur varnaren fungerar.</strong> X-Sense XC01-M börjar arbeta
            först vid +4 °C. De fem andra går ner till -10 °C. Ska varnaren sitta
            i ett ouppvärmt garage, en carport eller en båt som ligger kvar över
            vintern är det skillnaden mellan ett skydd och en dosa på väggen.
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
        title={`De ${products.length} bästa kolmonoxidvarnarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sex"
        description="Raden Godkänd för avgör om varnaren får sitta i ett fordon. Sensorns livslängd är kategorins verkliga kostnad, och driftstemperaturen avgör om varnaren fungerar i ett ouppvärmt utrymme."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, NOT_STATED)}
        />
      </Section>

      {/* ------------------------------------------------ self-disclosure -- */}
      <Section
        id="vem-har-kontrollerat"
        tone="muted"
        width="default"
        title="Vem har kontrollerat det här?"
        description="Vad rankningen bygger på, och var den är svag."
      >
        <Prose>
          <p>
            <strong>Uppgifterna kommer från tillverkarna, inte från butikerna.</strong>{" "}
            Certifiering, livslängd, batteri, driftstemperatur och ljudtryck är
            hämtade ur försäkringar om överensstämmelse, specifikationsblad och
            manualer, samt ur BSI:s och TÜV Rheinlands öppna certifikatregister.
            Vi har inte utsatt någon varnare för kolmonoxid, och kriteriebetygen
            är vår bedömning och inte mätvärden.
          </p>
          <p>
            <strong>Den ordningen är en följd av att vi haft fel.</strong> Sidan
            byggde till den 6 augusti 2026 på butikernas specifikationsrader. Sex
            av sju uppgifter vi sedan kontrollerade mot tillverkarleden visade
            sig vara felaktiga, tre av dem om vilken standard varnaren är provad
            mot, och två varnare fick lägsta betyg för en certifiering de inte
            har. Rättelsen ligger på <a href="/rattelser">rättelsesidan</a>.
          </p>
          <p>
            <strong>Två varnare hos Kjell rankas inte alls.</strong> För Luma
            CA150 och Kjells eget Kolmonoxidlarm har vi ännu inte kunnat
            fastställa vilken del av standarden de är provade mot. De ligger
            under Andra produkter vi övervägde, med skälet utskrivet.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje varnare"
        description="Alla sex bedöms mot samma fem kriterier."
      >
        <div className="flex flex-col gap-block">
          {products.map((product, i) => (
            <ProductReview key={product.id} product={product} rank={i + 1}>
              <VerdictText text={product.verdict} className="text-muted-foreground" />
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
        id="andra-varnare"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Fyra poster som inte hamnade i rankningen, och skälet till varje."
      >
        <ConsideredList items={KOLMONOXIDVARNARE_CONSIDERED} />
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
        description="Viktningen nedan är den som räknar fram betygen i tabellen."
      >
        <MethodologyBlock
          criteria={TEST_PAGE.criteria}
          intro={TEST_PAGE.methodology}
          variant="cards"
          footnote="Provningen och sensorns livslängd väger lika tungt, 25 vardera. Skalan för provning har två steg: 5,0 för en varnare som är provad enligt både del 1 och del 2 av EN 50291, 3,5 för en som är provad enligt del 1. Kriteriet Sensorns livslängd bedömer enhetens livslängd och inte batteriets, eftersom det är enheten som ska kastas när sensorn löpt ut, och väger in om batteriet går att byta. Vi hittade inget svenskt eller nordiskt test av kategorin och lånar inte Consumer Reports omdömen, av skäl som står under Källor. Priserna är hos den butik vi länkar till."
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
        description="Standardens innehåll, myndighetens riskbild och butikernas egna produktsidor för de uppgifter vi jämfört."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Det finns inget svenskt eller nordiskt test av kolmonoxidvarnare.
            </strong>{" "}
            Varken Råd &amp; Rön eller Testfakta har testat kategorin, och de
            svenska sidor som säger sig ha gjort det redovisar varken metod,
            mätvärden eller testdatum.
          </p>
          <p>
            <strong>Men här finns riktig provning, till skillnad från vissa
            andra kategorier vi täcker.</strong>{" "}
            Amerikanska Consumer Reports mäter CO-varnare i labb och har funnit
            att flera underrapporterar halten och larmar för sent. Vi lånar ändå
            inte deras omdömen till betygen, av två skäl. De provar mot
            amerikanska UL 2034, som har helt andra tröskeltider än den
            europeiska standarden. Och deras X-Sense-test gäller märkets
            Portable-modell och inte XC01-M som vi rankar. Ett omdöme om ett
            märke är inte ett omdöme om en produkt.
          </p>
        </Prose>
        <SourceList sources={KOLMONOXIDVARNARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={KOLMONOXIDVARNARE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "fireSafety", "pricing"]}
          className="mb-block"
        />
      </Container>
    </>
  );
}
