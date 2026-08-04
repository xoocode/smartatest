"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Vad ser kameran, och vilken maskering håller för det?
 *
 * ## Varför verktyget finns
 *
 * Rankningen väger integritet till trettio procent, och det gör att en billig
 * fast kamera slår en dyr med panorering och rörelsespårning. Det ser
 * bakvänt ut tills man vet varför, och skälet är en mening i respektive
 * tillverkares supportdokumentation som ingen butik för vidare.
 *
 * Verktyget ställer den fråga som avgör: **syns något som inte är din tomt i
 * kamerans bild?** Gör det inte det är hela resonemanget överspelat och du
 * ska köpa på bild och pris. Gör det det är maskeringen inte en trevlig extra
 * funktion utan förutsättningen för att bevakningen håller sig inom
 * privatundantaget.
 *
 * ## De två sakerna som blandas ihop
 *
 * **Detekteringszon** styr vad kameran larmar om. Den stoppar notiser.
 * **Sekretesszon** svartar ut pixlarna i inspelningen. Bara den senare är den
 * digitala maskering IMY pekar ut som åtgärd. Arlo förklarar själva skillnaden
 * i sin FAQ; de flesta butiker gör det inte.
 *
 * ## Varför rörelse är den avgörande frågan
 *
 * Alla fem fabrikat har sekretesszoner. Alla fem publicerar också en
 * begränsning, och den handlar i samtliga fall om vad som händer när kameran
 * rör sig. Arlo raderar zonerna, Tapo och Reolink förskjuter dem. Därför
 * frågar verktyget efter rörelse och inte efter varumärke.
 */

/** Vad kameran ser utanför den egna tomten. */
const VIEWS = [
  {
    key: "egen",
    label: "Bara min egen tomt",
    headline: "Maskering behövs inte för lagens skull",
    why: "Ser kameran bara din egen tomt, och tar den inte upp ljud utanför den, ligger bevakningen inom privatundantaget och varken GDPR eller kamerabevakningslagen gäller. Då ska du välja på bild, lagring och kostnad i stället, och en kamera med panorering är plötsligt ett rimligt köp.",
    needsMask: false,
  },
  {
    key: "granne",
    label: "En bit av grannens tomt",
    headline: "Här är maskeringen förutsättningen",
    why: "IMY listar ytor på grannens tomt som syns över staketet som ett av de områden som är lättast att missa. Åtgärden de själva pekar ut är att vinkla om kameran eller maskera området digitalt. Då räcker det inte att kameran har någon sorts zon: den måste ha en sekretesszon som håller även när kameran används.",
    needsMask: true,
  },
  {
    key: "gata",
    label: "Trottoar, väg eller gångstig",
    headline: "Här är maskeringen förutsättningen",
    why: "En plats dit allmänheten har tillträde faller utanför privatundantaget, och IMY nämner uttryckligen trottoaren utanför uppfarten. Det gäller även vägar över egen mark när andra använder dem, inklusive servitutsvägar. Maskera bort ytan, eller vinkla om kameran tills den inte syns.",
    needsMask: true,
  },
  {
    key: "hus",
    label: "En annan fastighet på håll",
    headline: "Här är maskeringen förutsättningen",
    why: "IMY nämner en fastighet längre bort som syns över en häck som ett av de områden som är lätta att missa. Att den ligger på avstånd hjälper inte: personuppgift är ett brett begrepp och omfattar allt som kan användas för att identifiera någon, även i kombination med annat och även med hjälpmedel.",
    needsMask: true,
  },
] as const;

type ViewKey = (typeof VIEWS)[number]["key"];

