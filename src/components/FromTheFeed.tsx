import { Link } from "react-router-dom";
import { feed, POST_URL_PLACEHOLDER, PROFILE_URLS } from "@/data/feed";
import { getPost } from "@/data/posts";
import { publicFileExists } from "@/lib/publicFiles";

const platformLabel = { instagram: "Instagram", tiktok: "TikTok" } as const;

/** Homepage section linking social posts to the essays behind them. Edit src/data/feed.ts. */
const FromTheFeed = () => {
  const items = feed.filter((item) => getPost(item.essay));
  if (items.length === 0) return null;

  return (
    <section className="py-10 md:py-14 bg-journal-bg border-t border-journal-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto mb-8 space-y-3">
          <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">From the Feed</span>
          <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text">Small moments, and the essays behind them.</h2>
        </div>

        <ul className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {items.map((item) => {
            const post = getPost(item.essay)!;
            // Until the post link is added, point to the profile
            const url = item.postUrl && item.postUrl !== POST_URL_PLACEHOLDER ? item.postUrl : PROFILE_URLS[item.platform];
            const hasImage = publicFileExists(item.image);
            return (
              <li
                key={item.essay}
                className="flex flex-col border border-journal-border bg-journal-card rounded-xl overflow-hidden shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10)]"
              >
                <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`View on ${platformLabel[item.platform]}`} className="block">
                  {hasImage ? (
                    <img
                      src={item.image}
                      alt=""
                      width={600}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[3/2] w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-[3/2] flex items-center justify-center bg-journal-bg-secondary">
                      <span className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-journal-muted">Photo coming soon</span>
                    </div>
                  )}
                </a>
                <div className="flex flex-1 flex-col justify-between gap-3 p-5">
                  <p className="font-serif text-lg text-journal-text leading-snug">&ldquo;{item.quote}&rdquo;</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    aria-label={`Read the essay: ${item.essayTitle}`}
                    className="self-start text-xs text-journal-gold underline underline-offset-4 hover:text-journal-text transition-colors"
                  >
                    Read the essay →
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FromTheFeed;
