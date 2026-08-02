import type { Metadata } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";

import "./globals.css";
import { SITE } from "@/lib/site";
import { isAdminEnabled } from "@/lib/admin";
import { getStyle } from "@/lib/style-server";
import { AdminCorner } from "@/components/admin/admin-corner";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteSchema } from "@/components/site/site-schema";
import { ConsentMode } from "@/components/site/consent-mode";
import { CookieConsent } from "@/components/site/cookie-consent";

const sans = Geist({
  variable: "--font-sans-brand",
  subsets: ["latin"],
  display: "swap",
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION =
  "Oberoende tester och jämförelser av robotdammsugare, brandvarnare, övervakningskameror och smart belysning.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}. ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  /* Sidorna sätter sin egen canonical relativt den här. Utan alternates i
     roten får startsidan ingen alls, vilket lämnar den öppen för att indexeras
     under en parametriserad variant av sin egen adress. */
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name}. ${SITE.tagline}`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}. ${SITE.tagline}`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      /* Standardgränsen på 160 tecken i utdraget gör att Google klipper mitt i
         ett resonemang på våra jämförelsesidor. -1 låter dem ta hela stycket,
         vilket är det vi vill när sidan citeras i en AI-översikt. */
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /* Reading cookies() opts every route into dynamic rendering, which would
     cost us static caching on pages built to rank. The picker only exists
     where the admin corner does, so production skips the read entirely and
     the pages stay static. */
  const admin = isAdminEnabled();
  const style = await getStyle();

  return (
    <html
      lang="sv"
      data-theme={style.theme}
      data-density={style.density}
      data-radius={style.radius}
      data-award={style.award}
      data-table={style.table}
      data-winner-grid={style.winnerGrid}
      data-admin={admin ? "1" : undefined}
      className={`${sans.variable} ${serif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/* Först i body med flit. Consent Mode-defaults måste sättas innan
            någon Google-tagg hinner köra. Se components/site/consent-mode.tsx. */}
        <ConsentMode />
        <SiteSchema />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieConsent />
        <AdminCorner style={style} />
      </body>
    </html>
  );
}
