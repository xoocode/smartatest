"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Vad kostar det att lämna sitt hemlarm?
 *
 * ## Varför verktyget finns
 *
 * Varje jämförelse i kategorin räknar på vad det kostar att **vara** kund.
 * Ingen räknar på vad det kostar att **sluta** vara det, trots att det är den
 * kostnad som avgör om du sitter fast. Den består av tre delar som står på tre
 * olika ställen i avtalet:
 *
 * 1. Uppsägningstiden, alltså månader du betalar för utan att vilja.
 * 2. Friköpspriset, om du vill behålla hårdvaran och bolaget alls erbjuder det.
 * 3. Avgifter som utlöses om avslutet inte sköts på bolagets villkor.
 *
 * ## Varför den tredje delen redovisas separat
 *
 * En avgift du kan undvika hör inte hemma i en summa vi presenterar som
 * kostnad. Att lägga in Verisures återtagandeavgift på 7 000 kronor i totalen
 * hade gjort talet skrämmande och missvisande på samma gång. Den står därför
 * under strecket, med villkoret utskrivet.
 */

export type ExitOption = {
  id: string;
  provider: string;
  name: string;
  href: string;
  monthlyFee: number | null;
  noticeMonths: number | null;
  ownership: string;
  /** Friköpstrappan, äldst sist. `untilMonths: null` = allt därefter. */
  buyout: { untilMonths: number | null; price: number; label: string }[];
  conditionalFees: { label: string; amount: number | null; source: string }[];
  /** Bolagets egen brasklapp om vad friköpet ger, när en sådan finns. */
  buyoutNote?: string;
};

const YEARS = [
  { key: 1, label: "Mindre än 1 år", months: 6 },
  { key: 2, label: "1–2 år", months: 18 },
  { key: 3, label: "2–4 år", months: 36 },
  { key: 5, label: "4–5 år", months: 54 },
  { key: 6, label: "Mer än 5 år", months: 72 },
] as const;

const kr = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0,
});

function buyoutAt(
  option: ExitOption,
  months: number,
): { price: number; label: string } | null {
  if (!option.buyout.length) return null;
  for (const step of option.buyout) {
    if (step.untilMonths === null || months <= step.untilMonths) return step;
  }
  return option.buyout[option.buyout.length - 1];
}

export function AlarmExitCalculator({
  options,
  className,
}: {
  options: ExitOption[];
  className?: string;
}) {
  const [id, setId] = useState<string | null>(null);
  const [yearKey, setYearKey] = useState<number>(2);
  const [keep, setKeep] = useState(true);

  const option = id ? (options.find((o) => o.id === id) ?? null) : null;
  const period = YEARS.find((y) => y.key === yearKey)!;

  const notice =
    option && option.monthlyFee !== null && option.noticeMonths !== null
      ? option.monthlyFee * option.noticeMonths
      : null;

  const step = option ? buyoutAt(option, period.months) : null;
  const buyout = keep && step ? step.price : 0;
  const total = notice === null ? null : notice + buyout;

  return (
    <div
      data-slot="alarm-exit-calculator"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Vilket bolag har du?
        </legend>
        <div className="flex flex-wrap gap-2">
          {options.map((o) => (
            <Pill
              key={o.id}
              label={o.provider}
              active={id === o.id}
              onClick={() => setId(o.id)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Hur länge har du varit kund?
        </legend>
        <div className="flex flex-wrap gap-2">
          {YEARS.map((y) => (
            <Pill
              key={y.key}
              label={y.label}
              active={yearKey === y.key}
              onClick={() => setYearKey(y.key)}
            />
          ))}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        {!option ? (
          <p className="text-sm text-muted-foreground">
            Kostnaden att lämna består av uppsägningstiden plus, om du vill
            behålla utrustningen, ett friköpspris som beror på hur länge du
            varit kund. Välj bolag så räknar vi på de uppgifter bolaget själv
            publicerat.
          </p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Att lämna {option.provider} efter {period.label.toLowerCase()}
            </p>

            {total === null ? (
              <>
                <p className="font-heading text-h3 text-brand">
                  Går inte att räkna ut
                </p>
                <p className="mt-2 text-sm">
                  {option.provider} publicerar ingen månadsavgift, och
                  uppsägningstiden är den delen av kostnaden som består av just
                  månadsavgifter. Utan det talet blir varje summa en gissning,
                  och en gissning är sämre än ett tomt fält.
                </p>
                <p className="mt-2 text-sm">
                  Fråga bolaget vad månadsavgiften är och multiplicera med{" "}
                  {option.noticeMonths ?? "antalet"} månaders uppsägningstid.
                </p>
              </>
            ) : (
              <>
                <p className="font-heading text-h2 text-brand tabular-nums">
                  {kr.format(total)}
                </p>
                <dl className="mt-3 flex flex-col gap-1.5 text-sm">
                  <Row
                    term={`Uppsägningstid, ${option.noticeMonths} mån à ${kr.format(option.monthlyFee ?? 0)}`}
                    value={kr.format(notice ?? 0)}
                  />
                  {step ? (
                    <Row
                      term={`Friköp av utrustningen (${step.label})`}
                      value={keep ? kr.format(step.price) : "Väljs bort"}
                    />
                  ) : (
                    <Row
                      term="Friköp av utrustningen"
                      value={
                        option.ownership === "kunden"
                          ? "Behövs inte, du äger den"
                          : "Erbjuds inte"
                      }
                    />
                  )}
                </dl>
              </>
            )}

            {step ? (
              <label className="mt-3 flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={keep}
                  onChange={(e) => setKeep(e.target.checked)}
                  className="mt-0.5 size-4 accent-[var(--brand)]"
                />
                <span>
                  Jag vill behålla utrustningen
                  {option.buyoutNote ? (
                    <span className="block text-xs text-muted-foreground">
                      {option.buyoutNote}
                    </span>
                  ) : null}
                </span>
              </label>
            ) : null}

            {option.conditionalFees.length ? (
              <div className="mt-3 border-t border-border pt-3">
                <p className="text-sm font-medium">
                  Utöver det, om avslutet inte sköts på bolagets villkor
                </p>
                <ul className="mt-1.5 flex flex-col gap-1">
                  {option.conditionalFees.map((fee) => (
                    <li key={fee.label} className="text-sm">
                      <span className="font-medium tabular-nums">
                        {fee.amount === null
                          ? "Belopp anges inte"
                          : kr.format(fee.amount)}
                      </span>{" "}
                      <span className="text-muted-foreground">
                        {fee.label} ({fee.source})
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  De räknas inte in i summan ovan, eftersom du kan undvika dem.
                </p>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => {
                setId(null);
                setKeep(true);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Uppgifterna är hämtade ur bolagens publicerade avtalsvillkor och
        prissidor, lästa 3 augusti 2026, med utgåva och punktnummer angivna på
        sidan. Räknaren tar inte hänsyn till kampanjrabatter, tillval eller vad
        som står i ditt eget avtal. Ditt avtal går före allt vi visar här.
      </p>
    </div>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="tabular-nums">{value}</dd>
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
