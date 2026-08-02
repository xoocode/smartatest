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
    <div className="relative">
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
        <ul className="mt-2 flex flex-col">
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
          /* Anchored to the trigger on desktop, full width on mobile so the
             field never overflows the viewport. */
          className="themed-border absolute top-11 right-0 z-40 w-[min(22rem,calc(100vw-2rem))] rounded-lg bg-card pad-card shadow-raised"
        >
          {field}
          {resultList}
        </div>
      ) : null}
    </div>
  );
}
