"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  THRESHOLD_BANDS,
  RAMP_PRICES,
  decideThreshold,
  type ThresholdBandKey,
} from "@/lib/tool-logic/threshold";

/**
 * Klarar roboten din tröskel?
 *
 * Räkningen ligger i `lib/tool-logic/threshold.ts`, så widgeten och
 * agentverktyget svarar ur samma kod. Se den filen för var bandgränserna
 * kommer ifrån.
 *
 * ## Tystnad sorteras inte som ett ja
 *
 * Samma princip som i `EscapeLadderHeight`: en robot vars tillverkare inte
 * publicerar någon passerhöjd hamnar i en egen hög med skälet utskrivet, i
 * stället för att glida igenom som om den klarade allt. Annars hade verktyget
 * belönat den som skrivit minst, vilket är precis felet sidan handlar om.
 *
 * Verktyget säger därför aldrig att en robot *klarar* en tröskel. Det säger
 * vad tillverkaren *anger*.
 */

/** En rankad robot, med det verktyget behöver för att sortera. */
export type ThresholdOption = {
  id: string;
  brand: string;
  name: string;
  href: string;
  /** Passerhöjd tillverkaren själv anger, i mm. Null när ingen anges. */
  statedMm: number | null;
};

export function ThresholdPicker({
  options,
  className,
}: {
  options: ThresholdOption[];
  className?: string;
}) {
  const [band, setBand] = useState<ThresholdBandKey | null>(null);
  const verdict = decideThreshold(band);

  return (
    <div
      data-slot="threshold-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Hur hög är den högsta tröskeln roboten ska ta sig över?
        </legend>
        <div className="flex flex-wrap gap-2">
          {THRESHOLD_BANDS.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={band === o.key}
              onClick={() => setBand(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        {verdict ? (
          <>
            <p className="text-sm text-muted-foreground">Vad tröskeln betyder</p>
            <p className="font-heading text-h3 text-brand">{verdict.headline}</p>
            <p className="mt-3 text-sm">{verdict.body}</p>

            {verdict.warning ? (
              <p className="mt-3 text-sm font-medium">{verdict.warning}</p>
            ) : null}

            {verdict.needsStatedHeight ? (
              <Piles options={options} requiredMm={verdict.requiredMm} />
            ) : null}

            {verdict.suggestRamp ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Båda tillverkarna i toppen säljer en tröskelramp som tillbehör:{" "}
                {RAMP_PRICES.map(
                  (r, i) =>
                    `${r.brand} ${r.price} kr${i < RAMP_PRICES.length - 1 ? ", " : ""}`,
                )}
                . En ramp gör en enskild dörr farbar utan att du byter robot.
              </p>
            ) : null}

            <button
              type="button"
              onClick={() => setBand(null)}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Mät den högsta tröskeln mellan de rum roboten ska städa. Du får veta
            om höjden ligger inom det de flesta robotar klarar, och vilka av de
            rankade robotarna som publicerar en passerhöjd du kan jämföra med.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Att de flesta robotar klarar ungefär 1 till 2 centimeter är Ljud &amp;
        Bilds uppgift i deras köpguide. Passerhöjderna är tillverkarnas egna
        uppgifter, lästa 2026-08-04. Ingen anger vid vilken metod höjden är
        uppmätt, och ingen oberoende provning publicerar siffran, så talen är
        uppgifter och inte mätvärden. Vi har inte kört någon robot över någon
        tröskel.
      </p>
    </div>
  );
}

/**
 * Två högar: de som anger en tillräcklig höjd, och de som inte anger någon.
 *
 * Den som anger en höjd som är för låg hamnar i den första högen med sitt tal
 * utskrivet, så att läsaren ser skillnaden mellan "anger 40 mm" och "anger
 * ingenting" i stället för att båda ser ut som ett nej.
 */
function Piles({
  options,
  requiredMm,
}: {
  options: ThresholdOption[];
  requiredMm: number | null;
}) {
  const stated = options.filter((o) => o.statedMm !== null);
  const silent = options.filter((o) => o.statedMm === null);

  return (
    <div className="mt-4 flex flex-col gap-3">
      <div>
        <p className="text-sm font-medium">
          Anger en passerhöjd du kan jämföra med
        </p>
        {stated.length ? (
          <ul className="mt-1 flex flex-col gap-1">
            {stated.map((o) => (
              <li key={o.id} className="text-sm">
                <a
                  href={o.href}
                  className="underline-offset-4 hover:underline"
                >
                  {o.brand} {o.name}
                </a>
                <span className="text-muted-foreground">
                  {" "}
                  anger {o.statedMm} mm
                  {requiredMm !== null && (o.statedMm ?? 0) < requiredMm
                    ? ", alltså under din tröskel"
                    : ""}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">
            Ingen av de rankade robotarna publicerar någon passerhöjd.
          </p>
        )}
      </div>

      {silent.length ? (
        <div>
          <p className="text-sm font-medium">Anger ingen passerhöjd alls</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {silent.map((o) => `${o.brand} ${o.name}`).join(", ")}. Det betyder
            inte att de fastnar, bara att tillverkaren inte skriver ut något tal
            att jämföra med. En av dem marknadsförs uttryckligen för trösklar
            utan att ange någon höjd.
          </p>
        </div>
      ) : null}
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
