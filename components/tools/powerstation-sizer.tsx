"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  PS_APPLIANCES as APPLIANCES,
  PS_DURATIONS as DURATIONS,
  PS_SIMULTANEOUS as SIMULTANEOUS,
  EMPTY_PS_ANSWERS as EMPTY,
  decidePowerstation,
  type PsAnswers as Answers,
  type PsApplianceKey,
  type PsDurationKey,
  type PsSimultaneousKey,
} from "@/lib/tool-logic/powerstation";

/* Räkningen bor i lib/tool-logic/powerstation.ts, så att agentverktyget svarar
   samma sak som widgeten. Väljaren nämner ingen produkt, inget pris och ingen
   butik: den svarar med en kravspecifikation som går att bära med sig till
   vilken butik som helst. */

export type PowerstationSizerProps = { className?: string };

export function PowerstationSizer({ className }: PowerstationSizerProps) {
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const verdict = decidePowerstation(answers);

  const toggleAppliance = (key: PsApplianceKey) =>
    setAnswers((prev) => ({
      ...prev,
      appliances: prev.appliances.includes(key)
        ? prev.appliances.filter((k) => k !== key)
        : [...prev.appliances, key],
    }));

  return (
    <div
      data-slot="powerstation-sizer"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Vad ska stationen driva? Välj allt som gäller.
        </legend>
        <div className="flex flex-wrap gap-2">
          {APPLIANCES.map((a) => {
            const active = answers.appliances.includes(a.key as PsApplianceKey);
            return (
              <button
                key={a.key}
                type="button"
                aria-pressed={active}
                onClick={() => toggleAppliance(a.key as PsApplianceKey)}
                className={cn(
                  "themed-border rounded-full px-3 py-1.5 text-left text-sm transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Går de samtidigt eller en i taget?
        </legend>
        <div className="flex flex-wrap gap-2">
          {SIMULTANEOUS.map((s) => {
            const active = answers.simultaneous === s.key;
            return (
              <button
                key={s.key}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    simultaneous: s.key as PsSimultaneousKey,
                  }))
                }
                className={cn(
                  "themed-border rounded-full px-3 py-1.5 text-left text-sm transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Hur länge ska de gå på en laddning?
        </legend>
        <div className="flex flex-wrap gap-2">
          {DURATIONS.map((d) => {
            const active = answers.duration === d.key;
            return (
              <button
                key={d.key}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    duration: d.key as PsDurationKey,
                  }))
                }
                className={cn(
                  "themed-border rounded-full px-3 py-1.5 text-left text-sm transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        {verdict ? (
          <>
            <p className="text-sm text-muted-foreground">
              {verdict.overKategorin ? "Vårt svar" : "Leta efter det här"}
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
            Välj minst en apparat och svara på de två frågorna för att få ett
            svar.
          </p>
        )}
      </div>
    </div>
  );
}
