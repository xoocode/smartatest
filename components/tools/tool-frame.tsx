import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { findTool, toolHref } from "@/lib/tools";

export type ToolFrameProps = {
  /** Slug from lib/tools.ts. Drives the title and the permalink. */
  tool: string;
  children: ReactNode;
  /** Override the heading. Defaults to the tool's registry name. */
  title?: string;
  /**
   * embedded — inside a buying guide, with a quiet link to the tool's own page
   * standalone — on /verktyg/{slug}, where that link would point at itself
   */
  variant?: "embedded" | "standalone";
  className?: string;
};

/**
 * Chrome around an interactive tool: border, heading, and — when embedded in
 * an article — a discreet permalink to the tool's own page.
 *
 * The link is deliberately quiet. It is useful to the handful of readers who
 * want to bookmark the calculator, and it must not pull anyone out of a buying
 * guide they are halfway through.
 */
export function ToolFrame({
  tool,
  children,
  title,
  variant = "embedded",
  className,
}: ToolFrameProps) {
  const entry = findTool(tool);
  const heading = title ?? entry?.name ?? "Verktyg";

  return (
    <div
      data-slot="tool-frame"
      data-tool={tool}
      className={cn(
        "not-prose themed-border flex flex-col gap-row rounded-lg bg-card pad-card",
        className,
      )}
    >
      <p className="font-heading text-lg">{heading}</p>

      {children}

      {variant === "embedded" && entry ? (
        <Link
          href={toolHref(entry)}
          className="inline-flex items-center gap-1 self-start text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {/* The heading right above already names the tool, so repeating it
              here only makes the link longer and clumsier as names get more
              specific ("Öppna protokollväljare för smart hem som egen sida"). */}
          Öppna som egen sida
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
