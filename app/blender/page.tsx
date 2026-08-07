import type { Metadata } from "next";

import { testPageTrail, BLENDER } from "@/lib/test-pages";
import { SOURCES_BY_HREF } from "@/lib/sources";
import {
  PRICE_CHECKED,
  BLENDER_FAQ,
  BLENDER_CONSIDERED,
  BLENDER_PRODUCTS,
} from "@/lib/data/blender";
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

import Kopguide from "@/content/blender/kopguide.mdx";

/*
 * Tredje sidan i gruppen Kök, byggd 2026-08-06.
 *
 * ⚠️ Sidan rankar kannblendrar mellan 1 199 och 2 990 kronor. Stavmixrar och
 * matberedare har egna sidor, och personliga smoothiemixers på 300 watt ligger
 * bland de övervägda.
 *
 * ⚠️ SIDANS KÄLLÄGE ÄR SAJTENS BÄSTA HITTILLS. Testfakta lät Applitest GmbH i
 * Nürnberg labbtesta nio av de tretton, och hela resultattabellen med delbetyg
 * per moment ligger fritt läsbar. Inget av det ligger bakom betalvägg, till
 * skillnad från Råd & Rön, Stiftung Warentest och Which?.
 *
 * ⚠️ INGET TESTOMDÖMEKRITERIUM ändå. Fyra av tretton ingick inte i provningen,
 * och ett viktat totalbetyg hade låtit provningsurvalet avgöra ordningen.
 * Delmomenten bär i stället kriteriet `mixningsresultat`, eftersom de mäter vad
 * som kommer ur kannan. Samma beslut som /pizzaugn.
 *
 * ⚠️ MOTOREFFEKTEN BÄR INGEN VIKT, och det är sidans hela fynd. Sorterad efter
 * watt tar smoothien 45 och 55 sekunder för de två maskinerna på 1 200 W, och
 * 90 och 147 för de två på 1 800 W. Nöthacket lutar likadant. Talet står i
 * tabellen därför att läsaren letar efter det. Samma konstruktion som
 * `Angiven maxtemperatur` på /pizzaugn.
 *
 * ⚠️ ALLA TRETTON HAR BETYG PÅ ALLA FEM KRITERIER, efter användarbeslut.
 * Alternativet var streck på labbraderna, vilket hade utlöst omfördelningsfelet
 * i lib/products.ts rad 241. De fyra otestade har mixningsbetyg satta på
 * konstruktionen, och det står i metodrutan.
 *
 * ⚠️ TRE PRODUKTER SAKNAR PUBLICERAD LJUDNIVÅ och ligger på 3,0, alltså mitt i
 * fältet, med tom tabellcell. Avsiktligt neutralt. Att härleda ett dB-tal ur
 * effekten hade pekat åt fel håll — se blockkommentaren i lib/data/blender.ts.
 *
 * ⚠️ ORDNINGEN SKILJER SIG FRÅN TESTFAKTAS, och det är viktningen. Bosch går
 * från delad trea till tvåa på kannan och tio års motorgaranti; Braun från tvåa
 * till femma på 94 dB och en kanna som inte får diskas i maskin.
 *
 * Priser, artikelnummer, GTIN och kundbetyg är lästa i produktsidans egen
 * JSON-LD hos butiken på PRICE_CHECKED. Specifikationerna är lästa hos
 * tillverkaren.
 *
 * AFFILIATE-SWAP — se lib/links.ts för vad LINK_MODE står på i dag.
 */

