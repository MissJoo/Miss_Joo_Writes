import { Link } from "react-router-dom";
import { suitcase } from "@/data/suitcase";
import { ClosedSuitcase } from "./SuitcaseIcons";

const buttonClass =
  "inline-flex h-11 items-center rounded-full bg-journal-text px-8 text-[11px] uppercase tracking-widest text-journal-bg hover:bg-journal-gold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-bg";

/** Homepage teaser, between "Latest from the Journal" and the newsletter. */
export const SuitcaseHomeTeaser = () => (
  <section aria-labelledby="suitcase-teaser-title" className="pb-20 md:pb-28 bg-journal-bg">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-[200px_1fr] items-center border border-journal-border bg-journal-bg-secondary/40 px-8 py-10 md:px-12 rounded-[2px]">
        <ClosedSuitcase className="w-40 md:w-full mx-auto" />
        <div className="text-center md:text-left space-y-4">
          <h2 id="suitcase-teaser-title" className="font-serif text-2xl md:text-3.5xl text-journal-text">
            {suitcase.teaser.heading}
          </h2>
          <p className="text-journal-text-secondary font-light text-sm md:text-base">{suitcase.teaser.line}</p>
          <div className="pt-2">
            <Link to="/the-suitcase" className={buttonClass}>
              {suitcase.teaser.button}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/** Featured block at the top of the Life in Qatar hub. */
export const SuitcaseHubFeature = () => (
  <aside
    aria-labelledby="suitcase-hub-title"
    className="max-w-4xl mx-auto mb-14 grid gap-6 sm:grid-cols-[140px_1fr] items-center border border-journal-border bg-journal-card px-8 py-8 rounded-[3px] shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10)]"
  >
    <ClosedSuitcase className="w-28 sm:w-full mx-auto" />
    <div className="text-center sm:text-left space-y-3">
      <h2 id="suitcase-hub-title" className="font-serif text-2xl text-journal-text">
        {suitcase.hubFeature.heading}
      </h2>
      <p className="text-journal-text-secondary font-light text-sm md:text-base">{suitcase.hubFeature.line}</p>
      <div className="pt-1">
        <Link to="/the-suitcase" className={buttonClass}>
          {suitcase.hubFeature.button}
        </Link>
      </div>
    </div>
  </aside>
);

/** One line at the end of Life in Qatar essays. */
export const SuitcasePostLine = () => (
  <p className="text-center font-serif italic text-lg md:text-xl text-journal-text-secondary">
    {suitcase.postLine.before}{" "}
    <Link
      to="/the-suitcase"
      className="text-journal-gold underline decoration-journal-champagne underline-offset-4 hover:text-journal-text transition-colors"
    >
      {suitcase.postLine.link}
    </Link>
  </p>
);
