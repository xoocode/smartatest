import type { Metadata } from "next";

import { SMART_TERMOSTAT, testPageTrail } from "@/lib/test-pages";
import { SMART_TERMOSTAT_SOURCES } from "@/lib/sources";
import {
  SMART_TERMOSTAT_CONSIDERED,
  SMART_TERMOSTAT_FAQ,
  SMART_TERMOSTAT_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/smart-termostat";
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

import Kopguide from "@/content/smart-termostat/kopguide.mdx";

/*
 * ⚠️ Priser, kundbetyg, artikelnummer, GTIN, adapterlistor och tillverkarnas
 * besparingspåståenden är riktiga, lästa 2026-08-04 hos Kjell, hos Proshop
 * eller på tillverkarens egen sida. Kriteriebetygen är redaktionell bedömning.
 * Vi har inte skruvat på någon termostat och inte mätt någon förbrukning.
 *
 * AVGRÄNSNING: sidan rankar bara radiatortermostater, alltså de som skruvas på
 * ventilen på ett vattenburet element. Rumstermostat för elvärme, infraröd
 * styrning av luftvärmepump och framledningsstyrning ligger bland de övervägda.
 * Användarbeslut 2026-08-04.
 *
 * SIDANS FYND: alla anger en besparingsprocent utom de som provat produkterna.
 *   Fibaro 42 %, fotnotat "Based on research by Fibar Group S.A."
 *   Netatmo 37 %, bara i butikstexten, inget underlag hittat
 *   Danfoss 30 % på egen sida, 23 % i butikstexten för samma system
 *   tado 28 %
 *   Aqara, Eve, SONOFF och Schneider anger ingenting
 *   Ljud & Bild, som provade tre, avstår av princip
 *   Stiftung Warentest, som labbprovade elva, har det bakom betalvägg
 *
 * ⚠️⚠️ TADOS 28 % ÄR LÄST I ORIGINAL. Fraunhofer IBP-Report 579 E (2022) är en
 * TRNSYS-simulering med typårsklimat för München, spannet är 12-28, och hela
 * rapporten fås bara av uppdragsgivaren tado. Påstå aldrig att någon mätt det
 * i bebodda hus.
 *
 * ⚠️ BESPARINGEN ÄR INGET KRITERIUM. Användarbeslut: det finns inga
 * provresultat per modell, och ett betyg på ett påstående mäter butikens
 * copywriting. Samma resonemang som igelkotten på /robotgrasklippare.
 *
 * ⚠️ ANDRA FYNDET: spannet i passform är femfaldigt. Netatmo når tio
 * fattningar, Danfoss Ally RA når två, och ingen av uppgifterna står på sidan
 * där man lägger produkten i korgen. De ligger i bruksanvisningar,
 * produktregister och kompatibilitetsguider.
 *
 * ⚠️ RÄTTAT 2026-08-06: kriteriet hette Angiven ventilpassning och betygsatte
 * om tillverkaren publicerat en lista. Det rankade dokumentationen i stället
 * för varan, och gjorde tre fel: SONOFF (2,5 → 4,0, publicerar en guide över 41
 * ventilmärken), Fibaro (1,5 → 3,0, tre fattningar i manualens första sida) och
 * Danfoss Eco (3,5 → 4,0, fyra fattningar i Danfoss produktregister). Se
 * lib/corrections.ts.
 *
 * ⚠️ DANFOSS TVÅ ARTIKELNUMMER, lästa i Danfoss produktregister: 014G2460
 * täcker M30, RA, RAV och RAVL för 760 kr; 014G2420 täcker M30 och RA för 890.
 * Den dyrare passar färre ventiler.
 *
 * ⚠️ Warentest fann att en av elva föll på frostskyddsprovet. Vilken ligger
 * bakom betalvägg och får aldrig gissas.
 *
 * AFFILIATE-SWAP — LINK_MODE styr formen på länkarna. Se lib/links.ts.
 */

const TEST_PAGE = SMART_TERMOSTAT;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Smart termostat bäst i test 2026: elva radiatortermostater jämförda från 361 kr. Adaptern till ditt element kan kosta extra. Se vilka som har den i lådan.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "procenten", label: "Procentsatsen ingen som provat vill ange" },
  { id: "fraunhofer", label: "Vi läste grundkällan bakom 28 procent" },
  { id: "ventilen", label: "Från 2 till 10 fattningar: ventilen avgör" },
  { id: "jamforelse", label: "Jämför alla elva" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "recensioner", label: "Recensioner av varje termostat" },
  { id: "andra-termostater", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function SmartTermostatPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = SMART_TERMOSTAT_PRODUCTS;
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
              Vi rekommenderar SONOFF TRVZB för 361 kronor, eftersom den duger
              med vilken Zigbee-hubb som helst, även en USB-sticka för ett par
              hundralappar, och går på sju ventilfattningar. Den är billigast av alla elva och har adaptrarna
              i lådan, lika många fattningar som termostater för tre gånger
              pengarna. Ska den sitta
              i ett sovrum tar du Aqara W600 för 559 i stället, som håller sig
              under 30 dB. Vi jämförde elva radiatortermostater till vattenburna
              element, där styckpriset spänner från 361 till 1 229 kronor och
              hubben nästan alltid är den dolda kostnaden.
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
        id="procenten"
        width="default"
        title="42, 37, 30 eller 28 procent? De som provat dem säger ingenting"
        description="Talen i den här kategorin kommer uteslutande från dem som aldrig mätt något."
      >
        <Prose>
          <p>
            <strong>
              Ljud & Bild är den enda svenska redaktion som haft produkterna i
              handen, och de avstår från att ange en besparing.
            </strong>{" "}
            Skälet står i testet: det skulle kräva ett test under mycket lång
            tid. De skriver att det sannolikt finns pengar att spara, och stannar
            där.
          </p>
          <p>
            <strong>
              Stiftung Warentest labbprovade elva radiatortermostater
            </strong>{" "}
            och lägger sitt besparingsavsnitt bakom betalvägg. Den fria texten
            säger bara att de förklarar vem som tjänar mest på en smart termostat
            och för vem den lönar sig sämre.
          </p>
          <p>
            <strong>Tillverkarna fyller tomrummet, och de är oense.</strong>{" "}
            Fibaro anger 42 procent, Netatmo 37, Danfoss 30 på sin egen sida och
            23 i butikens produkttext för samma system, tado 28. Aqara, Eve,
            SONOFF och Schneider anger ingenting.
          </p>
          <p>
            <strong>
              Det högsta talet har det tunnaste underlaget, och det står på samma
              sida.
            </strong>{" "}
            Fibaros rubrik lyder kostnadsminskning på upp till 42 procent, med en
            liten etta efter. Fotnot ett längst ned lyder i sin helhet: baserat
            på forskning utförd av Fibar Group S.A. Ingen publicering, ingen
            metod, ingen länk.
          </p>
          <p>
            <strong>Netatmos 37 procent gäller en annan produkt.</strong> Talet
            kommer ur Netatmos egen utbildningsbok för återförsäljare och vilar
            där på en studie från Centrale-Supélec på en standardlägenhet. Men
            samma bok skriver ut att de 37 procenten avser deras
            rumstermostat i hus med egen panna eller värmepump, inte
            radiatorventilerna. Butiken sätter ändå talet på ventilen.
          </p>
          <p>
            <strong>
              Två svenska jämförelsesajter anger 30 respektive 31 procent,
            </strong>{" "}
            alltså mer än tillverkarnas egen marknadsföring. Ingen av de två har
            haft en termostat i handen.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------ the source read -- */}
      <Section
        id="fraunhofer"
        tone="muted"
        width="default"
        title="Vi läste grundkällan bakom 28 procent"
        description="Alla spår i kategorin leder till en rapport. Den säger något annat än den citeras för."
      >
        <Prose>
          <p>
            tados tal är det enda som går att spåra till en namngiven källa.
            Fraunhofer IBP-Report 579 E från 2022 är på två sidor och fritt
            nedladdningsbar. Tre saker i den står inte i marknadsföringen.
          </p>
          <p>
            <strong>Det är en beräkning, inte ett mätt hus.</strong> Rapporten
            säger att studien bygger på transienta beräkningar i
            simuleringsprogrammet TRNSYS 17, där algoritmen återskapats i
            förenklad form. tados egen sida beskriver den som en studie utförd
            under realistiska förhållanden.
          </p>
          <p>
            <strong>Klimatet är tyskt.</strong> Väderdatan representeras i
            studien av ett typår för München.
          </p>
          <p>
            <strong>Resultatet är ett spann, och golvet är 12.</strong>{" "}
            Rapporten skriver att systemet kan sänka husens värmebehov med 12
            till 28 procent. Marknadsföringen citerar taket, och gör det i varje
            delsiffra: närvarodetektering anges som upp till 23 när rapporten
            säger 13 till 23, väderprognosen upp till 6 när rapporten säger 0,4
            till 6.
          </p>
          <p>
            <strong>Och uppdragsgivaren är tillverkaren.</strong>{" "}
            Sammanfattningen anger att den bygger på en fullständig rapport som
            kan begäras från kunden tado GmbH. Hela underlaget är alltså inte
            offentligt.
          </p>
          <p>
            Referensfallet som besparingen räknas mot är dessutom ett hem där
            alla radiatortermostater står på konstant 20 grader hela dagen.
            Skruvar du redan ner sovrummet på natten är det inte ditt hem de
            jämför med.
          </p>
        </Prose>
      </Section>

      {/* ----------------------------------------------------- the second -- */}
      <Section
        id="ventilen"
        width="default"
        title="Från 2 till 10 fattningar, och butiken skriver aldrig vilken"
        description="Ventilen avgör om termostaten går att montera, och skillnaden mellan modellerna är femfaldig."
      >
        <Prose>
          <p>
            <strong>
              Netatmo når tio fattningar, Danfoss Ally RA når två.
            </strong>{" "}
            Det är samma sorts produkt, i samma prisklass, monterad på samma sorts
            element. Emellan ligger Aqara W600, tado X och SONOFF TRVZB på sju,
            fem modeller på fyra och Fibaro på tre.
          </p>
          <p>
            <strong>Fyra är den nivå som räcker i de flesta svenska hem.</strong>{" "}
            Den täcker gängan M30x1,5 plus Danfoss RA, RAV och RAVL, alltså de
            klämfattningar som sitter på en stor del av beståndet. Är alla dina
            element från samma årtionde behöver du sällan mer.
          </p>
          <p>
            <strong>Sju behövs när elementen är från olika årtionden.</strong>{" "}
            Då dyker M28x1,5 och de italienska klämfattningarna Caleffi och
            Giacomini upp, och de klarar bara Aqara W600, tado X och SONOFF. Ett
            enda element med fel ventil betyder annars ett andra köp av ett annat
            märke.
          </p>
          <p>
            <strong>
              Danfoss säljer samma termostat under två artikelnummer, och det
              dyrare passar färre ventiler.
            </strong>{" "}
            014G2460 tar M30, RA, RAV och RAVL och kostar 760 kronor. 014G2420 tar
            M30 och RA och kostar 890. Butiken saluför den senare under namnet
            Radiator Thermostat RA, vilket är precis vad man söker efter med en
            RA-ventil.
          </p>
          <p>
            <strong>
              Ingen av de här uppgifterna står på sidan där du lägger produkten i
              korgen.
            </strong>{" "}
            De ligger i en bruksanvisning, ett hjälpcenter, ett produktregister
            eller en kompatibilitetsguide, medan butikstexten nöjer sig med att
            termostaten passar termostatventiler från en mängd olika tillverkare.
            Det är också det enda skälet till att verktyget längre ner på sidan
            finns.
          </p>
          <p>
            <strong>
              Två sorters värmesystem stoppar köpet innan fattningen ens är
              aktuell.
            </strong>{" "}
            En manuell kran har inget stift att trycka på, och i ett enrörssystem
            påverkar en strypt radiator flödet till alla som ligger efter i
            slingan. Enrörssystem är vanligt i flerbostadshus från 1960- och
            70-talen. Aqara E1 är den enda som anger det innan du beställer.
          </p>
          <p>
            <strong>Den varning som väger tyngst kommer från en testare.</strong>{" "}
            Ljud & Bilds recensent har använt tado i flera år och skriver att de
            medföljande plastadaptrarna inte klarat trycket när termostaterna
            öppnat och stängt värmen, med följden att termostater fallit av och
            landat på golvet medan värmen stått fullt uppskruvad, ibland på
            natten. Hans råd är att köpa en metalladapter hos en VVS-butik.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      {/* Parked. Hidden unless the admin toggle is on; kept in the template so
          new test pages still get the section. See lib/theme.ts. */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa radiatortermostaterna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla elva"
        description="Raden Angiven besparing är tillverkarens eget påstående och påverkar inget betyg."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(
            PRICE_CHECKED,
            "Raden Ventilfattningar räknar de fattningar termostaten monteras på med adaptrarna som följer med, hämtat ur tillverkarens bruksanvisning, produktregister eller hjälpcenter och aldrig ur butikens rubrik. Raden Angiven besparing är tillverkarens påstående och ingenting annat: den påverkar inget betyg, och där den står som ej angiven publicerar tillverkaren ingen siffra, vilket gäller fyra av de elva. Vi fyller aldrig i ett tal åt någon och lånar aldrig ett från en systermodell.",
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
              Vi har inte skruvat på någon termostat och inte mätt någon
              förbrukning.
            </strong>{" "}
            Varje uppgift om adaptrar, protokoll, frostskydd och besparing är
            tillverkarens egen, läst på deras sida, i deras hjälpcenter eller hos
            butiken.
          </p>
          <p>
            <strong>Besparingsprocenten påverkar inget betyg.</strong> Den finns
            i tabellen därför att spridningen är sidans fynd, inte därför att den
            säger något om produkten. Att betygsätta ett påstående vore att mäta
            butikens copywriting, och det förkastade vi redan när
            brandsläckarsidan byggdes.
          </p>
          <p>
            <strong>
              Viktningen räknades om den 6 augusti 2026, och vi hade fel innan.
            </strong>{" "}
            Kriteriet som väger 25 mätte tidigare om tillverkaren publicerat en
            adapterlista, alltså kvaliteten på ett produktblad snarare än på en
            termostat. Tre produkter var felbetygsatta av det skälet, och
            SONOFF TRVZB gick från fjärde till andra plats när det rättades.
            Ändringarna står på /rattelser.
          </p>
          <p>
            <strong>Warentests betyg per modell återges inte.</strong> Deras
            provning av elva radiatortermostater ligger bakom betalvägg. Vi
            krediterar därför enbart att en modell genomgått provningen, aldrig
            hur den klarade sig. Av samma skäl skriver vi inte vilken av de elva
            som missade frostskyddstestet: vi vet det inte.
          </p>
          <p>
            <strong>Fem av elva har inget publicerat omdöme alls.</strong> Där
            står raden tom och vikten fördelas om över de övriga kriterierna,
            vilket är bättre än att gissa ett betyg. Vi väger heller aldrig in
            ett omdöme om fel generation: Warentest provade tados V3+, inte
            X-serien vi rankar.
          </p>
          <p>
            <strong>Elva produkter, två butiker.</strong> Kjell och Proshop bär
            hela urvalet, och inget märkesprogram för tado, Danfoss, Aqara,
            Netatmo eller SONOFF når Sverige. Att en sida vilar på två butiker är
            en svaghet, och den står här i stället för att döljas.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje termostat"
        description="Alla elva bedöms mot samma fem kriterier. Uppgifterna är tillverkarens och butikens egna, inte kontrollerade av oss."
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
        id="andra-termostater"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster, fyra av dem för att de löser värmen på ett annat ställe än på elementet."
      >
        <ConsideredList items={SMART_TERMOSTAT_CONSIDERED} />
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
          footnote={
            "Krävs utöver termostaten och Ventilpassning väger 25 var, tillsammans halva betyget: den ena avgör om köpet fungerar, den andra vad det slutar kosta.\n\nVentilpassning räknar fattningar termostaten monteras på med adaptrarna som följer med. Sju eller fler ger 5,0, fyra ger 4,0, två ger 2,0. En produkt som varken behöver hubb eller går att nå hemifrån får inte full poäng på den första raden: den har tagit bort funktionen och inte kostnaden.\n\nOberoende väger 20 och mäter vad som fortsätter fungera när appen stängs eller avgiften höjs. Omdöme i publicerade provningar väger 15 därför att täckningen är tunn, och en modell ingen provat får ingen poäng på raden med vikten omfördelad.\n\n**Besparingsprocenten påverkar ingenting alls.** Vi har inte skruvat på någon termostat, inte mätt någon förbrukning och inte jämfört någon elräkning. Priserna är hos den butik vi länkar till.\n\nViktningen räknades om 2026-08-06 sedan kriteriet slutat betygsätta om tillverkaren publicerat en adapterlista och börjat räkna hur många ventiler termostaten faktiskt passar på. Tre produkter flyttade sig, och rättelserna står på /rattelser."
          }
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi monterar inte termostaterna fysiskt. Det här är vad vi gör i stället."
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
        description="Tre oberoende provningar, en forskningsrapport läst i original och tio tillverkarsidor."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Två av källorna står med för det de vägrar säga.
            </strong>{" "}
            Ljud & Bild och Stiftung Warentest är de enda som haft produkterna i
            handen, och ingen av dem publicerar ett besparingstal vi kan citera.
            Det är själva iakttagelsen, och den är svårare att göra än att
            återge en siffra från en förpackning.
          </p>
          <p>
            <strong>Fraunhofer-rapporten är läst i original,</strong> inte i
            tillverkarens sammanfattning av den. Skillnaden mellan de två är
            hela skälet till att den ligger här: rapporten säger simulering,
            München och 12 till 28, medan marknadsföringen säger 28.
          </p>
        </Prose>
        <SourceList sources={SMART_TERMOSTAT_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={SMART_TERMOSTAT_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
