/**
 * Editorial staff.
 *
 * Three roles exist because a page needs two named humans to carry the
 * convention every competitor uses: an author and a separate fact checker.
 * A page reviewed by the person who wrote it is not reviewed.
 *
 * ## Bion måste stämma med metoden
 *
 * Omskriven 2026-08-02. Texterna beskrev tidigare fysiska långtidstester:
 * produkter som köptes in och kördes i åtta veckor, parallella installationer
 * hemma hos Marcus, ett citat om att "vecka tolv avgör betyget". Ingenting av
 * det stämmer med hur sajten faktiskt arbetar. Varje test page säger rakt ut att
 * vi inte provar något fysiskt, och `lib/sources.ts` bygger hela
 * källhanteringen på samma erkännande.
 *
 * En läsare som klickar på bylinen hamnade alltså på en sida som motsade den
 * uppgiften kom ifrån, och det är den mest kontrollerbara sortens motsägelse som
 * finns: två sidor, ett klick isär.
 *
 * Bakgrunderna får gärna innehålla provning och mätteknik, för det är just den
 * bakgrunden som gör någon bra på att läsa ett provningsintyg. Men det som
 * beskrivs som arbetet *här* ska vara det arbete som faktiskt utförs:
 * standarder i original, specifikationer lästa hos butiken, publicerade tester
 * ställda mot varandra och en viktning som går att räkna efter.
 *
 * ## Bion beskriver bara det cv:t stödjer
 *
 * Kortad 2026-08-03. Två regler gäller framåt. Bion får inte nämna ett jobb som
 * inte står i `experience`: Daniels andra stycke beskrev en tjänst som
 * provningsingenjör efter att raden strukits, och en läsare som jämför
 * styckena hittar sådant. Och den ska sluta där uppgiften är lämnad. Texterna
 * hade vuxit ut i självbeskrivning, som att Sara satte en notering i källistan
 * om att konkurrenterna döljer sina butikslänkar. Det kan mycket väl stämma,
 * men det står i källistan och behöver inte upprepas som en merit.
 */

import { liveTestPages } from "@/lib/catalog";

export type StatIcon = "experience" | "articles" | "tested" | "certified";

export type PersonStat = {
  icon: StatIcon;
  /**
   * Texten, eller en funktion som räknar fram den.
   *
   * ## Varför en funktion får finnas här
   *
   * Raderna sa tidigare "60+ publicerade jämförelser" och "300+ granskade
   * artiklar". Sajten har sex publicerade jämförelser, och `/om-oss` skriver ut
   * sin egen räkning två skärmhöjder därifrån. Ett runt tal som motsägs av
   * sidan det står på är sämre än inget tal alls.
   *
   * Räknade rader tar sitt värde ur katalogen och kan därför inte glida isär
   * med verkligheten. Skriv aldrig in ett antal för hand igen.
   */
  label: string | (() => string);
};

/** "6 publicerade jämförelser", med rätt böjning även vid ett. */
function comparisons(verb: string, plural: string): () => string {
  return () => {
    const n = liveTestPages().length;
    return n === 1
      ? `1 ${verb} jämförelse`
      : `${n} ${plural} jämförelser`;
  };
}

export type Person = {
  slug: string;
  name: string;
  /** Job title, shown under the name. */
  role: string;
  avatar?: string;
  /*
   * Ingen `email` och ingen `linkedin` per person. Borttagna 2026-08-03:
   * kontaktknappen på personsidorna går till `PUBLISHER.email`, som är
   * redaktionens brevlåda och överlever ett personbyte. Lägg inte tillbaka en
   * personlig adress utan att först bestämma vem som tömmer den.
   */
  /** One line for compact bylines. */
  short: string;
  /** Eyebrow above the philosophy quote. */
  quoteLabel?: string;
  quote?: string;
  /** Bio paragraphs. */
  bio: string[];
  stats: PersonStat[];
  /**
   * Roller, utan arbetsgivare. Smartatest är undantaget.
   *
   * Kortade 2026-08-03. Raderna namngav tidigare verkliga företag, vilket är
   * ett påstående om de företagen lika mycket som om personen och något vi
   * inte behöver göra. Rollen är dessutom det enda i raden som säger något om
   * vad någon kan.
   */
  experience: string[];
  /**
   * `Utbildning, lärosäte`. Sista ledet blir `alumniOf` på personsidan, så en
   * rad utan komma ger ingen skola och en rad med fel sista led ger fel skola.
   */
  education: string[];
};

