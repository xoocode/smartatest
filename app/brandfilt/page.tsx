import type { Metadata } from "next";

import { BRANDFILT, categoryTrail } from "@/lib/categories";
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

import Kopguide from "@/content/brandfilt/kopguide.mdx";

/*
 * ⚠️ Priser, storlekar, material, temperaturtålighet, vikt, artikelnummer,
 * kundbetyg och framför allt vilken version av EN 1869 varje butik anger är
 * riktiga, lästa på butikernas egna produktsidor på PRICE_CHECKED och
 * omkontrollerade samma dag. Kriteriebetygen är redaktionell bedömning utifrån
 * de uppgifterna. Vi har inte tänt eld på något.
 *
 * Sidans fynd är att EN 1869 finns i två versioner som provar olika saker, och
 * att versionsnumret står i butikstexten men i ingen jämförelse. Se
 * lib/categories.ts för hur det påverkar viktningen.
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
 *    standardens egen text. Se .agent/research-brandfilt-verifiering.md.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårade och dofollow.
 * Se lib/links.ts.
 */

const CATEGORY = BRANDFILT;
const PAGE_URL = `/${CATEGORY.slug}`;
const UPDATED = "2026-08-02";

export const metadata: Metadata = {
  title: CATEGORY.title,
  description:
    "EN 1869:2019 kräver att brandfilten provats även mot brand i vätska. Den tillbakadragna versionen från 1997 provade bara matolja. Vi jämförde åtta filtar från 99,90 till 299,90 kronor och läste årtalet i varje butiks specifikation.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: CATEGORY.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
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
              Två saker avgör om brandfilten du köper duger, och båda står i
              butikens specifikation. Storleken ska vara 120 × 180 centimeter,
              och certifieringen ska vara EN 1869:2019, eftersom bara den
              versionen kräver att filten provats mot brand i vätska och inte
              bara mot matolja. Vi jämförde åtta filtar från 99,90 till 299,90
              kronor och läste årtalet på varje.
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
            matolja, alltså stekpannan som fattar eld, och innehöll ett prov av
            elektrisk ledningsförmåga. Den versionen är tillbakadragen sedan
            2020.
          </p>
          <p>
            <strong>EN 1869:2019</strong> behöll båda proven, skärpte elprovet
            och lade till ett obligatoriskt <strong>heptanprov</strong>, alltså
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
            Sex av åtta filtar i vår jämförelse anger 2019. En anger standarden
            utan årtal. En anger 1997, och det är jämförelsens dyraste. En anger
            ingenting alls, trots att samma butik anger 2019 på sin mindre filt.
          </p>
          <p>
            Kontrollera alltså årtalet, inte bara att standarden nämns. Det står
            i produkttexten hos de butiker som bryr sig om att skriva ut det.
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
        description="Två rader avgör: Certifiering, där årtalet är hela poängen, och Storlek, där räddningstjänsterna rekommenderar 120 × 180."
      >
        <FilterableComparison
          products={products}
          filters={BRANDFILT_FILTERS}
          legend="Filtrera på storlek, certifiering och förpackning"
          layout={style.table}
          variant="bordered"
          caption={`Priser kontrollerade ${PRICE_CHECKED} hos respektive butik och kan ha ändrats sedan dess. Där en uppgift står som ej angiven betyder det att butiken inte publicerar den, inte att egenskapen saknas. En av filtarna var slut vid kontrollen.`}
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
        description="Tre saker om jämförelsen ovan som vi hellre säger själva än låter dig upptäcka."
      >
        <Prose>
          <p>
            <strong>Ingen certifiering är granskad av tredje part.</strong> Vi
            läser vad butiken skriver i sin egen specifikation och jämför det med
            standardens text. Vi har inte sett något provningsintyg, och vi har
            inte tänt eld på någon filt. Kriteriet heter Dokumenterad
            certifiering just därför: det mäter vad du kan kontrollera innan du
            betalar, inte vad filten fysiskt klarar.
          </p>
          <p>
            <strong>
              Fyra av åtta filtar kommer från samma butik, och de tar plats 1, 2,
              4 och 5.
            </strong>{" "}
            Brandvarnare.se säljer dem utan angiven tillverkare, alltså som egen
            etikett, och deras uppgift om SS-EN 1869:2019 vilar helt på butikens
            eget ord. Skälet till placeringarna är att de är den enda butiken som
            säljer 120 × 180 med utskrivet årtal för under 200 kronor. Kjells
            motsvarande kostar 299,90 och anger 1997.
          </p>
          <p>
            <strong>
              Samma butik är den enda i vår brandkategori vi skulle kunna
              annonsera mot.
            </strong>{" "}
            Det har inte påverkat viktningen, och du kan kontrollera det själv:
            viktningen står längre ner, poängen per kriterium står i varje
            recension, och totalen räknas fram ur dem. Hade Kjells filt haft ett
            utskrivet 2019 hade den vunnit på storlek och kundbetyg.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje filt"
        description="Alla åtta bedöms mot samma fem kriterier. Certifieringen är provad av ett certifieringsorgan, inte av oss."
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
        description="Viktningen nedan är exakt den som räknar fram betygen på den här sidan."
      >
        <MethodologyBlock
          criteria={CATEGORY.criteria}
          intro={CATEGORY.methodology}
          variant="cards"
          footnote="Kriteriet Dokumenterad certifiering väger tyngst, och namnet är noga valt. Vi betygsätter vad du kan kontrollera innan du betalar, inte vad filten fysiskt klarar, eftersom ingen av uppgifterna är granskad av tredje part. Skalan är 5,0 för utskrivet EN 1869:2019, 2,5 när standarden anges utan årtal, 1,5 för utskrivet 1997 och 1,0 när butiken inte anger någon standard alls. Att ett utskrivet 1997 får mer än en tystnad är avsiktligt: en butik ska inte tjäna på att låta bli att svara. Vi hittade inget oberoende test av brandfiltar, så till skillnad från våra sidor om smart belysning och smarta uttag finns här inget kriterium för testomdömen. Priserna är hos den butik vi länkar till. Vi tar inte betalt för placeringar, och affiliatelänkar påverkar varken betyg eller ordning."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi testar inte produkterna fysiskt. Det här är vad vi gör i stället, och hur vi tjänar pengar."
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
        title="Källor"
        description="Standarden själv, räddningstjänsternas rekommendationer och butikernas egna produktsidor för de uppgifter vi jämfört. Inget av det nedan är ett produkttest, och skälet står i rutan här under."
      >
        <Prose className="mb-[var(--space-block)]">
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
          className="mb-[var(--space-block)]"
        />
        <AffiliateDisclosure />
      </Container>
    </>
  );
}
