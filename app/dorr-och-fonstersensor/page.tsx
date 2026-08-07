import type { Metadata } from "next";

import { testPageTrail, DORR_OCH_FONSTERSENSOR } from "@/lib/test-pages";
import { SOURCES_BY_HREF } from "@/lib/sources";
import {
  PRICE_CHECKED,
  DORR_OCH_FONSTERSENSOR_FAQ,
  DORR_OCH_FONSTERSENSOR_CONSIDERED,
  DORR_OCH_FONSTERSENSOR_PRODUCTS,
} from "@/lib/data/dorr-och-fonstersensor";
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

import Kopguide from "@/content/dorr-och-fonstersensor/kopguide.mdx";

/*
 * Sjuttonde sidan i gruppen Säkerhet, byggd 2026-08-07.
 *
 * ⚠️ SLUGEN ÄR UTREDD OCH ANVÄNDARBESLUTAD. Beställningen löd "fönstersensor",
 * men ingen butik i Sverige säljer en ren fönstersensor: varan är alltid både
 * dörr och fönster. IKEA, Power, PriceRunner, Kjell och tyska homeandsmart
 * använder alla sammansättningen. Den är dessutom enda kandidaten som bär både
 * `dörrsensor` och `fönstersensor` som delsträng. Fullständigt underlag i
 * lib/catalog.ts och .agent/research/dorr-och-fonstersensor.md.
 *
 * ⚠️ SIDAN RANKAR MAGNETKONTAKTEN, alltså sensorn som rapporterar till en app
 * eller hubb. Det fristående sirenlarmet som sitter på fönstret och tjuter är
 * en annan produkt och får en egen sida, /fonsterlarm. De förväxlas ständigt
 * och säljs i samma butiker, så köpguiden och en FAQ-post skiljer dem åt.
 *
 * ⚠️ FYNDET: hubben avgör, inte sensorn. Åtta av tolv talar en öppen standard,
 * fyra är låsta till ett enda märkes basstation. Följden är att sensorns pris
 * inte är priset: den billigaste på 129 kronor kräver en hubb som kostar mer
 * än den själv. Det är därför `hubbstod` väger 30.
 *
 * ⚠️ INGET TESTOMDÖMEKRITERIUM. Ingen oberoende provning av magnetkontakter
 * existerar. Råd & Rön har ingen, Stiftung Warentest har provat smarta
 * säkerhetssystem och mekaniska fönsterlås (två andra produkter, och den
 * sammanblandningen finns i flera tyska affiliatetexter), tek.no nämner dem
 * bara inuti systemtester. Det står utskrivet i metodrutan, i köpguiden och i
 * en FAQ-post, enligt IDÉ-012.
 *
 * ⚠️ SABOTAGESKYDD BÄR INGEN VIKT, efter användarbeslut. Sex av fjorton har det
 * belagt, åtta nämner det inte, och "nämner inte" är vår research och inte
 * produktens egenskap. Uppgiften ligger i tabellen och i köpguiden. Samma
 * konstruktion som `Varvtal` på /stavmixer.
 *
 * ⚠️ TRE PRODUKTER SAKNAR BETYG PÅ `batteritid` och en saknar betyg på
 * `montering`. Sidan kör förvalet `redistributeMissing: true`, alltså fördelas
 * vikten om. Det lyfter Aqara P100 från 3,55 till 4,44 och för den inom fyra
 * hundradelar från andraplatsen, vilket är samma mekanism som vände
 * /smart-belysning. Alternativet `false` hade satt noll för något Aqara valt
 * att inte publicera, och det fälls av `pnpm check:avdrag`. Kostnaden står i
 * metodrutan. Räkna om ordningen om ett batterital fastställs för P100.
 *
 * ⚠️ RING LIGGER BLAND ÖVERVÄGDA. Ring säljer sensorn i två generationer med
 * olika batteri och olika mått, och Kjell anger ingen generation. Två av fem
 * betyg hade blivit gissningar. Samma fälla som Nanoleaf Lines mot Essentials
 * på /smart-belysning.
 *
 * ⚠️ IKEA PARASOLL RANKAS INTE: märkt "Utgår inom kort" och ligger på IKEA:s
 * "Last chance to buy". Det kostar sidan IKEA:s program på 9 %.
 *
 * ⚠️ NIO AV TOLV LÄNKAR GÅR TILL KJELL, fler än vanan medger. Kjell är enda
 * butiken med både program och djup, 19 artiklar i egen kategori. Inet är
 * billigare på Aqara P2 och bär T1 och ThirdReality men saknar program.
 *
 * ⚠️ TRE KJELL-PRISER ÄR SOMMARREA: Tapo T110 129 mot 199, Aqara P2 299 mot
 * 379, Cleverio 179,90 mot 209. Kontrollera vid nästa prisrunda.
 *
 * ⚠️ TVÅ BILDER LIGGER UNDER MASTERBREDDEN 1200 px: Sonoff 915×900 (Proshop
 * serverar ingen större) och ThirdReality 724×770 (Inets egen). Båda är rätt
 * produkt. Byt vid nästa prisrunda om butiken lagt upp något större.
 *
 * Priser, lagerstatus och kundbetyg är lästa i butikens egen JSON-LD på
 * PRICE_CHECKED. Måtten är hämtade i tillverkarnas manualer och
 * specifikationsflikar, eftersom inget butiksspecblock i svepet har dem.
 *
 * AFFILIATE-SWAP — se lib/links.ts för vad LINK_MODE står på i dag.
 */

