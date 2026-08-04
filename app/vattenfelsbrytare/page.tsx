import type { Metadata } from "next";

import { testPageTrail, VATTENFELSBRYTARE } from "@/lib/test-pages";
import { VATTENFELSBRYTARE_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  VATTENFELSBRYTARE_CONSIDERED,
  VATTENFELSBRYTARE_FAQ,
  VATTENFELSBRYTARE_FILTERS,
  VATTENFELSBRYTARE_PRODUCTS,
} from "@/lib/data/vattenfelsbrytare";
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

import Kopguide from "@/content/vattenfelsbrytare/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, certifikatnummer, RSK-nummer, EAN, anslutningar och
 * tryck- och temperaturgränser är riktiga och lästa på PRICE_CHECKED.
 * Kriteriebetygen är redaktionell bedömning utifrån de uppgifterna, inte
 * mätningar. Vi har inte installerat eller läckagetestat en enda produkt.
 *
 * De tre typgodkännandena är lästa i original som PDF hos RISE via
 * tillverkarnas dokumentbibliotek, inte i en butikstext. Det är det som gör
 * kriterium 1 möjligt att sätta.
 *
 * Lagerstatus anges inte, samma beslut som på /vattenlarm. Två produkter
 * ligger däremot bland de övervägda för att tillverkaren själv skriver att de
 * inte längre är tillgängliga, vilket är något annat än att en butik är slut.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Se lib/links.ts.
 */

const TEST_PAGE = VATTENFELSBRYTARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Tre av fem tillverkare publicerar ett typgodkännande du kan ladda ner och läsa. Vi jämförde fem vattenfelsbrytare och läckagebrytare från 819 till 8 495 kronor mot certifikaten, och siffran alla upprepar är fyra år gammal.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "certifikaten", label: "Certifikaten, och vad de säger" },
  { id: "jamforelse", label: "Jämför alla fem" },
  { id: "recensioner", label: "Recensioner av varje produkt" },
  { id: "andra-brytare", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function VattenfelsbrytarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = VATTENFELSBRYTARE_PRODUCTS;
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
              Åtta vattenfelsbrytare provades av RISE 2022 och ingen klarade sig
              i första omgången. Två godkändes efter omarbetning, och den
              siffran upprepas fortfarande som om den beskrev nuläget. Den gör
              inte det: tre av produkterna här har ett certifikatnummer som
              tillverkaren publicerar, det färskaste från april 2026, och sedan
              1 januari 2026 kräver branschreglerna ett typgodkänt aktivt skydd
              i kök.
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

      {/* ---------------------------------------------------- certifikat -- */}
      {/* Ligger högt med flit och av samma skäl som larmvägarna på
          /vattenlarm: det är den enda uppgiften som avgör köpet, den går att
          kontrollera på två minuter, och den får inte ligga nedanför en tabell
          där den syns som en rad bland femton. */}
      <Section
        id="certifikaten"
        width="default"
        title="Certifikaten, och vad de säger"
        description="Kategorins enda publicerade måttstock. Tre av fem tillverkare lägger dokumentet fritt nedladdningsbart på sin egen webbplats."
      >
        <Prose>
          <p>
            Ett typgodkännande har ett nummer, en utgåva, ett datum och en
            innehavare. Ordet godkänd i en produktrubrik har inget av det.
          </p>
          <p>
            <strong>LK CubicSecure: C900737, utfärdat 13 juni 2024.</strong> Det
            färskaste av de centrala, och certifikatet beskriver produkten som
            utrustad med flödesmätare och tryckmätare, med en integrerad
            kulventil som stänger vid avvikande flöde.
          </p>
          <p>
            <strong>Vatette Vattenfelsbrytare: SC0056-15, utgåva 4 från 31
            januari 2022.</strong> Den ena av de två som klarade RISE-provningen,
            och certifikatet anger två saker som ingen butikstext nämner:
            utgående klämringskoppling för kopparrör, och maximalt 60 grader.
          </p>
          <p>
            <strong>Vatette Läckagebrytare: C901455, utfärdat 17 april
            2026.</strong> Fyra månader gammalt. I februari 2025 skrev VVS-Forum
            att typgodkända läckagebrytare med sensorer skulle dyka upp under
            året, och det här är produkten. Certifikatet namnger fyra artiklar
            med RSK-nummer, så du kan kontrollera exakt vilken variant som
            omfattas.
          </p>
          <p>
            Alla tre är typgodkännanden med beslut om tillverkningskontroll,
            alltså där tillverkarens egenkontroll löpande övervakas av ett
            oberoende organ. För de två övriga produkterna finns inget nummer
            att läsa. Det betyder att uppgiften saknas, inte att produkterna har
            provats och underkänts, och den skillnaden är avgörande.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      {/* Parked. Hidden unless the admin toggle is on; kept in the template so
          new test pages still get the section. See lib/theme.ts. */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa vattenfelsbrytarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla fem"
        description="Filtrera på vad produkten skyddar. Raden att läsa noggrannast är Typgodkännande, eftersom den avgör om installationen går att belägga. Inget nummer publicerat betyder precis det, aldrig att produkten har provats och underkänts."
      >
        <FilterableComparison
          products={products}
          filters={VATTENFELSBRYTARE_FILTERS}
          legend="Filtrera på skydd och installation"
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED)}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje produkt"
        description="Alla fem bedöms mot samma fem kriterier. Två produkttyper jämförs i samma lista, eftersom certifieringsregeln CR 139 och kravet på aktivt skydd i kök omfattar båda."
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
        id="andra-brytare"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex produkter som fanns i urvalet men inte i rankningen. Två är avvecklade enligt tillverkaren själv, en av dem är den ena av de två som klarade provningen 2022."
      >
        <ConsideredList items={VATTENFELSBRYTARE_CONSIDERED} />
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
        description="Viktningen nedan är den som räknar fram betygen i tabellen. Den sattes innan en enda produkt prissattes."
      >
        <MethodologyBlock
          criteria={TEST_PAGE.criteria}
          intro={TEST_PAGE.methodology}
          variant="cards"
          footnote="Vi har inte installerat, provat eller läckagetestat någon av produkterna, och det är en kategori där ingen konsumentsida har gjort det heller: en vattenfelsbrytare kräver rörmokare och ett ingrepp på inkommande ledning. Det som finns är i stället en riktig laboratorieprovning, RISE mot SP-Metod 5314 på uppdrag av Länsförsäkringars Forskningsfond, och de typgodkännanden som följt av den. De tre certifikaten är hämtade och lästa i original hos tillverkarna, inte återgivna ur en butikstext, och citaten på sidan kommer ur dokumenten själva. Betyget för dokumenterat typgodkännande mäter därför vad som går att kontrollera före köp: 5,0 med publicerat certifikatnummer, 3,0 när tillverkaren hävdar att sortimentet uppfyller reglerna utan nummer för produkten, 1,5 när ingen uppgift finns. Ett lågt betyg betyder aldrig att en produkt underkänts, eftersom RISE register inte går att söka utifrån och ett register vi inte kan läsa inte är ett bevis på frånvaro. Priserna är hos den butik vi länkar till, och eftersom ingen butik för hela sortimentet står källan utskriven per produkt."
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
        description="Tyngdpunkten ligger på tre typgodkännanden från RISE, lästa i original, och på branschreglerna i deras officiella ändringsdokument med paragrafnummer. Det är kategorins enda underlag som inte kommer från någon som säljer produkten."
      >
        <SourceList sources={VATTENFELSBRYTARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={VATTENFELSBRYTARE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
