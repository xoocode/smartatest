import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";
import { GROUPS, liveCategories } from "@/lib/catalog";
import { TOOLS, toolHref } from "@/lib/tools";
import { PEOPLE, personHref } from "@/lib/people";

/**
 * Only routes that actually exist belong here. Listing planned category pages
 * would feed Google a list of 404s, which costs crawl budget and trust.
 *
 * Liveness comes from `status` in lib/catalog.ts, so flipping a category to
 * "live" in the same commit as its page is the only step. There is no second
 * list here to forget.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...GROUPS.filter((group) => group.href).map((group) => ({
      url: `${SITE.url}${group.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...liveCategories().map((item) => ({
      url: `${SITE.url}${item.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE.url}/verktyg`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...TOOLS.map((tool) => ({
      url: `${SITE.url}${toolHref(tool)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    /* Om oss och metodsidan bär E-E-A-T-signalen och ligger därför högre än
       de rent juridiska sidorna längre ned. Om oss är dessutom förälder till
       personsidorna. */
    {
      url: `${SITE.url}/om-oss`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE.url}/sa-testar-vi`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...PEOPLE.map((person) => ({
      url: `${SITE.url}${personHref(person)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    /* Sekundära sidor. Låg prioritet, men de hör hemma här: annonsmärkningen
       är den sida balken på varje jämförelse pekar på, och den ska gå att
       hitta även utan att först läsa en jämförelse.
       `/sok` saknas med flit, den är noindex. */
    /* Ordlistan uppdateras när nya kategorier tillkommer och är dessutom den
       av stödsidorna som har egen sökpotential, därför månadsvis och högre
       prioritet än de juridiska. */
    {
      url: `${SITE.url}/ordlista`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE.url}/rattelser`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    ...["/annonsmarkning", "/kontakt", "/integritetspolicy"].map((href) => ({
      url: `${SITE.url}${href}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
