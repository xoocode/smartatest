"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  TIMER_LOADS as LOADS,
  TIMER_REACH as REACH,
  TIMER_SEASONS as SEASON,
  decideTimer as decide,
  type TimerLoadKey as LoadKey,
  type TimerReachKey as ReachKey,
  type TimerSeasonKey as SeasonKey,
  type TimerVerdict as Verdict,
} from "@/lib/tool-logic/outdoor-timer";

/**
 * Svarar på den fråga som avgör vilken sorts utomhustimer som duger: vad ska
 * styras, och måste tiden följa solen.
 *
 * Kategorispecifikt verktyg, inte layout. Det finns eftersom kategorins två
 * felköp är okorrelerade med priset, vilket är ovanligt. Julas mekaniska timer
 * på 49,90 kronor klarar 3 500 W medan deras digitala på 99,90 stannar vid
 * 1 800, och ett skymningsrelä för 129 klarar 1 000. Den som köper "den lite
 * bättre" till motorvärmaren köper alltså den som inte räcker.
 *
 * Reglerna är avsiktligt få och läsbara i stället för en poängmodell:
 *
 * 1. Effektbehovet sätts av lasten och avgör vad som över huvud taget får kopplas in. Kupévärmaren är den post folk glömmer att räkna med.
 * 2. Astrobehovet sätts av säsongen, inte av produkten. I december rör sig solnedgången några minuter på sex veckor, och då är ett fast klockslag lika bra som astro. Året runt rör den sig sju timmar.
 * 3. Fjärrstyrning är ett eget svar och får aldrig härledas ur de andra två. Den som vill kunna släcka hemifrån vill det oavsett vad som är inkopplat.
 *
 * Verktyget rekommenderar medvetet den enklaste produkt som räcker. Att föreslå
 * en Matter-plugg för 399 kronor till en ljusslinga som ska lysa sex veckor i
 * december vore samma fel som konkurrenterna gör, bara med bättre motivering.
 */

/* Lasterna och regeluppsättningen bor i lib/tool-logic/outdoor-timer.ts, där
   agentverktyget anropar samma decideTimer(). */

/**
 * En produkt verktyget kan peka på när den uppfyller det användaren valt.
 *
 * Serialiserbar och skickas in som prop från serversidan snarare än att
 * komponenten importerar produktdatan själv. Klientbunten får då bara de fält
 * den renderar, och verktyget förblir kategorioberoende.
 */
export type TimerProduct = {
  id: string;
  brand: string;
  name: string;
  price: string;
  href: string;
  kind: "smart" | "digital" | "mekanisk";
  watt: number;
  followsSun: boolean;
  remote: boolean;
};

export type TimerPickerProps = {
  /** Kandidater att rekommendera. Utan dem visas bara vad man ska leta efter. */
  products?: TimerProduct[];
  className?: string;
};

export function TimerPicker({ products = [], className }: TimerPickerProps) {
  const [load, setLoad] = useState<LoadKey | null>(null);
  const [season, setSeason] = useState<SeasonKey | null>(null);
  const [reach, setReach] = useState<ReachKey | null>(null);

  const verdict = decide(load, season, reach);

  return (
    <div data-slot="timer-picker" className={cn("flex flex-col gap-row", className)}>
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">Vad ska timern styra?</legend>
        <div className="flex flex-wrap gap-2">
          {LOADS.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={load === o.key}
              onClick={() => setLoad(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">När ska den användas?</legend>
        <div className="flex flex-wrap gap-2">
          {SEASON.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={season === o.key}
              onClick={() => setSeason(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Vill du kunna ändra tiden på avstånd?
        </legend>
        <div className="flex flex-wrap gap-2">
          {REACH.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={reach === o.key}
              onClick={() => setReach(o.key)}
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
              <Row term="Minsta märkeffekt" value={`${verdict.needsWatt} W`} />
              <Row term="Kapslingsklass" value="Minst IP44" />
              <Row
                term="Följer solen"
                value={verdict.needsSun ? "Ja, astro eller ljussensor" : "Behövs inte"}
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
                setLoad(null);
                setSeason(null);
                setReach(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Svara på de tre frågorna, så får du veta vilken sorts timer som
            räcker och vilka av produkterna vi rankat som uppfyller kraven.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Effekterna ovan är typiska svenska värden och ersätter inte apparatens
        egen märkning. Kupévärmaren är den post som oftast glöms bort: den kan
        ensam dra mer än själva motorvärmaren.
      </p>
    </div>
  );
}

/**
 * Vilka av de rankade produkterna som uppfyller kraven.
 *
 * Filtrerar på samma tal som verdicten visar, aldrig på rankning. Att föreslå
 * testvinnaren till någon som ska koppla in en motorvärmare vore fel: den
 * klarar det, men Shelly-pluggarna gör det inte, och de ligger högre i listan.
 *
 * Sorteringen är enklast först, alltså mekanisk före digital före smart, och
 * inom samma typ billigast först. Det är den enda listan på sidan som inte
 * följer rankningen, och skälet är att verktyget svarar på "vad räcker" och
 * inte på "vad är bäst".
 */
const ORDER: Record<TimerProduct["kind"], number> = {
  mekanisk: 0,
  digital: 1,
  smart: 2,
};

function Matches({
  verdict,
  products,
}: {
  verdict: Verdict;
  products: TimerProduct[];
}) {
  if (!products.length) return null;

  const ok = products.filter(
    (p) =>
      p.watt >= verdict.needsWatt &&
      (!verdict.needsSun || p.followsSun) &&
      (!verdict.needsRemote || p.remote),
  );

  if (!ok.length) {
    return (
      <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
        Ingen av produkterna vi rankat uppfyller alla tre kraven samtidigt. Se
        Andra produkter vi övervägde, där bland annat en motorvärmartimer med
        temperatursensor står med.
      </p>
    );
  }

  /* Kopia innan sort: products är en prop och får inte muteras. */
  const sorted = [...ok].sort((a, b) => ORDER[a.kind] - ORDER[b.kind]);

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {sorted.length === products.length
          ? "Alla produkter vi rankat räcker"
          : `${sorted.length} av ${products.length} produkter vi rankat räcker`}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Enklaste först, inte högst betyg först. Frågan här är vad som räcker.
      </p>
      <ul className="mt-2 flex flex-col gap-1.5 text-sm">
        {sorted.map((p) => (
          <li key={p.id} className="flex flex-wrap items-baseline gap-x-2">
            {/* Full sökväg och inte bara ankaret: verktyget renderas både på
                kategorisidan och på sin egen sida under /guider, och där
                finns ingen recension att hoppa till. */}
            <a
              href={p.href}
              className="font-medium underline decoration-dotted underline-offset-4 hover:decoration-solid"
            >
              {p.brand} {p.name}
            </a>
            <span className="text-muted-foreground">
              {p.watt} W · {p.price}
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

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
