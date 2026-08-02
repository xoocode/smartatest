"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Svarar på den enda fråga som avgör om en smart plug duger: klarar den det du
 * tänker koppla in, på den plats där den ska sitta.
 *
 * Kategorispecifikt verktyg, inte layout. Det finns eftersom ingen svensk
 * jämförelse svarar på frågan, trots att den är den vanligaste orsaken till
 * felköp: den mest rekommenderade pluggen i Sverige är märkt för 10 A, och den
 * vanligaste svenska anledningen att köpa en är att styra ett element.
 *
 * Reglerna är avsiktligt få och läsbara i stället för en poängmodell. Två
 * saker driver dem: en tjugoprocentig marginal på märkeffekten, och att
 * induktiv last drar en startström som inte syns i den siffra som står på
 * apparaten.
 */

/** Vanliga svenska laster med typisk märkeffekt i watt. */
const LOADS = [
  { key: "belysning", label: "Lampa eller julbelysning", watt: 50, inductive: false },
  { key: "media", label: "TV eller router", watt: 150, inductive: false },
  { key: "kaffe", label: "Kaffebryggare", watt: 1000, inductive: false },
  { key: "motorvarmare", label: "Motorvärmare", watt: 600, inductive: false },
  { key: "element", label: "Element eller värmefläkt", watt: 2000, inductive: false },
  { key: "vattenkokare", label: "Vattenkokare eller torkskåp", watt: 2200, inductive: false },
  { key: "motor", label: "Pump, fläkt eller kyl", watt: 400, inductive: true },
  { key: "eget", label: "Annat, jag vet effekten", watt: 0, inductive: false },
] as const;

const PLACES = [
  { key: "inne", label: "Inomhus, uppvärmt" },
  { key: "garage", label: "Garage eller krypgrund" },
  { key: "ute", label: "Utomhus" },
] as const;

type LoadKey = (typeof LOADS)[number]["key"];
type PlaceKey = (typeof PLACES)[number]["key"];

/** 16 A-pluggar är märkta 3 680 W, 10 A-pluggar 2 300 W. */
const AMP_16_W = 3680;
const AMP_10_W = 2300;
/** Påslag på märkeffekten. En apparat som står på i timmar vill ha marginal. */
const MARGIN = 1.2;

type Verdict = {
  amp: string;
  ip: string;
  temp: string;
  why: string;
  warning?: string;
  /**
   * Kraven i maskinläsbar form, så att produktförslaget filtreras på exakt
   * samma tal som texten visar. Null betyder att inget förslag ska visas,
   * antingen för att effekten saknas eller för att ingen plugg räcker.
   */
  needsAmp: number | null;
  needsOutdoor: boolean;
};

function decide(
  load: LoadKey | null,
  place: PlaceKey | null,
  ownWatt: number,
): Verdict | null {
  if (!load || !place) return null;

  const spec = LOADS.find((l) => l.key === load);
  if (!spec) return null;

  const watt = load === "eget" ? Math.max(0, ownWatt) : spec.watt;
  const needed = Math.round(watt * MARGIN);

  /* Induktiv last kräver 16 A oavsett märkeffekt: startströmmen ligger långt
     över den siffra som står på apparaten och syns inte i märkningen. */
  const needsSixteen = spec.inductive || needed > AMP_10_W;

  const outdoors = place === "ute";
  const cold = place !== "inne";

  const verdict: Verdict = {
    needsAmp: needsSixteen ? 16 : Math.max(10, Math.ceil(needed / 230)),
    needsOutdoor: cold,
    amp: needsSixteen
      ? `16 A (3 680 W)`
      : `10 A (2 300 W) räcker, 16 A ger marginal`,
    ip: cold ? "Minst IP44" : "Inomhusklassad räcker (IP20)",
    temp: outdoors
      ? "Kontrollera drifttemperaturen, helst ner till −25 °C"
      : cold
        ? "Kontrollera drifttemperaturen, minst −20 °C"
        : "Ingen särskild drifttemperatur behövs",
    why: spec.inductive
      ? `${spec.label} innehåller en motor eller kompressor. Märkeffekten på runt ${watt} W säger inte hela sanningen, för startströmmen ligger under någon sekund flera gånger högre. Ta därför 16 A även om siffran ser låg ut.`
      : `${watt} W plus tjugo procent marginal blir ${needed} W. ${
          needsSixteen
            ? "Det passerar gränsen för en 10 A-plugg, så du behöver en märkt för 16 A."
            : "Det ryms med god marginal i en plugg märkt för 10 A."
        }`,
  };

  if (watt <= 0) {
    return {
      ...verdict,
      needsAmp: null,
      amp: "Ange effekten först",
      why: "Skriv in apparatens effekt i watt. Den står oftast på en dekal på baksidan eller undersidan, ibland som ampere i stället, och då är effekten ampere gånger 230.",
    };
  }

  if (watt > AMP_16_W) {
    return {
      ...verdict,
      needsAmp: null,
      amp: "Ingen smart plug räcker",
      warning: `${watt} W ligger över vad ett vanligt vägguttag är säkrat för. Det här ska inte lösas med en adapter i uttaget utan med fast installation och behörig elektriker.`,
    };
  }

  if (outdoors) {
    verdict.warning =
      "Ett uttag utomhus ska sitta i en jordfelsbrytarskyddad krets. En inomhusplugg i en ytterdosa är inte samma sak som en plugg byggd för utomhusbruk.";
  }

  return verdict;
}

