"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";

/*
 * Felsida för allt under rotlayouten. Måste vara en klientkomponent — Next
 * kräver det, eftersom `reset` är en funktion som skickas ned.
 *
 * Sidhuvud och sidfot ligger kvar runt den här, så besökaren har kvar menyn
 * och kan ta sig vidare. Det är skillnaden mot `global-error.tsx`, som ersätter
 * hela dokumentet och därför måste rita sitt eget skal.
 *
 * `digest` visas medvetet. I produktion döljer Next det verkliga felmeddelandet
 * och lämnar bara den hashen, och utan den i klartext går ett fel en läsare
 * rapporterar inte att para ihop med raden i Vercels logg.
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="pad-section">
      <div className="max-w-2xl">
        <p className="eyebrow text-brand">Fel</p>
        <h1 className="mt-2 text-h1">Något gick sönder</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Sidan kunde inte visas. Felet ligger hos oss, inte hos dig. Ladda om
          så brukar det lösa sig.
        </p>

        <div className="mt-block flex flex-wrap gap-3">
          <Button onClick={reset}>Försök igen</Button>
          <Button asChild variant="outline">
            <Link href="/">Till startsidan</Link>
          </Button>
        </div>

        {error.digest ? (
          <p className="mt-block text-sm text-muted-foreground">
            Felkod: <code className="font-mono">{error.digest}</code>. Ta med den
            om du{" "}
            <Link
              href="/kontakt"
              className="text-primary underline underline-offset-2"
            >
              hör av dig
            </Link>
            .
          </p>
        ) : null}
      </div>
    </Container>
  );
}
