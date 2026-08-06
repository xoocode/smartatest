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
 * Läsaren har skruvat loss sitt vred, läst vad som står på ventilkroppen, och
 * vill veta vilka termostater som går att montera på just den fattningen.
 *
 * ## ⚠️ Tre svar, aldrig två
 *
 * Verktyget skiljer på **adaptern ingår**, **adaptern säljs separat**,
 * **adaptern levereras inte** och **fattningen finns inte i tillverkarens
 * underlag**. Den sista kategorin är inte ett nej: den betyder att vi inte kan
 * lova passform, och att läsaren i så fall köper på hoppet.
 *
 * ## Var uppgifterna kommer ifrån
 *
 * Varje rad i `PRODUKTER` är läst hos tillverkaren och står med sin källa i
 * `.agent/research/smart-termostat.md` §6, §7d och §13. Ingenting är hämtat ur
 * en butiksrubrik, och ingenting är lånat mellan systermodeller: att Aqara E1
 * bär fyra fattningar säger ingenting om W600, som bär sju.
 *
 * ⚠️ Lägg aldrig till en fattning utan att tillverkaren namnger den.
 *
 * ## Rättat 2026-08-06, och felet var vårt
 *
 * SONOFF låg på en enda fattning och Fibaro på noll, med motiveringen att de
 * inte publicerar någon lista. Båda gjorde det, på dokument vi inte öppnat:
 * SONOFF i en kompatibilitetsguide över 41 ventilmärken på sin egen domän, och
 * Fibaro på första sidan av bruksanvisningen. Danfoss Eco låg på två
 * fattningar mot fyra i Danfoss eget produktregister. Följden var att en läsare
 * med RAV- eller RAVL-ventil fick tre träffar där svaret var fem, och en läsare
 * med Vaillant fick noll där Netatmo faktiskt säljer adaptern.
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
    hjalp: "Bara Netatmo säljer en adapter för den, och den ingår inte.",
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

/** ⚠️ `ingar` är fattningar tillverkaren namnger och levererar adapter för. */
export const PRODUKTER: Produkt[] = [
  {
    id: "aqara-radiator-thermostat-w600",
    namn: "Aqara Radiator Thermostat W600",
    ingar: ["m30", "ra", "rav", "ravl", "giacomini", "m28", "caleffi"],
    kalla: "Sex adaptrar i lådan enligt Aqaras förpackningsinnehåll, plus den egna M30-fattningen",
  },
  {
    id: "aqara-radiator-thermostat-e1",
    namn: "Aqara Radiator Thermostat E1",
    ingar: ["m30", "ra", "rav", "ravl"],
    kalla: "Adaptrar i lådan enligt Aqara. Manuella ventiler, RTL och enrörssystem fungerar inte",
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
    ingar: ["m30", "ra", "rav", "ravl", "m28", "caleffi", "giacomini"],
    kalla:
      "SONOFFs kompatibilitetsguide, 41 ventilmärken med adapter angiven per märke. Guiden kallar sig själv vägledande",
  },
  {
    id: "danfoss-eco-bluetooth",
    namn: "Danfoss Eco",
    ingar: ["m30", "ra", "rav", "ravl"],
    kalla: "Danfoss produktregister, artikel 014G1115: adaptertyp M30, RA, RAV, RAVL",
  },
  {
    id: "danfoss-ally-014g2460",
    namn: "Danfoss Ally (014G2460)",
    ingar: ["rav", "ra", "ravl", "m30"],
    kalla: "Danfoss produktregister, artikel 014G2460: adaptertyp M30, RA, RAV, RAVL",
  },
  {
    id: "netatmo-smart-radiator-thermostat",
    namn: "Netatmo Smart Radiator Thermostat",
    ingar: ["m30", "m28", "m30x1", "giacomini", "ra", "ravl"],
    tillval: ["rav", "vaillant"],
    kalla: "Netatmos egen utbildningsbok: sex adaptrar per ventil ingår, fyra säljs i tiopack",
  },
  {
    id: "schneider-wiser-cctfr6100z3",
    namn: "Schneider Wiser",
    ingar: ["ra", "rav", "ravl", "m30"],
    kalla: "Schneiders svenska produktsida: Danfoss RA, RAV, RAVL och M30x1,5",
  },
  {
    id: "tado-smart-radiator-thermostat-x",
    namn: "tado Smart Radiator Thermostat X",
    ingar: ["m30", "ra", "rav", "ravl", "m28", "caleffi", "giacomini"],
    levererasEj: ["vaillant", "m30x1"],
    kalla: "tados hjälpcenter, uppdaterat 2025-10-07: sex adaptrar ingår, fyra gör det inte",
  },
  {
    id: "danfoss-ally-ra-014g2420",
    namn: "Danfoss Ally RA (014G2420)",
    ingar: ["ra", "m30"],
    kalla: "Danfoss produktregister, artikel 014G2420: adaptertyp M30 och RA",
  },
  {
    id: "fibaro-radiator-thermostat",
    namn: "Fibaro Radiator Thermostat",
    ingar: ["m30", "ra"],
    kalla: "Fibaros bruksanvisning: M30x1,5, Danfoss RTD-N och Danfoss RA-N, och inga fler",
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
      text: "En radiatortermostat reglerar värmen genom att trycka på ventilens stift, och det förutsätter en termostatventil. En manuell kran har inget stift att trycka på. Aqara E1 och tado X är de två som anger det rakt ut, och de övriga nio bygger på samma mekanik.",
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
      rubrik: "Enrörssystem: den enda som svarar säger nej",
      text: "I ett enrörssystem går vattnet i en slinga från element till element i stället för att matas till vart och ett för sig. Struper du ett element påverkar du flödet till dem som ligger efter i slingan, och regleringen blir opålitlig för hela slingan. Aqara E1 fungerar inte i ett sådant system, och de tio övriga bygger på samma sätt att strypa flödet.",
      passar: [],
      tillval: [],
      passarInte: [],
      tyst: [],
      stopp:
        "Vi rekommenderar ingen av dem här. Bor du i ett flerbostadshus från 1960- eller 70-talet, fråga fastighetsägaren hur systemet är byggt innan du beställer något.",
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
        "Mät diametern med ett skjutmått eller en linjal, och mät gängan genom att räkna tre gängtoppar: är avståndet 3 mm över tre toppar är stigningen 1,5 mm. Anvisningen kommer från Netatmo och gäller vilken ventil som helst.",
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
    rubrik = `Ingen av de elva monteras på ${namn}`;
    text = `${namn} täcks inte av någon adapter i vår jämförelse. ${
      passarInte.length
        ? `${passarInte.length === 1 ? "En termostat" : `${passarInte.length} termostater`} anger uttryckligen att adaptern inte levereras.`
        : ""
    } En VVS-butik säljer lösa adaptrar i metall, och den vägen är billigare än att byta ventil.`;
  } else if (antal >= 8) {
    rubrik = `${antal} av elva passar på ${namn}`;
    text = `${namn} är en av de fattningar som täcks brett, så passformen behöver inte styra ditt val här. Väg i stället in vad som krävs utöver termostaten, om ett abonnemang tillkommer och vad tre rum landar på.`;
  } else {
    rubrik = `${antal} av elva passar på ${namn}`;
    text = `Listan nedan bygger på tillverkarens eget underlag om vad adaptern täcker, inte på butikens rubrik. De ${tyst.length} som saknas kan fungera ändå med en lös adapter från en VVS-butik, men då köper du på hoppet i stället för på en uppgift.`;
  }

  return { rubrik, text, passar, tillval, passarInte, tyst };
}
