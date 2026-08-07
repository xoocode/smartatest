import type { Metadata } from "next";

import { testPageTrail, STAVMIXER } from "@/lib/test-pages";
import { SOURCES_BY_HREF } from "@/lib/sources";
import {
  PRICE_CHECKED,
  STAVMIXER_FAQ,
  STAVMIXER_CONSIDERED,
  STAVMIXER_PRODUCTS,
} from "@/lib/data/stavmixer";
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

import Kopguide from "@/content/stavmixer/kopguide.mdx";

/*
 * Tredje sidan i gruppen Kök, byggd 2026-08-06.
 *
 * ⚠️ Sidan rankar tolv stavmixrar mellan 549 och 3 299 kronor, både sladdade
 * och batteridrivna, efter användarbeslut.
 *
 * ⚠️ FYNDET: watt mäter motorns anslutningseffekt, alltså elen in i
 * vägguttaget, och varvtal mäter kniven. De följer inte varandra. Philips eget
 * datablad anger 800 W och max 11 500 v/min; bamix egen manual anger 200 W och
 * 17 000–18 000 för SwissLine. Varenda konkurrent har effekt som första
 * specrad och ingen av de tio publicerar ett varvtal.
 *
 * ⚠️ ANDRA FYNDET: Brauns egen produktsida för MQ 9135XI anger `Effekt (W)
 * 1000` i två specifikationsrutor och `1200 W` tre gånger i säljtexten på samma
 * sida. MQ7035X anger 850 W där Elon säljer den som 1 000. Sidan använder
 * specfältet, aldrig säljtexten.
 *
 * ⚠️ VARVTALET BÄR INGEN VIKT, trots att det är sidans starkaste uppgift. Fyra
 * av tolv tillverkare anger ett tal och åtta anger inget alls. Ett kriterium
 * på en tredjedel av fältet hade delat ut de andras vikt gratis. Se
 * `ALDRIG_BEDOMD` i lib/spec-schema.mjs och `redistributeMissing` i
 * lib/products.ts.
 *
 * ⚠️ MOTORNS EFFEKT VÄGER MINST AV FEM, 15 av 100, efter användarbeslut.
 * Handeln ger watt i praktiken all vikt. bamix förlorar poäng där och vinner
 * dem på de fyra andra kriterierna, och den spänningen ska synas i tabellen.
 *
 * ⚠️ INGET TESTOMDÖMEKRITERIUM, efter användarbeslut. Råd & Rön har provat 57
 * stavmixrar men testet är inte köpt, och deras villkor förbjuder
 * vidarepublicering av resultat även för den som betalat. M3.se har provat sju
 * för hand med publicerade betyg, men testet är från 2023 och täcker sju av
 * arton. Betygen återges i prosa och påverkar inga poäng.
 *
 * ⚠️ NINJASVERIGE.COM.SE ÄR INTE NINJA. Sidan anger 120 volt och amerikanska
 * enheter och har spanskt inloggningsformulär; `ninjakitchen.se` pekar om till
 * sharkninja.se. Den falska anger 650 W och 1 års garanti, den riktiga 850 W
 * och 2 år. Samma fälla som `levoit.com.se` i .claude/context/money.md.
 *
 * Priser, artikelnummer, GTIN, lagerstatus och kundbetyg är lästa hos butiken
 * på PRICE_CHECKED. Specifikationerna är lästa hos tillverkaren.
 *
 * AFFILIATE-SWAP — se lib/links.ts för vad LINK_MODE står på i dag.
 */

