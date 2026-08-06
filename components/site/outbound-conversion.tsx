"use client";

import { useEffect } from "react";

/**
 * Räknar klicket vidare till butiken som en konvertering i webbläsaren.
 *
 * Bara i läget `client`. Se `outboundConversion` i lib/r9track/config.ts för
 * de tre lägena och varför de utesluter varandra: ett klick får bli en
 * konvertering, aldrig två.
 *
 * ## En lyssnare, inte en klientkomponent per knapp
 *
 * Varje knapp på sajten är en serverkomponent. Att göra dem till
 * klientkomponenter bara för att kunna hänga på en onClick skulle skicka JS för
 * varje CTA på en sida som ofta har tolv. En delegerad lyssnare på dokumentet
 * kostar en enda liten komponent och når även länkar som renderas senare.
 *
 * Den ändrar aldrig `href`. Det är skillnaden mot att skriva om länken vid
 * klick, som är cloaking; här går navigeringen till exakt den adress som står i
 * DOM:en och händelsen skickas vid sidan av.
 *
 * ## Varför beacon
 *
 * Sidan lämnas i samma ögonblick. En vanlig fetch hinner avbrytas när
 * dokumentet rivs, medan `sendBeacon` är byggd för precis det här och lämnas
 * kvar av webbläsaren. Utan den tappas en del av klicken, och det tappet syns
 * inte någonstans.
 *
 * ## Städningen av adressfältet
 *
 * I det här läget får servern inte ta bort klick-id:t ur adressen, eftersom
 * gtag måste hinna läsa det för att kunna skriva `_gcl_aw`. Vi tar bort det
 * här i stället, efter att taggen startat, med `replaceState` så att det varken
 * lägger en post i historiken eller laddar om sidan.
 */

const CLICK_PARAMS = ["gclid", "wbraid", "gbraid"] as const;

type Props = {
  /** `AW-XXXXXXXXX/etikett`. Utan den finns inget att rapportera till. */
  sendTo?: string;
  /** Prefixet utgående länkar har, så lyssnaren vet vad den ska reagera på. */
  prefix?: string;
  /** Sant bara i läget `client`. */
  enabled: boolean;
};

export function OutboundConversion({
  sendTo,
  prefix = "/till/",
  enabled,
}: Props) {
  useEffect(() => {
    if (!enabled || !sendTo) return;

    function onClick(event: MouseEvent) {
      /* Bara vanliga vänsterklick. Ctrl-, kommando- och mittenklick öppnar en
         ny flik och lämnar inte sidan, men de är fortfarande klick vidare till
         butiken, så de räknas också. Det som inte ska räknas är klick vi
         redan avbrutit. */
      if (event.defaultPrevented) return;

      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (!href.startsWith(prefix)) return;

      window.gtag?.("event", "conversion", {
        send_to: sendTo,
        /* Ett id per klick vore bättre, men det mintas på servern och finns
           inte här. Google räknar ändå bara en per annonsklick för den här
           åtgärden, så dubbletter från samma besök faller bort hos dem. */
        transport_type: "beacon",
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [enabled, sendTo, prefix]);

  useEffect(() => {
    if (!enabled) return;

    /* Efter gtag, inte före. Kör den här städningen synkront vid montering
       hinner taggen inte läsa parametern, och konverteringen blir hemlös.
       En tick räcker: gtag-skriptet laddas i samma dokument och läser
       adressen när det initierar. */
    const timer = setTimeout(() => {
      const url = new URL(window.location.href);
      let touched = false;
      for (const param of CLICK_PARAMS) {
        if (url.searchParams.has(param)) {
          url.searchParams.delete(param);
          touched = true;
        }
      }
      if (!touched) return;
      window.history.replaceState(
        window.history.state,
        "",
        url.pathname + url.search + url.hash,
      );
    }, 1200);

    return () => clearTimeout(timer);
  }, [enabled]);

  return null;
}
