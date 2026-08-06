import type { Metadata } from "next";

import { KODLAS_YTTERDORR, testPageTrail } from "@/lib/test-pages";
import { KODLAS_SOURCES } from "@/lib/sources";
import {
  CERTS_CHECKED,
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
 * ⚠️ Priser, upplåsningsmetoder, antal koder och brickor, batterityp, IP-klass
 * och kundbetyg är lästa på Kjells egen sida på PRICE_CHECKED. Samtliga elva
 * certifikat är lästa ett i taget hos SBSC på CERTS_CHECKED. Dörrtjockleken
 * för Doorman Classic är läst i Yales egen installationsguide. Normtexten är
 * läst hos Stöldskyddsföreningen. Kriteriebetygen är redaktionell bedömning.
 * Vi har inte monterat, dyrkat eller provat något lås.
 *
 * Sidans fynd, i den ordning de står:
 *
 * 1. #certifikatet — samtliga fem certifierade lås bär ett villkorsfält, och
 *    två av dem stänger av den funktion produkten säljs på: Yale Doorman L3
 *    kräver blockerade användarkoder för sitt S3-godkännande, Nimly kräver att
 *    kamouflagefunktionen är avstängd. Formuleras försiktigt: vad certifikatet
 *    omfattar, aldrig vad försäkringen gör.
 * 2. #lasenheten — godkänd låsenhet är fyra delar och varje del måste nå
 *    klass 3. Nimly Code är exemplet: klass 3-låshus och klass 3-slutbleck,
 *    men en cylinder i 2A som kapar hela enheten.
 * 3. #vad-som-provas — ett digitalt certifikat i klass S3 provar mekaniskt
 *    skydd, hantering av digitala nycklar enligt SSF 1075 och elektroniskt
 *    angrepp enligt prEN 16867. Tre axlar, inte en.
 *
 * ⚠️ Registret ÄR sökbart, tvärtemot vad den här sidan påstod till 2026-08-06.
 * Varje certifikat ligger på en egen URL under sbsc.se/produktcertifikat/, och
 * varje innehavare har en sida som räknar upp sina. Se rättelsen i
 * lib/corrections.ts och .agent/research/kodlas-ytterdorr.md §6.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 */
const TEST_PAGE = KODLAS_YTTERDORR;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Yale Doorman L3S Flex för 5 488 kronor vinner: enda låset certifierat i både klass 3 och S3, alltså även prövat på hur appen hanterar nycklarna. Nimly Code Pro tar 999 koder för 4 490. Sex kodlås till ytterdörr, elva certifikat lästa i original.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilket ska du köpa?" },
  { id: "certifikatet", label: "Varje certifikat har ett villkor" },
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
              Yale Doorman L3S Flex vinner för 5 488 kronor, som enda låset
              certifierat i två normer och därmed prövat även på hur appen
              hanterar dina nycklar. Men varje certifikat kommer med villkor:
              Yales digitala godkännande gäller med användarkoderna blockerade,
              och Nimlys klass 3 kräver att kamouflagefunktionen är avstängd.
              Vi läste normen och samtliga elva certifikat i original, och
              jämförde sex lås från 1 990 till 5 488 kronor.
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
      {/* Först av allt, eftersom det ändrar vad läsaren ska fråga butiken om. */}
      <Section
        id="certifikatet"
        width="default"
        title="Varje certifikat har ett villkor"
        description="Fem av sex lås är certifierade. Alla fem godkännandena gäller bara i ett bestämt läge, och det står i ett fält längst ned."
      >
        <Prose>
          <p>
            Ett SBSC-certifikat ger dig ett nummer, en klass och ett datum,
            utfärdat av någon annan än tillverkaren. Längst ned står ett fält
            som heter <em>Övrigt</em>, eller <em>Additional</em> i den engelska
            versionen, och där står vad godkännandet faktiskt omfattar.
          </p>
          <p>
            <strong>Samtliga fem certifierade lås här har ett sådant villkor.</strong>{" "}
            Två av dem stänger av en funktion produkten säljs på.
          </p>
          <p>
            <strong>Yale Doorman L3.</strong> Certifikat 21-537, klass S3 enligt
            SSF 3523:{" "}
            <em>
              &quot;Gäller bortasäkert läge med blockerade användarkoder och
              låsöppning med nyckelbricka eller med appen Yale Home.&quot;
            </em>{" "}
            Den digitalt prövade konfigurationen har alltså koderna blockerade,
            i en kategori som heter kodlås. Låsets mekaniska godkännande,
            certifikat 20-172 i klass 3, bär inga sådana villkor och gäller
            oavsett hur du öppnar.
          </p>
          <p>
            <strong>Nimly Code Pro och Nimly Code.</strong> Koderna ska ha minst
            fyra siffror, anti-inbrottsfunktionen ska vara på, bortasäkert läge
            ska vara på, tvåfaktorsinloggning ska vara på, och{" "}
            <strong>kamouflagefunktionen ska vara avstängd</strong>. Det är
            funktionen som låter dig omge koden med slumpsiffror så att den inte
            går att läsa av över axeln. Här är det alltså koden som räknas och
            skyddet runt den som ska bort.
          </p>
          <p>
            <strong>Yale Doorman Classic.</strong> Certifikat 20-19 gäller med
            integritetsswitchen i läge hög, automatisk låsning påslagen och
            upplåsning med nyckelbricka eller nyckelbricka plus kod.{" "}
            <strong>Yale Linus L2.</strong> Certifikat 24-365 gäller tillsammans
            med Yale Dot, NFC-taggen som ligger i lådan.
          </p>
          <p>
            Det är ingen märklighet hos ett enskilt märke. Stöldskyddsföreningen
            skriver samma sak i allmän form, två gånger på sin egen sida: det
            finns begränsningar i vilka funktioner som får aktiveras för att
            uppfylla kraven för godkänd låsenhet, vilket betyder att låsenheten
            är certifierad med vissa, men inte alla, inställningar aktiverade.
          </p>
          <p>
            <strong>Vad det betyder ska sägas försiktigt.</strong> Certifikatet
            säger vad godkännandet omfattar. Det säger inte att låset blir
            osäkert för att du slår på en funktion, och det säger ingenting om
            vad just ditt försäkringsbolag accepterar. Vad det säger är att den
            provade konfigurationen sällan är den som säljs in.
          </p>
          <p>
            Ring försäkringsbolaget och fråga specifikt om den öppningsmetod du
            tänkt använda. Det tar fem minuter, och det är enklare före köpet än
            efter en inbrottsanmälan.
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
            <strong>Nimly Code visar exakt hur det slår.</strong> Låset bär tre
            SBSC-certifikat. Låshuset är klass 3, slutblecket är klass 3, och
            mekatronikcylindern är klass 2A. Eftersom varje ingående del ska nå
            klass 3 var för sig blir hela enheten 2A, och det är cylindern som
            avgör det. Storebrodern Nimly Code Pro har klass 3 på alla tre.
          </p>
          <p>
            <strong>Klass 2A ser nära ut och är det inte.</strong> Kravet på
            inbrottsskydd från dörrens utsida är detsamma som för klass 3, men
            manövreringen från insidan underordnas utgång och utrymning. SSF:s
            eget exempel är lägenheter utan annan entréväg, och de skriver i
            samma mening: kontrollera försäkringskrav. Tre av de sex låsen här
            är certifierade i 2A.
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
        description="Under Godkännande står klassen låset är certifierat i. Under Villkor i certifikatet står vad godkännandet kräver av dig."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Klass, certifikatnummer, villkor och giltighetstid är hämtade ur SBSC:s certifikat, ett i taget, den ${CERTS_CHECKED}. Nimly Code står som klass 2A därför att dess mekatronikcylinder är certifierad i 2A, trots att låshus och slutbleck är klass 3: en godkänd låsenhet kräver klass 3 av varje del var för sig.`)}
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
            <strong>Varje certifikat är läst i original.</strong> Elva stycken,
            ett i taget, hos SBSC: klass, nummer, giltighetstid och villkorsfält
            för varje lås som har ett. Klasserna är dessutom bekräftade en andra
            gång på tillverkarens egen sida, och de stämmer överens överallt
            utom på en punkt som förtjänar sin egen rad nedan.
          </p>
          <p>
            <strong>Nimly Code är svårare att klassa än den ser ut.</strong>{" "}
            Certifikaten ger klass 3 på låshus och slutbleck men 2A på
            cylindern. Vi väger enheten som 2A, eftersom normen kräver klass 3
            av varje del var för sig, och det är också vad Nimly själva skriver.
            Anser ditt försäkringsbolag något annat är det deras bedömning som
            gäller.
          </p>
          <p>
            <strong>Vinnaren är dyrast, och det följer av viktningen.</strong>{" "}
            Godkänd låsenhet väger trettio procent, och Yale Doorman L3S är
            ensam om att vara prövad enligt den digitala normen. Väger du
            vardagen tyngre än vi gör är Nimly Code Pro det bättre köpet: 999
            koder mot 30, fingerläsare, drift ner till 35 minusgrader och 1 000
            kronor mindre.
          </p>
          <p>
            <strong>Vi har inte provat något lås.</strong> Vi har inte monterat,
            dyrkat eller köldprovat något av dem, och skriver därför ingenting
            om hur de känns, låter eller står sig efter tre vintrar. Det som
            står här är normen, certifikaten och tillverkarens egna mått.
          </p>
          <p>
            <strong>Alla sex länkar går till Kjell.</strong> De är den enda
            svenska butik vi gått igenom som redovisar låsklass per produkt i
            sin specifikation, och den enda som skriver ut det negativa när ett
            lås inte är godkänt. Vi skriver hellre samma butiksnamn sex gånger
            än hittar på ett pris vi inte läst.
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
          footnote="Godkänd låsenhet väger tyngst eftersom det är den egenskap som avgör om låset duger till det många köper det för, och eftersom skillnaderna är dokumenterade av normgivaren och certifieringsorganet. Skalan är 5,0 för klass 3 eller S3 på varje certifierad del och prövning även enligt den digitala normen SSF 3523, 4,5 för klass 3 på varje certifierad del men bara enligt den mekaniska normen, 2,5 för certifiering i klass 2A, och 1,0 när låset anges vara icke godkänt. Ett villkor i certifikatet sänker inte betyget, eftersom det är köparen som avgör om villkoret spelar roll för hen; villkoren står i stället i tabellen och i varje omdöme. Kriteriet Dörren och installationen väger 25 eftersom svenska ytterdörrar har ett eget låsuttag som internationella lås sällan matchar, och eftersom arkitekturen avgör om en befintlig godkänd låsenhet kan stå kvar orörd. Vi hittade inget svenskt test av kategorin. Priserna är hos den butik vi länkar till."
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
            <strong>Men primärkällorna är starkare här än i någon annan kategori vi byggt.</strong>{" "} I stället för ett test finns en svensk norm, ett certifieringsorgan och elva certifikat med nummer, klass, giltighetstid och villkor. Samtliga är lästa i original och citerade ordagrant, i stället för att refereras via en tredje part.
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