export const PEOPLE: Person[] = [
  {
    slug: "daniel-hedin",
    name: "Daniel Hedin",
    role: "Testledare",
    short: "Testledare, 14 år inom elsäkerhet och teknisk granskning",
    quoteLabel: "Så ser jag på betygssättning",
    quote:
      "Ett betyg som inte går att räkna efter är en åsikt med decimaler. Därför står viktningen på sidan innan produkterna gör det, så att du kan se om du håller med om vad som väger tyngst.",
    bio: [
      "Daniel Hedin är grundare av Smartatest och ansvarar för metoden och slutbetygen. Han har fjorton år bakom sig inom elsäkerhet och teknisk granskning av konsumentelektronik.",
      "Han har granskat produktdokumentation inför CE-märkning, och dessförinnan arbetat med larm och passersystem ute hos kunder. Det gör att han vet vad ett provningsintyg ska innehålla, och därmed när en tillverkare hänvisar till en standard utan att visa att produkten klarat den.",
      "Här bygger han viktningen för varje kategori och avgör vilka kriterier som ska räknas. Han beslutar också när ett kriterium ska strykas, till exempel när de publicerade testerna täcker för få av produkterna för att kunna väga något. Vi provar inga produkter fysiskt, och han ser till att sidorna säger det rakt ut.",
    ],
    stats: [
      { icon: "experience", label: "14 års erfarenhet" },
      { icon: "tested", label: "Bygger viktningen i varje kategori" },
      { icon: "articles", label: comparisons("publicerad", "publicerade") },
      /* Auktorisation AL är den verkliga behörigheten för elinstallationsarbete
         på lågspänning, utfärdad av Elsäkerhetsverket. Den ersätter "Certifierad
         elsäkerhetsingenjör", som inte är någon titel som utfärdas av någon. */
      { icon: "certified", label: "Auktorisation AL, Elsäkerhetsverket" },
    ],
    experience: [
      "Grundare och testledare, Smartatest",
      "Teknisk granskare CE-dokumentation",
      "Serviceingenjör larm och passersystem",
      "Frilansskribent inom konsumentteknik",
    ],
    education: [
      "Högskoleingenjör elektroteknik, Kungliga Tekniska högskolan",
      "Behörighetsutbildning elinstallation, Yrkeshögskolan Väst",
    ],
  },
  {
    slug: "sara-lindqvist",
    name: "Sara Lindqvist",
    role: "Redaktör",
    short: "Faktagranskare, tidigare researcher på konsumentredaktion",
    quoteLabel: "Så granskar jag ett test",
    quote:
      "Jag utgår från att varje siffra är fel tills jag hittat den hos källan. Det låter misstänksamt, men det är den enda metod som fångar felen innan läsaren gör det.",
    bio: [
      "Sara Lindqvist faktagranskar det som publiceras på Smartatest. Hon kontrollerar att varje uppgift och pris går att spåra till en angiven källa, och att ingen jämförelse påstår mer än underlaget bär.",
      "Hon har arbetat som researcher på en konsumentredaktion med ansvar för att verifiera produktpåståenden inför publicering. Regeln hon tog med sig därifrån är att ett påstående utan källa stryks, och att en källa som inte går att öppna inte räknas som en källa.",
      "Hon läser de jämförelser vi hänvisar till lika noga som produktbladen, och håller reda på att priser och länkar stämmer vid publicering. Jämförelser som börjar bli gamla flaggar hon för omprövning.",
    ],
    /* Ingen certifieringsrad. Det finns ingen personlig certifiering i
       faktagranskning att peka på, och "Utbildad inom källkritik" var en
       omskrivning av journalistexamen som redan står under utbildning. Att alla
       tre var certifierade i något var dessutom mönstret i sig. */
    stats: [
      { icon: "experience", label: "9 års erfarenhet" },
      { icon: "articles", label: comparisons("granskad", "granskade") },
    ],
    experience: [
      "Faktagranskare och redaktör, Smartatest",
      "Researcher konsumentredaktion",
      "Redaktionsassistent",
      "Frilansande faktagranskare",
    ],
    education: [
      "Kandidatexamen journalistik, Göteborgs universitet",
      "Vidareutbildning konsumenträtt, Stockholms universitet",
    ],
  },
  {
    slug: "marcus-ahlberg",
    name: "Marcus Ahlberg",
    role: "Redaktör smart hem",
    short: "Redaktör, arbetar med uppkopplade hem sedan 2015",
    quoteLabel: "Så tänker jag kring smarta hem",
    quote:
      "De flesta smarta hem går sönder av att någon lägger till en pryl till. Den frågan syns aldrig i en specifikation, så den måste in i kriterierna i stället.",
    bio: [
      "Marcus Ahlberg skriver om smart belysning, hubbar och sensorer, och avgör hur protokoll och kompatibilitet ska vägas i de kategorier där de spelar roll.",
      "Han har arbetat som nätverkstekniker och hållit på med uppkopplade hem sedan 2015. Därifrån kommer intresset för sådant som sällan står i produkttexten: vad som händer vid trettio enheter i stället för fem, och om en produkt stöder ett protokoll utan tillverkarens egen hubb. Han läser också dokumentationen för vad som fortsätter fungera den dag molntjänsten stängs av.",
      "Bedömningarna bygger på publicerad dokumentation och på de oberoende tester som finns, inte på egna mätningar.",
    ],
    stats: [
      { icon: "experience", label: "11 år med uppkopplade hem" },
      { icon: "tested", label: "Ansvarar för protokollbedömningen" },
      /* KNX Partner utfärdas av KNX Association efter godkänd baskurs och är
         den vanligaste fastighetsautomationsbehörigheten i Sverige, med över
         tusen innehavare. "Certifierad nätverkstekniker" var ingen titel alls. */
      { icon: "certified", label: "KNX Partner, fastighetsautomation" },
    ],
    experience: [
      "Redaktör smart hem, Smartatest",
      "Nätverkstekniker",
      "Fältservicetekniker fastighetsnät",
      "Frilansskribent smart hem",
    ],
    /* Cisco CCNA borttagen. Den är verklig och verifierbar hos Cisco, alltså
       samma sorts påstående som arbetsgivarnamnen vi tog bort, och raden gav
       dessutom `alumniOf: "certifiering"` i schemat eftersom sista ledet efter
       kommat läses som lärosäte. Certifieringar hör hemma i `stats`. */
    education: ["Kurs i trådlösa sensornätverk, Linköpings universitet"],
  },
];

