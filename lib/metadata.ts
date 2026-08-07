import type { Metadata } from "next";

import { SITE } from "@/lib/site";

/**
 * Delningsfälten varje sida måste upprepa.
 *
 * ## Varför de inte kan ärvas
 *
 * Next slår ihop metadata *grunt*. En sida som sätter `openGraph` ersätter
 * hela förälderns block, inte bara de fält den själv nämner. Roten i
 * `app/layout.tsx` sätter `siteName` och `locale`, men de överlevde bara på
 * startsidan: alla andra sidor satte ett eget `openGraph` och tappade båda.
 * Facebook, LinkedIn och Slack renderade därför varje delad jämförelse utan
 * avsändare, alltså utan det enda i kortet som säger vem som står bakom
 * betyget.
 *
 * Fälten går inte att ärva, bara att upprepa. Det här är stället de upprepas
 * på, så att en ny sida får dem genom att anropa funktionen i stället för att
 * komma ihåg två rader.
 *
 * ## Delningsbilden kommer inte härifrån
 *
 * Den ligger som `opengraph-image.tsx` i sidans egen mapp. En sådan fil
 * överlever ersättningen ovan, eftersom Next slår in filbaserad metadata per
 * segment och efter objektet — men bara filen i *sidans* mapp. Roten
 * `app/opengraph-image.tsx` når alltså inte ner hit. En sida utan egen fil
 * delas helt utan bild. Se lib/og-test-page.tsx.
 */
export function pageOpenGraph({
  title,
  path,
  type = "article",
}: {
  title: string;
  /** Sidans sökväg med inledande snedstreck, samma värde som canonical. */
  path: string;
  type?: "article" | "website";
}): Metadata["openGraph"] {
  return {
    type,
    locale: "sv_SE",
    siteName: SITE.name,
    title,
    url: `${SITE.url}${path}`,
  };
}
