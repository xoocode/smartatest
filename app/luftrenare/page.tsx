import type { Metadata } from "next";

import { LUFTRENARE, testPageTrail } from "@/lib/test-pages";
import { LUFTRENARE_SOURCES } from "@/lib/sources";
import {
  LUFTRENARE_CONSIDERED,
  LUFTRENARE_FAQ,
  LUFTRENARE_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/luftrenare";
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

import Kopguide from "@/content/luftrenare/kopguide.mdx";

/*
 * ⚠️ Priser, kundbetyg, filterklass, CADR, ytor, ljudnivåer och reningsteknik
 * är riktiga, lästa på Kjells egna produktsidor på PRICE_CHECKED.
 * Kriteriebetygen är redaktionell bedömning. Vi har inte mätt partikelhalter,
 * inte mätt ozon och inte provat någon apparat.
 *
 * Sidans fynd: Kemikalieinspektionen och Elsäkerhetsverket granskade tjugo
 * luftrenare och publicerade 2026-01-23. Fyra klarade inte ozongränsvärdet,
 * tre av dem långt över, och majoriteten hade någon form av brist. Ingen av de
 * sex svenska konkurrentsidor vi mätt nämner granskningen.
 *
 * ⚠️⚠️ Rapporten NAMNGER INTE de produkter som föll. Sidan får aldrig antyda
 * vilka de var. Det som får sägas om enskilda produkter är vad butiken själv
 * skriver: Kjell anger att Rubicsons jonisator producerar ozon, och att Xiaomi
 * Mijia 6 har en UVC-modul. Inget mer.
 *
 * Inget kriterium för testomdöme: Råd & Röns test gick inte att verifiera i
 * original och båda produkterna i det visade sig vara utgången respektive
 * proffsutrustning. Se .agent/research/luftrenare.md §9.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning. Se lib/links.ts.
 */

const TEST_PAGE = LUFTRENARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Levoit Core 600S renar 147 kvadratmeter för 2 990 kronor och är bäst i test. Vi jämförde åtta luftrenare från 599 till 2 999 kronor på vad filtret fångar, hur mycket luft de orkar med, ljudnivån och vad ett utbytesfilter kostar.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "granskningen", label: "Myndigheterna granskade kategorin" },
  { id: "hepa", label: "HEPA betyder bara H13 och H14" },
  { id: "jamforelse", label: "Jämför alla åtta" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "recensioner", label: "Recensioner av varje luftrenare" },
  { id: "andra-luftrenare", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function LuftrenarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = LUFTRENARE_PRODUCTS;
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
              Levoit Core 600S renar 147 kvadratmeter med ett H13-filter och
              kostar 2 990 kronor, alltså nio kronor mindre än den halvt så
              starka modellen i samma serie. Ska apparaten stå i ett sovrum är
              Core 300S Pro för 1 590 kronor tystare och räcker ändå till 50
              kvadratmeter. Vi jämförde åtta luftrenare från 599 till 2 999
              kronor på vad filtret fångar, hur mycket luft de orkar med och vad
              de tillför luften på vägen. Det sista är ingen självklarhet: när
              två myndigheter mätte tjugo luftrenare klarade fyra inte
              gränsvärdet för ozon.
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
        id="granskningen"
        width="default"
        title="Myndigheterna granskade kategorin i januari"
        description="Två myndigheter, tjugo apparater, och ett resultat ingen svensk jämförelse har nämnt."
      >
        <Prose>
          <p>
            Kemikalieinspektionen och Elsäkerhetsverket köpte in tjugo
            luftrenare, mätte ozonavgivningen, provade elsäkerheten och
            analyserade kemikalieinnehållet. Rapporten kom{" "}
            <strong>23 januari 2026</strong> och är på 45 sidor. Ur
            sammanfattningen:
          </p>
          <blockquote>
            Resultaten av granskningen visade att 4 av 20 analyserade luftrenare
            inte klarade gränsvärdena för ozonavgivning, varav tre låg långt
            över. Även elsäkerhetsprovningen och de kemiska analyserna visade på
            brister.
          </blockquote>
          <p>
            Och i myndighetens egen sammanfattning:{" "}
            <em>
              &quot;Majoriteten av kontrollerade luftrenare hade någon form av
              brist.&quot;
            </em>
          </p>
          <p>
            <strong>Avgränsningen är det viktiga.</strong> Granskningen gällde
            luftrenare som bildar ozon som <em>biprodukt</em> och som är avsedda
            att stå på medan människor är i rummet. Alltså inte ozongeneratorer,
            som bildar ozon med flit och ska användas i tomma utrymmen. Vanliga
            luftrenare. Gränsvärdet är 0,05 ppm.
          </p>
          <p>
            <strong>Och siffran som växte tiofalt.</strong> Förfrågningarna till
            Giftinformationscentralen från allmänheten om symptom efter ozon
            från luftrenare gick från <strong>12 år 2015 till 132 år 2024</strong>.
            Även sjukhusens frågor om ozonförgiftning ökade.
          </p>
          <p>
            <strong>Norge förbjöd 2022</strong> att ozongeneratorer
            tillhandahålls privatpersoner. Sverige har inget sådant förbud.
          </p>
          <p>
            <strong>Vad som avgör om en apparat berörs:</strong> tekniken. En
            luftrenare som pressar luft genom filter bildar ingenting. Lägger
            den till jonisering, UV-ljus, plasma eller katalytisk oxidation kan
            den enligt rapporten bilda ozon som biprodukt. Det är därför
            reningsteknik är det tyngsta kriteriet i vår viktning.
          </p>
          <p>
            <strong>
              Rapporten namnger inte de fyra produkter som föll.
            </strong>{" "}
            Vi vet alltså inte vilka de var och antyder det aldrig. Två av
            apparaterna vi rankar har däremot ett aktivt steg, och i båda fallen
            har tillverkaren själv satt ord på ozonet. Rubicsons manual anger att
            jonisatorn avger högst 0,05 ppm, alltså precis gränsvärdet.
            Xiaomi Mijia 6 har både en UVC-lampa och en jongenerator, och Xiaomi
            svarar i sin egen support att jongeneratorn bildar ozon, men kallar
            mängden extremt låg utan att ange ett tal.
          </p>
        </Prose>
      </Section>

      {/* --------------------------------------------------- the standard -- */}
      <Section
        id="hepa"
        tone="muted"
        width="default"
        title="HEPA betyder bara H13 och H14"
        description="Ordet står på nästan varje kartong. Standarden bakom det är smalare än marknadsföringen."
      >
        <Prose>
          <p>
            <strong>EN 1822</strong> delar in filter i tre grupper: EPA är
            klasserna E10 till E12, HEPA är H13 och H14, och ULPA går från U15
            och uppåt. Bara H13 och H14 är HEPA.
          </p>
          <p>
            Formuleringar som HEPA-typ, HEPA-liknande eller bara HEPA utan
            siffra betyder i regel ett E11- eller E12-filter. Skillnaden är stor
            vid den partikelstorlek som är svårast att fånga, och den syns inte
            på kartongen.
          </p>
          <p>
            <strong>Titta då på vad filtret fångar, och vid vilken storlek.</strong>{" "}
            Ett H13 är provat vid den svåraste partikelstorleken, kring 0,1 till
            0,2 mikrometer. Ett tal som gäller vid 0,3 mikrometer är ett
            betydligt lättare prov, och 99,97 procent vid 0,3 säger därför
            mindre än samma tal vid 0,1.
          </p>
          <p>
            <strong>Fyra nivåer bland apparaterna här.</strong> De tre
            Levoit-modellerna och Cleverio har ett H13. Shark och Xiaomi Smart
            Pet Care har ingen klass men anger 99,97 respektive 99,99 procent
            vid 0,1 till 0,3 mikrometer, alltså mätt där det är svårt. Xiaomi
            Mijia 6 anger 99,98 procent, men bara vid 0,3. Och Rubicsons
            jonisator har inget HEPA-filter över huvud taget, bara ett
            elektrostatiskt filter och ett VOC-filter.
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
        title={`De ${products.length} bästa luftrenarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla åtta"
        description="Börja med Reningsteknik, som visar om apparaten lägger till något utöver filtret. Gå sedan till Angiven avskiljning, och läs partikelstorleken lika noga som procenten."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Uppgifterna kommer från tillverkarnas specifikationer, manualer och supportsvar samt butikens produktsidor, och specarna är kompletterade 2026-08-06. Ett streck betyder att uppgiften inte finns publicerad någonstans vi hittat, inte att egenskapen saknas.`)}
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
            <strong>Vi har inte mätt något ozon.</strong> Allt vi säger om ozon
            kommer från Kemikalieinspektionens och Elsäkerhetsverkets rapport,
            som vi läst i sin helhet, och från vad butiken skriver om enskilda
            produkter. Rapporten namnger inte de fyra apparater som föll, så vi
            vet inte om någon av dem finns bland de åtta.
          </p>
          <p>
            <strong>Tre av åtta är samma fabrikat.</strong> Levoit tar plats
            ett, två och fyra. Det beror på att de har ett angivet H13 och
            samtidigt renar med filter enbart, alltså exakt vad de två tyngsta
            kriterierna mäter. Cleverio gör samma sak för en tredjedel av
            priset och ligger trea. Det är inte en preferens för märket.
          </p>
          <p>
            <strong>Vi har inget kriterium för oberoende test.</strong> Det såg
            först ut att finnas ett: en svensk redaktion uppges ha testat med
            poäng, vilket hade blivit den första kategorin på sajten med verklig
            provning bakom sig. Uppgiften kom från en sökmotorsammanfattning och
            gick inte att bekräfta i original, och båda produkterna i den visade
            sig vara en utgången modell respektive en proffsprodukt för 11 990
            kronor. Vi använder den därför inte.
          </p>
          <p>
            <strong>Alla åtta länkar går till Kjell.</strong> De är den enda av
            de stora kedjorna med en egen luftrenarkategori där hela
            sortimentet har pris och specifikation på varje modell. Vi skriver hellre samma butiksnamn
            åtta gånger än hittar på ett pris.
          </p>
          <p>
            <strong>Dyson finns inte med, och vi hade velat ha den.</strong> Vi
            hittade inget pris: varken Dyson själva eller fem svenska butiker
            skriver ut vad den kostar. En produkt vars pris vi inte läst rankar
            vi inte. Den ligger bland de övervägda med
            skälet utskrivet.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje luftrenare"
        description="Alla åtta bedöms mot samma fem kriterier. Talen kommer från tillverkarnas specifikationer och manualer, inte från mätningar vi gjort."
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
        id="andra-luftrenare"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster som inte hamnade i rankningen, inklusive en utgången testvinnare och en proffsprodukt för 11 990 kronor."
      >
        <ConsideredList items={LUFTRENARE_CONSIDERED} />
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
          footnote={`De två första kriterierna väger tillsammans 50 av 100, eftersom de svarar på var sin halva av samma fråga: vad apparaten lägger till utöver filtret, och vad filtret fångar.\n\nVi har inte mätt ozon, och rapporten namnger inte de produkter som föll. Reningsteknik betygsätter därför vilken teknik apparaten använder, inte ett mätvärde vi tagit fram. Där en uppgift inte finns publicerad står den som saknad, aldrig som en nolla. Priserna är hos den butik vi länkar till.`}
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
        description="En marknadskontroll från två myndigheter, standarden som avgör vad HEPA betyder, och butikens egna produktsidor."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Kategorins primärkälla är inte ett test utan en marknadskontroll.
            </strong>{" "}
            Två myndigheter köpte in tjugo apparater, mätte, provade och
            analyserade, och publicerade resultatet i en rapport på 45 sidor.
            Det är mer än något test i kategorin gör.
          </p>
          <p>
            <strong>Ingen av de sex svenska jämförelser vi läst nämner den.</strong>{" "}
            Varken Kemikalieinspektionen, Elsäkerhetsverket eller
            Giftinformationscentralen förekommer på någon av dem, sju månader
            efter granskningen. Den sida som skriver ordet ozon flest gånger är
            samtidigt en av dem som inte nämner den alls.
          </p>
        </Prose>
        <SourceList sources={LUFTRENARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={LUFTRENARE_FAQ} schema />
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
