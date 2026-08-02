"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Recommended illuminance per room, expressed as lumens per square metre.
 *
 * These are general-lighting figures, not task lighting. A kitchen worktop or a
 * desk wants a dedicated lamp on top of this, which is why the ranges stop
 * where they do rather than trying to cover both in one number.
 */
const ROOMS = [
  { key: "vardagsrum", label: "Vardagsrum", min: 100, max: 150 },
  { key: "kok", label: "Kök", min: 250, max: 300 },
  { key: "sovrum", label: "Sovrum", min: 100, max: 150 },
  { key: "arbetsrum", label: "Arbetsrum", min: 250, max: 300 },
  { key: "badrum", label: "Badrum", min: 200, max: 250 },
  { key: "hall", label: "Hall", min: 100, max: 150 },
] as const;

/** Common bulb outputs, for translating a total into a number of lamps. */
const BULB_OUTPUTS = [470, 806, 1055, 1100, 1521];

const numberFormat = new Intl.NumberFormat("sv-SE");

export type LumenCalculatorProps = {
  className?: string;
};

export function LumenCalculator({ className }: LumenCalculatorProps) {
  const [room, setRoom] = useState<string>(ROOMS[0].key);
  const [area, setArea] = useState(20);

  const selected = ROOMS.find((r) => r.key === room) ?? ROOMS[0];
  const safeArea = Number.isFinite(area) && area > 0 ? area : 0;
  const min = Math.round(selected.min * safeArea);
  const max = Math.round(selected.max * safeArea);

  /* Round up: a room that lands between two lamps is under-lit, not over-lit. */
  const lampCount = (output: number) =>
    safeArea ? Math.ceil(min / output) : 0;

  return (
    <div
      data-slot="lumen-calculator"
      className={cn("flex flex-col gap-row", className)}
    >
      <div className="grid gap-row sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Rum</span>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="themed-border rounded-md bg-background px-3 py-2"
          >
            {ROOMS.map((r) => (
              <option key={r.key} value={r.key}>
                {r.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Yta i kvadratmeter</span>
          <input
            type="number"
            min={1}
            max={200}
            inputMode="numeric"
            value={area}
            onChange={(e) => setArea(e.target.valueAsNumber)}
            className="themed-border rounded-md bg-background px-3 py-2 tabular-nums"
          />
        </label>
      </div>

      <div className="rounded-md bg-muted pad-card">
        <p className="text-sm text-muted-foreground">
          Rekommenderat ljusflöde totalt
        </p>
        <p className="font-heading text-h2 text-brand tabular-nums">
          {safeArea
            ? `${numberFormat.format(min)}–${numberFormat.format(max)} lm`
            : "–"}
        </p>
        {safeArea ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Det motsvarar {lampCount(806)} lampor på 806 lm, eller{" "}
            {lampCount(1100)} på 1 100 lm. Fördela dem på flera ljuspunkter
            hellre än en stark i taket.
          </p>
        ) : null}
      </div>

      <details className="text-sm text-muted-foreground">
        <summary className="cursor-pointer font-medium text-foreground">
          Fler lampstorlekar
        </summary>
        <ul className="mt-2 flex flex-col gap-1">
          {BULB_OUTPUTS.map((output) => (
            <li key={output} className="flex justify-between gap-4">
              <span>{numberFormat.format(output)} lm per lampa</span>
              <span className="tabular-nums">
                {safeArea ? `${lampCount(output)} st` : "–"}
              </span>
            </li>
          ))}
        </ul>
      </details>

      <p className="text-xs text-muted-foreground">
        Siffrorna gäller allmänbelysning. Arbetsytor i kök och vid skrivbord
        behöver egen belysning utöver detta.
      </p>
    </div>
  );
}
