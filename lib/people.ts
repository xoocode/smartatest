/**
 * Editorial staff.
 *
 * ⚠️ EVERY PERSON BELOW IS FICTIONAL TEST DATA. The names, credentials, roles
 * and education are invented so the person components have something realistic
 * to render. Nothing here may go live: fabricated expertise on a site that
 * gives purchase advice is an E-E-A-T and consumer-trust problem, not just a
 * placeholder. Replace with real, verifiable people before launch.
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
 * det stämmer med hur sajten faktiskt arbetar. Varje testsida säger rakt ut att
 * vi inte provar något fysiskt, och `lib/sources.ts` bygger hela
 * källhanteringen på samma erkännande.
 *
 * En läsare som klickar på bylinen hamnade alltså på en sida som motsade den
 * hen kom ifrån, och det är den mest kontrollerbara sortens motsägelse som
 * finns: två sidor, ett klick isär.
 *
 * Bakgrunderna får gärna innehålla provning och mätteknik, för det är just den
 * bakgrunden som gör någon bra på att läsa ett provningsintyg. Men det som
 * beskrivs som arbetet *här* ska vara det arbete som faktiskt utförs:
 * standarder i original, specifikationer lästa hos butiken, publicerade tester
 * ställda mot varandra och en viktning som går att räkna efter.
 */

export type StatIcon = "experience" | "articles" | "tested" | "certified";

export type PersonStat = {
  icon: StatIcon;
  label: string;
};

export type Person = {
  slug: string;
  name: string;
  /** Job title, shown under the name. */
  role: string;
  avatar?: string;
  email?: string;
  linkedin?: string;
  /** One line for compact bylines. */
  short: string;
  /** Eyebrow above the philosophy quote. */
  quoteLabel?: string;
  quote?: string;
  /** Bio paragraphs. */
  bio: string[];
  stats: PersonStat[];
  experience: string[];
  education: string[];
};

