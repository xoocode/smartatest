"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Larm utan abonnemang eller med? Femårskostnaden.
 *
 * ## Varför verktyget finns
 *
 * Sidans läsare står inför ett val mellan två saker som inte går att jämföra
 * på prislappen. Ett larmpaket kostar mellan 599 och 8 259 kronor en gång. Ett
 * abonnemangslarm kostar en startavgift plus en månadsavgift i all framtid.
 * Att ställa 2 899 mot 599 kronor i månaden säger ingenting förrän man valt en
 * tidshorisont.
 *
 * ## Varför fem år är förvalet och inte något annat
 *
 * Larmkollen publicerar femårskostnader per bolag, alltså är horisonten inte
 * något vi hittat på. Fem år är också där Verisures friköpstrappa når sin
 * botten, se /hemlarm. Reglaget går ändå från ett till tio år, eftersom svaret
 * vänder någonstans i det spannet för de flesta kombinationer.
 *
 * ## Vad räknaren medvetet inte gör
 *
 * Den räknar inte in någon prishöjning under perioden, trots att flera bolag
 * har villkor som tillåter en efter tolv månader. Skälet är att vi inte kan
 * läsa en publicerad procentsats någonstans, och en påhittad höjning hade sett
 * exakt lika trovärdig ut som en verklig.
 *
 * Den räknar inte heller in vad SIM-abonnemanget kostar för de paket som har
 * mobilnät. Samma skäl: ingen publicerad prisuppgift.
 *
 * Båda utelämnandena står utskrivna för läsaren under resultatet, eftersom en
 * tyst utelämning är en osanning som ser ut som en siffra.
 */

export type KitOption = {
  id: string;
  brand: string;
  name: string;
  price: number;
};

export type SubscriptionOption = {
  id: string;
  provider: string;
  /** null betyder att bolaget inte publicerar avgiften. Aldrig 0. */
  monthlyFee: number | null;
  startFee: number | null;
  note?: string;
};

const kr = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0,
});

const YEARS = [1, 2, 3, 5, 7, 10] as const;

