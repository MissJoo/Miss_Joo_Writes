export type SubscribeResult = { ok: boolean; message?: string };

/**
 * Newsletter provider endpoint, set at build time (e.g. a beehiiv embed/subscribe URL or a small proxy).
 * The endpoint receives a form POST with `email` (and `source`) and should answer 2xx on success.
 * When unset, signups go to the existing Mailchimp audience.
 */
const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined;

// Mailchimp config extracted from the embedded form
const MAILCHIMP_ACTION_URL =
  "https://github.us18.list-manage.com/subscribe/post-json?u=80e1467a6cae550ca8829039c&id=f46f720fb3&f_id=0071aee6f0";
const MAILCHIMP_HONEYPOT = "b_80e1467a6cae550ca8829039c_f46f720fb3";

type MailchimpResponse = { result: string; msg: string };
type MailchimpJsonpCallback = (data: MailchimpResponse) => void;
type MailchimpCallbackStore = Window & Record<string, MailchimpJsonpCallback | undefined>;

/**
 * Submits email to Mailchimp via JSONP (no backend required).
 * Mailchimp doesn't support CORS, so we inject a <script> tag instead.
 */
function submitToMailchimp(email: string): Promise<MailchimpResponse> {
  return new Promise((resolve, reject) => {
    const callbackName = `mc_callback_${Date.now()}`;
    const url = `${MAILCHIMP_ACTION_URL}&EMAIL=${encodeURIComponent(email)}&${MAILCHIMP_HONEYPOT}=&c=${callbackName}`;
    const callbacks = window as unknown as MailchimpCallbackStore;

    // Attach callback to window so the JSONP script can call it
    callbacks[callbackName] = (data: MailchimpResponse) => {
      delete callbacks[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };

    const script = document.createElement("script");
    script.src = url;
    script.onerror = () => {
      delete callbacks[callbackName];
      document.body.removeChild(script);
      reject(new Error("Network error. Please try again."));
    };

    document.body.appendChild(script);

    // Fallback timeout - Mailchimp usually responds in < 5s
    setTimeout(() => {
      if (callbacks[callbackName]) {
        delete callbacks[callbackName];
        if (document.body.contains(script)) document.body.removeChild(script);
        reject(new Error("Request timed out. Please try again."));
      }
    }, 10000);
  });
}

const stripHtml = (text: string) => text.replace(/<[^>]*>/g, "").replace(/^\d+\s*-\s*/, "");

export async function subscribe(email: string, source = "website"): Promise<SubscribeResult> {
  try {
    if (NEWSLETTER_ENDPOINT) {
      const body = new FormData();
      body.append("email", email);
      body.append("source", source);
      const response = await fetch(NEWSLETTER_ENDPOINT, { method: "POST", body });
      return response.ok ? { ok: true } : { ok: false, message: "Something went wrong. Please try again." };
    }

    const response = await submitToMailchimp(email);
    if (response.result === "success") return { ok: true };
    // Mailchimp returns already-subscribed or other soft errors in msg
    if (response.msg?.includes("already subscribed")) {
      return { ok: false, message: "This email is already subscribed. Check your inbox!" };
    }
    return { ok: false, message: response.msg ? stripHtml(response.msg) : "Something went wrong. Please try again." };
  } catch (error: unknown) {
    return { ok: false, message: error instanceof Error ? error.message : "Please try again later." };
  }
}
