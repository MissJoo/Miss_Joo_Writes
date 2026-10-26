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
    <section className="py-20 md:py-28 bg-journal-bg">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <span className="text-[11px] tracking-[0.2em] text-journal-gold font-sans font-medium block">
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
            // Until the post link is added, point to the profile
            const url = item.postUrl && item.postUrl !== POST_URL_PLACEHOLDER ? item.postUrl : PROFILE_URLS[item.platform];
            const hasImage = publicFileExists(item.image);
            return (
              <li
                key={item.essay}
                className="flex flex-col border border-journal-border bg-journal-card rounded-[3px] overflow-hidden shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10)]"
              >
                <a href={url} target="_blank" rel="noopener noreferrer" className="group block">
                  {hasImage ? (
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={item.image}
                        alt=""
                        width={600}
                        height={750}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      {/* Soft dark overlay keeps the quote readable on any photo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" aria-hidden="true" />
                      <p className="relative flex h-full items-end p-8 font-serif italic text-lg text-white leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>
                  ) : (
                    <div className="aspect-[4/5] flex items-center justify-center bg-gradient-to-br from-journal-bg-secondary/50 via-journal-bg-secondary to-journal-bg-secondary/80 p-8">
                      <p className="font-serif italic text-lg text-journal-text-secondary leading-relaxed text-center">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>
                  )}
                  <span className="flex items-center justify-center gap-2 px-6 pt-5 text-[10px] tracking-[0.25em] uppercase text-journal-muted group-hover:text-journal-gold transition-colors">
                    <span>View on {platformLabel[item.platform]}</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </a>
                <div className="flex flex-1 flex-col justify-between gap-4 px-6 pb-6 pt-3 text-center">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="font-serif text-lg text-journal-text hover:text-journal-gold transition-colors leading-snug"
                  >
                    Read the essay: {item.essayTitle} <span aria-hidden="true">→</span>
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
