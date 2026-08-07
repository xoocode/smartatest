import type { Metadata } from "next";

import { HYGROMETER, testPageTrail } from "@/lib/test-pages";
import { HYGROMETER_SOURCES } from "@/lib/sources";
import {
  HYGROMETER_CONSIDERED,
  HYGROMETER_FAQ,
  HYGROMETER_PRODUCTS,
  PRICE_CHECKED,
  SPECS_CHECKED,
} from "@/lib/data/hygrometer";
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

import Kopguide from "@/content/hygrometer/kopguide.mdx";

/*
 * ⚠️ Priser och kundbetyg lästa hos Kjell, Proshop, Clas Ohlson och Hornbach
 * på PRICE_CHECKED. Toleranser, mått, vikter och GTIN lästa i tillverkarens
 * egen specifikation eller i den manual butiken länkar, på SPECS_CHECKED.
 * Kriteriebetygen är redaktionell bedömning. Vi har inte mätt någon
 * luftfuktighet och inte provat någon mätare.
 *
 * ⚠️⚠️ SIDANS FYND ÄR OMSKRIVET 2026-08-06. Den påstod att två av tretton
 * mätare anger hur mycket fel de får visa. Ett gap-pass mot manualerna gav fem
 * av de sju rankade, och tre påståenden om saknade uppgifter var falska: TFA
 * Moxx, Rubicson Kompakt och Beurer HM 22. Se lib/corrections.ts.
 *
 * Fyndet är i stället att ± 5 procentenheter i mellanspannet och ± 8 utanför
 * är branschstandard, att tre mätare mellan 179,90 och 269 kronor anger
 * identiska tal, och att standarden är för vid för de gränser läsaren ska
 * agera på. TOLERANSEN STÅR I MANUALEN, ALDRIG PÅ PRODUKTSIDAN.
 *
 * ⚠️⚠️ `Noggrannhet fukt` och `Uppmätt avvikelse` är två skilda rader och
 * får ALDRIG slås ihop. Det förra är tillverkarens utfästelse, det senare vad
 * Bundesverband Schimmelpilzsanierung mätte mot ett referensinstrument för
 * 1 050 euro. Båda står i ALDRIG_BEDOMD i lib/spec-schema.mjs: en gissad
 * tolerans vore en påhittad mätning.
 *
 * ⚠️ En tolerans vi inte hittat får inte dra ner ett betyg. Shelly publicerar
 * ingen och får ändå samma noggrannhetsbetyg som varje annan digital mätare
 * utan publicerat tal.
 *
 * ⚠️ 45 procent är INGET gränsvärde och INGEN hälsogräns. Allmänna råd är
 * rekommendationer och inte bindande regler, vilket författningssamlingen
 * själv skriver ut. Sidan får aldrig påstå att ett värde är olagligt.
 *
 * AFFILIATE-SWAP — LINK_MODE styr formen på länkarna. Se lib/links.ts.
 */

