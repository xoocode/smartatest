/**
 * Vilken radiatortermostat passar min ventil?
 *
 * ## Varför verktyget finns
 *
 * `/smart-termostat` väger passformen till 25 av 100, och skälet är att det är
 * den enda uppgiften som kan göra hela köpet meningslöst. Termostaten skruvas
 * på den ventil som redan sitter där, och passar den inte hjälper varken pris
 * eller protokoll.
 *
 * Fyndet på sidan är att adaptertabellerna finns men aldrig ligger där man
 * köper: tado och Netatmo publicerar fullständiga listor i sina hjälpcenter
 * medan butikstexten säger "en mängd olika tillverkare". Det fyndet är dött om
 * läsaren inte kan använda det. Här blir det användbart: hen har skruvat loss
 * sitt vred, läst vad som står på ventilkroppen, och vill veta vilka
 * tillverkare som säger att de passar.
 *
 * ## ⚠️ Tre svar, aldrig två
 *
 * Verktyget skiljer på **anger att den passar**, **anger att den inte gör
 * det** och **säger ingenting**. Den tredje kategorin är den viktigaste och
 * den som gör verktyget ärligt: SONOFF anger gängan M30x1,5 och lovar sedan
 * adaptrar för "de flesta" utan att namnge en enda, och Fibaro ersätter hela
 * listan med påståendet att den passar 98 procent av alla element. Att sortera
 * någon av dem som ett ja vore att gissa åt tillverkaren.
 *
 * Tystnad betyder alltså inte nej. Den betyder att du inte kan veta i förväg,
 * vilket är precis det köparen förlorar på.
 *
 * ## Var uppgifterna kommer ifrån
 *
 * Varje rad i `PRODUKTER` är läst hos tillverkaren 2026-08-04 och står med sin
 * källa i `.agent/research/smart-termostat.md` §6 och §7d. Ingenting är hämtat
 * ur en butiksrubrik, och ingenting är lånat mellan systermodeller: att Aqara
 * E1 räknar upp fyra fattningar säger ingenting om W600, som räknar upp sju.
 *
 * ⚠️ Lägg aldrig till en fattning i en lista utan att tillverkaren namnger
 * den. Hela poängen med verktyget är skillnaden mellan de som skriver ut och
 * de som låter bli.
 */

/** Fattningar en läsare kan hitta på sin ventilkropp. */
export const FATTNINGAR = [
  {
    key: "m30",
    label: "M30 × 1,5",
    hjalp: "Vanligast på moderna ventiler. Gängad hylsa, 30 mm i diameter.",
  },
  {
    key: "ra",
    label: "Danfoss RA",
    hjalp: "Nordisk klassiker. Klickas fast i stället för att skruvas, 23 mm.",
  },
  {
    key: "rav",
    label: "Danfoss RAV",
    hjalp: "Äldre Danfoss, 34 mm, med en liten stift i mitten.",
  },
  {
    key: "ravl",
    label: "Danfoss RAVL",
    hjalp: "Äldre Danfoss, 26 mm, utan stift.",
  },
  {
    key: "m28",
    label: "M28 × 1,5",
    hjalp: "Comap, Herz, Terrier, Siemens och Olymp använder den.",
  },
  {
    key: "m30x1",
    label: "M30 × 1,0",
    hjalp: "Oventrop. Ser ut som M30 men har tätare gänga.",
  },
  {
    key: "giacomini",
    label: "Giacomini",
    hjalp: "Italiensk fattning, förekommer i nyare installationer.",
  },
  {
    key: "caleffi",
    label: "Caleffi",
    hjalp: "Italiensk fattning, ovanligare i svenska hem.",
  },
  {
    key: "vaillant",
    label: "Vaillant 30,5 mm",
    hjalp: "Ingen av tillverkarna vi jämför levererar adapter för den.",
  },
  {
    key: "vetinte",
    label: "Vet inte",
    hjalp: "Du får veta hur du tar reda på det.",
  },
] as const;

export type FattningKey = (typeof FATTNINGAR)[number]["key"];

/** Vad läsaren ser när vredet är avskruvat. */
export const VENTILTYPER = [
  {
    key: "termostat",
    label: "Termostatventil",
    hjalp: "Vredet har siffror eller streck du kan vrida mellan.",
  },
  {
    key: "manuell",
    label: "Manuell kran",
    hjalp: "Bara av och på, inga siffror.",
  },
  {
    key: "enror",
    label: "Enrörssystem",
    hjalp: "Ett rör går vidare från element till element i en slinga.",
  },
  {
    key: "vetinte",
    label: "Vet inte",
    hjalp: "Vanligast. Du får veta vad du ska titta efter.",
  },
] as const;

export type VentiltypKey = (typeof VENTILTYPER)[number]["key"];

type Produkt = {
  id: string;
  namn: string;
  /** Fattningar tillverkaren namnger och levererar adapter för. */
  ingar: FattningKey[];
  /** Fattningar tillverkaren namnger men säljer separat. */
  tillval?: FattningKey[];
  /** Fattningar tillverkaren uttryckligen anger att de inte levererar. */
  levererasEj?: FattningKey[];
  /** Var uppgiften står, för svaret. */
  kalla: string;
};

