"use client";

import { useState } from "react";

import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ComparisonTable, type ComparisonTableProps } from "@/components/product/comparison-table";

/**
 * `ComparisonTable` med ett filter ovanför.
 *
 * Kategorioberoende med flit. Komponenten vet ingenting om gardiner, skenor
 * eller maxeffekt, den tar bara namngivna grupper med produkt-id i och visar
 * dem. Samma sak behövs den dag smart plug ska filtreras på 10 mot 16 A eller
 * belysning på sockel, och då ska det inte byggas en gång till.
 *
 * Varför den finns: på /elektrisk-rullgardin avgör upphängningen vilka produkter
 * som över huvud taget går att montera. En tabell med åtta produkter där bara
 * två passar din skena är inte en jämförelse, det är en sorteringsuppgift vi
 * lämpat över på läsaren.
 *
 * Klientkomponent, alltså hamnar `ComparisonTable` i klientbunten. Det är
 * medvetet och priset för att filtret ska svara direkt. Tabellen innehåller
 * ingen serverlogik, så den fungerar oförändrad på båda sidor om gränsen.
 *
 * Filtret döljer aldrig produkter tyst: räknaren står alltid utskriven, och
 * "Alla" är förvalt så att den som inte rör filtret ser hela jämförelsen.
 */

export type ComparisonFilter = {
  key: string;
  label: string;
  /** Produkt-id som hör till gruppen. Tomma grupper renderas som utgråade. */
  ids: string[];
};

export type FilterableComparisonProps = Omit<ComparisonTableProps, "products"> & {
  products: Product[];
  filters: ComparisonFilter[];
  /** Etikett för knappen som visar allt. */
  allLabel?: string;
  /**
   * Rubrik ovanför knapparna.
   *
   * Standardvärdet är medvetet kategorineutralt. Det var "Filtrera på vad du
   * har i fönstret", alltså gardinsidans formulering, vilket innebar att nästa
   * sida som glömde skicka in en egen rubrik frågade sina läsare om fönster
   * mitt i en jämförelse av utomhustimers. Skicka alltid in en egen.
   */
  legend?: string;
  /** Rad under knapparna när ett filter är aktivt. Får `%d` och `%t`. */
  countTemplate?: string;
};

export function FilterableComparison({
  products,
  filters,
  allLabel = "Alla",
  legend = "Filtrera urvalet",
  countTemplate = "Visar %d av %t produkter.",
  className,
  ...tableProps
}: FilterableComparisonProps) {
  const [active, setActive] = useState<string | null>(null);

  const group = filters.find((f) => f.key === active);
  const shown = group
    ? products.filter((p) => group.ids.includes(p.id))
    : products;

  return (
    <div className={cn("flex flex-col gap-row", className)}>
      <fieldset>
        {/* Marginal på legend snarare än gap på fieldset: legend deltar inte
            pålitligt i förälderns flex-flöde. */}
        <legend className="mb-2.5 text-sm font-medium">{legend}</legend>
        <div className="flex flex-wrap gap-2">
          <Pill
            label={allLabel}
            count={products.length}
            active={active === null}
            onClick={() => setActive(null)}
          />
          {filters.map((f) => (
            <Pill
              key={f.key}
              label={f.label}
              count={f.ids.length}
              active={active === f.key}
              onClick={() => setActive(f.key)}
            />
          ))}
        </div>
      </fieldset>

      {group ? (
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {countTemplate
            .replace("%d", String(shown.length))
            .replace("%t", String(products.length))}
        </p>
      ) : null}

      {shown.length ? (
        <ComparisonTable products={shown} {...tableProps} />
      ) : (
        <p className="rounded-md bg-muted pad-card text-sm text-muted-foreground">
          Ingen av produkterna vi rankat passar den upphängningen. Se Andra
          produkter vi övervägde längre ner.
        </p>
      )}
    </div>
  );
}

function Pill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
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
      {/* Antalet står på knappen och inte bara i räknaren under, så att en
          grupp med en enda produkt syns innan man klickar. Att persienn ger
          exakt en träff är ett resultat läsaren ska se direkt. */}
      <span className={cn("ms-1.5", active ? "opacity-80" : "opacity-70")}>
        {count}
      </span>
    </button>
  );
}
