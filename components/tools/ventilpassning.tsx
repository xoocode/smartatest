"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  FATTNINGAR,
  VENTILTYPER,
  bedomPassning,
  type FattningKey,
  type Traff,
  type VentiltypKey,
} from "@/lib/tool-logic/ventilpassning";

/**
 * Vilken radiatortermostat passar min ventil?
 *
 * Bedömningen ligger i `lib/tool-logic/ventilpassning.ts`, så widgeten och ett
 * eventuellt agentverktyg svarar ur samma kod.
 *
 * ## Verktyget har tre svar, inte två
 *
 * Passar, säljs separat och säger ingenting är tre olika saker, och den sista
 * är den som gör verktyget ärligt. SONOFF namnger bara gängan och Fibaro
 * namnger ingenting alls, och att sortera dem som ett ja vore att gissa åt
 * tillverkaren. Tystnaden ligger därför i en egen lista med egen rubrik, inte
 * bortsorterad och inte omskriven till ett nej.
 *
 * Verktyget rekommenderar aldrig en produkt och nämner aldrig ett pris.
 */
export function Ventilpassning({ className }: { className?: string }) {
  const [ventiltyp, setVentiltyp] = useState<VentiltypKey | null>(null);
  const [fattning, setFattning] = useState<FattningKey | null>(null);

  const svar = bedomPassning(ventiltyp, fattning);
  const visaFattning = ventiltyp === "termostat";

  return (
    <div data-slot="ventilpassning" className={cn("flex flex-col gap-row", className)}>
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Vad sitter på elementet i dag?
        </legend>
        <div className="flex flex-wrap gap-2">
          {VENTILTYPER.map((v) => (
            <Pill
              key={v.key}
              label={v.label}
              title={v.hjalp}
              active={ventiltyp === v.key}
              onClick={() => {
                setVentiltyp(v.key);
                if (v.key !== "termostat") setFattning(null);
              }}
            />
          ))}
        </div>
      </fieldset>

      {visaFattning ? (
        <fieldset>
          <legend className="mb-2.5 text-sm font-medium">
            Vad står på ventilkroppen under vredet?
          </legend>
          <div className="flex flex-wrap gap-2">
            {FATTNINGAR.map((f) => (
              <Pill
                key={f.key}
                label={f.label}
                title={f.hjalp}
                active={fattning === f.key}
                onClick={() => setFattning(f.key)}
              />
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="rounded-md bg-muted pad-card">
        {svar ? (
          <>
            <p className="text-sm text-muted-foreground">Vad tillverkarna anger</p>
            <p className="font-heading text-h3 text-brand">{svar.rubrik}</p>
            <p className="mt-3 text-sm">{svar.text}</p>

            {svar.stopp ? (
              <p className="mt-3 text-sm font-medium">{svar.stopp}</p>
            ) : null}
            {svar.nastaSteg ? (
              <p className="mt-3 text-sm font-medium">{svar.nastaSteg}</p>
            ) : null}

            <Lista
              rubrik="Tillverkaren anger att den passar"
              poster={svar.passar}
            />
            <Lista
              rubrik="Passar, men adaptern säljs separat"
              poster={svar.tillval}
            />
            <Lista
              rubrik="Tillverkaren anger att adaptern inte levereras"
              poster={svar.passarInte}
            />
            <Lista
              rubrik="Säger ingenting om just den här fattningen"
              poster={svar.tyst}
            />

            <button
              type="button"
              onClick={() => {
                setVentiltyp(null);
                setFattning(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Skruva loss vredet som sitter på elementet i dag, för hand eller med
            en tång. Det läcker inte vatten. Läs vad som står på ventilkroppen
            under och välj här, så får du veta vilka av de elva termostaterna
            som säger att de passar, vilka som säljer adaptern separat och vilka
            som inte publicerar någon uppgift alls.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Uppgifterna är tillverkarnas egna, lästa 2026-08-04 på produktsidor och
        i hjälpcenter, aldrig i en butiksrubrik. Vi har inte monterat någon
        termostat och inte provat någon adapter. Att en tillverkare inte
        namnger en fattning betyder inte att den saknar adapter, bara att du
        inte kan kontrollera det före köpet. Sitter en adapter löst kan
        termostaten falla av med värmen påslagen, vilket en av Ljud &amp; Bilds
        testare beskriver att den gjort med medföljande plastadaptrar.
      </p>
    </div>
  );
}

function Lista({ rubrik, poster }: { rubrik: string; poster: Traff[] }) {
  if (!poster.length) return null;
  return (
    <div className="mt-4">
      <p className="text-sm font-medium">
        {rubrik} <span className="text-muted-foreground">({poster.length})</span>
      </p>
      <ul className="mt-1 flex flex-col gap-1">
        {poster.map((p) => (
          <li key={p.id} className="text-sm">
            <span className="font-medium">{p.namn}</span>
            <span className="text-muted-foreground">, {p.kalla}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pill({
  label,
  title,
  active,
  onClick,
}: {
  label: string;
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
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
