"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  KEEP_OPTIONS as KEEP,
  NEUTRAL_OPTIONS as NEUTRAL,
  WHO_OPTIONS as WHO,
  decideInstallation as decide,
  type InstallationVerdict as Verdict,
  type KeepKey,
  type NeutralKey,
  type WhoKey,
} from "@/lib/tool-logic/switch-installation";

/**
 * Svarar på de två frågor som avgör vilken smart strömbrytare som är möjlig i
 * just ditt hem: har du nolledare i dosan, och får du göra jobbet själv.
 *
 * Kategorispecifikt verktyg, inte layout. Det finns eftersom ingen svensk
 * jämförelse kopplar ihop de två frågorna, trots att de hänger ihop. Nolledaren
 * avgör vilka produkter som fungerar, och den avgör samtidigt om arbetet är ett
 * brytarbyte, vilket Elsäkerhetsverket tillåter, eller en förändring av den
 * fasta installationen, vilket kräver registrerat elinstallationsföretag.
 *
 * Reglerna är avsiktligt få och läsbara i stället för en poängmodell:
 *
 * 1. En relämodul bakom brytaren kräver nolledare och är en ändring av den fasta installationen. Kjell skriver själv "kräver behörig elektriker" på sina egna produktsidor.
 * 2. En smart brytare som ersätter den befintliga är ett brytarbyte. "Du får själv byta en befintlig strömbrytare för högst 16 A, som är placerad i en egen kapsling eller dosa", med myndighetens eget tillägg "om du vet hur du ska göra".
 * 3. En trådlös batteribrytare rör aldrig 230 V och är alltid tillåten.
 *
 * Verktyget ger aldrig ett grönt ljus utan förbehållet. Är läsaren osäker är
 * svaret att anlita ett elinstallationsföretag, vilket är myndighetens egen
 * formulering och inte vår försiktighet.
 */

/* Valen och regeluppsättningen bor i lib/tool-logic/switch-installation.ts,
   där agentverktyget anropar samma decideInstallation(). Kraven kommer tillbaka
   som needsKind, needsNoNeutral och needsSelfInstall, och urvalet mot dem görs
   här nere där produkterna finns. */

/**
 * En produkt verktyget kan peka på när den passar det användaren valt.
 *
 * Serialiserbar och skickas in som prop från serversidan snarare än att
 * komponenten importerar produktdatan själv. Klientbunten får då bara de fält
 * den renderar, och verktyget förblir kategorioberoende.
 */
export type SwitchProduct = {
  id: string;
  brand: string;
  name: string;
  price: string;
  href: string;
  kind: "rela" | "brytare";
  needsNeutral: boolean;
};

export type InstallationPickerProps = {
  /** Kandidater att rekommendera. Utan dem visas bara vilken typ du ska leta efter. */
  products?: SwitchProduct[];
  className?: string;
};

export function InstallationPicker({
  products = [],
  className,
}: InstallationPickerProps) {
  const [neutral, setNeutral] = useState<NeutralKey | null>(null);
  const [keep, setKeep] = useState<KeepKey | null>(null);
  const [who, setWho] = useState<WhoKey | null>(null);

  const verdict = decide(neutral, keep, who);

  return (
    <div
      data-slot="installation-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Finns det nolledare i strömbrytardosan?
        </legend>
        <div className="flex flex-wrap gap-2">
          {NEUTRAL.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={neutral === o.key}
              onClick={() => setNeutral(o.key)}
            />
          ))}
        </div>
      </fieldset>

      {neutral === "vetej" ? (
        <p className="rounded-md bg-muted pad-card text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Så tar du reda på det: </span>
          slå av säkringen, skruva loss brytaren och titta efter en blå ledare
          utöver de svarta eller bruna. Finns den är det sannolikt nolledaren.
          Ett vanligt undantag är att ett vägguttag sitter i golvnivå rakt under
          brytaren, för då passerar ofta en nolledare genom dosan. Räkna med det
          sämre alternativet tills du sett efter, och gissa inte på vad du ser.
        </p>
      ) : null}

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Vad ska hända med knappen du har i dag?
        </legend>
        <div className="flex flex-wrap gap-2">
          {KEEP.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={keep === o.key}
              onClick={() => setKeep(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Vem ska göra installationen?
        </legend>
        <div className="flex flex-wrap gap-2">
          {WHO.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={who === o.key}
              onClick={() => setWho(o.key)}
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

            <p className="mt-3 text-sm">
              <span className="font-medium">Vad reglerna säger: </span>
              {verdict.legal}
            </p>

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
                setNeutral(null);
                setKeep(null);
                setWho(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Svara på de tre frågorna, så får du veta vilken typ du ska leta
            efter och vad som gäller för att installera den.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Reglerna ovan är Elsäkerhetsverkets, återgivna i sammandrag och länkade
        under Källor. De ersätter inte en bedömning på plats. Är du det minsta
        osäker ska du kontakta ett registrerat elinstallationsföretag.
      </p>
    </div>
  );
}

/**
 * Vilka av de testade produkterna som passar det användaren valt.
 *
 * Filtrerar på samma villkor som verdicten visar, aldrig på rankning. Att
 * rekommendera testvinnaren till någon som saknar nolledare vore precis det fel
 * hela verktyget finns för att förhindra, och listan visas därför i den ordning
 * produkterna redan har på sidan utan att någon lyfts fram.
 */
function Matches({
  verdict,
  products,
}: {
  verdict: Verdict;
  products: SwitchProduct[];
}) {
  if (!products.length || verdict.needsKind === null) {
    if (verdict.needsKind === null && products.length) {
      return (
        <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
          Ingen av produkterna vi rankat passar den kombinationen. Trådlösa
          batteribrytare kräver varken nolledare eller elektriker, och de tas upp
          i avsnittet om brytare utan installation.
        </p>
      );
    }
    return null;
  }

  const ok = products.filter(
    (p) =>
      p.kind === verdict.needsKind &&
      (!verdict.needsNoNeutral || !p.needsNeutral),
  );

  if (!ok.length) {
    return (
      <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
        Ingen av produkterna vi rankat matchar. Se Andra produkter vi övervägde,
        där både typ och krav på nolledare står angivna.
      </p>
    );
  }

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {ok.length === products.length
          ? "Alla produkter vi testat passar"
          : `${ok.length} av ${products.length} produkter vi testat passar`}
      </p>
      <ul className="mt-2 flex flex-col gap-1.5 text-sm">
        {ok.map((p) => (
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
              {p.needsNeutral ? "kräver nolla" : "utan nolla"} · {p.price}
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
