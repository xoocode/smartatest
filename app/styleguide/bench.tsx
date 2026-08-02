"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A single component workbench: a heading, a variant switcher, and the live
 * render. The switcher chrome is intentionally neutral (zinc) so it never
 * blends into the theme being evaluated.
 */
export function Bench<T extends string>({
  title,
  file,
  description,
  options,
  initial,
  surface = "page",
  children,
}: {
  title: string;
  /** Source path, shown so the reviewer knows what to edit. */
  file: string;
  description?: string;
  /** Variant ids to switch between. Omit for components with no variants. */
  options?: readonly T[];
  initial?: T;
  /** page = on the page background, muted = on the muted surface. */
  surface?: "page" | "muted";
  children: (variant: T) => ReactNode;
}) {
  const [variant, setVariant] = useState<T>(
    initial ?? (options?.[0] as T) ?? ("" as T),
  );

  return (
    <section className="border-t border-dashed border-zinc-300/60 pt-6">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg">{title}</h2>
          <p className="mt-0.5 font-mono text-[11px] text-zinc-500">{file}</p>
          {description ? (
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        {options && options.length > 1 ? (
          <div className="flex shrink-0 flex-wrap gap-1 rounded-lg bg-zinc-900 p-1">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setVariant(opt)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs transition-colors",
                  variant === opt
                    ? "bg-zinc-100 font-medium text-zinc-900"
                    : "text-zinc-400 hover:text-zinc-100",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : null}
      </header>

      <div
        className={cn(
          "rounded-lg p-4",
          surface === "muted" ? "bg-muted" : "bg-background",
          "ring-1 ring-zinc-300/50",
        )}
      >
        {children(variant)}
      </div>
    </section>
  );
}
