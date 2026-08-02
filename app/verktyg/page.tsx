import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SITE } from "@/lib/site";
import { TOOLS, toolHref } from "@/lib/tools";
import { graph, pageEntity } from "@/lib/schema";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container } from "@/components/site/container";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";

export const metadata: Metadata = {
  title: "Verktyg och räknare för hemmet",
  description:
    "Räkna ut hur många lumen rummet behöver, vad lamporna kostar i el per år och vilket protokoll som passar ditt hem. Samma verktyg som ligger inbyggda i våra tester.",
  alternates: { canonical: "/verktyg" },
  openGraph: { title: "Verktyg och räknare", url: `${SITE.url}/verktyg` },
};

export default function VerktygPage() {
  /* Samlingens `@id` är det varje verktygssida pekar på med `isPartOf`, så
     de fjorton räknarna blir en samling i grafen och inte fjorton lösa. */
  const jsonLd = graph([
    pageEntity({
      type: "CollectionPage",
      pageUrl: "/verktyg",
      name: "Verktyg och räknare",
      description:
        "Räknare som svarar på en fråga i taget, samma som ligger inbyggda i våra jämförelser.",
      mainEntity: { "@id": `${SITE.url}/verktyg#samling` },
    }),
    {
      "@type": "ItemList",
      "@id": `${SITE.url}/verktyg#samling`,
      name: "Verktyg och räknare",
      url: `${SITE.url}/verktyg`,
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

      <Container size="default" className="pt-6">
        <Breadcrumbs items={[{ label: "Verktyg" }]} schema />
      </Container>

      <Container
        size="default"
        className="pt-3 pb-[var(--space-section)] lg:pt-[var(--space-section)]"
      >
        <p className="eyebrow text-brand">Verktyg</p>
        <h1 className="text-h1 mt-2">Verktyg och räknare</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Små räknare som svarar på en fråga var. De ligger inbyggda i
          köpguiderna där de hör hemma, och här för dig som bara vill räkna.
        </p>

        <ul className="mt-[var(--space-block)] grid gap-4 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={toolHref(tool)}
                className="themed-border group flex h-full flex-col gap-2 rounded-lg bg-card pad-card shadow-card transition-shadow hover:shadow-raised"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-heading text-lg">{tool.name}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  />
                </span>
                <span className="text-sm text-muted-foreground">
                  {tool.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <Container size="default" className="pb-[var(--space-section)]">
        <AffiliateDisclosure />
      </Container>
    </>
  );
}
