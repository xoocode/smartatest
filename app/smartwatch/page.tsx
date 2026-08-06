import type { Metadata } from "next";

import { testPageTrail, SMARTWATCH } from "@/lib/test-pages";
import { SMARTWATCH_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  SMARTWATCH_FAQ,
  SMARTWATCH_CONSIDERED,
  SMARTWATCH_PRODUCTS,
} from "@/lib/data/smartwatch";
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

import Kopguide from "@/content/smartwatch/kopguide.mdx";

/*
 * ⚠️ Produkter, priser och lagerstatus är verkliga, lästa hos Proshop, Kjell
 * och Komplett på PRICE_CHECKED. Varenda batteritid är hämtad hos tillverkaren
 * och aldrig hos butiken, eftersom butikens tal är hela sidans fynd.
 *
 * ⚠️ SIDAN HAR INGET TESTOMDÖMEKRITERIUM. Råd & Rön har provat 57 modeller i
 * labb, publicerat 2026-06-09. Testet kostar 59 kronor och är INTE köpt, efter
 * användarbeslut. Vi vet alltså inte vilken modell som vann och påstår det
 * aldrig. Metoden och de fritt publicerade allmänna slutsatserna återges.
 * Deras sidfot förbjuder all vidarepublicering av testresultat.
 *
 * ⚠️ GPS-BATTERITIDEN BÄR INGEN VIKT, trots att den är sidans starkaste
 * uppgift. Apple publicerar inget sådant tal för någon av sina tre modeller,
 * och ett avdrag för en uppgift vi inte fått fram mäter vår efterforskning.
 * Se ALDRIG_BEDOMD i lib/spec-schema.mjs.
 *
 * ⚠️ VI BERÖMMER ALDRIG EN TILLVERKARE FÖR ATT DEN PUBLICERAR SINA TAL. Huawei
 * anger fyra lägen och Apple hela sitt testrecept; talen används, berömmet
 * inte. Det som betygsätts är hur länge klockan går.
 *
 * ⚠️ TVÅ AV SJU KONKURRENTER GÖR HALVA FYNDET. Testkollen har en kolumn för
 * GPS-läge och bast-i-test.se skriver ut både smartwatchläge och GPS-läge.
 * Påstå aldrig att ingen tar upp det.
 *
 * AFFILIATE-SWAP — se lib/links.ts för vad som ligger i href.
 */

