"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Standby draw of a smart bulb, in watts.
 *
 * 0,3 W is the middle of the range that independent measurements consistently
 * report for Wi-Fi and Zigbee bulbs (roughly 0,2–0,5 W). It is deliberately a
 * conservative default: we have seen a Swedish claim that standby accounts for
 * 20–70 % of a bulb's annual consumption, but the source does not respond and
 * we will not build a headline number on something we cannot check. What the
 * calculator shows is arithmetic on a figure we can stand behind.
 */
const STANDBY_W = 0.3;

/** Total consumer price per kWh incl. grid fee, tax and VAT. */
const DEFAULT_PRICE = 2;

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

  const n = (v: number, fallback = 0) => (Number.isFinite(v) ? v : fallback);
  const bulbs = Math.max(0, n(count));
  const onHours = Math.min(24, Math.max(0, n(hours)));
  const w = Math.max(0, n(watt));
  const standbyW = Math.max(0, n(standby, defaultStandby));
  const kwhPrice = Math.max(0, n(price));

  const onKwh = (bulbs * w * onHours * 365) / 1000;
  /* Standby runs for the hours the lamp is *not* lit. */
  const standbyKwh = (bulbs * standbyW * (24 - onHours) * 365) / 1000;
  const totalKwh = onKwh + standbyKwh;

  const standbyShare = totalKwh > 0 ? (standbyKwh / totalKwh) * 100 : 0;

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
          {kr.format(totalKwh * kwhPrice)}
        </p>

        <dl className="mt-3 flex flex-col gap-1 text-sm">
          <Row
            term={text.on}
            value={`${kr.format(onKwh * kwhPrice)} · ${onKwh.toFixed(0)} kWh`}
          />
          <Row
            term="I viloläge"
            value={`${krDetailed.format(standbyKwh * kwhPrice)} · ${standbyKwh.toFixed(1)} kWh`}
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
