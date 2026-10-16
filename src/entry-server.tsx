import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { getPageMeta, getPrerenderRoutes, getSitemapRoutes, NOT_FOUND_META, renderHeadTags, SITE_URL } from "./lib/seo";

export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );

export const headFor = (url: string) => renderHeadTags(getPageMeta(url));
export const notFoundHead = () => renderHeadTags(NOT_FOUND_META);

export { getPrerenderRoutes, getSitemapRoutes, SITE_URL };
