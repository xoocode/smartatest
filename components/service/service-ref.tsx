import { cn } from "@/lib/utils";
import { findService } from "@/lib/data";
import { formatFee, type Service } from "@/lib/services";

export type ServiceRefProps = {
  /** Tjänstens id, slås upp i lib/data. Det MDX använder. */
  id?: string;
  /** Färdigupplöst tjänst, för anropare som redan har en. */
  service?: Service;
  /** Ankarprefix till djupdykningen. Samma sida som standard. */
  reviewHref?: string;
  /** Skriv över det synliga namnet, t.ex. för att passa in i en mening. */
  label?: string;
  /** Visa månadsavgiften efter namnet. */
  showFee?: boolean;
  className?: string;
};

/**
 * Hur köpguiden nämner en tjänst.
 *
 * Motsvarigheten till `ProductRef`, med en skillnad som är värd att förstå:
 * parentesen efter namnet kan behöva säga att priset inte finns. `ProductRef`
 * skriver alltid ut ett pris, eftersom en produkt alltid har ett. Här skulle
 * samma antagande få fyra av åtta bolag att se gratis ut.
 *
 * Bara `inline`. En kortvariant hade duplicerat `ServiceCard` för att lösa ett
 * problem prosan inte har.
 */
export function ServiceRef({
  id,
  service: given,
  reviewHref,
  label,
  showFee = true,
  className,
}: ServiceRefProps) {
  const service = given ?? (id ? findService(id) : undefined);

  /* En felstavad id i MDX renderar ingenting i stället för att krascha sidan.
     Bygggrinden är `pnpm check:refs`, som fäller okända id:n. */
  if (!service) return null;

  const href = reviewHref ?? `#${service.id}`;
  const name = label ?? `${service.provider} ${service.shortName ?? service.name}`;
  const hasFee = typeof service.terms.monthlyFee === "number";

  return (
    <span
      data-slot="service-ref"
      className={cn("not-prose inline", className)}
    >
      <a
        href={href}
        className="font-medium underline decoration-dotted underline-offset-4 hover:decoration-solid"
      >
        {name}
      </a>
      {showFee ? (
        <span className="text-muted-foreground">
          {" "}
          ({hasFee ? `${formatFee(service.terms.monthlyFee)}/mån` : "pris publiceras inte"})
        </span>
      ) : null}
    </span>
  );
}
