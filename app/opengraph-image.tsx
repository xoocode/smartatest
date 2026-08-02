import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";
import { OG_COLORS, OG_SIZE } from "@/lib/og";

/*
 * Standarddelningsbild för hela sajten.
 *
 * Ligger i app-roten, så varje sida ärver den om den inte sätter en egen
 * `openGraph.images`. Innan den fanns renderades varje länk till sajten som en
 * naken textrad i Facebook, Messenger och Slack, vilket är där en jämförelse
 * faktiskt delas vidare mellan människor.
 *
 * Medvetet textbaserad. En produktbild i delningsbilden vore fel: den skulle
 * lova en enskild produkt medan länken går till en jämförelse, och den skulle
 * behöva bytas varje gång rankningen ändras.
 */

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

/*
 * Geist läses från repot i stället för via next/font.
 *
 * Satori kör inte i webbläsaren och ser inte de typsnitt `next/font/google`
 * laddar. Utan en egen registrering föll bilden tillbaka på det enda typsnitt
 * @vercel/og har inbyggt, och eftersom det bara finns i vikt 400 hoppade all
 * fetstil vidare till systemets grotesk. Resultatet var en delningsbild i fel
 * typsnitt med ojämna ordmellanrum.
 *
 * Filen är samma Geist som sidhuvudet använder, kopierad hit så att sökvägen
 * inte pekar in i node_modules där varje uppdatering flyttar den. Geist ligger
 * under SIL Open Font License, så den får följa med i repot.
 *
 * Läsningen sker vid bygget: rutten är statiskt genererad, så filen behöver
 * inte spåras in i någon serverfunktion.
 */
const geist = readFileSync(
  join(process.cwd(), "assets/fonts/Geist-Regular.ttf"),
);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: OG_COLORS.background,
          padding: 72,
          fontFamily: "Geist",
        }}
      >
        {/* Övre kant i varumärkesfärg, samma roll som balken i sidhuvudet. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 14,
            background: OG_COLORS.brand,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: OG_COLORS.mutedForeground,
            }}
          >
            Oberoende jämförelser
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              /* Bara vikt 400 är registrerad. Att be om 800 här skulle kasta
                 tillbaka rubriken i systemets grotesk, vilket var precis felet
                 den här filen finns för att rätta. Hierarkin bärs av storlek
                 och knip i stället. */
              fontSize: 88,
              letterSpacing: -3,
              lineHeight: 1.05,
              color: OG_COLORS.foreground,
            }}
          >
            {SITE.tagline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 32,
              lineHeight: 1.4,
              color: OG_COLORS.mutedForeground,
              maxWidth: 900,
            }}
          >
            Brandvarnare, vattenlarm, smart belysning och uttag. Samma
            viktning för alla, och varje källa utskriven.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${OG_COLORS.border}`,
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 40,
              letterSpacing: -1,
              color: OG_COLORS.foreground,
            }}
          >
            {/* Båda delarna som spans, så att de behandlas lika som flexbarn.
                Ett hårstreck blir kvar före punkten: uppmätt 10 px mot 2–4 px
                mellan bokstäverna, vilket är ungefär vad punktens vänstermarginal
                ger vid 40 px. Knipet på föräldern verkar inte gå över gränsen
                mellan två spans. Det syns bara i förstoring och är inte värt en
                negativ marginal som går sönder vid nästa storleksändring. */}
            <span>{SITE.name}</span>
            <span style={{ color: OG_COLORS.brand }}>.se</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: OG_COLORS.mutedForeground,
            }}
          >
            Provision påverkar inte rankningen
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Geist", data: geist, weight: 400, style: "normal" }],
    },
  );
}
