"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Hur vill du låsa upp, och vad är då godkänt?
 *
 * ## Varför verktyget finns
 *
 * Sidans fynd är att SBSC-certifikatet för kategorins ledande lås gäller
 * bortasäkert läge med **blockerade användarkoder**. Det är en abstrakt
 * mening tills man ställer den mot hur läsaren tänkt använda låset. Väljer du
 * bricka eller app ligger du inom det provade läget. Väljer du kod gör du
 * inte det, och då är frågan värd att ställa till försäkringsbolaget innan
 * köpet och inte efter en inbrottsanmälan.
 *
 * Verktyget rangordnar därför inte på betyg utan på vad som är belagt för
 * just den öppningsmetod läsaren valt.
 *
 * ## Varför boendeformen är med
 *
 * Ytterdörren till en lägenhet tillhör normalt föreningen eller hyresvärden,
 * och ingår ofta i ett låssystem med huvudnyckel. Att byta hela låsenheten
 * kan kräva tillstånd även när du betalar själv. Ett lås som monteras utanpå
 * insidans vred rör inte den befintliga enheten, och den skillnaden är
 * praktiskt avgörande just där.
 */

const METHODS = [
  {
    key: "kod",
    label: "Med kod på knappsatsen",
    headline: "Här ligger du utanför det certifierade läget",
    why: "SBSC:s certifikat för Yale Doorman L3 anger att godkännandet gäller bortasäkert läge med blockerade användarkoder och öppning med nyckelbricka eller app. Väljer du kod som huvudsaklig väg in använder du alltså låset i en annan konfiguration än den som provats. Det säger ingenting om att låset skulle vara osäkert, men det är värt att fråga försäkringsbolaget om innan du köper.",
    flagged: true,
  },
  {
    key: "bricka",
    label: "Med nyckelbricka",
    headline: "Det här är den provade konfigurationen",
    why: "Nyckelbricka är en av de två öppningsmetoder SBSC:s certifikat uttryckligen omfattar, tillsammans med appen. Väljer du bricka som huvudsaklig väg in använder du låset som det är provat och godkänt.",
    flagged: false,
  },
  {
    key: "app",
    label: "Med appen i mobilen",
    headline: "Det här är den provade konfigurationen",
    why: "Appen är den andra öppningsmetod certifikatet omfattar. Tänk däremot på driften: en app kräver uppkoppling, och för Yale Doorman krävs dessutom en ConnectX-brygga som säljs separat för att nå låset på avstånd.",
    flagged: false,
  },
  {
    key: "finger",
    label: "Med fingeravtryck",
    headline: "Ingen uppgift finns om det läget",
    why: "Fingerläsare finns hos Nimly Code Pro och Aqara U200, men vi har inte hittat något certifikat som anger vad som gäller för den öppningsmetoden. Frånvaro av uppgift är inte samma sak som ett nej, men det betyder att du inte kan kontrollera saken i förväg.",
    flagged: true,
  },
] as const;

const HOMES = [
  { key: "villa", label: "Villa eller radhus", ownDoor: true },
  { key: "brf", label: "Bostadsrätt", ownDoor: false },
  { key: "hyres", label: "Hyresrätt", ownDoor: false },
] as const;

type MethodKey = (typeof METHODS)[number]["key"];
type HomeKey = (typeof HOMES)[number]["key"];

/** Ett lås ur rankningen, med det verktyget behöver för att sortera. */
export type LockOption = {
  id: string;
  brand: string;
  name: string;
  price: string;
  priceValue: number;
  merchant: string;
  href: string;
  /**
   * cert     — vi har läst ett certifikat hos SBSC
   * klass3   — butik eller tillverkare anger klass 3 eller S3
   * lagre    — en klass anges, men lägre än 3
   * ingen    — ingen klass anges
   * nekat    — butiken skriver att låset inte är godkänt
   */
  status: "cert" | "klass3" | "lagre" | "ingen" | "nekat";
  /** Butikens eller certifikatets egen formulering, kort. */
  statusNote: string;
  /** Har knappsats för kod. */
  hasCode: boolean;
  /** Byter ut hela låsenheten i dörren. */
  replacesUnit: boolean;
};

const PILES: Record<
  LockOption["status"],
  { title: string; tone: "strong" | "plain" }
> = {
  cert: { title: "Certifikat vi läst hos SBSC", tone: "strong" },
  klass3: { title: "Klass 3 anges, certifikat ej funnet", tone: "strong" },
  lagre: { title: "Lägre klass än 3, alltså inte godkänd låsenhet", tone: "plain" },
  ingen: { title: "Ingen klass anges av butiken", tone: "plain" },
  nekat: { title: "Butiken anger att låset inte är godkänt", tone: "plain" },
};

const ORDER: LockOption["status"][] = [
  "cert",
  "klass3",
  "lagre",
  "ingen",
  "nekat",
];

