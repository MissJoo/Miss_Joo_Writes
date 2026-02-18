import Layout from "@/components/layout/Layout";
import EmailSignupForm from "@/components/forms/EmailSignupForm";
import { Download } from "lucide-react";

const Downloads = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background"></div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-6 lg:px-12 py-24">
                    <div className="max-w-3xl mx-auto text-center space-y-12">
                        {/* Icon */}
                        <div className="animate-fade-in-up">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-8">
                                <Download className="w-8 h-8 text-primary" />
                            </div>
                        </div>

                        {/* Headline */}
                        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl animate-fade-in-up text-balance leading-tight">
                            Download Notes on Becoming —
                            <span className="block italic font-light text-muted-foreground mt-2">January</span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-muted-foreground text-lg md:text-xl font-sans font-light leading-relaxed animate-fade-in-delay-1 max-w-2xl mx-auto">
                            A gentle reflection journal for anyone learning to move slower and trust what's unfolding.
                        </p>

                        {/* Email Form */}
                        <div className="animate-fade-in-delay-2 pt-4">
                            <EmailSignupForm ctaText="Get the free download" />
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Inside Section */}
            <section className="py-24 bg-secondary/20 border-t border-border/40">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">
                            What's <span className="italic font-light text-muted-foreground">Inside</span>
                        </h2>

                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="text-center space-y-4">
                                <div className="w-12 h-[1px] bg-primary mx-auto mb-6"></div>
                                <h3 className="font-serif text-xl">Reflective Prompts</h3>
                                <p className="text-muted-foreground font-sans text-sm leading-relaxed font-light">
                                    Thoughtful questions designed to guide you through moments of pause and self-discovery.
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-12 h-[1px] bg-primary mx-auto mb-6"></div>
                                <h3 className="font-serif text-xl">Journaling Space</h3>
                                <p className="text-muted-foreground font-sans text-sm leading-relaxed font-light">
                                    Beautiful, minimalist pages to capture your thoughts, feelings, and observations.
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-12 h-[1px] bg-primary mx-auto mb-6"></div>
                                <h3 className="font-serif text-xl">Monthly Intention</h3>
                                <p className="text-muted-foreground font-sans text-sm leading-relaxed font-light">
                                    A gentle framework for setting intentions that honor where you are right now.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial / Quote Section */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <div className="w-16 h-[1px] bg-primary mx-auto"></div>
                        <blockquote className="font-serif italic text-2xl md:text-3xl text-muted-foreground leading-relaxed">
                            "Sometimes the most radical thing we can do is slow down and listen to ourselves."
                        </blockquote>
                        <div className="w-16 h-[1px] bg-primary mx-auto"></div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Downloads;
