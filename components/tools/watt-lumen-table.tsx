import { cn } from "@/lib/utils";
import { WATT_LUMEN_ROWS as ROWS } from "@/lib/tool-logic/watt-lumen";

/**
 * Incandescent watts to the LED lumen output that replaces them.
 *
 * Deliberately a server component with no interactivity. The whole job is a
 * lookup, and a table that works without JavaScript beats a converter that
 * needs it.
 *
 * Raderna bor i lib/tool-logic/watt-lumen.ts, där agentverktyget slår upp i
 * samma tabell. Lumen ligger där som tal och formateras här, så att verktyget
 * kan räkna på värdet i stället för att tolka en sträng.
 */
const lm = new Intl.NumberFormat("sv-SE");

export type WattLumenTableProps = { className?: string };

export function WattLumenTable({ className }: WattLumenTableProps) {
  return (
    <div
      data-slot="watt-lumen-table"
      className={cn("flex flex-col gap-row", className)}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-muted">
              <th scope="col" className="eyebrow px-3 py-2.5">
                Gammal glödlampa
              </th>
              <th scope="col" className="eyebrow px-3 py-2.5">
                Motsvarar
              </th>
              <th scope="col" className="eyebrow px-3 py-2.5">
                Passar till
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.watt} className="border-b border-border">
                <td className="px-3 py-2.5 font-medium tabular-nums whitespace-nowrap">
                  {row.watt} W
                </td>
                <td className="px-3 py-2.5 font-heading text-brand tabular-nums whitespace-nowrap">
                  {lm.format(row.lumen)} lm
                </td>
                <td className="px-3 py-2.5 text-muted-foreground">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        Watt mäter hur mycket ström lampan drar, inte hur mycket den lyser. En
        LED på 9 W ger ungefär lika mycket ljus som en glödlampa på 60 W, vilket
        är hela poängen med bytet.
      </p>
    </div>
  );
}
