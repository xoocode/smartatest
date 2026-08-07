import type { Metadata } from "next";

import { UTRYMNINGSSTEGE, testPageTrail } from "@/lib/test-pages";
import { UTRYMNINGSSTEGE_SOURCES } from "@/lib/sources";
import {
  UTRYMNINGSSTEGE_CONSIDERED,
  UTRYMNINGSSTEGE_FAQ,
  UTRYMNINGSSTEGE_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/utrymningsstege";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
import { getStyle } from "@/lib/style-server";
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

import Kopguide from "@/content/utrymningsstege/kopguide.mdx";

/*
 * ⚠️ Priser, längder, mått, material, stegbredd, stegavstånd, angiven maxlast,
 * vad som ingår och vilken standard eller vilket godkännande tillverkaren anger
 * är riktiga. Priser lästa på butikens egen sida på PRICE_CHECKED, tekniska
 * uppgifter i tillverkarnas egna produktblad, monteringsanvisningar och
 * certifikat 2026-08-06. Kriteriebetygen är redaktionell bedömning. Vi har inte
 * belastat, monterat eller klättrat i någon stege.
 *
 * Sidans tre fynd, i den ordning de står:
 *
 * 1. #godkannandet — SINTEF Certification har en produktgrupp för räddningsstegar
 *    med fyra godkända produkter, och en av dem säljs i Sverige. Frånvaron hos de
 *    övriga är belagd genom att läsa registret och W.Steps egna RISE-intyg, inte
 *    genom att de saknas i en butikstext.
 * 2. #stegpinnen — stegbredden spänner 240 till 400 mm medan stegavståndet är
 *    300 mm hos samtliga. Det är den största fysiska skillnaden mellan stegarna
 *    och ingen svensk jämförelse nämner den. Hittat 2026-08-06 i tillverkarnas
 *    egna dokument, se .agent/research/utrymningsstege.md.
 * 3. #prisskillnaden — samma artikelnummer skiljer 49 procent mellan två
 *    svenska butiker. Eget avsnitt eftersom det gäller butiken och inte varan.
 *
 * Avsnittet #vem-har-kontrollerat togs bort 2026-08-06. Det upprepade
 * metodrutan och ägnade tre stycken åt vad vi läst i stället för åt stegarna.
 * Metoden står i viktningen, en gång. Se lib/corrections.ts.
 *
 * Systersida till /brandstege, som rankar de hängande stegarna. Se
 * lib/categories.ts för viktningen och .agent/research/utrymningsstege.md för
 * underlaget.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 * Se lib/links.ts.
 */

const TEST_PAGE = UTRYMNINGSSTEGE;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Modum Original är den enda stege som är provad och godkänd för utrymning, och 3,9 meter kostar 9 621 kronor. Housegard EL39 gör jobbet för 3 695. Vi jämförde fem fasta fasadstegar på stegbredd, räckvidd och vilka väggar de går upp på.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "godkannandet", label: "Godkännandet fyra stegar har" },
  { id: "stegpinnen", label: "16 centimeter skiljer stegpinnarna" },
  { id: "hojdgranserna", label: "Två höjdgränser som inte går ihop" },
  { id: "jamforelse", label: "Jämför alla fem" },
  { id: "prisskillnaden", label: "Samma stege, 49 procent dyrare" },
  { id: "recensioner", label: "Recensioner av varje stege" },
  { id: "andra-stegar", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function UtrymningsstegePage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = UTRYMNINGSSTEGE_PRODUCTS;
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
              <strong>Modum Original</strong> är den enda stegen i svensk handel
              som en tredje part provat och godkänt för utrymning, den finns i
              sexton längder så att den slutar där fönstret börjar, och 3,9 meter
              kostar 9 621 kronor. Har du inte 9 621 kronor gör{" "}
              <strong>Housegard EL39</strong> samma jobb för 3 695. Vi jämförde
              fem fabrikat på stegbredden du sätter foten på, hur högt de når och
              vilka väggar de går upp på.
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
      {/* Först av allt, eftersom det ordnar om vad läsaren tror att pengarna
          köper. Priset följer inte dokumentationen i den här kategorin. */}
      <Section
        id="godkannandet"
        width="default"
        title="Godkännandet fyra stegar har"
        description="Fyra stegar i världen är provade och godkända för utrymning från fönster. En av dem säljs i Sverige."
      >
        <Prose>
          <p>
            SINTEF Certification i Norge har en produktgrupp som heter{" "}
            <em>Redningsstiger</em>. I den ligger{" "}
            <strong>fyra godkända stegar</strong>: Hardhaus, Modum, Norstigen och
            Sørlandsstigen. Av dem säljs en i Sverige.
          </p>
          <p>
            Certifikatet TG 2536 är fyra sidor, och det som står där är vad
            stegen faktiskt provats till:{" "}
            <strong>provlast 2,6 kN</strong> mitt på steget och vid yttre vangen,
            vilket enligt certifikatet motsvarar två personer samtidigt i varje
            stegenhet. Brandklass A1. Träskruv på minst 6 millimeter parvis med
            högst 6 decimeter mellan infästningarna, i panel på minst 19
            millimeter. Godkänt för fönster upp till 5,0 meter över marken, och
            7,5 meter med ryggbygel. Giltigt till den 1 april 2028.
          </p>
          <p>
            De fyra övriga är inte provade av någon tredje part för det här
            ändamålet, och det är kontrollerat och inte antaget: SINTEF:s
            register är uppräknat, och W.Steps båda RISE-intyg är lästa i sin
            helhet. P-märket gäller glidskydd för lösa stegar och
            typkontrollintyget bärbara stegar och arbetsbockar. Utrymningsstegarna
            står i ingetdera.
          </p>
          <p>
            <strong>
              Housegard är den enda av de fyra som anger vad stegen bär: 150 kilo
              och en person i taget.
            </strong>{" "}
            Tillverkaren skriver också att EL39 är provad mot EN 131-1 och
            EN 131-2. Det är inget tredjepartsintyg, men det är ett åtagande med
            ett tal i, och för 3 695 kronor är det mer än stegarna för elva och
            fjorton tusen lämnar ifrån sig.
          </p>
        </Prose>
      </Section>

      {/* --------------------------------------------- the physical finding -- */}
      {/* Nytt 2026-08-06. Stegbredden kom ur tillverkarnas egna produktblad och
          bruksanvisningar, som ingen butik återger. Ingen svensk jämförelse i
          kategorin nämner måttet. */}
      <Section
        id="stegpinnen"
        width="default"
        title="16 centimeter skiljer stegpinnarna"
        description="Stegbredden spänner från 240 till 400 millimeter. Avståndet mellan stegen är 300 hos alla fem."
      >
        <Prose>
          <p>
            Du kommer att klättra ner barfota eller i strumplästen, i mörker,
            förmodligen med någon framför dig. Då är det en enda siffra som
            avgör hur det går: hur mycket fot du får på pinnen.
          </p>
          <p>
            Housegard EL39 har <strong>240 millimeter</strong> brett steg.
            Modum har 311, W.Steps 320 har 320 och W.Steps 400 har{" "}
            <strong>400</strong>. Det är 16 centimeter mellan smalast och
            bredast, alltså skillnaden mellan halva foten och hela foten på
            pinnen. Skeppshultstegen anger 430 millimeter i utfällt yttermått
            men inget mått på själva steget.
          </p>
          <p>
            <strong>Avståndet mellan stegen är 300 millimeter hos samtliga
            fem.</strong>{" "}
            Det skiljer alltså ingenting, vilket är värt att veta eftersom det
            är det mått butikerna oftast anger när de anger något. Modums
            certifikat, Housegards bruksanvisning och Skeppshultstegens
            monteringsanvisning skriver alla 300, och W.Steps stegantal per längd
            ger samma tal på nio modeller.
          </p>
          <p>
            Det praktiska rådet är därför enkelt. Ska du eller någon i hushållet
            klättra ner med ett barn på armen väger de 16 centimetrarna tyngre än
            allt annat på den här sidan, och då är W.Steps 400 eller Modum rätt.
            Ska stegen sitta där i tjugo år och förhoppningsvis aldrig användas
            är Housegards 240 millimeter fullt tillräckligt för en vuxen som
            klättrar själv.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- regulation -- */}
      <Section
        id="hojdgranserna"
        tone="muted"
        width="default"
        title="Två höjdgränser som inte går ihop"
        description="Byggreglerna säger åtta meter. Det enda godkännandet säger fem. Och tre av fem tillverkare säger ingenting."
      >
        <Prose>
          <p>
            Boverkets byggregler accepterar utrymning genom fönster om
            underkanten sitter högst 5,0 meter över marken, eller{" "}
            <strong>högst 8,0 meter om det finns en fast monterad stege</strong>.
            Det är den enda skillnaden regeltexten gör mellan en fast och en
            hängande stege, och det är hela skälet till att den här produkten
            finns.
          </p>
          <p>
            Modums certifikat säger något annat:{" "}
            <em>
              &quot;Bruksområdet for stigen er rømning fra vinduer med avstand
              maksimalt 5 m over planert terreng for stiger uten ryggbøyle. Med
              ryggbøyle kan stigen brukes til rømning fra vinduer med avstand
              maksimalt 7,5 meter over planert terreng.&quot;
            </em>
          </p>
          <p>
            <strong>Godkännandet slutar alltså innan byggreglerna gör det.</strong>{" "}
            Den som monterar en stege på 5,4 meter under ett fönster sex meter
            upp ligger inom byggreglerna men utanför det tillverkaren själv säger
            att produkten är till för. Ryggbygeln, som flyttar gränsen till 7,5
            meter, säljs separat och saknar publicerat pris.
          </p>
          <p>
            De tre fabrikat som inte anger någon högsta användningshöjd säljer
            stegar på upp till sex meter. Att en stege finns i en viss längd är
            inte samma sak som att någon sagt vad den får användas till, och det
            är den skillnaden räknaren i köpguiden bygger på.
          </p>
          <p>
            Fönstret behöver också vara stort nog att ta sig ut genom: minst 0,50
            meter brett, minst 0,60 meter högt, och bredd plus höjd minst 1,50
            meter. Certifikatet lägger till att avståndet från golv till
            fönstrets underkant får vara högst en meter.
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
        title={`De ${products.length} bästa utrymningsstegarna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla fem"
        description="Stegbredden är måttet som avgör nedklättringen, och längdserien avgör om stegen slutar där ditt fönster börjar."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={`Priserna gäller den längd som anges i raden Längd i jämförelsen, kontrollerade ${PRICE_CHECKED} hos respektive butik. Varje fabrikat säljs i flera längder till andra priser, och flera av dem finns hos mer än en butik till skillnader på 41 till 49 procent. Måtten kommer ur tillverkarnas egna produktblad, bruksanvisningar och certifikat, lästa 2026-08-06.`}
        />
      </Section>

      {/* -------------------------------------------------- price spread -- */}
      {/* Eget avsnitt eftersom fyndet gäller butiken och inte produkten, och
          därför bara kunde synas som ett par tiondelar i prisvärde. */}
      <Section
        id="prisskillnaden"
        width="default"
        title="Samma stege, 49 procent dyrare"
        description="Identiska artikelnummer, två svenska butiker, och tusentals kronor i skillnad på varje längd."
      >
        <Prose>
          <p>
            Modum säljs av Everglow och Stegfabriken. Artikelnumren är identiska,
            21112 till 21154. Stegfabrikens ordinarie pris ligger{" "}
            <strong>49 procent över Everglows på varje enskild längd</strong>. På
            3,9 meter betyder det 14 325 kronor mot 9 621, en skillnad på 4 704 kronor
            för samma vara i samma kartong.
          </p>
          <p>
            Skeppshultstegen visar samma mönster. Bauhaus tar 7 799 kronor för
            3,9-metersstegen och Stegfabriken 11 343 för samma artikel, 45
            procent mer. På 2,7 meter är skillnaden 41 procent, och på 4,8 meter
            43.
          </p>
          <p>
            Det gäller alltså inte en enskild produkt utan hela sortimentet, och
            det gäller på artikelnivå där ingenting skiljer utom butiken. W.Steps
            båda serier säljs bara av Stegfabriken, vilket är värt att ha i
            bakhuvudet när du ser 11 378 och 14 513 kronor.
          </p>
          <p>
            <strong>Leta upp artikelnumret och sök på det innan du beställer.</strong>{" "}
            Det är fem minuters arbete för några tusenlappar, och ingen av de
            svenska jämförelser vi läst nämner att skillnaden finns.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje stege"
        description="Alla fem bedöms mot samma fem kriterier. Måtten är butikens eller tillverkarens egna, utom Modums som kommer ur certifikatet."
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
        id="andra-stegar"
        tone="muted"
        width="default"
        title="Andra produkter vi övervägde"
        description="Sju poster som inte hamnade i rankningen, inklusive tillbehören som avgör mer än flera av skillnaderna mellan stegarna."
      >
        <ConsideredList items={UTRYMNINGSSTEGE_CONSIDERED} />
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
          footnote="Nedstigning väger tyngst, eftersom stegbredden spänner 240 till 400 millimeter och är den största fysiska skillnaden mellan stegarna. Räckvidd mäts som hur högt stegen når och hur nära din faktiska fönsterhöjd längdserien kommer. Montering väger vilka väggmaterial tillverkaren anvisar ett fäste för och vad som ligger i lådan.\n\nEn uppgift vi inte lyckats få fram sänker aldrig ett betyg. Skeppshultstegen saknar mått på stegbredden i vårt underlag och står därför med ett streck i tabellen, men den bedöms på det som är belagt och inte på det som fattas.\n\nVi hittade inget svenskt eller nordiskt test av kategorin. Priserna är hos den butik vi länkar till, för den längd som anges i jämförelsen."
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
        description="Certifikatet, byggreglerna, standardkatalogen och de produktsidor som bär de uppgifter vi jämfört."
      >
        <Prose className="mb-block">
          <p>
            <strong>
              Det finns inget svenskt test av fasta utrymningsstegar.
            </strong>{" "}
            Varken Råd &amp; Rön eller Testfakta har testat kategorin, och de
            svenska jämförelsesidor vi läst rankar fasta stegar mitt i en lista
            över hängande. Den mest utbyggda av dem beskriver en repstege som
            fast monterad med skruv och fästen.
          </p>
          <p>
            <strong>Primärkällorna finns däremot, och de är starka.</strong>{" "}
            SINTEF publicerar sitt certifikat i sin helhet med provlast,
            monteringsvillkor och utgångsdatum. Boverket publicerar
            höjdgränserna. Fyra av fem tillverkare publicerar produktblad,
            bruksanvisning eller monteringsanvisning med de mått butikerna inte
            återger. Allt är läst i original och citerat ordagrant här.
          </p>
        </Prose>
        <SourceList sources={UTRYMNINGSSTEGE_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={UTRYMNINGSSTEGE_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer
          items={["general", "fireSafety", "pricing"]}
          className="mb-block"
        />
      </Container>
    </>
  );
}
