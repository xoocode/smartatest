"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

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

type Level = {
  ppm: number;
  /** Vad standarden kräver av varnaren vid den här halten. */
  alarm: string;
  /** Minuter varnaren enligt standarden inte får larma före, om något. */
  silentFor?: number;
  /** Vad som händer med en människa. */
  effect: string;
  tone: "low" | "mid" | "high";
};

const LEVELS: Level[] = [
  {
    ppm: 30,
    alarm: "Får inte larma före 120 minuter",
    silentFor: 120,
    effect:
      "Ingen akut effekt hos friska vuxna. Vid exponering dag efter dag kan huvudvärk och trötthet komma, och foster och personer med hjärtsjukdom påverkas tidigare.",
    tone: "low",
  },
  {
    ppm: 50,
    alarm: "Tidigast efter 60 minuter, senast efter 90",
    silentFor: 60,
    effect:
      "Det amerikanska gränsvärdet för yrkesexponering under en åttatimmarsdag. Alltså inte akut farligt, men inte heller något som ska finnas i ett sovrum.",
    tone: "low",
  },
  {
    ppm: 100,
    alarm: "Tidigast efter 10 minuter, senast efter 40",
    silentFor: 10,
    effect:
      "Lätt huvudvärk efter ett par timmar. Många beskriver det i efterhand som att de kände sig hängiga utan att förstå varför.",
    tone: "mid",
  },
  {
    ppm: 200,
    alarm: "Mellan 10 och 40 minuter, som vid 100 ppm",
    effect: "Lätt huvudvärk efter två till tre timmar.",
    tone: "mid",
  },
  {
    ppm: 300,
    alarm: "Senast efter 3 minuter",
    effect:
      "Huvudvärk och illamående inom ett par timmar. Här kräver standarden att varnaren larmar nästan omedelbart.",
    tone: "high",
  },
  {
    ppm: 400,
    alarm: "Senast efter 3 minuter",
    effect:
      "Huvudvärk och illamående inom en till två timmar. Livshotande efter omkring tre timmar.",
    tone: "high",
  },
  {
    ppm: 800,
    alarm: "Senast efter 3 minuter",
    effect:
      "Huvudvärk, illamående och yrsel inom 45 minuter. Medvetslöshet efter omkring en timme. Dödsfall inom två till tre timmar.",
    tone: "high",
  },
  {
    ppm: 1600,
    alarm: "Senast efter 3 minuter",
    effect:
      "Svår huvudvärk, illamående och yrsel inom 20 minuter. Dödsfall kan inträffa inom en timme.",
    tone: "high",
  },
];

const TONE_CLASS: Record<Level["tone"], string> = {
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

/** "60 minuter" blir "en timme", "120" blir "två timmar". Böjs, inte suffixas. */
function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} minuter`;
  const hours = Math.round(minutes / 60);
  return hours === 1 ? "en timme" : `${hours} timmar`;
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
