import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { ChevronDown, Instagram, Link2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { postcard, quiz, quizResult } from "@/data/quiz";
import { suitcase, type SuitcaseIcon } from "@/data/suitcase";
import PostcardCard, { POSTCARD_NAME_MAX, POSTCARD_NOTE_MAX, postcardLink } from "@/components/home/PostcardCard";
import { homeBoxSize, homeBoxStyle, homeFields, homeSection, homeText } from "@/components/suitcase/SuitcaseTeasers";

// Same look as the Suitcase box
const cardClass = `flex flex-col text-center ${homeBoxStyle}`;
const labelClass = "text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block";
const headingClass = "font-serif text-2xl md:text-3xl text-journal-text leading-snug";
const choiceClass =
  "w-full rounded-full border px-5 py-3 font-sans text-sm leading-snug transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-card";
const choiceIdle = "text-journal-text-secondary border-journal-border bg-journal-bg hover:text-journal-text hover:border-journal-gold/50";
const goldButton =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gold px-8 text-[11px] uppercase tracking-widest text-espresso hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-card";
const textLink =
  "text-xs tracking-wider uppercase text-journal-gold hover:text-journal-text underline underline-offset-4 decoration-journal-champagne font-sans font-medium py-2 transition-colors duration-300";

// Same pill as the essay page's "Share this essay" row
const shareButton =
  "inline-flex h-10 items-center gap-2 rounded-full border border-journal-border px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-journal-text-secondary transition-colors duration-300 hover:border-journal-gold/60 hover:text-journal-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne";

const MessengerIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.98-.87a.8.8 0 0 1 .53-.04c.91.25 1.88.38 2.91.38 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z" />
  </svg>
);

const TikTokIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

/** "Which letter are you?": three questions, one at a time, ending on one of the six Suitcase letters. */
const Quiz = () => {
  const [picks, setPicks] = useState<SuitcaseIcon[]>([]);
  const done = picks.length === quiz.questions.length;
  const letter = done ? suitcase.letters[quizResult(picks)] : null;
  const current = quiz.questions[picks.length];

  return (
    <div className={cn(cardClass, homeBoxSize, "justify-center")} aria-live="polite">
      <span className={labelClass}>{letter ? quiz.resultLabel : quiz.label}</span>
      {letter ? (
        <div key="result" className="mt-4 space-y-5 animate-fade-in motion-reduce:animate-none">
          <h3 className={headingClass}>{letter.title}</h3>
          <p className="font-serif italic text-lg text-journal-text-secondary leading-relaxed">{letter.ask}</p>
          <div className="flex flex-col items-center gap-2 pt-2">
            <Link to="/the-suitcase" className={goldButton}>
              <span>{quiz.open}</span>
              <span aria-hidden="true">→</span>
            </Link>
            <button type="button" onClick={() => setPicks([])} className={textLink}>
              {quiz.again}
            </button>
          </div>
        </div>
      ) : (
        <div key={picks.length} className="mt-4 space-y-5 animate-fade-in motion-reduce:animate-none">
          <h3 className={headingClass}>{quiz.heading}</h3>
          <p className="text-[10px] tracking-[0.25em] uppercase text-journal-muted">
            {picks.length + 1} of {quiz.questions.length}
          </p>
          <fieldset className={cn("space-y-3", homeFields)}>
            <legend className="mb-4 text-journal-text-secondary font-light text-sm md:text-base">{current.question}</legend>
            {current.answers.map((answer) => (
              <button
                key={answer.text}
                type="button"
                onClick={() => setPicks([...picks, answer.letter])}
                className={cn(choiceClass, choiceIdle)}
              >
                {answer.text}
              </button>
            ))}
          </fieldset>
        </div>
      )}
    </div>
  );
};

