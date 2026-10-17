import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import SuitcaseGame from "@/components/suitcase/SuitcaseGame";
import Countdown from "@/components/suitcase/Countdown";
import NewsletterSignup from "@/components/NewsletterSignup";
import { ClosedSuitcase } from "@/components/suitcase/SuitcaseIcons";
import { fill, suitcase } from "@/data/suitcase";
import { launchLabels, useSuitcaseLaunch } from "@/lib/launch";

const UNLOCK_MS = 1300;

const TheSuitcase = () => {
  const { open, justOpened, remaining } = useSuitcaseLaunch();
  // When the countdown hits zero while the page is open, play the unlock before showing the game
  const [unlockDone, setUnlockDone] = useState(false);

  useEffect(() => {
    if (!justOpened) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setUnlockDone(true), reduced ? 0 : UNLOCK_MS);
    return () => window.clearTimeout(timer);
  }, [justOpened]);

  const showGame = open && (!justOpened || unlockDone);

  return (
    <Layout>
      <div className="sc-theme sc-page px-6 lg:px-12">
        {showGame ? (
          <div className="sc-wrap sc-fade">
            <header className="sc-header">
              <span className="sc-eyebrow">{suitcase.page.eyebrow}</span>
              <h1 className="sc-title">
                {suitcase.page.titleBefore} <em>{suitcase.page.titleEmphasis}</em>
              </h1>
              <p className="sc-intro">{suitcase.page.intro}</p>
            </header>
            <SuitcaseGame />
          </div>
        ) : (
          <div className="sc-sealed sc-when-locked">
            <div className={justOpened ? "sc-unlocking-case" : undefined} style={{ width: "100%", display: "grid", justifyItems: "center" }}>
              <ClosedSuitcase className="sc-sealed-art" latches={justOpened ? "unlocking" : "locked"} />
            </div>
            <header className="sc-header">
              <span className="sc-eyebrow">{suitcase.page.eyebrow}</span>
              <h1 className="sc-title">
                {suitcase.page.titleBefore} <em>{suitcase.page.titleEmphasis}</em>
              </h1>
              <p className="sc-intro">{suitcase.locked.line}</p>
            </header>
            <Countdown remaining={remaining} />
            <p className="sc-opens">{fill(suitcase.locked.opens, launchLabels)}</p>
            <NewsletterSignup source="suitcase-launch" title={suitcase.locked.newsletterTitle} className="w-full mt-6" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TheSuitcase;
