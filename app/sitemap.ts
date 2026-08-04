import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";
import { CATEGORIES, liveTestPages } from "@/lib/catalog";
import { ALL_PRODUCTS } from "@/lib/data";
import { TOOLS, toolHref } from "@/lib/tools";
import { PEOPLE, personHref } from "@/lib/people";
import { PAGE_UPDATED, homeUpdated, toolsUpdated, asDate } from "@/lib/updated";

/**
 * Only routes that actually exist belong here. Listing planned category pages
 * would feed Google a list of 404s, which costs crawl budget and trust.
 *
 * Liveness comes from `status` in lib/catalog.ts, so flipping a category to
 * "live" in the same commit as its page is the only step. There is no second
 * list here to forget.
 *
 * ## Om lastmod
 *
 * Datumen är riktiga innehållsdatum, inte byggtidpunkten. Skälet står i
 * lib/updated.ts: ett `lastmod` som ändras vid varje bygge får Google att
 * sluta läsa fältet för hela sajten, och då är signalen bortkastad.
 *
 * En adress utan känt datum får inget `lastmod` alls. Fältet är frivilligt per
 * adress i sitemap-protokollet, och ett utelämnat datum är sämre för oss men
 * ärligt, medan ett påhittat är sämre för alla adresser vi faktiskt vet något
 * om. I dagsläget har varje adress ett datum.
 */

/** Bygger en post och utelämnar `lastModified` när datum saknas. */
function entry(
  href: string,
  updated: string | undefined,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  images?: string[],
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE.url}${href}`,
    ...(updated ? { lastModified: asDate(updated) } : {}),
    changeFrequency,
    priority,
    ...(images?.length ? { images } : {}),
  };
}

/**
 * Packshots på en kategorisida, som absoluta adresser.
 *
 * ## Varför uppslaget ser ut så här
 *
 * `Product` bär ingen kategori. Kopplingen finns i bildsökvägen, som byggs av
 * `productImage(testPageSlug, id)` i lib/image-config.mjs och därmed alltid
 * börjar med kategorins mapp. Att filtrera på det prefixet är alltså att läsa
 * konventionen, inte att gissa på en slump.
 *
 * Uppslaget bor här och inte i `lib/data/`, eftersom sitemapen är enda
 * konsumenten. Behöver något annat samma sak är det då den ska flytta.
 *
 * Värdet är blygsamt och värt raderna ändå: bilderna renderas redan i `img`
 * och hittas av en crawler, men produktresearch börjar ofta i bildsök, och en
 * packshot som ligger i sitemapen har en väg in som inte kräver att någon
 * först renderar sidan.
 */
function testPageImages(href: string): string[] {
  const prefix = `/bilder${href}/`;

  return ALL_PRODUCTS.flatMap((product) =>
    product.image?.startsWith(prefix) ? [`${SITE.url}${product.image}`] : [],
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("", homeUpdated(), "weekly", 1),
    /* flatMap i stället för filter + map: filter smalnar inte av typen, så
       `group.href` skulle behöva ett utropstecken för att kompilera. */
    ...CATEGORIES.flatMap((group) =>
      group.href
        ? [entry(group.href, PAGE_UPDATED[group.href], "monthly", 0.7)]
        : [],
    ),
    ...liveTestPages().map((item) =>
      entry(item.href, item.updated, "weekly", 0.9, testPageImages(item.href)),
    ),
    entry("/guider", toolsUpdated(), "monthly", 0.6),
    ...TOOLS.map((tool) => entry(toolHref(tool), tool.updated, "monthly", 0.5)),
    /* Om oss och metodsidan bär E-E-A-T-signalen och ligger därför högre än
       de rent juridiska sidorna längre ned. Om oss är dessutom förälder till
       personsidorna, som delar dess datum eftersom de redigeras tillsammans. */
    entry("/om-oss", PAGE_UPDATED["/om-oss"], "monthly", 0.5),
    entry("/sa-testar-vi", PAGE_UPDATED["/sa-testar-vi"], "monthly", 0.6),
    ...PEOPLE.map((person) =>
      entry(personHref(person), PAGE_UPDATED["/om-oss"], "monthly", 0.4),
    ),
    /* Sekundära sidor. Låg prioritet, men de hör hemma här: annonsmärkningen
       är den sida balken på varje jämförelse pekar på, och den ska gå att
       hitta även utan att först läsa en jämförelse.
       `/sok` saknas med flit, den är noindex. */
    /* Ordlistan uppdateras när nya kategorier tillkommer och är dessutom den
       av stödsidorna som har egen sökpotential, därför månadsvis och högre
       prioritet än de juridiska. */
    entry("/ordlista", PAGE_UPDATED["/ordlista"], "monthly", 0.5),
    entry("/rattelser", PAGE_UPDATED["/rattelser"], "monthly", 0.3),
    ...["/annonsmarkning", "/kontakt", "/integritetspolicy"].map((href) =>
      entry(href, PAGE_UPDATED[href], "yearly", 0.3),
    ),
  ];
}
