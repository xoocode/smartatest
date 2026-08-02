import Link from "next/link";

import { NAV, SITE } from "@/lib/site";
import { Container } from "@/components/site/container";
import { MobileNav } from "@/components/site/mobile-nav";
import { SiteSearch } from "@/components/site/site-search";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-sm">
      <Container size="wide" className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-heading text-lg tracking-tight whitespace-nowrap"
        >
          {SITE.name}
          <span className="text-brand">.se</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <nav aria-label="Kategorier">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <SiteSearch />
        </div>

        {/* Phones get a menu, not a scrolling strip. The strip fit two and a
            half categories on a 390px screen and gave no reliable way to reach
            the rest, so the links existed without working. */}
        <div className="flex items-center gap-1 md:hidden">
          <SiteSearch />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
