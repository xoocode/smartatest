/**
 * Verktygen agenter kan anropa, en lista per tool page.
 *
 * ## Regeln som styr vad som får finnas här
 *
 * Verktygen svarar med **råd, aldrig med produkter**. Ingen returnerar ett
 * produktnamn, ett pris eller en butikslänk. Skälet är inte försiktighet utan
 * affär: sajten lever på att en människa klickar sig vidare till butiken, och
 * ett verktyg som lämnar ut hela svaret ersätter just det steget. Svaren slutar
 * därför med en adress till sidan där produkterna står.
 *
 * Det betyder också att de femton produktkopplade väljarna, alltså de som
 * matchar mot vår rankning, med flit saknar verktyg. En rankad tabell är ett
 * dokument och inte en funktion. Agenten ska läsa den som HTML och strukturerad
 * data.
 *
 * ## Varför räkningen inte ligger här
 *
 * Varje `run` nedan anropar samma funktion som widgeten renderar. Räkningarna
 * bor i `lib/tool-logic/`. Skrev vi om dem här skulle vi ha två implementationer
 * av samma matematik, och den dagen någon rättar den ena är det slumpen som
 * avgör vilken en läsare får.
 */

import { SITE } from "@/lib/site";
import type { AgentTool } from "@/lib/webmcp";
import { toolHref, findTool } from "@/lib/tools";
import {
  BULB_OUTPUTS,
  LUMEN_ROOMS,
  lampCount,
  lumenNeed,
} from "@/lib/tool-logic/lumen";
import { WATT_LUMEN_ROWS, nearestWattRow } from "@/lib/tool-logic/watt-lumen";
import {
  BUILD_FACTORS,
  indoorRange,
  PUBLISHED_PAIRS,
  reachVerdict,
} from "@/lib/tool-logic/babyvakt-rackvidd";
import {
  MODES as VACUUM_MODES,
  PUBLISHED_PAIRS as VACUUM_PAIRS,
  areaVerdict,
  runtimeInMode,
} from "@/lib/tool-logic/skaftdammsugare-drifttid";
import {
  FILTERING as OIL_FILTERING,
  PUBLISHED_ADVICE as OIL_ADVICE,
  costVerdict,
  oilCost,
} from "@/lib/tool-logic/fritos-oljekostnad";
import {
  TOLERANSER,
  tolkaAvlasning,
  type ToleransKey,
} from "@/lib/tool-logic/fuktavlasning";
import {
  FATTNINGAR,
  VENTILTYPER,
  bedomPassning,
  type FattningKey,
  type VentiltypKey,
} from "@/lib/tool-logic/ventilpassning";
import { DEFAULT_PRICE, runningCost } from "@/lib/tool-logic/running-cost";
import {
  THRESHOLD_BANDS,
  decideThreshold,
  type ThresholdBandKey,
} from "@/lib/tool-logic/threshold";
import {
  DEFAULT_COST,
  DEFAULT_DISCOUNT,
  EXCESS_HIGH,
  EXCESS_LOW,
  insurancePayback,
} from "@/lib/tool-logic/insurance-payback";
import { formatDuration, nearestCoLevel } from "@/lib/tool-logic/co-level";
import { KELVIN_BY_ROOM, kelvinNote } from "@/lib/tool-logic/kelvin";
import {
  decideProtocol,
  type ProtocolAnswers,
} from "@/lib/tool-logic/protocol";
import {
  AIR_MEASURED,
  AIR_PLACES,
  AIR_SYMPTOMS,
  decideAirAppliance,
  type AirMeasuredKey,
  type AirPlaceKey,
  type AirSymptomKey,
} from "@/lib/tool-logic/air-appliance";
import {
  CABLE_LENGTHS,
  CABLE_POWER,
  CABLE_TASKS,
  decideCable,
  type CableLengthKey,
  type CablePowerKey,
  type CableTaskKey,
} from "@/lib/tool-logic/usb-c-kabel";
import {
  CO_PLACES,
  CO_SOURCES,
  decideCoNeed,
  type CoPlaceKey,
  type CoSourceKey,
} from "@/lib/tool-logic/co-need";
import {
  KEEP_OPTIONS,
  NEUTRAL_OPTIONS,
  WHO_OPTIONS,
  decideInstallation,
  type KeepKey,
  type NeutralKey,
  type WhoKey,
} from "@/lib/tool-logic/switch-installation";
import {
  PLUG_LOADS,
  PLUG_PLACES,
  decidePlugLoad,
  type PlugLoadKey,
  type PlugPlaceKey,
} from "@/lib/tool-logic/plug-load";
import {
  LEAK_HUBS,
  LEAK_PLACES,
  LEAK_PRESENCE,
  decideLeakSensor,
  type LeakHubKey,
  type LeakPlaceKey,
  type LeakPresenceKey,
} from "@/lib/tool-logic/leak-sensor";
import {
  CASE_CHARGING,
  CASE_LOOKS,
  CASE_USES,
  decideCaseType,
  type CaseChargingKey,
  type CaseLookKey,
  type CaseUseKey,
} from "@/lib/tool-logic/case-type";
import {
  FOLIO_CAPACITY,
  FOLIO_CHARGING,
  FOLIO_LIFESPAN,
  decideFolio,
  folioEmptyReason,
  type FolioCapacityKey,
  type FolioChargingKey,
  type FolioLifespanKey,
} from "@/lib/tool-logic/wallet-folio";
import {
  CURTAIN_MOUNTS,
  CURTAIN_NOISE,
  CURTAIN_WINDOWS,
  decideMount,
  type CurtainMountKey,
  type CurtainNoiseKey,
  type CurtainWindowKey,
} from "@/lib/tool-logic/curtain-mount";
import {
  TIMER_LOADS,
  TIMER_REACH,
  TIMER_SEASONS,
  decideTimer,
  type TimerLoadKey,
  type TimerReachKey,
  type TimerSeasonKey,
} from "@/lib/tool-logic/outdoor-timer";
import {
  FIRE_FLOORS,
  FIRE_HOMES,
  FIRE_KITCHENS,
  fireKitPlan,
  type FireFloorKey,
  type FireHomeKey,
  type FireKitchenKey,
} from "@/lib/tool-logic/fire-kit";

const nf = new Intl.NumberFormat("sv-SE");
const kr = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0,
});
/* Egna formaterare för kilowattimmar. `toFixed` ger engelsk decimalpunkt och
   inget tusentalsmellanslag, alltså "2226.5" där svenska vill ha "2 226,5". */
const kwh = new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 0 });
const kwhDetailed = new Intl.NumberFormat("sv-SE", {
  maximumFractionDigits: 1,
});

/** Adressen till en tool page, så svaret kan peka tillbaka hit. */
function toolUrl(slug: string): string {
  const tool = findTool(slug);
  return tool ? `${SITE.url}${toolHref(tool)}` : SITE.url;
}

/**
 * Läser ett tal ur agentens argument.
 *
 * Strängar accepteras med flit. Ett schema säger `number`, men modeller skickar
 * ändå `"14"` eller `"2,5"`, och svenskt decimalkomma är det troligaste av allt
 * i en svenskspråkig dialog. Att falla tillbaka på ett rimligt värde i stället
 * för att svara NaN är skillnaden mellan ett verktyg som fungerar och ett som
 * ser trasigt ut.
 */
