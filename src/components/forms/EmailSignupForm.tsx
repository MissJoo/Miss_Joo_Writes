import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const emailSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type MailchimpResponse = { result: string; msg: string };
type MailchimpJsonpCallback = (data: MailchimpResponse) => void;
type MailchimpCallbackStore = Window & Record<string, MailchimpJsonpCallback | undefined>;

// Mailchimp config extracted from your embedded form
const MAILCHIMP_ACTION_URL =
    "https://github.us18.list-manage.com/subscribe/post-json?u=80e1467a6cae550ca8829039c&id=f46f720fb3&f_id=0071aee6f0";
const MAILCHIMP_HONEYPOT = "b_80e1467a6cae550ca8829039c_f46f720fb3";

/**
 * Submits email to Mailchimp via JSONP (no backend required).
 * Mailchimp doesn't support CORS, so we inject a <script> tag instead.
 */
function submitToMailchimp(email: string): Promise<MailchimpResponse> {
    return new Promise((resolve, reject) => {
        const callbackName = `mc_callback_${Date.now()}`;
        const url = `${MAILCHIMP_ACTION_URL}&EMAIL=${encodeURIComponent(email)}&${MAILCHIMP_HONEYPOT}=&c=${callbackName}`;
        const callbacks = window as MailchimpCallbackStore;

        // Attach callback to window so the JSONP script can call it
        callbacks[callbackName] = (data: MailchimpResponse) => {
            delete callbacks[callbackName];
            document.body.removeChild(script);
            resolve(data);
        };

        const script = document.createElement("script");
        script.src = url;
        script.onerror = () => {
            delete callbacks[callbackName];
            document.body.removeChild(script);
            reject(new Error("Network error. Please try again."));
        };

        document.body.appendChild(script);

        // Fallback timeout - Mailchimp usually responds in < 5s
        setTimeout(() => {
            if (callbacks[callbackName]) {
                delete callbacks[callbackName];
                if (document.body.contains(script)) document.body.removeChild(script);
                reject(new Error("Request timed out. Please try again."));
            }
        }, 10000);
    });
}

interface EmailSignupFormProps {
    ctaText?: string;
    onSuccess?: (email: string) => void;
    variant?: "default" | "compact";
}

const EmailSignupForm = ({
    ctaText = "Get the free download",
    onSuccess,
    variant = "default",
}: EmailSignupFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
    });

    const onSubmit = async (data: EmailFormData) => {
        setIsSubmitting(true);
        try {
            const response = await submitToMailchimp(data.email);

            if (response.result === "success") {
                toast({
                    title: "You're in! 🎉",
                    description: "Check your inbox — your free download is on its way.",
                    duration: 6000,
                });
                reset();
                onSuccess?.(data.email);
            } else {
                // Mailchimp returns already-subscribed or other soft errors in msg
                const message = response.msg?.includes("already subscribed")
                    ? "This email is already subscribed. Check your inbox!"
                    : response.msg || "Something went wrong. Please try again.";

                toast({
                    title: "Oops!",
                    description: message,
                    variant: "destructive",
                });
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Please try again later.";

            toast({
                title: "Something went wrong",
                description: message,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

  // ── Compact/Home Page variant ────────────────────────────────────
  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="name-input" className="sr-only">Name</label>
            <Input
              id="name-input"
              type="text"
              placeholder="Your name"
              {...register("name")}
              className="h-12 rounded-full border-journal-border bg-journal-card text-journal-text placeholder:text-journal-muted/70 focus-visible:ring-journal-champagne focus-visible:border-journal-champagne"
              disabled={isSubmitting}
            />
          </div>
          <div className="flex-[1.5]">
            <label htmlFor="email-input" className="sr-only">Email address</label>
            <Input
              id="email-input"
              type="email"
              placeholder="Your email address"
              {...register("email")}
              className="h-12 rounded-full border-journal-border bg-journal-card text-journal-text placeholder:text-journal-muted/70 focus-visible:ring-journal-champagne focus-visible:border-journal-champagne"
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 px-8 rounded-full bg-journal-text hover:bg-journal-gold text-journal-bg tracking-widest uppercase text-[11px] font-medium transition-all duration-300"
        >
          {isSubmitting ? "Sending..." : "Send Me the Journal"}
        </Button>

        {errors.email && (
          <p className="text-red-700 text-xs mt-2 font-sans text-center">{errors.email.message}</p>
        )}
      </form>
    );
  }

  // ── Default variant (used on Downloads page) ───────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto space-y-4">
      <div className="space-y-3">
        <div>
          <label htmlFor="default-name-input" className="sr-only">Your Name</label>
          <Input
            id="default-name-input"
            type="text"
            placeholder="Your Name"
            {...register("name")}
            className="h-12 px-6 rounded-full border-journal-border bg-journal-card text-journal-text placeholder:text-journal-muted/70 focus-visible:ring-journal-champagne"
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
            className="h-12 pl-12 pr-6 rounded-full border-journal-border bg-journal-card text-journal-text placeholder:text-journal-muted/70 focus-visible:ring-journal-champagne"
            disabled={isSubmitting}
          />
        </div>
        {errors.email && (
          <p className="text-red-700 text-xs font-sans pl-1">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full h-12 rounded-full bg-journal-text hover:bg-journal-gold text-journal-bg tracking-[0.2em] uppercase text-[11px] font-medium transition-all duration-300"
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
