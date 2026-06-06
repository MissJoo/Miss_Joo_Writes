import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import EmailSignupForm from "@/components/forms/EmailSignupForm";
import { Download, BookOpen, Lock, Unlock, ArrowDownToLine } from "lucide-react";

const journals = [
    {
        month: "May",
        title: "Peace & Arrival",
        desc: "For anyone who's done the quiet work of becoming and is finally starting to feel it. A reflection on taking up space without shrinking.",
        file: "/journals/notes-on-becoming-may.pdf",
    },
    {
        month: "April",
        title: "Joy & Softness",
        desc: "Allowing yourself to feel good without earning it. A journal for embracing softness, letting go of guilt, and finding healing in the ordinary.",
        file: "/journals/notes-on-becoming-april.pdf",
    },
    {
        month: "March",
        title: "Quiet Growth & Connection",
        desc: "For the in-between moments. Honoring the quiet shifts that don't need to be announced, and the people who stay without being convinced.",
        file: "/journals/notes-on-becoming-march.pdf",
    },
    {
        month: "February",
        title: "Trust & Inner Calm",
        desc: "Learning to trust your own voice again. A gentle space to stop forcing what doesn't flow and become more selective with your energy.",
        file: "/journals/notes-on-becoming-february.pdf",
    },
    {
        month: "January",
        title: "Letting Go & Beginning",
        desc: "An invitation to sit with stillness. Look honestly at what you're carrying and ask yourself if it still belongs in this new chapter.",
        file: "/journals/notes-on-becoming-january.pdf",
    },
];

const Downloads = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        const unlocked = localStorage.getItem("mj_journals_unlocked") === "true";
        if (unlocked) {
            setIsUnlocked(true);
        }
    }, []);

    const handleSignupSuccess = () => {
        localStorage.setItem("mj_journals_unlocked", "true");
        setIsUnlocked(true);
        
        // Scroll to the journals section smoothly
        document.getElementById("journals-collection")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
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
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                                <BookOpen className="w-8 h-8 text-primary" />
                            </div>
                        </div>

                        {/* Headline */}
                        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl animate-fade-in-up text-balance leading-tight">
                            Notes on Becoming
                            <span className="block italic font-light text-muted-foreground mt-2 text-2xl md:text-3xl">
                                The Reflection Journal Collection
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-muted-foreground text-lg md:text-xl font-sans font-light leading-relaxed animate-fade-in-delay-1 max-w-2xl mx-auto">
                            A gentle monthly companion for anyone learning to move slower, trust what's unfolding, and sit with themselves honestly.
                        </p>

                        {/* Email Form / Unlocked Status */}
                        <div className="animate-fade-in-delay-2 pt-4">
                            {!isUnlocked ? (
                                <div className="space-y-6">
                                    <p className="font-serif text-lg italic text-muted-foreground">
                                        Join the newsletter to unlock the entire collection.
                                    </p>
                                    <EmailSignupForm 
                                        ctaText="Unlock Free Journals" 
                                        onSuccess={handleSignupSuccess}
                                    />
                                </div>
                            ) : (
                                <div className="inline-flex flex-col items-center p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                    <Unlock className="w-6 h-6 text-primary mb-3" />
                                    <p className="font-serif text-lg text-primary">Collection Unlocked</p>
                                    <p className="text-sm text-muted-foreground mt-2 font-sans">
                                        Thank you for joining. You can now download all journals below.
                                    </p>
                                    <button 
                                        onClick={() => document.getElementById("journals-collection")?.scrollIntoView({ behavior: "smooth" })}
                                        className="mt-6 text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                                    >
                                        View Journals <ArrowDownToLine className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Collection Grid Section */}
            <section id="journals-collection" className="py-24 bg-background relative">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl">
                                The <span className="italic font-light text-muted-foreground">Collection</span>
                            </h2>
                            <div className="w-12 h-[1px] bg-primary mx-auto mt-6"></div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {journals.map((journal, index) => (
                                <div 
                                    key={journal.month}
                                    className="group relative flex flex-col p-8 bg-secondary/10 border border-border/50 transition-all duration-500 hover:bg-secondary/20 hover:border-primary/30"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <BookOpen className="w-24 h-24 text-primary" />
                                    </div>
                                    
                                    <div className="relative z-10 flex-1">
                                        <div className="text-xs font-sans uppercase tracking-[0.3em] text-primary mb-4">
                                            {journal.month}
                                        </div>
                                        <h3 className="font-serif text-2xl mb-4 text-balance">
                                            {journal.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground font-sans font-light leading-relaxed mb-8">
                                            {journal.desc}
                                        </p>
                                    </div>

                                    <div className="relative z-10 pt-6 border-t border-border/50">
                                        {isUnlocked ? (
                                            <a 
                                                href={journal.file}
                                                download
                                                className="inline-flex items-center justify-between w-full text-sm font-sans uppercase tracking-widest text-primary hover:text-primary/80 transition-colors group/btn"
                                            >
                                                <span>Download PDF</span>
                                                <Download className="w-4 h-4 transition-transform group-hover/btn:-translate-y-1" />
                                            </a>
                                        ) : (
                                            <div className="inline-flex items-center justify-between w-full text-sm font-sans uppercase tracking-widest text-muted-foreground/60 cursor-not-allowed">
                                                <span>Locked</span>
                                                <Lock className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Inside Section */}
            <section className="py-24 bg-secondary/20 border-y border-border/40">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">
                            What's <span className="italic font-light text-muted-foreground">Inside</span>
                        </h2>

                        <p className="text-center text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
                            Each 8-page monthly journal is carefully designed with a warm, luxurious aesthetic. Perfect for printing or reading digitally on your tablet.
                        </p>

                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="text-center space-y-4">
                                <div className="w-12 h-[1px] bg-primary mx-auto mb-6"></div>
                                <h3 className="font-serif text-xl">Guided Reflections</h3>
                                <p className="text-muted-foreground font-sans text-sm leading-relaxed font-light">
                                    Thoughtful invitations designed to guide you through moments of pause and self-discovery, tied to the month's theme.
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-12 h-[1px] bg-primary mx-auto mb-6"></div>
                                <h3 className="font-serif text-xl">Creative Activities</h3>
                                <p className="text-muted-foreground font-sans text-sm leading-relaxed font-light">
                                    A unique activity each month.. from energy maps to letters to yourself.. to help you process your growth gently.
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-12 h-[1px] bg-primary mx-auto mb-6"></div>
                                <h3 className="font-serif text-xl">Gratitude & Intentions</h3>
                                <p className="text-muted-foreground font-sans text-sm leading-relaxed font-light">
                                    Dedicated space to honor what you're grateful for and set a quiet intention for the days ahead.
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
