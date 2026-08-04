"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { CircleCheck, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import { toolForm, toolParam } from "@/lib/webmcp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Kontaktformulär.
 *
 * Postar till vår egen `/api/kontakt`, som i sin tur skickar vidare till
 * RedPoint9 server till server. Se routen för varför det inte går direkt.
 *
 * ## Ärendetyperna
 *
 * "Rättelse eller faktafel" ligger först, och det är inte en slump. En sajt
 * som rankar produkter måste vara lättast att nå för den som tycker att vi
 * har fel, annars är oberoendet bara en formulering på en annan sida.
 *
 * Värdena måste finnas i `TEST_PAGES` i `app/api/kontakt/route.ts` och i
 * `contactSchema` hos redpoint.
 *
 * ## WebMCP
 *
 * Formuläret är annoterat så att en agent kan fylla i det, men **inte** med
 * `autoSubmit`. Skillnaden är hela poängen: agenten skriver i fälten, en
 * människa läser igenom och trycker på Skicka. Ett formulär som skriver till en
 * databas och mejlar ut varje rad ska inte gå att avfyra utan att någon sett
 * vad som står i det, och sajten fick en honungsfälla 2026-08-03 just för att
 * skräpposten redan hittat hit.
 *
 * Ärendetypen ligger med flit utanför verktygets schema. Den är en Radix-select
 * vars värde bor i React-state, inte i ett `<select name>`. Ett namn på den hade
 * gett agenten en dold nativ kontroll att sätta, medan komponenten fortsatte
 * visa och skicka det gamla värdet. En agent som väljer "Samarbete" och ett
 * formulär som skickar "Rättelse" är sämre än ett verktyg som säger rakt ut att
 * människan väljer ärendetyp.
 */

const TEST_PAGES = [
  { value: "correction", label: "Rättelse eller faktafel" },
  { value: "tip", label: "Tips på något vi borde testa" },
  { value: "partnership", label: "Samarbete eller annonsering" },
  { value: "general", label: "Övrigt" },
] as const;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ className }: { className?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [category, setCategory] = useState<string>(TEST_PAGES[0].value);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          category,
          subject: form.get("subject"),
          message: form.get("message"),
          website: form.get("website"),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Något gick fel.");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Något gick fel.");
    }
  }

  if (status === "sent") {
    return (
      /* Kvittensen ersätter formuläret, alltså försvinner elementet fokus låg
         på. `role="status"` läses upp när den dyker upp, och `tabIndex={-1}`
         plus autofokus flyttar fokus hit så att nästa tabb fortsätter härifrån
         i stället för från början av sidan. */
      <div
        role="status"
        tabIndex={-1}
        ref={(node) => node?.focus()}
        className={cn(
          "themed-border flex flex-col items-start gap-3 rounded-lg bg-muted pad-card outline-none",
          className,
        )}
      >
        <CircleCheck aria-hidden="true" className="size-6 text-success" />
        <div>
          <p className="font-medium">Tack, meddelandet är skickat.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Vi hör av oss till adressen du angav.
          </p>
        </div>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Skicka ett till
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-stack", className)}
      {...toolForm({
        name: "skickaMeddelandeTillRedaktionen",
        description:
          "Fyll i redaktionens kontaktformulär på smartatest.se. Verktyget skriver bara i fälten: användaren väljer själv ärendetyp och trycker på Skicka, så ingenting lämnar sidan förrän en människa godkänt det. Använd det för rättelser av sakfel, tips på produkter vi borde jämföra och samarbetsförfrågningar.",
      })}
    >
      <div className="grid gap-stack sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${id}-name`}>Namn</Label>
          <Input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            {...toolParam(
              "Namnet på den som hör av sig, alltså användaren och inte agenten. Minst två tecken.",
            )}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${id}-email`}>E-post</Label>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            {...toolParam(
              "E-postadressen svaret ska gå till. Fråga användaren efter den, hitta aldrig på en.",
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${id}-category`}>Vad gäller det?</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id={`${id}-category`} className="w-full">
            <SelectValue />
          </SelectTrigger>
          {/* `popper` och inte standardens `item-aligned`. Den senare
              lägger listan ovanpå triggern med det valda alternativet
              över den, vilket i ett formulär döljer fältet man just
              klickade på. `popper` fäller ned under triggern. */}
          <SelectContent position="popper" sideOffset={4}>
            {TEST_PAGES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${id}-subject`}>Rubrik</Label>
        <Input
          id={`${id}-subject`}
          name="subject"
          required
          {...toolParam(
            "En rad som sammanfattar ärendet. Minst tre tecken. Gäller det ett sakfel, skriv vilken sida och vilken uppgift det rör.",
          )}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${id}-message`}>Meddelande</Label>
        <Textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          required
          {...toolParam(
            "Själva ärendet, minst tio tecken. Gäller det en rättelse hjälper det oss att få källan med: vi rättar mot publicerade uppgifter och skriver in ändringen på sidan Rättelser.",
          )}
        />
      </div>

      {/* Honungsfälla. Dold för människor med aria-hidden och tabIndex, inte
          med display:none, eftersom en del robotar hoppar över fält som är
          dolda på det sättet.

          Fältet heter `website` och är ett namngivet fält i formuläret, alltså
          hamnar det i det schema webbläsaren syntetiserar åt en agent. Det är
          farligare än det låter: fyller agenten i något svarar `/api/kontakt`
          med 200 utan att skicka vidare, och användaren får kvittensen "Tack,
          meddelandet är skickat" för ett meddelande som aldrig gick någonstans.
          Ett tyst tapp, alltså precis den sortens fel som ingen upptäcker.

          Beskrivningen nedan är därför inte dekoration utan själva skyddet. Att
          den avslöjar fällan spelar ingen roll: etiketten säger redan "Lämna
          tomt" i markupen, och robotarna fällan finns för läser inte scheman. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Lämna tomt</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...toolParam(
            "Lämna alltid det här fältet tomt. Det är en skräppostkontroll som är dold för människor, och ett ifyllt värde gör att meddelandet kastas utan att någon får det.",
          )}
        />
      </div>

      {/* role="alert" och inte bara röd text.
       *
       * Felet dyker upp efter att formuläret skickats, alltså långt från den
       * knapp som utlöste det. Utan en live-region får den som använder
       * skärmläsare ingen aning om att något hänt: fokus ligger kvar på
       * knappen och sidan ser oförändrad ut. */}
      <p
        role="alert"
        className={cn(
          "flex items-start gap-2 text-sm text-destructive",
          status !== "error" && "sr-only",
        )}
      >
        {status === "error" ? (
          <>
            <TriangleAlert
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0"
            />
            {error}
          </>
        ) : null}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="brand" disabled={status === "sending"}>
          {status === "sending" ? "Skickar…" : "Skicka"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Uppgifterna används bara för att svara dig.{" "}
          <Link
            href="/integritetspolicy"
            className="text-primary underline underline-offset-2"
          >
            Så hanterar vi dem
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
