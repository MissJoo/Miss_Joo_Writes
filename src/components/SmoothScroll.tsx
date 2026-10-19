import { useEffect } from "react";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/smoothScroll";

/**
 * Soft, eased scrolling on every page (Lenis). The reader stays in control: it smooths the wheel only, leaves touch
 * scrolling native, and is skipped entirely for readers who ask their device for reduced motion.
 */
const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        // Pop-ups and anything marked data-lenis-prevent keep their own native scrolling
        prevent: (node) => node instanceof Element && !!node.closest('[role="dialog"], [data-lenis-prevent]'),
      });
      setLenis(lenis);

      // While a dialog locks the page (Radix sets data-scroll-locked on <body>), the page behind must not move
      const syncLock = () => (document.body.hasAttribute("data-scroll-locked") ? lenis.stop() : lenis.start());
      const observer = new MutationObserver(syncLock);
      observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });

      cleanup = () => {
        observer.disconnect();
        setLenis(null);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
};

export default SmoothScroll;
