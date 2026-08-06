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
  UTRYMNINGSSTEGE,
  OVERVAKNINGSKAMERA,
  DORRKLOCKA_MED_KAMERA,
  INOMHUSKAMERA,
  KODLAS_YTTERDORR,
  ROBOTDAMMSUGARE,
  IPHONE_SKAL,
  IPHONE_FODRAL,
} from "@/lib/test-pages";
import { formatPrice } from "@/lib/products";
import { AgentTools } from "@/components/tools/agent-tools";
import { Fuktavlasning } from "@/components/tools/fuktavlasning";
import { Ventilpassning } from "@/components/tools/ventilpassning";
import {
  ThresholdPicker,
  type ThresholdOption,
} from "@/components/tools/threshold-picker";
import { ROBOTDAMMSUGARE_PRODUCTS } from "@/lib/data/robotdammsugare";
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
import { AirAppliancePicker } from "@/components/tools/air-appliance-picker";
import { CableNeedPicker } from "@/components/tools/cable-need-picker";
import { CameraNeedPicker } from "@/components/tools/camera-need-picker";
import { PowerstationSizer } from "@/components/tools/powerstation-sizer";
import { CoLevelScale } from "@/components/tools/co-level-scale";
import { BRANDSTEGE_PRODUCTS } from "@/lib/data/brandstege";
import {
  LadderFitPicker,
  type LadderFitProduct,
} from "@/components/tools/ladder-fit-picker";
import { UTRYMNINGSSTEGE_PRODUCTS } from "@/lib/data/utrymningsstege";
import {
  EscapeLadderHeight,
  type EscapeLadderOption,
} from "@/components/tools/escape-ladder-height";
import { OVERVAKNINGSKAMERA_PRODUCTS } from "@/lib/data/overvakningskamera";
import {
  CameraPrivacyPicker,
  type CameraPrivacyOption,
} from "@/components/tools/camera-privacy-picker";
import { DORRKLOCKA_PRODUCTS } from "@/lib/data/dorrklocka-med-kamera";
import {
  DoorbellHomePicker,
  type DoorbellOption,
} from "@/components/tools/doorbell-home-picker";
import { INOMHUSKAMERA_PRODUCTS } from "@/lib/data/inomhuskamera";
import {
  IndoorPrivacyPicker,
  type IndoorCameraOption,
} from "@/components/tools/indoor-privacy-picker";
import { KODLAS_PRODUCTS } from "@/lib/data/kodlas-ytterdorr";
import {
  LockApprovalPicker,
  type LockOption,
} from "@/components/tools/lock-approval-picker";
import { BRANDVARNARE_PRODUCTS } from "@/lib/data/brandvarnare";
import { BRANDSLACKARE_PRODUCTS } from "@/lib/data/brandslackare";
import { BRANDFILT_PRODUCTS } from "@/lib/data/brandfilt";
import {
  IPHONE_SKAL_CAPABILITIES,
  IPHONE_SKAL_PRODUCTS,
} from "@/lib/data/iphone-skal";
import {
  IPHONE_FODRAL_CAPABILITIES,
  IPHONE_FODRAL_PRODUCTS,
} from "@/lib/data/iphone-fodral";
import {
  FireKitPlanner,
  type FireKitItems,
  type KitItem,
} from "@/components/tools/fire-kit-planner";
import {
  LeakSensorPicker,
  type LeakSensorProduct,
} from "@/components/tools/leak-sensor-picker";
import {
  CaseTypePicker,
  type CaseTypeProduct,
} from "@/components/tools/case-type-picker";
import {
  WalletFolioPicker,
  type FolioProduct,
} from "@/components/tools/wallet-folio-picker";
import { InsurancePaybackCalculator } from "@/components/tools/insurance-payback-calculator";
import { MountPicker, type CurtainProduct } from "@/components/tools/mount-picker";
import { TimerPicker, type TimerProduct } from "@/components/tools/timer-picker";
import { KelvinScale } from "@/components/tools/kelvin-scale";
import {
  InstallationPicker,
  type SwitchProduct,
} from "@/components/tools/installation-picker";
import { LoadPicker, type PickerProduct } from "@/components/tools/load-picker";
import { HEMLARM } from "@/lib/test-pages";
import { HEMLARM_SERVICES } from "@/lib/data/hemlarm";
import { LARM_UTAN_ABONNEMANG_PRODUCTS } from "@/lib/data/larm-utan-abonnemang";
import { conditionalFees } from "@/lib/services";
import {
  AlarmExitCalculator,
  type ExitOption,
} from "@/components/tools/alarm-exit-calculator";
import {
  FiveYearAlarmCost,
  type KitOption,
  type SubscriptionOption,
} from "@/components/tools/five-year-alarm-cost";
import { LumenCalculator } from "@/components/tools/lumen-calculator";
import { ProtocolPicker } from "@/components/tools/protocol-picker";
import { RunningCostCalculator } from "@/components/tools/running-cost-calculator";
import { WattLumenTable } from "@/components/tools/watt-lumen-table";
import { BabyMonitorRange } from "@/components/tools/baby-monitor-range";
import { VacuumRuntime } from "@/components/tools/vacuum-runtime";

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

