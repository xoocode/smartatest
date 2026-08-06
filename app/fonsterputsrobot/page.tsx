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
 * ⚠️ Priser och GTIN lästa 2026-08-04 hos butiken vi länkar till. Mått, vikter,
 * hålltider, linans data och glasregler lästa 2026-08-06 i tillverkarnas egna
 * specifikationstabeller och manualer. Kriteriebetygen är redaktionell
 * bedömning. Vi har inte hängt någon robot i något fönster.
 *
 * SIDANS SVAR: Kärcher RCW 2 är billigast (2 190 kr) och sitter kvar längst
 * (40 min). Är rutan mindre än 35 × 35 cm är Winbot Mini den enda som kommer
 * upp på den, ner till 22 × 25.
 *   Hålltid: Kärcher 40 min (0,65 Ah / 14,8 V), W2 Pro 30, Mini 30, W2 Omni
 *     "mer än 30", HOBOT-388 och 2S 20 var, W1 Pro ej angiven.
 *   Minsta ruta: Mini 22 × 25, W2-serien och W1 Pro 30 × 40, Kärcher 35 × 35,
 *     HOBOT-2S 40 × 40, HOBOT-388 ej angiven.
 *   Båglöst glas: fyra Ecovacs godkända, HOBOT-388 förbjuder, Kärcher kräver
 *     båge enligt sin manual, HOBOT-2S ej angivet.
 *   Lina: HOBOT 4,5 m / 200 kg, W2 6 m (Omni 100 kg), Kärcher 4 m, Mini 3,3 m,
 *     W1 Pro 1,5 m.
 *
 * ⚠️ TRE PÅSTÅENDEN SOM VAR FEL TILL 2026-08-06, alla våra egna: att W1 Pro var
 * ensam om båglöst glas, att W2 Pro var sladdlös (6,7 m nätkabel), och att
 * W2 Pro var ensam om att spreja framför duken (Kärcher har två
 * ultraljudsmunstycken). Se rättelsen och kommentarerna i lib/data.
 *
 * ⚠️ VAD SOM SAKNAS ÄR INTE SIDANS ÄMNE. Läsartexten säljer produkten. Det som
 * saknas står som "-" i tabellen och ingen annanstans, och sänker inget betyg.
 *
 * ⚠️⚠️ LÅNA ALDRIG ETT SÄKERHETSTAL MELLAN MODELLER. W2 Pro Omni är en fjärde
 * apparat och dess tal gäller inte W2 Pro eller W2 Omni.
 *
 * ⚠️ Den svenska frågan är spröjsen, och spannet är 22 × 25 till 40 × 40 cm.
 *
 * AFFILIATE-SWAP — LINK_MODE styr formen på länkarna. Se lib/links.ts.
 */

