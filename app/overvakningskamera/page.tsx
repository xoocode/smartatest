import type { Metadata } from "next";

import { OVERVAKNINGSKAMERA, testPageTrail } from "@/lib/test-pages";
import { OVERVAKNINGSKAMERA_SOURCES } from "@/lib/sources";
import {
  OVERVAKNINGSKAMERA_CONSIDERED,
  OVERVAKNINGSKAMERA_FAQ,
  OVERVAKNINGSKAMERA_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/overvakningskamera";
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

import Kopguide from "@/content/overvakningskamera/kopguide.mdx";

/*
 * ⚠️ Priser, upplösning, synfält, lagring, batteritid, kundbetyg och vilka
 * funktioner butiken märker som abonnemangsberoende är riktiga, lästa på
 * butikens egen sida på PRICE_CHECKED. Uppgifterna om sekretesszoner är lästa
 * i respektive tillverkares egen supportdokumentation, se lib/sources.ts.
 * Kriteriebetygen är redaktionell bedömning. Vi har inte monterat, filmat med
 * eller mätt bildkvaliteten på någon kamera.
 *
 * Sidans fynd, i den ordning de står:
 *
 * 1. #maskeringen — IMY pekar ut digital maskering som åtgärden, och varje
 *    tillverkare publicerar en brasklapp som urholkar den. Alltid åt samma
 *    håll: så fort kameran rör sig slutar masken täcka det den ritades över.
 * 2. #privatundantaget — fem villkor, två av dem produktfrågor, plus IMY:s
 *    fyra egna exempel där undantaget inte gäller. Dörrkameran på en
 *    lägenhetsdörr är det som förvånar mest och det påverkar den planerade
 *    sidan /dorrklocka-med-kamera.
 * 3. #abonnemanget — vad som slutar fungera utan att betala, och vad det
 *    kostar. Eget avsnitt eftersom kriteriet väger tjugo procent men fyndet
 *    är binärt och försvinner som ett par tiondelar i ett betyg.
 *
 * Abonnemangspriserna är lästa 2026-08-06 hos Arlo (arlo.com/sv_se/serviceplans,
 * curl-steget svarar 200 och bär tabellen i JSON) och hos Ring
 * (ring.com/se/sv/plans, prissatt i euro). Detta rättar noteringen från 08-03
 * om att inget pris gick att läsa. Se lib/data/overvakningskamera.ts.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 * Se lib/links.ts.
 */

const TEST_PAGE = OVERVAKNINGSKAMERA;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Reolink W330 4K vinner för 999 kronor: 4K dygnet runt på minneskort, inget abonnemang, och en mask som ligger kvar där du ritade den. Vi jämförde sju utomhuskameror från 999 till 2 099 kronor mot det som avgör om kameran får sitta där du tänkt.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "maskeringen", label: "Maskeringen som försvinner" },
  { id: "privatundantaget", label: "Vad du faktiskt får filma" },
  { id: "jamforelse", label: "Jämför alla sju" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "abonnemanget", label: "Vad som slutar fungera utan abonnemang" },
  { id: "recensioner", label: "Recensioner av varje kamera" },
  { id: "andra-kameror", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function OvervakningskameraPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = OVERVAKNINGSKAMERA_PRODUCTS;
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
              Reolink W330 4K kostar 999 kronor, spelar in i 4K dygnet runt på
              ett kort i kameran och kräver inget abonnemang. Framför allt
              ligger maskeringen kvar när kameran används, vilket den inte gör
              på de roterande kamerorna. Vi jämförde sju utomhuskameror från
              999 till 2 099 kronor mot det som avgör om kameran alls får sitta
              där du tänkt.
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
      {/* Först av allt, eftersom det ändrar vilken kamera som är rätt köp. */}
      <Section
        id="maskeringen"
        width="default"
        title="Maskeringen som försvinner"
        description="Alla fem fabrikat har sekretesszoner. På fyra av dem släpper masken så fort kameran rör sig, och det avgör vilken kamera som är rätt köp."
      >
        <Prose>
          <p>
            IMY skriver att en kamera som råkat få med grannens tomt kan rättas
            till genom att <strong>vinkla om kameran eller maskera området
            digitalt</strong>. Det är myndighetens egen formulering, och den
            pekar rakt på en produktfunktion.
          </p>
          <p>
            Funktionen finns hos alla fem fabrikaten. Men den fungerar bara så
            länge kameran står still, och det gäller i olika grad hos var och
            en:{" "}
            <strong>
              så fort kameran rör sig slutar masken täcka det den ritades över.
            </strong>
          </p>
          <p>
            <strong>Arlo raderar zonerna.</strong> Deras FAQ svarar nej på tre
            raka frågor: nej, zonerna fungerar inte med autospårning, då raderas
            de automatiskt. Nej, inte om du ändrar synfältet. Nej, inte om du
            roterar bilden 180 grader. För pan/tilt-modellerna gäller dessutom
            att zonen försvinner så fort kameran rör sig.
          </p>
          <p>
            <strong>TP-Link flyttar dem.</strong> Zonerna läggs på den aktuella
            kameravyn, och vid rotation förblir de aktiva men följer med vyn och
            täcker inte längre de ursprungliga områdena.
          </p>
          <p>
            <strong>Reolink förskjuter dem, men bara vid panorering.</strong> Den
            dynamiska masken som följer med scenen finns bara på tre modeller,
            och ingen av dem säljs i svensk handel. På en fast monterad Reolink
            finns problemet inte.
          </p>
          <p>
            <strong>Ring</strong> har två zoner, och rörelsedetektorn känner av
            området ändå, så larmen fortsätter komma från ytan du svartat ut.{" "}
            <strong>eufy</strong> går längst av alla och anger att aktivitet i
            en sekretesszon kanske inte helt kan undvikas från att spelas in.
            Alltså att masken inte säkert hindrar inspelningen.
          </p>
          <p>
            Det är därför en fast kamera för 999 kronor slår en roterande för
            1 490 på den här sidan. Det är ingen synpunkt på bildkvaliteten.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- regulation -- */}
      <Section
        id="privatundantaget"
        tone="muted"
        width="default"
        title="Vad du faktiskt får filma"
        description="Fem villkor ska vara uppfyllda samtidigt, två av dem avgörs av produkten, och IMY har fyra egna exempel där det inte räcker."
      >
        <Prose>
          <p>
            Kamerabevakning som omfattas av privatundantaget lyder varken under
            GDPR eller under kamerabevakningslagen. IMY skriver att undantaget{" "}
            <strong>ska tolkas snävt</strong> och listar fem villkor som alla ska
            vara uppfyllda samtidigt.
          </p>
          <p>
            Två av dem avgörs av produkten. Bevakningen ska vara begränsad till
            ditt hem eller din tomt och får inte filma en grannes tomt eller en
            plats dit allmänheten har tillträde. Och i samma mening:{" "}
            <em>&quot;Ljud tas inte heller upp utanför tomten.&quot;</em> Varenda
            kamera i jämförelsen har mikrofon, påslagen från start.
          </p>
          <p>
            Faller du utanför skriver IMY att{" "}
            <em>
              &quot;Sådan bevakning är sällan tillåten då det är ett allvarligt
              intrång i dina grannars personliga integritet. Att kamerabevaka
              människor i deras hem kan dessutom vara brottsligt enligt
              straffrättsliga bestämmelser.&quot;
            </em>
          </p>
          <p>
            <strong>Fyra fall myndigheten själv säger nej till.</strong> En
            dörrkamera på en lägenhetsdörr, eftersom förbipasserande i trapphuset
            riskerar att komma med. En kamera i hemmet hos någon som har
            hemtjänst, eftersom personalen bevakas under sin arbetstid. Vägar på
            egen mark som allmänheten använder, inklusive servitutsvägar. Och
            åtelkamera i egen skog, om personer som utnyttjar allemansrätten kan
            identifieras.
          </p>
          <p>
            Områden IMY säger är lättast att missa: ytor på grannens tomt som
            syns över staketet, trottoaren utanför uppfarten, en sjö där båtar
            kan passera, och en fastighet längre bort som syns över en häck.
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
        title={`De ${products.length} bästa övervakningskamerorna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sju"
        description="Har du bråttom: Sekretesszon visar om maskeringen finns, och Zonen påverkas av rörelse visar om den håller."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Uppgifterna om sekretesszoner kommer från respektive tillverkare och inte från butiken, eftersom butikerna sällan skiljer på detekteringszon och sekretesszon. Abonnemangspriserna är lästa hos Arlo och Ring 2026-08-06.`)}
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
            <strong>Sex av sju länkar går till Kjell.</strong>{" "}
            På Argus 4 Pro länkar vi till Proshop i stället, där den är 228
            kronor billigare. För de övriga fem hittade vi ingen läst
            prisuppgift hos någon annan butik, och vi skriver hellre samma
            butiksnamn sex gånger än hittar på ett pris.
          </p>
          <p>
            <strong>Två av sju placeringar går till samma fabrikat.</strong>{" "}
            Reolink tar första och andra platsen. Det är en följd av att
            integritetskriteriet väger trettio procent och att Reolink är den
            enda tillverkaren som ger funktionen till hela sortimentet utan en
            brasklapp som träffar en fast monterad kamera. Väger du bild och
            bekvämlighet tyngre än vi gör ser listan annorlunda ut, och räknaren
            i köpguiden gör om den åt dig.
          </p>
          <p>
            <strong>Abonnemangspriserna är tillverkarens egna listpriser.</strong>{" "}
            Arlo Secure och Ring Basic är lästa på respektive plansida
            2026-08-06, och treårskostnaderna är räknade på årspriset utan
            kampanjrabatt. Betalar du månadsvis blir det dyrare. Tapo Care visar
            TP-Link bara i appen, men eftersom Tapo-kamerorna spelar in på kort
            utan abonnemang ändrar det ingenting i rankningen.
          </p>
          <p>
            <strong>Vi har inte filmat med någon kamera.</strong> Bildbetyget
            bygger på publicerade mått, alltså upplösning, synfält och angiven
            räckvidd på mörkerseendet, och inte på vad vi sett i en bild. Det
            som däremot är läst i original är IMY:s regeltext och alla fem
            tillverkares dokumentation av sekretesszoner.
          </p>
        </Prose>
      </Section>

      {/* --------------------------------------------------- subscription -- */}
      {/* Eget avsnitt eftersom fyndet är binärt och hade försvunnit som ett
          par tiondelar i ett betyg. */}
      <Section
        id="abonnemanget"
        width="default"
        title="Vad som slutar fungera utan abonnemang"
        description="Kategorin delar sig i två halvor, och skiljelinjen syns inte i priset."
      >
        <Prose>
          <p>
            <strong>Reolink, TP-Link Tapo och eufy</strong> sparar materialet på
            ett minneskort i kameran. Köpet är klart när du lämnat butiken, och
            kameran fortsätter fungera oavsett vad tillverkaren gör med sina
            tjänster.
          </p>
          <p>
            <strong>Ring</strong> spelar inte in någonting utan abonnemang. Du
            får notiser och direktbild, men ingenting sparas, vilket är den enda
            funktion man egentligen köper en övervakningskamera för. Ring Basic
            täcker en kamera för <strong>3,99 euro i månaden</strong> eller
            39,99 euro om året.
          </p>
          <p>
            <strong>Arlo</strong> kräver Arlo Secure både för molninspelning och
            för igenkänningen av personer, fordon och paket. Utan abonnemang är
            två Arlo-kameror i praktiken två dyra rörelsevakter med direktbild.
            Priset är <strong>99 kronor i månaden för en kamera</strong> och 149
            kronor för upp till fyra, eller 1 089 respektive 1 639 kronor om
            året.
          </p>
          <p>
            Räknat över tre år betyder det att ett Arlo-paket till 1 490 kronor
            landar på <strong>6 407 kronor</strong>, alltså mer än fyra gånger
            hyllpriset. Två Reolink W330 kostar 1 998 kronor och sedan
            ingenting. Det är den skillnaden som avgör kriteriet kostnad efter
            köp, och den syns inte i prislappen.
          </p>
          <p>
            Det är samma fråga som gjorde Google Nest Protect till en varning på
            vår sida om smarta brandvarnare. En produkt vars kärnfunktion bor på
            någon annans server är utlånad och inte köpt, och den som lånar ut
            bestämmer både villkoren och priset.
          </p>
          <p>
            Molnet har en verklig fördel som ska sägas: det överlever ett
            inbrott där tjuven tar med sig kameran, vilket ett minneskort i
            kameran inte gör. Vill du ha båda är svaret en kamera med kort plus
            en nätverksinspelare inomhus.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje kamera"
        description="Alla sju bedöms mot samma fem kriterier. Måtten är butikens egna, och uppgifterna om maskering är tillverkarens."
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
        id="andra-kameror"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sex poster som inte hamnade i rankningen, inklusive hela inomhussegmentet som får en egen sida."
      >
        <ConsideredList items={OVERVAKNINGSKAMERA_CONSIDERED} />
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
          footnote="Integritet väger tyngst eftersom den avgör om kameran alls får sitta där köparen tänkt. Skalan mäter vad masken gör: 5,0 när den ligger kvar under normal användning, 4,0 när den bara släpper vid en funktion du kan låta bli att slå på, 2,5 när den förskjuts eller raderas så fort modellens huvudfunktion används, och 1,5 när tillverkaren anger att maskeringen inte hindrar inspelning. En uppgift vi inte fått fram sänker aldrig ett betyg. Kostnad efter köp räknar abonnemangets listpris över tre år tillsammans med vad som slutar fungera utan det. Bildbetyget bygger på publicerade mått och inte på bilder vi tagit, eftersom vi inte filmat med någon kamera. Vi hittade inget svenskt test av kategorin. Priserna är hos den butik vi länkar till."
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
        description="Myndighetens regeltext, fem tillverkares dokumentation av en enda funktion, och butiken som bär priserna."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Det finns inget svenskt test av övervakningskameror för villa.
            </strong>{" "}
            Varken Råd &amp; Rön eller Testfakta har testat kategorin.
          </p>
          <p>
            <strong>Primärkällorna är av ett annat slag här.</strong> I stället
            för provningsrapporter är det en myndighetstext och fem tillverkares
            egen supportdokumentation, och det är just därför jämförelsen går att
            göra: varje påstående om maskering på den här sidan går att slå upp
            hos den som byggt produkten. Alla sex källor är lästa i original och
            citerade ordagrant, i stället för att refereras via en tredje part.
          </p>
        </Prose>
        <SourceList sources={OVERVAKNINGSKAMERA_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={OVERVAKNINGSKAMERA_FAQ} schema />
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
