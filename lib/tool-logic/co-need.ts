/**
 * Behöver bostaden en kolmonoxidvarnare, och vilken del av EN 50291 krävs?
 *
 * Kolmonoxid bildas bara där något förbränns. En bostad med enbart el,
 * fjärrvärme eller bergvärme har ingen källa, och där ska verktyget avråda i
 * stället för att sälja. Att svara ja på allt vore lättare och sämre.
 *
 * Produkterna filtreras på `needsPart2` i widgeten. Kriteriet bor här, urvalet
 * där: den här modulen känner inte till någon produkt.
 */

export const CO_SOURCES = [
  { key: "kamin", label: "Braskamin, kakelugn eller vedspis" },
  { key: "panna", label: "Olje- eller vedpanna" },
  { key: "gasol", label: "Gasol eller fotogen" },
  { key: "garage", label: "Garage under bostaden" },
  { key: "skorsten", label: "Delad skorstensstock med grannar" },
] as const;

export const CO_PLACES = [
  { key: "lagenhet", label: "Lägenhet" },
  { key: "villa", label: "Villa eller radhus" },
  { key: "fritidshus", label: "Fritidshus" },
  { key: "fordon", label: "Husvagn, husbil eller båt" },
] as const;

export type CoSourceKey = (typeof CO_SOURCES)[number]["key"];
export type CoPlaceKey = (typeof CO_PLACES)[number]["key"];

export type CoNeedVerdict = {
  headline: string;
  why: string;
  /** Fordon kräver del 2. */
  needsPart2: boolean;
  /** Ingen källa alls: verktyget ska avråda i stället för att sälja. */
  noSource: boolean;
  placement: string;
};

export function decideCoNeed(
  sources: readonly CoSourceKey[],
  place: CoPlaceKey | null,
): CoNeedVerdict | null {
  if (!place) return null;

  const needsPart2 = place === "fordon";
  /* Ett fordon med gasol eller motor är i praktiken alltid en källa, så där
     räknas frånvaron av ikryssad källa inte som frånvaro av risk. */
  const noSource = sources.length === 0 && !needsPart2;

  if (noSource) {
    return {
      headline: "Troligen inte",
      why: "Du har inte angett någon förbränningskälla. Kolmonoxid bildas bara när något förbränns, så i en bostad med enbart el, fjärrvärme eller bergvärme finns ingen källa och varnaren skulle aldrig larma. Skaffar du braskamin, gasolkök eller ett garage med dörr rakt in i bostaden ändras svaret.",
      needsPart2: false,
      noSource: true,
      placement:
        "Har du i stället en brandvarnare på varje våningsplan är det den investeringen som gör nytta här.",
    };
  }

  if (needsPart2) {
    return {
      headline: "Ja, och den måste ange del 2",
      why: "I husvagn, husbil och båt är luftvolymen liten och förbränningskällan nära. Det är också den miljö där en varnare utsätts för vibration, rörelse och stora temperaturväxlingar. EN 50291-2 är den del av standarden som provar just det, och en varnare som bara anger del 1 är inte provad för det du ska använda den till.",
      needsPart2: true,
      noSource: false,
      placement:
        "Placera den i boendedelen, inte i gasolskåpet. Har du gasol behöver du dessutom en gasolvarnare, som är en annan produkt med en annan sensor.",
    };
  }

  const many = sources.length > 1;
  const hasGarage = sources.includes("garage");
  const onlyChimney = sources.length === 1 && sources[0] === "skorsten";

  if (onlyChimney) {
    return {
      headline: "Ja, men av ett ovanligt skäl",
      why: "Du eldar inte själv, men delar skorstensstock. Gas från en grannes eldning kan ta sig in via otätheter i stocken. Det är ovanligt och det förekommer, och det är svårt att upptäcka eftersom du inte har någon egen källa att misstänka.",
      needsPart2: false,
      noSource: false,
      placement:
        "Sätt den i det rum som ligger mot stocken, och gärna en till utanför sovrummet.",
    };
  }

  return {
    headline: many ? "Ja, och du har flera källor" : "Ja",
    why: many
      ? "Du har mer än en förbränningskälla i bostaden. Varje källa är ett eget fel som kan uppstå, och de sitter sällan i samma rum. Räkna med en varnare per källa plus en utanför sovrummet, hellre än en enda centralt placerad."
      : "Du har en förbränningskälla i bostaden. Kolmonoxid bildas när förbränningen blir ofullständig, exempelvis vid igensatt skorsten, dåligt drag eller en panna som behöver service, och gasen är helt luktfri.",
    needsPart2: false,
    noSource: false,
    placement: hasGarage
      ? "Sätt en i rummet med källan och en i rummet närmast garagedörren. Avgaser från en kallstart når in i bostaden snabbare än de flesta tror."
      : "Sätt en i samma rum som källan och en i eller utanför sovrummet om det ligger på ett annat plan. Andningshöjd fungerar, kolmonoxid stiger inte som rök.",
  };
}
