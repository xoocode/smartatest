import type { Metadata } from "next";

import { testPageTrail, AIRFRYER } from "@/lib/test-pages";
import { SOURCES_BY_HREF } from "@/lib/sources";
import {
  PRICE_CHECKED,
  AIRFRYER_FAQ,
  AIRFRYER_CONSIDERED,
  AIRFRYER_PRODUCTS,
} from "@/lib/data/airfryer";
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

import Kopguide from "@/content/airfryer/kopguide.mdx";

/*
 * Tredje sidan i gruppen Kök, byggd 2026-08-06.
 *
 * ⚠️ Sidan rankar korgfritöser mellan 859 och 2 162 kronor. Ugnstyper,
 * multikokare och grillhybrider ligger bland de övervägda, efter
 * användarbeslut.
 *
 * ⚠️ EFFEKTEN RÄKNAS PER KAMMARE, efter användarbeslut, och det är sidans hela
 * ärende. RTINGS har mätt Ninja Foodi DZ201 till 1 540 W med båda lådorna igång
 * och 1 470 W med bara en — den andra lådan lägger till sjuttio watt. Ninjas
 * egna bruksanvisningar anger 2 470 W för både AF300EU på 7,6 liter och AF400EU
 * på 9,5, alltså totalt för två zoner.
 *
 * ⚠️ INGET TESTOMDÖMEKRITERIUM. Kategorin har två stora labbprovningar — Råd &
 * Rön 70 luftfritöser, Stiftung Warentest 20 — men båda ligger bakom betalvägg
 * och Råd & Rön förbjuder vidarepublicering av testresultat. RTINGS 52 är fria
 * men gäller 120-voltsmodeller. Samma beslut som /pizzaugn och /skaftdammsugare.
 *
 * ⚠️ `jamn-tillagning` betygsätter KONSTRUKTIONEN och inte ett mätvärde: antal
 * kammare, bottenyta per kammare och om två zoner går att slå ihop. Skälet är
 * att ingen har mätt just de här tio under det namn de säljs under här.
 *
 * ⚠️ MAXTEMPERATUREN ÄR EN AXEL HÄR, till skillnad från på /pizzaugn. Fältet
 * delar sig rakt itu: Ninja, Cosori och AIVIQ når 240 °C, medan Philips hela
 * sortiment, Bosch och OBH Nordica stannar på 200. RTINGS friterar vid 204.
 *
 * ⚠️ VINNAREN LÄNKAR TILL EN BUTIK VI INTE TJÄNAR PÅ. AIVIQ är enda programmet
 * med både provision och sortiment, och hamnar sexa därför att betygen säger
 * det. Se .agent/research/airfryer.md §3.
 *
 * Priser, artikelnummer, GTIN och lagerstatus är lästa i produktsidans egen
 * JSON-LD hos butiken på PRICE_CHECKED. Specifikationerna är lästa hos
 * tillverkaren.
 *
 * AFFILIATE-SWAP — se lib/links.ts för vad LINK_MODE står på i dag.
 */

