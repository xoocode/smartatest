"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  AIR_QUESTIONS as QUESTIONS,
  EMPTY_AIR_ANSWERS as EMPTY,
  decideAirAppliance,
  type AirAnswers as Answers,
} from "@/lib/tool-logic/air-appliance";

/* Frågorna och regeluppsättningen bor i lib/tool-logic/air-appliance.ts, så att
   agentverktyget svarar samma sak som widgeten. Väljaren nämner ingen produkt,
   inget pris och ingen butik: den pekar på en kategorisida och slutar där. */

export type AirAppliancePickerProps = { className?: string };

export function AirAppliancePicker({ className }: AirAppliancePickerProps) {
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const verdict = decideAirAppliance(answers);
  const answered = Object.values(answers).filter(Boolean).length;

  return (
    <div
      data-slot="air-appliance-picker"
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
              {verdict.page ? "Vi rekommenderar" : "Vårt svar"}
            </p>
            <p className="font-heading text-h3 text-brand">
              {verdict.headline}
            </p>
            <p className="mt-2 text-sm">{verdict.why}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {verdict.needsMeasurement ? "Gör så här: " : "Innan du köper: "}
              </span>
              {verdict.first}
            </p>
            {verdict.page ? (
              <p className="mt-3 text-sm">
                <Link
                  href={verdict.page}
                  className="font-medium text-brand underline-offset-4 hover:underline"
                >
                  Se vår jämförelse
                </Link>
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
            Svara på alla tre frågorna för att få ett svar.{" "}
            {answered > 0 ? `${answered} av ${QUESTIONS.length} klara.` : null}
          </p>
        )}
      </div>
    </div>
  );
}
