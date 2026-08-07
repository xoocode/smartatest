import type { Metadata } from "next";
import Link from "next/link";

import { PUBLISHER, SITE, publisherAddress } from "@/lib/site";
import { pageOpenGraph } from "@/lib/metadata";
import { DEFAULT_REVIEWER } from "@/lib/people";
import { graph, orgRef, pageEntity } from "@/lib/schema";
import { Container } from "@/components/site/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Prose } from "@/components/site/prose";
import { PublisherLink } from "@/components/site/publisher-link";
import { UpdatedStamp } from "@/components/site/updated-stamp";

/*
 * Integritetspolicy.
 *
 * ## Vad den beskriver
 *
 * Det läge sajten har vid lansering: Google Ads igång och affiliatelänkar
 * aktiva. Klick-id:t sätts oavsett svar, se `captureRequiresConsent` i
 * lib/track-config.ts, medan Googles egna annonscookies kräver ett ja.
 * Skillnaden mellan de två är hela poängen med texten nedan.
 *
 * ## Två saker att hålla ögonen på
 *
 * 1. Samtyckeslagret är byggt och beskrivs i `lib/consent.ts`. Ändras
 *    ändamålen eller mottagarna ska `CONSENT_VERSION` höjas i samma ändring
 *    som texten här, annars gäller gamla svar en text de aldrig avsåg.
 * 2. Underbiträdena nedan måste stämma med verkligheten. Läggs ett mätverktyg
 *    till någon gång är det den här filen som ska ändras först, inte sist.
 *
 * "Ingen besöksstatistik och inga pixlar" är alltså ett löfte i kod, inte bara
 * i text. Den tidigare formuleringen "vi mäter inte ditt besök" togs bort med
 * flit: vi fångar klick-id:t och räknar varje klick vidare till en butik, och
 * påståendet gick därför inte att låta stå.
 */

const PAGE_URL = "/integritetspolicy";
const UPDATED = "2026-08-03";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description:
    "Vi har varken besöksstatistik, pixlar eller nyhetsbrev. Det som lagras är två cookies och det du själv skickar via kontaktformuläret.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ title: "Integritetspolicy", path: PAGE_URL }),
};

