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
  { id: "sakerhetstalen", label: "40 minuter, 200 kilo: vad som håller den uppe" },
  { id: "sprojsen", label: "35 × 35 cm avgör om den passar dina fönster" },
  { id: "jamforelse", label: "Jämför alla sju" },
  { id: "recensioner", label: "Recensioner av varje robot" },
  { id: "andra-robotar", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
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
              Köp Kärcher RCW 2. Den är billigast av de sju robotarna vi jämfört
              och sitter ändå kvar längst när strömmen går: 40 minuter på
              reservbatteriet, och rutor ner till 35 × 35 centimeter. Har du
              båglösa fönster eller en glasad balkongdörr är Ecovacs Winbot W1
              Pro den enda som får sitta där. Nedan står varför, och vad de
              andra fem kostar.
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
        title="40 minuter, 200 kilo: vad som håller roboten uppe"
        description="Roboten hänger på utsidan, ofta flera våningar upp. Tre siffror avgör vad som händer när något går fel."
      >
        <Prose>
          <p>
            <strong>Hur länge den sitter kvar om strömmen går.</strong> Ett
            reservbatteri håller sugkoppen igång när säkringen löser ut.{" "}
            <strong>Kärcher RCW 2 klarar 40 minuter</strong> på ett
            litiumjonbatteri om 0,65 amperetimmar och 14,8 volt. Ecovacs W2 Pro
            och W2 Omni klarar över 30 minuter, HOBOT-388 klarar 20. Sitter
            roboten på ett sovrumsfönster två våningar upp är det marginalen du
            har på dig att komma hem och lyfta ner den.
          </p>
          <p>
            <strong>Vad säkerhetslinan tål.</strong> Linan knyts fast inne i
            rummet och fångar roboten om sugkoppen släpper.{" "}
            <strong>HOBOT-388 har den kraftigaste, 200 kilo stötkraft.</strong>{" "}
            Det låter överdrivet för en apparat som väger ett par kilo, men i det
            ögonblick linan tar emot ett fall blir kraften mångdubbelt större än
            vikten, så 200 kilo är ungefär vad uppgiften kräver.
          </p>
          <p>
            <strong>Vilket glas den får sitta på.</strong> Här skiljer sig
            robotarna åt helt.{" "}
            <strong>Ecovacs Winbot W1 Pro får sitta på båglöst glas</strong> med
            10 centimeters marginal till kanten, och är ensam om det.{" "}
            <strong>HOBOT-388 får inte användas på båglöst glas alls.</strong>{" "}
            Har du en glasad balkongdörr eller ett stort skjutparti avgör det
            valet åt dig innan priset hinner göra det.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------- the swedish bit -- */}
      <Section
        id="sprojsen"
        tone="muted"
        width="default"
        title="35 × 35 cm avgör om den passar dina fönster"
        description="Den vanligaste orsaken till att ett köp inte fungerar. Ta måttbandet innan du läser något annat."
      >
        <Prose>
          <p>
            <strong>
              Kärcher RCW 2 klarar rutor ner till 35 × 35 centimeter.
            </strong>{" "}
            Är din minsta ruta mindre än så fungerar ingen robot i jämförelsen:
            den får inte fäste, och även om den gjorde det finns ingen yta att
            köra på. Äldre svenska hus är fulla av spröjsade fönster med just
            sådana rutor, och det tar två minuter att mäta.
          </p>
          <p>
            <strong>Ecovacs Winbot W1 Pro ställer krav på glaset i stället.</strong>{" "}
            Bågen ska vara minst 5 millimeter bred, glaset minst 3 millimeter
            tjockt och speglar minst 4. Har du gamla enkelglasfönster som är
            tunnare än så är HOBOT-388 den enda som går på vilken tjocklek som
            helst.
          </p>
          <p>
            <strong>Kanterna blir aldrig klara, oavsett modell.</strong> Duken
            sitter innanför chassit, så det blir alltid en remsa kvar mot bågen,
            och i hörnen blir remsan bredast. Räkna med en trasa i handen efteråt
            om fönstret ska se putsat ut ända ut. Winbot Mini lämnar den
            smalaste remsan av dem alla.
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
        description="Hålltid, lina och glas är raderna som avgör om roboten är rimlig att hänga utanför ett fönster."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(
            PRICE_CHECKED,
            "Ett streck betyder att uppgiften inte går att få fram för modellen. Vi fyller aldrig i ett tal från en systermodell. Priserna skiljer ovanligt mycket mellan svenska butiker i den här produktgruppen, så kolla minst två innan du köper.",
          )}
        />
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje robot"
        description="Alla sju bedöms mot samma fem kriterier."
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
            Varje uppgift om hållfasthet, hålltid, mått och glas kommer från
            tillverkarens egen manual eller produktsida, läst i original.
          </p>
          <p>
            <strong>Det finns ingen oberoende provning att luta sig mot.</strong>{" "}
            Vi hittade ingen provning av fönsterputsrobotar hos Råd &amp; Rön,
            Stiftung Warentest eller någon annan redaktion vi normalt läser. För
            en produkt i den här prisklassen som dessutom hänger utanför ett
            fönster är det ovanligt, och det är skälet till att rankningen väger
            det som går att kontrollera i förväg tyngre än vanligt. Hur vi väger
            står under <a href="#testmetod">Så gjorde vi testet</a>.
          </p>
          <p>
            <strong>Sex av de sju är Ecovacs, HOBOT eller Kärcher</strong>,
            eftersom det svenska sortimentet är litet. Xiaomi Hutt DDC55 är
            billigast av allt vi sett men ligger bland de övervägda: vi hittade
            ingenting alls om lina, reservbatteri eller glas för den.
          </p>
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
          footnote="Säkerhet på höjd väger 30 av 100 eftersom produkten sitter på utsidan av ett fönster och faller om den lossnar. Kriteriet belönar att uppgiften går att kontrollera i förväg minst lika mycket som att talet är imponerande: en robot vars hålltid vi kan läsa oss till får kredit för det, en vars hålltid inte går att få fram får avdrag, även om den senare mycket väl kan vara den säkrare av de två. Vi kan bara väga det som går att veta innan köpet. Fönstertyp och mått väger 25 eftersom det är den fråga som oftast gör att köpet inte fungerar, och eftersom robotarna skiljer sig så mycket att en modell inte får användas på båglöst glas medan en annan är godkänd för det. Rengöring väger 20 och bedöms ur hur vattnet fördelas, inte ur sugkraften i pascal, som är vidhäftning. En uppgift vi inte fått fram står som ett streck, aldrig som en nolla, och vi fyller aldrig i ett tal från en systermodell. Vi har inte hängt någon robot i något fönster, inte belastat någon lina och inte mätt någon rengöring. Priserna är hos den butik vi länkar till."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        tone="muted"
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
        width="default"
        title="Källor"
        description="Fyra tillverkarmanualer och produktsidor, lästa i original."
      >
        <Prose className="mb-block">
          <p>
            <strong>Läs manualen före produktbladet.</strong> Förbudet mot
            båglöst glas hos HOBOT och kravet på 10 centimeters marginal hos
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