/** En kamera ur rankningen, med det verktyget behöver för att sortera. */
export type CameraPrivacyOption = {
  id: string;
  brand: string;
  name: string;
  price: string;
  priceValue: number;
  merchant: string;
  href: string;
  /**
   * Hur tillverkarens egen dokumentation står sig när kameran används.
   *
   * solid    — funktionen gäller modellen och inget urholkar den
   * caveat   — brasklapp som bara slår in vid något du kan låta bli
   * moves    — zonen förskjuts eller raderas vid normal användning
   * unclear  — tillverkaren listar inte modellen, eller reserverar sig
   */
  mask: "solid" | "caveat" | "moves" | "unclear";
  /** Tillverkarens egen formulering, kort. */
  maskNote: string;
};

const PILES: Record<
  CameraPrivacyOption["mask"],
  { title: string; tone: "strong" | "plain" }
> = {
  solid: { title: "Maskeringen håller", tone: "strong" },
  caveat: { title: "Håller, med ett förbehåll", tone: "strong" },
  moves: { title: "Zonen flyttar sig eller raderas", tone: "plain" },
  unclear: { title: "Går inte att kontrollera i förväg", tone: "plain" },
};

const ORDER: CameraPrivacyOption["mask"][] = [
  "solid",
  "caveat",
  "moves",
  "unclear",
];

export function CameraPrivacyPicker({
  options,
  className,
}: {
  options: CameraPrivacyOption[];
  className?: string;
}) {
  const [view, setView] = useState<ViewKey | null>(null);
  const picked = view ? VIEWS.find((v) => v.key === view)! : null;

  return (
    <div
      data-slot="camera-privacy-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Vad kommer med i bild utöver din egen tomt?
        </legend>
        <div className="flex flex-wrap gap-2">
          {VIEWS.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={view === o.key}
              onClick={() => setView(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        {picked ? (
          <>
            <p className="text-sm text-muted-foreground">
              Vad som gäller, och vad som håller
            </p>
            <p className="font-heading text-h3 text-brand">{picked.headline}</p>
            <p className="mt-3 text-sm">{picked.why}</p>

            <Piles needsMask={picked.needsMask} options={options} />

            <button
              type="button"
              onClick={() => setView(null)}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Ställ dig där kameran ska sitta och titta åt det håll den ska titta.
            Det som syns därifrån är det kameran spelar in, och det avgör både
            vad som är tillåtet och vilken kamera som passar.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Reglerna kommer från Integritetsskyddsmyndighetens vägledning om
        privatundantaget. Uppgifterna om sekretesszoner är lästa i respektive
        tillverkares egen supportdokumentation 2026-08-03. Guiden är ingen
        juridisk rådgivning, och vi har inte monterat eller filmat med någon
        kamera.
      </p>
    </div>
  );
}

/**
 * Kamerorna sorterade efter hur tillverkarens egen dokumentation står sig.
 *
 * När maskering inte behövs visas ingen sortering alls, eftersom frågan då är
 * en annan och listan bredvid svarar på den. Att ändå rangordna på maskering
 * hade fått verktyget att peka mot en billigare kamera av fel skäl.
 */
function Piles({
  needsMask,
  options,
}: {
  needsMask: boolean;
  options: CameraPrivacyOption[];
}) {
  if (!needsMask) {
    return (
      <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
        Alla sju kameror i jämförelsen duger då. Gå efter bild, lagring och vad
        som slutar fungera utan abonnemang, alltså tabellen ovanför. Det är
        också den enda situationen där en kamera med panorering och
        rörelsespårning är ett rent uppgraderingsköp.
      </p>
    );
  }

  /* Kopia innan sort: options är en prop och får inte muteras. Billigast
     först inom varje hög, eftersom frågan är vad som duger och inte vad som
     fått högst betyg. */
  const byPile = ORDER.map((key) => ({
    key,
    rows: options
      .filter((o) => o.mask === key)
      .slice()
      .sort((a, b) => a.priceValue - b.priceValue),
  })).filter((p) => p.rows.length);

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {options.filter((o) => o.mask === "solid" || o.mask === "caveat").length}{" "}
        av {options.length} kameror har en maskering som håller
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
                <p className="text-xs text-muted-foreground">{o.maskNote}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
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
