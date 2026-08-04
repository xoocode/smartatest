"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  EMPTY_PROTOCOL_ANSWERS as EMPTY,
  PROTOCOL_QUESTIONS as QUESTIONS,
  decideProtocol,
  type ProtocolAnswers as Answers,
} from "@/lib/tool-logic/protocol";

/* Frågorna och regeluppsättningen bor i lib/tool-logic/protocol.ts, så att
   agentverktyget rekommenderar samma protokoll som widgeten. */

export type ProtocolPickerProps = { className?: string };

export function ProtocolPicker({ className }: ProtocolPickerProps) {
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const verdict = decideProtocol(answers);
  const answered = Object.values(answers).filter(Boolean).length;

  return (
    <div
      data-slot="protocol-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      {QUESTIONS.map((q) => (
        <fieldset key={q.key}>
          {/* `legend` does not take part in the parent's flex flow reliably, so
              the gap between question and options is a margin on the legend
              rather than a gap on the fieldset. */}
          <legend className="mb-2.5 text-sm font-medium">{q.question}</legend>
          <div className="flex flex-wrap gap-2">
            {q.options.map((o) => {
              const active = answers[q.key] === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.key]: o.value }))
                  }
                  className={cn(
                    "themed-border rounded-full px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="rounded-md bg-muted pad-card">
        {verdict ? (
          <>
            <p className="text-sm text-muted-foreground">Vi rekommenderar</p>
            <p className="font-heading text-h3 text-brand">
              {verdict.protocol}
            </p>
            <p className="mt-2 text-sm">{verdict.why}</p>
            {verdict.caveat ? (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Att veta: </span>
                {verdict.caveat}
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => setAnswers(EMPTY)}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Svara på alla fyra frågorna för att få en rekommendation.{" "}
            {answered > 0 ? `${answered} av ${QUESTIONS.length} klara.` : null}
          </p>
        )}
      </div>
    </div>
  );
}