function readNumber(
  args: Record<string, unknown>,
  key: string,
  fallback: number,
): number {
  const value = args[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(",", ".").replace(/\s/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function readString(
  args: Record<string, unknown>,
  key: string,
  fallback = "",
): string {
  const value = args[key];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

/* ─── Belysning ───────────────────────────────────────────────────────────── */

const lumenTool: AgentTool = {
  name: "berakna_lumenbehov",
  description:
    "Räknar ut hur många lumen ett rum behöver i allmänbelysning, och hur många lampor det motsvarar. Utgår från rummets yta och vad rummet används till. Svaret gäller allmänbelysning; arbetsytor som köksbänk och skrivbord behöver egen belysning utöver det.",
  inputSchema: {
    type: "object",
    properties: {
      rum: {
        type: "string",
        enum: LUMEN_ROOMS.map((r) => r.key),
        description: "Rumstyp. Avgör hur många lumen per kvadratmeter som gäller.",
      },
      ytaKvm: {
        type: "number",
        description: "Rummets golvyta i kvadratmeter.",
      },
    },
    required: ["rum", "ytaKvm"],
  },
  run(args) {
    const need = lumenNeed(readString(args, "rum", "vardagsrum"), readNumber(args, "ytaKvm", 0));

    if (!need.area) {
      return "Ange rummets yta i kvadratmeter för att få ett svar.";
    }

    const options = BULB_OUTPUTS.map(
      (output) => `${lampCount(need, output)} st på ${nf.format(output)} lm`,
    ).join(", ");

    return [
      `${need.room.label} på ${nf.format(need.area)} kvm behöver ${nf.format(need.min)}–${nf.format(need.max)} lumen totalt i allmänbelysning.`,
      `Det motsvarar ${options}.`,
      "Fördela ljuset på flera punkter i rummet hellre än på en stark lampa i taket: ljus från flera håll ger färre hårda skuggor. Talen gäller allmänbelysning, så köksbänk och skrivbord behöver egen lampa utöver detta.",
      `Mer, och räknaren i webbläsaren: ${toolUrl("lumenraknare")}`,
    ].join("\n\n");
  },
};

const babyMonitorRangeTool: AgentTool = {
  name: "rackvidd_babyvakt",
  description:
    "Räknar om en babyvakts angivna räckvidd i fri sikt till ungefär vad den når genom väggar i en bostad. Tillverkarna anger alltid fri sikt, alltså utomhus utan hinder, och de fyra som publicerar båda talen landar på ungefär en sjättedel inomhus.",
  inputSchema: {
    type: "object",
    properties: {
      meter: {
        type: "number",
        description:
          "Tillverkarens angivna räckvidd i meter, fri sikt. Vanliga värden är 300, 450, 460, 800 och 1 000.",
      },
      byggnad: {
        type: "string",
        enum: BUILD_FACTORS.map((b) => b.key),
        description:
          "Vad väggarna är gjorda av. latt = gips och trä, blandat = betongbjälklag mellan våningarna, tungt = betong, tegel eller plåtreglar. Utelämna för latt.",
      },
    },
    required: ["meter"],
  },
  run(args) {
    const meter = readNumber(args, "meter", 800);
    const byggnad = typeof args?.byggnad === "string" ? args.byggnad : "latt";
    const r = indoorRange(meter, byggnad);

    if (r.indoor <= 0) {
      return "Ange tillverkarens räckviddstal i meter, till exempel 800.";
    }

    const grund = PUBLISHED_PAIRS.map(
      (p) =>
        `${p.product}: ${p.indoor} m inomhus mot ${p.lineOfSight} m i fri sikt`,
    ).join("\n");

    return [
      `${nf.format(r.lineOfSight)} meter i fri sikt motsvarar omkring ${nf.format(r.indoor)} meter genom väggar av ${r.build.label.toLowerCase()}.`,
      reachVerdict(r.indoor),
      `Kvoten kommer från de fyra tillverkare som publicerar båda talen:\n${grund}`,
      "Talen är tillverkarnas egna uppgifter. Ingen oberoende provning har mätt räckvidd i svenska bostäder, och ingen tillverkare anger vilken sorts vägg de mätt genom. Använd resultatet som en storleksordning.",
      `Mer, och räknaren i webbläsaren: ${toolUrl("rackvidd-babyvakt")}`,
    ].join("\n\n");
  },
};

const vacuumRuntimeTool: AgentTool = {
  name: "drifttid_skaftdammsugare",
  description:
    "Räknar om en skaftdammsugares angivna drifttid till vad batteriet räcker till i det läge användaren faktiskt städar i. Minuttalet på kartongen gäller ekoläget, hos flera tillverkare dessutom ett tillbehör utan motor. De fem som publicerar båda talen landar på ungefär en fjärdedel i turboläge.",
  inputSchema: {
    type: "object",
    properties: {
      minuter: {
        type: "number",
        description:
          "Tillverkarens angivna drifttid i minuter, alltså ekoläget. Vanliga värden är 40, 45, 60, 80 och 90.",
      },
      lage: {
        type: "string",
        enum: VACUUM_MODES.map((m) => m.key),
        description:
          "Läget städningen sker i. eko = hårt golv och lite damm, auto = blandat underlag, turbo = matta, djurhår och damm i golvspringor. Utelämna för turbo.",
      },
    },
    required: ["minuter"],
  },
  run(args) {
    const minuter = readNumber(args, "minuter", 60);
    const lage = typeof args?.lage === "string" ? args.lage : "turbo";
    const r = runtimeInMode(minuter, lage);

    if (r.minutes <= 0) {
      return "Ange tillverkarens drifttid i minuter, till exempel 60.";
    }

    const grund = VACUUM_PAIRS.map(
      (p) => `${p.product}: ${p.turbo} min i turboläge mot ${p.eco} min i ekoläge`,
    ).join("\n");

    return [
      `${nf.format(r.stated)} minuter i ekoläge motsvarar omkring ${r.minutes} minuter i ${r.mode.label.toLowerCase()}, vilket räcker till omkring ${nf.format(r.area)} kvadratmeter.`,
      areaVerdict(r.area),
      `Kvoten kommer från de fem tillverkare som publicerar båda talen:\n${grund}`,
      "Ytan bygger på 3,3 kvadratmeter i minuten, vilket är vad Dreame och Philips själva anger för en laddning i ekoläge.",
      "Talen är tillverkarnas egna uppgifter. Vi har inte kört någon av maskinerna. Använd resultatet som en storleksordning inför köpet.",
      `Mer, och räknaren i webbläsaren: ${toolUrl("drifttid-skaftdammsugare")}`,
    ].join("\n\n");
  },
};

const oilCostTool: AgentTool = {
  name: "oljekostnad_fritos",
  description:
    "Räknar ut vad oljan i en oljefritös kostar per år och per portion. Litertalet på kartongen är oljan som köps och slängs, inte maten maskinen gör, och oljan ska bytas efter fem till sju omgångar enligt Test-Achats och Tefal.",
  inputSchema: {
    type: "object",
    properties: {
      liter: {
        type: "number",
        description:
          "Oljemängden fritösen tar, i liter. Vanliga värden är 1,8, 2, 3 och 5.",
      },
      gangerPerAr: {
        type: "number",
        description:
          "Hur många gånger per år användaren friterar. 12 är en gång i månaden, 26 varannan vecka, 52 varje vecka.",
      },
      filtrering: {
        type: "string",
        enum: OIL_FILTERING.map((f) => f.key),
        description:
          "Vad maskinen gör med oljan. ingen = varken filter eller kallzon, kallzon = kallzon utan filter, filter = fast oljefilter, automatisk = filtrering som silar och lagrar oljan. Utelämna för ingen.",
      },
      oljepris: {
        type: "number",
        description:
          "Kronor per liter olja. Utelämna för 30, vilket är rapsolja i femlitersdunk.",
      },
    },
    required: ["liter", "gangerPerAr"],
  },
  run(args) {
    const liter = readNumber(args, "liter", 3);
    const gangerPerAr = readNumber(args, "gangerPerAr", 26);
    const filtrering =
      typeof args?.filtrering === "string" ? args.filtrering : "ingen";
    const oljepris = readNumber(args, "oljepris", 30);
    const r = oilCost(liter, gangerPerAr, filtrering, oljepris);

    if (r.costPerYear <= 0) {
      return "Ange hur många liter olja fritösen tar och hur många gånger per år du friterar, till exempel 3 liter och 26 gånger.";
    }

    const grund = OIL_ADVICE.map(
      (a) => `${a.source}: byt efter ${a.advice}`,
    ).join("\n");

    return [
      `${r.litres} liter olja och ${r.batchesPerYear} friteringar per år ger omkring ${nf.format(r.costPerYear)} kronor i olja per år, alltså ${r.costPerBatch} kronor varje gång du friterar.`,
      `Det blir ${r.litresPerYear} liter fördelat på ${r.fillsPerYear} oljebyten, räknat på ${r.batchesPerFill} omgångar per fyllning med ${r.filtering.label.toLowerCase()}.`,
      costVerdict(r.costPerYear),
      `Bytesintervallet kommer från två oberoende källor:\n${grund}`,
      "Litertalet är oljemängden och inte matmängden. Tefal Easy Pro, Princess 182727 och Severin FR 2431 tar alla tre 3 liter och friterar 1,2 kilo, 600 gram respektive 400 gram mat.",
      "Hur många extra omgångar ett filter ger är vår uppskattning och inget publicerat tal. Använd resultatet som en storleksordning när du väger två maskiner mot varandra.",
      `Mer, och räknaren i webbläsaren: ${toolUrl("oljekostnad-fritos")}`,
    ].join("\n\n");
  },
};

const wattLumenTool: AgentTool = {
  name: "watt_till_lumen",
  description:
    "Översätter en gammal glödlampas watt till det ljusflöde i lumen som en LED behöver för att ersätta den. Watt mäter strömförbrukning, inte ljus, vilket är hela skälet till att sambandet försvann när glödlampan gjorde det.",
  inputSchema: {
    type: "object",
    properties: {
      watt: {
        type: "number",
        description:
          "Glödlampans effekt i watt. Vanliga värden är 25, 40, 60, 75, 100 och 150.",
      },
    },
    required: ["watt"],
  },
  run(args) {
    const row = nearestWattRow(readNumber(args, "watt", 60));
    const table = WATT_LUMEN_ROWS.map(
      (r) => `${r.watt} W motsvarar ${nf.format(r.lumen)} lm`,
    ).join("\n");

    return [
      `En glödlampa på ${row.watt} W motsvarar ungefär ${nf.format(row.lumen)} lumen. ${row.use}.`,
      `Hela tabellen:\n${table}`,
      "En LED på 9 W ger ungefär lika mycket ljus som en glödlampa på 60 W. Leta efter lumen på förpackningen, inte watt.",
      `Mer: ${toolUrl("watt-till-lumen")}`,
    ].join("\n\n");
  },
};

const kelvinTool: AgentTool = {
  name: "valj_fargtemperatur",
  description:
    "Säger vilken färgtemperatur i kelvin som passar ett rum, eller vad ett givet kelvintal betyder i praktiken. Lågt tal är varmt och gulaktigt, högt är kallt och blåaktigt.",
  inputSchema: {
    type: "object",
    properties: {
      rum: {
        type: "string",
        enum: Object.keys(KELVIN_BY_ROOM),
        description:
          "Rumstyp, när frågan är vilken färgtemperatur som passar. Utelämna om du i stället anger kelvin.",
      },
      kelvin: {
        type: "number",
        description:
          "Färgtemperatur i kelvin mellan 2000 och 6500, när frågan är vad ett tal betyder.",
      },
    },
  },
  run(args) {
    const room = readString(args, "rum");
    const kelvin =
      room && room in KELVIN_BY_ROOM
        ? KELVIN_BY_ROOM[room]
        : readNumber(args, "kelvin", 2700);
    const note = kelvinNote(kelvin);

    const lead = room
      ? `För ${room} är ${nf.format(kelvin)} K en rimlig färgtemperatur.`
      : `${nf.format(kelvin)} K kallas ${note.name.toLowerCase()}.`;

    return [
      `${lead} ${note.name}: ${note.use}`,
      "Färgtemperaturen säger ingenting om hur bra färger återges. Det är färgåtergivningen, CRI eller Ra, och den vill du ha över 90 där du lagar mat eller sminkar dig.",
      `Skjutreglaget som visar hur talen ser ut: ${toolUrl("fargtemperatur")}`,
    ].join("\n\n");
  },
};

/* ─── Elkostnad ───────────────────────────────────────────────────────────── */

type CostVariant = {
  slug: string;
  name: string;
  description: string;
  unit: string;
  defaults: { count: number; hours: number; watt: number; standby: number };
  /** Rad om viloläget, anpassad efter vad som faktiskt drar ström. */
  standbyNote: string;
};

/**
 * Tre tool pages delar en räknare och skiljer sig bara i utgångsvärden och
 * ord. Verktygen görs därför i en fabrik: samma matematik, olika inramning.
 */
function costTool(variant: CostVariant): AgentTool {
  return {
    name: variant.name,
    description: variant.description,
    inputSchema: {
      type: "object",
      properties: {
        antal: { type: "number", description: `Antal ${variant.unit}.` },
        effektW: {
          type: "number",
          description: "Effekt i watt per enhet när den är på.",
        },
        timmarPerDygn: {
          type: "number",
          description: "Antal timmar per dygn enheten är på. Mellan 0 och 24.",
        },
        viloforbrukningW: {
          type: "number",
          description:
            "Viloförbrukning i watt per enhet, alltså vad den drar de timmar den inte är på.",
        },
        elprisKrPerKwh: {
          type: "number",
          description:
            "Totalt elpris i kronor per kWh inklusive nätavgift, skatt och moms. Utelämna för att räkna på 2 kr.",
        },
      },
      required: ["antal", "effektW", "timmarPerDygn"],
    },
    run(args) {
      const result = runningCost({
        count: readNumber(args, "antal", variant.defaults.count),
        hours: readNumber(args, "timmarPerDygn", variant.defaults.hours),
        watt: readNumber(args, "effektW", variant.defaults.watt),
        standby: readNumber(args, "viloforbrukningW", variant.defaults.standby),
        price: readNumber(args, "elprisKrPerKwh", DEFAULT_PRICE),
      });

      return [
        `Total elkostnad: ${kr.format(result.totalCost)} per år, alltså ${kwh.format(result.totalKwh)} kWh.`,
        `När enheterna är på: ${kr.format(result.onCost)} (${kwh.format(result.onKwh)} kWh). I viloläge: ${kr.format(result.standbyCost)} (${kwhDetailed.format(result.standbyKwh)} kWh), vilket är ${kwh.format(result.standbyShare)} procent av förbrukningen.`,
        variant.standbyNote,
        `Räknaren med egna värden: ${toolUrl(variant.slug)}`,
      ].join("\n\n");
    },
  };
}

const bulbCostTool = costTool({
  slug: "elkostnad-lampor",
  name: "elkostnad_belysning",
  description:
    "Räknar ut vad belysningen kostar i el per år, inklusive den ström smarta lampor drar i viloläge de timmar de är släckta.",
  unit: "lampor",
  defaults: { count: 8, hours: 4, watt: 9, standby: 0.3 },
  standbyNote:
    "Viloförbrukningen är räknad på 0,3 W per lampa, mitten av det intervall oberoende mätningar rapporterar för wifi- och zigbee-lampor. Viloläget kostar sällan mycket i kronor, men andelen växer ju mindre du använder lampan.",
});

const plugCostTool = costTool({
  slug: "elkostnad-uttag",
  name: "elkostnad_smart_uttag",
  description:
    "Räknar ut vad ett eller flera smarta uttag kostar i el per år, inklusive den ström uttaget självt drar dygnet runt. Viloförbrukningen skiljer fem gånger mellan produkterna, så den är värd att ange.",
  unit: "smarta uttag",
  defaults: { count: 6, hours: 3, watt: 1000, standby: 1.48 },
  standbyNote:
    "Viloförbrukningen räknas på 1,48 W om inget annat anges, vilket är TP-Links egen uppgift för Tapo P100 och det högsta värdet vi hittat. Plejd anger 0,3 W för SPR-01. Flera tillverkare anger ingen siffra alls, och då är 1 W en rimlig gissning.",
});

const christmasCostTool = costTool({
  slug: "elkostnad-julbelysning",
  name: "elkostnad_julbelysning",
  description:
    "Räknar ut vad ljusslingorna kostar i el, och vad en timer sparar. Ange antal slingor, effekt per slinga och hur många timmar de lyser.",
  unit: "ljusslingor",
  defaults: { count: 15, hours: 8, watt: 5, standby: 0 },
  standbyNote:
    "En mekanisk timer drar ingenting mätbart och räknas därför som 0 W. Ska du räkna på en smart plugg i stället är runt 1 W dygnet runt en rimlig siffra.",
});

/* ─── Säkerhet ────────────────────────────────────────────────────────────── */

const paybackTool: AgentTool = {
  name: "aterbetalning_vattenfelsbrytare",
  description:
    "Räknar ut hur många år försäkringsrabatten behöver för att betala en vattenfelsbrytare. Länsförsäkringar och Folksam ger båda tio procents rabatt på villaförsäkringen för en godkänd vattenfelsbrytare. Svaret blir oftast att rabatten inte räcker som skäl, och det är ett riktigt svar.",
  inputSchema: {
    type: "object",
    properties: {
      villapremieKrPerAr: {
        type: "number",
        description: "Villaförsäkringens premie i kronor per år.",
      },
      rabattProcent: {
        type: "number",
        description:
          "Rabatt i procent. Utelämna för att räkna på tio procent, vilket är vad båda bolagen ger.",
      },
      kostnadKr: {
        type: "number",
        description:
          "Vad vattenfelsbrytaren kostar installerad. Utelämna för att räkna på 8 000 kr, mitten av Länsförsäkringars eget spann.",
      },
    },
    required: ["villapremieKrPerAr"],
  },
  run(args) {
    const premium = readNumber(args, "villapremieKrPerAr", 0);
    const { yearly, years, verdict } = insurancePayback(
      premium,
      readNumber(args, "rabattProcent", DEFAULT_DISCOUNT),
      readNumber(args, "kostnadKr", DEFAULT_COST),
    );

    if (years === Infinity) {
      return "Ange villapremien per år för att få en återbetalningstid.";
    }

    const time =
      years >= 100 ? "över 100 år" : `${years.toFixed(years < 10 ? 1 : 0)} år`;

    return [
      `Återbetalningstid: ${time}. Rabatten är ${kr.format(yearly)} per år, alltså ${kr.format(yearly * 10)} på tio år.`,
      verdict,
      `Den verkliga besparingen ligger i en undviken skada, inte i premien. Självrisken vid en vattenskada är ${kr.format(EXCESS_LOW)} till ${kr.format(EXCESS_HIGH)}, och åldersavdraget ovanpå det. Vi räknar inte fram någon förväntad besparing av det, eftersom det skulle kräva en påhittad skadefrekvens.`,
      "Rabatten kräver en godkänd vattenfelsbrytare, alltså inte ett vattenlarm. Ett vattenlarm sänker inte premien alls, men kan spara dig självrisken.",
      `Räknaren och källorna: ${toolUrl("aterbetalning-vattenfelsbrytare")}`,
    ].join("\n\n");
  },
};

const coLevelTool: AgentTool = {
  name: "co_halt_betydelse",
  description:
    "Säger vad en given kolmonoxidhalt i ppm gör med en människa, och vad EN 50291 kräver av varnaren vid den halten. Standarden anger både hur sent varnaren får larma och, vid låga halter, hur tidigt den får göra det.",
  inputSchema: {
    type: "object",
    properties: {
      ppm: {
        type: "number",
        description:
          "Kolmonoxidhalt i miljondelar. Tabellerade halter är 30, 50, 100, 200, 300, 400, 800 och 1600.",
      },
    },
    required: ["ppm"],
  },
  run(args) {
    const asked = readNumber(args, "ppm", 50);
    const level = nearestCoLevel(asked);

    /* Frågas det om en halt som inte står i tabellen svarar vi om närmaste rad,
       och säger att vi gör det. Ett svar om 100 ppm på en fråga om 75 ser
       annars ut som ett svar om 75. */
    const snapped =
      Math.round(asked) !== level.ppm
        ? `Du frågade om ${nf.format(Math.round(asked))} ppm. Tabellen anger publicerade riktvärden vid bestämda halter, så svaret nedan gäller närmaste tabellerade halt, ${level.ppm} ppm. Vid lika avstånd svarar vi på den högre.`
        : "";

    const gap = level.silentFor
      ? `Luckan värd att känna till: vid ${level.ppm} ppm ska varnaren vara tyst de första ${level.silentFor} minuterna. En läcka på den nivån kan alltså pågå i ${formatDuration(level.silentFor)} utan att något hörs. Det är därför en varnare med display är värd något: talet syns långt innan ljudet kommer.`
      : "";

    return [
      snapped,
      `Vid ${level.ppm} ppm: ${level.alarm.toLowerCase()}.`,
      `Vad som händer med en människa: ${level.effect}`,
      gap,
      "Talen gäller friska vuxna. Barn, gravida, äldre och personer med hjärt- eller lungsjukdom påverkas vid lägre halter och tidigare. Tabellen är inte en tid du kan stanna kvar: larmar varnaren ska du gå ut och ringa 112.",
      `Hela skalan och källorna: ${toolUrl("co-halt-larmgrans")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
  },
};

/* ─── Smart hem ───────────────────────────────────────────────────────────── */

const protocolTool: AgentTool = {
  name: "valj_protokoll_smart_hem",
  description:
    "Rekommenderar protokoll för ett smart hem: wifi, Zigbee eller Matter över Thread. Avgörs av hur många enheter som planeras, väggarnas material, om det redan finns en Thread border router och om användaren vill köpa en hubb.",
  inputSchema: {
    type: "object",
    properties: {
      antalEnheter: {
        type: "string",
        enum: ["few", "many"],
        description:
          "few för under tio enheter, many för tio eller fler. Över tio slutar ett mesh-nät vara valfritt.",
      },
      harBorderRouter: {
        type: "string",
        enum: ["yes", "no", "unsure"],
        description:
          "Om hemmet har en HomePod, Apple TV 4K, nyare Nest Hub, Echo eller Dirigera, som alla fungerar som Thread border router.",
      },
      vaggar: {
        type: "string",
        enum: ["light", "concrete"],
        description: "light för gips eller trä, concrete för betong eller tegel.",
      },
      villKopaHubb: {
        type: "string",
        enum: ["yes", "no"],
        description: "Om användaren är beredd att köpa en brygga eller hubb.",
      },
    },
    required: ["antalEnheter", "harBorderRouter", "vaggar", "villKopaHubb"],
  },
  run(args) {
    const answers = {
      scale: readString(args, "antalEnheter") as ProtocolAnswers["scale"],
      thread: readString(args, "harBorderRouter") as ProtocolAnswers["thread"],
      walls: readString(args, "vaggar") as ProtocolAnswers["walls"],
      hub: readString(args, "villKopaHubb") as ProtocolAnswers["hub"],
    };

    const verdict = decideProtocol(answers);
    if (!verdict) {
      return "Alla fyra frågorna behöver besvaras: antal enheter, border router, väggmaterial och om en hubb får köpas.";
    }

    return [
      `Rekommendation: ${verdict.protocol}.`,
      verdict.why,
      verdict.caveat ? `Att veta: ${verdict.caveat}` : "",
      `Väljaren med alla svar: ${toolUrl("protokollvaljare-smart-hem")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
  },
};

/**
 * Luftklustrets verktyg. Svarar med råd och en kategoriadress, aldrig med en
 * produkt, ett pris eller en butik.
 *
 * Det enda verktyget på sajten som ofta svarar att frågeställaren inte ska
 * köpa någonting, och det är avsiktligt: utan uppmätt luftfuktighet finns
 * inget underlag för ett köpråd, och mellan 30 och 45 procent finns inget
 * problem att lösa.
 */
const airApplianceTool: AgentTool = {
  name: "vilken_luftapparat",
  description:
    "Avgör om ett problem med inomhusluften löses av en luftrenare, en luftfuktare, en avfuktare eller ingen av dem. Utgår från uppmätt relativ luftfuktighet, vilket besvär det gäller och vilket utrymme. Svarar att man ska mäta först när luftfuktigheten är okänd, och att ingen apparat behövs mellan 30 och 45 procent.",
  inputSchema: {
    type: "object",
    properties: {
      besvar: {
        type: "string",
        enum: AIR_SYMPTOMS.map((s) => s.key),
        description:
          "Vad som besvärar. torr är torr luft och statisk elektricitet, fukt är kondens och mögellukt, damm är partiklar, pollen och allergi, tvatt är tvätt som inte torkar inomhus.",
      },
      luftfuktighet: {
        type: "string",
        enum: AIR_MEASURED.map((m) => m.key),
        description:
          "Uppmätt relativ luftfuktighet. omatt är ett giltigt och vanligt svar, och ger råd om att mäta i stället för ett köpråd.",
      },
      utrymme: {
        type: "string",
        enum: AIR_PLACES.map((p) => p.key),
        description:
          "Vilket utrymme det gäller. kallt betyder krypgrund, garage eller vind, där de flesta kondensavfuktare slutar fungera.",
      },
    },
    required: ["besvar", "luftfuktighet", "utrymme"],
  },
  run(args) {
    const verdict = decideAirAppliance({
      symptom: readString(args, "besvar") as AirSymptomKey,
      measured: readString(args, "luftfuktighet") as AirMeasuredKey,
      place: readString(args, "utrymme") as AirPlaceKey,
    });
    if (!verdict) {
      return "Ange besvar, luftfuktighet och utrymme. Har luftfuktigheten inte mätts, skicka omatt.";
    }

    return [
      `${verdict.headline}.`,
      verdict.why,
      `${verdict.needsMeasurement ? "Gör så här" : "Innan du köper"}: ${verdict.first}`,
      verdict.page
        ? `Jämförelsen med produkterna: ${SITE.url}${verdict.page}`
        : "Ingen av våra tre jämförelser löser det här problemet, så det finns inget att köpa.",
      `Väljaren med alla svar: ${toolUrl("vilken-luftapparat")}`,
    ].join("\n\n");
  },
};

const cableNeedTool: AgentTool = {
  name: "vilken_usb_c_kabel",
  description:
    "Översätter vad en USB-C-kabel ska användas till till de tal som står på förpackningen: watt, gigabit, e-marker och om kabeln behöver DisplayPort Alt Mode. Kontakten ser likadan ut i hela kategorin, så två kablar som inte går att skilja åt på hyllan kan skilja 83 gånger i datahastighet. Svarar att den billigaste kabeln duger när uppgiften bara är att ladda en telefon.",
  inputSchema: {
    type: "object",
    properties: {
      uppgift: {
        type: "string",
        enum: CABLE_TASKS.map((t) => t.key),
        description:
          "Vad kabeln ska göra. skarm betyder koppla in en bildskärm, filer betyder extern disk eller kamera.",
      },
      effekt: {
        type: "string",
        enum: CABLE_POWER.map((p) => p.key),
        description:
          "Vad som ska laddas. under60 täcker telefon och platta, over100 en större laptop. vetinte ger det säkra svaret.",
      },
      langd: {
        type: "string",
        enum: CABLE_LENGTHS.map((l) => l.key),
        description:
          "Hur lång kabeln behöver vara. lang betyder tre meter eller mer, där passiva kablar börjar tappa datahastighet.",
      },
    },
    required: ["uppgift", "effekt", "langd"],
  },
  run(args) {
    const verdict = decideCable({
      task: readString(args, "uppgift") as CableTaskKey,
      power: readString(args, "effekt") as CablePowerKey,
      length: readString(args, "langd") as CableLengthKey,
    });
    if (!verdict) {
      return "Ange uppgift, effekt och langd. Är effekten okänd, skicka vetinte.";
    }

    return [
      `${verdict.headline}.`,
      `Leta efter: ${verdict.requirements.join(" · ")}`,
      verdict.why,
      `Se upp med: ${verdict.watch}`,
      `Jämförelsen med produkterna: ${SITE.url}/usb-c-kabel`,
      `Väljaren med alla svar: ${toolUrl("vilken-usb-c-kabel")}`,
    ].join("\n\n");
  },
};

const coNeedTool: AgentTool = {
  name: "behover_kolmonoxidvarnare",
  description:
    "Svarar på om en bostad behöver kolmonoxidvarnare, hur många och var de ska sitta, samt vilken del av EN 50291 varnaren måste ange. Kolmonoxid bildas bara där något förbränns, så svaret blir nej i en bostad med enbart el, fjärrvärme eller bergvärme.",
  inputSchema: {
    type: "object",
    properties: {
      kallor: {
        type: "array",
        items: { type: "string", enum: CO_SOURCES.map((s) => s.key) },
        description:
          "Förbränningskällor i bostaden. Tom lista betyder ingen känd källa, vilket är ett giltigt svar och inte ett ofullständigt.",
      },
      bostad: {
        type: "string",
        enum: CO_PLACES.map((p) => p.key),
        description:
          "Typ av bostad. fordon gäller husvagn, husbil och båt, där standardens del 2 krävs.",
      },
    },
    required: ["bostad"],
  },
  run(args) {
    const raw = Array.isArray(args.kallor) ? args.kallor : [];
    const valid = new Set(CO_SOURCES.map((s) => s.key as string));
    const sources = raw.filter(
      (s): s is CoSourceKey => typeof s === "string" && valid.has(s),
    );

    const verdict = decideCoNeed(
      sources,
      readString(args, "bostad") as CoPlaceKey,
    );
    if (!verdict) {
      return "Ange bostadstyp: lagenhet, villa, fritidshus eller fordon.";
    }

    return [
      `${verdict.headline}.`,
      verdict.why,
      `Placering: ${verdict.placement}`,
      verdict.needsPart2
        ? "Kravet att kontrollera i butiken: varnaren ska ange EN 50291-2 i gällande utgåva. En som bara anger del 1 är inte provad för fordon."
        : "Kravet att kontrollera i butiken: varnaren ska ange EN 50291-1 i gällande utgåva.",
      verdict.noSource
        ? `Brandskydd som faktiskt gör nytta i din bostad: ${SITE.url}/brandvarnare`
        : `Varnare som uppfyller kravet: ${SITE.url}/kolmonoxidvarnare`,
      `Väljaren med alla svar: ${toolUrl("behover-du-kolmonoxidvarnare")}`,
    ].join("\n\n");
  },
};

const switchInstallTool: AgentTool = {
  name: "far_jag_installera_strombrytare",
  description:
    "Säger vilken sorts smart strömbrytare som fungerar i en viss dosa, och vad Elsäkerhetsverkets regler tillåter en privatperson att göra själv. Att byta en befintlig strömbrytare är tillåtet för den som vet hur. Att lägga in en relämodul i dosan är en ändring av den fasta installationen och kräver ett registrerat elinstallationsföretag.",
  inputSchema: {
    type: "object",
    properties: {
      nolledare: {
        type: "string",
        enum: NEUTRAL_OPTIONS.map((o) => o.key),
        description:
          "Om det finns nolledare i dosan. vetej är ett giltigt svar. Utan nolla faller alla relämoduler bort.",
      },
      befintligKnapp: {
        type: "string",
        enum: KEEP_OPTIONS.map((o) => o.key),
        description:
          "behall om den befintliga knappen ska sitta kvar, byt om den får bytas ut.",
      },
      vemInstallerar: {
        type: "string",
        enum: WHO_OPTIONS.map((o) => o.key),
        description: "sjalv eller elektriker. Avgör vad reglerna tillåter.",
      },
    },
    required: ["nolledare", "befintligKnapp", "vemInstallerar"],
  },
  run(args) {
    const verdict = decideInstallation(
      readString(args, "nolledare") as NeutralKey,
      readString(args, "befintligKnapp") as KeepKey,
      readString(args, "vemInstallerar") as WhoKey,
    );

    if (!verdict) {
      return "Alla tre frågorna behöver besvaras: nolledare i dosan, om knappen ska sitta kvar och vem som installerar.";
    }

    return [
      `${verdict.headline}.`,
      `Vad reglerna säger: ${verdict.legal}`,
      verdict.why,
      verdict.warning ? `Varning: ${verdict.warning}` : "",
      `Produkter av rätt typ: ${SITE.url}/smart-strombrytare`,
      `Guiden med alla svar: ${toolUrl("installationsguide-strombrytare")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
  },
};

const plugLoadTool: AgentTool = {
  name: "klarar_smart_plugg_lasten",
  description:
    "Säger om en smart plugg klarar en viss apparat: om 10 eller 16 ampere krävs, vilken kapslingsklass platsen kräver och vilken drifttemperatur som behövs. Induktiva laster som pumpar, fläktar och kylar kräver 16 A oavsett märkeffekt, eftersom startströmmen inte syns i märkningen.",
  inputSchema: {
    type: "object",
    properties: {
      apparat: {
        type: "string",
        enum: PLUG_LOADS.map((l) => l.key),
        description:
          "Vad som ska kopplas in. Använd eget när effekten anges separat.",
      },
      plats: {
        type: "string",
        enum: PLUG_PLACES.map((p) => p.key),
        description:
          "Var uttaget sitter. Avgör kapslingsklass och drifttemperatur.",
      },
      effektW: {
        type: "number",
        description: "Apparatens effekt i watt. Krävs bara när apparat är eget.",
      },
    },
    required: ["apparat", "plats"],
  },
  run(args) {
    const verdict = decidePlugLoad(
      readString(args, "apparat") as PlugLoadKey,
      readString(args, "plats") as PlugPlaceKey,
      readNumber(args, "effektW", 0),
    );

    if (!verdict) return "Ange både apparat och plats.";

    return [
      `Ström: ${verdict.amp}.`,
      `Kapsling: ${verdict.ip}. Temperatur: ${verdict.temp}.`,
      verdict.why,
      verdict.warning ? `Varning: ${verdict.warning}` : "",
      `Pluggar som klarar kravet: ${SITE.url}/smart-plug`,
      `Effektkollen med alla svar: ${toolUrl("effektkoll-smart-plug")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
  },
};

const leakSensorTool: AgentTool = {
  name: "valj_vattenlarm",
  description:
    "Säger vilken sorts vattenlarm som räcker: en ren siren, ett som når telefonen via wifi, eller en sensor till en hubb som redan finns. Avgörs av var larmet ska ligga, hur ofta bostaden står tom och vilken hubb användaren äger.",
  inputSchema: {
    type: "object",
    properties: {
      plats: {
        type: "string",
        enum: LEAK_PLACES.map((p) => p.key),
        description:
          "Var larmet ska ligga. trangt kräver lös sond, beredare kräver högre godkänd temperatur.",
      },
      narvaro: {
        type: "string",
        enum: LEAK_PRESENCE.map((p) => p.key),
        description:
          "Hur ofta bostaden står tom. Är någon nästan alltid hemma hörs en siren, och då behövs ingen uppkoppling.",
      },
      hubb: {
        type: "string",
        enum: LEAK_HUBS.map((h) => h.key),
        description: "Hubb som redan finns i hemmet, eller ingen.",
      },
    },
    required: ["plats", "narvaro", "hubb"],
  },
  run(args) {
    const verdict = decideLeakSensor(
      readString(args, "plats") as LeakPlaceKey,
      readString(args, "narvaro") as LeakPresenceKey,
      readString(args, "hubb") as LeakHubKey,
    );

    if (!verdict) {
      return "Alla tre frågorna behöver besvaras: plats, närvaro och hubb.";
    }

    const criteria = [
      verdict.needsApp ? "larmet ska nå telefonen" : "en siren räcker",
      verdict.needsTightSpots ? "lös sond eller kabel krävs" : "",
      verdict.needsHotSpot ? "godkänd för över 40 grader" : "",
      verdict.ownedHub ? `passar din ${verdict.ownedHub}-hubb` : "",
    ].filter(Boolean);

    return [
      `${verdict.headline}.`,
      verdict.why,
      verdict.warning ? `Att veta: ${verdict.warning}` : "",
      `Kraven att filtrera på: ${criteria.join(", ")}.`,
      `Larm som uppfyller dem: ${SITE.url}/vattenlarm`,
      `Väljaren med alla svar: ${toolUrl("vattenlarmsvaljare")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
  },
};

const walletFolioTool: AgentTool = {
  name: "valj_planboksfodral",
  description:
    "Sager vilket uppfallbart planboksfodral till iPhone som racker, utifran hur anvandaren laddar, vad som ska fa plats och hur lange fodralet ska halla. Svarar aven att kombinationen inte finns, vilket ar kategorins centrala avvagning: inget fodral kombinerar en hel planbok med tradlos laddning.",
  inputSchema: {
    type: "object",
    properties: {
      laddning: {
        type: "string",
        enum: FOLIO_CHARGING.map((o) => o.key),
        description:
          "Hur telefonen laddas. magnet kraver magnetring, platta kraver att laddningen fungerar genom fodralet, sladd staller inga krav.",
      },
      kapacitet: {
        type: "string",
        enum: FOLIO_CAPACITY.map((o) => o.key),
        description:
          "Vad som ska fa plats. kort ger minst 3 kortfack, planbok ger minst 9, och mynt-varianterna kraver dessutom myntfack.",
      },
      livslangd: {
        type: "string",
        enum: FOLIO_LIFESPAN.map((o) => o.key),
        description:
          "Hur lange fodralet ska halla. lange kraver garvat lader i stallet for laderimitation.",
      },
    },
    required: ["laddning", "kapacitet", "livslangd"],
  },
  run(args) {
    const verdict = decideFolio(
      readString(args, "laddning") as FolioChargingKey,
      readString(args, "kapacitet") as FolioCapacityKey,
      readString(args, "livslangd") as FolioLifespanKey,
    );

    if (!verdict) {
      return "Ange hur du laddar, vad som ska fa plats och hur lange fodralet ska halla for att fa ett svar.";
    }

    const criteria = [
      verdict.needsMagnetRing
        ? "magnetring, inte bara tradlos laddning"
        : verdict.needsWireless
          ? "laddning genom fodralet"
          : "laddning behover inte styra valet",
      `minst ${verdict.minCards} kortfack`,
      verdict.needsCoinPocket ? "myntfack" : "",
      verdict.needsRealLeather ? "garvat lader" : "",
    ].filter(Boolean);

    return [
      `${verdict.headline}.`,
      verdict.why,
      verdict.warning ? `Att veta: ${verdict.warning}` : "",
      `Kraven att filtrera pa: ${criteria.join(", ")}.`,
      `Om kombinationen inte gar ihop: ${folioEmptyReason(verdict)}`,
      `Fodral som uppfyller dem: ${SITE.url}/iphone-fodral`,
      `Valjaren med alla svar: ${toolUrl("planboksfodralvaljare")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
  },
};

const caseTypeTool: AgentTool = {
  name: "valj_iphone_skal",
  description:
    "Säger vilken sorts iPhone-skal som räcker: hybridskal med förstärkta hörn, tunt skal med kant runt kameran, eller det billigaste som finns. Avgörs av var telefonen är, om den laddas magnetiskt och hur skalet ska se ut. Frågar aldrig efter fallhöjd eller militärstandard, eftersom de talen inte går att jämföra mellan tillverkare.",
  inputSchema: {
    type: "object",
    properties: {
      anvandning: {
        type: "string",
        enum: CASE_USES.map((o) => o.key),
        description:
          "Var telefonen är mest. ute kräver förstärkta hörn, ficka kräver kant runt kameran, hemma kräver ingetdera.",
      },
      laddning: {
        type: "string",
        enum: CASE_CHARGING.map((o) => o.key),
        description:
          "Hur telefonen laddas. magnet kräver en riktig magnetring; en metallplatta för bilhållare duger inte, eftersom den inte laddar.",
      },
      utseende: {
        type: "string",
        enum: CASE_LOOKS.map((o) => o.key),
        description:
          "Vad som ska synas. klar ger genomskinliga skal, matt ger matta, frostade, läder och robusta, egal begränsar inte urvalet.",
      },
    },
    required: ["anvandning", "laddning", "utseende"],
  },
  run(args) {
    const verdict = decideCaseType(
      readString(args, "anvandning") as CaseUseKey,
      readString(args, "laddning") as CaseChargingKey,
      readString(args, "utseende") as CaseLookKey,
    );

    if (!verdict) {
      return "Ange var telefonen är, hur den laddas och hur skalet ska se ut för att få ett svar.";
    }

    const criteria = [
      verdict.needsCorners
        ? "förstärkta hörn eller Air Cushion"
        : "hörnkonstruktion behöver inte styra valet",
      verdict.needsCameraCover
        ? "kant runt kameran som är högre än linserna"
        : "kamerakant behöver inte styra valet",
      verdict.needsMagnetRing ? "magnetring, inte bara metallplatta" : "",
      verdict.wantsFinish ? `yta: ${verdict.wantsFinish.join(" eller ")}` : "",
    ].filter(Boolean);

    return [
      `${verdict.headline}.`,
      verdict.why,
      verdict.warning ? `Att veta: ${verdict.warning}` : "",
      `Kraven att filtrera på: ${criteria.join(", ")}.`,
      `Skal som uppfyller dem: ${SITE.url}/iphone-skal`,
      `Väljaren med alla svar: ${toolUrl("skaltypsvaljare")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
  },
};

const thresholdTool: AgentTool = {
  name: "klarar_roboten_troskeln",
  description:
    "Säger om en robotdammsugare kan förväntas ta sig över en tröskel av angiven höjd, och vad användaren ska kräva av tillverkaren. De flesta robotar klarar ungefär en till två centimeter. Över det krävs en publicerad passerhöjd i millimeter, och få tillverkare anger någon.",
  inputSchema: {
    type: "object",
    properties: {
      troskel: {
        type: "string",
        enum: THRESHOLD_BANDS.map((b) => b.key),
        description:
          "Höjden på den högsta tröskeln roboten ska passera. Mät från golvet till tröskelns överkant.",
      },
    },
    required: ["troskel"],
  },
  run(args) {
    const verdict = decideThreshold(
      readString(args, "troskel") as ThresholdBandKey,
    );

    if (!verdict) {
      return "Ange tröskelns höjd för att få ett svar.";
    }

    const criteria = [
      verdict.needsStatedHeight
        ? "tillverkaren ska publicera en passerhöjd i millimeter"
        : "passerhöjd behöver inte styra valet",
      verdict.requiredMm
        ? `angiven passerhöjd minst ${verdict.requiredMm} mm`
        : "",
      verdict.suggestRamp ? "tröskelramp är ett alternativ per dörr" : "",
    ].filter(Boolean);

    return [
      `${verdict.headline}.`,
      verdict.body,
      verdict.warning ? `Att veta: ${verdict.warning}` : "",
      `Kraven att filtrera på: ${criteria.join(", ")}.`,
      "Passerhöjden är tillverkarens egen uppgift. Ingen anger provmetod och ingen oberoende provning publicerar talet, så det är en uppgift och inte ett mätvärde.",
      `Robotar och vad var och en anger: ${SITE.url}/robotdammsugare`,
      `Väljaren med alla svar: ${toolUrl("klarar-roboten-troskeln")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
  },
};

/**
 * Verktyget svarar aldrig ja eller nej när felmarginalen är bredare än
 * avståndet till gränsen. Det är hela poängen: en agent som svarar "ja, du har
 * mögelrisk" på en avläsning som lika gärna kan ligga under 60 påstår en
 * precision talet inte har.
 */
const fuktavlasningTool: AgentTool = {
  name: "tolka_hygrometeravlasning",
  description:
    "Räknar om en avläsning från en hygrometer till det spann den faktiskt betyder, givet mätarens angivna noggrannhet, och säger vilka av gränserna 45, 50 och 60 procent avläsningen kan avgöra. Nästan ingen tillverkare anger någon noggrannhet för fukt, så det finns ett eget val för det fallet.",
  inputSchema: {
    type: "object",
    properties: {
      avlast: {
        type: "number",
        description:
          "Talet mätaren visar, i procent relativ luftfuktighet. Mellan 0 och 100.",
      },
      noggrannhet: {
        type: "string",
        enum: TOLERANSER.map((t) => t.key),
        description:
          "Noggrannheten tillverkaren anger. Använd okand när det inte står någonstans, vilket är det vanliga fallet.",
      },
    },
    required: ["avlast", "noggrannhet"],
  },
  run(args) {
    const svar = tolkaAvlasning(
      readNumber(args, "avlast", Number.NaN),
      readString(args, "noggrannhet") as ToleransKey,
    );

    if (!svar) {
      return "Ange vad mätaren visar, mellan 0 och 100 procent, och vilken noggrannhet tillverkaren anger.";
    }

    const oavgjort = svar.oavgjorda.length
      ? "Gränser avläsningen inte kan avgöra: " +
        svar.oavgjorda.map((g) => g.varde + " procent (" + g.kalla + ")").join(", ") +
        "."
      : "";
    const passerat = svar.passerade.length
      ? "Gränser hela spannet ligger över: " +
        svar.passerade.map((g) => g.varde + " procent").join(", ") +
        "."
      : "";

    return [
      svar.rubrik + ".",
      svar.text,
      oavgjort,
      passerat,
      svar.varning ? "Att veta: " + svar.varning : "",
      "Allmänna råd är rekommendationer och inte bindande regler, och 45 procent är en indikation och inget gränsvärde.",
      "Mätare och vad var och en anger: " + SITE.url + "/hygrometer",
      "Verktyget med alla svar: " + toolUrl("vad-betyder-talet-pa-hygrometern"),
    ]
      .filter(Boolean)
      .join("\n\n");
  },
};

/**
 * Ventilpassningen som agentverktyg.
 *
 * ## Varför den behöver finnas för en agent
 *
 * Frågan "passar den här termostaten mitt element" är precis den sorts fråga
 * som ställs till en assistent i stället för till en sökmotor, och den har ett
 * svar bara om man vet vad som står på ventilkroppen. Ett svar ur minnet blir
 * en gissning, och en gissad passform kostar läsaren ett returfrakt.
 *
 * ## ⚠️ Verktyget får aldrig svara ja på tystnad
 *
 * Tre listor går ut, inte två. `tyst` är den viktigaste och ska alltid med i
 * svaret: SONOFF namnger bara gängan och Fibaro namnger ingenting, och en
 * agent som utelämnar den listan gör tystnad till ett underkännande. Samma
 * regel som i widgeten, och den ligger i `bedomPassning` så att båda svarar
 * ur samma kod.
 */
const ventilpassningTool: AgentTool = {
  name: "vilken_termostat_passar_ventilen",
  description:
    "Säger vilka smarta radiatortermostater som enligt tillverkaren passar en given ventilfattning, vilka som säljer adaptern separat och vilka som inte publicerar någon uppgift alls. Svarar även på om ventiltypen i sig är ett hinder. Uppgifterna är tillverkarnas egna, aldrig butikens rubrik, och tystnad redovisas som tystnad och aldrig som ett nej.",
  inputSchema: {
    type: "object",
    properties: {
      ventiltyp: {
        type: "string",
        enum: VENTILTYPER.map((v) => v.key),
        description:
          "Vad som sitter på elementet. En radiatortermostat kräver en termostatventil; manuell kran och enrörssystem är hinder i sig.",
      },
      fattning: {
        type: "string",
        enum: FATTNINGAR.map((f) => f.key),
        description:
          "Vad som står på ventilkroppen under vredet. Krävs bara när ventiltypen är termostat.",
      },
    },
    required: ["ventiltyp"],
  },
  run(args) {
    const svar = bedomPassning(
      readString(args, "ventiltyp") as VentiltypKey,
      (readString(args, "fattning") || null) as FattningKey | null,
    );

    if (!svar) {
      return "Ange vad som sitter på elementet. Är det en termostatventil behövs också fattningen, alltså vad som står på ventilkroppen under vredet.";
    }

    const lista = (rubrik: string, poster: { namn: string; kalla: string }[]) =>
      poster.length
        ? rubrik + ": " + poster.map((p) => p.namn + " (" + p.kalla + ")").join("; ") + "."
        : "";

    return [
      svar.rubrik + ".",
      svar.text,
      svar.stopp ?? "",
      svar.nastaSteg ?? "",
      lista("Tillverkaren anger att den passar", svar.passar),
      lista("Passar, men adaptern säljs separat", svar.tillval),
      lista("Tillverkaren anger att adaptern inte levereras", svar.passarInte),
      lista("Säger ingenting om just den här fattningen", svar.tyst),
      "Att en tillverkare inte namnger en fattning betyder inte att den saknar adapter, bara att det inte går att kontrollera före köpet.",
      "Alla elva termostater med betyg och pris: " + SITE.url + "/smart-termostat",
      "Verktyget med alla svar: " + toolUrl("vilken-termostat-passar-min-ventil"),
    ]
      .filter(Boolean)
      .join("\n\n");
  },
};

const mountTool: AgentTool = {
  name: "valj_gardinmotor",
  description:
    "Säger vilken sorts gardinmotor som går att montera i ett givet fönster. Motorerna säljs som olika artikelnummer per upphängning och fel artikel går inte att montera alls, så upphängningen är avgörande.",
  inputSchema: {
    type: "object",
    properties: {
      fonstertyp: {
        type: "string",
        enum: CURTAIN_WINDOWS.map((w) => w.key),
        description: "Vad som hänger i fönstret.",
      },
      upphangning: {
        type: "string",
        enum: CURTAIN_MOUNTS.map((m) => m.key),
        description:
          "Skentyp eller stång. Krävs bara för gardintyg; rullgardin och persienn avgörs av fönstertypen. vetej är ett giltigt svar.",
      },
      ljudkrav: {
        type: "string",
        enum: CURTAIN_NOISE.map((n) => n.key),
        description: "tyst om motorn ska stå i ett sovrum.",
      },
    },
    required: ["fonstertyp", "ljudkrav"],
  },
  run(args) {
    const verdict = decideMount(
      readString(args, "fonstertyp") as CurtainWindowKey,
      readString(args, "upphangning", "vetej") as CurtainMountKey,
      readString(args, "ljudkrav") as CurtainNoiseKey,
    );

    if (!verdict) return "Ange fönstertyp och om ljudnivån spelar roll.";

    return [
      `${verdict.headline}.`,
      verdict.why,
      verdict.warning ? `Att veta: ${verdict.warning}` : "",
      `Motorer av rätt typ: ${SITE.url}/elektrisk-rullgardin`,
      `Monteringsväljaren med alla svar: ${toolUrl("monteringsvaljare-gardin")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
  },
};

const timerTool: AgentTool = {
  name: "valj_utomhustimer",
  description:
    "Säger om en mekanisk timer, en digital eller en smart plugg är rätt för utomhusbruk, och vilken märkeffekt som krävs. Under en vintersäsong står solnedgången nästan stilla, så en mekanisk räcker ofta. Året runt flyttar den sig sju timmar, och då behövs astrofunktion eller skymningsrelä.",
  inputSchema: {
    type: "object",
    properties: {
      last: {
        type: "string",
        enum: TIMER_LOADS.map((l) => l.key),
        description: "Vad timern ska styra.",
      },
      sasong: {
        type: "string",
        enum: TIMER_SEASONS.map((s) => s.key),
        description: "december för vintersäsongen, aret för året runt.",
      },
      rackvidd: {
        type: "string",
        enum: TIMER_REACH.map((r) => r.key),
        description: "hemifran om tiden ska gå att ändra på distans.",
      },
    },
    required: ["last", "sasong", "rackvidd"],
  },
  run(args) {
    const verdict = decideTimer(
      readString(args, "last") as TimerLoadKey,
      readString(args, "sasong") as TimerSeasonKey,
      readString(args, "rackvidd") as TimerReachKey,
    );

    if (!verdict) {
      return "Alla tre frågorna behöver besvaras: last, säsong och räckvidd.";
    }

    return [
      `${verdict.headline}.`,
      verdict.why,
      verdict.warning ? `Varning: ${verdict.warning}` : "",
      `Märkeffekten att kontrollera: minst ${nf.format(verdict.needsWatt)} W.`,
      `Timrar som klarar det: ${SITE.url}/utomhustimer`,
      `Timerväljaren med alla svar: ${toolUrl("timervaljare-utomhus")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
  },
};

/** Vad varje rad i brandskyddsplanen heter i klartext. */
const FIRE_LABELS: Record<string, string> = {
  alarm: "Brandvarnare",
  extinguisher: "Pulversläckare 6 kg ABC",
  blanketLarge: "Brandfilt 120 x 180 cm",
  blanketSmall: "Liten brandfilt till köket",
};

const fireKitTool: AgentTool = {
  name: "planera_brandskydd",
  description:
    "Säger vad en bostad behöver i brandskydd och i vilka antal, enligt räddningstjänsternas rekommendation: brandvarnare på varje våningsplan, sexkilos pulversläckare och brandfilt. Svaret innehåller antal och placering, inte produkter.",
  inputSchema: {
    type: "object",
    properties: {
      bostad: {
        type: "string",
        enum: FIRE_HOMES.map((h) => h.key),
        description: "Typ av bostad. Lägenhet räknas alltid som ett plan.",
      },
      planer: {
        type: "string",
        enum: FIRE_FLOORS.map((f) => f.key),
        description: "Antal våningsplan. Utelämna för lägenhet.",
      },
      kok: {
        type: "string",
        enum: FIRE_KITCHENS.map((k) => k.key),
        description: "Om köket ligger på samma plan som entrén.",
      },
    },
    required: ["bostad", "kok"],
  },
  run(args) {
    const home = readString(args, "bostad") as FireHomeKey;
    /* Lägenhet har per definition ett plan, precis som i widgeten. Frågan
       besvaras åt anroparen i stället för att blockera resultatet. */
    const floors = (
      home === "lagenhet" ? "ett" : readString(args, "planer", "ett")
    ) as FireFloorKey;

    const planned = fireKitPlan(
      home,
      floors,
      readString(args, "kok") as FireKitchenKey,
    );

    if (!planned) return "Ange bostadstyp och om köket ligger på entréplanet.";

    const list = planned.lines
      .map(
        (line) =>
          `${line.count} x ${FIRE_LABELS[line.key] ?? line.key}. ${line.why}`,
      )
      .join("\n");

    return [
      `Det här behöver bostaden:\n${list}`,
      planned.note,
      `Vad de kostar hos butikerna: ${SITE.url}/brandvarnare, ${SITE.url}/brandslackare och ${SITE.url}/brandfilt`,
      `Brandskyddsguiden med alla svar: ${toolUrl("brandskydd-hemma")}`,
    ].join("\n\n");
  },
};

/**
 * Verktyg per tool page.
 *
 * Nyckeln är samma slug som `TOOL_WIDGETS` i components/tools/registry.tsx, så
 * att registreringen följer widgeten: verktygen finns där räknaren finns, både
 * på sin egen sida och inbäddad i en köpguide. En agent som läser en
 * test page får alltså tillgång till räknarna som sidan faktiskt visar, och
 * ingenting annat.
 */
export const AGENT_TOOLS: Record<string, AgentTool[]> = {
  lumenraknare: [lumenTool],
  "drifttid-skaftdammsugare": [vacuumRuntimeTool],
  "oljekostnad-fritos": [oilCostTool],
  "rackvidd-babyvakt": [babyMonitorRangeTool],
  "watt-till-lumen": [wattLumenTool],
  fargtemperatur: [kelvinTool],
  "elkostnad-lampor": [bulbCostTool],
  "elkostnad-uttag": [plugCostTool],
  "elkostnad-julbelysning": [christmasCostTool],
  "aterbetalning-vattenfelsbrytare": [paybackTool],
  "co-halt-larmgrans": [coLevelTool],
  "protokollvaljare-smart-hem": [protocolTool],
  "behover-du-kolmonoxidvarnare": [coNeedTool],
  "vilken-luftapparat": [airApplianceTool],
  "vilken-usb-c-kabel": [cableNeedTool],
  "installationsguide-strombrytare": [switchInstallTool],
  "effektkoll-smart-plug": [plugLoadTool],
  vattenlarmsvaljare: [leakSensorTool],
  skaltypsvaljare: [caseTypeTool],
  planboksfodralvaljare: [walletFolioTool],
  "monteringsvaljare-gardin": [mountTool],
  "timervaljare-utomhus": [timerTool],
  "brandskydd-hemma": [fireKitTool],
  "klarar-roboten-troskeln": [thresholdTool],
  "vad-betyder-talet-pa-hygrometern": [fuktavlasningTool],
  "vilken-termostat-passar-min-ventil": [ventilpassningTool],
};

export function agentToolsFor(slug: string): AgentTool[] {
  return AGENT_TOOLS[slug] ?? [];
}

/**
 * Verktyg vars indata mappar rent mot en schema.org-Action.
 *
 * ## Varför bara två av sexton
 *
 * `potentialAction` med `*-input` är den officiella schema.org-konventionen för
 * att beskriva ett anropbart moment, alltså samma begrepp som WebMCP:s
 * `inputSchema` uttrycker för en webbläsare. Skillnaden är att Action har ett
 * **fast** egenskapsvokabulär: `object`, `instrument`, `result` och några till.
 * `SearchAction` kan skriva `query-input` för att `query` är en egenskap den
 * har.
 *
 * Lumenräknaren tar `rum` och `ytaKvm`. Det finns ingen ärlig plats för det
 * andra värdet, och `valj_fargtemperatur` är värre: den tar `rum` **eller**
 * `kelvin`, alltså ett antingen-eller som konventionen inte kan uttrycka alls.
 * Kvar står de två uppslagen med en enda ingång.
 *
 * Hellre två riktiga än sexton påhittade. Markup som säger mindre än prosan
 * redan gör är inte värd raderna.
 *
 * `CheckAction` och inte generiska `Action`: schema.org beskriver den som "an
 * agent inspects, determines, investigates, inquires, or examines an object's
 * state", vilket är precis vad båda gör.
 */
export const ACTION_INPUTS: Record<
  string,
  { actionType: string; property: string; param: string }
> = {
  watt_till_lumen: {
    actionType: "CheckAction",
    property: "object",
    param: "watt",
  },
  co_halt_betydelse: {
    actionType: "CheckAction",
    property: "object",
    param: "ppm",
  },
};
