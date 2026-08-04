"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Får du sätta upp den, och hörs den?
 *
 * ## Varför verktyget finns
 *
 * Kategorin har en fråga som avgör allt annat och som ingen butik ställer:
 * bor du i lägenhet? IMY:s eget exempel säger att en dörrkamera på en
 * lägenhetsdörr faller utanför privatundantaget, eftersom förbipasserande i
 * trapphuset eller grannars lägenheter riskerar att komma med i bild. Den
 * frågan hör hemma före produktvalet, inte efter.
 *
 * Den andra frågan är strömmen. Två av produkterna kräver en befintlig
 * ringklockledning på 8 till 24 volt, och en av dem har inget batteri alls.
 * Det avgör vilka som ens är möjliga, och det är gratis att ta reda på i
 * förväg och dyrt att upptäcka efteråt.
 *
 * ## Varför signalenheten står under varje produkt
 *
 * En dörrklocka vars enda signal går till telefonen fungerar inte när mobilen
 * ligger på ljudlöst. Tre av sju levereras utan signalenhet, och det står
 * ingenstans i butikslistningen. Verktyget visar det per produkt i stället för
 * att låta läsaren upptäcka det i kartongen.
 */

const HOMES = [
  {
    key: "villa",
    label: "Villa eller radhus med egen entré",
    headline: "Fritt fram, med ett förbehåll",
    why: "Går vägen fram till din dörr över din egen tomt ligger bevakningen inom privatundantaget, och varken GDPR eller kamerabevakningslagen gäller. Förbehållet är trottoaren: syns gatan utanför uppfarten i bild är den en plats dit allmänheten har tillträde, och då behöver du maskera bort den eller vinkla om kameran.",
    blocked: false,
  },
  {
    key: "lagenhet",
    label: "Lägenhet med dörr mot trapphus",
    headline: "Här säger IMY nej",
    why: "Myndigheten har ett eget exempel för precis det här: sker bevakningen från en lägenhetsdörr och förbipasserande i trapphuset eller grannars lägenheter riskerar att komma med i bild, då gäller GDPR och kamerabevakningslagen i stället för privatundantaget. Du blir personuppgiftsansvarig, behöver en rättslig grund och ska informera om bevakningen. Fråga dessutom föreningen eller hyresvärden, eftersom ytterdörren sällan är din.",
    blocked: true,
  },
  {
    key: "egen-entre",
    label: "Lägenhet eller radhus med egen ytterdörr utifrån",
    headline: "Beror på vad som syns",
    why: "Har din dörr ingen gemensam trappuppgång utanför är trapphusproblemet borta. Kvar står frågan om gångvägen fram till dörren är gemensam eller allmän mark. Är den det gäller samma sak som för trottoaren: maskera bort den, eller rikta kameran nedåt mot den egna tröskeln.",
    blocked: false,
  },
] as const;

const POWER = [
  { key: "ledning", label: "Ja, det finns en ringklockledning", wired: true },
  { key: "ingen", label: "Nej, eller jag vet inte", wired: false },
] as const;

type HomeKey = (typeof HOMES)[number]["key"];
type PowerKey = (typeof POWER)[number]["key"];

/** En dörrklocka ur rankningen, med det verktyget behöver för att filtrera. */
export type DoorbellOption = {
  id: string;
  brand: string;
  name: string;
  price: string;
  priceValue: number;
  merchant: string;
  href: string;
  /** Kräver fast ström och saknar batteridrift. */
  needsWiring: boolean;
  /** Signalenhet ingår i förpackningen. */
  chimeIncluded: boolean;
  /** Kort notering om signalenheten, tillverkarens eller butikens uppgift. */
  chimeNote: string;
  /** Fungerar fullt ut utan abonnemang. */
  localStorage: boolean;
};

