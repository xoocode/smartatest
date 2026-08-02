import type { ComponentType } from "react";

import {
  SMART_PLUG,
  SMART_STROMBRYTARE,
  ELEKTRISK_RULLGARDIN,
  UTOMHUSTIMER,
  VATTENLARM,
  BRANDVARNARE,
  BRANDSLACKARE,
  BRANDFILT,
  KOLMONOXIDVARNARE,
  BRANDSTEGE,
} from "@/lib/categories";
import { formatPrice } from "@/lib/products";
import {
  SMART_PLUG_CAPABILITIES,
  SMART_PLUG_PRODUCTS,
} from "@/lib/data/smart-plug";
import {
  SMART_STROMBRYTARE_CAPABILITIES,
  SMART_STROMBRYTARE_PRODUCTS,
} from "@/lib/data/smart-strombrytare";
import {
  ELEKTRISK_RULLGARDIN_CAPABILITIES,
  ELEKTRISK_RULLGARDIN_PRODUCTS,
} from "@/lib/data/elektrisk-rullgardin";
import {
  UTOMHUSTIMER_CAPABILITIES,
  UTOMHUSTIMER_PRODUCTS,
} from "@/lib/data/utomhustimer";
import {
  VATTENLARM_CAPABILITIES,
  VATTENLARM_PRODUCTS,
} from "@/lib/data/vattenlarm";
import { KOLMONOXIDVARNARE_PRODUCTS } from "@/lib/data/kolmonoxidvarnare";
import {
  CoNeedPicker,
  type CoPickerProduct,
} from "@/components/tools/co-need-picker";
import { CoLevelScale } from "@/components/tools/co-level-scale";
import { BRANDSTEGE_PRODUCTS } from "@/lib/data/brandstege";
import {
  LadderFitPicker,
  type LadderFitProduct,
} from "@/components/tools/ladder-fit-picker";
import { BRANDVARNARE_PRODUCTS } from "@/lib/data/brandvarnare";
import { BRANDSLACKARE_PRODUCTS } from "@/lib/data/brandslackare";
import { BRANDFILT_PRODUCTS } from "@/lib/data/brandfilt";
import {
  FireKitPlanner,
  type FireKitItems,
  type KitItem,
} from "@/components/tools/fire-kit-planner";
import {
  LeakSensorPicker,
  type LeakSensorProduct,
} from "@/components/tools/leak-sensor-picker";
import { InsurancePaybackCalculator } from "@/components/tools/insurance-payback-calculator";
import { MountPicker, type CurtainProduct } from "@/components/tools/mount-picker";
import { TimerPicker, type TimerProduct } from "@/components/tools/timer-picker";
import { KelvinScale } from "@/components/tools/kelvin-scale";
import {
  InstallationPicker,
  type SwitchProduct,
} from "@/components/tools/installation-picker";
import { LoadPicker, type PickerProduct } from "@/components/tools/load-picker";
import { LumenCalculator } from "@/components/tools/lumen-calculator";
import { ProtocolPicker } from "@/components/tools/protocol-picker";
import { RunningCostCalculator } from "@/components/tools/running-cost-calculator";
import { WattLumenTable } from "@/components/tools/watt-lumen-table";

/**
 * Samma räknare som för lampor, med smart plug-förutsättningar.
 *
 * Definierad här och exporterad, så att både verktygssidan och köpguidens MDX
 * använder exakt samma förinställningar. Alternativet vore att skicka props
 * från MDX, men då hamnar konfiguration i prosan och de två ställena kan
 * glida isär.
 *
 * Viloförbrukningen är redigerbar just här: för lampor är 0,3 W en konstant vi
 * står för, för smarta uttag är spridningen fem gånger och är hela poängen.
 * 1,48 W är TP-Links egen uppgift för Tapo P100, alltså det sämsta värdet vi
 * hittat, så läsaren börjar i det värsta fallet och kan justera nedåt.
 */
