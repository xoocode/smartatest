import type { Metadata } from "next";

import { testPageTrail, FONSTERLARM } from "@/lib/test-pages";
import { SOURCES_BY_HREF } from "@/lib/sources";
import {
  PRICE_CHECKED,
  FONSTERLARM_FAQ,
  FONSTERLARM_CONSIDERED,
  FONSTERLARM_PRODUCTS,
} from "@/lib/data/fonsterlarm";
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

import Kopguide from "@/content/fonsterlarm/kopguide.mdx";

/*
 * Artonde sidan i gruppen Säkerhet, byggd 2026-08-07. Systersida till
 * /dorr-och-fonstersensor och en direkt följd av den.
 *
 * ⚠️ AVGRÄNSNING efter användarbeslut: det FRISTÅENDE sirenlarmet, alltså en
 * batteridriven dosa som tjuter själv utan app, hubb eller konto.
 * Magnetkontakten som rapporterar till ett smart hem ligger på systersidan. De
 * säljs i samma hylla, ser likadana ut och förväxlas ständigt, men har ingen
 * gemensam betygsaxel. Båda sidorna förklarar skillnaden och korslänkar.
 *
 * ⚠️ SLUGEN BRYTER MOT SYSTERSIDANS LOGIK MED FLIT. Där var sammansättningen
 * nödvändig eftersom ingen butik säljer en ren fönstersensor. Här är `dörrlarm`
 * skadligt: autocomplete ger hemtjänst, demens, hotell och resa.
 * Användarbeslut 2026-08-07.
 *
 * ⚠️ FYNDET: talet som säljer produkten står nästan aldrig i rubriken, och
 * spannet är enormt. Tre av sju ligger på 85 dB, två på 130. Skalan är
 * logaritmisk, så det är inte en halvering utan en annan produkt. Det är
 * därför `ljudniva` väger 30.
 *
 * ⚠️ ANDRA FYNDET: hyllpriset är inte priset per fönster. Tre av sju levereras
 * utan batterier, och Luxorparts fyrpack kräver åtta AAA. Det billigaste
 * larmet på hyllan blir det tredje billigaste i praktiken.
 *
 * ⚠️ TREDJE: av-knappen är viktigare än decibeltalet. Fyra av sju stängs av med
 * en brytare på dosan, som den som tagit sig in kan trycka på. Ingen konkurrent
 * tar upp det.
 *
 * ⚠️ OMFÖRDELNINGEN AVGÖR FÖRSTAPLATSEN. `montering` väger 15 och saknas för
 * Luxorparts och eStore: Kjell publicerar inga mått, Luxorparts manual är en
 * skannad bild utan textlager, eStore anger bara vikten. Utan omfördelning
 * krymper Luxorparts försprånge till en tiondel. Förvalet ger rätt utfall,
 * eftersom Luxorparts vinner de tre tyngsta kriterierna med 75 av 100
 * viktpoäng och ett avdrag för ett opublicerat mått är precis vad
 * check:avdrag finns för. Står utskrivet i metodrutan. Se lib/data/fonsterlarm.ts.
 *
 * ⚠️ CLAS OHLSON 36-6145 RANKAS INTE: "Produkten har utgått" på deras egen
 * sida. Samma beslut som IKEA PARASOLL på systersidan.
 *
 * ⚠️ JULA BRIGHT SMART ÄR ÖVERVÄGD: hybrid som både tjuter och notifierar via
 * app, och Jula säljer den bara i butik.
 *
 * ⚠️ INGET TESTOMDÖMEKRITERIUM. Ingen oberoende provning av fristående
 * fönsterlarm existerar hos Råd & Rön, Stiftung Warentest eller tek.no.
 *
 * ⚠️ VITMÄRKTA LARM PÅ AMAZON, CDON OCH FYNDIQ ÄR UTELÄMNADE. Samma dosa säljs
 * under fem namn med olika angivna decibeltal, och ett tal utan tillverkare
 * bakom sig går inte att jämföra.
 *
 * PENGAR: sajtens sämsta enhetsekonomi, korgen är 59 till 299 kronor.
 * Teknikdelar 5 % bär Nedis kodlåsvariant på 79 kr mot Teknikproffsets 130 för
 * samma artikel. Kjell 5 % bär vinnaren. Estore 5 % med ppc=2 är enda
 * annonserbara butiken. Clas Ohlson och SkyddsExperten saknar program.
 *
 * AFFILIATE-SWAP — se lib/links.ts för vad LINK_MODE står på i dag.
 */

