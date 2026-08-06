import { CONSENT_COOKIE, isMarketingGranted } from "@/lib/consent";
import type { R9TrackConfig } from "@/lib/r9track";

/**
 * AFFILIATE-SWAP — den här sajtens halva av r9track-kontraktet.
 *
 * `lib/r9track/` är avsiktligt okunnigt om oss och känner bara igen "1",
 * "true" och "granted" av sig självt. Vår samtyckeskaka bär version och
 * tidpunkt, så modulen behöver ett predikat. `options.config` är den seam den
 * tillhandahåller för precis det.
 *
 * ## Varför det ligger i en egen fil
 *
 * Två ställen läser samtycke: `proxy.ts` när gclid fångas vid landningen, och
 * `/till` när klicket går ut. De måste läsa *samma* kaka med *samma* predikat.
 *
 * ⚠️ Det gjorde de inte. Routen fick den här konfigurationen medan proxyn föll
 * tillbaka på `R9_TRACK_CONSENT_COOKIE`, som är satt i `.env.local` men inte i
 * `.env`. I produktion hade infångningen därmed failat stängt och aldrig
 * sparat någon gclid, medan utgångssidan letade efter en. Ingen av halvorna
 * hade sett fel ut för sig: klick loggades, samtycke fungerade, och den enda
 * synliga effekten hade varit att varenda konvertering hamnade i `skipped`.
 *
 * En konstant, importerad av båda, är det som gör den divergensen omöjlig.
 */
export const TRACK_CONFIG: Partial<R9TrackConfig> = {
  consentCookie: CONSENT_COOKIE,
  consentGranted: isMarketingGranted,

  /**
   * Klick-id:t fångas vid landningen oavsett samtyckessvar.
   *
   * Modulen kräver samtycke som förval och gör rätt i det. Här är gclid
   * bedömd som nödvändig för den tjänst läsaren faktiskt efterfrågar: hela
   * intäktsmodellen är provision från butiken, och utan klick-id:t kan
   * affiliatenätverket inte knyta ett köp till besöket. Bedömningen är gjord
   * av personuppgiftsansvarig, är densamma som tillämpas på tio andra svenska
   * sajter och har granskats av tillsynsmyndigheten vid två tillfällen.
   *
   * ⚠️ Det här är ett juridiskt ställningstagande om den här sajten, inte en
   * teknisk bekvämlighet. Flytta det aldrig in i `lib/r9track/` som förval —
   * modulen används av projekt som inte har gjort samma bedömning.
   *
   * Vad det inte ändrar: `consentAds` rapporterar fortfarande det verkliga
   * svaret. Att få behålla klick-id:t för provisionsspårning och att få tala
   * om för Google att läsaren samtyckt till annonspersonalisering är två
   * skilda frågor, och den andra besvaras av det fältet.
   */
  captureRequiresConsent: false,
};
