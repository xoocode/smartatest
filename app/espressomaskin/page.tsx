import type { Metadata } from "next";

import { testPageTrail, ESPRESSOMASKIN } from "@/lib/test-pages";
import { SOURCES_BY_HREF } from "@/lib/sources";
import {
  PRICE_CHECKED,
  ESPRESSOMASKIN_FAQ,
  ESPRESSOMASKIN_CONSIDERED,
  ESPRESSOMASKIN_PRODUCTS,
} from "@/lib/data/espressomaskin";
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

import Kopguide from "@/content/espressomaskin/kopguide.mdx";

/*
 * Sidan i gruppen Kök som gruppens beskrivning i lib/catalog.ts räknade upp som
 * en av sex möjliga. Byggd 2026-08-07.
 *
 * ⚠️ SIDAN RANKAR HELAUTOMATER, alltså bönmaskiner med inbyggd kvarn, mellan
 * 2 700 och 14 888 kronor. Portafiltermaskinen ligger bland de övervägda, efter
 * användarbeslut. Ordet espressomaskin betyder båda i svensk handel: Råd & Rön
 * och Elgiganten menar helautomaten, medan Coffee Friend i sin egen meny delar
 * `Espressomaskiner` från `Helautomatiska kaffemaskiner`.
 *
 * ⚠️ MJÖLKSYSTEMET VÄGER 25 EFTER EN MÄTNING, inte efter en känsla. Bland
 * samtliga 54 helautomater i lager under 15 500 kr fördelar sig systemet på 30
 * slangsystem, 14 integrerad behållare, 6 manuell ångstav, 3 automatisk
 * skummare och 1 utan. Fyra lösningar med jämn fördelning är en axel.
 *
 * ⚠️ TVÅ EGENSKAPER ÄR GRINDAR OCH BÄR DÄRFÖR INGEN VIKT. `Portionsval för
 * svart kaffe` anger 2 hos 52 av 54, och `Antal bönbehållare` anger 1 hos 42 av
 * 54. Samma beslut som maxtemperaturen på /pizzaugn.
 *
 * ⚠️ INGET TESTOMDÖMEKRITERIUM, trots att kategorin har två fritt läsbara
 * provningar. Råd & Röns test av 57 maskiner är gratis men från 2021-11-24, och
 * Ljud & Bilds två grupptest täcker fyra maskiner vardera varav två av våra
 * tolv. Båda återges som prosa per modell med publikationen namngiven och
 * påverkar ingen poäng. Samma hantering som M3.se på /stavmixer.
 *
 * ⚠️ KAFFETEMPERATUREN BÄR INGEN VIKT, trots att den är kategorins mest
 * omtalade tal. Råd & Rön mätte 53 till 71 grader och skriver själva att
 * sambandet med smaken inte går att se.
 *
 * ⚠️ ETT TESTOMDÖME SOM INTE FLYTTADES. Ljud & Bilds omdöme om Siemens EQ900
 * gäller en variant med två bönbehållare; Siemens egen produktsida för
 * TQ903R09 anger en. Betyget står därför inte i produktens omdöme.
 *
 * Priser, artikelnummer och EAN är lästa i produktsidornas egen JSON-LD hos
 * butiken på PRICE_CHECKED. Specifikationerna är kontrollerade mot tillverkaren
 * där de bär vikt.
 *
 * AFFILIATE-SWAP — se lib/links.ts för vad LINK_MODE står på i dag.
 */

