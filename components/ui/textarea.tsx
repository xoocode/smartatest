import * as React from "react";

import { cn } from "@/lib/utils";

/** Flerradigt textfält. Delar utseende med `Input`. */
export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "themed-border w-full rounded-md bg-background px-3 py-2 text-sm outline-none",
        "field-sizing-content min-h-24",
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
