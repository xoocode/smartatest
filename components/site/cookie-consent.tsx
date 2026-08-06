"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_VERSION,
  MARKETING_CONFIGURED,
  parseConsent,
  serialiseConsent,
  type ConsentChoice,
} from "@/lib/consent";
import { Button } from "@/components/ui/button";

/**
 * Kakruta, egen implementation. Se `lib/consent.ts` för varför vi inte köper
 * en CMP och vad IMY kräver av utformningen.
 *
 * ## Tre saker som inte får ändras utan eftertanke
 *
 * 1. **Knapparna väger lika.** Båda är `outline`, båda ett klick, båda samma
 *    storlek. Den orange godkänn-knappen mot en avtonad neka-knapp är exakt
 *    det mönster IMY riktade kritik mot i april 2025.
 * 2. **Ingen overlay.** Sidan går att läsa och rulla medan rutan ligger kvar.
 *    Ett samtycke som lämnas för att komma åt innehållet är inte frivilligt.
 * 3. **Inget tredje lager.** Vi har ett enda icke-nödvändigt ändamål, så en
 *    inställningsknapp vore en extra tröskel utan ett extra val bakom sig.
 *
 * ## Återkallelse
 *
 * `openConsent()` öppnar rutan igen och nås från länken i sidfoten. Att ta
 * tillbaka ska vara lika lätt som att ge, och det är den länken som gör det.
 */

/* Extern state, läst genom useSyncExternalStore i stället för kopierad in i
   React-state från en effekt. Kakan är källan; komponenten är en vy av den. */
let listeners: (() => void)[] = [];
/** Sant när läsaren själv bett om att få se rutan igen. */
let reopened = false;

function subscribe(onChange: () => void) {
  listeners.push(onChange);
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
  };
}

function emit() {
  for (const listener of listeners) listener();
}

function readRaw(): string | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/** Snapshot för useSyncExternalStore. Måste vara referensstabil. */
function getSnapshot(): string {
  return `${reopened ? "1" : "0"}|${readRaw() ?? ""}`;
}

function write(choice: ConsentChoice) {
  const value = serialiseConsent({
    version: CONSENT_VERSION,
    choice,
    at: Math.floor(Date.now() / 1000),
  });

  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; path=/; max-age=${
    CONSENT_MAX_AGE_DAYS * 24 * 60 * 60
  }; samesite=lax`;

  /* Signalen till Google. Utan den skulle ett ja bara vara en kaka hos oss,
     och taggen skulle fortsätta gå i begränsat läge till nästa sidladdning. */
  const granted = choice === "granted" ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
  });
}

/** Öppnar rutan igen. Anropas från sidfotens länk. */
export function openConsent() {
  reopened = true;
  emit();
}

export type CookieConsentProps = {
  /** bar = full bredd nederst, box = kort i hörnet. */
  variant?: "bar" | "box";
  policyHref?: string;
  /** Rendera oavsett sparat val, för stilguiden. */
  forceOpen?: boolean;
  className?: string;
};

export function CookieConsent({
  variant = "bar",
  policyHref = "/integritetspolicy",
  forceOpen = false,
  className,
}: CookieConsentProps) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => "server" as const,
  );

  /* Under SSR och hydrering är snapshot "server", vilket renderar ingenting.
     Det verkliga värdet kommer vid första klientläsningen utan att orsaka en
     hydreringskonflikt. */
  if (snapshot === "server") return null;

  /* Ingen marknadsföringstagg konfigurerad, alltså inga icke-nödvändiga kakor
     och ingenting att fråga om. Se lib/consent.ts. */
  if (!forceOpen && !MARKETING_CONFIGURED) return null;

  const stored = parseConsent(readRaw() ?? undefined);
  const open = forceOpen || reopened || stored === null;
  if (!open) return null;

  function choose(choice: ConsentChoice) {
    write(choice);
    reopened = false;
    emit();
  }

  return (
    <aside
      data-slot="cookie-consent"
      data-variant={variant}
      aria-label="Inställningar för cookies"
      className={cn(
        "z-40 bg-card shadow-raised",
        forceOpen ? "relative" : "fixed",
        variant === "bar"
          ? cn(
              "inset-x-0 bottom-0 border-t border-border",
              forceOpen && "inset-auto rounded-lg themed-border",
            )
          : cn(
              "right-4 bottom-4 max-w-sm rounded-lg themed-border",
              forceOpen && "inset-auto",
            ),
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-row pad-card",
          variant === "bar" &&
            "mx-auto max-w-7xl sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <p className="text-sm text-muted-foreground">
          {/* Rutan frågar om det som faktiskt går att välja bort: Googles
              annonskakor, alltså ad_storage, ad_user_data och
              ad_personalization i Consent Mode. Klick-id:t är bedömt som
              nödvändigt och står i policyn, inte här, eftersom en fråga om
              något som ändå sker inte är en fråga.

              Öppningen sa tidigare "Vi mäter inte ditt besök". Det gick inte
              att låta stå: vi fångar klick-id:t vid landningen och räknar varje
              klick vidare till en butik. */}
          Vi har ingen besöksstatistik och inga pixlar, men vi räknar klick
          vidare till butikerna. Det du väljer här gäller Googles
          annonscookies: om vi får dela uppgifter med Google och låta annonser
          anpassas efter dig. Säger du nej fungerar sajten precis lika bra.{" "}
          {/* Understruken hela tiden, inte bara vid hovring. En länk mitt i ett
              stycke får inte skiljas ut av enbart färg, WCAG 1.4.1. */}
          <Link
            href={policyHref}
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            Så hanterar vi uppgifter
          </Link>
          .
        </p>

        {/* Lika stora, lika framträdande, ett klick var. Ordningen sätter nej
            först, vilket inte krävs men heller inte kostar något. */}
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 sm:flex-none"
            onClick={() => choose("denied")}
          >
            Nej tack
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1 sm:flex-none"
            onClick={() => choose("granted")}
          >
            Godkänn
          </Button>
        </div>
      </div>
    </aside>
  );
}
