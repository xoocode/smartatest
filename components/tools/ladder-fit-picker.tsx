"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Vilken brandstege når och passar ditt fönster?
 *
 * ## Varför verktyget finns
 *
 * Rankningen väger räckvidd tyngst, och det gör att den stege som täcker mest
 * hamnar överst. Den är också dyrast och mest nischad. Att låta listan stå
 * ensam hade läst som en uppmaning att köpa dyrast, vilket är precis den sorts
 * sida vi bygger emot.
 *
 * Verktyget löser det genom att ställa den fråga som faktiskt avgör: hur högt
 * sitter fönstret? Har du två våningar faller sjumetersstegen bort av sig
 * själv, och kvar står de billigare.
 *
 * ## De två måtten branschen inte publicerar
 *
 * **Räckvidd** mäts mot Boverkets gräns. Sitter fönstrets underkant mer än fem
 * meter över marken krävs enligt byggreglerna en fast monterad stege, och då
 * hjälper ingen hängande stege oavsett längd.
 *
 * **Karmtjocklek** avgör om krokarna alls hakar fast. Jula anger högst 28 cm,
 * Nexa och Brandvarnare.se högst 30, Housegard 15 till 34, och Biltema anger
 * ingenting. Housegard är ensam om att ange ett minimum, och det spelar roll:
 * en för tunn karm ger krokarna för lite grepp.
 *
 * ## Marginalregeln
 *
 * En stege godkänns när **längden är minst höjden plus en halv meter**. Vi
 * räknar inte fram någon egen nyttolängd per produkt, eftersom bara en av sex
 * butiker publicerar en evakueringshöjd skild från stegens längd. Regeln står
 * utskriven i verktyget så att läsaren kan räkna om den själv.
 */

const HEIGHTS = [
  { key: "u2", label: "Under 2 m", top: 2 },
  { key: "23", label: "2 till 3 m", top: 3 },
  { key: "34", label: "3 till 4 m", top: 4 },
  { key: "45", label: "4 till 5 m", top: 5 },
  { key: "58", label: "5 till 8 m", top: 8 },
  { key: "o8", label: "Över 8 m", top: 99 },
] as const;

const FRAMES = [
  { key: "u15", label: "Under 15 cm", cm: 14 },
  { key: "1528", label: "15 till 28 cm", cm: 28 },
  { key: "2830", label: "28 till 30 cm", cm: 30 },
  { key: "3034", label: "30 till 34 cm", cm: 34 },
  { key: "o34", label: "Över 34 cm", cm: 40 },
] as const;

type HeightKey = (typeof HEIGHTS)[number]["key"];
type FrameKey = (typeof FRAMES)[number]["key"];

/** En stege ur vår rankning, med det verktyget behöver för att filtrera. */
export type LadderFitProduct = {
  id: string;
  brand: string;
  name: string;
  price: string;
  priceValue: number;
  href: string;
  /** Publicerad längd i meter. */
  lengthM: number;
  /** Största karmtjocklek i cm, null när butiken inte anger någon. */
  maxFrameCm: number | null;
  /** Minsta karmtjocklek i cm, null när ingen anges. Bara Housegard gör det. */
  minFrameCm: number | null;
};

/** Marginalen mellan fönstrets underkant och stegens publicerade längd. */
const MARGIN_M = 0.5;

type Verdict = {
  headline: string;
  why: string;
  /** Höjden ligger över det en hängande stege är avsedd för. */
  beyondHanging: boolean;
  /** Krävd minsta längd i meter. */
  needM: number;
};

