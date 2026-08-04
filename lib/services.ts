import {
  type AwardKind,
  type TestPage,
  type Spec,
  type UserRating,
  weightedRating,
} from "@/lib/products";

/**
 * Domänmodell för **tjänster**, vid sidan av `Product` i lib/products.ts.
 *
 * ## Varför en egen typ
 *
 * Sajten har hittills jämfört saker man köper en gång. Ett hemlarm köper man
 * inte, man tecknar det, och skillnaden är inte kosmetisk:
 *
 * - Priset är två tal som inte går att lägga ihop, en månadsavgift och en
 *   startavgift, och det ena löper.
 * - Det finns en bindningstid och en uppsägningstid.
 * - **Du äger sällan hårdvaran.** Både Verisure och Sector Alarm skriver ut i
 *   sina villkor att utrustningen förblir bolagets egendom.
 * - Därför finns en kostnad som inte existerar för en produkt: **vad det
 *   kostar att sluta.**
 *
 * En produkt med ett `price` kan inte bära något av det. Att trycka in det i
 * `Product` hade gjort produkttypen till en soppa och lämnat nästa
 * tjänstekategori, till exempel bredband eller elavtal, med samma röra.
 *
 * ## Den viktigaste designregeln i filen
 *
 * **`null` betyder "bolaget publicerar inte uppgiften" och är något helt annat
 * än `0`.** Sju av åtta larmbolag publicerar ingen månadsavgift alls. Om den
 * frånvaron renderades som `0 kr` hade sidan ljugit om precis det den handlar
 * om. Varje komponent som läser ett belopp härifrån måste därför skilja på
 * talet noll och uppgiften som saknas, och `formatFee()` nedan finns för att
 * göra det svårt att glömma.
 */

export type ServiceCurrency = "SEK";

/** Vem äger larmutrustningen hemma hos kunden. */
export type Ownership =
  /** Bolagets egendom under hela avtalstiden, ingen möjlighet att köpa loss. */
  | "bolaget"
  /** Bolagets egendom, men kunden kan friköpa enligt publicerad trappa. */
  | "frikop"
  /** Kunden äger utrustningen från början. */
  | "kunden";

export const OWNERSHIP_LABELS: Record<Ownership, string> = {
  bolaget: "Bolaget äger, går inte att köpa loss",
  frikop: "Bolaget äger, går att friköpa",
  kunden: "Du äger utrustningen",
};

/** Ett steg i en friköpstrappa, t.ex. "inom 2 år: 7 000 kr". */
export type BuyoutStep = {
  /** Övre gräns i månader från installation. `null` = allt därefter. */
  untilMonths: number | null;
  /** Pris i kronor. */
  price: number;
  label: string;
};

/** En avgift som utlöses när avtalet avslutas eller sköts på ett visst sätt. */
export type ExitFee = {
  label: string;
  /** `null` när avgiften finns men beloppet inte publiceras. */
  amount: number | null;
  /** Var det står, t.ex. "Allmänna villkor 2025:1 p. 13". */
  source: string;
  /** Utlöses bara i vissa lägen, t.ex. om du inte ger tillträde. */
  conditional?: boolean;
};

export type ServiceTerms = {
  /**
   * Månadsavgift i kronor. `null` när bolaget inte publicerar den, vilket är
   * normalfallet i den här branschen och alltså inte ett fel i datan.
   */
  monthlyFee: number | null;
  /** Startavgift, uppkopplingsavgift eller startpaket. `null` = ej publicerad. */
  startFee: number | null;
  /** Vad bolaget själv kallar startavgiften. */
  startFeeLabel?: string;
  /**
   * Startavgift **utan** bindningstid, när bolaget prissätter valet.
   * Verisure tar 3 990 kr med tolv månaders bindning och 5 990 kr utan, alltså
   * kostar friheten 2 000 kronor. Det är sidans mest användbara enskilda tal
   * och det finns inget fält för det i någon produkttyp.
   */
  startFeeWithoutBinding?: number | null;
  /**
   * Bindningstid i månader. `0` = ingen bindningstid, `null` = publiceras inte.
   * Skillnaden är hela poängen: Sector anger 24 månader för företagskunder och
   * ingenting för privatkunder.
   */
  bindingMonths: number | null;
  /** Uppsägningstid i månader. */
  noticeMonths: number | null;
  /** Avgift för pappersfaktura, per faktura. */
  invoiceFee?: number | null;
  /** Efter hur många månader bolaget får höja priset fritt. */
  priceChangeAfterMonths?: number | null;
  /** Självriskeliminering, maxbelopp i kronor. */
  excessCover?: number | null;
  /** Om självriskelimineringen gäller per år i stället för per skada. */
  excessCoverPerYear?: boolean;
  ownership: Ownership;
  /** Publicerad friköpstrappa, äldst sist. */
  buyout?: BuyoutStep[];
  /**
   * Bolagets egen brasklapp om vad ett friköp faktiskt ger.
   *
   * Eget fält och inte en hårdkodad mening i verktyget: i dag är Verisure det
   * enda bolaget med en friköpstrappa, men ett verktyg som skriver Verisures
   * formulering över vilken trappa som helst hade blivit fel i samma sekund
   * som ett andra bolag införde friköp.
   */
  buyoutNote?: string;
  /** Avgifter vid avslut. */
  exitFees?: ExitFee[];
  /** Ångerrätt i dagar. Nästan alltid 14 enligt distansavtalslagen. */
  withdrawalDays?: number | null;
  /** Länk till avtalsdokumentet i original. */
  termsUrl?: string;
  /** Utgåva, t.ex. "2025:1" eller "SAS 2.1". */
  termsVersion?: string;
  /** ISO-datum då villkoren lästes. */
  termsCheckedAt?: string;
};

