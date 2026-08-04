import type { Metadata } from "next";

import { LARM_UTAN_ABONNEMANG, testPageTrail } from "@/lib/test-pages";
import { LARM_UTAN_ABONNEMANG_SOURCES } from "@/lib/sources";
import {
  LARM_UTAN_ABONNEMANG_CONSIDERED,
  LARM_UTAN_ABONNEMANG_FAQ,
  LARM_UTAN_ABONNEMANG_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/larm-utan-abonnemang";
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

import Kopguide from "@/content/larm-utan-abonnemang/kopguide.mdx";

/*
 * ⚠️ Priser, kundbetyg, artikelnummer, paketinnehåll, ljudnivåer, batteritider
 * och vilka funktioner butiken anger kräver en prenumeration är riktiga, lästa
 * på butikens egen sida på PRICE_CHECKED. Kriteriebetygen är redaktionell
 * bedömning. Vi har inte monterat, larmat eller försökt slå ut något system.
 *
 * Sidans två fynd:
 *
 * 1. #reservuppkopplingen — två av fem säljer 4G-backup som ett abonnemang, i
 *    en kategori som definieras av att inte ha abonnemang. Två har ingen alls.
 * 2. #larmklass-r — SSF 140 definierar larmklass R för precis den här
 *    produkten, och SBSC skriver att en anläggning enligt normen kräver en
 *    certifierad installatör. Det gör påståendet om sänkt hemförsäkring
 *    ogrundat för produktklassen, utan att larmet för den skull är värdelöst.
 *
 * Inget kriterium för testomdöme: fyra svenska tester finns, alla om Ajax.
 * Se lib/categories.ts för viktningen och
 * .agent/research/larm-utan-abonnemang.md för underlaget.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 */

const TEST_PAGE = LARM_UTAN_ABONNEMANG;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-03";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Två av fem larm utan abonnemang säljer 4G-backup som en prenumeration, och två har ingen reservuppkoppling alls. Vi jämförde fem larmpaket från 629 till 8 259 kronor mot SSF 140 och butikernas egna specifikationer.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilket ska du köpa?" },
  { id: "reservuppkopplingen", label: "Reservuppkopplingen säljs som abonnemang" },
  { id: "larmklass-r", label: "Larmklass R och hemförsäkringen" },
  { id: "jamforelse", label: "Jämför alla fem" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "larmlagen", label: "Larmlagen gör dig till larminnehavare" },
  { id: "recensioner", label: "Recensioner av varje larm" },
  { id: "andra-larm", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function LarmUtanAbonnemangPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = LARM_UTAN_ABONNEMANG_PRODUCTS;
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
              Det enklaste sättet att slå ut ett uppkopplat larm är att klippa
              uppkopplingen. Två av fem larm säljer skyddet mot det som en
              prenumeration, och två har inget skydd alls. Vi jämförde fem
              larmpaket från 629 till 8 259 kronor mot butikernas egna
              specifikationsrader och mot den svenska norm som avgör om ett larm
              räknas i försäkringssammanhang.
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
      <Section
        id="reservuppkopplingen"
        width="default"
        title="Reservuppkopplingen säljs som ett abonnemang"
        description="I en produktkategori vars hela försäljningsargument är att du slipper abonnera."
      >
        <Prose>
          <p>
            Ett uppkopplat larm hänger på hemmets bredband. Drar någon ur
            routern, klipper en kabel eller slår ut strömmen når larmet inte
            längre din telefon. Skyddet mot det heter reservkanal: ett
            mobilabonnemang i hubben som tar över.
          </p>
          <p>
            <strong>Yale skriver ut det i specifikationen.</strong> Raden lyder
            ordagrant{" "}
            <em>
              &quot;Kommunikation: Wi-fi, Ethernet, Bluetooth, 4G (kräver
              SIM-kort och prenumeration), Horizon+&quot;
            </em>
            . Samma sida listar vad prenumerationsplanen ger: 4G-backup,
            automatiserad samtalsvarning och professionell övervakning.
          </p>
          <p>
            <strong>Ring skriver ut det i produkttexten.</strong>{" "}
            <em>
              &quot;Genom att prenumerera på tjänsten Ring Protect Plus kan du
              dessutom använda mobilnätet för att kontrollera att systemet
              fungerar om du inte har en internetuppkoppling.&quot;
            </em>
          </p>
          <p>
            <strong>eufy och Tapo har ingen reservkanal alls.</strong> Båda
            bygger på hemmets wifi och går ner med routern. Clas Ohlsons
            specifikation för eufy har till och med en rad som heter
            larmuppringning, och där står Nej.
          </p>
          <p>
            <strong>Ajax är den enda där den ingår i priset.</strong> Hub 2 Plus
            har fyra vägar ut: Ethernet, wifi och två separata SIM-kortsplatser,
            med automatisk växling. Den kostar 8 259 kronor.
          </p>
          <p>
            Vi skiljer medvetet på det här och på videohistorik eller
            professionell bevakning. De två sista är tilläggstjänster och rimliga
            att ta betalt för, och de drar inte ner något betyg. En
            reservuppkoppling hör inte dit. Den är larmets skydd mot det
            enklaste angreppet, och därför sitter avdraget på de två tyngsta
            kriterierna.
          </p>
        </Prose>
      </Section>

      {/* ----------------------------------------------------- the norm -- */}
      <Section
        id="larmklass-r"
        tone="muted"
        width="default"
        title="Larmklass R, och varför du aldrig når den själv"
        description="Det finns en svensk norm skriven för precis den här produkten. Det som stänger dörren är inte hårdvaran."
      >
        <Prose>
          <p>
            <strong>SSF 140</strong> gäller enligt sin egen text{" "}
            <em>
              &quot;inbrottslarmanläggningar med intern trådlös förbindelse
              avsedda för i första hand användning inomhus i bostäder&quot;
            </em>
            . Den definierar en egen larmklass, <strong>larmklass R</strong>, och
            inledningen säger att reglerna specificerar krav som kan finnas i
            försäkringsvillkor.
          </p>
          <p>
            Sedan haken, och den står hos SBSC, som är certifieringsorganet:
          </p>
          <blockquote>
            För att projektera, installera och utfärda installationsintyg för en
            inbrottslarmanläggning som uppfyller kraven enligt SSF 140:2 krävs
            därför att: den som projekterar och installerar anläggningen, som
            lägst, är certifierad installatör enligt SSF 1112.
          </blockquote>
          <p>
            Det är alltså inte hårdvaran som gör en anläggning godkänd, utan vem
            som projekterat, installerat och intygat den. Svensk Försäkring
            beskriver på samma sätt en försäkringsanläggning som en anläggning
            villkorad i ett försäkringsavtal, och listar regelverket bakom:
            larmcentral enligt SSF 136, anläggarfirma enligt SSF 1015, behörig
            ingenjör enligt SSF 1016 och anläggarintyg enligt SSF 1058.
          </p>
          <p>
            <strong>Vad det inte betyder.</strong> Samma skrift säger rakt ut att
            rekommendationerna är vägledande, att normerna är frivilliga att
            tillämpa och att försäkringsbolag får avtala om annat. Ett larm utan
            anläggarintyg är alltså inte värdelöst, och vi påstår inte det. Det
            som saknar grund är påståendet flera jämförelser gör i förbifarten:
            att ett larm du satt upp själv sänker premien. Fråga ditt bolag i
            stället för att utgå från något.
          </p>
          <p>
            <strong>En sak till om utgåvorna.</strong> SSF 140 finns fritt bara
            som förhandsgranskning av utgåva 1 från 2005. Utgåva 2 är den
            gällande och säljs. Citatet om omfattningen är ur utgåva 1, kravet på
            installatören gäller utgåva 2 och kommer från SBSC:s egen
            beskrivning.
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
        title={`De ${products.length} bästa larmen utan abonnemang 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla fem"
        description="Reservkanal säger vad som händer när nätet dör. Reservbatteri säger vad som händer när strömmen gör det."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Uppgifterna om reservkanal, reservbatteri och ljudnivå är butikens eller tillverkarens egna. Där en uppgift står som ej angiven betyder det att butiken inte publicerar den, inte att egenskapen saknas. Det gäller sirenens ljudnivå och hubbens reservbatteri för både eufy och Tapo.`)}
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
            <strong>Vinnaren är nästan tre gånger dyrare än tvåan.</strong>{" "}
            Uppkoppling och abonnemangsfrihet väger tillsammans 50 av 100, och då
            hamnar systemet med fyra kommunikationskanaler överst. För de flesta
            är Ring det bättre köpet: kategorins högsta siren, längsta
            reservbatteri och 2 899 kronor. Det står också i dess recension.
            Rankningen är inte en uppmaning att köpa dyrast.
          </p>
          <p>
            <strong>Vi har inget kriterium för oberoende test.</strong> Det finns
            fyra svenska tester i kategorin, och alla fyra testar Ajax. Ett
            kriterium som bara en av fem produkter kan få poäng på är en bonus
            till den produkten och inte ett mått. Testerna ligger ändå i
            källistan, eftersom de är verkliga.
          </p>
          <p>
            <strong>Två av fem länkar går till Kjell.</strong> Vi försöker sprida
            butikslänkarna, och Ring går därför till Proshop trots att Kjell har
            samma pris, Yale till tillverkarens egen butik och Ajax till
            Låskompaniet. Kjell blir kvar på två därför att de är enda butiken
            som säljer Tapo-paketet och den som publicerar flest kundomdömen på
            eufy.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------------- the law -- */}
      <Section
        id="larmlagen"
        width="default"
        title="Larmlagen gör dig till larminnehavare"
        description="Med larmcentral filtrerar de falsklarmen. Utan är det din roll, och den har ett kostnadsansvar."
      >
        <Prose>
          <p>
            Lag (1983:1097) definierar en larmanläggning som en anläggning
            inrättad för att avge signal till{" "}
            <em>en särskild larmmottagare</em>. Med abonnemang är den mottagaren
            larmcentralen. Utan abonnemang är den din telefon, och du är
            larminnehavare.
          </p>
          <p>
            <strong>Sjätte paragrafen</strong> säger att en larminnehavare är
            skyldig att göra vad som skäligen kan krävas för att motverka att
            anläggningen genom obefogade larm förorsakar onödigt arbete för
            Polismyndigheten.
          </p>
          <p>
            <strong>Åttonde paragrafen</strong> låter polisen förelägga dig att
            åtgärda orsaken efter en utryckning på falsklarm. Sker det igen efter
            ett sådant föreläggande{" "}
            <em>
              &quot;ska innehavaren betala kostnaden för utryckningen, om det
              inte är uppenbart oskäligt&quot;
            </em>
            .
          </p>
          <p>
            Praktiskt betyder det tre saker. Montera rörelsedetektorer så att
            husdjur, gardiner och värmeelement inte utlöser dem. Se till att alla
            i hushållet kan larma av, vilket är ett argument för knappsats. Och
            ring inte 112 på en notis du inte kontrollerat. Den bedömningen
            är vad en larmcentral annars gör åt dig.
          </p>
          <p>
            <strong>Att montera sitt eget larm kräver inget tillstånd.</strong>{" "}
            Kravet i andra paragrafen gäller larminstallationsverksamhet, alltså
            att installera yrkesmässigt åt andra. Den förväxlingen är lätt att
            göra och den är fel.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje larm"
        description="Alla fem bedöms mot samma fem kriterier."
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
        id="andra-larm"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster som inte hamnade i rankningen, inklusive ett bolag som bytt affärsmodell och en produkt vars pris inte går att läsa."
      >
        <ConsideredList items={LARM_UTAN_ABONNEMANG_CONSIDERED} />
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
          footnote="Uppkoppling och abonnemangsfrihet väger tillsammans 50 av 100, eftersom det är där kategorin skiljer sig från sig själv: alla fem larmar, men bara ett av dem överlever att uppkopplingen klipps. En reservkanal som kräver en prenumeration räknas inte som ingående, den räknas som en lucka i löftet. Att videohistorik eller professionell bevakning kostar extra drar inte ner något betyg. Vi har inget kriterium för oberoende test, eftersom de fyra svenska tester som finns alla handlar om samma märke och ett sådant kriterium då bara blir en bonus till en produkt. Där en butik inte publicerar en uppgift står den som saknad, aldrig som en nolla: det gäller sirenens ljudnivå och hubbens reservbatteri för eufy och Tapo. Priserna är hos den butik vi länkar till."
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
        description="Normen för produkten, certifieringsorganets krav på installatören, försäkringsbranschens definition, lagtexten och butikernas egna specifikationer."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Det finns fyra svenska tester i kategorin och alla fyra testar
              samma märke.
            </strong>{" "}
            PC för Alla och Allt för Hemmet har båda provat Ajax. Ingen svensk
            redaktion har jämfört flera larm utan abonnemang mot varandra.
          </p>
          <p>
            <strong>Därför väger normerna tyngre än testerna här.</strong> Det
            som avgör om ett larm du monterat själv duger i
            försäkringssammanhang står inte i ett test utan i SSF 140, i SBSC:s
            krav på installatören och i larmlagen. Alla tre är lästa i original
            och citeras ordagrant ovan.
          </p>
        </Prose>
        <SourceList sources={LARM_UTAN_ABONNEMANG_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={LARM_UTAN_ABONNEMANG_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "pricing"]}
          className="mb-block"
        />
      </Container>
    </>
  );
}