function decide(height: HeightKey | null): Verdict | null {
  if (!height) return null;
  const band = HEIGHTS.find((h) => h.key === height)!;

  if (band.key === "o8") {
    return {
      headline: "Ingen stege i den här jämförelsen",
      why: "Över åtta meter räknar Boverkets byggregler inte med utrymning genom fönster med egen stege alls. Där gäller trapphus, och utrymning med räddningstjänstens utrustning. En bärbar utskjutsstege når normalt elva meter från deras uppställningsplats.",
      beyondHanging: true,
      needM: band.top,
    };
  }

  if (band.key === "58") {
    return {
      headline: "Du behöver en fast monterad stege",
      why: "Sitter fönstrets underkant mer än fem meter över marken accepterar byggreglerna utrymning genom fönstret bara om det finns en fast monterad stege, och då upp till åtta meter. En stege som hängs över karmen räknas aldrig som utrymningsväg i reglernas mening, oavsett hur lång den är.",
      beyondHanging: true,
      needM: band.top,
    };
  }

  if (band.key === "u2") {
    return {
      headline: "En stege är valfri här",
      why: "Under två meter tar de flesta sig ner genom att hänga sig ut och släppa. En stege gör det lugnare, särskilt för barn och äldre, men det är inte den höjd produkten är till för. Lägg hellre pengarna på en brandvarnare till om du saknar en på något plan.",
      beyondHanging: false,
      needM: band.top + MARGIN_M,
    };
  }

  return {
    headline: `Du behöver minst ${fmt(band.top + MARGIN_M)} meter`,
    why: `Fönstrets underkant ligger upp till ${fmt(band.top)} meter över marken. Vi lägger till en halv meter marginal så att stegen når hela vägen ner även på ojämn mark, och räknar mot stegens publicerade längd. Under fem meter är alternativet enligt Boverket att du hoppar, och de skriver själva att du då riskerar att skadas.`,
    beyondHanging: false,
    needM: band.top + MARGIN_M,
  };
}

/** "4,5" och inte "4.5". Svensk decimalkomma. */
function fmt(n: number): string {
  return String(n).replace(".", ",");
}

