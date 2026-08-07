import type { Metadata } from "next";

import { testPageTrail, SMOOTHIEMIXER } from "@/lib/test-pages";
import { SOURCES_BY_HREF } from "@/lib/sources";
import {
  PRICE_CHECKED,
  SMOOTHIEMIXER_FAQ,
  SMOOTHIEMIXER_CONSIDERED,
  SMOOTHIEMIXER_PRODUCTS,
} from "@/lib/data/smoothiemixer";
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

import Kopguide from "@/content/smoothiemixer/kopguide.mdx";

/*
 * Tredje sidan i gruppen Kök, byggd 2026-08-06.
 *
 * ⚠️ Sidan rankar personliga mixrar mellan 279 och 1 799 kronor, alltså de som
 * blandar smoothien direkt i muggen du dricker ur. Sju går på batteri, fyra på
 * sladd. Bänkblenders med kanna på 1,4 till 2 liter är en annan produkt och
 * rankas inte, efter användarbeslut.
 *
 * ⚠️ INGET TESTOMDÖMEKRITERIUM. Testfaktas labbtest hos Applitest GmbH gäller
 * bänkblenders på 1,4 till 2 liter, alltså en annan produktklass. Råd & Röns
 * test av 22 smoothieblendrar är från december 2017 och deras sidfot förbjuder
 * vidarepublicering av testresultat. Samma beslut som /mjolkskummare,
 * /bluetooth-hogtalare och /pizzaugn.
 *
 * ⚠️ `mixkraft` BETYGSÄTTER DRIVLINAN och inte watten: nätdrift eller batteri,
 * angiven effekt eller spänning, varvtal och knivkonstruktion. Skälet är att
 * bara sex av elva tillverkare anger watt, och att de sladdlösa fyller samma
 * fält med milliamperetimmar eller volt. Ett kriterium satt på watt hade delat
 * ut 28 viktpoäng gratis till just de fem som tiger. Samma konstruktion som
 * `Jämn värme över stenen` på /pizzaugn.
 *
 * ⚠️ TILLVERKARNAS VILOTIDER BÄR INGEN VIKT. OBH Nordica anger 1 minut på och
 * 5 minuters paus, Smeg 60 sekunder och 60. Talen står i manualerna hos en del
 * av fältet och inte hos resten, och ett avdrag hade betygsatt vilken
 * tillverkare som skrivit ned villkoret. De ligger i tabellen och i ett eget
 * avsnitt, som drifttiden vid full effekt på /skaftdammsugare.
 *
 * ⚠️ TVÅ PRODUKTER SAKNAR ETT KRITERIEBETYG MED FLIT. Se blockkommentaren i
 * lib/data/smoothiemixer.ts.
 *
 * Priser, artikelnummer, GTIN och lagerstatus är lästa i produktsidans egen
 * JSON-LD hos butiken på PRICE_CHECKED. Specifikationerna är lästa hos
 * tillverkaren och i bruksanvisningarna.
 *
 * AFFILIATE-SWAP — se lib/links.ts för vad LINK_MODE står på i dag.
 */

