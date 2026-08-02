import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Textfält.
 *
 * Klassträngen är densamma som sökrutan i `site-search.tsx` redan använde och
 * som räknarna i `components/tools/` skrivit av var för sig. Den bor här nu så
 * att nästa fält inte blir en sjätte variant.
 *
 * De befintliga råa `<input>`-elementen är medvetet inte omskrivna i samma
 * veva. Räknarna har egen logik kring `inputMode` och `step`, och att röra dem
 * hör hemma i en egen omgång.
 */
export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "themed-border w-full rounded-md bg-background px-3 py-2 text-sm outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30",
        className,
      )}
      {...props}
    />
  );
}
