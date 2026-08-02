import type { MDXComponents } from "mdx/types";

import { ProductRef } from "@/components/product/product-ref";
import { ToolFrame } from "@/components/tools/tool-frame";
import { KelvinScale } from "@/components/tools/kelvin-scale";
import { LumenCalculator } from "@/components/tools/lumen-calculator";
import { ProtocolPicker } from "@/components/tools/protocol-picker";
import { RunningCostCalculator } from "@/components/tools/running-cost-calculator";
import { WattLumenTable } from "@/components/tools/watt-lumen-table";
/* Direkt från komponentfilen och inte via registry: räknaren tar inga props
   och behöver därför ingen serverwrapper, till skillnad från väljarna som ska
   matas med produktdata. */
import { InsurancePaybackCalculator } from "@/components/tools/insurance-payback-calculator";
import {
  ChristmasLightRunningCost,
  CoAlarmNeedPicker,
  CoLevelExplainer,
  CurtainMountPicker,
  HomeFireKitPlanner,
  LadderFitTool,
  OutdoorTimerPicker,
  PlugLoadPicker,
  PlugRunningCostCalculator,
  SwitchInstallationPicker,
  WaterLeakSensorPicker,
} from "@/components/tools/registry";

/**
 * Required at the project root by @next/mdx in the App Router.
 *
 * Element mappings stay empty on purpose: prose styling belongs to the `Prose`
 * component that wraps the MDX, and mapping headings here would create a second
 * typography system.
 *
 * What is registered instead is the small set of components editorial prose is
 * allowed to call. Registering them centrally means a guide never imports
 * anything, and — more importantly — never hardcodes a price, a merchant or a
 * URL: `ProductRef` reads all three from the product data.
 */
const COMPONENTS: MDXComponents = {
  ProductRef,
  ToolFrame,
  LumenCalculator,
  RunningCostCalculator,
  ProtocolPicker,
  KelvinScale,
  WattLumenTable,
  /* Förinställd variant av RunningCostCalculator. Registrerad som egen
     komponent så att köpguiden slipper skicka konfiguration som props. */
  PlugRunningCostCalculator,
  PlugLoadPicker,
  SwitchInstallationPicker,
  CurtainMountPicker,
  OutdoorTimerPicker,
  ChristmasLightRunningCost,
  WaterLeakSensorPicker,
  InsurancePaybackCalculator,
  HomeFireKitPlanner,
  CoAlarmNeedPicker,
  CoLevelExplainer,
  LadderFitTool,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...COMPONENTS, ...components };
}
