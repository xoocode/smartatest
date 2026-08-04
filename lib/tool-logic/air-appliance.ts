/**
 * Luftrenare, luftfuktare eller avfuktare? Eller ingen av dem?
 *
 * Verktyget för hela gruppen Hem & hushålls luftkluster, inbäddat på alla tre
 * test pages. De tre produkterna förväxlas ständigt, och de löser tre
 * olika problem: en luftrenare tar bort partiklar, en luftfuktare tillför
 * vatten, en avfuktare tar bort det. Två av dem gör aktiv skada om man väljer
 * fel.
 *
 * ## Regeln som formar svaren
 *
 * **Omätt fukt ger aldrig ett köpråd.** Har läsaren inte mätt svarar verktyget
 * med en hygrometer för en hundralapp och två veckors mätning. Det är billigare
 * än varje produkt vi rankar och det är det enda ärliga svaret, eftersom hela
 * kategorin säljs på en gissning om ett tal som går att mäta exakt.
 *
 * Det är också skälet till att verktyget inte tar en genväg via årstid: torr
 * luft i januari är regel och inte problem, och en luftfuktare köpt på den
 * känslan är precis det SweSIAQ avråder från.
 *
 * ## Vad modulen inte känner till
 *
 * Inga produkter, inga priser, inga butiker. `page` är en test page och
 * aldrig en produkt. Se lib/agent-tools.ts för varför.
 *
 * ⚠️ Ett undantag, och det är avsiktligt: hygrometern nämns med ungefärligt
 * pris. Den säljs inte av oss, rankas inte av oss och länkas inte av oss, och
 * summan finns där för att visa att alternativet till ett köp kostar en
 * hundralapp. Regeln finns för att en agent inte ska kunna slutföra affären åt
 * läsaren; den här siffran leder bort från affären, inte fram till den.
 */

export const AIR_SYMPTOMS = [
  { key: "torr", label: "Torr luft, statisk elektricitet, sprucken hy" },
  { key: "fukt", label: "Kondens på fönstren, mögellukt, fuktfläckar" },
  { key: "damm", label: "Damm, pollen, lukt eller allergibesvär" },
  { key: "tvatt", label: "Tvätt som inte torkar inomhus" },
] as const;

export const AIR_MEASURED = [
  { key: "omatt", label: "Har inte mätt" },
  { key: "under30", label: "Under 30 %" },
  { key: "30till45", label: "30 till 45 %" },
  { key: "45till60", label: "45 till 60 %" },
  { key: "over60", label: "Över 60 %" },
] as const;

export const AIR_PLACES = [
  { key: "bostad", label: "Uppvärmt boendeutrymme" },
  { key: "sovrum", label: "Sovrum" },
  { key: "kallare", label: "Källare eller tvättstuga" },
  { key: "kallt", label: "Krypgrund, garage eller vind" },
] as const;

export type AirSymptomKey = (typeof AIR_SYMPTOMS)[number]["key"];
export type AirMeasuredKey = (typeof AIR_MEASURED)[number]["key"];
export type AirPlaceKey = (typeof AIR_PLACES)[number]["key"];

export type AirAnswers = {
  symptom: AirSymptomKey | null;
  measured: AirMeasuredKey | null;
  place: AirPlaceKey | null;
};

export const EMPTY_AIR_ANSWERS: AirAnswers = {
  symptom: null,
  measured: null,
  place: null,
};

export const AIR_QUESTIONS = [
  {
    key: "symptom" as const,
    question: "Vad är det som besvärar dig?",
    options: AIR_SYMPTOMS,
  },
  {
    key: "measured" as const,
    question: "Vad visar hygrometern?",
    options: AIR_MEASURED,
  },
  {
    key: "place" as const,
    question: "Vilket utrymme gäller det?",
    options: AIR_PLACES,
  },
];

