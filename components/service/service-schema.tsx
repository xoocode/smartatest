import { SITE } from "@/lib/site";
import type { TestPage } from "@/lib/products";
import type { Service } from "@/lib/services";
import { DEFAULT_REVIEWER, type Person } from "@/lib/people";
import {
  graph,
  orgRef,
  pageEntity,
  personNode,
  type PageSection,
} from "@/lib/schema";

export type ServiceSchemaProps = {
  testPage: TestPage;
  services: Service[];
  /** Absolut sökväg, t.ex. "/hemlarm". */
  pageUrl: string;
  author?: Person;
  reviewed?: string;
  reviewer?: Person;
  sections?: PageSection[];
};

/**
 * Service + Offer + Review + ItemList för en tjänstejämförelse.
 *
 * ## Varför `Service` och inte `Product`
 *
 * Ett hemlarm med larmcentral är inget föremål. `Product` hade tvingat fram
 * `brand` för något som är en leverantör, och `offers.price` för något som är
 * en löpande avgift. `Service` har `provider` som `Organization` och tillåter
 * en `Offer` med `UnitPriceSpecification`, alltså ett pris med en
 * faktureringsperiod. Det är den enda modellering som beskriver 599 kronor i
 * månaden korrekt.
 *
 * ## Priset märks upp, till skillnad från på produktsidorna
 *
 * `ProductSchema` utelämnar medvetet `offers`, eftersom produktpriserna kommer
 * från ett flöde som rör sig och ett inaktuellt pris i strukturerad data är en
 * risk för manuell åtgärd. Här är läget ett annat: månadsavgiften är läst på
 * leverantörens egen sida, den är en publicerad prislista och inte ett
 * kampanjpris i en butik, och den ändras sällan.
 *
 * **Och den viktigaste egenskapen: vi märker bara upp priser som finns.** När
 * bolaget inte publicerar någon månadsavgift utelämnas `offers` helt, i
 * stället för att fyllas med en nolla eller en gissning. Schemat är alltså
 * tyst exakt där leverantören är tyst, vilket är samma regel som gäller i
 * gränssnittet.
 */
export function ServiceSchema({
  testPage,
  services,
  pageUrl,
  author,
  reviewed,
  reviewer = DEFAULT_REVIEWER,
  sections,
}: ServiceSchemaProps) {
  const url = `${SITE.url}${pageUrl}`;
  const publisher = orgRef();
  const reviewAuthor = author ? personNode(author) : publisher;

  const itemList = {
    "@type": "ItemList",
    "@id": `${url}#ranking`,
    url,
    name: testPage.title,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: services.length,
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${url}#${service.id}`,
        name: `${service.provider} ${service.name}`,
        serviceType: "Hemlarm med larmcentral",
        description: service.tagline,
        provider: {
          "@type": "Organization",
          name: service.provider,
          url: service.providerUrl,
        },
        areaServed: { "@type": "Country", name: "Sverige" },
        ...(typeof service.terms.monthlyFee === "number"
          ? {
              offers: {
                "@type": "Offer",
                url: service.providerUrl,
                priceCurrency: "SEK",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: service.terms.monthlyFee,
                  priceCurrency: "SEK",
                  /* Månadsavgift, uttryckt som en enhet om en månad. Utan
                     billingDuration läses talet som ett engångspris. */
                  billingDuration: 1,
                  billingIncrement: 1,
                  unitCode: "MON",
                },
              },
            }
          : {}),
        review: {
          "@type": "Review",
          name: service.superlative ?? testPage.title,
          reviewBody: service.verdict ?? service.tagline,
          datePublished: reviewed,
          author: reviewAuthor,
          publisher,
          reviewRating: {
            "@type": "Rating",
            /* Det härledda viktade medelvärdet, på samma skala sidan visar. */
            ratingValue: service.rating,
            bestRating: 5,
            worstRating: 1,
          },
        },
      },
    })),
  };

  const page = pageEntity({
    type: "CollectionPage",
    pageUrl,
    name: testPage.title,
    author,
    reviewer,
    reviewed,
    about: {
      "@type": "Thing",
      "@id": `${url}#amne`,
      name: testPage.label,
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
