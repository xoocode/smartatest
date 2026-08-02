"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

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

const NEUTRAL = [
  { key: "ja", label: "Ja, jag har nolla" },
  { key: "nej", label: "Nej, ingen nolla" },
  { key: "vetej", label: "Vet inte" },
] as const;

const KEEP = [
  { key: "behall", label: "Den ska sitta kvar" },
  { key: "byt", label: "Jag byter gärna knapp" },
] as const;

const WHO = [
  { key: "sjalv", label: "Jag själv" },
  { key: "elektriker", label: "En elektriker" },
] as const;

type NeutralKey = (typeof NEUTRAL)[number]["key"];
type KeepKey = (typeof KEEP)[number]["key"];
type WhoKey = (typeof WHO)[number]["key"];

type Verdict = {
  /** Rubriksvaret: vilken produkttyp som gäller. */
  headline: string;
  /** Vad reglerna säger om just den här kombinationen. */
  legal: string;
  why: string;
  warning?: string;
  /**
   * Kraven i maskinläsbar form, så att produktförslaget filtreras på exakt
   * samma villkor som texten visar. Null betyder att ingen av de rankade
   * produkterna passar och att texten förklarar varför i stället.
   */
  needsKind: "rela" | "brytare" | null;
  needsNoNeutral: boolean;
  needsSelfInstall: boolean;
};

function decide(
  neutral: NeutralKey | null,
  keep: KeepKey | null,
  who: WhoKey | null,
): Verdict | null {
  if (!neutral || !keep || !who) return null;

  const selfInstall = who === "sjalv";
  const noNeutral = neutral === "nej";

  /* Utan nolledare faller varje relämodul bort, oavsett vad läsaren svarat om
     knappen. Att dra fram en nolla är en ändring av den fasta installationen
     och alltså inte en väg runt problemet på egen hand. */
  if (noNeutral) {
    if (keep === "behall") {
      return {
        needsKind: null,
        needsNoNeutral: true,
        needsSelfInstall: selfInstall,
        headline: "Ingen relämodul fungerar",
        legal:
          "Att dra fram en nolledare till dosan är en förändring av den fasta installationen och kräver ett registrerat elinstallationsföretag. Det är inget du får göra själv.",
        why: "Varenda relämodul i jämförelsen behöver nolledare för att kunna hålla sin elektronik igång dygnet runt. Saknas nolla i dosan går den vägen inte, och då finns två alternativ: byt själva knappen mot en smart brytare som klarar sig utan nolledare, eller sätt en trådlös batteribrytare ovanpå den gamla.",
        warning:
          "Vill du ändå ha en relämodul måste någon dra fram nolledaren först. Räkna med att det kostar mer i arbete än modulen kostar i inköp.",
      };
    }
    return {
      needsKind: "brytare",
      needsNoNeutral: true,
      needsSelfInstall: selfInstall,
      headline: "Smart väggbrytare utan krav på nolledare",
      legal: selfInstall
        ? 'Det här är ett brytarbyte. Elsäkerhetsverket skriver: "Du får själv byta en befintlig strömbrytare för högst 16 A, som är placerad i en egen kapsling eller dosa", med tillägget "om du vet hur du ska göra".'
        : "Ett brytarbyte får du göra själv om du vet hur, men det är aldrig fel att låta någon annan göra det.",
      why: "Utan nolledare i dosan faller alla relämoduler bort. Kvar står brytare som är konstruerade för att klara sig utan, och de ersätter hela knappen i stället för att gömma sig bakom den.",
      warning: selfInstall
        ? "Bryt strömmen först och kontrollera att den är bruten. Är du det minsta osäker ska du enligt Elsäkerhetsverket kontakta ett elinstallationsföretag. Felaktiga kopplingar kan innebära livsfara."
        : undefined,
    };
  }

  /* Med nolledare i dosan är båda vägarna öppna, och då avgör knappen och vem
     som ska hålla i skruvmejseln. */
  if (keep === "behall") {
    return {
      needsKind: "rela",
      needsNoNeutral: false,
      needsSelfInstall: false,
      headline: "Relämodul bakom din befintliga brytare",
      legal:
        "Att lägga in en modul i dosan är en förändring av den fasta installationen, inte ett brytarbyte, och kräver ett registrerat elinstallationsföretag. Kjell anger själv att installationen kräver behörig elektriker på flera av de här produkterna.",
      why: "Modulen göms i väggdosan och din knapp fungerar precis som förut, samtidigt som lampan går att styra från appen. Det är den lösning som syns minst och som behåller husets utseende.",
      warning: selfInstall
        ? "Du svarade att du vill göra jobbet själv. Just den här typen är undantaget: en relämodul är inte ett brytarbyte utan en ändring av installationen. Vill du göra det själv ska du i stället byta knappen mot en smart brytare, eller sätta upp en trådlös batteribrytare."
        : undefined,
    };
  }

  return {
    needsKind: "brytare",
    needsNoNeutral: false,
    needsSelfInstall: selfInstall,
    headline: "Smart väggbrytare som ersätter knappen",
    legal: selfInstall
      ? 'Det här är ett brytarbyte. Elsäkerhetsverket skriver: "Du får själv byta en befintlig strömbrytare för högst 16 A, som är placerad i en egen kapsling eller dosa", med tillägget "om du vet hur du ska göra".'
      : "Ett brytarbyte får du göra själv om du vet hur, men det är aldrig fel att låta någon annan göra det.",
    why: "Hela knappen byts mot en ny med elektronik i. Du får nya funktioner direkt på väggen i stället för en osynlig modul, och du slipper trängseln i dosan som en extra modul innebär.",
    warning: selfInstall
      ? "Bryt strömmen först och kontrollera att den är bruten. Är du det minsta osäker ska du enligt Elsäkerhetsverket kontakta ett elinstallationsföretag. Felaktiga kopplingar kan innebära livsfara."
      : undefined,
  };
}

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
                kategorisidan och på sin egen sida under /verktyg, och där
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
