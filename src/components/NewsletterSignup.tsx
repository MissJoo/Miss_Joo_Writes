import { useId, useState, type FormEvent, type ReactNode } from "react";
import { subscribe, SUBSCRIBE_ERROR, type SignupSource } from "@/lib/newsletter";
import PostcardConfirmation from "@/components/newsletter/PostcardConfirmation";
import Honeypot from "@/components/newsletter/Honeypot";
import ConsentCheckbox, { CONSENT_REQUIRED } from "@/components/newsletter/ConsentCheckbox";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  /** Which form this is; sent to beehiiv as utm_medium */
  source: SignupSource;
  /** Extra context saved with the signup, such as the post or topic slug */
  detail?: string;
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
  /** Text on the submit button */
  button?: string;
  /** Homepage layout: text on the left and the form on the right from tablets up, with a visible email label */
  split?: boolean;
  className?: string;
}

type Status = { state: "idle" } | { state: "sending" } | { state: "success" } | { state: "error"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The Letter's wording, the same in every letter box on the site */
export const LETTER_COPY = {
  title: "The essays I don't post anywhere else.",
  description: "One letter, only when a new essay is ready. Quiet, honest, and yours to keep.",
  button: "Send me the letters",
};

/** Inline newsletter block with success and error states. No pop-ups. */
const NewsletterSignup = ({
  source,
  detail,
  eyebrow = "The Letter",
  title = LETTER_COPY.title,
  description = LETTER_COPY.description,
  button = LETTER_COPY.button,
  split = false,
  className,
}: NewsletterSignupProps) => {
  const id = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus({ state: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!consent) {
      setStatus({ state: "error", message: CONSENT_REQUIRED });
      return;
    }
    setStatus({ state: "sending" });
    const result = await subscribe({ email: email.trim(), source, detail, company, consent });
    if (result.ok) {
      setStatus({ state: "success" });
      setEmail("");
    } else {
      // Keep the email so the reader can just try again
      setStatus({ state: "error", message: SUBSCRIBE_ERROR });
    }
  };

  const intro = (
    <>
      <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">{eyebrow}</span>
      <h2 id={`${id}-title`} className="font-serif text-2xl md:text-3xl text-journal-text leading-tight">
        {title}
      </h2>
      <p className={cn("text-journal-text-secondary font-sans text-sm md:text-base font-light leading-relaxed whitespace-pre-line", !split && "max-w-md mx-auto")}>
        {description}
      </p>
    </>
  );

  const signup = (
    <>
      {status.state === "success" ? (
        <PostcardConfirmation />
      ) : (
        <form onSubmit={handleSubmit} noValidate className={cn("relative pt-2 space-y-4", !split && "max-w-xl mx-auto")}>
          <Honeypot value={company} onChange={(event) => setCompany(event.target.value)} />
          <div className={cn("flex flex-col gap-3", !split && "sm:flex-row")}>
          <label htmlFor={`${id}-email`} className={split ? "-mb-1 font-sans text-sm font-medium text-journal-text" : "sr-only"}>
            Email address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            required
            placeholder={split ? "you@example.com" : "Your email address"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status.state === "sending"}
            aria-invalid={status.state === "error"}
            aria-describedby={status.state === "error" ? `${id}-error` : undefined}
            className={cn("w-full h-12 shrink-0 px-5 rounded-full border border-journal-border bg-journal-bg text-journal-text text-base placeholder:text-journal-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne", !split && "sm:flex-1")}
          />
          <button
            type="submit"
            disabled={status.state === "sending"}
            className="h-12 shrink-0 whitespace-nowrap px-6 rounded-full bg-gold hover:bg-gold-hover text-espresso tracking-[0.15em] uppercase text-[11px] font-medium transition-colors duration-300 disabled:opacity-60"
          >
            {status.state === "sending" ? "Sending…" : button}
          </button>
          </div>
          <ConsentCheckbox
            id={`${id}-consent`}
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            disabled={status.state === "sending"}
          />
        </form>
      )}

      {status.state === "error" && (
        <p id={`${id}-error`} role="alert" className="text-red-800 dark:text-red-300 text-xs font-sans">
          {status.message}
        </p>
      )}
    </>
  );

  return (
    <section
      aria-labelledby={`${id}-title`}
      className={cn(
        "max-w-2xl mx-auto text-center space-y-5 border border-journal-border bg-journal-card px-6 py-10 md:px-12 md:py-12 rounded-[2px] shadow-sm",
        split && "grid gap-6 space-y-0 text-left md:grid-cols-2 md:items-center md:gap-12",
        className,
      )}
    >
      {split ? (
        <>
          <div className="space-y-5">{intro}</div>
          <div className="space-y-4">{signup}</div>
        </>
      ) : (
        <>
          {intro}
          {signup}
        </>
      )}
    </section>
  );
};

export default NewsletterSignup;
