import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Typography wrapper for editorial copy (MDX bodies, buying guides).
 * Styles raw HTML so content files stay free of class names.
 *
 * Every selector is scoped `:not(:where(.not-prose,.not-prose_*))`, which gives
 * us a working `not-prose` escape hatch. Without it these are plain descendant
 * selectors that reach into any component embedded in the MDX: a calculator's
 * inputs, a product card, and — worst — the `<a>` inside an affiliate button,
 * which came out underlined and primary-coloured on top of its button styling.
 *
 * `:where()` adds no specificity, so a component's own classes still win
 * without needing `!important`.
 *
 * The selectors are written out in full rather than composed from a helper.
 * Tailwind scans source for literal class strings, so a class assembled at
 * runtime generates no CSS at all — it fails silently and completely.
 */
export function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prose"
      className={cn(
        "max-w-none",
        "[&_:where(p):not(:where(.not-prose,.not-prose_*))]:my-[0.9em]",
        "[&_:where(h2):not(:where(.not-prose,.not-prose_*))]:text-h2",
        "[&_:where(h2):not(:where(.not-prose,.not-prose_*))]:mt-[1.6em]",
        "[&_:where(h2):not(:where(.not-prose,.not-prose_*))]:mb-[0.5em]",
        "[&_:where(h3):not(:where(.not-prose,.not-prose_*))]:text-h3",
        "[&_:where(h3):not(:where(.not-prose,.not-prose_*))]:mt-[1.4em]",
        "[&_:where(h3):not(:where(.not-prose,.not-prose_*))]:mb-[0.4em]",
        "[&_:where(ul):not(:where(.not-prose,.not-prose_*))]:my-[0.9em]",
        "[&_:where(ul):not(:where(.not-prose,.not-prose_*))]:list-disc",
        "[&_:where(ul):not(:where(.not-prose,.not-prose_*))]:pl-5",
        "[&_:where(ol):not(:where(.not-prose,.not-prose_*))]:my-[0.9em]",
        "[&_:where(ol):not(:where(.not-prose,.not-prose_*))]:list-decimal",
        "[&_:where(ol):not(:where(.not-prose,.not-prose_*))]:pl-5",
        "[&_:where(li):not(:where(.not-prose,.not-prose_*))]:my-[0.3em]",
        /* Länkarna stylas inte här utan i globals.css, under `data-link`.

           ⚠️ Här satt ett verkligt fel. Hover-prefixet låg utanför
           barnväljaren i stället för inuti den, vilket kompilerar till "när
           **behållaren** hovras, ta bort understrykningen på varje länk i
           den". Att föra musen var som helst i ett stycke släckte alltså
           understrykningen på samtliga länkar i stycket. Rätt form har hover
           inuti barnväljaren, och eftersom stilen ändå skulle bli en axel
           flyttade hela regeln.

           ⚠️ Skriv inte ut klassträngen här. Tailwind 4 läser källfiler som
           text, även kommentarer, och genererade en trasig regel av den som
           stod här 2026-08-03. Bygget föll på `Parsing CSS source code
           failed` i globals.css. */
        "[&_:where(strong):not(:where(.not-prose,.not-prose_*))]:font-semibold",
        "[&_:where(blockquote):not(:where(.not-prose,.not-prose_*))]:border-l-2",
        "[&_:where(blockquote):not(:where(.not-prose,.not-prose_*))]:border-brand",
        "[&_:where(blockquote):not(:where(.not-prose,.not-prose_*))]:pl-4",
        "[&_:where(blockquote):not(:where(.not-prose,.not-prose_*))]:text-muted-foreground",
        "[&_:where(blockquote):not(:where(.not-prose,.not-prose_*))]:italic",
        "[&_:where(table):not(:where(.not-prose,.not-prose_*))]:w-full",
        "[&_:where(table):not(:where(.not-prose,.not-prose_*))]:text-left",
        "[&_:where(th):not(:where(.not-prose,.not-prose_*))]:border-b",
        "[&_:where(th):not(:where(.not-prose,.not-prose_*))]:py-2",
        "[&_:where(th):not(:where(.not-prose,.not-prose_*))]:font-semibold",
        "[&_:where(td):not(:where(.not-prose,.not-prose_*))]:border-b",
        "[&_:where(td):not(:where(.not-prose,.not-prose_*))]:py-2",
        className,
      )}
      {...props}
    />
  );
}
