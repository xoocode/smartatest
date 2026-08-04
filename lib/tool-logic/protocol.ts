/**
 * Val av protokoll för smart hem: wifi, Zigbee eller Matter över Thread.
 *
 * Rekommendationen är en liten läsbar uppsättning regler och inte en poäng.
 * Antalet enheter avgör nästan allt: under tio är wifi genuint dugligt och
 * enklast, över tio slutar ett mesh-nät vara valfritt.
 */

export type ProtocolAnswers = {
  /** Ungefär hur många smarta enheter som planeras. */
  scale: "few" | "many" | null;
  /** Finns redan en Thread border router i hemmet? */
  thread: "yes" | "no" | "unsure" | null;
  /** Väggarna mellan routern och husets bortre ände. */
  walls: "light" | "concrete" | null;
  /** Villighet att köpa en hubb. */
  hub: "yes" | "no" | null;
};

export const EMPTY_PROTOCOL_ANSWERS: ProtocolAnswers = {
  scale: null,
  thread: null,
  walls: null,
  hub: null,
};

export const PROTOCOL_QUESTIONS = [
  {
    key: "scale" as const,
    question: "Hur många smarta enheter räknar du med?",
    options: [
      { value: "few" as const, label: "Under tio" },
      { value: "many" as const, label: "Tio eller fler" },
    ],
  },
  {
    key: "thread" as const,
    question:
      "Har du en HomePod, Apple TV 4K, nyare Nest Hub, Echo eller Dirigera hemma?",
    options: [
      { value: "yes" as const, label: "Ja" },
      { value: "no" as const, label: "Nej" },
      { value: "unsure" as const, label: "Vet inte" },
    ],
  },
  {
    key: "walls" as const,
    question: "Vad är väggarna gjorda av?",
    options: [
      { value: "light" as const, label: "Gips eller trä" },
      { value: "concrete" as const, label: "Betong eller tegel" },
    ],
  },
  {
    key: "hub" as const,
    question: "Är du beredd att köpa en brygga eller hubb?",
    options: [
      { value: "yes" as const, label: "Ja" },
      { value: "no" as const, label: "Helst inte" },
    ],
  },
];

export type ProtocolVerdict = {
  protocol: string;
  why: string;
  caveat?: string;
};

/** Returnerar `null` tills alla fyra frågorna är besvarade. */
export function decideProtocol(a: ProtocolAnswers): ProtocolVerdict | null {
  if (!a.scale || !a.thread || !a.walls || !a.hub) return null;

  const meshNeeded = a.scale === "many" || a.walls === "concrete";

  if (!meshNeeded && a.hub === "no") {
    return {
      protocol: "Wi-Fi",
      why: "Med få enheter, lätta väggar och ingen lust att köpa en brygga är Wi-Fi det enklaste valet. Skruva i, öppna appen, klart.",
      caveat:
        "Varje lampa tar en plats på nätverket. Passerar du tio enheter börjar en vanlig router klaga, och då blir det här valet det du ångrar.",
    };
  }

  if (a.thread === "yes" && a.hub === "no") {
    return {
      protocol: "Matter över Thread",
      why: "Du har redan en border router hemma, så Thread-enheter ansluter direkt utan att du köper något extra. De bildar dessutom eget nät och belastar inte wifi.",
      caveat:
        "Utbudet är mindre än för Zigbee, och du är beroende av att border routern står på.",
    };
  }

  if (a.hub === "yes") {
    return {
      protocol: "Zigbee",
      why: `Zigbee bygger ett eget nät mellan enheterna, vilket är det som håller ${
        a.walls === "concrete" ? "genom betongväggar" : "när enheterna blir många"
      }. Utbudet är störst av alla protokoll och bryggan gör dem tillgängliga i valfritt ekosystem via Matter.`,
      caveat: "Kräver en brygga, som kostar runt en tusenlapp.",
    };
  }

  return {
    protocol: "Thread, annars Zigbee med brygga",
    why: "Du behöver ett mesh-nät men vill helst slippa köpa en hubb. Thread löser det om du skaffar en border router, och många köper ändå en högtalare eller strömmingsbox som fungerar som en.",
    caveat:
      "Vill du inte köpa någonting alls är Wi-Fi enda vägen, men räkna med problem när enheterna blir fler.",
  };
}
