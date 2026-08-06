import { SITE } from "@/lib/site";
import { personHref, type Person } from "@/lib/people";

/**
 * Delade byggstenar för strukturerad data.
 *
 * ## Varför referenser och inte kopior
 *
 * `SiteSchema` definierar organisationen och webbplatsen en gång, med stabila
 * `@id`. Allt annat på sajten pekar hit i stället för att beskriva dem igen.
 * Två `Organization`-noder med samma namn men olika `@id` är två
 * organisationer i grafen, inte en, och då faller varje `publisher`-koppling
 * isär.
 *
 * ## `@id` är nycklar, inte adresser
 *
 * Fragmenten nedan ska aldrig ändras. De är det som binder ihop noder över
 * sidgränser, och en ändrad nyckel bryter kopplingen tyst.
 */

export const ORG_ID = `${SITE.url}#organization`;
export const WEBSITE_ID = `${SITE.url}#website`;

export function absUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE.url}${path}`;
}

/** Referens till organisationen i `SiteSchema`. */
export function orgRef() {
  return { "@id": ORG_ID };
}

/** Referens till webbplatsen i `SiteSchema`. */
export function webSiteRef() {
  return { "@id": WEBSITE_ID };
}

/**
 * En person som nod med `@id`.
 *
 * Samma `@id` används av personsidan, så en författare på en jämförelse och
 * personen på `/om-oss/{slug}` blir samma entitet i grafen i stället för två
 * personer som råkar heta lika.
 */
export function personNode(person: Person) {
  return {
    "@type": "Person",
    "@id": `${absUrl(personHref(person))}#person`,
    name: person.name,
    url: absUrl(personHref(person)),
    jobTitle: person.role,
    worksFor: orgRef(),
  };
}

/** Referens till en person som beskrivs fullständigt någon annanstans. */
export function personRef(person: Person) {
  return { "@id": `${absUrl(personHref(person))}#person` };
}

export type PageSection = { id: string; label: string };

/**
 * Sidans avsnitt som djuplänkbara noder.
 *
 * Varje `url` pekar på ett verkligt ankare i DOM:en. Poängen är att ett svar
 * som citerar oss kan peka på räkneexemplet i stället för på hela sidan.
 *
 * ⚠️ `id` måste motsvara ett `id`-attribut som faktiskt renderas. En
 * djuplänk till ett ankare som inte finns är sämre än ingen djuplänk.
 */
export function pageElements(pageUrl: string, sections: PageSection[]) {
  return sections.map((section, i) => ({
    "@type": "WebPageElement",
    "@id": `${absUrl(pageUrl)}#${section.id}`,
    name: section.label,
    url: `${absUrl(pageUrl)}#${section.id}`,
    position: i + 1,
  }));
}

export type PageEntityOptions = {
  /** WebPage-subtyp: CollectionPage, AboutPage, ContactPage, ProfilePage … */
  type: string;
  pageUrl: string;
  name: string;
  description?: string;
  /** Skribent. */
  author?: Person;
  /** Faktagranskare. Kräver en WebPage-subtyp, se `reviewedBy` på schema.org. */
  reviewer?: Person;
  /** ISO-datum för senaste genomgång. */
  reviewed?: string;
  /** ISO-datum då sidan först publicerades. Blir `datePublished`. */
  published?: string;
  /** Vad sidan handlar om. */
  about?: unknown;
  /** Sidans huvudsakliga innehåll, oftast en referens. */
  mainEntity?: unknown;
  sections?: PageSection[];
};

/**
 * Sidentiteten.
 *
 * Den nod som faktiskt säger vad sidan *är*, och som bär författare,
 * granskare och datum. Utan den finns byline och granskningsstämpel bara som
 * pixlar: en läsare ser dem, ingen maskin gör det.
 *
 * `reviewedBy` och `lastReviewed` hör till `WebPage` och ärvs av dess
 * subtyper, vilket är skälet till att sidentiteten alltid är en WebPage-subtyp
 * och aldrig en ren `Article`.
 */
export function pageEntity(options: PageEntityOptions) {
  const url = absUrl(options.pageUrl);

  return {
    "@type": options.type,
    "@id": `${url}#page`,
    name: options.name,
    url,
    ...(options.description ? { description: options.description } : {}),
    inLanguage: "sv-SE",
    isPartOf: webSiteRef(),
    publisher: orgRef(),
    ...(options.author ? { author: personNode(options.author) } : {}),
    ...(options.reviewer ? { reviewedBy: personNode(options.reviewer) } : {}),
    ...(options.reviewed ? { lastReviewed: options.reviewed, dateModified: options.reviewed } : {}),
    ...(options.published ? { datePublished: options.published } : {}),
    ...(options.about ? { about: options.about } : {}),
    ...(options.mainEntity ? { mainEntity: options.mainEntity } : {}),
    ...(options.sections?.length
      ? { hasPart: pageElements(options.pageUrl, options.sections) }
      : {}),
    isAccessibleForFree: true,
  };
}

/** Ett `@graph`-block, färdigt att stoppa i en script-tagg. */
export function graph(nodes: unknown[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
