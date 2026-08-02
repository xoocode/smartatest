"use client";

/*
 * Sista utvägen: ett fel i själva rotlayouten. Då har varken sidhuvud, sidfot
 * eller globals.css hunnit monteras, och den här komponenten ersätter hela
 * dokumentet — därför egna `html` och `body`, vilket annars vore fel.
 *
 * Av samma skäl är formgivningen inline. Det finns ingen garanti för att
 * stilmallen laddat när det här renderas, och en felsida som själv ser trasig
 * ut är sämre än ingen alls. Håll den enkel; den ska aldrig behöva ändras.
 */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="sv">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          color: "#1c1917",
          background: "#fafaf9",
        }}
      >
        <main style={{ maxWidth: "32rem" }}>
          <h1 style={{ fontSize: "1.75rem", margin: "0 0 0.75rem" }}>
            Något gick sönder
          </h1>
          <p style={{ margin: "0 0 1.5rem", lineHeight: 1.6, color: "#57534e" }}>
            Sajten kunde inte laddas. Felet ligger hos oss. Försök igen om en
            stund.
          </p>
          <button
            onClick={reset}
            style={{
              font: "inherit",
              padding: "0.6rem 1.1rem",
              borderRadius: "0.5rem",
              border: "1px solid #1c1917",
              background: "#1c1917",
              color: "#fafaf9",
              cursor: "pointer",
            }}
          >
            Försök igen
          </button>
          {error.digest ? (
            <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "#78716c" }}>
              Felkod: <code>{error.digest}</code>
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
