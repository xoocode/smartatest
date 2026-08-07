import type { Metadata } from "next";

import { SITE } from "@/lib/site";
import { pageOpenGraph } from "@/lib/metadata";
import { graph, pageEntity } from "@/lib/schema";
import { SMART_HEM, testPagesInCategory, isBrowsable } from "@/lib/catalog";
import { groupSources, SMART_HEM_SOURCES } from "@/lib/sources";
import { PEOPLE } from "@/lib/people";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { TestPageGrid } from "@/components/site/test-page-grid";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { Prose } from "@/components/site/prose";
import { TocNav } from "@/components/site/toc-nav";
import { UpdatedStamp } from "@/components/site/updated-stamp";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";
import { LegalDisclaimer } from "@/components/site/legal-disclaimer";
import { PersonCard } from "@/components/site/person-card";
import { SourceList } from "@/components/site/source-list";
import { FaqAccordion } from "@/components/product/faq-accordion";

import Guide from "@/content/smart-hem/guide.mdx";

/*
 * The guide content is real and sourced.
 */

const PAGE_URL = SMART_HEM.href;
const UPDATED = "2026-08-04";

export const metadata: Metadata = {
  title: "Smart hem: så väljer du rätt produkter",
  description:
    "Läs experttesterna innan du köper. Vi har gått igenom dem åt dig och sammanställt vad de faktiskt är överens om, plus hur väl Matter, Zigbee och Thread fungerar ihop idag.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({
    title: "Smart hem: så väljer du rätt produkter",
    path: PAGE_URL,
  }),
};

const TOC = [
  { id: "jamforelser", label: "Våra jämförelser" },
  { id: "las-experttester", label: "Läs experttesterna först" },
  { id: "ett-eller-flera-system", label: "Ett system eller flera?" },
  { id: "appar", label: "Apparna som är värda att installera" },
  { id: "ordning", label: "I vilken ordning ska du köpa?" },
  { id: "kallor", label: "Källor" },
  { id: "vanliga-fragor", label: "Vanliga frågor" },
];

const FAQ = [
  {
    question: "Kan jag blanda smarta produkter från olika märken?",
    answer:
      "Ja, om de stöder Matter. En Matter-certifierad produkt fungerar med Apple Home, Google Home, Alexa, SmartThings och Home Assistant, och kan vara ansluten till flera samtidigt. Zigbee-produkter som Philips Hue och IKEA behöver en brygga som översätter till Matter, men bryggan medföljer ofta redan.",
  },
  {
    question: "Behöver jag välja ett enda system?",
    answer:
      "Välj en styrapp, inte ett märke. Styrappen är det enda beslut som är dyrt att ångra, eftersom automationerna ligger där. Produkterna kan komma från vilken tillverkare som helst så länge de är Matter-certifierade.",
  },
  {
    question: "Fungerar IKEA:s lampor med Philips Hue?",
    answer:
      "Oftast ja, eftersom båda kör Zigbee och IKEA-lampor går att para mot en Hue Bridge. Det är dock inte officiellt stött av Philips, och en firmwareuppdatering kan tillfälligt ställa till det. Se det som en bonus snarare än en garanti.",
  },
  {
    question: "Behöver jag en hubb?",
    answer:
      "Inte för att komma igång. Wi-Fi-produkter och Matter över Thread ansluter direkt. En hubb blir värd pengarna runt tio enheter, eftersom Zigbee och Thread då bildar ett eget nät i stället för att belasta routern.",
  },
  {
    question: "Vilken app är bäst för smarta hem?",
    answer:
      "Home Assistant om du vill ha full kontroll och accepterar att lägga en helg på att sätta upp det. Annars den som matchar telefonerna i hushållet: Apple Home för iPhone, Google Home eller Alexa för blandat. Behåll tillverkarens egen app för firmware och avancerade funktioner oavsett vad du väljer.",
  },
];

