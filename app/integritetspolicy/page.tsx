import type { Metadata } from "next";
import Link from "next/link";

import { PUBLISHER, SITE, publisherAddress } from "@/lib/site";
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
 * aktiva. Båda kakorna nedan sätts först efter samtycke, så texten stämmer
 * även innan annonseringen dragit igång.
 *
 * ## Två saker att hålla ögonen på
 *
 * 1. Samtyckeslagret är byggt och beskrivs i `lib/consent.ts`. Ändras
 *    ändamålen eller mottagarna ska `CONSENT_VERSION` höjas i samma ändring
 *    som texten här, annars gäller gamla svar en text de aldrig avsåg.
 * 2. Underbiträdena nedan måste stämma med verkligheten. Läggs ett mätverktyg
 *    till någon gång är det den här filen som ska ändras först, inte sist.
 *
 * Formuleringen "vi mäter inte ditt besök" är alltså ett löfte i kod, inte
 * bara i text.
 */

const PAGE_URL = "/integritetspolicy";
const UPDATED = "2026-08-03";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description:
    "Vi har varken besöksstatistik, pixlar eller nyhetsbrev. Det som lagras är två kakor och det du själv skickar via kontaktformuläret.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Integritetspolicy",
    url: `${SITE.url}${PAGE_URL}`,
    type: "article",
  },
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
            Kvar blir två kakor, och båda handlar om hur sajten betalar sig. Vi
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

          <h2>Kakorna vi sätter</h2>

          <h3>Ditt svar i samtyckesrutan</h3>
          <p>
            När du svarar i rutan sparar vi svaret i en kaka som heter{" "}
            <code>st_consent</code>. Den innehåller tre saker och ingenting
            annat: vilken version av den här texten svaret gällde, om du sa ja
            eller nej, och när du svarade. Tidpunkten finns där för att vi ska
            kunna visa att samtycket faktiskt lämnats, vilket Google kräver av
            oss som annonsör.
          </p>
          <p>
            Kakan lever i sex månader. Ändrar vi vilka mottagare som är
            inblandade höjer vi versionen, och då blir ditt tidigare svar
            ogiltigt och rutan kommer tillbaka. Ett ja till en uppsättning
            mottagare är inte ett ja till en annan.
          </p>
          <p>
            Utan kakan skulle rutan dyka upp vid varje sidladdning, så den är
            nödvändig för att sajten ska fungera som du bett om, och kräver
            därför inget samtycke. Vill du ändra dig finns länken{" "}
            <em>Kakor</em> längst ned på varje sida.
          </p>

          <h3>Google Ads och klick-id:t gclid</h3>
          <p>
            Vi annonserar på Google. Klickar du på en av våra annonser följer en
            parameter med i adressen, <code>gclid</code>, som talar om vilken
            annons klicket kom från. Vi använder den för att se vilka annonser
            som leder till köp, och därmed om pengarna vi lägger på annonsering går
            till något.
          </p>
          <p>
            Parametern pekar inte ut dig vid namn, men den identifierar ett
            enskilt klick, och flera dataskyddsmyndigheter räknar den därför som
            en personuppgift. Vi behandlar den som en. Den lagras i upp till 90
            dagar, och den sätts bara om du godkänt marknadsföringskakor. Väljer
            du <em>endast nödvändiga</em> sker ingen sådan mätning.
          </p>
          <p>
            Rättslig grund är ditt samtycke enligt artikel 6.1 a i
            dataskyddsförordningen. Säger du nej skickas inga identifierare
            till Google, och annonsmätningen sker då på uppskattade siffror i
            stället för uppmätta. Det är sämre för oss och märks inte för dig.
          </p>

          <h3>Affiliatenätverkets kaka</h3>
          <p>
            Klickar du vidare till en butik via en av våra länkar sätter
            affiliatenätverket Adtraction en kaka hos dig, så att butiken vet
            att köpet kom härifrån och vi får vår provision. Utan den kakan
            tjänar sajten ingenting på ditt köp, men du betalar inte heller
            något extra för den.
          </p>
          <p>
            Den kakan sätts av Adtraction och butiken, på deras egna domäner och
            efter att du lämnat oss. De är personuppgiftsansvariga för den och
            den omfattas av deras policyer, inte av vårt samtycke. Därför
            fungerar butikslänkarna likadant vare sig du sagt ja eller nej här.
          </p>
          <p>
            Det vi själva avstår från om du säger nej är att koppla ihop ditt
            klick med den annons du kom från. Klicket räknas fortfarande, men
            anonymt. Hur pengarna fungerar beskriver vi öppet på{" "}
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
