/**
 * Klarar roboten tröskeln?
 *
 * ## Varför verktyget finns
 *
 * Trösklar är kategorins svenska problem. Ljud & Bild provade fyra robotar i
 * mellanklassen och skriver att nordiska trösklar var en av de största
 * utmaningarna i hela grupptestet, och att en av de fyra fick ge upp helt.
 * Att både Roborock och Dreame säljer en tröskelramp som tillbehör säger samma
 * sak från andra hållet.
 *
 * ## Var gränserna kommer ifrån
 *
 * `TYPICAL_MM` är Ljud & Bilds egen uppgift i köpguiden: de flesta städrobotar
 * klarar hinder på ungefär 1 till 2 centimeter. Det är den enda publicerade
 * siffran vi hittat för kategorin som helhet, och den är därför bandgränsen
 * och inte en gissning.
 *
 * Gränserna över den kommer från de passerhöjder tillverkarna i jämförelsen
 * anger: 40 mm och 88 mm.
 *
 * ## ⚠️ Talen är uppgifter, inte mätvärden
 *
 * Tillverkarna anger att de mätt i eget labb, ingen använder en gemensam
 * provmetod, och ingen oberoende provning publicerar siffran. Verktyget säger
 * därför aldrig att en robot *klarar* en tröskel, bara vad tillverkaren
 * *anger*. Skillnaden är hela skälet till att sidan finns, eftersom samma
 * slarv gäller sugkraften i pascal.
 *
 * ## ⚠️⚠️ Rättat 2026-08-06: räkna på enkelsteget
 *
 * Verktyget byggdes på att bara en av sju rankade robotar publicerar en
 * passerhöjd. Fyra gör det, och svaren låg på butikssidorna vi redan länkade
 * till. Se rättelsen i lib/corrections.ts.
 *
 * Viktigare för den som mäter: tillverkarna publicerar två tal, och skyltar
 * med det högre. Det gäller en tröskel med **två steg**, till exempel en
 * skjutdörrsskena, där roboten tar stödet i två omgångar. Det lägre gäller en
 * vanlig list i ett steg, och det är det verktyget räknar mot, eftersom det är
 * den sortens tröskel läsaren håller tumstocken mot. Dreame L50s Pro Ultra
 * säljs på 40 mm och klarar 22 över en list.
 */

/** Vad de flesta robotar klarar, enligt Ljud & Bilds köpguide. */
export const TYPICAL_MIN_MM = 10;
export const TYPICAL_MAX_MM = 20;

/** Högsta passerhöjd någon tillverkare i jämförelsen anger. */
export const HIGHEST_STATED_MM = 88;

/** Vad en tröskelramp kostar hos de två tillverkare som säljer en. */
export const RAMP_PRICES = [
  { brand: "Dreame", price: 199 },
  { brand: "Roborock", price: 330 },
] as const;

export const THRESHOLD_BANDS = [
  { key: "ingen", label: "Inga trösklar alls", mm: 0 },
  { key: "u10", label: "Under 1 cm", mm: 10 },
  { key: "1020", label: "1 till 2 cm", mm: 20 },
  { key: "2040", label: "2 till 4 cm", mm: 40 },
  { key: "o40", label: "Över 4 cm", mm: 88 },
] as const;

export type ThresholdBandKey = (typeof THRESHOLD_BANDS)[number]["key"];

export type ThresholdVerdict = {
  headline: string;
  body: string;
  /** Behöver läsaren en robot som publicerar en passerhöjd i millimeter? */
  needsStatedHeight: boolean;
  /** Är en tröskelramp ett rimligt alternativ här? */
  suggestRamp: boolean;
  /** Lägsta angivna passerhöjd som duger, i mm. Null när kravet är noll. */
  requiredMm: number | null;
  warning?: string;
};

export function decideThreshold(
  band: ThresholdBandKey | null,
): ThresholdVerdict | null {
  if (!band) return null;

  if (band === "ingen") {
    return {
      headline: "Trösklar är inte din fråga",
      body: "Har du fria golvövergångar kan du välja robot på moppning och station i stället, alltså det som båda labben pekar ut som kategorins verkliga svagheter. Mät ändå avståndet under soffa och säng, eftersom höjden på roboten själv avgör om den kommer in under möblerna.",
      needsStatedHeight: false,
      suggestRamp: false,
      requiredMm: null,
    };
  }

  if (band === "u10") {
    return {
      headline: "De flesta robotar tar den",
      body: `En tröskel under en centimeter ligger under det de flesta städrobotar klarar. Ljud & Bild anger ungefär ${TYPICAL_MIN_MM} till ${TYPICAL_MAX_MM} millimeter som normal förmåga i kategorin. Du kan välja robot på moppning och station i stället.`,
      needsStatedHeight: false,
      suggestRamp: false,
      requiredMm: 10,
    };
  }

  if (band === "1020") {
    return {
      headline: "Precis i gränslandet",
      body: `Ungefär här går gränsen för vad de flesta robotar klarar enligt Ljud & Bild, alltså ${TYPICAL_MIN_MM} till ${TYPICAL_MAX_MM} millimeter. Det betyder att en del tar sig över och en del inte gör det, och att skillnaden ligger i hur chassit är byggt snarare än i hur mycket roboten suger. Ett chassi som lyfter sig över listen tar mer än hjul som bara rullar på.`,
      needsStatedHeight: true,
      suggestRamp: true,
      requiredMm: 20,
    };
  }

  if (band === "2040") {
    return {
      headline: "Du behöver ett chassi som lyfter sig",
      body: "Över två centimeter räcker det inte att roboten marknadsförs för trösklar. Här ska du ha en modell som lyfter sig över listen och har en höjd i millimeter du kan hålla en tumstock mot. Bland de sju rankade tar sig två robotar hela vägen upp till fyra centimeter över en list i ett steg. Läs bara talet rätt: skyltar tillverkaren med en höjd som förutsätter en tröskel med två steg gäller den inte din dörrlist.",
      needsStatedHeight: true,
      suggestRamp: true,
      requiredMm: 40,
      warning:
        "Det var i det här spannet en av fyra robotar fick ge upp helt i Ljud & Bilds grupptest.",
    };
  }

  return {
    headline: "Ramp eller ett annat upplägg",
    body: `Över fyra centimeter är du utanför vad de flesta robotar tar sig över. Två av de rankade anger drygt 4,2 respektive 4,5 centimeter över en list i ett steg, och ${HIGHEST_STATED_MM} millimeter som mest över en tröskel med två steg, alltså en skjutdörrsskena. Har du en enkel list högre än så finns tre vägar: en tröskelramp i de dörrar det gäller, en robot per våningsplan eller rumsavsnitt, eller att acceptera att bära roboten över.`,
    needsStatedHeight: true,
    suggestRamp: true,
    requiredMm: HIGHEST_STATED_MM,
    warning:
      "En ramp löser en dörr. Har du fem dörrar blir det både en kostnad och en fråga om hur hallen ser ut.",
  };
}