export function LadderFitPicker({
  products,
  className,
}: {
  products: LadderFitProduct[];
  className?: string;
}) {
  const [height, setHeight] = useState<HeightKey | null>(null);
  const [frame, setFrame] = useState<FrameKey | null>(null);

  const verdict = decide(height);

  return (
    <div
      data-slot="ladder-fit-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Hur högt över marken sitter fönstrets underkant?
        </legend>
        <div className="flex flex-wrap gap-2">
          {HEIGHTS.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={height === o.key}
              onClick={() => setHeight(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Hur tjock är fönsterkarmen? Frivilligt, men det är måttet som avgör om
          krokarna hakar fast.
        </legend>
        <div className="flex flex-wrap gap-2">
          {FRAMES.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={frame === o.key}
              onClick={() => setFrame(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        {verdict ? (
          <>
            <p className="text-sm text-muted-foreground">
              Vad som når och passar
            </p>
            <p className="font-heading text-h3 text-brand">
              {verdict.headline}
            </p>

            <p className="mt-3 text-sm">{verdict.why}</p>

            <Matches verdict={verdict} frame={frame} products={products} />

            <button
              type="button"
              onClick={() => {
                setHeight(null);
                setFrame(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Mät från marken upp till underkanten av det fönster du tänkt utrymma
            genom, så får du veta vilka stegar som når och vilka som passar
            karmen.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Höjdgränserna kommer från Boverkets byggregler om utrymning genom
        fönster. Längd och karmtjocklek är butikens eller tillverkarens egna
        uppgifter, lästa 2026-08-02. Vi har inte hängt upp eller klättrat i någon
        stege, och vi kan inte kontrollera att de angivna måtten stämmer.
      </p>
    </div>
  );
}

/**
 * Vilka av de rankade stegarna som når och passar.
 *
 * Filtrerar på publicerade mått, aldrig på rankning. Når inte testvinnaren ska
 * den falla bort, och när butiken inte anger något karmmått ska produkten
 * listas separat i stället för att antas passa.
 */
function Matches({
  verdict,
  frame,
  products,
}: {
  verdict: Verdict;
  frame: FrameKey | null;
  products: LadderFitProduct[];
}) {
  if (verdict.beyondHanging || !products.length) return null;

  const reaching = products.filter((p) => p.lengthM >= verdict.needM);

  if (!reaching.length) {
    return (
      <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
        Ingen av stegarna vi rankat är lång nog. Den längsta är sju meter, och
        den finns hos Brandvarnare.se.
      </p>
    );
  }

  const band = frame ? FRAMES.find((f) => f.key === frame)! : null;

  /* Den lägsta karmtjocklek någon tillverkare uttryckligen sagt sig klara.
     Under den nivån vet vi inte om de som tiger fungerar, och de får inte
     passera bara för att de låtit bli att publicera ett minimum. Annars hade
     verktyget belönat tystnad och straffat den enda som är öppen. */
  const publishedMins = products
    .map((p) => p.minFrameCm)
    .filter((v): v is number => v !== null);
  const thinThreshold = publishedMins.length ? Math.min(...publishedMins) : 0;

  /* Tre högar och inte två: en stege vars karmmått butiken aldrig publicerat
     är inte samma sak som en som passar, och får inte listas som om den vore. */
  const fitting: LadderFitProduct[] = [];
  const tooTight: LadderFitProduct[] = [];
  /** Butiken anger inget karmmått alls. */
  const noFrameSpec: LadderFitProduct[] = [];
  /** Butiken anger ett tak men inget golv, och karmen är tunn. */
  const noMinSpec: LadderFitProduct[] = [];

  for (const p of reaching) {
    if (!band) {
      fitting.push(p);
      continue;
    }
    if (p.maxFrameCm === null) {
      noFrameSpec.push(p);
      continue;
    }
    const overMax = band.cm > p.maxFrameCm;
    if (p.minFrameCm === null) {
      if (band.cm < thinThreshold) noMinSpec.push(p);
      else if (overMax) tooTight.push(p);
      else fitting.push(p);
      continue;
    }
    if (overMax || band.cm < p.minFrameCm) tooTight.push(p);
    else fitting.push(p);
  }

  /* Kopia innan sort: products är en prop och får inte muteras. */
  const sorted = [...fitting].sort((a, b) => a.priceValue - b.priceValue);

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {sorted.length} av {products.length} stegar vi rankat{" "}
        {band ? "når och passar" : "är långa nog"}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Billigast först, inte högst betyg först. Frågan här är vad som räcker.
      </p>

      {sorted.length ? (
        <ul className="mt-2 flex flex-col gap-1.5 text-sm">
          {sorted.map((p) => (
            <li key={p.id} className="flex flex-wrap items-baseline gap-x-2">
              {/* Full sökväg och inte bara ankaret: verktyget renderas både på
                  kategorisidan och på sin egen sida under /verktyg. */}
              <a
                href={p.href}
                className="font-medium underline decoration-dotted underline-offset-4 hover:decoration-solid"
              >
                {p.brand} {p.name}
              </a>
              <span className="text-muted-foreground">
                {fmt(p.lengthM)} m · {p.price}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          Ingen av de stegar som är långa nog passar en karm på {band?.label
            .toLowerCase()
            .replace("under ", "under ")}
          .
        </p>
      )}

      {tooTight.length ? (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            Når men passar inte karmen:{" "}
          </span>
          {tooTight
            .map(
              (p) =>
                `${p.brand} ${p.name} (${
                  p.minFrameCm !== null
                    ? `${p.minFrameCm} till ${p.maxFrameCm} cm`
                    : `högst ${p.maxFrameCm} cm`
                })`,
            )
            .join(", ")}
          .
        </p>
      ) : null}

      {noFrameSpec.length ? (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            Går inte att kontrollera:{" "}
          </span>
          {noFrameSpec.map((p) => `${p.brand} ${p.name}`).join(", ")} anger ingen
          karmtjocklek alls, så det går inte att veta i förväg om krokarna hakar
          på ditt fönster.
        </p>
      ) : null}

      {noMinSpec.length ? (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            Osäkert på en tunn karm:{" "}
          </span>
          {noMinSpec.map((p) => `${p.brand} ${p.name}`).join(", ")} anger bara
          hur tjock karmen får vara, inte hur tunn. Den enda tillverkare som
          publicerar ett golv sätter det vid {thinThreshold} cm, och under den
          nivån vet vi inte om krokarna får grepp. Vi låter dem inte passera
          bara för att uppgiften saknas.
        </p>
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
