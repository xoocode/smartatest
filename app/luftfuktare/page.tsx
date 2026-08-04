import type { Metadata } from "next";

import { LUFTFUKTARE, testPageTrail } from "@/lib/test-pages";
import { LUFTFUKTARE_SOURCES } from "@/lib/sources";
import {
  LUFTFUKTARE_CONSIDERED,
  LUFTFUKTARE_FAQ,
  LUFTFUKTARE_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/luftfuktare";
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

import Kopguide from "@/content/luftfuktare/kopguide.mdx";

/*
 * ⚠️ Priser, kundbetyg, GTIN, teknik, kapacitet, tankvolym, ytor, ljudnivåer
 * och effekt är riktiga, lästa på Kjells, Apoteas och Clas Ohlsons egna
 * produktsidor på PRICE_CHECKED. Kriteriebetygen är redaktionell bedömning.
 * Vi har inte mätt luftfuktighet, inte odlat bakterier och inte provat någon
 * apparat.
 *
 * Sidans fynd, och hela dess hållning: SweSIAQ, svenska föreningen för
 * inomhusmiljö, skriver att man i allmänhet bör undvika konstgjord befuktning
 * av luften. Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 namnger 45 %
 * vid 21 °C som en indikation som kan få tillsynsmyndigheten att kräva
 * undersökning av bostaden. Butikerna marknadsför 40 till 60 %.
 *
 * ⚠️⚠️ Var noga med vad det är. 45 % är INGET gränsvärde och INGEN hälsogräns,
 * och allmänna råd är rekommendationer och inte bindande regler. Sidan får
 * aldrig påstå att en luftfuktare är olaglig eller att 46 % är farligt. Den
 * återger normen och låter läsaren dra slutsatsen.
 *
 * Inget kriterium för testomdöme. Kontrollerat produkt för produkt: av tolv
 * rankade täcks två av oberoende test. Se .agent/research/luftfuktare.md §5.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning. Se lib/links.ts.
 */

const TEST_PAGE = LUFTFUKTARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "SweSIAQ skriver att man i allmänhet bör undvika konstgjord befuktning av luften, och Folkhälsomyndigheten namnger 45 procent vid 21 grader. Butikerna marknadsför 40 till 60. Vi jämförde tolv luftfuktare från 399 till 1 999 kronor på fuktreglering och hygien.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "normen", label: "Expertorganet avråder från kategorin" },
  { id: "bakterierna", label: "Vad de tyska proven mätte" },
  { id: "jamforelse", label: "Jämför alla tolv" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "recensioner", label: "Recensioner av varje luftfuktare" },
  { id: "andra-luftfuktare", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function LuftfuktarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = LUFTFUKTARE_PRODUCTS;
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
              Svenska föreningen för inomhusmiljö skriver att man i allmänhet
              bör undvika konstgjord befuktning av luften. Folkhälsomyndigheten
              namnger 45 procent vid 21 grader som en indikation för att kräva
              undersökning av bostaden. Butikerna marknadsför 40 till 60. Ingen
              av de sju svenska jämförelser vi läst nämner något av det. Har du
              ändå bestämt dig jämförde vi tolv luftfuktare från 399 till 1 999
              kronor på två frågor: om apparaten kan sluta fukta, och om den
              skickar ut tankens innehåll i rummet.
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
        <TocNav
          variant="inline"
          entries={TOC}
          className="mt-block lg:hidden"
        />
      </Section>

      {/* --------------------------------------------------- the finding -- */}
      <Section
        id="normen"
        width="default"
        title="Expertorganet avråder från hela produktkategorin"
        description="Det står i klartext, och ingen svensk jämförelse citerar det."
      >
        <Prose>
          <p>
            <strong>SweSIAQ</strong> är svenska föreningen för inomhusmiljö,
            alltså svensk avdelning av International Society of Indoor Air
            Quality and Climate. I deras skrift om luftfuktighet står, under
            rubriken Problem med låg luftfuktighet:
          </p>
          <blockquote>
            I allmänhet bör man undvika konstgjord befuktning av luften (risker
            med mögel-/bakterieväxt) och man kan ibland behöva acceptera den
            lägre luftfuktigheten.
          </blockquote>
          <p>
            Deras alternativ kostar ingenting.{" "}
            <strong>Låt inte inomhustemperaturen vara onödigt hög</strong>,
            eftersom det är uppvärmningen som gör den relativa fuktigheten låg,
            och <strong>anpassa ventilationen</strong> så att luftflödena inte
            är högre än vad antalet personer i rummet kräver.
          </p>
          <p>
            <strong>Och så talet.</strong> Folkhälsomyndighetens allmänna råd{" "}
            <strong>FoHMFS 2014:14</strong> räknar upp vad som kan få
            tillsynsmyndigheten att kräva att en byggnad undersöks enligt
            miljöbalken. Två av punkterna gäller fukten i luften:
          </p>
          <blockquote>
            – om fukttillskottet inomhus, under vinterförhållanden, regelmässigt
            överstiger 3 g/m³ luft, eller
            <br />
            <br />– om luftfuktighetens medelvärde överstiger 7 g vatten/kg torr
            luft under en längre period under eldningssäsongen, vilket motsvarar
            ca 45 % relativ luftfuktighet vid 21° C.
          </blockquote>
          <p>
            Det är precis vad en luftfuktare är byggd för att göra: höja
            luftfuktigheten under eldningssäsongen.
          </p>
          <p>
            <strong>Var noga med vad det här är.</strong> 45 procent är inget
            gränsvärde och ingen hälsogräns. Allmänna råd är rekommendationer
            och inte bindande regler, vilket författningssamlingen själv skriver
            ut. Ingen kommer att knacka på din dörr vid 46 procent. Men det är
            det enda tal en svensk myndighet namnger, och butikerna
            marknadsför 40 till 60 procent.
          </p>
          <p>
            <strong>Vi rankar ändå tolv luftfuktare här.</strong> Har du
            bestämt dig ska du få ett bra köp, och skillnaderna mellan
            apparaterna är stora och verkliga. Men vi sätter det här först i
            stället för sist.
          </p>
        </Prose>
      </Section>

      {/* --------------------------------------------------- the numbers -- */}
      <Section
        id="bakterierna"
        tone="muted"
        width="default"
        title="Vad de tyska proven mätte"
        description="Två laboratorier har odlat bakterier ur luften från luftfuktare. Det är inga påståenden."
      >
        <Prose>
          <p>
            <strong>ÖKO-TEST</strong> provade åtta apparater. Fem av dem spred
            bakterier i oroande mängd, och deras mätvärden är de mest talande vi
            läst: <strong>mellan 400 000 och drygt 60 miljoner
            kolonibildande enheter per timme</strong>, att jämföra med normal
            inomhusluft som innehåller ungefär 100 till 500 per kubikmeter.
          </p>
          <p>
            <strong>Ultraljudsförnebulare pekas ut särskilt.</strong> Bara tre
            av åtta fick omdömet mycket bra eller bra. Deras egen
            rekommendation är återhållsam: använd en luftfuktare först när den
            relativa luftfuktigheten legat under 30 procent under en längre tid.
          </p>
          <p>
            <strong>Stiftung Warentest</strong> provade åtta apparater i
            september 2025 under rubriken <em>Nein zur Keimschleuder</em>,
            alltså nej till bakteriespridaren. Fem var förångare och tre var
            ultraljud. Deras slutsats är mildare och värd att återge korrekt:
            några modeller avger bakterier till rumsluften och flera gör det
            inte, och utan regelbunden tömning, rengöring och avkalkning kan
            bakterier föröka sig eller mögel bildas.
          </p>
          <p>
            <strong>Skillnaden ligger i tekniken, inte i priset.</strong>{" "}
            Ultraljud slår sönder vattnet till dimma och skickar med allt som
            finns i tanken. Förångning låter vattnet avdunsta genom en veke, så
            mineraler och mikrober stannar kvar i filtret. Ånga kokar vattnet.
            Det är därför hygien och teknik väger 25 av 100 hos oss.
          </p>
          <p>
            <strong>Och det syns inte på produktnamnet.</strong> Två av
            apparaterna här hamnade långt från där namnet antydde. Xiaomi Smart
            Humidifier Pro fuktar enligt butikens egen text genom naturlig
            avdunstning utan synlig dimma, och gick från botten till andra
            plats. Wilfa Dew TX450 kostar lika mycket som vår testvinnare och
            beskrivs av butiken som ultrasonisk. Den hamnade sist.
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
        title={`De ${products.length} bästa luftfuktarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tolv"
        description="Ställbar fukt avgör om apparaten kan sluta i tid. Teknik avgör om den skickar ut tankens innehåll i rummet."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Teknik, kapacitet, tankvolym, ytor, ljudnivåer och effekt är butikens egna uppgifter. Där en uppgift står som anges inte betyder det att butiken inte publicerar den, inte att egenskapen saknas. Det gäller effekt för två av apparaterna, ställbar fukt för en och rumsyta för en.`)}
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
            <strong>Vi har inte mätt någon luftfuktighet och inte odlat några
            bakterier.</strong>{" "}
            Alla tal om bakteriespridning kommer från ÖKO-TEST och Stiftung
            Warentest, och alla tal om vad som är för fuktigt kommer från
            Folkhälsomyndighetens allmänna råd och från SweSIAQ. Ingen av dem
            har provat de tolv apparaterna vi rankar i sin helhet.
          </p>
          <p>
            <strong>Vi har inget kriterium för testomdöme, och den här gången
            är frånvaron kontrollerad produkt för produkt.</strong>{" "}
            Av de tolv täcks två av oberoende test: Philips 5000 av Ljud & Bild
            i februari 2025, och Beurer LB 300 Plus av Stiftung Warentest i
            september 2025. Tio är oprovade. Ett kriterium som tio av tolv inte
            kan få poäng på mäter vem som blivit provad, inte vad produkten går
            för.
          </p>
          <p>
            <strong>
              Butiken kallar vår testvinnare bäst i test, och det gör inte
              testet.
            </strong>{" "}
            Clas Ohlsons produktsida inleds med orden Bäst i test och hänvisar
            till Ljud & Bild i februari 2025. Testet finns, datumet stämmer och
            Philips är med. Men testet utser ingen vinnare och sätter inga
            betyg alls. Att vi ändå sätter Philips först beror på vår egen
            viktning, inte på butikens rubrik.
          </p>
          <p>
            <strong>Fyra av tolv är Beurer.</strong> Det beror på att Beurer
            dominerar Apoteas sortiment, och Apotea är en av få svenska butiker
            med bredd i kategorin. De fyra hamnar dessutom på fyra olika
            platser i rankningen, från tredje till åttonde, vilket är rimligt
            eftersom två av dem är förångare och två är ultraljud.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje luftfuktare"
        description="Alla tolv bedöms mot samma fem kriterier. Uppgifterna är butikens egna, inte kontrollerade av oss."
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
        id="andra-luftfuktare"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Fem poster som inte hamnade i rankningen, inklusive en utgången modell ur det svenska testet och två som bara säljs via Amazon."
      >
        <ConsideredList items={LUFTFUKTARE_CONSIDERED} />
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
          footnote="Fuktreglering och hygien väger tillsammans 50 av 100, eftersom de svarar på var sin halva av den enda verkliga risken: att apparaten fuktar mer än du vill, och att den skickar ut tankens innehåll i rummet. Fuktreglering ger 5,0 när målnivån går att ställa fritt i små steg, 4,0 i fasta steg, 3,5 när apparaten mäter men inte låter dig sätta ett mål, 2,0 för enbart effektlägen och 1,0 för enbart timer. Hygien ger 5,0 för förångning, 4,5 för ånga, 2,5 för ultraljud med angiven motåtgärd och 2,0 för ultraljud utan. Kriteriet mäter teknikens art och vad butiken skriver, inte ett mätvärde: vi har inte odlat bakterier ur någon av apparaterna. Där en butik inte publicerar en uppgift står den som saknad, aldrig som en nolla. Priserna är hos den butik vi länkar till."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi provar inte apparaterna fysiskt. Det här är vad vi gör i stället."
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
        description="Två svenska normkällor lästa i original, två tyska laboratorieprov, ett svenskt handhavandetest och butikernas egna produktsidor."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Kategorins primärkällor är inte tester utan normer.
            </strong>{" "}
            Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 är åtta sidor och
            lästa i sin helhet. SweSIAQ:s skrift om luftfuktighet är två sidor
            och läst i sin helhet. Båda är sparade hos oss, eftersom en PDF som
            flyttas är en källa som försvinner.
          </p>
          <p>
            <strong>
              Ingen av de sju svenska jämförelser vi läst nämner någon av dem.
            </strong>{" "}
            Varken SweSIAQ, Folkhälsomyndighetens allmänna råd, miljöbalken
            eller begreppet fukttillskott förekommer på någon av dem. Den enda
            som namnger Folkhälsomyndigheten
            tillskriver dem ett spann på cirka 30 till 50 procent som inte
            finns i deras allmänna råd, och det svenska testet skriver i sin
            ingress att det inte finns några exakta gränsvärden.
          </p>
        </Prose>
        <SourceList sources={LUFTFUKTARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={LUFTFUKTARE_FAQ} schema />
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
