import { cn } from "@/lib/utils";

export type TocEntry = {
  /** Element id on the page, without the hash. */
  id: string;
  label: string;
};

export type TocNavProps = {
  entries: TocEntry[];
  title?: string;
  /** box = bordered panel, sticky = sidebar rail, inline = chip row. */
  variant?: "box" | "sticky" | "inline";
  className?: string;
};

/** "Innehåll" jump list. Long comparison pages need one to stay scannable. */
export function TocNav({
  entries,
  title = "Innehåll",
  variant = "box",
  className,
}: TocNavProps) {
  if (variant === "inline") {
    return (
      <nav
        data-slot="toc-nav"
        aria-label={title}
        className={cn("flex flex-wrap gap-2", className)}
      >
        {entries.map((e) => (
          <a
            key={e.id}
            href={`#${e.id}`}
            className="themed-border rounded-full bg-card px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {e.label}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <nav
      data-slot="toc-nav"
      aria-label={title}
      className={cn(
        "themed-border rounded-lg bg-card pad-card",
        variant === "sticky" && "sticky top-20",
        className,
      )}
    >
      <p className="eyebrow mb-2 text-muted-foreground">{title}</p>
      <ol className="flex flex-col gap-1.5 text-sm">
        {entries.map((e, i) => (
          <li key={e.id} className="flex gap-2">
            <span className="text-muted-foreground tabular-nums">{i + 1}.</span>
            <a
              href={`#${e.id}`}
              className="text-primary underline-offset-2 hover:underline"
            >
              {e.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
