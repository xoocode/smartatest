/**
 * Vad oljan i en fritös kostar per år, och per portion.
 *
 * ## Varför verktyget finns
 *
 * En fritös säljs på ett litertal, och litertalet är oljan du måste köpa och
 * så småningom slänga. Det är inte maten du får ut. De två talen följer inte
 * varandra: Tefal Easy Pro, Princess 182727 och Severin FR 2431 tar alla tre
 * 3,0 liter och friterar 1,2 kg, 0,6 kg respektive 0,4 kg mat.
 *
 * Inköpspriset skiljer några hundralappar mellan maskinerna. Oljan skiljer mer
 * än så över några år, och ingen räknar på den.
 *
 * ## Var bytesintervallet kommer ifrån
 *
 * Två oberoende led som säger nästan exakt samma sak:
 *
 * | Källa | Rekommendation |
 * |---|---|
 * | Test-Achats, via Stiftung Warentest 2025-12-23 | byt efter 5 till 6 omgångar |
 * | Tefals egen bruksanvisning för sina fritöser | "replaced after frying 5 to 7 times" |
 *
 * Verktyget räknar med **6 omgångar per fyllning** som normalläge, alltså
 * mitt i det spann båda källorna anger, och låter läsaren flytta det mellan 4
 * och 10. Ett filter förlänger intervallet i praktiken, och det är därför
 * filtreringen går att välja: en maskin som silar oljan automatiskt håller den
 * ren längre än en som lämnar smulorna kvar.
 *
 * ⚠️ **Filtereffekten är en uppskattning och inte ett publicerat tal.** Ingen
 * tillverkare och ingen provning anger hur många extra omgångar ett filter ger.
 * Det som är belagt är riktningen: Test-Achats beskriver att matrester i fettet
 * är det som tvingar fram bytet, Tefal skriver att deras automatfiltrering gör
 * att oljan "kan användas många gånger", och en kallzon finns just för att
 * smulorna inte ska brännas. Verktyget lägger därför på ett halvt steg för
 * kallzon och ett helt för automatfiltrering, och skriver ut att det är en
 * uppskattning.
 *
 * ## Var oljepriset kommer ifrån
 *
 * Förvalt 30 kronor litern, vilket motsvarar rapsolja i femlitersdunk i svensk
 * dagligvaruhandel. Talet är ändringsbart, eftersom det är den enda uppgiften i
 * räkningen som läsaren själv kan kontrollera på tio sekunder.
 */

/** Bytesintervall i omgångar per fyllning, ur Test-Achats och Tefals egna råd. */
export const BATCHES_PER_FILL_DEFAULT = 6;
export const BATCHES_PER_FILL_MIN = 4;
export const BATCHES_PER_FILL_MAX = 10;

/** Kronor per liter olja. Rapsolja i dunk, svensk dagligvaruhandel. */
export const OIL_PRICE_DEFAULT = 30;

/**
 * Vad maskinen gör för att hålla oljan ren, och hur många extra omgångar det
 * uppskattas ge per fyllning. Se varningen i filhuvudet: riktningen är belagd,
 * talen är våra.
 */
export const FILTERING = [
  {
    key: "ingen",
    label: "Varken filter eller kallzon",
    hint: "Smulorna ligger mot värmeelementet och bränns",
    bonus: 0,
  },
  {
    key: "kallzon",
    label: "Kallzon, men inget oljefilter",
    hint: "Smulorna sjunker undan men ligger kvar i oljan",
    bonus: 0.5,
  },
  {
    key: "filter",
    label: "Fast oljefilter",
    hint: "Filtret sitter kvar i maskinen och silar löpande",
    bonus: 1,
  },
  {
    key: "automatisk",
    label: "Automatisk filtrering som lagrar oljan",
    hint: "Oljan silas ned i en sluten låda mellan gångerna",
    bonus: 2,
  },
] as const;

export type FilteringKey = (typeof FILTERING)[number]["key"];

/** De två publicerade råden som bytesintervallet vilar på. */
export const PUBLISHED_ADVICE = [
  { source: "Test-Achats", advice: "5 till 6 omgångar" },
  { source: "Tefal", advice: "5 till 7 omgångar" },
] as const;