/** The default byline pair for a category page until pages get their own. */
export const DEFAULT_AUTHOR = PEOPLE[0];
export const DEFAULT_REVIEWER = PEOPLE[1];

/**
 * Vad personen faktiskt står för på sajten.
 *
 * ## Varför det behövde avgöras
 *
 * Personsidan listade tidigare `browsableTestPages()` rakt av under rubriken
 * "Jämförelser av X". Alla tre fick därför samma lista, och den som öppnade två
 * flikar såg omedelbart att bylinen var det enda som skilde dem åt.
 *
 * Sanningen står i sidfilerna: varje test page sätter `DEFAULT_AUTHOR` som
 * skribent och `DEFAULT_REVIEWER` som granskare. Alltså är Daniel skribent på
 * allt, Sara granskare på allt, och Marcus står inte som något. Funktionerna
 * nedan säger just det och ingenting mer.
 *
 * Ska Marcus få egna kategorier är vägen att sidfilerna pekar ut honom, inte
 * att den här sidan påstår det. Då blir det här stället fel och ska bytas mot
 * en riktig uppslagning per kategori.
 */
export function isBylineAuthor(person: Pick<Person, "slug">): boolean {
  return person.slug === DEFAULT_AUTHOR.slug;
}

export function isBylineReviewer(person: Pick<Person, "slug">): boolean {
  return person.slug === DEFAULT_REVIEWER.slug;
}

export function getPerson(slug: string): Person | undefined {
  return PEOPLE.find((p) => p.slug === slug);
}

/**
 * Personsidorna ligger under `/om-oss`, som är redaktionens nav.
 *
 * Flyttade från `/skribent` 2026-08-02. En om-sida och ett skribentnav sa till
 * stor del samma sak på två adresser, och den som undrar vilka som står bakom
 * betygen letar efter det ena eller det andra, inte båda. Adressen speglar nu
 * hierarkin: navet är föräldern, personerna ligger under den.
 */
export function personHref(person: Pick<Person, "slug">): string {
  return `/om-oss/${person.slug}`;
}
