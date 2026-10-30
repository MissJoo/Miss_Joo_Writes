import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { homeFields } from "@/components/suitcase/SuitcaseTeasers";
import { subscribe, SUBSCRIBE_ERROR } from "@/lib/newsletter";
import PostcardConfirmation from "@/components/newsletter/PostcardConfirmation";
import Honeypot from "@/components/newsletter/Honeypot";
import ConsentCheckbox, { CONSENT_REQUIRED } from "@/components/newsletter/ConsentCheckbox";



/** Set after a free-journal signup; the Free Journal page reads it to unlock the downloads. */
export const JOURNALS_UNLOCKED_KEY = "mj_journals_unlocked";

const emailSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    company: z.string().optional(),
    consent: z.boolean().refine((value) => value, CONSENT_REQUIRED),
});

type EmailFormData = z.infer<typeof emailSchema>;
interface EmailSignupFormProps {
    ctaText?: string;
    /** Called after signup; the form itself then shows the postcard (compact) or leaves it to the page (default) */
    onSuccess?: (email: string) => void;
    variant?: "default" | "compact";
}

const EmailSignupForm = ({
    ctaText = "Get the free download",
    onSuccess,
    variant = "default",
}: EmailSignupFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: { consent: false },
    });

    const onSubmit = async (data: EmailFormData) => {
        setIsSubmitting(true);
        setSubmitError("");
        const result = await subscribe({ email: data.email, source: "free-journal", company: data.company, consent: data.consent });
        try {
            if (result.ok) {
                try {
                    localStorage.setItem(JOURNALS_UNLOCKED_KEY, "true");
                } catch {
                    // Storage blocked: the success panel below still links to the journals
                }
                reset();
                setIsDone(true);
                onSuccess?.(data.email);
            } else {
                // react-hook-form keeps the typed email, so the reader can just try again
                setSubmitError(SUBSCRIBE_ERROR);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

  const errorMessage = errors.email?.message || errors.consent?.message || submitError;

  // ── Compact/Home Page variant ────────────────────────────────────
  if (variant === "compact" && isDone) {
    return (
      <PostcardConfirmation>
        <Link
          to="/downloads"
          className="inline-flex h-12 items-center justify-center px-8 rounded-full bg-gold hover:bg-gold-hover text-espresso tracking-widest uppercase text-[11px] font-medium transition-all duration-300"
        >
          Download your journal
        </Link>
      </PostcardConfirmation>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="relative w-full max-w-xl mx-auto space-y-4">
        <Honeypot {...register("company")} />
        {/* Fields and button share the homepage boxes' field width */}
        <div className={cn("flex flex-col gap-3", homeFields)}>
          <div>
            <label htmlFor="name-input" className="sr-only">Name</label>
            <Input
              id="name-input"
              type="text"
              placeholder="Your name"
              {...register("name")}
              className="h-12 px-6 rounded-full border-journal-border bg-journal-bg text-journal-text placeholder:text-journal-muted/70 focus-visible:ring-journal-champagne focus-visible:border-journal-champagne"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="email-input" className="sr-only">Email address</label>
            <Input
              id="email-input"
              type="email"
              placeholder="Your email address"
              {...register("email")}
              className="h-12 px-6 rounded-full border-journal-border bg-journal-bg text-journal-text placeholder:text-journal-muted/70 focus-visible:ring-journal-champagne focus-visible:border-journal-champagne"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Lines up with the fields' left edge */}
        <ConsentCheckbox id="consent-input" className={homeFields} {...register("consent")} disabled={isSubmitting} />
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn("flex w-full h-12 px-8 rounded-full bg-gold hover:bg-gold-hover text-espresso tracking-widest uppercase text-[11px] font-medium transition-all duration-300", homeFields)}
        >
          {isSubmitting ? "Sending..." : "Send Me My Journals"}
        </Button>

        <p className="text-xs text-journal-muted text-center font-sans">Arrives in your inbox in seconds.</p>

        {errorMessage && (
          <p role="alert" className="text-red-700 dark:text-red-300 text-xs mt-2 font-sans text-center">{errorMessage}</p>
        )}
      </form>
    );
  }

  // ── Default variant (used on Downloads page) ───────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative w-full max-w-lg mx-auto space-y-4">
      <Honeypot {...register("company")} />
      <div className="space-y-3">
        <div>
          <label htmlFor="default-name-input" className="sr-only">Your Name</label>
          <Input
            id="default-name-input"
            type="text"
            placeholder="Your Name"
            {...register("name")}
            className="h-12 px-6 rounded-full border-journal-border bg-journal-bg text-journal-text placeholder:text-journal-muted/70 focus-visible:ring-journal-champagne"
            disabled={isSubmitting}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-journal-muted" />
          <label htmlFor="default-email-input" className="sr-only">Your Email Address</label>
          <Input
            id="default-email-input"
            type="email"
            placeholder="Your Email Address"
            {...register("email")}
            className="h-12 pl-12 pr-6 rounded-full border-journal-border bg-journal-bg text-journal-text placeholder:text-journal-muted/70 focus-visible:ring-journal-champagne"
            disabled={isSubmitting}
          />
        </div>
        <ConsentCheckbox id="default-consent-input" className="pl-1" {...register("consent")} disabled={isSubmitting} />
        {errorMessage && (
          <p role="alert" className="text-red-700 dark:text-red-300 text-xs font-sans pl-1">{errorMessage}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full h-12 rounded-full bg-gold hover:bg-gold-hover text-espresso tracking-[0.2em] uppercase text-[11px] font-medium transition-all duration-300"
      >
        {isSubmitting ? "Sending..." : ctaText}
      </Button>

      <p className="text-[11px] text-journal-muted text-center font-sans leading-relaxed">
        By signing up, you'll receive the free download and occasional updates. Unsubscribe anytime.
      </p>
    </form>
  );
};

export default EmailSignupForm;