const TEST_PAGE = ESPRESSOMASKIN;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-07";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Melitta Barista T Smart vinner för 8 550 kronor, med två bönkammare så koffeinfritt på kvällen kostar ett handgrepp. Vill du bara ha cappuccino med ett tryck räcker Philips 3300 LatteGo för 4 999. Det som växer med priset är mjölkautomatiken: den dyraste maskinen har sex malningssteg, den näst billigaste har tretton.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "priset-koper-mjolken", label: "Priset köper mjölken, inte kaffet" },
  { id: "jamforelse", label: "Jämför alla tolv" },
  { id: "recensioner", label: "Recensioner av varje espressomaskin" },
  { id: "andra-espressomaskiner", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function EspressomaskinPage() {
  const style = await getStyle();
  const products = ESPRESSOMASKIN_PRODUCTS;
  const [winner] = products;
  const author = DEFAULT_AUTHOR;
  const reviewer = DEFAULT_REVIEWER;
  const sources = SOURCES_BY_HREF[PAGE_URL] ?? [];

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
            {/* H1 bär fyndet: prislappen köper mjölkautomatik, inte kaffe. */}
            <h1 className="text-h1">
              Espressomaskin bäst i test 2026: priset köper mjölken, inte kaffet
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Köp Melitta Barista T Smart för 8 550 kronor. Den är den enda här
              med två bönkammare, så koffeinfritt på kvällen kostar ett
              handgrepp i stället för att du häller ur behållaren. Vill du bara
              ha cappuccino med ett tryck räcker Philips 3300 LatteGo på
              4 999 kronor, som har samma kvarn som Philips maskiner för det
              dubbla. Och läs prislappen rätt: det som växer med den är
              mjölkautomatiken och menyn, inte malningen. Maskinen för
              14 888 kronor har sex malningssteg, den för 3 159 har tretton.
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

      {/* --------------------------------------------------- the finding -- */}
      <Section
        id="priset-koper-mjolken"
        width="default"
        title="Priset köper mjölken, inte kaffet"
        description="Mellan 2 700 och 14 888 kronor växer mjölkautomatiken och menyn. Kvarnen går åt andra hållet."
      >
        <Prose>
          <p>
            <strong>
              Det säkraste du får för en högre prislapp är att slippa hålla i
              mjölkkannan.
            </strong>{" "}
            Under 4 000 kronor har varenda maskin här en manuell ångstav, alltså
            ungefär en minut per cappuccino med kannan i handen. Från
            4 790 kronor kommer mjölkdrycken med ett tryck, och från
            8 550 kommer den två gånger utan att du flyttar koppen. Det är en
            verklig skillnad i vardagen, och den är värd pengar. Den handlar
            bara inte om kaffet.
          </p>
          <p>
            <strong>Kvarnen blir grövre ju mer du betalar.</strong> De&rsquo;Longhi
            Magnifica S kostar 3 159 kronor och har tretton malningssteg.
            Siemens EQ900 kostar 14 888 och har sex. Nivona CafeRomatica NICR
            550 kostar 6 440 och har fyra, den grövsta upplösningen bland de
            tolv. Malningsgraden styr hur länge vattnet är i kontakt med kaffet
            och är den inställning som gör mest för smaken: för grovt ger tunn
            och sur espresso, för fint ger besk. Fyra steg räcker om du köper
            samma böna år efter år och blir snålt så fort du byter rostgrad.
          </p>
          <p>
            <strong>
              Råd & Rön mätte kaffets temperatur i 57 helautomater och fann inget
              samband med smaken.
            </strong>{" "}
            Spridningen var stor, från 53 grader i koppen till 71, mot de 67
            grader som brukar anges som idealet för espresso. Ändå skriver de
            att det inte går att se ett samband mellan låg temperatur och mindre
            gott kaffe. Det är skälet till att inget kriterium här väger
            temperaturen: talet finns i tabellen, men det förutsäger inte vad du
            får i koppen.
          </p>
          <p>
            <strong>
              Ljud & Bild provade de fyra dyraste maskinerna på marknaden och
              underkände den mest utrustade.
            </strong>{" "}
            Om Siemens EQ900 skriver de att den slår konkurrenterna på
            utrustning och pris men förlorar på den viktigaste egenskapen, och
            att espresso, americano och cappuccino ur den ligger under
            genomsnittet. Året efter provade samma skribent mellanklassen och
            gav en De&rsquo;Longhi för 10 500 kronor omdömet att den gör den överlägset
            mest välsmakande espresson i testet, och att det är långt ner till
            den näst bästa.
          </p>
          <p>
            <strong>
              Skötseln påverkade inte heller smaken, och det är den mest
              förvånande mätningen i kategorin.
            </strong>{" "}
            Råd & Rön tog två maskiner vardera från fyra tillverkare och lät dem
            brygga 2 500 koppar var, vilket motsvarar över ett års användning
            för en storkonsument. Den ena skulle skötas enligt instruktionen,
            den andra fick bara sumplådan tömd och vattnet påfyllt. Efter
            2 500 koppar smakade kaffet ur de ovårdade maskinerna lika bra.
            Rengöring handlar alltså om maskinens livslängd och din tid, inte om
            koppen, och det är därför skötselkriteriet väger 15 och inte mer.
          </p>
          <p>
            <strong>Vad som ändå gör skillnad i skötseln är en sak:</strong> om
            bryggenheten går att lyfta ur. Elva av de tolv maskinerna här går att
            öppna, ta ut bryggenheten och skölja den under kranen. Krups Evidence
            ECO har den fast monterad, vilket betyder att kaffefettet bara kan
            angripas med rengöringstabletter genom maskinens eget program. Det
            är en löpande kostnad och en sak du inte kan göra själv den dagen
            maskinen börjar smaka gammalt.
          </p>
          <p>
            <strong>Ingen av maskinerna kyler mjölken.</strong> Några har
            behållaren stående på maskinen, några suger mjölken genom en slang
            direkt ur paketet, men i samtliga fall ska mjölken ur kylen när du
            ska ha den och tillbaka efteråt. Slanglösningen är den enda som inte
            lämnar något att diska, eftersom paketet är behållaren.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa espressomaskinerna 2026`}
        description="Varje maskin passar ett eget kök och en egen morgon. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tolv"
        description="Samma fem kriterier och samma viktning för alla tolv."
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
        title="Recensioner av varje espressomaskin"
        description="Alla tolv bedöms mot samma fem kriterier."
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
        id="andra-espressomaskiner"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Sex maskiner som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={ESPRESSOMASKIN_CONSIDERED} />
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
          footnote="Mjölksystemet väger 25 därför att det är den enda egenskapen som både delar fältet jämnt och ändrar vad du gör varje morgon: bland samtliga 54 helautomater i lager under 15 500 kronor har 30 slang ner i mjölkpaketet, 14 en behållare på maskinen, 6 en manuell ångstav och 3 en automatisk skummare. Två egenskaper bär däremot ingen vikt trots att de låter viktiga, eftersom de inte skiljer maskinerna åt: 52 av 54 kan brygga två svarta koppar samtidigt, och 42 av 54 har en bönbehållare. Kaffetemperaturen bär ingen vikt heller, men av ett annat skäl: Råd & Rön mätte 53 till 71 grader i 57 maskiner och skriver att sambandet med smaken inte går att se. Det finns inget kriterium för testomdöme. Råd & Röns provning är fritt läsbar men publicerad 2021, och Ljud & Bilds två grupptest täcker fyra maskiner vardera, varav två av de tolv här. Deras omdömen står utskrivna vid de modeller de gäller, med publikationen namngiven, och påverkar ingen poäng. Priser, artikelnummer och EAN är lästa på butikens egen produktsida och daterade, och specifikationerna är kontrollerade hos tillverkaren."
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
        description="Råd & Röns provning av 57 helautomater med tio blindtestande kaffeexperter, Ljud & Bilds två grupptest och tillverkarnas egna produkt- och serviceanvisningar."
      >
        <SourceList sources={sources} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={ESPRESSOMASKIN_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
