"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { SEARCH_INDEX, searchDocs, type SearchDoc } from "@/lib/search-index";

export type SiteSearchProps = {
  /**
   * trigger — icon button that opens an overlay panel. Fits a full nav bar.
   * inline  — always-visible field, for a dedicated search page.
   */
  variant?: "trigger" | "inline";
  docs?: SearchDoc[];
  placeholder?: string;
  limit?: number;
  className?: string;
};

export function SiteSearch({
  variant = "trigger",
  docs = SEARCH_INDEX,
  placeholder = "Sök efter en produktkategori",
  limit = 6,
  className,
}: SiteSearchProps) {
  const router = useRouter();
  const [open, setOpen] = useState(variant === "inline");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => searchDocs(query, docs).slice(0, limit),
    [query, docs, limit],
  );

  useEffect(() => {
    if (open && variant === "trigger") inputRef.current?.focus();
  }, [open, variant]);

  function close() {
    if (variant === "inline") return;
    setOpen(false);
    setQuery("");
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") return close();
    if (!results.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      router.push(results[active].href);
      close();
    }
  }

  const field = (
    /* `shrink-0` so the field keeps its height when the panel is capped and
       the list below it is the thing that gives. */
    <div className="relative shrink-0">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          /* Reset the highlight here rather than in an effect: a new query is
             an event, not state to synchronise after the fact. */
          setActive(0);
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label="Sök på sajten"
        className="themed-border w-full rounded-md bg-background py-2 pr-3 pl-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
    </div>
  );

  const resultList =
    query.trim().length >= 2 ? (
      results.length ? (
        /* `min-h-0` is what lets this be shorter than its content: a flex
           child defaults to `min-height: auto` and refuses to shrink, so
           `overflow-y-auto` would be handed a box already grown to fit
           everything and would have nothing to scroll. */
        <ul className="mt-2 flex min-h-0 flex-1 flex-col overflow-y-auto">
          {results.map((doc, i) => (
            <li key={doc.href}>
              <Link
                href={doc.href}
                onClick={close}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "flex flex-col gap-0.5 rounded-md px-3 py-2",
                  i === active && "bg-muted",
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="font-medium">{doc.title}</span>
                  <span className="eyebrow text-muted-foreground">
                    {doc.kind}
                  </span>
                </span>
                <span className="text-sm text-muted-foreground">
                  {doc.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 px-3 text-sm text-muted-foreground">
          Inga träffar på {`"${query}"`}. Prova produktkategorin i stället, till
          exempel robotdammsugare.
        </p>
      )
    ) : null;

  if (variant === "inline") {
    return (
      <div data-slot="site-search" className={className}>
        {field}
        {resultList}
      </div>
    );
  }

  return (
    <div data-slot="site-search" className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Sök"
        aria-expanded={open}
        className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {open ? (
          <X aria-hidden="true" className="size-4" />
        ) : (
          <Search aria-hidden="true" className="size-4" />
        )}
      </button>

      {open ? (
        <div
          /* On a phone the panel is a sheet under the header, not something
           * hung off the button.
           *
           * It used to be `absolute right-0` with the width clamped to
           * `min(22rem, 100vw-2rem)`. Clamping the width without moving the
           * anchor does not keep a panel on the screen: the trigger sits
           * inboard of the hamburger, so the panel grew leftward from a point
           * about 24px in from the right edge and ran off the other side.
           * Measured before the change: -24..264 at 320px, -24..304 at 360px,
           * -18..334 at 390px, with the document no wider than the window, so
           * the missing strip was clipped rather than scrollable. It came
           * right only at 430px and up, which is why it looks fine on a
           * desktop and on most tablets.
           *
           * `inset-x-4` sets both edges instead of one, so the width follows
           * from the screen and there is no anchor left to overflow. Above md
           * the old anchored panel is restored exactly.
           *
           * The header carries `backdrop-blur-sm`, and a backdrop-filter makes
           * an element a containing block for fixed descendants, so this is
           * positioned against the header rather than the viewport. That is
           * harmless here only because the header is full-width and stuck to
           * the top, which makes the two equivalent — checked at several
           * widths and scroll positions rather than assumed. */
          className={cn(
            "themed-border z-40 flex flex-col rounded-lg bg-card pad-card shadow-raised",
            /* Capped, because the list underneath has no natural limit. Six
             * hits already made the panel 862px tall with its bottom at 934px,
             * so on a 780px screen the last result sat 154px below the fold and
             * on a 420px one, 514px below it, with nothing able to scroll. The
             * cap leaves the 72px top offset plus a matching margin at the
             * bottom. `dvh` rather than `vh`: on a phone `vh` is the height
             * with the browser chrome retracted, so a panel sized in `vh`
             * hides its own last row under the address bar. */
            "fixed inset-x-4 top-[4.5rem] max-h-[calc(100dvh-5.5rem)]",
            "md:absolute md:inset-x-auto md:top-11 md:right-0 md:w-[22rem] md:max-h-[70dvh]",
          )}
        >
          {field}
          {resultList}
        </div>
      ) : null}
    </div>
  );
}
