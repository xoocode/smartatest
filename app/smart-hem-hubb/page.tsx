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

import Kopguide from "@/content/smart-hem-hubb/kopguide.mdx";

/*
 * ⚠️ Priser, kundbetyg, artikelnummer och radiouppsättningar är riktiga, lästa
 * 2026-08-04 hos Kjell eller på tillverkarens egen sida och kontrollerade om
 * 2026-08-06. Kriteriebetygen är redaktionell bedömning. Vi har inte kopplat in
 * någon hubb och inte dragit ur någon internetkabel.
 *
 * SIDANS FYND: ordet hubb täcker tre olika produkter på samma hylla, 329 till
 * 4 999 kronor.
 *   Märkesbrygga: Plejd Gateway styr enbart Plejd, enligt Plejd själva.
 *   Matter-controller: Aqara M100 är både bridge och controller för 329 kr.
 *   Universell hubb: Homey Pro talar åtta radior och kör lokalt.
 *
 * ⚠️⚠️ RESEARCHPASSET 2026-08-06 REV FYRA PÅSTÅENDEN om saknade uppgifter, tre
 * av dem belagda på den butikssida vi redan länkade. Aqara M3 har en 360°
 * IR-blaster och kör som edge-hubb lokalt; Aqara M100 är Matter Controller;
 * Philips publicerar "Local control (offline)" för Hue Bridge. Två fel åt andra
 * hållet: HA Green har inga inbyggda radior alls och Homey Pro mini saknar även
 * Z-Wave och BLE. Detaljerna står i lib/data/smart-hem-hubb.ts.
 *
 * ⚠️ KVAR SOM KONFLIKT: Kjell skriver att Hue Bridge kan lägga till produkter
 * från flera tillverkare. Philips två egna dokument beskriver bara riktningen
 * utåt. Vi följer tillverkaren och skriver vad bryggan gör, inte vad som saknas.
 *
 * ⚠️ LÅNA ALDRIG EN SORT MELLAN MODELLER. Varje cell har ett eget belägg på
 * produktens egen sida.
 *
 * ⚠️ Byggd av intern efterfrågan: hubb, gateway, brygga och bridge förekommer
 * 285 gånger över 16 kategorier, och det fanns inget länkmål.
 *
 * ⚠️ Ingen oberoende provning finns. Källorna är tillverkarnas egna sidor.
 *
 * ⚠️ Sju av åtta länkar går till Kjell, som har hela sortimentet och ligger på
 * 5 % / 30 d. Koncentrationen står utskriven på sidan.
 *
 * AFFILIATE-SWAP — LINK_MODE styr formen på länkarna. Se lib/links.ts.
 */

