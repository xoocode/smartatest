import type { Metadata } from "next";

import { testPageTrail, MJOLKSKUMMARE } from "@/lib/test-pages";
import { SOURCES_BY_HREF } from "@/lib/sources";
import {
  PRICE_CHECKED,
  MJOLKSKUMMARE_FAQ,
  MJOLKSKUMMARE_CONSIDERED,
  MJOLKSKUMMARE_PRODUCTS,
} from "@/lib/data/mjolkskummare";
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

import Kopguide from "@/content/mjolkskummare/kopguide.mdx";

/*
 * Första sidan i gruppen Kök, byggd 2026-08-05.
 *
 * ⚠️ Sidan rankar bara elektriska kannor med värmeelement. Manuella
 * pumpskummare och handhållna batterivispar förklaras i köpguiden och får egna
 * systersidor, efter användarbeslut.
 *
 * ⚠️ INGET TESTOMDÖMEKRITERIUM. Råd & Rön har provat 18 elektriska
 * mjölkskummare med riktig labbmetod, men testet kostar 59 kr och köptes inte.
 * Vi vet därför inte vilken modell som vann och påstår det aldrig. Metoden,
 * betygsspannet och temperaturbandet 63–67 °C är fritt läsbara och bär
 * köpguiden. Samma hållning som /powerbank mot Stiftung Warentest.
 *
 * ⚠️ En produkt, Sage the Milk Café, saknar betyg på `skumkapacitet` med flit,
 * eftersom den anger sin kapacitet i koppar och inte i milliliter.
 * `weightedRating` fördelar om vikten. Att dra ner betyget för en tom cell vore
 * att betygsätta produktbladet, vilket regeln från 2026-08-05 förbjuder. Se
 * `pnpm check:redovisning`.
 *
 * ⚠️ Gap-passet 2026-08-06 fyllde Melittas och Alessis skumtal, som stod som
 * opublicerade och låg i butikens egen produkttext, och rättade fyra felaktiga
 * påståenden om RIG-TIG, CHiATO och Sage. Se `lib/corrections.ts`.
 *
 * Priser, artikelnummer, GTIN och kundbetyg är lästa hos butiken på
 * PRICE_CHECKED. Kapacitetstalen är lästa hos tillverkaren.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 * Se lib/links.ts.
 */