const TEST_PAGE = SMOOTHIEMIXER;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Smoothiemixer bäst i test 2026: elva personliga mixrar jämförda från 279 kr. Flest mixningar ger inte längst mixtid. Se vilken som räcker längst.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "mixningen", label: "25 mixningar är 12 minuter" },
  { id: "jamforelse", label: "Jämför alla elva" },
  { id: "recensioner", label: "Recensioner av varje mixer" },
  { id: "andra-mixrar", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function SmoothiemixerPage() {
  const style = await getStyle();
  const products = SMOOTHIEMIXER_PRODUCTS;
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
            {/* H1 bär fyndet: hyllans tal är cykler och inte smoothies. */}
            <h1 className="text-h1">
              Smoothiemixer bäst i test 2026: 25 mixningar är 12 minuter
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vi rekommenderar Ninja QB3001 för 925 kronor, eftersom den ger
              700 watt ur vägguttaget, näst mest kraft här, och tar frysta bär
              hela vägen till slät smoothie. Två
              muggar på 470 milliliter, och allt utom motordelen får gå i
              diskmaskinen. Ska mixern följa med utan uttag tar du Ninja Blast
              Max för 1 189 kronor, som ger 12 minuter och 30 sekunders mixtid
              per laddning. Och läs inte antalet mixningar rakt av: en mixning
              är en programcykel på 30 sekunder.
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
        id="mixningen"
        width="default"
        title="25 mixningar är 12 minuter och 30 sekunder"
        description="Batteriet anges i programcykler, och cyklerna är olika långa."
      >
        <Prose>
          <p>
            <strong>
              Varje sladdlös mixer säljs på hur många mixningar batteriet räcker
              till, och ingen produktsida säger vad en mixning är.
            </strong>{" "}
            Ninja Blast Max anger 25, Wilfa Swift 14 och Ninja Blast 10. Talen
            ser ut att gå att jämföra rakt av, och gör det inte.
          </p>
          <p>
            <strong>
              Bruksanvisningarna definierar en mixning som en programcykel med
              bestämd längd.
            </strong>{" "}
            Ninjas owner&apos;s guide för Blast: ett tryck på start aktiverar en
            cykel på 30 sekunder. Wilfa anger ett blenderprogram på 35 sekunder.
            KitchenAid kör en hel minut och stänger sedan av automatiskt.
          </p>
          <p>
            <strong>Räknas talen om byter ordningen plats.</strong> KitchenAid Go
            anger färre mixningar än Ninja Blast Max men ger 60 procent mer
            mixtid, eftersom varje varv är dubbelt så långt.
          </p>
          <table>
            <thead>
              <tr>
                <th>Mixer</th>
                <th>Anges som</th>
                <th>Cykel</th>
                <th>Mixtid per laddning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>KitchenAid Go</td>
                <td>20 minuter</td>
                <td>60 sek</td>
                <td>20 min</td>
              </tr>
              <tr>
                <td>Ninja Blast Max</td>
                <td>25 mixningar</td>
                <td>30 sek</td>
                <td>12 min 30 s</td>
              </tr>
              <tr>
                <td>Wilfa Swift</td>
                <td>14 mixningar</td>
                <td>35 sek</td>
                <td>8 min 10 s</td>
              </tr>
              <tr>
                <td>Ninja Blast</td>
                <td>10 mixningar</td>
                <td>30 sek</td>
                <td>5 min</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>
              Och en smoothie blir sällan klar på en cykel i den svagare halvan
              av fältet.
            </strong>{" "}
            Frysta jordgubbar är kategorins svåraste ingrediens, och i en mixer
            på 45 eller 150 watt krävs ofta två eller tre varv innan de är borta.
            Fjorton mixningar blir då fem smoothies, inte fjorton.
          </p>
          <p>
            <strong>Sladd betyder ändå inte obegränsat.</strong> OBH Nordica
            skriver i sin bruksanvisning för Twister Go att maximal
            användningstid är en minut och att apparaten sedan ska vila i minst
            fem minuter. Smeg anger 60 sekunder åt gången med 60 sekunders paus.
            Två nätdrivna mixrar i samma klass, och den ena låter dig göra nästa
            smoothie fem gånger snabbare.
          </p>
          <p>
            <strong>
              Det talet du inte kan jämföra alls är motoreffekten.
            </strong>{" "}
            nutribullet fyller fältet Effekt i sin egen specifikationstabell för
            Portable med texten 2000mAh Battery. Ninja anger batterispänning,
            KitchenAid volt i produktnamnet. Sex av de elva mixrarna här anger
            watt, och där talet finns spänner det från 45 till 1 100.
          </p>
          <p>
            <strong>Sju av elva mixrar går på batteri.</strong> Det speglar
            hyllan och inte ett urval: de sladdlösa har tagit över den här delen
            av handeln på några år. Prisskillnaden mot en nätdriven med dubbla
            kraften är däremot fortfarande stor, och det är den avvägningen hela
            sidan handlar om.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa smoothiemixrarna 2026`}
        description="Varje mixer passar en egen morgon och ett eget kök. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla elva"
        description="Samma sex kriterier och samma viktning för alla elva."
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
        title="Recensioner av varje mixer"
        description="Alla elva bedöms mot samma sex kriterier."
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
        id="andra-mixrar"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Sju mixrar som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={SMOOTHIEMIXER_CONSIDERED} />
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
          footnote="Mixkraft väger 28 därför att det avgör om smoothien blir slät eller lämnar klumpar, och betyget sätts på drivlinan i stället för på watten. Skälet är att bara sex av elva tillverkare anger motoreffekt i watt: de sladdlösa fyller samma fält med milliamperetimmar eller volt, och ett kriterium satt på watt hade rangordnat efter vilken enhet tillverkaren råkat välja. Uthållighet ger varje nätdriven mixer högsta betyg, eftersom en maskin med sladd inte tar slut, och rangordnar de batteridrivna efter mixtid och laddningstid. Tillverkarnas angivna vilotider bär däremot ingen vikt alls, trots att de är sidans skarpaste uppgift: de står i bruksanvisningarna hos en del av fältet och inte hos resten, och talen ligger därför i tabellen och i ett eget avsnitt. Kapaciteten är max fyllnadsvolym och inte talet i marknadsföringen där de två skiljer sig. Kategorin saknar en oberoende provning som täcker den här produktklassen, så det finns inget kriterium för testomdöme. Priser, artikelnummer och lagerstatus är lästa på butikens egen produktsida och daterade, och specifikationerna hos tillverkaren."
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
        description="Råd & Röns provning av 22 smoothieblendrar, Testfaktas labbtest av bänkblenders och tillverkarnas egna bruksanvisningar."
      >
        <SourceList sources={sources} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={SMOOTHIEMIXER_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
