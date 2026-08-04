"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  FIRE_FLOORS as FLOORS,
  FIRE_HOMES as HOME,
  FIRE_KITCHENS as KITCHEN,
  fireKitPlan,
  type FireFloorKey as FloorKey,
  type FireHomeKey as HomeKey,
  type FireKitchenKey as KitchenKey,
} from "@/lib/tool-logic/fire-kit";

/**
 * Vad ett hem faktiskt behöver i brandskydd, och vad det kostar.
 *
 * Kategorispecifikt verktyg, inte layout. Det finns av två skäl.
 *
 * Det första är att brandfiltssidan svarar på fel fråga för en del av sina
 * läsare. Den som söker på brandfilt har ofta redan bestämt sig för att köpa
 * något och vill veta om en filt räcker. Räddningstjänsternas svar är nej: de
 * rekommenderar brandvarnare på varje våningsplan, en sexkilos pulversläckare
 * och en brandfilt, alltså tre saker. Det svaret finns i vår text men i löpande
 * prosa, där det är lätt att missa.
 *
 * Det andra är att vi mätte söktermen brandskyddspaket till omkring 200 i
 * månaden och beslutade att den inte bär en egen sida. Frågan är ändå verklig,
 * och den hör hemma här snarare än på en tunn sida byggd för ett sökord.
 *
 * ## Reglerna, och var de kommer ifrån
 *
 * Antalen är räddningstjänsternas rekommendationer, inte våra påhitt. Se
 * BRANDFILT_SOURCES i lib/sources.ts: Storstockholms brandförsvar,
 * Räddningstjänsten Syd och Myndigheten för civilt försvar.
 *
 * 1. **Brandvarnare: en per våningsplan.** Sover någon bakom stängd dörr
 *    behövs en till i eller utanför det rummet, och det står som en not i
 *    stället för att räknas in, eftersom vi inte frågar om sovrumsdörrar.
 * 2. **Pulversläckare 6 kg: en per bostad**, och en per plan i ett hus med
 *    flera våningar, eftersom en släckare på fel plan är en släckare du inte
 *    hinner hämta.
 * 3. **Brandfilt 120 × 180: alltid en.** Ligger köket på ett annat plan än
 *    släckaren läggs en 120 × 120 till i köket, vilket är samma råd som
 *    köpguiden ger.
 *
 * Priserna är billigaste produkt som faktiskt uppfyller kravet i respektive
 * jämförelse, inte billigaste produkt över huvud taget. En 1-kilos släckare är
 * billigare än en 6-kilos men uppfyller inte rekommendationen, och en
 * 120 × 120 är billigare än en 120 × 180 men är inte den storlek som
 * rekommenderas som hemmets enda filt.
 */

/* Bostadsvalen och själva planen bor i lib/tool-logic/fire-kit.ts, där
   agentverktyget anropar samma fireKitPlan(). Planen räknar antal och skäl och
   känner inte till någon produkt: raden pekar ut sin sort med en nyckel, och
   uppslaget mot våra egna jämförelser görs här nere. Det är vad som gör att
   verktyget kan ge rådet utan att lämna ut priser. */

/** Billigaste produkt som uppfyller kravet, hämtad ur våra egna jämförelser. */
export type KitItem = {
  /** Kort etikett, t.ex. "Brandvarnare". */
  label: string;
  /** Vad läsaren ska köpa, t.ex. "Pulversläckare 6 kg ABC". */
  spec: string;
  /** Billigaste produkt i vår jämförelse som uppfyller kravet. */
  fromPrice: number;
  /** Formaterad variant av fromPrice. */
  fromPriceLabel: string;
  /** Vår sida för kategorin. */
  href: string;
  /** Butik och produkt bakom fromPrice, så siffran går att spåra. */
  cheapest: string;
};

export type FireKitItems = {
  alarm: KitItem;
  extinguisher: KitItem;
  blanketLarge: KitItem;
  blanketSmall: KitItem;
};

