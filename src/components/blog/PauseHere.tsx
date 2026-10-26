import { useState } from "react";
import type { Post } from "@/data/posts";

/** "Pause here" box inside an essay: a question and a button that is replaced by a short response. */
const PauseHere = ({ pause }: { pause: NonNullable<Post["pause"]> }) => {
  const [answered, setAnswered] = useState(false);

  return (
    <aside
      aria-label="Pause here"
      className="my-12 border border-journal-border bg-journal-bg-secondary/30 rounded-[3px] px-6 py-8 md:px-10 text-center space-y-4"
    >
      <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">Pause here</span>
      <p className="font-serif italic text-lg md:text-xl text-journal-text leading-relaxed">{pause.question}</p>
      <div aria-live="polite" className="pt-1">
        {answered ? (
          <p className="text-journal-text-secondary font-light leading-relaxed animate-fade-in motion-reduce:animate-none">{pause.response}</p>
        ) : (
          <button
            type="button"
            onClick={() => setAnswered(true)}
            className="inline-flex h-11 items-center rounded-full border border-journal-gold px-8 text-[11px] uppercase tracking-widest text-journal-gold hover:text-journal-text hover:border-journal-text transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-bg"
          >
            {pause.button}
          </button>
        )}
      </div>
    </aside>
  );
};

export default PauseHere;
