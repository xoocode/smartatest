"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  DEFAULT_PRICE,
  STANDBY_W,
  runningCost,
} from "@/lib/tool-logic/running-cost";

/* Viloförbrukningen, elpriset och räkningen bor i
   lib/tool-logic/running-cost.ts, där agentverktygen för lampor, uttag och
   julbelysning anropar samma funktion. */

const kr = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0,
});
const krDetailed = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 2,
});

/**
 * Every label the calculator renders, so a second category can reuse the
 * component without the copy reading as if it were about lamps.
 */
type Labels = {
  count: string;
  hours: string;
  watt: string;
  standby: string;
  /** Row term for the share of cost spent actually running. */
  on: string;
};

const BULB_LABELS: Labels = {
  count: "Antal lampor",
  hours: "Timmar tända per dygn",
  watt: "Effekt per lampa (W)",
  standby: "Viloförbrukning per lampa (W)",
  on: "När lamporna lyser",
};

const BULB_NOTE =
  "Räknat på 0,3 W i viloläge per lampa, vilket ligger mitt i det intervall oberoende mätningar rapporterar. Viloläget kostar sällan mycket i kronor, men andelen växer ju mindre du använder lampan.";

export type RunningCostCalculatorProps = {
  /** Default bulb wattage. Categories other than lighting override this. */
  defaultWatt?: number;
  /** How many units to start with. */
  defaultCount?: number;
  /** Hours per day the load is drawing `watt`. */
  defaultHours?: number;
  /** Upper guard on the wattage field. A bulb is not 3 000 W; an element is. */
  maxWatt?: number;
  /**
   * Standby draw per unit in watts.
   *
   * For bulbs this is a constant we are confident about. For smart plugs it is
   * the whole point: published figures run from 0,3 W to 1,48 W, a five-fold
   * spread, which is why `editableStandby` exists.
   */
  defaultStandby?: number;
  /** Expose standby as an input. Turn on where it differs between products. */
  editableStandby?: boolean;
  labels?: Partial<Labels>;
  /** Footnote under the result. Must describe the standby figure actually used. */
  standbyNote?: string;
  className?: string;
};

export function RunningCostCalculator({
  defaultWatt = 9,
  defaultCount = 8,
  defaultHours = 4,
  maxWatt = 100,
  defaultStandby = STANDBY_W,
  editableStandby = false,
  labels,
  standbyNote = BULB_NOTE,
  className,
}: RunningCostCalculatorProps) {
  const text = { ...BULB_LABELS, ...labels };
  const [count, setCount] = useState(defaultCount);
  const [hours, setHours] = useState(defaultHours);
  const [watt, setWatt] = useState(defaultWatt);
  const [standby, setStandby] = useState(defaultStandby);
  const [price, setPrice] = useState(DEFAULT_PRICE);

  const { onKwh, standbyKwh, standbyShare, onCost, standbyCost, totalCost } =
    runningCost({
      count,
      hours,
      watt,
      /* Tomt fält faller tillbaka på utgångsvärdet i stället för på noll: en
         viloförbrukning som försvinner medan man skriver ser ut som ett
         resultat, inte som ett halvfärdigt formulär. */
      standby: Number.isFinite(standby) ? standby : defaultStandby,
      price,
    });

  return (
    <div
      data-slot="running-cost-calculator"
      className={cn("flex flex-col gap-row", className)}
    >
      <div className="grid gap-row sm:grid-cols-2">
        <Field
          label={text.count}
          value={count}
          onChange={setCount}
          min={1}
          max={200}
        />
        <Field
          label={text.hours}
          value={hours}
          onChange={setHours}
          min={0}
          max={24}
        />
        <Field
          label={text.watt}
          value={watt}
          onChange={setWatt}
          min={1}
          max={maxWatt}
        />
        {editableStandby ? (
          <Field
            label={text.standby}
            value={standby}
            onChange={setStandby}
            min={0}
            max={10}
            step={0.01}
          />
        ) : null}
        <Field
          label="Elpris (kr/kWh)"
          value={price}
          onChange={setPrice}
          min={0}
          max={10}
          step={0.1}
        />
      </div>

      <div className="rounded-md bg-muted pad-card">
        <p className="text-sm text-muted-foreground">Total elkostnad per år</p>
        <p className="font-heading text-h2 text-brand tabular-nums">
          {kr.format(totalCost)}
        </p>

        <dl className="mt-3 flex flex-col gap-1 text-sm">
          <Row
            term={text.on}
            value={`${kr.format(onCost)} · ${onKwh.toFixed(0)} kWh`}
          />
          <Row
            term="I viloläge"
            value={`${krDetailed.format(standbyCost)} · ${standbyKwh.toFixed(1)} kWh`}
          />
          <Row
            term="Viloläget är"
            value={`${standbyShare.toFixed(0)} % av förbrukningen`}
          />
        </dl>
      </div>

      <p className="text-xs text-muted-foreground">{standbyNote}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.valueAsNumber)}
        className="themed-border rounded-md bg-background px-3 py-2 tabular-nums"
      />
    </label>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
