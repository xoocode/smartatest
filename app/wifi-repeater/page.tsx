import type { Metadata } from "next";

import { testPageTrail, WIFI_REPEATER } from "@/lib/test-pages";
import { SOURCES_BY_HREF } from "@/lib/sources";
import {
  PRICE_CHECKED,
  WIFI_REPEATER_FAQ,
  WIFI_REPEATER_CONSIDERED,
  WIFI_REPEATER_PRODUCTS,
} from "@/lib/data/wifi-repeater";
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

import Kopguide from "@/content/wifi-repeater/kopguide.mdx";

/*
 * Tionde sidan i gruppen Elektronik, byggd 2026-08-07.
 *
 * ⚠️ Sidan rankar enheter som förlänger den router läsaren redan har, 301 till
 * 1 590 kronor. Mesh-set på flera enheter ersätter routern och ligger bland
 * övervägda efter användarbeslut, tillsammans med powerline.
 *
 * ⚠️ SIDANS FYND, och det som avgör viktningen: sladden fördubblar farten, utom
 * där sladden är långsammare än luften. F.A.Z. Kaufkompass mäter varje repeater
 * två gånger per sträcka, en klient i sladd och en trådlöst, alltså ett
 * trådlöst hopp mot två. Med gigabituttag mätte de 690 mot 340 Mbit/s på RE450.
 * På de sex med 100-megabitsuttag mätte de 95 i sladden mot 245 i luften.
 *
 * ⚠️ TALET I MODELLNAMNET VÄGER INGENTING. AC1750 är 1 300 på 5 GHz plus 450 på
 * 2,4 GHz, och en klient sitter på ett band i taget. Banden betygsätts därför
 * av två kriterier, `hastighet` på 30 och `band24` på 10.
 *
 * ⚠️ INGET TESTOMDÖMEKRITERIUM. F.A.Z. har mätt 39 repeatrar med öppen metod och
 * fritt läsbar tabell, men bara fyra av de tretton rankade finns i provningen.
 * Ett viktat testbetyg hade låtit provningsurvalet avgöra ordningen. Samma
 * beslut som /pizzaugn, /airfryer och /skaftdammsugare.
 *
 * ⚠️ SÄNDAREFFEKTEN BÄR INGEN VIKT, trots att PTSFS 2022:19 §173 är sidans
 * starkaste regeluppgift. TP-Link anger CE-värdet för sina äldre modeller,
 * D-Link, Asus och Mercusys anger ingenting, och de två Wi-Fi 7-modellerna
 * anger bara FCC-värdet. Sex tomma celler av tretton.
 *
 * ⚠️ VI BEDÖMER ALDRIG om en namngiven produkt är laglig. Vi återger paragrafen
 * och produktens publicerade effekttal. Samma disciplin som /elscooter.
 *
 * ⚠️ NIO AV TRETTON ÄR TP-LINK, och Mercusys är TP-Links budgetmärke. Det
 * speglar svensk handel och står utskrivet på sidan.
 *
 * Priser, artikelnummer, GTIN, lagerstatus och kundbetyg är lästa i
 * produktsidans egen JSON-LD hos butiken på PRICE_CHECKED. Specifikationerna är
 * lästa hos tillverkaren.
 *
 * AFFILIATE-SWAP — se lib/links.ts för vad LINK_MODE står på i dag.
 */