/**
 * Hur mycket av priset som går att ta reda på innan man släpper in en säljare.
 *
 * Härleds i `disclosureOf()` och sätts aldrig för hand, av samma skäl som
 * `score` på en produkt är härledd: ett fält som både kan sättas och räknas ut
 * hamnar förr eller senare i konflikt med sig självt.
 */
export type PriceDisclosure = "publicerat" | "delvis" | "dolt";

export const DISCLOSURE_LABELS: Record<PriceDisclosure, string> = {
  publicerat: "Månadsavgift och startavgift publicerade",
  delvis: "Bara en del av priset publicerat",
  dolt: "Inget pris publicerat",
};

export type Service = {
  id: string;
  /** Tjänstens namn utan bolaget, t.ex. "Smart Voice Alarm". */
  name: string;
  /** Kortare namn för trånga lägen. Faller tillbaka på `name`. */
  shortName?: string;
  /** Bolaget som levererar. Motsvarigheten till `Product.brand`. */
  provider: string;
  /**
   * Lämnas tom med flit, och `/hemlarm` är därför sajtens enda bildlösa sida.
   *
   * Fältet ärvdes från `Product` när tjänstetypen skrevs, och står kvar utan
   * att sättas eller läsas. Beslutat 2026-08-03: **en tjänst har ingen
   * produktbild.** Det finns ingen kartong att fotografera, och det enda
   * bildmaterial som existerar för ett larmbolag är dess logotyp. Att
   * publicera åtta konkurrenters varumärkesmaterial är ett annat slags beslut
   * än att visa en packshot, och det ansåg vi inte var värt det här.
   *
   * ⚠️ Att sidan saknar bilder är alltså inte en lucka. En kvalitetsgranskning
   * som räknar bilder per sida kommer att flagga `/hemlarm`, och svaret står
   * här. Vill någon ändå ge tjänstesidorna ett visuellt uttryck är vägen
   * ikoner ur vårt eget formspråk, inte hämtade logotyper, och då ska det bli
   * en egen komponent under `components/service/` snarare än det här fältet.
   */
  image?: string;
  tagline: string;
  /** Per kriterium, 0–5. Källan till sanning; `score` och `rating` härleds. */
  scores: Record<string, number>;
  /** Härledd: viktat medel på skalan 0–10. Sätts aldrig för hand. */
  score: number;
  /** Härledd: samma viktade medel på skalan 0–5. */
  rating: number;
  /** Kundbetyg från tredje part. Visas och attribueras, vägs aldrig in. */
  userRating?: UserRating;
  terms: ServiceTerms;
  /** Vad som ingår i hårdvarupaketet. */
  included?: string[];
  currency?: ServiceCurrency;
  /**
   * AFFILIATE-SWAP — bolagets egen sida, kanonisk URL efter omdirigeringar.
   * Det är den som ligger i href i dag.
   */
  providerUrl: string;
  /** AFFILIATE-SWAP — nätverkslänk. Saknas tills vi går med i programmet. */
  affiliateUrl?: string;
  /** ISO-datum då uppgifterna lästes hos bolaget. */
  checkedAt?: string;
  award?: AwardKind;
  superlative?: string;
  pros: string[];
  cons: string[];
  specs: Spec[];
  verdict?: string;
};

/** Tjänster som de skrivs: kriteriebetyg, inga totaler. */
export type ServiceSeed = Omit<Service, "score" | "rating">;

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Fyll i de härledda totalerna på datalagret, precis som `resolveProducts`.
 * Sorterar fallande på betyg, eftersom en lista där fyran slår trean läses som
 * riggad.
 */
export function resolveServices(
  testPage: TestPage,
  seeds: ServiceSeed[],
  options: { sort?: boolean } = {},
): Service[] {
  const resolved = seeds.map((seed) => {
    /* Samma som resolveProducts: båda talen ur samma oavrundade summa. */
    const raw = weightedRating(seed.scores, testPage.criteria);
    return { ...seed, rating: round1(raw), score: round1(raw * 2) };
  });

  if (options.sort === false) return resolved;
  return [...resolved].sort((a, b) => b.score - a.score);
}

