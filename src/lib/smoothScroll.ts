import type Lenis from "lenis";

/** The page's Lenis instance while smooth scrolling is on (null on the server, or with reduced motion). */
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

/** Scroll to the top or to an element, eased when smooth scrolling is on. `immediate` jumps (route changes). */
export const scrollToTarget = (target: number | HTMLElement, options: { immediate?: boolean; offset?: number } = {}) => {
  if (lenis) {
    lenis.scrollTo(target, { immediate: options.immediate, offset: options.offset ?? 0, force: true });
    return;
  }
  const behavior: ScrollBehavior = options.immediate ? "auto" : "smooth";
  if (typeof target === "number") window.scrollTo({ top: target, behavior });
  else target.scrollIntoView({ behavior, block: "start" });
};