/** "Send a postcard": pick a name and a message, then the card opens in a pop-up with a link to share. */
const Postcard = () => {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState(0);
  const [note, setNote] = useState("");
  // The last choice in the dropdown swaps it for a text field in the same spot
  const custom = message === postcard.messages.length;
  const shownMessage = custom ? 0 : message;
  const shownNote = custom ? note.trim() : "";
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "copied" | "messenger" | "instagram" | "tiktok" | "fallback">("idle");
  const [link, setLink] = useState("");
  const fieldClass =
    "h-12 w-full rounded-full border border-journal-border bg-journal-bg px-6 text-left text-sm md:text-base text-journal-text placeholder:text-journal-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne";
  const fieldLabel = "block mb-2 pl-6 text-left text-[11px] tracking-[0.2em] uppercase text-journal-muted font-sans font-medium";

  // Every pop-up starts from a blank form once it's closed
  const close = () => {
    setOpen(false);
    setName("");
    setFrom("");
    setMessage(0);
    setNote("");
    setStatus("idle");
  };

  const create = () => {
    setLink(postcardLink(name, from, shownMessage, shownNote));
    setStatus("idle");
    setOpen(true);
  };

  /** Copies the link and shows which note to show underneath. Returns false if the browser blocked it. */
  const copy = async (done: typeof status) => {
    try {
      await navigator.clipboard.writeText(link);
      setStatus(done);
      return true;
    } catch {
      setStatus("fallback");
      return false;
    }
  };

  // Phones open the Messenger app straight away. Computers have no Messenger share link, so copy and open messenger.com.
  const messenger = async () => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      window.location.href = `fb-messenger://share/?link=${encodeURIComponent(link)}`;
    } else if (await copy("messenger")) {
      window.open("https://www.messenger.com/", "_blank", "noopener,noreferrer");
    }
  };

  // Instagram and TikTok have no web share link. Phones open their share menu, where both apps are listed;
  // computers copy the link and open the app's messages page.
  const app = async (which: "instagram" | "tiktok", inbox: string) => {
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title: postcard.signoff, url: link });
      } catch {
        // Closed without sharing
      }
    } else if (await copy(which)) {
      window.open(inbox, "_blank", "noopener,noreferrer");
    }
  };

  const notes = {
    idle: "",
    copied: postcard.copied,
    messenger: postcard.copiedMessenger,
    instagram: postcard.copiedInstagram,
    tiktok: postcard.copiedTiktok,
    fallback: postcard.copyFallback,
  };

  return (
    <div className={cn(cardClass, homeBoxSize, "justify-center")}>
      <span className={labelClass}>{postcard.label}</span>
      <h3 className={cn(headingClass, "mt-4")}>{postcard.heading}</h3>
      <p className={cn("mt-3 font-sans text-sm md:text-base font-light text-journal-text-secondary leading-relaxed", homeText)}>{postcard.line}</p>
      <div className={cn("mt-5 space-y-4", homeFields)}>
        <div>
          <label htmlFor="postcard-name" className={fieldLabel}>
            {postcard.nameLabel}
          </label>
          <Input
            id="postcard-name"
            value={name}
            maxLength={POSTCARD_NAME_MAX}
            autoComplete="off"
            placeholder={postcard.namePlaceholder}
            onChange={(e) => setName(e.target.value)}
            className={cn(fieldClass, "focus-visible:ring-offset-0")}
          />
        </div>
        <div>
          <label htmlFor="postcard-message" className={fieldLabel}>
            {postcard.messagesLabel}
          </label>
          {custom ? (
            <div className="relative">
              <Input
                id="postcard-message"
                value={note}
                maxLength={POSTCARD_NOTE_MAX}
                autoComplete="off"
                autoFocus
                placeholder={postcard.notePlaceholder}
                onChange={(e) => setNote(e.target.value)}
                className={cn(fieldClass, "pr-12 focus-visible:ring-offset-0")}
              />
              <button
                type="button"
                onClick={() => setMessage(0)}
                aria-label={postcard.noteBack}
                title={postcard.noteBack}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center text-journal-muted hover:text-journal-gold transition-colors duration-300"
              >
                <ChevronDown size={16} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <select
              id="postcard-message"
              value={message}
              onChange={(e) => setMessage(Number(e.target.value))}
              className={cn(fieldClass, "cursor-pointer")}
            >
              {postcard.messages.map((option, index) => (
                <option key={option} value={index}>
                  {option}
                </option>
              ))}
              <option value={postcard.messages.length}>{postcard.notePlaceholder}</option>
            </select>
          )}
        </div>
        <div>
          <label htmlFor="postcard-from" className={fieldLabel}>
            {postcard.fromLabel}
          </label>
          <Input
            id="postcard-from"
            value={from}
            maxLength={POSTCARD_NAME_MAX}
            autoComplete="off"
            placeholder={postcard.fromPlaceholder}
            onChange={(e) => setFrom(e.target.value)}
            className={cn(fieldClass, "focus-visible:ring-offset-0")}
          />
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          onClick={create}
          className="inline-flex h-11 items-center justify-center rounded-full bg-gold px-8 text-[11px] uppercase tracking-widest text-espresso hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-bg"
        >
          {postcard.create}
        </button>
      </div>

      {/* Pop-up card, no animation */}
      <DialogPrimitive.Root open={open} onOpenChange={(next) => (next ? setOpen(true) : close())}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl max-h-[calc(100dvh-2rem)] overflow-y-auto -translate-x-1/2 -translate-y-1/2 focus:outline-none"
          >
            <div className="mb-2 flex justify-end">
              <DialogPrimitive.Close className="inline-flex h-9 items-center gap-1.5 rounded-full border border-journal-border bg-journal-card px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-journal-text-secondary hover:border-journal-gold/60 hover:text-journal-gold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne">
                <span aria-hidden="true">←</span>
                <span>{postcard.close}</span>
              </DialogPrimitive.Close>
            </div>
            <DialogPrimitive.Title className="sr-only">
              {postcard.label}: Dear {name.trim() || "you"}
            </DialogPrimitive.Title>
            <PostcardCard name={name.trim()} from={from.trim()} message={shownMessage} note={shownNote}>
              <p className="mb-3 text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium">{postcard.share}</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button type="button" onClick={() => copy("copied")} className={shareButton}>
                  <Link2 size={14} aria-hidden="true" />
                  <span>{postcard.copyLink}</span>
                </button>
                <button type="button" onClick={messenger} className={shareButton}>
                  <MessengerIcon />
                  <span>Messenger</span>
                </button>
                <button type="button" onClick={() => app("instagram", "https://www.instagram.com/direct/inbox/")} className={shareButton}>
                  <Instagram size={14} aria-hidden="true" />
                  <span>Instagram</span>
                </button>
                <button type="button" onClick={() => app("tiktok", "https://www.tiktok.com/messages")} className={shareButton}>
                  <TikTokIcon />
                  <span>TikTok</span>
                </button>
              </div>
              {status === "fallback" && (
                <input
                  readOnly
                  value={link}
                  onFocus={(e) => e.currentTarget.select()}
                  aria-label="Share link"
                  className="mt-3 h-11 w-full rounded-[3px] border border-journal-border bg-journal-bg px-3 text-center text-sm text-journal-text"
                />
              )}
              <p aria-live="polite" className="mt-2 min-h-[1rem] text-xs text-journal-muted">
                {notes[status]}
              </p>
            </PostcardCard>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
};

/** Homepage, after the newsletter: the quiz and the postcard, each its own section. */
const QuizAndPostcard = () => (
  <>
    <section aria-label="Which letter are you?" className={homeSection}>
      <div className="container mx-auto px-6 lg:px-12">
        <Quiz />
      </div>
    </section>
    <section aria-label="Send a postcard" className={homeSection}>
      <div className="container mx-auto px-6 lg:px-12">
        <Postcard />
      </div>
    </section>
  </>
);

export default QuizAndPostcard;
