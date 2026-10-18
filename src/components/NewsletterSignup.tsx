import { useId, useState, type FormEvent } from "react";
import { subscribe, SUBSCRIBE_ERROR, type SignupSource } from "@/lib/newsletter";
import PostcardConfirmation from "@/components/newsletter/PostcardConfirmation";
import Honeypot from "@/components/newsletter/Honeypot";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  /** Which form this is; sent to beehiiv as utm_medium */
  source: SignupSource;
  /** Extra context saved with the signup, such as the post or topic slug */
  detail?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

type Status = { state: "idle" } | { state: "sending" } | { state: "success" } | { state: "error"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Inline newsletter block with success and error states. No pop-ups. */
const NewsletterSignup = ({
  source,
  detail,
  eyebrow = "The Letter",
  title = "New essays, straight to your inbox",
  description = "One thoughtful letter when a new essay is published. No noise, unsubscribe anytime.",
  className,
}: NewsletterSignupProps) => {
  const id = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus({ state: "error", message: "Please enter a valid email address." });
      return;
    }
    setStatus({ state: "sending" });
    const result = await subscribe({ email: email.trim(), source, detail, company });
    if (result.ok) {
      setStatus({ state: "success" });
      setEmail("");
    } else {
      // Keep the email so the reader can just try again
      setStatus({ state: "error", message: SUBSCRIBE_ERROR });
    }
  };

  return (
    <section
      aria-labelledby={`${id}-title`}
      className={cn(
        "max-w-2xl mx-auto text-center space-y-5 border border-journal-border bg-journal-card px-6 py-10 md:px-12 md:py-12 rounded-[2px] shadow-sm",
        className,
      )}
    >
      <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">{eyebrow}</span>
      <h2 id={`${id}-title`} className="font-serif text-2xl md:text-3xl text-journal-text leading-tight">
        {title}
      </h2>
      <p className="text-journal-text-secondary font-sans text-sm md:text-base font-light leading-relaxed max-w-md mx-auto">
        {description}
      </p>

      {status.state === "success" ? (
        <PostcardConfirmation />
      ) : (
        <form onSubmit={handleSubmit} noValidate className="relative flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
          <Honeypot value={company} onChange={(event) => setCompany(event.target.value)} />
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status.state === "sending"}
            aria-invalid={status.state === "error"}
            aria-describedby={status.state === "error" ? `${id}-error` : undefined}
            className="w-full sm:flex-1 h-12 shrink-0 px-5 rounded-full border border-journal-border bg-journal-bg text-journal-text text-sm placeholder:text-journal-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne"
          />
          <button
            type="submit"
            disabled={status.state === "sending"}
            className="h-12 px-8 rounded-full bg-journal-text hover:bg-journal-gold text-journal-bg tracking-[0.2em] uppercase text-[11px] font-medium transition-colors duration-300 disabled:opacity-60"
          >
            {status.state === "sending" ? "Sending…" : "Subscribe"}
          </button>
        </form>
      )}

      {status.state === "error" && (
        <p id={`${id}-error`} role="alert" className="text-red-800 dark:text-red-300 text-xs font-sans">
          {status.message}
        </p>
      )}
    </section>
  );
};

export default NewsletterSignup;
