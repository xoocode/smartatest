/**
 * WebMCP: att göra ett formulär anropbart för en agent.
 *
 * ## Vad det är
 *
 * Ett utkast från W3C:s Web Machine Learning Working Group, redigerat av Google
 * och Microsoft. Webbläsaren läser attributen nedan på ett `<form>`, syntetiserar
 * ett verktyg med ett JSON-schema ur fältens `name`, `type`, `required` och
 * eventuella `<option>`, och erbjuder det till agenten som talar med den.
 *
 * ## Varför attributnamnen bor här och inte i JSX:en
 *
 * Specen flyttar på sig. Det imperativa API:t låg på `navigator.modelContext`
 * fram till utkastet den 21 juli 2026, ligger nu på `document.modelContext`, och
 * Chrome 150 har deprecierat den gamla platsen medan origin trial fortfarande
 * levererar den. Attributen kan gå samma väg. Ett byte ska kosta en rad här,
 * inte en genomsökning av varje formulär på sajten.
 *
 * Funktionerna returnerar objekt som sprids in i JSX. Det är också vad som gör
 * att TypeScript accepterar dem: React skriver ut okända gemena attribut som de
 * står, men `FormHTMLAttributes` känner inte till dem, och ett spritt objekt
 * slipper den kontroll ett skrivet attribut hade fallit på.
 *
 * ## Utan token händer ingenting
 *
 * Deklarativa API:t kräver en origin trial-token, knuten till exakt en origin.
 * Saknas den är attributen inert markup, alltså ofarliga men verkningslösa. Se
 * `NEXT_PUBLIC_WEBMCP_ORIGIN_TRIAL` i .env för hur man skaffar en.
 *
 * ## Vad som inte ska bli ett verktyg
 *
 * Jämförelserna. En rankad tabell är ett dokument, inte en funktion, och agenten
 * ska läsa den som HTML och strukturerad data. Dessutom lever sajten på att en
 * människa klickar sig vidare till butiken, så ett verktyg som lämnar ut produkt,
 * pris och länk skulle ersätta just det steg vi får betalt för.
 */

/**
 * Origin trial-token, eller `undefined` när ingen är satt.
 *
 * Renderas som `<meta http-equiv="origin-trial">` i `app/layout.tsx`. Samma
 * mönster som `NEXT_PUBLIC_GOOGLE_ADS_ID`: tom variabel betyder att inget alls
 * renderas, i stället för en tom tagg som ser trasig ut i källkoden.
 */
export const WEBMCP_ORIGIN_TRIAL =
  process.env.NEXT_PUBLIC_WEBMCP_ORIGIN_TRIAL || undefined;

export type ToolForm = {
  /** Stabil identifierare. Agenten väljer verktyg på namn och beskrivning. */
  name: string;
  /** Vad verktyget gör, på svenska. Agenten läser den för att avgöra när. */
  description: string;
  /**
   * Låt webbläsaren skicka formuläret så snart agenten fyllt i det.
   *
   * Utan flaggan fyller agenten i fälten och en människa får trycka på knappen.
   * Det är rätt läge för allt som skriver någonstans. Sätt den bara på
   * idempotenta GET-formulär, alltså sådant som går att köra om utan följd.
   */
  autoSubmit?: boolean;
};

/** Attributen som gör ett `<form>` till ett verktyg. Sprids in i elementet. */
export function toolForm(tool: ToolForm) {
  return {
    toolname: tool.name,
    tooldescription: tool.description,
    /* Attributet är booleskt i HTML, alltså räknas närvaron och inte värdet.
       Tom sträng skriver ut `toolautosubmit=""`; `true` hade gett strängen
       "true", vilket fungerar men läser fel i källkoden. */
    ...(tool.autoSubmit ? { toolautosubmit: "" } : {}),
  };
}

/**
 * Beskrivning av ett enskilt fält, alltså en egenskap i verktygets schema.
 *
 * Typen och kravet läser webbläsaren själv ur `type` och `required`. Det här är
 * det som inte går att läsa ur markupen: vad värdet betyder och vad som är ett
 * rimligt innehåll.
 */
export function toolParam(description: string) {
  return { toolparamdescription: description };
}

/* ─── Imperativa API:t ────────────────────────────────────────────────────── */

/**
 * Ett verktyg som räknarna registrerar.
 *
 * `run` är avsiktligt synkron och returnerar en sträng. Räknarna på sajten är
 * rena funktioner över konstanter, alltså finns det inget att vänta på, och en
 * synkron signatur gör att samma funktion kan anropas direkt ur widgeten. Det
 * är hela poängen: widgeten och verktyget räknar på samma kod, annars glider de
 * isär och bara den ena har fel.
 */
export type AgentTool = {
  /** Stabil identifierare. Byt aldrig utan att veta att ingen refererar den. */
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
  };
  run: (args: Record<string, unknown>) => string;
};

type ModelContext = {
  registerTool: (
    tool: {
      name: string;
      description: string;
      inputSchema: AgentTool["inputSchema"];
      execute: (args: Record<string, unknown>) => Promise<{
        content: { type: "text"; text: string }[];
      }>;
    },
    options?: { signal?: AbortSignal },
  ) => Promise<unknown>;
  unregisterTool?: (name: string) => unknown;
};

/**
 * Webbläsarens modellkontext, eller `undefined` där den saknas.
 *
 * Två platser läses. Utkastet den 21 juli 2026 flyttade API:t till
 * `document.modelContext` och Chrome 150 deprecierade `navigator.modelContext`,
 * men origin trial levererar fortfarande den gamla. Att läsa båda är skillnaden
 * mellan att fungera i Chrome 149 och att inte göra det.
 *
 * Ordningen är inte godtycklig: den nya platsen först, så att en webbläsare som
 * har båda under övergången använder den som blir kvar.
 */
export function getModelContext(): ModelContext | undefined {
  if (typeof document === "undefined") return undefined;

  const onDocument = (document as unknown as { modelContext?: ModelContext })
    .modelContext;
  const onNavigator = (navigator as unknown as { modelContext?: ModelContext })
    .modelContext;

  return onDocument ?? onNavigator;
}

/**
 * Registrerar verktyg och returnerar en funktion som tar bort dem igen.
 *
 * Saknas API:t händer ingenting, och det är det normala fallet: ingen
 * webbläsare utanför origin trial har det, och ingen agent anropar det ännu.
 * Funktionen ska därför vara helt tyst, inte varna och inte logga.
 *
 * Avregistreringen görs på två sätt eftersom `signal` är den dokumenterade
 * vägen men inte den enda implementerade. Ett verktyg som ligger kvar efter att
 * dess widget lämnat sidan är värre än ett som aldrig fanns: agenten anropar
 * något som inte längre syns för användaren.
 */
export function registerAgentTools(tools: AgentTool[]): () => void {
  const context = getModelContext();
  if (!context) return () => {};

  const controller = new AbortController();

  for (const tool of tools) {
    void Promise.resolve(
      context.registerTool(
        {
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
          execute: async (args) => ({
            content: [{ type: "text", text: tool.run(args ?? {}) }],
          }),
        },
        { signal: controller.signal },
      ),
      /* Ett verktyg som inte går att registrera får inte fälla sidan. Det
         vanligaste skälet är att en annan flik hunnit registrera samma namn. */
    ).catch(() => {});
  }

  return () => {
    controller.abort();
    for (const tool of tools) {
      try {
        context.unregisterTool?.(tool.name);
      } catch {
        /* Ligger redan borta, eller stöds inte. Båda är oproblematiska. */
      }
    }
  };
}
