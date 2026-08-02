"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { CircleCheck, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";
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
 * Värdena måste finnas i `CATEGORIES` i `app/api/kontakt/route.ts` och i
 * `contactSchema` hos redpoint.
 */

const CATEGORIES = [
  { value: "correction", label: "Rättelse eller faktafel" },
  { value: "tip", label: "Tips på något vi borde testa" },
  { value: "partnership", label: "Samarbete eller annonsering" },
  { value: "press", label: "Press" },
  { value: "general", label: "Övrigt" },
] as const;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ className }: { className?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0].value);

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
      <div
        className={cn(
          "themed-border flex flex-col items-start gap-3 rounded-lg bg-muted pad-card",
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
    >
      <div className="grid gap-stack sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${id}-name`}>Namn</Label>
          <Input id={`${id}-name`} name="name" autoComplete="name" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${id}-email`}>E-post</Label>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${id}-category`}>Vad gäller det?</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id={`${id}-category`} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${id}-subject`}>Rubrik</Label>
        <Input id={`${id}-subject`} name="subject" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${id}-message`}>Meddelande</Label>
        <Textarea id={`${id}-message`} name="message" rows={6} required />
      </div>

      {/* Honungsfälla. Dold för människor med aria-hidden och tabIndex, inte
          med display:none, eftersom en del robotar hoppar över fält som är
          dolda på det sättet. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Lämna tomt</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" ? (
        <p className="flex items-start gap-2 text-sm text-destructive">
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}

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
