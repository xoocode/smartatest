import { NextResponse, type NextRequest } from "next/server";

/**
 * Tar emot kontaktformuläret och skickar det vidare till RedPoint9.
 *
 * ## Varför ett mellansteg i stället för att posta direkt
 *
 * Meddelandena lagras i RedPoint9s databas, som den här sajten varken har
 * eller behöver. Alternativet vore att låta besökarens webbläsare posta
 * direkt till redpoint9.com, men då måste den endpointen öppnas för
 * främmande origins med CORS, och den delade hemligheten skulle ligga i
 * klientkoden där vem som helst kan läsa den.
 *
 * Server till server slipper båda problemen. Webbläsaren pratar bara med sin
 * egen domän, och token lämnar aldrig servern.
 *
 * ## Miljövariabler
 *
 * `CONTACT_INGEST_TOKEN` måste vara samma värde som i redpoints miljö.
 * `CONTACT_INGEST_URL` finns för att kunna peka mot en förhandsdistribution
 * under utveckling.
 */

const INGEST_URL =
  process.env.CONTACT_INGEST_URL ?? "https://redpoint9.com/api/contact";

/** Måste finnas bland `CONTACT_SITES` i redpoints validering. */
const SITE_KEY = "smartatest";

/** Håll i takt med `CATEGORIES` i components/site/contact-form.tsx. */
const CATEGORIES = ["correction", "tip", "partnership", "press", "general"];

type Payload = {
  name?: unknown;
  email?: unknown;
  category?: unknown;
  subject?: unknown;
  message?: unknown;
  /* Honungsfälla. Fältet är dolt för människor, så ett ifyllt värde betyder
     att en robot fyllt i allt den hittade. */
  website?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  /* Svarar 200 utan att skicka något. En robot som får ett felmeddelande
     justerar sig och försöker igen; en som tror att det gick vägen gör inte
     det. */
  if (asString(body.website)) {
    return NextResponse.json({ success: true });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const subject = asString(body.subject);
  const message = asString(body.message);
  const category = CATEGORIES.includes(asString(body.category))
    ? asString(body.category)
    : "general";

  /* Samma gränser som redpoints zod-schema, så en användare får ett svar på
     svenska i stället för ett engelskt valideringsfel från en annan domän. */
  if (name.length < 2) {
    return NextResponse.json({ error: "Fyll i ditt namn." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Kontrollera e-postadressen." },
      { status: 400 },
    );
  }
  if (subject.length < 3) {
    return NextResponse.json({ error: "Skriv en rubrik." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Skriv gärna några rader till, så blir det lättare att svara." },
      { status: 400 },
    );
  }

  const token = process.env.CONTACT_INGEST_TOKEN;
  if (!token) {
    console.error("[kontakt] CONTACT_INGEST_TOKEN saknas");
    return NextResponse.json(
      { error: "Formuläret är ur funktion just nu. Mejla oss i stället." },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch(INGEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Contact-Site": SITE_KEY,
        /* Vidarebefordras så att raden får besökarens adress och inte vår
           serverfunktions. Redpoint läser x-forwarded-for. */
        "X-Forwarded-For":
          request.headers.get("x-forwarded-for") ??
          request.headers.get("x-real-ip") ??
          "unknown",
        "User-Agent": request.headers.get("user-agent") ?? "unknown",
      },
      body: JSON.stringify({
        name,
        email,
        category,
        subject,
        message,
        product: SITE_KEY,
      }),
    });

    if (!upstream.ok) {
      console.error("[kontakt] Uppströms svarade", upstream.status);
      return NextResponse.json(
        { error: "Meddelandet kom inte fram. Försök igen om en stund." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[kontakt] Vidarebefordran misslyckades:", error);
    return NextResponse.json(
      { error: "Meddelandet kom inte fram. Försök igen om en stund." },
      { status: 502 },
    );
  }
}
