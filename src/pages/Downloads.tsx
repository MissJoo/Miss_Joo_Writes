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
            <section className="relative flex min-h-[calc(100svh-85px)] items-center justify-center bg-journal-bg md:min-h-[calc(100svh-5rem)]">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-journal-bg/30 to-journal-bg z-0"></div>

                {/* Content */}
                <div className="container relative z-10 mx-auto px-6 py-3 md:py-8 lg:px-12">
                    <div className="mx-auto max-w-3xl space-y-3 text-center md:space-y-6">
                        {/* Icon */}
                        <div className="animate-fade-in-up">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-journal-border/40 bg-journal-bg-secondary text-journal-gold md:mb-1 md:h-12 md:w-12">
                                <BookOpen className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Headline */}
                        <h1 className="animate-fade-in-up font-serif text-2xl leading-tight text-journal-text md:text-4xl">
                            Notes on Becoming
                            <span className="mt-1.5 block font-sans text-xs font-light uppercase tracking-[0.22em] text-journal-muted md:mt-2 md:text-sm md:tracking-[0.25em]">
                                The Reflection Journal Collection
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="animate-fade-in-delay-1 mx-auto max-w-xl font-sans text-sm font-light leading-relaxed text-journal-text-secondary md:text-base">
                            A gentle monthly companion for anyone learning to move slower, trust what's unfolding, and sit with themselves honestly.
                        </p>

                        {/* Email Form / Unlocked Status */}
                        <div className="animate-fade-in-delay-2 pt-1 md:pt-4">
                            {!isUnlocked ? (
                                <div className="mx-auto max-w-md space-y-3 rounded-[2px] border border-journal-border bg-journal-card p-3 shadow-sm [&_button]:h-10 [&_input]:h-10 md:p-5">
                                    <p className="font-serif text-xs italic text-journal-text-secondary md:text-sm">
                                        Join the newsletter to unlock the entire collection.
                                    </p>
                                    <EmailSignupForm 
                                        ctaText="Unlock Free Journals" 
                                        onSuccess={handleSignupSuccess}
                                    />
                                </div>
                            ) : (
                                <div className="inline-flex flex-col items-center p-6 bg-journal-card rounded-[2px] border border-journal-border shadow-sm max-w-md">
                                    <Unlock className="w-5 h-5 text-journal-gold mb-3 animate-pulse" />
                                    <p className="font-serif text-base text-journal-text font-medium">Collection Unlocked</p>
                                    <p className="text-xs text-journal-text-secondary mt-2 font-sans max-w-xs leading-relaxed">
                                        Thank you for joining. You can now download all reflection journals below.
                                    </p>
                                    <button 
                                        onClick={() => document.getElementById("journals-collection")?.scrollIntoView({ behavior: "smooth" })}
                                        className="mt-5 text-[10px] uppercase tracking-widest text-journal-gold hover:text-journal-text transition-colors flex items-center gap-2 font-medium"
                                    >
                                        View Journals <ArrowDownToLine className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Collection Grid Section */}
            <section id="journals-collection" className="py-20 md:py-24 bg-journal-bg border-t border-journal-border/30">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16 space-y-2">
                            <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text">
                                The Collection
                            </h2>
                            <div className="w-8 h-px bg-journal-champagne/40 mx-auto mt-3"></div>
                            <p className="text-[10px] tracking-widest text-journal-muted uppercase font-sans">Monthly Guides</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {journals.map((journal) => (
                                <div 
                                    key={journal.month}
                                    className="group relative flex flex-col justify-between p-8 bg-journal-card border border-journal-border hover:border-journal-champagne/60 hover:-translate-y-1 transition-all duration-300 rounded-[2px] shadow-sm"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] select-none">
                                        <BookOpen className="w-20 h-20 text-journal-text" />
                                    </div>
                                    
                                    <div className="relative z-10 flex-1 space-y-4">
                                        <div className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-journal-gold">
                                            {journal.month}
                                        </div>
                                        <h3 className="font-serif text-xl text-journal-text leading-snug font-medium">
                                            {journal.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-journal-text-secondary font-sans font-light leading-relaxed pb-6">
                                            {journal.desc}
                                        </p>
                                    </div>

                                    <div className="relative z-10 pt-5 border-t border-journal-border/30">
                                        {isUnlocked ? (
                                            <a 
                                                href={journal.file}
                                                download
                                                className="inline-flex items-center justify-between w-full text-[11px] font-sans uppercase tracking-widest text-journal-gold hover:text-journal-text transition-colors group/btn font-medium"
                                            >
                                                <span>Download PDF</span>
                                                <Download className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-y-0.5" />
                                            </a>
                                        ) : (
                                            <div className="inline-flex items-center justify-between w-full text-[11px] font-sans uppercase tracking-widest text-journal-muted/60 cursor-not-allowed">
                                                <span>Locked</span>
                                                <Lock className="w-3.5 h-3.5" />
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
            <section className="py-20 md:py-24 bg-journal-bg-secondary/35 border-y border-journal-border/30">
                <div className="container mx-auto px-6 lg:px-12">
                  <div className="max-w-4xl mx-auto space-y-12">
                        <div className="text-center space-y-2">
                            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">What's Inside</span>
                            <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text">
                                The Journal Structure
                            </h2>
                            <div className="w-12 h-px bg-journal-champagne/40 mx-auto"></div>
                        </div>

                        <p className="text-center text-journal-text-secondary mb-12 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                            Each 8-page monthly journal is carefully designed with a warm, luxurious aesthetic. Perfect for printing or reading digitally on your tablet.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                            <div className="text-center space-y-4">
                                <div className="w-12 h-[1px] bg-journal-champagne/30 mx-auto mb-4"></div>
                                <h3 className="font-serif text-lg text-journal-text font-medium">Guided Reflections</h3>
                                <p className="text-journal-text-secondary font-sans text-xs md:text-sm leading-relaxed font-light">
                                    Thoughtful invitations designed to guide you through moments of pause and self-discovery, tied to the month's theme.
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-12 h-[1px] bg-journal-champagne/30 mx-auto mb-4"></div>
                                <h3 className="font-serif text-lg text-journal-text font-medium">Creative Activities</h3>
                                <p className="text-journal-text-secondary font-sans text-xs md:text-sm leading-relaxed font-light">
                                    A unique activity each month.. from energy maps to letters to yourself.. to help you process your growth gently.
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-12 h-[1px] bg-journal-champagne/30 mx-auto mb-4"></div>
                                <h3 className="font-serif text-lg text-journal-text font-medium">Gratitude & Intentions</h3>
                                <p className="text-journal-text-secondary font-sans text-xs md:text-sm leading-relaxed font-light">
                                    Dedicated space to honor what you're grateful for and set a quiet intention for the days ahead.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial / Quote Section */}
            <section className="py-20 md:py-24 bg-journal-bg">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">
                            A Quiet Realization
                        </span>
                        <blockquote className="font-serif italic text-xl md:text-2.5xl text-journal-gold leading-relaxed">
                            “Sometimes the most radical thing we can do is slow down and listen to ourselves.”
                        </blockquote>
                        <div className="w-16 h-[1px] bg-journal-champagne/30 mx-auto"></div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Downloads;
