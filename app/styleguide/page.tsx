import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isAdminEnabled } from "@/lib/admin";
import { StyleguideBoard } from "@/app/styleguide/styleguide-board";

export const metadata: Metadata = {
  title: "Stilguide",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  // Internal tooling — never reachable in production.
  if (!isAdminEnabled()) notFound();

  return <StyleguideBoard />;
}