/**
 * ⚠️ `ingar` är tillverkarens namngivna lista och ingenting annat.
 *
 * SONOFF och Fibaro har med flit korta listor: SONOFF namnger bara gängan och
 * Fibaro namnger ingenting. Det är inte en lucka i datan utan datan.
 */
export const PRODUKTER: Produkt[] = [
  {
    id: "aqara-radiator-thermostat-w600",
    namn: "Aqara Radiator Thermostat W600",
    ingar: ["m30", "ra", "rav", "ravl", "giacomini", "m28", "caleffi"],
    kalla: "Aqaras produktsida namnger sex adaptrar utöver den egna fattningen",
  },
  {
    id: "aqara-radiator-thermostat-e1",
    namn: "Aqara Radiator Thermostat E1",
    ingar: ["m30", "ra", "rav", "ravl"],
    kalla: "Aqaras produktsida, som också namnger vad som inte fungerar",
  },
  {
    id: "eve-thermo-comfort-set",
    namn: "Eve Thermo Comfort Set",
    ingar: ["m30", "ra", "rav", "ravl"],
    kalla: "Eves förpackningsinnehåll: Adapter Set (Danfoss RA, RAV, RAVL)",
  },
  {
    id: "sonoff-trvzb",
    namn: "SONOFF TRVZB",
    ingar: ["m30"],
    kalla: 'SONOFF namnger bara M30x1,5 och lovar adaptrar för "de flesta"',
  },
  {
    id: "danfoss-eco-bluetooth",
    namn: "Danfoss Eco",
    ingar: ["ra", "m30"],
    kalla: "Danfoss egen artikelbeteckning 014G1001: adaptertyp RA och M30",
  },
  {
    id: "danfoss-ally-014g2460",
    namn: "Danfoss Ally (014G2460)",
    ingar: ["rav", "ra", "ravl", "m30"],
    kalla: "Danfoss egen butik: adaptertyp RAV, RA, RAVL och M30",
  },
  {
    id: "netatmo-smart-radiator-thermostat",
    namn: "Netatmo Smart Radiator Thermostat",
    ingar: ["m30", "m28", "m30x1", "giacomini", "ra", "ravl"],
    tillval: ["caleffi", "rav"],
    kalla: "Netatmos hjälpcenter, som skiljer på vad som ingår och vad som säljs separat",
  },
  {
    id: "schneider-wiser-cctfr6100z3",
    namn: "Schneider Wiser",
    ingar: ["ra", "rav", "ravl", "m30"],
    kalla: "Schneiders svenska produktsida",
  },
  {
    id: "tado-smart-radiator-thermostat-x",
    namn: "tado Smart Radiator Thermostat X",
    ingar: ["m30", "ra", "rav", "ravl", "m28", "caleffi", "giacomini"],
    levererasEj: ["vaillant", "m30x1"],
    kalla: "tados hjälpcenter, uppdaterat 2025-10-07",
  },
  {
    id: "danfoss-ally-ra-014g2420",
    namn: "Danfoss Ally RA (014G2420)",
    ingar: ["ra", "m30"],
    kalla: "Danfoss egen butik: adaptertyp RA och M30",
  },
  {
    id: "fibaro-radiator-thermostat",
    namn: "Fibaro Radiator Thermostat",
    ingar: [],
    kalla: 'Fibaro namnger ingen fattning alls, bara "98 % av alla element"',
  },
];

export type Traff = { id: string; namn: string; kalla: string; tillval?: boolean };

export type Passning = {
  rubrik: string;
  text: string;
  /** Tillverkaren namnger fattningen. */
  passar: Traff[];
  /** Tillverkaren namnger fattningen men säljer adaptern separat. */
  tillval: Traff[];
  /** Tillverkaren anger uttryckligen att adaptern inte levereras. */
  passarInte: Traff[];
  /** Tillverkaren säger ingenting om just den här fattningen. */
  tyst: Traff[];
  /** Sätts när ventiltypen i sig är hindret, oavsett fattning. */
  stopp?: string;
  /** Sätts när läsaren inte vet, och behöver ta reda på något först. */
  nastaSteg?: string;
};

const som = (p: Produkt, tillval?: boolean): Traff => ({
  id: p.id,
  namn: p.namn,
  kalla: p.kalla,
  ...(tillval ? { tillval: true } : {}),
});

