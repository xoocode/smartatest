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
import { VerdictText } from "@/components/product/verdict-text";

import Kopguide from "@/content/brandstege/kopguide.mdx";

/*
 * ⚠️ Priser, längd, angiven maxlast, karmtjocklek, vikt, hopfällt mått,
 * artikelnummer, kundbetyg och vilken standard butiken eller tillverkaren anger
 * är riktiga, lästa på butikens eller tillverkarens egen sida på PRICE_CHECKED.
 * Kriteriebetygen är redaktionell bedömning. Vi har inte belastat, hängt upp
 * eller klättrat i någon stege.
 *
 * Sidans fynd är att kilotalet inte går att jämföra: samma sorts stege anges
 * till 150, 200, 400 och 450 kilo eller ingenting alls, ingen butik anger provmetod, och den enda
 * standard branschen pekar på gäller lutande och stående teleskopstegar. Se
 * lib/categories.ts för viktningen och .agent/research/brandstege.md för
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
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 * Se lib/links.ts.
 */

const TEST_PAGE = BRANDSTEGE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Åtta brandstegar, och sex olika svar på hur mycket de bär: 150, 200, 400, 450 kilo, och två som inte anger något alls. Vi jämförde åtta hängande stegar från 699 till 2 249 kronor mot Boverkets femmetersgräns.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "kilotalet", label: "Kilotalet går inte att jämföra" },
  { id: "femmetersgransen", label: "Femmetersgränsen i byggreglerna" },
  { id: "jamforelse", label: "Jämför alla åtta" },
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
              Stegar av i stort sett samma konstruktion anger 150, 200, 400 och
              450 kilo, två anger ingenting alls, och ingen butik anger hur talet
              mätts. Det finns ingen produktstandard för stegar som hängs över en
              fönsterkarm. Vi jämförde åtta hängande stegar från 699 till 2 249
              kronor mot det som faktiskt går att kontrollera: räckvidd, karmmått
              och vad butiken vågar skriva ut.
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
        <TocNav
          variant="inline"
          entries={TOC}
          className="mt-block lg:hidden"
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
            Sex av de åtta stegarna anger{" "}
            <strong>150, 200, 400 eller 450 kilo</strong>. Ingen butik anger hur
            talet mätts. De två återstående anger inget tal alls.
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
            <strong>Två av stegarna anger ingen last alls.</strong>{" "}
            Skeppshultstegens repstegar hos Bauhaus listar material, längd,
            bredd, antal steg, avstånd från fasad och max väggtjocklek. Ingen
            maxlast. I samma produkttext står ändå: överskrid aldrig den
            maximala belastningsvikten som anges av tillverkaren. Butiken
            hänvisar till ett tal den inte publicerar. Talet finns på en etikett
            på själva stegen, synlig på Bauhaus egen produktbild, där du
            kan läsa det först efter att kartongen är öppnad.
          </p>
          <p>
            <strong>Kontrasten mot de fasta stegarna gör saken tydlig.</strong>{" "}
            En fasadmonterad utrymningsstege provas mot EN 131-1 och EN 131-2,
            alltså de allmänna stegstandarderna, och anger då 150 kilo.
            Produkten som faktiskt provats uppger den lägsta lasten av alla,
            medan hängande stegar utan angiven provning skriver upp till 450.
          </p>
          <p>
            Stegarna är alltså inte svaga. Talet säger något om vem som mätt
            försiktigast, inte om vem som byggt starkast.
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
        description="Längden bestämmer om stegen når från ditt fönster. Karmtjockleken bestämmer om den alls hakar fast."
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
            <strong>Ettans motivering var först fel.</strong> Vi
            påstod att sjumetersstegen var den enda i svensk handel som når tre
            våningar. Det stämde inte: Skeppshultstegen säljer 7,5 meter hos
            Bauhaus och 10 meter hos Stegfabriken. Rankningen står kvar, men på
            ett skäl som går att kontrollera i stället för ett som inte gjorde
            det. Rättat 2026-08-03.
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
        description="Två av fyra tillverkare begränsar produkten till ett enda användningstillfälle. Bara en av dem skriver det i butiken."
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
            <strong>Skeppshultstegen säger samma sak, i den dyrare butiken.</strong>{" "}
            Tillverkarens egen text om repstegarna lyder{" "}
            <em>
              &quot;konstruerad för att användas en gång enbart och ska rullas ut
              enbart när behov finns&quot;
            </em>
            . Den meningen publiceras av Stegfabriken. Bauhaus säljer exakt samma
            artikel 42 procent billigare och skriver i stället bara att den är
            tillverkad för att användas endast vid behov. Villkoret som avgör om
            du får öva följer alltså inte med produkten utan med köpstället, och
            det försvinner just där de flesta handlar.
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
        description="Alla åtta bedöms mot samma fem kriterier."
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
          footnote="Räckvidd väger tyngst eftersom längden avgör om produkten alls fungerar från ditt fönster, och gränsen är Boverkets: sitter fönstrets underkant mer än fem meter över marken krävs en fast monterad stege, och under den höjden räknar reglerna med att du hoppar. Skalan för dokumenterad provning är 5,0 för en gällande standard med årtal som gäller stegtypen, vilket ingen produkt når eftersom en sådan standard inte finns, 2,5 när en standard anges utan årtal, 1,5 när den anges i en tillbakadragen utgåva och 1,0 när ingen standard anges alls. Julas engångsvillkor poängsätts inte i något kriterium, eftersom det inte hör hemma i något av de fem och ett dolt avdrag hade dolt saken. Det står som nackdel och har ett eget avsnitt. Vi hittade inget svenskt eller nordiskt test av kategorin. Priserna är hos den butik vi länkar till."
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
