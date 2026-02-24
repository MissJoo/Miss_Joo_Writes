import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const emailSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

// Mailchimp config extracted from your embedded form
const MAILCHIMP_ACTION_URL =
    "https://github.us18.list-manage.com/subscribe/post-json?u=80e1467a6cae550ca8829039c&id=f46f720fb3&f_id=0071aee6f0";
const MAILCHIMP_HONEYPOT = "b_80e1467a6cae550ca8829039c_f46f720fb3";

/**
 * Submits email to Mailchimp via JSONP (no backend required).
 * Mailchimp doesn't support CORS, so we inject a <script> tag instead.
 */
function submitToMailchimp(email: string): Promise<{ result: string; msg: string }> {
    return new Promise((resolve, reject) => {
        const callbackName = `mc_callback_${Date.now()}`;
        const url = `${MAILCHIMP_ACTION_URL}&EMAIL=${encodeURIComponent(email)}&${MAILCHIMP_HONEYPOT}=&c=${callbackName}`;

        // Attach callback to window so the JSONP script can call it
        (window as any)[callbackName] = (data: { result: string; msg: string }) => {
            delete (window as any)[callbackName];
            document.body.removeChild(script);
            resolve(data);
        };

        const script = document.createElement("script");
        script.src = url;
        script.onerror = () => {
            delete (window as any)[callbackName];
            document.body.removeChild(script);
            reject(new Error("Network error. Please try again."));
        };

        document.body.appendChild(script);

        // Fallback timeout — Mailchimp usually responds in < 5s
        setTimeout(() => {
            if ((window as any)[callbackName]) {
                delete (window as any)[callbackName];
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
        } catch (error: any) {
            toast({
                title: "Something went wrong",
                description: error?.message || "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Compact variant (used on homepage) ────────────────────────────────────
    if (variant === "compact") {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <Input
                            type="email"
                            placeholder="Your email address"
                            {...register("email")}
                            className="h-12 rounded-none border-border/50 bg-background focus-visible:ring-primary"
                            disabled={isSubmitting}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-12 px-8 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground tracking-widest uppercase text-xs font-medium"
                    >
                        {isSubmitting ? "Sending..." : "Sign Up"}
                    </Button>
                </div>
                {errors.email && (
                    <p className="text-destructive text-xs mt-2 font-sans">{errors.email.message}</p>
                )}
            </form>
        );
    }

    // ── Default variant (used on Downloads page) ───────────────────────────────
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto space-y-6">
            <div className="space-y-3">
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...register("email")}
                        className="h-14 pl-12 rounded-none border-border/50 bg-background font-sans text-base focus-visible:ring-primary focus-visible:ring-offset-0"
                        disabled={isSubmitting}
                    />
                </div>
                {errors.email && (
                    <p className="text-destructive text-sm font-sans pl-1">{errors.email.message}</p>
                )}
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full h-14 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground tracking-[0.2em] uppercase text-xs font-medium transition-all duration-300"
            >
                {isSubmitting ? "Sending..." : ctaText}
            </Button>

            <p className="text-xs text-muted-foreground text-center font-sans leading-relaxed">
                By signing up, you'll receive the free download and occasional updates. Unsubscribe anytime.
            </p>
        </form>
    );
};

export default EmailSignupForm;
