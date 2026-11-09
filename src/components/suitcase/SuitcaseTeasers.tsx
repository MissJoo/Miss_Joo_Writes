import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { fill, suitcase } from "@/data/suitcase";
import { launchLabels, useSuitcaseLaunch } from "@/lib/launch";
import { ClosedSuitcase } from "./SuitcaseIcons";
import Countdown from "./Countdown";

/** Width and height shared by the homepage Suitcase, letter and quiz boxes, so the three line up */
export const homeBoxSize = "w-full max-w-3xl mx-auto min-h-[453px] md:min-h-[509px]";
/** Look shared by those boxes (and the three small boxes under the postcard) */
export const homeBoxStyle = "border border-journal-border bg-journal-bg-secondary/40 rounded-xl px-6 py-8 sm:px-8 sm:py-10 md:px-12";
/** Inside those boxes: paragraphs stay this wide, and fields, answer buttons and form buttons this wide */
export const homeText = "max-w-lg mx-auto";
/** Suitcase, letter and The Edit boxes from tablets up: the opened letter's width (520px) plus 1cm on each side */
export const homeBoxNarrow = "md:w-[calc(520px+2cm)] md:!px-[1cm]";
export const homeFields = "w-full max-w-[400px] mx-auto";
/** Every homepage section after the hero: same spacing, thin divider line across the top */
export const homeSection = "py-10 md:py-14 bg-journal-bg border-t border-journal-border";

const buttonClass =
  "inline-flex h-11 items-center rounded-full bg-gold px-8 text-[11px] uppercase tracking-widest text-espresso hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-bg";

// Every teaser switches by itself at SUITCASE_LAUNCH. Before then the locked bits carry .sc-when-locked,
// which a head script hides on stale prerendered pages that are served after launch.

const teaserLabel = "text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium";

/** Homepage teaser. `children` sits at the end of the text column. */
export const SuitcaseHomeTeaser = ({ children }: { children?: ReactNode }) => {
  const { open, remaining } = useSuitcaseLaunch();
  return (
    <section aria-labelledby="suitcase-teaser-title" className={homeSection}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-5 md:grid-cols-2 md:gap-12">
          {/* Phones show the label above the illustration, larger screens above the heading */}
          <div>
            <span className={`${teaserLabel} mb-4 block md:hidden`}>{suitcase.teaser.label}</span>
            <div className="flex aspect-[3/2] md:aspect-[4/3] items-center justify-center rounded-xl border border-journal-border bg-journal-card">
              <ClosedSuitcase className="w-40 md:w-[200px]" latches={open ? "open" : "locked"} />
            </div>
          </div>

          <div className="space-y-4">
            <span className={`${teaserLabel} hidden md:block`}>{suitcase.teaser.label}</span>
            <h2 id="suitcase-teaser-title" className="font-serif text-2xl md:text-3.5xl text-journal-text leading-tight">
              {suitcase.teaser.heading}
            </h2>
            {open && (
              <>
                <p className="md:hidden text-journal-text-secondary font-light text-sm">{suitcase.teaser.lineMobile}</p>
                <p className="hidden md:block text-journal-text-secondary font-light text-base">{suitcase.teaser.line}</p>
              </>
            )}
            <div className={`space-y-4${open ? "" : " sc-when-locked"}`}>
              {open ? null : (
                <>
                  <Countdown remaining={remaining} compact />
                  <p className="text-journal-text-secondary font-light text-sm md:text-base">
                    {fill(suitcase.locked.teaserLine, launchLabels)}
                  </p>
                </>
              )}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
                <Link to="/the-suitcase" className={`${buttonClass} justify-center`}>
                  {open ? suitcase.teaser.button : suitcase.locked.teaserButton}
                </Link>
                {open && <span className="hidden md:inline text-xs font-light text-journal-muted">{suitcase.teaser.duration}</span>}
              </div>
            </div>
            {children}
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
      className="max-w-4xl mx-auto mb-14 grid gap-6 sm:grid-cols-[140px_1fr] items-center border border-journal-border bg-journal-card px-8 py-8 rounded-xl shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10)]"
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
