import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { SITE } from "@/lib/site";
import { pageOpenGraph } from "@/lib/metadata";
import { TEST_PAGE_INDEX } from "@/lib/catalog";
import { TOOLS, findTool, toolHref } from "@/lib/tools";
import { DEFAULT_REVIEWER } from "@/lib/people";
import { ACTION_INPUTS, agentToolsFor } from "@/lib/agent-tools";
import { graph, orgRef, pageEntity } from "@/lib/schema";
import { hasToolWidget, ToolWidget } from "@/components/tools/registry";
import { ToolFrame } from "@/components/tools/tool-frame";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { Prose } from "@/components/site/prose";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tool = findTool(slug);
  if (!tool) return {};

  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: toolHref(tool) },
    openGraph: pageOpenGraph({ title: tool.title, path: toolHref(tool) }),
  };
}

export default async function ToolPage({ params }: Params) {
  const { slug } = await params;
  const tool = findTool(slug);

  /* A registry entry without a widget would render an empty page that still
     ranks. Better a 404 than a promise we do not keep. */
  if (!tool || !hasToolWidget(tool.slug)) notFound();

  const related = TEST_PAGE_INDEX.filter(
    (c) => c.status === "live" && tool.usedOn.includes(c.href.replace("/", "")),
  );

  const others = TOOLS.filter((t) => t.slug !== tool.slug);

  /*
   * WebApplication, inte Article.
   *
   * Räknarna är program: läsaren matar in rumsstorlek eller elpris och får ut
   * ett svar. Att märka dem som artiklar hade beskrivit texten runt omkring
   * och missat det som faktiskt är sidans innehåll.
   *
   * `browserRequirements` och `applicationCategory` är de egenskaper som gör
   * skillnaden begriplig för en maskin. `offers` med pris noll är hur
   * schema.org uttrycker gratis, och `isAccessibleForFree` säger samma sak en
   * gång till för konsumenter som bara läser den ena.
   */
  const url = `${SITE.url}${toolHref(tool)}`;

  /*
   * Vad verktyget kan, härlett ur agentverktygen i stället för handskrivet.
   *
   * Bara första meningen ur varje beskrivning. Resten är resonemang om varför,
   * och ett resonemang är ingen funktion. Härledningen gör dessutom att schemat
   * och det agenten faktiskt kan anropa inte kan glida isär.
   */
  const tools = agentToolsFor(tool.slug);
  const features = tools
    .map((t) => t.description.split(". ")[0])
    .filter(Boolean);
  const featureList = features.length ? { featureList: features } : {};

  /*
   * `potentialAction` bara för de verktyg som mappar rent.
   *
   * Schema.org:s Action har ett fast egenskapsvokabulär, `object`, `instrument`
   * och `result`. Ett verktyg som tar två värden har ingen ärlig plats för det
   * andra, och ett som tar antingen eller kan konventionen inte uttrycka alls.
   * Kartan över dem som går står i `ACTION_INPUTS`.
   */
  const actions = tools
    .map((t) => {
      const spec = ACTION_INPUTS[t.name];
      if (!spec) return null;
      return {
        "@type": spec.actionType,
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${url}?${spec.param}={${spec.param}}`,
        },
        [`${spec.property}-input`]: `required name=${spec.param}`,
      };
    })
    .filter(Boolean);
  const potentialAction = actions.length ? { potentialAction: actions } : {};

  const jsonLd = graph([
    pageEntity({
      type: "ItemPage",
      pageUrl: toolHref(tool),
      name: tool.name,
      description: tool.description,
      reviewer: DEFAULT_REVIEWER,
      mainEntity: { "@id": `${url}#app` },
    }),
    {
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: tool.name,
      url,
      description: tool.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Kräver JavaScript",
      inLanguage: "sv-SE",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: 0,
        priceCurrency: "SEK",
      },
      publisher: orgRef(),
      isPartOf: { "@id": `${SITE.url}/guider#samling` },
      ...featureList,
      ...potentialAction,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <Container size="default" className="pt-6">
        <Breadcrumbs
          items={[{ label: "Guider", href: "/guider" }, { label: tool.name }]}
          schema
        />
      </Container>

      <Container
        size="default"
        className="pt-3 pb-[var(--space-block)] lg:pt-[var(--space-section)]"
      >
        <p className="eyebrow text-brand">Guider</p>
        <h1 className="text-h1 mt-2">{tool.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {tool.intro}
        </p>
      </Container>

      <Container size="default" className="pb-[var(--space-section)]">
        {/* standalone: the permalink would point at this page. */}
        <ToolFrame tool={tool.slug} variant="standalone">
          <ToolWidget slug={tool.slug} />
        </ToolFrame>
      </Container>

      {tool.sections?.length ? (
        <Container size="default" className="pb-[var(--space-section)]">
          <Prose>
            {tool.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </section>
            ))}
          </Prose>
        </Container>
      ) : null}

      {tool.faq?.length ? (
        <Section
          id="vanliga-fragor"
          tone="muted"
          width="default"
          title="Vanliga frågor"
        >
          <FaqAccordion items={tool.faq} schema />
        </Section>
      ) : null}

      {related.length ? (
        <Section
          width="default"
          title="Testerna som använder verktyget"
          description="Samma verktyg finns inbyggt i köpguiden på de här sidorna, tillsammans med produkterna det gäller."
        >
          <ul className="flex flex-col gap-stack">
            {related.map((cat) => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  className="themed-border group flex items-center justify-between gap-3 rounded-lg bg-card pad-card transition-shadow hover:shadow-card"
                >
                  <span>
                    <span className="font-heading text-lg">{cat.label}</span>
                    <span className="block text-sm text-muted-foreground">
                      {cat.blurb}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section tone="muted" width="default" title="Fler verktyg">
        <ul className="grid gap-3 sm:grid-cols-2">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={toolHref(other)}
                className="themed-border block rounded-lg bg-card pad-card transition-shadow hover:shadow-card"
              >
                <span className="font-heading">{other.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {other.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Container size="default" className="pad-section">
        <AffiliateDisclosure />
      </Container>
    </>
  );
}
