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

import Kopguide from "@/content/vattenfelsbrytare/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, certifikatnummer, RSK-nummer, EAN, anslutningar och
 * tryck- och temperaturgränser är riktiga och lästa på PRICE_CHECKED.
 * Kriteriebetygen är redaktionell bedömning utifrån de uppgifterna, inte
 * mätningar. Vi har inte installerat eller läckagetestat en enda produkt.
 *
 * De tre typgodkännandena är lästa i original som PDF hos RISE via
 * tillverkarnas dokumentbibliotek, inte i en butikstext.
 *
 * ⚠️ 2026-08-06: kriterium 1 är omgjort. RISE öppna certifikatregister ligger
 * på `cert.ri.se` och är fullt sökbart — den gamla noten om att registret inte
 * gick att läsa gällde fel värd. Godkännandet går därför att fastställa åt båda
 * hållen, och skalan mäter numera vad produkten genomgått i stället för vad
 * tillverkaren publicerat. Se lib/corrections.ts.
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
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Vattenfelsbrytare bäst i test 2026: fem läckagebrytare jämförda från 819 kr. Sedan januari krävs typgodkännande enligt CR 139. Se vilka som har det.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
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
              Vi rekommenderar LK CubicSecure för 5 373 kronor, eftersom den
              stänger ventilen en gång per dygn och mäter trycket, och därmed
              hittar droppläckaget bakom väggen där ingen sensor ligger. Den
              stänger av vattnet till hela huset
              och är typgodkänd enligt CR 139, så att installationen kan intygas
              och försäkringsrabatten gäller. Ska
              du bara klara det nya kökskravet snäpps Vatette Läckagebrytare fast
              för hand på en ventil du redan har och kostar 3 465. Sex produkter
              är godkända i dag, inte två.
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

      {/* ---------------------------------------------------- certifikat -- */}
      {/* Ligger högt med flit och av samma skäl som larmvägarna på
          /vattenlarm: det är den enda uppgiften som avgör köpet, den går att
          kontrollera på två minuter, och den får inte ligga nedanför en tabell
          där den syns som en rad bland femton. */}
      <Section
        id="certifikaten"
        width="default"
        title="Sex produkter är godkända, och du kan slå upp dem själv på en minut"
        description="Registret som avgör vilken brytare som duger till ett installationsintyg är öppet. Tre av produkterna här står i det, två gör det inte."
      >
        <Prose>
          <p>
            <strong>
              RISE certifikatregister ligger på cert.ri.se och är fritt att söka
              i.
            </strong>{" "}
            Skriv in produktnamnet eller certifikatnumret så får du fram vad
            godkännandet omfattar och vilket datum det går ut. Det är den enda
            kontroll som betyder något, eftersom ordet godkänd används om allt
            möjligt i en produktrubrik.
          </p>
          <p>
            <strong>Tre av produkterna här är typgodkända enligt CR 139.</strong>{" "}
            LK CubicSecure har C900737 som gäller till februari 2028, Vatette
            Läckagebrytare har C901455 till april 2031, och Vatette
            Vattenfelsbrytare har SC0056-15 till januari 2027. Alla tre är
            godkännanden med beslut om tillverkningskontroll, alltså där
            tillverkarens egenkontroll löpande övervakas av ett oberoende organ.
          </p>
          <p>
            <strong>Det sista datumet är värt att stanna vid.</strong> Vatettes
            centrala brytare har ett halvår kvar på sitt godkännande. Ett
            typgodkännande förnyas normalt, och produkten är godkänd i dag, men
            ska en installatör skriva ett intyg är det värt en kontroll först.
          </p>
          <p>
            <strong>Tollco WaterFuse PlugIn och Aqara Valve Controller T1 står
            inte i registret.</strong> Tollco har tre godkännanden där, för två
            uppsamlingstråg och ett vattenlarm, och skriver själva att det är
            deras vattenlarm som är godkända enligt CR 139. Produkterna fungerar,
            men installationen går inte att intyga mot branschreglerna och
            försäkringsrabatten uteblir.
          </p>
          <p>
            Utanför den här jämförelsen finns tre godkända till: SenseGuard
            Vattenfelsbrytare, som säljs som Grohe Sense Guard och är utgången,
            samt läckagebrytarna Waterguard+ från Fell Technology och Aqualarm
            PowerStop. Ingen av dem säljs av en svensk butik som publicerar ett
            pris, vilket är vårt villkor för att ranka något.
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
        description="Filtrera på vad produkten skyddar. Raden att läsa noggrannast är Typgodkännande, eftersom den avgör om installationen går att intyga och om försäkringsrabatten gäller, och den är kontrollerad produkt för produkt mot RISE öppna register. Raden därunder, Vid strömavbrott, står i tillverkarnas manualer och i ingen butikstext vi hittat."
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
        description="Åtta produkter som fanns i urvalet men inte i rankningen. Två är avvecklade enligt tillverkaren själv, och tre är typgodkända men säljs inte av någon svensk butik som publicerar ett pris."
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
          footnote={`Vi har inte installerat, provat eller läckagetestat någon av produkterna, och det är en kategori där ingen konsumentsida har gjort det heller: en vattenfelsbrytare kräver rörmokare och ett ingrepp på inkommande ledning. Det som finns är i stället en riktig laboratorieprovning, RISE mot SP-Metod 5314 på uppdrag av Länsförsäkringars Forskningsfond, och de typgodkännanden som följt av den.

Vilka produkter som är godkända, och hur länge, är kontrollerat i RISE öppna certifikatregister på cert.ri.se. Certifikaten är dessutom hämtade och lästa i original hos tillverkarna, inte återgivna ur en butikstext, och citaten på sidan kommer ur dokumenten själva. Skalan ger 5,0 för ett giltigt typgodkännande enligt CR 139, 2,5 för provning av ett annat oberoende organ och 1,0 när ingen oberoende provning för svensk marknad finns. Se rättelsen.

Tekniska uppgifter som ventilens läge vid strömavbrott, vattentemperatur, byggmått och inlärningstid är hämtade ur tillverkarnas egna manualer och tekniska dokument, eftersom butikerna inte anger dem. Priserna är hos den butik vi länkar till, och eftersom ingen butik för hela sortimentet står källan utskriven per produkt.`}
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
