import type { Metadata } from "next";
import Link from "next/link";

import { testPageTrail, IPHONE_FODRAL } from "@/lib/test-pages";
import { IPHONE_FODRAL_SOURCES } from "@/lib/sources";
import {
  PRICE_CHECKED,
  IPHONE_FODRAL_FAQ,
  IPHONE_FODRAL_CONSIDERED,
  IPHONE_FODRAL_PRODUCTS,
} from "@/lib/data/iphone-fodral";
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

import Kopguide from "@/content/iphone-fodral/kopguide.mdx";

/*
 * ⚠️ Produkter, priser, artikelnummer och butiks-URL:er är verkliga, lästa hos
 * iPhonebutiken på PRICE_CHECKED.
 *
 * ⚠️ Inget fodral här är provat, varken av oss eller av någon annan. Kategorin
 * saknar oberoende provning helt, och sidan säger det rakt ut enligt IDÉ-012.
 *
 * ⚠️ SLUGEN KROCKAR MED /iphone-skal, och det är ett känt och accepterat
 * beslut. Ordet fodral bär två betydelser i svensk handel. Motåtgärden ligger
 * här: H1, title, ingress och metabeskrivning säger alla plånboksfodral och
 * inte bara fodral, och sidan korslänkar /iphone-skal i ingressen, i metoden,
 * i köpguiden och i FAQ. Se kommentaren i lib/catalog.ts.
 *
 * ⚠️ RFID ingår i inget kriterium, och RadiCovers strålningspåstående återges
 * inte alls. Se lib/data/iphone-fodral.ts.
 *
 * AFFILIATE-SWAP — länkarna går direkt till butiken, ospårat och dofollow.
 */

const TEST_PAGE = IPHONE_FODRAL;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "iPhone plånboksfodral bäst i test 2026: tolv fodral med kortfack jämförda från 149 kr. Bara fem laddar genom fodralet. Se vilka.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilket ska du köpa?" },
  { id: "laddningen", label: "Sju av tolv stänger av laddningen" },
  { id: "jamforelse", label: "Jämför alla tolv" },
  { id: "recensioner", label: "Recensioner av varje fodral" },
  { id: "andra-fodral", label: "Andra fodral vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function IphoneFodralPage() {
  const style = await getStyle();
  const products = IPHONE_FODRAL_PRODUCTS;
  const [winner] = products;
  const author = DEFAULT_AUTHOR;
  const reviewer = DEFAULT_REVIEWER;

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
            {/* H1 bär avgränsningen och skiljer sidan från /iphone-skal: ordet
                fodral ensamt betyder både plånboksfodral och mobilskydd. */}
            <h1 className="text-h1">
              iPhone plånboksfodral bäst i test 2026: tolv uppfällbara fodral,
              från 149 till 799 kr
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Vår testvinnare är Nomad Modern Leather Folio för 699 kronor,
              eftersom fullnarvigt läder från ett namngivet garveri mörknar och
              blir vackrare med åren där konstläder spricker i vecket.
              Magnetringen låter dessutom
              telefonen laddas kvar i fodralet. Vill du bara bära ett par kort
              gör Trolsks fodral för 199 samma sak. Sju av tolv fodral stänger av
              den trådlösa laddningen helt, och det står aldrig i produktnamnet.{" "}
              <Link href="/iphone-skal" className="underline underline-offset-4">
                Söker du ett vanligt skyddsskal utan kortfack ligger den
                jämförelsen här.
              </Link>
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

      {/* ---------------------------------------- fyndet, före tabellen -- */}
      <Section
        id="laddningen"
        width="default"
        title="Sju av tolv fodral stänger av den trådlösa laddningen"
      >
        <Prose>
          <p>
            Ett uppfällbart plånboksfodral lägger material mellan telefonens
            laddspole och laddaren. Följden är att den trådlösa laddningen slutar
            fungera, och telefonen måste ur fodralet varje kväll.
          </p>
          <p>
            Sju av de tolv fodralen i jämförelsen gör det. Fem gör det inte, och
            det syns varken på priset eller på produktnamnet. Trolsk säljer ett
            fodral för 199 kronor som laddar trådlöst med magnetring, och ett för
            249 som inte laddar alls. Guess Book 4G kostar 399 kronor och
            blockerar laddningen helt.
          </p>
          <p>
            Det finns dessutom tre nivåer och inte två. Ett fodral kan blockera
            laddningen helt, det kan ladda på en platt Qi-platta men sakna
            magnetring så att laddaren måste läggas rätt för hand, eller det kan
            ha magnetring så att laddaren dras till rätt läge av sig själv. Bara
            två fodral här klarar det sista.
          </p>
          <p>
            Uppgiften står i specifikationen men aldrig i rubriken. Den är värd
            att kontrollera före allt annat, eftersom den avgör hur fodralet
            känns varje dag snarare än hur det ser ut i butiken.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        tone="muted"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa plånboksfodralen 2026`}
        description="Varje fodral har en egen etikett som säger vem det passar. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla tolv"
        description="Samma kriterier och samma viktning för alla tolv fodralen. Raderna att läsa först är kortfacken och den trådlösa laddningen: den ena spänner från två till tio, den andra fungerar bara på fem av tolv."
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
        title="Recensioner av varje fodral"
        description="Tolv uppfällbara fodral mellan 149 och 799 kronor, bedömda på hur mycket plånbok du får, vad de är gjorda av och om telefonen kan ligga kvar på laddaren."
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
        id="andra-fodral"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra fodral vi övervägde"
        description="Sex produkter som fanns med i urvalet men inte i rankningen. De flesta är inte sämre fodral utan andra produkter, och skälet säger vilken."
      >
        <ConsideredList items={IPHONE_FODRAL_CONSIDERED} />
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
          footnote="Kortkapacitet och konstruktion väger 25 var, eftersom ett plånboksfodral köps för att bära kort men samtidigt är telefonens enda skydd. Sidan har inget kriterium för testomdöme: ingen har provat plånboksfodral, varken i Sverige eller internationellt. RFID-skydd betygsätts inte heller, och det är ett eget beslut med tre skäl. Ingen tillverkare anger dämpning, frekvens eller standard. Uppgiften skiljer inte produkterna åt, eftersom både det billigaste och det dyraste fodralet anger den. Och den enda oberoende utvärdering som gjorts av RFID-blockerande produkter kringgick 8 av 11 blockeringskort men uteslöt uttryckligen de skärmande korten, alltså just den mekanism ett fodral använder. Att låna det resultatet hit vore ett provresultat från en annan produkt. Ett fodral bär dessutom en strålningsdämpande membranuppgift som varken återges eller bemöts här, eftersom ett hälsopåstående kräver en myndighetskälla vi inte läst i original. En uppgift vi inte har fått fram drar aldrig av på ett betyg: fodralet är vad det är oavsett vad vi hann läsa, och den tomma rutan står som ett streck i tabellen i stället."
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
        description="Den enda utvärdering som gjorts av RFID-blockerande produkter, plus de svenska jämförelser som rankar samma sorts fodral."
      >
        <SourceList sources={IPHONE_FODRAL_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={IPHONE_FODRAL_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