export default function SmartHemPage() {
  /* Hela gruppens källor, avdubblerade. Se `groupSources` i lib/sources.ts:
     sidan skickade tidigare en handplockad kategorilista hit. */
  const groupSources_ = groupSources(SMART_HEM, SMART_HEM_SOURCES);

  /* Gruppnav. `CollectionPage` med kategorierna som ItemList, så gruppen blir
     en entitet i grafen och inte bara en rubrik i menyn. */
  const hubJsonLd = graph([
    pageEntity({
      type: "CollectionPage",
      pageUrl: PAGE_URL,
      name: SMART_HEM.label,
      reviewed: UPDATED,
      mainEntity: { "@id": `${SITE.url}${PAGE_URL}#kategorier` },
    }),
    {
      "@type": "ItemList",
      "@id": `${SITE.url}${PAGE_URL}#kategorier`,
      name: `Jämförelser inom ${SMART_HEM.label.toLowerCase()}`,
      url: `${SITE.url}${PAGE_URL}`,
      itemListElement: testPagesInCategory(SMART_HEM)
        .filter(isBrowsable)
        .map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE.url}${c.href}`,
          name: c.label,
        })),
    },
  ]);

  const [author] = PEOPLE;
  const tests = SMART_HEM_SOURCES.filter((s) => s.kind !== "standard");
  const standards = SMART_HEM_SOURCES.filter((s) => s.kind === "standard");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: hubJsonLd }}
      />

      <Container size="wide" className="pt-6">
        <Breadcrumbs items={[{ label: SMART_HEM.label }]} schema />
      </Container>

      {/* Mobile trims the top: breadcrumb pt-6 plus a full section pad left a
          canyon between the trail and the h1 on a phone. Explicit paddings
          rather than pad-section + an override, because tailwind-merge cannot
          see a custom @utility and the winner would fall to stylesheet order. */}
      <Container
        size="wide"
        className="pt-3 pb-[var(--space-section)] lg:pt-[var(--space-section)]"
      >
        <div className="grid gap-block lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-row">
            <p className="eyebrow text-brand">Kategori</p>
            <h1 className="text-h1">Smart hem: så väljer du rätt produkter</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Ingen redaktion i Sverige testar allt. Det som finns är dussintals
              seriösa experttester som var för sig täcker en handfull produkter,
              och rådet till dig som ska köpa är att läsa flera av dem. Vi har
              gjort det arbetet och sammanställt vad de faktiskt är överens om.
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

      {/* The hero above supplies the space over the pills; without this the
          row sat flush against the section below it. */}
      <Container size="wide" className="pb-block">
        <TocNav variant="inline" entries={TOC} />
      </Container>

      <Section
        id="jamforelser"
        tone="muted"
        width="wide"
        eyebrow="Våra jämförelser"
        title="Vad testerna säger"
        description="Varje test bygger på samma metod: publicerade mätvärden och oberoende experttester, sammanvägda mot kriterier vi redovisar öppet."
      >
        {/* testPagesInCategory, inte hela TEST_PAGE_INDEX. Fram till 2026-08-02
            fanns bara en grupp och skillnaden syntes inte. När Säkerhet
            öppnades började den här navsidan lista vattenlarm och kodlås som
            om de vore smarta hem-produkter, vilket är precis den hopblandning
            grupperna finns för att undvika. */}
        <TestPageGrid entries={testPagesInCategory(SMART_HEM)} columns={3} />
      </Section>

      <Section width="default">
        <Prose>
          <Guide />
        </Prose>
      </Section>

      <Section
        id="kallor"
        width="default"
        title="Källor"
        description="Experttesterna vi har gått igenom, och specifikationerna vi har kontrollerat definitionerna mot."
      >
        <div className="flex flex-col gap-block">
          <SourceList sources={tests} title="Experttester" />
          <SourceList
            sources={standards}
            title="Standarder och myndigheter"
            variant="compact"
          />
        </div>
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
          items={["general", "electrical"]}
          className="mb-block"
        />
      </Container>
    </>
  );
}
