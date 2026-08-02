import { cn } from "@/lib/utils";

/**
 * Incandescent watts to the LED lumen output that replaces them.
 *
 * Deliberately a server component with no interactivity. The whole job is a
 * lookup, and a table that works without JavaScript beats a converter that
 * needs it.
 */
const ROWS = [
  { watt: 25, lumen: "220 lm", use: "Dekorationslampa, nattlampa" },
  { watt: 40, lumen: "470 lm", use: "Sänglampa, mindre bordslampa" },
  { watt: 60, lumen: "806 lm", use: "Vanligast av alla. Taklampa i sovrum" },
  { watt: 75, lumen: "1 055 lm", use: "Vardagsrum, större bordslampa" },
  { watt: 100, lumen: "1 521 lm", use: "Kök, arbetsrum, mörka rum" },
  { watt: 150, lumen: "2 452 lm", use: "Garage, tvättstuga, verkstad" },
];

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
                  {row.lumen}
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
