"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  MODES,
  PUBLISHED_PAIRS,
  SQM_PER_MINUTE,
  areaVerdict,
  mode as modeFor,
  runtimeInMode,
} from "@/lib/tool-logic/skaftdammsugare-drifttid";

/* Kvoterna, ytan per minut och räkningen bor i
   lib/tool-logic/skaftdammsugare-drifttid.ts. Agentverktyget anropar samma
   funktioner, så widgeten och verktyget kan aldrig svara olika. */

const numberFormat = new Intl.NumberFormat("sv-SE");

export type VacuumRuntimeProps = {
  className?: string;
};

export function VacuumRuntime({ className }: VacuumRuntimeProps) {
  const [stated, setStated] = useState(60);
  const [modeKey, setModeKey] = useState<string>("turbo");

  const result = runtimeInMode(stated, modeKey);
  const eco = runtimeInMode(stated, "eko");

  return (
    <div
      data-slot="vacuum-runtime"
      className={cn("flex flex-col gap-row", className)}
    >
      {/* `min-w-0` på båda kolumnerna: ett rutnätsbarn har min-width auto, så
          en select ärver sitt bredaste alternativ som minimibredd. Ledtexten
          ligger därför under fältet i stället för inuti alternativen. */}
      <div className="grid gap-row sm:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-1.5 text-sm">
          <span className="font-medium">
            Tillverkarens drifttid i minuter, ekoläge
          </span>
          <input
            type="number"
            min={1}
            max={240}
            step={5}
            inputMode="numeric"
            value={Number.isFinite(stated) ? stated : ""}
            onChange={(e) => setStated(e.target.valueAsNumber)}
            className="themed-border w-full rounded-md bg-background px-3 py-2 tabular-nums"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-1.5 text-sm">
          <span className="font-medium">Läget du kommer att städa i</span>
          <select
            value={modeKey}
            onChange={(e) => setModeKey(e.target.value)}
            className="themed-border w-full rounded-md bg-background px-3 py-2"
          >
            {MODES.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>
          <span className="text-xs text-muted-foreground">
            {modeFor(modeKey).hint}
          </span>
        </label>
      </div>

      <div className="rounded-md bg-muted pad-card">
        <p className="text-sm text-muted-foreground">
          Ungefärlig drifttid i {result.mode.label.toLowerCase()}
        </p>
        <p className="font-heading text-h2 text-brand tabular-nums">
          {result.minutes > 0 ? `omkring ${result.minutes} min` : "–"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {result.area > 0
            ? `Det räcker till omkring ${numberFormat.format(result.area)} kvadratmeter. `
            : ""}
          {areaVerdict(result.area)}
        </p>
        {result.minutes > 0 && result.mode.factor !== 1 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            I ekoläge hade samma batteri räckt omkring {eco.minutes} minuter och{" "}
            {numberFormat.format(eco.area)} kvadratmeter. Skillnaden är vad
            borsten och full effekt kostar.
          </p>
        ) : null}
      </div>

      <details className="text-sm text-muted-foreground">
        <summary className="cursor-pointer font-medium text-foreground">
          Varför en fjärdedel i turboläge?
        </summary>
        <ul className="mt-2 flex flex-col gap-1">
          {PUBLISHED_PAIRS.map((p) => (
            <li key={p.product} className="flex justify-between gap-4">
              <span>{p.product}</span>
              <span className="tabular-nums">
                {p.turbo} min av {p.eco} min
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2">
          Fem tillverkare anger båda talen för samma maskin och samma batteri.
          Kvoterna blir 0,14 till 0,33 och medianen 0,25, alltså en fjärdedel.
          Autoläget vilar på två uppgifter, 25 av 80 minuter och 20 av 40, och
          räknas som 0,4.
        </p>
        <p className="mt-2">
          Ytan bygger på {SQM_PER_MINUTE} kvadratmeter i minuten, vilket är vad
          Dreame och Philips själva anger: 300 kvadratmeter på 90 minuter
          respektive mer än 195 på 60.
        </p>
      </details>

      <p className="text-xs text-muted-foreground">
        Talen är tillverkarnas egna uppgifter. Vi har inte kört någon av
        maskinerna. Använd resultatet som en storleksordning inför köpet, inte
        som ett löfte om vad just din bostad kräver.
      </p>
    </div>
  );
}
