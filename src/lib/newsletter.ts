export type SubscribeResult = { ok: boolean };

/** Where a signup happened. The worker sends it to beehiiv as utm_medium and as a subscriber tag. */
export type SignupSource = "homepage" | "post" | "topic-page" | "free-journal" | "suitcase";

export const SUBSCRIBE_ERROR = "Something went wrong. Please try again in a moment.";

/**
 * URL of the newsletter worker (newsletter-worker/), set at build time. The worker holds the beehiiv API key and
 * publication ID and adds the subscriber to beehiiv; nothing secret is in the browser.
 */
const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined;

interface SubscribeInput {
  email: string;
  source: SignupSource;
  /** Post or topic slug, saved as utm_content */
  detail?: string;
  /** Hidden honeypot field; real readers leave it empty */
  company?: string;
}

export async function subscribe(input: SubscribeInput): Promise<SubscribeResult> {
  if (!NEWSLETTER_ENDPOINT) {
    console.error("VITE_NEWSLETTER_ENDPOINT is not set, so the signup was not sent.");
    return { ok: false };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(NEWSLETTER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      signal: controller.signal,
    });
    const data = (await response.json().catch(() => ({}))) as { ok?: boolean };
    return { ok: response.ok && data.ok === true };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}
