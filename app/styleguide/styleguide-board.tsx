"use client";

import { DEMO_CATEGORY, DEMO_FAQ, DEMO_PRODUCTS } from "@/lib/demo-products";
import { CriteriaScores } from "@/components/product/criteria-scores";
import { MethodologyBlock } from "@/components/product/methodology-block";
import { QuickPickPanel } from "@/components/product/quick-pick-panel";
import { WinnerGrid } from "@/components/product/winner-grid";
import { AWARD_LABELS, type AwardKind } from "@/lib/products";
import { AWARD_OPTIONS } from "@/lib/theme";
import { PEOPLE } from "@/lib/people";
import { NAV } from "@/lib/site";
import { ArticleList } from "@/components/site/article-list";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { LegalDisclaimer } from "@/components/site/legal-disclaimer";
import { CookieConsent } from "@/components/site/cookie-consent";
import { SiteSearch } from "@/components/site/site-search";
import { PersonAvatar } from "@/components/site/person-avatar";
import { PersonCard } from "@/components/site/person-card";
import { PersonCredentials } from "@/components/site/person-credentials";
import { PullQuote } from "@/components/site/pull-quote";
import { SourceList } from "@/components/site/source-list";
import { SMART_HEM_SOURCES } from "@/lib/sources";
import { testPageTrail } from "@/lib/test-pages";
import { TEST_PAGE_INDEX } from "@/lib/catalog";
import { TestPageGrid } from "@/components/site/test-page-grid";
import { TrustBlock } from "@/components/site/trust-block";
import { ConsideredList } from "@/components/product/considered-list";
import { SMART_BELYSNING_CONSIDERED } from "@/lib/data/smart-belysning";
import { ProductRef } from "@/components/product/product-ref";
import { ToolFrame } from "@/components/tools/tool-frame";
import { ToolWidget } from "@/components/tools/registry";
import { WattLumenTable } from "@/components/tools/watt-lumen-table";
import { UserRating } from "@/components/product/user-rating";
import { SMART_BELYSNING_PRODUCTS } from "@/lib/data/smart-belysning";
import { HEMLARM_SERVICES } from "@/lib/data/hemlarm";
import {
  DisclosureBadge,
  ServicePrice,
  ServiceTotalCost,
} from "@/components/service/service-price";
import { ServiceCard, ServiceReview } from "@/components/service/service-card";
import { ServiceRef } from "@/components/service/service-ref";
import { ServiceTable } from "@/components/service/service-table";
import { Bench } from "@/app/styleguide/bench";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { Prose } from "@/components/site/prose";
import { TocNav } from "@/components/site/toc-nav";
import { UpdatedStamp } from "@/components/site/updated-stamp";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";
import { ContactForm } from "@/components/site/contact-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AffiliateCta } from "@/components/product/affiliate-cta";
import { AwardBadge } from "@/components/product/award-badge";
import { ComparisonTable } from "@/components/product/comparison-table";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { FilterableComparison } from "@/components/product/filterable-comparison";
import { PriceTag } from "@/components/product/price-tag";
import { ProductCard } from "@/components/product/product-card";
import { ProductReview } from "@/components/product/product-review";
import { ProsCons } from "@/components/product/pros-cons";
import { RatingStars } from "@/components/product/rating-stars";
import { ScoreBadge } from "@/components/product/score-badge";
import { SpecList } from "@/components/product/spec-list";
import { WinnerCard } from "@/components/product/winner-card";
import { Button } from "@/components/ui/button";

const COLOR_TOKENS = [
  ["background", "bg-background"],
  ["foreground", "bg-foreground"],
  ["card", "bg-card"],
  ["primary", "bg-primary"],
  ["secondary", "bg-secondary"],
  ["muted", "bg-muted"],
  ["accent", "bg-accent"],
  ["brand", "bg-brand"],
  ["award", "bg-award"],
  ["award-accent", "bg-award-accent"],
  ["success", "bg-success"],
  ["warning", "bg-warning"],
  ["destructive", "bg-destructive"],
  ["border", "bg-border"],
] as const;

const AWARD_KINDS = Object.keys(AWARD_LABELS) as AwardKind[];

const DEMO_RATED = SMART_BELYSNING_PRODUCTS.filter((p) => p.userRating);

