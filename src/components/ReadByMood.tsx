import { useState } from "react";
import { Link } from "react-router-dom";
import { moods } from "@/data/moods";
import { getPost, readingTime } from "@/data/posts";
import { cn } from "@/lib/utils";
import { topicLabel } from "@/data/pillars";

/** Homepage section: pick a mood, get a short path into the journal. Pairings live in src/data/moods.ts. */
const ReadByMood = () => {
  // Skip any mood whose essay slugs don't exist, so a typo in the config can't break the page
  const options = moods.flatMap((mood) => {
    const post = getPost(mood.essay);
    const also = getPost(mood.also);
    return post && also ? [{ ...mood, post, also }] : [];
  });
  const [selected, setSelected] = useState(0);

  if (options.length === 0) return null;
  const { post, also, description } = options[selected];

  return (
    <section aria-labelledby="read-by-mood-title" className="py-10 md:py-14 bg-journal-bg border-t border-journal-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[5fr_6fr] lg:gap-14">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">
              Read by How You Feel
            </span>
            <h2 id="read-by-mood-title" className="mt-4 font-serif text-3xl md:text-5xl leading-tight text-journal-text">
              How are you feeling today?
            </h2>
            <p className="mt-4 text-journal-text-secondary font-light text-sm md:text-base leading-relaxed">
              Pick one. Each feeling opens a short, curated path into the journal.
            </p>

            <div role="group" aria-label="Choose a mood" className="mt-6 flex flex-wrap gap-3">
              {options.map((option, index) => (
                <button
                  key={option.label}
                  type="button"
                  aria-pressed={selected === index}
                  aria-controls="read-by-mood-essay"
                  onClick={() => setSelected(index)}
                  className={cn(
                    "min-h-[44px] rounded-full border px-5 py-2 font-sans text-sm font-medium transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-bg",
                    selected === index
                      ? "bg-journal-gold text-journal-bg border-journal-gold shadow-sm"
                      : "text-journal-text border-journal-border hover:border-journal-gold/50",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div id="read-by-mood-essay" aria-live="polite">
            {/* key forces a remount so the fade replays on every change */}
            <article
              key={post.slug}
              className="animate-fade-in motion-reduce:animate-none rounded-xl border border-journal-border bg-journal-card p-7 md:p-10"
            >
              <span className="block font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-journal-muted">Start here</span>
              <h3 className="mt-4 font-serif text-2xl md:text-3xl leading-snug text-journal-text">
                <Link to={`/blog/${post.slug}`} className="hover:text-journal-gold transition-colors duration-300">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 font-sans text-sm md:text-base font-light leading-relaxed text-journal-text-secondary">{description}</p>
              <p className="mt-4 font-sans text-sm font-light text-journal-muted">
                {topicLabel(post.pillar)} · {readingTime(post)}
              </p>
              <div className="mt-6 border-t border-journal-border pt-6">
                <p className="font-sans text-sm font-light text-journal-muted">Also for this feeling</p>
                <Link
                  to={`/blog/${also.slug}`}
                  className="mt-1 inline-block font-sans text-base font-light leading-snug text-journal-gold underline underline-offset-4 hover:text-journal-text transition-colors duration-300"
                >
                  {also.title} →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadByMood;
