import type { Metadata } from "next";

import { LUFTKVALITETSMATARE, testPageTrail } from "@/lib/test-pages";
import { LUFTKVALITETSMATARE_SOURCES } from "@/lib/sources";
import {
  LUFTKVALITETSMATARE_CONSIDERED,
  LUFTKVALITETSMATARE_FAQ,
  LUFTKVALITETSMATARE_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/luftkvalitetsmatare";
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

import Kopguide from "@/content/luftkvalitetsmatare/kopguide.mdx";

/*
 * ⚠️ Priser, kundbetyg, GTIN och givaruppsättningar är riktiga, lästa hos Clas
 * Ohlson via webbläsare med kakorna avvisade och hos Proshop i deras
 * strukturerade data på PRICE_CHECKED. Airthings noggrannhet är läst på deras
 * egen sida. Kriteriebetygen är redaktionell bedömning. Vi har inte mätt någon
 * luft och inte provat någon mätare.
 *
 * Sidans fynd: TRE AV ÅTTA kartlagda mätare saknar koldioxidgivare helt trots
 * att de säljs som luftkvalitetsmätare, och en fjärde anger `eCO2`, alltså ett
 * tal uträknat ur VOC-halten. Ordet står i Clas Ohlsons egen produkttext för
 * Mill Sense.
 *
 * ⚠️ RADONREGELN LIGGER I KÖPGUIDEN OCH FAQ, INTE I RANKNINGEN.
 * Användarbeslut 2026-08-04. SSM: en korttidsmätning "kan inte användas för
 * något myndighetsbeslut". Giltig långtidsmätning kräver spårfilm i minst två
 * månader mellan 1 oktober och 30 april, i minst två rum, via ackrediterat
 * laboratorium. Ingen av de fyra svenska konkurrenterna nämner det.
 *
 * `beslutsnytta` mäter om avläsningen går att AGERA på, inte om den duger till
 * ett myndighetsbeslut. Radonmätarna straffas därför inte; eCO2 straffas hårt.
 *
 * ⚠️ INGET PRIS på en ackrediterad radonmätning publiceras. Laboratoriernas
 * egna produktsidor svarar 404 och sökresultaten gav tre olika tal.
 *
 * ⚠️ Netatmos noggrannhet är INTE fastställd och står som ej angiven.
 *
 * ⚠️ Clas Ohlson publicerar reviewCount, inte ratingCount. Talen här är alltså
 * inte jämförbara med Kjells på andra sidor.
 *
 * AFFILIATE-SWAP — LINK_MODE styr formen på länkarna. Se lib/links.ts.
 */

const TEST_PAGE = LUFTKVALITETSMATARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Tre av åtta luftkvalitetsmätare saknar koldioxidgivare helt, och en fjärde anger eCO2, ett tal uträknat ur VOC-halten. Vi jämförde sju mätare från 729 till 2 856 kronor på vilka givare som faktiskt sitter i lådan.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "givarna", label: "Tre av åtta mäter inte koldioxid" },
  { id: "radon", label: "Vad radonsiffran duger till" },
  { id: "jamforelse", label: "Jämför alla sju" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "recensioner", label: "Recensioner av varje mätare" },
  { id: "andra-matare", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function LuftkvalitetsmatarePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = LUFTKVALITETSMATARE_PRODUCTS;
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
              Tre av de åtta mätare vi kartlagt saknar koldioxidgivare, och två
              av dem kostar över tusen kronor. En fjärde anger eCO2, ett tal som
              räknas fram ur luftens innehåll av organiska ämnen i stället för
              att mätas. Skillnaden mellan modellerna ligger inte i hur bra de
              mäter utan i vad de mäter. Vi jämförde sju mätare från 729 till
              2 856 kronor på just den frågan.
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
        id="givarna"
        width="default"
        title="Tre av åtta mäter inte koldioxid"
        description="Modellerna skiljer sig i vad de mäter, inte främst i hur bra de gör det."
      >
        <Prose>
          <p>
            <strong>
              Namnet på hyllan säger sällan vilka givare som sitter i lådan.
            </strong>{" "}
            Airthings Wave Mini kostar 785 kronor, heter luftkvalitetsmätare och
            mäter flyktiga organiska ämnen, fukt och temperatur. Ingen koldioxid.
            Uni-T A25D mäter partiklar men inte koldioxid. View Radon mäter
            radon, fukt och temperatur, och kostar 1 899 kronor.
          </p>
          <p>
            <strong>Och så det uträknade talet.</strong> Mill Sense anger{" "}
            <em>eCO2</em>, ett ord som står i Clas Ohlsons egen produkttext. Det
            är inte en koldioxidmätning. Apparaten mäter halten flyktiga
            organiska ämnen och räknar om den till ett koldioxidliknande tal,
            med antagandet att det som tillför organiska ämnen till rummet är
            människor som andas.
          </p>
          <p>
            Antagandet håller ibland. Det gör det inte när någon sprejar
            deodorant, lagar mat eller öppnar en burk lösningsmedel, och då
            stiger det uträknade koldioxidtalet i ett rum där ingen befinner sig.
          </p>
          <p>
            <strong>En riktig givare heter NDIR</strong> och mäter hur infrarött
            ljus absorberas av gasen. Airthings använder den i View Plus, Wave
            Plus och Wave Enhance, och anger dessutom noggrannheten till{" "}
            <strong>±30 ppm ±3 procent</strong> mellan 15 och 35 grader.
          </p>
          <p>
            <strong>Det är samma mönster som på vår hygrometersida, fast vänt.</strong>{" "}
            Där handlade fyndet om att nästan ingen tillverkare skriver ut hur
            mycket fel mätaren får visa. Här visar det sig att den som har en
            riktig givare också är den som vågar sätta en siffra på den.
          </p>
        </Prose>
      </Section>

      {/* ----------------------------------------------------- the rule -- */}
      <Section
        id="radon"
        tone="muted"
        width="default"
        title="Vad radonsiffran duger till"
        description="Myndighetens regler, och varför de inte påverkar betygen här."
      >
        <Prose>
          <p>
            Tre av produkterna säljs som radonmätare och kostar mellan 1 899 och
            3 299 kronor. Innan du köper en för radonets skull ska du veta vad
            talet den visar är värt.
          </p>
          <p>
            <strong>Strålsäkerhetsmyndigheten</strong> skriver, om
            korttidsmätningar:
          </p>
          <blockquote>
            En korttidsmätning är dock bara rådgivande, den kan inte användas för
            något myndighetsbeslut.
          </blockquote>
          <p>
            För ett värde som gäller krävs en <strong>långtidsmätning</strong>{" "}
            som ger ett årsmedelvärde. Den ska pågå i <strong>minst två
            månader</strong>, göras <strong>mellan 1 oktober och 30 april</strong>,
            omfatta <strong>minst två rum</strong>, och mätdosorna ska beställas
            genom och skickas tillbaka till ett{" "}
            <strong>ackrediterat mätlaboratorium</strong>.
          </p>
          <p>
            Referensnivån för bostäder är <strong>200 becquerel per
            kubikmeter</strong>, och myndigheten uppskattar att nära 400 000
            svenska bostäder ligger över den.
          </p>
          <p>
            <strong>
              En display hjälper alltså inte vid en husförsäljning, en ansökan om
              radonbidrag eller ett tillsynsärende.
            </strong>{" "}
            Ska du ha ett tal som gäller är det dosor du ska beställa.
          </p>
          <p>
            <strong>Men mätarna gör något dosan inte gör.</strong> De mäter
            löpande, år efter år. Radon varierar kraftigt med årstid, ventilation
            och lufttryck, och en dosa ger ett medelvärde för en vinter. En
            mätare visar kurvan, och den visar om en åtgärd har hjälpt.
          </p>
          <p>
            <strong>Därför påverkar den här regeln inte betygen.</strong> Vi
            bedömer en radonmätare på vad den gör, inte på vad den inte är
            avsedd för. Det du ska ta med dig är hur de två hänger ihop: mätaren
            talar om ifall det är värt att beställa den riktiga mätningen, och
            sedan om åtgärden fungerade.
          </p>
          <p>
            <strong>Ingen av de fyra svenska jämförelser vi läst nämner något
            av det här.</strong>{" "}
            Samtliga rekommenderar en radonmätare ändå.
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
        title={`De ${products.length} bästa luftkvalitetsmätarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sju"
        description="Raden CO2-teknik är den viktigaste: NDIR mäter koldioxid, eCO2 räknar fram den ur något annat."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(
            PRICE_CHECKED,
            "Givaruppsättningarna är butikens och tillverkarens egna uppgifter. CO2-teknik skiljer NDIR, som mäter koldioxid direkt, från eCO2, som räknas fram ur halten flyktiga organiska ämnen. Angiven noggrannhet är tillverkarens egen utfästelse; där den står som ej angiven publicerar tillverkaren ingen, vilket gäller fyra av de sju. Priserna är hos den butik vi länkar till, och samma apparat kan skilja flera hundra kronor mellan två svenska butiker.",
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
              Vi har inte mätt någon luft och inte provat någon mätare.
            </strong>{" "}
            Givaruppsättningarna är lästa hos butiken och hos tillverkaren.
            Noggrannheten är Airthings egen uppgift. Reglerna för radonmätning
            kommer från Strålsäkerhetsmyndighetens vägledning.
          </p>
          <p>
            <strong>
              Det finns en oberoende provning, och den täcker en av de sju.
            </strong>{" "}
            Stiftung Warentest provade 26 koldioxidmätare i december 2021 på
            mätning, handhavande, strömförbrukning och utförande. Airthings View
            Plus fick 1,2 för mätningarna, alltså sehr gut på en skala där 1,0 är
            bäst, och 1,9 totalt. Sex av de sju vi rankar är oprovade, och för
            dem jämför vi vad tillverkarna utfäster.
          </p>
          <p>
            <strong>
              Provningen visar också varför givartekniken är värd att bry sig om.
            </strong>{" "}
            18 av 26 apparater fick bra betyg för mätningen. Tre underkändes, och
            resten hamnade på tillfredsställande eller nöjaktigt. Var åttonde
            apparat klarade alltså inte att mäta det den säljs för att mäta.
          </p>
          <p>
            <strong>Sex av produkterna är Airthings.</strong> Det beror på att
            märket dominerar sortimentet. De hamnar på
            fyra skilda platser i rankningen, från första till näst sist, vilket
            är rimligt eftersom givaruppsättningarna går från sju givare till tre.
          </p>
          <p>
            <strong>Netatmos noggrannhet står som ej angiven.</strong> Deras
            specifikationssida gick inte att nå när vi läste, och varken butiken
            eller något datablad vi hittat anger vilken teknik givaren använder.
            Det är en frånvaro av uppgift, inte ett underkännande.
          </p>
          <p>
            <strong>Vi anger inget pris på en ackrediterad radonmätning.</strong>{" "}
            Laboratoriernas egna produktsidor svarade inte när vi läste, och ett
            pris vi inte kunnat läsa hos den som säljer tjänsten skriver vi inte
            ut.
          </p>
          <p>
            <strong>Betygstalen kommer från Clas Ohlson och är recensioner,
            inte betyg.</strong>{" "}
            De två räknas olika och skiljer sig med en faktor tre till fem, så
            talen här ska inte ställas mot ett tal från en annan butik på en
            annan sida.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje mätare"
        description="Alla sju bedöms mot samma fem kriterier. Uppgifterna är tillverkarens eller butikens egna, inte kontrollerade av oss."
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
        id="andra-matare"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster som inte hamnade i rankningen, inklusive två som butiken sorterar hit men som mäter något annat."
      >
        <ConsideredList items={LUFTKVALITETSMATARE_CONSIDERED} />
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
          footnote="Givare och mätteknik väger 35 av 100 eftersom den verkliga skillnaden mellan mätarna ligger i vad apparaterna mäter: tre av åtta kartlagda saknar koldioxidgivare helt. Beslutsnytta väger 25 och mäter om talet går att agera på, inte om det duger till ett myndighetsbeslut. Det är en viktig skillnad: en radonmätare straffas inte här för att dess värde inte kan användas i ett tillsynsärende, eftersom den ändå talar om ifall det är värt att beställa en riktig mätning och visar om en åtgärd hjälpt. Ett eCO2-värde straffas däremot hårt, eftersom talet inte motsvarar någon storhet som finns i rummet. Reglerna för radonmätning står i köpguiden och påverkar inte betygen, efter beslut när sidan byggdes. Där en tillverkare inte publicerar en uppgift står den som ej angiven, aldrig som en nolla. Priserna är hos den butik vi länkar till."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi provar inte mätarna fysiskt. Det här är vad vi gör i stället."
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
        description="En tysk provning av 26 mätare, en svensk myndighetsvägledning och ett tillverkardatablad."
      >
        <Prose className="mb-block">
          <p>
            <strong>Tre källor bär sidan, alla lästa i original.</strong>{" "}
            Stiftung Warentests provning av 26 koldioxidmätare ger det enda
            oberoende måttet på hur väl apparaterna mäter.
            Strålsäkerhetsmyndighetens vägledning ger reglerna för vad ett
            radonvärde duger till. Airthings eget datablad ger den enda
            publicerade noggrannheten i fältet.
          </p>
          <p>
            <strong>
              Ingen av de fyra svenska jämförelserna nämner
              Strålsäkerhetsmyndigheten, spårfilm, ackreditering eller
              eldningssäsong.
            </strong>{" "}
            Samtliga rekommenderar ändå en radonmätare, och tre av dem utser
            samma modell till bäst i test.
          </p>
        </Prose>
        <SourceList sources={LUFTKVALITETSMATARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={LUFTKVALITETSMATARE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