const TEST_PAGE = WIFI_REPEATER;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-07";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "TP-Link RE235BE vinner för 899 kronor med 2 882 Mbit/s och ett nätverksuttag på 2,5 gigabit. Mercusys ME80X ger Wi-Fi 6 och gigabit för 599. Talet AC1750 är två band ihopräknade, och en klient sitter på ett i taget.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "sladden", label: "Sladden fördubblar farten" },
  { id: "jamforelse", label: "Jämför alla tretton" },
  { id: "recensioner", label: "Recensioner av varje repeater" },
  { id: "andra-repeatrar", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function WifiRepeaterPage() {
  const style = await getStyle();
  const products = WIFI_REPEATER_PRODUCTS;
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
            {/* H1 bär fyndet: talet på kartongen är två band ihopräknade. */}
            <h1 className="text-h1">
              Wifi-repeater bäst i test 2026: talet på kartongen är två band
              ihopräknade
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Köp TP-Link RE235BE för 899 kronor. Den går 2 882 Mbit/s på 5 GHz
              och har ett nätverksuttag på 2,5 gigabit, så en tv eller dator i
              sladd aldrig bromsas av repeatern. Räcker 599 kronor tar du
              Mercusys ME80X, som ger Wi-Fi 6 och gigabituttag för nästan
              trehundra mindre.
            </p>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Och läs inte AC1750 som en hastighet. Talet är 1 300 Mbit/s på
              5 GHz plus 450 på 2,4 GHz, och din telefon sitter på ett band i
              taget. Tyska F.A.Z. Kaufkompass har mätt just den repeatern till
              340 Mbit/s netto trådlöst, och till 690 med en dator i
              nätverkskabeln.
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
        id="sladden"
        width="default"
        title="Sladden fördubblar farten, utom där sladden är långsammare än luften"
        description="Nätverksuttagets klass avgör mer än radion, och nästan ingen butik anger den."
      >
        <Prose>
          <p>
            <strong>
              En repeater med två band tappar ungefär hälften av hastigheten,
              och skälet är att samma radio både lyssnar och sänder.
            </strong>{" "}
            Den tar emot från routern och skickar vidare till dig, och de två
            hoppen delar på sändningstiden. Sitter din dator i en nätverkskabel
            i repeatern finns bara ett trådlöst hopp kvar, och då försvinner
            halveringen.
          </p>
          <p>
            F.A.Z. Kaufkompass har mätt det på varje repeater i sin provning,
            två gånger per sträcka. Talen till vänster är en dator i sladd,
            talen till höger en trådlös klient på samma plats:
          </p>
          <ul>
            <li>TP-Link RE505X: 775 Mbit/s i sladden mot 360 trådlöst</li>
            <li>TP-Link RE450: 690 mot 340</li>
            <li>TP-Link RE650: 370 mot 170</li>
          </ul>
          <p>
            <strong>
              Men på sex av deras trettiotvå repeatrar går det åt andra hållet.
            </strong>{" "}
            TP-Link RE330 mätte 95 Mbit/s i sladden och 245 i luften. Mercusys
            ME30 mätte 95 mot 220, och D-Link DAP-1610 95 mot 125. Talet 95
            återkommer därför att det är taket för Fast Ethernet, den äldre
            nätverksstandarden. En repeater med hundramegabitsuttag kan inte
            leverera mer genom kabeln oavsett hur snabb radion är.
          </p>
          <p>
            Den som drar en nätverkskabel till tv:n för att bilden ska sluta
            hacka halverar alltså hastigheten på en sådan modell. Fyra klasser
            finns i handeln: inget uttag alls, 100 megabit, gigabit och 2,5
            gigabit. TP-Link RE305 kostar 329 kronor och har 100 megabit,
            RE235BE kostar 899 och har 2,5 gigabit.
          </p>
          <p>
            <strong>
              Ingen svensk butik utom Proshop anger vilken klass uttaget har.
            </strong>{" "}
            Klassen står i tabellen nedan för alla tretton, hämtad ur
            tillverkarens egen specifikation.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa wifi-repeatrarna 2026`}
        description="Varje repeater fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tretton"
        description="Samma kriterier och samma viktning för alla tretton. Hastigheten står per band, eftersom du bara använder ett i taget."
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
        title="Recensioner av varje repeater"
        description="Vad varje repeater gör bra, var den går sönder i argumentet, och vem som ska köpa den."
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
        id="andra-repeatrar"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra repeatrar vi övervägde"
        description="Sex som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={WIFI_REPEATER_CONSIDERED} />
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
          footnote="Nio av de tretton är TP-Link, och Mercusys är TP-Links budgetmärke. Det speglar utbudet i svensk handel: Kjells kategori består av åtta TP-Link, två Mercusys, två D-Link och en Asus. Netgear, Zyxel och Linksys säljs knappt alls här. Urvalet är gjort på pris, tillgänglighet och att specifikationerna går att läsa hos tillverkaren, inte på märke."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi kopplar inte in produkterna. Det här är vad vi gör i stället."
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
        description="Betygen bygger på tillverkarnas specifikationer och på de här oberoende källorna."
      >
        <SourceList sources={sources} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={WIFI_REPEATER_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "electrical", "pricing"]}
          className="mb-block"
        />
      </Container>
    </>
  );
}