const TEST_PAGE = DORR_OCH_FONSTERSENSOR;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-07";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Bäst i test dörr- och fönstersensor 2026: tolv magnetkontakter jämförda från 129 kr. Bästa sensorn är 35 mm och håller tre år. Se vilken.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "hubb-fyndet", label: "Sensorns pris är inte priset" },
  { id: "jamforelse", label: "Jämför alla tolv" },
  { id: "recensioner", label: "Recensioner av varje sensor" },
  { id: "andra-sensorer", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function DorrOchFonstersensorPage() {
  const style = await getStyle();
  const products = DORR_OCH_FONSTERSENSOR_PRODUCTS;
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
            {/* H1 bär fyndet: hubben, inte sensorn, är det egentliga köpet. */}
            <h1 className="text-h1">
              Dörr- och fönstersensor bäst i test 2026: hubben avgör, inte
              sensorn
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vi rekommenderar Shelly BLU Door/Window ZB för 239 kronor, eftersom
              den är 35 millimeter lång och därför får plats på en smal
              fönsterkarm, med tre år på ett knappcellsbatteri. Den talar både Bluetooth och Zigbee, så hubben
              väljs i efterhand. Ska det kosta mindre gör Sonoff SNZB-04PR2
              grundjobbet för 159 kronor. Och räkna med hubben innan du jämför
              priser: fyra av de tolv sensorerna fungerar bara med ett enda
              märkes basstation, och den billigaste sensorn här kräver en som
              kostar mer än den själv.
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
        id="hubb-fyndet"
        width="default"
        title="Sensorns pris är inte priset"
        description="Fyra av tolv fungerar bara med ett enda märkes basstation."
      >
        <Prose>
          <p>
            <strong>
              Det första du bör ta reda på är inte vad sensorn kostar, utan vad
              den kräver för att fungera.
            </strong>{" "}
            En dörr- och fönstersensor är en magnetkontakt som talar om för
            någonting annat att fönstret öppnats. Vilket det andra är avgör hela
            köpet, och det står sällan i rubriken.
          </p>
          <p>
            <strong>
              Åtta av de tolv sensorerna här talar en öppen standard.
            </strong>{" "}
            Sonoff, Cleverio, ThirdReality, Shelly och Aqaras T1 kör Zigbee 3.0
            och fungerar med vilken Zigbee-hubb som helst. Fibaro kör Z-Wave
            Plus. Aqaras P2 och Multi-State P100 kör Matter över Thread, vilket
            betyder att de fungerar med en Apple TV, en Google-högtalare, en
            SmartThings-hubb eller Home Assistant utan att du köper något från
            Aqara.
          </p>
          <p>
            <strong>Fyra är låsta till ett enda märke.</strong> TP-Link Tapo T110
            kräver en Tapo H100 eller H200. Ring Alarm Contact Sensor kräver en
            Ring Alarm-basstation. eufy Security kräver en HomeBase. Philips Hue
            Secure kräver en Hue Bridge, och Yale kräver Yale Smart Hub. Har du
            ingen av dem hemma är hubben det du egentligen köper.
          </p>
          <p>
            <strong>
              Det gör den billigaste produkten på sidan till den dyraste starten.
            </strong>{" "}
            Tapo T110 kostar 129 kronor, vilket är lägsta styckpriset här, men
            bara om hubben redan står i hallen. Sonoff SNZB-04PR2 kostar 159 och
            fungerar med en Zigbee-hubb du kanske redan köpt till lamporna.
            Skillnaden på trettio kronor i butiken kan vara flera hundra i verkligt
            utlägg, åt endera hållet.
          </p>
          <p>
            <strong>Öppenheten kostar däremot något annat: utrymme.</strong>{" "}
            Aqaras P2 är den öppnaste sensorn i jämförelsen och samtidigt den
            största, 77 millimeter mot Shellys 35, och den drivs av ett CR123A
            som kostar mer och finns i färre butiker än en vanlig CR2032. Den
            mest framtidssäkra konstruktionen är alltså inte den som är enklast
            att få upp på en fönsterbåge.
          </p>
          <p>
            <strong>
              Ett tal till är värt att veta att det inte följer storleken.
            </strong>{" "}
            Sonoff drar tre års drift ur två AAA-batterier och blir 90
            millimeter lång av det. Shelly drar exakt lika länge ur ett enda
            CR2032 i ett hölje på 35 millimeter. Yale går fyra år, Cleverio
            ungefär ett. Cellstorleken förutsäger alltså inte drifttiden, och
            drifttiden betyder mer än den låter: sitter det sex sensorer i huset
            är ett år sex batteribyten om året.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa dörr- och fönstersensorerna 2026`}
        description="Varje sensor passar ett eget hem och ett eget system. Klicka på ett namn för den fullständiga recensionen."
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
        title="Recensioner av varje sensor"
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
        id="andra-sensorer"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Sju sensorer som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={DORR_OCH_FONSTERSENSOR_CONSIDERED} />
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
          footnote="Vilka hubbar den fungerar med väger 30 därför att det avgör om du kan använda sensorn alls: fyra av tolv fungerar bara med ett enda märkes basstation, och den som redan äger en annan hubb kan inte köpa dem. Batteritid väger 20 därför att spannet är en faktor fyra, från ungefär ett år till fyra, och därför att en sensor sitter uppe på en karm och glöms bort. Storlek och montering väger 15 därför att produkten ska sitta på en fönsterbåge, alltså den plats i huset där det finns minst utrymme; måtten kommer ur tillverkarnas manualer och specifikationsflikar, eftersom butikerna genomgående saknar dem. Sabotageskydd bär noll vikt: fem av de tolv skriver ut att sensorn larmar när någon bryter loss den, sju nämner det inte, och att dra av för det senare hade betygsatt hur utförligt ett produktblad är skrivet. Tre produkter saknar publicerad batteritid och en saknar publicerat mått. Deras betyg räknas på de kriterier som går att fylla i, i stället för att sättas till noll för något tillverkaren valt att inte publicera. Det innebär att de får de kriterierna gratis, och för Aqara Multi-State P100 skiljer det 0,9 i slutbetyg. Det finns ingen oberoende labbprovning av den här produktklassen att väga in. Priser, lagerstatus och kundbetyg är kontrollerade hos butiken och daterade."
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
        description="Tillverkarnas manualer och specifikationsflikar, standardorganen bakom Matter och Thread, och butikernas egna produktsidor. Ingen oberoende labbprovning av den här produktklassen finns."
      >
        <SourceList sources={sources} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={DORR_OCH_FONSTERSENSOR_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
