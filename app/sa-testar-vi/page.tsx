import type { Metadata } from "next";
import Link from "next/link";

import { PUBLISHER, SITE } from "@/lib/site";
import { publishedCategories, SMART_BELYSNING } from "@/lib/test-pages";
import { SMART_BELYSNING_PRODUCTS } from "@/lib/data/smart-belysning";
import { TEST_PAGE_INDEX, isBrowsable } from "@/lib/catalog";
import { graph, pageEntity } from "@/lib/schema";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
import { Container } from "@/components/site/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Section } from "@/components/site/section";
import { Prose } from "@/components/site/prose";
import { UpdatedStamp } from "@/components/site/updated-stamp";
import { TrustBlock } from "@/components/site/trust-block";
import { PersonCard } from "@/components/site/person-card";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";
import { TocNav } from "@/components/site/toc-nav";

/*
 * Metodsidan.
 *
 * ## Tabellerna räknas fram, de är inte avskrivna
 *
 * Både räkneexemplet och kriterieöversikten läser `lib/categories.ts` och
 * produktdatan direkt. Det är avsiktligt och det är hela poängen: en metodsida
 * med handskrivna siffror börjar ljuga första gången någon justerar en vikt,
 * och den lögnen syns inte förrän en läsare räknar efter. Ändras viktningen
 * ändras den här sidan i samma sekund.
 *
 * Samma princip som `sourceSummary()` i lib/sources.ts bygger på.
 *
 * ## Bara publicerade kategorier länkas
 *
 * Räkneexemplet hämtas från smart belysning eftersom den är `live` i katalogen.
 * Kriterietabellen listar samtliga kategorier men länkar bara dem som är
 * byggda. Se `status` i lib/catalog.ts. Antalet står ingenstans i klartext,
 * med flit: det ändras varje gång en kategori tillkommer.
 */

const PAGE_URL = "/sa-testar-vi";
const UPDATED = "2026-08-02";

