export const COOKIE_CONSENT_COOKIE = "missjoo_cookie_consent";
export const GOOGLE_ANALYTICS_ID = "G-GP4QCG7WLR";

export type CookieConsentValue = "accepted" | "declined";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    loadGoogleServices?: () => void;
  }
}

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export const getCookieConsent = (): CookieConsentValue | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_CONSENT_COOKIE}=`));

  if (!cookie) {
    return null;
  }

  const value = decodeURIComponent(cookie.split("=").slice(1).join("="));
  return value === "accepted" || value === "declined" ? value : null;
};

export const setCookieConsent = (value: CookieConsentValue) => {
  document.cookie = `${COOKIE_CONSENT_COOKIE}=${encodeURIComponent(
    value,
  )}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
};

export const hasAcceptedCookies = () => getCookieConsent() === "accepted";

export const updateGoogleConsent = (value: CookieConsentValue) => {
  const consentStatus = value === "accepted" ? "granted" : "denied";

  window.gtag?.("consent", "update", {
    analytics_storage: consentStatus,
    ad_storage: consentStatus,
    ad_user_data: consentStatus,
    ad_personalization: consentStatus,
  });
};

export const trackPageView = (pagePath: string) => {
  if (!hasAcceptedCookies()) {
    return;
  }

  window.loadGoogleServices?.();
  window.gtag?.("config", GOOGLE_ANALYTICS_ID, {
    page_path: pagePath,
  });
};

const expireCookie = (name: string, domain?: string) => {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${
    domain ? `; Domain=${domain}` : ""
  }`;
};

export const clearGoogleCookies = () => {
  if (typeof window === "undefined") {
    return;
  }

  const hostname = window.location.hostname;
  const possibleDomains = [undefined, hostname.startsWith(".") ? hostname : `.${hostname}`];
  const hostParts = hostname.split(".");

  if (hostParts.length > 2) {
    possibleDomains.push(`.${hostParts.slice(-2).join(".")}`);
  }

  ["_ga", "_gid", "_gat", "_gcl_au"].forEach((cookieName) => {
    possibleDomains.forEach((domain) => expireCookie(cookieName, domain));
  });
};