const TEST_PAGE = SMARTWATCH;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Huawei Watch GT 6 Pro för 3 890 kr vinner: tolv dagars batteritid, satellit på två band och fungerar med både iPhone och Android. Vi jämför elva smartklockor från 2 972 till 9 294 kronor på batteri, hälsosensorer och träningsmätning.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "batteritiden", label: "Batteritid är ett läge, inte ett tal" },
  { id: "jamforelse", label: "Jämför alla elva" },
  { id: "recensioner", label: "Recensioner av varje klocka" },
  { id: "andra-klockor", label: "Andra klockor vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function SmartwatchPage() {
  const style = await getStyle();
  const products = SMARTWATCH_PRODUCTS;
  const [winner] = products;
  const author = DEFAULT_AUTHOR;
  const reviewer = DEFAULT_REVIEWER;

  return (
    <>
      <ProductSchema
        testPage={TEST_PAGE}
        products={products}
        pageUrl={PAGE_URL}
        author={author}
        reviewed={UPDATED}
        sections={TOC}
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
            <h1 className="text-h1">
              Smartwatch bäst i test 2026: elva klockor från 2&nbsp;972 till
              9&nbsp;294 kr
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Huawei Watch GT 6 Pro för 3 890 kronor vinner: tolv dagar mellan
              laddningarna där de flesta klarar ett eller två dygn,
              satellitmottagning på två band och EKG-sensor, och den fungerar
              med både iPhone och Android, vilket varken Apple, Samsung eller
              Google gör. Tränar du på riktigt är Garmin Venu 4 för 5 250
              kronor den enda här med ett EKG godkänt i klass IIa, och ska varje
              krona räknas ger Amazfit Balance 2 tjugoen dagar och 10 ATM för
              3&nbsp;490.
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
        <TocNav variant="inline" entries={TOC} className="mt-block lg:hidden" />
      </Section>

      {/* ---------------------------------------- fyndet, före tabellen -- */}
      <Section
        id="batteritiden"
        width="default"
        title="Batteritid är ett läge, inte ett tal"
      >
        <Prose>
          <p>
            Ordet <em>batteritid</em> bär arton timmar i den ena änden av den
            här jämförelsen och trettio dygn i den andra. Det är en faktor
            fyrtio mellan två produkter i samma prisklass, och det låter som en
            enorm skillnad i batteri. Till stor del är det något annat: en
            skillnad i vad klockan gjorde medan talet mättes.
          </p>
          <p>
            Garmin mäter Venu 4 i sju lägen. I smartwatchläge går
            45-millimetersmodellen tolv dagar. Med alla satellitsystem och musik
            igång går samma klocka nio timmar. Mellan de två talen ligger en
            faktor trettiotvå, och det är samma klocka på samma arm.
          </p>
          <p>
            Samsung mäter Galaxy Watch Ultra i fyra lägen och skriver ut alla
            fyra i sin egen spectabell: hundra timmar i energibesparing, åttio
            med skärmen släckt, sextio med skärmen tänd och fyrtioåtta under
            utomhusträning med satellitmottagningen igång. Huawei mäter Watch GT
            6 Pro i fyra: tjugoen dagar vid lätt användning, tolv vid normal,
            sju med alltid på-skärm och fyrtio timmar i utomhussportläget.
          </p>
          <p>
            Handeln väljer sedan ett av talen och sätter det i en punktlista
            utan villkoret. Det syns skarpast när två klockor från samma
            tillverkare står bredvid varandra i samma hylla: Galaxy Watch Ultra
            får punkten <em>Upp till 100 h batteritid</em> och den nyare Ultra2
            punkten <em>Upp till 60 timmars normal användning</em>. Efterträdaren
            ser ut att ha blivit sextiosju procent sämre. Talen kommer från två
            olika rader i samma tabell.
          </p>
          <p>
            Samma sak händer inuti en enda produktsida. En av de stora svenska
            butikerna anger Pixel Watch 4:s körtid till 72 timmar i sitt
            batterifält, medan raden två steg längre ned säger{" "}
            <em>
              alltid aktivt displayläge – upp till 40 timme/timmar,
              batterisparläge – upp till 72 timme/timmar
            </em>
            . Rubrikfältet bär alltså sparlägets tal.
          </p>
          <p>
            De två tillverkare som skriver ut hela receptet visar hur långt isär
            mätningarna ligger. Apples tjugofyra timmar bygger på att du tittar
            på klockan trehundra gånger, får nittio notiser, använder appar i
            femton minuter, tränar i en timme med musik och sover med
            sömnspårning i sex timmar. Withings trettio dagar bygger på fem
            minuters total skärmtid per dygn, med nattens syremätning avstängd
            och ett EKG var tredje dag.
          </p>
          <p>
            Trehundra blickar på ett dygn mot fem minuters skärm om dagen.
            Talen 24 timmar och 30 dagar mäter inte samma sak, och tabellen
            nedan visar därför varje läge för sig i stället för ett tal per
            klocka.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        tone="muted"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa smartklockorna 2026`}
        description="Varje klocka fick en egen utmärkelse. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla elva"
        description="Samma kriterier och samma viktning för alla elva. Raden att läsa tillsammans med batteritiden är den för GPS-läget: den säger vad klockan klarar under ett träningspass, och sex av elva tillverkare anger inget tal alls."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED)}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        tone="muted"
        width="wide"
        title="Recensioner av varje klocka"
        description="Elva klockor mellan 2 972 och 9 294 kronor, bedömda på batteritid, hälsosensorer, träningsmätning, telefonkompatibilitet och prisvärde."
      >
        <div className="flex flex-col gap-block">
          {products.map((product, i) => (
            <ProductReview key={product.id} product={product} rank={i + 1}>
              <VerdictText
                text={product.verdict}
                className="text-muted-foreground"
              />
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
        id="andra-klockor"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra klockor vi övervägde"
        description="Sju modeller som fanns i samma hyllor men inte i rankningen. Tre går inte att få hem än, två är föregående generation och två hör hemma på systersidan för träningsklockor."
      >
        <ConsideredList items={SMARTWATCH_CONSIDERED} />
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
          footnote="Vi har inte burit någon av klockorna och mäter ingenting själva. Kategorins enda svenska labbprovning är Råd & Röns test av 57 modeller från juni 2026, som mäter pulsnoggrannhet i vila, gång, löpning och cykling. Testet ligger bakom en betalvägg och är inte köpt, så vi vet inte vilken modell som vann och påstår det aldrig. Deras metod och deras fritt publicerade allmänna slutsatser återges, och sidan har därför inget kriterium för testomdöme.\n\nBatteritid väger 25 därför att spridningen är störst där och därför att det är den egenskap som märks varje dag. Betyget använder tillverkarens tal för normal vardagsanvändning, alltså det läge alla elva publicerar. Övriga lägen står som egna rader i tabellen. En tillverkare som anger fler lägen kan varken vinna eller förlora poäng på det, eftersom betyget bara läser vardagsraden.\n\nUthållighet med satellitmottagningen igång vägs inte in i något betyg, trots att det är den mest användbara siffran i kategorin. Apple publicerar inget sådant tal för Series 11, SE 3 eller Ultra 3, och ett avdrag för en uppgift vi inte fått fram mäter vår efterforskning i stället för klockan. Raden är markerad i tabellen ändå, eftersom att fylla den åt de sex som tiger hade raderat spridningen. Withings värde där är inte tomt utan Ingen egen GPS, vilket är en egenskap.\n\nTålighet är inget kriterium. Råd & Rön kommer fram till att majoriteten av klockorna får högsta betyg för repor, vatten och fall, och ett kriterium som ingen faller på rankar ingenting. Vattenklassningen vägs in under träningsmätning bara där den avgör vad klockan får användas till, alltså simning och dykning.\n\nSpecifikationer är hämtade hos tillverkaren och aldrig hos butiken. Det gjorde skillnad: en svensk butik anger Pixel Watch 4:s mottagare som enkelbands där Google själva anger dubbla frekvenser, vilket flyttade klockan två placeringar."
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
        title="Källor och andra tester"
        description="Sju tillverkares egna specifikationer, den enda svenska labbprovningen av kategorin, och de tre butiker priserna är lästa hos."
      >
        <SourceList sources={SMARTWATCH_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={SMARTWATCH_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