export function FiveYearAlarmCost({
  kits,
  subscriptions,
  className,
}: {
  kits: KitOption[];
  subscriptions: SubscriptionOption[];
  className?: string;
}) {
  const [kitId, setKitId] = useState<string>(kits[0]?.id ?? "");
  const [subId, setSubId] = useState<string>(subscriptions[0]?.id ?? "");
  const [years, setYears] = useState<number>(5);

  const kit = kits.find((k) => k.id === kitId) ?? null;
  const sub = subscriptions.find((s) => s.id === subId) ?? null;
  const months = years * 12;

  const kitTotal = kit ? kit.price : null;
  const subTotal =
    sub && sub.monthlyFee !== null && sub.startFee !== null
      ? sub.startFee + sub.monthlyFee * months
      : null;

  const diff =
    kitTotal !== null && subTotal !== null ? subTotal - kitTotal : null;

  /* Månaden då abonnemanget passerar engångsköpet. Räknas bara när båda
     talen finns, och redovisas i år och månader eftersom "brytpunkt 4,2 år"
     är svårare att ta till sig än "efter 4 år och 2 månader". */
  const breakEven =
    kit && sub && sub.monthlyFee !== null && sub.startFee !== null && sub.monthlyFee > 0
      ? Math.max(0, Math.ceil((kit.price - sub.startFee) / sub.monthlyFee))
      : null;

  return (
    <div
      data-slot="five-year-alarm-cost"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Vilket larm utan abonnemang?
        </legend>
        <div className="flex flex-wrap gap-2">
          {kits.map((k) => (
            <Pill
              key={k.id}
              label={`${k.brand} ${kr.format(k.price)}`}
              active={kitId === k.id}
              onClick={() => setKitId(k.id)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Jämför med vilket abonnemangslarm?
        </legend>
        <div className="flex flex-wrap gap-2">
          {subscriptions.map((s) => (
            <Pill
              key={s.id}
              label={s.provider}
              active={subId === s.id}
              onClick={() => setSubId(s.id)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Hur länge tänker du ha larmet?
        </legend>
        <div className="flex flex-wrap gap-2">
          {YEARS.map((y) => (
            <Pill
              key={y}
              label={y === 1 ? "1 år" : `${y} år`}
              active={years === y}
              onClick={() => setYears(y)}
            />
          ))}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        {subTotal === null ? (
          <>
            <p className="font-heading text-h3 text-brand">
              Går inte att räkna ut
            </p>
            <p className="mt-2 text-sm">
              {sub?.provider} publicerar inte både månadsavgift och startavgift
              på sin egen sida. Utan båda talen blir varje summa en gissning,
              och en gissning är sämre än ett tomt fält.
            </p>
            {sub?.note ? (
              <p className="mt-2 text-sm text-muted-foreground">{sub.note}</p>
            ) : null}
            <p className="mt-2 text-sm">
              Ditt larm utan abonnemang kostar {kr.format(kit?.price ?? 0)}, en
              gång, oavsett hur länge du har det.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Efter {years} {years === 1 ? "år" : "år"}
            </p>
            <p className="font-heading text-h2 text-brand tabular-nums">
              {diff !== null && diff > 0
                ? `${kr.format(diff)} mer för abonnemanget`
                : `${kr.format(Math.abs(diff ?? 0))} mer för engångsköpet`}
            </p>

            <dl className="mt-3 flex flex-col gap-1.5 text-sm">
              <Row
                term={`${kit?.brand} ${kit?.name}, engångsköp`}
                value={kr.format(kitTotal ?? 0)}
              />
              <Row
                term={`${sub?.provider}, startavgift`}
                value={kr.format(sub?.startFee ?? 0)}
              />
              <Row
                term={`${sub?.provider}, ${months} mån à ${kr.format(sub?.monthlyFee ?? 0)}`}
                value={kr.format((sub?.monthlyFee ?? 0) * months)}
              />
              <div className="mt-1 border-t border-border pt-1.5">
                <Row
                  term={`${sub?.provider} totalt`}
                  value={kr.format(subTotal)}
                />
              </div>
            </dl>

            {breakEven !== null ? (
              <p className="mt-3 text-sm">
                {breakEven <= 0 ? (
                  <>
                    Abonnemanget är dyrare från första månaden, eftersom bara
                    startavgiften överstiger vad larmpaketet kostar.
                  </>
                ) : (
                  <>
                    Abonnemanget passerar engångsköpet efter{" "}
                    <strong>
                      {Math.floor(breakEven / 12) > 0
                        ? `${Math.floor(breakEven / 12)} år och ${breakEven % 12} mån`
                        : `${breakEven} mån`}
                    </strong>
                    . Det du får för pengarna efter det är att någon annan
                    tittar.
                  </>
                )}
              </p>
            ) : null}

            {sub?.note ? (
              <p className="mt-2 text-sm text-muted-foreground">{sub.note}</p>
            ) : null}
          </>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Priserna på larmpaketen är lästa hos butiken 3 augusti 2026.
        Abonnemangsavgifterna är lästa på bolagets egen sida samma dag, och där
        ett bolag inte publicerar både månadsavgift och startavgift räknar vi
        inte. Summan tar inte hänsyn till prishöjningar under perioden, trots
        att flera bolag har villkor som tillåter en efter tolv månader, eftersom
        ingen publicerar någon procentsats. Den räknar inte heller in vad
        SIM-abonnemanget kostar för de paket som har mobilnät. Räkna alltså det
        här som ett golv för abonnemangets kostnad, inte som ett tak.
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
          ? "border-brand bg-brand text-brand-foreground"
          : "bg-card hover:bg-muted",
      )}
    >
      {label}
    </button>
  );
}
