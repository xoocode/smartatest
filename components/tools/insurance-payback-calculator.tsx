"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  DEFAULT_COST,
  DEFAULT_DISCOUNT,
  EXCESS_HIGH,
  EXCESS_LOW,
  insurancePayback,
} from "@/lib/tool-logic/insurance-payback";

/**
 * Räknar ut hur lång tid försäkringsrabatten behöver för att betala en
 * vattenfelsbrytare.
 *
 * ## Varför den finns
 *
 * Det är kategorins enda beslut som faktiskt går att räkna på, och ingen
 * svensk sida räknar det. Länsförsäkringar och Folksam ger båda tio procents
 * rabatt på villaförsäkringen för en godkänd vattenfelsbrytare, och
 * Länsförsäkringar anger själva att en sådan kostar 6 000 till 10 000 kronor
 * installerad. Tio procent av en normal villapremie är några hundralappar om
 * året, vilket betyder att återbetalningstiden ofta blir tjugo år eller mer.
 *
 * Verktyget svarar därför oftast **nej**, och det är hela poängen. En
 * jämförelsesajt som bara säger ja säljer inget förtroende.
 *
 * ## Varför rabatten inte är hela svaret
 *
 * Räknaren visar också vad en undviken skada är värd, eftersom det är där den
 * verkliga besparingen finns. Vattenskadecentrum anger självrisken till mellan
 * 3 440 och 10 000 kronor per skada och åldersavdraget till 9 700 till 26 100.
 * En enda undviken skada kan alltså vara värd mer än trettio års rabatt.
 *
 * Det är en sannolikhetsfråga vi inte kan räkna åt läsaren, och därför visas
 * den som en jämförelse och inte som ett resultat. Att bygga en
 * "förväntad besparing" på en påhittad skadefrekvens vore precis den sortens
 * uppfunna tal vi inte publicerar.
 *
 * ## Namnet
 *
 * Sluggen är `aterbetalning-vattenfelsbrytare` och inte `aterbetalning`.
 * Samma regel som gav `elkostnad-lampor` sitt suffix: dagen vi räknar
 * återbetalning på solceller eller värmepump skulle en naken slug behöva byta
 * URL och tappa det den rankat på.
 */

/* Konstanterna och räkningen bor i lib/tool-logic/insurance-payback.ts, så att
   agentverktyget svarar med samma tal som widgeten visar. */

const kr = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0,
});

export type InsurancePaybackCalculatorProps = {
  className?: string;
};

export function InsurancePaybackCalculator({
  className,
}: InsurancePaybackCalculatorProps) {
  const [premium, setPremium] = useState(5000);
  const [discount, setDiscount] = useState(DEFAULT_DISCOUNT);
  const [cost, setCost] = useState(DEFAULT_COST);

  const { yearly, years, verdict } = insurancePayback(premium, discount, cost);

  return (
    <div
      data-slot="insurance-payback-calculator"
      className={cn("flex flex-col gap-row", className)}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Field
          label="Villapremie per år"
          value={premium}
          onChange={setPremium}
          min={0}
          max={50000}
          step={100}
        />
        <Field
          label="Rabatt i procent"
          value={discount}
          onChange={setDiscount}
          min={0}
          max={50}
        />
        <Field
          label="Vattenfelsbrytare installerad"
          value={cost}
          onChange={setCost}
          min={0}
          max={30000}
          step={500}
        />
      </div>

      <div className="rounded-md bg-muted pad-card">
        <p className="text-sm text-muted-foreground">Återbetalningstid</p>
        <p className="font-heading text-h3 text-brand">
          {years === Infinity
            ? "Går inte att räkna"
            : years >= 100
              ? "Över 100 år"
              : `${years.toFixed(years < 10 ? 1 : 0)} år`}
        </p>

        <dl className="mt-3 flex flex-col gap-1 text-sm">
          <Row term="Rabatt per år" value={kr.format(yearly)} />
          <Row term="Rabatt på tio år" value={kr.format(yearly * 10)} />
          <Row
            term="Självrisk vid en skada"
            value={`${kr.format(EXCESS_LOW)} till ${kr.format(EXCESS_HIGH)}`}
          />
        </dl>

        <p className="mt-3 text-sm">{verdict}</p>

        <p className="mt-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Att veta: </span>
          rabatten kräver en godkänd vattenfelsbrytare, alltså inte ett
          vattenlarm. Folksam kräver dessutom underlägg under vitvaror och
          diskbänk. Ett vattenlarm sänker inte premien alls, men kan mycket väl
          spara dig självrisken ovan.
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        Rabattsatserna är hämtade från Länsförsäkringars och Folksams egna
        sidor 2026-08-02 och låg då på tio procent hos båda. Villkoren sätts av
        respektive bolag och för Länsförsäkringars del av varje länsbolag, så
        kontrollera vad som gäller för just din försäkring innan du beställer.
      </p>
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
        value={Number.isFinite(value) ? value : ""}
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
      <dd className="text-right tabular-nums">{value}</dd>
    </div>
  );
}
