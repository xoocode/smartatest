import Script from "next/script";

import { CONSENT_COOKIE, CONSENT_VERSION, MARKETING_CONFIGURED } from "@/lib/consent";

/**
 * Google Consent Mode v2, egen implementation.
 *
 * ## Ordningen är hela poängen
 *
 * `default`-anropet måste köra före varje Google-tagg, annars hinner taggen
 * sätta en kaka innan läsaren svarat. Därför `beforeInteractive`, och därför
 * ligger komponenten först i `<body>` i rotlayouten. Ett `default`-anrop som
 * kommer efter gtag.js är inget skydd alls, bara ett påstående om ett.
 *
 * ## De fyra signalerna
 *
 * Consent Mode v2 kräver `ad_storage`, `ad_user_data`, `ad_personalization`
 * och `analytics_storage`. Alla står som `denied` från start.
 * `analytics_storage` är permanent denied hos oss: vi har ingen
 * besöksstatistik alls, och att be om samtycke till något vi inte gör vore
 * fel åt andra hållet.
 *
 * ## url_passthrough och ads_data_redaction
 *
 * De två är skälet till att ett nej inte kostar oss mätningen helt.
 * `url_passthrough` skickar klick-id:t vidare i adressen mellan sidor i
 * stället för i en kaka, och `ads_data_redaction` tar bort identifierare ur
 * anropen till Google när samtycke saknas. Google räknar då modellerade
 * konverteringar i stället för uppmätta. Sämre precision, noll kakor, och
 * fullt tillåtet.
 *
 * ## Renderar ingenting utan id
 *
 * Utan `NEXT_PUBLIC_GOOGLE_ADS_ID` finns ingen tagg att skydda och ingen ruta
 * att visa. Se `MARKETING_CONFIGURED` i lib/consent.ts.
 */
export function ConsentMode() {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!MARKETING_CONFIGURED || !adsId) return null;

  /* Läser kakan i samma svep som defaults sätts. Ett återvändande ja måste
     hinna bli ett `update` innan taggen laddar, annars mäts inte den
     sidvisningen trots att samtycke finns. Klientsidigt med flit: layouten är
     statisk och får inte läsa cookies(), se kommentaren i app/layout.tsx. */
  const bootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('set', 'url_passthrough', true);
gtag('set', 'ads_data_redaction', true);
try {
  var m = document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);
  var parts = m ? decodeURIComponent(m[1]).split(':') : [];
  if (parts[0] === '${CONSENT_VERSION}' && parts[1] === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  }
} catch (e) {}
`.trim();

  return (
    <>
      {/* Rå script-tagg, inte next/script.
       *
       * `strategy="beforeInteractive"` köar innehållet i Next egen
       * `self.__next_s`-lista och låter ramverkets bootstrap injicera det. I
       * praktiken hamnar det före gtag.js, men ordningen är då ett internt
       * implementationsdetalj hos Next och inte något vi kan läsa oss till en
       * garanti för. En vanlig script-tagg körs synkront när parsern når den,
       * alltid, och det är den garantin som behövs här: sätts defaults efter
       * att taggen laddat har den redan fått sätta en kaka.
       *
       * Det här är också skälet till att komponenten ligger först i body. */}
      <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`gtag('js', new Date()); gtag('config', '${adsId}');`}
      </Script>
    </>
  );
}
