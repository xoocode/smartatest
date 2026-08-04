"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  CURTAIN_MOUNTS as MOUNT,
  CURTAIN_NOISE as NOISE,
  CURTAIN_WINDOWS as WINDOW,
  decideMount as decide,
  type CurtainMountKey as MountKey,
  type CurtainMountType,
  type CurtainNoiseKey as NoiseKey,
  type CurtainWindow,
  type CurtainWindowKey as WindowKey,
  type MountVerdict as Verdict,
} from "@/lib/tool-logic/curtain-mount";

/**
 * Svarar på den fråga som avgör allt annat i kategorin: vad hänger i ditt
 * fönster, och vilken motor går därför att montera på det.
 *
 * Kategorispecifikt verktyg, inte layout. Det finns eftersom felköpet här inte
 * är "sämre produkt" utan "produkten går inte att sätta fast". SwitchBot säljer
 * Curtain 3 som tre olika artikelnummer för U-skena, I-skena och stång, och
 * Aqara sin Curtain Driver E1 som två. Ingen svensk sida i kategorin gör den
 * skillnaden tydlig, och butikernas egna produktnamn hjälper inte: "Curtain
 * Gardinkontroll U-skena" och "Curtain Gardinkontroll för gardinstång" ligger
 * bredvid varandra i samma lista till nästan samma pris.
 *
 * Reglerna är avsiktligt få och läsbara i stället för en poängmodell:
 *
 * 1. Rullgardin och persienn är egna produkttyper, inte varianter av gardinmotorn. En gardinrobot kan inte flytta en rullgardin.
 * 2. Hänger gardinen i stång krävs en stångvariant. Ingen av produkterna vi rankar är en sådan, och då säger verktyget det i stället för att föreslå närmaste sak.
 * 3. Vet läsaren inte vilken skena som sitter uppe är svaret hur man tar reda på det, inte en gissning.
 *
 * Ljudfrågan påverkar aldrig vad som passar, bara i vilken ordning träffarna
 * presenteras och vad texten lyfter. En produkt som inte går att montera blir
 * inte mer monterbar av att den är tyst.
 */

/* Fönstertyperna och regeluppsättningen bor i lib/tool-logic/curtain-mount.ts,
   där agentverktyget anropar samma decideMount(). */

/**
 * En produkt verktyget kan peka på när den passar det användaren valt.
 *
 * Serialiserbar och skickas in som prop från serversidan snarare än att
 * komponenten importerar produktdatan själv. Klientbunten får då bara de fält
 * den renderar, och verktyget förblir kategorioberoende.
 */
export type CurtainProduct = {
  id: string;
  brand: string;
  name: string;
  price: string;
  href: string;
  window: CurtainWindow;
  mounts: CurtainMountType[];
  /** Tillverkarens egen dB-uppgift. Utelämnad när ingen anges. */
  quietDb?: number;
};

export type MountPickerProps = {
  /** Kandidater att rekommendera. Utan dem visas bara vilken typ du ska leta efter. */
  products?: CurtainProduct[];
  className?: string;
};

export function MountPicker({ products = [], className }: MountPickerProps) {
  const [win, setWin] = useState<WindowKey | null>(null);
  const [mount, setMount] = useState<MountKey | null>(null);
  const [noise, setNoise] = useState<NoiseKey | null>(null);

  const verdict = decide(win, mount, noise);

  return (
    <div data-slot="mount-picker" className={cn("flex flex-col gap-row", className)}>
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Vad hänger i fönstret?
        </legend>
        <div className="flex flex-wrap gap-2">
          {WINDOW.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={win === o.key}
              onClick={() => {
                setWin(o.key);
                /* Skenfrågan gäller bara gardintyg. Lämnas ett gammalt svar
                   kvar när läsaren byter till rullgardin får verdicten ett
                   villkor som inte längre visas på skärmen. */
                if (o.key !== "gardin") setMount(null);
              }}
            />
          ))}
        </div>
      </fieldset>

      {win === "gardin" ? (
        <fieldset>
          <legend className="mb-2.5 text-sm font-medium">
            Hänger gardinen i stång eller skena?
          </legend>
          <div className="flex flex-wrap gap-2">
            {MOUNT.map((o) => (
              <Pill
                key={o.key}
                label={o.label}
                active={mount === o.key}
                onClick={() => setMount(o.key)}
              />
            ))}
          </div>
        </fieldset>
      ) : null}

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Måste den gå tyst?
        </legend>
        <div className="flex flex-wrap gap-2">
          {NOISE.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={noise === o.key}
              onClick={() => setNoise(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        {verdict ? (
          <>
            <p className="text-sm text-muted-foreground">Det du behöver är</p>
            <p className="font-heading text-h3 text-brand">{verdict.headline}</p>

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
                setWin(null);
                setMount(null);
                setNoise(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Svara på frågorna, så får du veta vilken typ av motor som passar
            just din upphängning och vilka av produkterna vi rankat som gör det.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Upphängningen avgör mer än märket. Är du osäker på vilken skena du har,
        fotografera den underifrån och jämför med butikens bild innan du
        beställer.
      </p>
    </div>
  );
}

/**
 * Vilka av de rankade produkterna som passar det användaren valt.
 *
 * Filtrerar på samma villkor som verdicten visar, aldrig på rankning. Att
 * föreslå testvinnaren till någon med persienner vore precis det fel hela
 * verktyget finns för att förhindra. Ljudsvaret får bara sortera, aldrig
 * filtrera: en tyst produkt som inte passar skenan är fortfarande fel produkt.
 */
function Matches({
  verdict,
  products,
}: {
  verdict: Verdict;
  products: CurtainProduct[];
}) {
  if (!products.length) return null;

  const ok = products.filter(
    (p) =>
      p.window === verdict.needsWindow &&
      (verdict.needsMount === null || p.mounts.includes(verdict.needsMount)),
  );

  if (!ok.length) {
    return (
      <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
        Ingen av produkterna vi rankat passar den upphängningen. Se Andra
        produkter vi övervägde, där varianterna för stång och I-skena står med
        pris och butik.
      </p>
    );
  }

  const sorted = verdict.quietFirst
    ? /* Kopia innan sort: products är en prop och får inte muteras. Produkter
         utan angiven dB hamnar sist, eftersom en tillverkare som inte anger
         siffran inte ska kunna sorteras före en som gör det. */
      [...ok].sort((a, b) => (a.quietDb ?? 999) - (b.quietDb ?? 999))
    : ok;

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {sorted.length === 1
          ? "En av produkterna vi rankat passar"
          : `${sorted.length} av ${products.length} produkter vi rankat passar`}
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
              {p.quietDb ? `${p.quietDb} dB tyst läge` : "ljudnivå anges ej"} ·{" "}
              {p.price}
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
