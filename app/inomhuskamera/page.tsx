import type { Metadata } from "next";

import { INOMHUSKAMERA, testPageTrail } from "@/lib/test-pages";
import { INOMHUSKAMERA_SOURCES } from "@/lib/sources";
import {
  INOMHUSKAMERA_CONSIDERED,
  INOMHUSKAMERA_FAQ,
  INOMHUSKAMERA_PRODUCTS,
  PRICE_CHECKED,
} from "@/lib/data/inomhuskamera";
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

import Kopguide from "@/content/inomhuskamera/kopguide.mdx";

/*
 * ⚠️ Priser, upplösning, panorering, lagring, kundbetyg och innehåll i
 * förpackningen är riktiga, lästa på Kjells egen sida på PRICE_CHECKED.
 * Uppgifterna om linsskydd och avstängning är lästa i tillverkarens egen
 * dokumentation, se lib/sources.ts. Kriteriebetygen är redaktionell
 * bedömning. Vi har inte monterat eller filmat med någon kamera.
 *
 * Sidans fynd, i den ordning de står:
 *
 * 1. #hemtjansten — IMY säger att inomhus oftast är tillåtet, men gör
 *    undantag för den som regelbundet får besök av hemtjänst. Det träffar
 *    precis den köpare kategorin marknadsförs mot.
 * 2. #linsskyddet — ett fysiskt skydd är den enda integritetskontroll som går
 *    att se. Tre nivåer finns i handeln, och Arlos automatiska skydd står
 *    öppet om du köper kontinuerlig inspelning, vilket de skriver själva.
 * 3. #lagringen — inomhusbilder är det känsligaste ett hem producerar, och
 *    frågan var de hamnar är inte bara ekonomisk.
 *
 * ⚠️ Sökvolymen för `inomhuskamera` är inte mätt i Keyword Planner. Sidan
 * bygger på ett antagande om intention inom `övervakningskamera`. Det är
 * sidans största osäkerhet, det står i research-filen §1, och termen ska med
 * i nästa mätning.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till butiken och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 */

