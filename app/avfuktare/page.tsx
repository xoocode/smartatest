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

import Kopguide from "@/content/avfuktare/kopguide.mdx";

/*
 * ⚠️ Priser och kundbetyg lästa på PRICE_CHECKED. Kapacitet, effekt,
 * driftstemperatur, tankvolym, ljudnivåer, luftflöden, vikt och köldmedium
 * lästa 2026-08-06 hos tillverkaren där tillverkaren publicerar dem, annars hos
 * butiken. Kriteriebetygen är redaktionell bedömning. Vi har inte mätt
 * avfuktning, inte vägt uppsamlat vatten och inte provat någon apparat.
 *
 * Sidans fynd: talet i modellnamnet är uppmätt vid 30 ºC och 80 % RH, och du
 * får ungefär 40 procent av det i ett svalt rum. Meacos egen extraktionstabell
 * bevisar det rad för rad, och Wood's LD40 visar samma sak i två tal.
 *
 * ⚠️ RÄTTAT 2026-08-06: sidan påstod att nio av tolv inte anger villkoren.
 * Meaco publicerar sex rader per modell, eeese två. Felet var vår research.
 * Kvar utan villkor: Clas Ohlsons två egna och Xiaomi. Se lib/corrections.ts.
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
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Avfuktare bäst i test 2026: tolv luftavfuktare jämförda från 1 499 kr. En 25-litersapparat tar 10,7 liter vid 20 grader. Se vilken.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "talet", label: "25L-apparaten tar 10,7 liter" },
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
              Vår testvinnare är Meaco Arete One 25L för 4 299 kronor, eftersom
              Which? ger den lägst driftkostnad av alla apparater de
              rekommenderar och den fungerar bra även i kyla. Den tar 10,7 liter
              vatten per dygn i ett rum på 20 grader, mer än någon annan apparat
              här. Vill du
              ha mest vatten per krona kostar eeese Adam 2 699. Räkna däremot
              aldrig med talet i modellnamnet: det är uppmätt vid 30 grader och
              80 procents luftfuktighet, och i en sval källare får du ungefär 40
              procent av det.
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
      <Section
        id="talet"
        width="default"
        title="Apparaten som heter 25L tar 10,7 liter i en sval källare"
        description="Talet i modellnamnet är uppmätt vid 30 grader och 80 procents luftfuktighet. Ditt hus håller inte det."
      >
        <Prose>
          <p>
            Literantalet är det tal alla jämför avfuktare på. Det står i
            produktnamnet, i rubriken och först i varje specifikation. Det är
            också uppmätt i ett klimat som inte finns i ett svenskt hus, och
            Meaco publicerar själva hela kurvan som visar hur mycket det gör.
          </p>
          <p>
            Så här ser deras egen tabell ut för{" "}
            <strong>MeacoDry Arete One 25L</strong>, apparat för apparat samma
            dygn:
          </p>
          <blockquote>
            30 °C och 80 % RH: 25 liter per dygn (talet i modellnamnet)
            <br />
            <br />
            20 °C och 80 % RH: 17,5 liter per dygn, 280 watt
            <br />
            <br />
            20 °C och 60 % RH: 10,7 liter per dygn, 267 watt
            <br />
            <br />
            10 °C och 60 % RH: 3,5 liter per dygn, 220 watt
          </blockquote>
          <p>
            <strong>
              En källare i oktober håller ungefär 20 grader och 60 procent. Där
              är apparaten en tiolitersapparat.
            </strong>{" "}
            I en ouppvärmd källare i november, 10 grader och 60 procent, tar den
            3,5 liter medan kompressorn fortfarande drar 220 watt. Samma
            apparat, samma dygn, en sjundedel av vattnet i den kallaste raden.
          </p>
          <p>
            <strong>Wood&rsquo;s LD40 visar samma sak i två tal.</strong> 13
            liter per dygn vid 30 grader och 80 procent, 7,5 liter vid 20 grader
            och 70 procent. Skillnaden är 73 procent, och det lägre talet är det
            som gäller i ett svenskt hus.
          </p>
          <p>
            <strong>Varför det händer.</strong> En kondensavfuktare arbetar
            genom att kyla luft under daggpunkten, precis som imma på en kall
            flaska. Ju kallare och torrare luften är, desto mindre vatten finns
            det att fälla ut. Kompressorn drar däremot nästan lika mycket ström
            hela vägen ned, så elen per uppsamlad liter stiger brant när det blir
            kallt: 16 watt per liter för Arete One 25L vid 20 grader och 80
            procent, 62 watt per liter vid 10 grader och 60.
          </p>
          <p>
            <strong>Vad du ska göra med det.</strong> Läs raden{" "}
            <em>Avfuktning i svalt</em> i tabellen nedan och inte raden{" "}
            <em>Kapacitet</em>. Tio av tolv apparater har ett tal vid svalare
            villkor, och där det talet finns är det det du får hem. Ett
            rum eller ett badrum klarar sig med 4 till 6 liter per dygn i verklig
            avfuktning. En källare eller tvättstuga du kör året runt bör ha 8
            till 12.
          </p>
          <p>
            <strong>Wood&rsquo;s SW42FW tar 12 liter vid 20 grader.</strong> Det
            står i bruksanvisningen som ligger på tillverkarens produktsida, på
            en rad som gäller hela SW-serien: 12 liter per dygn på 420 watt vid
            20 grader och 70 procent, mot 25 liter på 600 watt vid 30 och 80.
            Det är näst mest vatten i svalt av alla tolv apparaterna, och 60
            procent mer än Wood&rsquo;s egen LD40 vid exakt samma villkor.
          </p>
          <p>
            <strong>En sak till, om samma apparat i två butiker.</strong>{" "}
            Wood&rsquo;s anger 25 liter per dygn och 600 watt för SW42FW. Clas
            Ohlson, som säljer samma apparat, anger 25,5 liter och 550 watt. Vi
            går efter tillverkarens tal, eftersom det är det enda av de två som
            säger vid vilka villkor det är uppmätt.
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
        description="Raden Avfuktning i svalt är den som gäller hemma hos dig. Raden Kapacitet är talet i modellnamnet."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Kapacitet, avfuktning i svalt, effekt, driftstemperatur, ljudnivå, luftflöde, vikt och tankvolym är lästa 2026-08-06 hos tillverkaren, i den bruksanvisning tillverkaren länkar, eller hos butiken. Villkoren står i cellen: Meaco mäter vid 20 °C och 60 % RH, Wood's vid 20 °C och 70 % RF, eeese och Xiaomi vid 27 °C och 60 % RH. De raderna är alltså inte direkt jämförbara med varandra, eftersom ett varmare och fuktigare rum ger ett högre tal.`)}
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
            Alla kapacitetstal kommer från tillverkaren eller butiken. Det enda
            oberoende måttet kommer från Which?, som Stiftung Warentest
            publicerar.
          </p>
          <p>
            <strong>
              Den här sidan hade fel om nio av tolv apparater fram till 6 augusti
              2026.
            </strong>{" "}
            Vi skrev att tillverkarna inte anger vid vilka villkor literantalet
            är uppmätt. Meaco har sex rader per modell och eeese två, på sina
            egna sidor, Kjell har både villkoren och effekten för
            Xiaomi-apparaten, och Wood&rsquo;s bruksanvisning har en egen rad
            för 20 grader och 70 procent för hela SW- och LD-serien. Två
            omgångar rättelser samma dag ändrade tolv betyg och tio placeringar,
            och båda står med sina siffror på{" "}
            <a href="/rattelser">rättelsesidan</a>.
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
            märke. Storlekarna hamnar på plats ett, två, fem och sex, och du ska
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
        description="Alla tolv bedöms mot samma fyra kriterier. Uppgifterna är tillverkarens eller butikens egna, inte kontrollerade av oss."
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
          footnote="Avfuktning i praktiken väger tyngst, och där Which? har ett omdöme väger det tungt, eftersom det är den enda provningen i Europa som mäter vid svenska temperaturer och räknar elen per uppsamlad liter vatten. Energipoängen bygger på watt delat med liter per dygn vid samma villkor, alltså 30 grader och 80 procent där paret finns publicerat. Fram till 6 augusti 2026 delade vi i stället deklarerad effekt med talet i modellnamnet, vilket för Meacos del blandade två olika klimat i en kvot och gav dem ett försprång de inte hade. Där en uppgift inte finns står ett streck i tabellen, aldrig en nolla, och den drar inte ned något betyg. Priserna är hos den butik vi länkar till."
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
        description="En europeisk standard, två svenska normkällor, två oberoende provningar och de tillverkarsidor som bär bevisningen."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Flera av källorna nedan är tillverkarsidor, och det är avsiktligt.
            </strong>{" "}
            Meacos extraktionstabeller, eeeses spectabeller, Wood&rsquo;s egen
            sida för SW42FW och Clas Ohlsons sida för LD40 är de ställen där
            kapacitet vid svalare villkor går att läsa svart på vitt. De är inga
            tester och räknas inte som sådana, men den som vill ska kunna gå och
            läsa samma rader.
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
