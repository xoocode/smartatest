# Traps

Framework-level failures hit while building. Most of these compiled cleanly and
failed silently, which is why they are written down rather than left to be
rediscovered.

Read when writing component code, or when something renders wrong without
erroring.

---

## Tailwind

### Never prefix a custom `@utility` with a Tailwind conflict-group name

`border-themed` parsed as a border utility, so `cn("border-themed border-award-accent")`
had tailwind-merge drop it and the element rendered with `border-width: 0`. It
is now `themed-border`. The same applies to `shadow-`, `text-`, `bg-`.

Corollary: because merge cannot see a custom utility, it also cannot **cancel**
one. `border-0` will not beat `themed-border`; the winner falls to stylesheet
order. Fix structurally rather than by override.

### Tailwind cannot see class names built at runtime

Composing selectors with a helper and a template literal compiles without a
single error and generates **zero CSS**. Write class strings out in full, even
when it is verbose.

### Layer order beats specificity

A rule in `@layer base` loses to a utility regardless of selector specificity.
The admin gutter rule sat in `base` and lost to Container's `px-4`. Unlayered
CSS outranks every layer, which is the only way a single override beats a
utility without `!important`.

### `not-prose` does not exist unless you build it

We do not use `@tailwindcss/typography`. `Prose` uses descendant selectors, so
`[&_a]` restyled links inside every embedded component, including the `<a>`
inside affiliate buttons. Every selector is now scoped
`:not(:where(.not-prose,.not-prose_*))`. `:where()` adds no specificity, so a
component's own classes still win.

## MDX

### Pipe tables need `remark-gfm`

MDX core does not support GitHub-flavoured markdown, so a pipe table renders as
literal `|` characters in a paragraph. It compiles without complaint. The
plugin is registered in `next.config.ts` as a **string**, not an import,
because Turbopack serialises the loader config and cannot pass a function
reference.

### A tool mapped straight to its component registers no agent tools

`mdx-components.tsx` maps every tool name through `ToolWidget`, and `ToolWidget`
is what mounts `AgentTools`. Point an MDX name at the component itself and the
calculator renders exactly as before, looks right in the browser, and quietly
exposes nothing to an agent on that page. The tool page keeps working, because
`/verktyg/[slug]` uses `ToolWidget` either way, so the gap only shows on the
test pages.

That is how it shipped on 2026-08-03 and how it stayed until someone asked
whether the tools were available in both places. Verify by fetching the
test page and searching the HTML for `agent-tools`. A rendered widget
proves nothing.

### Components used in MDX must be registered centrally

`mdx-components.tsx` maps the small set prose may call. Element mappings stay
empty: prose styling belongs to `Prose`, and mapping headings there would
create a second typography system.

### A new product list must be spread into `ALL_PRODUCTS`

Writing `lib/data/{slug}.ts` is not enough. The array has to be imported **and
spread** in `lib/data/index.ts`. Miss it and every `<ProductRef id="...">` in
that test page's buying guide renders nothing: the component returns `null` on
an unknown id on purpose, so prose silently loses a product name mid-sentence.

`tsc`, `lint` and `build` all stay quiet. This has happened twice — two
test pages on 2026-08-01, three more on 2026-08-02, the second time costing 27
dead references across three guides. `pnpm check:refs` catches it.

## React

### `react-hooks/set-state-in-effect`

Fix the pattern, never suppress. Two working shapes:

- Reading external state such as cookies: `useSyncExternalStore` with an
  "unknown" server snapshot.
- Closing a menu on navigation: store *which pathname it was opened on* and
  derive openness. No effect at all.

### `react-hooks/immutability`

Do not mutate a variable inside `map` to track state across rows. Precompute
the flags into the array first.

### `react-hooks/static-components`

Selecting a component type into a local and rendering `<Widget />` reads as a
component created during render. Put the lookup inside a stable component.

### A default parameter only applies to `undefined`

`title={undefined}` **triggers** the default rather than suppressing it, which
rendered a heading twice under a section of the same name. Type it
`string | null` and pass `null`.

### Live-apply must mirror every attribute the layout sets

The admin picker writes the cookie and mutates `data-*` on `<html>`. Add an
axis to the layout and forget the picker, and the toggle writes a cookie and
appears to do nothing.

### Server-rendered axes need `router.refresh()`

CSS-driven axes update instantly from a data attribute. An axis the **server**
renders differently, like the table layout, does not change until the route is
re-fetched. Without the refresh the highlight moves and the page does not,
which reads as a broken switcher.

## Layout

### Viewport breakpoints inside a fixed-width container

`sm:` in a 22rem sidebar responds to the window, not the panel. The quick-pick
showed a price column on desktop even in a narrow rail and truncated names to
"Whit…". Use container queries (`@container`, `@sm`).

### `aspect-square` on a flex item

A flex child inherits `align-self: stretch`, so a padding-driven `aspect-square`
grew to the full column width and matched its height to it: a 200px "circle" in
a table cell. Use fixed `size-*`.

### `self-end` versus `ml-auto`

In a column-flex container a child stretches to full width and its contents rag
left. An auto inline-start margin both cancels the stretch and pushes the group
to the trailing edge. More reliable than `align-self` here.

### `legend` and flex

`legend` does not participate in the parent's flex flow reliably. Space it with
a margin on the legend, not a gap on the fieldset.

### `truncate` needs a definite width

Table cells size to content, so without a `max-width` an over-long name widens
the column and squeezes everything else instead of ellipsising.

### `<caption>` scrolls with the table

It lives in the table's box and rides off to the left. Put notes above the
scroll container as a `<p>`.

### A `colSpan` cell's text scrolls too

Pin the inner span with `sticky left-*` so group headings stay with the labels.

### Fixed-height slots keep header rows aligned

A one-line and a two-line product name push everything below them to different
heights. Give the name a fixed two-line box plus `line-clamp-2`, and reserve a
slot for optional badges.

### Full bleed on mobile

`-mx-4 sm:mx-0` on a table's scroll container reclaims the container padding,
about 9 % more width on a 375px screen. Give the frozen column and the last
column their gutter back with `ps-*` and `last:pe-*`.

## Next.js

### Reading cookies makes a route dynamic

Use `getStyle()` from `lib/style-server.ts`, which is gated on
`isAdminEnabled()`. Production reads nothing and every page stays static.

### `pnpm build` kills `pnpm dev`

Both write `.next`. Restart the dev server after every build.
