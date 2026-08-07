import type { Metadata } from "next";
import Link from "next/link";

import { PUBLISHER, SITE, publisherAddress } from "@/lib/site";
import { pageOpenGraph } from "@/lib/metadata";
import { PEOPLE } from "@/lib/people";
import { publishedCategories } from "@/lib/test-pages";
import { graph, orgRef, pageEntity, personNode, personRef } from "@/lib/schema";
import { Container } from "@/components/site/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Section } from "@/components/site/section";
import { Prose } from "@/components/site/prose";
import { PersonCard } from "@/components/site/person-card";
import { PublisherLink } from "@/components/site/publisher-link";
import { TrustBlock } from "@/components/site/trust-block";
import { Button } from "@/components/ui/button";

/*
 * Om oss, tillika redaktionens nav.
 *
 * ## Varför de två slogs ihop
 *
 * Sajten hade både `/om-oss` i sidfoten och ett skribentnav på `/skribent`.
 * De besvarade i praktiken samma fråga, och den som undrar vilka som står bakom
 * betygen letar efter den ena eller den andra, aldrig båda. Personsidorna ligger
 * nu under den här adressen, se `personHref()` i lib/people.ts.
 *
 * ## Texten
 *
 * Ingressen är version A av tre framtagna utkast. Alla tre finns kvar i
 * `.agent/drafts/om-oss-varianter.md` med en notering om vad var och en passar
 * till. A valdes för att den svarar på varför sajten finns, medan
 * `/sa-testar-vi` svarar på hur den arbetar. De två sidorna ska inte öppna med
 * samma erkännande.
 *
 * Kontoret beskrivs som norra Stockholm. Gatuadressen står i sidfoten och på
 * `/kontakt`, där den hör hemma, men den hör inte hemma i en brödtext.
 */

const PAGE_URL = "/om-oss";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Vilka som står bakom betygen på smartatest.se, varför sajten finns och vad vi kan och inte kan göra.",
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({
    title: "Om oss",
    path: PAGE_URL,
    type: "website",
  }),
};

