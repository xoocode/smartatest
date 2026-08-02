"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

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

const LOADS = [
  { key: "ljusslinga", label: "Julbelysning eller ljusslinga", watt: 200 },
  { key: "fasad", label: "Fasad- eller trädgårdsbelysning", watt: 500 },
  { key: "motorvarmare", label: "Motorvärmare med kupévärmare", watt: 2200 },
  { key: "pump", label: "Pump, fläkt eller värmare", watt: 1500 },
] as const;

const SEASON = [
  { key: "december", label: "Bara under vintersäsongen" },
  { key: "aret", label: "Året runt" },
] as const;

const REACH = [
  { key: "hemifran", label: "Ja, även när jag inte är hemma" },
  { key: "pa-plats", label: "Nej, jag ställer den på plats" },
] as const;

type LoadKey = (typeof LOADS)[number]["key"];
type SeasonKey = (typeof SEASON)[number]["key"];
type ReachKey = (typeof REACH)[number]["key"];

/* Påslag på lastens märkeffekt. Samma tjugo procent som Effektkollen använder
   på /smart-plug, av samma skäl: en apparat som står på i timmar vill ha
   marginal, och märkeffekten är ett typvärde och inte ditt värde. */
const MARGIN = 1.2;

type Verdict = {
  headline: string;
  why: string;
  warning?: string;
  /** Kraven i maskinläsbar form, så förslaget filtreras på samma tal som texten visar. */
  needsWatt: number;
  needsSun: boolean;
  needsRemote: boolean;
};

function decide(
  load: LoadKey | null,
  season: SeasonKey | null,
  reach: ReachKey | null,
): Verdict | null {
  if (!load || !season || !reach) return null;

  const spec = LOADS.find((l) => l.key === load);
  if (!spec) return null;

  const needsWatt = Math.round(spec.watt * MARGIN);
  /* Astro behövs när tändningstiden ska följa med över året. Under en
     decembersäsong rör sig solnedgången i Stockholm knappt tjugo minuter, och
     då tillför astrofunktionen ingenting som är värt att betala för. */
  const needsSun = season === "aret";
  const needsRemote = reach === "hemifran";

  const wattNote = `${spec.watt} W plus tjugo procent marginal blir ${needsWatt} W.`;

  if (needsRemote) {
    return {
      needsWatt,
      needsSun,
      needsRemote,
      headline: "En smart plugg, för du vill nå den hemifrån",
      why: `${wattNote} Att kunna ändra tiden när du inte står bredvid finns bara hos de smarta pluggarna, och där bara hos dem som talar wifi, Zigbee eller Z-Wave. Bluetooth räcker inte: då ska du stå på gården för att programmera om.`,
      warning:
        needsWatt > 2500
          ? "Lasten kräver 16 A, och det utesluter båda Shelly-pluggarna trots att de är bäst på kyla. Kontrollera märkningen 3 680 W innan du beställer."
          : undefined,
    };
  }

  if (needsSun) {
    return {
      needsWatt,
      needsSun,
      needsRemote,
      headline: "Något som följer solen, alltså astro eller ljussensor",
      why: `${wattNote} Ska belysningen gå året runt flyttar sig solnedgången omkring sju timmar mellan december och juni, och ett fast klockslag blir fel några veckor efter att du satt det. Antingen en astrofunktion som räknar ut tiden, eller ett skymningsrelä som mäter ljuset och därför aldrig behöver ställas om.`,
      warning:
        needsWatt > 1000
          ? "Skymningsreläet är det enklaste sättet att lösa det, men det klarar bara 1 000 W. Din last ligger över det, så här blir det en smart plugg med astrofunktion."
          : undefined,
    };
  }

  return {
    needsWatt,
    needsSun,
    needsRemote,
    headline: "En mekanisk timer räcker",
    why: `${wattNote} Under en vintersäsong står solnedgången nästan stilla, och du ställer tiden en gång. Då gör en app ingenting som segmenten på en skiva inte gör, och skivan kostar en åttondel.`,
    warning:
      "Den mekaniska tappar tiden vid strömavbrott och går sedan fel tills du ställer om den. Är det viktigt att den inte gör det, välj en digital med backupbatteri i stället.",
  };
}

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
                kategorisidan och på sin egen sida under /verktyg, och där
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
