import type { Metadata } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";

import "./globals.css";
import { SITE } from "@/lib/site";
import { isAdminEnabled } from "@/lib/admin";
import { WEBMCP_ORIGIN_TRIAL } from "@/lib/webmcp";
import { SPECULATION_RULES } from "@/lib/speculation";
import { getStyle } from "@/lib/style-server";
import { AdminCorner } from "@/components/admin/admin-corner";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteSchema } from "@/components/site/site-schema";
import { ConsentMode } from "@/components/site/consent-mode";
import { CookieConsent } from "@/components/site/cookie-consent";
import { OutboundConversion } from "@/components/site/outbound-conversion";

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

/* Klientläget måste vara `NEXT_PUBLIC_`, annars når det aldrig webbläsaren.
   Serversidan läser samma beslut ur `R9_TRACK_OUTBOUND_CONVERSION`; de två
   sätts tillsammans, och klickrapporten bär läget så att de inte kan glida
   isär utan att det syns i datan. */
const OUTBOUND_MODE = process.env.NEXT_PUBLIC_OUTBOUND_CONVERSION;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const OUTBOUND_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_OUTBOUND_LABEL;

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
      data-criteria={style.criteria}
      data-cta={style.cta}
      data-link={style.link}
      data-winner-grid={style.winnerGrid}
      data-admin={admin ? "1" : undefined}
      className={`${sans.variable} ${serif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/* Origin trial för WebMCP. React lyfter taggen till `head`, vilket den
            måste dit för att `http-equiv` ska betyda något.

            Renderas bara när variabeln är satt, samma hållning som
            `NEXT_PUBLIC_GOOGLE_ADS_ID`: hellre ingen tagg än en tom. Utan token
            är de deklarativa attributen på sök- och kontaktformuläret vanlig
            markup som ingen webbläsare gör något av. Se lib/webmcp.ts. */}
        {WEBMCP_ORIGIN_TRIAL ? (
          <meta httpEquiv="origin-trial" content={WEBMCP_ORIGIN_TRIAL} />
        ) : null}

        {/* Förhämtning av nästa sida. Uteslutningarna är inte kosmetiska:
            `/till/` registrerar ett klick, och en förhämtad vidarelänk vore ett
            klick ingen gjort. Se lib/speculation.ts, och skyddet i
            lib/r9track/redirect.ts som gäller även utan de här reglerna.

            Null i dev, där varje förhämtning i stället blir en kompilering av
            en rutt ingen bett om. Skälet står i sin helhet i speculation.ts. */}
        {SPECULATION_RULES ? (
          <script
            type="speculationrules"
            dangerouslySetInnerHTML={{ __html: SPECULATION_RULES }}
          />
        ) : null}

        {/* Först i body med flit. Consent Mode-defaults måste sättas innan
            någon Google-tagg hinner köra. Se components/site/consent-mode.tsx. */}
        <ConsentMode />
        {/* Räknar utgående klick i webbläsaren, men bara i läget `client`.
            Serverns läge skickas ändå med varje klickrapport, så plattformen
            vet vilka klick den själv ska ladda upp. Se
            `outboundConversion` i lib/r9track/config.ts. */}
        <OutboundConversion
          enabled={OUTBOUND_MODE === "client"}
          sendTo={
            ADS_ID && OUTBOUND_LABEL ? `${ADS_ID}/${OUTBOUND_LABEL}` : undefined
          }
        />
        <SiteSchema />

        {/* Hoppa till innehållet.
         *
         * WCAG 2.4.1 på nivå A. Sidhuvudet är klistrigt och innehåller tre
         * menyposter plus sökningen, så en tangentbordsanvändare tabbade sig
         * igenom hela raden på varje ny sida innan texten började.
         *
         * Synlig först vid fokus, inte gömd med display:none: ett element som
         * är borttaget ur flödet går inte att tabba till, och då finns länken
         * bara i markupen. `sr-only` med `focus:not-sr-only` behåller den i
         * tabbordningen och visar den när den faktiskt behövs. */}
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-raised focus:outline-2 focus:outline-ring"
        >
          Hoppa till innehållet
        </a>

        <SiteHeader />
        <main id="innehall" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <CookieConsent />
        <AdminCorner style={style} />
      </body>
    </html>
  );
}