/**
 * Skalväljarens produkter.
 *
 * Samma form som `leakSensorProducts()`: egenskaperna kommer ur
 * IPHONE_SKAL_CAPABILITIES och priset ur den resolvade produkten, så en
 * prisändring aldrig behöver skrivas på två ställen. `priceValue` följer med
 * vid sidan av det formaterade priset, eftersom väljaren sorterar billigast
 * först och "349 kr" inte går att jämföra.
 */
function caseTypeProducts(): CaseTypeProduct[] {
  return IPHONE_SKAL_CAPABILITIES.flatMap((cap) => {
    const product = IPHONE_SKAL_PRODUCTS.find((p) => p.id === cap.id);
    if (!product) return [];
    return [
      {
        id: product.id,
        brand: product.brand,
        /* `name` och inte `shortName`. Widgeten renderar `{brand} {name}`, och
           skalsidans shortName bär redan märket ("Spigen UH MagFit"), så
           shortName här gav "Spigen Spigen UH MagFit" i träfflistan. Uppmätt i
           webbläsaren, inte gissat. `name` är enligt Product-typen namnet utan
           märke, vilket är precis vad som ska stå efter brand. */
        name: product.name,
        price: formatPrice(product.price, product.currency),
        priceValue: product.price,
        href: `/${IPHONE_SKAL.slug}#${product.id}`,
        magnet: cap.magnet,
        corners: cap.corners,
        camera: cap.camera,
        finish: cap.finish,
      },
    ];
  });
}

/**
 * Fodralväljarens produkter.
 *
 * Samma form som `caseTypeProducts()`. `name` och inte `shortName`, av samma
 * skäl: widgeten renderar `{brand} {name}`, och sidans shortName bär redan
 * märket. Det felet uppmättes i webbläsaren på skalsidan och upprepas inte.
 */
function folioProducts(): FolioProduct[] {
  return IPHONE_FODRAL_CAPABILITIES.flatMap((cap) => {
    const product = IPHONE_FODRAL_PRODUCTS.find((p) => p.id === cap.id);
    if (!product) return [];
    return [
      {
        id: product.id,
        brand: product.brand,
        name: product.name,
        price: formatPrice(product.price, product.currency),
        priceValue: product.price,
        href: `/${IPHONE_FODRAL.slug}#${product.id}`,
        charging: cap.charging,
        cards: cap.cards,
        coinPocket: cap.coinPocket,
        realLeather: cap.realLeather,
      },
    ];
  });
}

export function IphoneWalletFolioPicker() {
  return <WalletFolioPicker products={folioProducts()} />;
}

