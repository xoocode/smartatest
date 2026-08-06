import type { Metadata } from "next";

import { testPageTrail, PIZZAUGN } from "@/lib/test-pages";
import { SOURCES_BY_HREF } from "@/lib/sources";
import {
  PRICE_CHECKED,
  PIZZAUGN_FAQ,
  PIZZAUGN_CONSIDERED,
  PIZZAUGN_PRODUCTS,
} from "@/lib/data/pizzaugn";
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

import Kopguide from "@/content/pizzaugn/kopguide.mdx";

/*
 * Andra sidan i gruppen Kök, byggd 2026-08-06.
 *
 * ⚠️ Sidan rankar fristående pizzaugnar mellan 2 100 och 8 990 kronor på
 * gasol, ved, kol och el. Murade och fast installerade ugnar från 19 000 kronor
 * ligger bland de övervägda, efter användarbeslut.
 *
 * ⚠️ INGET TESTOMDÖMEKRITERIUM, efter användarbeslut. tek.no publicerar betyg
 * 1–10 för 20 modeller från en riktig handpåläggning över tre år, men bara
 * fyra av dem säljs här under exakt det provade namnet och Ooni bytte
 * generation efter provningen. Ett viktat testbetyg hade låtit provningsurvalet
 * avgöra ordningen. Omdömena återges per modell med publikationen namngiven.
 *
 * ⚠️ MAXTEMPERATUREN BÄR INGEN VIKT. Femton av femton anger 500 °C, med Ninja
 * Artisan på 370 som enda undantag. En grind varje produkt passerar är ingen
 * axel som rangordnar dem. Samma beslut som `Larm när förbindelsen bryts` på
 * /babyvakt. Talet står i tabellen därför att läsaren letar efter det.
 *
 * ⚠️ `jamn-varme` betygsätter KONSTRUKTIONEN och inte mätvärdet: roterande
 * sten, dörr, brännarens geometri och stenens tjocklek. Skälet är att bara fyra
 * modeller har ett mätvärde, och ett kriterium satt på det hade betygsatt vem
 * som fått ett provexemplar. Se `ALDRIG_BEDOMD` i lib/spec-schema.mjs.
 *
 * ⚠️ KÄLLORNA ÄR OENSE OM GOZNEY ROCCBOX. Which? har den som testvinnare bland
 * sex mobila ugnar; tek.no ger den 7,0 av 10 och mätte 470 grader bak mot 270
 * fram. Båda står utskrivna i omdömet, eftersom motsättningen är det mest
 * värdefulla sidan kan publicera.
 *
 * ⚠️ Sex av tolv rankade ugnar är Ooni. Det speglar handelns sortiment och står
 * utskrivet i fyndavsnittet.
 *
 * Priser, artikelnummer, lagerstatus och kundbetyg är lästa i produktsidans
 * egen JSON-LD hos butiken på PRICE_CHECKED. Specifikationerna är lästa hos
 * tillverkaren.
 *
 * AFFILIATE-SWAP — se lib/links.ts för vad LINK_MODE står på i dag.
 */