/**
 * Effektkollen med de testade uttagen inlagda, så att verktyget kan säga inte
 * bara vilken märkning man ska leta efter utan vilka av produkterna på sidan
 * som faktiskt har den.
 *
 * Urvalet plockas ihop här på servern och skickas in som vanlig data. LoadPicker
 * förblir därmed kategorioberoende, och klientbunten får fem fält per produkt i
 * stället för hela produktmodellen med bilder och betyg.
 */
function plugPickerProducts(): PickerProduct[] {
  return SMART_PLUG_CAPABILITIES.flatMap((cap) => {
    const product = SMART_PLUG_PRODUCTS.find((p) => p.id === cap.id);
    if (!product) return [];
    return [
      {
        id: product.id,
        brand: product.brand,
        name: product.shortName ?? product.name,
        price: formatPrice(product.price, product.currency),
        href: `/${SMART_PLUG.slug}#${product.id}`,
        amp: cap.amp,
        outdoor: cap.outdoor,
      },
    ];
  });
}

export function PlugLoadPicker() {
  return <LoadPicker products={plugPickerProducts()} />;
}

export function PlugRunningCostCalculator() {
  return (
    <RunningCostCalculator
      defaultCount={6}
      defaultHours={3}
      defaultWatt={1000}
      maxWatt={3680}
      defaultStandby={1.48}
      editableStandby
      labels={{
        count: "Antal smarta uttag",
        hours: "Timmar apparaten är på per dygn",
        watt: "Apparatens effekt (W)",
        standby: "Uttagets viloförbrukning (W)",
        on: "När apparaten är på",
      }}
      standbyNote="Viloförbrukningen är förifylld med 1,48 W, vilket är TP-Links egen uppgift för Tapo P100 och det högsta värdet vi hittat. Plejd anger 0,3 W för SPR-01. Flera tillverkare anger ingen siffra alls, och då är 1 W en rimlig gissning."
    />
  );
}

/**
 * Installationsguiden med de testade produkterna inlagda, så att verktyget kan
 * säga inte bara vilken typ man ska leta efter utan vilka av produkterna på
 * sidan som faktiskt går att installera i just den situationen.
 *
 * Samma serversidesmönster som plugPickerProducts ovan: urvalet plockas ihop
 * här och skickas in som vanlig data, så att InstallationPicker förblir
 * kategorioberoende och klientbunten slipper hela produktmodellen.
 */
function switchPickerProducts(): SwitchProduct[] {
  return SMART_STROMBRYTARE_CAPABILITIES.flatMap((cap) => {
    const product = SMART_STROMBRYTARE_PRODUCTS.find((p) => p.id === cap.id);
    if (!product) return [];
    return [
      {
        id: product.id,
        brand: product.brand,
        name: product.shortName ?? product.name,
        price: formatPrice(product.price, product.currency),
        href: `/${SMART_STROMBRYTARE.slug}#${product.id}`,
        kind: cap.kind,
        needsNeutral: cap.needsNeutral,
      },
    ];
  });
}

export function SwitchInstallationPicker() {
  return <InstallationPicker products={switchPickerProducts()} />;
}

/**
 * Monteringsväljaren med de rankade gardinmotorerna inlagda.
 *
 * Samma serversidesmönster som ovan. `mounts` kopieras med spread eftersom
 * capability-arrayen är modulnivådata som delas mellan anrop, och verktyget
 * inte ska kunna få en referens den skulle kunna sortera i.
 */
function curtainPickerProducts(): CurtainProduct[] {
  return ELEKTRISK_RULLGARDIN_CAPABILITIES.flatMap((cap) => {
    const product = ELEKTRISK_RULLGARDIN_PRODUCTS.find((p) => p.id === cap.id);
    if (!product) return [];
    return [
      {
        id: product.id,
        brand: product.brand,
        name: product.shortName ?? product.name,
        price: formatPrice(product.price, product.currency),
        href: `/${ELEKTRISK_RULLGARDIN.slug}#${product.id}`,
        window: cap.window,
        mounts: [...cap.mounts],
        quietDb: cap.quietDb,
      },
    ];
  });
}