export default function OmOssPage() {
  /*
   * AboutPage med redaktionen som mainEntity.
   *
   * Personerna refereras via samma `@id` som `personNode()` bygger, alltså
   * exakt den nod deras egen sida beskriver fullständigt. Utan det blir varje
   * person tre gånger i grafen: en gång här, en gång som författare på en
   * jämförelse och en gång på sin egen sida.
   */
  const jsonLd = graph([
    pageEntity({
      type: "AboutPage",
      pageUrl: PAGE_URL,
      name: `Om ${SITE.name}`,
      description:
        "Vilka som står bakom betygen, och varför sajten finns.",
      about: orgRef(),
      mainEntity: { "@id": `${SITE.url}${PAGE_URL}#redaktion` },
      sections: [{ id: "redaktionen", label: "Redaktionen" }],
    }),
    {
      "@type": "ItemList",
      "@id": `${SITE.url}${PAGE_URL}#redaktion`,
      name: `Redaktionen på ${SITE.name}`,
      url: `${SITE.url}${PAGE_URL}#redaktionen`,
      numberOfItems: PEOPLE.length,
      itemListElement: PEOPLE.map((person, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: personRef(person),
      })),
    },
    ...PEOPLE.map(personNode),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Container size="narrow" className="pt-6">
        <Breadcrumbs items={[{ label: "Om oss" }]} schema />
      </Container>

      <Container size="narrow" className="pt-3 pb-[var(--space-section)]">
        <p className="eyebrow text-brand">Om oss</p>
        <h1 className="mt-2 text-h1">Vilka vi är</h1>

        <Prose className="mt-block">
          <p className="text-lg">Smartatest började i en irritation.</p>
          <p>
            Daniel Hedin hade då arbetat i fjorton år med elsäkerhet och
            CE-dokumentation: att läsa provningsintyg och avgöra om
            en produkt verkligen klarat det tillverkaren påstår att den klarat.
            När han skulle köpa brandvarnare till sitt eget hus hittade han ett
            dussin svenska sidor med rubriken &rdquo;Så har vi testat&rdquo;, och
            under rubrikerna fanns inte en enda siffra.
          </p>
          <p>
            Det var inte svårt att räkna ut vad som hänt. Sidorna hade
            rangordnat produkter ungefär som butikerna betalade, och kallat
            resultatet ett test.
          </p>
          <p>
            Smartatest är försöket att göra tvärtom, med de begränsningar vi
            faktiskt har. Vi sitter i ett kontor i norra Stockholm och vi äger
            ingen provningsutrustning. Det vi har är vanan att läsa en standard
            i original, och en metod som går att räkna efter: varje produkt får
            delbetyg på samma kriterier som alla andra i sin kategori, vikterna
            står utskrivna på varje jämförelse, och totalbetyget är summan av dem.
            Ingenting justeras i efterhand.
          </p>
          <p>
            Det betyder också att du kan komma fram till ett annat svar än vi
            gjorde. Tycker du att priset borde väga tyngre än färgåtergivningen
            har du siffrorna framför dig och kan räkna om det. Vi ser det som en
            styrka. En rankning som bara går att svälja hel eller förkasta hel
            är inte till särskilt mycket hjälp.
          </p>
          <p>
            Vi tjänar pengar när du handlar via våra länkar. Det påverkar inte
            ordningen i rankningen, och hur det fungerar står öppet under{" "}
            <Link href="/annonsmarkning">annonsmärkning</Link>.
          </p>
        </Prose>

        <div className="mt-block flex flex-wrap gap-3">
          <Button asChild variant="brand">
            <Link href="/sa-testar-vi">Läs hela metoden</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/kontakt">Hör av dig</Link>
          </Button>
        </div>
      </Container>

      {/* ----------------------------------------------------- redaktionen -- */}
      <Section
        id="redaktionen"
        tone="muted"
        width="wide"
        eyebrow="Redaktionen"
        title="Personerna bakom betygen"
        description="Varje jämförelse har en namngiven skribent och en namngiven granskare. Står det ett namn på en sida går det att klicka på."
      >
        <div className="grid gap-block sm:grid-cols-2 lg:grid-cols-3">
          {PEOPLE.map((person) => (
            <PersonCard key={person.slug} person={person} variant="box" link />
          ))}
        </div>
      </Section>

      <Section width="default" title="Så arbetar vi">
        {/* Stycket nedan länkar redan till metodsidan i löptext. */}
        <TrustBlock showLinks={false} />
        <Prose className="mt-block">
          {/* ⚠️ `publishedCategories()`, inte `TEST_PAGES` och inte
              `liveTestPages()`. Talet ska vara snittet: en viktning som
              finns i koden men vars sida inte är publicerad är inte
              publicerad, och en publicerad sida utan viktning ska inte heller
              räknas.

              Den här sidan och /sa-testar-vi påstod olika saker om exakt
              samma fakta, 22 mot 23, eftersom de räknade var sin lista. Båda
              går nu genom samma funktion. Ett tal som läsaren kan räkna efter
              i menyn ska stämma med menyn. */}
          <p>
            Vi har {publishedCategories().length} kategorier med publicerad viktning,
            och på varje jämförelse står kriterierna och vikterna innan
            produkterna gör det. Hur en poäng blir till, och när vi stryker ett
            kriterium för att underlaget är för tunt, står med räkneexempel på{" "}
            <Link href="/sa-testar-vi">så testar vi</Link>.
          </p>
        </Prose>
      </Section>

      <Section tone="muted" width="default" title="Utgivare">
        <Prose>
          <p>
            {SITE.domain} ges ut av <PublisherLink />, {publisherAddress()}.
            Redaktionen nås på{" "}
            <a href={`mailto:${PUBLISHER.email}`}>{PUBLISHER.email}</a>.
          </p>
          <p>
            Har vi skrivit något som inte stämmer vill vi höra det från dig
            innan någon annan hittar det. Rättelser går före allt annat i{" "}
            <Link href="/kontakt">kontaktformuläret</Link>.
          </p>
        </Prose>
      </Section>
    </>
  );
}