export function DoorbellHomePicker({
  options,
  className,
}: {
  options: DoorbellOption[];
  className?: string;
}) {
  const [home, setHome] = useState<HomeKey | null>(null);
  const [power, setPower] = useState<PowerKey | null>(null);

  const picked = home ? HOMES.find((h) => h.key === home)! : null;
  const wiredOk = power ? POWER.find((p) => p.key === power)!.wired : null;

  return (
    <div
      data-slot="doorbell-home-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">
          Hur ser din ytterdörr ut?
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

      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Finns det ström framdragen till dörrklockan i dag? Frivilligt, men det
          avgör vilka produkter som är möjliga.
        </legend>
        <div className="flex flex-wrap gap-2">
          {POWER.map((o) => (
            <Pill
              key={o.key}
              label={o.label}
              active={power === o.key}
              onClick={() => setPower(o.key)}
            />
          ))}
        </div>
      </fieldset>

      <div className="rounded-md bg-muted pad-card">
        {picked ? (
          <>
            <p className="text-sm text-muted-foreground">
              Vad som gäller, och vad som passar
            </p>
            <p className="font-heading text-h3 text-brand">{picked.headline}</p>
            <p className="mt-3 text-sm">{picked.why}</p>

            <Matches
              blocked={picked.blocked}
              wiredOk={wiredOk}
              options={options}
            />

            <button
              type="button"
              onClick={() => {
                setHome(null);
                setPower(null);
              }}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Boendeformen avgör mer än produkten gör. Välj hur din ytterdörr ser
            ut, så får du veta vad som gäller rättsligt och vilka dörrklockor
            som fungerar där.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Reglerna kommer från Integritetsskyddsmyndighetens vägledning om
        privatundantaget och från myndighetens eget exempel om dörrkamera i
        lägenhetshus. Uppgifter om ström och signalenhet är butikens egna,
        lästa 2026-08-03. Guiden är ingen juridisk rådgivning, och vi har
        inte monterat eller ringt på med någon dörrklocka.
      </p>
    </div>
  );
}

/**
 * Vilka dörrklockor som passar, och vad som fattas i lådan.
 *
 * När boendeformen är blockerad visas ingen produktlista. Att rekommendera en
 * produkt i samma andetag som vi säger att bevakningen faller utanför
 * undantaget vore att sälja förbi det svar läsaren kom för.
 */
function Matches({
  blocked,
  wiredOk,
  options,
}: {
  blocked: boolean;
  wiredOk: boolean | null;
  options: DoorbellOption[];
}) {
  if (blocked) {
    return (
      <div className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
        <p>
          Vi listar inga produkter här. Det betyder inte att en dörrklocka med
          kamera är förbjuden i lägenhet, men att den inte längre är en privat
          angelägenhet, och det är en annan sorts beslut än ett köpbeslut.
        </p>
        <p className="mt-2">
          Vill du gå vidare ändå: rikta kameran nedåt mot den egna tröskeln,
          maskera bort dörrarna mittemot, stäng av mikrofonen och fråga
          föreningen först. Läs sedan avsnittet om lägenheter längre ner på
          sidan.
        </p>
      </div>
    );
  }

  /* Kopia innan sort: options är en prop och får inte muteras. Billigast
     först, eftersom frågan här är vad som duger och inte vad som fått högst
     betyg. */
  const usable = options
    .filter((o) => (wiredOk === false ? !o.needsWiring : true))
    .slice()
    .sort((a, b) => a.priceValue - b.priceValue);

  const excluded = options.filter((o) => wiredOk === false && o.needsWiring);

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="text-sm font-medium">
        {usable.length} av {options.length} dörrklockor passar
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Billigast först. Raden under varje produkt säger om det ringer i
        bostaden eller bara i telefonen.
      </p>

      <ul className="mt-2 flex flex-col gap-2 text-sm">
        {usable.map((o) => (
          <li key={o.id}>
            <div className="flex flex-wrap items-baseline gap-x-2">
              {/* Full sökväg och inte bara ankaret: verktyget renderas både på
                  kategorisidan och på sin egen sida under /guider. */}
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
              {/* Butikens egen formulering, inte en egen omskrivning: den
                  skiljer på "ingår", "säljs separat" och "ej angiven", och
                  den sista är inte samma sak som ett nej. */}
              Ringklocka: {o.chimeNote.toLowerCase()}.
              {o.localStorage
                ? " Fungerar utan abonnemang."
                : " Sparar ingenting utan abonnemang."}
            </p>
          </li>
        ))}
      </ul>

      {excluded.length ? (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            Kräver ström framdragen:{" "}
          </span>
          {excluded.map((o) => `${o.brand} ${o.name}`).join(", ")}. De går bara
          att använda om det finns en ringklockledning på 8 till 24 volt, eller
          om du drar dit en. Kontrollera bakom den gamla tamburklockan innan du
          skriver av dem.
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
