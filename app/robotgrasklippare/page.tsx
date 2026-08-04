import type { Metadata } from "next";

import { ROBOTGRASKLIPPARE, testPageTrail } from "@/lib/test-pages";
import { ROBOTGRASKLIPPARE_SOURCES } from "@/lib/sources";
import {
  ROBOTGRASKLIPPARE_CONSIDERED,
  ROBOTGRASKLIPPARE_FAQ,
  ROBOTGRASKLIPPARE_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/robotgrasklippare";
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

import Kopguide from "@/content/robotgrasklippare/kopguide.mdx";

/*
 * ⚠️ Priser, kundomdömen, klippytor, lutningar och navigeringsteknik är
 * riktiga, lästa hos Clas Ohlson via webbläsare med kakorna avvisade på
 * PRICE_CHECKED. Kriteriebetygen är redaktionell bedömning. Vi har inte klippt
 * någon gräsmatta, inte mätt någon ljudnivå och inte provat någon robot.
 *
 * SIDANS TVÅ FYND:
 * 1. Samma modellnamn, dubbla ytan, lägre pris: Dreame A1 Pro 1 000 m² kostar
 *    12 990 och 2 000 m² kostar 11 490 hos samma butik. Kontrollerat på
 *    respektive produktsida.
 * 2. Igelkotten. Rasmussen m.fl. provade 18 robotar: ingen upptäckte djuret
 *    innan påkörning, samtliga körde över ungar. Standardiserat prov finns
 *    sedan 2024 med klassning 0-4, föreslaget för CENELEC. Ingen tillverkare
 *    redovisar ett resultat.
 *
 * ⚠️⚠️ IGELKOTTEN ÄR INGET KRITERIUM och får inte bli ett. Användarbeslut
 * 2026-08-04, och ett hårdare skäl: det finns inga publicerade provresultat per
 * modell, och 2024 års studie kunde INTE belägga att knivtyp, sensorer,
 * glidplåtar eller hjuldrift förutsäger utfallet. Jämför därför aldrig knivtyp
 * som om det vore ett säkerhetsmått. Fyndet ligger i köpguiden och i FAQ.
 *
 * ⚠️ Sidan får ALDRIG påstå att robotgräsklippare orsakar igelkottens
 * rödlistning. SLU anger att orsakerna är oklara och nämner dem inte.
 *
 * ⚠️ Råd & Röns test av 69 robotar ligger bakom betalvägg. INGA modellbetyg
 * därifrån återges, bara det som är fritt läsbart om metod och slutsatser.
 *
 * ⚠️ Clas Ohlson publicerar reviewCount, inte ratingCount. Talen här är alltså
 * inte jämförbara med Kjells på andra sidor.
 *
 * ⚠️ Adtraction är i praktiken tomt i kategorin. Se
 * .agent/research/robotgrasklippare.md.
 *
 * AFFILIATE-SWAP — LINK_MODE styr formen på länkarna. Se lib/links.ts.
 */

const TEST_PAGE = ROBOTGRASKLIPPARE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Maxlutningen avgör oftare än priset om köpet fungerar. Vi jämförde sju robotgräsklippare från 1 999 till 16 490 kronor på yta, lutning och navigering, och tog reda på vad forskningen säger om robotar och igelkottar.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "lutningen", label: "Lutningen avgör oftare än priset" },
  { id: "igelkotten", label: "Ingen av robotarna ser igelkotten" },
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