const TEST_PAGE = FONSTERPUTSROBOT;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Kärcher RCW 2 vinner för 2 190 kronor: billigast av sju robotar och den som sitter kvar längst när strömmen går, 40 minuter. Är dina rutor mindre än 35 × 35 cm tar du Ecovacs Winbot Mini för 3 299 kronor, som kommer upp på 22 × 25. Vi jämförde sju fönsterputsrobotar från 2 190 till 6 026 kronor.",
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
  { id: "sprojsen", label: "22 × 25 eller 40 × 40: mät rutan innan du väljer" },
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
              Köp Kärcher RCW 2 för 2 190 kronor. Den är billigast av de sju
              robotarna vi jämfört och sitter ändå kvar längst när strömmen går:
              40 minuter på reservbatteriet, mot 20 för HOBOT-388. Är din minsta
              ruta mindre än 35 × 35 centimeter kommer den inte upp på den, och
              då är Ecovacs Winbot Mini för 3 299 kronor den enda som klarar
              22 × 25. Nedan står varför, och vad de andra fem kostar.
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
            litiumjonbatteri om 0,65 amperetimmar och 14,8 volt. Ecovacs Winbot
            W2 Pro och Winbot Mini klarar 30, W2 Omni mer än 30, och de båda
            HOBOT-modellerna 20 var. Sitter roboten på ett sovrumsfönster två
            våningar upp är det marginalen du har på dig att komma hem och lyfta
            ner den.
          </p>
          <p>
            <strong>Vad linan tål, och hur långt det räcker.</strong> Linan knyts
            fast inne i rummet och fångar roboten om sugkoppen släpper.{" "}
            <strong>HOBOT-388 och HOBOT-2S tål 200 kilo dragkraft</strong> på 4,5
            meter, W2 Omni 100 kilo på 6. Det låter överdrivet för en apparat på
            ett par kilo, men i det ögonblick linan tar emot ett fall blir
            kraften mångdubbelt större än vikten. Längden avgör var du får knyta:{" "}
            <strong>Winbot W1 Pro har 1,5 meter</strong>, vilket räcker till
            fönsterhandtaget men inte till något stadigt längre in i rummet.
          </p>
          <p>
            <strong>Vilket glas den får sitta på.</strong> Här går den skarpaste
            skiljelinjen.{" "}
            <strong>
              HOBOT-388 får inte användas på båglöst glas alls
            </strong>
            , och Kärcher RCW 2 är enligt sin manual gjord för inramade
            glasytor.{" "}
            <strong>
              Ecovacs fyra modeller är godkända för rutor utan båge
            </strong>
            , W1 Pro med kravet att du håller 10 centimeter till kanten. Har du
            en glasad balkongdörr eller ett skjutparti avgör det valet åt dig
            innan priset hinner göra det.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------- the swedish bit -- */}
      <Section
        id="sprojsen"
        tone="muted"
        width="default"
        title="22 × 25 eller 40 × 40: mät rutan innan du väljer"
        description="Den vanligaste orsaken till att ett köp inte fungerar. Ta måttbandet innan du läser något annat."
      >
        <Prose>
          <p>
            <strong>Spannet är större än priset antyder.</strong> Ecovacs Winbot
            Mini kommer upp på en ruta som är 22 × 25 centimeter. Kärcher RCW 2
            behöver 35 × 35, de tre större Winbot-modellerna 30 × 40 och
            HOBOT-2S hela 40 × 40, alltså nästan tre gånger Minis yta. Är rutan
            mindre än vad modellen kräver får roboten varken fäste eller yta att
            köra på, oavsett vad den kostar.
          </p>
          <p>
            <strong>Det är spröjsen som avgör i svenska hus.</strong> Ett
            korspostfönster från trettiotalet har ofta rutor kring 30 × 40
            centimeter och ett franskt fönster mindre än så. Mät den minsta ruta
            du vill ha putsad först, och läs listan ovan sedan: måttet stryker
            ofta fyra av de sju innan priset hunnit spela roll.
          </p>
          <p>
            <strong>Sedan kommer glaset.</strong> Ecovacs kräver minst 3
            millimeter glas och 4 på speglar genom hela serien, och en båge på
            minst 5 millimeter där det finns en. Har du gamla enkelglasfönster
            som är tunnare än så går HOBOT-388 och HOBOT-2S på vilken tjocklek
            som helst.
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
        description="Minsta ruta avgör vilka modeller som är möjliga. Hålltid och glas avgör vilken av dem du ska ta."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(
            PRICE_CHECKED,
            "Vikt utan tillbehör och nätkabel. Priserna skiljer ovanligt mycket mellan svenska butiker i den här produktgruppen, så kolla minst två innan du köper.",
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
        description="Sex poster som inte hamnade i rankningen: två utgångna, en osäljbar i Sverige, en dubblett och en handhållen fönstertvätt."
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
            <strong>Alla sju är Ecovacs, HOBOT eller Kärcher</strong>, eftersom
            det svenska sortimentet är litet: Prisjakt listar femton robotar och
            nio av dem är Ecovacs. Xiaomi Hutt DDC55 är billigast av allt vi sett
            men ligger bland de övervägda, eftersom den inte går att ställa mot
            de andra på rep, reservkraft och glas.
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
          footnote="Säkerhet på höjd väger 30 av 100 eftersom produkten sitter på utsidan av ett fönster och faller om den lossnar. Kriteriet betygsätter hålltiden vid strömavbrott och linans längd, alltså vad roboten gör, aldrig hur lätt en uppgift var att hitta. Fönstertyp och mått väger 25 eftersom det är den fråga som oftast gör att köpet inte fungerar: minsta ruta spänner från 22 × 25 till 40 × 40 centimeter, och en modell är förbjuden på båglöst glas medan fyra är godkända för det. Rengöring väger 20 och bedöms ur hur vattnet fördelas och hur nära hörnen chassit når, inte ur sugkraften i pascal, som är vidhäftning. En uppgift vi inte fått fram står som ett streck och sänker inget betyg; en produkt som inte går att bedöma alls hamnar bland de övervägda i stället. Vi fyller aldrig i ett tal från en systermodell. Vi har inte hängt någon robot i något fönster, inte belastat någon lina och inte mätt någon rengöring. Priserna är hos den butik vi länkar till."
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
        description="Nio tillverkarmanualer, specifikationsblad och produktsidor, lästa i original."
      >
        <Prose className="mb-block">
          <p>
            <strong>Läs manualen före produktbladet.</strong> Förbudet mot
            båglöst glas hos HOBOT, kravet på 10 centimeters marginal hos Ecovacs
            och beskedet att Kärcher RCW 2 är gjord för inramade glasytor står
            alla tre i manualen och i inget av produktbladen.
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
