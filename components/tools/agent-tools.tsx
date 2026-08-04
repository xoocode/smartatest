"use client";

import { useEffect } from "react";

import { agentToolsFor } from "@/lib/agent-tools";
import { registerAgentTools } from "@/lib/webmcp";

/**
 * Registrerar verktygssidans agentverktyg medan widgeten är monterad.
 *
 * ## Varför registreringen sitter på widgeten
 *
 * WebMCP:s modell är sidbunden: agenten ser de verktyg den aktuella sidan
 * erbjuder. Genom att hänga registreringen på `ToolWidget` följer verktygen
 * räknaren dit den renderas, alltså både till `/guider/{slug}` och in i den
 * köpguide som bäddar in den. En agent som läser en kategorisida får därmed
 * exakt de räknare sidan visar, varken fler eller färre.
 *
 * Alternativet, att registrera allt i layouten, hade gjort samtliga räknare
 * anropbara på varje sida. Det låter generöst och är sämre: agenten hade fått
 * en verktygslåda utan samband med vad användaren tittar på.
 *
 * ## Vad som händer utan stöd
 *
 * Ingenting, tyst. `registerAgentTools` returnerar en tom uppstädning när
 * webbläsaren saknar API:t, vilket är det normala fallet: utan origin
 * trial-token har ingen webbläsare det, och ingen agent anropar det ännu.
 *
 * Komponenten renderar inget märke. Den finns för sin effekt.
 */
export function AgentTools({ slug }: { slug: string }) {
  useEffect(() => {
    const tools = agentToolsFor(slug);
    if (!tools.length) return;

    /* Uppstädningen körs vid avmontering och innan effekten körs om, alltså
       kan samma verktygsnamn aldrig ligga registrerat två gånger. */
    return registerAgentTools(tools);
  }, [slug]);

  return null;
}
