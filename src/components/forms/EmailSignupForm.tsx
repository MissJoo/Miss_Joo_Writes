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

interface EmailSignupFormProps {
    ctaText?: string;
    onSuccess?: (email: string) => void;
    variant?: "default" | "compact";
}

const EmailSignupForm = ({
    ctaText = "Get the free download",
    onSuccess,
    variant = "default"
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
            // TODO: Replace with actual email service integration
            // For now, simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log("Email submitted:", data.email);

            toast({
                title: "Success!",
                description: "Check your inbox for your free download.",
                duration: 5000,
            });

            reset();
            onSuccess?.(data.email);
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                By signing up, you'll receive the free download and occasional updates about new content. Unsubscribe anytime.
            </p>
        </form>
    );
};

export default EmailSignupForm;