const TEST_PAGE = MJOLKSKUMMARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Mjölkskummare bäst i test 2026: tio elektriska skummare jämförda från 392 kr. En cappuccino tar 60 ml skum. Se vilka som räcker till fyra.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "kapaciteten", label: "Talet på kartongen är inte skummet" },
  { id: "jamforelse", label: "Jämför alla tio" },
  { id: "recensioner", label: "Recensioner av varje mjölkskummare" },
  { id: "andra-mjolkskummare", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function MjolkskummarePage() {
  const style = await getStyle();
  const products = MJOLKSKUMMARE_PRODUCTS;
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
            {/* H1 bär avgränsningen: elektriska kannor som både värmer och
                skummar. Manuella pumpskummare och handvispar är andra köp. */}
            <h1 className="text-h1">
              Mjölkskummare bäst i test 2026: så mycket skum får du faktiskt
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vi rekommenderar Wilfa Silky MF1B-250 för 699 kronor, eftersom den
              skummar 150 till 250 milliliter i en körning, så två till fyra
              koppar blir klara samtidigt. Fem program med egen temperatur för varje: 65 grader
              till cappuccino, 60 till latte art. Den är också den enda här med
              ett eget läge för havredryck.
              Ska du servera fler samtidigt gör Severin Spuma 700 350 ml för
              1 290 kronor. Räkna med 60 ml skum per cappuccino, och läs
              skumtalet i stället för talet i modellnamnet.
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
        id="kapaciteten"
        width="default"
        title="En Spuma 500 ger fyra koppar skum, inte åtta"
        description="Talet i modellnamnet är hur mycket mjölk apparaten värmer. Skummar gör den ungefär hälften."
      >
        <Prose>
          <p>
            <strong>En mjölkskummare har två maxnivåer.</strong> Den ena är hur
            mycket mjölk den kan värma utan att skumma. Den andra är hur mycket
            den kan skumma, och den ligger lägre, eftersom skummet expanderar i
            kannan och annars rinner över. Talet som står i modellnamnet och i
            butikens produktnamn är genomgående det första.
          </p>
          <p>
            <strong>
              Severin publicerar båda talen för varje modell, och mönstret är
              detsamma genom hela sortimentet.
            </strong>{" "}
            SM 3584 skummar 100 ml av 200. Modell 300 skummar 150 av 300. Spuma
            Light 400 skummar 220 av 400. Spuma 500 skummar 120 till 260 av 500,
            och Spuma 700 skummar 120 till 350 av 700. Skummängden är ungefär
            hälften av det tal apparaten är uppkallad efter, varje gång.
          </p>
          <p>
            <strong>Men kvoten går inte att räkna med på andra märken.</strong>{" "}
            Wilfa Silky MF1B-250 anger 150 till 250 ml, och där är det tvärtom
            skummängden som står i namnet. Philips Milk Twister har en kanna på
            120 ml och kan alltså inte värma mer mjölk än den skummar. Alessi
            Plissé skummar 200 av 350 ml, alltså 57 procent, och Melitta Cremio
            150 av 250, alltså 60. Kvoten ligger någonstans mellan hälften och
            två tredjedelar, och exakt var avgör hur många koppar du får.
          </p>
          <p>
            <strong>
              Samma butik kan dessutom mena olika saker med samma fält.
            </strong>{" "}
            Coffee Friends kapacitetsruta anger 240 ml för Bialetti MK01, som
            skummar 115 ml, och 150 ml för systermodellen MKF02, som värmer 300.
            Läser du bara rutan ser MK01 ut att vara dubbelt så stor som MKF02,
            när den i själva verket gör 35 ml mindre skum. Leta efter ordet skum
            bredvid talet innan du jämför två apparater.
          </p>
          <p>
            <strong>Räkna 60 ml skum per cappuccino.</strong> Måttstocken kommer
            från Philips, som räknar om sitt eget tal till koppar: 120 ml räcker
            till två. Med den i handen blir resten läsbar. 90 ml är en och en
            halv kopp, 150 ml är två eller tre, 200 ml är tre, och 350 ml är
            ungefär sex.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa mjölkskummarna 2026`}
        description="Varje mjölkskummare passar ett eget frukostbord. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tio"
        description="Samma kriterier och samma viktning för alla tio."
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
        title="Recensioner av varje mjölkskummare"
        description="Alla tio bedöms mot samma fyra kriterier."
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
        id="andra-mjolkskummare"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Sju mjölkskummare som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={MJOLKSKUMMARE_CONSIDERED} />
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
          footnote="Skumkapaciteten väger 35 därför att det är den fråga läsaren kommer med, och den enda där talen skiljer sig så mycket att valet avgörs av dem: från 90 till 350 ml. En produkt som inte går att placera på skalan lämnas obetygsatt på kriteriet i stället för att få lägsta steget, och vikten fördelas då om över de andra tre. Ett betyg som straffar en tom cell mäter tillverkarens produktblad i stället för apparaten, och kvoten mellan skum och uppvärmning gäller ett fabrikat i taget och lånas därför aldrig ut. Kategorin har en riktig svensk labbprovning av 18 modeller, men resultaten per modell ligger bakom en betalvägg vi inte betalat, och därför finns inget kriterium för testomdöme och ingen uppgift här om vilken modell som vann den. Priser, artikelnummer och kundbetyg är lästa på butikens egen produktsida och daterade. Länkarna är spridda över tre butiker."
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
        description="Råd & Röns labbprovning av 18 mjölkskummare, tillverkarnas egna kapacitetsuppgifter och butikernas produktdata."
      >
        <SourceList sources={sources} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={MJOLKSKUMMARE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
