"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Svarar på den fråga som avgör vilket vattenlarm som duger: räcker en siren,
 * eller måste larmet nå din telefon.
 *
 * Kategorispecifikt verktyg, inte layout. Det finns eftersom kategorins felköp
 * inte syns på priset. Numens 204 för 197 kronor och SQ400B för 199 ser ut som
 * samma sorts produkt i samma prisläge, men den ena tjuter bara där den ligger
 * och den andra ringer din telefon. Skillnaden avgör om du får veta om läckan
 * på förmiddagen eller när du kommer hem på kvällen.
 *
 * Reglerna är avsiktligt få och läsbara i stället för en poängmodell:
 *
 * 1. Är bostaden tom under dagarna måste larmet nå telefonen. En siren i ett tomt hus hörs inte, och det är just då en läcka hinner arbeta sig ner genom ett golv.
 * 2. Hubb är ett eget svar, inte något som härleds. Äger du redan rätt hubb blir en sensor för 199 kronor plötsligt ett fullvärdigt köp, och äger du ingen är samma sensor en tjutande dosa.
 * 3. Placeringen sätter kraven på utförandet. Bakom en maskin krävs lös sond, och intill en varmvattenberedare krävs mer än fyrtio graders godkänd arbetstemperatur.
 *
 * Träfflistan sorteras billigast först, inte högst betyg först, av samma skäl
 * som timerväljaren på /utomhustimer: frågan är vad som räcker.
 */

const PLACE = [
  { key: "koket", label: "Kök eller tvättstuga" },
  { key: "trangt", label: "Bakom eller under en maskin" },
  { key: "beredare", label: "Intill varmvattenberedaren" },
] as const;

const PRESENCE = [
  { key: "borta", label: "Bostaden står tom om dagarna" },
  { key: "bortrest", label: "Vi är bortresta längre perioder" },
  { key: "hemma", label: "Någon är nästan alltid hemma" },
] as const;

const HUB = [
  { key: "ingen", label: "Nej, ingen hubb" },
  { key: "tapo", label: "Ja, Tapo" },
  { key: "aqara", label: "Ja, Aqara" },
  { key: "zwave", label: "Ja, Z-Wave" },
] as const;

type PlaceKey = (typeof PLACE)[number]["key"];
type PresenceKey = (typeof PRESENCE)[number]["key"];
type HubKey = (typeof HUB)[number]["key"];

type Verdict = {
  headline: string;
  why: string;
  warning?: string;
  /** Larmet måste nå telefonen. */
  needsApp: boolean;
  /** Hubben användaren redan äger, eller null. */
  ownedHub: Exclude<HubKey, "ingen"> | null;
  needsTightSpots: boolean;
  needsHotSpot: boolean;
};

function decide(
  place: PlaceKey | null,
  presence: PresenceKey | null,
  hub: HubKey | null,
): Verdict | null {
  if (!place || !presence || !hub) return null;

  const needsApp = presence !== "hemma";
  const ownedHub = hub === "ingen" ? null : hub;
  const needsTightSpots = place === "trangt";
  const needsHotSpot = place === "beredare";

  const placeNote = needsTightSpots
    ? "Bakom en maskin kommer du inte åt med en klump på golvet, så du behöver ett larm med lös sond eller kabel."
    : needsHotSpot
      ? "Intill en varmvattenberedare blir det varmare än fyrtio grader, och de flesta larm är bara godkända dit."
      : "Under diskbänken och bakom diskmaskinen är rätt första plats. Enligt Vattenskadecentrum sker flest skador i köket och orsakas av vitvaror.";

  if (!needsApp) {
    return {
      needsApp,
      ownedHub,
      needsTightSpots,
      needsHotSpot,
      headline: "En siren räcker, och då ska du välja på batteritid",
      why: `${placeNote} Är någon nästan alltid hemma hörs sirenen av någon som kan stänga av kranen, och då betalar du för uppkoppling du inte behöver. Välj i stället det larm som håller längst utan att ses till, för det vanligaste skälet till att ett vattenlarm inte larmar är att batteriet dog i tysthet.`,
      warning:
        "Räknar du med att vara bortrest ens en vecka om året faller resonemanget. Då är det värt tvåhundra kronor att larmet når telefonen i stället.",
    };
  }

  if (ownedHub) {
    return {
      needsApp,
      ownedHub,
      needsTightSpots,
      needsHotSpot,
      headline: "Utnyttja hubben du redan har",
      why: `${placeNote} Med en hubb på plats är sensorn det enda du behöver köpa, och då blir de hubbkrävande larmen plötsligt de billigaste. En Tapo-hubb hanterar upp till 64 sensorer, så nästa larm efter det här kostar bara sensorpriset.`,
    };
  }

  return {
    needsApp,
    ownedHub,
    needsTightSpots,
    needsHotSpot,
    headline: "Ett larm som når telefonen utan hubb",
    why: `${placeNote} Står bostaden tom om dagarna är sirenen värdelös, för ingen hör den. Utan hubb betyder det ett larm som talar wifi på egen hand, eller ett paket där basstationen ingår.`,
    warning:
      "Kontrollera att wifi-nätet verkligen når fram. Larmet ska ligga längst in i ett skåp eller i en källare, alltså på de sämsta platser huset har för radiotäckning.",
  };
}

/**
 * En produkt verktyget kan peka på.
 *
 * Serialiserbar och skickas in som prop från serversidan i stället för att
 * komponenten importerar produktdatan själv, så klientbunten bara får de fält
 * den renderar.
 */