export function LockApprovalPicker({
  options,
  className,
}: {
  options: LockOption[];
  className?: string;
}) {
  const [method, setMethod] = useState<MethodKey | null>(null);
  const [home, setHome] = useState<HomeKey | null>(null);

  const picked = method ? METHODS.find((m) => m.key === method)! : null;
  const pickedHome = home ? HOMES.find((h) => h.key === home)! : null;

  return (
    <div
      data-slot="lock-approval-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Hur tänker du låsa upp till vardags?
        </legend>
        <div className="flex flex-wrap gap-2">
          {METHODS.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={method === o.key}
              onClick={() => setMethod(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Hur bor du? Frivilligt, men det avgör om du får byta låset alls.
        </legend>
        <div className="flex flex-wrap gap-2">
          {HOMES.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={home === o.key}
              onClick={() => setHome(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        {picked ? (
          <>
            <p className="text-sm text-muted-foreground">
              Vad som är belagt, och vad som inte är det
            </p>
            <p className="font-heading text-h3 text-brand">{picked.headline}</p>
            <p className="mt-3 text-sm">{picked.why}</p>

            {pickedHome && !pickedHome.ownDoor ? (
              <p className="mt-3 border-t border-border pt-3 text-sm">
                <span className="font-medium">Fråga föreningen först.</span>{" "}
                Ytterdörren tillhör normalt {pickedHome.key === "brf"
                  ? "föreningen"
                  : "hyresvärden"}{" "}
                och inte dig, och den ingår ofta i ett låssystem med huvudnyckel
                för fastighetsskötsel. Ett lås som monteras utanpå insidans vred
                rör inte den befintliga låsenheten och brukar vara enklare att få
                igenom, men frågan ska ställas ändå.
              </p>
            ) : null}

            <Piles method={picked.key} options={options} />

            <button
              type="button"
              onClick={() => {
                setMethod(null);
                setHome(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Certifikatet för kategorins ledande lås gäller bara vissa
            öppningsmetoder. Välj hur du tänker låsa upp, så får du veta vad som
            är belagt för just den vägen in.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Certifikatuppgiften kommer från SBSC:s certifikat 21-537, läst
        2026-08-03. Definitionen av godkänd låsenhet kommer från
        Stöldskyddsföreningens norm SSF 3522 och SSF 3523. Låsklasserna per
        produkt är butikens egna uppgifter. Guiden är ingen juridisk
        rådgivning och ersätter inte ett samtal med ditt försäkringsbolag.
      </p>
    </div>
  );
}

/**
 * Låsen sorterade efter vad som är belagt om deras godkännande.
 *
 * När läsaren valt kod visas dessutom vilka lås som över huvud taget har en
 * knappsats. Att rekommendera ett lås utan kod till någon som vill låsa upp
 * med kod vore att svara på en annan fråga än den som ställdes.
 */
function Piles({
  method,
  options,
}: {
  method: MethodKey;
  options: LockOption[];
}) {
  const relevant =
    method === "kod" ? options.filter((o) => o.hasCode) : options;
  const withoutCode =
    method === "kod" ? options.filter((o) => !o.hasCode) : [];

  /* Kopia innan sort: options är en prop och får inte muteras. Billigast
     först inom varje hög, eftersom frågan är vad som duger. */
  const byPile = ORDER.map((key) => ({
    key,
    rows: relevant
      .filter((o) => o.status === key)
      .slice()
      .sort((a, b) => a.priceValue - b.priceValue),
  })).filter((p) => p.rows.length);

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {relevant.length} av {options.length} lås{" "}
        {method === "kod" ? "har en knappsats" : "är aktuella"}
      </p>

      {byPile.map(({ key, rows }) => (
        <div key={key} className="mt-3">
          <p
            className={cn(
              "text-sm font-medium",
              PILES[key].tone === "strong" ? "text-brand" : "text-foreground",
            )}
          >
            {PILES[key].title}
          </p>
          <ul className="mt-1.5 flex flex-col gap-2 text-sm">
            {rows.map((o) => (
              <li key={o.id}>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  {/* Full sökväg och inte bara ankaret: verktyget renderas
                      både på kategorisidan och på sin egen sida. */}
                  <a
                    href={o.href}
                    className="font-medium underline decoration-dotted underline-offset-4 hover:decoration-solid"
                  >
                    {o.brand} {o.name}
                  </a>
                  <span className="text-muted-foreground">
                    {o.price} · {o.merchant}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {o.statusNote}
                  {o.replacesUnit
                    ? " Byter ut hela låsenheten."
                    : " Monteras utanpå insidans vred."}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {withoutCode.length ? (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            Saknar knappsats helt:{" "}
          </span>
          {withoutCode.map((o) => `${o.brand} ${o.name}`).join(", ")}. De öppnas
          med app, bricka eller nyckel, vilket kan vara ett fullgott val men
          inte om koden är hela poängen.
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
