import type { MDXComponents } from "mdx/types";

import { ProductRef } from "@/components/product/product-ref";
import { ServiceRef } from "@/components/service/service-ref";
import { ToolFrame } from "@/components/tools/tool-frame";
import { ToolWidget } from "@/components/tools/registry";

/**
 * Required at the project root by @next/mdx in the App Router.
 *
 * Element mappings stay empty on purpose: prose styling belongs to the `Prose`
 * component that wraps the MDX, and mapping headings here would create a second
 * typography system.
 *
 * What is registered instead is the small set of components editorial prose is
 * allowed to call. Registering them centrally means a guide never imports
 * anything, and, more importantly, never hardcodes a price, a merchant or a
 * URL: `ProductRef` reads all three from the product data.
 */

/**
 * Vilket verktyg varje namn i prosan syftar på.
 *
 * ## Varför kartan finns
 *
 * Namnen i köpguiderna är redaktionella och sluggarna är adresser, så de kan
 * inte vara samma sträng. `CoLevelExplainer` läser bättre i en MDX-fil än
 * `co-halt-larmgrans`, och sluggen ska samtidigt vara den som står i URL:en.
 *
 * ## Varför de går genom ToolWidget
 *
 * Fram till 2026-08-03 pekade den här filen rakt på komponenterna. Följden var
 * att agentverktygen bara registrerades på `/verktyg/{slug}`, eftersom
 * registreringen hänger på `ToolWidget` och köpguiderna aldrig gick genom den.
 * En agent som läste `/brandvarnare` såg alltså räknaren i sidan men kunde inte
 * anropa den.
 *
 * Nu finns en väg in till varje widget. Widget och verktyg kan därmed inte
 * skiljas åt av misstag, vilket är hela skälet att registreringen sitter på
 * monteringspunkten och inte i komponenterna.
 */
const TOOL_SLUGS: Record<string, string> = {
  LumenCalculator: "lumenraknare",
  RunningCostCalculator: "elkostnad-lampor",
  ProtocolPicker: "protokollvaljare-smart-hem",
  KelvinScale: "fargtemperatur",
  WattLumenTable: "watt-till-lumen",
  /* Förinställda varianter av RunningCostCalculator. Egna namn så att
     köpguiden slipper skicka konfiguration som props. */
  PlugRunningCostCalculator: "elkostnad-uttag",
  ChristmasLightRunningCost: "elkostnad-julbelysning",
  PlugLoadPicker: "effektkoll-smart-plug",
  SwitchInstallationPicker: "installationsguide-strombrytare",
  CurtainMountPicker: "monteringsvaljare-gardin",
  OutdoorTimerPicker: "timervaljare-utomhus",
  WaterLeakSensorPicker: "vattenlarmsvaljare",
  InsurancePaybackCalculator: "aterbetalning-vattenfelsbrytare",
  HomeFireKitPlanner: "brandskydd-hemma",
  CoAlarmNeedPicker: "behover-du-kolmonoxidvarnare",
  CoLevelExplainer: "co-halt-larmgrans",
  LadderFitTool: "vilken-brandstege-passar",
  EscapeLadderHeightTool: "godkand-utrymningshojd",
  CameraPrivacyTool: "vad-far-kameran-filma",
  DoorbellHomeTool: "dorrklocka-lagenhet-eller-villa",
  IndoorPrivacyTool: "kamera-nar-nagon-arbetar-hemma",
  LockApprovalTool: "godkant-las-till-ytterdorr",
  AlarmExitTool: "vad-kostar-det-att-lamna-hemlarmet",
  FiveYearAlarmCostTool: "femarskostnad-larm",
  AirAppliancePicker: "vilken-luftapparat",
  RobotThresholdPicker: "klarar-roboten-troskeln",
  Fuktavlasning: "vad-betyder-talet-pa-hygrometern",
  Ventilpassning: "vilken-termostat-passar-min-ventil",
};

/* Byggs en gång på modulnivå. En komponent som skapas under rendering läses av
   React som en ny typ vid varje omrendering och monterar om hela delträdet. */
const TOOL_COMPONENTS: MDXComponents = Object.fromEntries(
  Object.entries(TOOL_SLUGS).map(([name, slug]) => [
    name,
    function MdxTool() {
      return <ToolWidget slug={slug} />;
    },
  ]),
);

const COMPONENTS: MDXComponents = {
  ProductRef,
  ServiceRef,
  ToolFrame,
  ...TOOL_COMPONENTS,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...COMPONENTS, ...components };
}
