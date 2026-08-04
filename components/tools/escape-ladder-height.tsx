"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Hur högt sitter fönstret, och vilken fast stege är godkänd för det?
 *
 * ## Varför verktyget finns
 *
 * Kategorin har två höjdgränser som inte går ihop, och det är sidans andra
 * fynd. Boverket tillåter utrymning genom fönster upp till **8,0 meter** när
 * det finns en fast monterad stege. Det enda fabrikat som har ett
 * tredjepartsgodkännande, Modum, får enligt sitt eget certifikat användas till
 * **5,0 meter utan ryggbygel och 7,5 meter med**. Övriga tre fabrikat anger
 * ingen högsta användningshöjd alls, trots att de säljer stegar på upp till
 * 6,0 meter.
 *
 * En läsare som bara ser längdtabellen drar slutsatsen att en stege på 5,7
 * meter passar ett fönster 5,7 meter upp. Verktyget skiljer på **når** och
 * **är godkänd för**, eftersom hela sidans poäng är att de två inte är samma
 * sak.
 *
 * ## Längdregeln
 *
 * En fast stege behöver inte nå marken. Den ska sitta ungefär sju decimeter
 * ovanför fönsterkarmen och sluta en halv till en meter över marken, så att
 * den går att fälla ut även när det ligger snö. De två avstånden tar ut
 * varandra, och vi räknar därför **stegens längd mot fönstrets höjd över
 * marken rakt av**. Regeln står utskriven i verktyget så att läsaren kan
 * räkna om den själv.
 *
 * ## Tystnad passerar inte som godkännande
 *
 * Samma princip som karmmåttet i `LadderFitPicker`: den som inte publicerar en
 * högsta användningshöjd hamnar i en egen hög med skälet utskrivet, i stället
 * för att glida igenom som om gränsen vore obegränsad. Annars hade verktyget
 * belönat den som skrivit minst.
 */

/* Banden följer de gränser som faktiskt betyder något, inte jämna meter.
   5,0 är Boverkets gräns utan fast stege och Modums godkännande utan
   ryggbygel. 5,4 är Modums längsta lagerförda stege, och bandet finns för att
   det är där ryggbygeln blir ett krav i stället för ett tillval. 6,0 är den
   längsta stegen någon säljer. Över det är allt en offert. */
const HEIGHTS = [
  { key: "u25", label: "Under 2,5 m", top: 2.5 },
  { key: "254", label: "2,5 till 4 m", top: 4 },
  { key: "45", label: "4 till 5 m", top: 5 },
  { key: "554", label: "5 till 5,4 m", top: 5.4 },
  { key: "546", label: "5,4 till 6 m", top: 6 },
  { key: "o6", label: "Över 6 m", top: 99 },
] as const;

type HeightKey = (typeof HEIGHTS)[number]["key"];

/** En fast stege ur rankningen, med det verktyget behöver för att filtrera. */
export type EscapeLadderOption = {
  id: string;
  brand: string;
  name: string;
  href: string;
  merchant: string;
  /** Längder som säljs, i meter, stigande. */
  lengths: number[];
  /** Pris i kronor per längd, samma ordning som `lengths`. */
  prices: (number | null)[];
  /** Högsta utrymningshöjd tillverkaren själv anger. Null när ingen anges. */
  approvedM: number | null;
  /** Samma, men med ryggbygel monterad. Null när ingen sådan finns. */
  approvedWithGuardM: number | null;
};

/** Boverkets gräns för utrymning genom fönster med fast monterad stege. */
const BBR_MAX_M = 8;

function fmt(n: number): string {
  return String(n).replace(".", ",");
}

function kr(n: number): string {
  return `${n.toLocaleString("sv-SE")} kr`;
}

