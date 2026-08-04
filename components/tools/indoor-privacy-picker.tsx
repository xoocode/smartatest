"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Vem rör sig i hemmet, och vilken avstängning håller för det?
 *
 * ## Varför verktyget finns
 *
 * Inomhus är juridiken omvänd mot utomhus. IMY skriver att bevakning inne i
 * bostaden oftast omfattas av privatundantaget, till och med när kamerorna är
 * kopplade till en larmcentral. Men myndighetens eget exempel säger nej till
 * det vanligaste skälet att köpa produkten: får du regelbundet besök av
 * hemtjänst bevakas personalen under sin arbetstid, och då gäller GDPR.
 *
 * Skillnaden mot hantverkarfallet är regelbundenheten, inte avsikten. Det är
 * en distinktion som är lätt att missa och dyr att missa, och därför är den
 * första frågan i verktyget.
 *
 * ## Varför avstängningen sorterar listan
 *
 * När någon annan arbetar i hemmet räcker det inte att kameran går att stänga
 * av. Den måste gå att stänga av på ett sätt personalen kan se. Ett
 * motoriserat linsskydd som stängs när larmet slås av är ett mekaniskt
 * besked, ett läge i en app är ett påstående. Därför sorteras listan på hur
 * avstängningen är byggd och inte på betyg.
 */

const SITUATIONS = [
  {
    key: "eget",
    label: "Bara jag och de jag bor med",
    headline: "Privatundantaget gäller",
    why: "Kamerabevakning inne i den egna bostaden omfattas enligt IMY oftast av privatundantaget, och det gäller även om kameran är kopplad till en larmcentral. Då är varken GDPR eller kamerabevakningslagen tillämplig, och du väljer på bild, lagring och pris. Tänk ändå igenom vilka rum som ska undantas: sovrum och badrum är rum där även de du bor med har rimliga förväntningar.",
    needsShield: false,
  },
  {
    key: "hantverkare",
    label: "Ibland en hantverkare eller ett bud",
    headline: "Fortfarande inom undantaget",
    why: "IMY skriver uttryckligen att privatundantaget gäller även om bevakningen vid enstaka tillfällen filmar en hantverkare som utför arbete i bostaden, så länge din avsikt inte är att bevaka hantverkaren. Det är regelbundenheten som är gränsen, inte att någon arbetar. Ett enstaka besök ändrar ingenting.",
    needsShield: false,
  },
  {
    key: "hemtjanst",
    label: "Hemtjänst eller annan personal regelbundet",
    headline: "Här gäller inte privatundantaget",
    why: "IMY har ett eget exempel: får en privatperson regelbundet besök av hemtjänsten omfattas kamerabevakningen inte av privatundantaget, eftersom personalen besöker hemmet i sin yrkesroll och bevakas under sin arbetstid. Då gäller GDPR. I praktiken betyder det att kameran ska vara avstängd när personalen är där, att de ska informeras, och att avstängningen behöver vara något de kan se.",
    needsShield: true,
  },
  {
    key: "inneboende",
    label: "Inneboende, au pair eller uthyrning",
    headline: "Deras hem är också ett hem",
    why: "Någon som bor i bostaden utan att vara en del av ditt hushåll har egna förväntningar på privatliv, och bevakning av gemensamma utrymmen blir då sällan en rent privat angelägenhet. IMY:s villkor om att bevakningen ska vara av rent privat natur och inte ha negativ inverkan på den som bevakas blir svårt att uppfylla. Samma praktiska svar som vid hemtjänst: ett skydd som syns.",
    needsShield: true,
  },
] as const;

type SituationKey = (typeof SITUATIONS)[number]["key"];

/** En kamera ur rankningen, med det verktyget behöver för att sortera. */
export type IndoorCameraOption = {
  id: string;
  brand: string;
  name: string;
  price: string;
  priceValue: number;
  merchant: string;
  href: string;
  /**
   * auto     — motoriserat skydd som stängs när kameran avlarmas
   * fysiskt  — fysiskt skydd du styr själv
   * app      — bara ett programläge
   */
  shield: "auto" | "fysiskt" | "app";
  /** Tillverkarens eller butikens egen formulering, kort. */
  shieldNote: string;
  /** Fungerar fullt ut utan abonnemang. */
  localStorage: boolean;
};