const TEST_PAGE = STAVMIXER;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Stavmixer bäst i test 2026: tolv mixerstavar jämförda från 549 kr. En stav på 200 watt snurrar fortare än en på 800. Se vilken.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "varvtalet", label: "200 watt som slår 800" },
  { id: "jamforelse", label: "Jämför alla tolv" },
  { id: "recensioner", label: "Recensioner av varje stavmixer" },
  { id: "andra-stavmixrar", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function StavmixerPage() {
  const style = await getStyle();
  const products = STAVMIXER_PRODUCTS;
  const [winner] = products;
  const author = DEFAULT_AUTHOR;
  const reviewer = DEFAULT_REVIEWER;
  const sources = SOURCES_BY_HREF[PAGE_URL] ?? [];

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
            {/* H1 bär fyndet: talet handeln säljer på mäter fel storhet. */}
            <h1 className="text-h1">
              Stavmixer bäst i test 2026: watten mäter uttaget, inte kniven
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vi rekommenderar OBH Nordica InfinyForce Pro för 1 490 kronor,
              eftersom den har steglös fart under tummen och därför startar
              långsamt i majonnäsen och går upp i frysta bär. Puréfot i lådan, och reservdelar utlovade i 15 år
              efter inköpsdatum. Vill du ha en kniv som rör sig upp
              och ner genom frysta bär tar du Braun MultiQuick 9 MQ 9135XI för
              1 573 kronor. Och hoppa över watt-talet i hyllan: bamix drar 200
              watt och snurrar 50 procent fortare än en maskin på 800.
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
        id="varvtalet"
        width="default"
        title="200 watt som snurrar fortare än 800"
        description="Effekten mäter vad motorn drar ur väggen. Varvtalet mäter vad kniven gör med maten."
      >
        <Prose>
          <p>
            <strong>
              Varje butik som säljer stavmixrar leder med watt, och det talet
              beskriver elmätaren snarare än maskinen.
            </strong>{" "}
            Kjell, Elon, Cervera, KitchenTime och samtliga tio svenska
            jämförelsesajter vi läst har effekten som första specifikationsrad.
            Anslutningseffekt är hur mycket ström motorn drar ur vägguttaget.
            Hur fort kniven roterar i maten är en annan storhet.
          </p>
          <p>
            <strong>De två följer inte varandra.</strong> Philips anger i sitt
            eget datablad 800 watt och maximalt 11 500 varv i minuten för sin
            ProMix. bamix anger 200 watt och 17 000 till 18 000 varv för
            SwissLine. Den schweiziska maskinen drar en fjärdedel så mycket
            ström och snurrar 50 procent fortare, eftersom motorn är byggd
            för högt varvtal i stället för högt vridmoment. Wilfa Prostick ligger
            däremellan med 1 000 watt och tre steg om 5 000, 10 000 och 15 000.
          </p>
          <p>
            <strong>Samma bamix säljs som 150 watt i USA och 200 i Sverige.</strong>{" "}
            Det är samma modell med samma kniv, och tillverkaren anger 18 000
            varv i båda dokumenten. Skillnaden är nätspänningen, 120 volt mot
            230. Ett tal som ändras med vilket land maskinen säljs i, medan det
            mekaniska står stilla, är inte det du ska jämföra två maskiner på.
          </p>
          <p>
            <strong>
              Braun säljs dessutom på ett watt-tal Braun själva inte anger.
            </strong>{" "}
            På deras egen svenska produktsida för MultiQuick 9 MQ 9135XI står
            det Effekt (W) 1000 under Tekniska specifikationer, i två separata
            rutor. I säljtexten på samma sida står 1 200 watt, tre gånger. På
            MultiQuick 7 MQ7035X anger specfältet 850 watt medan Elon säljer den
            som 1 000. Tabellen nedan använder specfältet.
          </p>
          <p>
            <strong>Åtta av tolv tillverkare anger inget varvtal alls.</strong>{" "}
            Boschs egen tekniska översikt tar upp effekt, tolv hastighetssteg,
            bladform och nettovikt utan att nämna det, och OBH Nordica har ett
            fält som heter RPM och lämnar det tomt. Därför bär varvtalet ingen
            vikt i rankningen: ett kriterium som en tredjedel av fältet kan
            placeras på hade delat ut de övrigas vikt gratis. Talet står i
            tabellen där tillverkaren publicerat det och som ett streck där den
            inte gjort det.
          </p>
          <p>
            <strong>
              Effekten väger 15 av 100, minst av de fem kriterierna, och det är
              ett medvetet val.
            </strong>{" "}
            Watt är inte betydelselöst: en motor på 400 watt kämpar där en på
            1 000 inte gör det, och det märks på frysta bär och hårda
            rotfrukter. Men handeln ger talet i praktiken all vikt, och det är
            därför bamix hamnar i mitten av vår lista trots att flera svenska
            testpaneler sätter märket överst. Vad du får i utbyte står i
            omdömet.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa stavmixrarna 2026`}
        description="Varje stavmixer passar ett eget kök och ett eget matlagande. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tolv"
        description="Samma fem kriterier och samma viktning för alla tolv."
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
        title="Recensioner av varje stavmixer"
        description="Alla tolv bedöms mot samma fem kriterier."
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
        id="andra-stavmixrar"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Sju stavmixrar som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={STAVMIXER_CONSIDERED} />
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
          footnote="Hastighetsregleringen väger 25 därför att den avgör om majonnäsen tjocknar och om du kan hålla full kraft genom frysta bär, alltså de två saker en stavmixer oftast misslyckas med. Motorns effekt väger 15, minst av de fem, eftersom watt mäter vad maskinen drar ur vägguttaget och inte hur fort kniven går: bamix drar 200 watt och snurrar fortare än en maskin på 800. Varvtalet bär ingen vikt alls, trots att det är sidans starkaste uppgift, därför att bara fyra av tolv tillverkare publicerar ett tal och de övrigas vikt då hade delats ut gratis. Effekten som betygsätts är tillverkarens eget specfält och aldrig säljtextens siffra, som på Brauns två modeller ligger 150 respektive 200 watt högre. Kriteriet för reservdelar betygsätter vad tillverkaren åtar sig efter garantitiden, alltså villkoren för köpet. Priser, artikelnummer och kundbetyg är lästa på butikens egen produktsida och daterade, och specifikationerna hos tillverkaren."
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
        description="Råd & Röns labbprovning av 57 stavmixrar, M3:s handpålagda test av sju och tillverkarnas egna specifikationer."
      >
        <SourceList sources={sources} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={STAVMIXER_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
