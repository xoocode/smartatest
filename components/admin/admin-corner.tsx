import { isAdminEnabled } from "@/lib/admin";
import type { StyleState } from "@/lib/theme";
import { StylePicker } from "@/components/admin/style-picker";

/**
 * Internal tooling overlay, pinned to the top-right of every page.
 * Renders nothing in production unless NEXT_PUBLIC_SHOW_ADMIN=1.
 */
export function AdminCorner({ style }: { style: StyleState }) {
  if (!isAdminEnabled()) return null;

  return (
    <div
      data-slot="admin-corner"
      /* Top-left, not top-right: the header's search and menu buttons live in
         the top-right corner, and a fixed dev-only pill sitting on top of them
         made both unreachable on a phone. */
      className="fixed top-3 left-3 z-50 flex flex-col items-start gap-2 print:hidden"
    >
      <StylePicker initial={style} />
    </div>
  );
}
