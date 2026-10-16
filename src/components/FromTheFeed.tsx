import { Link } from "react-router-dom";
import feed from "@/data/feed.json";
import { getPost } from "@/data/posts";

interface FeedItem {
  platform: "instagram" | "tiktok";
  /** Link to the Instagram/TikTok post */
  url: string;
  /** Image path in /public (e.g. "/images/feed/belonging.webp"); leave empty for a text card */
  thumbnail: string;
  caption: string;
  /** Slug of the related essay */
  essay: string;
}

const platformLabel = { instagram: "Instagram", tiktok: "TikTok" } as const;

/** Homepage section linking social posts to the essays behind them. Edit src/data/feed.json. */
const FromTheFeed = () => {
  const items = (feed as FeedItem[]).filter((item) => getPost(item.essay));
  if (items.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-journal-bg">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">
            @missjooo98
          </span>
          <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text">From the Feed</h2>
          <div className="w-12 h-px bg-journal-champagne/40 mx-auto"></div>
          <p className="text-journal-text-secondary font-light text-sm md:text-base max-w-md mx-auto">
            Small moments shared on social, and the longer essays behind them.
          </p>
        </div>

        <ul className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {items.map((item) => {
            const post = getPost(item.essay)!;
            return (
              <li
                key={`${item.url}-${item.essay}`}
                className="flex flex-col border border-journal-border bg-journal-card rounded-[3px] overflow-hidden shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10)]"
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.caption}
                      width={600}
                      height={750}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-[4/5] flex items-center justify-center bg-gradient-to-br from-journal-bg-secondary/50 via-journal-bg-secondary to-journal-bg-secondary/80 p-8">
                      <p className="font-serif italic text-lg text-journal-text-secondary leading-relaxed text-center">
                        &ldquo;{item.caption}&rdquo;
                      </p>
                    </div>
                  )}
                  <span className="flex items-center justify-between px-6 pt-5 text-[10px] tracking-[0.25em] uppercase text-journal-muted group-hover:text-journal-gold transition-colors">
                    <span>View on {platformLabel[item.platform]}</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </a>
                <div className="flex flex-1 flex-col justify-between gap-4 px-6 pb-6 pt-3">
                  {item.thumbnail && (
                    <p className="text-sm text-journal-text-secondary font-light leading-relaxed">{item.caption}</p>
                  )}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="font-serif text-lg text-journal-text hover:text-journal-gold transition-colors leading-snug"
                  >
                    Read the essay: {post.title} <span aria-hidden="true">→</span>
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