const TEST_PAGE = INOMHUSKAMERA;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Inomhus är kamerabevakning oftast tillåten, men inte om du regelbundet får besök av hemtjänst. Vi jämförde sju inomhuskameror från 279 till 1 299 kronor, och bara fyra har ett linsskydd du kan se.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilken ska du köpa?" },
  { id: "hemtjansten", label: "Regeln om någon arbetar i ditt hem" },
  { id: "linsskyddet", label: "Linsskyddet du kan se med egna ögon" },
  { id: "jamforelse", label: "Jämför alla sju" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "lagringen", label: "Var bilderna hamnar" },
  { id: "recensioner", label: "Recensioner av varje kamera" },
  { id: "andra-kameror", label: "Andra produkter vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function InomhuskameraPage() {
  /* Only read in development. See lib/style-server.ts: production keeps the
     default layout and the page stays static. */
  const style = await getStyle();
  const products = INOMHUSKAMERA_PRODUCTS;
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
              Inomhus är kamerabevakning oftast tillåten, även kopplad till en
              larmcentral. Men får du regelbundet besök av hemtjänst gäller
              inte privatundantaget, eftersom personalen bevakas under sin
              arbetstid. Då räcker det inte att kameran går att stänga av. Den
              måste gå att stänga av på ett sätt som syns. Vi jämförde sju
              kameror från 279 till 1 299 kronor.
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
      <Section
        id="hemtjansten"
        width="default"
        title="Regeln om någon arbetar i ditt hem"
        description="Inomhus är utgångspunkten generös. Ett av myndighetens fyra exempel gör undantag, och det träffar det vanligaste skälet att köpa produkten."
      >
        <Prose>
          <p>
            IMY skriver att kamerabevakning inne i den egna bostaden{" "}
            <strong>oftast</strong> omfattas av privatundantaget, och att det
            gäller även när kamerorna är kopplade till en larmcentral. Filmar du
            dessutom en hantverkare vid enstaka tillfällen, utan att avsikten är
            att bevaka hantverkaren, gäller undantaget fortfarande.
          </p>
          <p>Sedan kommer myndighetens eget exempel.</p>
          <p>
            En privatperson som har hemtjänst kamerabevakar i sitt hem.
            Personalen blir filmad vid varje besök. Omfattas det av
            privatundantaget?{" "}
            <strong>Nej.</strong>{" "}
            <em>
              &quot;Det beror på att hemtjänstpersonalen besöker hemmet i sin
              yrkesroll och på så sätt blir bevakade under sin arbetstid. Då
              gäller GDPR för kamerabevakningen.&quot;
            </em>
          </p>
          <p>
            Det som skiljer hantverkaren från hemtjänsten är alltså{" "}
            <strong>regelbundenheten, inte avsikten</strong>. Din omtanke om en
            åldrande förälder ändrar ingenting i bedömningen, eftersom regeln
            handlar om vem som blir filmad och hur ofta.
          </p>
          <p>
            Just den situationen är den vanligaste anledningen att köpa en
            inomhuskamera. Samma villkor står i den allmänna listan över
            privatundantaget: det gäller bara om du inte bevakar en plats där
            personer som utför arbete regelbundet passerar eller utför sina
            arbetsuppgifter.
          </p>
          <p>
            <strong>Vad man gör åt det.</strong> Kameran ska vara avstängd när
            personalen är där, de ska informeras, och avstängningen behöver vara
            något de kan se. Det sista är en produktfråga, och den avgör den här
            sidan.
          </p>
        </Prose>
      </Section>

      {/* ----------------------------------------------------- the shield -- */}
      <Section
        id="linsskyddet"
        tone="muted"
        width="default"
        title="Linsskyddet du kan se med egna ögon"
        description="Ett läge i en app är ett löfte om programvara. Ett skydd över linsen är en mekanism."
      >
        <Prose>
          <p>
            Tre nivåer finns i handeln, och de kostar inte det man tror.
          </p>
          <p>
            <strong>Motoriserat skydd.</strong> Arlos Essential Indoor täcker
            enligt tillverkaren automatiskt linsen när kameran avlarmas och
            öppnar den när den larmas på. Rörelsedetektering, ljuddetektering
            och mikrofonen stängs av samtidigt. Det är den enda avstängningen i
            kategorin som fungerar utan att någon behöver komma ihåg den.
          </p>
          <p>
            <strong>Fysisk knapp.</strong> TP-Link skriver att Tapo C125 och
            C225 har en fysisk integritetsknapp som fäller ner ett skydd över
            linsen eller vrider bort linsen helt.
          </p>
          <p>
            <strong>Löst linsskydd.</strong> Ring lägger ett linsskydd i lådan
            till Indoor Camera Plus, och ett sekretesskydd fäst på kameran till
            Pan-Tilt-modellen.
          </p>
          <p>
            <strong>Resten har bara programläget.</strong> TP-Links läge stänger
            enligt tillverkaren av både bild och ljud, vilket är mer än många
            erbjuder, men objektivet pekar fortfarande in i rummet och ingen som
            står framför kameran kan se om läget är på.
          </p>
          <p>
            <strong>Och så Arlos brasklapp, i deras egna ord:</strong>{" "}
            <em>
              &quot;If continuous video recording (CVR) is enabled, the Privacy
              Shield stays open, and your camera continues recording.&quot;
            </em>{" "}
            Kontinuerlig inspelning är en abonnemangsfunktion. Kategorins bästa
            integritetslösning slutar alltså fungera precis när du köper den
            dyraste nivån.
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
        title={`De ${products.length} bästa inomhuskamerorna 2026`}
        description="Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sju"
        description="Kolumnen Avstängning visar om skyddet syns med blotta ögat. Kräver abonnemang visar var bilderna hamnar."
      >
        <ComparisonTable
          products={products}
          layout={style.table}
          variant="bordered"
          caption={priceCaption(PRICE_CHECKED, `Uppgifterna om linsskydd och avstängning är lästa i tillverkarens egen dokumentation och i butikens innehållsförteckning. Där en uppgift står som ej angiven betyder det att butiken inte publicerar den, vilket gäller flera rader för Tapo C100 trots att den är kategorins mest sålda produkt.`)}
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
              Vinnaren har inte kategorins bästa integritetslösning.
            </strong>{" "}
            Arlos motoriserade skydd är bättre än Tapos knapp, och det får också
            högsta betyg på det kriteriet. Att Tapo C225 ändå vinner beror på
            att Arlo inte sparar någonting utan abonnemang, bara ger 1080p och
            kostar mer än dubbelt så mycket. Väger du integriteten ensam är Arlo
            svaret, och det står i deras recension.
          </p>
          <p>
            <strong>Två av sju placeringar går till samma fabrikat.</strong>{" "}
            TP-Link tar första och andra platsen. Det beror på att de är ensamma
            om att kombinera fysiskt skydd, lokal lagring och låga priser, inte
            på att vi föredrar dem. Kategorins två mest omdömda produkter råkar
            dessutom vara deras.
          </p>
          <p>
            <strong>Alla sju länkar går till Kjell.</strong> De är den enda
            svenska butik vi hittat som för hela sortimentet och skriver ut
            priset på varje modell. Vi skriver
            hellre samma butiksnamn sju gånger än hittar på ett pris.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------------- storage -- */}
      <Section
        id="lagringen"
        width="default"
        title="Var bilderna hamnar"
        description="Inomhusbilder är det känsligaste material ett hem producerar. Frågan om lagring är därför inte bara ekonomisk."
      >
        <Prose>
          <p>
            En kamera i ett vardagsrum visar när du kommer och går, vem som är
            hemma, vad som står på bordet och hur du ser ut i morgonrock. Det är
            en annan sorts material än en bild på en uppfart.
          </p>
          <p>
            <strong>Tapo, Aqara och Imou</strong> sparar på ett minneskort i
            kameran. Materialet lämnar aldrig bostaden om du inte ber om det,
            och kameran fortsätter fungera oavsett vad tillverkaren gör med sina
            tjänster.
          </p>
          <p>
            <strong>Ring och Arlo</strong> har ingen lokal lagring alls. Utan
            abonnemang sparas ingenting, och med abonnemang sparas allt hos
            tillverkaren.
          </p>
          <p>
            <strong>Aqara G3 löser det på ett tredje sätt.</strong> HomeKit
            Secure Video lagrar krypterat i din egen iCloud i stället för hos
            kameratillverkaren. För den som redan betalar Apple tillkommer ingen
            kostnad.
          </p>
          <p>
            Ska personal arbeta i hemmet är skillnaden praktisk och inte bara
            principiell. Det är rimligen lättare att acceptera en kamera vars
            bilder ligger på ett kort i hallen än en vars bilder ligger på en
            molntjänst i ett annat land.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Recensioner av varje kamera"
        description="Alla sju bedöms mot samma fem kriterier. Måtten är butikens egna, och uppgifterna om linsskydd är tillverkarens."
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
        description="Sex poster som inte hamnade i rankningen, inklusive två som saknar specifikation helt."
      >
        <ConsideredList items={INOMHUSKAMERA_CONSIDERED} />
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
          footnote="Avstängningen väger tyngst eftersom den är den enda egenskapen som avgör om kameran går att använda i ett hem där någon annan rör sig, och eftersom skillnaderna är dokumenterade av tillverkarna själva. Skalan är 5,0 för ett fysiskt skydd som stängs automatiskt när larmet slås av, 4,0 för ett fysiskt skydd du styr själv, 2,5 för enbart ett programläge som stänger av både bild och ljud, 1,5 för enbart pausad inspelning där kameran fortfarande ser, och 1,0 när ingen avstängning alls dokumenteras. Kriteriet kostnad efter köp poängsätter vad som slutar fungera utan abonnemang och inte kronor per månad, eftersom vi inte kunnat läsa någon prislista hos Arlo, Ring eller Google. Bildbetyget bygger på publicerade mått, och för Tapo C100 publicerar butiken inga alls, vilket sänker betyget även om produkten kan vara bättre än så. Vi hittade inget svenskt test av kategorin. Priserna är hos den butik vi länkar till."
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
        description="Myndighetens eget exempel om hemtjänst, två tillverkares dokumentation av linsskydd, och butiken som bär priserna."
      >
        <Prose className="mb-block">
          <p>
            <strong>Det finns inget svenskt test av inomhuskameror.</strong>{" "}
            Varken Råd &amp; Rön eller Testfakta har testat kategorin.
          </p>
          <p>
            <strong>Primärkällan pekar åt två håll,</strong> vilket är ovanligt
            och värt att läsa själv. Samma myndighetstext säger att inomhus
            oftast är tillåtet och att hemtjänstfallet inte är det. Vi citerar
            båda ordagrant i stället för att sammanfatta, eftersom skillnaden
            mellan dem är hela sidans ärende.
          </p>
        </Prose>
        <SourceList sources={INOMHUSKAMERA_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={INOMHUSKAMERA_FAQ} schema />
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
