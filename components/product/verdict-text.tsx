import { Fragment } from "react";

import { cn } from "@/lib/utils";

/**
 * Sajtens styckerenderare. Tomrad blir nytt stycke, `**text**` blir fetstil.
 *
 * Används av omdömena, av `MethodologyBlock` (ingress, kriteriebeskrivningar
 * och fotnot) och av källnoterna i `SourceList`. Namnet är kvar från 2026-08-03
 * då den bara gällde omdömen; kontraktet är numera bredare.
 *
 * ## Varför komponenten finns
 *
 * Omdömena i `lib/data/*.ts` är skrivna i stycken, med `\n\n` emellan och
 * `**fetstil**` på den mening som bär poängen. Fram till 2026-08-03 skickades
 * strängen rakt in i ett enda `<p>`, och HTML gör radbrytningar till mellanslag.
 * Resultatet var att **varje omdöme på sajten renderades som ett enda block**,
 * och att fetstilen syntes som två asterisker runt orden.
 *
 * Det var mätbart illa: testvinnarens omdöme på `/avfuktare` är omkring 1 900
 * tecken, och blev 375 pixlar sammanhängande löptext i 918 pixlars bredd. Ingen
 * läser det. Texten var alltså redan skriven för att brytas, det var
 * renderingen som slängde bort styckena.
 *
 * ## Vad som stöds, och varför inte mer
 *
 * Bara två saker: tomrad blir nytt stycke, och `**text**` blir `<strong>`.
 * Ingen fullständig markdown, eftersom omdömen inte ska innehålla rubriker,
 * listor eller länkar. Behöver ett stycke en länk hör det hemma i köpguiden,
 * som är MDX och har hela apparaten.
 *
 * ⚠️ Asteriskerna paras ihop i tur och ordning. Ett ensamt `**` lämnas som text
 * i stället för att svälja resten av stycket.
 */
export function VerdictText({
  text,
  className,
}: {
  /* Valfri, eftersom `Product.verdict` är det. En produkt utan omdöme ska ge
     ingenting alls i stället för en tom ruta med marginaler. */
  text: string | undefined;
  className?: string;
}) {
  const stycken = (text ?? "").split(/\n{2,}/).filter((s) => s.trim().length > 0);
  if (stycken.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-[0.9em]", className)}>
      {stycken.map((stycke, i) => (
        <p key={i}>{medFetstil(stycke.trim())}</p>
      ))}
    </div>
  );
}

/** `a **b** c` blir `a <strong>b</strong> c`. Udda asterisker lämnas i fred. */
function medFetstil(stycke: string) {
  const delar = stycke.split("**");
  if (delar.length < 3) return stycke;

  /* Ett udda antal delar betyder jämnt antal asterisker, alltså att alla
     öppnande har en stängande. Är antalet ojämnt lämnas stycket orört, för då
     är någon asterisk en skrivmiss och vi vill hellre visa den än gissa. */
  if (delar.length % 2 === 0) return stycke;

  return delar.map((del, i) =>
    i % 2 === 1 ? <strong key={i}>{del}</strong> : <Fragment key={i}>{del}</Fragment>,
  );
}
