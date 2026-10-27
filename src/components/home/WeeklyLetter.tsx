import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { weeklyLetter } from "@/data/weekly-letter";
import { getPost } from "@/data/posts";
import "./home.css";

const OPEN_MS = 950;

/** Homepage "This week's letter": a sealed envelope that opens to a few lines of the essay in src/data/weekly-letter.ts. */
const WeeklyLetter = () => {
  const post = getPost(weeklyLetter.essay);
  const [stage, setStage] = useState<"sealed" | "opening" | "open">("sealed");
  const timer = useRef<number>();
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (stage === "open") paperRef.current?.focus({ preventScroll: true });
  }, [stage]);

  if (!post) return null;
  const lines = weeklyLetter.lines;

  const breakSeal = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return setStage("open");
    setStage("opening");
    timer.current = window.setTimeout(() => setStage("open"), OPEN_MS);
  };

  return (
    <section aria-labelledby="weekly-letter-title" className="pb-20 md:pb-28 bg-journal-bg">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">
            This week&rsquo;s letter
          </span>
          <h2 id="weekly-letter-title" className="font-serif text-2xl md:text-3.5xl text-journal-text">
            Something arrived for you.
          </h2>
          <div className="w-12 h-px bg-journal-champagne/40 mx-auto"></div>
          <p className="text-journal-text-secondary font-light text-sm md:text-base max-w-md mx-auto">Click the Seal</p>
        </div>

        {stage === "open" ? (
          <div ref={paperRef} tabIndex={-1} className="wl-paper text-journal-text-secondary focus:outline-none">
            {lines.map((line, index) => (
              <p key={index}>{index === lines.length - 1 ? <span className="wl-fade">{line}</span> : line}</p>
            ))}
            <div className="pt-6">
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-gold px-8 text-[11px] uppercase tracking-widest text-espresso hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-bg"
              >
                <span>Read the rest</span>
                <span aria-hidden="true">→</span>
                <span className="sr-only">: {post.title}</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className={`wl-envelope${stage === "opening" ? " is-open" : ""}`}>
            <div className="wl-back" />
            <div className="wl-peek" />
            <div className="wl-front" />
            <div className="wl-flap" />
            <button type="button" className="wl-seal" onClick={breakSeal} disabled={stage !== "sealed"} aria-label="Break the seal and open this week's letter">
              MJ
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WeeklyLetter;
