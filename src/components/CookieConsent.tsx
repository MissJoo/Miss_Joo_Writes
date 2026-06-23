import { useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  clearGoogleCookies,
  getCookieConsent,
  setCookieConsent,
  trackPageView,
  updateGoogleConsent,
  type CookieConsentValue,
} from "@/lib/cookieConsent";

const CookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsentValue | null>(() => getCookieConsent());

  if (consent) {
    return null;
  }

  const handleAccept = () => {
    setCookieConsent("accepted");
    updateGoogleConsent("accepted");
    trackPageView(window.location.pathname + window.location.search);
    setConsent("accepted");
  };

  const handleDecline = () => {
    setCookieConsent("declined");
    updateGoogleConsent("declined");
    clearGoogleCookies();
    setConsent("declined");
  };

  return (
    <section
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 border border-border bg-card/95 px-5 py-4 shadow-[0_18px_50px_-24px_rgba(43,33,24,0.45)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-secondary text-foreground">
            <Cookie className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h2 id="cookie-consent-title" className="text-lg font-serif leading-none">
              Cookies on Miss Joo Writes
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              We use cookies to understand website traffic, improve your visit, and support
              advertising. You can accept or decline non-essential analytics and ad cookies.
            </p>
            <Link
              to="/privacy-policy"
              className="inline-flex text-xs font-medium uppercase tracking-wider text-foreground underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="flex shrink-0 flex-col-reverse gap-2 sm:flex-row">
          <Button variant="outline" className="min-w-28" onClick={handleDecline}>
            Decline
          </Button>
          <Button variant="journal-primary" className="min-w-28" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CookieConsent;
