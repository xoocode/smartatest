import * as React from "react";

import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "@/components/site/container";

/**
 * När `Section` ska användas, och när den inte ska det.
 *
 * Sektionen bär sajtens visuella rytm: växlande grå och vit bakgrund, rubrik
 * med ingress och ett ankare för innehållsförteckningen. Den hör hemma på
 * sidor som **skannas**: kategorisidor, gruppsidor och hubbar.
 *
 * ⚠️ Den hör inte hemma på varje sida, och frånvaron är inte automatiskt en
 * brist. En helhetsgranskning 2026-08-03 räknade sidor utan `Section` och
 * flaggade sex stycken. Vid närmare granskning var bara en av dem ett verkligt
 * problem, `/guider`, som hade 25 kort utan en enda rubrik och nu har en h2
 * per grupp och h3 per kort.
 *
 * De övriga fem är medvetna undantag och ska inte flaggas igen:
 *
 * - `/annonsmarkning` och `/integritetspolicy` är juridisk löptext som ska
 *   läsas uppifrån och ner. Växlande bakgrundsband gör en policy svårare att
 *   läsa, inte lättare, och en enda `Prose`-spalt är rätt form.
 * - `/rattelser` är en logg i kronologisk ordning av samma skäl.
 * - `/kontakt` har redan en genomtänkt tvåspaltslayout med formulär och en
 *   sticky rail med fyra `h2`. Strukturen finns, den råkar bara inte vara
 *   byggd av sektioner.
 * - `/sok` renderar träffar dynamiskt och har ingen fast avsnittsindelning att
 *   spegla.
 *
 * Kort sagt: räkna inte sektioner. Fråga om sidan skannas eller läses.
 */
export type SectionProps = {
  /** Small label above the heading. */
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  /** Renders under the title, muted. */
  description?: React.ReactNode;
  /** Right-hand slot on the header row (filters, links). */
  actions?: React.ReactNode;
  /** Background treatment. */
  tone?: "default" | "muted" | "accent";
  /** Heading level, so pages keep a valid outline. */
  headingLevel?: 2 | 3;
  align?: "start" | "center";
  width?: ContainerProps["size"];
  /** Anchor target for the table of contents. */
  id?: string;
  /**
   * Marks the section as parked. It stays in the template but is hidden unless
   * the matching admin toggle is on. See OPTIONAL_SECTION_IDS in lib/theme.ts.
   */
  optionalSection?: "winner-grid";
  className?: string;
  children?: React.ReactNode;
};

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "",
  muted: "bg-muted",
  accent: "bg-accent text-accent-foreground",
};

export function Section({
  eyebrow,
  title,
  description,
  actions,
  tone = "default",
  headingLevel = 2,
  align = "start",
  width,
  id,
  optionalSection,
  className,
  children,
}: SectionProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const hasHeader = Boolean(eyebrow || title || description || actions);

  return (
    <section
      id={id}
      data-slot="section"
      data-optional-section={optionalSection}
      className={cn("pad-section", toneClass[tone], className)}
      /* Offset anchor scrolling for the sticky header. */
      style={{ scrollMarginTop: "5rem" }}
    >
      <Container size={width}>
        {hasHeader ? (
          <div
            className={cn(
              /* Avståndet ned till innehållet.

                 `--space-block` räckte under en rubrik följd av löptext men
                 läste som ingenting alls under en rubrik följd av kantade
                 rutor: kortets egen ram blir en konkurrerande linje och äter
                 upp luften optiskt. Rapporterat på tre ställen samma dag,
                 `/sa-testar-vi` under "Två personer, inte en", `/om-oss` under
                 "Så arbetar vi" och under redaktionsingressen, alla tre med ett
                 rutnät av rutor direkt efter.

                 Faktorn ligger på tokenet i stället för ett fast tal, så
                 avståndet följer med när tätheten växlas. */
              "mb-[calc(var(--space-block)*1.4)] flex flex-col gap-row sm:flex-row sm:items-end sm:justify-between",
              align === "center" && "sm:flex-col sm:items-center sm:text-center",
            )}
          >
            <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
              {eyebrow ? (
                <p className="eyebrow mb-2 text-brand">{eyebrow}</p>
              ) : null}
              {title ? (
                <Heading className={headingLevel === 2 ? "text-h2" : "text-h3"}>
                  {title}
                </Heading>
              ) : null}
              {description ? (
                <p className="mt-2 text-muted-foreground">{description}</p>
              ) : null}
            </div>
            {actions ? <div className="shrink-0">{actions}</div> : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
