import { useState } from "react";
import type { Post } from "@/data/posts";

/** "Pause here" box inside an essay: a question, a private note field, and a button that is replaced by a short response. */
const PauseHere = ({ pause }: { pause: NonNullable<Post["pause"]> }) => {
  const [answered, setAnswered] = useState(false);

  return (
    <aside aria-label="Pause here" className="!my-10 rounded-xl border border-journal-border bg-journal-card p-5 md:p-6 space-y-3">
      <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">Pause here</span>
      <p className="font-serif text-xl md:text-2xl text-journal-text leading-snug">{pause.question}</p>
      <p className="font-sans text-xs font-light leading-relaxed text-journal-text-secondary">Your answer stays private unless you choose to share it</p>
      {/* Never sent or saved anywhere: it only lives on this page until the reader leaves */}
      <textarea
        rows={3}
        aria-label={pause.question}
        data-lenis-prevent
        className="block w-full resize-y rounded-xl border border-journal-border bg-journal-bg p-3 font-sans text-base text-journal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne"
      />
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
