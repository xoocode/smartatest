"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  FOLIO_CAPACITY as CAPACITY,
  FOLIO_CHARGING as CHARGING,
  FOLIO_LIFESPAN as LIFESPAN,
  decideFolio as decide,
  folioEmptyReason,
  folioMatches as matches,
  folioRelaxations as relaxations,
  type FolioCapacityKey as CapacityKey,
  type FolioChargingKey as ChargingKey,
  type FolioLifespanKey as LifespanKey,
  type FolioVerdict as Verdict,
} from "@/lib/tool-logic/wallet-folio";

/**
 * Svarar på den fråga plånboksfodral faktiskt ställer: går det att få både det
 * du vill ha och det du behöver, eller måste du välja.
 *
 * Kategorispecifikt verktyg, inte layout. Det finns eftersom kategorins
 * viktigaste uppgift, om telefonen går att ladda utan att tas ur fodralet,
 * står i specifikationen men aldrig i produktnamnet. Trolsk säljer ett fodral
 * för 199 kronor som laddar trådlöst med magnetring och ett för 249 som inte
 * laddar alls, och skillnaden syns inte på hyllan.
 *
 * ## ⚠️ Den här väljaren får ge tomma svar, och det är poängen
 *
 * Skaltypsväljaren på /iphone-skal har noll tomma utfall över arton
 * kombinationer. Här är flera kombinationer omöjliga, och de är sidans
 * centrala avvägning: **inget fodral kombinerar en hel plånbok med trådlös
 * laddning.** Ett tomt svar förklarar därför avvägningen i stället för att be
 * om ursäkt, och texten kommer från `folioEmptyReason` så att agentverktyget
 * svarar likadant.
 *
 * ⚠️ Ingen fråga rör RFID. Uppgiften är ett ja utan tal och skiljer inte
 * produkterna åt, så ett filter på den hade sett ut som ett urval utan att
 * vara ett.
 *
 * Träfflistan sorteras billigast först, inte högst betyg först, av samma skäl
 * som vattenlarmsväljaren: frågan är vad som räcker.
 */

/* Frågorna, reglerna och förklaringen till ett tomt urval bor i
   lib/tool-logic/wallet-folio.ts, där agentverktyget anropar samma
   decideFolio(). Produkturvalet stannar här. */

export type FolioProduct = {
  id: string;
  brand: string;
  name: string;
  price: string;
  /** Sorteringsnyckel. Priset ovan är formaterat och går inte att jämföra. */
  priceValue: number;
  href: string;
  charging: "magnet" | "platta" | "ingen";
  cards: number;
  coinPocket: boolean;
  realLeather: boolean;
};

export type WalletFolioPickerProps = {
  products?: FolioProduct[];
  className?: string;
};

const CHARGING_NOTE: Record<FolioProduct["charging"], string> = {
  magnet: "laddar med magnetring",
  platta: "laddar på en platta",
  ingen: "ingen trådlös laddning",
};