export type AirVerdict = {
  /** Kort svar, exempelvis "Avfuktare" eller "Ingen av dem". */
  headline: string;
  /** Den test page svaret pekar på, eller null när svaret är att avstå. */
  page: "/luftrenare" | "/luftfuktare" | "/avfuktare" | null;
  why: string;
  /** Det som ska göras före ett köp, eller i stället för det. */
  first: string;
  /** Sätts när svaret bygger på en gissning i stället för en mätning. */
  needsMeasurement: boolean;
};

const HYGROMETER =
  "Köp en hygrometer för ungefär hundra kronor och mät i två veckor innan du köper något. Notera om värdet är högt överallt eller bara i ett utrymme, och om det följer vädret eller står still. Det svaret avgör både vilken apparat du behöver och om du behöver någon.";

export function decideAirAppliance(answers: AirAnswers): AirVerdict | null {
  const { symptom, measured, place } = answers;
  if (!symptom || !measured || !place) return null;

  const kallt = place === "kallt";
  const kallare = place === "kallare" || kallt;

  /* Partiklar är en egen axel. Luftfuktigheten säger ingenting om damm och
     pollen, så den frågan hoppar rakt till luftrenaren oavsett vad
     hygrometern visar. */
  if (symptom === "damm") {
    return {
      headline: "Luftrenare",
      page: "/luftrenare",
      why: "Damm, pollen och lukt är partiklar och gaser, inte fukt. Ingen luftfuktare och ingen avfuktare gör något åt dem, och luftfuktigheten säger ingenting om hur mycket partiklar som finns i rummet. Det är en egen axel med en egen produkt.",
      first:
        "Läs om ozon innan du väljer. Kemikalieinspektionen och Elsäkerhetsverket granskade tjugo luftrenare, och fyra klarade inte ozongränsvärdet. Undvik jonisatorer och plasmateknik i rum där folk vistas.",
      needsMeasurement: false,
    };
  }

  /* Tvätt som inte torkar är alltid ett fuktöverskott, oavsett vad
     hygrometern visar i resten av bostaden. */
  if (symptom === "tvatt") {
    return {
      headline: "Avfuktare",
      page: "/avfuktare",
      why: "Tvätt som inte torkar betyder att luften i rummet redan är mättad och inte kan ta upp mer vatten. En avfuktare löser det direkt, och den är dessutom billigare i drift än att elda på ett element i samma rum, eftersom en del av energin kommer tillbaka som värme.",
      first: kallare
        ? "Kontrollera driftstemperaturen innan du väljer. De flesta kondensavfuktare stannar vid 5 grader, och kapacitetstalet på kartongen är i regel uppmätt vid 30. I ett svalt utrymme får du betydligt mindre än vad förpackningen lovar."
        : "Titta på kapaciteten tillsammans med de villkor den är uppmätt vid. Ett literantal utan angivna villkor går inte att ställa mot ett med, och de flesta tillverkare anger inga alls.",
      needsMeasurement: false,
    };
  }

  /* Utan mätning ges inget köpråd. Se modulhuvudet. */
  if (measured === "omatt") {
    return {
      headline: "Mät först",
      page: null,
      why:
        symptom === "fukt"
          ? "Kondens på fönstren kan betyda att luften är för fuktig, men det kan lika gärna betyda att fönstret är kallt. Skillnaden avgör om du ska köpa en avfuktare eller täta och ventilera, och den går inte att se med ögat."
          : "Torr luft vintertid känns likadant vid 25 procent som vid 40, och bara det ena är ovanligt. Att köpa en luftfuktare på känslan är precis det SweSIAQ avråder från, eftersom risken i den kategorin ligger i att fukta för mycket.",
      first: HYGROMETER,
      needsMeasurement: true,
    };
  }

  if (measured === "over60") {
    return {
      headline: "Avfuktare, men läs varningen",
      page: "/avfuktare",
      why: "Över 60 procent är den nivå där Stiftung Warentest skriver att mögel hotar, och Folkhälsomyndighetens allmänna råd namnger cirka 45 procent vid 21 grader som en indikation som kan få tillsynsmyndigheten att kräva undersökning av byggnaden. Du har alltså ett verkligt fuktöverskott.",
      first:
        "Av ÖKO-TESTs genomgång framgår att en avfuktare inte är någon permanent lösning: är rum varaktigt för fuktiga är något fel, och då ska orsaken åtgärdas. Kontrollera dränering, ventilation och fuktspärr parallellt med att du köper apparaten. Annars köper du en elräkning i stället för en lösning.",
      needsMeasurement: false,
    };
  }

  if (measured === "45till60") {
    return {
      headline: kallare ? "Avfuktare, men först ventilation" : "Ingen av dem",
      page: kallare ? "/avfuktare" : null,
      why: kallare
        ? "45 till 60 procent är inte alarmerande i en bostad, men i en källare eller ett kallt utrymme ligger materialen kallare än luften, och då kondenserar fukten på ytorna långt innan luften i sig känns fuktig. SweSIAQ anger dessutom att dammkvalster kan börja växa redan över 45 till 50 procent i rumstemperatur."
        : "Du ligger i det spann där ingen av de tre produkterna har något att göra. Luften är varken torr nog för att motivera en luftfuktare eller fuktig nog att vara ett problem, och en luftrenare gör ingenting åt fukt.",
      first: kallare
        ? "Börja med luftflödet och med att inte värma utrymmet mer än nödvändigt. Först därefter en avfuktare, och kontrollera då driftstemperaturen: de flesta stannar vid 5 grader."
        : "Behåll en hygrometer i rummet och gör om mätningen om något ändras. Har du besvär som du trott hänger ihop med luften är det troligen inte fuktigheten som orsakar dem.",
      needsMeasurement: false,
    };
  }

  if (measured === "30till45") {
    return {
      headline: "Ingen av dem",
      page: null,
      why: "30 till 45 procent är normalt inomhus under eldningssäsongen och det finns inget svenskt riktvärde som säger att det är för lågt. Folkhälsomyndighetens allmänna råd innehåller ingen nedre gräns alls och inget råd om att fukta. ÖKO-TEST rekommenderar luftfuktare först när fukten legat under 30 procent under en längre tid.",
      first:
        "Vill du ändå ha en behagligare luft finns två åtgärder som inte kostar något och som SweSIAQ pekar på: sänk inomhustemperaturen, eftersom det är uppvärmningen som gör den relativa fuktigheten låg, och anpassa ventilationen så att luftflödena inte är högre än antalet personer kräver.",
      needsMeasurement: false,
    };
  }

  /* measured === "under30" */
  if (kallare) {
    return {
      headline: "Kontrollera mätningen",
      page: null,
      why: "Under 30 procent i en källare eller ett kallt utrymme är ovanligt, och det tyder oftare på att mätaren står nära en värmekälla eller i ett drag än på att luften faktiskt är så torr. Ett svalt utrymme har normalt högre relativ fuktighet än bostaden, inte lägre.",
      first:
        "Flytta hygrometern en bit från väggar, element och ventiler, låt den stå ett dygn och läs av igen. Stämmer värdet har du inget fuktproblem att lösa i det utrymmet.",
      needsMeasurement: true,
    };
  }

  return {
    headline: "Luftfuktare, men läs varningen först",
    page: "/luftfuktare",
    why: "Under 30 procent under en längre tid är den nivå där ÖKO-TEST anser att en luftfuktare är motiverad. Torr luft kan irritera slemhinnor och göra att luftvägarnas flimmerhår fungerar sämre.",
    first:
      "SweSIAQ avråder i allmänhet från konstgjord befuktning på grund av risk för mögel- och bakterieväxt, och pekar i stället på lägre inomhustemperatur och anpassad ventilation. Köper du ändå: välj en apparat där målfukten går att ställa, sikta under 45 procent, och undvik ultraljud om du inte orkar rengöra den varje vecka.",
    needsMeasurement: false,
  };
}
