// Cloudflare Worker that adds website signups to beehiiv. The site posts { email, source, detail, company } here;
// the beehiiv API key never reaches the browser. Setup steps: newsletter-worker/README.md
//
// Set in Cloudflare (Workers & Pages > missjoo-newsletter > Settings > Variables and Secrets), never in git:
//   BEEHIIV_API_KEY               secret
//   BEEHIIV_PUBLICATION_ID        secret, pub_... id of the publication
// In wrangler.toml:
//   ALLOWED_ORIGINS               comma-separated sites allowed to post here
//   FREE_JOURNAL_AUTOMATION_ID    optional beehiiv automation (aut_...) to enrol free-journal signups in

const API = "https://api.beehiiv.com/v2";

/** Where a signup happened. Sent to beehiiv as utm_medium and added as a subscriber tag. */
const SOURCES = new Set(["homepage", "post", "topic-page", "free-journal", "suitcase"]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body, status, headers) =>
  new Response(JSON.stringify(body), { status, headers: { ...headers, "Content-Type": "application/json" } });

const clip = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((o) => o.trim()).filter(Boolean);
    const isAllowed = allowed.includes(origin);
    const cors = isAllowed
      ? {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
          Vary: "Origin",
        }
      : { Vary: "Origin" };

    if (request.method === "OPTIONS") return new Response(null, { status: isAllowed ? 204 : 403, headers: cors });
    if (request.method !== "POST") return json({ ok: false, error: "method-not-allowed" }, 405, cors);
    if (!isAllowed) return json({ ok: false, error: "origin-not-allowed" }, 403, cors);
    if (!env.BEEHIIV_API_KEY || !env.BEEHIIV_PUBLICATION_ID) {
      console.error("BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID is not set");
      return json({ ok: false, error: "not-configured" }, 500, cors);
    }

    let input;
    try {
      input = await request.json();
    } catch {
      return json({ ok: false, error: "bad-request" }, 400, cors);
    }

    // Hidden field people never see; bots fill it in. Answer as if it worked so they move on.
    if (clip(input.company, 200)) return json({ ok: true }, 200, cors);

    const email = clip(input.email, 254).toLowerCase();
    if (!EMAIL_PATTERN.test(email)) return json({ ok: false, error: "invalid-email" }, 400, cors);

    const source = SOURCES.has(input.source) ? input.source : "website";
    const detail = clip(input.detail, 120);

    const beehiiv = (path, body) =>
      fetch(`${API}/publications/${env.BEEHIIV_PUBLICATION_ID}${path}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${env.BEEHIIV_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

    let created;
    try {
      const response = await beehiiv("/subscriptions", {
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: "website",
        utm_medium: source,
        ...(detail && { utm_content: detail }),
        referring_site: "missjoowrites.com",
        ...(source === "free-journal" && env.FREE_JOURNAL_AUTOMATION_ID && { automation_ids: [env.FREE_JOURNAL_AUTOMATION_ID] }),
      });
      created = await response.json().catch(() => ({}));
      if (!response.ok) {
        // 401/403 here usually means a wrong key, or a plan without API access: check `npx wrangler tail`
        console.error("beehiiv subscribe failed", response.status, JSON.stringify(created));
        return json({ ok: false, error: `beehiiv-${response.status}` }, 502, cors);
      }
    } catch (error) {
      console.error("beehiiv unreachable", String(error));
      return json({ ok: false, error: "beehiiv-unreachable" }, 502, cors);
    }

    const subscriber = created && created.data;
    if (subscriber && subscriber.status === "invalid") return json({ ok: false, error: "invalid-email" }, 400, cors);

    // Tag by form too. A failed tag should not fail a signup that already worked.
    if (subscriber && subscriber.id) {
      try {
        const tagged = await beehiiv(`/subscriptions/${subscriber.id}/tags`, { tags: [source] });
        if (!tagged.ok) console.error("beehiiv tag failed", tagged.status, await tagged.text());
      } catch (error) {
        console.error("beehiiv tag unreachable", String(error));
      }
    }

    return json({ ok: true }, 200, cors);
  },
};
