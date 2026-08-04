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

import Kopguide from "@/content/utrymningsstege/kopguide.mdx";

/*
 * ⚠️ Priser, längder, mått, material, angiven maxlast, vad som ingår och vilken
 * standard eller vilket godkännande butiken eller tillverkaren anger är
 * riktiga, lästa på butikens eller tillverkarens egen sida på PRICE_CHECKED.
 * SINTEF-certifikatet TG 2536 är läst i sin helhet. Kriteriebetygen är
 * redaktionell bedömning. Vi har inte belastat, monterat eller klättrat i någon
 * stege.
 *
 * Sidans tre fynd, i den ordning de står:
 *
 * 1. #godkannandet — SINTEF Certification har en produktgrupp för räddningsstegar
 *    med fyra godkända produkter, och en av dem säljs i Sverige. Det är enda
 *    gången i brandfamiljen någon produkt når 5,0 på provningskriteriet.
 * 2. #hojdgranserna — godkännandet slutar vid 5,0 meter utan ryggbygel medan
 *    Boverket tillåter 8,0. De två gränserna går inte ihop, och de tre stegar
 *    som inte anger någon gräns alls säljs i upp till sex meter.
 * 3. #prisskillnaden — samma artikelnummer skiljer 49 procent mellan två
 *    svenska butiker. Eget avsnitt eftersom det inte hör hemma i något kriterium
 *    utöver prisvärde, och där hade det försvunnit som ett par tiondelar.
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
const UPDATED = "2026-08-03";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Fyra stegar i världen har ett tredjepartsgodkännande för utrymning, och en av dem säljs i Sverige. Vi jämförde fem fasta fasadstegar från 3 695 till 14 513 kronor mot vad du faktiskt kan kontrollera före köp.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "godkannandet", label: "Godkännandet fyra stegar har" },
  { id: "hojdgranserna", label: "Två höjdgränser som inte går ihop" },
  { id: "jamforelse", label: "Jämför alla fem" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
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
              En fast stege är det enda byggreglerna räknar som utrymningsväg
              när fönstret sitter mer än fem meter upp. Fyra stegar i världen har
              ett tredjepartsgodkännande för ändamålet, och en av dem säljs här.
              Vi jämförde fem fabrikat från 3 695 till 14 513 kronor mot det som
              faktiskt går att kontrollera innan du skruvar fast något i fasaden.
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
      {/* Först av allt, eftersom det ordnar om vad läsaren tror att pengarna
          köper. Priset följer inte dokumentationen i den här kategorin. */}
      <Section
        id="godkannandet"
        width="default"
        title="Godkännandet fyra stegar har"
        description="Det finns en riktig tredjepartsordning för fast monterade utrymningsstegar. En av produkterna i svensk handel har den."
      >
        <Prose>
          <p>
            SINTEF Certification i Norge har en produktgrupp som heter{" "}
            <em>Redningsstiger</em>. I den ligger{" "}
            <strong>fyra godkända stegar</strong>: Hardhaus, Modum, Norstigen och
            Sørlandsstigen. Av dem säljs en i Sverige.
          </p>
          <p>
            Ett tekniskt godkännande är något annat än en standardhänvisning i en
            butikstext. Certifikatet TG 2536 är fyra sidor och det står vad man
            vill veta innan man skruvar fast något i sitt hus:{" "}
            <strong>provlast 2,6 kN</strong> mitt på steget och vid yttre vangen,
            brandklass A1, minst två meters avstånd till underliggande fönster,
            träskruv på minst sex millimeter parvis med högst sex decimeter
            mellan infästningarna, panel på minst nitton millimeter, och
            giltighet till den 1 april 2028.
          </p>
          <p>
            De fyra övriga stegarna har ingen motsvarighet. En
            av dem anger en standard, i två utgåvor som Svenska institutet för
            standarder listar som tillbakadragna. Tre anger ingenting alls:{" "}
            <strong>
              ingen maxlast, ingen provlast, ingen standard, inget godkännande.
            </strong>
          </p>
          <p>
            Det betyder inte att de tysta stegarna är svaga. Vi har inte belastat
            någon av dem och vet inte vad de klarar. Det betyder att du inte
            heller vet det, och att du inte kan ta reda på det innan du betalar.
            Det är därför kriteriet heter Dokumenterad provning och väger trettio
            procent.
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
        description="Godkänd höjd är det bara ett fabrikat som fyller i. Fotsteg är det du står på när du klättrar."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={`Priserna gäller den längd som anges i raden Längd i jämförelsen, kontrollerade ${PRICE_CHECKED} hos respektive butik. Varje fabrikat säljs i flera längder till andra priser, och flera av dem finns hos mer än en butik till skillnader på fyrtio till femtio procent. Där en uppgift står som ej angiven betyder det att varken butik eller tillverkare publicerar den, inte att egenskapen saknas.`}
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
              Vinnaren kostar nästan tre gånger så mycket som tvåan, och det är
              en följd av viktningen.
            </strong>{" "}
            Dokumenterad provning väger trettio procent, och det är den enda
            axeln där produkterna skiljer sig kontrollerbart. Skillnaden mellan
            ett certifikat och tystnad är därför värd mycket hos oss. Om du
            däremot väger priset tyngst är tvåan rätt köp, och den är dessutom
            den enda andra produkten som anger en maxlast över huvud taget.
          </p>
          <p>
            <strong>Godkännandet är norskt och inget svenskt krav.</strong>{" "}
            SINTEF Teknisk Godkjenning är en frivillig ordning i Norge. Att en
            stege saknar den är inte ett regelbrott och betyder inte att den är
            underkänd någonstans. Det betyder att du inte kan kontrollera vad den
            provats till. Det är också därför Skeppshultstegen, som tillverkas i
            Sverige, får ett lågt betyg på just det kriteriet trots att vi inte
            har någon anmärkning på hur den är byggd.
          </p>
          <p>
            <strong>Ingen uppgift är kontrollerad av oss.</strong> Vi har inte
            belastat, monterat eller klättrat i någon stege. Det vi gjort är att
            läsa certifikatet i original, kontrollera standardernas status hos
            SIS och läsa varje pris på butikens egen sida. Kriteriet mäter vad du
            kan kontrollera innan du betalar, inte vad stegen fysiskt klarar.
          </p>
        </Prose>
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
            det gäller på artikelnivå där ingenting skiljer utom butiken. Vi
            drar av för det i prisvärde där vi kan, men kriteriet väger tio
            procent och en prisskillnad på fyrtio procent förtjänar mer
            uppmärksamhet än så.
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
        description="Sex poster som inte hamnade i rankningen, inklusive tillbehören som avgör mer än flera av skillnaderna mellan stegarna."
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
          footnote="Dokumenterad provning väger tyngst eftersom det är där produkterna skiljer sig på ett sätt som går att kontrollera. Skalan är 5,0 för ett tredjepartsgodkännande för just den här produkttypen, med provlast, användningsområde och utgångsdatum, 2,5 för en gällande standard angiven med årtal, 1,5 när standarden anges i en utgåva som SIS listar som tillbakadragen, och 1,0 när ingen standard anges alls. Räckvidd mäts inom det stegen är godkänd eller specificerad för, inte i råa meter, eftersom en längd utan angiven högsta användningshöjd inte säger något om vad tillverkaren står bakom. Att samma artikelnummer kostar fyrtio till femtio procent mer hos en annan butik drar ner prisvärdet, men det kriteriet väger tio procent och fyndet har därför ett eget avsnitt i stället för att gömmas i ett betyg. Vi hittade inget svenskt eller nordiskt test av kategorin. Priserna är hos den butik vi länkar till, för den längd som anges i jämförelsen."
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
            monteringsvillkor och utgångsdatum. SIS publicerar status för de
            standarder butikerna hänvisar till. Boverket publicerar
            höjdgränserna. Alla tre är lästa i original och citerade ordagrant på
            den här sidan, i stället för att refereras via en tredje part.
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
