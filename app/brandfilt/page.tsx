import type { Metadata } from "next";

import { BRANDFILT, testPageTrail } from "@/lib/test-pages";
import { BRANDFILT_SOURCES } from "@/lib/sources";
import {
  BRANDFILT_CONSIDERED,
  BRANDFILT_FAQ,
  BRANDFILT_FILTERS,
  BRANDFILT_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/brandfilt";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
import { getStyle } from "@/lib/style-server";
import { NOT_STATED, priceCaption } from "@/lib/captions";
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
import { CriteriaScores } from "@/components/product/criteria-scores";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { FilterableComparison } from "@/components/product/filterable-comparison";
import { MethodologyBlock } from "@/components/product/methodology-block";
import { ProductReview } from "@/components/product/product-review";
import { ProductSchema } from "@/components/product/product-schema";
import { QuickPickPanel } from "@/components/product/quick-pick-panel";
import { WinnerCard } from "@/components/product/winner-card";
import { WinnerGrid } from "@/components/product/winner-grid";
import { VerdictText } from "@/components/product/verdict-text";

import Kopguide from "@/content/brandfilt/kopguide.mdx";

/*
 * ⚠️ Priser, storlekar, material, temperaturtålighet, vikt, artikelnummer,
 * kundbetyg och framför allt vilken version av EN 1869 varje filt är provad mot
 * är riktiga, lästa på butikernas egna produktsidor på PRICE_CHECKED och
 * omkontrollerade samma dag. Kriteriebetygen är redaktionell bedömning utifrån
 * de uppgifterna. Vi har inte tänt eld på något.
 *
 * Sidans fynd är att EN 1869 finns i två versioner som provar olika saker. Se
 * lib/test-pages.ts för hur det påverkar viktningen.
 *
 * ⚠️ 2026-08-06: kriteriet betygsatte tidigare vad butiken skrivit ut i stället
 * för vad filten är provad mot, och två filtar stod som saknande årtal. Båda
 * årtalen fanns tryckta på förpackningen i butikens egen produktbild. Ändra
 * inte tillbaka texten till att handla om vad butiken dokumenterar. Se
 * lib/corrections.ts och .agent/research/brandfilt.md.
 *
 * ⚠️ Här stod tidigare att versionsnumret "står i butikstexten men i ingen
 * jämförelse". **Det var fel**, uppmätt 2026-08-03: fem av sex svenska
 * jämförelser skriver ut en version, och brandinfo.se gör det tolv gånger.
 * Det som faktiskt skiljer oss är att ingen av dem nämner att versionerna är
 * två. Två av dem citerar 1997 som gällande. Underlaget står vid
 * BRANDFILT_SOURCES i lib/sources.ts.
 *
 * Tre saker som tillkom vid självgranskningen 2026-08-02 och som inte ska
 * plockas bort utan att någon tänker efter:
 *
 * 1. Avsnittet #kallor säger rakt ut att det inte finns något oberoende test av
 *    brandfiltar. Det är kategorins sanning och läsaren har nytta av den.
 * 2. Avsnittet #vem-har-kontrollerat redovisar att en enda butik tar fyra
 *    platser, att den är den enda annonserbara, och att ingen certifiering är
 *    granskad av tredje part.
 * 3. Beskrivningen av vad revisionen 2019 ändrade är kontrollerad mot
 *    standardens egen text. Se .agent/research/brandfilt-verifiering.md.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 * Se lib/links.ts.
 */

const TEST_PAGE = BRANDFILT;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Brandfilt bäst i test 2026: åtta släckfiltar jämförda från 100 kr. Årtalet i EN 1869 avgör om vätskebrand ingår. Se vilken.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "tva-versioner", label: "Två versioner av samma standard" },
  { id: "jamforelse", label: "Jämför alla åtta" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "recensioner", label: "Recensioner av varje filt" },
  { id: "andra-filtar", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function BrandfiltPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = BRANDFILT_PRODUCTS;
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
              Vi rekommenderar Brandvarnare.se:s 120 × 180 i hård box för
              199 kronor, eftersom den är stor nog att svepa om en vuxen, måttet
              räddningstjänsterna pekar ut. Den är provad mot brand i vätska och öppnas med ett
              grepp. Storleken ska
              vara 120 × 180 centimeter och provningen EN 1869:2019, eftersom
              bara den versionen omfattar brinnande vätska och inte bara matolja.
              Tre av filtarna är provade mot 1997 års version, som drogs tillbaka
              2020, och en av dem är jämförelsens dyraste.
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

      {/* -------------------------------------------------- tva versioner -- */}
      {/* Ligger högt med flit. Utan det här är tabellens viktigaste kolumn
          obegriplig, och det är hela skälet till att sidan finns. */}
      <Section
        id="tva-versioner"
        width="default"
        title="Två versioner av samma standard"
        description="EN 1869 är den europeiska standarden för brandfiltar. Den är frivillig, så det avgörande är inte att den nämns utan vilken version butiken skriver ut, och skillnaden är inte formalia."
      >
        <Prose>
          <p>
            <strong>EN 1869:1997</strong> provade brandfiltar mot brand i
            matolja, som i stekpannan som fattar eld, och innehöll ett prov av
            elektrisk ledningsförmåga. Den versionen är tillbakadragen sedan
            2020.
          </p>
          <p>
            <strong>EN 1869:2019</strong> behöll båda proven, skärpte elprovet
            och lade till ett obligatoriskt <strong>heptanprov</strong> för
            brand i vätska. Den slog också fast att en brandfilt är en
            engångsprodukt. Skillnaden mellan versionerna är därför inte att den
            ena är provad och den andra inte, utan att bara den nyare är provad
            mot brand i annat än matolja.
          </p>
          <p>
            Standarden säger dessutom något om storlek som ingen butik citerar:
            filtar som är tillräckligt stora anses lämpliga för att kväva elden
            på en person vars kläder brinner. Någon centimetersiffra ger den
            inte. Den kommer från räddningstjänsterna, och den är 120 × 180.
          </p>
          <p>
            Fem av de åtta filtarna är provade mot 2019. Tre är provade mot 1997,
            och en av de tre är jämförelsens dyraste. Årtalet står inte alltid i
            butikens specifikation: för två av filtarna finns det tryckt på
            förpackningen, som syns på butikens egna produktbilder.
          </p>
          <p>
            Kontrollera alltså årtalet, inte bara att standarden nämns. Står det
            inte i specifikationen är det värt att zooma in på bilden av påsen.
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
        title={`De ${products.length} bästa brandfiltarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla åtta"
        description="Läs Certifiering först, där det är årtalet som räknas. Sedan Storlek, där räddningstjänsterna rekommenderar 120 × 180. De två raderna väger lika tungt."
      >
        <FilterableComparison
          products={products}
          filters={BRANDFILT_FILTERS}
          legend="Filtrera på storlek, certifiering och förpackning"
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `${NOT_STATED} En av filtarna var slut vid kontrollen.`)}
        />
      </Section>

      {/* ------------------------------------------------ self-disclosure -- */}
      {/* Ligger direkt under tabellen med flit. Det är där läsaren ser att en
          enda butik tar fyra platser, och då ska förklaringen finnas på samma
          skärm i stället för i en datafil ingen läser. */}
      <Section
        id="vem-har-kontrollerat"
        width="default"
        title="Vem har kontrollerat det här?"
        description="Vad rankningen bygger på, och var den är svag."
      >
        <Prose>
          <p>
            <strong>Ingen certifiering är granskad av tredje part.</strong> Vi
            läser vilken version av standarden varje filt anges vara provad mot,
            i butikens specifikation eller på förpackningen, och jämför det med
            standardens egen text. Vi har inte sett något provningsintyg, och vi
            har inte tänt eld på någon filt.
          </p>
          <p>
            <strong>
              Fyra av åtta filtar kommer från samma butik, och de tar plats 1, 2,
              5 och 6.
            </strong>{" "}
            Brandvarnare.se säljer dem utan angiven tillverkare, som egen
            etikett. Skälet till de två översta placeringarna är att de är den
            enda butiken som säljer 120 × 180 provad mot 2019 för under 200
            kronor. Kjells 120 × 180 kostar 299,90 och är provad mot 1997.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje filt"
        description="Alla filtarna bedöms mot samma fem kriterier. Provningen är gjord av ett certifieringsorgan, inte av oss."
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
        id="andra-filtar"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Fyra poster som inte hamnade i rankningen, inklusive de filtar som säljs helt utan angiven standard."
      >
        <ConsideredList items={BRANDFILT_CONSIDERED} />
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
          footnote="Provning och storlek väger 30 vardera. Skalan för provning är 5,0 för en filt provad mot EN 1869:2019, alltså brand i matolja, brand i vätska med heptan och ett elprov, och 3,0 för en filt provad mot 1997, som saknar heptanprovet. Fram till augusti 2026 vägde kriteriet 35 och betygsatte i stället vad butiken skrivit ut, vilket gav en filt med okänt årtal högre betyg än en med utskrivet 1997. Det är rättat, och rättelsen står på /rattelser. Vi hittade inget oberoende test av brandfiltar, så till skillnad från våra sidor om smart belysning och smarta uttag finns här inget kriterium för testomdömen. Priserna är hos den butik vi länkar till."
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
        description="Standarden själv, räddningstjänsternas rekommendationer och butikernas egna produktsidor för de uppgifter vi jämfört. Inget av det nedan är ett produkttest, och skälet står i rutan här under."
      >
        <Prose className="mb-block">
          <p>
            <strong>Det finns inget oberoende test av brandfiltar.</strong> Inte
            hos Råd &amp; Rön, inte hos Testfakta, inte hos någon nordisk
            testredaktion. Vi letade den 2 augusti 2026 och hittade ingenting.
          </p>
          <p>
            På våra sidor om smart belysning och smarta uttag bygger betygen till
            en del på publicerade tester, och där finns ett eget kriterium för
            vad testarna kommit fram till. Här går det inte, så det kriteriet
            finns inte. Vikten ligger i stället på det som faktiskt går att
            kontrollera.
          </p>
          <p>
            Det säljs sidor som säger sig ha testat brandfiltar. De redovisar
            varken metod, mätvärden eller testdatum, och en av dem daterar sin
            artikel i framtiden. Vi räknar dem inte som källor, och vi kallar
            inte heller vår egen jämförelse för ett test i den meningen.
          </p>
        </Prose>
        <SourceList sources={BRANDFILT_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={BRANDFILT_FAQ} schema />
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
