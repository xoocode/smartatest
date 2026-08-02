/**
 * Gate for internal-only surfaces (style picker, styleguide route).
 *
 * Deliberately not authentication — there is nothing sensitive behind it yet.
 * It hides dev tooling from production visitors and from Googlebot. Set
 * NEXT_PUBLIC_SHOW_ADMIN=1 on a Vercel preview to review styles on a real
 * device. Replace with real auth if this ever guards data.
 */
export function isAdminEnabled(): boolean {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_SHOW_ADMIN === "1"
  );
}
