import type { Metadata } from "next";

import { KODLAS_YTTERDORR, testPageTrail } from "@/lib/test-pages";
import { KODLAS_SOURCES } from "@/lib/sources";
import {
  KODLAS_CONSIDERED,
  KODLAS_FAQ,
  KODLAS_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/kodlas-ytterdorr";
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

import Kopguide from "@/content/kodlas-ytterdorr/kopguide.mdx";

/*
 * ⚠️ Priser, upplåsningsmetoder, antal koder och brickor, dörrtjocklek,
 * batterityp, IP-klass, kundbetyg och vilken låsklass butiken anger är
 * riktiga, lästa på Kjells egen sida på PRICE_CHECKED. Certifikatuppgiften är
 * läst i SBSC:s eget certifikat 21-537. Normtexten är läst hos
 * Stöldskyddsföreningen. Kriteriebetygen är redaktionell bedömning. Vi har
 * inte monterat, dyrkat eller provat något lås.
 *
 * Sidans fynd, i den ordning de står:
 *
 * 1. #certifikatet — SBSC-certifikat 21-537 för Yale Doorman L3 gäller enligt
 *    sitt eget fält Additional "bortasäkert läge med blockerade
 *    användarkoder". Kategorin heter kodlås. Formuleras försiktigt: vad
 *    certifikatet omfattar, inte vad försäkringen gör.
 * 2. #lasenheten — godkänd låsenhet är fyra delar och varje del måste nå
 *    klass 3. Klass 2A ser nära ut och är det inte.
 * 3. #vad-som-provas — ett digitalt certifikat i klass S3 provar mekaniskt
 *    skydd, hantering av digitala nycklar enligt SSF 1075 och elektroniskt
 *    angrepp enligt prEN 16867. Tre axlar, inte en.
 *
 * ⚠️ SBSC:s register renderas i JavaScript och deras REST-API svarar 403. Vi
 * kan inte räkna upp registret och påstår därför aldrig att ett märke saknar
 * certifikat. Kriteriet mäter vad butik och tillverkare själva anger.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 */
const TEST_PAGE = KODLAS_YTTERDORR;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-03";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "SBSC-certifikatet för Yale Doorman gäller med blockerade användarkoder, på en produkt som säljs som kodlås. Vi jämförde sex kodlås till ytterdörr från 1 990 till 5 488 kronor mot vad som faktiskt är certifierat.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilket ska du köpa?" },
  { id: "certifikatet", label: "Certifikatet gäller inte koden" },
  { id: "lasenheten", label: "Godkänd låsenhet är fyra delar" },
  { id: "jamforelse", label: "Jämför alla sex" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "vad-som-provas", label: "Vad ett digitalt certifikat provar" },
  { id: "recensioner", label: "Recensioner av varje lås" },
  { id: "andra-las", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function KodlasPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = KODLAS_PRODUCTS;
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
              Certifikatet för marknadens ledande kodlås gäller enligt SBSC
              bortasäkert läge med blockerade användarkoder. Kategorin heter
              kodlås, och den funktion som gett den namnet ligger utanför den
              provade konfigurationen. Vi läste normen, certifikatet och sex
              produkters låsklass, och jämförde lås från 1 990 till 5 488
              kronor mot vad som faktiskt går att kontrollera före köp.
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
        <TocNav
          variant="inline"
          entries={TOC}
          className="mt-block lg:hidden"
        />
      </Section>

      {/* --------------------------------------------------- the finding -- */}
      {/* Först av allt, eftersom det ändrar vad läsaren ska fråga butiken om. */}
      <Section
        id="certifikatet"
        width="default"
        title="Certifikatet gäller inte koden"
        description="Ett nummer, en klass och ett datum, utfärdat av någon annan än tillverkaren. Läs sedan vad det omfattar."
      >
        <Prose>
          <p>
            Svensk Brand- och Säkerhetscertifiering har utfärdat certifikat{" "}
            <strong>21-537</strong> för Yale Doorman L3 tillsammans med Yale
            Home. Klass S3 enligt SSF 3523, giltigt till den 27 november 2027.
          </p>
          <p>
            I certifikatets fält <em>Additional</em> står vad godkännandet
            omfattar:{" "}
            <em>
              &quot;Gäller bortasäkert läge med blockerade användarkoder och
              låsöppning med nyckelbricka eller med appen Yale Home.&quot;
            </em>
          </p>
          <p>
            <strong>Den certifierade konfigurationen har koderna blockerade.</strong>{" "}
            Produkten säljs i en kategori som heter kodlås, 5 400 svenskar i
            månaden söker på just koden, och den funktionen ligger utanför det
            provade läget.
          </p>
          <p>
            Det är ingen märklighet hos just Yale. Stöldskyddsföreningen skriver
            samma sak i allmän form, två gånger på sin egen sida: det finns
            begränsningar i vilka funktioner som får aktiveras för att uppfylla
            kraven för godkänd låsenhet, vilket betyder att låsenheten är
            certifierad med vissa, men inte alla, inställningar aktiverade.
          </p>
          <p>
            <strong>Vad det betyder ska sägas försiktigt.</strong> Certifikatet
            säger vad godkännandet omfattar. Det säger inte att låset blir
            osäkert av en kod, och det säger ingenting om vad just ditt
            försäkringsbolag accepterar. Vad det säger är att den provade
            konfigurationen inte är den de flesta använder.
          </p>
          <p>
            Ring försäkringsbolaget och fråga specifikt om kodöppning. Det tar
            fem minuter, och det är enklare före köpet än efter en
            inbrottsanmälan.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------------- the norm -- */}
      <Section
        id="lasenheten"
        tone="muted"
        width="default"
        title="Godkänd låsenhet är fyra delar"
        description="Begreppet allting hänger på, och det missförstås nästan alltid."
      >
        <Prose>
          <p>
            En godkänd låsenhet är enligt Stöldskyddsföreningen hela enheten:{" "}
            <strong>
              låshus, låscylinder, säkerhetsslutbleck och förstärkningsbehör
            </strong>
            . För att vara godkänd ska hela enheten och varje ingående produkt
            var för sig nå klass 3 enligt SSF 3522, eller klass S3 enligt
            SSF 3523 för digitala enheter.
          </p>
          <p>
            Det betyder att ett godkänt lås i en dörr utan säkerhetsslutbleck
            inte ger en godkänd låsenhet. Delarna räknas tillsammans, och
            svagast länk avgör.
          </p>
          <p>
            <strong>Klass 2A ser nära ut och är det inte.</strong> Kravet på
            inbrottsskydd från dörrens utsida är detsamma som för klass 3, men
            manövreringen från insidan underordnas utgång och utrymning. SSF:s
            eget exempel är lägenheter utan annan entréväg, och de skriver i
            samma mening: kontrollera försäkringskrav. Ett av låsen i vår
            jämförelse anges av butiken som klass 2A.
          </p>
          <p>
            <strong>CE-märkning är inte ett godkännande.</strong> CE är
            tillverkarens egen försäkran om att produkten uppfyller tillämpliga
            EU-krav och säger ingenting om inbrottsskydd. Ett godkännande enligt
            SSF kräver tredjepartscertifiering: ett oberoende organ
            kontrollerat att provningen skett korrekt och med godkänt resultat.
          </p>
          <p>
            Och SSF:s egen varning, i fetstil på deras sida:{" "}
            <em>
              &quot;Kontrollera alltid vad försäkringsbolag/kravställare har för
              krav på låsenhet innan du förändrar något!&quot;
            </em>
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
        title={`De ${products.length} bästa kodlåsen till ytterdörr 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sex"
        description="Under Godkännande står det som är belagt. Under Certifikatet gäller står vad godkännandet omfattar."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Raden Godkännande återger vad butiken eller certifikatet anger, ordagrant. Där ingen klass anges betyder det att butiken inte publicerar någon, inte att låset saknar godkännande: vi kan inte slå upp varje enskilt lås i SBSC:s register, så vi kan varken bekräfta eller utesluta ett certifikat vi inte sett.`)}
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
            <strong>Certifikatregistret går inte att slå i.</strong> SBSC har
            ett register över godkända lås, men det går inte att söka fritt i.
            Vi kan därför aldrig påstå att ett märke saknar certifikat. Det vi
            betygsätter är vad butiken och tillverkaren själva anger, vilket
            också är det enda du kan kontrollera innan du betalar. Att
            registret är så svårt att komma åt är i sig värt att veta.
          </p>
          <p>
            <strong>Vinnaren är dyrast, och det följer av viktningen.</strong>{" "}
            Godkänd låsenhet väger trettio procent, och Yale Doorman L3S är det
            enda låset där vi läst ett certifikat. Väger du vardagen tyngre än
            vi gör är Nimly Code Pro starkare: 999 koder mot 30, fingerläsare,
            och drift ner till 35 minusgrader.
          </p>
          <p>
            <strong>
              Ett lågt betyg på godkännande är inte en dom över låset.
            </strong>{" "}
            Yale Doorman Classic Home får 1,5 därför att butiken inte anger
            någon klass, inte därför att vi vet något negativt. Yales
            Doorman-familj har historiskt varit försäkringsgodkänd. Betrakta
            placeringen som en uppmaning att fråga efter certifikatnumret.
          </p>
          <p>
            <strong>Alla sex länkar går till Kjell.</strong> De är den enda
            svenska butik vi hittat som redovisar låsklass per produkt i sin
            specifikation, och den enda som skriver ut det negativa när ett lås
            inte är godkänt. Vi skriver hellre samma butiksnamn sex gånger än
            hittar på ett pris vi inte läst.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------ what is tested -- */}
      <Section
        id="vad-som-provas"
        width="default"
        title="Vad ett digitalt certifikat provar"
        description="Tre axlar och inte en. Det är därför skillnaden är större än prislappen antyder."
      >
        <Prose>
          <p>
            En digital låsenhet i klass S3 måste klara tre saker samtidigt, och
            bara den första handlar om metall.
          </p>
          <p>
            <strong>Mekaniskt inbrottsskydd</strong> enligt SSF 3522, lägst
            klass 3. Alltså hållfasthet, motstånd mot dyrkning och
            manipulering, och mot manuella och elektriska angrepp.
          </p>
          <p>
            <strong>Hantering av digitala nycklar</strong> enligt{" "}
            <strong>SSF 1075</strong>, lägst klass D. Normen heter Distribution,
            lagring och användning av digitala nycklar, och den granskar alltså
            hur appen och tjänsten bakom låset hanterar det som öppnar din dörr.
          </p>
          <p>
            <strong>Motstånd mot elektroniskt angrepp</strong> enligt{" "}
            <strong>prEN 16867</strong>, lägst grade C.
          </p>
          <p>
            Det är en väsentligt djupare prövning än ett CE-märke, och den
            förklarar varför ett certifierat digitalt lås kostar mer än ett
            oceritifierat med fler funktioner. Du betalar inte för knapparna
            utan för att någon annan granskat både låskistan och nyckelhanteringen.
          </p>
          <p>
            Stöldskyddsföreningen noterar samtidigt att SSF 3523 saknar
            motsvarighet till SSF 3522 klass 4. Den digitala skalan går S1, S2,
            S3 och sedan direkt till S5.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje lås"
        description="Alla sex bedöms mot samma fem kriterier. Uppgifterna är butikens egna, utom certifikatet som är läst hos SBSC."
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
        id="andra-las"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Fem poster som inte hamnade i rankningen, inklusive två som saknar specifikation helt och två tillbehör som avgör slutpriset."
      >
        <ConsideredList items={KODLAS_CONSIDERED} />
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
          footnote="Godkänd låsenhet väger tyngst eftersom det är den enda egenskapen som avgör om låset duger till det många köper det för, och eftersom skillnaderna är dokumenterade av normgivaren och certifieringsorganet. Skalan är 5,0 när vi läst ett certifikat hos SBSC med nummer, klass och giltighetstid, 4,0 när butik eller tillverkare anger klass 3 eller S3 men vi inte hittat certifikatet, 2,5 när en klass anges men lägre än 3, 1,5 när ingen klass anges alls, och 1,0 när butiken uttryckligen skriver att låset inte är godkänt. Vi påstår aldrig att ett märke saknar certifikat, eftersom vi inte kan slå upp varje lås i registret. Kriteriet Dörren och installationen väger 25 eftersom svenska ytterdörrar har ett eget låsuttag som internationella lås sällan matchar, och eftersom arkitekturen avgör om en befintlig godkänd låsenhet kan stå kvar orörd. Vi hittade inget svenskt test av kategorin. Priserna är hos den butik vi länkar till."
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
        description="Certifikatet, normgivarens definition av godkänd låsenhet, certifieringsorganets guide och butiken som bär priserna."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Det finns inget svenskt test av kodlås till ytterdörr.
            </strong>{" "}
            Varken Råd &amp; Rön eller Testfakta har testat kategorin.
          </p>
          <p>
            <strong>Men primärkällorna är starkare här än i någon annan kategori vi byggt.</strong>{" "} I stället för ett test finns en svensk norm, ett certifieringsorgan och ett certifikat med nummer, klass och giltighetstid. Alla fyra källor är lästa i original och citerade ordagrant, i stället för att refereras via en tredje part.
          </p>
        </Prose>
        <SourceList sources={KODLAS_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={KODLAS_FAQ} schema />
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