export type LeakSensorProduct = {
  id: string;
  brand: string;
  name: string;
  price: string;
  /** Sorteringsnyckel. Priset ovan är formaterat och går inte att jämföra. */
  priceValue: number;
  href: string;
  reach: "siren" | "app" | "hubbapp";
  hub?: "tapo" | "aqara" | "zwave";
  spots: number;
  batteryYears: number;
  reachesTightSpots: boolean;
  hotSpot: boolean;
};

export type LeakSensorPickerProps = {
  products?: LeakSensorProduct[];
  className?: string;
};

export function LeakSensorPicker({
  products = [],
  className,
}: LeakSensorPickerProps) {
  const [place, setPlace] = useState<PlaceKey | null>(null);
  const [presence, setPresence] = useState<PresenceKey | null>(null);
  const [hub, setHub] = useState<HubKey | null>(null);

  const verdict = decide(place, presence, hub);

  return (
    <div
      data-slot="leak-sensor-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Var ska larmet ligga?
        </legend>
        <div className="flex flex-wrap gap-2">
          {PLACE.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={place === o.key}
              onClick={() => setPlace(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Hur ofta står bostaden tom?
        </legend>
        <div className="flex flex-wrap gap-2">
          {PRESENCE.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={presence === o.key}
              onClick={() => setPresence(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Har du redan en hubb hemma?
        </legend>
        <div className="flex flex-wrap gap-2">
          {HUB.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={hub === o.key}
              onClick={() => setHub(o.key)}
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
                term="Måste nå telefonen"
                value={verdict.needsApp ? "Ja" : "Nej"}
              />
              <Row
                term="Lös sond eller kabel"
                value={verdict.needsTightSpots ? "Ja" : "Behövs inte"}
              />
              <Row
                term="Tål över 40 °C"
                value={verdict.needsHotSpot ? "Ja" : "Behövs inte"}
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
                setPlace(null);
                setPresence(null);
                setHub(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Svara på de tre frågorna, så får du veta vilken sorts vattenlarm som
            räcker och vilka av dem vi rankat som uppfyller kraven.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Verktyget bygger på specifikationerna i jämförelsen ovan, alltså på vad
        butiker och tillverkare uppger. Vi har inte provat larmen.
      </p>
    </div>
  );
}

/**
 * Vilka av de rankade produkterna som uppfyller kraven.
 *
 * Filtrerar på samma villkor som verdicten visar, aldrig på rankning. Att
 * föreslå testvinnaren till någon som ska lägga ett larm bakom en tvättmaskin
 * vore fel: den klarar det inte, och Nedis gör det, trots att Nedis ligger
 * lägre i listan.
 */
function Matches({
  verdict,
  products,
}: {
  verdict: Verdict;
  products: LeakSensorProduct[];
}) {
  if (!products.length) return null;

  const ok = products.filter((p) => {
    /* Ett hubbkrävande larm duger bara om användaren äger just den hubben.
       Utan den är produkten inte "nästan tillräcklig" utan oanvändbar för
       ändamålet, och då hör den inte hemma i en lista över vad som räcker. */
    if (p.reach === "hubbapp" && p.hub !== verdict.ownedHub) return false;
    if (verdict.needsApp && p.reach === "siren") return false;
    if (verdict.needsTightSpots && !p.reachesTightSpots) return false;
    if (verdict.needsHotSpot && !p.hotSpot) return false;
    return true;
  });

  if (!ok.length) {
    /* Härlett och inte fast text. Den tidigare versionen beskrev kombinationen
       varmvattenberedare plus lös sond, vilket ingen kan välja: placeringen är
       enkelval. Meddelandet ska säga varför just det här urvalet blev tomt. */
    const reason = verdict.needsHotSpot
      ? "Enda larmet i jämförelsen som är godkänt över fyrtio grader är Aqara T1, och den kräver en Aqara-hubb. Utan hubb finns det alltså ingen produkt vi rankat som är gjord för platsen intill beredaren."
      : verdict.needsTightSpots
        ? "Bara Nedis SmartLife och Numens 204 når in bakom en maskin, och Numens har ingen app. Behöver du både lös sond och notis i telefonen är Nedis det enda alternativet, och den kräver att du själv bygger en automation."
        : "Kombinationen du valt täcks inte av något av de larm vi rankat.";

    return (
      <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
        Ingen av produkterna vi rankat uppfyller alla kraven samtidigt.{" "}
        {reason} Se Andra produkter vi övervägde, eller dela upp det på två larm
        på två platser.
      </p>
    );
  }

  /* Kopia innan sort: products är en prop och får inte muteras. */
  const sorted = [...ok].sort((a, b) => a.priceValue - b.priceValue);

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {sorted.length === products.length
          ? "Alla larm vi rankat räcker"
          : `${sorted.length} av ${products.length} larm vi rankat räcker`}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Billigast först, inte högst betyg först. Frågan här är vad som räcker.
      </p>
      <ul className="mt-2 flex flex-col gap-1.5 text-sm">
        {sorted.map((p) => (
          <li key={p.id} className="flex flex-wrap items-baseline gap-x-2">
            {/* Full sökväg och inte bara ankaret: verktyget renderas både på
                kategorisidan och på sin egen sida under /verktyg, och där finns
                ingen recension att hoppa till. */}
            <a
              href={p.href}
              className="font-medium underline decoration-dotted underline-offset-4 hover:decoration-solid"
            >
              {p.brand} {p.name}
            </a>
            <span className="text-muted-foreground">
              {p.spots > 1 ? `${p.spots} sensorer · ` : ""}
              {p.batteryYears} år batteri · {p.price}
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
