import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { liveCategories } from "@/lib/catalog";
import { Container } from "@/components/site/container";
import { CategoryGrid } from "@/components/site/category-grid";
import { Button } from "@/components/ui/button";

/*
 * Egen 404, byggd 2026-08-02.
 *
 * Next.js standardsida är osminkad och på engelska, vilket är fel på två sätt
 * samtidigt: den bryter formgivningen och den bryter språket. En besökare som
 * landar här har oftast följt en gammal länk eller stavat fel i adressfältet,
 * och båda går att rädda om sidan pekar vidare i stället för att bara beklaga
 * sig.
 *
 * Därför listas de kategorier som faktiskt är byggda, inte hela katalogen.
 * `liveCategories()` är samma källa som sitemapen läser, så en sida som inte
 * finns kan aldrig hamna här.
 *
 * Statuskoden 404 sätts av Next självt. Ingen `robots`-metadata behövs —
 * Google indexerar inte en 404 oavsett vad sidan säger om saken.
 */

export const metadata: Metadata = {
  title: "Sidan finns inte",
  /* Ingen description: sidan ska aldrig visas i ett sökresultat. */
};

export default function NotFound() {
  const live = liveCategories();

  return (
    <Container className="pad-section">
      <div className="max-w-2xl">
        <p className="eyebrow text-brand">404</p>
        <h1 className="mt-2 text-h1">Sidan finns inte</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Adressen leder ingenstans. Antingen har sidan bytt plats eller så blev
          det ett tecken fel på vägen hit.
        </p>

        <div className="mt-[var(--space-block)] flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">Till startsidan</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sok">
              <Search aria-hidden="true" className="size-4" />
              Sök på sajten
            </Link>
          </Button>
        </div>
      </div>

      {live.length > 0 ? (
        <div className="mt-[var(--space-block)]">
          <h2 className="text-h3">Våra jämförelser</h2>
          <CategoryGrid
            entries={live}
            className="mt-4"
            columns={3}
            showPlanned={false}
          />
        </div>
      ) : null}

      <p className="mt-[var(--space-block)] text-sm text-muted-foreground">
        Hittade du en trasig länk hos oss?{" "}
        <Link href="/kontakt" className="text-primary underline underline-offset-2">
          Säg till
          <ArrowRight aria-hidden="true" className="ml-1 inline size-3.5" />
        </Link>
      </p>
    </Container>
  );
}