/**
 * En produkt verktyget kan peka på när den klarar det användaren valt.
 *
 * Serialiserbar och skickas in som prop från serversidan snarare än att
 * komponenten importerar produktdatan själv. Klientbunten får då bara de fem
 * fälten den renderar, och verktyget förblir kategorioberoende: en framtida
 * kategori skickar in sin egen lista.
 */
export type PickerProduct = {
  id: string;
  brand: string;
  name: string;
  price: string;
  href: string;
  amp: number;
  outdoor: boolean;
};

export type LoadPickerProps = {
  /** Kandidater att rekommendera. Utan dem visas bara märkningen att leta efter. */
  products?: PickerProduct[];
  className?: string;
};

export function LoadPicker({ products = [], className }: LoadPickerProps) {
  const [load, setLoad] = useState<LoadKey | null>(null);
  const [place, setPlace] = useState<PlaceKey | null>(null);
  const [ownWatt, setOwnWatt] = useState(1500);

  const verdict = decide(load, place, ownWatt);

  return (
    <div data-slot="load-picker" className={cn("flex flex-col gap-row", className)}>
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Vad ska du koppla in?
        </legend>
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

      {load === "eget" ? (
        <label className="flex max-w-xs flex-col gap-1.5 text-sm">
          <span className="font-medium">Apparatens effekt (W)</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={5000}
            value={ownWatt}
            onChange={(e) => setOwnWatt(e.target.valueAsNumber)}
            className="themed-border rounded-md bg-background px-3 py-2 tabular-nums"
          />
        </label>
      ) : null}

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">Var sitter uttaget?</legend>
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
            <p className="text-sm text-muted-foreground">Leta efter minst</p>
            <p className="font-heading text-h3 text-brand">{verdict.amp}</p>

            <dl className="mt-3 flex flex-col gap-1 text-sm">
              <Row term="Kapslingsklass" value={verdict.ip} />
              <Row term="Drifttemperatur" value={verdict.temp} />
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
                setPlace(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Välj vad du ska koppla in och var uttaget sitter, så får du veta
            vilken märkning pluggen behöver.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Effekterna ovan är typiska svenska värden och ersätter inte apparatens
        egen märkning. Står det ampere i stället för watt är effekten ampere
        gånger 230.
      </p>
    </div>
  );
}

/**
 * Vilka av de testade pluggarna som faktiskt klarar det användaren valt.
 *
 * Filtrerar på samma tal som verdicten visar, aldrig på rankning. Att
 * rekommendera testvinnaren när den inte klarar lasten vore precis det felet
 * hela verktyget finns för att förhindra, och listan visas därför i den
 * ordning produkterna redan har på sidan utan att någon lyfts fram.
 */
function Matches({
  verdict,
  products,
}: {
  verdict: Verdict;
  products: PickerProduct[];
}) {
  if (!products.length || verdict.needsAmp === null) return null;

  const need = verdict.needsAmp;
  const ok = products.filter(
    (p) => p.amp >= need && (!verdict.needsOutdoor || p.outdoor),
  );

  if (!ok.length) {
    return (
      <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
        {verdict.needsOutdoor
          ? "Ingen av de fem uttagen vi rankat får sitta ute eller i ouppvärmt utrymme. Utomhusmodellerna finns under Andra uttag vi övervägde, där både kapslingsklass och drifttemperatur står angivna."
          : `Inget av de uttag vi testat är märkt för ${need} A. Titta efter en modell märkt 3 680 W.`}
      </p>
    );
  }

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {ok.length === products.length
          ? "Alla uttag vi testat klarar det"
          : `${ok.length} av ${products.length} uttag vi testat klarar det`}
      </p>
      <ul className="mt-2 flex flex-col gap-1.5 text-sm">
        {ok.map((p) => (
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
              {p.amp} A · {p.price}
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
