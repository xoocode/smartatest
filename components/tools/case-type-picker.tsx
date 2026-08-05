"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  CASE_CHARGING as CHARGING,
  CASE_LOOKS as LOOK,
  CASE_USES as USE,
  decideCaseType as decide,
  type CaseChargingKey as ChargingKey,
  type CaseFinish,
  type CaseLookKey as LookKey,
  type CaseUseKey as UseKey,
  type CaseVerdict as Verdict,
} from "@/lib/tool-logic/case-type";

/**
 * Svarar på den fråga kategorin faktiskt ställer: vilken sorts skal behöver du,
 * och vilka av dem vi rankat uppfyller kraven.
 *
 * Kategorispecifikt verktyg, inte layout. Det finns eftersom skalen inte går
 * att skilja åt på priset och knappt på bilden. Spigen Ultra Hybrid för 199
 * kronor och Ultra Hybrid MagFit för 269 ser likadana ut och heter nästan
 * samma sak, men det ena har magnetring och det andra inte. Väljer du fel
 * upptäcker du det när laddaren faller av, och då går det inte att rätta till.
 *
 * Reglerna är avsiktligt få och läsbara i stället för en poängmodell:
 *
 * 1. Hörnen avgör vid fall. En telefon landar nästan aldrig platt, så förstärkta hörn är det som gör skillnad utomhus. Ett hårt skal utan mjuk ram för i stället stöten vidare in i ramen.
 * 2. Kamerakanten avgör i fickan. Linserna repas av sand och nycklar oftare än de spricker, och bara en kant högre än linserna hindrar det.
 * 3. Magnetringen är ett eget svar och inte något som härleds ur priset. En metallplatta för bilhållare räknas inte som ring, eftersom den varken laddar eller håller en plånbok.
 *
 * ⚠️ Ingen fråga handlar om fallhöjd eller militärstandard. Talen är
 * tillverkarnas egna och går enligt standarden inte att jämföra mellan
 * tillverkare, så att låta läsaren välja på dem vore att bygga in ett mått vi
 * själva underkänt i viktningen.
 *
 * Träfflistan sorteras billigast först, inte högst betyg först, av samma skäl
 * som vattenlarmsväljaren: frågan är vad som räcker.
 */

/* Frågorna och regeluppsättningen bor i lib/tool-logic/case-type.ts, där
   agentverktyget anropar samma decideCaseType(). Produkturvalet stannar här. */

/**
 * Ett skal verktyget kan peka på.
 *
 * Serialiserbar och skickas in som prop från serversidan i stället för att
 * komponenten importerar produktdatan själv, så klientbunten bara får de fält
 * den renderar.
 */
export type CaseTypeProduct = {
  id: string;
  brand: string;
  name: string;
  price: string;
  /** Sorteringsnyckel. Priset ovan är formaterat och går inte att jämföra. */
  priceValue: number;
  href: string;
  magnet: "ring" | "platta" | "ingen";
  corners: boolean;
  camera: "lock" | "inbyggt" | "ring" | "ingen";
  finish: CaseFinish;
};

export type CaseTypePickerProps = {
  products?: CaseTypeProduct[];
  className?: string;
};

const CAMERA_NOTE: Record<CaseTypeProduct["camera"], string> = {
  lock: "lock över linserna",
  inbyggt: "inbyggt kamerablock",
  ring: "kant runt kameran",
  ingen: "ingen kamerakant",
};

export function CaseTypePicker({ products = [], className }: CaseTypePickerProps) {
  const [use, setUse] = useState<UseKey | null>(null);
  const [charging, setCharging] = useState<ChargingKey | null>(null);
  const [look, setLook] = useState<LookKey | null>(null);

  const verdict = decide(use, charging, look);

  return (
    <div
      data-slot="case-type-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. Se traps.md. */}
        <legend className="mb-2.5 text-sm font-medium">
          Var är telefonen mest?
        </legend>
        <div className="flex flex-wrap gap-2">
          {USE.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={use === o.key}
              onClick={() => setUse(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
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
          Hur ska skalet se ut?
        </legend>
        <div className="flex flex-wrap gap-2">
          {LOOK.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={look === o.key}
              onClick={() => setLook(o.key)}
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
                term="Förstärkta hörn"
                value={verdict.needsCorners ? "Ja" : "Behövs inte"}
              />
              <Row
                term="Kant högre än linserna"
                value={verdict.needsCameraCover ? "Ja" : "Behövs inte"}
              />
              <Row
                term="Magnetring"
                value={verdict.needsMagnetRing ? "Ja" : "Behövs inte"}
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
                setUse(null);
                setCharging(null);
                setLook(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Svara på de tre frågorna, så får du veta vilken sorts skal som
            räcker och vilka av dem vi rankat som uppfyller kraven.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Guiden bygger på specifikationerna i jämförelsen ovan, alltså på vad
        butiker och tillverkare uppger. Vi har inte tappat en enda telefon.
      </p>
    </div>
  );
}

/**
 * Vilka av de rankade skalen som uppfyller kraven.
 *
 * Filtrerar på samma villkor som verdicten visar, aldrig på rankning. Att
 * föreslå vinnaren till någon som vill se telefonens färg vore fel: den är
 * mattsvart, och Spigen Ultra Hybrid MagFit är genomskinlig trots att den
 * ligger lägre i listan.
 */
function Matches({
  verdict,
  products,
}: {
  verdict: Verdict;
  products: CaseTypeProduct[];
}) {
  if (!products.length) return null;

  const ok = products.filter((p) => {
    /* En metallplatta är inte en svagare ring utan en annan produkt: den
       laddar ingenting. För den som laddar magnetiskt är skalet alltså
       oanvändbart för ändamålet och hör inte hemma i en lista över vad som
       räcker. */
    if (verdict.needsMagnetRing && p.magnet !== "ring") return false;
    if (verdict.needsCorners && !p.corners) return false;
    if (verdict.needsCameraCover && p.camera === "ingen") return false;
    if (verdict.wantsFinish && !verdict.wantsFinish.includes(p.finish)) {
      return false;
    }
    return true;
  });

  if (!ok.length) {
    /* Nås inte av någon av de arton kombinationerna med dagens tolv skal,
       kontrollerat genom att räkna igenom alla. Grenen står kvar ändå, för
       urvalet ändras när en produkt byts ut, och ett tomt resultat utan
       förklaring läser som ett fel i verktyget.

       ⚠️ Texten är avsiktligt allmän. En tidigare version namngav läder
       respektive genomskinligt som skälet, vilket hade blivit fel så snart
       grenen faktiskt utlöstes av något annat: den kombination som en dag
       tömmer listan är per definition inte den vi förutsåg. */
    return (
      <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
        Inget av skalen vi rankat uppfyller alla tre kraven samtidigt. Släpp det
        krav som betyder minst för dig, eller titta bland Andra skal vi
        övervägde. Kravet som oftast är svårast att förena med resten är ytan:
        ett skal valt för sitt utseende är sällan valt för sina hörn.
      </p>
    );
  }

  /* Kopia innan sort: products är en prop och får inte muteras. */
  const sorted = [...ok].sort((a, b) => a.priceValue - b.priceValue);

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {sorted.length === products.length
          ? "Alla skal vi rankat räcker"
          : `${sorted.length} av ${products.length} skal vi rankat räcker`}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Billigast först, inte högst betyg först. Frågan här är vad som räcker.
      </p>
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
              {CAMERA_NOTE[p.camera]}
              {p.corners ? " · förstärkta hörn" : ""} · {p.price}
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