const TEST_PAGE = HYGROMETER;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Govee H5075 för 219 kronor håller sig inom 3 procentenheter, snävast av sju hygrometrar vi jämfört. Tre mätare mellan 179,90 och 269 kronor anger identiska ± 5, och mögelgränsen ligger bara femton enheter från den nivå du ska agera vid.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "toleransen", label: "Tre priser, samma felmarginal" },
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
              <strong>Govee H5075 för 219 kronor</strong> håller sig inom 3
              procentenheter, snävast av mätarna, och loggar dessutom fukten
              över tid. Tre andra, mellan 179,90 och 269 kronor, anger
              identiska ± 5 procentenheter, och mögelgränsen ligger femton
              enheter från den nivå våra andra sidor ber dig agera vid. Vi
              jämförde sju mätare på hur rätt de visar och på var du orkar
              läsa av dem.
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
        id="toleransen"
        width="default"
        title="Tre mätare, tre priser, exakt samma felmarginal"
        description="± 5 procentenheter i mellanspannet och ± 8 utanför är vad branschen anger. Två mätare slår det."
      >
        <Prose>
          <p>
            En hygrometer visar 58 procent. Vad den menar är någonstans mellan
            53 och 63, om den håller <strong>± 5 procentenheter</strong>, och
            det är vad de flesta håller.
          </p>
          <p>
            <strong>Rubicson Kompakt kostar 179,90 kronor.</strong> Beurer HM 16
            kostar 199,90. Beurer HM 22 kostar 269. Alla tre anger ± 5
            procentenheter mellan 40 och 80 procent och ± 8 utanför det spannet.
            Nittio kronors prisskillnad, identisk mätning.
          </p>
          <p>
            <strong>Två mätare är snävare.</strong> TFA Moxx för 229 kronor
            anger ± 4 mellan 30 och 80 procent, och Govee H5075 för 219 anger
            ± 3 rakt igenom. Det är de billigaste två av de fem som anger
            något.
          </p>
          <p>
            <strong>Leta i manualen, inte i spectabellen.</strong> Butikernas
            och tillverkarnas specifikationer tar upp mätområdet, alltså mellan
            vilka värden mätaren visar något alls. Toleransen ligger på sista
            uppslaget i bruksanvisningen, som PDF, en länk ned från samma
            produktsida. Det gäller varenda mätare här, och det gäller den du
            tittar på i en annan butik också.
          </p>
          <p>
            <strong>
              Och den enda mätare någon utomstående mätt låg långt under sitt
              eget löfte.
            </strong>{" "}
            TFA Moxx anger ± 4 procentenheter och låg högst 0,5 fel när tyska
            mögelsaneringsförbundet jämförde den mot ett kalibrerat
            referensinstrument. En utfäst tolerans är ett tak, inte en
            förväntan.
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
              Och toleransen är vidast precis där du helst vill mäta.
            </strong>{" "}
            De tre som anger ± 5 anger alla ± 8 under 40 och över 80 procent. En
            krypgrund om vintern och ett badrum efter en dusch ligger båda
            utanför mellanspannet, alltså i det spann där mätaren är som sämst.
            Govee H5075 håller sina ± 3 hela vägen från 0 till 99.
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
        description="Noggrannhet fukt är hur många procentenheter mätaren får visa fel. Tre av mätarna anger exakt samma tal."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(
            PRICE_CHECKED,
            `Toleranser, mått och vikter lästa ${SPECS_CHECKED} i tillverkarens egen specifikation eller i den bruksanvisning butiken länkar, aldrig i butikstexten. Ett streck betyder att vi inte hittat uppgiften publicerad, inte att egenskapen saknas, och ett streck sänker aldrig ett betyg. Uppmätt avvikelse för TFA Moxx kommer från Bundesverband Schimmelpilzsanierungs provning 2015 och 2016, inte från oss.`,
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
            egen specifikation eller bruksanvisning. Talen om vad som är för
            fuktigt kommer från Folkhälsomyndighetens allmänna råd och från
            SweSIAQ.
          </p>
          <p>
            <strong>Den här sidan hade fel i två dagar.</strong> Den påstod
            mellan 4 och 6 augusti 2026 att bara två av tretton mätare anger en
            tolerans. Ett nytt pass mot bruksanvisningarna gav fem av de sju vi
            rankar, och tre av påståendena om att en uppgift saknades var
            felaktiga. Tre placeringar ändrades. Det står utskrivet på{" "}
            <a href="/rattelser">rättelsesidan</a>.
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
              Två mätare publicerar ingen tolerans, och det kostar dem ingenting.
            </strong>{" "}
            Shelly H&amp;T Gen 3 och Clas Ohlsons trepack anger inget tal för
            fukten, och vi letade på produktsidan, i dokumentationen och i
            kunskapsbasen. De får ändå samma noggrannhetsbetyg som varandra och
            bara ett halvt steg under de mätare som anger ± 5. Skälet är att
            mögelsaneringsförbundets provning fann samtliga åtta digitala mätare
            inom 4,4 procentenheter, alltså inom det branschen utfäster. En
            uppgift vi inte hittat säger något om vår research, inte om varan,
            och den får inte dra ner ett betyg.
          </p>
          <p>
            <strong>
              Shelly ligger trea trots att sex svenska jämförelser korar den.
            </strong>{" "}
            Det beror på priset och på kundbetyget, inte på tystnaden. 429
            kronor är dyrast av mätarna, Govee loggar lika bra för hälften, och
            hos Kjell får den 3,5 av 5 från 36 betyg. Uppkopplingen är samtidigt
            en verklig fördel som ingen annan mätare här har.
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
          footnote="Noggrannhet väger 35 av 100, eftersom den avgör om avläsningen går att lita på nära en gräns. Skalan är 5,0 när någon utomstående mätt avvikelsen till under en procentenhet, 4,5 vid ± 3, 4,0 vid ± 4 till ± 5 i det spann ett bostadsrum ligger i, 3,5 för en digital mätare utan publicerad tolerans, 3,0 vid ± 8 rakt igenom och 1,5 för analog konstruktion. Att en digital mätare utan publicerad tolerans hamnar på 3,5 bygger på Bundesverband Schimmelpilzsanierungs provning, där samtliga åtta digitala låg inom 4,4 procentenheter oavsett pris. Att analogt hamnar på 1,5 bygger på samma provning, som fann upp till tolv procentenheters spridning mellan tre exemplar av en och samma analoga modell. En uppgift vi inte hittat drar aldrig ner ett betyg: den står som ett streck i tabellen och räknas inte som en nolla. Vi har inte mätt någon luftfuktighet och inte kontrollmätt någon hygrometer. Priserna är hos den butik vi länkar till."
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
        description="En oberoende provning, fyra tillverkarkällor lästa i original och två svenska normkällor."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Tillverkarnas bruksanvisningar är inte utfyllnad här. De är
              beviset.
            </strong>{" "}
            Toleranserna står inte i någon av produktsidornas spectabeller. De
            står i manualerna, och tre av de fem tal som bär den här sidan är
            hämtade därifrån. Beurers tekniska data och TFA Dostmanns egen
            bruksanvisning står som två källor av just det skälet.
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
