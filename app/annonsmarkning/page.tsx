import type { Metadata } from "next";
import Link from "next/link";

import { PUBLISHER, SITE } from "@/lib/site";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER } from "@/lib/people";
import { graph, orgRef, pageEntity } from "@/lib/schema";
import { Container } from "@/components/site/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Prose } from "@/components/site/prose";
import { UpdatedStamp } from "@/components/site/updated-stamp";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";

/*
 * Förklarande text om annonslänkar.
 *
 * ## Varför sidan finns
 *
 * TU, Sveriges Tidskrifter och IAB Sverige fastställde 18 juni 2024 en
 * rekommendation för märkning av affiliatelänkar i redaktionell miljö. Den
 * säger tre saker: att artiklar med annonslänkar ska ha en balk högst upp, att
 * balken bör länka till en förklarande text, och att varje kommersiell länk
 * ska märkas med avsändaren angiven.
 *
 * Den här sidan är den förklarande texten. Balken i `AffiliateDisclosure`
 * pekar hit, så ändras adressen måste `disclosureHref` där följa med.
 *
 * ## Ton
 *
 * Sidan läses av någon som redan misstänker att vi är köpta. Den ska därför
 * börja i pengarna, inte i en försäkran om oberoende. Ett påstående om
 * oberoende som kommer före redovisningen av intäkterna låter som en ursäkt.
 */

const PAGE_URL = "/annonsmarkning";
const UPDATED = "2026-08-02";

export const metadata: Metadata = {
  title: "Annonsmärkning och hur vi tjänar pengar",
  description:
    "Vi får provision när du köper via våra länkar. Så ser du vilka länkar det gäller, varför en del länkar är omärkta, och vad provisionen inte får påverka.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Annonsmärkning och hur vi tjänar pengar",
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
};

export default function AnnonsmarkningPage() {
  /* Sidan som balken på varje jämförelse pekar på. `about` är organisationen:
     texten handlar om hur vi finansieras, inte om en produkt. */
  const jsonLd = graph([
    pageEntity({
      type: "AboutPage",
      pageUrl: PAGE_URL,
      name: "Annonsmärkning",
      description:
        "Hur sajten tjänar pengar, vilka länkar som är annonser och vad provisionen inte får påverka.",
      author: DEFAULT_AUTHOR,
      reviewer: DEFAULT_REVIEWER,
      reviewed: UPDATED,
      about: orgRef(),
    }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Container size="narrow" className="pt-6">
        <Breadcrumbs items={[{ label: "Annonsmärkning" }]} schema />
      </Container>

      <Container size="narrow" className="pt-3 pb-[var(--space-section)]">
        <p className="eyebrow text-brand">Öppen redovisning</p>
        <h1 className="mt-2 text-h1">Annonsmärkning och hur vi tjänar pengar</h1>
        <UpdatedStamp date={UPDATED} variant="bar" className="mt-4 self-start" />

        <Prose className="mt-block">
          <p>
            {SITE.domain} tjänar pengar när du klickar dig vidare till en butik
            och handlar. Butiken betalar oss en andel av köpet, oftast mellan
            tre och femton procent, och du betalar inte en krona extra för det.
            Sajten har inga andra intäkter. Ingen tillverkare betalar oss, och
            vi säljer inga annonsplatser.
          </p>
          <p>
            Det är en rimlig affärsmodell, men den skapar ett problem som är värt
            att säga rakt ut: vi tjänar mer på vissa butiker än på andra. Resten
            av sidan handlar om vad vi gör åt det, och hur du kan kontrollera
            oss.
          </p>

          <h2>Så ser du vilka länkar det gäller</h2>
          <p>
            Överst på varje jämförelse står en balk med texten{" "}
            <em>Artikeln innehåller annonslänkar</em>. Den talar om att det finns
            kommersiella länkar längre ned, innan du börjat läsa.
          </p>
          <p>
            Varje sådan länk är märkt <strong>Annons</strong> och namnger butiken
            den går till, exempelvis <em>Annons: köp hos Kjell &amp; Company</em>.
            Du ska aldrig behöva hovra över en knapp för att lista ut vart den
            leder eller om vi tjänar på den.
          </p>

          <h2>Varför en del länkar saknar märkning</h2>
          <p>
            En omärkt länk är inte ett misstag. Vi märker bara de länkar vi
            faktiskt får betalt för. Länkar till Myndigheten för samhällsskydd
            och beredskap, till en tillverkares datablad eller till ett test hos
            Stiftung Warentest är redaktionella, och att märka dem som annonser
            vore direkt vilseledande.
          </p>
          <p>
            Det gäller även butiker. Saknar en butik affiliateprogram länkar vi
            ändå dit när den har bäst pris, och den länken förblir omärkt
            eftersom vi inte tjänar något på den.
          </p>

          <h2>Vad provisionen inte får påverka</h2>
          <p>
            Rankningen, betygen och urvalet. Det är lätt att skriva och svårt att
            bevisa, så vi har byggt sidorna så att du kan kontrollera det själv
            i stället för att lita på oss.
          </p>
          <p>
            Viktningen mellan kriterierna står öppet på varje jämförelse, och
            totalbetyget räknas fram ur delbetygen. Det går alltså att räkna
            efter. Källorna vi läst är utskrivna med länk, så du kan gå till
            originaltestet och se om vi återgett det rätt. Och när ingen har
            testat produkterna skriver vi det, i stället för att kalla en
            specifikationsjämförelse för ett test.
          </p>
          <p>
            En produkt kan mycket väl hamna etta hos oss trots att den ger oss
            lägst provision av alla produkter vi listar. Händer det motsatta, att
            ettan också råkar vara den vi tjänar mest på, är det en slump vi
            gärna får syna.
          </p>

          <h2>Priserna</h2>
          <p>
            Priser hämtas när sidan skrivs eller uppdateras, och de ändras
            oftare än vi hinner med. Det som gäller är priset hos butiken när du
            köper. Ser du ett pris hos oss som är uppenbart fel är det värt ett
            mejl.
          </p>

          <h2>Reglerna vi följer</h2>
          <p>
            Kravet på att reklam ska gå att känna igen finns i
            marknadsföringslagen och övervakas av Konsumentverket. För just
            affiliatelänkar i redaktionell text finns dessutom en{" "}
            <a
              href="https://iabsverige.se/wp-content/uploads/2025/09/Rekommendation-kring-affiliatemarknadsforing.pdf"
              rel="noopener noreferrer"
              target="_blank"
            >
              branschrekommendation från TU, Sveriges Tidskrifter och IAB Sverige
            </a>
            , fastställd 18 juni 2024. Balken högst upp, märkningen vid varje
            kommersiell länk och den här sidan är alla hämtade därifrån.
          </p>

          <h2>Om något ser fel märkt ut</h2>
          <p>
            Hittar du en länk som borde varit märkt men inte är det, eller
            tvärtom, vill vi veta det. Skriv till{" "}
            <a href={`mailto:${PUBLISHER.email}`}>{PUBLISHER.email}</a> eller via{" "}
            <Link href="/kontakt">kontaktsidan</Link>, så rättar vi och skriver
            ut när det gjordes.
          </p>
        </Prose>

        <AffiliateDisclosure variant="box" className="mt-block" />
      </Container>
    </>
  );
}