const TEST_PAGE = BLENDER;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Ninja Detect Power Mixer Pro vinner för 2 279 kronor: den hackar nötter jämnare än någon annan och gör smoothien på 55 sekunder. Vill du lägga mindre kostar Wilfa Xplode 1500 1 222 kronor med glaskanna. Och strunta i watt-talet: de två svagaste motorerna i testet gjorde de två snabbaste smoothiesarna.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "watt-fyndet", label: "Fler watt gav långsammare smoothie" },
  { id: "jamforelse", label: "Jämför alla tretton" },
  { id: "recensioner", label: "Recensioner av varje blender" },
  { id: "andra-blendrar", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function BlenderPage() {
  const style = await getStyle();
  const products = BLENDER_PRODUCTS;
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
            {/* H1 bär fyndet: talet handeln säljer på pekar åt fel håll. */}
            <h1 className="text-h1">
              Blender bäst i test 2026: fler watt gav långsammare smoothie
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vi rekommenderar Ninja Detect Power Mixer Pro för 2 279 kronor,
              eftersom den hackar nötter jämnare än någon annan blender här, och
              det är momentet de flesta misslyckas med. Smoothien tar 55 sekunder och kannan går i
              diskmaskinen. Ska det kosta mindre tar
              du Wilfa Xplode 1500 för 1 222 kronor, som är billigaste vägen
              till en glaskanna. Och läs inte watt-talet: de två svagaste
              motorerna i laboratorietestet gjorde de två snabbaste
              smoothiesarna.
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
        id="watt-fyndet"
        width="default"
        title="Fler watt gav långsammare smoothie"
        description="Talet som står störst på kartongen pekar åt fel håll."
      >
        <Prose>
          <p>
            <strong>
              Motoreffekten är det första handeln skriver ut och det som säger
              minst om vad du får.
            </strong>{" "}
            Tre av fyra svenska jämförelsesajter rankar efter den. Nio av
            blendrarna nedan har körts genom samma smoothie på fryst frukt i ett
            laboratorium, med tidtagning och silning genom en sil på 4 mm, och
            resultatet går åt motsatt håll mot vad talet lovar.
          </p>
          <p>
            <strong>
              De två svagaste motorerna gjorde de två snabbaste smoothiesarna.
            </strong>{" "}
            KitchenAid Artisan K400 drar 1 200 watt och var klar på 45 sekunder.
            Ninja Detect Power Mixer Pro drar också 1 200 och tog 55. De två
            maskinerna på 1 800 watt, Bosch Serie 6 VitaPower och Wilfa
            Powerfuel 1800, behövde 90 respektive 147 sekunder. Wilfa är alltså
            mer än tre gånger långsammare än KitchenAid med femtio procent mer
            effekt.
          </p>
          <p>
            <strong>Nöthacket lutar åt samma håll.</strong> Ninja fick 9,5 av 10
            och KitchenAid 7,9, alltså de två svagaste motorerna. Bosch fick 4,8
            och Wilfa 4,0, alltså de två starkaste. Fyra av de nio maskinerna
            lämnade ett ojämnt nöthack, och tre av dem ligger i den övre halvan
            av effektskalan.
          </p>
          <p>
            <strong>Förklaringen är att båda talen mäter annat än motorn.</strong>{" "}
            Tiden bestäms av hur långt smoothieprogrammet är skrivet. Wilfas
            program tar 2 minuter och 27 sekunder därför att någon har bestämt
            att det ska göra det, och resultatet blir mycket riktigt slätt, 9,3
            av 10 på jämnhet. Nöthacket bestäms av hur knivarna sitter. Ninja har
            sex blad staplade på olika höjd, så nötterna träffas på flera nivåer
            i stället för att virvla runt ovanför en enda kniv.
          </p>
          <p>
            <strong>
              Watt-talet är alltså inte fel, det är bara ett svar på en annan
              fråga.
            </strong>{" "}
            Det säger hur mycket ström maskinen får dra ur väggen, inte hur snabbt
            eller hur jämnt den mixar. Allt från 800 watt och uppåt räcker till
            en smoothie.
          </p>
          <p>
            <strong>Det som däremot skiljer maskinerna åt varje dag</strong> är
            hur mycket kannan väger, om den får gå i diskmaskinen och hur högt
            maskinen låter. Kannan med lock väger 754 gram på den lättaste och
            2 080 på den tyngsta. Två av de nio kannorna måste handdiskas.
            Ljudnivån går från 83 till 94 decibel, och eftersom skalan är
            logaritmisk är det skillnaden mellan en maskin du kan köra på
            morgonen och en du startar innan du lämnar rummet.
          </p>
          <p>
            <strong>Ett tal till är värt att veta att det är två.</strong>{" "}
            Kannans volym anges nästan alltid som bräddvolym i handeln, alltså
            hur mycket som får plats till kanten. Bosch skriver själva ut båda:
            3,0 liter max och 2,0 liter vid användning. Philips anger en
            tvålitersglaskanna med 1,8 liters effektiv kapacitet, och Ninja 2,1
            liter tillbringare mot 1,9 för flytande ämnen. Tabellen nedan bär
            arbetsvolymen för alla tretton.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa blendrarna 2026`}
        description="Varje blender passar ett eget kök och ett eget hushåll. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tretton"
        description="Samma fem kriterier och samma viktning för alla tretton."
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
        title="Recensioner av varje blender"
        description="Alla tretton bedöms mot samma fem kriterier."
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
        id="andra-blendrar"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Sex blendrar som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={BLENDER_CONSIDERED} />
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
          footnote="Mixningsresultat väger 30 därför att det är hela anledningen att äga en blender, och kannan 25 därför att den är den del du lyfter, fyller och diskar varje gång. Motoreffekten bär däremot ingen vikt alls: de två maskinerna på 1 200 watt gjorde sina smoothies på 45 och 55 sekunder, de två på 1 800 watt på 90 och 147, och nöthacket lutade åt samma håll. Talet står i tabellen därför att läsaren letar efter det. Nio av de tretton ingår i en oberoende laboratorieprovning, och de uppmätta talen för ljudnivå och beredningstid knyts bara till de maskiner som faktiskt provats. De lånas aldrig till en systermodell och härleds aldrig ur effekten. De fyra som inte ingick betygsätts på konstruktionen och tillverkarens egna uppgifter, och tre av dem publicerar ingen ljudnivå alls och ligger därför mitt i fältet på det kriteriet. Kannans volym anges som arbetsvolym för alla tretton, aldrig som bräddvolym. Priser, artikelnummer och kundbetyg är lästa på butikens egen produktsida och daterade, och specifikationerna hos tillverkaren."
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
        description="Applitests laboratorietest av nio blendrar åt Testfakta, tek.nos handpåläggningar och tillverkarnas egna specifikationer."
      >
        <SourceList sources={sources} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={BLENDER_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
