import type { ElementType } from "react";
import { BadgeCheck, CalendarRange, FileText, FlaskConical } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Person, StatIcon } from "@/lib/people";

const statIcons: Record<StatIcon, ElementType> = {
  experience: CalendarRange,
  articles: FileText,
  tested: FlaskConical,
  certified: BadgeCheck,
};

export type PersonCredentialsProps = {
  person: Person;
  /**
   * sidebar — boxed rail beside the bio, as on the author page
   * inline  — flows in the main column, for narrow layouts
   * stats   — the stat row only, for an article footer
   */
  variant?: "sidebar" | "inline" | "stats";
  experienceLabel?: string;
  educationLabel?: string;
  /** Keeps the page outline valid wherever this is placed. */
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

/** The E-E-A-T block: what this person has done, and where they learned it. */
export function PersonCredentials({
  person,
  variant = "sidebar",
  experienceLabel = "Tidigare erfarenhet",
  educationLabel = "Utbildning",
  headingLevel = 2,
  className,
}: PersonCredentialsProps) {
  const Heading = `h${headingLevel}` as const;
  const stats = (
    <ul
      className={cn(
        "flex flex-col gap-3",
        variant === "stats" && "sm:flex-row sm:flex-wrap sm:gap-x-6",
      )}
    >
      {person.stats.map((stat) => {
        const Icon = statIcons[stat.icon];
        /* Räknade rader är funktioner, se `PersonStat` i lib/people.ts. */
        const label =
          typeof stat.label === "function" ? stat.label() : stat.label;
        return (
          <li key={label} className="flex items-center gap-2.5">
            <Icon aria-hidden="true" className="size-5 shrink-0 text-brand" />
            <span className="font-medium">{label}</span>
          </li>
        );
      })}
    </ul>
  );

  if (variant === "stats") {
    return (
      <div data-slot="person-credentials" data-variant="stats" className={className}>
        {stats}
      </div>
    );
  }

  const list = (label: string, items: string[]) => (
    <div>
      <Heading className="text-h3 mb-3">{label}</Heading>
      <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <aside
      data-slot="person-credentials"
      data-variant={variant}
      className={cn(
        "flex flex-col gap-block",
        variant === "sidebar" &&
          "themed-border rounded-lg bg-card pad-card shadow-card",
        className,
      )}
    >
      {stats}
      <hr className="border-border" />
      {list(experienceLabel, person.experience)}
      <hr className="border-border" />
      {list(educationLabel, person.education)}
    </aside>
  );
}
