import Image from "next/image";

import { cn } from "@/lib/utils";

const ratioClass = {
  square: "aspect-square",
  wide: "aspect-4/3",
  tall: "aspect-3/4",
} as const;

export type ProductImageProps = {
  src?: string;
  alt: string;
  /** Rendered as the placeholder glyph when no image exists yet. */
  fallbackLabel?: string;
  ratio?: keyof typeof ratioClass;
  /**
   * Rendered width, so next/image can pick a sensible file. The default suits
   * a card; thumbnails must override it. Getting this wrong is invisible on a
   * fast connection and expensive on a slow one: the 48px quick-pick thumbs
   * were downloading the 384px file, roughly 8× the pixels they showed.
   */
  sizes?: string;
  /**
   * `muted` ger en tonad platta bakom bilden och en innerkant runt den.
   * `none` låter bilden fylla hela ytan.
   *
   * Kanten finns för produktbilder i kortstorlek, där en packshot mot vit
   * bakgrund annars flyter ut i kortet. I en 48-pixlars miniatyr kostar samma
   * kant en tredjedel av motivet, och plattan bakom syns mest som en grå ruta.
   *
   * Reservläget, alltså initialerna när ingen bild finns, behåller plattan
   * oavsett. Två bokstäver som svävar utan botten läser sig som ett fel.
   */
  frame?: "muted" | "none";
  className?: string;
};

/** Presets so call sites do not hand-write media queries. */
export const IMAGE_SIZES = {
  /**
   * 48–56px thumbnails: quick-pick rows, comparison-table cells.
   *
   * 96 och inte 64. Miniatyrerna hade en innerkant på 8 pixlar per sida, så
   * motivet renderades i 32 av rutans 48. När kanten togs bort fyller bilden
   * hela rutan, och 64 räckte då inte för en skärm med dubbel pixeltäthet.
   */
  thumb: "96px",
  /** ~96px avatars inside compact cards. */
  small: "128px",
  /** Card art in a 2–4 column grid. */
  card: "(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw",
  /** Winner-card and review hero art. */
  hero: "(min-width: 1024px) 224px, 90vw",
} as const;

/**
 * Product shots come from merchant feeds and are frequently missing during
 * content build-out, so the placeholder is a first-class state rather than a
 * broken image.
 */
export function ProductImage({
  src,
  alt,
  fallbackLabel,
  ratio = "square",
  sizes = IMAGE_SIZES.card,
  frame = "muted",
  className,
}: ProductImageProps) {
  const framed = frame === "muted";

  return (
    <div
      data-slot="product-image"
      data-frame={frame}
      className={cn(
        "relative w-full overflow-hidden rounded-md",
        /* Plattan följer ramen, utom i reservläget som alltid behöver en. */
        (framed || !src) && "bg-muted",
        ratioClass[ratio],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={cn("object-contain", framed && "p-2")}
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-heading text-2xl text-muted-foreground/50"
        >
          {fallbackLabel?.slice(0, 2).toUpperCase() ?? "–"}
        </span>
      )}
    </div>
  );
}
