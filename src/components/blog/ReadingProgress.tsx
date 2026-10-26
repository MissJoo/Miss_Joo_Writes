import { useEffect, useRef, type RefObject } from "react";

/** 3px gold bar fixed to the top of the screen that fills as the reader moves through `target` (the essay body). */
const ReadingProgress = ({ target }: { target: RefObject<HTMLElement> }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = target.current;
      if (!el || !barRef.current) return;
      const rect = el.getBoundingClientRect();
      // Empty while the essay's top is below the fold, full once its last line has scrolled into view
      const total = rect.height - window.innerHeight;
      const ratio = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : rect.top <= 0 ? 1 : 0;
      barRef.current.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-[3px] w-full origin-left bg-gold dark:bg-journal-gold"
      style={{ transform: "scaleX(0)" }}
    />
  );
};

export default ReadingProgress;
