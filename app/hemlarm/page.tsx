import type { Metadata } from "next";
import { serviceCaption } from "@/lib/captions";

import { HEMLARM, testPageTrail } from "@/lib/test-pages";
import { HEMLARM_SOURCES } from "@/lib/sources";
import {
  HEMLARM_CONSIDERED,
  HEMLARM_FAQ,
  HEMLARM_SERVICES,
  PRICE_CHECKED,
} from "@/lib/data/hemlarm";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
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
import { CriteriaScores } from "@/components/product/criteria-scores";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { MethodologyBlock } from "@/components/product/methodology-block";
import { VerdictText } from "@/components/product/verdict-text";
import { ServiceCard, ServiceReview } from "@/components/service/service-card";
import { ServiceSchema } from "@/components/service/service-schema";
import { ServiceTable } from "@/components/service/service-table";

import Kopguide from "@/content/hemlarm/kopguide.mdx";

/*
 * ⚠️ Sajtens första **tjänstekategori** i stället för produktkategori. Se
 * lib/services.ts för varför det krävde en egen typ, och components/service/
 * för modulerna. Den bärande regeln i hela kedjan: `null` betyder att bolaget
 * inte publicerar uppgiften, aldrig att den är noll.
 *
 * ⚠️ Avgifter, bindningstider och äganderätt är lästa i bolagens egna
 * avtalsdokument, med utgåva och punktnummer angivna på sidan. Priser är lästa
 * på bolagets egen sida på PRICE_CHECKED. Kriteriebetygen är redaktionell
 * bedömning. Vi har inte tecknat något abonnemang och inte utlöst något larm.
 *
 * Sidans fynd, i den ordning de står:
 *
 * 1. #priset — två av åtta bolag publicerar hela priset, fyra publicerar ett
 *    månadstal. Det förklarar varför frågan "vad kostar hemlarm i månaden" är
 *    obesvarad på svenska trots ett toppbud på 181 kronor per klick.
 * 2. #bindningen — bindningstiden är inte dold utan prissatt. 3 990 kronor med
 *    tolv månaders bindning mot 5 990 utan, alltså kostar friheten 2 000 kr.
 * 3. #att-lamna — kostnaden att lämna är en femårig friköpstrappa hos den ena
 *    och en omöjlighet hos den andra. Ingen konkurrent räknar på den.
 *
 * ⚠️ Rättat under arbetet: ett utkast skrev "ett av åtta" om prisöppenheten.
 * SecuritasHomes prissida renderas i JavaScript och Avarns ligger under en
 * tjänstemeny, så första curl-omgången missade båda. Rättat före publicering.
 *
 * AFFILIATE-SWAP — LINK_MODE är `tracked`: länkarna går via /till/{id} som
 * 302:ar vidare till bolaget och räknar klicket. Ingen provision, alltså
 * varken rel="sponsored" eller annonsmärkning, och balken högst upp
 * renderar därför ingenting än. Se lib/links.ts.
 */
const TEST_PAGE = HEMLARM;
const PAGE_URL = `/${TEST_PAGE.slug}`;
const UPDATED = "2026-08-03";

