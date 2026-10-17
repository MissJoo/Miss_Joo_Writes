import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import {
  getPageMeta,
  getPrerenderRoutes,
  getRedirects,
  getSitemapRoutes,
  NOT_FOUND_META,
  renderHeadTags,
  SITE_URL,
} from "./lib/seo";
import { LAUNCH_MS } from "./lib/launch";

export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );

export const headFor = (url: string) => renderHeadTags(getPageMeta(url));
export const notFoundHead = () => renderHeadTags(NOT_FOUND_META);

export { getPrerenderRoutes, getRedirects, getSitemapRoutes, SITE_URL, LAUNCH_MS };
