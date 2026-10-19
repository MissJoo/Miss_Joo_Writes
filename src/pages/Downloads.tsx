import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import EmailSignupForm, { JOURNALS_UNLOCKED_KEY } from "@/components/forms/EmailSignupForm";
import PostcardConfirmation from "@/components/newsletter/PostcardConfirmation";
import { publicFileExists } from "@/lib/publicFiles";
import { scrollToTarget } from "@/lib/smoothScroll";
import { Download, BookOpen, Lock, Unlock, ArrowDownToLine, Clock } from "lucide-react";

interface Journal {
    month: string;
    title: string;
    /** Optional one-word theme, shown next to the month */
    theme?: string;
    desc: string;
    /** Path in public/. Until the file exists, the card shows "Coming soon"; add the file and push to make it downloadable. */
    file: string;
}

// Newest first
const journals: Journal[] = [
    {
        month: "September",
        title: "Rhythm & Renewal",
        theme: "Rhythm",
        desc: "For the woman ready to begin again, gently. Building routines that love you back, discipline without harshness, and a rhythm that fits the life you actually have, not the one you think you should.",
        file: "/downloads/notes-on-becoming-september.pdf",
    },
    {
        month: "August",
        title: "Rest & Return",
        theme: "Rest",
        desc: "For the woman who has been carrying a lot and needs permission to put it down. A gentle space for the slow season: rest without guilt, the journey home and back, and returning to yourself before the next chapter begins.",
        file: "/downloads/notes-on-becoming-august.pdf",
    },
    {
        month: "July",
        title: "Becoming & Belonging",
        desc: "For the woman who stopped waiting to feel ready. A reflection on belonging to yourself first, releasing the need to fit perfectly anywhere, and trusting the version of you already here.",
        file: "/journals/notes-on-becoming-july.pdf",
    },
    {
        month: "June",
        title: "Identity & Distance",
        desc: "For anyone living between two worlds. A quiet space to hold the complexity of homesickness, growth abroad, and the woman you are becoming in the in-between.",
        file: "/journals/notes-on-becoming-june.pdf",
    },
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
    // True only right after signing up here, to show the postcard; returning readers just see the unlocked panel
    const [justJoined, setJustJoined] = useState(false);

    useEffect(() => {
        try {
            if (localStorage.getItem(JOURNALS_UNLOCKED_KEY) === "true") setIsUnlocked(true);
        } catch {
            // Storage blocked: the visitor signs up again to unlock
        }
    }, []);

    const handleSignupSuccess = () => {
        setIsUnlocked(true);
        // Stay here so the postcard is seen; "View Journals" below it scrolls to the downloads
        setJustJoined(true);
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative flex min-h-[calc(100svh-85px)] items-center justify-center bg-journal-bg md:min-h-[calc(100svh-5rem)]">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-journal-bg/30 to-journal-bg z-0"></div>

                {/* Content */}
                <div className="container relative z-10 mx-auto -translate-y-1 px-6 py-0 md:py-2 lg:px-12">
                    <div className="mx-auto max-w-3xl space-y-1.5 text-center md:space-y-3">
                        {/* Icon */}
                        <div className="animate-fade-in-up">
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-journal-border/40 bg-journal-bg-secondary text-journal-gold md:mb-1 md:h-10 md:w-10">
                                <BookOpen className="h-4 w-4" />
                            </div>
                        </div>

                        {/* Headline */}
                        <h1 className="animate-fade-in-up font-serif text-xl leading-tight text-journal-text md:text-3xl">
                            Notes on Becoming
                            <span className="mt-1.5 block font-sans text-xs font-light uppercase tracking-[0.22em] text-journal-muted md:mt-2 md:text-sm md:tracking-[0.25em]">
                                The Reflection Journal Collection
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="animate-fade-in-delay-1 mx-auto max-w-xl font-sans text-xs font-light leading-relaxed text-journal-text-secondary md:text-sm">
                            A gentle monthly companion for anyone learning to move slower, trust what's unfolding, and sit with themselves honestly.
                        </p>

                        {/* Email Form / Unlocked Status */}
                        <div className="animate-fade-in-delay-2 pt-1 md:pt-4">
                            {!isUnlocked ? (
                                <div className="mx-auto flex aspect-square w-full max-w-xs flex-col justify-center space-y-2 rounded-[2px] border border-journal-border bg-journal-card p-2 shadow-sm [&_button]:h-9 [&_input]:h-9 md:space-y-3 md:p-3">
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
                                    {justJoined && <PostcardConfirmation className="mb-6" />}
                                    <Unlock className="w-5 h-5 text-journal-gold mb-3 animate-pulse" />
                                    <p className="font-serif text-base text-journal-text font-medium">Collection Unlocked</p>
                                    <p className="text-xs text-journal-text-secondary mt-2 font-sans max-w-xs leading-relaxed">
                                        Thank you for joining. You can now download all reflection journals below.
                                    </p>
                                    <button 
                                        onClick={() => { const el = document.getElementById("journals-collection"); if (el) scrollToTarget(el, { offset: -80 }); }}
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
                                            {journal.theme && <span className="text-journal-muted"> · {journal.theme}</span>}
                                        </div>
                                        <h3 className="font-serif text-xl text-journal-text leading-snug font-medium">
                                            {journal.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-journal-text-secondary font-sans font-light leading-relaxed pb-6">
                                            {journal.desc}
                                        </p>
                                    </div>

                                    <div className="relative z-10 pt-5 border-t border-journal-border/30">
                                        {!publicFileExists(journal.file) ? (
                                            <div className="inline-flex items-center justify-between w-full text-[11px] font-sans uppercase tracking-widest text-journal-muted">
                                                <span>Coming soon</span>
                                                <Clock className="w-3.5 h-3.5" />
                                            </div>
                                        ) : isUnlocked ? (
                                            <a 
                                                href={journal.file}
                                                {...(journal.file.endsWith(".pdf") ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
                                                className="inline-flex items-center justify-between w-full text-[11px] font-sans uppercase tracking-widest text-journal-gold hover:text-journal-text transition-colors group/btn font-medium"
                                            >
                                                <span>{journal.file.endsWith(".pdf") ? "Download PDF" : "Open journal"}</span>
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
