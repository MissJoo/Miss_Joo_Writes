import { useState } from "react";
import { Link } from "react-router-dom";
import { moodPortrait, moods } from "@/data/moods";
import { cutMidSentence, getPost, readingTime, textParagraphs, type Post } from "@/data/posts";
import { cn } from "@/lib/utils";
import { topicLabel } from "@/data/pillars";
import { publicFileExists } from "@/lib/publicFiles";

/** First sentence of the essay, and the start of the second one (cut off mid-sentence). */
const openingLines = (post: Post) => {
  const text = textParagraphs(post)
    .map((p) => p.replace(/^(##:|>>:)/, "").replace(/\s+/g, " ").trim())
    .filter((p) => !p.startsWith("Until the next page"))
    .join(" ");
  const sentences = text.split(/(?<=[.!?…])\s+/);
  return [sentences[0], cutMidSentence(sentences[1] ?? "", 0.55)];
};

/** Homepage section: pick a mood, get the essay for it. Pairings live in src/data/moods.ts. */
const ReadByMood = () => {
  // Skip any mood whose essay slug doesn't exist, so a typo in the config can't break the page
  const options = moods.flatMap((mood) => {
    const post = getPost(mood.essay);
    return post ? [{ ...mood, post }] : [];
  });
  const [selected, setSelected] = useState<number | null>(null);

  if (options.length === 0) return null;
  const post = selected === null ? null : options[selected].post;
  const [firstLine, secondLine] = post ? openingLines(post) : ["", ""];
  const hasPortrait = publicFileExists(moodPortrait.src);

  return (
    <section aria-labelledby="read-by-mood-title" className="py-20 md:py-28 bg-journal-bg border-t border-journal-border/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">
            Read by How You Feel
          </span>
          <h2 id="read-by-mood-title" className="font-serif text-2xl md:text-3.5xl text-journal-text">
            How are you feeling today?
          </h2>
          <div className="w-12 h-px bg-journal-champagne/40 mx-auto"></div>
        </div>

        <p className="mt-4 text-center text-journal-text-secondary font-light text-sm md:text-base max-w-md mx-auto">
          Pick one. There&rsquo;s a page for that feeling.
        </p>

        <div role="group" aria-label="Choose a mood" className="mt-6 flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl mx-auto">
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
            key={post?.slug ?? "none"}
            className="animate-fade-in motion-reduce:animate-none group relative border border-journal-border bg-journal-card rounded-[3px] p-8 md:p-10 text-center shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10),0_1px_3px_rgba(0,0,0,0.04)]"
          >
            {post ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.25em] uppercase text-journal-muted">
                    <span>{topicLabel(post.pillar)}</span>
                    <span className="w-4 h-px bg-journal-border"></span>
                    <span>{readingTime(post)}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-journal-text leading-snug font-medium">
                    <Link to={`/blog/${post.slug}`} className="hover:text-journal-gold transition-colors duration-300">
                      {post.title}
                    </Link>
                  </h3>
                  <div className="text-journal-text-secondary text-sm md:text-base font-light leading-relaxed">
                    <p>{firstLine}</p>
                    {/* Second line fades out mid-sentence */}
                    <p aria-hidden="true">
                      <span className="inline-block [-webkit-mask-image:linear-gradient(to_right,#000_35%,transparent)] [mask-image:linear-gradient(to_right,#000_35%,transparent)]">
                        {secondLine}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-journal-border/30">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-journal-gold px-8 text-[11px] uppercase tracking-widest text-journal-gold hover:text-journal-text hover:border-journal-text transition-colors duration-300"
                  >
                    <span>Keep reading</span>
                    <span aria-hidden="true">→</span>
                    <span className="sr-only">: {post.title}</span>
                  </Link>
                </div>
              </>
            ) : (
              <p className="font-serif italic text-lg md:text-xl text-journal-text-secondary leading-relaxed max-w-lg mx-auto">
                Every entry here started as something I couldn&rsquo;t say out loud. Pick one, and I&rsquo;ll show you where to begin.
              </p>
            )}
          </article>
        </div>

        <figure className="mt-14 mx-auto w-[min(300px,80%)] text-center">
          {hasPortrait ? (
            <img
              src={moodPortrait.src}
              alt="Miss Joo"
              width={600}
              height={750}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover rounded-[3px] border border-journal-border shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10)]"
            />
          ) : (
            // Soft empty frame until the photo is added to public/assets
            <div aria-hidden="true" className="aspect-[4/5] w-full rounded-[3px] border border-journal-border bg-journal-bg-secondary/60" />
          )}
          <figcaption className="mt-4 font-serif italic text-lg text-journal-text-secondary leading-relaxed">
            {moodPortrait.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default ReadByMood;
