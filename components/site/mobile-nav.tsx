"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV } from "@/lib/site";

export type MobileNavProps = {
  items?: typeof NAV;
  label?: string;
  className?: string;
};

/**
 * TestPage menu for phones.
 *
 * Replaces the horizontally scrolling strip this used to be. The strip fit two
 * and a half items on a 390px screen, so every category past "Smart belysning"
 * needed a swipe most people never discovered — the links were present but
 * effectively unreachable. A menu shows all of them at once.
 *
 * Desktop keeps the full inline nav; this only renders below md.
 */
export function MobileNav({
  items = NAV,
  label = "Kategorier",
  className,
}: MobileNavProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* Store *which page* the menu was opened on rather than a bare boolean, and
     derive openness from it. Navigating changes `pathname`, so the panel closes
     itself with no effect and no cascading render — the menu surviving a route
     change and covering the new page is the bug this avoids. */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (next: boolean) => setOpenedOn(next ? pathname : null);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenedOn(null);
        buttonRef.current?.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpenedOn(null);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div data-slot="mobile-nav" className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Stäng menyn" : "Öppna menyn"}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(!open)}
        className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      {open ? (
        <div
          ref={panelRef}
          className="themed-border absolute top-full right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg bg-card shadow-raised"
        >
          <nav aria-label={label}>
            <ul className="flex flex-col py-1">
              {items.map((item) => {
                const current = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      /* Tapping the current page does not change `pathname`,
                         so the derived close never fires. Close explicitly. */
                      onClick={() => setOpenedOn(null)}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "block px-4 py-2.5 text-sm transition-colors hover:bg-muted",
                        current
                          ? "font-medium text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
