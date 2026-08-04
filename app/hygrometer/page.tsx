import type { Metadata } from "next";

import { HYGROMETER, testPageTrail } from "@/lib/test-pages";
import { HYGROMETER_SOURCES } from "@/lib/sources";
import {
  HYGROMETER_CONSIDERED,
  HYGROMETER_FAQ,
  HYGROMETER_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/hygrometer";
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

import Kopguide from "@/content/hygrometer/kopguide.mdx";

/*
 * ⚠️ Priser, kundbetyg, GTIN, mätområden, batterityper och angiven noggrannhet
 * är riktiga, lästa hos Kjell, Proshop, Clas Ohlson och Hornbach eller hos
 * tillverkaren på PRICE_CHECKED. Kriteriebetygen är redaktionell bedömning.
 * Vi har inte mätt någon luftfuktighet och inte provat någon mätare.
 *
 * Sidans fynd: av tretton kartlagda produkter mellan 139,90 och 1 199 kronor
 * anger TVÅ hur många procentenheter de får visa fel. Mätområdet trycks
 * alltid, avvikelsen aldrig, och där en tolerans står gäller den ofta
 * temperaturen i stället för fukten.
 *
 * ⚠️⚠️ `Angiven noggrannhet` och `Uppmätt avvikelse` är två skilda rader och
 * får ALDRIG slås ihop. Det förra är tillverkarens utfästelse, det senare vad
 * Bundesverband Schimmelpilzsanierung mätte mot ett referensinstrument för
 * 1 050 euro. Båda står i ALDRIG_BEDOMD i lib/spec-schema.mjs: en gissad
 * tolerans vore en påhittad mätning.
 *
 * ⚠️ 45 procent är INGET gränsvärde och INGEN hälsogräns. Allmänna råd är
 * rekommendationer och inte bindande regler, vilket författningssamlingen
 * själv skriver ut. Sidan får aldrig påstå att ett värde är olagligt.
 *
 * ⚠️ VOLYMEN ÄR ALDRIG MÄTT. `hygrometer` finns inte i någon av våra
 * keyword-CSV:er. Kör Keyword Planner innan status flippas till live. Se
 * .agent/research/hygrometer.md.
 *
 * AFFILIATE-SWAP — LINK_MODE styr formen på länkarna. Se lib/links.ts.
 */

const TEST_PAGE = HYGROMETER;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Av tretton hygrometrar mellan 139,90 och 1 199 kronor anger två hur många procentenheter de får visa fel. Mätområdet står alltid på förpackningen, avvikelsen aldrig. Vi jämförde sju mätare på noggrannhet, avläsning och funktion.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "toleransen", label: "Talet som aldrig trycks på förpackningen" },
  { id: "granserna", label: "Tre gränser inom femton procentenheter" },
  { id: "jamforelse", label: "Jämför alla sju" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "recensioner", label: "Recensioner av varje hygrometer" },
  { id: "andra-hygrometrar", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function HygrometerPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = HYGROMETER_PRODUCTS;
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
              Alla hygrometrar anger mellan vilka värden de visar något. Nästan
              ingen anger hur mycket fel de får visa. Av tretton mätare mellan
              139,90 och 1 199 kronor skriver två ut en tolerans i
              procentenheter, och den dyraste är inte en av dem. Vi jämförde sju
              mätare på den frågan, och på var du orkar läsa av dem.
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
        id="toleransen"
        width="default"
        title="Talet som aldrig trycks på förpackningen"
        description="Två av tretton anger hur mycket fel de får visa. Priset förutsäger inte vilka två."
      >
        <Prose>
          <p>
            En hygrometer visar 58 procent. Vad den menar är någonstans mellan
            53 och 63, om den håller <strong>± 5 procentenheter</strong>, och
            du vet oftast inte om den gör det.
          </p>
          <p>
            <strong>Mätområdet står alltid.</strong> Rubicsons produktblad hos
            Kjell anger 20 till 95 procent, TFA:s analoga anger 0 till 99. Det
            är en uppgift om mellan vilka värden mätaren visar något alls, och
            den säger ingenting om hur rätt talet är.
          </p>
          <p>
            <strong>Där en tolerans faktiskt står gäller den fel storhet.</strong>{" "}
            Rubicson Digital anger ± 1 grad för temperaturen och sedan
            ingenting om fukten. Det är inte den storhet man köper en
            hygrometer för.
          </p>
          <p>
            <strong>Två av tretton anger något om fukten.</strong> Beurer HM 16
            för 199,90 kronor anger ± 5 procentenheter mellan 40 och 80 procent
            och ± 8 utanför det spannet. Govee H5075 för 219 kronor anger ± 3.
            Beurers egen HM 22, som kostar 269, anger 8 procentenheter rakt av,
            alltså en vidare tolerans för mer pengar.
          </p>
          <p>
            <strong>Den dyraste anger ingenting.</strong> Kjells Datalogger Pro
            kostar 1 199 kronor, åtta gånger den billigaste i vår
            kartläggning, och publicerar ingen noggrannhet för fukt.
          </p>
          <p>
            <strong>
              Och den mätare någon faktiskt har mätt lovar också ingenting.
            </strong>{" "}
            TFA Dostmanns datablad för Moxx anger mätområdet 20 till 99 procent
            och sedan ingen tolerans. Samma modell låg högst 0,5 procentenheter
            fel när tyska mögelsaneringsförbundet mätte den mot ett kalibrerat
            referensinstrument. Ett utelämnat tal går alltså inte att läsa som
            ett dåligt tal, och det är därför tabellen nedan har två skilda
            rader: en för vad tillverkaren utfäster och en för vad någon mätt.
          </p>
        </Prose>
      </Section>

      {/* --------------------------------------------------- the numbers -- */}
      <Section
        id="granserna"
        tone="muted"
        width="default"
        title="Tre gränser inom femton procentenheter"
        description="Det är kravet mätaren ska klara, och det avgör hur snäv toleransen behöver vara."
      >
        <Prose>
          <p>
            <strong>Folkhälsomyndighetens allmänna råd FoHMFS 2014:14</strong>{" "}
            räknar upp vad som kan få tillsynsmyndigheten att kräva att en
            byggnad undersöks enligt miljöbalken. En av punkterna gäller fukten
            i luften:
          </p>
          <blockquote>
            – om luftfuktighetens medelvärde överstiger 7 g vatten/kg torr luft
            under en längre period under eldningssäsongen, vilket motsvarar ca
            45 % relativ luftfuktighet vid 21° C.
          </blockquote>
          <p>
            <strong>SweSIAQ</strong>, svenska föreningen för inomhusmiljö,
            anger att kvalstertillväxt kan börja i rumstemperatur redan över 45
            till 50 procent. <strong>Mögel</strong> brukar sättas vid varaktigt
            över 60.
          </p>
          <p>
            <strong>Var noga med vad talen är.</strong> 45 procent är inget
            gränsvärde och ingen hälsogräns. Allmänna råd är rekommendationer
            och inte bindande regler, vilket författningssamlingen själv skriver
            ut. Ingen kommer att knacka på dörren vid 47 procent.
          </p>
          <p>
            <strong>Men tre gränser inom femton procentenheter ställer ett
            krav på instrumentet.</strong>{" "}
            En mätare med ± 8 procentenheter som visar 55 kan i verkligheten
            stå på 47 eller 63, under alla tre gränserna eller över alla
            tre. En sådan avläsning kan tala om att det är fuktigt. Den kan inte
            tala om ifall du ska göra något.
          </p>
          <p>
            <strong>
              Och toleransen är oftast vidast där du helst vill mäta.
            </strong>{" "}
            Beurer HM 16 anger ± 5 mellan 40 och 80 procent, men ± 8 under 40
            och över 80. En krypgrund om vintern och ett badrum efter en dusch
            ligger båda utanför mellanspannet.
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
        title={`De ${products.length} bästa hygrometrarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sju"
        description="Angiven noggrannhet är vad tillverkaren utfäster. Uppmätt avvikelse är vad någon oberoende faktiskt mätte. De är två olika saker."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(
            PRICE_CHECKED,
            "Angiven noggrannhet är tillverkarens egen utfästelse, läst i deras datablad och inte i butikstexten. Uppmätt avvikelse finns för en enda produkt och kommer från Bundesverband Schimmelpilzsanierungs provning 2015 och 2016, inte från oss. Där en rad står som ej angiven betyder det att tillverkaren inte publicerar uppgiften, inte att egenskapen saknas. Det gäller noggrannheten för fem av de sju.",
          )}
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
            <strong>
              Vi har inte mätt någon luftfuktighet och inte provat någon mätare.
            </strong>{" "}
            Varje tal om avvikelse kommer från Bundesverband
            Schimmelpilzsanierung, och varje tolerans kommer från tillverkarens
            eget datablad. Talen om vad som är för fuktigt kommer från
            Folkhälsomyndighetens allmänna råd och från SweSIAQ.
          </p>
          <p>
            <strong>Den enda provningen vi hittat är tio år gammal.</strong>{" "}
            Mögelsaneringsförbundet jämförde fjorton mätare 2015 och 2016. Den
            täcker en av de sju vi rankar, och resultatet gäller de exemplaren
            och inte dagens produktion. Vi använder den för två saker: det
            uppmätta talet för TFA Moxx, och slutsatsen om analogt som
            konstruktion. Den senare står sig, eftersom en visare med ett
            hårstrå bakom sig inte har blivit en annan sak sedan dess.
          </p>
          <p>
            <strong>
              Vi rankar Shelly fyra trots att sex svenska jämförelser korar den.
            </strong>{" "}
            Skälet är inte att vi tycker annorlunda om produkten, utan att
            noggrannheten väger 35 av 100 här och att Shelly inte publicerar
            någon. Vi letade på produktsidan, i dokumentationen och i deras
            kunskapsbas. Uppkoppling och loggning är verkliga fördelar och ger
            den på två andra punkter.
          </p>
          <p>
            <strong>Fem av sju anger ingen tolerans alls.</strong> De får ändå
            högt på noggrannhet, eftersom mögelsaneringsförbundets provning
            visade att digitala mätare klarade sig genomgående bra oavsett pris.
            Poängen är lägre än för dem som anger ett tal, men inte noll. En
            analog mätare hade fått väsentligt lägre, och det är skälet till att
            ingen sådan finns i rankningen.
          </p>
          <p>
            <strong>Betygstalen är inte jämförbara mellan butikerna.</strong>{" "}
            Kjell publicerar antal betyg, Clas Ohlson publicerar antal
            recensioner, och de skiljer sig med en faktor tre till fem för samma
            sorts produkt. Vi anger vilken butik varje tal kommer från och väger
            aldrig in det i poängen.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje hygrometer"
        description="Alla sju bedöms mot samma fem kriterier. Uppgifterna är tillverkarens eller butikens egna, inte kontrollerade av oss."
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
        id="andra-hygrometrar"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster som inte hamnade i rankningen, inklusive den analoga och två givare som hör till andra apparater."
      >
        <ConsideredList items={HYGROMETER_CONSIDERED} />
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
          footnote="Noggrannhet väger 35 av 100, eftersom den avgör om avläsningen går att lita på och eftersom den är den mest undanhållna uppgiften i kategorin. Skalan är 5,0 vid angivna ± 3 procentenheter eller bättre, 4,5 när en oberoende provning mätt avvikelsen till under en procentenhet, 4,0 vid ± 5, 3,0 vid ± 8, 2,5 när ingen uppgift finns men konstruktionen är digital, och 1,5 för analog konstruktion. Att en digital mätare utan angiven tolerans får 2,5 och inte noll bygger på Bundesverband Schimmelpilzsanierungs provning, där samtliga digitala klarade sig godkänt oavsett pris. Att analogt får 1,5 bygger på samma provning, som fann upp till tolv procentenheters spridning mellan tre exemplar av en och samma analoga modell. Vi har inte mätt någon luftfuktighet och inte kontrollmätt någon hygrometer. Där en tillverkare inte publicerar en uppgift står den som ej angiven, aldrig som en nolla. Priserna är hos den butik vi länkar till."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi provar inte mätarna fysiskt. Det här är vad vi gör i stället."
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
        description="En oberoende provning, fyra tillverkardatablad lästa i original och två svenska normkällor."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Tillverkarnas datablad är inte utfyllnad här. De är beviset.
            </strong>{" "}
            Två av dem anger en tolerans och två anger ingen, och att kunna visa
            båda sorterna i original är skillnaden mellan ett påstående och ett
            fynd. Beurers tekniska data och TFA Dostmanns produktblad står som
            två källor av just det skälet.
          </p>
          <p>
            <strong>
              Ingen av de sex svenska jämförelser vi läst hänvisar till någon
              oberoende provning.
            </strong>{" "}
            Ingen av dem nämner heller noggrannhet i procentenheter. Fem av de
            sex utser en vinnare ändå, och den vanligaste vinnaren publicerar
            ingen tolerans.
          </p>
        </Prose>
        <SourceList sources={HYGROMETER_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={HYGROMETER_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
