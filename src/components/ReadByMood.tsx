import { useState } from "react";
import { Link } from "react-router-dom";
import { moods } from "@/data/moods";
import { getPost, readingTime } from "@/data/posts";
import { cn } from "@/lib/utils";

/** Homepage section: pick a mood, get the essay for it. Pairings live in src/data/moods.ts. */
const ReadByMood = () => {
  // Skip any mood whose essay slug doesn't exist, so a typo in the config can't break the page
  const options = moods.flatMap((mood) => {
    const post = getPost(mood.essay);
    return post ? [{ ...mood, post }] : [];
  });
  const [selected, setSelected] = useState(0);

  if (options.length === 0) return null;
  const { post } = options[selected];

  return (
    <section aria-labelledby="read-by-mood-title" className="py-20 md:py-28 bg-journal-bg border-t border-journal-border/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">
            Where are you today?
          </span>
          <h2 id="read-by-mood-title" className="font-serif text-2xl md:text-3.5xl text-journal-text">
            Read by How You Feel
          </h2>
          <div className="w-12 h-px bg-journal-champagne/40 mx-auto"></div>
          <p className="text-journal-text-secondary font-light text-sm md:text-base max-w-md mx-auto">
            Choose what feels closest. There&rsquo;s an essay waiting for that feeling.
          </p>
        </div>

        <div role="group" aria-label="Choose a mood" className="mt-10 flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl mx-auto">
          {options.map((option, index) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={selected === index}
              aria-controls="read-by-mood-essay"
              onClick={() => setSelected(index)}
              className={cn(
                "rounded-full border px-4 py-2 font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-bg",
                selected === index
                  ? "bg-journal-gold text-journal-bg border-journal-gold shadow-sm"
                  : "text-journal-text-secondary border-journal-border bg-journal-card hover:text-journal-text hover:border-journal-gold/50",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div id="read-by-mood-essay" aria-live="polite" className="mt-10 max-w-2xl mx-auto">
          {/* key forces a remount so the fade replays on every change */}
          <article
            key={post.slug}
            className="animate-fade-in motion-reduce:animate-none group relative border border-journal-border bg-journal-card rounded-[3px] p-8 md:p-10 shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10),0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-journal-muted">
                <span>{post.category}</span>
                <span className="w-4 h-px bg-journal-border"></span>
                <span>{readingTime(post)}</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-journal-text leading-snug font-medium">
                <Link to={`/blog/${post.slug}`} className="hover:text-journal-gold transition-colors duration-300">
                  {post.title}
                </Link>
              </h3>
              <p className="text-journal-text-secondary text-sm md:text-base font-light leading-relaxed">{post.excerpt}</p>
            </div>
            <div className="pt-6 mt-6 border-t border-journal-border/30">
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-journal-gold hover:text-journal-text transition-colors duration-300 font-medium"
              >
                <span>Read the entry</span>
                <span aria-hidden="true">→</span>
                <span className="sr-only">: {post.title}</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ReadByMood;
