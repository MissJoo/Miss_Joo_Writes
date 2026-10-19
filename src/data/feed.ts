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
    quote: "To be a Filipina woman in Qatar is to live between two worlds.",
    essay: "qatar-days-filipina",
    essayTitle: "Qatar Days Through a Filipina Woman's Eyes",
    postUrl: POST_URL_PLACEHOLDER,
    image: "/assets/feed/qatar-days.webp",
  },
  {
    platform: "tiktok",
    quote: "The little things I never expected to miss after moving to Qatar.",
    essay: "things-i-never-expected-to-miss",
    essayTitle: "The Things I Never Expected to Miss Until I Moved to Qatar",
    postUrl: POST_URL_PLACEHOLDER,
    image: "/assets/feed/never-expected-to-miss.webp",
  },
  {
    platform: "instagram",
    quote: "I'm learning to take my coffee black.",
    essay: "the-black-coffee-rule",
    essayTitle: "The Black Coffee Rule",
    postUrl: POST_URL_PLACEHOLDER,
    image: "/assets/feed/black-coffee-rule.webp",
  },
];