const sekFormatter = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0,
});

/**
 * Formatera ett belopp som kan saknas.
 *
 * Finns för att göra det svårt att råka rendera en frånvarande uppgift som
 * `0 kr`. Varje anropare får tillbaka en färdig sträng och behöver aldrig
 * fatta beslutet själv.
 */
export function formatFee(
  amount: number | null | undefined,
  fallback = "Publiceras inte",
): string {
  if (typeof amount !== "number") return fallback;
  return sekFormatter.format(amount);
}

/** Bindningstid i klartext, med noll och saknad uppgift åtskilda. */
export function formatBinding(months: number | null | undefined): string {
  if (typeof months !== "number") return "Publiceras inte";
  if (months === 0) return "Ingen bindningstid";
  return `${months} mån`;
}

/**
 * Hur öppet bolaget prissätter sig.
 *
 * Härledd och inte skriven för hand: uppgiften ska följa datan automatiskt,
 * så att ett bolag som börjar publicera sin månadsavgift byter klass utan att
 * någon minns att ändra ett andra fält.
 */
export function disclosureOf(terms: ServiceTerms): PriceDisclosure {
  const hasMonthly = typeof terms.monthlyFee === "number";
  const hasStart = typeof terms.startFee === "number";
  if (hasMonthly && hasStart) return "publicerat";
  if (hasMonthly || hasStart) return "delvis";
  return "dolt";
}

/**
 * Vad tjänsten kostar under `months` månader, startavgiften inräknad.
 *
 * Returnerar `null` så snart månadsavgiften saknas, i stället för att gissa.
 * Det är skälet till att räknaren på sidan visar ett tomt fält för sju av åtta
 * bolag, och det är en korrekt återgivning av verkligheten och inte ett fel.
 */
export function totalCost(
  terms: ServiceTerms,
  months: number,
  options: { withBinding?: boolean } = {},
): number | null {
  if (typeof terms.monthlyFee !== "number") return null;

  const start =
    options.withBinding === false &&
    typeof terms.startFeeWithoutBinding === "number"
      ? terms.startFeeWithoutBinding
      : terms.startFee;

  return terms.monthlyFee * months + (typeof start === "number" ? start : 0);
}

/**
 * Vad det kostar att lämna efter `months` månader.
 *
 * Tre delar, och den sista är den som förvånar:
 *
 * 1. Uppsägningstiden, som är månadsavgift gånger antal månader du betalar
 *    utan att egentligen vilja vara kvar.
 * 2. Friköpspriset i det steg du befinner dig i, om du vill behålla
 *    hårdvaran.
 * 3. Villkorade avgifter räknas **inte** in, eftersom de bara utlöses om du
 *    missköter avslutet. De redovisas separat i gränssnittet i stället, så att
 *    ett tal vi presenterar som kostnad aldrig innehåller något du kan undvika.
 */
export function exitCost(
  terms: ServiceTerms,
  months: number,
  options: { keepHardware?: boolean } = {},
): { notice: number | null; buyout: number | null; total: number | null } {
  const notice =
    typeof terms.monthlyFee === "number" && typeof terms.noticeMonths === "number"
      ? terms.monthlyFee * terms.noticeMonths
      : null;

  const buyout = options.keepHardware ? buyoutPriceAt(terms, months) : 0;

  const total =
    notice === null || buyout === null ? null : notice + buyout;

  return { notice, buyout, total };
}

/**
 * Friköpspriset vid en given tidpunkt.
 *
 * `null` när bolaget inte erbjuder friköp alls, vilket är fallet hos Sector
 * Alarm: enligt punkt 8 i deras avtalsvillkor förvärvar kunden aldrig någon
 * rätt till larmsystemet utöver nyttjanderätten.
 */
export function buyoutPriceAt(
  terms: ServiceTerms,
  months: number,
): number | null {
  if (!terms.buyout?.length) return null;
  for (const step of terms.buyout) {
    if (step.untilMonths === null || months <= step.untilMonths) {
      return step.price;
    }
  }
  return terms.buyout[terms.buyout.length - 1].price;
}

/** Villkorade avgifter, alltså sådana du kan undvika. Redovisas separat. */
export function conditionalFees(terms: ServiceTerms): ExitFee[] {
  return (terms.exitFees ?? []).filter((fee) => fee.conditional);
}

/** Ovillkorade avgifter vid avslut. */
export function unconditionalFees(terms: ServiceTerms): ExitFee[] {
  return (terms.exitFees ?? []).filter((fee) => !fee.conditional);
}

/** Visningsnamn: "Verisure Smart Voice Alarm". */
export function serviceTitle(service: Service): string {
  return `${service.provider} ${service.name}`;
}