export function FireKitPlanner({
  items,
  className,
}: {
  items: FireKitItems;
  className?: string;
}) {
  const [home, setHome] = useState<HomeKey | null>(null);
  const [floors, setFloors] = useState<FloorKey | null>(null);
  const [kitchen, setKitchen] = useState<KitchenKey | null>(null);

  /* Lägenhet har per definition ett plan, så frågan besvaras åt användaren i
     stället för att lämnas kvar och blockera resultatet. */
  const effectiveFloors = home === "lagenhet" ? "ett" : floors;
  const planned = fireKitPlan(home, effectiveFloors, kitchen);
  /* Nyckeln blir en produkt här, inte i planen. Se kommentaren överst. */
  const result = planned
    ? {
        note: planned.note,
        lines: planned.lines.map((line) => ({
          ...line,
          item: items[line.key],
        })),
      }
    : null;

  const total = result
    ? result.lines.reduce((sum, l) => sum + l.item.fromPrice * l.count, 0)
    : 0;

  return (
    <div
      data-slot="fire-kit-planner"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">Vad bor du i?</legend>
        <div className="flex flex-wrap gap-2">
          {HOME.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={home === o.key}
              onClick={() => setHome(o.key)}
            />
          ))}
        </div>
      </fieldset>

      {home !== "lagenhet" ? (
        <fieldset>
          <legend className="mb-2.5 text-sm font-medium">
            Hur många våningsplan?
          </legend>
          <div className="flex flex-wrap gap-2">
            {FLOORS.map((o) => (
              <Pill
                key={o.key}
                label={o.label}
                active={floors === o.key}
                onClick={() => setFloors(o.key)}
              />
            ))}
          </div>
        </fieldset>
      ) : null}

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">Var ligger köket?</legend>
        <div className="flex flex-wrap gap-2">
          {KITCHEN.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={kitchen === o.key}
              onClick={() => setKitchen(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        {result ? (
          <>
            <p className="text-sm text-muted-foreground">
              Räddningstjänsternas rekommendation för din bostad
            </p>
            <p className="font-heading text-h3 text-brand">
              {result.lines.reduce((n, l) => n + l.count, 0)} produkter, från{" "}
              {formatSek(total)}
            </p>

            <ul className="mt-3 flex flex-col gap-3 text-sm">
              {/* Nyckel på spec och inte på label: de två brandfiltraderna
                  delar label ("Brandfilt") och gav dubbletta React-nycklar. */}
              {result.lines.map((l) => (
                <li key={l.item.spec}>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-medium">
                      {l.count} × {l.item.spec}
                    </span>
                    <a
                      href={l.item.href}
                      className="text-muted-foreground underline decoration-dotted underline-offset-4 hover:text-foreground hover:decoration-solid"
                    >
                      Se vår jämförelse
                    </a>
                  </div>
                  <p className="mt-0.5 text-muted-foreground">{l.why}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Från {l.item.fromPriceLabel} styck, {l.item.cheapest}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-3 border-t border-border pt-3 text-sm">
              <span className="font-medium">Att veta: </span>
              {result.note}
            </p>

            <button
              type="button"
              onClick={() => {
                setHome(null);
                setFloors(null);
                setKitchen(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Svara på frågorna, så får du veta vad räddningstjänsterna
            rekommenderar för just din bostad och vad det kostar som billigast
            hos de butiker vi jämfört.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Antalen är räddningstjänsternas rekommendationer, inte krav i lag.
        Priserna är billigaste produkt i våra egna jämförelser som faktiskt
        uppfyller rekommendationen, kontrollerade hos butiken och daterade på
        respektive sida. En billigare släckare på 1 eller 2 kilo räknas alltså
        inte, eftersom den inte uppfyller den.
      </p>
    </div>
  );
}

function formatSek(value: number): string {
  return `${new Intl.NumberFormat("sv-SE", {
    maximumFractionDigits: 0,
  }).format(value)} kr`;
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
