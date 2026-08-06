import { getConfig, type R9TrackConfig } from "./config";
import {
  SIGNATURE_HEADER,
  SITE_HEADER,
  TIMESTAMP_HEADER,
  signPayload,
} from "./sign";

/**
 * REPORT — hands a recorded click to the platform.
 *
 * Called from `after()`, so it runs once the reader has already been sent on
 * to the retailer. Nothing here can delay that redirect, and nothing here is
 * allowed to throw into it: a failure costs us the measurement for one click,
 * never the click itself.
 *
 * There is no retry. A retry queue on the publisher would be a second piece of
 * durable state to operate, and the loss it protects against is already
 * covered from the other side — the affiliate network reports our click id
 * back on the transaction, so reconciliation recovers most of what a dropped
 * report loses.
 */

export type ClickReport = {
  clickId: string;
  ts: string;
  gclid?: string | null;
  braidType?: string | null;
  consentAds: boolean;
  pagePath?: string | null;
  productId?: string | null;
  merchant?: string | null;
  placement?: string | null;
  position?: number | null;
  programId?: number | null;
  country?: string | null;
  deviceType?: string | null;
  isBot?: boolean;
  /**
   * Which side is counting this click as a conversion, if either.
   *
   * Sent so the platform can decide per click rather than from a setting of
   * its own that has to be kept in step. A click reported as `client` was
   * already counted in the browser and must not be uploaded again.
   */
  outboundConversion?: "off" | "client" | "server";
};

/** How long to wait before giving up. The reader is already gone; be brief. */
const TIMEOUT_MS = 2_500;

export async function reportClick(
  report: ClickReport,
  config: R9TrackConfig = getConfig()
): Promise<void> {
  if (!config.enabled) return;

  try {
    const body = JSON.stringify(report);
    const timestamp = Date.now().toString();
    const signature = await signPayload(config.secret, timestamp, body);

    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        [SITE_HEADER]: config.site,
        [TIMESTAMP_HEADER]: timestamp,
        [SIGNATURE_HEADER]: signature,
      },
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(
        "[r9track] click report rejected:",
        response.status,
        report.clickId
      );
    }
  } catch (error) {
    /* Swallowed on purpose. This runs after the response has been sent, so
       throwing here would only produce an unhandled rejection in the log
       without helping anyone. */
    console.warn("[r9track] click report failed:", error);
  }
}
