import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SITE } from "@/lib/site";
import { graph, pageEntity } from "@/lib/schema";
import { CATEGORY_INDEX, SMART_HEM } from "@/lib/catalog";
import { CategoryGrid } from "@/components/site/category-grid";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";
import { UpdatedStamp } from "@/components/site/updated-stamp";
import { Button } from "@/components/ui/button";

/* Derived, so the headline number can never outrun what we have published. */
const COMPARED_COUNT = CATEGORY_INDEX.reduce(
  (sum, cat) => sum + (cat.count ?? 0),
  0,
);

export default function HomePage() {
  /* Startsidans identitet. Organisationen och webbplatsen definieras i
     `SiteSchema` och refereras härifrån via `pageEntity`. */
  const homeJsonLd = graph([
    pageEntity({
      type: "CollectionPage",
      pageUrl: "/",
      name: `${SITE.name}. ${SITE.tagline}`,
      description:
        "Oberoende jämförelser av produkter för smarta hem och hemsäkerhet.",
    }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: homeJsonLd }}
      />

      <Container size="wide" className="pad-section">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand">Oberoende tester</p>
          <h1 className="text-h1 mt-2">{SITE.tagline}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Vi jämför produkterna mot samma kriterier, väger in oberoende
            tester och publicerar viktningen som ger betygen. Sedan säger vi
            vilken vi hade valt.
          </p>
          <div className="mt-[var(--space-block)] flex flex-wrap items-center gap-row">
            <Button asChild variant="brand" size="xl">
              <Link href="/smart-belysning">
                Se testet av smart belysning
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href={SMART_HEM.href}>Guide: bygga smart hem</Link>
            </Button>
            <UpdatedStamp date="2026-07-28" testedCount={COMPARED_COUNT} />
          </div>
        </div>
      </Container>

      <Section
        tone="muted"
        width="wide"
        eyebrow="Kategorier"
        title="Vad letar du efter?"
      >
        <CategoryGrid entries={CATEGORY_INDEX} columns={3} />
      </Section>

      <Container size="wide" className="pad-section">
        <AffiliateDisclosure />
      </Container>
    </>
  );
}
