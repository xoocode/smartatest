/**
 * ============================================================================
 * R9TRACK — configuration. The only thing a host project has to fill in.
 * ============================================================================
 *
 * Everything in `lib/r9track/` is portable. It imports nothing from the site
 * around it, so the folder can be copied into another project as-is. The two
 * integration points are this config (four environment variables) and a
 * resolver function passed to `createTillRoute`.
 *
 * See README.md in this folder for the drop-in checklist.
 */

export type R9TrackConfig = {
  /** Full URL of the platform's ingest endpoint. */
  endpoint: string;
  /** Site slug, matching a row in the platform's site registry. */
  site: string;
  /** Shared secret for request signing. Server-side only — never shipped. */
  secret: string;
  /** Master switch. Off means mint nothing, store nothing, report nothing. */
  enabled: boolean;
  /** Cookie holding the captured Google click identifier. */
  cookieName: string;
  /** How long a captured click identifier stays usable, in days. */
  cookieMaxAgeDays: number;
  /**
   * Cookie the consent platform writes, and the test that decides whether
   * advertising storage was granted.
   *
   * Left permissive by default (`undefined` means "no CMP wired up yet"), and
   * in that state no click identifier is ever stored. Fail closed: a missing
   * consent integration must not silently become consent.
   */
  consentCookie?: string;
  consentGranted?: (value: string | undefined) => boolean;
  /**
   * Whether storing the click identifier waits for advertising consent.
   *
   * True by default, and deliberately so: a project that drops this module in
   * and has not thought about it gets the cautious behaviour rather than the
   * convenient one.
   *
   * A controller who has assessed the identifier as strictly necessary for a
   * service the reader asked for can set it false, and then the identifier is
   * stored on every landing regardless of the consent answer. That is a legal
   * determination about a specific site, not a technical preference, so it
   * lives in that site's own config with the reasoning next to it — never as a
   * default here.
   *
   * It does not change what is *reported*. `consentAds` still carries the real
   * consent answer, because the platform needs the truthful signal for the
   * Google Ads upload, which is a separate question from whether we may keep
   * the identifier for affiliate attribution.
   */
  captureRequiresConsent: boolean;
  /** Query parameter the affiliate network reads our click id from. */
  clickIdParam: string;
  /** Query parameter the network accepts a Google click id in, if any. */
  gclidParam?: string;

  /**
   * Who counts the outbound click as a Google Ads conversion.
   *
   * `off`     nobody. No conversion action is fed at all.
   * `client`  the browser, with a gtag event on the click.
   * `server`  the platform, uploaded from its own record of the click.
   *
   * The two are alternatives and never both: one click must not become two
   * conversions. The mode is sent with every click report, so the platform can
   * see for itself which clicks it is meant to upload rather than relying on a
   * second setting being kept in step by hand.
   *
   * It also decides who cleans the address bar. A gtag conversion is attributed
   * through `_gcl_aw`, which Google only writes if it can read the click id off
   * the URL, so in `client` mode the parameter has to survive the landing and
   * is removed in the browser once gtag has started. In the other two modes the
   * server strips it before the page is ever rendered, which is tidier and
   * needs no JavaScript.
   */
  outboundConversion: "off" | "client" | "server";
};

const DEFAULTS = {
  enabled: true,
  /* Cautious by default. See the field's own note. */
  captureRequiresConsent: true,
  /* Off by default: a project that drops the module in has no conversion
     action to feed yet, and inventing one is not our call. */
  outboundConversion: "off" as const,
  cookieName: "_r9c",
  cookieMaxAgeDays: 90,
  /* Adtraction calls its sub-id `epi`. Other networks use `subid`, `clickref`
     or `u1` — one line to change, which is the reason it is a setting. */
  clickIdParam: "epi",
  gclidParam: "gclid",
} as const;

/** Anything unrecognised is `off`, so a typo silences the feature rather than
    quietly picking one of the two ways of counting. */
function readMode(raw: string | undefined): R9TrackConfig["outboundConversion"] {
  return raw === "client" || raw === "server" ? raw : DEFAULTS.outboundConversion;
}

let cached: R9TrackConfig | null = null;

/**
 * Read configuration from the environment.
 *
 * Deliberately lenient: a project that has not set the variables yet gets a
 * disabled tracker rather than a build error, so the module can be dropped in
 * before the platform side exists. `enabled` is false unless all three
 * required values are present.
 */
export function getConfig(overrides: Partial<R9TrackConfig> = {}): R9TrackConfig {
  if (!cached) {
    const endpoint = process.env.R9_TRACK_ENDPOINT ?? "";
    const site = process.env.R9_TRACK_SITE ?? "";
    const secret = process.env.R9_TRACK_SECRET ?? "";
    const explicitlyOff = process.env.R9_TRACK_ENABLED === "false";

    cached = {
      endpoint,
      site,
      secret,
      enabled: Boolean(endpoint && site && secret) && !explicitlyOff,
      cookieName: process.env.R9_TRACK_COOKIE ?? DEFAULTS.cookieName,
      cookieMaxAgeDays: DEFAULTS.cookieMaxAgeDays,
      captureRequiresConsent: DEFAULTS.captureRequiresConsent,
      outboundConversion: readMode(process.env.R9_TRACK_OUTBOUND_CONVERSION),
      consentCookie: process.env.R9_TRACK_CONSENT_COOKIE || undefined,
      clickIdParam: process.env.R9_TRACK_CLICK_PARAM ?? DEFAULTS.clickIdParam,
      gclidParam: process.env.R9_TRACK_GCLID_PARAM ?? DEFAULTS.gclidParam,
    };
  }
  return { ...cached, ...overrides };
}

/** Test seam. Never called in production. */
export function resetConfigCache(): void {
  cached = null;
}