const TEST_PAGE = PIZZAUGN;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Ooni Karu 2 vinner för 3 499 kronor: glasdörren håller kvar värmen och den går på ved, kol eller gasol. Vill du grädda till fyra samtidigt kostar Witt Piccolo Rotante 16\" 5 290 kronor och snurrar stenen åt dig. Alla anger 500 grader, men fram där pizzan läggs in är stenen ofta 220.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "spridningen", label: "500 grader bak, 220 fram" },
  { id: "jamforelse", label: "Jämför alla tolv" },
  { id: "recensioner", label: "Recensioner av varje pizzaugn" },
  { id: "andra-pizzaugnar", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function PizzaugnPage() {
  const style = await getStyle();
  const products = PIZZAUGN_PRODUCTS;
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
            {/* H1 bär fyndet: talet alla anger stämmer inte över hela stenen. */}
            <h1 className="text-h1">
              Pizzaugn bäst i test 2026: alla anger 500 grader, ingen håller det
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Köp Ooni Karu 2 för 3 499 kronor. Den har en dörr i
              borosilikatglas, vilket håller kvar värmen som andra ugnar blåser
              ut framtill, och den går på ved, kol eller gasol med en brännare
              som tillbehör. Ska fyra personer äta samtidigt tar du Witt Piccolo
              Rotante 16&quot; för 5 290 kronor, som snurrar stenen åt dig. Och
              läs inte maxtemperaturen: nästan alla anger 500 grader, men
              framtill där pizzan läggs in är stenen ofta 220.
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
        id="spridningen"
        width="default"
        title="500 grader längst bak, 220 längst fram"
        description="Stenen är olika varm i olika ändar, och pizzan läggs in i den kalla."
      >
        <Prose>
          <p>
            <strong>
              Maxtemperaturen är det tal varje tillverkare anger och det som
              säger minst om ugnen.
            </strong>{" "}
            Femton av femton pizzaugnar vi tittat på uppger 500 grader, med
            Ninja Artisan på 370 som enda undantag. Ett tal som nästan alla
            träffar skiljer dem inte åt. Det som skiljer dem åt är hur mycket
            kallare stenen är i ena änden än i den andra.
          </p>
          <p>
            <strong>
              Norska tek.no har mätt stentemperaturen på tre punkter efter
              30 minuters uppvärmning, och skillnaderna är stora.
            </strong>{" "}
            Ooni Koda 12 låg på 480 grader längst bak och 220 längst fram, alltså
            260 graders skillnad på samma sten. Ooni Koda 16 mättes till 500 bak,
            420 i mitten och 310 fram. Gozney Roccbox till 470 mot 270. Den
            jämnaste av de billigare, en gasolugn från Flying Culinary Circus,
            höll sig mellan 405 och 332.
          </p>
          <p>
            <strong>Pizzan läggs in framtill.</strong> Det är där du står med
            spaden, och det är där stenen är kallast. Därför måste du vrida
            pizzan tre eller fyra gånger under de 90 sekunder gräddningen tar,
            och därför får nybörjaren en pizza som är bränd i ena änden och blek
            i den andra. Det handlar inte om degen.
          </p>
          <p>
            <strong>Tillverkaren säljer numera på precis den siffran.</strong>{" "}
            Ooni beskriver sin andra generation med att den nya brännaren sänker
            svängningarna i stentemperatur från 175 grader till 85 på Koda 2, och
            från 180 till 45 på Koda 2 Pro. Ooni anger alltså själva att den
            föregående generationen hade omkring 175 graders spridning, vilket
            ligger nära vad tek.no mätte oberoende av dem.
          </p>
          <p>
            <strong>Tre konstruktioner löser problemet, olika bra.</strong> En
            roterande sten tar bort det helt, eftersom pizzan hela tiden flyttas
            genom den varma zonen: Witt Piccolo Rotante är den enda här med
            rotation. En dörr håller kvar värmen framtill i stället för att
            släppa ut den, vilket är Ooni Karu 2:s lösning och skälet att den
            vinner. Dubbla eller avsmalnande brännare lägger värmen över en
            större del av stenen, vilket är vad Ooni gjort i andra generationen.
          </p>
          <p>
            <strong>
              Ett förbehåll om rotationen som ingen skriver på kartongen:
            </strong>{" "}
            stenen måste snurra även medan ugnen värms upp. Gör den inte det blir
            innerkanten omkring 500 grader och ytterkanten omkring 300, enligt
            tek.no, och då har du köpt bort problemet utan att bli av med det.
          </p>
          <p>
            <strong>Sex av de tolv ugnarna nedan är Ooni.</strong> Det är inte
            ett urval vi gjort utan hyllan vi hittade: Ooni bär ungefär halva
            sortimentet under 9 000 kronor hos de butiker priserna är lästa hos.
            Witt står för två, Gozney för två, och Sage, Ninja och Ariete för var
            sin.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa pizzaugnarna 2026`}
        description="Varje pizzaugn passar en egen uteplats och ett eget sällskap. Klicka på ett namn för den fullständiga recensionen."
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
        title="Recensioner av varje pizzaugn"
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
        id="andra-pizzaugnar"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Sju pizzaugnar som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={PIZZAUGN_CONSIDERED} />
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
          footnote="Jämn värme över stenen väger 30 därför att det är den egenskap som avgör om pizzan lyckas, och den enda där ugnarna verkligen skiljer sig åt. Maxtemperaturen bär däremot ingen vikt alls: femton av femton anger 500 grader, och ett tal som nästan alla träffar rangordnar dem inte. Betyget sätts på konstruktionen som styr spridningen, alltså roterande sten, dörr, brännarens geometri och stenens tjocklek, eftersom den går att läsa för varje ugn. De uppmätta stentemperaturerna står i tabellen för de fyra modeller som provats under exakt det namnet, och lånas aldrig till en systermodell eller till nästa generation. Kategorin har en riktig oberoende provning av över 20 ugnar, men den täcker en minoritet av det som säljs här och Ooni bytte generation efter den, så det finns inget kriterium för testomdöme. Priser, artikelnummer och kundbetyg är lästa på butikens egen produktsida och daterade, och specifikationerna hos tillverkaren."
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
        description="tek.nos handpåläggning av över 20 pizzaugnar, Which? provning av sex mobila ugnar och tillverkarnas egna specifikationer."
      >
        <SourceList sources={sources} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={PIZZAUGN_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