export const metadata: Metadata = {
  title: "Så testar vi",
  description:
    "Vi gör inga egna mätningar. Betygen räknas fram ur specifikationer, publicerade tester och en viktning som står öppet på varje sida.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Så testar vi",
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

const TOC = [
  { id: "vad-vi-inte-gor", label: "Vad vi inte gör" },
  { id: "underlaget", label: "Vad betygen bygger på" },
  { id: "rakneexempel", label: "Så räknas ett betyg fram" },
  { id: "viktningen", label: "Varför vikterna skiljer sig åt" },
  { id: "testkriteriet", label: "När vi stryker testkriteriet" },
  { id: "raknas-inte", label: "Vad som aldrig räknas in" },
  { id: "bortvalda", label: "Produkterna vi valde bort" },
  { id: "granskning", label: "Två personer, inte en" },
  { id: "rattelser", label: "Rättelser" },
];

/** Kriteriet som väger publicerade tester, om kategorin har ett. */
function testCriterion(criteria: { key: string; label: string; weight: number }[]) {
  return criteria.find(
    (c) => c.key === "testomdome" || c.label.toLowerCase().startsWith("omdöme"),
  );
}

function testPageHref(slug: string): string | null {
  const entry = TEST_PAGE_INDEX.find((c) => c.href === `/${slug}`);
  return entry && isBrowsable(entry) ? entry.href : null;
}

export default function SaTestarViPage() {
  const category = SMART_BELYSNING;
  const winner = SMART_BELYSNING_PRODUCTS[0];

  /* Samma uträkning som weightedRating() i lib/products.ts gör, radvis, så att
     läsaren ser mellanleden och inte bara facit. */
  const rows = category.criteria.map((c) => ({
    label: c.label,
    weight: c.weight,
    score: winner.scores[c.key],
    product: winner.scores[c.key] * c.weight,
  }));
  const sum = rows.reduce((acc, r) => acc + r.product, 0);
  const raw = sum / 100;

  /* Publicerade, inte alla författade. Tabellen nedan står under
     rubriken "Så här ser det ut i dag", och en kategori som ingen kan öppna
     hör inte hemma i den beskrivningen. */
  const publicerade = publishedCategories();
  const withTest = publicerade.filter((c) => testCriterion(c.criteria));
  const withoutTest = publicerade.filter((c) => !testCriterion(c.criteria));

  /*
   * Sidentitet med djuplänkbara avsnitt.
   *
   * `TOC` är samma array som innehållsförteckningen renderar, så varje `@id`
   * här motsvarar ett `id` som faktiskt finns i DOM:en. Det är hela poängen
   * med `hasPart`: en språkmodell som citerar räkneexemplet kan peka på
   * #rakneexempel i stället för på sidan, och läsaren landar på rätt stycke.
   *
   * `AboutPage` och inte `TechArticle`: `reviewedBy` hör till `WebPage`, och
   * en metodredovisning är en sida om oss snarare än en teknisk artikel.
   */
  const jsonLd = graph([
    pageEntity({
      type: "AboutPage",
      pageUrl: PAGE_URL,
      name: "Så testar vi",
      description:
        "Metoden bakom betygen: underlaget, viktningen och ett räkneexempel med riktiga siffror.",
      author: DEFAULT_AUTHOR,
      reviewer: DEFAULT_REVIEWER,
      reviewed: UPDATED,
      about: {
        "@type": "Thing",
        "@id": `${SITE.url}${PAGE_URL}#metod`,
        name: "Testmetod och betygssättning",
        url: `${SITE.url}${PAGE_URL}`,
      },
      sections: TOC,
    }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Container size="narrow" className="pt-6">
        <Breadcrumbs items={[{ label: "Så testar vi" }]} schema />
      </Container>

      <Container size="narrow" className="pt-3 pb-[var(--space-section)]">
        <p className="eyebrow text-brand">Metod</p>
        <h1 className="mt-2 text-h1">Så testar vi</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Varje betyg på sajten går att räkna efter. Den här sidan visar hur,
          med siffrorna från en av våra publicerade jämförelser.
        </p>
        <UpdatedStamp date={UPDATED} variant="bar" className="mt-4 self-start" />
        <TocNav variant="inline" entries={TOC} className="mt-block" />
      </Container>

      <Section id="vad-vi-inte-gor" tone="muted" width="narrow" title="Vad vi inte gör">
        <Prose>
          <p>
            Vi gör inga egna mätningar. Vi äger ingen provningsutrustning, vi
            har inte tänt eld på någon brandvarnare och vi har inte hällt vatten
            på någon sensor. Det står på varje jämförelse där det är relevant,
            och det står här först eftersom allt annat vi gör följer av det.
          </p>
          <p>
            Anledningen är enkel. En riktig brandprovning kräver en
            provningsanläggning och kostar mer än den här sajten omsätter, och
            att antyda mätvärden vi inte tagit fram vore värre än att inte ha
            några. Flera av de svenska sidorna i våra kategorier har rubriker
            som <em>Så har vi testat</em> utan ett enda mätvärde under. Det
            försöker vi låta bli.
          </p>
        </Prose>
      </Section>

      <Section id="underlaget" width="narrow" title="Vad betygen bygger på">
        <Prose>
          <p>Tre sorters underlag, i den ordningen:</p>
          <p>
            <strong>Specifikationer lästa hos butiken.</strong> Vi läser
            tillverkarens och butikens egna produktsidor och antecknar datumet.
            Priser, effekt, batteritid, frekvenser och certifieringar kommer
            därifrån. Ett pris utan datum är ett påstående vi inte kan stå för,
            så varje pris på sajten är daterat.
          </p>
          <p>
            <strong>Publicerade oberoende tester.</strong> Där någon faktiskt
            har mätt något läser vi det, ställer testerna mot varandra och
            länkar till vart och ett. Källistan på varje jämförelse säger vad
            varje källa är: ett riktigt test, en myndighet eller en annan
            jämförelse som inte provat något själv.
          </p>
          <p>
            <strong>Standarder och myndigheter.</strong> EN 3 för brandsläckare,
            Elsäkerhetsverkets regler för vad du får installera själv,
            Myndigheten för samhällsskydd och beredskaps rekommendationer för
            brandvarnare. Dem läser vi i original och citerar för definitioner,
            aldrig för omdömen om enskilda produkter.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------- räkneexempel -- */}
      <Section
        id="rakneexempel"
        tone="muted"
        width="narrow"
        title="Så räknas ett betyg fram"
        description="Riktiga siffror från en publicerad jämförelse, inte ett påhittat exempel."
      >
        <Prose className="mb-block">
          <p>
            Varje produkt får ett delbetyg från 0 till 5 på varje kriterium.
            Delbetyget multipliceras med kriteriets vikt, produkterna summeras
            och summan delas med 100. Resultatet är totalbetyget. Det finns
            ingen justering efteråt och ingen redaktionell knuff.
          </p>
          <p>
            Nedan är{" "}
            <strong>
              {winner.brand} {winner.name}
            </strong>
            , testvinnare i{" "}
            <Link href={`/${category.slug}`}>{category.label.toLowerCase()}</Link>
            .
          </p>
        </Prose>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Uträkning av totalbetyget för {winner.brand} {winner.name}
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-2 font-semibold">Kriterium</th>
                <th scope="col" className="py-2 text-right font-semibold">Vikt</th>
                <th scope="col" className="py-2 text-right font-semibold">Delbetyg</th>
                <th scope="col" className="py-2 text-right font-semibold">Vikt × betyg</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-border">
                  <td className="py-2">{r.label}</td>
                  <td className="py-2 text-right tabular-nums">{r.weight} %</td>
                  <td className="py-2 text-right tabular-nums">
                    {r.score.toLocaleString("sv-SE", { minimumFractionDigits: 1 })}
                  </td>
                  <td className="py-2 text-right tabular-nums">
                    {r.product.toLocaleString("sv-SE", {
                      maximumFractionDigits: 1,
                    })}
                  </td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2">Summa</td>
                <td className="py-2 text-right tabular-nums">100 %</td>
                <td className="py-2" />
                <td className="py-2 text-right tabular-nums">
                  {sum.toLocaleString("sv-SE", { maximumFractionDigits: 1 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Prose className="mt-block">
          <p>
            {sum.toLocaleString("sv-SE", { maximumFractionDigits: 1 })} delat med
            100 blir{" "}
            {raw.toLocaleString("sv-SE", { maximumFractionDigits: 3 })}, som
            avrundas till{" "}
            <strong>
              {winner.rating.toLocaleString("sv-SE", {
                minimumFractionDigits: 1,
              })}{" "}
              av 5
            </strong>
            . Det talet fördubblas till skalan vi visar i jämförelserna,{" "}
            <strong>
              {winner.score.toLocaleString("sv-SE", {
                minimumFractionDigits: 1,
              })}{" "}
              av 10
            </strong>
            . Avrundningen sker på femskalan först, vilket är varför
            totalbetyget kan sluta på en jämn decimal.
          </p>
          <p>
            Lägg märke till raden Prisvärde. Vinnaren får{" "}
            {rows
              .find((r) => r.label === "Prisvärde")
              ?.score.toLocaleString("sv-SE", { minimumFractionDigits: 1 })}{" "}
            av 5 där och vinner ändå, eftersom de kriterier den är bäst på väger
            tyngre tillsammans. Tycker du att priset borde väga mer än
            färgåtergivning har du all information du behöver för att räkna om
            det själv och landa i ett annat svar. Det är meningen.
          </p>
        </Prose>
      </Section>

      {/* --------------------------------------------------- viktningen -- */}
      <Section
        id="viktningen"
        width="narrow"
        title="Varför vikterna skiljer sig åt"
      >
        <Prose>
          <p>
            Kriterierna hör till kategorin, inte till produkten. En brandvarnare
            bedöms på om den kan larma tillsammans med de andra i huset, en
            brandfilt på om butiken dokumenterar certifieringen. Att väga dem
            likadant vore att låtsas att de löser samma problem.
          </p>
          <p>
            Vikterna summerar alltid till 100 inom en kategori, och de står
            utskrivna på varje jämförelse under rubriken <em>Så gjorde vi
            testet</em>. Just nu har vi {publishedCategories().length} kategorier med
            publicerad viktning.
          </p>
          <p>
            Det tyngsta enskilda kriteriet på hela sajten är dokumenterad
            certifiering för brandfiltar, som väger 35 procent. Det säger något
            om kategorin: när ingen har provat filtarna är butikens egen
            dokumentation det enda som skiljer en godkänd filt från en bit tyg.
          </p>
        </Prose>
      </Section>

      {/* ------------------------------------------------- testkriteriet -- */}
      <Section
        id="testkriteriet"
        tone="muted"
        width="narrow"
        title="När vi stryker testkriteriet"
        description="Ett kriterium som bara går att sätta för hälften av produkterna mäter tillgången på tester, inte kvaliteten på produkterna."
      >
        <Prose>
          <p>
            I kategorier där oberoende tester finns väger vi in dem. I
            kategorier där de knappt finns stryker vi kriteriet helt i stället
            för att låta några produkter få poäng och resten noll. Ett kriterium
            som saknas för hälften av fältet straffar de produkter ingen råkat
            skriva om, vilket inte har något med produkten att göra.
          </p>
          <p>
            Så här ser det ut i dag. {withTest.length} av{" "}
            {publicerade.length} kategorier väger publicerade tester,{" "}
            {withoutTest.length} gör det inte.
          </p>
        </Prose>

        <div className="mt-block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Kategorier med och utan kriterium för publicerade tester
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-2 font-semibold">Kategori</th>
                <th scope="col" className="py-2 font-semibold">Kriterium</th>
                <th scope="col" className="py-2 text-right font-semibold">Vikt</th>
              </tr>
            </thead>
            <tbody>
              {publicerade.map((c) => {
                const crit = testCriterion(c.criteria);
                const href = testPageHref(c.slug);
                return (
                  <tr key={c.slug} className="border-b border-border">
                    <td className="py-2">
                      {href ? (
                        <Link
                          href={href}
                          className="text-primary underline underline-offset-2"
                        >
                          {c.label}
                        </Link>
                      ) : (
                        c.label
                      )}
                    </td>
                    <td className="py-2 text-muted-foreground">
                      {crit ? crit.label : "Stryket, för tunt underlag"}
                    </td>
                    <td className="py-2 text-right tabular-nums">
                      {crit ? `${crit.weight} %` : "0 %"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Prose className="mt-block">
          <p>
            Brandvarnare är gränsfallet som visar hur beslutet går till. Det
            finns en riktig brandprovning av brandvarnare, Stiftung Warentests, men
            de provade den tyska marknaden och deras vinnare säljs inte hos
            någon svensk butik vi bevakar. Ingen av produkterna vi rankar ingick.
          </p>
          <p>
            Kriteriet heter därför <em>omdöme i publicerade jämförelser</em> och
            inte testomdöme, och det räknar hur många av de svenska
            jämförelserna som utsett produkten till vinnare eller topplacering.
            Ingen av dem redovisar ett enda mätvärde. Vi räknar dem ändå, men
            vi skriver ut vilka de är, så att du kan värdera dem själv.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------- räknas inte -- */}
      <Section id="raknas-inte" width="narrow" title="Vad som aldrig räknas in">
        <Prose>
          <p>
            <strong>Kundbetygen hos butiken.</strong> Vi visar dem där de finns,
            med antal och datum, men de påverkar inte totalbetyget. Ett snitt på
            3,3 från sju personer och 5,0 från 73 är inte samma sak, och varje
            butik har sina egna kunder. De är intressanta, inte jämförbara.
          </p>
          <p>
            <strong>Provisionen.</strong> Vad en butik betalar oss syns inte i
            kriterierna, av det enkla skälet att det inte finns något kriterium
            att lägga den i. Hur pengarna fungerar står på{" "}
            <Link href="/annonsmarkning">sidan om annonsmärkning</Link>.
          </p>
          <p>
            <strong>Vad tillverkaren tycker.</strong> Ingen tillverkare får läsa
            en jämförelse i förväg, och ingen får betala för en placering.
          </p>
        </Prose>
      </Section>

      <Section id="bortvalda" tone="muted" width="narrow" title="Produkterna vi valde bort">
        <Prose>
          <p>
            Varje jämförelse listar produkter som fanns i urvalet men inte i
            rankningen, med skälet utskrivet. En nedlagd modell, en tysk
            testvinnare som inte säljs här, en produkt som hör hemma i en annan
            kategori.
          </p>
          <p>
            Skälet ska vara ett verkligt skäl. <em>Vi hann inte</em> räknas inte
            som ett. En kort lista utan bortvalda produkter ser ut som hela
            marknaden i stället för som ett urval, och det är just den
            skillnaden vi vill att du ska se.
          </p>
        </Prose>
      </Section>

      <Section id="granskning" width="narrow" title="Två personer, inte en">
        {/* Vidarelänkarna av: den här sidan är målet för dem. */}
        <TrustBlock showLinks={false} />
        <div className="mt-block grid gap-4 sm:grid-cols-2">
          <PersonCard
            person={DEFAULT_AUTHOR}
            variant="box"
            label="Skriven av"
            meta="Bygger viktningen och sätter betygen"
            link
          />
          <PersonCard
            person={DEFAULT_REVIEWER}
            variant="box"
            label="Granskad av"
            meta="Kontrollerar siffror och källor"
            link
          />
        </div>
        <Prose className="mt-block">
          <p>
            Den som skriver en jämförelse granskar den inte själv. Hela
            redaktionen finns på <Link href="/om-oss">om oss</Link>.
          </p>
        </Prose>
      </Section>

      <Section id="rattelser" tone="muted" width="narrow" title="Rättelser">
        <Prose>
          <p>
            Hittar du en siffra som inte stämmer vill vi veta det. Skriv till{" "}
            <a href={`mailto:${PUBLISHER.email}`}>{PUBLISHER.email}</a> eller
            via <Link href="/kontakt">kontaktsidan</Link>, där rättelser är
            första valet i formuläret och går före allt annat.
          </p>
          <p>
            Rättar vi något som påverkar en placering skriver vi ut att det
            gjorts och när, i vår{" "}
            <Link href="/rattelser">öppna rättelselogg</Link>. Ett tyst
            redigerat betyg är samma sak som inget betyg.
          </p>
        </Prose>
      </Section>

      {/* Står kvar här. Sidan handlar om hur vi arbetar, och då hör
          upplysningen om hur arbetet betalas hemma på den. */}
      <Container size="narrow" className="pad-section">
        <AffiliateDisclosure />
      </Container>
    </>
  );
}
