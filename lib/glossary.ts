/**
 * Ordlista.
 *
 * ## Varför en enda sida och inte en sida per ord
 *
 * Frestelsen är att ge varje term en egen adress för långsvansen. Det ger
 * trettio sidor med tre meningar var, alltså precis den tunna
 * programmatiska sidmassa Google straffar. Termerna ligger därför på en sida
 * med ett ankare var. Ett ankare är citerbart, rankar som passage och kan
 * länkas till lika precist som en egen sida.
 *
 * ## Definitionen först
 *
 * `definition` ska vara ett fristående svar på "vad betyder X" utan att kräva
 * meningen före. Det är formen både utvalda utdrag och språkmodeller citerar.
 * `matters` är motivet, som får förutsätta definitionen.
 *
 * Håll definitionen till en eller två meningar. Blir den längre hör resten
 * hemma i `matters`.
 */

export type GlossaryGroup = "ljus" | "protokoll" | "sakerhet" | "el";

export const GLOSSARY_GROUPS: { key: GlossaryGroup; label: string }[] = [
  { key: "ljus", label: "Ljus och lampor" },
  { key: "protokoll", label: "Protokoll och uppkoppling" },
  { key: "sakerhet", label: "Brand och säkerhet" },
  { key: "el", label: "El och installation" },
];

