/**
 * Vilket uppfällbart plånboksfodral som räcker, utifrån hur du laddar, vad som
 * ska få plats och hur länge det ska hålla.
 *
 * Kraven lämnas som `needsMagnetRing`, `needsWireless`, `minCards`,
 * `needsCoinPocket` och `needsRealLeather`. Produkturvalet görs i widgeten,
 * precis som i leak-sensor.ts och case-type.ts.
 *
 * ## Varför just de tre frågorna
 *
 * De motsvarar tre egenskaper som skiljer fodralen åt och som ingen av dem bär
 * i produktnamnet:
 *
 * 1. **Laddningen.** Sju av tolv fodral blockerar trådlös laddning helt, och
 *    uppgiften följer inte priset. Det finns dessutom tre nivåer och inte två:
 *    blockerar, laddar på en platta, eller laddar med magnetring som drar
 *    laddaren till rätt läge.
 * 2. **Kapaciteten.** Två till tio kortfack, alltså fem gånger, och myntfacket
 *    finns bara i tre av tolv. Det är myntfacket som avgör om plånboken kan
 *    lämnas hemma.
 * 3. **Materialet.** Konstläder spricker i vecket där fodralet viks flera
 *    gånger om dagen. Garvat läder gör det inte.
 *
 * ## ⚠️ Verktyget frågar aldrig om RFID
 *
 * Uppgiften är ett ja utan tal: ingen tillverkare anger dämpning, frekvens
 * eller standard, och både det billigaste och det dyraste fodralet anger den.
 * Att låta en läsare filtrera på den hade sett ut som ett urval men inte varit
 * ett. Se lib/spec-schema.mjs, ALDRIG_BEDOMD.
 *
 * ## ⚠️ Tomma svar är meningen med verktyget
 *
 * Till skillnad från skaltypsväljaren på /iphone-skal går flera kombinationer
 * här inte att uppfylla, och det är sidans centrala avvägning: **inget fodral
 * kombinerar en hel plånbok med trådlös laddning.** De som laddar tar tre kort,
 * de som tar nio eller tio blockerar laddningen. Widgeten ska säga det rakt ut
 * i stället för att be om ursäkt, se `emptyReason`.
 */

export const FOLIO_CHARGING = [
  { key: "magnet", label: "Trådlöst med magnetladdare" },
  { key: "platta", label: "Trådlöst på en platta" },
  { key: "sladd", label: "Med sladd" },
] as const;

export const FOLIO_CAPACITY = [
  { key: "kort", label: "Ett par kort" },
  { key: "kort-mynt", label: "Ett par kort och mynt" },
  { key: "planbok", label: "Hela plånboken" },
  { key: "planbok-mynt", label: "Plånboken och mynt" },
] as const;

export const FOLIO_LIFESPAN = [
  { key: "lange", label: "Så länge som möjligt" },
  { key: "nagra-ar", label: "Ett par år räcker" },
] as const;

export type FolioChargingKey = (typeof FOLIO_CHARGING)[number]["key"];
export type FolioCapacityKey = (typeof FOLIO_CAPACITY)[number]["key"];
export type FolioLifespanKey = (typeof FOLIO_LIFESPAN)[number]["key"];

export type FolioVerdict = {
  headline: string;
  why: string;
  warning?: string;
  /** Magnetring krävs, alltså inte bara att laddningen fungerar. */
  needsMagnetRing: boolean;
  /** Laddning genom fodralet krävs, oavsett magnet. */
  needsWireless: boolean;
  /** Minsta antal kortfack. */
  minCards: number;
  needsCoinPocket: boolean;
  /** Garvat läder krävs, inte läderimitation. */
  needsRealLeather: boolean;
};

export function decideFolio(
  charging: FolioChargingKey | null,
  capacity: FolioCapacityKey | null,
  lifespan: FolioLifespanKey | null,
): FolioVerdict | null {
  if (!charging || !capacity || !lifespan) return null;

  const needsMagnetRing = charging === "magnet";
  const needsWireless = charging !== "sladd";
  const minCards = capacity === "planbok" || capacity === "planbok-mynt" ? 9 : 3;
  const needsCoinPocket = capacity === "kort-mynt" || capacity === "planbok-mynt";
  const needsRealLeather = lifespan === "lange";

  const chargeNote = needsMagnetRing
    ? "Med en magnetladdare räcker det inte att laddningen fungerar genom fodralet. Utan magnetring måste laddaren läggas rätt för hand varje gång, och en MagSafe-laddare fäster inte alls."
    : needsWireless
      ? "Laddning genom fodralet är det som skiljer kategorin mest, och sju av tolv fodral klarar det inte. Då ska telefonen ur fodralet varje kväll, vilket är ett fumligt moment med korten i."
      : "Laddar du med sladd kan du bortse från hela laddningsfrågan, och då öppnar sig de fodral som bär flest kort. De blockerar nästan alla den trådlösa laddningen, vilket inte spelar dig någon roll.";

  const capacityNote =
    minCards >= 9
      ? " Ska hela plånboken med behöver du nio fack eller fler, och då blir fodralet tjockt. Räkna med att det passar i en väska snarare än i en jeansficka."
      : " Tre fack räcker för bankkort, resekort och legitimation, vilket är vad de flesta faktiskt bär.";

  const coinNote = needsCoinPocket
    ? " Myntfacket är det som avgör om plånboken kan lämnas hemma helt, och det finns bara i tre av tolv fodral."
    : "";

  const leatherNote = needsRealLeather
    ? " Garvat läder mjuknar och mörknar, medan läderimitation spricker i vecket där fodralet viks."
    : "";

  const headline = needsRealLeather
    ? "Ett fodral i garvat läder"
    : minCards >= 9
      ? "Ett fodral med hela plånboken i"
      : needsMagnetRing
        ? "Ett fodral med magnetring"
        : "Ett fodral som räcker till vardags";

  return {
    needsMagnetRing,
    needsWireless,
    minCards,
    needsCoinPocket,
    needsRealLeather,
    headline,
    why: `${chargeNote}${capacityNote}${coinNote}${leatherNote}`,
    warning: needsRealLeather
      ? "Räkna på hur länge du behåller telefoner. Ett fodral passar en modellstorlek, så läder som ska åldras i fem år hjälper dig inte om telefonen byts om två."
      : undefined,
  };
}

