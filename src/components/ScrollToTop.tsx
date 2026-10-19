import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTarget } from "@/lib/smoothScroll";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTarget(0, { immediate: true });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
