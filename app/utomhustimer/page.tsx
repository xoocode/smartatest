import type { Metadata } from "next";

import { categoryTrail, UTOMHUSTIMER } from "@/lib/categories";
import { UTOMHUSTIMER_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  UTOMHUSTIMER_CONSIDERED,
  UTOMHUSTIMER_FAQ,
  UTOMHUSTIMER_FILTERS,
  UTOMHUSTIMER_PRODUCTS,
} from "@/lib/data/utomhustimer";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
import { getStyle } from "@/lib/style-server";
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

import Kopguide from "@/content/utomhustimer/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, maxlaster, kapslingsklasser och butiks-URL:er är
 * riktiga, lästa ur butikernas egen JSON-LD och produkttext på PRICE_CHECKED.
 * Fortfarande inte publicerbar: kriteriebetygen är redaktionell bedömning
 * utifrån specifikationer och källor snarare än mätningar.
 *
 * Sidan är byggd i augusti för en term som toppar i november, och tre av de
 * rankade produkterna var slut vid priskontrollen. Kör om kontrollen före
 * lansering.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårade och dofollow.
 * Se lib/links.ts.
 */

const CATEGORY = UTOMHUSTIMER;
const PAGE_URL = `/${CATEGORY.slug}`;
const UPDATED = "2026-08-01";

