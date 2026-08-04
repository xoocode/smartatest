import { PUBLISHER, SITE } from "@/lib/site";

/*
 * Organisation och webbplats som strukturerad data, en gång för hela sajten.
 *
 * ## Varför en enda graf i stället för ett block per sida
 *
 * Sidorna emitterar redan sin egen data: `Breadcrumbs` ger BreadcrumbList,
 * `ProductSchema` ger produkterna, FAQ-dragspelet ger FAQPage. Det som saknades
 * var avsändaren. Utan en Organization med ett stabilt `@id` har varje
 * `publisher`-referens ingenting att peka på, och Google får då en sajt där
 * ingen står bakom betygen.
 *
 * `@id`-värdena är fragment på domänen och ska aldrig ändras. De är nycklar
 * andra noder refererar till, inte adresser någon besöker.
 *
 * ## Vad som avsiktligt inte står här
 *
 * Inget organisationsnummer. redpoint9 är en enskild firma, och dess org.nr är
 * innehavarens personnummer. Se `lib/site.ts`.
 *
 * Ingen `aggregateRating` på organisationen. Det är påhittade siffror på
 * sajter som gör det, och Google har plockat bort rika resultat för det.
 */
export function SiteSchema() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE.url}#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE.url}#logo`,
        url: `${SITE.url}/icon-512.png`,
        width: 512,
        height: 512,
      },
      email: PUBLISHER.email,
      /* Utgivaren är en annan juridisk person än varumärket. parentOrganization
         är rätt relation: redpoint9 driver sajten, sajten är inte redpoint9. */
      parentOrganization: {
        "@type": "Organization",
        name: PUBLISHER.name,
        url: PUBLISHER.url,
      },
      address: {
        "@type": "PostalAddress",
        /* Bara de fält vi faktiskt har. Ett tomt fält är sämre än inget,
           eftersom det signalerar en adress som inte finns. */
        ...(PUBLISHER.street ? { streetAddress: PUBLISHER.street } : {}),
        ...(PUBLISHER.postalCode ? { postalCode: PUBLISHER.postalCode } : {}),
        ...(PUBLISHER.locality ? { addressLocality: PUBLISHER.locality } : {}),
        addressRegion: PUBLISHER.region,
        addressCountry: "SE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "editorial",
        email: PUBLISHER.email,
        url: `${SITE.url}/kontakt`,
        availableLanguage: ["sv"],
      },
      publishingPrinciples: `${SITE.url}/annonsmarkning`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}#website`,
      name: SITE.name,
      url: SITE.url,
      description: SITE.tagline,
      inLanguage: "sv-SE",
      publisher: { "@id": `${SITE.url}#organization` },
      /* Pekar på /sok, som tar emot ?q=. Ändras den parametern slutar det här
         att stämma, så håll dem ihop. */
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE.url}/sok?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
