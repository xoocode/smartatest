import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  OWNERSHIP_LABELS,
  conditionalFees,
  formatFee,
  type Service,
} from "@/lib/services";
import { AffiliateCta } from "@/components/product/affiliate-cta";
import { AwardBadge } from "@/components/product/award-badge";
import { ProsCons } from "@/components/product/pros-cons";
import { RatingStars } from "@/components/product/rating-stars";
import { ScoreBadge } from "@/components/product/score-badge";
import { SpecList } from "@/components/product/spec-list";
import {
  DisclosureBadge,
  ServicePrice,
  ServiceTotalCost,
} from "@/components/service/service-price";

/**
 * Kort och recension för en tjänst.
 *
 * Två exporter i samma fil därför att de delar allt utom omfång: `ServiceCard`
 * är vinnarkortet högst upp, `ServiceReview` är samma innehåll i djupdykningen
 * längre ned. Att dela dem i två filer hade betytt två ställen att hålla i
 * synk för en skillnad som är en rubriknivå och en rankningssiffra.
 *
 * Båda skiljer sig från produktmotsvarigheterna på en enda punkt som ändå
 * ändrar allt: de visar **kostnaden att lämna** vid sidan av kostnaden att
 * vara kund. För en produkt finns ingen sådan kostnad.
 */

/** Villkorade avgifter, alltså sådana du kan undvika om du sköter avslutet. */
function ExitFees({ service }: { service: Service }) {
  const fees = conditionalFees(service.terms);
  if (!fees.length) return null;

  return (
    <div className="rounded-md border border-warning/40 bg-warning/5 p-3">
      <p className="text-xs font-medium">
        Avgifter som kan utlösas när avtalet avslutas
      </p>
      <ul className="mt-1.5 flex flex-col gap-1">
        {fees.map((fee) => (
          <li key={fee.label} className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground tabular-nums">
              {formatFee(fee.amount, "Belopp anges inte")}
            </span>{" "}
            &middot; {fee.label}{" "}
            {/* Ingen extra opacitet. Texten är redan dämpad, och 70 % ovanpå
                den gav 3,04:1 mot den varma panelen. En källhänvisning är
                dessutom det sista på sajten som ska tonas ned. */}
            <span>({fee.source})</span>
          </li>
        ))}
      </ul>
      <p className="mt-1.5 text-xs text-muted-foreground">
        Räknas inte in i kostnaden ovan, eftersom du kan undvika dem.
      </p>
    </div>
  );
}

/** Friköpstrappan, när bolaget publicerar en. */
function BuyoutLadder({ service }: { service: Service }) {
  const steps = service.terms.buyout;
  if (!steps?.length) return null;

  return (
    <div className="rounded-md bg-muted p-3">
      <p className="text-xs font-medium">
        Vad det kostar att köpa loss utrustningen
      </p>
      <dl className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
        {steps.map((step) => (
          <div key={step.label} className="flex items-baseline gap-1.5">
            <dt className="text-xs text-muted-foreground">{step.label}</dt>
            <dd className="text-xs font-medium tabular-nums">
              {formatFee(step.price)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export type ServiceCardProps = {
  service: Service;
  awardLabel?: string;
  ctaNote?: string;
  className?: string;
};

/** Vinnarkortet: betyg, pris, avtal och kostnaden att lämna på ett ställe. */
export function ServiceCard({
  service,
  awardLabel,
  ctaNote,
  className,
}: ServiceCardProps) {
  return (
    <article
      data-slot="service-card"
      className={cn(
        "themed-border grid gap-block rounded-lg bg-card pad-card lg:grid-cols-[minmax(0,1fr)_20rem]",
        className,
      )}
    >
      <div className="flex flex-col gap-row">
        <div className="flex flex-wrap items-center gap-2">
          {service.award ? (
            <AwardBadge kind={service.award} label={awardLabel} />
          ) : null}
          <DisclosureBadge terms={service.terms} />
        </div>

        {/* h2 och inte h3. Kortet star direkt under sidans h1 i en Section
            utan egen rubrik, sa en h3 har gav ett rubrikhopp fran niva 1 till
            3. Uppmatt pa /hemlarm 2026-08-03. Djupdykningarna langre ned ar
            h3, eftersom deras Section har en h2. */}
        <div>
          <h2 className="font-heading text-h3">
            <span className="text-muted-foreground">{service.provider}</span>{" "}
            {service.name}
          </h2>
          <p className="mt-1 text-muted-foreground">{service.tagline}</p>
        </div>

        <ProsCons
          pros={service.pros}
          cons={service.cons}
          variant="side"
          size="sm"
        />

        <SpecList specs={service.specs} variant="rows" highlightOnly size="sm" />
      </div>

      <div className="flex flex-col gap-row">
        <div className="flex items-start justify-between gap-3">
          <ServicePrice terms={service.terms} size="lg" />
          <ScoreBadge score={service.score} variant="dial" size="md" />
        </div>

        <RatingStars value={service.rating} showValue size="sm" />
        <ServiceTotalCost terms={service.terms} />

        <BuyoutLadder service={service} />
        <ExitFees service={service} />

        <AffiliateCta
          href={service.providerUrl}
          affiliateUrl={service.affiliateUrl}
          merchant={service.provider}
          label={`Till ${service.provider}`}
          variant="award"
          size="lg"
          block
          note={ctaNote}
          productId={service.id}
          placement="winner"
        />
      </div>
    </article>
  );
}

export type ServiceReviewProps = {
  service: Service;
  rank: number;
  children?: ReactNode;
  className?: string;
};

/** Djupdykning per tjänst, med samma uppgifter i löpande form. */
export function ServiceReview({
  service,
  rank,
  children,
  className,
}: ServiceReviewProps) {
  return (
    <article
      id={service.id}
      data-slot="service-review"
      className={cn(
        "themed-border scroll-mt-24 rounded-lg bg-card pad-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">
            {rank}. {service.superlative ?? service.provider}
          </p>
          <h3 className="font-heading text-h3">
            <span className="text-muted-foreground">{service.provider}</span>{" "}
            {service.name}
          </h3>
          <p className="mt-1 max-w-prose text-muted-foreground">
            {service.tagline}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DisclosureBadge terms={service.terms} />
          <ScoreBadge score={service.score} size="sm" />
        </div>
      </div>

      <div className="mt-block grid gap-block lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="flex flex-col gap-row">
          {children}
          <ProsCons
            pros={service.pros}
            cons={service.cons}
            variant="side"
            size="sm"
          />
          <SpecList specs={service.specs} variant="rows" size="sm" />
        </div>

        <div className="flex flex-col gap-row">
          <ServicePrice terms={service.terms} />
          <ServiceTotalCost terms={service.terms} />
          <p className="text-xs text-muted-foreground">
            {OWNERSHIP_LABELS[service.terms.ownership]}
            {service.terms.termsVersion
              ? `. Villkor lästa i utgåva ${service.terms.termsVersion}.`
              : "."}
          </p>
          <BuyoutLadder service={service} />
          <ExitFees service={service} />
          <AffiliateCta
            href={service.providerUrl}
            affiliateUrl={service.affiliateUrl}
            merchant={service.provider}
            label={`Till ${service.provider}`}
            variant="outline"
            block
            productId={service.id}
            placement="review"
          />
        </div>
      </div>
    </article>
  );
}
