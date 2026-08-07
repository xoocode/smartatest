"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  BATCHES_PER_FILL_DEFAULT,
  BATCHES_PER_FILL_MAX,
  BATCHES_PER_FILL_MIN,
  FILTERING,
  OIL_PRICE_DEFAULT,
  PUBLISHED_ADVICE,
  costVerdict,
  filtering,
  oilCost,
} from "@/lib/tool-logic/fritos-oljekostnad";

/* Bytesintervallet, filtereffekten och räkningen bor i
   lib/tool-logic/fritos-oljekostnad.ts. Agentverktyget anropar samma
   funktioner, så widgeten och verktyget kan aldrig svara olika på samma fråga. */

const numberFormat = new Intl.NumberFormat("sv-SE");
const decimalFormat = new Intl.NumberFormat("sv-SE", {
  maximumFractionDigits: 1,
});

export type OilCostCalculatorProps = {
  className?: string;
};

export function OilCostCalculator({ className }: OilCostCalculatorProps) {
  const [litres, setLitres] = useState(3);
  const [batches, setBatches] = useState(26);
  const [filter, setFilter] = useState<string>(FILTERING[0].key);
  const [price, setPrice] = useState(OIL_PRICE_DEFAULT);
  const [interval, setInterval] = useState(BATCHES_PER_FILL_DEFAULT);

  const result = oilCost(litres, batches, filter, price, interval);

  return (
    <div
      data-slot="oil-cost-calculator"
      className={cn("flex flex-col gap-row", className)}
    >
      {/* `min-w-0` på båda kolumnerna: ett rutnätsbarn har min-width auto, så
          en select ärver sitt bredaste alternativ som minimibredd och skjuter
          ut hela sidan i mobilbredd. */}
      <div className="grid gap-row sm:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-1.5 text-sm">
          <span className="font-medium">Liter olja fritösen tar</span>
          <input
            type="number"
            min={0.5}
            max={10}
            step={0.1}
            inputMode="decimal"
            value={Number.isFinite(litres) ? litres : ""}
            onChange={(e) => setLitres(e.target.valueAsNumber)}
            className="themed-border w-full rounded-md bg-background px-3 py-2 tabular-nums"
          />
          <span className="text-xs text-muted-foreground">
            Talet på kartongen. Fältet här spänner 1,8 till 5 liter.
          </span>
        </label>

        <label className="flex min-w-0 flex-col gap-1.5 text-sm">
          <span className="font-medium">Gånger du friterar per år</span>
          <input
            type="number"
            min={1}
            max={500}
            step={1}
            inputMode="numeric"
            value={Number.isFinite(batches) ? batches : ""}
            onChange={(e) => setBatches(e.target.valueAsNumber)}
            className="themed-border w-full rounded-md bg-background px-3 py-2 tabular-nums"
          />
          <span className="text-xs text-muted-foreground">
            26 är varannan vecka, 52 varje vecka, 12 en gång i månaden.
          </span>
        </label>

        <label className="flex min-w-0 flex-col gap-1.5 text-sm">
          <span className="font-medium">Vad maskinen gör med oljan</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="themed-border w-full rounded-md bg-background px-3 py-2"
          >
            {FILTERING.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
          <span className="text-xs text-muted-foreground">
            {filtering(filter).hint}
          </span>
        </label>

        <label className="flex min-w-0 flex-col gap-1.5 text-sm">
          <span className="font-medium">Oljepris per liter</span>
          <input
            type="number"
            min={1}
            max={500}
            step={1}
            inputMode="numeric"
            value={Number.isFinite(price) ? price : ""}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            className="themed-border w-full rounded-md bg-background px-3 py-2 tabular-nums"
          />
          <span className="text-xs text-muted-foreground">
            30 kronor är rapsolja i femlitersdunk.
          </span>
        </label>
      </div>

      <div className="rounded-md bg-muted pad-card">
        <p className="text-sm text-muted-foreground">Olja per år</p>
        <p className="font-heading text-h2 text-brand tabular-nums">
          {result.costPerYear > 0
            ? `${numberFormat.format(result.costPerYear)} kr`
            : "–"}
        </p>
        {result.costPerYear > 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            {decimalFormat.format(result.litresPerYear)} liter fördelat på{" "}
            {decimalFormat.format(result.fillsPerYear)} oljebyten, alltså{" "}
            {decimalFormat.format(result.costPerBatch)} kronor varje gång du
            friterar.
          </p>
        ) : null}
        <p className="mt-2 text-sm text-muted-foreground">
          {costVerdict(result.costPerYear)}
        </p>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">
          Omgångar innan du byter olja: {interval}
        </span>
        <input
          type="range"
          min={BATCHES_PER_FILL_MIN}
          max={BATCHES_PER_FILL_MAX}
          step={1}
          value={interval}
          onChange={(e) => setInterval(e.target.valueAsNumber)}
          className="w-full"
        />
        <span className="text-xs text-muted-foreground">
          Med den filtrering du valt räknar vi med{" "}
          {decimalFormat.format(result.batchesPerFill)} omgångar per fyllning.
        </span>
      </label>

      <details className="text-sm text-muted-foreground">
        <summary className="cursor-pointer font-medium text-foreground">
          Varför sex omgångar per fyllning?
        </summary>
        <ul className="mt-2 flex flex-col gap-1">
          {PUBLISHED_ADVICE.map((a) => (
            <li key={a.source} className="flex justify-between gap-4">
              <span>{a.source}</span>
              <span className="tabular-nums">{a.advice}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2">
          Två oberoende led anger nästan samma sak, så räknaren utgår från sex
          och låter dig flytta talet. Skälet till att oljan måste bytas är att
          matrester samlas i fettet och ändrar smaken.
        </p>
      </details>

      <p className="text-xs text-muted-foreground">
        Bytesintervallet är hämtat hos Test-Achats och hos Tefal. Hur många
        extra omgångar ett filter ger är däremot vår uppskattning: ingen
        tillverkare och ingen provning anger det talet. Använd resultatet som en
        storleksordning när du väger två maskiner mot varandra, inte som en
        driftsbudget.
      </p>
    </div>
  );
}
