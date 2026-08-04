import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  OWNERSHIP_LABELS,
  buyoutPriceAt,
  formatBinding,
  formatFee,
  totalCost,
  type Service,
} from "@/lib/services";
import { ScoreBadge } from "@/components/product/score-badge";

/**
 * Jämförelsetabell för tjänster.
 *
 * ## Varför inte `ComparisonTable`
 *
 * Produkttabellen är byggd kring ett pris, ett kundbetyg och en rad
 * specifikationer. En tjänstetabell har i stället två priser som inte får
 * adderas, två tidsangivelser som styr när du kan komma ur avtalet, och en
 * fråga produkttabellen aldrig behöver ställa: vad kostar det att sluta?
 *
 * Layouten följer produkttabellen exakt, alltså en riktig `<table>` vid alla
 * bredder med fryst etikettkolumn och horisontell scroll, av samma skäl: en
 * jämförelse som löses upp i korten på en telefon är ingen jämförelse.
 *
 * ## Raden som är hela poängen
 *
 * "Publiceras inte" står utskrivet i klartext och aldrig som ett streck eller
 * en tom cell. Ett tankstreck läses som "saknas, spelar ingen roll". Här
 * betyder det att bolaget valt att inte svara, och det är sidans ärende.
 */

function Scroller({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto overscroll-x-contain -mx-4 sm:mx-0">
      {children}
    </div>
  );
}

const STICKY_COL =
  "sticky left-0 z-20 bg-card shadow-[inset_-8px_0_8px_-8px_rgb(0_0_0/0.13)]";
const STICKY_COL_MUTED =
  "sticky left-0 z-20 bg-muted shadow-[inset_-8px_0_8px_-8px_rgb(0_0_0/0.13)]";

type Row = {
  label: string;
  /** Framhävd rad, alltså en av dem läsaren kom hit för. */
  key?: boolean;
  render: (service: Service) => ReactNode;
};

/**
 * Ett värde som kan saknas, renderat så att frånvaron syns som ett val.
 *
 * Dämpad text och inte ett streck: läsaren ska förstå att uppgiften existerar
 * men inte publiceras, inte tro att raden är irrelevant för just det bolaget.
 */
function Missing({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>;
}

function value(text: string, missing = "Publiceras inte") {
  return text === missing ? <Missing>{text}</Missing> : <span>{text}</span>;
}

const ROWS: Row[] = [
  {
    label: "Betyg",
    render: (s) => <ScoreBadge score={s.score} size="sm" />,
  },
  {
    label: "Månadsavgift",
    key: true,
    render: (s) =>
      typeof s.terms.monthlyFee === "number" ? (
        <span className="font-medium tabular-nums">
          {formatFee(s.terms.monthlyFee)}
        </span>
      ) : (
        <Missing>Publiceras inte</Missing>
      ),
  },
  {
    label: "Startavgift",
    key: true,
    render: (s) => value(formatFee(s.terms.startFee)),
  },
  {
    label: "Bindningstid",
    key: true,
    render: (s) => value(formatBinding(s.terms.bindingMonths)),
  },
  {
    label: "Uppsägningstid",
    render: (s) =>
      typeof s.terms.noticeMonths === "number" ? (
        <span>{s.terms.noticeMonths} mån</span>
      ) : (
        <Missing>Publiceras inte</Missing>
      ),
  },
  {
    label: "Äganderätt",
    key: true,
    render: (s) => <span>{OWNERSHIP_LABELS[s.terms.ownership]}</span>,
  },
  {
    label: "Friköp inom 2 år",
    render: (s) => {
      const price = buyoutPriceAt(s.terms, 24);
      if (price === null) {
        return (
          <Missing>
            {s.terms.ownership === "kunden"
              ? "Behövs inte, du äger"
              : "Erbjuds inte"}
          </Missing>
        );
      }
      return <span className="tabular-nums">{formatFee(price)}</span>;
    },
  },
  {
    label: "Kostnad efter 5 år",
    key: true,
    render: (s) => {
      const total = totalCost(s.terms, 60);
      return total === null ? (
        <Missing>Går inte att räkna</Missing>
      ) : (
        <span className="font-medium tabular-nums">{formatFee(total)}</span>
      );
    },
  },
  {
    label: "Självriskeliminering",
    render: (s) =>
      typeof s.terms.excessCover === "number" ? (
        <span>
          {formatFee(s.terms.excessCover)}
          {s.terms.excessCoverPerYear ? " per år" : ""}
        </span>
      ) : (
        <Missing>Publiceras inte</Missing>
      ),
  },
  {
    label: "Avtalsvillkor publicerade",
    render: (s) =>
      s.terms.termsUrl ? (
        <a
          href={s.terms.termsUrl}
          rel="nofollow noopener"
          target="_blank"
          className="underline decoration-dotted underline-offset-4 hover:decoration-solid"
        >
          Ja{s.terms.termsVersion ? `, ${s.terms.termsVersion}` : ""}
        </a>
      ) : (
        <Missing>Hittade inga</Missing>
      ),
  },
];

export type ServiceTableProps = {
  services: Service[];
  caption?: string;
  className?: string;
};

export function ServiceTable({
  services,
  caption,
  className,
}: ServiceTableProps) {
  return (
    <div data-slot="service-table" className={cn("flex flex-col", className)}>
      <Scroller>
        {/* min-width tvingar fram scroll på telefon i stället för att klämma
            ihop kolumnerna till oläslighet. Samma tal som produkttabellen. */}
        <table className="w-full min-w-[44rem] border-collapse text-sm">
          <caption className="sr-only">
            Jämförelse av {services.length} hemlarmstjänster: avgifter, avtal
            och kostnaden att lämna.
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className={cn(
                  "px-3 py-3 text-left align-bottom font-medium",
                  STICKY_COL,
                )}
              >
                <span className="sr-only">Egenskap</span>
              </th>
              {services.map((service) => (
                <th
                  key={service.id}
                  scope="col"
                  className="min-w-[9.5rem] px-3 py-3 text-left align-bottom"
                >
                  <span className="block text-xs text-muted-foreground">
                    {service.provider}
                  </span>
                  <span className="font-heading text-sm">
                    {service.shortName ?? service.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr
                key={row.label}
                className={cn(
                  "border-b border-border/60",
                  row.key ? "bg-muted/40" : undefined,
                )}
              >
                <th
                  scope="row"
                  className={cn(
                    "px-3 py-2.5 text-left font-medium",
                    row.key ? STICKY_COL_MUTED : STICKY_COL,
                  )}
                >
                  {row.label}
                </th>
                {services.map((service) => (
                  <td key={service.id} className="px-3 py-2.5 align-top">
                    {row.render(service)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Scroller>

      {caption ? (
        <p className="mt-3 text-xs text-muted-foreground">{caption}</p>
      ) : null}
    </div>
  );
}