export default function IntegritetspolicyPage() {
  const jsonLd = graph([
    pageEntity({
      type: "WebPage",
      pageUrl: PAGE_URL,
      name: "Integritetspolicy",
      description:
        "Vad som lagras om dig och vad som inte gör det, med rättslig grund för varje del.",
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
        <Breadcrumbs items={[{ label: "Integritetspolicy" }]} schema />
      </Container>

      <Container size="narrow" className="pt-3 pb-[var(--space-section)]">
        <h1 className="text-h1">Integritetspolicy</h1>
        <UpdatedStamp date={UPDATED} variant="bar" className="mt-4 self-start" />

        <Prose className="mt-block">
          <p>
            Nästan varje sajt du besöker har ett mätverktyg som följer dig sida
            för sida. Vi har inget. Ingen Google Analytics, ingen besöksstatistik
            från Vercel, inga pixlar från Facebook eller TikTok, och inget
            nyhetsbrev som samlar in adresser.
          </p>
          <p>
            Kvar blir två cookies, och båda handlar om hur sajten betalar sig. Vi
            går igenom dem nedan, och vad som händer med uppgifterna om du
            skriver till oss.
          </p>

          <h2>Vem som ansvarar</h2>
          <p>
            {SITE.domain} ges ut av <PublisherLink />, {publisherAddress()}, som
            är personuppgiftsansvarig för behandlingen på sajten. Du når oss på{" "}
            <a href={`mailto:${PUBLISHER.email}`}>{PUBLISHER.email}</a> eller via{" "}
            <Link href="/kontakt">kontaktsidan</Link>.
          </p>

          <h2>Cookies vi sätter</h2>

          <h3>Ditt svar om cookies</h3>
          <p>
            Ditt svar sparas i en cookie som heter{" "}
            <code>st_consent</code>. Den innehåller tre saker och ingenting
            annat: vilken version av den här texten svaret gällde, om du sa ja
            eller nej, och när du svarade. Tidpunkten finns där för att vi ska
            kunna visa att samtycket faktiskt lämnats, vilket Google kräver av
            oss som annonsör.
          </p>
          <p>
            Den lever i sex månader. Ändrar vi vilka mottagare som är
            inblandade höjer vi versionen, och då blir ditt tidigare svar
            ogiltigt och vi frågar igen. Ett ja till en uppsättning
            mottagare är inte ett ja till en annan.
          </p>
          <p>
            Utan den skulle vi fråga vid varje sidladdning, så den är
            nödvändig för att sajten ska fungera som du bett om, och kräver
            därför inget samtycke. Vill du ändra dig finns länken{" "}
            <em>Cookies</em> längst ned på varje sida.
          </p>

          <h3>Google Ads och klick-id:t gclid</h3>
          <p>
            Vi annonserar på Google. Klickar du på en av våra annonser följer en
            parameter med i adressen, <code>gclid</code>, som talar om vilken
            annons klicket kom från. Den sparas i en cookie i upp till 90 dagar
            och följer med när du klickar dig vidare till en butik, så att
            butiken kan knyta ett köp till besöket.
          </p>
          <p>
            Parametern pekar inte ut dig vid namn, men den identifierar ett
            enskilt klick, och flera dataskyddsmyndigheter räknar den därför som
            en personuppgift. Vi behandlar den som en.
          </p>
          <p>
            Klick-id:t sparas oavsett ditt svar ovan. Sajten har ingen
            annan intäkt än provision från butikerna, och utan id:t kan
            nätverket inte knyta ett köp till besöket. Vi har därför bedömt
            behandlingen som nödvändig för den tjänst du använder. Rättslig
            grund är berättigat intresse enligt artikel 6.1 f i
            dataskyddsförordningen, och du har rätt att invända mot den.
            Kontaktuppgifter finns längst ned på sidan.
          </p>
          <p>
            Ditt svar gäller i stället Googles egna annonscookies: om vi får
            dela uppgifter med Google och låta annonser anpassas efter dig.
            Säger du nej sätts inga sådana cookies och inga signaler skickas,
            och Googles mätning sker då på uppskattade siffror i stället för
            uppmätta. Det är sämre för oss och märks inte för dig.
          </p>

          <h3>Butikslänkarna</h3>
          <p>
            Klickar du dig vidare till en butik lämnar du sajten. Butiken sätter
            sina egna cookies och är personuppgiftsansvarig för dem, vilket
            omfattas av butikens policy och inte av ditt svar här.
          </p>
          <p>
            Vi registrerar att klicket skedde, vilken produkt det gällde och var
            på sidan du klickade.
          </p>
          <p>
            Hur sajten finansieras står på{" "}
            <Link href="/annonsmarkning">sidan om annonsmärkning</Link>.
          </p>

          <h2>Om du skriver till oss</h2>
          <p>
            Skickar du kontaktformuläret sparas ditt namn, din e-postadress,
            ärendetypen och meddelandet. Vi sparar också IP-adress och
            webbläsarsträng, av det tråkiga skälet att formulär utan sådant
            skydd fylls av skräppost inom en vecka.
          </p>
          <p>
            Uppgifterna hamnar i {PUBLISHER.name}s databas och som ett mejl till
            redaktionen. Vi använder dem för att svara dig och för att kunna gå
            tillbaka till ärendet senare, exempelvis om du påpekat ett faktafel
            vi behöver kunna redogöra för. Rättslig grund är vårt berättigade
            intresse av att kunna sköta korrespondens enligt artikel 6.1 f. Vi
            raderar meddelandena efter 24 månader.
          </p>
          <p>
            Vi säljer aldrig uppgifterna vidare, och vi använder dem inte för
            att skicka något du inte bett om.
          </p>

          <h2>Vilka som behandlar uppgifter åt oss</h2>
          <ul>
            <li>
              <strong>Vercel</strong> driftar sajten.{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                rel="noopener noreferrer"
                target="_blank"
              >
                Deras integritetspolicy
              </a>
              .
            </li>
            <li>
              <strong>Neon</strong> lagrar databasen med kontaktmeddelanden.{" "}
              <a
                href="https://neon.com/privacy-policy"
                rel="noopener noreferrer"
                target="_blank"
              >
                Deras integritetspolicy
              </a>
              .
            </li>
            <li>
              <strong>Resend</strong> skickar mejlet till redaktionen.{" "}
              <a
                href="https://resend.com/legal/privacy-policy"
                rel="noopener noreferrer"
                target="_blank"
              >
                Deras integritetspolicy
              </a>
              .
            </li>
            <li>
              <strong>Google</strong> mäter annonsklicken.{" "}
              <a
                href="https://policies.google.com/privacy?hl=sv"
                rel="noopener noreferrer"
                target="_blank"
              >
                Deras integritetspolicy
              </a>
              .
            </li>
            <li>
              <strong>Adtraction</strong> sköter affiliatelänkarna.{" "}
              {/* Adressen kontrollerad 2026-08-03. Den tidigare,
                  /se/integritetspolicy, svarade 404. Adtraction publicerar
                  policyn bara på engelska och har ingen svensk motsvarighet, så
                  leta inte efter en. */}
              <a
                href="https://adtraction.com/privacy-policy/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Deras integritetspolicy
              </a>
              .
            </li>
          </ul>
          <p>
            Några av dem behandlar uppgifter utanför EU och EES. Det sker i så
            fall med stöd av EU-kommissionens standardavtalsklausuler eller ett
            beslut om adekvat skyddsnivå.
          </p>

          <h2>Dina rättigheter</h2>
          <p>
            Du har rätt att få veta vilka uppgifter vi har om dig, att få dem
            rättade eller raderade, att invända mot behandlingen och att få ut
            dem i ett läsbart format. Hör av dig till{" "}
            <a href={`mailto:${PUBLISHER.email}`}>{PUBLISHER.email}</a>, så
            besvarar vi det inom en månad.
          </p>
          <p>
            Tycker du att vi hanterar dina uppgifter fel kan du klaga hos{" "}
            <a
              href="https://www.imy.se/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Integritetsskyddsmyndigheten
            </a>
            , som är tillsynsmyndighet i Sverige.
          </p>

          <h2>Om policyn ändras</h2>
          <p>
            Lägger vi till något som samlar in mer än det som står här kommer
            texten att ändras innan det slås på, inte efteråt, och datumet
            högst upp visar när det senast hände.
          </p>
        </Prose>
      </Container>
    </>
  );
}
