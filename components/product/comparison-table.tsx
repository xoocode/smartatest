import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPrice, type Product } from "@/lib/products";
import type { TableId } from "@/lib/theme";
import { AffiliateCta } from "@/components/product/affiliate-cta";
import { AwardBadge } from "@/components/product/award-badge";
import { PriceTag } from "@/components/product/price-tag";
import { IMAGE_SIZES, ProductImage } from "@/components/product/product-image";
import { ScoreBadge } from "@/components/product/score-badge";
import { UserRating } from "@/components/product/user-rating";

export type ComparisonTableProps = {
  products: Product[];
  /**
   * matrix    — products as columns, attributes as rows. The layout NN/g and
   *             Baymard recommend, and the default.
   * grouped   — matrix with the attributes banded into labelled groups
   * checklist — matrix reduced to what a product has and does not have
   * rows      — products as rows, the classic testsieger shape
   * compact   — products as rows, no images, maximum density
   */
  layout?: TableId;
  /** Border treatment, independent of layout. */
  variant?: "bordered" | "striped" | "plain";
  /** Spec labels to show. Defaults to the highlighted ones. */
  specColumns?: string[];
  /** Treatment for the score figure. */
  scoreVariant?: "circle" | "dial";
  showRank?: boolean;
  showImage?: boolean;
  caption?: string;
  className?: string;
};

/* ------------------------------------------------------------------ shared */

/**
 * Every layout is a real `<table>` at every width. The previous version swapped
 * to a stack of product cards below `md`, which meant a phone got three
 * different card lists in a row (winner grid, table, deep reviews) and no
 * comparison at all. Horizontal scroll with a frozen label column is what NN/g
 * recommends when the data genuinely does not fit, and it keeps the comparison
 * intact instead of dissolving it.
 */
