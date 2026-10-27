import { Link } from "react-router-dom";
import { fill, suitcase } from "@/data/suitcase";
import { launchLabels, useSuitcaseLaunch } from "@/lib/launch";
import { ClosedSuitcase } from "./SuitcaseIcons";
import Countdown from "./Countdown";

const buttonClass =
  "inline-flex h-11 items-center rounded-full bg-gold px-8 text-[11px] uppercase tracking-widest text-espresso hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-bg";

// Every teaser switches by itself at SUITCASE_LAUNCH. Before then the locked bits carry .sc-when-locked,
// which a head script hides on stale prerendered pages that are served after launch.

/** Homepage teaser, between "Latest from the Journal" and the newsletter. */
export const SuitcaseHomeTeaser = () => {
  const { open, remaining } = useSuitcaseLaunch();
  return (
    <section aria-labelledby="suitcase-teaser-title" className="pb-20 md:pb-28 bg-journal-bg">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto grid gap-8 justify-items-center text-center border border-journal-border bg-journal-bg-secondary/40 px-8 py-10 md:px-12 rounded-[2px]">
          {/* Label and heading, then the suitcase, then the line and button */}
          <div className="text-center space-y-4">
            <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">
              {suitcase.teaser.label}
            </span>
            <h2 id="suitcase-teaser-title" className="font-serif text-2xl md:text-3.5xl text-journal-text leading-tight">
              {suitcase.teaser.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <ClosedSuitcase className="w-40 md:w-[200px] mx-auto" latches={open ? "open" : "locked"} />
          <div className={`text-center space-y-4${open ? "" : " sc-when-locked"}`}>
            {open ? (
              <p className="text-journal-text-secondary font-light text-sm md:text-base">{suitcase.teaser.line}</p>
            ) : (
              <>
                <div className="flex justify-center">
                  <Countdown remaining={remaining} compact />
                </div>
                <p className="text-journal-text-secondary font-light text-sm md:text-base">
                  {fill(suitcase.locked.teaserLine, launchLabels)}
                </p>
              </>
            )}
            <div className="pt-2">
              <Link to="/the-suitcase" className={buttonClass}>
                {open ? suitcase.teaser.button : suitcase.locked.teaserButton}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Featured block at the top of the Life in Qatar hub. */
export const SuitcaseHubFeature = () => {
  const { open, remaining } = useSuitcaseLaunch();
  return (
    <aside
      aria-labelledby="suitcase-hub-title"
      className="max-w-4xl mx-auto mb-14 grid gap-6 sm:grid-cols-[140px_1fr] items-center border border-journal-border bg-journal-card px-8 py-8 rounded-[3px] shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10)]"
    >
      <ClosedSuitcase className="w-28 sm:w-full mx-auto" latches={open ? "open" : "locked"} />
      <div className={`text-center sm:text-left space-y-3${open ? "" : " sc-when-locked"}`}>
        <h2 id="suitcase-hub-title" className="font-serif text-2xl text-journal-text">
          {suitcase.hubFeature.heading}
        </h2>
        {open ? (
          <p className="text-journal-text-secondary font-light text-sm md:text-base">{suitcase.hubFeature.line}</p>
        ) : (
          <>
            <div className="flex justify-center sm:justify-start">
              <Countdown remaining={remaining} compact />
            </div>
            <p className="text-journal-text-secondary font-light text-sm md:text-base">{fill(suitcase.locked.hubLine, launchLabels)}</p>
          </>
        )}
        <div className="pt-1">
          <Link to="/the-suitcase" className={buttonClass}>
            {open ? suitcase.hubFeature.button : suitcase.locked.teaserButton}
          </Link>
        </div>
      </div>
    </aside>
  );
};

/** One line at the end of Life in Qatar essays. */
export const SuitcasePostLine = () => {
  const { open } = useSuitcaseLaunch();
  return (
    <p className={`text-center font-serif italic text-lg md:text-xl text-journal-text-secondary${open ? "" : " sc-when-locked"}`}>
      {open ? suitcase.postLine.before : suitcase.locked.postLineBefore}{" "}
      <Link
        to="/the-suitcase"
        className="text-journal-gold underline decoration-journal-champagne underline-offset-4 hover:text-journal-text transition-colors"
      >
        {open ? suitcase.postLine.link : fill(suitcase.locked.postLineLink, launchLabels)}
      </Link>
    </p>
  );
};