/** Det väljaren behöver veta om ett fodral för att kunna filtrera. */
export type FolioLike = {
  charging: "magnet" | "platta" | "ingen";
  cards: number;
  coinPocket: boolean;
  realLeather: boolean;
};

/**
 * Uppfyller fodralet kraven?
 *
 * Ligger här och inte i widgeten eftersom både träfflistan och
 * alternativberäkningen nedan behöver exakt samma predikat. Två kopior av det
 * hade gjort att listan och alternativen kunde säga emot varandra.
 */
export function folioMatches(verdict: FolioVerdict, item: FolioLike): boolean {
  /* Magnetring är inte en starkare variant av trådlös laddning utan en annan
     sak: utan ring måste laddaren läggas rätt för hand, och en MagSafe-laddare
     fäster inte alls. */
  if (verdict.needsMagnetRing && item.charging !== "magnet") return false;
  if (verdict.needsWireless && item.charging === "ingen") return false;
  if (item.cards < verdict.minCards) return false;
  if (verdict.needsCoinPocket && !item.coinPocket) return false;
  if (verdict.needsRealLeather && !item.realLeather) return false;
  return true;
}

/**
 * Vad du får om du släpper ett av kraven.
 *
 * ## Varför den här funktionen finns
 *
 * Uppmätt över alla 24 kombinationer gav 15 av dem noll träffar. Att det inte
 * går att få både en hel plånbok och trådlös laddning är sidans fynd och ska
 * stå kvar, men ett verktyg som svarar nej i två fall av tre är obrukbart
 * oavsett hur sant nejet är. Läsaren står kvar utan att veta vad hon ska göra.
 *
 * Lösningen är att alltid visa vägen vidare: släpper man **ett** krav, vilket
 * blir resultatet? Då blir det tomma svaret ett vägval i stället för en
 * återvändsgränd, och avvägningen syns tydligare än förut eftersom läsaren
 * ser exakt vad varje krav kostar.
 *
 * Ordningen är medveten. Laddningen först, eftersom den är kategorins verkliga
 * skiljelinje och det krav som oftast krockar. Materialet sist, eftersom det är
 * det minst funktionella av de tre.
 */
export function folioRelaxations(
  verdict: FolioVerdict,
): { label: string; verdict: FolioVerdict }[] {
  const out: { label: string; verdict: FolioVerdict }[] = [];

  if (verdict.needsWireless) {
    out.push({
      label: verdict.needsMagnetRing
        ? "Nöjer du dig med en laddare du lägger rätt för hand"
        : "Laddar du med sladd i stället",
      verdict: verdict.needsMagnetRing
        ? { ...verdict, needsMagnetRing: false }
        : { ...verdict, needsWireless: false },
    });
  }

  if (verdict.minCards > 3 || verdict.needsCoinPocket) {
    out.push({
      label:
        verdict.minCards > 3 && verdict.needsCoinPocket
          ? "Klarar du dig med färre kort och utan myntfack"
          : verdict.minCards > 3
            ? "Klarar du dig med tre kort"
            : "Klarar du dig utan myntfack",
      verdict: { ...verdict, minCards: 3, needsCoinPocket: false },
    });
  }

  if (verdict.needsRealLeather) {
    out.push({
      label: "Accepterar du läderimitation",
      verdict: { ...verdict, needsRealLeather: false },
    });
  }

  return out;
}

/**
 * Varför ett urval blev tomt, uttryckt som avvägningen och inte som ett fel.
 *
 * Ligger här och inte i widgeten eftersom agentverktyget behöver samma svar:
 * frågan "finns det ett fodral med nio kort som laddar trådlöst" ska besvaras
 * likadant oavsett var den ställs.
 */
export function folioEmptyReason(verdict: FolioVerdict): string {
  if (verdict.needsWireless && verdict.minCards >= 9) {
    return "Inget fodral i jämförelsen kombinerar en hel plånbok med trådlös laddning. De som laddar tar tre kort, och de som tar nio eller tio blockerar laddningen helt. Det är kategorins verkliga avvägning, och du måste välja vilket som betyder mest.";
  }
  if (verdict.needsWireless && verdict.needsCoinPocket) {
    return "Inget fodral med myntfack laddar trådlöst. Myntfacket finns i tre fodral och alla tre kräver att telefonen tas ur för att laddas.";
  }
  if (verdict.needsRealLeather && verdict.minCards >= 9) {
    return "Alla fodral med nio kortfack eller fler är i läderimitation. Garvat läder finns bara i fodral som tar två till tre kort, eftersom fler fack kräver ett tunnare och mjukare material.";
  }
  if (verdict.needsRealLeather && verdict.needsCoinPocket) {
    return "Inget av läderfodralen har myntfack. De tre fodral som har det är alla i läderimitation.";
  }
  if (verdict.needsMagnetRing) {
    return "Bara två fodral i jämförelsen har magnetring, och de täcker inte den kombination du valt. Väljer du en platt Qi-laddare i stället öppnar sig fler.";
  }
  return "Kombinationen du valt täcks inte av något av de fodral vi rankat.";
}
