"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  CO_LEVELS as LEVELS,
  formatDuration,
  type CoLevel,
} from "@/lib/tool-logic/co-level";

/**
 * Vad en CO-halt betyder, och när varnaren enligt standarden får larma.
 *
 * ## Varför just den här räknaren, och inte den uppenbara
 *
 * Den efterfrågade idén var en räknare för hur länge något måste läcka innan
 * halten blir dödlig, gärna per kvadratmeter. Den byggde vi medvetet inte.
 *
 * För att räkna fram det krävs två tal som ingen läsare har och som vi inte
 * heller kan slå upp: **hur mycket kolmonoxid källan producerar**, som varierar
 * med storleksordningar mellan en välskött kamin och en trasig panna och som
 * beror på exakt hur felet ser ut, och **rummets luftomsättning**, som ändras
 * med vind, ventilation och om en dörr står öppen. Att sätta siffror på båda
 * hade gett ett exakt svar byggt på två gissningar, om en dödlig risk. Det är
 * samma sorts påhitt som ett uppfunnet mätvärde, bara farligare.
 *
 * Det som däremot går att svara på exakt är vad som händer **vid en given
 * halt**, eftersom både standarden och hälsoeffekterna är publicerade tal.
 *
 * ## Fyndet räknaren gör synligt
 *
 * EN 50291 förbjuder varnaren att larma tidigt vid låga halter, för att undvika
 * falsklarm. Vid 30 ppm får den inte larma alls före två timmar. Vid 50 ppm
 * ska den vara tyst den första timmen.
 *
 * Det är ett rimligt krav, och det har en konsekvens som ingen svensk
 * jämförelse skriver ut: en långsam läcka kan pågå i timmar innan något ljud
 * hörs. Det är precis det förlopp som ger huvudvärk som går över när man går
 * ut, alltså det som misstas för influensa.
 *
 * Och det är det starkaste argumentet för en varnare med display. Fyrtio ppm
 * syns på en skärm långt innan varnaren över huvud taget får lov att larma.
 *
 * ## Källor
 *
 * Larmtiderna kommer från EN 50291. Hälsoeffekterna från OSHA:s
 * sammanställning, samstämmig med Kidde och med amerikanska räddningstjänsters
 * publicerade tabeller. Båda är länkade i källistan på sidan.
 */

/* Halterna, larmtiderna och hälsoeffekterna bor i lib/tool-logic/co-level.ts,
   där agentverktyget slår upp i samma tabell. */

const TONE_CLASS: Record<CoLevel["tone"], string> = {
  low: "text-foreground",
  mid: "text-foreground",
  high: "text-brand",
};

export function CoLevelScale({ className }: { className?: string }) {
  const [ppm, setPpm] = useState<number>(50);
  const level = LEVELS.find((l) => l.ppm === ppm) ?? LEVELS[1];

  return (
    <div
      data-slot="co-level-scale"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Välj en halt i ppm, alltså miljondelar kolmonoxid i luften
        </legend>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <Pill
              key={l.ppm}
              label={`${l.ppm} ppm`}
              active={ppm === l.ppm}
              onClick={() => setPpm(l.ppm)}
            />
          ))}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        <p className="text-sm text-muted-foreground">Vid {level.ppm} ppm</p>
        <p className={cn("font-heading text-h3", TONE_CLASS[level.tone])}>
          {level.alarm}
        </p>

        <p className="mt-3 text-sm">
          <span className="font-medium">Vad standarden kräver: </span>
          EN 50291 anger både hur sent varnaren får larma och, vid låga halter,
          hur tidigt den får göra det. Den undre gränsen finns för att en varnare
          som tjuter vid varje matlagningsos snart hänger i en byrålåda.
        </p>

        <p className="mt-2 text-sm">
          <span className="font-medium">Vad som händer med dig: </span>
          {level.effect}
        </p>

        {level.silentFor ? (
          <p className="mt-3 border-t border-border pt-3 text-sm">
            <span className="font-medium">Luckan värd att känna till: </span>
            vid {level.ppm} ppm ska varnaren vara tyst de första{" "}
            {level.silentFor} minuterna. En läcka på den här nivån kan alltså
            pågå i {formatDuration(level.silentFor)}{" "}
            utan att något hörs. Det är därför en varnare med display är värd
            något: talet syns långt innan ljudet kommer.
          </p>
        ) : null}
      </div>

      <p className="text-xs text-muted-foreground">
        Larmtiderna är kraven i EN 50291. Hälsoeffekterna är publicerade
        riktvärden från OSHA och samstämmiga tabeller från tillverkare och
        räddningstjänster, och de gäller friska vuxna. Barn, gravida, äldre och
        personer med hjärt- eller lungsjukdom påverkas vid lägre halter och
        tidigare. Tabellen är inte en tid du kan stanna kvar:{" "}
        <strong className="text-foreground">
          larmar varnaren ska du gå ut och ringa 112
        </strong>
        .
      </p>

      <p className="text-xs text-muted-foreground">
        Vi räknar medvetet inte fram hur länge en källa måste läcka för att nå en
        viss halt. Det skulle kräva att vi gissade både hur mycket gas källan
        avger och hur snabbt rummet vädras, och ett exakt svar byggt på två
        gissningar är farligare än inget svar alls.
      </p>
    </div>
  );
}

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "themed-border rounded-full px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