function Scroller({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-x-auto overscroll-x-contain",
        /* Full bleed on phones. Container is px-4 at this width, and giving
           those 32px back to the table is roughly 9% more room on a 375px
           screen, which is a whole column of values. Standard treatment for
           wide content on mobile; the padding returns from `sm` up where the
           table fits inside the reading column anyway. */
        "-mx-4 sm:mx-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* The shadow is the scroll cue. NN/g found cut-off content and edge treatments
   beat dot indicators, which people simply do not notice. */
const STICKY_COL =
  "sticky left-0 z-20 bg-card shadow-[inset_-8px_0_8px_-8px_rgb(0_0_0/0.13)]";
const STICKY_COL_MUTED =
  "sticky left-0 z-20 bg-muted shadow-[inset_-8px_0_8px_-8px_rgb(0_0_0/0.13)]";

function specValue(product: Product, label: string): string | undefined {
  return product.specs.find((s) => s.label === label)?.value;
}

/** Spec labels in the order the first product declares them. */
function specLabels(products: Product[], only?: string[]): string[] {
  if (only) return only;
  const first = products[0];
  if (!first) return [];
  return first.specs.filter((s) => s.highlight).map((s) => s.label);
}

function allSpecLabels(products: Product[]): string[] {
  const seen: string[] = [];
  for (const product of products) {
    for (const spec of product.specs) {
      if (!seen.includes(spec.label)) seen.push(spec.label);
    }
  }
  return seen;
}

/**
 * A spec counts as "missing" when it plainly says so. Used only by the
 * checklist layout, where a tick has to mean something concrete. The exact
 * value is still shown next to the icon so the reader never has to trust our
 * interpretation of a word.
 */
const NEGATIVE = ["nej", "-", "–", "saknas", "ingen", "inget"];
function isPresent(value: string | undefined): boolean {
  if (!value) return false;
  return !NEGATIVE.includes(value.trim().toLowerCase());
}

/**
 * Header cell for the matrix layouts: image, brand and name only.
 *
 * Rank, score and award all moved into rows of their own. In a matrix every
 * fact belongs on a labelled row, and stacking three of them into the header
 * made the tallest, busiest part of the table the one part with no labels.
 */
function MatrixHeadCell({
  product,
  showImage,
}: {
  product: Product;
  showImage: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      {showImage ? (
        <ProductImage
          src={product.image}
          alt={product.name}
          fallbackLabel={product.brand}
          sizes={IMAGE_SIZES.small}
          /* No tinted plate behind the shot. The product cut-outs already sit
             on white, so the muted panel read as a grey box around each one.
             `bg-transparent` beats ProductImage's own `bg-muted` through
             tailwind-merge, both being background utilities. */
          className="size-20 bg-transparent sm:size-28"
        />
      ) : null}
      {/* `max-w-full truncate` och inte bara `truncate`: cellen har
          `overflow: visible`, så ett långt varumärke ritas ovanpå
          grannkolumnen i stället för att klippas. Uppmätt på /brandfilt vid
          390 px, där "Brandvarnare.se" gick nio pixlar in i nästa produkt i
          fyra kolumner. Gäller alla sidor: "Kjell & Company" är lika långt. */}
      <span
        className="eyebrow max-w-full truncate text-muted-foreground"
        title={product.brand}
      >
        {product.brand}
      </span>
      {/* Fixed two-line block. A name that wrapped to three lines pushed its
          whole column down and broke the header's symmetry, so the box is
          sized for two lines and `line-clamp-2` is the guard for anything
          longer. The editorial fix is a `shortName` on the product. */}
      <span
        className="flex min-h-8 items-center sm:min-h-10"
        title={product.name}
      >
        <span className="line-clamp-2 text-[0.6875rem] leading-snug font-medium text-balance sm:text-sm">
          {product.shortName ?? product.name}
        </span>
      </span>
    </div>
  );
}

/* ------------------------------------------------------- matrix + grouped */

type MatrixRow = {
  label: string;
  /** Shown below `sm`, where the frozen label column is only 6.25rem wide. */
  shortLabel?: string;
  group?: string;
  render: (product: Product) => ReactNode;
};

/**
 * Both labels are rendered and one is hidden per breakpoint, rather than
 * branching on a viewport width the server cannot know. Only the visible one
 * is exposed to assistive tech, since `hidden` removes the other from the
 * accessibility tree.
 */
function RowLabel({ row }: { row: MatrixRow }) {
  if (!row.shortLabel || row.shortLabel === row.label) return <>{row.label}</>;
  return (
    <>
      <span className="sm:hidden">{row.shortLabel}</span>
      <span className="hidden sm:inline">{row.label}</span>
    </>
  );
}

function buildMatrixRows(
  products: Product[],
  specs: string[],
  scoreVariant: "circle" | "dial",
): MatrixRow[] {
  const rows: MatrixRow[] = [];

  if (products.some((p) => p.award || p.superlative)) {
    rows.push({
      label: "Utmärkelse",
      shortLabel: "Utmärkt",
      group: "Betyg och pris",
      render: (p) =>
        p.award ? (
          <AwardBadge kind={p.award} variant="pill" showIcon={false} />
        ) : p.superlative ? (
          <span className="text-xs text-muted-foreground">{p.superlative}</span>
        ) : (
          <span className="text-muted-foreground">–</span>
        ),
    });
  }

  rows.push({
    label: "Vårt betyg",
    shortLabel: "Betyg",
    group: "Betyg och pris",
    render: (p) => (
      <ScoreBadge score={p.score} variant={scoreVariant} size="sm" />
    ),
  });

  if (products.some((p) => p.userRating)) {
    rows.push({
      label: "Recensioner",
      shortLabel: "Omdömen",
      group: "Betyg och pris",
      render: (p) =>
        p.userRating ? (
          <UserRating product={p} variant="compact" />
        ) : (
          <span className="text-muted-foreground">–</span>
        ),
    });
  }

  rows.push({
    label: "Pris",
    group: "Betyg och pris",
    render: (p) => (
      <span className="font-heading text-brand whitespace-nowrap">
        {formatPrice(p.price, p.currency)}
      </span>
    ),
  });

  rows.push({
    label: "Butik",
    group: "Betyg och pris",
    render: (p) => (
      <span className="text-[0.6875rem] text-muted-foreground sm:text-sm">
        {p.merchant}
      </span>
    ),
  });

  for (const label of specs) {
    const short = products
      .flatMap((p) => p.specs)
      .find((sp) => sp.label === label)?.shortLabel;
    rows.push({
      label,
      shortLabel: short,
      group: "Specifikationer",
      render: (p) => (
        <span className="text-[0.6875rem] sm:text-sm">
          {specValue(p, label) ?? (
            <span className="text-muted-foreground">–</span>
          )}
        </span>
      ),
    });
  }

  return rows;
}

function MatrixTable({
  products,
  rows,
  showGroups,
  cellBorder,
  striped,
  showImage,
}: {
  products: Product[];
  rows: MatrixRow[];
  showGroups: boolean;
  cellBorder: string;
  striped: boolean;
  showImage: boolean;
}) {
  /* Group boundaries are computed up front rather than tracked with a variable
     mutated inside `map`. Reassigning during render is the pattern that breaks
     on re-render, and it is what `react-hooks/immutability` is guarding. */
  const banded = rows.map((row, i) => ({
    row,
    index: i,
    startsGroup: Boolean(
      showGroups && row.group && row.group !== rows[i - 1]?.group,
    ),
  }));

  return (
    <Scroller>
      <table
        /* Kolumnbredden växer med antalet produkter i stället för att delas ur
           en konstant. Vid fem produkter ger max() exakt de 40rem som gällde
           förut, vid tio ger den 75rem. Utan detta halveras kolumnbredden när
           listan växer: /utomhustimer rankar tio produkter och fick 56 px per
           kolumn på en telefon, där produktnamnen klipptes mitt i ordet och
           utmärkelsepillren rann över i varandra.

           Antalet går in som CSS-variabel och inte som klassnamn: Tailwind kan
           inte se klassnamn som byggs vid körning, men en arbitrary value som
           refererar en variabel är en statisk sträng och kompileras. */
        style={{ "--cmp-cols": products.length } as CSSProperties}
        className="w-full min-w-[max(40rem,calc(5rem+var(--cmp-cols)*7rem))] table-fixed border-collapse text-left text-[0.6875rem] sm:min-w-[max(52rem,calc(8.5rem+var(--cmp-cols)*8.5rem))] sm:text-sm"
      >
        {/* table-fixed plus a sized first column makes the remaining columns
            share the width equally, so every product gets the same room and
            the cells line up down the table. min-w forces the horizontal
            scroll on a phone rather than crushing the columns. */}
        <colgroup>
          <col className="w-20 sm:w-[8.5rem]" />
          {products.map((p) => (
            <col key={p.id} />
          ))}
        </colgroup>

        <thead>
          <tr>
            <th
              scope="col"
              className={cn(
                "eyebrow ps-2 pe-2 py-2 align-bottom sm:ps-3 sm:px-3 sm:py-3",
                STICKY_COL,
                cellBorder,
              )}
            >
              Jämför
            </th>
            {products.map((product) => (
              <th
                key={product.id}
                scope="col"
                className={cn(
                  "bg-card px-2 py-2.5 align-bottom last:pe-4 sm:px-3 sm:py-3 sm:last:pe-3",
                  cellBorder,
                )}
              >
                <MatrixHeadCell product={product} showImage={showImage} />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {banded.map(({ row, index: i, startsGroup }) => (
            <Fragment key={row.label}>
              {startsGroup ? (
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={products.length + 1}
                    className={cn(
                      "eyebrow bg-muted/70 ps-2 pe-2 py-1.5 text-left sm:ps-3 sm:px-3 sm:py-2",
                      cellBorder,
                    )}
                  >
                    {/* The cell spans the whole table, so its text would ride
                        off to the left as the reader scrolls sideways. Pinning
                        the inner span keeps the group label with the labels. */}
                    <span className="sticky left-2 inline-block sm:left-3">
                      {row.group}
                    </span>
                  </th>
                </tr>
              ) : null}

              <tr className={cn(striped && i % 2 === 1 && "bg-muted/40")}>
                <th
                  scope="row"
                  className={cn(
                    "ps-2 pe-2 py-2 text-left text-[0.6875rem] font-medium sm:ps-3 sm:px-3 sm:py-3 sm:text-sm",
                    striped && i % 2 === 1 ? STICKY_COL_MUTED : STICKY_COL,
                    cellBorder,
                  )}
                >
                  <RowLabel row={row} />
                </th>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className={cn(
                      "px-2 py-2 align-middle last:pe-4 sm:px-3 sm:py-3 sm:last:pe-3",
                      cellBorder,
                    )}
                  >
                    {row.render(product)}
                  </td>
                ))}
              </tr>
            </Fragment>
          ))}

          <tr>
            <th
              scope="row"
              className={cn(
                "px-2 py-3 sm:px-3 sm:py-4",
                STICKY_COL,
                cellBorder,
              )}
            >
              <span className="sr-only">Köp</span>
            </th>
            {products.map((product) => (
              <td
                key={product.id}
                className={cn("px-2 py-3 sm:px-3 sm:py-4", cellBorder)}
              >
                <AffiliateCta
                  href={product.merchantUrl}
                  affiliateUrl={product.affiliateUrl}
                  merchant={product.merchant}
                  label="Se pris"
                  productId={product.id}
                  placement="comparison-table"
                  size="default"
                  showIcon={false}
                  block
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </Scroller>
  );
}

/* ---------------------------------------------------------------- checklist */

function ChecklistTable({
  products,
  cellBorder,
  showImage,
}: {
  products: Product[];
  cellBorder: string;
  showImage: boolean;
}) {
  /* Every spec any product declares, so a feature one product lacks still gets
     a row rather than quietly disappearing. */
  const labels = allSpecLabels(products);

  return (
    <Scroller>
      <table
        /* Kolumnbredden växer med antalet produkter i stället för att delas ur
           en konstant. Vid fem produkter ger max() exakt de 40rem som gällde
           förut, vid tio ger den 75rem. Utan detta halveras kolumnbredden när
           listan växer: /utomhustimer rankar tio produkter och fick 56 px per
           kolumn på en telefon, där produktnamnen klipptes mitt i ordet och
           utmärkelsepillren rann över i varandra.

           Antalet går in som CSS-variabel och inte som klassnamn: Tailwind kan
           inte se klassnamn som byggs vid körning, men en arbitrary value som
           refererar en variabel är en statisk sträng och kompileras. */
        style={{ "--cmp-cols": products.length } as CSSProperties}
        className="w-full min-w-[max(40rem,calc(5rem+var(--cmp-cols)*7rem))] table-fixed border-collapse text-left text-[0.6875rem] sm:min-w-[max(52rem,calc(8.5rem+var(--cmp-cols)*8.5rem))] sm:text-sm"
      >
        {/* table-fixed plus a sized first column makes the remaining columns
            share the width equally, so every product gets the same room and
            the cells line up down the table. min-w forces the horizontal
            scroll on a phone rather than crushing the columns. */}
        <colgroup>
          <col className="w-20 sm:w-[8.5rem]" />
          {products.map((p) => (
            <col key={p.id} />
          ))}
        </colgroup>

        <thead>
          <tr>
            <th
              scope="col"
              className={cn(
                "eyebrow ps-2 pe-2 py-2 align-bottom sm:ps-3 sm:px-3 sm:py-3",
                STICKY_COL,
                cellBorder,
              )}
            >
              Funktion
            </th>
            {products.map((product) => (
              <th
                key={product.id}
                scope="col"
                className={cn(
                  "bg-card px-2 py-2.5 align-bottom last:pe-4 sm:px-3 sm:py-3 sm:last:pe-3",
                  cellBorder,
                )}
              >
                <MatrixHeadCell product={product} showImage={showImage} />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {labels.map((label, i) => (
            <tr key={label} className={cn(i % 2 === 1 && "bg-muted/40")}>
              <th
                scope="row"
                className={cn(
                  "ps-2 pe-2 py-2 text-left text-[0.6875rem] font-medium sm:ps-3 sm:px-3 sm:py-2.5 sm:text-sm",
                  i % 2 === 1 ? STICKY_COL_MUTED : STICKY_COL,
                  cellBorder,
                )}
              >
                {label}
              </th>
              {products.map((product) => {
                const value = specValue(product, label);
                const present = isPresent(value);
                return (
                  <td
                    key={product.id}
                    className={cn(
                      "px-2 py-2 align-middle last:pe-4 sm:px-3 sm:py-2.5 sm:last:pe-3",
                      cellBorder,
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      {present ? (
                        <Check
                          aria-hidden="true"
                          className="size-4 shrink-0 text-success"
                        />
                      ) : (
                        <Minus
                          aria-hidden="true"
                          className="size-4 shrink-0 text-muted-foreground"
                        />
                      )}
                      {/* The literal value stays visible, so the reader never
                          has to trust our reading of a word like "Via brygga". */}
                      <span
                        className={cn(
                          "text-[0.6875rem] whitespace-nowrap sm:text-sm",
                          present ? "" : "text-muted-foreground",
                        )}
                      >
                        {value ?? "Saknas"}
                      </span>
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}

          <tr>
            <th
              scope="row"
              className={cn(
                "ps-2 pe-2 py-2 text-left text-[0.6875rem] font-medium sm:ps-3 sm:px-3 sm:py-3 sm:text-sm",
                STICKY_COL,
                cellBorder,
              )}
            >
              Pris
            </th>
            {products.map((product) => (
              <td key={product.id} className={cn("px-3 py-3", cellBorder)}>
                <PriceTag price={product.price} size="sm" tone="brand" />
              </td>
            ))}
          </tr>

          <tr>
            <th
              scope="row"
              className={cn(
                "px-2 py-3 sm:px-3 sm:py-4",
                STICKY_COL,
                cellBorder,
              )}
            >
              <span className="sr-only">Köp</span>
            </th>
            {products.map((product) => (
              <td
                key={product.id}
                className={cn("px-2 py-3 sm:px-3 sm:py-4", cellBorder)}
              >
                <AffiliateCta
                  href={product.merchantUrl}
                  affiliateUrl={product.affiliateUrl}
                  merchant={product.merchant}
                  label="Se pris"
                  productId={product.id}
                  placement="comparison-table"
                  size="default"
                  showIcon={false}
                  block
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </Scroller>
  );
}

/* --------------------------------------------------------- rows + compact */

function RowsTable({
  products,
  specs,
  cellBorder,
  striped,
  bordered,
  showRank,
  showImage,
  scoreVariant,
  dense,
}: {
  products: Product[];
  specs: string[];
  cellBorder: string;
  striped: boolean;
  bordered: boolean;
  showRank: boolean;
  showImage: boolean;
  scoreVariant: "circle" | "dial";
  dense: boolean;
}) {
  const pad = dense ? "px-2.5 py-2" : "px-2 py-3 sm:px-3 sm:py-4";
  const showUserRatings = !dense && products.some((p) => p.userRating);

  return (
    <Scroller>
      {/* Auto layout here, unlike the matrix tables: these columns hold values
          of very different widths and content-driven sizing reads better. The
          min-width is what forces a scroll on a phone instead of squeezing
          every column to a few characters. */}
      <table
        className={cn(
          "w-full border-collapse text-left",
          dense ? "min-w-[54rem] text-sm" : "min-w-[46rem]",
        )}
      >
        <thead>
          <tr className="bg-muted">
            {showRank ? (
              <th scope="col" className={cn("eyebrow", pad, cellBorder)}>
                #
              </th>
            ) : null}
            <th
              scope="col"
              className={cn(
                "eyebrow min-w-[9.5rem] sm:min-w-[11rem]",
                pad,
                STICKY_COL_MUTED,
                cellBorder,
              )}
            >
              Produkt
            </th>
            <th scope="col" className={cn("eyebrow", pad, cellBorder)}>
              Vårt betyg
            </th>
            {showUserRatings ? (
              <th scope="col" className={cn("eyebrow", pad, cellBorder)}>
                Recensioner
              </th>
            ) : null}
            {specs.map((label) => (
              <th
                key={label}
                scope="col"
                className={cn("eyebrow whitespace-nowrap", pad, cellBorder)}
              >
                {label}
              </th>
            ))}
            <th scope="col" className={cn("eyebrow", pad, cellBorder)}>
              Pris
            </th>
            <th scope="col" className={cn(pad, cellBorder)}>
              <span className="sr-only">Köp</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, i) => {
            const zebra = striped && i % 2 === 1;
            return (
              <tr
                key={product.id}
                className={cn(
                  zebra && "bg-muted/50",
                  bordered &&
                    "[&>td]:border-r [&>th]:border-r [&>td:last-child]:border-r-0",
                )}
              >
                {showRank ? (
                  <td
                    className={cn(
                      "align-middle font-heading",
                      dense ? "text-base" : "text-lg",
                      pad,
                      cellBorder,
                    )}
                  >
                    {i + 1}
                  </td>
                ) : null}

                <th
                  scope="row"
                  className={cn(
                    "text-left align-middle font-normal",
                    pad,
                    zebra ? STICKY_COL_MUTED : STICKY_COL,
                    cellBorder,
                  )}
                >
                  <span className="flex max-w-[20rem] items-center gap-3">
                    {showImage && !dense ? (
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        fallbackLabel={product.brand}
                        sizes={IMAGE_SIZES.thumb}
                        className="size-12 shrink-0"
                      />
                    ) : null}
                    <span className="min-w-0">
                      <span className="eyebrow block truncate text-muted-foreground">
                        {product.brand}
                      </span>
                      <span
                        className="block truncate font-medium"
                        title={product.name}
                      >
                        {product.shortName ?? product.name}
                      </span>
                      {product.award && !dense ? (
                        <AwardBadge
                          kind={product.award}
                          variant="pill"
                          className="mt-1"
                        />
                      ) : null}
                    </span>
                  </span>
                </th>

                <td className={cn("align-middle", pad, cellBorder)}>
                  <ScoreBadge
                    score={product.score}
                    variant={dense ? "bare" : scoreVariant}
                    size="sm"
                  />
                </td>

                {showUserRatings ? (
                  <td className={cn("align-middle", pad, cellBorder)}>
                    <UserRating product={product} variant="compact" />
                  </td>
                ) : null}

                {specs.map((label) => (
                  <td
                    key={label}
                    className={cn(
                      "align-middle whitespace-nowrap",
                      dense ? "" : "text-sm",
                      pad,
                      cellBorder,
                    )}
                  >
                    {specValue(product, label) ?? "–"}
                  </td>
                ))}

                <td className={cn("align-middle", pad, cellBorder)}>
                  <PriceTag
                    price={product.price}
                    oldPrice={dense ? undefined : product.oldPrice}
                    size="sm"
                    tone="brand"
                  />
                </td>

                <td className={cn("align-middle", pad, cellBorder)}>
                  <AffiliateCta
                    href={product.merchantUrl}
                    affiliateUrl={product.affiliateUrl}
                    merchant={product.merchant}
                    label="Se pris"
                    productId={product.id}
                    placement="comparison-table"
                    size={dense ? "sm" : "default"}
                    showIcon={false}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Scroller>
  );
}

/* -------------------------------------------------------------------- root */

export function ComparisonTable({
  products,
  layout = "matrix",
  variant = "bordered",
  specColumns,
  scoreVariant = "circle",
  showRank = true,
  showImage = true,
  caption,
  className,
}: ComparisonTableProps) {
  const cellBorder =
    variant === "bordered"
      ? "border-b border-border"
      : "border-b border-border/60";
  const striped = variant === "striped";
  const specs = specLabels(products, specColumns);

  const shared = { cellBorder, showImage, showRank, scoreVariant };

  return (
    <div
      data-slot="comparison-table"
      data-layout={layout}
      className={className}
    >
      {/* Above the scroll container, not a `<caption>` inside the table. A
          caption sits in the table's own box and rides away to the left the
          moment the reader scrolls sideways, which is exactly where a note
          about prices should not go. */}
      {caption ? (
        <p className="mb-3 text-sm text-muted-foreground">{caption}</p>
      ) : null}

      {layout === "matrix" || layout === "grouped" ? (
        <MatrixTable
          {...shared}
          products={products}
          striped={striped}
          showGroups={layout === "grouped"}
          rows={buildMatrixRows(
            products,
            layout === "grouped" ? allSpecLabels(products) : specs,
            scoreVariant,
          )}
        />
      ) : null}

      {layout === "checklist" ? (
        <ChecklistTable {...shared} products={products} />
      ) : null}

      {layout === "rows" || layout === "compact" ? (
        <RowsTable
          {...shared}
          products={products}
          specs={layout === "compact" ? allSpecLabels(products) : specs}
          striped={striped || layout === "compact"}
          bordered={variant === "bordered" && layout !== "compact"}
          dense={layout === "compact"}
        />
      ) : null}
    </div>
  );
}
