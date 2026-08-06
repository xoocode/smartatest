import type { Metadata } from "next";

import { DORRKLOCKA_MED_KAMERA, testPageTrail } from "@/lib/test-pages";
import { DORRKLOCKA_SOURCES } from "@/lib/sources";
import {
  DORRKLOCKA_CONSIDERED,
  DORRKLOCKA_FAQ,
  DORRKLOCKA_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/dorrklocka-med-kamera";
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

import Kopguide from "@/content/dorrklocka-med-kamera/kopguide.mdx";

/*
 * ⚠️ Priser, upplösning, synfält, strömförsörjning, innehåll i förpackningen,
 * kundbetyg och vilka funktioner butiken märker som abonnemangsberoende är
 * riktiga, lästa på Kjells egen sida på PRICE_CHECKED. Uppgifterna om
 * sekretesszoner är lästa i respektive tillverkares egen dokumentation, se
 * lib/sources.ts. Kriteriebetygen är redaktionell bedömning. Vi har inte
 * monterat, ringt på eller filmat med någon dörrklocka.
 *
 * Sidans fynd, i den ordning de står:
 *
 * 1. #lagenheten — IMY:s eget exempel säger att en dörrkamera på en
 *    lägenhetsdörr faller utanför privatundantaget. Det ligger först eftersom
 *    det för en stor del av läsarna ändrar hela beslutet, inte bara valet av
 *    produkt.
 * 2. #ringklockan — tre av åtta levereras utan signalenhet. Eget kriterium på
 *    tjugo procent, vilket ingen konkurrent har, eftersom en dörrklocka som
 *    bara ringer i telefonen inte är en dörrklocka.
 * 3. #synfaltet — det vertikala måttet avgör om paketet syns, och det är det
 *    mått nästan inget produktblad framhäver.
 *
 * Systersida till /overvakningskamera och /inomhuskamera, som delar
 * IMY-källan men har varsitt eget exempel från myndigheten.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 */

const TEST_PAGE = DORRKLOCKA_MED_KAMERA;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Reolink D340W för 1 199 kronor är billigast av åtta och den enda som har både ringklocka och strömadapter i lådan. Den döljer också grannens dörr i inspelningen, vilket avgör var du får sätta upp den: IMY:s eget exempel säger att privatundantaget inte gäller på en lägenhetsdörr.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "lagenheten", label: "I lägenhet gäller inte undantaget" },
  { id: "ringklockan", label: "Ringer det inne eller bara i telefonen?" },
  { id: "jamforelse", label: "Jämför alla åtta" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "synfaltet", label: "Måttet som avgör om paketet syns" },
  { id: "recensioner", label: "Recensioner av varje dörrklocka" },
  { id: "andra-dorrklockor", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function DorrklockaPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = DORRKLOCKA_PRODUCTS;
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
              Reolink D340W kostar 1 199 kronor, är billigast av de åtta och
              den enda där både ringklockan och strömadaptern redan ligger i
              lådan. Den svartar dessutom ut grannens dörr i inspelningen, och
              det avgör mer än man tror: Integritetsskyddsmyndigheten har ett
              färdigt exempel som säger att privatundantaget inte gäller för en
              dörrkamera på en lägenhetsdörr. Vi jämförde åtta dörrklockor från
              990 till 1 990 kronor.
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

      {/* --------------------------------------------------- the finding -- */}
      {/* Först av allt, eftersom det för en stor del av läsarna inte är ett
          produktval utan ett annat slags beslut. */}
      <Section
        id="lagenheten"
        width="default"
        title="I lägenhet gäller inte privatundantaget"
        description="Myndigheten har fyra egna exempel på när privatundantaget inte gäller. Det första handlar om den här produkten."
      >
        <Prose>
          <p>
            En boende i ett lägenhetshus sätter upp en dörrkamera på sin
            ytterdörr i trygghetssyfte. Omfattas det av privatundantaget?
          </p>
          <p>
            <strong>Nej.</strong> IMY:s svar, ordagrant:{" "}
            <em>
              &quot;Om bevakningen sker från en lägenhetsdörr och förbipasserande
              i trapphuset eller grannars lägenheter riskerar att komma med i
              bild gäller GDPR och kamerabevakningslagen.&quot;
            </em>
          </p>
          <p>
            Det betyder inte att produkten är förbjuden i lägenhet. Det betyder
            att den inte längre är en privat angelägenhet: du blir
            personuppgiftsansvarig, behöver en rättslig grund, ska göra en
            intresseavvägning och ska informera om bevakningen. IMY skriver
            samtidigt att bevakning som innebär ett allvarligt intrång i
            grannars personliga integritet sällan är tillåten.
          </p>
          <p>
            <strong>Lägg till en sak som inte är juridik.</strong> Ytterdörren
            till en lägenhet tillhör oftast föreningen eller hyresvärden och
            inte dig. Att borra i den, eller montera något på den, är en fråga
            att ställa i förväg.
          </p>
          <p>
            Har du egen ytterdörr direkt utifrån, i ett radhus eller ett
            markplanshus, är trapphusproblemet borta. Kvar står frågan om
            gångvägen fram till dörren är gemensam eller allmän, och den löses
            med kameravinkel eller maskering.
          </p>
          <p>
            Ingen av de svenska jämförelser vi läst nämner något av det här.
            Produkten säljs som en trygghetsprodukt för alla boendeformer.
          </p>
        </Prose>
      </Section>

      {/* --------------------------------------------------- the chime -- */}
      <Section
        id="ringklockan"
        tone="muted"
        width="default"
        title="Ringer det inne eller bara i telefonen?"
        description="Tre av åtta levereras utan signalenhet, och det är den skillnad som märks varje dag efter köpet."
      >
        <Prose>
          <p>
            <strong>Aqara G410</strong> levereras med en chime-hubb och sex
            AA-batterier. <strong>Tapo D235</strong> och{" "}
            <strong>Tapo D230S1</strong> levereras med en signalenhet som sätts
            i ett eluttag inomhus. <strong>Reolink D340W</strong> har en
            ringklocka på 433 MHz i lådan tillsammans med strömadaptern, och{" "}
            <strong>Imou 2S</strong> har en som dessutom håller minneskortet och
            förstärker wifi vid dörren.
          </p>
          <p>
            <strong>Ring Battery Video Doorbell</strong> levereras med
            dörrklocka, laddkabel, monteringssats, ett demonteringsverktyg och
            en snabbstartsguide. Ingen signalenhet. Arlo och Google gör likadant
            och säljer sina ringklockor som separata artiklar.
          </p>
          <p>
            En dörrklocka vars enda signal är en notis fungerar inte när mobilen
            ligger på ljudlöst i jackfickan, laddar i ett annat rum eller saknar
            täckning. Den fungerar inte alls för den som inte bär telefon på sig
            hemma, vilket är fler än man tror.
          </p>
          <p>
            <strong>Räkna alltid med ringklockan i priset.</strong> En dörrklocka
            för 1 090 kronor plus en signalenhet är inte billigare än en för
            1 490 med den i lådan. Det är därför signalen väger tjugo procent
            hos oss, vilket ingen konkurrent gör.
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
        title={`De ${products.length} bästa dörrklockorna med kamera 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla åtta"
        description="Signalenhet talar om det ringer inne hos dig. Synfält talar om paketet på trappen syns."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Uppgifterna om zoner är lästa i respektive tillverkares egen dokumentation och inte i butiken. Abonnemangspriserna är hämtade på Arlos, Rings och Googles egna svenska plansidor 2026-08-06, och Ring prissätter sina svenska planer i euro.`)}
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
            <strong>Alla åtta länkar går till Kjell.</strong>{" "}
            De är den enda svenska butik som för hela det här sortimentet och
            skriver ut priset på varje modell. Vi skriver hellre samma
            butiksnamn åtta gånger än hittar på ett pris. Hittar du modellen
            billigare någon annanstans är det den affären du ska göra.
          </p>
          <p>
            <strong>Vinnaren bytte plats den 7 augusti 2026.</strong>{" "}
            Vi skrev tidigare att Reolink D340W saknar signalenhet och kräver en
            befintlig ringklockledning. Båda uppgifterna var fel, och båda
            svaren stod i Kjells egen specifikation på den sida vi redan
            länkade: rutan &quot;I paketet&quot; listar både ringklocka och
            strömadapter. Felet låg i vår research, och det kostade produkten
            två kriterier och två placeringar. Se{" "}
            <a href="/rattelser">rättelser</a>.
          </p>
          <p>
            <strong>Abonnemangspriserna stod öppet hela tiden.</strong>{" "}
            Sidan skrev till den 7 augusti 2026 att ingen av tillverkarna
            publicerar vad planerna kostar i Sverige. Alla tre gör det: Arlo på
            sin svenska plansida, Ring på sin, och Google på Nest Aware-sidan,
            som numera heter Google Home Premium. Priserna står nu i tabellen
            och i varje omdöme, eftersom en dörrklocka utan lokal lagring
            kostar sitt hyllpris plus en avgift så länge du äger den.
          </p>
          <p>
            <strong>En lucka i vår research sänker inget betyg.</strong>{" "}
            Kriteriet för maskering betygsätter vilken sorts zon produkten har,
            inte hur lätt uppgiften var att hitta. Google Nest och Imou ligger
            lägst för att den zon tillverkarna dokumenterar för respektive
            modell styr notiser i stället för bilden, vilket Google skriver ut
            själva: en aktivitetszon ändrar inte vad kameran spelar in.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------- field of view -- */}
      <Section
        id="synfaltet"
        width="default"
        title="Måttet som avgör om paketet syns"
        description="Nästan varje produktblad anger diagonalt synfält, eftersom det är det största talet. Det säger minst."
      >
        <Prose>
          <p>
            En dörrklocka med brett men platt synfält ser ansiktet på den som
            står framför och en bit av grannens husvägg. Ett paket som ställts
            ner vid tröskeln ligger utanför bild.
          </p>
          <p>
            <strong>Titta på det vertikala måttet.</strong> Tapo D235 anger 140
            grader vertikalt. Ring har kvadratisk bild, 1920 gånger 1920 pixlar
            med 140 grader åt båda hållen. Google löser samma sak med stående
            bildformat, 960 gånger 1280. Det är de tre som ser en människa från
            hjässa till skor och paketet på trappen i samma bild.
          </p>
          <p>
            Upplösningen spelar mindre roll än formatet på det här avståndet.
            Skillnaden mellan 2K och 4K syns knappt när personen står en meter
            från linsen, medan skillnaden mellan 60 och 140 graders vertikalt
            synfält syns varje gång ett bud varit där.
          </p>
          <p>
            <strong>Montera på ungefär 120 centimeter.</strong> Det är lägre än de flesta sätter den, och
            över marken är standard. Sätter du dörrklockan i ögonhöjd ser du
            ansiktet på en vuxen som står rakt framför, men inte barnet, inte
            paketet och inte den som står ett steg tillbaka. Flera produkter
            levereras med kilbeslag för att vinkla enheten. Använd dem.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje dörrklocka"
        description="Alla åtta bedöms mot samma fem kriterier. Måtten är butikens egna, och uppgifterna om maskering är tillverkarens."
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
        id="andra-dorrklockor"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Fem poster som inte hamnade i rankningen, inklusive två som saknar specifikation helt."
      >
        <ConsideredList items={DORRKLOCKA_CONSIDERED} />
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
          footnote="Integritet och bild väger 25 vardera, och ringklockan 20. Skälet till att signalen väger så tungt är att en dörrklocka vars enda signal går till en telefon inte löser den uppgift man köper den för, och att tre av åtta levereras utan. Skalan för integritet mäter vilken sorts zon produkten har: 5,0 för en sekretesszon som svartar ut området i inspelningen utan förbehåll som rör en fast monterad dörrklocka, 4,0 med ett förbehåll som bara slår in om enheten flyttas eller vrids, 3,0 när rörelsedetektorn känner av området ändå eller zonerna raderas när du justerar bilden, och 1,5 när zonen är en aktivitets- eller detekteringszon, som inte ändrar vad kameran spelar in. En uppgift vi inte lyckats få fram sänker inget betyg. Kriteriet kostnad efter köp väger både vad som slutar fungera utan abonnemang och vad abonnemanget kostar: Arlo Secure 99 kronor i månaden för en enhet eller 1 089 om året, Ring Basic 3,99 euro i månaden eller 39,99 om året, och Google Home Premium, som Nest Aware numera heter, 100 kronor i månaden eller 1 000 om året. Bildbedömningen bygger på publicerade mått och inte på bilder vi tagit. Vi hittade inget svenskt test av kategorin. Priserna är hos den butik vi länkar till."
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
        description="Myndighetens eget exempel om lägenhetsdörren, tillverkarnas egen dokumentation av zonerna, och butiken som bär priserna."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Det finns inget svenskt test av dörrklockor med kamera.
            </strong>{" "}
            Varken Råd &amp; Rön eller Testfakta har testat kategorin.
          </p>
          <p>
            <strong>Primärkällorna är av ett annat slag.</strong> I stället för
            provningsrapporter är det en myndighetstext med ett färdigt exempel
            om just den här produkten, plus tillverkarnas egen dokumentation av
            den funktion som avgör om produkten går att använda lagligt. Alla är
            lästa i original och citerade ordagrant, i stället för att refereras
            via en tredje part.
          </p>
        </Prose>
        <SourceList sources={DORRKLOCKA_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={DORRKLOCKA_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "pricing"]}
          className="mb-block"
        />
      </Container>
    </>
  );
}
