/**
 * ============================================================================
 * R9TRACK — drop-in affiliate and ad click tracking.
 * ============================================================================
 *
 * Portable by design. Nothing in this folder imports anything from the site
 * around it, so `lib/r9track/` can be copied wholesale into another project.
 * See README.md here for the four-step install.
 *
 * The two integration points:
 *
 *   middleware.ts        →  captureClickId(request, response)
 *   app/till/[id]/route  →  createTillRoute({ resolve })
 *
 * Everything else is configuration through environment variables.
 */

export { getConfig, resetConfigCache, type R9TrackConfig } from "./config";
export { mintClickId, CLICK_ID_LENGTH } from "./click-id";
export {
  captureClickId,
  hasAdConsent,
  readClickCookie,
  readClickParam,
  type CapturedClick,
  type ClickCookie,
} from "./capture";
export {
  createTillRoute,
  type TillTarget,
  type TillResolver,
  type TillRouteOptions,
} from "./redirect";
export { reportClick, type ClickReport } from "./report";
export {
  signPayload,
  SITE_HEADER,
  SIGNATURE_HEADER,
  TIMESTAMP_HEADER,
} from "./sign";