export function StyleguideBoard() {
  const [winner, second, third, fourth] = DEMO_PRODUCTS;
  const [person] = PEOPLE;

  return (
    <Container size="wide" className="py-10">
      <header className="mb-8 max-w-2xl">
        <p className="eyebrow text-brand">Internt</p>
        <h1 className="text-h1 mt-1">Stilguide</h1>
        <p className="mt-3 text-muted-foreground">
          Varje byggsten på sajten, renderad mot de aktuella tokens. Byt tema,
          täthet och hörnradie i panelen uppe till höger. Växlarna bredvid varje
          komponent byter bara den komponentens variant.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Produktdata är påhittad testdata från{" "}
          <code className="font-mono text-xs">lib/demo-products.ts</code> och får
          inte publiceras.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {/* ------------------------------------------------------ tokens -- */}
        <Bench title="Färger" file="app/globals.css" options={["tokens"]}>
          {() => (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {COLOR_TOKENS.map(([name, cls]) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <div
                    className={`h-14 rounded-md border border-border ${cls}`}
                  />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Bench>

        <Bench
          title="Typografi"
          file="app/globals.css"
          description="Rubrikfamilj, vikt och teckenavstånd byts av temat. Brödtextens storlek byts av tätheten."
          options={["skala"]}
        >
          {() => (
            <div className="flex flex-col gap-4">
              <div>
                <span className="eyebrow text-brand">Eyebrow</span>
                <h1 className="text-h1">Bäst i test smart belysning 2026</h1>
              </div>
              <h2 className="text-h2">Så här testade vi lamporna</h2>
              <h3 className="text-h3">Färgåtergivning och dimring</h3>
              <p className="max-w-prose">
                Brödtext i löpande stycke. Vi mätte ljusflöde och färgtemperatur
                på samtliga lampor i samma rigg, och lät dem sedan sitta tända i
                fyra veckor för att se om något började flimra.
              </p>
              <p className="max-w-prose text-sm text-muted-foreground">
                Mindre, dämpad text för bildtexter och metadata.
              </p>
            </div>
          )}
        </Bench>

        <Bench
          title="Ytor och djup"
          file="app/globals.css"
          description="Skuggor och kantstyrka är temaberoende: kvällspress har hårda kanter, nordisk nästan inga."
          options={["ytor"]}
        >
          {() => (
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="themed-border rounded-lg bg-card pad-card">
                <p className="font-medium">themed-border</p>
                <p className="text-sm text-muted-foreground">Ingen skugga</p>
              </div>
              <div className="themed-border rounded-lg bg-card pad-card shadow-card">
                <p className="font-medium">shadow-card</p>
                <p className="text-sm text-muted-foreground">Standardkort</p>
              </div>
              <div className="themed-border rounded-lg bg-card pad-card shadow-raised">
                <p className="font-medium">shadow-raised</p>
                <p className="text-sm text-muted-foreground">Vinnarkort</p>
              </div>
            </div>
          )}
        </Bench>

        {/* -------------------------------------------------- primitives -- */}
        <Bench
          title="Knappar"
          file="components/ui/button.tsx"
          description="shadcn-basen plus våra tillägg: variant brand/award och storlek xl/2xl för affiliateknappar."
          options={["varianter", "storlekar"] as const}
        >
          {(v) =>
            v === "varianter" ? (
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    "brand",
                    "default",
                    "secondary",
                    "outline",
                    "ghost",
                    "award",
                    "destructive",
                    "link",
                  ] as const
                ).map((variant) => (
                  <Button key={variant} variant={variant} size="lg">
                    {variant}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                {(["sm", "default", "lg", "xl", "2xl"] as const).map((size) => (
                  <Button key={size} variant="brand" size={size}>
                    {size}
                  </Button>
                ))}
              </div>
            )
          }
        </Bench>

        <Bench
          title="Utmärkelsefärg"
          file="app/globals.css · [data-award]"
          description="Egen axel i adminpanelen. Alla fem renderade samtidigt så kombinationerna kan jämföras utan att växla. Stjärnorna använder --award-accent, inte bakgrundsfärgen."
          options={["jämförelse"]}
        >
          {() => (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AWARD_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  data-award={opt.id}
                  className="themed-border flex flex-col gap-3 rounded-lg bg-card pad-card"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{opt.label}</span>
                    <code className="font-mono text-[11px] text-muted-foreground">
                      {opt.id}
                    </code>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <AwardBadge kind="winner" label="Bäst i test 2026" />
                    <AwardBadge kind="budget" />
                  </div>
                  <AwardBadge kind="editor" variant="strip" />
                  <div className="flex items-center gap-3">
                    <RatingStars value={4.5} showValue />
                    <AwardBadge kind="premium" tone="outline" />
                  </div>
                  <p className="text-xs text-muted-foreground">{opt.hint}</p>
                </div>
              ))}
            </div>
          )}
        </Bench>

        <Bench
          title="Utmärkelse"
          file="components/product/award-badge.tsx"
          options={["pill", "ribbon", "strip", "bare"] as const}
        >
          {(v) => (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {AWARD_KINDS.map((kind) => (
                  <AwardBadge
                    key={kind}
                    kind={kind}
                    variant={v}
                    className={v === "strip" ? "max-w-xs" : undefined}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {(["award", "brand", "primary", "outline"] as const).map(
                  (tone) => (
                    <AwardBadge
                      key={tone}
                      kind="winner"
                      variant={v}
                      tone={tone}
                      label={`tone: ${tone}`}
                      className={v === "strip" ? "max-w-xs" : undefined}
                    />
                  ),
                )}
              </div>
              {/* Free-form labels with no preset kind: what a real category
                  needs beyond the five built-in awards. */}
              <div className="flex flex-wrap items-center gap-3">
                {[
                  "Bäst utan abonnemang",
                  "Bäst för lägenhet",
                  "Tystast i test",
                ].map((label) => (
                  <AwardBadge
                    key={label}
                    label={label}
                    variant={v}
                    tone="outline"
                    className={v === "strip" ? "max-w-xs" : undefined}
                  />
                ))}
              </div>
            </div>
          )}
        </Bench>

        <Bench
          title="Betyg"
          file="components/product/score-badge.tsx · rating-stars.tsx"
          options={["dial", "solid", "circle", "outline", "bare"] as const}
        >
          {(v) => (
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-end gap-5">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <ScoreBadge
                    key={size}
                    score={9.2}
                    variant={v}
                    size={size}
                    showMax
                    label={`size ${size}`}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <RatingStars
                    key={size}
                    value={4.5}
                    size={size}
                    showValue
                    reviewCount={1284}
                  />
                ))}
                <RatingStars value={2.5} size="md" showValue />
              </div>
            </div>
          )}
        </Bench>

        <Bench
          title="Pris"
          file="components/product/price-tag.tsx"
          description="Svensk formatering via Intl: 549 kr, inte 549 SEK."
          options={["sm", "md", "lg"] as const}
          initial="md"
        >
          {(v) => (
            <div className="flex flex-wrap items-start gap-8">
              <PriceTag price={549} size={v} />
              <PriceTag price={549} oldPrice={649} size={v} tone="brand" />
              <PriceTag
                price={549}
                oldPrice={649}
                merchant="Lampan.se"
                prefix="från"
                size={v}
                tone="brand"
              />
              <PriceTag price={129} size={v} tone="muted" />
            </div>
          )}
        </Bench>

        <Bench
          title="Affiliate-CTA"
          file="components/product/affiliate-cta.tsx"
          description="Enda komponenten som får länka ut. Sätter rel=&quot;sponsored nofollow noopener&quot; och data-attribut för klickspårning."
          options={["brand", "default", "outline", "secondary", "award"] as const}
        >
          {(v) => (
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-start gap-4">
                {(["default", "lg", "xl", "2xl"] as const).map((size) => (
                  <AffiliateCta
                    key={size}
                    href="#demo"
                    merchant="Lampan.se"
                    variant={v}
                    size={size}
                  />
                ))}
              </div>
              <div className="max-w-sm">
                <AffiliateCta
                  href="#demo"
                  merchant="Lampan.se"
                  variant={v}
                  size="2xl"
                  block
                  note="Fri frakt över 500 kr · 30 dagars öppet köp"
                />
              </div>
            </div>
          )}
        </Bench>

        {/* ------------------------------------------------- composites -- */}
        <Bench
          title="Snabbval"
          file="components/product/quick-pick-panel.tsx"
          description="Sidans dyraste yta. En läsare som redan bestämt sig konverterar härifrån utan att scrolla."
          options={["panel", "sticky", "bare"] as const}
          surface="muted"
        >
          {(v) => (
            <div className="max-w-lg">
              <QuickPickPanel
                products={DEMO_PRODUCTS}
                variant={v}
                title="Smart belysning · Bäst i test"
                footerHref="#jamforelse"
              />
            </div>
          )}
        </Bench>

        <Bench
          title="Vinnarrutnät"
          file="components/product/winner-grid.tsx"
          description="Alla testvinnare som numrerade kort, var och en länkad till sin djupare recension. Fungerar som visuell innehållsförteckning."
          options={["grid", "list"] as const}
          surface="muted"
        >
          {(v) => (
            <WinnerGrid
              products={DEMO_PRODUCTS}
              variant={v}
              columns={3}
              className={v === "list" ? "max-w-2xl" : undefined}
            />
          )}
        </Bench>

        <Bench
          title="Kriteriebetyg"
          file="components/product/criteria-scores.tsx"
          description="Delbetygen bakom totalen. Totalraden räknas fram ur kriterievikterna, den skrivs inte in för hand."
          options={["rows", "compact", "bars"] as const}
        >
          {(v) => (
            <div className="grid gap-block sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-2 text-muted-foreground">
                  {winner.brand} {winner.name}
                </p>
                <CriteriaScores
                  criteria={DEMO_CATEGORY.criteria}
                  scores={winner.scores}
                  variant={v}
                />
              </div>
              <div>
                <p className="eyebrow mb-2 text-muted-foreground">
                  Med vikter · {fourth.brand} {fourth.name}
                </p>
                <CriteriaScores
                  criteria={DEMO_CATEGORY.criteria}
                  scores={fourth.scores}
                  variant={v}
                  showWeights
                  size="sm"
                />
              </div>
            </div>
          )}
        </Bench>

        <Bench
          title="Testmetod"
          file="components/product/methodology-block.tsx"
          description="Läser samma kriterier som betygen räknas ur, så publicerad vikt aldrig kan glida från använd vikt."
          options={["list", "cards"] as const}
        >
          {(v) => (
            <MethodologyBlock
              criteria={DEMO_CATEGORY.criteria}
              variant={v}
              intro={DEMO_CATEGORY.methodology}
              footnote="Vi tar inte betalt för placeringar. Affiliatelänkar påverkar varken betyg eller ordning."
            />
          )}
        </Bench>

        <Bench
          title="Vinnarkort"
          file="components/product/winner-card.tsx"
          description="Sidans dyraste klick. Exakt ett per kategorisida, ovanför viklinjen."
          options={["split", "banner", "stacked"] as const}
          surface="muted"
        >
          {(v) => (
            <div className={v === "stacked" ? "max-w-md" : undefined}>
              <WinnerCard
                product={winner}
                variant={v}
                awardLabel="Bäst i test 2026"
                ctaNote="Priset uppdaterades i dag"
                showSpecs={v !== "stacked"}
              />
            </div>
          )}
        </Bench>

        <Bench
          title="Produktkort"
          file="components/product/product-card.tsx"
          options={["grid", "row", "compact"] as const}
          surface="muted"
        >
          {(v) =>
            v === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[winner, second, third].map((p) => (
                  <ProductCard key={p.id} product={p} variant="grid" showPros />
                ))}
              </div>
            ) : v === "row" ? (
              <div className="flex flex-col gap-4">
                {[winner, second, third].map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    variant="row"
                    rank={i + 1}
                    showSpecs
                  />
                ))}
              </div>
            ) : (
              <div className="grid max-w-lg gap-3">
                {[winner, second, third, fourth].map((p) => (
                  <ProductCard key={p.id} product={p} variant="compact" />
                ))}
              </div>
            )
          }
        </Bench>

        <Bench
          title="Jämförelsetabell"
          file="components/product/comparison-table.tsx"
          description="Fem layouter, alla riktiga tabeller i både desktop och mobil. Matris är standard: NN/g och Baymard rekommenderar produkter som kolumner och egenskaper som rader. Första kolumnen är fryst och skuggan i kanten är rullningssignalen."
          options={["matrix", "grouped", "checklist", "rows", "compact"] as const}
        >
          {(v) => (
            <ComparisonTable
              products={DEMO_PRODUCTS}
              layout={v}
              caption="Priser kontrollerade hos respektive butik och kan ha ändrats."
            />
          )}
        </Bench>

        <Bench
          title="Filtrerad jämförelse"
          file="components/product/filterable-comparison.tsx"
          description="Jämförelsetabellen med ett filter ovanför. Kategorioberoende: den tar namngivna grupper med produkt-id och vet ingenting om vad grupperna betyder. Antalet står på varje knapp, så att en grupp med en enda träff syns innan man klickar. Bänken filtrerar demoprodukterna på prisläge."
          options={["matrix", "rows", "compact"] as const}
        >
          {(v) => (
            <FilterableComparison
              products={DEMO_PRODUCTS}
              layout={v}
              legend="Filtrera på prisläge"
              filters={[
                {
                  key: "billig",
                  label: "Under 300 kr",
                  ids: DEMO_PRODUCTS.filter((p) => p.price < 300).map(
                    (p) => p.id,
                  ),
                },
                {
                  key: "dyr",
                  label: "300 kr och uppåt",
                  ids: DEMO_PRODUCTS.filter((p) => p.price >= 300).map(
                    (p) => p.id,
                  ),
                },
                /* Avsiktligt tom grupp, så att bänken visar hur filtret beter
                   sig när ingen produkt matchar. Det inträffar på riktigt:
                   I-skena har noll träffar på /elektrisk-rullgardin. */
                { key: "tom", label: "Tom grupp", ids: [] },
              ]}
              caption="Priser kontrollerade hos respektive butik och kan ha ändrats."
            />
          )}
        </Bench>

        <Bench
          title="Användaromdöme"
          file="components/product/user-rating.tsx"
          description="Butikens egen AggregateRating, hämtad från samma sida vi länkar till. Aldrig invägd i betyget och aldrig i ProductSchema. Google förbjuder att märka upp andras omdömen som våra. Källänken är tyst: streckad understrykning först vid hover."
          options={["inline", "compact", "block"] as const}
          surface="muted"
        >
          {(v) => (
            <div className="flex flex-col gap-3">
              {DEMO_RATED.map((p) => (
                <UserRating key={p.id} product={p} variant={v} />
              ))}
            </div>
          )}
        </Bench>

        <Bench
          title="Jämförelsetabell · betygskolumn"
          file="components/product/comparison-table.tsx"
          description="Betyg utan stjärnor. circle är chippet, dial är ringen. Stjärnorna är borta helt: de rundar till halvor och tappar decimalen som hela betygsmodellen finns för."
          options={["circle", "dial"] as const}
        >
          {(v) => (
            <ComparisonTable
              products={DEMO_PRODUCTS}
              scoreVariant={v}
              specColumns={["Ljusflöde"]}
              showImage={false}
            />
          )}
        </Bench>

        <Bench
          title="För- och nackdelar"
          file="components/product/pros-cons.tsx"
          options={["side", "stacked", "cards"] as const}
        >
          {(v) => (
            <ProsCons pros={winner.pros} cons={winner.cons} variant={v} />
          )}
        </Bench>

        <Bench
          title="Specifikationer"
          file="components/product/spec-list.tsx"
          options={["rows", "grid", "inline"] as const}
        >
          {(v) => <SpecList specs={winner.specs} variant={v} />}
        </Bench>

        <Bench
          title="Produktrecension"
          file="components/product/product-review.tsx"
          description="De 200–400 ord långa recensionerna under jämförelsetabellen."
          options={["full", "compact"] as const}
          surface="muted"
        >
          {(v) => (
            <div className="flex flex-col gap-4">
              <ProductReview product={winner} rank={1} variant={v} />
              <ProductReview product={second} rank={2} variant={v} />
            </div>
          )}
        </Bench>

        <Bench
          title="Vanliga frågor"
          file="components/product/faq-accordion.tsx"
          description="Med schema=true genereras FAQPage-JSON-LD, men bara när alla svar är rena strängar."
          options={["bordered", "plain"] as const}
        >
          {(v) => <FaqAccordion items={DEMO_FAQ} variant={v} />}
        </Bench>

        <Bench
          title="Källor"
          file="components/site/source-list.tsx"
          description="Citat till oberoende tester. Vanliga följlänkar, varken nofollow eller sponsored. En äkta källa ska räknas som en."
          options={["list", "compact", "inline", "summary"] as const}
          surface="muted"
        >
          {(v) => (
            <SourceList
              sources={SMART_HEM_SOURCES}
              variant={v}
              title={v === "summary" ? "Det här har vi gått igenom" : undefined}
              className={v === "inline" ? undefined : "max-w-xl"}
            />
          )}
        </Bench>

        <Bench
          title="Kategorirutnät"
          file="components/site/test-page-grid.tsx"
          description="Läser lib/catalog.ts. Planerade kategorier renderas som kort utan länk, så en död nav-post aldrig kan skeppas av misstag."
          options={["cards", "compact"] as const}
          surface="muted"
        >
          {(v) => (
            <TestPageGrid entries={TEST_PAGE_INDEX} variant={v} columns={2} />
          )}
        </Bench>

        <Bench
          title="Därför kan du lita på oss"
          file="components/site/trust-block.tsx"
          description="Svaret på varför en främling ska tro på betyget. Metoden svarar på hur, det här svarar på varför just vi. Punkterna är en exporterad standard, så varje kategorisida lovar samma sak med samma ord."
          options={["cards", "bar"] as const}
          surface="muted"
        >
          {(v) => <TrustBlock variant={v} />}
        </Bench>

        <Bench
          title="Andra vi övervägde"
          file="components/product/considered-list.tsx"
          description="Produkter som föll bort, med skälet. Medvetet utan pris som vi står för och utan köpknapp: en CTA på något vi valt bort hade sagt tvärtemot vad avsnittet säger."
          options={["list", "table"] as const}
          surface="muted"
        >
          {(v) => (
            <ConsideredList items={SMART_BELYSNING_CONSIDERED} variant={v} />
          )}
        </Bench>

        <Bench
          title="Byline"
          file="components/site/person-card.tsx"
          description="Märkt byline med faktagranskare. Varje konkurrent i tre marknader märker sin byline; ett omärkt namn läses som dekoration i stället för attribution."
          options={["med granskare", "bara skribent"] as const}
          surface="muted"
        >
          {(v) => (
            <PersonCard
              person={person}
              variant="byline"
              label="Av"
              reviewer={v === "med granskare" ? PEOPLE[1] : undefined}
            />
          )}
        </Bench>

        {/* ------------------------------------------------------ tools -- */}
        <Bench
          title="Produktomnämnande"
          file="components/product/product-ref.tsx"
          description="Så namnger redaktionell text en produkt. MDX skickar bara ett id. Namn, pris och butik läses ur produktdatan, och köplänken går genom AffiliateCta. Prosa får aldrig innehålla ett pris."
          options={["inline", "card"] as const}
          surface="muted"
        >
          {(v) =>
            v === "inline" ? (
              <p className="max-w-prose">
                Ligger överst av lamporna vi jämfört gör{" "}
                <ProductRef product={winner} variant="inline" />, som är dyrast
                men har renast färgåtergivning.
              </p>
            ) : (
              <ProductRef product={winner} variant="card" />
            )
          }
        </Bench>

        <Bench
          title="Verktygsram"
          file="components/tools/tool-frame.tsx"
          description="Ramen runt en räknare. Inbäddad i en köpguide får den en diskret permalänk till verktygets egen sida under /guider; på den sidan skulle länken peka på sig själv och utelämnas."
          options={["embedded", "standalone"] as const}
          surface="muted"
        >
          {(v) => (
            <ToolFrame tool="watt-till-lumen" variant={v}>
              <WattLumenTable />
            </ToolFrame>
          )}
        </Bench>

        <Bench
          title="Räknare"
          file="components/tools/"
          description="Varje räknare svarar på en fråga och finns både inbäddad i köpguiden och på egen URL. Registret ligger i lib/tools.ts, widgetarna i components/tools/registry.tsx."
          options={
            [
              "lumenraknare",
              "elkostnad-lampor",
              "protokollvaljare-smart-hem",
              "fargtemperatur",
              /* De fem väljarna nedan pekar vidare på faktiska produkter, så
                 de är också de enda vars utseende beror på kategorins data.
                 Bänkarna visar smart plug-, strömbrytar-, gardin-,
                 utomhustimer- respektive vattenlarmsurvalet. */
              "effektkoll-smart-plug",
              "elkostnad-uttag",
              "installationsguide-strombrytare",
              "monteringsvaljare-gardin",
              "timervaljare-utomhus",
              "elkostnad-julbelysning",
              "vattenlarmsvaljare",
              /* Enda räknaren utan produktdata som ändå ger olika svar:
                 återbetalningstiden hänger helt på vad läsaren skriver in, och
                 bänken är därför bra för att se hur resultatrutan beter sig när
                 talet blir "Över 100 år". */
              "aterbetalning-vattenfelsbrytare",
              /* Femårskostnaden är den enda räknaren som läser data från två
                 kategorier samtidigt, larmpaketen från /larm-utan-abonnemang
                 och abonnemangen från /hemlarm. Bänken är därför den bästa
                 platsen att se vad som händer när ett larmbolag saknar
                 publicerat pris: resultatrutan ska säga att den inte kan
                 räkna, inte visa en nolla. Välj Sector Alarm i väljaren. */
              "femarskostnad-larm",
              /* Enda väljaren som ofta svarar att läsaren inte ska köpa något,
                 och den enda som byter både rubrik och knapptext beroende på
                 svaret: resultatrutan skriver "Vårt svar" i stället för "Vi
                 rekommenderar" och utelämnar länken när svaret är att avstå.
                 Bänken är därför rätt plats att kontrollera båda lägena. Välj
                 torr luft plus 30 till 45 procent för det produktfria svaret,
                 och tvätt som inte torkar för det med länk. */
              "vilken-luftapparat",
              /* Väljaren som visar två högar där den andra är hela poängen:
                 robotar vars tillverkare inte publicerar någon passerhöjd
                 hamnar för sig, med skälet utskrivet, i stället för att
                 sorteras som ett ja. Bänken finns för att kontrollera att
                 tystnadshögen faktiskt renderas när bara en av sju robotar
                 anger ett tal. Välj "2 till 4 cm" för båda högarna, och
                 "Inga trösklar alls" för svaret utan högar alls. */
              "klarar-roboten-troskeln",
              /* Det enda verktyget som kan vägra svara. Räknar avläsningen
                 plus toleransen till ett spann och säger rakt ut när spannet
                 ligger över en gräns i ena änden och under i den andra.
                 Bänken finns för att kontrollera alla fyra utfallen: skriv 58
                 och välj "± 5 procentenheter" för det oavgjorda svaret, 58 och
                 "± 3" för ett avgjort, 30 och "± 3" för svaret under samtliga
                 gränser, och 70 och "± 3" för det över mögelrisken. Välj
                 "Står inte någonstans" för att se att antagandet skrivs ut. */
              "vad-betyder-talet-pa-hygrometern",
              /* Det andra verktyget som kan vägra svara, och det enda som
                 sorterar tystnad i en egen lista i stället för att skriva om
                 den till ett ja eller ett nej. Bänken finns för att
                 kontrollera alla fem utfallen: välj "Manuell kran" respektive
                 "Enrörssystem" för de två stoppen, "Vet inte" för nästa steg,
                 och "Termostatventil" plus "M30 × 1,5" för det breda svaret
                 där passformen inte behöver styra valet. Välj
                 "Termostatventil" plus "Vaillant 30,5 mm" för utfallet där
                 ingen tillverkare anger att de passar och en anger att
                 adaptern inte levereras. */
              "vilken-termostat-passar-min-ventil",
            ] as const
          }
          surface="muted"
        >
          {(v) => (
            <div className="max-w-xl">
              <ToolFrame tool={v}>
                <ToolWidget slug={v} />
              </ToolFrame>
            </div>
          )}
        </Bench>

        {/* ----------------------------------------------------- people -- */}
        <Bench
          title="Person"
          file="components/site/person-card.tsx"
          description="byline i artikelhuvud, box i sidfot, hero på skribentsidan. Samma komponent, tre lägen."
          options={["byline", "box", "hero"] as const}
          initial="box"
          surface="muted"
        >
          {(v) => (
            <div className={v === "box" ? "max-w-xl" : undefined}>
              <PersonCard person={person} variant={v} />
            </div>
          )}
        </Bench>

        <Bench
          title="Porträtt"
          file="components/site/person-avatar.tsx"
          description="Initialer är ett designat läge, inte en trasig bild. Vi har inga porträtt ännu."
          options={["utan ring", "med ring"] as const}
        >
          {(v) => (
            <div className="flex flex-wrap items-end gap-4">
              {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-1.5">
                  <PersonAvatar
                    person={person}
                    size={size}
                    ring={v === "med ring"}
                  />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {size}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Bench>

        <Bench
          title="Meriter"
          file="components/site/person-credentials.tsx"
          description="E-E-A-T-blocket. Statistiken kan brytas ut ensam till en artikelsidfot."
          options={["sidebar", "inline", "stats"] as const}
        >
          {(v) => (
            <div className={v === "sidebar" ? "max-w-xs" : undefined}>
              <PersonCredentials person={person} variant={v} headingLevel={3} />
            </div>
          )}
        </Bench>

        <Bench
          title="Citat"
          file="components/site/pull-quote.tsx"
          description="Förstahandsintryck lyft ur brödtexten. Signalerar att produkten faktiskt hanterats."
          options={["panel", "rule", "plain"] as const}
        >
          {(v) => (
            <div className="max-w-2xl">
              <PullQuote
                variant={v}
                label={v === "panel" ? person.quoteLabel : undefined}
                attribution={`${person.name}, ${person.role}`}
              >
                {person.quote}
              </PullQuote>
            </div>
          )}
        </Bench>

        <Bench
          title="Artikellista"
          file="components/site/article-list.tsx"
          options={["rows", "cards"] as const}
        >
          {(v) => (
            <div className="max-w-2xl">
              <ArticleList
                variant={v}
                items={NAV.slice(0, 4).map((n) => ({
                  href: n.href,
                  title: `Bäst i test ${n.label.toLowerCase()} 2026`,
                  kicker: n.label,
                  status: "Under arbete",
                  author: person.name,
                }))}
              />
            </div>
          )}
        </Bench>

        {/* ------------------------------------------------ page pieces -- */}
        <Bench
          title="Uppdateringsstämpel"
          file="components/site/updated-stamp.tsx"
          description="Färskhetssignal ovanför viklinjen. Båda referenssajterna har en."
          options={["inline", "bar"] as const}
        >
          {(v) => (
            <UpdatedStamp
              date="2026-07-28"
              author="Peter Valenta"
              testedCount={14}
              variant={v}
            />
          )}
        </Bench>

        <Bench
          title="Brödsmulor"
          file="components/site/breadcrumbs.tsx"
          description="URL:en är platt, taxonomin är det inte: gruppen Smart hem syns i spåret men aldrig i sökvägen. Bygg spåret med testPageTrail(), inte för hand. BreadcrumbList-schema är avstängt som standard."
          options={["plain", "bar"] as const}
        >
          {(v) => (
            <div className="flex flex-col gap-4">
              <Breadcrumbs variant={v} items={testPageTrail(DEMO_CATEGORY)} />
              <Breadcrumbs
                variant={v}
                items={[{ label: "Robotdammsugare" }]}
              />
              <Breadcrumbs
                variant={v}
                items={[
                  { label: "Om oss", href: "/om-oss" },
                  { label: person.name },
                ]}
              />
            </div>
          )}
        </Bench>

        <Bench
          title="Friskrivning"
          file="components/site/legal-disclaimer.tsx"
          description="El- och brandsäkerhet, inte den medicinska text referenssajten använder. Texterna bor i en fil så en juridisk genomgång ändrar ett ställe."
          options={["block", "footer", "inline"] as const}
        >
          {(v) => (
            <div className="max-w-2xl">
              <LegalDisclaimer
                variant={v}
                items={["general", "electrical", "fireSafety", "pricing"]}
              />
            </div>
          )}
        </Bench>

        <Bench
          title="Annonsmärkning"
          file="components/site/affiliate-disclosure.tsx"
          description="Krävs av Google Ads-policyn och av flera Adtraction-program. Balken följer branschrekommendationen från TU, Sveriges Tidskrifter och IAB Sverige: den ska ligga högst upp i artikeln och länka vidare till /annonsmarkning. Den visas bara när LINK_MODE monetiserar, så den tvingas fram här med force."
          options={["balk", "box", "inline", "footer"] as const}
        >
          {(v) => <AffiliateDisclosure variant={v} force />}
        </Bench>

        <Bench
          title="Formulärfält"
          file="components/ui/input.tsx · components/ui/textarea.tsx"
          description="Samma utseende som sökrutan redan hade. Räknarna i components/tools/ har fortfarande egna råa input-element och bör flyttas hit vid tillfälle."
          options={["input", "textarea"] as const}
        >
          {(v) => (
            <div className="flex max-w-md flex-col gap-1.5">
              <Label htmlFor={`sg-field-${v}`}>
                {v === "input" ? "Rubrik" : "Meddelande"}
              </Label>
              {v === "input" ? (
                <Input id="sg-field-input" placeholder="Skriv något…" />
              ) : (
                <Textarea
                  id="sg-field-textarea"
                  rows={4}
                  placeholder="Skriv något längre…"
                />
              )}
            </div>
          )}
        </Bench>

        <Bench
          title="Kontaktformulär"
          file="components/site/contact-form.tsx"
          description="Postar till /api/kontakt, som skickar vidare server till server till RedPoint9 där meddelandena lagras och mejlas ut. Rättelser ligger först i listan med flit."
          options={["standard"] as const}
        >
          {() => (
            <div className="max-w-xl">
              <ContactForm />
            </div>
          )}
        </Bench>

        <Bench
          title="Innehållsnavigering"
          file="components/site/toc-nav.tsx"
          options={["box", "sticky", "inline"] as const}
        >
          {(v) => (
            <div className={v === "inline" ? undefined : "max-w-xs"}>
              <TocNav
                variant={v}
                entries={[
                  { id: "toc-demo-1", label: "Snabbt svar: vilken ska du köpa?" },
                  { id: "toc-demo-2", label: "Jämförelse av alla fem" },
                  { id: "toc-demo-3", label: "Så testade vi" },
                  { id: "toc-demo-4", label: "Vanliga frågor" },
                ]}
              />
            </div>
          )}
        </Bench>

        <Bench
          title="Sök"
          file="components/site/site-search.tsx · lib/search-index.ts"
          description="Indexet byggs ur NAV och PEOPLE, så en ny kategori blir sökbar utan extra registrering. Sökningen viker å/ä/ö, så 'overvakning' hittar Övervakningskamera."
          options={["inline", "trigger"] as const}
        >
          {(v) => (
            <div className="max-w-md">
              <SiteSearch variant={v} />
              {v === "inline" ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Prova <code className="font-mono text-xs">overvakning</code>{" "}
                  eller <code className="font-mono text-xs">test</code>.
                </p>
              ) : null}
            </div>
          )}
        </Bench>

        <Bench
          title="Cookie-samtycke"
          file="components/site/cookie-consent.tsx"
          description="Platshållare, inte en godkänd CMP. Saknar leverantörslista, ändamål och Consent Mode v2. Måste ersättas av certifierad CMP före annonsering."
          options={["bar", "box"] as const}
        >
          {(v) => (
            <div className={v === "box" ? "max-w-sm" : undefined}>
              <CookieConsent variant={v} forceOpen />
            </div>
          )}
        </Bench>

        <Bench
          title="Sektion"
          file="components/site/section.tsx"
          description="Sidans vertikala rytm. Tonen byter bakgrund, bredden byter innehållskolumn."
          options={["default", "muted", "accent"] as const}
        >
          {(v) => (
            <Section
              tone={v}
              eyebrow="Köpguide"
              title="Vad ska du titta efter?"
              description="Rubrikblocket är valfritt. Utan det blir Section bara vertikal rytm."
              actions={
                <Button variant="outline" size="lg">
                  Alla lampor
                </Button>
              }
            >
              <Prose>
                <p>
                  Tre saker avgör om en smart lampa blir bra att leva med:
                  protokollet den pratar, hur långt ner den går att dimra utan
                  att flimra, och om appen kommer ihåg dina scener efter ett
                  strömavbrott.
                </p>
                <ul>
                  <li>Zigbee och Thread belastar inte wifi-nätet.</li>
                  <li>Wi-Fi är enklast för de första fem lamporna.</li>
                  <li>Matter gör att lampan överlever ett byte av ekosystem.</li>
                </ul>
              </Prose>
            </Section>
          )}
        </Bench>

        {/* ------------------------------------------------------ tjänster -- */}
        {/* Sajtens andra domänmodell. Bänkarna nedan finns för att en tjänst
            ser ut som en produkt tills man tittar på priset, och då skiljer
            den sig på det enda sätt som betyder något: uppgiften kan saknas.
            Verisure har hela priset, Sector Alarm har ingen månadsavgift.
            Ställ dem bredvid varandra och regeln blir synlig. */}
        <Bench
          title="Tjänstepris"
          file="components/service/service-price.tsx"
          options={["publicerat", "dolt"] as const}
          initial="publicerat"
        >
          {(v) => {
            const service =
              v === "publicerat"
                ? HEMLARM_SERVICES.find((s) => s.terms.monthlyFee !== null)!
                : HEMLARM_SERVICES.find((s) => s.terms.monthlyFee === null)!;
            return (
              <div className="flex flex-col gap-row">
                <p className="text-sm text-muted-foreground">
                  {service.provider} {service.name}
                </p>
                <ServicePrice terms={service.terms} size="lg" />
                <ServiceTotalCost terms={service.terms} />
                <DisclosureBadge terms={service.terms} className="self-start" />
                <p className="text-xs text-muted-foreground">
                  Ett saknat pris renderas som &quot;Publiceras inte&quot; och
                  aldrig som 0 kr. Det är hela skälet till att tjänster har en
                  egen prisatom i stället för att låna PriceTag.
                </p>
              </div>
            );
          }}
        </Bench>

        <Bench
          title="Tjänstetabell"
          file="components/service/service-table.tsx"
          surface="muted"
        >
          {() => <ServiceTable services={HEMLARM_SERVICES.slice(0, 4)} />}
        </Bench>

        <Bench
          title="Tjänstekort"
          file="components/service/service-card.tsx"
          options={["kort", "recension"] as const}
          initial="kort"
          surface="muted"
        >
          {(v) =>
            v === "kort" ? (
              <ServiceCard
                service={HEMLARM_SERVICES[0]}
                awardLabel="Bäst i test"
              />
            ) : (
              <ServiceReview service={HEMLARM_SERVICES[0]} rank={1}>
                <p className="text-muted-foreground">
                  {HEMLARM_SERVICES[0].tagline}
                </p>
              </ServiceReview>
            )
          }
        </Bench>

        <Bench
          title="Tjänstereferens i prosa"
          file="components/service/service-ref.tsx"
        >
          {() => (
            <Prose>
              <p>
                Hos <ServiceRef id="verisure-smart-voice" /> står priset på
                sidan. Hos <ServiceRef id="sector-alarm" /> gör det inte det,
                och parentesen säger det i stället för att utelämnas.
              </p>
            </Prose>
          )}
        </Bench>

        <Bench
          title="Innehållsbredd"
          file="components/site/container.tsx"
          options={["narrow", "default", "wide"] as const}
          initial="default"
          surface="muted"
        >
          {(v) => (
            <Container size={v} className="bg-card px-0">
              <div className="themed-border rounded-lg pad-card">
                <p className="font-medium">size=&quot;{v}&quot;</p>
                <p className="text-sm text-muted-foreground">
                  narrow för löptext, default för jämförelseinnehåll, wide för
                  tabeller och kortrutnät.
                </p>
              </div>
            </Container>
          )}
        </Bench>
      </div>
    </Container>
  );
}
