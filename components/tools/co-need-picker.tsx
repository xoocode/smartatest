"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  CO_PLACES as PLACES,
  CO_SOURCES as SOURCES,
  decideCoNeed as decide,
  type CoPlaceKey as PlaceKey,
  type CoNeedVerdict as Verdict,
  type CoSourceKey as SourceKey,
} from "@/lib/tool-logic/co-need";

/**
 * Behöver du en kolmonoxidvarnare, och i så fall vilken del av standarden?
 *
 * Kategorispecifikt verktyg. Det finns eftersom sidan tagit ställning till att
 * många svenska hem **inte** behöver produkten, och ett påstående av det slaget
 * ska vara möjligt att pröva mot sin egen bostad i stället för att bara stå i
 * löptext.
 *
 * Två frågor och två svar:
 *
 * 1. **Behövs en varnare?** Kolmonoxid bildas vid ofullständig förbränning.
 *    Utan förbränningskälla i eller intill bostaden finns ingen källa, och då
 *    larmar varnaren aldrig. Undantaget är delad skorstensstock, som är en egen
 *    knapp eftersom ingen tänker på den.
 * 2. **Vilken del av EN 50291?** Del 2 krävs för husvagn, husbil och båt.
 *    Väljer användaren fordon filtreras träfflistan hårt, eftersom bara två av
 *    de sex varnare vi rankar anger del 2 i gällande utgåva.
 *
 * Träfflistan visar bara produkter som **uppfyller kravet**, inte de högst
 * rankade. Att föreslå testvinnaren till någon som ska ha varnaren i en båt
 * vore fel om vinnaren saknade del 2. Här råkar den ha den, men regeln ska
 * ändå vara rätt skriven, eftersom sortimentet ändras.
 */

/* Källorna, platserna och regeluppsättningen bor i lib/tool-logic/co-need.ts,
   där agentverktyget anropar samma decideCoNeed(). Produkturvalet stannar här:
   modulen känner inte till någon produkt, bara kriteriet needsPart2. */

/** En varnare ur vår rankning, med det verktyget behöver för att filtrera. */
export type CoPickerProduct = {
  id: string;
  brand: string;
  name: string;
  price: string;
  priceValue: number;
  href: string;
  /** Butiken anger del 2 i gällande utgåva, alltså godkänd för fordon. */
  part2Current: boolean;
  /** Butiken anger del 1 i gällande utgåva. */
  part1Current: boolean;
  /** Kort etikett för vad butiken faktiskt anger. */
  certLabel: string;
};

export function CoNeedPicker({
  products,
  className,
}: {
  products: CoPickerProduct[];
  className?: string;
}) {
  const [sources, setSources] = useState<SourceKey[]>([]);
  const [place, setPlace] = useState<PlaceKey | null>(null);

  const verdict = decide(sources, place);

  const toggle = (key: SourceKey) =>
    setSources((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  return (
    <div
      data-slot="co-need-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Vad förbränns i eller intill bostaden? Välj alla som stämmer.
        </legend>
        <div className="flex flex-wrap gap-2">
          {SOURCES.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={sources.includes(o.key)}
              onClick={() => toggle(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Var ska varnaren sitta?
        </legend>
        <div className="flex flex-wrap gap-2">
          {PLACES.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={place === o.key}
              onClick={() => setPlace(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        {verdict ? (
          <>
            <p className="text-sm text-muted-foreground">
              Behöver du en kolmonoxidvarnare?
            </p>
            <p className="font-heading text-h3 text-brand">
              {verdict.headline}
            </p>

            <p className="mt-3 text-sm">{verdict.why}</p>

            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Placering: </span>
              {verdict.placement}
            </p>

            <Matches verdict={verdict} products={products} />

            <button
              type="button"
              onClick={() => {
                setSources([]);
                setPlace(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Välj var varnaren ska sitta, så får du veta om du behöver en och
            vilken del av EN 50291 den i så fall måste ange.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Riskkällorna följer räddningstjänsternas och myndighetens beskrivning av
        var kolmonoxid uppstår. Guiden avgör inte om just din panna eller
        kamin är i skick, bara om det finns något som kan bilda gasen. Vi har
        inte provat någon varnare.
      </p>
    </div>
  );
}

/**
 * Vilka av de rankade varnarna som uppfyller kravet.
 *
 * Filtrerar på vad butiken anger, aldrig på rankning. Kräver svaret del 2 ska
 * listan bara innehålla varnare som anger del 2 i gällande utgåva, även om det
 * innebär att testvinnaren faller bort.
 */
function Matches({
  verdict,
  products,
}: {
  verdict: Verdict;
  products: CoPickerProduct[];
}) {
  if (verdict.noSource || !products.length) return null;

  const ok = products.filter((p) =>
    verdict.needsPart2 ? p.part2Current : p.part1Current || p.part2Current,
  );

  if (!ok.length) {
    return (
      <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
        Ingen av varnarna vi rankat anger den del av standarden som krävs här.
        Se Andra produkter vi övervägde.
      </p>
    );
  }

  /* Kopia innan sort: products är en prop och får inte muteras. */
  const sorted = [...ok].sort((a, b) => a.priceValue - b.priceValue);

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {verdict.needsPart2
          ? `${sorted.length} av ${products.length} varnare vi rankat anger del 2`
          : `${sorted.length} av ${products.length} varnare vi rankat duger`}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Billigast först, inte högst betyg först. Frågan här är vad som räcker.
      </p>
      <ul className="mt-2 flex flex-col gap-1.5 text-sm">
        {sorted.map((p) => (
          <li key={p.id} className="flex flex-wrap items-baseline gap-x-2">
            {/* Full sökväg och inte bara ankaret: verktyget renderas både på
                kategorisidan och på sin egen sida under /guider. */}
            <a
              href={p.href}
              className="font-medium underline decoration-dotted underline-offset-4 hover:decoration-solid"
            >
              {p.brand} {p.name}
            </a>
            <span className="text-muted-foreground">
              {p.certLabel} · {p.price}
            </span>
          </li>
        ))}
      </ul>
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
