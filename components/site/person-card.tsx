import Link from "next/link";
import { Mail } from "lucide-react";

import { PUBLISHER } from "@/lib/site";
import { cn } from "@/lib/utils";
import { personHref, type Person } from "@/lib/people";
import { PersonAvatar } from "@/components/site/person-avatar";

export type PersonCardProps = {
  person: Person;
  /**
   * byline — one line with a small portrait, for article headers
   * box    — bordered card with role and short credential, for article footers
   * hero   — full page header with large portrait and contact links
   */
  variant?: "byline" | "box" | "hero";
  /**
   * Prefix for the name, e.g. "Av", "Skriven av", "Granskad av".
   *
   * Every competitor in the Swedish, German and American markets labels the
   * byline, and an unlabelled name reads as decoration rather than
   * attribution. Used by the byline and box variants.
   */
  label?: string;
  /** Second person, shown after the author. Use for a fact checker. */
  reviewer?: Person;
  reviewerLabel?: string;
  /** Link the name to the author page. */
  link?: boolean;
  showContact?: boolean;
  /** Extra line under the role, e.g. "43 tester utförda". */
  meta?: string;
  className?: string;
};

/*
 * Kontaktknappen går till redaktionens brevlåda, inte till en personlig adress.
 *
 * Ändrat 2026-08-03. Tidigare bar varje person en egen `email`, och en av dem
 * dessutom en LinkedIn-länk. Båda är borta. En delad adress är den enda som
 * håller: den finns redan, den bevakas, och den slutar inte fungera när någon
 * i redaktionen byts ut. En utgående profillänk lämnade dessutom sajten från
 * just den sida som ska svara på vem som står bakom betygen.
 */
function ContactLinks({ person }: { person: Person }) {
  return (
    <div className="flex items-center gap-2">
      <a
        href={`mailto:${PUBLISHER.email}`}
        aria-label={`Mejla redaktionen om ${person.name}s texter`}
        className="themed-border flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Mail aria-hidden="true" className="size-4" />
      </a>
    </div>
  );
}

export function PersonCard({
  person,
  variant = "box",
  label,
  reviewer,
  reviewerLabel = "Granskad av",
  link = true,
  showContact,
  meta,
  className,
}: PersonCardProps) {
  const contact = showContact ?? variant === "hero";

  const nameOf = (p: Person) =>
    link ? (
      <Link href={personHref(p)} className="inline-flex min-h-6 items-center hover:underline">
        {p.name}
      </Link>
    ) : (
      p.name
    );

  const name = nameOf(person);

  if (variant === "byline") {
    return (
      <div
        data-slot="person-card"
        data-variant="byline"
        className={cn(
          "flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm",
          className,
        )}
      >
        <span className="flex items-center gap-2.5">
          <PersonAvatar person={person} size="sm" />
          <span>
            {label ? (
              <span className="text-muted-foreground">{label} </span>
            ) : null}
            <span className="font-medium">{name}</span>
            <span className="text-muted-foreground"> · {person.role}</span>
          </span>
        </span>

        {/* The fact checker gets a portrait too. A name alone next to a
            portrait reads as a footnote rather than a second person. */}
        {reviewer ? (
          <span className="flex items-center gap-2.5">
            <PersonAvatar person={reviewer} size="sm" />
            <span>
              <span className="text-muted-foreground">{reviewerLabel} </span>
              <span className="font-medium">{nameOf(reviewer)}</span>
            </span>
          </span>
        ) : null}
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div
        data-slot="person-card"
        data-variant="hero"
        className={cn(
          "flex flex-col items-start gap-[var(--space-card)] sm:flex-row sm:items-center",
          className,
        )}
      >
        <PersonAvatar person={person} size="xl" ring />
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-h1">{person.name}</h1>
            <p className="mt-1 text-lg text-muted-foreground">{person.role}</p>
          </div>
          {contact ? <ContactLinks person={person} /> : null}
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="person-card"
      data-variant="box"
      className={cn(
        "themed-border flex items-center gap-[var(--space-row)] rounded-lg bg-card pad-card",
        className,
      )}
    >
      <PersonAvatar person={person} size="md" />
      <div className="min-w-0 flex-1">
        {/* The box variant takes the same label as the byline, so a pair of
            cards can say "Skriven av" and "Granskad av" without the reader
            having to infer which person did which. */}
        {label ? (
          <p className="eyebrow text-muted-foreground">{label}</p>
        ) : null}
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{person.role}</p>
        <p className="text-sm text-muted-foreground">{meta ?? person.short}</p>
      </div>
      {contact ? <ContactLinks person={person} /> : null}
    </div>
  );
}