export const PEOPLE: Person[] = [
  {
    slug: "daniel-hedin",
    name: "Daniel Hedin",
    role: "Testledare",
    email: "daniel@smartatest.se",
    linkedin: "https://www.linkedin.com/in/example",
    short: "Testledare, 14 år inom elsäkerhet och produktprovning",
    quoteLabel: "Så ser jag på betygssättning",
    quote:
      "Ett betyg som inte går att räkna efter är en åsikt med decimaler. Därför står viktningen på sidan innan produkterna gör det, så att du kan se om du håller med om vad som väger tyngst.",
    bio: [
      "Daniel Hedin är grundare av Smartatest och ansvarar för metoden och för slutbetygen. Han har fjorton års erfarenhet av elsäkerhet, produktprovning och teknisk granskning av konsumentelektronik.",
      "Han har arbetat som provningsingenjör med ansvar för säkerhetsprovning av hushållsprodukter, och därefter som teknisk granskare av produktdokumentation inför CE-märkning. Det är den bakgrunden han har nytta av här, fast åt andra hållet: han vet vad ett provningsintyg ska innehålla, och därför också när en tillverkare hänvisar till en standard utan att visa att produkten klarat den.",
      "På Smartatest bygger han viktningen för varje kategori och avgör vilka kriterier som ska räknas. Det är också han som beslutar när ett kriterium ska strykas, som när de publicerade testerna i en kategori täcker för få av produkterna för att kunna väga något. Vi provar inga produkter fysiskt, och han är den som ser till att sidorna säger det rakt ut i stället för att antyda motsatsen.",
      "Smartatest arbetar redaktionellt oberoende. Affiliatesamarbeten påverkar varken betyg eller placeringar, och varje produkt bedöms utifrån samma viktade kriterier.",
    ],
    stats: [
      { icon: "experience", label: "14 års erfarenhet" },
      /* Medvetet utan siffra. Antalet kategorier ändras varje gång en ny sida
         byggs, och `stats` är statisk text som ingen kommer ihåg att räkna om. */
      { icon: "tested", label: "Bygger viktningen i varje kategori" },
      { icon: "articles", label: "60+ publicerade jämförelser" },
      { icon: "certified", label: "Certifierad elsäkerhetsingenjör" },
    ],
    experience: [
      "Grundare och testledare, Smartatest",
      "Teknisk granskare CE-dokumentation, Nordcert Provning",
      "Provningsingenjör hushållsprodukter, Intertek Semko",
      "Serviceingenjör larm och passersystem, Bravida",
      "Frilansskribent inom konsumentteknik",
    ],
    education: [
      "Högskoleingenjör elektroteknik, Kungliga Tekniska högskolan",
      "Vidareutbildning produktsäkerhet och CE-märkning, RISE",
      "Behörighetsutbildning elinstallation, Yrkeshögskolan Väst",
      "Kurs i mätteknik och osäkerhetsanalys, Chalmers",
    ],
  },
  {
    slug: "sara-lindqvist",
    name: "Sara Lindqvist",
    role: "Redaktör",
    email: "sara@smartatest.se",
    short: "Faktagranskare, tidigare researcher på konsumentredaktion",
    quoteLabel: "Så granskar jag ett test",
    quote:
      "Jag utgår från att varje siffra är fel tills jag hittat den hos källan. Det låter misstänksamt, men det är den enda metod som fångar felen innan läsaren gör det.",
    bio: [
      "Sara Lindqvist faktagranskar allt som publiceras på Smartatest. Hon kontrollerar att varje uppgift, pris och påstående går att spåra till en angiven källa, och att ingen jämförelse påstår mer än underlaget bär.",
      "Hon har tidigare arbetat som researcher på en konsumentredaktion, där ansvaret var att verifiera produktpåståenden inför publicering. Den erfarenheten präglar hennes granskning: ett påstående utan källa stryks, och en källa som inte går att öppna räknas inte som en källa.",
      "Hon läser också de jämförelser vi hänvisar till med samma misstänksamhet som produktbladen. Flera av de svenska sidorna i våra kategorier tjänar pengar på samma butikslänkar som vi utan att skriva det, och den noteringen står i källistan just för att hon satt den där.",
      "På Smartatest ansvarar hon dessutom för att priser och produktlänkar stämmer vid publicering, och för att jämförelser som åldras flaggas för omprövning.",
    ],
    stats: [
      { icon: "experience", label: "9 års erfarenhet" },
      { icon: "articles", label: "300+ granskade artiklar" },
      { icon: "certified", label: "Utbildad inom källkritik" },
    ],
    experience: [
      "Faktagranskare och redaktör, Smartatest",
      "Researcher konsumentredaktion, Mediehuset Nord",
      "Redaktionsassistent, Sveriges Konsumenttidning",
      "Frilansande faktagranskare",
    ],
    education: [
      "Kandidatexamen journalistik, Göteborgs universitet",
      "Kurs i källkritik och verifiering, Fojo Medieinstitut",
      "Vidareutbildning konsumenträtt, Stockholms universitet",
    ],
  },
  {
    slug: "marcus-ahlberg",
    name: "Marcus Ahlberg",
    role: "Redaktör smart hem",
    email: "marcus@smartatest.se",
    short: "Redaktör, arbetar med uppkopplade hem sedan 2015",
    quoteLabel: "Så tänker jag kring smarta hem",
    quote:
      "De flesta smarta hem går sönder av att någon lägger till en pryl till. Den frågan syns aldrig i en specifikation, så den måste in i kriterierna i stället.",
    bio: [
      "Marcus Ahlberg skriver om smart belysning, hubbar och sensorer. Han avgör hur protokoll, ekosystem och kompatibilitet ska vägas i de kategorier där de spelar roll, och läser tillverkarnas dokumentation om vad som fortsätter fungera den dag molntjänsten stängs av.",
      "Han arbetade tidigare som nätverkstekniker och har hållit på med uppkopplade hem sedan 2015. Det är den bakgrunden som gör att han lägger vikt vid sådant som sällan står i produkttexten: vad som händer vid trettio enheter i stället för fem, och skillnaden mellan att en produkt stöder ett protokoll och att den gör det utan tillverkarens egen hubb.",
      "På Smartatest ansvarar han för protokoll- och kompatibilitetsbedömningarna, och för att avgöra när en produkt kräver mer av läsaren än den ger tillbaka. Bedömningarna bygger på publicerad dokumentation och på de oberoende tester som finns, inte på egna mätningar.",
    ],
    stats: [
      { icon: "experience", label: "11 år med uppkopplade hem" },
      { icon: "tested", label: "Ansvarar för protokollbedömningen" },
      { icon: "certified", label: "Certifierad nätverkstekniker" },
    ],
    experience: [
      "Redaktör smart hem, Smartatest",
      "Nätverkstekniker, Telenor Sverige",
      "Fältservicetekniker fastighetsnät, Coor",
      "Frilansskribent smart hem",
    ],
    education: [
      "Yrkeshögskoleexamen nätverksteknik, IT-Högskolan",
      "Cisco CCNA, certifiering",
      "Kurs i trådlösa sensornätverk, Linköpings universitet",
    ],
  },
];

/** The default byline pair for a category page until pages get their own. */
export const DEFAULT_AUTHOR = PEOPLE[0];
export const DEFAULT_REVIEWER = PEOPLE[1];

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
