import { currentUser } from "@clerk/nextjs/server";

/**
 * Private-instance guard.
 *
 * Set `ALLOWED_EMAILS` to a comma-separated list to lock the app down to those
 * accounts. Leave it unset and the app stays open to anyone who signs up —
 * that keeps local development and any future multi-user use frictionless.
 *
 * This is deliberately a *server-side* variable (no `NEXT_PUBLIC_`): the list
 * of who may use the app should never ship to the browser.
 */
function allowedEmails(): string[] {
  return (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/** True when no allowlist is configured — i.e. the app is open. */
export function isAllowlistOff(): boolean {
  return allowedEmails().length === 0;
}

/**
 * Every email Clerk knows for the signed-in user, lowercased.
 * Clerk allows several addresses per account, so check them all.
 */
async function currentUserEmails(): Promise<string[]> {
  const user = await currentUser();
  if (!user) return [];
  return user.emailAddresses
    .map((e) => e.emailAddress?.toLowerCase())
    .filter((e): e is string => Boolean(e));
}

/**
 * Is the signed-in user allowed to use this instance?
 *
 * Returns `true` when the allowlist is empty (open mode) so that forgetting to
 * set the variable can never lock the owner out of their own app.
 */
export async function isAllowedUser(): Promise<boolean> {
  const allowed = allowedEmails();
  if (allowed.length === 0) return true;

  const emails = await currentUserEmails();
  return emails.some((e) => allowed.includes(e));
}
