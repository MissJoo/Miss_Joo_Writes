// "From the Feed" on the homepage: three social posts and the essays behind them.
//
// TO FINISH A CARD
// - Post link: replace POST_URL_PLACEHOLDER below with the post's address, e.g.
//   "https://www.instagram.com/p/ABC123/" or "https://www.tiktok.com/@missjooo98/video/123...".
//   Until then, "View on Instagram/TikTok" opens your profile instead.
// - Image: save the photo as the exact file named in `image` inside public/assets/feed/
//   (e.g. public/assets/feed/qatar-days.webp). A portrait 4:5 photo works best.
//   Until the file exists, the card shows the quote on the plain card background.
// Then save and push; the homepage rebuilds itself.

export const POST_URL_PLACEHOLDER = "POST_URL_PLACEHOLDER";

export const PROFILE_URLS = {
  instagram: "https://www.instagram.com/missjooo98/",
  tiktok: "https://www.tiktok.com/@missjooo98",
} as const;

export interface FeedItem {
  platform: keyof typeof PROFILE_URLS;
  quote: string;
  /** Slug of the essay in src/data/posts.ts */
  essay: string;
  /** Link text after "Read the essay:" */
  essayTitle: string;
  /** Instagram/TikTok post address, or POST_URL_PLACEHOLDER */
  postUrl: string;
  /** Path in public/, e.g. "/assets/feed/qatar-days.webp" */
  image: string;
}

export const feed: FeedItem[] = [
  {
    platform: "instagram",
    quote: "I can miss home and still enjoy living here. One feeling does not cancel out the other.",
    essay: "qatar-days-filipina",
    essayTitle: "Qatar Days Through a Filipina Woman's Eyes",
    postUrl: POST_URL_PLACEHOLDER,
    image: "/assets/feed/qatar-days.webp",
  },
  {
    platform: "tiktok",
    quote: "If you are the only one fighting for it, you are not fighting for love anymore.",
    essay: "fighting-vs-forcing-love",
    essayTitle: "Fighting for Love or Forcing It",
    postUrl: POST_URL_PLACEHOLDER,
    image: "/assets/feed/fighting-for-love.webp",
  },
  {
    platform: "instagram",
    quote: "I used to believe that replaying everything made me wise. Mostly, it made me tired.",
    essay: "overthinking-vs-thinking-deeply",
    essayTitle: "Overthinking Is Not the Same as Thinking Deeply",
    postUrl: POST_URL_PLACEHOLDER,
    image: "/assets/feed/overthinking.webp",
  },
];
