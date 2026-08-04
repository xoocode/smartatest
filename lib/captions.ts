/**
 * Tabelltexten ovanför en jämförelse.
 *
 * ## Varför den ligger här och inte på varje sida
 *
 * Meningen om att priserna är kontrollerade ett visst datum är ett påstående
 * om hur vi arbetar, inte redaktionell text om kategorin. Den stod ordagrant
 * på tjugotvå sidor i två snarlika varianter, "hos respektive butik" och "hos
 * den butik vi länkar till", vilket är precis den sortens formulering som ska
 * gå att ändra på ett ställe den dagen den behöver skärpas.
 *
 * Svansen är däremot kategorins egen. Den förklarar vilka uppgifter som saknas
 * och varför, och den skiljer sig med rätta mellan en brandvarnare och en
 * övervakningskamera. Därför tar funktionen emot den i stället för att gissa.
 */

/** Priser kontrollerade, plus kategorins egen förklaring. */
export function priceCaption(checkedAt: string, extra?: string): string {
  const base = `Priser kontrollerade ${checkedAt} hos den butik vi länkar till och kan ha ändrats sedan dess.`;
  return extra ? `${base} ${extra}` : base;
}

/**
 * Motsvarigheten för tjänstesidor, där det inte finns någon butik.
 *
 * `/hemlarm` jämför larmbolag och läser avgifterna hos bolaget självt. Att
 * kalla det "butik" vore fel, och att skriva om meningen per sida vore att
 * återinföra dubbleringen i en annan form.
 */
export function serviceCaption(checkedAt: string, extra?: string): string {
  const base = `Uppgifterna är lästa hos bolaget självt ${checkedAt} och kan ha ändrats sedan dess.`;
  return extra ? `${base} ${extra}` : base;
}

/**
 * Den vanligaste svansen, ordagrant på flera sidor.
 *
 * Skillnaden mellan "ej angiven" och ett tomt fält är sajtens egen konvention
 * och förklaras i `ComparisonTable`. Den som skriver en ny kategori ska kunna
 * återanvända förklaringen i stället för att formulera om den, för en
 * omformulering blir förr eller senare en annan innebörd.
 */
export const NOT_STATED =
  "Där en uppgift står som ej angiven betyder det att butiken inte publicerar den, inte att egenskapen saknas.";
