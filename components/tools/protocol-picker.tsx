"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type Answers = {
  /** Roughly how many smart devices are planned. */
  scale: "few" | "many" | null;
  /** Does the home already have a Thread border router? */
  thread: "yes" | "no" | "unsure" | null;
  /** Walls between the router and the far end of the home. */
  walls: "light" | "concrete" | null;
  /** Willingness to buy a hub. */
  hub: "yes" | "no" | null;
};

const EMPTY: Answers = { scale: null, thread: null, walls: null, hub: null };

const QUESTIONS = [
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

type Verdict = { protocol: string; why: string; caveat?: string };

/**
 * The recommendation is a small, readable set of rules rather than a score.
 * Scale decides almost everything: below ten devices Wi-Fi is genuinely fine
 * and simplest, above ten a mesh stops being optional.
 */
function decide(a: Answers): Verdict | null {
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

export type ProtocolPickerProps = { className?: string };

export function ProtocolPicker({ className }: ProtocolPickerProps) {
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const verdict = decide(answers);
  const answered = Object.values(answers).filter(Boolean).length;

  return (
    <div
      data-slot="protocol-picker"
      className={cn("flex flex-col gap-row", className)}
    >
      {QUESTIONS.map((q) => (
        <fieldset key={q.key}>
          {/* `legend` does not take part in the parent's flex flow reliably, so
              the gap between question and options is a margin on the legend
              rather than a gap on the fieldset. */}
          <legend className="mb-2.5 text-sm font-medium">{q.question}</legend>
          <div className="flex flex-wrap gap-2">
            {q.options.map((o) => {
              const active = answers[q.key] === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.key]: o.value }))
                  }
                  className={cn(
                    "themed-border rounded-full px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="rounded-md bg-muted pad-card">
        {verdict ? (
          <>
            <p className="text-sm text-muted-foreground">Vi rekommenderar</p>
            <p className="font-heading text-h3 text-brand">
              {verdict.protocol}
            </p>
            <p className="mt-2 text-sm">{verdict.why}</p>
            {verdict.caveat ? (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Att veta: </span>
                {verdict.caveat}
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => setAnswers(EMPTY)}
              className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Börja om
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Svara på alla fyra frågorna för att få en rekommendation.{" "}
            {answered > 0 ? `${answered} av ${QUESTIONS.length} klara.` : null}
          </p>
        )}
      </div>
    </div>
  );
}