export type GlossaryTerm = {
  /** Ankare i adressen. Ändras aldrig, det bryter inkommande länkar. */
  slug: string;
  term: string;
  /** Andra skrivningar läsaren kan söka på. Matchas av sökrutan. */
  aliases?: string[];
  group: GlossaryGroup;
  /** Ett till två meningar, fristående. */
  definition: string;
  /** Varför det spelar roll vid ett köp. */
  matters?: string;
  /** Kategori eller verktyg som fördjupar. Bara publicerade sidor. */
  href?: string;
  /**
   * Wikidata-identitet, som `Q27575`. Blir `sameAs` på termens `DefinedTerm`.
   *
   * ## Varför
   *
   * En ordlista säger vad *vi* menar med ett ord. `sameAs` säger att det vi
   * menar är samma sak som en entitet resten av världen redan känner till. För
   * ett språkmodellsvar är det skillnaden mellan att gissa vilken "Thread" som
   * avses och att veta det: Wikidata har fyra Thread, och tre av dem handlar om
   * garn, skruvgängor och ett tv-spel.
   *
   * ## Utelämnas hellre än gissas
   *
   * Varje Q-nummer nedan är uppslaget mot Wikidatas API och kontrollerat mot
   * entitetens beskrivning, inte härlett ur ordet. `EN 3` kontrollerades
   * dessutom mot artikeln, eftersom Wikidatas beskrivning bara sa "European
   * standard" och inte vilken.
   *
   * Termer utan träff får ingen `sameAs`. Ett fel Q-nummer pekar bestämt på fel
   * sak, vilket är sämre än att inte peka alls.
   */
  wikidata?: string;
};

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: "cri",
    term: "CRI (Ra)",
    /* color rendering index */
    wikidata: "Q27575",
    aliases: ["färgåtergivning", "ra-index", "color rendering index"],
    group: "ljus",
    definition:
      "CRI är ett mått på hur naturligt färger återges i ett ljus, på en skala där 100 motsvarar dagsljus. Ra är den svenska benämningen på samma sak.",
    matters:
      "Under 80 blir hud grådaskig och trä livlöst. Skillnaden mellan en lampa på 80 och en på 95 syns direkt i ett kök eller en garderob, och den syns inte alls i en förpackningstext som bara nämner watt.",
    href: "/smart-belysning",
  },
  {
    slug: "lumen",
    term: "Lumen",
    /* SI unit of luminous flux */
    wikidata: "Q484092",
    aliases: ["lm", "ljusflöde"],
    group: "ljus",
    definition:
      "Lumen mäter hur mycket ljus en lampa avger totalt. Det är ljusstyrkan, till skillnad från watt som mäter hur mycket ström den drar.",
    matters:
      "En gammal 60-wattslampa gav runt 800 lumen. Eftersom LED drar en bråkdel av strömmen säger watt ingenting längre om hur ljust det blir, vilket är varför lumen är talet att jämföra.",
    href: "/guider/lumenraknare",
  },
  {
    slug: "kelvin",
    term: "Kelvin (K)",
    /* SI unit of thermodynamic temperature */
    wikidata: "Q11579",
    aliases: ["färgtemperatur", "varmvitt", "kallvitt"],
    group: "ljus",
    definition:
      "Kelvin anger ljusets färgton. Låga tal är varmt och gulaktigt, höga tal är kallt och blåaktigt.",
    matters:
      "2 700 K motsvarar ungefär en glödlampa och passar vardagsrum och sovrum. 4 000 K och uppåt är arbetsljus. Samma lampa kan kännas trivsam eller klinisk beroende på vilket tal du valt.",
    href: "/guider/fargtemperatur",
  },
  {
    slug: "zigbee",
    term: "Zigbee",
    /* IEEE 802.15.4-based specification */
    wikidata: "Q199324",
    aliases: ["zigbee 3.0"],
    group: "protokoll",
    definition:
      "Zigbee är ett trådlöst protokoll för smarta hem där enheterna bildar ett nät och vidarebefordrar varandras signaler. Det kräver en hubb för att nå ditt vanliga nätverk.",
    matters:
      "Nätet blir stabilare ju fler fast anslutna enheter du har, eftersom varje sådan förlänger räckvidden. Nackdelen är hubben: går den sönder tystnar allt som hänger på den.",
  },
  {
    slug: "thread",
    term: "Thread",
    /* network protocol */
    wikidata: "Q18394272",
    group: "protokoll",
    definition:
      "Thread är ett trådlöst nätverksprotokoll som liknar Zigbee men bygger på internetadressering, så enheterna kan nås direkt utan att en hubb översätter åt dem.",
    matters:
      "Kräver fortfarande en gränsenhet, en så kallad border router, som ofta sitter inbyggd i en högtalare eller tv-box du redan har. Det är skillnaden mot Zigbee i praktiken: färre separata dosor.",
  },
  {
    slug: "matter",
    term: "Matter",
    /* protocol for smart home products */
    wikidata: "Q79106566",
    group: "protokoll",
    definition:
      "Matter är en gemensam standard som låter produkter från olika tillverkare styras från samma app, oavsett om de kommunicerar över Thread, Wi-Fi eller ethernet.",
    matters:
      "Matter är inte ett eget radioprotokoll utan ett språk ovanpå de befintliga. En Matter-märkt produkt garanterar alltså att den går att styra från fler system, inte att den är trådlös på ett nytt sätt.",
  },
  {
    slug: "hubb",
    term: "Hubb",
    /* control center for a smart home */
    wikidata: "Q107894145",
    aliases: ["gateway", "bridge", "brygga"],
    group: "protokoll",
    definition:
      "En hubb är den dosa som översätter mellan enheternas eget radioprotokoll och ditt vanliga nätverk.",
    matters:
      "Den avgör två saker som sällan står i produktbladet: om systemet fungerar när internet ligger nere, och vad som händer den dag tillverkaren stänger sin molntjänst.",
  },
  {
    slug: "sammankoppling",
    term: "Sammankoppling",
    aliases: ["sammankopplade brandvarnare", "trådlöst sammankopplad"],
    group: "sakerhet",
    definition:
      "Sammankopplade brandvarnare larmar alla samtidigt så snart en av dem känner rök, i stället för att bara den som känner röken tjuter.",
    matters:
      "En brand börjar sällan där du sover. Ligger sovrummet två våningar från källaren hör du inte en fristående varnare med stängd dörr emellan. Det kräver varken wifi, app eller konto.",
  },
  {
    slug: "en-14604",
    term: "EN 14604",
    aliases: ["brandvarnarstandard", "ce brandvarnare"],
    group: "sakerhet",
    definition:
      "EN 14604 är den europeiska standard en brandvarnare måste uppfylla för att få säljas, och den kräver bland annat att larmet ligger på minst 85 decibel.",
    matters:
      "Eftersom alla lagligt sålda varnare klarar kravet säger ljudnivån i praktiken sällan något om skillnaden mellan två modeller. Det som skiljer dem är sammankoppling och batteri.",
  },
  {
    slug: "en-3",
    term: "EN 3",
    /* European standard, portable fire extinguishers */
    wikidata: "Q5323764",
    aliases: ["effektklass", "brandsläckarklass", "13a"],
    group: "sakerhet",
    definition:
      "EN 3 är standarden som klassar handbrandsläckares släckeffekt, angiven som exempelvis 13A eller 21A där högre tal betyder större eldsvåda.",
    matters:
      "Effektklassen är det enda måttet som faktiskt jämför två släckare. Vikten säger bara hur mycket pulver som ryms, inte hur mycket eld det räcker till.",
  },
  {
    slug: "ip-klass",
    term: "IP-klass",
    /* IP code, protection against intrusion */
    wikidata: "Q284700",
    aliases: ["ip44", "ip65", "kapslingsklass"],
    group: "sakerhet",
    definition:
      "IP-klassen anger hur väl en produkt tål damm och vatten. Första siffran gäller damm, andra vatten, och högre tal betyder tätare.",
    matters:
      "IP44 klarar regnstänk och räcker under ett skärmtak. Ska något stå fritt ute året om vill du ha IP65 eller mer, annars är det fukten och inte kylan som tar produkten.",
  },
  {
    slug: "nolledare",
    term: "Nolledare",
    /* neutral conductor in mains wiring */
    wikidata: "Q31835967",
    aliases: ["neutralledare", "nolla"],
    group: "el",
    definition:
      "Nolledaren är den ledare som sluter kretsen tillbaka från lampan. I många äldre svenska strömbrytardosor är den inte framdragen.",
    matters:
      "De flesta smarta strömbrytare behöver den för att kunna driva sin egen elektronik när lampan är släckt. Saknas den i dosan är valet begränsat till de modeller som klarar sig utan, eller till ett relä bakom lampan.",
  },
  {
    slug: "viloforbrukning",
    term: "Viloförbrukning",
    /* standby power */
    wikidata: "Q1366402",
    aliases: ["standby", "tomgångsförbrukning"],
    group: "el",
    definition:
      "Viloförbrukningen är den ström en uppkopplad produkt drar dygnet runt bara för att vara uppkopplad, även när det den styr är avstängt.",
    matters:
      "Den skiljer flera gånger om mellan produkter i samma kategori och står nästan aldrig i produktbladet. På ett uttag som sitter i året om är det den, och inte inköpspriset, som avgör vad prylen kostar.",
    href: "/guider/elkostnad-uttag",
  },
];

export function termsInGroup(group: GlossaryGroup): GlossaryTerm[] {
  return GLOSSARY.filter((t) => t.group === group);
}
