import type { Metadata } from "next";

import { FONSTERPUTSROBOT, testPageTrail } from "@/lib/test-pages";
import { FONSTERPUTSROBOT_SOURCES } from "@/lib/sources";
import {
  FONSTERPUTSROBOT_CONSIDERED,
  FONSTERPUTSROBOT_FAQ,
  FONSTERPUTSROBOT_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/fonsterputsrobot";
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

import Kopguide from "@/content/fonsterputsrobot/kopguide.mdx";

/*
 * ⚠️ Priser, GTIN, hålltider, linans hållfasthet och glasregler är riktiga,
 * lästa 2026-08-04 hos butiken vi länkar till eller i tillverkarens egen
 * manual. Kriteriebetygen är redaktionell bedömning. Vi har inte hängt någon
 * robot i något fönster och inte belastat någon lina.
 *
 * SIDANS SVAR: Kärcher RCW 2 är billigast (2 190 kr) och sitter kvar längst
 * (40 min). Har du båglöst glas är Ecovacs W1 Pro det enda alternativet.
 *   Linans hållfasthet: HOBOT-388 200 kg. Övriga okänt.
 *   Hålltid vid strömavbrott: Kärcher 40 min (0,65 Ah / 14,8 V), Ecovacs W2/W3
 *     "mer än 30", HOBOT-388 20 min, W1 Pro / Mini / 2S okänt.
 *   Båglöst glas: HOBOT förbjuder, Ecovacs W1 Pro tillåter med 10 cm marginal.
 *
 * ⚠️ VAD SOM SAKNAS ÄR INTE SIDANS ÄMNE. Läsartexten säljer produkten. Det som
 * saknas står som "-" i tabellen och förklaras i viktningen under testmetod.
 * Ingen rubrik, ingress, omdöme, tagline, pro/con eller FAQ-svar får handla om
 * vad en tillverkare har eller inte har publicerat.
 *
 * ⚠️⚠️ LÅNA ALDRIG ETT SÄKERHETSTAL MELLAN MODELLER. Att fylla i W2:s siffra
 * för W1 Pro vore att lova en marginal vi inte vet finns.
 *
 * ⚠️ Den svenska frågan är spröjsen: Kärcher anger minsta fönster 35 × 35 cm,
 * och mindre rutor är vanliga i äldre svenska hus.
 *
 * ⚠️ Ingen oberoende provning finns. Källorna är tillverkarnas egna manualer,
 * och det står på sidan.
 *
 * AFFILIATE-SWAP — LINK_MODE styr formen på länkarna. Se lib/links.ts.
 */

const TEST_PAGE = FONSTERPUTSROBOT;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Kärcher RCW 2 vinner för 2 190 kronor: billigast av sju robotar och den som sitter kvar längst när strömmen går, 40 minuter. Har du båglösa rutor tar du Ecovacs Winbot W1 Pro. Vi jämförde sju fönsterputsrobotar från 2 190 till 6 026 kronor.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "sakerhetstalen", label: "200 kilo, 40 minuter, och tystnaden" },
  { id: "sprojsen", label: "35 × 35 cm avgör om den passar dina fönster" },
  { id: "jamforelse", label: "Jämför alla sju" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "recensioner", label: "Recensioner av varje robot" },
  { id: "andra-robotar", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function FonsterputsrobotPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = FONSTERPUTSROBOT_PRODUCTS;
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
              Roboten hänger på utsidan av ett fönster, ofta flera våningar upp.
              Tre uppgifter avgör om det är rimligt: vad säkerhetslinan tål, hur
              länge roboten sitter kvar om strömmen går, och vilket glas den får
              sitta på. Ingen tillverkare publicerar alla tre. Vi jämförde sju
              robotar från 2 190 till 6 026 kronor på just de uppgifterna.
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
        id="sakerhetstalen"
        width="default"
        title="200 kilo, 40 minuter, och tystnaden däremellan"
        description="Tre uppgifter avgör vad som händer när något går fel. Ingen tillverkare publicerar alla tre."
      >
        <Prose>
          <p>
            <strong>Vad linan tål.</strong> HOBOT-388 anger att säkerhetslinan
            klarar en stötkraft på <strong>200 kilo</strong>. Kärcher och Ecovacs
            skriver att en lina medföljer och sedan ingenting.
          </p>
          <p>
            <strong>Hur länge den sitter kvar om strömmen går.</strong> Kärcher
            RCW 2 anger <strong>40 minuter</strong>, och publicerar batteriet
            bakom talet: litiumjon, 0,65 amperetimmar, 14,8 volt. Ecovacs anger
            mer än 30 minuter för W2 och W3. HOBOT-388 anger 20.{" "}
            <strong>Ecovacs Winbot W1 Pro anger ingen tid alls.</strong>
          </p>
          <p>
            <strong>Vilket glas den får sitta på.</strong> Här säger två
            tillverkare motsatta saker. HOBOT-388 förbjuder båglöst glas rakt ut.
            Ecovacs tillåter det på W1 Pro men kräver tio centimeters marginal
            till kanten.
          </p>
          <p>
            <strong>Skillnaderna är praktiska, inte tekniska.</strong> Går
            säkringen medan roboten sitter på ett sovrumsfönster två våningar upp
            har du antingen fyrtio minuter på dig eller tjugo. En robot väger ett
            par kilo, och när linan tar emot ett fall blir kraften betydligt
            större än vikten, vilket är varför 200 kilo inte är överdrivet utan
            ungefär vad som behövs.
          </p>
          <p>
            <strong>
              Ett tal med sina egna data bakom går att kontrollera.
            </strong>{" "}
            Kärcher publicerar batteriets kapacitet och spänning bredvid
            hålltiden. Ecovacs skriver &quot;mer än 30 minuter&quot;, vilket är
            ett golv och inte en mätning. Skillnaden mellan de två sorternas uppgift är
            värd att känna till innan man jämför dem som om de vore samma sak.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------- the swedish bit -- */}
      <Section
        id="sprojsen"
        tone="muted"
        width="default"
        title="35 × 35 cm avgör om den passar dina fönster"
        description="Den vanligaste orsaken till att ett köp inte fungerar, och nästan ingen skriver ut måttet."
      >
        <Prose>
          <p>
            Kärcher anger minsta fönster till <strong>35 × 35 centimeter</strong>.
            Det är den enda storleksuppgiften någon tillverkare i jämförelsen
            skriver ut.
          </p>
          <p>
            <strong>Spröjsade fönster är den svenska frågan här.</strong> Har du
            rutor mindre än så fungerar ingen robot: den får inte fäste, och även
            om den gjorde det finns ingen yta att köra på. Äldre svenska hus är
            fulla av sådana fönster, och det är ett mått du kan ta med ett
            måttband på två minuter.
          </p>
          <p>
            <strong>Ecovacs ställer ett annat krav.</strong> Winbot W1 Pro
            kräver en båge på minst 5 millimeter, glas på minst 3 millimeter och
            speglar på minst 4. Det är den mest detaljerade beskrivningen av
            glaset i hela jämförelsen, och den kommer från den robot som säger
            minst om säkerheten.
          </p>
          <p>
            <strong>Kanterna blir aldrig klara, oavsett modell.</strong> Duken
            sitter innanför chassit, så det blir alltid en remsa kvar mot bågen,
            och i hörnen blir remsan bredast. Räkna med en trasa i handen efteråt
            om fönstret ska se putsat ut ända ut.
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
        title={`De ${products.length} bästa fönsterputsrobotarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sju"
        description="De tre översta raderna är de som avgör om roboten är rimlig att hänga utanför ett fönster."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(
            PRICE_CHECKED,
            "Alla uppgifter om linans hållfasthet, hålltid vid strömavbrott och glas är tillverkarnas egna, lästa i deras manualer och produktsidor och inte i butikstext. Där en rad står som ej angiven publicerar tillverkaren ingen uppgift. Vi fyller aldrig i ett tal från en systermodell: att Winbot W2 anger mer än 30 minuter säger ingenting om W1 Pro, som inte anger något alls. Priserna skiljer ovanligt mycket mellan svenska butiker i den här produktgruppen, så kontrollera minst två innan du köper.",
          )}
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
              Vi har inte hängt någon robot i något fönster och inte belastat
              någon lina.
            </strong>{" "}
            Varje tal om hållfasthet, hålltid och glas är tillverkarens eget,
            läst i deras manual eller på deras produktsida.
          </p>
          <p>
            <strong>Det finns ingen oberoende provning att luta sig mot.</strong>{" "}
            Vi hittade ingen provning av fönsterputsrobotar hos Råd & Rön,
            Stiftung Warentest eller någon annan redaktion vi normalt läser. Det
            är ovanligt för en produkt i den här prisklassen som dessutom hänger
            utanför ett fönster, och det betyder att det enda som går att jämföra
            är vad tillverkarna själva skriver.
          </p>
          <p>
            <strong>Därför väger vi också själva redovisningen.</strong> En robot
            som skriver ut sin hålltid får kredit för det, och en som tiger får
            avdrag, även om den tigande mycket väl kan vara den säkrare av de två.
            Vi kan bara bedöma det som går att kontrollera i förväg, och det står
            här i stället för att döljas.
          </p>
          <p>
            <strong>Sex av de sju är Ecovacs, HOBOT eller Kärcher.</strong> Det
            beror på att det svenska sortimentet är litet. Xiaomi Hutt DDC55 är
            billigast av allt vi sett men ligger bland de övervägda, eftersom vi
            inte hittade en enda publicerad uppgift om lina, hålltid eller glas
            för den.
          </p>
          <p>
            <strong>Sortimentet krymper.</strong> Clas Ohlson har kvar två äldre
            Winbot-sidor med kundomdömen men utan pris och utan lagerstatus i
            butikens egna produktdata. En produktsida som ligger kvar är inte
            samma sak som en produkt som säljs.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje robot"
        description="Alla sju bedöms mot samma fem kriterier. Uppgifterna är tillverkarens egna, inte kontrollerade av oss."
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
        id="andra-robotar"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster som inte hamnade i rankningen, en av dem för att ingen uppgift om säkerheten gick att hitta."
      >
        <ConsideredList items={FONSTERPUTSROBOT_CONSIDERED} />
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
          footnote="Säkerhet på höjd väger 30 av 100 eftersom produkten sitter på utsidan av ett fönster och faller om den lossnar. Kriteriet belönar att uppgiften publiceras minst lika mycket som att talet är imponerande: en utskriven hålltid går att kontrollera, en utelämnad går inte. Fönstertyp och mått väger 25 eftersom det är den fråga som oftast gör att köpet inte fungerar, och eftersom tillverkarna säger så olika saker att en modell förbjuder båglöst glas medan en annan tillåter det. Rengöring väger 20 och bedöms ur hur vattnet fördelas, inte ur sugkraften i pascal, som är vidhäftning. Där en tillverkare inte publicerar en uppgift står den som ej angiven, aldrig som en nolla, och vi fyller aldrig i ett tal från en systermodell. Vi har inte hängt någon robot i något fönster, inte belastat någon lina och inte mätt någon rengöring. Priserna är hos den butik vi länkar till."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi provar inte robotarna fysiskt. Det här är vad vi gör i stället."
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
        description="Fyra tillverkarmanualer och produktsidor, lästa i original."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Samtliga källor är tillverkarnas egna, och det är ovanligt för oss.
            </strong>{" "}
            Skälet är att ingen oberoende redaktion vi läser har provat
            fönsterputsrobotar. När det inte finns någon provning är
            tillverkarens manual det enda som går att jämföra, och då blir
            skillnaden mellan vad de skriver själva fyndet.
          </p>
          <p>
            <strong>Läs manualen före produktbladet.</strong> Förbudet mot
            båglöst glas hos HOBOT och kravet på tio centimeters marginal hos
            Ecovacs står båda i manualen och i inget av produktbladen.
          </p>
        </Prose>
        <SourceList sources={FONSTERPUTSROBOT_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={FONSTERPUTSROBOT_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