export function CurtainMountPicker() {
  return <MountPicker products={curtainPickerProducts()} />;
}

/**
 * Timerväljaren med de rankade utomhustimrarna inlagda.
 *
 * Samma serversidesmönster som ovan. Här är kopplingen mellan capability och
 * produkt särskilt viktig: verktyget filtrerar på `watt`, och den siffran är
 * hela poängen med tabellen. En produkt som ligger fel i UTOMHUSTIMER_CAPABILITIES
 * rekommenderas till en motorvärmare den inte klarar.
 */
function timerPickerProducts(): TimerProduct[] {
  return UTOMHUSTIMER_CAPABILITIES.flatMap((cap) => {
    const product = UTOMHUSTIMER_PRODUCTS.find((p) => p.id === cap.id);
    if (!product) return [];
    return [
      {
        id: product.id,
        brand: product.brand,
        name: product.shortName ?? product.name,
        price: formatPrice(product.price, product.currency),
        href: `/${UTOMHUSTIMER.slug}#${product.id}`,
        kind: cap.kind,
        watt: cap.watt,
        followsSun: cap.followsSun,
        remote: cap.remote,
      },
    ];
  });
}

export function OutdoorTimerPicker() {
  return <TimerPicker products={timerPickerProducts()} />;
}

/**
 * Vattenlarmen i den form väljaren behöver dem.
 *
 * `priceValue` följer med vid sidan av det formaterade priset, eftersom
 * väljaren sorterar billigast först och "199 kr" inte går att jämföra.
 */
function leakSensorProducts(): LeakSensorProduct[] {
  return VATTENLARM_CAPABILITIES.flatMap((cap) => {
    const product = VATTENLARM_PRODUCTS.find((p) => p.id === cap.id);
    if (!product) return [];
    return [
      {
        id: product.id,
        brand: product.brand,
        name: product.shortName ?? product.name,
        price: formatPrice(product.price, product.currency),
        priceValue: product.price,
        href: `/${VATTENLARM.slug}#${product.id}`,
        reach: cap.reach,
        hub: cap.hub,
        spots: cap.spots,
        batteryYears: cap.batteryYears,
        reachesTightSpots: cap.reachesTightSpots,
        hotSpot: cap.hotSpot,
      },
    ];
  });
}

export function WaterLeakSensorPicker() {
  return <LeakSensorPicker products={leakSensorProducts()} />;
}

/**
 * Driftkostnadsräknaren med julbelysningens förutsättningar.
 *
 * Förinställd på femton slingor à 5 W i åtta timmar, alltså en normal svensk
 * villa i december. Viloförbrukningen står på 0 W och är redigerbar: en
 * mekanisk timer drar ingenting mätbart, medan en smart plugg drar runt 1 W
 * dygnet runt. Poängen med räknaren här är inte att sälja timern utan att visa
 * hur liten besparingen faktiskt är, vilket köpguiden också säger rakt ut.
 */
export function ChristmasLightRunningCost() {
  return (
    <RunningCostCalculator
      defaultCount={15}
      defaultHours={8}
      defaultWatt={5}
      maxWatt={500}
      defaultStandby={0}
      editableStandby
      labels={{
        count: "Antal ljusslingor",
        hours: "Timmar de lyser per dygn",
        watt: "Effekt per slinga (W)",
        standby: "Timerns viloförbrukning (W)",
        on: "När slingorna lyser",
      }}
      standbyNote="En mekanisk timer drar ingenting mätbart och står därför på 0 W. Ska du räkna på en smart plugg i stället är runt 1 W dygnet runt en rimlig siffra, och Cleverio anger under 0,5 W för GP120."
    />
  );
}