const TEST_PAGE = AIRFRYER;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Ninja Foodi FlexDrawer AF500EU vinner för 1 890 kronor: delaren lyfts ur och alla 2 470 watt går till en kammare på 10,4 liter. Lagar du åt en eller två räcker Philips 2000 Series för 859 kronor. En dubbelkorg delar sin effekt, och den andra lådan lägger till sjuttio watt, inte fjortonhundra.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "tva-lador", label: "Andra lådan ger sjuttio watt" },
  { id: "jamforelse", label: "Jämför alla tio" },
  { id: "recensioner", label: "Recensioner av varje airfryer" },
  { id: "andra-airfryers", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function AirfryerPage() {
  const style = await getStyle();
  const products = AIRFRYER_PRODUCTS;
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
            {/* H1 bär fyndet: dubbelkorgen delar sin effekt. */}
            <h1 className="text-h1">
              Airfryer bäst i test 2026: två lådor halverar maskinen
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Köp Ninja Foodi FlexDrawer AF500EU för 1 890 kronor. Delaren lyfts
              ur, och då går alla 2 470 watt till en enda kammare på 10,4 liter i
              stället för 1 235 watt till varje låda. Lagar du åt en eller två
              räcker Philips 2000 Series NA221/00 på 859 kronor, som lägger
              1 500 watt på en korg. Och läs inte literantalet som portioner:
              maten ska ligga i ett lager på botten, vilket tillverkarna skriver
              i sina egna manualer.
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
        id="tva-lador"
        width="default"
        title="Den andra lådan ger dig sjuttio watt"
        description="Effekttalet gäller hela maskinen, inte varje låda för sig."
      >
        <Prose>
          <p>
            <strong>
              En dubbelkorg har ett effekttal, och det är apparatens och inte
              lådans.
            </strong>{" "}
            Ninjas egen bruksanvisning anger 2 470 watt för AF300EU, som tar
            7,6 liter. Samma manualserie anger 2 470 watt för AF400EU, som tar
            9,5. Talet ändras alltså inte när kammaren växer, och det delas
            mellan zonerna. Kör du båda lådorna får varje låda omkring
            1 235 watt.
          </p>
          <p>
            <strong>RTINGS har mätt exakt hur lite den andra lådan kostar.</strong>{" "}
            I sin provning av Ninja Foodi DZ201 anger de maximal effekt till
            1 540 watt med båda lådorna igång, och noterar att talet sjunker till
            1 470 watt när bara en används. Den andra lådan lägger alltså till
            sjuttio watt. Den som lagar två rätter samtidigt kör i praktiken två
            halvstarka fritöser, inte två fritöser.
          </p>
          <p>
            <strong>1 400 watt är gränsen där det börjar märkas.</strong> RTINGS
            kom fram till den genom att sabotera en maskin som fungerade: de
            skruvade ned effekten på en toppmodell från 1 600 till 900 watt med
            en variabel transformator. Tillagningen tog tio minuter längre, över
            50 procent mer tid, och maten blev till övervägande del rå. Kammaren
            hann aldrig tillbaka upp till måltemperatur efter att de frysta
            pommesen lagts i, så de ångkoktes i stället för att bli krispiga.
          </p>
          <p>
            <strong>Råd & Rön ser samma sak från andra hållet.</strong> I sitt
            test av 70 luftfritöser körde de kyckling i den ena korgen och
            pommes i den andra på dubbelkorgsmodellerna, och skriver att det i
            flera fall var tydligt svårare att få pommesen bra i det läget.
            Stiftung Warentest, som provat 20 modeller varav fem med två fack,
            konstaterar att flera maskiner inte klarar stora portioner.
          </p>
          <p>
            <strong>Lösningen finns och den är en löstagbar delare.</strong> Två
            maskiner här kan lyfta ur väggen mellan lådorna och köra hela
            kammaren som en zon: Ninja AF500EU, som kallar det MegaZone, och
            Cosori Dual Blaze Twinfry. I det läget hamnar 2 470 respektive
            2 800 watt på en enda yta. Behöver du ändå två temperaturer sätter du
            tillbaka delaren och har en vanlig dubbelkorg. Det är därför de två
            ligger etta och tvåa.
          </p>
          <p>
            <strong>Litertalet är kammarens volym, inte portionen.</strong>{" "}
            Tillverkarna skriver det själva. Ninjas svenska bruksanvisning: se
            till att ingredienserna placeras i ett jämnt lager på botten av lådan
            och att de inte ligger på varandra. Råd & Rön mätte skillnaden. Den
            minsta modellen i deras test rymde 433 gram pommes, men klarade bara
            289 gram om de skulle bli så bra som möjligt. Det tal som säger mest
            är alltså korgens bottenyta, där RTINGS rekommenderar minst
            325 kvadratcentimeter.
          </p>
          <p>
            <strong>Nästan ingen publicerar bottenytan.</strong> Av tio
            tillverkare i svensk handel anger AIVIQ som enda företag korgens
            mått: 22,4 gånger 15,9 centimeter per låda, alltså
            355 kvadratcentimeter. Alla andra listar liter, och det gör även de
            fem svenska jämförelsesidor vi läste inför den här.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa airfryers 2026`}
        description="Varje maskin passar ett eget kök och ett eget sällskap. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tio"
        description="Samma fem kriterier och samma viktning för alla tio."
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
        title="Recensioner av varje airfryer"
        description="Alla tio bedöms mot samma fem kriterier."
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
        id="andra-airfryers"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Sex maskiner som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={AIRFRYER_CONSIDERED} />
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
          footnote="Jämn tillagning väger 30 därför att det är den egenskap som avgör om hela omgången blir krispig, och betyget sätts på konstruktionen: antalet kammare, hur stor botten varje kammare har och om två zoner går att slå ihop till en. Skälet är att ingen oberoende part har mätt just de tio maskiner som rankas här under det namn de säljs under i Sverige. Effekten räknas per kammare och inte som märkeffekt, eftersom en dubbelkorgs effekttal gäller hela apparaten: RTINGS har mätt en dubbelkorg till 1 540 watt med båda lådorna igång och 1 470 med bara en. Maxtemperaturen bär däremot vikt här, till skillnad från på pizzaugnssidan, därför att fältet delar sig rakt itu mellan 200 och 240 grader. Det finns inget kriterium för testomdöme: Råd & Röns test av 70 luftfritöser och Stiftung Warentests av 20 ligger bakom betalvägg och får inte återges, och RTINGS 52 provningar gäller modeller för 120 volt. Priser, artikelnummer och GTIN är lästa på butikens egen produktsida och daterade, och specifikationerna hos tillverkaren."
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
        description="Råd & Röns provning av 70 luftfritöser, Stiftung Warentests av 20, RTINGS 52 med öppen metod och tillverkarnas egna bruksanvisningar."
      >
        <SourceList sources={sources} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={AIRFRYER_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
