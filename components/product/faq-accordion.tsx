import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

export type FaqAccordionProps = {
  items: FaqItem[];
  /** bordered = boxed rows, plain = hairline separators. */
  variant?: "bordered" | "plain";
  /** Allow several answers open at once. */
  multiple?: boolean;
  /** Emit FAQPage JSON-LD. Only enable when the answers are plain strings. */
  schema?: boolean;
  className?: string;
};

export function FaqAccordion({
  items,
  variant = "bordered",
  multiple = false,
  schema = false,
  className,
}: FaqAccordionProps) {
  const jsonLd =
    schema && items.every((i) => typeof i.answer === "string")
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((i) => ({
            "@type": "Question",
            name: i.question,
            acceptedAnswer: { "@type": "Answer", text: i.answer as string },
          })),
        }
      : null;

  const listClass = cn(variant === "bordered" && "flex flex-col gap-2");

  // Accordion's props are a discriminated union on `type`, so the two modes
  // cannot share one JSX element without widening the literal.
  const rows = items.map((item, i) => (
    <AccordionItem
      key={item.question}
      value={`faq-${i}`}
      className={cn(
        variant === "bordered" &&
          "themed-border rounded-lg bg-card px-4 last:border-b",
      )}
    >
      <AccordionTrigger className="text-left font-medium">
        {item.question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        {item.answer}
      </AccordionContent>
    </AccordionItem>
  ));

  return (
    <div data-slot="faq-accordion" className={className}>
      {multiple ? (
        <Accordion type="multiple" className={listClass}>
          {rows}
        </Accordion>
      ) : (
        <Accordion type="single" collapsible className={listClass}>
          {rows}
        </Accordion>
      )}

      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </div>
  );
}
