import { SITE } from "@/lib/site";
import type { Category, Product } from "@/lib/products";
import { DEFAULT_REVIEWER, type Person } from "@/lib/people";
import {
  graph,
  orgRef,
  pageEntity,
  personNode,
  type PageSection,
} from "@/lib/schema";

export type ProductSchemaProps = {
  category: Category;
  products: Product[];
  /** Absolute path of the page, e.g. "/smart-belysning". */
  pageUrl: string;
  /** The tester. Becomes the Review author, which is the point of the byline. */
  author?: Person;
  /** ISO date of the last substantive update. */
  reviewed?: string;
  /**
   * The fact checker, emitted as `reviewedBy` on the page entity.
   *
   * Defaults to DEFAULT_REVIEWER so every existing category page gains the
   * signal without a change to its own file. Pass explicitly once a page has
   * a reviewer of its own.
   */
  reviewer?: Person;
  /**
   * The page's own table of contents, for deep-linkable section nodes.
   *
   * Optional because the TOC lives in each category page rather than here.
   * Pass the same array the `TocNav` gets and every heading becomes citable
   * on its own; omit it and the page entity is simply emitted without
   * `hasPart`.
   */
  sections?: PageSection[];
};

/**
 * Product + Review + AggregateRating + ItemList for a comparison page.
 *
 * This is what earns review rich results, which is the entire SERP advantage
 * of a testsieger page. Emitted from the product data rather than hand-written,
 * so the marked-up ratings can never disagree with the rendered ones.
 *
 * Deliberately omits `offers`: a Product offer needs a price we can stand
 * behind at crawl time, and ours come from a feed that moves. Marking up a
 * stale price is a manual-action risk, so price stays visible-only until the
 * feed is live.
 */
export function ProductSchema({
  category,
  products,
  pageUrl,
  author,
  reviewed,
  reviewer = DEFAULT_REVIEWER,
  sections,
}: ProductSchemaProps) {
  const url = `${SITE.url}${pageUrl}`;

  const publisher = orgRef();

  const reviewAuthor = author ? personNode(author) : publisher;

  const itemList = {
    "@type": "ItemList",
    "@id": `${url}#ranking`,
    url,
    name: category.title,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: products.length,
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        "@id": `${url}#${product.id}`,
        name: `${product.brand} ${product.name}`,
        brand: { "@type": "Brand", name: product.brand },
        description: product.tagline,
        review: {
          "@type": "Review",
          name: product.superlative ?? category.title,
          reviewBody: product.verdict ?? product.tagline,
          datePublished: reviewed,
          author: reviewAuthor,
          publisher,
          reviewRating: {
            "@type": "Rating",
            /* The derived weighted average, on the same 0–5 scale the page
               shows. Never a separately authored number. */
            ratingValue: product.rating,
            bestRating: 5,
            worstRating: 1,
          },
        },
      },
    })),
  };

  /*
   * Sidentiteten, tillagd 2026-08-02.
   *
   * Sidan hade tidigare bara en ItemList. Det beskrev rankningen men inte
   * sidan, så byline, granskare och uppdateringsdatum fanns bara som text.
   * Hela E-E-A-T-argumentet sajten bygger på var alltså osynligt för varje
   * maskin som läste den.
   *
   * `CollectionPage` och inte `Article`: `reviewedBy` och `lastReviewed` hör
   * till `WebPage` och ärvs bara av dess subtyper. En jämförelse är dessutom
   * en samlingssida i ordets egentliga mening.
   *
   * `Guide` övervägdes och valdes bort. Typen passar semantiskt, den är
   * uttryckligen avsedd för köpguider och rankade listor, men den är
   * fortfarande märkt som ny hos schema.org. Två konkurrerande beskrivningar
   * av samma sida är dessutom sämre än en tydlig.
   */
  const page = pageEntity({
    type: "CollectionPage",
    pageUrl,
    name: category.title,
    author,
    reviewer,
    reviewed,
    about: {
      "@type": "Thing",
      "@id": `${url}#amne`,
      name: category.label,
      url,
    },
    mainEntity: { "@id": `${url}#ranking` },
    sections,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: graph([page, itemList]) }}
    />
  );
}
