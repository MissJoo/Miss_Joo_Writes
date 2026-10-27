import { useState } from "react";
import { noteForDate } from "@/data/daily-notes";

/** Slim homepage line under the moods: "Today's note" opens one line from src/data/daily-notes.ts, new each day. */
const TodaysNote = () => {
  // Picked on click, so the prerendered page never fixes the build day's note in place
  const [note, setNote] = useState<string | null>(null);

  return (
    <section aria-label="Today's note" className="py-10 md:py-12 bg-journal-bg border-t border-journal-border">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium">Today&rsquo;s note</span>
          {note === null && (
            <button
              type="button"
              onClick={() => setNote(noteForDate())}
              aria-controls="todays-note"
              className="text-xs tracking-wider uppercase text-journal-gold hover:text-journal-text underline underline-offset-4 decoration-journal-champagne font-sans font-medium py-2 transition-colors duration-300"
            >
              Open it <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
        <p id="todays-note" aria-live="polite" className="max-w-xl mx-auto">
          {note && (
            <span className="block mt-3 font-serif italic text-xl md:text-2xl text-journal-text leading-relaxed animate-fade-in motion-reduce:animate-none">
              {note}
            </span>
          )}
        </p>
      </div>
    </section>
  );
};

export default TodaysNote;
