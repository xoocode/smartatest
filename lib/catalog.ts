import type { CategoryGroup } from "@/lib/products";

/**
 * The single registry of what categories exist, which group they belong to and
 * which ones have a page yet.
 *
 * Before this file the same list lived in four places: NAV in lib/site.ts, a
 * local const on the homepage, LIVE_CATEGORY_SLUGS in app/sitemap.ts and
 * CATEGORIES in lib/categories.ts. Nav, sitemap, search index, homepage and the
 * group hub all read from here now, so adding a category is one entry.
 *
 * Deliberately free of imports beyond the CategoryGroup type: lib/site.ts reads
 * this, and lib/site.ts is read by nearly everything.
 */

/* `satisfies` rather than `:` so `href` stays a known string here, while the
   CategoryGroup type keeps it optional for groups that have no hub yet. */
export const SMART_HEM = {
  key: "smart-hem",
  label: "Smart hem",
  href: "/smart-hem",
} satisfies CategoryGroup;

/**
 * Säkerhet, öppnad 2026-08-02 med /vattenlarm.
 *
 * Fick sin navsida samma dag som /brandvarnare landade. Skälet var inte främst
 * smulan utan huvudmenyn: den listade varje kategori platt och sköt ut
 * sidhuvudet utanför fönstret så fort kategorierna blev fler än tio. Menyn
 * visar nu grupper, och en grupp utan `href` hoppas över. Se lib/site.ts.
 *
 * Gruppen planeras bära sex sidor enligt .agent/plan-sidkarta-framat.md:
 * vattenlarm, brandvarnare, hemlarm, kodlås, övervakningskamera och
 * dörrklocka med kamera. Fyra av dem låg felaktigt under Smart hem, eftersom
 * den som söker brandvarnare inte tänker på det som en smart hem-produkt.
 */
export const SAKERHET = {
  key: "sakerhet",
  label: "Säkerhet",
  href: "/sakerhet",
} satisfies CategoryGroup;

export const GROUPS: CategoryGroup[] = [SMART_HEM, SAKERHET];

export type CategoryEntry = {
  /** Path, always flat. The group is taxonomy and never a URL segment. */
  href: string;
  label: string;
  group: CategoryGroup;
  blurb: string;
  /**
   * live    — the page exists, so link it and put it in the sitemap
   * planned — listed for orientation, never linked, never sitemapped
   *
   * Linking a planned category feeds Google a 404 and feeds a reader a dead
   * end. Flip this in the same commit as the page, not before.
   */
  status: "live" | "planned";
  /** Products covered. Only set once the page is live and the count is real. */
  count?: number;
};

