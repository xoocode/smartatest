import { cookies } from "next/headers";

import { isAdminEnabled } from "@/lib/admin";
import {
  DEFAULT_STYLE,
  STYLE_COOKIE,
  parseStyleCookie,
  type StyleState,
} from "@/lib/theme";

/**
 * The active style for a server component.
 *
 * Reading `cookies()` opts a route into dynamic rendering, which would cost the
 * static caching the category pages are built for. So the read is gated: in
 * production `isAdminEnabled()` is false, nothing is read, and every page stays
 * static on the default style. In development the picker works.
 *
 * Shared by the root layout and by any page that needs to branch on a style
 * axis, so the gating rule lives in exactly one place.
 */
export async function getStyle(): Promise<StyleState> {
  if (!isAdminEnabled()) return DEFAULT_STYLE;
  return parseStyleCookie((await cookies()).get(STYLE_COOKIE)?.value);
}
