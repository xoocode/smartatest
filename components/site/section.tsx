import * as React from "react";

import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "@/components/site/container";

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
              "mb-[var(--space-block)] flex flex-col gap-row sm:flex-row sm:items-end sm:justify-between",
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