export const CATEGORY_INDEX: CategoryEntry[] = [
  {
    href: "/smart-belysning",
    label: "Smart belysning",
    group: SMART_HEM,
    blurb: "Färgåtergivning, dimring och vilket protokoll du bör välja.",
    status: "live",
    count: 5,
  },
  {
    href: "/smart-plug",
    label: "Smart plug",
    group: SMART_HEM,
    blurb: "Maxeffekt, energimätning och vad de drar när de inte gör något.",
    status: "planned",
  },
  {
    href: "/smart-strombrytare",
    label: "Smart strömbrytare",
    group: SMART_HEM,
    blurb: "Nolla i dosan, vad du får installera själv och vad som funkar utan.",
    status: "planned",
  },
  {
    /* Slugen var `/smarta-gardiner` fram till 2026-08-01. Keyword Planner:
       `elektrisk rullgardin` 1 600/mån mot `smarta gardiner` 110, alltså
       fjorton gånger. Ändringen var gratis eftersom sidan aldrig gick live och
       därmed aldrig låg i sitemapen. Se .agent/keyword-research-utfall.md. */
    href: "/elektrisk-rullgardin",
    label: "Elektrisk rullgardin",
    group: SMART_HEM,
    blurb: "Rullgardinsmotorer, gardinrobotar och vilken skena de passar.",
    status: "planned",
  },
  {
    /* `utomhustimer` 1 300/mån mot 90 för `smart uttag utomhus`, som planen
       först köade. Termen betyder i svensk SERP mekanisk timer och inte smart
       plugg, och sidan rankar därför båda. Extrem säsong: 6 600 i november mot
       260 i april. Se .agent/research-utomhustimer.md. */
    href: "/utomhustimer",
    label: "Utomhustimer",
    group: SMART_HEM,
    blurb: "Mekanisk, digital eller smart, och vad som klarar svensk vinter.",
    status: "planned",
  },
  {
    href: "/robotdammsugare",
    label: "Robotdammsugare",
    group: SMART_HEM,
    blurb: "Roborock, iRobot, Ecovacs och Dreame mot varandra.",
    status: "planned",
  },
  {
    /* `vattenlarm` 2 400/mån mot `läckagevarnare` 90, alltså tjugosex gånger.
       Sidan rankar bara sensorerna. Vattenfelsbrytare bär 2 900/mån i egen rätt
       och får en egen sida, vilket också håller isär två produkter som skiljer
       en tiopotens i pris. Se .agent/research-vattenlarm.md. */
    href: "/vattenlarm",
    label: "Vattenlarm",
    group: SAKERHET,
    blurb: "Larmar det i mobilen eller bara i ett tomt hus?",
    status: "planned",
  },
  {
    /* `brandvarnare` 9 900/mån mot `smart brandvarnare` 720. Den här sidan
       rankar bara de icke-smarta, alltså fristående och radiosammankopplade
       utan app. De app- och hubbanslutna får /smart-brandvarnare, och
       /optisk-brandvarnare ströks eftersom nästan allt som säljs i Sverige är
       optiskt och sidorna hade blivit dubbletter. Se
       .agent/research-brandvarnare.md. */
    href: "/brandvarnare",
    label: "Brandvarnare",
    group: SAKERHET,
    blurb: "Larmar de tillsammans, eller bara den som står närmast branden?",
    status: "planned",
  },
  {
    /* `brandsläckare` 12 100/mån, alltså mer än brandvarnare, och toppbudet är
       23 kr mot deras 60. Släckmedlen delar inte marknaden: allt som säljs till
       privatpersoner är pulver, så ingen /pulverslackare. Släckspray och
       litiumbrand blir egna sidor. Se .agent/research-brandvarnare.md. */
    href: "/brandslackare",
    label: "Brandsläckare",
    group: SAKERHET,
    blurb: "55A eller 43A? Siffran på etiketten som ingen förklarar.",
    status: "planned",
  },
  {
    /* `brandfilt` 5 400/mån, bud 19,47 kr. Vinkeln är att EN 1869 finns i två
       versioner: 1997 provade bara brand i matolja, 2019 lade till klass B och
       elektrisk utrustning. Årtalet står i butikstexten men i ingen jämförelse.
       Se .agent/research-brandvarnare.md. */
    href: "/brandfilt",
    label: "Brandfilt",
    group: SAKERHET,
    blurb: "Årtalet efter EN 1869 avgör vad filten faktiskt provats mot.",
    status: "planned",
  },
  {
    /* `kolmonoxidvarnare` cirka 1 880/mån och toppbudet 5,56 kr, alltså det
       billigaste i hela brandfamiljen. Vinkeln är att EN 50291 har två delar:
       del 1 gäller bostäder, del 2 gäller husvagn, husbil och båt med krav på
       vibration och temperaturväxling. Dessutom skiljer utgåvorna: 2018 gjorde
       livslängdsindikering obligatorisk, och 2010 drogs tillbaka 2021.
       Gasolvarnare är en annan sensor och blir egen sida, se
       .agent/research-kolmonoxidvarnare.md. */
    href: "/kolmonoxidvarnare",
    label: "Kolmonoxidvarnare",
    group: SAKERHET,
    blurb: "Del 1 eller del 2 av EN 50291? Den som ska till husvagnen behöver del 2.",
    status: "planned",
  },
  {
    /* `brandstege` 1 300/mån plus räddningsstege 170 och utrymningsstege 170.
       Termen täcker två marknader: hängande fönsterstegar för 699 till 1 294
       kronor och fasta fasadstegar för 1 327 till 9 199. Den här sidan rankar
       bara de hängande, de fasta får /utrymningsstege. Vinkeln är att kilotalet
       inte går att jämföra: samma sorts stege anges till 150, 200, 400 och 450
       kilo, ingen butik anger provmetod, och den standard två tillverkare pekar
       på gäller lutande och stående teleskopstegar. Se
       .agent/research-brandstege.md. */
    href: "/brandstege",
    label: "Brandstege",
    group: SAKERHET,
    blurb: "150 eller 450 kilo? Talet på kartongen är uppmätt av den som sålt den.",
    status: "planned",
  },
  {
    /* Fasta fasadstegar. Egen sida efter användarbeslut 2026-08-02: en hängande
       stege för 699 kronor och en Skeppshultstege för 9 199 löser inte samma
       problem, och bara den fasta räknas som utrymningsväg i BBR när fönstrets
       underkant sitter mer än fem meter över marken. */
    href: "/utrymningsstege",
    label: "Utrymningsstege",
    group: SAKERHET,
    blurb: "Fast monterad på fasaden, och det enda byggreglerna räknar över fem meter.",
    status: "planned",
  },
  {
    href: "/smart-brandvarnare",
    label: "Smart brandvarnare",
    group: SAKERHET,
    blurb: "Google la ner Nest Protect. Vad finns kvar som faktiskt går att köpa?",
    status: "planned",
  },
  {
    href: "/overvakningskamera",
    label: "Övervakningskamera",
    group: SAKERHET,
    blurb: "Bildkvalitet, molnavgifter och hur mycket som stannar lokalt.",
    status: "planned",
  },
  {
    /* `kodlås ytterdörr` 5 400/mån mot `smarta lås` 260, alltså tjugo gånger.
       Svenskar söker inte "smart lås", de söker kodlås. Slugen ändrad innan
       sidan byggdes. Se .agent/keyword-research-utfall.md. */
    href: "/kodlas-ytterdorr",
    label: "Kodlås till ytterdörr",
    group: SAKERHET,
    blurb: "Yale, Nuki och August, och vad som händer när batteriet tar slut.",
    status: "planned",
  },
];

export function liveCategories(): CategoryEntry[] {
  return CATEGORY_INDEX.filter((c) => c.status === "live");
}

export function categoriesInGroup(group: CategoryGroup): CategoryEntry[] {
  return CATEGORY_INDEX.filter((c) => c.group.key === group.key);
}

export function findGroup(key: string): CategoryGroup | undefined {
  return GROUPS.find((g) => g.key === key);
}
