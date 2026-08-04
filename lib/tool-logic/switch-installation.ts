/**
 * Vilken sorts smart strömbrytare som fungerar i dosan, och vad du får göra själv.
 *
 * Gränsen går mellan två arbeten som ser lika ut och inte är det. Att byta en
 * befintlig strömbrytare är tillåtet för en privatperson som vet hur. Att lägga
 * in en relämodul i dosan är en förändring av den fasta installationen och
 * kräver ett registrerat elinstallationsföretag. Formuleringarna nedan är
 * Elsäkerhetsverkets egna, inte vår försiktighet.
 *
 * Produktkraven lämnas som `needsKind`, `needsNoNeutral` och
 * `needsSelfInstall`. Urvalet görs i widgeten, som har produkterna. Den här
 * modulen har dem inte.
 */

export const NEUTRAL_OPTIONS = [
  { key: "ja", label: "Ja, jag har nolla" },
  { key: "nej", label: "Nej, ingen nolla" },
  { key: "vetej", label: "Vet inte" },
] as const;

export const KEEP_OPTIONS = [
  { key: "behall", label: "Den ska sitta kvar" },
  { key: "byt", label: "Jag byter gärna knapp" },
] as const;

export const WHO_OPTIONS = [
  { key: "sjalv", label: "Jag själv" },
  { key: "elektriker", label: "En elektriker" },
] as const;

export type NeutralKey = (typeof NEUTRAL_OPTIONS)[number]["key"];
export type KeepKey = (typeof KEEP_OPTIONS)[number]["key"];
export type WhoKey = (typeof WHO_OPTIONS)[number]["key"];

export type InstallationVerdict = {
  /** Rubriksvaret: vilken produkttyp som gäller. */
  headline: string;
  /** Vad reglerna säger om just den här kombinationen. */
  legal: string;
  why: string;
  warning?: string;
  /**
   * Kraven i maskinläsbar form, så att produktförslaget filtreras på exakt
   * samma villkor som texten visar. Null betyder att ingen av de rankade
   * produkterna passar och att texten förklarar varför i stället.
   */
  needsKind: "rela" | "brytare" | null;
  needsNoNeutral: boolean;
  needsSelfInstall: boolean;
};

export function decideInstallation(
  neutral: NeutralKey | null,
  keep: KeepKey | null,
  who: WhoKey | null,
): InstallationVerdict | null {
  if (!neutral || !keep || !who) return null;

  const selfInstall = who === "sjalv";
  const noNeutral = neutral === "nej";

  /* Utan nolledare faller varje relämodul bort, oavsett vad läsaren svarat om
     knappen. Att dra fram en nolla är en ändring av den fasta installationen
     och alltså inte en väg runt problemet på egen hand. */
  if (noNeutral) {
    if (keep === "behall") {
      return {
        needsKind: null,
        needsNoNeutral: true,
        needsSelfInstall: selfInstall,
        headline: "Ingen relämodul fungerar",
        legal:
          "Att dra fram en nolledare till dosan är en förändring av den fasta installationen och kräver ett registrerat elinstallationsföretag. Det är inget du får göra själv.",
        why: "Varenda relämodul i jämförelsen behöver nolledare för att kunna hålla sin elektronik igång dygnet runt. Saknas nolla i dosan går den vägen inte, och då finns två alternativ: byt själva knappen mot en smart brytare som klarar sig utan nolledare, eller sätt en trådlös batteribrytare ovanpå den gamla.",
        warning:
          "Vill du ändå ha en relämodul måste någon dra fram nolledaren först. Räkna med att det kostar mer i arbete än modulen kostar i inköp.",
      };
    }
    return {
      needsKind: "brytare",
      needsNoNeutral: true,
      needsSelfInstall: selfInstall,
      headline: "Smart väggbrytare utan krav på nolledare",
      legal: selfInstall
        ? 'Det här är ett brytarbyte. Elsäkerhetsverket skriver: "Du får själv byta en befintlig strömbrytare för högst 16 A, som är placerad i en egen kapsling eller dosa", med tillägget "om du vet hur du ska göra".'
        : "Ett brytarbyte får du göra själv om du vet hur, men det är aldrig fel att låta någon annan göra det.",
      why: "Utan nolledare i dosan faller alla relämoduler bort. Kvar står brytare som är konstruerade för att klara sig utan, och de ersätter hela knappen i stället för att gömma sig bakom den.",
      warning: selfInstall
        ? "Bryt strömmen först och kontrollera att den är bruten. Är du det minsta osäker ska du enligt Elsäkerhetsverket kontakta ett elinstallationsföretag. Felaktiga kopplingar kan innebära livsfara."
        : undefined,
    };
  }

  /* Med nolledare i dosan är båda vägarna öppna, och då avgör knappen och vem
     som ska hålla i skruvmejseln. */
  if (keep === "behall") {
    return {
      needsKind: "rela",
      needsNoNeutral: false,
      needsSelfInstall: false,
      headline: "Relämodul bakom din befintliga brytare",
      legal:
        "Att lägga in en modul i dosan är en förändring av den fasta installationen, inte ett brytarbyte, och kräver ett registrerat elinstallationsföretag. Kjell anger själv att installationen kräver behörig elektriker på flera av de här produkterna.",
      why: "Modulen göms i väggdosan och din knapp fungerar precis som förut, samtidigt som lampan går att styra från appen. Det är den lösning som syns minst och som behåller husets utseende.",
      warning: selfInstall
        ? "Du svarade att du vill göra jobbet själv. Just den här typen är undantaget: en relämodul är inte ett brytarbyte utan en ändring av installationen. Vill du göra det själv ska du i stället byta knappen mot en smart brytare, eller sätta upp en trådlös batteribrytare."
        : undefined,
    };
  }

  return {
    needsKind: "brytare",
    needsNoNeutral: false,
    needsSelfInstall: selfInstall,
    headline: "Smart väggbrytare som ersätter knappen",
    legal: selfInstall
      ? 'Det här är ett brytarbyte. Elsäkerhetsverket skriver: "Du får själv byta en befintlig strömbrytare för högst 16 A, som är placerad i en egen kapsling eller dosa", med tillägget "om du vet hur du ska göra".'
      : "Ett brytarbyte får du göra själv om du vet hur, men det är aldrig fel att låta någon annan göra det.",
    why: "Hela knappen byts mot en ny med elektronik i. Du får nya funktioner direkt på väggen i stället för en osynlig modul, och du slipper trängseln i dosan som en extra modul innebär.",
    warning: selfInstall
      ? "Bryt strömmen först och kontrollera att den är bruten. Är du det minsta osäker ska du enligt Elsäkerhetsverket kontakta ett elinstallationsföretag. Felaktiga kopplingar kan innebära livsfara."
      : undefined,
  };
}