export function bedomPassning(
  ventiltyp: VentiltypKey | null,
  fattning: FattningKey | null,
): Passning | null {
  if (!ventiltyp) return null;

  /* Ventiltypen avgör före fattningen. En manuell kran har ingen fattning som
     spelar roll, och då ska verktyget säga det i stället för att lista elva
     produkter som ändå inte fungerar. */
  if (ventiltyp === "manuell") {
    return {
      rubrik: "Ingen av dem fungerar på en manuell kran",
      text: "En radiatortermostat reglerar värmen genom att trycka på ventilens stift, och det förutsätter en termostatventil. Aqara är den tillverkare som skriver ut det, med orden att manuella ventiler inte stöds, och tado anger att produkten bara är kompatibel med termostatiska radiatorventiler. Övriga säger ingenting om saken, vilket inte betyder att de fungerar.",
      passar: [],
      tillval: [],
      passarInte: [],
      tyst: [],
      stopp:
        "Vägen framåt är att byta själva ventilen till en termostatventil, vilket är ett VVS-jobb och inte något du skruvar dit själv. Gör det innan du köper en termostat.",
    };
  }

  if (ventiltyp === "enror") {
    return {
      rubrik: "Enrörssystem: bara en tillverkare svarar, och svaret är nej",
      text: "I ett enrörssystem går vattnet i en slinga från element till element i stället för att matas till vart och ett för sig. Struper du ett element påverkar du flödet till dem som ligger efter i slingan. Aqara är den enda tillverkaren i vår jämförelse som tar upp frågan, och de anger att enrörssystem inte stöds. De övriga tio publicerar ingen ståndpunkt alls.",
      passar: [],
      tillval: [],
      passarInte: [],
      tyst: [],
      stopp:
        "Vi rekommenderar ingen av dem här. Att tio tillverkare tiger är inte ett ja, och den som bor i ett flerbostadshus från 1960- eller 70-talet bör fråga fastighetsägaren hur systemet är byggt innan något beställs.",
    };
  }

  if (ventiltyp === "vetinte") {
    return {
      rubrik: "Titta på vredet innan du går vidare",
      text: "Det du behöver veta syns utan verktyg. Har vredet siffror eller streck du kan vrida mellan är det en termostatventil, och då fungerar den här jämförelsen. Går det bara att öppna och stänga är det en manuell kran, och då fungerar ingen av produkterna.",
      passar: [],
      tillval: [],
      passarInte: [],
      tyst: [],
      nastaSteg:
        "Skruva sedan loss vredet för hand eller med en tång och läs vad som står på ventilkroppen under. Det läcker inte vatten när du gör det. Kommer du tillbaka med den uppgiften kan verktyget svara.",
    };
  }

  /* Termostatventil, men fattningen är inte vald än. */
  if (!fattning) return null;

  if (fattning === "vetinte") {
    return {
      rubrik: "Så tar du reda på fattningen",
      text: "Skruva loss det befintliga vredet för hand eller med en tång. Det läcker inte vatten. Under sitter ventilkroppen, och där står oftast tillverkarens namn. Är den gängad och 30 mm i diameter är det nästan alltid M30 × 1,5. Klickas vredet fast i stället för att skruvas är det sannolikt en Danfoss RA.",
      passar: [],
      tillval: [],
      passarInte: [],
      tyst: [],
      nastaSteg:
        "Netatmo är den enda tillverkaren som publicerar en mätanvisning: mät diametern med ett skjutmått eller en linjal, och mät gängans avstånd genom att räkna tre gängtoppar. Är avståndet 3 mm över tre toppar är stigningen 1,5 mm.",
    };
  }

  const passar: Traff[] = [];
  const tillval: Traff[] = [];
  const passarInte: Traff[] = [];
  const tyst: Traff[] = [];

  for (const p of PRODUKTER) {
    if (p.ingar.includes(fattning)) passar.push(som(p));
    else if (p.tillval?.includes(fattning)) tillval.push(som(p, true));
    else if (p.levererasEj?.includes(fattning)) passarInte.push(som(p));
    else tyst.push(som(p));
  }

  const namn = FATTNINGAR.find((f) => f.key === fattning)?.label ?? fattning;
  const antal = passar.length + tillval.length;

  let rubrik: string;
  let text: string;

  if (antal === 0) {
    rubrik = `Ingen tillverkare anger att de passar ${namn}`;
    text = `Ingen av de elva termostaterna vi jämför namnger ${namn} i sitt eget underlag. ${
      passarInte.length
        ? `${passarInte.length === 1 ? "En tillverkare anger" : `${passarInte.length} tillverkare anger`} uttryckligen att adaptern inte levereras, vilket är mer besked än de övriga ger.`
        : ""
    } Det betyder inte att ingen fungerar, men det betyder att ingen av dem lovar det, och att du köper på hoppet i stället för på en uppgift.`;
  } else if (antal >= 8) {
    rubrik = `${antal} av elva anger att de passar ${namn}`;
    text = `${namn} är en av de fattningar som täcks brett, så passformen behöver inte styra ditt val här. Väg i stället in vad som krävs utöver termostaten, om ett abonnemang tillkommer och vad tre rum landar på.`;
  } else {
    rubrik = `${antal} av elva anger att de passar ${namn}`;
    text = `Listan nedan bygger på vad tillverkaren själv publicerar, inte på butikens rubrik. De ${tyst.length} som står under Säger ingenting kan mycket väl fungera ändå: flera av dem levererar adaptrar de aldrig räknar upp. Skillnaden är att du inte kan kontrollera det före köpet.`;
  }

  return { rubrik, text, passar, tillval, passarInte, tyst };
}
