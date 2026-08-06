import { cn } from "@/lib/utils";
import {
  DISCLOSURE_LABELS,
  disclosureOf,
  formatBinding,
  formatFee,
  totalCost,
  type Service,
  type ServiceTerms,
} from "@/lib/services";

/**
 * Prisatomen för tjänster.
 *
 * ## Varför `PriceTag` inte duger
 *
 * `PriceTag` renderar ett tal och en valuta. En tjänst har två tal som inte
 * går att lägga ihop, en löpande månadsavgift och en engångsavgift, och den
 * viktigaste egenskapen hos båda är att de **kan saknas**. Sju av åtta
 * larmbolag publicerar inte allt, och fyra publicerar ingen månadsavgift alls.
 *
 * En komponent som tar `price: number` kan inte uttrycka det. Den hade tvingat
 * datalagret att skriva `0` för en uppgift som inte finns, och sidan hade då
 * påstått att fyra bolag är gratis. Därför tar den här komponenten emot hela
 * `ServiceTerms` och låter `formatFee()` avgöra, i stället för att ta emot ett
 * tal som redan förlorat informationen.
 */

export type ServicePriceProps = {
  terms: ServiceTerms;
  size?: "sm" | "md" | "lg";
  /** Visa raden om bindningstid under priset. */
  showBinding?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { fee: "text-base", unit: "text-xs", meta: "text-xs" },
  md: { fee: "text-2xl", unit: "text-sm", meta: "text-xs" },
  lg: { fee: "text-4xl", unit: "text-base", meta: "text-sm" },
} as const;

export function ServicePrice({
  terms,
  size = "md",
  showBinding = true,
  className,
}: ServicePriceProps) {
  const s = sizeMap[size];
  const hasMonthly = typeof terms.monthlyFee === "number";
  const hasAnnual = typeof terms.annualFee === "number";
  /* Ett bolag utan månadsavgift kan ändå ha en publicerad löpande kostnad.
     Visa den i huvudtalets position i stället för "Publiceras inte", som var
     falskt för Garda Alarm i tre dygn. Finns båda, som hos Safeland där
     larmcentralen är en egen årsavgift, står månadsavgiften stort och
     årsavgiften som en egen rad under. */
  const annualLeads = !hasMonthly && hasAnnual;

  return (
    <div
      data-slot="service-price"
      className={cn("flex flex-col gap-1", className)}
    >
      <div className="flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-heading leading-none tabular-nums",
            s.fee,
            hasMonthly || hasAnnual ? "text-brand" : "text-muted-foreground",
          )}
        >
          {annualLeads
            ? formatFee(terms.annualFee)
            : formatFee(terms.monthlyFee)}
        </span>
        {hasMonthly ? (
          <span className={cn("text-muted-foreground", s.unit)}>/mån</span>
        ) : null}
        {annualLeads ? (
          <span className={cn("text-muted-foreground", s.unit)}>/år</span>
        ) : null}
      </div>
      {hasAnnual ? (
        <p className={cn("text-muted-foreground", s.meta)}>
          {annualLeads ? (
            terms.annualFeeLabel
          ) : (
            <>
              &#43; {formatFee(terms.annualFee)}/år
              {terms.annualFeeLabel ? ` för ${terms.annualFeeLabel}` : null}
            </>
          )}
        </p>
      ) : null}

      <p className={cn("text-muted-foreground", s.meta)}>
        {terms.startFeeLabel ?? "Startavgift"}: {formatFee(terms.startFee)}
        {typeof terms.startFeeWithoutBinding === "number" ? (
          <>
            {" "}
            &middot; utan bindning {formatFee(terms.startFeeWithoutBinding)}
          </>
        ) : null}
      </p>

      {showBinding ? (
        <p className={cn("text-muted-foreground", s.meta)}>
          Bindningstid: {formatBinding(terms.bindingMonths)} &middot;
          Uppsägningstid:{" "}
          {typeof terms.noticeMonths === "number"
            ? `${terms.noticeMonths} mån`
            : "Publiceras inte"}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Femårskostnaden, eller ärligheten om att den inte går att räkna.
 *
 * Konkurrenterna publicerar en femårssiffra för varje bolag. Vi kan bara göra
 * det för de fyra som publicerar en månadsavgift, och skriver ut varför för
 * resten i stället för att fylla i ett antagande.
 */
export function ServiceTotalCost({
  terms,
  months = 60,
  className,
}: {
  terms: ServiceTerms;
  months?: number;
  className?: string;
}) {
  const total = totalCost(terms, months);
  const years = Math.round(months / 12);

  return (
    <div data-slot="service-total" className={cn("text-sm", className)}>
      <span className="text-muted-foreground">Efter {years} år: </span>
      {total === null ? (
        <span className="text-muted-foreground">
          går inte att räkna, månadsavgiften publiceras inte
        </span>
      ) : (
        <span className="font-medium tabular-nums">{formatFee(total)}</span>
      )}
    </div>
  );
}

const DISCLOSURE_TONE: Record<
  ReturnType<typeof disclosureOf>,
  string
> = {
  publicerat: "border-success/40 bg-success/10 text-success",
  /* Ytan är amber, texten är det mörkare textvärdet. `text-warning` mätte
     2,34:1 mot sin egen ton här. Se --warning-text i globals.css. */
  delvis: "border-warning/40 bg-warning/10 text-warning-text",
  dolt: "border-border bg-muted text-muted-foreground",
};

/** Märkning av hur öppet bolaget prissätter sig. Härledd, aldrig skriven. */
export function DisclosureBadge({
  terms,
  className,
}: {
  terms: ServiceTerms;
  className?: string;
}) {
  const level = disclosureOf(terms);
  return (
    <span
      data-slot="disclosure-badge"
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        DISCLOSURE_TONE[level],
        className,
      )}
    >
      {DISCLOSURE_LABELS[level]}
    </span>
  );
}

/** Rubrikrad för en tjänst: bolag + tjänstenamn. */
export function ServiceName({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  return (
    <span className={className}>
      <span className="text-muted-foreground">{service.provider}</span>{" "}
      {service.name}
    </span>
  );
}