const TEST_PAGE = SMART_HEM_HUBB;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Smart hem-hubb bäst i test 2026: åtta hubbar jämförda från 329 kr. En controller för 329 kr når fler märken än en brygga för 899. Se vilken.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "tre-sorter", label: "Tre olika produkter under samma ord" },
  { id: "utan-internet", label: "Vad som händer när internet ligger nere" },
  { id: "jamforelse", label: "Jämför alla åtta" },
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
              Vår testvinnare är Athom Homey Pro för 4 999 kronor, eftersom den
              har åtta radior i lådan, infraröd och 433 MHz inräknade, så den når
              utrustningen du redan äger och inte bara ny. All automation körs
              dessutom lokalt. Behöver
              du inte Z-Wave når Aqara Hub M3 nästan lika långt för 1 729, och
              en Matter-controller för 329 kronor samlar fler märken än en
              brygga för 899. Vi jämförde åtta hubbar på vad de faktiskt når.
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
            Aqara M100 kostar 329 kronor och är både Matter bridge och Matter
            controller, alltså en hubb som både lämnar sina egna enheter vidare
            och tar in andras. Den är billigast på hela sidan och samlar ändå
            fler märken än bryggan som kostar nästan tre gånger så mycket.
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
            tillverkares enheter. En bridge lämnar sina egna vidare till andra
            system. Båda skriver Matter på lådan.
          </p>
          <p>
            <strong>Hue Bridge Pro visar vad skillnaden kostar.</strong> Den gör
            Hue tillgängligt i Apple Home, Google och Alexa och är enklast av
            alla att komma igång med, men den tar inte in andra tillverkares
            Matter-enheter. 899 kronor köper alltså ett enda märke på fler
            skärmar. Aqara M100 för 329 samlar flera märken i stället, och de
            två står bredvid varandra i samma hylla.
          </p>
        </Prose>
      </Section>

      {/* ----------------------------------------------------- the second -- */}
      <Section
        id="utan-internet"
        tone="muted"
        width="default"
        title="Sju av åtta fungerar utan internet, och den åttonde är en brygga"
        description="Hubben är navet. Slutar den fungera slutar allt som hänger på den att fungera."
      >
        <Prose>
          <p>
            <strong>Fem av dem bearbetar automationerna i själva lådan.</strong>{" "}
            Homey Pro och Homey Pro mini kör allt lokalt, Home Assistant körs i
            ditt eget nätverk, Aqara M3 hanterar automationerna i hubben i
            stället för i molnet, och Aqara M100 fortsätter köra sina lokala
            rutiner. Går uppkopplingen ner tänds hallampan av rörelsevakten
            ändå.
          </p>
          <p>
            <strong>Hue Bridge styr lamporna lokalt över nätverket,</strong> så
            ljuset lyder dig även när nätet inte fungerar. Det du förlorar är
            fjärrstyrningen och rösttjänsterna, inte belysningen i huset.
          </p>
          <p>
            <strong>Plejd Gateway är undantaget, och det är avsiktligt.</strong>{" "}
            Dess enda uppgift är att koppla Plejd-meshen till internet.
            Försvinner uppkopplingen försvinner fjärrstyrningen med den, medan
            strömbrytarna på väggen fungerar precis som förut.
          </p>
          <p>
            <strong>Frågan är större här än på våra andra sidor.</strong> Slutar
            en lampa fungera är det irriterande. Slutar navet fungera slutar
            allt som hänger på det, och då spelar det roll om intelligensen
            sitter i lådan på hyllan eller på en server någon annan äger.
          </p>
          <p>
            Öppna plattformar står stadigast där. Home Assistant är gratis och
            öppen och lever vidare oberoende av vad företaget bakom bestämmer,
            vilket är ett annat slags trygghet än en garantitid.
          </p>
          <p>
            <strong>Kontrollera abonnemanget separat.</strong> Ingen av de åtta
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
        title="Jämför alla åtta"
        description="Raden Sort är vår klassificering ur tillverkarens egen beskrivning, och den avgör mer än priset."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(
            PRICE_CHECKED,
            "Raden Sort är vår klassificering ur tillverkarens egen beskrivning, inte butikens rubrik. Radior, anslutning och uppgifter om lokal drift är tillverkarens och butikens egna. Raden Radior gäller vad som sitter i lådan: Home Assistant Green och Homey Pro mini når fler protokoll än så, men först sedan du köpt till en dongel respektive en Homey Bridge, och det står utskrivet i cellen. Vi fyller aldrig i en uppgift från en systermodell, utan varje cell har ett belägg på produktens egen sida.",
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
            klassificerat varje produkt som märkesbrygga, Matter-controller
            eller universell hubb utifrån vad tillverkaren själv beskriver att
            den når. Butikens rubrik säger hubb om allihop, och den
            klassificeringen hade gjort tabellen oanvändbar.
          </p>
          <p>
            <strong>
              Det finns ingen oberoende provning att luta sig mot.
            </strong>{" "}
            Vi hittade ingen provning av smarta hem-hubbar hos Råd & Rön,
            Stiftung Warentest eller någon annan redaktion vi normalt läser.
            Uppgifterna kommer därför från tillverkarnas egna datablad och
            produktsidor, och de är kontrollerade mot varandra där de
            överlappar.
          </p>
          <p>
            <strong>Fyra celler i tabellen stod fel till den 6 augusti.</strong>{" "}
            Vi hade skrivit att fyra uppgifter inte gick att få tag i, och tre
            av dem stod på den butikssida vi redan länkade till. Aqara M3 har en
            infraröd sändare vi angav som saknad, Aqara M100 är en fullvärdig
            Matter-controller, och både M3 och Hue Bridge kör lokalt. Samtidigt
            fann vi två fel åt andra hållet: Home Assistant Green och Homey Pro
            mini stod med radior de inte har. Rättelsen står på{" "}
            <a href="/rattelser">Rättelser</a> och den flyttade fyra
            placeringar.
          </p>
          <p>
            <strong>Sju av åtta länkar går till samma butik.</strong> Kjell är
            den enda svenska butik vi hittat med en egen hubbkategori, 33
            artiklar, och de har hela urvalet utom ett. Att en sida vilar på en
            källa är en svaghet oavsett hur bra den källan är, och den står här
            i stället för att döljas. IKEA Dirigera är undantaget och länkar
            till IKEA.
          </p>
          <p>
            <strong>IKEA Dirigera togs in i rankningen den 6 augusti.</strong>{" "}
            Den stod tidigare bland produkterna vi övervägde, med motiveringen
            att IKEA inte publicerar om den styr andra märken eller kör utan
            internet. Båda uppgifterna står på IKEA:s egna svenska sidor, så
            motiveringen höll inte. Den är nu bedömd mot samma fem kriterier som
            de övriga och hamnar på femte plats.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje hubb"
        description="Alla åtta bedöms mot samma fem kriterier, med räckvidd och lokal drift tyngst."
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
        description="Fem poster som inte hamnade i rankningen, två av dem för att de är radior till en dator snarare än hubbar."
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
          footnote="Räckvidd och protokoll väger 30 av 100 eftersom det ensamt avgör om hubben löser problemet du köpte den för. En brygga för 899 kronor når ett märke och en Matter-controller för 329 når flera, så priset duger inte som vägvisare. Radion måste dessutom sitta i lådan för att räknas fullt ut: Home Assistant Green och Homey Pro mini når fler protokoll först sedan du köpt till en dongel respektive en Homey Bridge, och det drar ner poängen. Oberoende väger 25 och mäter var automationen körs och vem som bestämmer hur länge produkten lever. Sju av åtta fortsätter fungera utan internet; Plejd Gateway gör det inte, eftersom dess enda uppgift är att koppla meshen till nätet. Upprättande väger 20 eftersom spannet är extremt, från tre minuter till en kväll, och en hubb som står halvinstallerad i en byrålåda är sämre än ingen alls. Vi fyller aldrig i en uppgift från en systermodell, utan varje cell har ett belägg på produktens egen sida. Vi har inte kopplat in någon hubb, inte dragit ur någon internetkabel och inte mätt någon räckvidd. Priserna är hos den butik vi länkar till."
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
        description="Elva källor: tillverkarnas och butikernas egna sidor, plus en teknisk genomgång."
      >
        <Prose className="mb-block">
          <p>
            <strong>Hue Bridge är den som är svårast att placera.</strong> Kjell
            skriver att du med Matter kan lägga till produkter från flera
            tillverkare. Philips två egna dokument beskriver bara den motsatta
            riktningen, och varje Matter-controller de namnger är någon annans
            nav: HomePod mini, Nest Hub, Echo. Vi följer tillverkaren före
            butiken och räknar bryggan som enkelriktad. Ska du bygga vidare med
            annat än Hue är det den skillnaden som avgör köpet.
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
