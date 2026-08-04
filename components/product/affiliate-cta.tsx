import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { isAdminEnabled } from "@/lib/admin";
import { LINK_MODE, resolveMerchantLink } from "@/lib/links";
import { CTA_IDS, DEFAULT_STYLE, ctaLabel } from "@/lib/theme";
import { Button } from "@/components/ui/button";

export type AffiliateCtaProps = {
  /**
   * AFFILIATE-SWAP — pass the retailer URL. This component resolves the final
   * href and rel through `resolveMerchantLink`, so callers never decide
   * either. Pass `affiliateUrl` alongside once a program is joined.
   */
  href: string;
  affiliateUrl?: string;
  /** Defaults to "Se pris hos {merchant}" when a merchant is given. */
  label?: string;
  merchant?: string;
  variant?: "brand" | "default" | "outline" | "secondary" | "award";
  size?: "sm" | "default" | "lg" | "xl" | "2xl";
  /** Stretch to the container width. */
  block?: boolean;
  showIcon?: boolean;
  /** Small reassurance line under the button, e.g. "Fri frakt över 500 kr". */
  note?: string;
  /** Feeds the click tracker once analytics is wired up. */
  productId?: string;
  placement?: string;
  /**
   * Dölj "Annons"-etiketten. Bara för lägen där märkningen redan står i
   * direkt anslutning, exempelvis en tabellkolumn med rubriken Annons. En
   * monetiserad länk utan märkning någonstans är inte tillåten.
   */
  hideAdLabel?: boolean;
  className?: string;
};

/**
 * AFFILIATE-SWAP — the only element on the site allowed to link out to a
 * merchant. Never bypass it with a raw <a>.
 *
 * `href` and `rel` are both derived from `resolveMerchantLink`, so the whole
 * site flips from untracked dofollow links to network links by changing one
 * constant in lib/links.ts. `rel="sponsored"` follows monetisation rather than
 * being hardcoded: Google requires it the moment a link can earn us money, and
 * it is wrong to claim it before that.
 */
export function AffiliateCta({
  href,
  affiliateUrl,
  label,
  merchant,
  variant = "brand",
  size = "xl",
  block = false,
  showIcon = true,
  note,
  productId,
  placement,
  hideAdLabel = false,
  className,
}: AffiliateCtaProps) {
  /*
   * Etiketten.
   *
   * En anropare som skickar `label` bestämmer själv, exempelvis snabbvalets
   * "Till butik" som måste rymmas i en smal rad. Resten följer stilaxeln.
   *
   * I produktion renderas **en** sträng, den som står i `DEFAULT_STYLE`. Bara i
   * adminläget renderas alla sex, och då visar CSS:en en åt gången utifrån
   * `data-cta` på <html>. Skälet är att text inte går att byta med CSS: en
   * `content`-regel hade lämnat knappen utan tillgänglig text, och att skicka
   * axeln som prop hade krävt en ändring i varje sidfil och en omhämtning vid
   * varje byte.
   *
   * `display: none` tar bort de dolda varianterna ur tillgänglighetsträdet, så
   * en skärmläsare hör en etikett även i adminläget.
   */
  const text =
    label ??
    (isAdminEnabled() ? (
      CTA_IDS.map((id) => (
        <span key={id} data-cta-variant={id}>
          {ctaLabel(id, merchant)}
        </span>
      ))
    ) : (
      ctaLabel(DEFAULT_STYLE.cta, merchant)
    ));
  const link = resolveMerchantLink({
    id: productId ?? "",
    merchantUrl: href,
    affiliateUrl,
  });

  /* Branschrekommendationen (TU, Sveriges Tidskrifter, IAB Sverige, 18 juni
     2024) kräver att en kommersiell länk märks och att avsändaren framgår i
     direkt anslutning. Butiksnamnet står redan i knappens etikett i
     standardfallet, men `label` kan skriva över det, så namnet upprepas här
     när vi har det.

     Villkoret är `link.monetised`, samma flagga som styr rel="sponsored".
     Rekommendationen säger uttryckligen att icke-affiliatelänkar *inte* ska
     märkas, så en omärkt länk här är ett medvetet påstående om att vi inte
     tjänar något på den. */
  const showAdLabel = link.monetised && !hideAdLabel;

  return (
    <span
      data-slot="affiliate-cta"
      className={cn("inline-flex flex-col gap-1.5", block && "w-full", className)}
    >
      {showAdLabel ? (
        <span className="eyebrow text-muted-foreground">
          Annons{merchant ? ` · ${merchant}` : ""}
        </span>
      ) : null}
      <Button
        asChild
        variant={variant}
        size={size}
        className={cn(
          /* Merchant names are data, not copy: "Kjell & Company" arrives from
             the feed at any length, and the button base sets `whitespace-nowrap`
             plus a fixed height, so a long name overflowed.

             Wrapping is allowed only on `block` buttons. Those have a width
             decided by their container, so the text has to fold. An auto-width
             button must instead size itself to its label — letting those wrap
             turned "Se pris" into two lines in the table's narrow last column. */
          block &&
            "h-auto w-full py-2.5 leading-snug whitespace-normal text-balance",
        )}
      >
        <a
          href={link.href}
          target="_blank"
          rel={link.rel}
          data-affiliate={link.monetised ? "1" : "0"}
          data-link-mode={LINK_MODE}
          data-product-id={productId}
          data-placement={placement}
        >
          {text}
          {showIcon ? <ArrowUpRight aria-hidden="true" /> : null}
        </a>
      </Button>
      {note ? (
        <span className="text-center text-xs text-muted-foreground">{note}</span>
      ) : null}
    </span>
  );
}