export function IphoneCaseTypePicker() {
  return <CaseTypePicker products={caseTypeProducts()} />;
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

/**
 * Luftklustrets enda verktyg, inbäddat på alla tre kategorisidorna.
 *
 * Tar inga produkter med flit. Svaret pekar på en kategorisida och slutar
 * där, eftersom ett verktyg som lämnar ut produkt, pris och länk ersätter
 * just det steg sajten får betalt för. Se lib/agent-tools.ts.
 */
export function AirAppliancePickerTool() {
  return <AirAppliancePicker />;
}

export function CableNeedPickerTool() {
  return <CableNeedPicker />;
}

export function CameraNeedPickerTool() {
  return <CameraNeedPicker />;
}

export function PowerstationSizerTool() {
  return <PowerstationSizer />;
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
 * Längdserier och godkända höjder för de fasta utrymningsstegarna.
 *
 * Till skillnad från `ladderFitProducts` går det här inte att härleda ur
 * specifikationsraderna. En stege som säljs i sexton längder har sexton priser,
 * och tabellen bredvid visar bara den längd vi rankat. Serierna står därför
 * här, med butiken angiven per fabrikat, alla lästa 2026-08-02.
 *
 * `approvedM` är null för alla utom Modum, och det är avsiktligt. Tystnad ska
 * inte passera som en obegränsad gräns, så verktyget lägger dem i en egen hög.
 */
function escapeLadderOptions(): EscapeLadderOption[] {
  const href = (id: string) => `/${UTRYMNINGSSTEGE.slug}#${id}`;
  const named = (id: string) => UTRYMNINGSSTEGE_PRODUCTS.find((p) => p.id === id);
  const label = (id: string, fallback: string) => {
    const product = named(id);
    return {
      brand: product?.brand ?? "",
      /* Namnet i rankningen bär längden vi prissatt, till exempel
         "Original 3,9 m". Här väljer verktyget längd själv, så en sådan
         etikett hade motsagt raden bredvid. */
      name: fallback,
    };
  };

  return [
    {
      id: "modum-original",
      ...label("modum-original", "Original"),
      href: href("modum-original"),
      merchant: "Everglow",
      /* 15 av 16 standardlängder. Everglow lagerför 1,2 till 5,4 m; den
         sextonde, 0,9 m, finns i certifikatet men inte i butiken. */
      lengths: [1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 3, 3.3, 3.6, 3.9, 4.2, 4.5, 4.8, 5.1, 5.4],
      prices: [
        2964, 3569, 4444, 5178, 5923, 6663, 7401, 8143, 8883, 9621, 10366,
        11358, 11844, 12586, 13325,
      ],
      approvedM: 5,
      approvedWithGuardM: 7.5,
    },
    {
      id: "housegard-el39",
      ...label("housegard-el39", "EL39"),
      href: href("housegard-el39"),
      merchant: "Kjell & Company",
      /* En grundlängd plus förlängningsdelar om 90 cm. Priserna är
         grundpriset 3 695 kr plus 1 395 kr per sektion, alltså räknade och
         inte lästa som egna artiklar. */
      lengths: [3.86, 4.76, 5.66],
      prices: [3695, 5090, 6485],
      approvedM: null,
      approvedWithGuardM: null,
    },
    {
      id: "skeppshultstegen-fallbar",
      ...label("skeppshultstegen-fallbar", "Fällbar"),
      href: href("skeppshultstegen-fallbar"),
      merchant: "Bauhaus",
      /* Bara de tre längder Bauhaus lagerför. Serien går upp till 5,7 m hos
         Stegfabriken, men till ett pris 41 till 45 procent högre, och att
         blanda två butikers priser i samma rad hade gjort summan obegriplig. */
      lengths: [2.7, 3.9, 4.8],
      prices: [5599, 7799, 9199],
      approvedM: null,
      approvedWithGuardM: null,
    },
    {
      id: "wsteps-400",
      ...label("wsteps-400", "400"),
      href: href("wsteps-400"),
      merchant: "Stegfabriken",
      lengths: [1.5, 2.1, 3.6, 4.8, 6],
      prices: [7158, 8635, 14513, 17813, 20735],
      approvedM: null,
      approvedWithGuardM: null,
    },
    {
      id: "wsteps-320",
      ...label("wsteps-320", "320"),
      href: href("wsteps-320"),
      merchant: "Stegfabriken",
      lengths: [1.5, 2.1, 3.6],
      prices: [5955, 7423, 11378],
      approvedM: null,
      approvedWithGuardM: null,
    },
  ];
}

export function EscapeLadderHeightTool() {
  return <EscapeLadderHeight options={escapeLadderOptions()} />;
}

/**
 * Kamerornas maskeringsläge, härlett ur specifikationsraderna.
 *
 * Samma princip som `ladderFitProducts`: verktyget läser produktdatan i
 * stället för att bära en egen kopia, så att det aldrig kan påstå att en
 * kamera maskerar om tabellen bredvid säger något annat.
 *
 * De två raderna som styr sorteringen är `Sekretesszon` och `Zonen påverkas
 * av rörelse`, och de är formulerade i datafilen efter respektive
 * tillverkares egen supportdokumentation. Noteringen som visas under varje
 * kamera i verktyget är en kort sammanfattning av samma två rader, så att
 * läsaren ser skälet och inte bara sorteringen.
 */
function cameraPrivacyOptions(): CameraPrivacyOption[] {
  return OVERVAKNINGSKAMERA_PRODUCTS.map((product) => {
    const spec = (label: string) =>
      product.specs.find((s) => s.label === label)?.value ?? "";
    const zone = spec("Sekretesszon");
    const motion = spec("Zonen påverkas av rörelse");

    /* Fyra lägen och inte två: en kamera vars modell tillverkaren inte listar
       är inte samma sak som en som saknar funktionen, och ingen av dem är
       samma sak som en vars zon flyttar sig. Tystnad ska inte sorteras som
       ett nej och inte heller som ett ja.

       Klassningen läser rörelseraden och bara den, eftersom det är den som
       bär svaret. Ett tidigare utkast letade efter nyckelord i båda raderna
       och sorterade då in Arlo bland dem som håller, trots att deras egen
       rad säger att zonerna raderas. Felet syntes inte i tsc, lint eller
       bygget, bara i verktyget. */
    let mask: CameraPrivacyOption["mask"];
    if (/saknas|ej angiven|ej tillämpligt/i.test(`${zone} ${motion}`))
      mask = "unclear";
    else if (/^nej/i.test(motion)) mask = "solid";
    else if (/^bara om/i.test(motion)) mask = "caveat";
    else mask = "moves";

    return {
      id: product.id,
      brand: product.brand,
      name: product.shortName ?? product.name,
      price: formatPrice(product.price, product.currency),
      priceValue: product.price,
      merchant: product.merchant,
      href: `/${OVERVAKNINGSKAMERA.slug}#${product.id}`,
      mask,
      maskNote: `${zone}. Vid rörelse: ${motion.toLowerCase()}.`,
    };
  });
}

export function CameraPrivacyTool() {
  return <CameraPrivacyPicker options={cameraPrivacyOptions()} />;
}

/**
 * Dörrklockornas två praktiska villkor, härledda ur specifikationsraderna.
 *
 * Samma princip som `cameraPrivacyOptions`: verktyget läser produktdatan i
 * stället för att bära en egen kopia, så att det aldrig kan påstå att en
 * signalenhet ingår om tabellen bredvid säger något annat.
 *
 * `needsWiring` är sant bara för produkter som saknar batteridrift helt.
 * Tapo D235 och Aqara G410 klarar båda vägarna och räknas därför inte som
 * kabelbundna, trots att de kan kopplas in på 8 till 24 volt.
 */
function doorbellOptions(): DoorbellOption[] {
  return DORRKLOCKA_PRODUCTS.map((product) => {
    const spec = (label: string) =>
      product.specs.find((s) => s.label === label)?.value ?? "";
    const chime = spec("Signalenhet");
    const power = spec("Ström");

    return {
      id: product.id,
      brand: product.brand,
      name: product.shortName ?? product.name,
      price: formatPrice(product.price, product.currency),
      priceValue: product.price,
      merchant: product.merchant,
      href: `/${DORRKLOCKA_MED_KAMERA.slug}#${product.id}`,
      /* Bara den som varken nämner batteri eller erbjuder det som alternativ
         är kabelbunden. "Batteri 10 000 mAh eller 8 till 24 V" är alltså
         inte det. */
      needsWiring: !/batteri/i.test(power),
      /* Ankrat till strängens början. Ett tidigare utkast testade /ingår/i
         någonstans i strängen, vilket gjorde att "Nej, ingår ej" räknades som
         ett ja och verktyget skrev "Ringklocka ingår" om Ring och Google.
         Felet syntes varken i tsc, lint eller bygget. */
      chimeIncluded: /^(ja|ingår)/i.test(chime),
      chimeNote: chime,
      localStorage: /^nej/i.test(spec("Kräver abonnemang")),
    };
  });
}

export function DoorbellHomeTool() {
  return <DoorbellHomePicker options={doorbellOptions()} />;
}

/**
 * Inomhuskamerornas avstängningsläge, härlett ur specifikationsraden.
 *
 * Tre lägen och inte två: ett motoriserat skydd som stängs av sig självt när
 * kameran avlarmas är inte samma sak som ett du trycker ner för hand, och
 * ingetdera är samma sak som ett läge i en app. Skillnaden är hela sidans
 * ärende, så den ska synas i sorteringen.
 */
/*
 * Kategorin per produkt, skriven ut i stället för gissad ur specsträngen.
 *
 * Fram till 2026-08-08 lästes den med `/automatisk/i` och `/fysisk|skydd/i`
 * mot cellen Avstängning. Så fort formuleringen skrevs om hamnade vinnaren,
 * vars cell då löd "Knapp på kameran, vrider bort linsen", i högen för dem som
 * bara har ett läge i appen. Ett verktyg vars sortering beror på ordvalet i en
 * tabellcell går sönder tyst nästa gång någon förbättrar en mening.
 */
const INDOOR_SHIELD: Record<string, IndoorCameraOption["shield"]> = {
  "arlo-essential-3-ptz-indoor": "auto",
  "aqara-g3": "auto",
  "tapo-c225": "fysiskt",
  "ring-pan-tilt-indoor": "fysiskt",
  "ring-indoor-cam-plus": "fysiskt",
  "tapo-c220": "app",
  "tapo-c100": "app",
};

function indoorCameraOptions(): IndoorCameraOption[] {
  return INOMHUSKAMERA_PRODUCTS.map((product) => {
    const spec = (label: string) =>
      product.specs.find((s) => s.label === label)?.value ?? "";
    const off = spec("Avstängning");
    const shield = INDOOR_SHIELD[product.id] ?? "app";

    return {
      id: product.id,
      brand: product.brand,
      name: product.shortName ?? product.name,
      price: formatPrice(product.price, product.currency),
      priceValue: product.price,
      merchant: product.merchant,
      href: `/${INOMHUSKAMERA.slug}#${product.id}`,
      shield,
      shieldNote: off + ".",
      localStorage: /^behövs inte/i.test(spec("Abonnemang")),
    };
  });
}

export function IndoorPrivacyTool() {
  return <IndoorPrivacyPicker options={indoorCameraOptions()} />;
}

/**
 * Låsens godkännandeläge, härlett ur specifikationsraden Godkännande.
 *
 * Fem lägen och inte två, eftersom skillnaderna är verkliga och alla fem
 * förekommer i handeln: ett läst certifikat, en angiven klass 3 utan
 * certifikat, en angiven klass under 3, ingen uppgift alls, och ett
 * uttryckligt nej från butiken. Att slå ihop de tre sista hade dolt att
 * "ingen uppgift" inte är samma sak som "inte godkänt".
 */
function lockOptions(): LockOption[] {
  return KODLAS_PRODUCTS.map((product) => {
    const spec = (label: string) =>
      product.specs.find((s) => s.label === label)?.value ?? "";
    const approval = spec("Godkännande");
    const unlock = spec("Upplåsning");

    let status: LockOption["status"] = "ingen";
    if (/SBSC/i.test(approval)) status = "cert";
    else if (/ej godk|inte godk/i.test(approval)) status = "nekat";
    else if (/klass 3|klass S3/i.test(approval)) status = "klass3";
    else if (/klass \d/i.test(approval)) status = "lagre";

    return {
      id: product.id,
      brand: product.brand,
      name: product.shortName ?? product.name,
      price: formatPrice(product.price, product.currency),
      priceValue: product.price,
      merchant: product.merchant,
      href: `/${KODLAS_YTTERDORR.slug}#${product.id}`,
      status,
      statusNote: `${approval}. ${spec("Certifikatet gäller")}.`,
      hasCode: /kod/i.test(unlock),
      /* Utanpåliggande lås anger monteringssättet i dörrtjockleksraden i
         stället för ett mått, eftersom de inte har med dörrens tjocklek att
         göra. Det är den enda raden som skiljer arkitekturerna åt. */
      replacesUnit: !/vred/i.test(spec("Dörrtjocklek")),
    };
  });
}

export function LockApprovalTool() {
  return <LockApprovalPicker options={lockOptions()} />;
}

/**
 * Kostnaden att lämna, härledd ur tjänstedatan.
 *
 * Läser `terms` direkt i stället för att leta i specifikationsrader, vilket är
 * skillnaden mot verktygen ovan: tjänsterna har riktiga fält för avgifter,
 * bindningstid och friköpstrappa, så det finns ingen sträng att tolka.
 *
 * Bolag som inte publicerar någon månadsavgift tas **inte** bort ur listan.
 * Att välja ett av dem och få veta att kostnaden inte går att räkna ut är
 * hela poängen, och att gömma dem hade dolt kategorins verkliga tillstånd.
 */
function alarmExitOptions(): ExitOption[] {
  return HEMLARM_SERVICES.map((service) => ({
    id: service.id,
    provider: service.provider,
    name: service.name,
    href: `/${HEMLARM.slug}#${service.id}`,
    monthlyFee: service.terms.monthlyFee,
    noticeMonths: service.terms.noticeMonths,
    ownership: service.terms.ownership,
    buyout: service.terms.buyout ?? [],
    conditionalFees: conditionalFees(service.terms).map((fee) => ({
      label: fee.label,
      amount: fee.amount,
      source: fee.source,
    })),
    buyoutNote: service.terms.buyoutNote,
  }));
}

export function AlarmExitTool() {
  return <AlarmExitCalculator options={alarmExitOptions()} />;
}

/**
 * Femårskostnad: larmpaket mot abonnemang.
 *
 * Båda sidorna av jämförelsen läses ur riktig produktdata. Larmpaketen kommer
 * från /larm-utan-abonnemang, abonnemangen från /hemlarm.
 *
 * ⚠️ Bolag som inte publicerar **både** månadsavgift och startavgift tas med i
 * listan ändå, med sin brist synlig i verktyget. Att sålla bort dem hade dolt
 * att fyra av åtta bolag inte går att räkna på, vilket är hela poängen med
 * systersidan. Samma resonemang som i `alarmExitOptions` ovan.
 */
function alarmKits(): KitOption[] {
  return LARM_UTAN_ABONNEMANG_PRODUCTS.map((product) => ({
    id: product.id,
    brand: product.brand,
    name: product.shortName ?? product.name,
    price: product.price,
  }));
}

function alarmSubscriptions(): SubscriptionOption[] {
  return HEMLARM_SERVICES.map((service) => ({
    id: service.id,
    provider: service.provider,
    monthlyFee: service.terms.monthlyFee,
    startFee: service.terms.startFee,
    note:
      service.terms.monthlyFee === null || service.terms.startFee === null
        ? "Bolaget publicerar inte hela priset på sin egen sida. Se jämförelsen på vår sida om hemlarm för vad som faktiskt går att läsa."
        : undefined,
  }));
}

export function FiveYearAlarmCostTool() {
  return (
    <FiveYearAlarmCost kits={alarmKits()} subscriptions={alarmSubscriptions()} />
  );
}

/**
 * Robotarnas angivna passerhöjd, läst ur specifikationsraden.
 *
 * Samma princip som `cameraPrivacyOptions`: verktyget läser produktdatan i
 * stället för att bära en egen kopia, så det kan aldrig påstå en passerhöjd
 * som tabellen bredvid inte visar.
 *
 * Raden heter `Passerhöjd` och finns bara på de robotar vars tillverkare
 * publicerar ett tal. Saknas raden blir `statedMm` null, och widgeten lägger
 * roboten i högen "anger ingen passerhöjd alls" i stället för att tolka
 * tystnaden som ett ja.
 */
function thresholdOptions(): ThresholdOption[] {
  return ROBOTDAMMSUGARE_PRODUCTS.map((product) => {
    const raw = product.specs.find((s) => s.label === "Passerhöjd")?.value ?? "";
    /* Matchar "40 mm enligt Dreame" men inte "8,8 cm": alla tal vi publicerar
       i den här raden anges i millimeter. Kommer en centimeteruppgift in
       senare ska den skrivas om i datafilen, inte tolkas här. */
    const mm = /(\d+)\s*mm/i.exec(raw);

    return {
      id: product.id,
      brand: product.brand,
      name: product.shortName ?? product.name,
      href: `/${ROBOTDAMMSUGARE.slug}#${product.id}`,
      statedMm: mm ? Number(mm[1]) : null,
    };
  });
}

export function RobotThresholdTool() {
  return <ThresholdPicker options={thresholdOptions()} />;
}

/**
 * Fuktavläsningen behöver ingen produktdata. Den räknar på det läsaren redan
 * har på displayen och på de tre gränserna, som är hämtade och inte våra.
 */
export function FuktavlasningTool() {
  return <Fuktavlasning />;
}

/**
 * Ventilpassningen läser inte produktdatan här utan sin egen lista i
 * lib/tool-logic/ventilpassning.ts. Skälet är att fältet som avgör svaret är
 * tillverkarens namngivna adapterlista, och den är rikare än vad som får plats
 * i en spec-rad: den skiljer på vad som ingår, vad som säljs separat och vad
 * tillverkaren uttryckligen inte levererar.
 */
export function VentilpassningTool() {
  return <Ventilpassning />;
}

/**
 * Slug → widget. Keeps `lib/tools.ts` free of React so it can be imported from
 * anywhere (sitemap, metadata, category pages) without pulling in components.
 *
 * A tool in the registry with no entry here renders nothing, which is why the
 * dedicated route 404s on a missing widget rather than shipping an empty page.
 */
export const TOOL_WIDGETS: Record<string, ComponentType> = {
  "drifttid-skaftdammsugare": VacuumRuntime,
  "rackvidd-babyvakt": BabyMonitorRange,
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
  skaltypsvaljare: IphoneCaseTypePicker,
  planboksfodralvaljare: IphoneWalletFolioPicker,
  "aterbetalning-vattenfelsbrytare": InsurancePaybackCalculator,
  "brandskydd-hemma": HomeFireKitPlanner,
  "behover-du-kolmonoxidvarnare": CoAlarmNeedPicker,
  "co-halt-larmgrans": CoLevelExplainer,
  "vilken-brandstege-passar": LadderFitTool,
  "godkand-utrymningshojd": EscapeLadderHeightTool,
  "vad-far-kameran-filma": CameraPrivacyTool,
  "dorrklocka-lagenhet-eller-villa": DoorbellHomeTool,
  "kamera-nar-nagon-arbetar-hemma": IndoorPrivacyTool,
  "godkant-las-till-ytterdorr": LockApprovalTool,
  "vad-kostar-det-att-lamna-hemlarmet": AlarmExitTool,
  "femarskostnad-larm": FiveYearAlarmCostTool,
  "vilken-luftapparat": AirAppliancePickerTool,
  "vilken-usb-c-kabel": CableNeedPickerTool,
  "sensor-eller-rackvidd": CameraNeedPickerTool,
  "klarar-roboten-troskeln": RobotThresholdTool,
  "vad-betyder-talet-pa-hygrometern": FuktavlasningTool,
  "vilken-termostat-passar-min-ventil": VentilpassningTool,
  "hur-stor-powerstation": PowerstationSizerTool,
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
  if (!Widget) return null;

  return (
    <>
      <Widget />
      {/* Registrerar sidans agentverktyg så länge räknaren är monterad. Renderar
          ingenting, och gör ingenting alls i en webbläsare utan WebMCP. Se
          components/tools/agent-tools.tsx. */}
      <AgentTools slug={slug} />
    </>
  );
}
