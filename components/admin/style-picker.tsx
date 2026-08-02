"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Palette, RotateCcw, SwatchBook, X } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  AWARD_OPTIONS,
  DENSITY_OPTIONS,
  DEFAULT_STYLE,
  RADIUS_OPTIONS,
  TABLE_OPTIONS,
  STYLE_COOKIE,
  THEME_OPTIONS,
  serializeStyleCookie,
  type StyleState,
} from "@/lib/theme";

/**
 * The panel deliberately does NOT use the site's design tokens. It keeps a
 * fixed dark chrome so it stays legible against every theme and never gets
 * mistaken for part of the design being judged.
 */
const chrome = {
  panel: "bg-zinc-900 text-zinc-100 border border-zinc-700 shadow-2xl",
  label: "text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500",
  option:
    "rounded-md px-2.5 py-1.5 text-left text-xs transition-colors border border-transparent",
  optionIdle: "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
  optionActive: "bg-zinc-100 text-zinc-900 font-medium",
};

function writeCookie(next: StyleState) {
  document.cookie = `${STYLE_COOKIE}=${serializeStyleCookie(next)}; path=/; max-age=31536000; samesite=lax`;
}

function applyToDom(next: StyleState) {
  const el = document.documentElement;
  el.dataset.theme = next.theme;
  el.dataset.density = next.density;
  el.dataset.radius = next.radius;
  el.dataset.award = next.award;
  /* Must mirror every attribute the root layout sets, or a toggle writes the
     cookie and appears to do nothing until the next full page load. */
  el.dataset.winnerGrid = next.winnerGrid;
  el.dataset.table = next.table;
}

/**
 * Axes the server renders differently, rather than ones CSS switches from a
 * data attribute. Changing one of these has to re-fetch the page, or the cookie
 * updates and nothing visibly happens until the next hard reload.
 */
const SERVER_RENDERED_AXES: (keyof StyleState)[] = ["table"];

