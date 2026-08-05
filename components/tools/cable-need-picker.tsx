"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  CABLE_QUESTIONS as QUESTIONS,
  EMPTY_CABLE_ANSWERS as EMPTY,
  decideCable,
  type CableAnswers as Answers,
} from "@/lib/tool-logic/usb-c-kabel";

/* Frågorna och regeluppsättningen bor i lib/tool-logic/usb-c-kabel.ts, så att
   agentverktyget svarar samma sak som widgeten. Väljaren nämner ingen produkt,
   inget pris och ingen butik: den svarar med en kravspecifikation som går att
   bära med sig till vilken butik som helst. */

export type CableNeedPickerProps = { className?: string };

export function CableNeedPicker({ className }: CableNeedPickerProps) {
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const verdict = decideCable(answers);
  const answered = Object.values(answers).filter(Boolean).length;

  return (
    <div
      data-slot="cable-need-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      {QUESTIONS.map((q) => (
        <fieldset key={q.key}>
          {/* `legend` deltar inte pålitligt i förälderns flexflöde, så
              avståndet ner till knapparna är en marginal på legenden och
              inte ett gap på fieldset. Samma lösning som ProtocolPicker. */}
          <legend className="mb-2.5 text-sm font-medium">{q.question}</legend>
          <div className="flex flex-wrap gap-2">
            {q.options.map((o) => {
              const active = answers[q.key] === o.key;
              return (
                <button
                  key={o.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.key]: o.key }))
                  }
                  className={cn(
                    "themed-border rounded-full px-3 py-1.5 text-left text-sm transition-colors",
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
            <p className="text-sm text-muted-foreground">
              {verdict.cheapestIsFine ? "Vårt svar" : "Leta efter det här"}
            </p>
            <p className="font-heading text-h3 text-brand">
              {verdict.headline}
            </p>

            <ul className="mt-3 flex flex-col gap-1.5 text-sm">
              {verdict.requirements.map((r) => (
                <li key={r} className="flex gap-2">
                  <span aria-hidden className="text-brand">
                    ·
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-sm">{verdict.why}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Se upp med: </span>
              {verdict.watch}
            </p>

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
            Svara på alla tre frågorna för att få ett svar.{" "}
            {answered > 0 ? `${answered} av ${QUESTIONS.length} klara.` : null}
          </p>
        )}
      </div>
    </div>
  );
}
