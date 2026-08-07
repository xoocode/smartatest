import type { Metadata } from "next";

import { SITE } from "@/lib/site";
import { pageOpenGraph } from "@/lib/metadata";
import { graph, pageEntity } from "@/lib/schema";
import { SAKERHET, testPagesInCategory, isBrowsable } from "@/lib/catalog";
import { groupSources } from "@/lib/sources";
import { DEFAULT_AUTHOR } from "@/lib/people";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { TestPageGrid } from "@/components/site/test-page-grid";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { Prose } from "@/components/site/prose";
import { UpdatedStamp } from "@/components/site/updated-stamp";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";
import { LegalDisclaimer } from "@/components/site/legal-disclaimer";
import { PersonCard } from "@/components/site/person-card";
import { SourceList } from "@/components/site/source-list";
import { FaqAccordion } from "@/components/product/faq-accordion";

/*
 * Navsida för gruppen Säkerhet, öppnad 2026-08-02 med /vattenlarm.
 *
 * Medvetet mager jämfört med /smart-hem: den har ingen egen MDX-guide, eftersom
 * gruppen ännu bara har två byggda sidor och en hubb som säger mer än den vet
 * är sämre än en som säger lite. Guiden skrivs när fler kategorier finns.
 *
 * Sidan finns för att menyn ska kunna peka på gruppen. Innan den fanns listade
 * huvudmenyn varje kategori platt, vilket sköt ut sidhuvudet utanför fönstret
 * så fort kategorierna blev fler än tio. Se lib/site.ts.
 *
 */

const PAGE_URL = "/sakerhet";
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: "Säkerhet i hemmet: brandvarnare, vattenlarm och lås",
  description:
    "Våra jämförelser av brandvarnare, vattenlarm, kameror och lås. Vi läser de tester som finns, redovisar viktningen och säger rakt ut när ingen har testat något.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: "Säkerhet i hemmet", path: PAGE_URL }),
};

const FAQ = [
  {
    question: "Vad är viktigast att skaffa först?",
    answer:
      "Brandvarnare, utan konkurrens. De ska finnas på varje våningsplan och helst utanför varje sovrum, och de kostar från 139 kronor. Därefter en pulversläckare på minst sex kilo och en brandfilt nära köket. Vattenlarm kommer efter det, eftersom en vattenskada kostar pengar medan en brand kostar liv.",
  },
  {
    question: "Ger säkerhetsprodukter rabatt på försäkringen?",
    answer:
      "Ibland, men bara för en produkttyp. Länsförsäkringar och Folksam ger båda tio procent på villaförsäkringen för en godkänd vattenfelsbrytare, en enhet som stänger av vattnet. Ett vanligt vattenlarm ger ingen rabatt hos något av bolagen, och inte heller brandvarnare, eftersom de redan är ett krav.",
  },
  {
    question: "Varför saknar era säkerhetssidor ibland testomdöme?",
    answer:
      "För att det ofta inte finns något test att citera. Stiftung Warentest har testat rökvarnare men inte vattenlarm, och deras rökvarnartest gäller tyska produkter som inte säljs här. Saknas underlaget står det så på sidan, och då rankar vi på specifikationer i stället för att kalla en specifikationsjämförelse för ett test.",
  },
  {
    question: "Behöver säkerhetsprodukter vara uppkopplade?",
    answer:
      "Nej, och ibland är det en nackdel. En sammankopplad brandvarnare larmar i hela huset utan vare sig wifi eller app, och den fungerar under strömavbrott. Uppkoppling tillför en sak: att du får veta något när du inte är hemma. Är det värdet du är ute efter ska du köpa för det, inte för att förpackningen säger smart.",
  },
];

export default function SakerhetPage() {
  /* Hela gruppens källor, avdubblerade. Se `groupSources` i lib/sources.ts:
     sidan skickade tidigare en handplockad kategorilista hit. */
  const groupSources_ = groupSources(SAKERHET);

  /* Gruppnav. `CollectionPage` med kategorierna som ItemList, så gruppen blir
     en entitet i grafen och inte bara en rubrik i menyn. */
  const hubJsonLd = graph([
    pageEntity({
      type: "CollectionPage",
      pageUrl: PAGE_URL,
      name: SAKERHET.label,
      reviewed: UPDATED,
      mainEntity: { "@id": `${SITE.url}${PAGE_URL}#kategorier` },
    }),
    {
      "@type": "ItemList",
      "@id": `${SITE.url}${PAGE_URL}#kategorier`,
      name: `Jämförelser inom ${SAKERHET.label.toLowerCase()}`,
      url: `${SITE.url}${PAGE_URL}`,
      itemListElement: testPagesInCategory(SAKERHET)
        .filter(isBrowsable)
        .map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE.url}${c.href}`,
          name: c.label,
        })),
    },
  ]);

  const author = DEFAULT_AUTHOR;
  const categories = testPagesInCategory(SAKERHET);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: hubJsonLd }}
      />

      <Container size="wide" className="pt-6">
        <Breadcrumbs items={[{ label: SAKERHET.label }]} schema />
      </Container>

      <Container
        size="wide"
        className="pt-3 pb-[var(--space-section)] lg:pt-[var(--space-section)]"
      >
        <div className="grid gap-block lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-row">
            <p className="eyebrow text-brand">Kategori</p>
            <h1 className="text-h1">Säkerhet i hemmet</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              De här produkterna köper man en gång och hoppas aldrig få höra.
              Det gör dem svåra att jämföra, och det gör också att marknaden är
              full av sidor som påstår tester ingen utfört. Vi läser det som
              faktiskt finns, redovisar viktningen och säger rakt ut när svaret
              är att ingen har provat något.
            </p>
            <UpdatedStamp date={UPDATED} variant="bar" className="self-start" />
            <PersonCard person={author} variant="byline" />
            <AffiliateDisclosure variant="inline" />
          </div>

          <SourceList
            sources={groupSources_}
            variant="summary"
            title="Det här har vi gått igenom"
            className="lg:sticky lg:top-20 lg:self-start"
          />
        </div>
      </Container>

      <Section
        id="jamforelser"
        tone="muted"
        width="wide"
        eyebrow="Våra jämförelser"
        title="Testerna i gruppen"
        description="Varje test bygger på samma metod: publicerade specifikationer och de oberoende tester som finns, sammanvägda mot kriterier vi redovisar öppet."
      >
        <TestPageGrid entries={categories} columns={3} />
      </Section>

      <Section width="default" title="Så tänker vi om säkerhet">
        <Prose>
          <p>
            Kategorin har ett problem som inte finns i belysning eller
            robotdammsugare: <strong>nästan ingen testar</strong>. Stiftung
            Warentest tänder eld i brandkammare, men på den tyska marknaden, och
            deras vinnare säljs inte i Sverige. Vattenlarm har ingen provat alls.
          </p>
          <p>
            Samtidigt är jämförelserna av de här produkterna fulla av rubriker
            som &rdquo;Så har vi testat&rdquo; utan ett enda mätvärde under.
          </p>
          <p>
            Vår linje är därför enkel. Vi rankar på det som går att kontrollera:
            specifikationer lästa på butikens egen sida, med datum. Vi räknar in
            vad andra jämförelser kommit fram till, men vi skriver ut vilka de är
            och vad de faktiskt gjort. Och vi påstår aldrig en mätning vi inte
            utfört.
          </p>
        </Prose>
      </Section>

      <Section
        id="vanliga-fragor"
        tone="muted"
        width="default"
        title="Vanliga frågor"
      >
        <FaqAccordion items={FAQ} schema />
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