const TEST_PAGE = FONSTERLARM;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-07";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Luxorparts fyrpack vinner för 299 kronor: 130 decibel i 30 sekunder och en fjärrkontroll, till omkring 92 kronor per fönster. Ska bara ett fönster larmas är Clas Ohlsons lika högljudda larm 119,90. Och läs decibeltalet innan du köper: tre av sju larm här ligger på 85 dB trots att alla säljs som högljudda.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: TEST_PAGE.title, path: PAGE_URL }),
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilket ska du köpa?" },
  { id: "decibel-fyndet", label: "Alla säljs som högljudda" },
  { id: "jamforelse", label: "Jämför alla sju" },
  { id: "recensioner", label: "Recensioner av varje larm" },
  { id: "andra-larm", label: "Andra vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi testet" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor och andra tester" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default async function FonsterlarmPage() {
  const style = await getStyle();
  const products = FONSTERLARM_PRODUCTS;
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
            {/* H1 bär fyndet: talet produkten säljs på står sällan utskrivet. */}
            <h1 className="text-h1">
              Fönsterlarm bäst i test 2026: alla säljs som högljudda, tre låter
              85 decibel
            </h1>
            <AffiliateDisclosure variant="balk" />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Köp Luxorparts fyrpack för 299 kronor. Det ger 130 decibel i 30
              sekunder, en fjärrkontroll som flyttar av-knappen ur rummet, och
              fyra larm för omkring 92 kronor per fönster med batterier
              inräknade. Ska bara ett fönster larmas är Clas Ohlsons larm lika
              högljutt för 119,90. Och läs decibeltalet innan du beställer: tre
              av de sju larmen här ligger på 85 dB, vilket är ungefär en
              dammsugare och går att sova igenom två rum bort.
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
        id="decibel-fyndet"
        width="default"
        title="Alla säljs som högljudda"
        description="Talet som beskriver produktens enda funktion står sällan i rubriken."
      >
        <Prose>
          <p>
            <strong>
              Ett fönsterlarm har en uppgift, och det är att låta.
            </strong>{" "}
            Varenda ett av de sju larmen på den här sidan marknadsförs på ordet
            högljudd. Talet som säger hur väl de lyckas står i specifikationen
            om det står någonstans alls, och spannet är 85 till 130 decibel.
          </p>
          <p>
            <strong>Skalan är logaritmisk, så 45 decibel är inte en marginal.</strong>{" "}
            85 decibel motsvarar ungefär en dammsugare på en meters håll och går
            utmärkt att sova igenom två rum bort. 100 är en gräsklippare. 130
            ligger vid smärtgränsen och hörs genom en stängd dörr. Det är inte
            samma produkt i två utföranden, det är två olika produkter.
          </p>
          <p>
            <strong>
              Hela Nedis-familjen ligger på 85 decibel, alltså i botten.
            </strong>{" "}
            Deras tre larm skiljer sig åt i utlösare och avlarmning, men inte i
            ljud: den tunna magnetvarianten, glaskrossvarianten och
            kodlåsvarianten anger alla samma tal. Pengarna i den här kategorin
            köper alltså sällan decibel.
          </p>
          <p>
            <strong>
              Den som skriver ut talet skriver ofta ut ett lågt tal.
            </strong>{" "}
            Nedis är den enda tillverkaren i fältet med en fullständig publicerad
            specifikation, och de anger 85. Clas Ohlson skriver cirka 130 och
            kallar det själva smärtsamt högt. Luxorparts anger 130. eStore 90 och
            SkyddsExperten 95 till 100. De larm som bara säger högljudd siren
            utan tal är de vi lämnat utanför jämförelsen helt.
          </p>
          <p>
            <strong>Hyllpriset säger heller inte vad ett fönster kostar.</strong>{" "}
            Tre av de sju levereras utan batterier. SkyddsExpertens larm på 59
            kronor kräver två AAA och landar runt 84. Luxorparts fyrpack på 299
            kronor kräver åtta AAA och landar på omkring 92 per fönster, alltså
            billigare än Clas Ohlsons enskilda larm på 119,90. Det billigaste på
            hyllan är det tredje billigaste i praktiken.
          </p>
          <p>
            <strong>
              Och det som avgör mest står inte i någon prisjämförelse: hur larmet
              stängs av.
            </strong>{" "}
            Fyra av sju har en knapp eller strömbrytare på själva dosan. Den som
            krossat rutan står direkt framför den och kan tysta sirenen med ett
            finger, oavsett om den ligger på 85 eller 130 decibel. Nedis
            kodlåsvariant kräver en fyrsiffrig kod, och Luxorparts flyttar
            av-knappen till en fjärrkontroll. Det är de två enda som gör något åt
            saken.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- ranked lists -- */}
      <Section
        id="alla-testvinnare"
        optionalSection="winner-grid"
        width="wide"
        eyebrow="Alla testvinnare"
        title={`De ${products.length} bästa fönsterlarmen 2026`}
        description="Varje larm passar ett eget ställe och ett eget behov. Klicka på ett namn för den fullständiga recensionen."
      >
        <WinnerGrid products={products} variant="grid" columns={3} />
      </Section>

      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla sju"
        description="Samma fem kriterier och samma viktning för alla sju."
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
        title="Recensioner av varje larm"
        description="Alla sju bedöms mot samma fem kriterier."
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
        id="andra-larm"
        tone="muted"
        className="border-t border-border"
        width="default"
        title="Andra vi övervägde"
        description="Fem larm som fanns med i urvalet men inte i rankningen, och skälet till att de föll bort."
      >
        <ConsideredList items={FONSTERLARM_CONSIDERED} />
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
          footnote="Ljudnivån väger 30 därför att den är produktens enda funktion, och spannet 85 till 130 decibel är logaritmiskt och alltså inte en marginal utan två olika produkter. Pris per bevakad öppning väger 25 och räknas med batterier, eftersom tre av de sju levereras utan och ett fyrpack kräver åtta AAA. Hur larmet slås av väger 20 därför att det är en säkerhetsuppgift: fyra av sju har en brytare på dosan som den som tagit sig in kan trycka på. Storlek och montering väger 15, och två av larmen publicerar inga mått alls, varken hos butiken, hos tillverkaren eller i manualen, som i ett fall är en inskannad bild utan sökbar text. Deras betyg räknas på de kriterier som går att fylla i i stället för att sättas till noll för något ingen skrivit ned. Det spelar roll här och ska sägas rakt ut: utan den hanteringen hade förstaplatsen bytt ägare. Vinnaren tar ändå de tre tyngsta kriterierna med 75 av 100 viktpoäng, så utfallet vilar inte på den saknade uppgiften. Decibeltalen är tillverkarnas och butikernas egna uppgifter och inte något vi mätt, och det finns ingen oberoende labbprovning av den här produktklassen att väga in. Priser och lagerstatus är kontrollerade hos butiken och daterade."
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
        description="Nedis egna specifikationstabeller, butikernas produktsidor och Luxorparts manual. Ingen oberoende labbprovning av den här produktklassen finns."
      >
        <SourceList sources={sources} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={FONSTERLARM_FAQ} schema />
      </Section>

      <Container size="default" className="pad-section">
        <LegalDisclaimer items={["general", "pricing"]} className="mb-block" />
      </Container>
    </>
  );
}