export function filtering(key: string) {
  return FILTERING.find((f) => f.key === key) ?? FILTERING[0];
}

export type OilCostEstimate = {
  /** Liter olja per fyllning, sanerat. */
  litres: number;
  /** Omgångar per år, sanerat. */
  batchesPerYear: number;
  /** Effektivt antal omgångar per fyllning, filtreringen inräknad. */
  batchesPerFill: number;
  /** Antal oljebyten per år. */
  fillsPerYear: number;
  /** Liter olja per år. */
  litresPerYear: number;
  /** Kronor olja per år. */
  costPerYear: number;
  /** Kronor olja per gång du friterar. */
  costPerBatch: number;
  filtering: (typeof FILTERING)[number];
};

/**
 * Räkna ut vad oljan kostar per år för en given maskin och ett givet bruk.
 *
 * Avrundar kronor till hela och liter till en decimal. Ett svar på "412,73
 * kronor" påstår en noggrannhet två publicerade råd inte kan bära.
 */
export function oilCost(
  litresPerFill: number,
  batchesPerYear: number,
  filteringKey: string = "ingen",
  oilPricePerLitre: number = OIL_PRICE_DEFAULT,
  batchesPerFillBase: number = BATCHES_PER_FILL_DEFAULT,
): OilCostEstimate {
  const f = filtering(filteringKey);

  const litres =
    Number.isFinite(litresPerFill) && litresPerFill > 0
      ? Math.min(litresPerFill, 10)
      : 0;
  const batches =
    Number.isFinite(batchesPerYear) && batchesPerYear > 0
      ? Math.min(batchesPerYear, 500)
      : 0;
  const price =
    Number.isFinite(oilPricePerLitre) && oilPricePerLitre > 0
      ? Math.min(oilPricePerLitre, 500)
      : 0;
  const base =
    Number.isFinite(batchesPerFillBase) && batchesPerFillBase > 0
      ? Math.min(
          Math.max(batchesPerFillBase, BATCHES_PER_FILL_MIN),
          BATCHES_PER_FILL_MAX,
        )
      : BATCHES_PER_FILL_DEFAULT;

  const batchesPerFill = base + f.bonus;
  const fillsPerYear = batchesPerFill > 0 ? batches / batchesPerFill : 0;
  const litresPerYear = fillsPerYear * litres;
  const costPerYear = litresPerYear * price;

  return {
    litres,
    batchesPerYear: batches,
    batchesPerFill,
    fillsPerYear: Math.round(fillsPerYear * 10) / 10,
    litresPerYear: Math.round(litresPerYear * 10) / 10,
    costPerYear: Math.round(costPerYear),
    costPerBatch: batches > 0 ? Math.round((costPerYear / batches) * 10) / 10 : 0,
    filtering: f,
  };
}

/**
 * Vad årskostnaden betyder, i något läsaren kan väga mot inköpspriset.
 *
 * Jämförelsetalen är fritösernas egna priser i jämförelsen, 412 till 1 345
 * kronor, så att beloppet får en måttstock och inte bara blir en siffra.
 */
export function costVerdict(costPerYear: number): string {
  if (costPerYear <= 0) return "Fyll i hur mycket olja maskinen tar.";
  if (costPerYear < 100)
    return "Under hundralappen om året. Oljan är då en försumbar del av vad fritösen kostar dig, och du kan välja maskin på matmängd och rengöring i stället.";
  if (costPerYear < 300)
    return "Ett par hundralappar om året. Över fem år blir det ungefär vad en billig fritös kostar att köpa.";
  if (costPerYear < 600)
    return "Mer om året än vad den billigaste fritösen i jämförelsen kostar att köpa. En maskin som friterar mer mat per liter betalar tillbaka prisskillnaden på ett par år.";
  if (costPerYear < 1200)
    return "Oljan kostar dig ungefär en hel fritös om året. Här är det värt att räkna på en maskin med mindre oljemängd eller med automatisk filtrering innan du köper.";
  return "Över tusen kronor om året bara i olja, alltså mer än den dyraste maskinen i jämförelsen kostar. Vid det bruket är oljeåtgången per kilo mat det enda tal som spelar roll när du väljer.";
}
