import type { Metadata } from "next";

import { BRANDSTEGE, categoryTrail } from "@/lib/categories";
import { BRANDSTEGE_SOURCES } from "@/lib/sources";
import {
  BRANDSTEGE_CONSIDERED,
  BRANDSTEGE_FAQ,
  BRANDSTEGE_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/brandstege";
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
import { ComparisonTable } from "@/components/product/comparison-table";
import { CriteriaScores } from "@/components/product/criteria-scores";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { MethodologyBlock } from "@/components/product/methodology-block";
import { ProductReview } from "@/components/product/product-review";
import { ProductSchema } from "@/components/product/product-schema";
import { QuickPickPanel } from "@/components/product/quick-pick-panel";
import { WinnerCard } from "@/components/product/winner-card";
import { WinnerGrid } from "@/components/product/winner-grid";

import Kopguide from "@/content/brandstege/kopguide.mdx";

/*
 * ⚠️ Priser, längd, angiven maxlast, karmtjocklek, vikt, hopfällt mått,
 * artikelnummer, kundbetyg och vilken standard butiken eller tillverkaren anger
 * är riktiga, lästa på butikens eller tillverkarens egen sida på PRICE_CHECKED.
 * Kriteriebetygen är redaktionell bedömning. Vi har inte belastat, hängt upp
 * eller klättrat i någon stege.
 *
 * Sidans fynd är att kilotalet inte går att jämföra: samma sorts stege anges
 * till 150, 200, 400 och 450 kilo, ingen butik anger provmetod, och den enda
 * standard branschen pekar på gäller lutande och stående teleskopstegar. Se
 * lib/categories.ts för viktningen och .agent/research-brandstege.md för
 * underlaget.
 *
 * Tre saker som byggdes in från start:
 *
 * 1. #vem-har-kontrollerat säger att ettan är dyrast och mest nischad, innan
 *    läsaren hinner tro att rankningen är en uppmaning att köpa dyrast.
 * 2. #engangsbruk lyfter Julas engångsvillkor ur produkttexten, eftersom det
 *    inte poängsätts i något kriterium och därför annars kunde försvinna.
 * 3. #kallor säger att kategorin saknar både oberoende test och tillämplig
 *    produktstandard.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårade och dofollow.
 * Se lib/links.ts.
 */

const CATEGORY = BRANDSTEGE;
const PAGE_URL = `/${CATEGORY.slug}`;
const UPDATED = "2026-08-02";

export const metadata: Metadata = {
  title: CATEGORY.title,
  description:
    "Sex brandstegar anger 150, 200, 400 och 450 kilo, och ingen butik anger hur talet mätts. Vi jämförde sex hängande stegar från 699 till 1 294 kronor mot Boverkets femmetersgräns.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: CATEGORY.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "kilotalet", label: "Kilotalet går inte att jämföra" },
  { id: "femmetersgransen", label: "Femmetersgränsen i byggreglerna" },
  { id: "jamforelse", label: "Jämför alla sex" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "engangsbruk", label: "Stegen du inte får öva med" },
  { id: "recensioner", label: "Recensioner av varje stege" },
  { id: "andra-stegar", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function BrandstegePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = BRANDSTEGE_PRODUCTS;
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
              Sex stegar av i stort sett samma konstruktion anger 150, 200, 400
              och 450 kilo, och ingen butik anger hur talet mätts. Det finns
              ingen produktstandard för stegar som hängs över en fönsterkarm. Vi
              jämförde sex hängande stegar från 699 till 1 294 kronor mot det som
              faktiskt går att kontrollera: räckvidd, karmmått och vad butiken
              vågar skriva ut.
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

      {/* --------------------------------------------------- the finding -- */}
      {/* Först av allt, eftersom det vänder upp och ner på det mått läsaren
          annars går efter. */}
      <Section
        id="kilotalet"
        width="default"
        title="Kilotalet går inte att jämföra"
        description="Kategorins enda uppenbara jämförelsetal är också det minst jämförbara. Här är varför."
      >
        <Prose>
          <p>
            De sex stegarna anger <strong>150, 200, 400 och 450 kilo</strong>.
            Ingen butik anger hur talet mätts.
          </p>
          <p>
            Det beror inte på slarv utan på att det saknas något att mäta mot.{" "}
            <strong>
              Det finns ingen produktstandard för stegar som hängs över en
              fönsterkarm.
            </strong>{" "}
            Två av tillverkarna hänvisar till EN 131-6, men Svenska institutet
            för standarder beskriver den standardens omfattning som lutande och
            stående teleskopstegar. En stege av nylonband som hänger fritt längs
            fasaden är ingetdera.
          </p>
          <p>
            Bauhaus anger dessutom utgåvan 2015, som SIS listar som
            tillbakadragen och ersatt av 2019. Det är tredje gången i vår
            brandfamilj som en svensk butik anger en indragen utgåva, efter
            EN 1869:1997 på brandfiltarna och EN 50291:2010 på
            kolmonoxidvarnarna.
          </p>
          <p>
            <strong>Kontrasten mot de fasta stegarna gör saken tydlig.</strong>{" "}
            En fasadmonterad utrymningsstege provas mot EN 131-1 och EN 131-2,
            alltså de allmänna stegstandarderna, och anger då 150 kilo.
            Produkten som faktiskt provats uppger den lägsta lasten av alla,
            medan hängande stegar utan angiven provning skriver upp till 450.
          </p>
          <p>
            Slutsatsen är inte att stegarna är svaga. Den är att talet säger
            något om vem som mätt försiktigast, inte om vem som byggt starkast.
            Vi kan inte granska något certifikat och påstår därför ingenting om
            hur mycket stegarna bär. Vi kan läsa vad standarden själv säger att
            den handlar om.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- regulation -- */}
      <Section
        id="femmetersgransen"
        tone="muted"
        width="default"
        title="Femmetersgränsen i byggreglerna"
        description="En hängande stege uppfyller aldrig byggreglerna. Men det Boverket skriver om alternativet är sidans starkaste argument för att ha en."
      >
        <Prose>
          <p>
            Boverkets byggregler accepterar utrymning genom fönster om
            underkanten sitter högst <strong>5,0 meter</strong> över marken.
            Finns en <strong>fast monterad</strong> stege höjs gränsen till
            8,0 meter.
          </p>
          <p>
            En stege som hängs över karmen räknas aldrig som fast monterad. Den
            är alltså inte ett sätt att uppfylla reglerna, oavsett längd, utan
            ett frivilligt komplement till en bostad som redan gör det.
          </p>
          <p>
            Läs sedan vad Boverket skriver om vad som gäller under fem meter:{" "}
            <em>
              &quot;Om avståndet till marken nedanför fönstret är högst fem meter
              accepteras att personer utrymmer genom att hoppa. Att hoppa från
              den höjden innebär att personer riskerar att bli skadade.&quot;
            </em>
          </p>
          <p>
            Det är hela argumentet för produkten, formulerat av en myndighet i
            stället för av en butik. Reglerna kräver ingen stege av dig. De
            räknar med att alternativet är att du hoppar, och de skriver själva
            att du då kan skadas.
          </p>
          <p>
            Fönstret behöver också vara stort nog att ta sig ut genom: minst
            0,50 meter brett, minst 0,60 meter högt, och bredd plus höjd minst
            1,50 meter.
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
        title={`De ${products.length} bästa brandstegarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sex"
        description="Två rader avgör: Längd, som bestämmer om stegen når från ditt fönster, och Karmtjocklek, som bestämmer om den alls hakar fast."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={`Priser kontrollerade ${PRICE_CHECKED} hos respektive butik och kan ha ändrats sedan dess. Där en uppgift står som ej angiven betyder det att butiken inte publicerar den, inte att egenskapen saknas. Maxlasterna är tillverkarnas egna och är uppmätta på olika sätt.`}
        />
      </Section>

      {/* ------------------------------------------------ self-disclosure -- */}
      <Section
        id="vem-har-kontrollerat"
        tone="muted"
        width="default"
        title="Vem har kontrollerat det här?"
        description="Tre saker om jämförelsen ovan som vi hellre säger själva än låter dig upptäcka."
      >
        <Prose>
          <p>
            <strong>Ettan är dyrast och mest nischad, och det är avsiktligt.</strong>{" "}
            Räckvidd väger tyngst eftersom längden avgör om produkten alls
            fungerar från ditt fönster, och då hamnar den stege som täcker mest
            överst. Har du två våningar ska du inte köpa den. Då är
            4,5-metersstegen rätt produkt, den är billigare och lättare, och den
            överflödiga längden gör ingen nytta. Verktyget i köpguiden ställer
            frågan som avgör.
          </p>
          <p>
            <strong>
              Butiken vi tjänar mest på tar plats ett och tre.
            </strong>{" "}
            Brandvarnare.se är den enda butiken i vår brandkategori vi skulle
            kunna annonsera mot. Deras sjumetersstege är den enda i svensk handel
            som når tre våningar, och deras två produktsidor är de enda som
            beskriver distanserna som håller ut stegen från fasaden. Det är vad
            räckvidd och nedstigning gav. På deras 4,5-metersstege drar priset
            ner betyget: 979 kronor mot 799 hos Biltema för samma längd.
          </p>
          <p>
            <strong>Ingen uppgift är granskad av tredje part.</strong> Vi har
            inte belastat, hängt upp eller klättrat i någon stege, och vi har inte
            sett något provningsintyg. Kriteriet heter Dokumenterad provning just
            därför: det mäter vad du kan kontrollera innan du betalar, inte vad
            stegen fysiskt klarar.
          </p>
        </Prose>
      </Section>

      {/* --------------------------------------------------- single use -- */}
      {/* Eget avsnitt eftersom villkoret inte poängsätts i något kriterium.
          Ett dolt avdrag hade dolt själva saken. */}
      <Section
        id="engangsbruk"
        width="default"
        title="Stegen du inte får öva med"
        description="En mening mitt i ett säljstycke hos Jula, som ändrar vad produkten är."
      >
        <Prose>
          <p>
            Julas Hard Head-stege är enligt butikens egen text{" "}
            <strong>endast avsedd för engångsbruk</strong>. Meningen står i
            löpande text i ett säljstycke, inte i specifikationen.
          </p>
          <p>
            Konsekvensen är att du aldrig kan pröva stegen. Varje räddningstjänst
            säger åt dig att öva utrymningsvägen, Brandvarnare.se beskriver på
            sina produktsidor hur man gör det i två nivåer, och den här stegen
            förbrukas av övningen. Första gången du klättrar i den står huset i
            brand, i mörker, med adrenalin, på en produkt du aldrig rört.
          </p>
          <p>
            Vi har inte dragit av poäng för det i något kriterium. Det hör inte
            hemma i något av de fem, och ett dolt avdrag hade dolt själva saken.
            Det står som nackdel på produkten och det står här.
          </p>
          <p>
            Öva minst upphängningen, oavsett vilken stege du köper. Att haka
            krokarna rätt över karmen och kontrollera att de sitter är det moment
            som är svårast att göra rätt i mörker, och det sliter inte på stegen.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje stege"
        description="Alla sex bedöms mot samma fem kriterier. Måtten är butikens eller tillverkarens egna, inte kontrollerade av oss."
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
        id="andra-stegar"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster som inte hamnade i rankningen, inklusive de fasta fasadstegarna som får en egen sida."
      >
        <ConsideredList items={BRANDSTEGE_CONSIDERED} />
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
          footnote="Räckvidd väger tyngst eftersom längden avgör om produkten alls fungerar från ditt fönster, och gränsen är Boverkets: sitter fönstrets underkant mer än fem meter över marken krävs en fast monterad stege, och under den höjden räknar reglerna med att du hoppar. Skalan för dokumenterad provning är 5,0 för en gällande standard med årtal som gäller stegtypen, vilket ingen produkt når eftersom en sådan standard inte finns, 2,5 när en standard anges utan årtal, 1,5 när den anges i en tillbakadragen utgåva och 1,0 när ingen standard anges alls. Julas engångsvillkor poängsätts inte i något kriterium, eftersom det inte hör hemma i något av de fem och ett dolt avdrag hade dolt saken. Det står som nackdel och har ett eget avsnitt. Vi hittade inget svenskt eller nordiskt test av kategorin. Priserna är hos den butik vi länkar till. Vi tar inte betalt för placeringar, och affiliatelänkar påverkar varken betyg eller ordning."
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
        description="Standardkatalogen, byggreglerna och de produktsidor som bär de uppgifter vi jämfört."
      >
        <Prose className="mb-[var(--space-block)]">
          <p>
            <strong>
              Det finns varken oberoende test eller tillämplig produktstandard
              för hängande brandstegar.
            </strong>{" "}
            Varken Råd &amp; Rön eller Testfakta har testat kategorin. Den bästa
            svenska sidan vi mätt skriver att den testat produkter men redovisar
            varken metod, mätvärden eller testdatum.
          </p>
          <p>
            <strong>Primärkällorna finns däremot.</strong> SIS publicerar status
            och omfattning för de standarder butikerna hänvisar till, och
            Boverket publicerar höjdgränserna för utrymning genom fönster. Båda
            är lästa i original och citerade ordagrant på den här sidan, i stället
            för att refereras via en tredje part.
          </p>
        </Prose>
        <SourceList sources={BRANDSTEGE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={BRANDSTEGE_FAQ} schema />
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
