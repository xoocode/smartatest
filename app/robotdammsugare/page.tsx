import type { Metadata } from "next";

import { ROBOTDAMMSUGARE, testPageTrail } from "@/lib/test-pages";
import { ROBOTDAMMSUGARE_SOURCES } from "@/lib/sources";
import {
  ROBOTDAMMSUGARE_CONSIDERED,
  ROBOTDAMMSUGARE_FAQ,
  ROBOTDAMMSUGARE_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/robotdammsugare";
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

import Kopguide from "@/content/robotdammsugare/kopguide.mdx";

/*
 * ⚠️ Priser, GTIN, sugkraft i pascal, moppsystem, angiven passerhöjd och
 * stationens funktioner är riktiga, lästa PRICE_CHECKED hos den butik varje
 * produkt länkar till: Proshops strukturerade data, Dreames och Roborocks egna
 * svenska butiker. Kriteriebetygen är redaktionell bedömning. Vi har inte
 * dammsugit några golv, inte vägt något damm och inte provat någon robot.
 *
 * Sidans fynd: pascaltalet är reklam. Stiftung Warentest skriver det rakt ut,
 * och prislistan visar det: Dreame L10s Ultra Gen 3 anger 25 000 Pa för 4 990
 * kronor, Roborock Qrevo Curv 2 Flow anger 20 000 för 11 490.
 *
 * ⚠️ Samma förbehåll gäller passerhöjden. 40 mm och 8,8 cm kommer från
 * tillverkarna själva, ingen anger provmetod, och sidan använder dem som
 * uppgift och aldrig som mätning.
 *
 * ⚠️⚠️ Råd & Rön och Stiftung Warentest har BETALVÄGG PÅ PRODUKTNIVÅ. Sidan
 * återger aldrig deras betyg per modell. Det som citeras är metoden och de
 * slutsatser som ligger fritt, och de gäller kategorin och inte enskilda
 * maskiner. Inget eget kriterium för testomdöme, efter användarbeslut
 * 2026-08-04.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning. Se lib/links.ts.
 */

const TEST_PAGE = ROBOTDAMMSUGARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Dreame anger 25 000 Pa för 4 990 kronor. Roborock anger 20 000 för 11 490. Stiftung Warentest säger att talet är reklam du kan bortse från, och Råd & Rön förklarar varför: roboten sopar, den suger inte. Vi jämförde sju robotdammsugare från 1 999 till 14 890 kronor.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "pascal", label: "25 000 Pa för 4 990 kr, 20 000 för 11 490" },
  { id: "trosklar", label: "Tröskeln är det svenska problemet" },
  { id: "jamforelse", label: "Jämför alla sju" },
  { id: "billigaste", label: "Räcker det med den billigaste?" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "recensioner", label: "Recensioner av varje robotdammsugare" },
  { id: "andra-robotar", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function RobotdammsugarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = ROBOTDAMMSUGARE_PRODUCTS;
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
              En robotdammsugare för 4 990 kronor anger 25 000 pascal. En för
              11 490 anger 20 000. Stiftung Warentest säger att talet är ett
              reklampåstående du lugnt kan bortse från, och Råd & Rön förklarar
              varför: roboten har inget munstycke som skapar vakuum, den sopar i
              stället för att suga. Vi jämförde sju robotar från 1 999 till
              14 890 kronor på det som labben faktiskt mäter.
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
        id="pascal"
        width="default"
        title="25 000 Pa för 4 990 kronor, 20 000 Pa för 11 490"
        description="Ingen tillverkare anger vid vilken metod talet är uppmätt."
      >
        <Prose>
          <p>
            Sugkraften i pascal står i produktnamnet, i rubriken och först i
            varje specifikation. Butikerna sorterar sortimentet efter den.{" "}
            <strong>Den säger ingenting om hur rent det blir.</strong>
          </p>
          <p>
            Stiftung Warentest, som provar robotdammsugare efter DIN EN 62929,
            uttrycker det utan omsvep:
          </p>
          <blockquote>
            Saugkräfte mit vielen Tausend Pa &hellip; sind Werbe-Anpreisungen,
            die Sie getrost ignorieren können.
          </blockquote>
          <p>
            Alltså: sugkrafter på många tusen Pa är reklampåståenden du lugnt
            kan bortse från. Samma sak gäller enligt dem löften om fast cleaning
            och särskild lasernavigering.
          </p>
          <p>
            <strong>Två priser på den här sidan visar det.</strong> Dreame L10s
            Ultra Gen 3 anger <strong>25 000 Pa</strong> och kostar{" "}
            <strong>4 990 kronor</strong>. Roborock Qrevo Curv 2 Flow anger{" "}
            <strong>20 000 Pa</strong> och kostar <strong>11 490</strong>. Vore
            talet ett mått på städförmåga vore det dyrare köpet obegripligt.
          </p>
          <p>
            <strong>Och det blir tokigare ju närmare man tittar.</strong>{" "}
            Roborock Saros 20 Sonic kostar <strong>8 990 kronor</strong> och
            anger <strong>36 000 Pa</strong>. Dreame X60 Ultra kostar{" "}
            <strong>14 990</strong> och anger <strong>35 000</strong>. Den
            billigare roboten vinner alltså sifferkriget mot en som kostar
            6 000 kronor mer, samtidigt som Roborocks egen svenska butik inte
            anger något pascaltal alls för Saros 20 Sonic. Talet finns när det
            säljer, och saknas när det inte gör det.
          </p>
          <p>
            <strong>Talen går inte heller att jämföra mellan märken.</strong>{" "}
            Ingen tillverkare anger vid vilken metod värdet är uppmätt, till
            skillnad från provningen som labben använder.
          </p>
          <p>
            <strong>Skälet sitter i konstruktionen.</strong> Roboten har borstar
            på undersidan som föser ihop dammet, som sedan sugs upp i en öppning.
            Den saknar det munstycke som bygger upp undertryck i en vanlig
            dammsugare, och därför blir effekten svag oavsett vad pumpen orkar.
            Råd & Röns formulering är att roboten sopar i stället för att suga.
          </p>
          <p>
            Följden syns i resultatet:{" "}
            <strong>
              samtliga 62 robotar de provat får lägsta möjliga betyg
            </strong>{" "}
            för sin förmåga att få upp damm ur springor i golvet. Inte de flesta.
            Alla.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- the swedish -- */}
      <Section
        id="trosklar"
        tone="muted"
        width="default"
        title="Tröskeln är det svenska problemet"
        description="En av fyra robotar i Ljud & Bilds grupptest fick ge upp helt."
      >
        <Prose>
          <p>
            Amerikanska tester av robotdammsugare handlar sällan om trösklar,
            eftersom amerikanska hem sällan har lister mellan varje rum. Svenska
            hem har det.
          </p>
          <p>
            Ljud & Bild provade fyra robotar i mellanklassen och fann att{" "}
            <strong>
              nordiska trösklar var en av de största utmaningarna i grupptestet
            </strong>
            . En av de fyra fick ge upp helt.
          </p>
          <p>
            <strong>Tillverkarna vet om det.</strong> Både Roborock och Dreame
            säljer en tröskelramp som tillbehör, för 330 respektive 199 kronor.
            En ramp löser en dörr. Har du fem dörrar blir det en annan
            diskussion, både i pengar och i hur hallen ser ut.
          </p>
          <p>
            <strong>Så här gör du i praktiken.</strong> Mät den högsta tröskeln
            mellan de rum roboten ska städa, innan du väljer modell. Bland de
            rankade anger Dreame L50s Pro Ultra 40 millimeter, vilket är den
            tydligaste siffran i mellanskiktet. Dreame X60 Ultra uppger 8,8
            centimeter men kostar 14 990 kronor.
          </p>
          <p>
            <strong>Var noga med vad siffrorna är.</strong> De kommer från
            tillverkarna själva, och ingen anger vid vilken metod höjden är
            uppmätt. De är alltså uppgifter och inte mätvärden. Skillnaden mot
            pascaltalet är ändå betydande: en passerhöjd i millimeter går att
            hålla en tumstock mot.
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
        title={`De ${products.length} bästa robotdammsugarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sju"
        description="Läs raden Moppsystem först. Det är där maskinerna skiljer sig mest, och den funktion båda labben underkänner rakt över."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Moppsystem, passerhöjd, stationens funktioner, sugkraft och batterikapacitet är tillverkarens eller butikens egna uppgifter. Sugkraften i pascal står med för att den efterfrågas, inte för att den rangordnar maskinerna: Stiftung Warentest kallar den ett reklampåstående. Passerhöjd anges bara av de tillverkare som publicerar den, och där raden saknas betyder det att uppgiften inte publiceras, inte att roboten fastnar. Priserna är hos den butik vi länkar till, och två av produkterna länkar till märkets egen svenska butik eftersom maskinen inte säljs hos Proshop.`)}
        />
      </Section>

      {/* ---------------------------------------------------- budget -- */}
      <Section
        id="billigaste"
        tone="muted"
        width="default"
        title="Räcker det med den billigaste?"
        description="Ibland ja, och det beror på golvet snarare än på plånboken."
      >
        <Prose>
          <p>
            Spannet är 1 999 till 14 890 kronor, mer än sju gånger. Frågan om
            det billigaste duger har ett tydligt svar, men det är villkorat.
          </p>
          <p>
            <strong>Ja, om du har hårda golv och inga mattor.</strong> Xiaomi
            S40 för 1 999 kronor har lasernavigering, vilket betyder att den kör
            i ordnade banor i stället för att studsa runt slumpvis. Batteriet
            räcker för en normal lägenhet. Kör du den ofta håller den undan damm
            och smulor, och det är det robotar är bäst på enligt Råd & Rön.
          </p>
          <p>
            <strong>Nej, om du hoppas på moppen.</strong> En fuktig duk som
            släpas runt hela passet, utan tvätt och utan torkning, är den
            konstruktion båda labben kritiserar hårdast. Att köpa en billig
            robot för moppens skull är att betala för något som inte fungerar.
          </p>
          <p>
            <strong>Nej, om du vill slippa tänka på den.</strong> Utan
            tömningsstation tömmer du behållaren för hand ungefär varannan
            körning, och Råd & Rön beskriver just den uppgiften som besvärlig
            eftersom behållaren ofta är svår att få loss utan att damm ramlar ut.
          </p>
          <p>
            <strong>Det viktigaste steget uppåt kostar 2 000 kronor.</strong>{" "}
            Från Xiaomi S40 till Roborock QR 798 för 3 990 tillkommer
            tömningsstation med upp till sju veckors intervall, kartor för fyra
            våningar och moppar som lyfts över mattor. Det är det enskilt största
            lyftet i hela spannet, och det ligger långt under toppen.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------ self-disclosure -- */}
      <Section
        id="vem-har-kontrollerat"
        width="default"
        title="Vem har kontrollerat det här?"
        description="Vad rankningen bygger på, och var den är svag."
      >
        <Prose>
          <p>
            <strong>
              Vi har inte dammsugit några golv och inte vägt något damm.
            </strong>{" "}
            Alla uppgifter om sugkraft, passerhöjd och moppsystem kommer från
            tillverkaren eller butiken, och en av dem, pascaltalet, betyder
            ingenting.
          </p>
          <p>
            <strong>
              Labbens betyg per modell ligger bakom betalvägg, och vi återger dem
              inte.
            </strong>{" "}
            Råd & Rön har provat 62 robotar och Stiftung Warentest provar efter
            DIN EN 62929, men båda tar betalt för tabellen. Det vi citerar är
            metoden och de slutsatser som ligger fritt, och de gäller
            robotdammsugare i allmänhet och aldrig en enskild maskin. Därför har
            jämförelsen{" "}
            <strong>inget kriterium för testomdöme</strong>: ett sådant hade
            mätt vem som blivit provad, inte vad produkten går för.
          </p>
          <p>
            <strong>Fritt läsbara omdömen per produkt är få.</strong> Ljud &
            Bild är den svenska källa som har dem, och de täcker en handfull
            modeller. Där ett omdöme finns står det utskrivet i produktens text,
            och där det saknas bygger placeringen på publicerade uppgifter
            tillsammans med labbens fynd om konstruktionstyperna.
          </p>
          <p>
            <strong>
              Fyra av sju robotar kommer från Dreame och Roborock.
            </strong>{" "}
            Det speglar marknaden snarare än ett val: hos den största svenska
            jämförelsen i kategorin håller samma två koncerner åtta av nio
            placeringar. Att marknaden ser ut så är i sig värt att veta när du
            läser vilken lista som helst, vår inräknad.
          </p>
          <p>
            <strong>Två priser är lästa hos märkets egen butik.</strong> Aqua10
            Ultra Roller och Qrevo Curv 2 Flow säljs inte hos Proshop. Priset är
            i varje enskilt fall hämtat hos just den butik produkten länkar till,
            vilket spelar roll: Dreame X60 Pro Ultra Complete skiljer 3 000
            kronor mellan Dreames egen butik och Proshop samma dag.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        tone="muted"
        width="wide"
        title="Recensioner av varje robotdammsugare"
        description="Alla sju bedöms mot samma fem kriterier. Uppgifterna är tillverkarens eller butikens egna, inte kontrollerade av oss."
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
        id="andra-robotar"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster som inte hamnade i rankningen, däribland två med rekordtal i specifikationen och en som ett svenskt test underkänner."
      >
        <ConsideredList items={ROBOTDAMMSUGARE_CONSIDERED} />
      </Section>

      {/* ---------------------------------------------------- editorial -- */}
      <Section id="kopguide" tone="muted" width="default" title="Köpguide">
        <Prose>
          <Kopguide />
        </Prose>
      </Section>

      <Section
        id="testmetod"
        width="default"
        title="Så gjorde vi testet"
        description="Viktningen nedan är den som räknar fram betygen i tabellen."
      >
        <MethodologyBlock
          criteria={TEST_PAGE.criteria}
          intro={TEST_PAGE.methodology}
          variant="cards"
          footnote="Moppningen väger tyngst för att båda labben pekar ut den som robotarnas svagaste funktion och för att konstruktionerna skiljer sig mest där. Skalan går från fuktig duk som släpas hela passet, via roterande dukar med tvätt i stationen, till rullmopp som sköljs och skrapas ren under drift. Trösklar bygger på angiven passerhöjd tillsammans med hur roboten tar sig över, och där tillverkaren inte publicerar någon höjd sätter vi ingen nolla utan bedömer konstruktionen och skriver ut att uppgiften saknas. Sugkraft i pascal ingår inte i något kriterium, eftersom Stiftung Warentest kallar talet ett reklampåstående och ingen tillverkare anger provmetod. Betygen i labbens egna tabeller ligger bakom betalvägg och återges inte här. Priserna är hos den butik vi länkar till."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        tone="muted"
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
        width="default"
        title="Källor"
        description="Två oberoende labb, en svensk redaktion med eget grupptest, en provmetod och de svenska jämförelser vi ställer oss mot."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Två labb har provat den här kategorin på riktigt, och de kom fram
              till samma sak var för sig.
            </strong>{" "}
            Råd & Rön har provat 62 robotar mellan 1 000 och 17 000 kronor.
            Stiftung Warentest provar efter DIN EN 62929. Båda beskriver en
            kategori som underpresterar mot sitt eget löfte, och det är en
            starkare grund än ett enskilt test.
          </p>
          <p>
            <strong>Båda tar betalt för sina tabeller.</strong> Det betyder att
            vi kan återge deras metod och deras slutsatser om kategorin, men
            aldrig deras betyg för en enskild modell. Den gränsen går rakt genom
            hela sidan.
          </p>
          <p>
            <strong>
              De svenska jämförelserna nämner inte att pascaltalet saknar värde.
            </strong>{" "}
            Störst av dem har 10 701 ord om robotdammsugare och rankar nio
            modeller, varav sex Roborock och två Mova, som är Dreames andramärke.
          </p>
        </Prose>
        <SourceList sources={ROBOTDAMMSUGARE_SOURCES} title={null} />
      </Section>

      <Section
        id="vanliga-fragor"
        tone="muted"
        width="default"
        title="Vanliga frågor"
      >
        <FaqAccordion items={ROBOTDAMMSUGARE_FAQ} schema />
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
