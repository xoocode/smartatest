"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  GRANSER,
  TOLERANSER,
  tolkaAvlasning,
  type ToleransKey,
} from "@/lib/tool-logic/fuktavlasning";

/**
 * Vad betyder talet på hygrometern?
 *
 * Räkningen ligger i `lib/tool-logic/fuktavlasning.ts`, så widgeten och
 * agentverktyget svarar ur samma kod. Se den filen för var gränserna kommer
 * ifrån.
 *
 * ## Verktyget vägrar svara när talet inte bär
 *
 * Samma princip som tröskelväljaren: tystnad sorteras inte som ett ja. Ligger
 * spannet över en gräns i ena änden och under i den andra säger verktyget att
 * avläsningen inte räcker, i stället för att avrunda åt något håll. Det är
 * hela skälet till att det finns, och det är också det enda ärliga svaret när
 * felmarginalen är bredare än avståndet mellan gränserna.
 *
 * Verktyget rekommenderar aldrig en produkt och nämner aldrig ett pris.
 */
export function Fuktavlasning({ className }: { className?: string }) {
  const [avlast, setAvlast] = useState<string>("");
  const [tolerans, setTolerans] = useState<ToleransKey | null>(null);

  const tal = avlast.trim() === "" ? null : Number(avlast.replace(",", "."));
  const svar = tolkaAvlasning(tal === null || Number.isNaN(tal) ? null : tal, tolerans);

  return (
    <div data-slot="fuktavlasning" className={cn("flex flex-col gap-row", className)}>
      <div className="flex flex-col gap-row sm:flex-row sm:gap-4">
        <div className="sm:w-44">
          <label htmlFor="fukt-avlast" className="mb-2.5 block text-sm font-medium">
            Vad visar mätaren?
          </label>
          <div className="flex items-center gap-2">
            <input
              id="fukt-avlast"
              type="number"
              inputMode="numeric"
              min={0}
              max={100}
              value={avlast}
              onChange={(e) => setAvlast(e.target.value)}
              placeholder="58"
              className="themed-border w-24 rounded-md bg-card px-3 py-1.5 text-sm"
            />
            <span className="text-sm text-muted-foreground">procent</span>
          </div>
        </div>

        <fieldset className="flex-1">
          {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
              pålitligt i förälderns flex-flöde. */}
          <legend className="mb-2.5 text-sm font-medium">
            Vilken noggrannhet anger tillverkaren?
          </legend>
          <div className="flex flex-wrap gap-2">
            {TOLERANSER.map((t) => (
              <Pill
                key={t.key}
                label={t.label}
                active={tolerans === t.key}
                onClick={() => setTolerans(t.key)}
              />
            ))}
          </div>
        </fieldset>
      </div>

      <div className="rounded-md bg-muted pad-card">
        {svar ? (
          <>
            <p className="text-sm text-muted-foreground">Vad talet betyder</p>
            <p className="font-heading text-h3 text-brand">{svar.rubrik}</p>
            <p className="mt-3 text-sm">{svar.text}</p>

            {svar.varning ? (
              <p className="mt-3 text-sm font-medium">{svar.varning}</p>
            ) : null}

            {svar.oavgjorda.length ? (
              <div className="mt-4">
                <p className="text-sm font-medium">Gränser avläsningen inte kan avgöra</p>
                <ul className="mt-1 flex flex-col gap-1">
                  {svar.oavgjorda.map((g) => (
                    <li key={g.varde} className="text-sm">
                      <span className="font-medium">{g.varde} procent</span>
                      <span className="text-muted-foreground">, {g.kalla}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {svar.passerade.length ? (
              <div className="mt-4">
                <p className="text-sm font-medium">Gränser hela spannet ligger över</p>
                <ul className="mt-1 flex flex-col gap-1">
                  {svar.passerade.map((g) => (
                    <li key={g.varde} className="text-sm">
                      <span className="font-medium">{g.varde} procent</span>
                      <span className="text-muted-foreground">, {g.kalla}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => {
                setAvlast("");
                setTolerans(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Skriv in det mätaren visar och välj den noggrannhet tillverkaren
            anger. Står det ingen noggrannhet någonstans är det det vanliga
            fallet, och det finns ett val för det. Du får veta vilket spann
            avläsningen egentligen betyder, och vilka av gränserna {GRANSER.map(
              (g, i) => `${g.varde}${i < GRANSER.length - 1 ? ", " : " "}`,
            )}
            procent den kan avgöra.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        45 procent är Folkhälsomyndighetens allmänna råd FoHMFS 2014:14, som
        anger 7 g vatten per kg torr luft under eldningssäsongen, vilket
        motsvarar cirka 45 procent vid 21 grader. Allmänna råd är
        rekommendationer och inte bindande regler, och 45 procent är en
        indikation och inget gränsvärde. Kvalstergränsen är SweSIAQ:s uppgift.
        Toleranserna är tillverkarnas egna, lästa 2026-08-04. Vi har inte mätt
        luftfuktigheten i något hem.
      </p>
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