export default async function RobotgrasklipparePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = ROBOTGRASKLIPPARE_PRODUCTS;
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
              Den siffra som oftast gör att ett robotköp inte fungerar är inte
              priset utan maxlutningen, och en slänt som ser måttlig ut ligger
              ofta kring 25 procent. Vi jämförde sju robotar från 1 999 till
              16 490 kronor på yta, lutning och navigering. Och så tog vi reda på
              vad forskningen säger om robotar och igelkottar, eftersom svaret
              ändrar när du bör köra roboten snarare än vilken du bör köpa.
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
        id="lutningen"
        width="default"
        title="Lutningen avgör oftare än priset"
        description="Ytan stämmer, backen gör det inte, och roboten fastnar på samma ställe varje vecka."
      >
        <Prose>
          <p>
            <strong>25 procents lutning</strong> betyder att marken stiger en
            meter på fyra. <strong>45 procent</strong> nästan en meter på två. En
            slänt ner mot en häck som ser måttlig ut ligger ofta kring 25 till 30
            procent, precis där de billigaste robotarna slutar.
          </p>
          <p>
            <strong>Skillnaden mellan robotarna är dessutom inte gradvis.</strong>{" "}
            Den billigaste anger 25 procent, huvudfältet ligger på 40 till 45,
            och en enda robot anger 80 tack vare fyrhjulsdrift. Mellan 45 och 80
            finns ingenting alls.
          </p>
          <p>
            Det gör lutningen till en tröskelfråga snarare än en gradskala. Har
            du en backe på 50 procent hjälper det inte att lägga till tusen
            kronor. Du behöver hoppa hela vägen till fyrhjulsdrift.
          </p>
          <p>
            <strong>Räkna bara gräset.</strong> Uppfarten, altanen och rabatterna
            ska inte med i kvadratmetertalet, och välj sedan med marginal. En
            robot som ligger på gränsen till tomtens storlek måste köra längre
            och oftare för att hinna med, vilket ger mer ljud, fler laddcykler
            och mer slitage för samma klippta gräsmatta.
          </p>
          <p>
            <strong>
              Kontrollera dessutom vilken variant du lägger i korgen.
            </strong>{" "}
            Dreame A1 Pro finns hos samma butik för 1 000 kvadratmeter till
            12 990 kronor och för 2 000 kvadratmeter till 11 490. Den som täcker
            dubbelt så stor tomt kostar 1 500 kronor mindre. Båda anger 45
            procents lutning och samma 3D-lidar.
          </p>
          <p>
            <strong>En sak har handeln redan avgjort åt dig.</strong> Av 18
            robotar i butikens sortiment är 17 slinglösa. Begränsningskabeln är
            inte längre ett val du behöver göra, utan ett undantag du får leta
            upp om du vill ha det.
          </p>
        </Prose>
      </Section>

      {/* ----------------------------------------------------- the study -- */}
      <Section
        id="igelkotten"
        tone="muted"
        width="default"
        title="Ingen av robotarna ser igelkotten"
        description="Forskningen finns, provet finns, och ingen tillverkare redovisar ett resultat."
      >
        <Prose>
          <p>
            Forskare från Aalborg universitet och Oxford körde{" "}
            <strong>18 robotmodeller mot redan döda igelkottar</strong>, i fyra
            storlekar och från tre vinklar, tolv gånger per modell. Provningen
            gav två resultat.
          </p>
          <p>
            <strong>
              Ingen av de 18 kunde upptäcka en igelkott innan den körde på den.
            </strong>{" "}
            Robotarna märkte djuret först vid kontakt.
          </p>
          <p>
            <strong>Samtliga körde över igelkottsungar</strong> som ännu var
            beroende av modern.
          </p>
          <p>
            Vad som hände vid kontakt skilde sig däremot kraftigt. Vissa modeller
            lämnade lindriga märken, andra åsamkade svåra skador.
          </p>
          <p>
            <strong>Sedan 2024 finns ett standardiserat säkerhetsprov.</strong>{" "}
            Samma forskargrupp publicerade det med en skadeklassning i fem steg:
            en robot som bara ger klass 0 till 2 får kallas säker för igelkottar,
            en som ger klass 3 eller 4 får inte det, och klass 4 innebär
            underkänt. Protokollet är föreslaget för den europeiska standarden
            men ingår inte i den ännu.
          </p>
          <p>
            <strong>Ingen tillverkare publicerar ett resultat.</strong> Husqvarna
            har uttalat sig, välkomnar forskningen och uppger att deras robotar
            fick bra resultat, men skriver varken ut poäng eller skadeklass.
          </p>
          <p>
            <strong>Och det går inte att räkna ut själv.</strong> Studien som
            konstruerade provet undersökte också vilka konstruktionsdrag som
            förutsäger utfallet: knivtyp, kollisionssensorer, strömavkänning i
            hjulmotorerna, ultraljud, klipphöjd, glidplåtar, strålkastare, antal
            hjul och hjuldrift. Inget av dem visade någon säkerställd skyddande
            effekt. Den som jämför knivtyp jämför något forskningen inte kunnat
            koppla till utfallet.
          </p>
          <p>
            <strong>Det som fungerar är gratis: kör roboten dagtid.</strong>{" "}
            Igelkotten är aktiv från skymning till gryning. Rådet gäller oavsett
            modell och vilar på något annat än tillverkarens ord.
          </p>
          <p>
            <strong>Håll isär två saker.</strong> Igelkotten är rödlistad som
            nära hotad i Sverige, men SLU anger att orsakerna till minskningen är
            oklara och nämner inte robotgräsklippare bland dem. Och Råd & Rön
            konstaterar att samtliga 69 robotar de provat klarar de mekaniska
            säkerhetsproven, vilket är sant och handlar om människors fingrar.
            Igelkotten ligger utanför den standarden.
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
        title={`De ${products.length} bästa robotgräsklipparna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sju"
        description="Klippyta och max lutning är de två rader som avgör om roboten passar din tomt."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(
            PRICE_CHECKED,
            "Klippyta, max lutning och navigeringsteknik är butikens och tillverkarens egna uppgifter. Där en rad står som ej angiven publicerar butiken ingen uppgift, vilket gäller ljudnivån för sex av de sju robotarna. Tabellen innehåller medvetet ingen rad för knivtyp: den studie som konstruerade igelkottsprovet kunde inte belägga att knivtyp förutsäger utfallet, och en sådan rad hade sett ut som ett säkerhetsmått utan att vara det.",
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
              Vi har inte klippt någon gräsmatta och inte provat någon robot.
            </strong>{" "}
            Klippytor, lutningar och navigeringsteknik är lästa hos butiken och
            hos tillverkaren. Igelkottsforskningen är läst i original, inklusive
            den vetenskapliga artikel som konstruerade provet.
          </p>
          <p>
            <strong>
              Råd & Rön har provat 69 robotar, och vi återger inga modellbetyg
              därifrån.
            </strong>{" "}
            Testet publicerades i juni 2026 och ligger bakom betalvägg. Vi
            använder det som är fritt läsbart om metod och slutsatser: att blött
            gräs och svackor är det som skiljer robotarna åt, att slinglös
            navigering är flexiblare men ojämnt tillförlitlig, och att samtliga
            klarar de mekaniska säkerhetsproven. Betygen för enskilda modeller
            står inte här.
          </p>
          <p>
            <strong>
              Igelkotten är inget kriterium, och det är ett aktivt val.
            </strong>{" "}
            Det finns inga publicerade provresultat per modell, och den studie
            som konstruerade provet kunde inte belägga att något
            konstruktionsdrag förutsäger utfallet. Att ändå sätta betyg på
            igelkottssäkerhet vore att hitta på ett mätvärde.
          </p>
          <p>
            <strong>Fem av sju länkar går till Clas Ohlson.</strong> Butiken har
            det bredaste sortimentet vi hittat, och de flesta robotarna vi rankar
            finns inte samlade någon annanstans i svensk handel. Att så mycket
            hänger på en källa är en svaghet, och den står här i stället för att
            döljas.
          </p>
          <p>
            <strong>
              Vi kontrollerade tillverkarnas egna svenska butiker innan vi
              länkade.
            </strong>{" "}
            Dreame A1 Pro kostar 11 490 kronor hos både Clas Ohlson, Kjell och
            Dreames egen svenska butik, alltså exakt samma pris på tre ställen.
            Mammotion Luba Mini 2 säljs 401 kronor billigare av tillverkaren
            själv än av butiken. Åt andra hållet kostar Navimow i105e{" "}
            <strong>9 999 kronor hos Segways egen svenska butik mot 7 990 hos
            Clas Ohlson</strong>, alltså 2 009 kronor mer. Varje robot länkas
            till det billigaste ställe vi hittat, och där priset är detsamma
            väljer vi den butik som är enklast att kontrollera priset hos i
            efterhand.
          </p>
          <p>
            <strong>Betygstalen är recensioner, inte betyg.</strong> Clas Ohlson
            publicerar antal recensioner medan andra butiker publicerar antal
            betyg, och de skiljer sig med en faktor tre till fem. Talen här ska
            inte ställas mot ett tal från en annan butik på en annan sida.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje robot"
        description="Alla sju bedöms mot samma fem kriterier. Uppgifterna är butikens och tillverkarens egna, inte kontrollerade av oss."
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
        description="Sex robotar som inte hamnade i rankningen, tre av dem för att butiken inte anger någon maxlutning."
      >
        <ConsideredList items={ROBOTGRASKLIPPARE_CONSIDERED} />
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
          footnote="Yta och terräng väger 30 av 100 eftersom det är den enda egenskap som avgör om roboten alls fungerar på just din tomt, och eftersom både klippyta och maxlutning publiceras för nästan varje modell och därför går att jämföra i klartext. Navigering väger 25, för slinglösa robotar löser samma uppgift på tre sätt med olika svagheter: satellit tappar positionen under träd, kameror behöver ljus, lidar störs av motljus. Klippresultat väger 20 och är redaktionell bedömning ur publicerade uppgifter, eftersom Råd & Röns modellbetyg ligger bakom betalvägg. Ljud väger 15 och är den uppgift som saknas oftast: sex av sju robotar anger ingen ljudnivå, och då står det som saknad uppgift och aldrig som en nolla. Igelkottssäkerhet är medvetet inget kriterium, eftersom det saknas publicerade provresultat per modell och eftersom den studie som konstruerade provet inte kunde belägga att något konstruktionsdrag förutsäger utfallet. Vi har inte klippt någon gräsmatta och inte mätt någon ljudnivå. Priserna är hos den butik vi länkar till."
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
        description="Ett svenskt test av 69 robotar, två vetenskapliga artiklar och tillverkarens eget svar."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Två av källorna är vetenskapliga artiklar, och det är ovanligt för
              oss.
            </strong>{" "}
            Skälet är att det mest användbara fyndet ligger i forskning och inte
            i en produktprovning: provet finns, klassningen finns, och ingen
            tillverkare redovisar ett resultat.
          </p>
          <p>
            <strong>Husqvarnas eget svar står med som källa.</strong> Det finns
            där för att det visar var gränsen går mellan att välkomna forskning
            och att redovisa ett resultat, och ska läsas som ett vittnesmål om
            vad branschen säger snarare än som ett provresultat.
          </p>
        </Prose>
        <SourceList sources={ROBOTGRASKLIPPARE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={ROBOTGRASKLIPPARE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
