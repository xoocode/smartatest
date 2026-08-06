/**
 * Vilken sorts gardinmotor som går att montera i ett givet fönster.
 *
 * Kraven lämnas som `needsWindow` och `needsMount`. Produkturvalet görs i
 * widgeten.
 */

export type CurtainWindow = "gardin" | "rullgardin" | "persienn";
export type CurtainMountType =
  | "stang"
  | "u-skena"
  | "i-skena"
  | "kedja"
  | "lamell"
  | "ersatter";

export const CURTAIN_WINDOWS = [
  { key: "gardin", label: "Gardintyg som dras åt sidan" },
  { key: "rullgardin", label: "Rullgardin med kedja" },
  { key: "persienn", label: "Persienn med lameller" },
] as const;

export const CURTAIN_MOUNTS = [
  { key: "u-skena", label: "U-skena" },
  { key: "i-skena", label: "I-skena" },
  { key: "stang", label: "Gardinstång" },
  { key: "vetej", label: "Vet inte" },
] as const;

export const CURTAIN_NOISE = [
  { key: "tyst", label: "Ja, den står i ett sovrum" },
  { key: "spelarroll", label: "Spelar mindre roll" },
] as const;

export type CurtainWindowKey = (typeof CURTAIN_WINDOWS)[number]["key"];
export type CurtainMountKey = (typeof CURTAIN_MOUNTS)[number]["key"];
export type CurtainNoiseKey = (typeof CURTAIN_NOISE)[number]["key"];

export type MountVerdict = {
  /** Rubriksvaret: vilken produkttyp som gäller. */
  headline: string;
  why: string;
  warning?: string;
  /**
   * Kraven i maskinläsbar form, så att produktförslaget filtreras på exakt
   * samma villkor som texten visar.
   */
  needsWindow: CurtainWindow;
  /** Null när fönstertypen ensam avgör, som för rullgardin och persienn. */
  needsMount: CurtainMountType | null;
  quietFirst: boolean;
};

export function decideMount(
  win: CurtainWindowKey | null,
  mount: CurtainMountKey | null,
  noise: CurtainNoiseKey | null,
): MountVerdict | null {
  if (!win || !noise) return null;
  /* Skentypen frågas bara för gardintyg. Rullgardin och persienn avgörs helt
     av fönstertypen, så att kräva ett svar där vore att fråga om något som
     inte påverkar utfallet. */
  if (win === "gardin" && !mount) return null;

  const quietFirst = noise === "tyst";

  if (win === "rullgardin") {
    /* needsMount är null och inte "kedja": rullgardin löses på två sätt, med en
       motor som drar i den befintliga kedjan eller med en komplett gardin som
       ersätter hela upphängningen. Båda ska visas, och skillnaden mellan dem
       står i texten. */
    return {
      needsWindow: "rullgardin",
      needsMount: null,
      quietFirst,
      headline: "Kedjemotor eller en helt ny rullgardin",
      why: "En gardinrobot kan inte flytta en rullgardin, eftersom den är byggd för att åka i sidled längs en skena. Här finns två vägar. Antingen en motor som hakar i kedjan och rullar upp och ner gardinen du redan har, vilket är det billiga alternativet. Eller en komplett motoriserad rullgardin som ersätter hela den gamla, vilket kostar ungefär tre gånger så mycket men slipper kämpa mot någon annans mekanism.",
      warning:
        "Kedjemotorerna är kategorins svagaste punkt på batteri. Räkna med laddning varannan månad, inte varje år.",
    };
  }

  if (win === "persienn") {
    return {
      needsWindow: "persienn",
      needsMount: "lamell",
      quietFirst,
      headline: "Persiennmotor som vinklar lamellerna",
      why: "För persienner finns en egen produkttyp som sätts på vridmekanismen och vrider lamellerna, med ljussensor som kan följa solen under dagen. Utbudet är dock magert: vi hittade ett enda eftermonterat alternativ i svensk handel.",
      warning:
        "Den vinklar lamellerna, den hissar inte upp persiennen. Kontrollera din persienntyp mot tillverkarens lista innan du beställer.",
    };
  }

  if (mount === "vetej") {
    return {
      needsWindow: "gardin",
      needsMount: null,
      quietFirst,
      headline: "Ta reda på upphängningen först",
      why: "Titta uppåt innan du beställer. Ett runt rör där gardinen hänger i ringar eller öglor är en gardinstång. En profil där gardinen löper i glidare inuti är en skena, och är profilen öppen nedåt som ett upp och nedvänt U är det en U-skena.",
      warning:
        "Gissa inte. Motorerna säljs som olika artikelnummer per upphängning, och fel artikel går inte att montera alls.",
    };
  }

  if (mount === "stang") {
    return {
      needsWindow: "gardin",
      needsMount: "stang",
      quietFirst,
      headline: "Gardinmotor för stång, ett eget artikelnummer",
      why: "Har du gardinstång behöver du stångvarianten av motorn. Den finns från båda tillverkarna, men den är ett eget artikelnummer och inte samma vara som skenversionen.",
      warning:
        "Beställ på artikelnumret och inte på modellnamnet. Skenversionen och stångversionen heter nästan likadant, ligger bredvid varandra i butikens lista och kostar ungefär lika mycket.",
    };
  }

  if (mount === "i-skena") {
    return {
      needsWindow: "gardin",
      needsMount: "i-skena",
      quietFirst,
      headline: "I-skena, och då är det Aqaras skenversion",
      why: "Aqara Curtain Driver E1 i skenversion är den enda motorn vi rankar som får sitta på en I-skena. SwitchBot säljer en egen I-skenevariant, men den finns inte hos någon butik vi länkar till.",
      warning:
        "Mät skenan innan du beställer. Aqara kräver att I-skenans underkant är slät och bredare än 10 millimeter, och produkten kräver dessutom en Aqara-hubb för att fungera alls.",
    };
  }

  return {
    needsWindow: "gardin",
    needsMount: "u-skena",
    quietFirst,
    headline: "Gardinrobot för U-skena",
    why: "Det vanligaste fallet i svenska hem, och det är också här utbudet är störst. Roboten klämmer fast i skenan och drar gardinen i sidled utan att du behöver ändra något i upphängningen.",
    warning: quietFirst
      ? "Du svarade att den ska stå i ett sovrum. Ljudnivån skiljer stort och bara den ena tillverkaren anger en siffra, så läs den raden noga."
      : undefined,
  };
}