/** Kortaste längd i serien som når höjden, med pris. */
function shortestReaching(
  option: EscapeLadderOption,
  needM: number,
): { lengthM: number; price: number | null } | null {
  for (let i = 0; i < option.lengths.length; i += 1) {
    if (option.lengths[i] >= needM) {
      return { lengthM: option.lengths[i], price: option.prices[i] ?? null };
    }
  }
  return null;
}

export function EscapeLadderHeight({
  options,
  className,
}: {
  options: EscapeLadderOption[];
  className?: string;
}) {
  const [height, setHeight] = useState<HeightKey | null>(null);
  const band = height ? HEIGHTS.find((h) => h.key === height)! : null;

  return (
    <div
      data-slot="escape-ladder-height"
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

      <div className="rounded-md bg-muted pad-card">
        {band ? (
          <Result band={band} options={options} onReset={() => setHeight(null)} />
        ) : (
          <p className="text-sm text-muted-foreground">
            Mät från marken upp till underkanten av det fönster du tänkt utrymma
            genom. Du får veta vilka stegar som når, vilka som är godkända för
            höjden och vad den kortaste tillräckliga längden kostar.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Åttametersgränsen kommer från Boverkets byggregler om utrymning genom
        fönster. Godkända höjder kommer från SINTEF Teknisk Godkjenning TG 2536.
        Längder och priser är butikens egna uppgifter, lästa 2026-08-02. Vi har
        inte monterat, belastat eller klättrat i någon stege.
      </p>
    </div>
  );
}

function Result({
  band,
  options,
  onReset,
}: {
  band: (typeof HEIGHTS)[number];
  options: EscapeLadderOption[];
  onReset: () => void;
}) {
  const beyondEverything = band.top > BBR_MAX_M;

  return (
    <>
      <p className="text-sm text-muted-foreground">Vad som når och är godkänt</p>
      <p className="font-heading text-h3 text-brand">
        {beyondEverything
          ? "Ingen lagerförd stege räcker"
          : `Stegen behöver vara minst ${fmt(band.top)} meter`}
      </p>

      <p className="mt-3 text-sm">
        {beyondEverything
          ? `Byggreglerna tillåter utrymning genom fönster upp till ${fmt(BBR_MAX_M)} meter när det finns en fast monterad stege, så höjden i sig är inte ute. Men ingen tillverkare i jämförelsen säljer en lagerförd stege så lång, och det enda tredjepartsgodkännande som finns går ut vid 7,5 meter även med ryggbygel. Över den höjden är du hänvisad till en stege tillverkad efter mått, och då är det tillverkaren du ska prata med, inte en butikshylla.`
          : `Fönstrets underkant ligger upp till ${fmt(band.top)} meter över marken. En fast stege behöver inte nå ända ner: den ska sitta ungefär sju decimeter ovanför karmen och sluta en halv till en meter över marken, så att den går att fälla ut även med snö på backen. De två avstånden tar ut varandra, så vi jämför stegens längd mot höjden rakt av.`}
      </p>

      {beyondEverything ? null : <Piles band={band} options={options} />}

      <button
        type="button"
        onClick={onReset}
        className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Börja om
      </button>
    </>
  );
}

/**
 * Tre högar: godkänd för höjden, når men utan angiven gräns, och når inte.
 *
 * Skillnaden mellan de två första är hela sidans ärende. En stege som säljs i
 * 5,7 meter utan att någon anger vad den får användas till är inte samma sak
 * som en stege med ett certifikat där gränsen står i meter.
 */
function Piles({
  band,
  options,
}: {
  band: (typeof HEIGHTS)[number];
  options: EscapeLadderOption[];
}) {
  const needM = band.top;

  type Row = {
    option: EscapeLadderOption;
    lengthM: number;
    price: number | null;
    /** Godkänd rakt av, godkänd med ryggbygel, eller ingen angiven gräns. */
    state: "approved" | "needsGuard" | "unstated" | "overApproved";
  };

  const reaching: Row[] = [];
  const tooShort: EscapeLadderOption[] = [];

  for (const option of options) {
    const hit = shortestReaching(option, needM);
    if (!hit) {
      tooShort.push(option);
      continue;
    }

    let state: Row["state"] = "unstated";
    if (option.approvedM !== null) {
      if (needM <= option.approvedM) state = "approved";
      else if (
        option.approvedWithGuardM !== null &&
        needM <= option.approvedWithGuardM
      )
        state = "needsGuard";
      else state = "overApproved";
    }

    reaching.push({ option, lengthM: hit.lengthM, price: hit.price, state });
  }

  const approved = reaching.filter((r) => r.state === "approved");
  const needsGuard = reaching.filter((r) => r.state === "needsGuard");
  const overApproved = reaching.filter((r) => r.state === "overApproved");
  const unstated = reaching.filter((r) => r.state === "unstated");

  /* Kopia innan sort: options är en prop och får inte muteras. Billigast
     först i varje hög, eftersom frågan här är vad som räcker och inte vad
     som fått högst betyg. */
  const byPrice = (rows: Row[]) =>
    [...rows].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {reaching.length} av {options.length} fabrikat når {fmt(needM)} meter
      </p>

      {approved.length ? (
        <Pile
          title="Godkänd för den här höjden"
          rows={byPrice(approved)}
          tone="strong"
        />
      ) : null}

      {needsGuard.length ? (
        <Pile
          title="Godkänd först med ryggbygel"
          rows={byPrice(needsGuard)}
          tone="strong"
          note="Certifikatet tillåter fem meter utan ryggbygel och 7,5 med. Bygeln säljs separat och saknar publicerat pris, så du får begära offert."
        />
      ) : null}

      {overApproved.length ? (
        <Pile
          title="Längden finns, men höjden ligger över godkännandet"
          rows={byPrice(overApproved)}
          note="Stegen säljs i den längd du behöver, men tillverkarens eget godkännande sträcker sig inte så högt ens med ryggbygel."
        />
      ) : null}

      {unstated.length ? (
        <Pile
          title="Når höjden, men ingen gräns är angiven"
          rows={byPrice(unstated)}
          note="Tillverkaren anger ingen högsta utrymningshöjd, ingen maxlast och ingen provning. Att stegen säljs i den längden är inte samma sak som att någon sagt att den får användas där, och vi låter den inte passera som godkänd bara för att uppgiften saknas."
        />
      ) : null}

      {tooShort.length ? (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            Finns inte i den längden:{" "}
          </span>
          {tooShort.map((o) => `${o.brand} ${o.name}`).join(", ")}. Flera av dem
          går att skarva till önskad längd, men då är det en offert och inte en
          hyllvara, och priset i tabellen gäller inte längre.
        </p>
      ) : null}
    </div>
  );
}

function Pile({
  title,
  rows,
  note,
  tone,
}: {
  title: string;
  rows: {
    option: EscapeLadderOption;
    lengthM: number;
    price: number | null;
  }[];
  note?: string;
  tone?: "strong";
}) {
  return (
    <div className="mt-3">
      <p
        className={cn(
          "text-sm font-medium",
          tone === "strong" ? "text-brand" : "text-foreground",
        )}
      >
        {title}
      </p>
      <ul className="mt-1.5 flex flex-col gap-1.5 text-sm">
        {rows.map(({ option, lengthM, price }) => (
          <li key={option.id} className="flex flex-wrap items-baseline gap-x-2">
            {/* Full sökväg och inte bara ankaret: verktyget renderas både på
                kategorisidan och på sin egen sida under /guider. */}
            <a
              href={option.href}
              className="font-medium underline decoration-dotted underline-offset-4 hover:decoration-solid"
            >
              {option.brand} {option.name}
            </a>
            <span className="text-muted-foreground">
              {fmt(lengthM)} m · {price === null ? "pris på förfrågan" : kr(price)}{" "}
              · {option.merchant}
            </span>
          </li>
        ))}
      </ul>
      {note ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{note}</p>
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
