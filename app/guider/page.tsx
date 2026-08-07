import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SITE } from "@/lib/site";
import { pageOpenGraph } from "@/lib/metadata";
import { TOOLS, toolHref, type Tool } from "@/lib/tools";
import { TEST_PAGE_INDEX, CATEGORIES } from "@/lib/catalog";
import { graph, pageEntity } from "@/lib/schema";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";

export const metadata: Metadata = {
  title: "Guider och räknare för hemmet",
  description:
    "Räkna ut hur många lumen rummet behöver och vad lamporna drar i el per år, eller ta reda på vad en kamera får filma och vilket lås försäkringsbolaget räknar som godkänt. Samma guider som ligger inbyggda i våra jämförelser.",
  alternates: { canonical: "/guider" },
  openGraph: pageOpenGraph({ title: "Guider och räknare", path: "/guider" }),
};

/**
 * Verktygen grupperade efter vilken del av sajten de hör hemma i.
 *
 * ⚠️ Sidan var tidigare en enda platt lista med 25 kort, och korttitlarna var
 * `span`. Det gav en hubbsida med **noll rubriker**: en skärmläsare kunde inte
 * hoppa mellan avsnitt och en sökmotor såg ingen struktur alls. Grupperingen
 * härleds ur `usedOn`, alltså ur den kategori verktyget faktiskt bäddas in på,
 * så en ny kategori hamnar rätt utan att den här filen rörs.
 *
 * Ett verktyg som används på flera kategorier räknas till den första, vilket
 * stämmer i samtliga fall i dag: protokollväljaren ligger i Smart hem,
 * femårskostnaden i Säkerhet och luftväljaren i Hem & hushåll.
 */
function grupperadeVerktyg(): { nyckel: string; rubrik: string; verktyg: Tool[] }[] {
  const gruppFörKategori = new Map(
    TEST_PAGE_INDEX.map((c) => [c.href.replace(/^\//, ""), c.category.key]),
  );

  const hinkar = new Map<string, Tool[]>();
  for (const tool of TOOLS) {
    const nyckel = gruppFörKategori.get(tool.usedOn[0] ?? "") ?? "ovrigt";
    hinkar.set(nyckel, [...(hinkar.get(nyckel) ?? []), tool]);
  }

  const ordning = [
    ...CATEGORIES.map((g) => ({ nyckel: g.key, rubrik: g.label })),
    { nyckel: "ovrigt", rubrik: "Övriga guider" },
  ];

  return ordning
    .map((g) => ({ ...g, verktyg: hinkar.get(g.nyckel) ?? [] }))
    .filter((g) => g.verktyg.length > 0);
}

function VerktygsKort({ tool }: { tool: Tool }) {
  return (
    <li>
      <Link
        href={toolHref(tool)}
        className="themed-border group flex h-full flex-col gap-2 rounded-lg bg-card pad-card shadow-card transition-shadow hover:shadow-raised"
      >
        <span className="flex items-start justify-between gap-3">
          {/* h3 och inte span: sidan har en h2 per grupp, och korttiteln är
              nästa nivå. Det är enda sättet att göra 25 kort navigerbara. */}
          <h3 className="font-heading text-lg">{tool.name}</h3>
          <ArrowRight
            aria-hidden="true"
            className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          />
        </span>
        <span className="text-sm text-muted-foreground">{tool.description}</span>
      </Link>
    </li>
  );
}

export default function VerktygPage() {
  const grupper = grupperadeVerktyg();

  /* Samlingens `@id` är det varje verktygssida pekar på med `isPartOf`, så
     räknarna blir en samling i grafen och inte tjugofem lösa. */
  const jsonLd = graph([
    pageEntity({
      type: "CollectionPage",
      pageUrl: "/guider",
      name: "Guider och räknare",
      description:
        "Guider och räknare som svarar på en fråga i taget, samma som ligger inbyggda i våra jämförelser.",
      mainEntity: { "@id": `${SITE.url}/guider#samling` },
    }),
    {
      "@type": "ItemList",
      "@id": `${SITE.url}/guider#samling`,
      name: "Guider och räknare",
      url: `${SITE.url}/guider`,
      numberOfItems: TOOLS.length,
      itemListElement: TOOLS.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@id": `${SITE.url}${toolHref(tool)}#app` },
      })),
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Container size="wide" className="pt-6">
        <Breadcrumbs items={[{ label: "Guider" }]} schema />
      </Container>

      <Container
        size="wide"
        className="pt-3 pb-block lg:pt-[var(--space-section)]"
      >
        {/* ⚠️ Ingen eyebrow här, till skillnad från /guider/[slug].
            Sidhuvudet, brödsmulan och rubriken säger redan "Guider", och en
            fjärde upprepning på samma skärm gav "Guider Guider Guider Guider
            och räknare" uppläst i följd. På en verktygssida bär eyebrowen
            information, eftersom rubriken där är verktygets eget namn. Här
            bär den ingen. */}
        <h1 className="text-h1">Guider och räknare</h1>
        {/* ⚠️ Här stod "Små räknare som svarar på en fråga var". Fel på två
            sätt. Långt ifrån alla räknar: ungefär hälften reder ut vad
            reglerna säger, som vad en kamera får filma eller vilket lås
            försäkringen godtar. Och "små" säljer under det som är sidans
            enda argument, att svaret faktiskt är utrett. Det var samma ord
            som gjorde att menyposten bytte namn från Verktyg till Guider. */}
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Var och en svarar på en enda fråga, och gör det ordentligt. Några
          räknar åt dig, som hur många lumen ett rum behöver eller vad
          julbelysningen kostar i el. Andra reder ut vad som gäller, till
          exempel vad du får filma mot gatan eller vilket lås försäkringsbolaget
          godtar. De ligger inbyggda i köpguiderna där de hör hemma, och här för
          dig som bara vill ha svaret.
        </p>
      </Container>

      {grupper.map((grupp, i) => (
        <Section
          key={grupp.nyckel}
          id={grupp.nyckel}
          width="wide"
          tone={i % 2 === 0 ? "muted" : "default"}
          title={grupp.rubrik}
          /* Ternären här hade "räknare" i båda grenarna, alltså ingen
             böjning alls. "Guide" och "guider" täcker både räknarna och
             regelgenomgångarna, vilket "räknare" inte gjorde. */
          description={`${grupp.verktyg.length} ${grupp.verktyg.length === 1 ? "guide" : "guider"} som hör till våra jämförelser i ${grupp.rubrik.toLowerCase()}.`}
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grupp.verktyg.map((tool) => (
              <VerktygsKort key={tool.slug} tool={tool} />
            ))}
          </ul>
        </Section>
      ))}

      <Container size="wide" className="pad-section">
        <AffiliateDisclosure />
      </Container>
    </>
  );
}