export const metadata: Metadata = {
  title: TEST_PAGE.title,
  description:
    "Två av åtta larmbolag publicerar vad tjänsten kostar. Vi läste avtalsvillkoren i original, med utgåva och punktnummer, och räknade ut vad det kostar att lämna varje bolag.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TEST_PAGE.title,
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "snabbt-svar", label: "Snabbt svar: vilket ska du välja?" },
  { id: "priset", label: "Två av åtta skriver ut vad det kostar" },
  { id: "bindningen", label: "Bindningstiden är prissatt" },
  { id: "jamforelse", label: "Jämför alla åtta" },
  { id: "att-lamna", label: "Vad det kostar att lämna" },
  { id: "vem-har-kontrollerat", label: "Vem har kontrollerat det här?" },
  { id: "recensioner", label: "Genomgång av varje bolag" },
  { id: "andra-bolag", label: "Andra bolag vi övervägde" },
  { id: "kopguide", label: "Köpguide" },
  { id: "testmetod", label: "Så gjorde vi jämförelsen" },
  { id: "darfor-litar-du-pa-oss", label: "Därför kan du lita på oss" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

export default function HemlarmPage() {
  const services = HEMLARM_SERVICES;
  const [winner] = services;
  const author = DEFAULT_AUTHOR;
  const reviewer = DEFAULT_REVIEWER;

  return (
    <>
      <ServiceSchema
        testPage={TEST_PAGE}
        services={services}
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
        <div className="flex flex-col gap-row">
          <h1 className="text-h1">{TEST_PAGE.title}</h1>
          <AffiliateDisclosure variant="balk" />
          <p className="max-w-2xl text-lg text-muted-foreground">
            Ett hemlarm köper du inte, du tecknar det. Ändå publicerar bara två
            av åtta bolag vad tjänsten faktiskt kostar. Vi läste avtalsvillkoren
            i original, med utgåva och punktnummer, och räknade på det ingen
            annan räknar på: vad det kostar att sluta.
          </p>
          <UpdatedStamp
            date={UPDATED}
            testedCount={services.length}
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
            className="hidden pt-2 lg:flex"
          />
        </div>
      </Container>

      {/* ------------------------------------------------------- verdict -- */}
      <Section id="snabbt-svar" tone="muted" width="wide">
        <ServiceCard
          service={winner}
          awardLabel="Bäst i test 2026"
          ctaNote={`Pris och villkor kontrollerade ${PRICE_CHECKED}`}
        />
        <TocNav
          variant="inline"
          entries={TOC}
          className="mt-block lg:hidden"
        />
      </Section>

      {/* --------------------------------------------------- the finding -- */}
      <Section
        id="priset"
        width="default"
        title="Två av åtta skriver ut vad det kostar"
        description="Kategorins vanligaste fråga saknar ett svar man kan slå upp, och det beror på ett val branschen gjort."
      >
        <Prose>
          <p>
            Vi läste igenom varje bolags egen sida den 3 augusti 2026. Utfallet:{" "}
            <strong>
              fyra av åtta publicerar ett månadstal, och bara två publicerar
              hela priset
            </strong>
            , alltså både månadsavgift och vad det kostar att komma igång.
          </p>
          <p>
            De som skriver ut månadsavgiften är SecuritasHome med 349 och 399
            kronor, Avarn Security med 449 kronor, Verisure med 599 kronor och
            Svenska Alarm med ett från-pris på 175 kronor. Sector Alarm, Gardio,
            Garda Alarm och Safeland publicerar ingen månadsavgift alls.
          </p>
          <p>
            <strong>Det är ovanligt i svensk handel.</strong> Bredbandsbolag,
            elbolag och försäkringsbolag publicerar sina priser. Här är
            normalläget att priset kommer först vid ett hembesök, alltså efter
            att en säljare sett din hall och dina fönster.
          </p>
          <p>
            Det förklarar också en siffra vi tittade länge på.{" "}
            <em>Vad kostar hemlarm i månaden</em> söks nittio gånger i månaden
            och toppbudet ligger på 181 kronor per klick. Ett bud på den nivån
            betyder att frågan är värdefull och obesvarad samtidigt. Den är
            obesvarad därför att hälften av branschen valt att inte svara.
          </p>
          <p>
            Därför väger <strong>öppna villkor trettio procent</strong> i vår
            viktning. Kriteriet mäter inte prisnivå utan om priset går att ta
            reda på. Ett dyrt bolag som skriver sin siffra slår ett billigt som
            vägrar, och det är en medveten värdering vi står för.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------- second finding -- */}
      <Section
        id="bindningen"
        tone="muted"
        width="default"
        title="Bindningstiden är prissatt"
        description="Det mest användbara enskilda talet i kategorin, och det står på leverantörens egen sida."
      >
        <Prose>
          <p>Verisure skriver på sin produktsida:</p>
          <p>
            <em>
              &quot;Uppkopplingskostnad för Smart Voice Alarm med 12-månaders
              bindningstid: 3 990 kr (utan bindningstid: 5 990 kr).
              Månadskostnad på 599 kr tillkommer.&quot;
            </em>
          </p>
          <p>
            <strong>Att slippa bindningstiden kostar alltså 2 000 kronor.</strong>{" "}
            Bindningstiden är inte dold, den är ett val med en prislapp, och det
            är en helt annan sak.
          </p>
          <p>
            Det löser dessutom en motsägelse som annars är förvirrande. En
            svensk jämförelsesajt skriver att Verisure säljs utan bindningstid.
            En annan skriver att paketet kostar från 3 990 kronor vid tolv
            månaders bindningstid. <strong>Båda har rätt.</strong> De har bara
            valt var sitt av två alternativ, och ingen av dem berättar att det
            finns två.
          </p>
          <p>
            Räknat per månad kostar friheten 167 kronor under bindningsåret. Vet
            du att du bor kvar är bindning billigare. Är du osäker på bostad,
            sambo eller ekonomi är den inte det.
          </p>
          <p>
            <strong>Sector Alarm publicerar ingen siffra alls</strong> för
            privatkunder. Deras avtalsvillkor anger 24 månaders bindningstid i
            punkt 12.5, men den meningen gäller uttryckligen företagskunder. För
            privatpersoner står bara att uppsägningstiden gäller &quot;med
            undantag för eventuell bindningstid&quot;. Att en sådan kan finnas
            framgår av punkt 10, som säger att resterande bindningstid följer
            med till ett nytt kontrakt om du flyttar.
          </p>
          <p>
            Och en vändning som är värd att känna till:{" "}
            <strong>
              Verisures egenmonterade larm binder i 24 kalendermånader
            </strong>{" "}
            enligt punkt 15 i sin egen villkorsuppsättning. Det billigare
            alternativet låser alltså i två år medan det dyrare installerade
            inte har någon publicerad bindningstid. Det är tvärtemot vad man
            gissar, och vi har inte sett det nämnas någon annanstans.
          </p>
        </Prose>
      </Section>

      {/* --------------------------------------------------------- table -- */}
      <Section
        id="jamforelse"
        width="wide"
        title="Jämför alla åtta"
        description="Raderna som avgör står överst: månadsavgift, startavgift, bindningstid och vem som äger utrustningen."
      >
        <ServiceTable
          services={services}
          caption={serviceCaption(PRICE_CHECKED, `"Publiceras inte" betyder att bolaget inte anger uppgiften på sin egen sajt, inte att den saknas eller är noll. Avtalsuppgifter kommer från bolagens publicerade villkor, med utgåva angiven i tabellens sista rad. Ditt eget avtal går före allt som står här.`)}
        />
      </Section>

      {/* -------------------------------------------------- third finding -- */}
      <Section
        id="att-lamna"
        tone="muted"
        width="default"
        title="Vad det kostar att lämna"
        description="Varje jämförelse räknar på vad det kostar att vara kund. Det här är den andra halvan."
      >
        <Prose>
          <p>
            <strong>Du hyr larmet hos de två största.</strong> Verisures
            allmänna villkor punkt 5 säger att de behåller äganderätten till
            alla monterade och uppkopplade komponenter,{" "}
            <em>
              &quot;oavsett om dessa införskaffats via Verisure webbshop eller
              på annat sätt&quot;
            </em>
            . Du kan alltså köpa något av dem och ändå inte äga det.
          </p>
          <p>
            Sector Alarms punkt 8 går längre:{" "}
            <em>
              &quot;Larmsystemet är och ska vid var tid förbli Företagets
              egendom och Kunden förvärvar ingen rätt till eller i Larmsystemet
              utöver en nyttjanderätt under avtalstiden.&quot;
            </em>{" "}
            Det finns ingen friköpsmöjlighet för larmsystemet.
          </p>
          <p>
            <strong>Verisure publicerar en friköpstrappa</strong> och är ensamma
            om det, vilket förtjänar beröm oavsett vad man tycker om beloppen: 7
            000 kronor inom två år, 4 000 vid två till fyra, 2 000 vid fyra till
            fem, och en krona efter fem år.
          </p>
          <p>
            Det betyder att det inte finns någon femårig bindningstid, men att
            det finns en femårig pristrappa som gör ungefär samma sak.
          </p>
          <p>
            Två meningar i det finstilta avgör om trappan är värd något. Verisure
            skriver att de vid friköp{" "}
            <em>&quot;garanterar ingen funktion&quot;</em> och att appen inte
            går att använda efteråt. Du köper alltså loss hårdvara som i bästa
            fall blir en lokal ljudsignal. Och friköpet måste anmälas innan
            avtalstiden löper ut, annars försvinner rätten.
          </p>
          <p>
            <strong>Avgifterna i slutet står i kronor i avtalen.</strong>{" "}
            Verisure har rätt till en återtagandeavgift om 7 000 kronor om du
            inte ger tillträde för avslutningsbesöket. Sector tar 990 kronor om
            du inte är hemma vid nedmonteringen, och 1 990 kronor för att lämna
            tillbaka nycklar du själv lämnat in. Deras punkt 12.3 säger dessutom
            att nycklarna förstörs utan förvarning om du inte skriftligen ber om
            dem under uppsägningstiden.
          </p>
          <p>
            Ingen av avgifterna är ovanlig i branschen. Poängen är att de går
            att läsa i förväg och att nästan ingen gör det.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------ self-disclosure -- */}
      <Section
        id="vem-har-kontrollerat"
        width="default"
        title="Vem har kontrollerat det här?"
        description="Vad rankningen bygger på, och var den är svag."
      >
        <Prose>
          <p>
            <strong>
              Vinnaren är det bolag vi kritiserar hårdast, och det följer av
              viktningen.
            </strong>{" "}
            Verisure är dyrast över fem år, behåller äganderätten till det du
            köpt och har kategorins högsta enskilda avgift. De vinner ändå,
            därför att öppna villkor väger trettio procent och de är det enda
            bolag som svarar på alla fyra frågorna före mötet: månadsavgift,
            startavgift, bindningstid och priset för att lämna. Tycker du att
            kostnaden väger tyngre än öppenheten är SecuritasHome ditt svar, för
            nästan halva pengen.
          </p>
          <p>
            <strong>Vi har inte tecknat något abonnemang.</strong> Vi har inte
            installerat något larm, inte utlöst något larm och inte mätt någon
            inställelsetid. Det går inte att göra trovärdigt för åtta bolag, och
            vi låtsas inte annat. Det vi har gjort är att läsa avtalen i
            original och citera dem med utgåva och punktnummer, vilket är den
            enda kontrollerbara delen av en tjänst som denna.
          </p>
          <p>
            <strong>
              Ett lågt betyg på öppna villkor är inte en dom över larmet.
            </strong>{" "}
            Garda Alarm får 1,0 därför att inget pris publiceras och länken till
            villkoren är död, inte därför att vi vet något negativt om
            tjänsten. Deras affärsmodell, ett larm du köper utan månadsavgift,
            är den mest intressanta i hela jämförelsen. Vi kan bara inte
            kontrollera en enda uppgift om den.
          </p>
          <p>
            <strong>Safeland jämförs mot fel måttstock.</strong> De bygger på
            lokal respons från människor i närheten i stället för väktare från
            en central. Vår viktning är byggd för abonnemangslarm med
            larmcentral, och att de hamnar sist säger mer om det än om
            kvaliteten på det de säljer.
          </p>
          <p>
            <strong>Ett tomt fält betyder att bolaget inte publicerar
            uppgiften.</strong>{" "}
            Det betyder aldrig noll kronor. Vi fyller bara i det vi kan läsa i
            bolagets egen text eller i avtalet, och där ingenting står får
            fältet stå tomt.
          </p>
        </Prose>
      </Section>

      {/* ---------------------------------------------------- deep dives -- */}
      <Section
        id="recensioner"
        width="wide"
        title="Genomgång av varje bolag"
        description="Alla åtta bedöms mot samma fem kriterier. Uppgifterna är bolagens egna, hämtade ur deras sidor och avtal."
      >
        <div className="flex flex-col gap-block">
          {services.map((service, i) => (
            <ServiceReview key={service.id} service={service} rank={i + 1}>
              <VerdictText text={service.verdict} className="text-muted-foreground" />
              <CriteriaScores
                criteria={TEST_PAGE.criteria}
                scores={service.scores}
                size="sm"
                className="mt-1"
              />
            </ServiceReview>
          ))}
        </div>
      </Section>

      <Section
        id="andra-bolag"
        tone="muted"
        width="default"
        title="Andra bolag vi övervägde"
        description="Sex poster som inte hamnade i rankningen, inklusive ett märke som inte längre finns och två som hör hemma på en annan sida."
      >
        <ConsideredList items={HEMLARM_CONSIDERED} />
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
        title="Så gjorde vi jämförelsen"
        description="Viktningen nedan är den som räknar fram betygen i tabellen."
      >
        <MethodologyBlock
          criteria={TEST_PAGE.criteria}
          intro={TEST_PAGE.methodology}
          variant="cards"
          footnote="Öppna villkor väger tyngst eftersom det är den enda egenskapen en spekulant kan kontrollera själv innan säljaren står i hallen, och eftersom skillnaderna är stora och dokumenterade. Skalan är 5,0 när månadsavgift, startavgift och fullständiga villkor är publicerade, 3,5 när villkoren finns men bara en del av priset, 2,0 när enbart ett startpaketspris publiceras, och 1,0 när ingen prisuppgift alls går att hitta utan offertförfrågan. Kriteriet mäter öppenhet och inte prisnivå. Kostnaden att lämna väger 25 eftersom du hyr larmet hos de två största, och eftersom en femårig friköpstrappa fungerar som en bindningstid utan att heta så. Prisvärde väger bara 10 av ett enda skäl: för fyra av åtta bolag går det inte att räkna, och att låta kriteriet väga tungt hade betytt att betygsätta gissningar. Det finns inget oberoende test av kategorin och det går inte att göra ett, så vi har i stället läst avtalen i original."
        />
      </Section>

      <Section
        id="darfor-litar-du-pa-oss"
        width="default"
        title="Därför kan du lita på oss"
        description="Vi provar inte tjänsterna själva. Det här är vad vi gör i stället."
      >
        <TrustBlock />
        <div className="mt-block grid gap-4 sm:grid-cols-2">
          <PersonCard
            person={author}
            variant="box"
            label="Skriven av"
            meta="Läser avtal och betygsätter"
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
        description="Avtalsvillkoren i original, prissidorna de är lästa på, normgivaren och den starkaste konkurrenten."
      >
        <Prose className="mb-block">
          <p>
            <strong>Det finns inget oberoende test av hemlarmstjänster.</strong>{" "}
            Varken Råd &amp; Rön eller Testfakta har testat kategorin, och det
            är svårt att se hur ett labbtest av en larmcentral skulle gå till.
          </p>
          <p>
            <strong>
              I stället har vi läst det som binder bolaget.
            </strong>{" "}
            Ett avtalsvillkor är på sitt sätt starkare bevis än ett test:
            det är vad bolaget lovar och kan hållas till. Samtliga dokument
            nedan är lästa i original, i sin helhet, med utgåva angiven.
          </p>
        </Prose>
        <SourceList sources={HEMLARM_SOURCES} title={null} />
      </Section>

      <Section id="vanliga-fragor" width="default" title="Vanliga frågor">
        <FaqAccordion items={HEMLARM_FAQ} schema />
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