/**
 * Brandskyddsguiden.
 *
 * Priserna plockas ur våra tre brandjämförelser på servern, precis som de andra
 * väljarna, så verktyget aldrig kan visa ett pris som inte längre står i
 * tabellen bredvid.
 *
 * Urvalet är avsiktligt hårdare än "billigast". Kravet avgör vad som får räknas:
 * en sexkilos pulversläckare, inte en enkilos, och en 120 × 180-filt, inte en
 * 120 × 120. Att välja billigast i hela listan hade gett ett lägre totalpris och
 * en rekommendation som inte uppfyller den rekommendation verktyget påstår sig
 * återge.
 */
function cheapestKitItem(
  label: string,
  spec: string,
  href: string,
  candidates: { brand: string; name: string; price: number; merchant: string }[],
): KitItem {
  /* Kopia innan sort: produktlistorna är modulnivåkonstanter och delas med
     sidorna som renderar tabellerna. */
  const [best] = [...candidates].sort((a, b) => a.price - b.price);
  return {
    label,
    spec,
    href,
    fromPrice: best.price,
    fromPriceLabel: formatPrice(best.price),
    cheapest: `${best.brand} ${best.name} hos ${best.merchant}`,
  };
}

function fireKitItems(): FireKitItems {
  return {
    alarm: cheapestKitItem(
      "Brandvarnare",
      "Brandvarnare",
      `/${BRANDVARNARE.slug}`,
      /* Tvåpack och trepack räknas bort: styckpriset i listan är för hela
         förpackningen, och verktyget multiplicerar med antal enheter. */
      BRANDVARNARE_PRODUCTS.filter((p) => !/-\d-pack$/.test(p.id)),
    ),
    extinguisher: cheapestKitItem(
      "Pulversläckare",
      "Pulversläckare 6 kg ABC",
      `/${BRANDSLACKARE.slug}`,
      BRANDSLACKARE_PRODUCTS.filter((p) => p.id.includes("-6-kg")),
    ),
    blanketLarge: cheapestKitItem(
      "Brandfilt",
      "Brandfilt 120 × 180 cm",
      `/${BRANDFILT.slug}`,
      BRANDFILT_PRODUCTS.filter((p) => p.id.includes("120x180")),
    ),
    blanketSmall: cheapestKitItem(
      "Brandfilt",
      "Brandfilt 120 × 120 cm till köket",
      `/${BRANDFILT.slug}`,
      BRANDFILT_PRODUCTS.filter((p) => p.id.includes("120x120")),
    ),
  };
}

export function HomeFireKitPlanner() {
  return <FireKitPlanner items={fireKitItems()} />;
}

/**
 * Behöver du en kolmonoxidvarnare?
 *
 * Certifieringsflaggorna härleds ur produktens spec-rad Certifiering, alltså ur
 * samma sträng som visas i jämförelsetabellen. Det gör att verktyget aldrig kan
 * påstå att en varnare är godkänd för husvagn om tabellen bredvid säger något
 * annat.
 *
 * Regeln är avsiktligt strikt: en utgåva räknas som gällande bara om strängen
 * innehåller 2018 eller 2019. De två varnare som anger 2010 och 2012 filtreras
 * alltså bort ur fordonslistan, vilket är hela poängen.
 */
function coPickerProducts(): CoPickerProduct[] {
  return KOLMONOXIDVARNARE_PRODUCTS.map((product) => {
    const cert =
      product.specs.find((s) => s.label === "Certifiering")?.value ?? "";
    const current = /201[89]/.test(cert);
    return {
      id: product.id,
      brand: product.brand,
      name: product.shortName ?? product.name,
      price: formatPrice(product.price, product.currency),
      priceValue: product.price,
      href: `/${KOLMONOXIDVARNARE.slug}#${product.id}`,
      part2Current: current && /-2:/.test(cert),
      part1Current: current && /-1:/.test(cert),
      certLabel: cert,
    };
  });
}

export function CoAlarmNeedPicker() {
  return <CoNeedPicker products={coPickerProducts()} />;
}

export function CoLevelExplainer() {
  return <CoLevelScale />;
}

