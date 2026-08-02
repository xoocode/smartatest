import { cn } from "@/lib/utils";
import { formatPrice, type ConsideredProduct } from "@/lib/products";
import { resolveMerchantLink } from "@/lib/links";

export type ConsideredListProps = {
  items: ConsideredProduct[];
  /**
   * list  — one row per product, reason alongside
   * table — same content as a real table, for spec-heavy categories
   */
  variant?: "list" | "table";
  className?: string;
};

/**
 * AFFILIATE-SWAP — the products that did not make the ranking, and why.
 *
 * The name links to the retailer when we have a URL. A reader who wants the
 * one we rejected is still a reader with intent, and sending them somewhere
 * useful beats a dead end.
 *
 * There is deliberately no CTA button: a buy button on something we chose not
 * to recommend would say the opposite of what the section says. The link goes
 * through `resolveMerchantLink` like every other outbound link, so it follows
 * `LINK_MODE` and carries the right `rel`.
 */
function ProductName({ item }: { item: ConsideredProduct }) {
  const inner = (
    <>
      <span className="eyebrow block text-muted-foreground">{item.brand}</span>
      <span className="font-medium">{item.name}</span>
    </>
  );

  if (!item.merchantUrl) return <span>{inner}</span>;

  /* Går aldrig via /till.
   *
   * En övervägd produkt finns inte i `ALL_PRODUCTS` och har inget id, så
   * `findProduct` kan inte slå upp den. Tidigare syntetiserades ett id ur
   * varumärke och namn, vilket var ofarligt så länge LINK_MODE var `direct`
   * och id:t aldrig hamnade i en adress. När läget blev `tracked` blev samma
   * sträng en sökväg, och varenda bortvald produkt länkade till
   * `/till/LIFX-Colour 1200 lm E27`, alltså en 404 med mellanslag i.
   *
   * Vi kan inte räkna klick på något vi inte har en post för, så länken går
   * rakt till butiken. Finns en affiliatelänk används den och behåller sitt
   * `sponsored`; annars är det en vanlig redaktionell länk.
   *
   * Rätt långsiktig lösning är att ge ConsideredProduct ett riktigt id och
   * registrera dem i lib/data, men det är en dataändring över samtliga
   * kategorier och hör hemma i samma omgång som produkterna. */
  const link = resolveMerchantLink(
    {
      id: "",
      merchantUrl: item.merchantUrl,
      affiliateUrl: item.affiliateUrl,
    },
    item.affiliateUrl ? "network" : "direct",
  );

  return (
    <a
      href={link.href}
      target="_blank"
      rel={link.rel}
      data-affiliate={link.monetised ? "1" : "0"}
      data-placement="considered"
      className="underline decoration-dotted underline-offset-4 hover:decoration-solid"
    >
      {inner}
    </a>
  );
}

function PriceNote({ item }: { item: ConsideredProduct }) {
  if (!item.approxPrice) return null;
  return (
    <span className="block text-sm text-muted-foreground">
      cirka {formatPrice(item.approxPrice)}
      {item.merchant ? ` hos ${item.merchant}` : null}
    </span>
  );
}

export function ConsideredList({
  items,
  variant = "list",
  className,
}: ConsideredListProps) {
  if (!items.length) return null;

  if (variant === "table") {
    return (
      <div
        data-slot="considered-list"
        data-variant="table"
        className={cn("overflow-x-auto", className)}
      >
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-muted">
              <th scope="col" className="eyebrow px-3 py-2.5">
                Produkt
              </th>
              <th scope="col" className="eyebrow px-3 py-2.5">
                Varför den inte kom med
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={`${item.brand}-${item.name}`}
                className="border-b border-border"
              >
                <th
                  scope="row"
                  className="px-3 py-2.5 text-left align-top font-normal"
                >
                  <ProductName item={item} />
                  <PriceNote item={item} />
                </th>
                <td className="px-3 py-2.5 align-top text-muted-foreground">
                  {item.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <ul
      data-slot="considered-list"
      data-variant="list"
      className={cn("flex flex-col gap-stack", className)}
    >
      {items.map((item) => (
        <li
          key={`${item.brand}-${item.name}`}
          className="themed-border flex flex-col gap-1 rounded-lg bg-card pad-card sm:flex-row sm:items-baseline sm:gap-4"
        >
          <span className="sm:w-60 sm:shrink-0">
            <ProductName item={item} />
            <PriceNote item={item} />
          </span>
          <span className="text-sm text-muted-foreground">{item.reason}</span>
        </li>
      ))}
    </ul>
  );
}