export function WalletFolioPicker({
  products = [],
  className,
}: WalletFolioPickerProps) {
  const [charging, setCharging] = useState<ChargingKey | null>(null);
  const [capacity, setCapacity] = useState<CapacityKey | null>(null);
  const [lifespan, setLifespan] = useState<LifespanKey | null>(null);

  const verdict = decide(charging, capacity, lifespan);

  return (
    <div
      data-slot="wallet-folio-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. Se traps.md. */}
        <legend className="mb-2.5 text-sm font-medium">Hur laddar du?</legend>
        <div className="flex flex-wrap gap-2">
          {CHARGING.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={charging === o.key}
              onClick={() => setCharging(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Vad ska få plats i fodralet?
        </legend>
        <div className="flex flex-wrap gap-2">
          {CAPACITY.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={capacity === o.key}
              onClick={() => setCapacity(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Hur länge ska fodralet hålla?
        </legend>
        <div className="flex flex-wrap gap-2">
          {LIFESPAN.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={lifespan === o.key}
              onClick={() => setLifespan(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        {verdict ? (
          <>
            <p className="text-sm text-muted-foreground">Det du behöver är</p>
            <p className="font-heading text-h3 text-brand">{verdict.headline}</p>

            <dl className="mt-3 flex flex-col gap-1 text-sm">
              <Row
                term="Laddning genom fodralet"
                value={
                  verdict.needsMagnetRing
                    ? "Ja, med magnetring"
                    : verdict.needsWireless
                      ? "Ja"
                      : "Behövs inte"
                }
              />
              <Row term="Minst antal kortfack" value={`${verdict.minCards} st`} />
              <Row
                term="Myntfack"
                value={verdict.needsCoinPocket ? "Ja" : "Behövs inte"}
              />
              <Row
                term="Garvat läder"
                value={verdict.needsRealLeather ? "Ja" : "Behövs inte"}
              />
            </dl>

            <p className="mt-3 text-sm">{verdict.why}</p>

            {verdict.warning ? (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Att veta: </span>
                {verdict.warning}
              </p>
            ) : null}

            <Matches verdict={verdict} products={products} />

            <button
              type="button"
              onClick={() => {
                setCharging(null);
                setCapacity(null);
                setLifespan(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Svara på de tre frågorna, så får du veta vilken sorts fodral som
            räcker och vilka av dem vi rankat som uppfyller kraven.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Guiden bygger på specifikationerna i jämförelsen ovan, alltså på vad
        butiker och tillverkare uppger. Vi har inte använt ett enda fodral.
      </p>
    </div>
  );
}

/**
 * Vilka av de rankade fodralen som uppfyller kraven.
 *
 * Filtrerar på samma villkor som verdicten visar, aldrig på rankning. Att
 * föreslå vinnaren till någon som vill bära hela plånboken vore fel: den tar
 * tre kort, och CaseMe tar tio trots att den ligger åttonde.
 */
function Matches({
  verdict,
  products,
}: {
  verdict: Verdict;
  products: FolioProduct[];
}) {
  if (!products.length) return null;

  const ok = products.filter((p) => matches(verdict, p));

  if (!ok.length) {
    /* Uppmätt: 15 av 24 kombinationer ger noll träffar, eftersom en hel
       plånbok och trådlös laddning inte går ihop i den här hyllan. Nejet är
       riktigt och ska stå kvar, men ett verktyg som bara säger nej lämnar
       läsaren utan nästa steg. Därför visas alltid vad som händer om ett av
       kraven släpps. Se folioRelaxations i lib/tool-logic/wallet-folio.ts. */
    const paths = relaxations(verdict)
      .map((r) => ({
        label: r.label,
        hits: products.filter((p) => matches(r.verdict, p)),
      }))
      .filter((r) => r.hits.length > 0);

    return (
      <div className="mt-3 border-t border-border pt-3">
        <p className="text-sm font-medium">Den kombinationen finns inte</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {folioEmptyReason(verdict)}
        </p>

        {paths.length ? (
          <div className="mt-3 flex flex-col gap-3">
            {paths.map((path) => (
              <div key={path.label}>
                <p className="text-sm font-medium">
                  {path.label} finns {path.hits.length}:
                </p>
                <ProductList items={path.hits} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {ok.length === products.length
          ? "Alla fodral vi rankat räcker"
          : `${ok.length} av ${products.length} fodral vi rankat räcker`}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Billigast först, inte högst betyg först. Frågan här är vad som räcker.
      </p>
      <ProductList items={ok} />
    </div>
  );
}

/** Träfflista, billigast först. Delad av både träffarna och alternativen. */
function ProductList({ items }: { items: FolioProduct[] }) {
  /* Kopia innan sort: listan kommer ur en prop och får inte muteras. */
  const sorted = [...items].sort((a, b) => a.priceValue - b.priceValue);

  return (
    <ul className="mt-2 flex flex-col gap-1.5 text-sm">
      {sorted.map((p) => (
        <li key={p.id} className="flex flex-wrap items-baseline gap-x-2">
          {/* Full sökväg och inte bara ankaret: verktyget renderas både på
              testsidan och på sin egen sida under /guider, och där finns
              ingen recension att hoppa till. */}
          <a
            href={p.href}
            className="font-medium underline decoration-dotted underline-offset-4 hover:decoration-solid"
          >
            {p.brand} {p.name}
          </a>
          <span className="text-muted-foreground">
            {p.cards} kortfack · {CHARGING_NOTE[p.charging]}
            {p.coinPocket ? " · myntfack" : ""} · {p.price}
          </span>
        </li>
      ))}
    </ul>
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

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
