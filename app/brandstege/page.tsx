import type { Metadata } from "next";

import { BRANDSTEGE, testPageTrail } from "@/lib/test-pages";
import { BRANDSTEGE_SOURCES } from "@/lib/sources";
import {
  BRANDSTEGE_CONSIDERED,
  BRANDSTEGE_FAQ,
  BRANDSTEGE_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/brandstege";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
import { getStyle } from "@/lib/style-server";
import { NOT_STATED, priceCaption } from "@/lib/captions";
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

import Kopguide from "@/content/brandstege/kopguide.mdx";

/*
 * ⚠️ Priser, längd, angiven maxlast, karmtjocklek, vikt, hopfällt mått,
 * artikelnummer, kundbetyg och vilken standard butiken eller tillverkaren anger
 * är riktiga, lästa på butikens eller tillverkarens egen sida på PRICE_CHECKED.
 * Kriteriebetygen är redaktionell bedömning. Vi har inte belastat, hängt upp
 * eller klättrat i någon stege.
 *
 * Sidans fynd, omskrivet 2026-08-06 efter att bruksanvisningarna lästs: sex av
 * åtta stegar får utlösas en enda gång och ska kasseras efteråt, och samtliga
 * manualer säger att du inte ska dra i utlösningsbandet när du övar. Housegard
 * EL45A är den enda som får återanvändas. Kilotalet är fortfarande inte
 * jämförbart, men det är nu ett andra fynd och inte sidans spine. Se
 * lib/categories.ts för viktningen och .agent/research/brandstege.md för
 * underlaget.
 *
 * Tre saker som sidan bär:
 *
 * 1. #engangsbruk är sidans fynd och ligger före tabellen, eftersom det ändrar
 *    vilken stege läsaren ska välja. Villkoret poängsätts inte i något
 *    kriterium; det står som nackdel på varje produkt och i tabellen.
 * 2. #vem-har-kontrollerat säger att ettan är dyrast och mest nischad, innan
 *    läsaren hinner tro att rankningen är en uppmaning att köpa dyrast.
 * 3. #kallor säger att kategorin saknar både oberoende test och tillämplig
 *    produktstandard.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 * Se lib/links.ts.
 */

const TEST_PAGE = BRANDSTEGE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Brandstege bäst i test 2026: åtta räddningsstegar jämförda från 699 kr. Bara en når ner från tredje våningen under 2 000 kr. Se vilken.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "engangsbruk", label: "Stegarna du inte får öva med" },
  { id: "kilotalet", label: "Kilotalet går inte att jämföra" },
  { id: "femmetersgransen", label: "Femmetersgränsen i byggreglerna" },
  { id: "jamforelse", label: "Jämför alla åtta" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
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
              Vi rekommenderar Brandvarnare.se Räddningsstege 7 m för
              1 294 kronor, eftersom den når ner från ett fönster på tredje
              våningen, och närmaste stege med samma räckvidd kostar
              955 kronor mer. Distanserna på fotstegen håller ut
              den från fasaden så att foten får plats. Har du två våningar tar du
              Housegard EL45A för 849 kronor i stället: sex av de åtta stegarna
              ska enligt sin egen bruksanvisning kasseras efter en enda
              utlösning, och Housegards är den du får hänga upp, klättra i och
              använda igen.
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
        <TocNav
          variant="inline"
          entries={TOC}
          className="mt-block lg:hidden"
        />
      </Section>

      {/* --------------------------------------------------- the finding -- */}
      {/* Först av allt, eftersom det avgör vilken stege läsaren ska välja och
          eftersom uppgiften ligger i en manual man läser efter köpet. */}
      <Section
        id="engangsbruk"
        width="default"
        title="Stegarna du inte får öva med"
        description="Sex av åtta ska kasseras efter en enda utlösning. Uppgiften står i bruksanvisningen, inte i butiken."
      >
        <Prose>
          <p>
            <strong>
              Sex av de åtta stegarna får utlösas en enda gång och ska kasseras
              efteråt.
            </strong>{" "}
            Housegard EL45A är den enda som får återanvändas. För Nexa FLB-104
            säger varken butiken eller tillverkaren något om saken.
          </p>
          <p>
            Uppgiften ligger nästan alltid i bruksanvisningen, alltså i det
            dokument du läser när kartongen redan är öppnad. Jula är ensam om
            att skriva den i butiken, mitt i ett säljstycke:{" "}
            <em>&quot;Endast avsedd för engångsbruk.&quot;</em> Biltema skriver
            den också, längst ned i produkttexten. Hos de övriga står den bara i
            manualen.
          </p>
          <p>
            <strong>
              Vår testvinnare säger emot sin egen bruksanvisning.
            </strong>{" "}
            Brandvarnare.se beskriver på båda sina produktsidor hur du övar i
            två nivåer, både att bara hänga stegen över karmen och att fälla ut
            den hela vägen ned mot marken. Manualen de själva publicerar i
            dokumentfliken på samma sida säger:{" "}
            <em>
              &quot;Denna stege är endast avsedd för engångsbruk&quot;
            </em>{" "}
            och, om transportbandet,{" "}
            <em>&quot;gör inte det vid övning&quot;</em>. Fäller du ut den har
            du förbrukat en stege för 1 294 kronor.
          </p>
          <p>
            <strong>Alla åtta manualer säger samma sak om övning.</strong> Öva
            på att hänga upp stegen, dra inte i utlösningsbandet. Housegards och
            Biltemas formulering är{" "}
            <em>
              &quot;Stegen är demonterad och förpackad för att fungera optimalt
              i en evakueringssituation. Därför bör du inte fälla upp stegen
              under övning.&quot;
            </em>{" "}
            Julas manual säger det under en egen rubrik som heter
            Övningsmontera.
          </p>
          <p>
            Det är inte en dålig regel. Upphängningen är det moment som är
            svårast att göra rätt i mörker med en hand, och det är det du kan
            träna gratis på varje stege här. Men det betyder att den som vill
            att familjen ska ha klättrat i stegen en gång innan det gäller har
            ett enda alternativ på den här sidan, och att det alternativet
            kostar 849 kronor.
          </p>
          <p>
            Villkoret sänker inget betyg. Det hör inte hemma i något av de fyra
            kriterierna, och ett dolt avdrag hade dolt själva saken. Det står
            som nackdel på varje produkt det gäller och som en egen rad i
            tabellen.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- the kilo tale -- */}
      {/* Andra fyndet. Låg först på sidan fram till 2026-08-06, men det handlar
          om hur talen publiceras snarare än om vad läsaren ska välja. */}
      <Section
        id="kilotalet"
        width="default"
        title="Kilotalet går inte att jämföra"
        description="Kategorins enda uppenbara jämförelsetal är också det minst jämförbara. Här är varför."
      >
        <Prose>
          <p>
            Stegarna anges till{" "}
            <strong>150, 200, 400 eller 450 kilo</strong>, och ingen anger hur
            talet mätts. Sju av åtta anger 450 kilo någonstans, antingen rakt av
            eller som ett tal de säger sig ha testat upp till.
          </p>
          <p>
            Det beror inte på slarv utan på att det saknas något att mäta mot.{" "}
            <strong>
              Det finns ingen produktstandard för stegar som hängs över en
              fönsterkarm.
            </strong>{" "}
            Nexa och Biltema hänvisar till EN 131-6, men Svenska institutet för
            standarder beskriver den standardens omfattning som lutande och
            stående teleskopstegar. En stege av nylonband som hänger fritt längs
            fasaden är ingetdera. Båda anger dessutom utgåvan 2015, som SIS
            listar som tillbakadragen och ersatt av 2019. Det är tredje gången i
            vår brandfamilj efter EN 1869:1997 på brandfiltarna och
            EN 50291:2010 på kolmonoxidvarnarna.
          </p>
          <p>
            <strong>Talen motsäger sig själva inom samma dokument.</strong>{" "}
            Julas manual anger 150 kilo och skriver tre rader längre ned att
            högst tre personer får använda stegen samtidigt. Brandvarnare.se
            anger 450 kilo eller tre personer i samma mening. Och Housegards och
            Biltemas manualer, som anger 200 kilo rekommenderat och 450 testat,
            säger båda att stegen är avsedd för{" "}
            <strong>en person åt gången</strong>. Det är den uppgiften som
            gäller när du står i fönstret med ett barn på armen.
          </p>
          <p>
            <strong>Butiken och tillverkaren anger inte samma tal.</strong>{" "}
            Bauhaus anger 400 kilo för Nexa FLB-104. Nexas eget produktblad,
            som Bauhaus länkar under Dokument på samma sida, anger 450, och
            etikettbilden i produktbladet läser 450 kg. För Skeppshultstegens
            repstegar publicerar Bauhaus ingen last alls, medan tillverkaren
            anger 450 kilo för hela serien.
          </p>
          <p>
            <strong>Kontrasten mot de fasta stegarna gör saken tydlig.</strong>{" "}
            En fasadmonterad utrymningsstege provas mot EN 131-1 och EN 131-2,
            alltså de allmänna stegstandarderna, och anger då 150 kilo.
            Housegards hängande stege hänvisar till exakt samma två standarder i
            sin bruksanvisning och anger ändå 200 kilo rekommenderat och 450
            testat. Samma standarder, tre gånger talet.
          </p>
          <p>
            Stegarna är alltså inte svaga. Talet säger något om vem som mätt
            försiktigast, inte om vem som byggt starkast. Gå efter meningen om
            en person åt gången i stället, och planera för att en vuxen tar sig
            ner åt gången.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- regulation -- */}
      <Section
        id="femmetersgransen"
        tone="muted"
        width="default"
        title="Femmetersgränsen i byggreglerna"
        description="En hängande stege uppfyller aldrig byggreglerna. Men det Boverket skriver om alternativet är det starkaste argumentet för att ha en."
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
        title="Jämför alla åtta"
        description="Längden bestämmer om stegen når från ditt fönster. Raden längst ned bestämmer om ni får öva med den."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `${NOT_STATED} Maxlasterna är tillverkarnas egna och är uppmätta på olika sätt.`)}
        />
      </Section>

      {/* ------------------------------------------------ self-disclosure -- */}
      <Section
        id="vem-har-kontrollerat"
        tone="muted"
        width="default"
        title="Vem har kontrollerat det här?"
        description="Vad rankningen bygger på, och var den är svag."
      >
        <Prose>
          <p>
            <strong>Ettan är dyrast och mest nischad, och det är avsiktligt.</strong>{" "}
            Räckvidd väger tyngst eftersom längden avgör om produkten alls
            fungerar från ditt fönster, och då hamnar den stege som täcker mest
            överst. Har du två våningar ska du inte köpa den. Då är
            4,5-metersstegen rätt produkt, den är billigare och lättare, och den
            överflödiga längden gör ingen nytta. Räknaren i köpguiden ställer
            frågan som avgör.
          </p>
          <p>
            <strong>
              Samma butik tar plats ett och tre.
            </strong>{" "}
            Brandvarnare.se sjumetersstege är den billigaste vägen ner från tre
            våningar, 955 kronor under närmaste stege med samma räckvidd, och
            deras två produktsidor är de enda som beskriver distanserna som
            håller ut stegen från fasaden. Det är vad räckvidd och nedstigning
            gav. På deras 4,5-metersstege drar priset ner betyget i stället:
            979 kronor mot 799 hos Biltema för samma längd.
          </p>
          <p>
            <strong>Tre betyg var satta på fel uppgifter.</strong> Vi skrev att
            Housegards och Biltemas stegar saknar distanser mot fasaden, och båda
            har dem: det står i manualerna, som en varning om att klossarna kan
            krossa rutan på våningen under. Och Julas 43 centimeter, som vi läste
            som ett väggavstånd, är stegens eget djup utfälld. Housegard flyttar
            därmed till andra plats, Biltema från åttonde till femte och Jula
            från femte till åttonde. Rättat 2026-08-06, se{" "}
            <a href="/rattelser">rättelser</a>.
          </p>
          <p>
            <strong>Ingen uppgift är granskad av tredje part.</strong> Vi har
            inte belastat, hängt upp eller klättrat i någon stege, och vi har
            inte sett något provningsintyg. Vad stegarna verkligen bär vet vi
            alltså inte. Rankningen bygger därför på det du kan mäta mot ditt
            eget hus och läsa i bruksanvisningen: räckvidden, avståndet ut från
            fasaden, karmtjockleken och priset per meter du kan utrymma från.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje stege"
        description="Alla åtta bedöms mot samma fyra kriterier."
      >
        <div className="flex flex-col gap-block">
          {products.map((product, i) => (
            <ProductReview key={product.id} product={product} rank={i + 1}>
              <VerdictText text={product.verdict} className="text-muted-foreground" />
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
        id="andra-stegar"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sju poster som inte hamnade i rankningen, inklusive de fasta fasadstegarna som får en egen sida."
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
        description="Viktningen nedan är den som räknar fram betygen i tabellen."
      >
        <MethodologyBlock
          criteria={TEST_PAGE.criteria}
          intro={TEST_PAGE.methodology}
          variant="cards"
          footnote="Räckvidd väger tyngst eftersom längden avgör om produkten alls fungerar från ditt fönster, och gränsen är Boverkets: sitter fönstrets underkant mer än fem meter över marken krävs en fast monterad stege, och under den höjden räknar reglerna med att du hoppar. Engångsvillkoret poängsätts inte i något kriterium, eftersom det inte hör hemma i något av de fyra och ett dolt avdrag hade dolt saken. Det står som nackdel på varje produkt det gäller, som en egen rad i tabellen och i ett eget avsnitt högst upp. Vi hittade inget svenskt eller nordiskt test av kategorin. Priserna är hos den butik vi länkar till."
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
        description="Standardkatalogen, byggreglerna och de produktsidor som bär de uppgifter vi jämfört."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Det finns varken oberoende test eller tillämplig produktstandard
              för hängande brandstegar.
            </strong>{" "}
            Varken Råd &amp; Rön eller Testfakta har testat kategorin. Den bästa
            svenska sidan vi läst skriver att den testat produkter men redovisar
            varken metod, mätvärden eller testdatum.
          </p>
          <p>
            <strong>Primärkällorna finns däremot.</strong> SIS publicerar status
            och omfattning för de standarder butikerna hänvisar till, och
            Boverket publicerar höjdgränserna för utrymning genom fönster. Båda
            är lästa i original och citerade ordagrant här, i stället
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
          className="mb-block"
        />
      </Container>
    </>
  );
}
