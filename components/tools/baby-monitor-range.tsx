"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  BUILD_FACTORS,
  LINE_OF_SIGHT_DIVISOR,
  PUBLISHED_PAIRS,
  buildFactor,
  indoorRange,
  reachVerdict,
} from "@/lib/tool-logic/babyvakt-rackvidd";

/* Kvoten, byggnadsfaktorerna och räkningen bor i
   lib/tool-logic/babyvakt-rackvidd.ts. Agentverktyget anropar samma funktioner,
   så widgeten och verktyget kan aldrig svara olika på samma fråga. */

const numberFormat = new Intl.NumberFormat("sv-SE");

export type BabyMonitorRangeProps = {
  className?: string;
};

export function BabyMonitorRange({ className }: BabyMonitorRangeProps) {
  const [lineOfSight, setLineOfSight] = useState(800);
  const [build, setBuild] = useState<string>(BUILD_FACTORS[0].key);

  const result = indoorRange(lineOfSight, build);

  return (
    <div
      data-slot="baby-monitor-range"
      className={cn("flex flex-col gap-row", className)}
    >
      {/* `min-w-0` på båda kolumnerna: ett rutnätsbarn har min-width auto, så
          en select ärver sitt bredaste alternativ som minimibredd och sköt ut
          hela sidan 66 px vid 390 px bredd. Ledtexten ligger därför under
          fältet i stället för inuti alternativen. */}
      <div className="grid gap-row sm:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-1.5 text-sm">
          <span className="font-medium">
            Tillverkarens räckvidd i meter, fri sikt
          </span>
          <input
            type="number"
            min={1}
            max={5000}
            step={10}
            inputMode="numeric"
            value={Number.isFinite(lineOfSight) ? lineOfSight : ""}
            onChange={(e) => setLineOfSight(e.target.valueAsNumber)}
            className="themed-border w-full rounded-md bg-background px-3 py-2 tabular-nums"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-1.5 text-sm">
          <span className="font-medium">Vad väggarna är gjorda av</span>
          <select
            value={build}
            onChange={(e) => setBuild(e.target.value)}
            className="themed-border w-full rounded-md bg-background px-3 py-2"
          >
            {BUILD_FACTORS.map((b) => (
              <option key={b.key} value={b.key}>
                {b.label}
              </option>
            ))}
          </select>
          <span className="text-xs text-muted-foreground">
            {buildFactor(build).hint}
          </span>
        </label>
      </div>

      <div className="rounded-md bg-muted pad-card">
        <p className="text-sm text-muted-foreground">
          Ungefärlig räckvidd genom väggar
        </p>
        <p className="font-heading text-h2 text-brand tabular-nums">
          {result.indoor > 0
            ? `omkring ${numberFormat.format(result.indoor)} m`
            : "–"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {reachVerdict(result.indoor)}
        </p>
        {result.indoor > 0 && result.build.factor !== 1 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            I lätta väggar hade samma apparat räckt omkring{" "}
            {numberFormat.format(result.indoorBase)} meter. Skillnaden är den
            marginal tunga väggar äter.
          </p>
        ) : null}
      </div>

      <details className="text-sm text-muted-foreground">
        <summary className="cursor-pointer font-medium text-foreground">
          Varför delat med {LINE_OF_SIGHT_DIVISOR}?
        </summary>
        <ul className="mt-2 flex flex-col gap-1">
          {PUBLISHED_PAIRS.map((p) => (
            <li key={p.product} className="flex justify-between gap-4">
              <span>{p.product}</span>
              <span className="tabular-nums">
                {p.indoor} m av {p.lineOfSight} m
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2">
          Fyra tillverkare publicerar båda talen och landar mellan 6,0 och 6,2
          gånger. Vi räknar med 6, eftersom det är ett tal du kan göra i huvudet
          framför hyllan.
        </p>
      </details>

      <p className="text-xs text-muted-foreground">
        Talen är tillverkarnas egna uppgifter. Ingen oberoende provning har mätt
        räckvidd i svenska bostäder, och ingen tillverkare anger vilken sorts
        vägg de mätt genom. Använd resultatet som en storleksordning, inte som
        ett löfte.
      </p>
    </div>
  );
}