export const metadata: Metadata = {
  title: CATEGORY.title,
  description:
    "Vi jämförde tio utomhustimers, från en mekanisk skiva på 49,90 kronor till en Z-Wave-plugg på 689. IP44 är golvet, kylan är det ingen anger, och maxlasten följer inte priset.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: CATEGORY.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "tre-typer", label: "Tre produkttyper, en fråga" },
  { id: "jamforelse", label: "Jämför alla tio" },
  { id: "recensioner", label: "Recensioner av varje timer" },
  { id: "andra-timers", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function UtomhustimerPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = UTOMHUSTIMER_PRODUCTS;
  const [winner] = products;
  const author = DEFAULT_AUTHOR;
  const reviewer = DEFAULT_REVIEWER;

  return (
    <>
      <ProductSchema
        category={CATEGORY}
        products={products}
        pageUrl={PAGE_URL}
        author={author}
        reviewed={UPDATED}
      />

      <Container size="wide" className="pt-6">
        <Breadcrumbs items={categoryTrail(CATEGORY)} schema />
      </Container>

      {/* ------------------------------------------------ above the fold -- */}
      <Container
        size="wide"
        className="pt-3 pb-[var(--space-section)] lg:pt-[var(--space-section)]"
      >
        <div className="grid gap-[var(--space-block)] lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-row">
            <h1 className="text-h1">{CATEGORY.title}</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vi jämförde tio timers för utomhusbruk, från en mekanisk skiva på
              femtio kronor till en Z-Wave-plugg på nästan sjuhundra. Alla klarar
              Elsäkerhetsverkets gräns på IP44, men den siffran handlar om vatten
              och inte om kyla, och drifttemperaturen saknas hos hälften av dem.
              Maxlasten följer dessutom inte priset: den billigaste produkten i
              jämförelsen klarar mer än den dyraste.
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
            title={`${CATEGORY.label} · Bäst i test`}
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
          className="mt-[var(--space-block)] lg:hidden"
        />
      </Section>

      {/* ---------------------------------------------------- tre typer -- */}
      {/* Ligger högt med flit. Att tre produkttyper rankas i samma lista är det
          första en läsare undrar över, och svaret får inte ligga nedanför en
          tabell där en mekanisk timer för 49,90 hamnar sist. */}
      <Section
        id="tre-typer"
        width="default"
        title="Tre produkttyper, en fråga"
        description="Mekanisk timer, digital veckotimer och smart plugg gör samma jobb i samma uttag. Därför rankas de tillsammans, och därför står den billigaste sist utan att vara ett dåligt köp."
      >
        <Prose>
          <p>
            Det som skiljer produkterna åt är hur schemat kommer in i dem. En
            mekanisk skiva har segment du trycker ner. En digital timer har en
            display. En smart plugg har en app. Alla tre bryter samma krets i
            samma uttag på samma vägg.
          </p>
          <p>
            Viktningen belönar styrning och driftsäkerhet, alltså det de smarta
            gör bäst, och rankningen speglar det. Men den mekaniska timern längst
            ned kostar en åttondel av testvinnaren, klarar mer last än båda
            Shelly-pluggarna och har det näst bästa betygsunderlaget i
            jämförelsen med 4,5 av 609 kunder. Ska den tända en ljusslinga sex
            veckor i december gör den allt som behövs.
          </p>
          <p>
            Vi har därför gett den utmärkelsen Redaktionens val trots
            placeringen, och skriver ut varför i recensionen. Ett betyg är ett
            svar på frågan vad som är bäst. Det är inte alltid samma fråga som
            vad du behöver.
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
        title={`De ${products.length} bästa utomhustimrarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        tone="muted"
        width="wide"
        title="Jämför alla tio"
        description="Filtrera på produkttyp. Kolumnen att läsa noggrannast är drifttemperatur, eftersom det är den enda som säger något om kyla och den saknas hos fem av tio."
      >
        <FilterableComparison
          products={products}
          filters={UTOMHUSTIMER_FILTERS}
          legend="Filtrera på produkttyp"
          layout={style.table}
          variant="bordered"
          caption={`Priser kontrollerade ${PRICE_CHECKED} hos respektive butik och kan ha ändrats sedan dess. Kategorin är säsongsvara och tre av produkterna var slut vid kontrollen, vilket står i deras specar.`}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje timer"
        description="Alla tio bedöms mot samma fem kriterier. Kategorin saknar helt oberoende tester, så det finns inget kriterium för testomdöme här, till skillnad från på våra andra sidor."
      >
        <div className="flex flex-col gap-[var(--space-block)]">
          {products.map((product, i) => (
            <ProductReview key={product.id} product={product} rank={i + 1}>
              <p className="text-muted-foreground">{product.verdict}</p>
              <CriteriaScores
                criteria={CATEGORY.criteria}
                scores={product.scores}
                size="sm"
                className="mt-1"
              />
            </ProductReview>
          ))}
        </div>
      </Section>

      <Section
        id="andra-timers"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex produkter som fanns med i urvalet men inte i rankningen. Två av dem är konkurrenternas egna testvinnare, uteslutna av skäl som inte handlar om kvalitet."
      >
        <ConsideredList items={UTOMHUSTIMER_CONSIDERED} />
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
        description="Viktningen nedan är exakt den som räknar fram betygen på den här sidan."
      >
        <MethodologyBlock
          criteria={CATEGORY.criteria}
          intro={CATEGORY.methodology}
          variant="cards"
          footnote="Den här kategorin saknar kriteriet Omdöme i oberoende tester, som finns på våra övriga sidor. Skälet är att det inte existerar ett enda oberoende test av utomhustimers på någon nordisk marknad: varken Råd & Rön, Ljud & Bild eller Tek.no har testat kategorin, och de sidor som ligger högst i sökresultatet är affiliatelistor. Vi väger hellre bort ett kriterium än fyller det med användarbetyg och kallar det test. Priserna är hos den butik vi länkar till. Jula betalar oss ingenting och ingår inte i något nätverk vi kan söka till, men har kategorins billigaste och bäst betygsatta produkt, och den länkas därför ändå. Vi tar inte betalt för placeringar, och affiliatelänkar påverkar varken betyg eller ordning."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi testar inte alla produkterna själva fysiskt. Det här är vad vi faktiskt gör i stället, och hur vi tjänar pengar."
      >
        <TrustBlock />
        <div className="mt-[var(--space-block)] grid gap-4 sm:grid-cols-2">
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
        description="Notera vad som saknas: det finns inget oberoende test av utomhustimers på någon nordisk marknad. Listan består därför av myndighetskällor och en butiks egen jämförelse, citerade för vad de är."
      >
        <SourceList sources={UTOMHUSTIMER_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={UTOMHUSTIMER_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "electrical", "pricing"]}
          className="mb-[var(--space-block)]"
        />
        <AffiliateDisclosure />
      </Container>
    </>
  );
}