/**
 * Brandstegarnas två mått, härledda ur specifikationsraderna.
 *
 * Samma princip som `coPickerProducts`: verktyget läser produktdatan i stället
 * för att bära en egen kopia, så att det aldrig kan påstå att en stege når
 * eller passar om tabellen bredvid säger något annat.
 *
 * `maxFrameCm` blir medvetet null när butiken inte anger något mått. Verktyget
 * lägger då produkten i en egen hög i stället för att anta att den passar,
 * eftersom en okänd uppgift inte är samma sak som en godkänd.
 */
function ladderFitProducts(): LadderFitProduct[] {
  const num = (value: string | undefined, re: RegExp): number | null => {
    const m = value?.match(re);
    return m ? Number(m[1].replace(",", ".")) : null;
  };

  return BRANDSTEGE_PRODUCTS.map((product) => {
    const spec = (label: string) =>
      product.specs.find((s) => s.label === label)?.value;
    /* En etikett för alla, annars faller den produkt som har den bästa
       uppgiften ut som tom i jämförelsetabellen. Värdet är antingen ett
       intervall ("15 till 34 cm") eller bara ett tak ("Högst 30 cm"). */
    const frame = spec("Karmtjocklek");
    const range = frame?.match(/(\d+)\s*till\s*(\d+)/);

    return {
      id: product.id,
      brand: product.brand,
      name: product.shortName ?? product.name,
      price: formatPrice(product.price, product.currency),
      priceValue: product.price,
      href: `/${BRANDSTEGE.slug}#${product.id}`,
      lengthM: num(spec("Längd"), /([\d,]+)\s*m/) ?? 0,
      maxFrameCm: range ? Number(range[2]) : num(frame, /([\d,]+)\s*cm/),
      minFrameCm: range ? Number(range[1]) : null,
    };
  });
}

export function LadderFitTool() {
  return <LadderFitPicker products={ladderFitProducts()} />;
}

/**
 * Slug → widget. Keeps `lib/tools.ts` free of React so it can be imported from
 * anywhere (sitemap, metadata, category pages) without pulling in components.
 *
 * A tool in the registry with no entry here renders nothing, which is why the
 * dedicated route 404s on a missing widget rather than shipping an empty page.
 */
export const TOOL_WIDGETS: Record<string, ComponentType> = {
  lumenraknare: LumenCalculator,
  "elkostnad-lampor": RunningCostCalculator,
  "protokollvaljare-smart-hem": ProtocolPicker,
  fargtemperatur: KelvinScale,
  "watt-till-lumen": WattLumenTable,
  "elkostnad-uttag": PlugRunningCostCalculator,
  "effektkoll-smart-plug": PlugLoadPicker,
  "installationsguide-strombrytare": SwitchInstallationPicker,
  "monteringsvaljare-gardin": CurtainMountPicker,
  "timervaljare-utomhus": OutdoorTimerPicker,
  "elkostnad-julbelysning": ChristmasLightRunningCost,
  vattenlarmsvaljare: WaterLeakSensorPicker,
  "aterbetalning-vattenfelsbrytare": InsurancePaybackCalculator,
  "brandskydd-hemma": HomeFireKitPlanner,
  "behover-du-kolmonoxidvarnare": CoAlarmNeedPicker,
  "co-halt-larmgrans": CoLevelExplainer,
  "vilken-brandstege-passar": LadderFitTool,
};

export function hasToolWidget(slug: string): boolean {
  return slug in TOOL_WIDGETS;
}

/**
 * Renders the widget for a slug.
 *
 * The lookup lives inside a stable component rather than in the caller's
 * render. Selecting a component type into a local and rendering `<Widget />`
 * reads to React (and to `react-hooks/static-components`) as a component
 * created during render, which is the pattern that silently remounts subtrees.
 */
export function ToolWidget({ slug }: { slug: string }) {
  const Widget = TOOL_WIDGETS[slug];
  return Widget ? <Widget /> : null;
}
