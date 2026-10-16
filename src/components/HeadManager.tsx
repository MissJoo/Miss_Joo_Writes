import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMeta, renderHeadTags } from "@/lib/seo";

/** Keeps the per-page head tags in sync during client-side navigation. */
const HeadManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.head.querySelectorAll("[data-seo]").forEach((node) => node.remove());
    document.head.insertAdjacentHTML("beforeend", renderHeadTags(getPageMeta(pathname)));
  }, [pathname]);

  return null;
};

export default HeadManager;
