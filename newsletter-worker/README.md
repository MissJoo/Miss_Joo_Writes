# Newsletter worker (beehiiv)

GitHub Pages only serves files, so every signup form on missjoowrites.com posts to this small Cloudflare Worker.
The worker adds the email to beehiiv. The beehiiv API key and publication ID are stored only in Cloudflare.

| Form | utm_medium and tag | utm_content |
| --- | --- | --- |
| Homepage "The Letter" | `homepage` | |
| End of each essay | `post` | essay slug |
| Topic pages | `topic-page` | topic slug |
| Free Journal (homepage and /downloads) | `free-journal` | |
| The Suitcase countdown | `suitcase` | |

Every signup is sent with `utm_source: website`, `referring_site: missjoowrites.com`, `reactivate_existing: false` and
`send_welcome_email: true`. It also gets a subscriber tag named after its form. In beehiiv you can compare the forms
under **Analytics → Acquisition** (by UTM medium) or **Audience → Subscribers** (filter by tag).

## Where the API key goes

Cloudflare dashboard → **Workers & Pages** → **miss-joo-newsletter** → **Settings** → **Variables and Secrets** →
**Add**. Choose type **Secret** each time and click **Deploy**:

- `BEEHIIV_API_KEY`: from beehiiv → Settings → Integrations → API → *Create new API key*
- `BEEHIIV_PUBLICATION_ID`: `pub_c384ba58-cc97-4bd8-a784-47c153d7a2c8`

The site posts to `https://miss-joo-newsletter.missjodiaries.workers.dev` (set in `src/lib/newsletter.ts`; the
`VITE_NEWSLETTER_ENDPOINT` repo variable can override it).

## Deploying changes to the worker

```bash
cd newsletter-worker
npx wrangler login      # once
npx wrangler deploy
```

`keep_vars = true` in `wrangler.toml` keeps the secrets set in the dashboard.

- `ALLOWED_ORIGINS`: sites allowed to post. Add `http://localhost:8080` while testing locally.
- `FREE_JOURNAL_AUTOMATION_ID`: optional beehiiv automation (`aut_...`) to enrol Free Journal signups in, for
  example one that emails the journal link. Without it, the journals still unlock on the site straight after signup.

Logs: `npx wrangler tail`. A `beehiiv subscribe failed 401` or `403` means the key is wrong, or the plan has no
API access.