const PILES: Record<
  IndoorCameraOption["shield"],
  { title: string; tone: "strong" | "plain"; note: string }
> = {
  auto: {
    title: "Motoriserat skydd som stängs automatiskt",
    tone: "strong",
    note: "Linsen täcks när kameran avlarmas, utan att någon behöver komma ihåg det. Det är den enda avstängning som fungerar även när du inte tänker på den.",
  },
  fysiskt: {
    title: "Fysiskt skydd du styr själv",
    tone: "strong",
    note: "Ett skydd som täcker eller vrider bort linsen. Syns tvärs över rummet, men kräver att någon trycker på knappen eller sätter dit skyddet.",
  },
  app: {
    title: "Bara ett läge i appen",
    tone: "plain",
    note: "Kameran slutar spela in när läget är på, men objektivet pekar fortfarande in i rummet. Ingen som står framför den kan se om läget är aktivt.",
  },
};

const ORDER: IndoorCameraOption["shield"][] = ["auto", "fysiskt", "app"];

export function IndoorPrivacyPicker({
  options,
  className,
}: {
  options: IndoorCameraOption[];
  className?: string;
}) {
  const [situation, setSituation] = useState<SituationKey | null>(null);
  const picked = situation
    ? SITUATIONS.find((s) => s.key === situation)!
    : null;

  return (
    <div
      data-slot="indoor-privacy-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Vem rör sig i bostaden utöver du och de du bor med?
        </legend>
        <div className="flex flex-wrap gap-2">
          {SITUATIONS.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={situation === o.key}
              onClick={() => setSituation(o.key)}
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

            <Piles needsShield={picked.needsShield} options={options} />

            <button
              type="button"
              onClick={() => setSituation(null)}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Inomhus avgörs det mesta av vem som rör sig i bostaden och inte av
            vad kameran klarar. Välj situation, så får du veta vad som gäller
            och vilken sorts avstängning du behöver.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Reglerna kommer från Integritetsskyddsmyndighetens vägledning om
        privatundantaget och från myndighetens eget exempel om
        hemtjänstpersonal. Uppgifterna om linsskydd är lästa i tillverkarens
        egen dokumentation och i butikens innehållsförteckning, 2026-08-03.
        Guiden är ingen juridisk rådgivning, och vi har inte monterat eller
        filmat med någon kamera.
      </p>
    </div>
  );
}

/**
 * Kamerorna sorterade efter hur avstängningen är byggd.
 *
 * När situationen inte kräver ett synligt skydd visas ingen sortering, för då
 * är frågan en annan och tabellen bredvid svarar på den. Att ändå rangordna
 * på skydd hade pekat mot en dyrare kamera av fel skäl.
 */
function Piles({
  needsShield,
  options,
}: {
  needsShield: boolean;
  options: IndoorCameraOption[];
}) {
  if (!needsShield) {
    return (
      <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
        Alla sju kamerorna i jämförelsen duger då. Gå efter täckning, lagring
        och vad som slutar fungera utan abonnemang, alltså tabellen ovanför. Ett
        fysiskt linsskydd är fortfarande trevligt att ha, men det är inte längre
        det som avgör köpet.
      </p>
    );
  }

  /* Kopia innan sort: options är en prop och får inte muteras. Billigast
     först inom varje hög. */
  const byPile = ORDER.map((key) => ({
    key,
    rows: options
      .filter((o) => o.shield === key)
      .slice()
      .sort((a, b) => a.priceValue - b.priceValue),
  })).filter((p) => p.rows.length);

  const withShield = options.filter((o) => o.shield !== "app").length;

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {withShield} av {options.length} kameror har ett skydd som syns
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
                  {o.shieldNote}
                  {o.localStorage
                    ? " Materialet stannar på ett kort i kameran."
                    : " Materialet hamnar hos tillverkaren, och kräver abonnemang."}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {PILES[key].note}
          </p>
        </div>
      ))}

      <p className="mt-3 text-xs text-muted-foreground">
        Lagringen spelar roll här utöver skyddet. Personal som arbetar i ett hem
        har rimligen lättare att acceptera en kamera vars bilder ligger på ett
        minneskort i bostaden än en vars bilder ligger på en molntjänst i ett
        annat land.
      </p>
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
