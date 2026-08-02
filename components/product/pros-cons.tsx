import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

export type ProsConsProps = {
  pros: string[];
  cons: string[];
  /** side = two columns, stacked = one column, cards = bordered panels. */
  variant?: "side" | "stacked" | "cards";
  size?: "sm" | "md";
  prosLabel?: string;
  consLabel?: string;
  className?: string;
};

export function ProsCons({
  pros,
  cons,
  variant = "side",
  size = "md",
  prosLabel = "Fördelar",
  consLabel = "Nackdelar",
  className,
}: ProsConsProps) {
  const textSize = size === "sm" ? "text-sm" : "";

  const list = (
    items: string[],
    kind: "pro" | "con",
    label: string,
  ) => {
    const Icon = kind === "pro" ? Check : X;
    return (
      <div
        className={cn(
          variant === "cards" &&
            "themed-border rounded-lg pad-card bg-card shadow-card",
        )}
      >
        <p
          className={cn(
            "eyebrow mb-2",
            kind === "pro" ? "text-success" : "text-destructive",
          )}
        >
          {label}
        </p>
        <ul className={cn("flex flex-col gap-2", textSize)}>
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Icon
                aria-hidden="true"
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  kind === "pro" ? "text-success" : "text-destructive",
                )}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      data-slot="pros-cons"
      className={cn(
        variant === "side" ? "grid gap-stack sm:grid-cols-2" : "",
        variant === "stacked" ? "flex flex-col gap-stack" : "",
        variant === "cards" ? "grid gap-stack sm:grid-cols-2" : "",
        className,
      )}
    >
      {list(pros, "pro", prosLabel)}
      {list(cons, "con", consLabel)}
    </div>
  );
}
