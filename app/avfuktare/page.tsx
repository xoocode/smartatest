import type { Metadata } from "next";

import { AVFUKTARE, testPageTrail } from "@/lib/test-pages";
import { AVFUKTARE_SOURCES } from "@/lib/sources";
import {
  AVFUKTARE_CONSIDERED,
  AVFUKTARE_FAQ,
  AVFUKTARE_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/avfuktare";
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

import Kopguide from "@/content/avfuktare/kopguide.mdx";

/*
 * ⚠️ Priser, kundbetyg, kapacitet, effekt, driftstemperatur, tankvolym,
 * ljudnivåer, luftflöden och köldmedium är riktiga, lästa på Bygghemmas, Clas
 * Ohlsons, Kjells och Wood's egna sidor på PRICE_CHECKED. Kriteriebetygen är
 * redaktionell bedömning. Vi har inte mätt avfuktning, inte vägt uppsamlat
 * vatten och inte provat någon apparat.
 *
 * Sidans fynd: literantalet på kartongen saknar gemensam grund. Wood's anger
 * vid 30 ºC och 80 % RH, Meaco anger effekten vid 20 °C och 60 % RH men
 * ingenting om literantalet, och Clas Ohlsons egna, eeese, Xiaomi och Duux
 * anger inga villkor alls. Clas Ohlson publicerar själva båda talen för Wood's
 * LD40: 7,5 l/dygn vid 20/70 och 13 l/dygn vid 30/80.
 *
 * ⚠️⚠️ SS-EN 810 finns och är gällande sedan 1997-04-30, men VI HAR INTE KÖPT
 * DEN. Sidan får aldrig påstå vilka provvillkor standarden föreskriver. Den
 * återger bara vad SIS publicerar öppet: titel, status, utgåva, datum, omfång.
 *
 * Inget eget kriterium för testomdöme, efter användarbeslut 2026-08-03. Which?
 * väger in i avfuktningskriteriet och täcker två av tolv rankade. Det står
 * utskrivet både i metodavsnittet och i varje produkts omdöme.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning. Se lib/links.ts.
 */

const TEST_PAGE = AVFUKTARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Clas Ohlson anger både 7,5 och 13 liter per dygn för samma Wood's LD40, beroende på vilka villkor de väljer. Wood's mäter vid 30 grader, Meaco vid 20, och resten anger ingenting. Vi jämförde tolv avfuktare från 1 499 till 7 890 kronor och skrev ut vilken grund varje tal vilar på.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "talet", label: "Samma apparat, 7,5 eller 13 liter" },
  { id: "standarden", label: "Standarden som finns men inte används" },
  { id: "jamforelse", label: "Jämför alla tolv" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "recensioner", label: "Recensioner av varje avfuktare" },
  { id: "andra-avfuktare", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function AvfuktarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = AVFUKTARE_PRODUCTS;
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
              Clas Ohlson skriver att Wood&rsquo;s LD40 avfuktar 7,5 liter per
              dygn. På samma sida, två rader ner, står 13 liter. Skillnaden är
              vilka villkor talet mäts vid, och de flesta tillverkare anger inga
              villkor alls. Ingen av de sex svenska jämförelser vi läst nämner
              det. Vi jämförde tolv avfuktare från 1 499 till 7 890 kronor och
              skrev ut vilken grund varje siffra vilar på.
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
        id="talet"
        width="default"
        title="Samma apparat, 7,5 eller 13 liter per dygn"
        description="Det står på samma produktsida, och det är den enda butikssida i kategorin som visar det."
      >
        <Prose>
          <p>
            Literantalet är det tal alla jämför avfuktare på. Det står i
            produktnamnet, i rubriken och först i varje specifikation.{" "}
            <strong>Det går inte att jämföra mellan märken</strong>, och skälet
            syns tydligast på en enda produktsida.
          </p>
          <p>
            Hos Clas Ohlson står följande i specifikationen för{" "}
            <strong>Wood&rsquo;s LD40</strong>, två rader efter varandra:
          </p>
          <blockquote>
            Avfuktning (20 °C / 70 % RF): 7,5 liter per dygn
            <br />
            <br />
            Avfuktning (30 °C / 80 % RF): 13 liter per dygn
          </blockquote>
          <p>
            Samma apparat, samma sida, samma dag.{" "}
            <strong>Talet skiljer 73 procent</strong> beroende på vilken
            temperatur och luftfuktighet man väljer att mäta vid. LD40 är den
            enda avfuktaren hos Clas Ohlson som publicerar båda talen. Alla
            andra publicerar ett.
          </p>
          <p>
            <strong>Och de mäter inte likadant.</strong> Tre olika grunder
            ligger sida vid sida i svensk handel:
          </p>
          <ul>
            <li>
              <strong>Wood&rsquo;s</strong> anger både kapacitet och effekt vid{" "}
              <strong>30 ºC och 80 % RH</strong>.
            </li>
            <li>
              <strong>Meaco</strong> anger effekten vid{" "}
              <strong>20 °C och 60 % RH</strong> men säger inte ett ord om vid
              vilka villkor literantalet i modellnamnet gäller. Modellerna heter
              10L, 12L, 20L och 25L.
            </li>
            <li>
              <strong>Clas Ohlsons egna, eeese, Xiaomi och Duux</strong> anger
              inga villkor alls.
            </li>
          </ul>
          <p>
            <strong>Det blir värre.</strong> Wood&rsquo;s SW42FW anges av
            tillverkaren till 25 liter per dygn och 600 watt, båda vid 30 grader
            och 80 procent. Clas Ohlson, som säljer samma apparat, anger 25,5
            liter och 550 watt utan villkor. Två av tillverkarens tal och två av
            butikens, för en och samma produkt.
          </p>
          <p>
            <strong>Varför det spelar roll för dig.</strong> En kondensavfuktare
            arbetar genom att kyla luft under daggpunkten, precis som imma på en
            kall flaska. Ju kallare och torrare luften är, desto mindre vatten
            finns det att fälla ut. Wood&rsquo;s marknadsför SW42FW för källare
            och garage ner till <strong>+2 grader</strong>, och kapacitetstalet
            är uppmätt vid <strong>30</strong>. Det är 28 graders skillnad, och
            LD40-raderna ovan visar ungefär vad den skillnaden gör med siffran.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------- the standard -- */}
      <Section
        id="standarden"
        tone="muted"
        width="default"
        title="Standarden som finns men som ingen hänvisar till"
        description="Den heter SS-EN 810 och handlar ordagrant om redovisning av tekniska data."
      >
        <Prose>
          <p>
            Det finns en europeisk standard för precis det här problemet. Den
            svenska titeln lyder:
          </p>
          <blockquote>
            Luftavfuktare med eldriven kompressor: provning av
            avfuktningsförmåga, märkning, funktionskrav och redovisning av
            tekniska data
          </blockquote>
          <p>
            Så här står den hos SIS, Svenska institutet för standarder, läst i
            augusti 2026: <strong>status gällande</strong>,{" "}
            <strong>utgåva 1</strong>, <strong>fastställd 30 april 1997</strong>
            , 21 sidor, framtagen av kommittén för värmepumpar, artikelnummer
            STD-20397, pris 1 097 kronor.
          </p>
          <p>
            Standarden är snart trettio år gammal och har aldrig fått en andra
            utgåva. Och den gäller enligt sin egen titel bara avfuktare{" "}
            <strong>med eldriven kompressor</strong>. Sorptionsavfuktare, den typ
            varje jämförelse rekommenderar till kalla krypgrunder, ligger
            utanför.
          </p>
          <p>
            <strong>Vi har inte köpt standarden</strong>, och vi påstår därför
            ingenting om vilka provvillkor den föreskriver. Allt ovan är vad SIS
            publicerar öppet om den. Det vi kan konstatera är att ingen av de sex
            svenska jämförelser vi läst nämner den, och att ingen tillverkare i
            vår jämförelse hänvisar till den i sin specifikation.
          </p>
          <p>
            <strong>Så här gör den enda som mäter på riktigt.</strong>{" "}
            Brittiska Which?, vars resultat Stiftung Warentest publicerar och
            håller uppdaterade, provar avfuktare{" "}
            <strong>vid 21 graders rumstemperatur och även vid kallare</strong>.
            Elförbrukningen sätter de inte i relation till tiden utan{" "}
            <strong>till mängden uppsamlat vatten</strong>, med motiveringen att
            vissa apparater behöver dubbelt så lång drifttid för samma
            vattenmängd. Det är den enda jämförbara sifferbasen vi hittat i hela
            kategorin, och den ser inget alls ut som talen på kartongerna.
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
        title={`De ${products.length} bästa avfuktarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tolv"
        description="Läs raden Kapacitet tillsammans med raden under den. Ett literantal utan villkor går inte att ställa mot ett med."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Kapacitet, effekt, driftstemperatur, tankvolym, ljudnivå och luftflöde är tillverkarens eller butikens egna uppgifter. Där det står att villkor inte är angivna betyder det att tillverkaren inte publicerar vid vilken temperatur och luftfuktighet talet är uppmätt, vilket gäller nio av tolv. Där det står att en uppgift saknas betyder det att butiken inte publicerar den alls, inte att egenskapen saknas.`)}
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
            <strong>
              Vi har inte mätt någon avfuktning och inte vägt något uppsamlat
              vatten.
            </strong>{" "}
            Alla kapacitetstal kommer från tillverkaren eller butiken, och de
            vilar på olika grund. Det enda oberoende måttet kommer från Which?,
            som Stiftung Warentest publicerar.
          </p>
          <p>
            <strong>
              Which? har provat två av de tolv, och det påverkar rankningen.
            </strong>{" "}
            Meaco Arete One 12L och 25L är de enda apparaterna i vår jämförelse
            som en riktig provning har mätt, och de ligger etta och tvåa. Vi har
            inget eget kriterium för testomdöme, eftersom tio av tolv då inte
            hade kunnat få poäng på det. I stället väger Which?-omdömet tyngst
            när avfuktningspoängen sätts för de två som är provade. Att det ger
            dem ett försprång är avsiktligt, och att det försprånget är
            avgörande för deras placering står här i stället för att döljas.
          </p>
          <p>
            <strong>Fyra av tolv är Meaco, och tre av dem samma serie.</strong>{" "}
            Det beror på att Bygghemma för Arete One i fyra storlekar och att
            ingen annan svensk butik för ett brett sortiment av ett provat
            märke. Storlekarna hamnar på plats ett, två, fyra och sex, och du ska
            välja mellan dem efter ytan du ska avfukta och inte efter ordningen i
            listan. Det står i varje omdöme.
          </p>
          <p>
            <strong>
              Vi har inte läst SS-EN 810, och säger därför ingenting om vad som
              står i den.
            </strong>{" "}
            Standarden kostar 1 097 kronor. Vi återger vad SIS publicerar öppet
            om den: titel, status, utgåva, datum och omfång. Slutsatser drar vi
            bara av titeln, som säger att den gäller avfuktare med eldriven
            kompressor.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje avfuktare"
        description="Alla tio bedöms mot samma fem kriterier. Uppgifterna är tillverkarens eller butikens egna, inte kontrollerade av oss."
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
        id="andra-avfuktare"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster som inte hamnade i rankningen, tre av dem modeller Which? rekommenderar men som saknar ett svenskt pris vi kan läsa."
      >
        <ConsideredList items={AVFUKTARE_CONSIDERED} />
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
          footnote="Öppen redovisning är ett kriterium som inte mäter apparaten utan vad du får veta om den, och det är det enda vi kan kontrollera själva, påstående för påstående. Skalan är 5,0 när kapacitet och effekt anges vid namngivna villkor och mer än en mätpunkt redovisas, 4,0 vid en namngiven punkt för båda talen, 3,0 när bara effekten har villkor, 2,0 vid en vag reservation i löptext, 1,5 när talen publiceras men helt utan villkor och 1,0 när flera av talen inte publiceras alls. Fem av tolv ligger på 1,5 eller lägre. Energipoängen bygger på deklarerad effekt delad med deklarerad kapacitet, och den kvoten ärver samma jämförbarhetsproblem som talen den bygger på: Meacos watt är uppmätta vid 20 grader och 60 procent, Wood's vid 30 och 80, och Clas Ohlsons egna vid ingenting angivet. Det står utskrivet i varje omdöme där det spelar roll. Där en butik inte publicerar en uppgift står den som saknad, aldrig som en nolla. Priserna är hos den butik vi länkar till."
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
        description="En europeisk standard, två svenska normkällor, två oberoende provningar och tre produktsidor som bär bevisningen."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Tre av källorna nedan är produktsidor, och det är avsiktligt.
            </strong>{" "}
            Clas Ohlsons sida för Wood&rsquo;s LD40, Wood&rsquo;s egen sida för
            SW42FW och Bygghemmas sida för Meaco Arete One 25L är de tre ställen
            där de tre olika deklarationsbaserna går att läsa svart på vitt. De
            är inga tester och räknas inte som sådana, men den som vill ska kunna
            gå och läsa samma rader.
          </p>
          <p>
            <strong>
              Ingen av de sex svenska jämförelser vi läst nämner något av det
              här.
            </strong>{" "}
            Varken mätvillkoren, standarden SS-EN 810, SweSIAQ eller
            Folkhälsomyndigheten förekommer på någon av dem. Fyra av dem förklarar
            att kondensavfuktare fungerar sämre i kyla, vilket är riktigt så
            långt det går, men det handlar om <em>typen</em> och aldrig om{" "}
            <em>talet</em>.
          </p>
        </Prose>
        <SourceList sources={AVFUKTARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={AVFUKTARE_FAQ} schema />
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