export function StylePicker({ initial }: { initial: StyleState }) {
  const [style, setStyle] = useState<StyleState>(initial);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  /* Mutating the data attributes directly gives instant feedback with no
     re-render or refetch; the cookie only matters for the next full load. */
  function update(patch: Partial<StyleState>) {
    const next = { ...style, ...patch };
    setStyle(next);
    applyToDom(next);
    writeCookie(next);

    /* The table layout is chosen on the server from the cookie, so the markup
       does not change until the route is re-fetched. Without this the picker
       looked broken: the highlight moved, the table did not. */
    if (SERVER_RENDERED_AXES.some((axis) => axis in patch)) {
      router.refresh();
    }
  }

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (panelRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeTheme = THEME_OPTIONS.find((t) => t.id === style.theme);

  if (!open) {
    /* Icon only when collapsed — the header reserves a matching gutter via
       [data-admin] in globals.css, so it never covers a nav item. */
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          chrome.panel,
          "flex size-9 items-center justify-center rounded-full",
        )}
        aria-label={`Stilväljare, nuvarande tema: ${activeTheme?.label}`}
        title={`Stil: ${activeTheme?.label}`}
      >
        <Palette className="size-4" />
      </button>
    );
  }

  return (
    /* Bounded to the viewport and scrollable. The panel grew past the height of
       a laptop screen as axes were added, and being `position: fixed` it simply
       ran off the bottom with no way to reach the last controls. The header row
       stays put so the reset and close buttons are always reachable. */
    <div
      ref={panelRef}
      className={cn(
        chrome.panel,
        "flex max-h-[calc(100dvh-1.5rem)] w-72 flex-col rounded-xl",
      )}
    >
      <div className="flex items-center justify-between px-3.5 pt-3.5 pb-3">
        <span className="flex items-center gap-2 text-xs font-semibold">
          <Palette className="size-4" />
          Stil
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => update(DEFAULT_STYLE)}
            className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
            aria-label="Återställ till standard"
            title="Återställ"
          >
            <RotateCcw className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
            aria-label="Stäng stilväljaren"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* The only scrolling region. min-h-0 is required: a flex child will
          not shrink below its content height without it, and the panel would
          grow past the viewport instead of the list scrolling. */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3.5">
        <fieldset className="mb-3">
          <legend className={cn(chrome.label, "mb-1.5")}>Tema</legend>
          <div className="flex flex-col gap-1">
            {THEME_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => update({ theme: opt.id })}
                className={cn(
                  chrome.option,
                  style.theme === opt.id
                    ? chrome.optionActive
                    : chrome.optionIdle,
                )}
              >
                <span className="block">{opt.label}</span>
                <span
                  className={cn(
                    "mt-0.5 block text-[11px] leading-snug",
                    style.theme === opt.id ? "text-zinc-600" : "text-zinc-500",
                  )}
                >
                  {opt.hint}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-3">
          <legend className={cn(chrome.label, "mb-1.5")}>Täthet</legend>
          <div className="grid grid-cols-2 gap-1">
            {DENSITY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => update({ density: opt.id })}
                title={opt.hint}
                className={cn(
                  chrome.option,
                  "text-center",
                  style.density === opt.id
                    ? chrome.optionActive
                    : chrome.optionIdle,
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-3">
          <legend className={cn(chrome.label, "mb-1.5")}>Utmärkelse</legend>
          <div className="grid grid-cols-2 gap-1">
            {AWARD_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => update({ award: opt.id })}
                title={opt.hint}
                className={cn(
                  chrome.option,
                  "flex items-center gap-2",
                  style.award === opt.id
                    ? chrome.optionActive
                    : chrome.optionIdle,
                )}
              >
                {/* Live swatch of the actual combination, so the choice is made
                  on the colours rather than on the label. */}
                <span
                  data-award={opt.id}
                  className="flex size-4 shrink-0 items-center justify-center rounded-[3px] border text-[8px] font-bold"
                  style={{
                    background: "var(--award)",
                    color: "var(--award-foreground)",
                    borderColor: "var(--award-border)",
                  }}
                >
                  A
                </span>
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-3">
          <legend className={cn(chrome.label, "mb-1.5")}>Hörn</legend>
          <div className="grid grid-cols-3 gap-1">
            {RADIUS_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => update({ radius: opt.id })}
                title={opt.hint}
                className={cn(
                  chrome.option,
                  "text-center",
                  style.radius === opt.id
                    ? chrome.optionActive
                    : chrome.optionIdle,
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-3">
          <legend className={cn(chrome.label, "mb-1.5")}>
            Jämförelsetabell
          </legend>
          <div className="flex flex-col gap-1">
            {TABLE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => update({ table: opt.id })}
                className={cn(
                  chrome.option,
                  style.table === opt.id
                    ? chrome.optionActive
                    : chrome.optionIdle,
                )}
              >
                <span className="block">{opt.label}</span>
                <span
                  className={cn(
                    "mt-0.5 block text-[11px] leading-snug",
                    style.table === opt.id ? "text-zinc-600" : "text-zinc-500",
                  )}
                >
                  {opt.hint}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-3 border-t border-zinc-800 pt-3">
          <legend className={cn(chrome.label, "mb-1.5")}>
            Parkerade avsnitt
          </legend>
          <button
            type="button"
            onClick={() =>
              update({ winnerGrid: style.winnerGrid === "on" ? "off" : "on" })
            }
            aria-pressed={style.winnerGrid === "on"}
            className={cn(
              chrome.option,
              "flex w-full items-center justify-between gap-2",
              chrome.optionIdle,
            )}
          >
            <span>Alla testvinnare</span>
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[10px] font-semibold",
                /* Dark amber on amber rather than neutral black, so the chip
                   reads as one colour rather than black pasted onto yellow.
                   Same reasoning as the `chip` award token in globals.css,
                   which uses a warm brown ink instead of near-black. */
                style.winnerGrid === "on"
                  ? "bg-amber-400 text-amber-950"
                  : "bg-zinc-800 text-zinc-400",
              )}
            >
              {style.winnerGrid === "on" ? "PÅ" : "AV"}
            </span>
          </button>
          <p className="mt-1.5 text-[11px] leading-snug text-zinc-500">
            Bara för intern granskning. Sätts den på bryts sektionernas växlande
            bakgrunder, eftersom de är satta för att avsnittet saknas.
          </p>
        </fieldset>
      </div>

      <div className="shrink-0 p-3.5 pt-2">
        <Link
          href="/styleguide"
          className="flex items-center justify-center gap-2 rounded-md bg-zinc-800 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-700"
        >
          <SwatchBook className="size-3.5" />
          Öppna stilguiden
        </Link>
      </div>
    </div>
  );
}
