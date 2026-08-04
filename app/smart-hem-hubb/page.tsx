import type { Metadata } from "next";

import { SMART_HEM_HUBB, testPageTrail } from "@/lib/test-pages";
import { SMART_HEM_HUBB_SOURCES } from "@/lib/sources";
import {
  SMART_HEM_HUBB_CONSIDERED,
  SMART_HEM_HUBB_FAQ,
  SMART_HEM_HUBB_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/smart-hem-hubb";
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

import Kopguide from "@/content/smart-hem-hubb/kopguide.mdx";

/*
 * ⚠️ Priser, kundbetyg, artikelnummer och radiouppsättningar är riktiga, lästa
 * 2026-08-04 hos Kjell eller på tillverkarens egen sida. Kriteriebetygen är
 * redaktionell bedömning. Vi har inte kopplat in någon hubb och inte dragit ur
 * någon internetkabel.
 *
 * SIDANS FYND: ordet hubb täcker tre olika produkter på samma hylla, 329 till
 * 4 999 kronor.
 *   Märkesbrygga: Plejd Gateway styr enbart Plejd, enligt Plejd själva.
 *   Matter-controller: Aqara M3 är ensam om att skriva ut att den styr
 *     tredjepartsprodukter.
 *   Universell hubb: Homey Pro talar åtta radior och kör lokalt.
 *
 * ⚠️⚠️ PHILIPS SÄGER VARKEN JA ELLER NEJ om Hue Bridge kan lägga till andra
 * tillverkares Matter-enheter. Butikstexten antyder att den kan; Philips egen
 * Matter-sida beskriver bara riktningen utåt. Skriv att uppgiften saknas,
 * aldrig att bryggan inte kan.
 *
 * ⚠️ LÅNA ALDRIG EN SORT MELLAN MODELLER. Aqara M3 säger rakt ut att den styr
 * tredjepart; M100 gör det inte, och den raden ska spegla vad som står.
 *
 * ⚠️ Andra axeln: fungerar den utan internet? Homey Pro, Home Assistant Green
 * och Aqara M100 säger uttryckligen ja. Resten säger ingenting, vilket inte är
 * ett nej.
 *
 * ⚠️ Byggd av intern efterfrågan: hubb, gateway, brygga och bridge förekommer
 * 285 gånger över 16 kategorier, och det fanns inget länkmål.
 *
 * ⚠️ Ingen oberoende provning finns. Källorna är tillverkarnas egna sidor.
 *
 * ⚠️ Alla sju länkar går till Kjell, som har hela sortimentet och ligger på
 * 5 % / 30 d. Koncentrationen står utskriven på sidan.
 *
 * AFFILIATE-SWAP — LINK_MODE styr formen på länkarna. Se lib/links.ts.
 */

const TEST_PAGE = SMART_HEM_HUBB;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Ordet hubb täcker tre olika produkter på samma hylla, från 329 till 4 999 kronor. En brygga talar bara med sitt eget märke, en Matter-controller når andra tillverkares enheter, och en universell hubb talar varje radio. Vi jämförde sju.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "tre-sorter", label: "Tre olika produkter under samma ord" },
  { id: "utan-internet", label: "Vad som händer när internet ligger nere" },
  { id: "jamforelse", label: "Jämför alla sju" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "recensioner", label: "Recensioner av varje hubb" },
  { id: "andra-hubbar", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function SmartHemHubbPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = SMART_HEM_HUBB_PRODUCTS;
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
              Butikens hubbhylla rymmer tre olika produkter under samma ord, från
              329 till 4 999 kronor. En brygga talar bara med sitt eget märke, en
              Matter-controller når andra tillverkares enheter, och en universell
              hubb talar varje radio och kör utan internet. Priset skiljer dem
              inte åt. Vi jämförde sju hubbar på vad de faktiskt når.
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
        id="tre-sorter"
        width="default"
        title="En brygga för 899 kronor når ett märke, en controller för 329 når flera"
        description="Butikens hubbhylla rymmer tre produkter som löser olika problem. Priset skiljer dem inte åt."
      >
        <Prose>
          <p>
            <strong>Märkesbryggan talar bara med sitt eget märke.</strong> Plejd
            skriver själva att gatewayen ansluter användarens Plejd-mesh till
            internet och integrerar mot HomeKit, Google Home, Alexa, Homey och
            Verisure. Riktningen går utåt. Ingenting går in, och utan en
            befintlig Plejd-installation gör den ingenting alls. 899 kronor.
          </p>
          <p>
            <strong>Matter-controllern når andra tillverkares enheter.</strong>{" "}
            Aqara Hub M3 säger det med sju ord som ingen annan tillverkare i
            jämförelsen använder: Matter-controller, kan styra
            tredjepartsprodukter. Aqaras billigaste kostar 329 kronor.
          </p>
          <p>
            <strong>Den universella hubben talar varje radio.</strong> Homey Pro
            har wifi, Zigbee 3.0, Z-Wave Plus, Bluetooth LE, Matter, Thread,
            infraröd och 433 MHz i samma låda. De två sista når en gammal
            luftvärmepump och äldre trådlösa givare, alltså den utrustning som
            redan sitter i huset.
          </p>
          <p>
            <strong>Ordet Matter avgör mindre än man tror,</strong> eftersom det
            täcker två motsatta roller. En controller lägger till andra
            tillverkares enheter. En bridge exponerar sina egna för andra system.
            Båda skriver Matter på lådan.
          </p>
          <p>
            <strong>
              Philips är exemplet, och där stannar beskedet halvvägs.
            </strong>{" "}
            Butikstexten för Hue Bridge säger att den kan kopplas till enheter
            från flera tillverkare. Philips egen Matter-sida beskriver bara hur
            Hue ansluts till Alexa, Apple Home och Google Assistant. Om bryggan
            kan lägga till en annan tillverkares Matter-lås står ingenstans, och
            det står inte heller att den inte kan. Vi skriver att uppgiften
            saknas, eftersom det är vad den gör.
          </p>
        </Prose>
      </Section>

      {/* ----------------------------------------------------- the second -- */}
      <Section
        id="utan-internet"
        tone="muted"
        width="default"
        title="Tre av sju säger att hemmet fungerar utan internet"
        description="Hubben är navet. Slutar den fungera slutar allt som hänger på den att fungera."
      >
        <Prose>
          <p>
            <strong>Athom</strong> skriver att Homey Pro bearbetar lokalt och
            fungerar även utan internet, och att grundfunktionerna inte kräver
            abonnemang. <strong>Nabu Casa</strong> skriver att Home Assistant
            körs lokalt, att du äger din data och att hemmet går att styra även
            när nätet ligger nere. <strong>Aqara</strong> anger att M100 kör
            lokala automationer utan internet.
          </p>
          <p>
            <strong>De övriga säger ingenting om saken.</strong> Det betyder inte
            att de kräver moln, men det betyder att du inte kan ta reda på det
            innan du står med lådan hemma.
          </p>
          <p>
            <strong>Frågan är större här än på våra andra sidor.</strong> Slutar
            en lampa fungera är det irriterande. Slutar navet fungera slutar allt
            som hänger på det, och då spelar det roll om intelligensen sitter i
            lådan på hyllan eller på en server någon annan äger.
          </p>
          <p>
            Öppna plattformar står stadigast där. Home Assistant är gratis och
            öppen och lever vidare oberoende av vad företaget bakom bestämmer,
            vilket är ett annat slags trygghet än en garantitid.
          </p>
          <p>
            <strong>Kontrollera abonnemanget separat.</strong> Ingen av de sju
            kräver ett för grundfunktionerna, men en avgift för fjärrstyrning är
            i praktiken en avgift för att hubben ska vara användbar när du inte
            är hemma.
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
        title={`De ${products.length} bästa smarta hem-hubbarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sju"
        description="Raden Sort är vår klassificering ur tillverkarens egen beskrivning, och den avgör mer än priset."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(
            PRICE_CHECKED,
            "Raden Sort är vår klassificering ur tillverkarens egen beskrivning, inte butikens rubrik. Radior och uppgifter om lokal drift är tillverkarens och butikens egna. Där en rad står som ej angiven publicerar tillverkaren ingen uppgift, vilket gäller frågan om lokal drift för fyra av de sju och frågan om andra märken för tre. Vi fyller aldrig i en uppgift från en systermodell: att Aqara M3 skriver ut att den styr tredjepart säger ingenting om M100, som inte gör det.",
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
              Vi har inte kopplat in någon hubb och inte dragit ur någon
              internetkabel.
            </strong>{" "}
            Varje uppgift om radior, lokal drift och räckvidd är tillverkarens
            egen, läst på deras sida eller hos butiken.
          </p>
          <p>
            <strong>Raden Sort är vår slutsats, inte en uppgift.</strong> Vi har
            klassificerat varje produkt som märkesbrygga, Matter-controller eller
            universell hubb utifrån vad tillverkaren själv beskriver att den når.
            Butikens rubrik säger hubb om allihop, och den klassificeringen hade
            gjort tabellen oanvändbar. Där tillverkaren inte beskriver räckvidden
            har produkten inte rankats.
          </p>
          <p>
            <strong>Det finns ingen oberoende provning att luta sig mot.</strong>{" "}
            Vi hittade ingen provning av smarta hem-hubbar hos Råd & Rön,
            Stiftung Warentest eller någon annan redaktion vi normalt läser.
            Därför väger vi vad tillverkarna publicerar, och en produkt som
            skriver ut sina begränsningar får kredit för det även när
            begränsningen i sig är en nackdel.
          </p>
          <p>
            <strong>Alla sju länkar går till samma butik.</strong> Kjell är den
            enda svenska butik vi hittat med en egen hubbkategori, 33 artiklar,
            och de har hela urvalet. Att en sida vilar på en källa är en svaghet
            oavsett hur bra den källan är, och den står här i stället för att
            döljas.
          </p>
          <p>
            <strong>IKEA Dirigera saknas, och det är ett aktivt val.</strong> Den
            är sannolikt landets mest sålda hubb, men IKEA publicerar varken om
            den styr andra tillverkares Matter-enheter eller om automationer
            fungerar utan internet. De två uppgifterna avgör placeringen för alla
            andra här, så vi rankar den inte på gissningar.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje hubb"
        description="Alla sju bedöms mot samma fem kriterier. Uppgifterna är tillverkarens och butikens egna, inte kontrollerade av oss."
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
        id="andra-hubbar"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster som inte hamnade i rankningen, två av dem för att de är radior till en dator snarare än hubbar."
      >
        <ConsideredList items={SMART_HEM_HUBB_CONSIDERED} />
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
          footnote="Räckvidd och protokoll väger 30 av 100 eftersom det ensamt avgör om hubben löser problemet du köpte den för. En brygga för 899 kronor når ett märke och en Matter-controller för 329 når flera, så priset duger inte som vägvisare. Oberoende väger 25 och mäter två saker som hänger ihop: om hemmet fungerar när internet ligger nere, och vem som bestämmer hur länge produkten lever. Tre tillverkare anger uttryckligen att automationer körs lokalt; de övriga säger ingenting, och tystnad ger lägre poäng utan att räknas som ett nej. Upprättande väger 20 eftersom spannet är extremt, från tre minuter till en kväll, och en hubb som står halvinstallerad i en byrålåda är sämre än ingen alls. Där en tillverkare inte publicerar en uppgift står den som ej angiven, aldrig som en nolla, och vi fyller aldrig i en uppgift från en systermodell. Vi har inte kopplat in någon hubb, inte dragit ur någon internetkabel och inte mätt någon räckvidd. Priserna är hos den butik vi länkar till."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi kopplar inte in hubbarna fysiskt. Det här är vad vi gör i stället."
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
        description="Fem tillverkarsidor, lästa i original."
      >
        <Prose className="mb-block">
          <p>
            <strong>Hue Bridge är den som är svårast att placera.</strong> Den
            kopplar ihop sig med Alexa, Apple Home och Google, men om den kan ta
            emot en Matter-enhet från en annan tillverkare är okänt. Har du
            tänkt bygga vidare med annat än Hue är det den frågan du behöver
            svar på innan du köper.
          </p>
        </Prose>
        <SourceList sources={SMART_HEM_HUBB_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={SMART_HEM_HUBB_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
