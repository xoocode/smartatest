import { GROUPS, liveCategories } from "@/lib/catalog";
import { GLOSSARY } from "@/lib/glossary";
import { TOOLS, toolHref } from "@/lib/tools";
import { PEOPLE, personHref } from "@/lib/people";

export type SearchDoc = {
  href: string;
  title: string;
  /** Shown under the title in results. */
  description: string;
  /** Group label in the results list. */
  kind: "Kategori" | "Skribent" | "Sida" | "Verktyg" | "Översikt";
  /** Extra terms that should match but are not displayed. */
  keywords?: string[];
};

/* Bara sidor som finns. En träff som leder till 404 är sämre än ingen träff. */
const STATIC_PAGES: SearchDoc[] = [
  {
    href: "/om-oss",
    title: "Om oss",
    description: "Redaktionen, och varför sajten finns.",
    kind: "Sida",
    keywords: [
      "om oss",
      "skribenter",
      "redaktion",
      "författare",
      "granskare",
      "vilka är ni",
    ],
  },
  {
    href: "/sa-testar-vi",
    title: "Så testar vi",
    description: "Metoden, viktningen och hur betygen räknas fram.",
    kind: "Sida",
    keywords: [
      "metod",
      "betyg",
      "viktning",
      "kriterier",
      "hur testar ni",
      "testmetod",
    ],
  },
  {
    href: "/ordlista",
    title: "Ordlista",
    description: "Vad CRI, lumen, Zigbee, IP-klass och nolledare betyder.",
    kind: "Sida",
    /* Termerna och deras synonymer hämtas ur listan i stället för att skrivas
       av. En handskriven uppräkning missade "ip44", som ligger som alias på
       IP-klass, och skulle ha missat varje term som läggs till senare. */
    keywords: [
      "ordlista",
      "begrepp",
      "vad betyder",
      ...GLOSSARY.flatMap((t) => [t.term, ...(t.aliases ?? [])]),
    ],
  },
  {
    href: "/rattelser",
    title: "Rättelser",
    description: "Sakfel vi rättat, och när.",
    kind: "Sida",
    keywords: ["rättelse", "faktafel", "korrigering", "fel"],
  },
  {
    href: "/annonsmarkning",
    title: "Annonsmärkning",
    description: "Hur vi tjänar pengar och vilka länkar som är annonser.",
    kind: "Sida",
    keywords: [
      "annons",
      "affiliate",
      "provision",
      "reklam",
      "sponsrad",
      "finansiering",
    ],
  },
  {
    href: "/kontakt",
    title: "Kontakt",
    description: "Rättelser, produkttips och samarbeten.",
    kind: "Sida",
    keywords: ["mejl", "e-post", "rättelse", "faktafel", "hör av dig"],
  },
  {
    href: "/integritetspolicy",
    title: "Integritetspolicy",
    description: "Vad som lagras om dig, och vad som inte gör det.",
    kind: "Sida",
    keywords: ["cookies", "kakor", "gdpr", "personuppgifter", "integritet"],
  },
];

/**
 * Built at module load from the catalogue, so a new category becomes
 * searchable without a second registration step.
 *
 * ## Rättat 2026-08-02
 *
 * Indexet byggdes tidigare ur `NAV`. Det fungerade så länge menyn listade
 * varje kategori platt, men när menyn gjordes om till gruppnavsidor (se
 * lib/site.ts) försvann samtliga kategorisidor ur sökningen utan att något
 * gick sönder synligt. En sökning på "brandvarnare" gav träff på en räknare
 * men inte på jämförelsen. Dessutom hamnade "Verktyg" bland kategorierna, och
 * grupperna fick titeln "Bäst i test smart hem 2026", som ingen söker på.
 *
 * Källan är nu `liveCategories()`, samma funktion sitemapen läser. En kategori
 * som inte är byggd kan alltså inte dyka upp här, och en som byggs dyker upp
 * av sig själv.
 */
export const SEARCH_INDEX: SearchDoc[] = [
  ...liveCategories().map((entry) => ({
    href: entry.href,
    title: `Bäst i test ${entry.label.toLowerCase()} 2026`,
    description: entry.blurb,
    kind: "Kategori" as const,
    keywords: [entry.label, "bäst i test", "test", "jämförelse", "testvinnare"],
  })),
  ...GROUPS.filter((group) => group.href).map((group) => ({
    href: group.href as string,
    title: group.label,
    description: `Alla våra jämförelser inom ${group.label.toLowerCase()}.`,
    kind: "Översikt" as const,
    keywords: [group.label, "översikt", "kategori"],
  })),
  {
    href: "/verktyg",
    title: "Verktyg",
    description: "Räknare och guider som svarar på en fråga i taget.",
    kind: "Översikt" as const,
    keywords: ["räknare", "kalkylator", "verktyg"],
  },
  ...TOOLS.map((tool) => ({
    href: toolHref(tool),
    title: tool.name,
    description: tool.description,
    kind: "Verktyg" as const,
    keywords: ["räknare", "kalkylator", "verktyg", tool.name],
  })),
  ...PEOPLE.map((person) => ({
    href: personHref(person),
    title: person.name,
    description: `${person.role}. ${person.short}.`,
    kind: "Skribent" as const,
    keywords: [person.role],
  })),
  ...STATIC_PAGES,
];

/** Case- and diacritic-insensitive substring match across title and keywords. */
export function searchDocs(query: string, docs = SEARCH_INDEX): SearchDoc[] {
  const q = normalise(query.trim());
  if (q.length < 2) return [];

  return docs.filter((doc) => {
    const haystack = normalise(
      [doc.title, doc.description, ...(doc.keywords ?? [])].join(" "),
    );
    return haystack.includes(q);
  });
}

/**
 * Fold å/ä/ö to a/a/o so "overvakning" finds "Övervakningskamera". Swedish
 * users frequently type without the diacritics.
 */
const FOLD: Record<string, string> = {
  "å": "a",
  "ä": "a",
  "ö": "o",
  "é": "e",
  "ü": "u",
};

function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[åäöéü]/g, (ch) => FOLD[ch]);
}
