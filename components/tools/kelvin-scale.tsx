"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Approximate sRGB for a colour temperature, so the preview looks like the
 * number rather than merely stating it. Interpolated between measured anchor
 * points; this is an illustration, not a colorimetric reference.
 */
const ANCHORS: { k: number; rgb: [number, number, number] }[] = [
  { k: 2000, rgb: [255, 141, 11] },
  { k: 2200, rgb: [255, 157, 63] },
  { k: 2700, rgb: [255, 183, 118] },
  { k: 3000, rgb: [255, 196, 137] },
  { k: 4000, rgb: [255, 228, 206] },
  { k: 5000, rgb: [255, 245, 242] },
  { k: 5500, rgb: [255, 249, 253] },
  { k: 6500, rgb: [227, 233, 255] },
];

function kelvinToRgb(k: number): string {
  const clamped = Math.min(6500, Math.max(2000, k));
  let lo = ANCHORS[0];
  let hi = ANCHORS[ANCHORS.length - 1];
  for (let i = 0; i < ANCHORS.length - 1; i += 1) {
    if (clamped >= ANCHORS[i].k && clamped <= ANCHORS[i + 1].k) {
      lo = ANCHORS[i];
      hi = ANCHORS[i + 1];
      break;
    }
  }
  const span = hi.k - lo.k || 1;
  const t = (clamped - lo.k) / span;
  const mix = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${mix(lo.rgb[0], hi.rgb[0])} ${mix(lo.rgb[1], hi.rgb[1])} ${mix(lo.rgb[2], hi.rgb[2])})`;
}

const NOTES: { max: number; name: string; use: string }[] = [
  { max: 2300, name: "Levandeljus", use: "Stämning på kvällen. Nästan orange." },
  { max: 2900, name: "Varmvitt", use: "Motsvarar en gammal glödlampa. Vardagsrum och sovrum." },
  { max: 3500, name: "Varmt neutralt", use: "Kök och hall. Vaket utan att bli kyligt." },
  { max: 4600, name: "Neutralvitt", use: "Arbetsrum och badrum. Här börjar det kännas som kontor." },
  { max: 5600, name: "Kallvitt", use: "Garage och tvättstuga. Sällan trivsamt i vardagsrummet." },
  { max: 6500, name: "Dagsljus", use: "Morgonljus som väcker. Obehagligt på kvällen." },
];

export type KelvinScaleProps = { className?: string };

export function KelvinScale({ className }: KelvinScaleProps) {
  const [kelvin, setKelvin] = useState(2700);
  const note = NOTES.find((n) => kelvin <= n.max) ?? NOTES[NOTES.length - 1];

  return (
    <div
      data-slot="kelvin-scale"
      className={cn("flex flex-col gap-row", className)}
    >
      <div
        aria-hidden="true"
        className="themed-border flex h-28 items-center justify-center rounded-md transition-colors"
        style={{ backgroundColor: kelvinToRgb(kelvin) }}
      >
        <span className="font-heading text-2xl text-neutral-900/70 tabular-nums">
          {kelvin.toLocaleString("sv-SE")} K
        </span>
      </div>

      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium">Färgtemperatur</span>
        <input
          type="range"
          min={2000}
          max={6500}
          step={100}
          value={kelvin}
          onChange={(e) => setKelvin(e.target.valueAsNumber)}
          className="w-full accent-[var(--brand)]"
        />
        <span className="flex justify-between text-xs text-muted-foreground">
          <span>2 000 K varmt</span>
          <span>6 500 K kallt</span>
        </span>
      </label>

      <div className="rounded-md bg-muted pad-card">
        <p className="font-heading">{note.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{note.use}</p>
      </div>

      <p className="text-xs text-muted-foreground">
        Färgerna är en illustration av hur talet upplevs, inte en kolorimetrisk
        referens. Hur ljuset faktiskt ser ut beror också på lampans
        färgåtergivning.
      </p>
    </div>
  );
}
