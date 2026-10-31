import { useState } from "react";
import { randomNote } from "@/data/daily-notes";
import "./home.css";

/** Homepage strip under the moods: "Today's note" in gold script and a softly glowing button; it opens a random line from src/data/daily-notes.ts. */
const TodaysNote = () => {
  // Picked on click, and starts closed again on every visit to the homepage (refresh or coming back)
  const [note, setNote] = useState<string | null>(null);

  return (
    <section aria-label="Today's note" className="relative py-10 md:py-14 bg-journal-bg border-t border-journal-border">
      {/* Small star sitting on the divider line */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-0 -translate-x-1/2 bg-journal-bg-secondary px-4 py-0.5 text-sm leading-none text-journal-gold"
      >
        ✦
      </span>
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <div className="flex flex-col items-center gap-6">
          <span className="font-signature text-5xl md:text-6xl leading-tight text-journal-gold">Today&rsquo;s note</span>
          {note === null && (
            <button
              type="button"
              onClick={() => setNote(randomNote())}
              aria-controls="todays-note"
              className="tn-glow inline-flex h-14 items-center gap-3 rounded-full border border-journal-gold/70 px-10 text-sm tracking-[0.25em] uppercase text-journal-gold hover:text-journal-text hover:border-journal-gold font-sans font-medium transition-colors [transition-duration:300ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-bg"
            >
              Open it <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
        <p id="todays-note" aria-live="polite" className="max-w-xl mx-auto">
          {note && (
            <span className="block mt-3 font-serif italic text-xl md:text-2xl text-journal-text leading-relaxed animate-fade-in motion-reduce:animate-none">
              <span className="tn-note-glow">{note}</span>
            </span>
          )}
        </p>
      </div>
    </section>
  );
};

export default TodaysNote;
