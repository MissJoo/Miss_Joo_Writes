import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { moreBoxes, postcard, quiz, quizResult } from "@/data/quiz";
import { suitcase, type SuitcaseIcon } from "@/data/suitcase";
import PostcardCard, { POSTCARD_NAME_MAX, postcardLink } from "@/components/home/PostcardCard";
import { homeBoxSize, homeBoxStyle, homeSection } from "@/components/suitcase/SuitcaseTeasers";

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
          <fieldset className="space-y-3 w-full max-w-xl mx-auto">
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
  const [message, setMessage] = useState(0);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "copied" | "fallback">("idle");
  const [link, setLink] = useState("");
  const fieldClass =
    "h-12 w-full rounded-[3px] border border-journal-border bg-journal-bg px-4 text-center text-sm md:text-base text-journal-text placeholder:text-journal-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne";
  const fieldLabel = "block mb-2 text-[11px] tracking-[0.2em] uppercase text-journal-muted font-sans font-medium";

  const create = () => {
    setLink(postcardLink(name, message));
    setStatus("idle");
    setOpen(true);
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setStatus("copied");
    } catch {
      setStatus("fallback");
    }
  };

  return (
    <div className={cn(cardClass, homeBoxSize, "justify-center")}>
      <span className={labelClass}>{postcard.label}</span>
      <h3 className={cn(headingClass, "mt-4")}>{postcard.heading}</h3>
      <p className="mt-3 font-serif text-lg md:text-xl text-journal-text-secondary leading-relaxed">{postcard.line}</p>
      <div className="mt-5 space-y-4 w-full max-w-xl mx-auto">
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
          <select
            id="postcard-message"
            value={message}
            onChange={(e) => setMessage(Number(e.target.value))}
            className={cn(fieldClass, "cursor-pointer [text-align-last:center]")}
          >
            {postcard.messages.map((option, index) => (
              <option key={option} value={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          onClick={create}
          className="inline-flex h-12 items-center justify-center rounded-[3px] border border-journal-gold px-9 text-xs md:text-sm uppercase tracking-[0.15em] font-medium text-journal-gold hover:bg-journal-gold hover:text-journal-bg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-bg"
        >
          {postcard.create}
        </button>
      </div>

      {/* Pop-up card, no animation */}
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl max-h-[calc(100dvh-2rem)] overflow-y-auto -translate-x-1/2 -translate-y-1/2 focus:outline-none"
          >
            <DialogPrimitive.Title className="sr-only">
              {postcard.label}: Dear {name.trim() || "you"}
            </DialogPrimitive.Title>
            <PostcardCard name={name.trim()} message={message}>
              {status === "fallback" ? (
                <input
                  readOnly
                  value={link}
                  onFocus={(e) => e.currentTarget.select()}
                  aria-label="Share link"
                  className="h-11 w-full rounded-[3px] border border-journal-border bg-journal-bg px-3 text-center text-sm text-journal-text"
                />
              ) : (
                <button type="button" onClick={share} className={goldButton}>
                  {postcard.share}
                </button>
              )}
              <p aria-live="polite" className="mt-2 min-h-[1rem] text-xs text-journal-muted">
                {status === "copied" ? postcard.copied : status === "fallback" ? postcard.copyFallback : ""}
              </p>
            </PostcardCard>
            <DialogPrimitive.Close className="absolute -top-1 right-0 translate-y-[-100%] px-2 py-1 text-xs uppercase tracking-widest text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne">
              {postcard.close} <span aria-hidden="true">×</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
};

/** Three small boxes under the postcard, each pointing to a part of the site. */
const MoreBoxes = () => (
  <ul className="grid gap-6 md:grid-cols-3 w-full max-w-3xl mx-auto">
    {moreBoxes.map((box) => {
      const external = box.href.startsWith("http");
      const linkClass = "inline-flex items-center gap-2 text-xs uppercase tracking-widest text-journal-gold hover:text-journal-text transition-colors duration-300 font-medium";
      return (
        <li key={box.title} className={cn(cardClass, "items-center !px-6 !py-8")}>
          <h3 className="font-serif text-2xl text-journal-text leading-snug">{box.title}</h3>
          <p className="mt-3 flex-1 text-journal-text-secondary font-light text-sm leading-relaxed">{box.line}</p>
          <div className="mt-5">
            {external ? (
              <a href={box.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <span>{box.link}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <Link to={box.href} className={linkClass}>
                <span>{box.link}</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </li>
      );
    })}
  </ul>
);

/** Homepage, after the newsletter: the quiz, the postcard and the three boxes, each its own section. */
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
    <section aria-label="More from Miss Joo Writes" className={homeSection}>
      <div className="container mx-auto px-6 lg:px-12">
        <MoreBoxes />
      </div>
    </section>
  </>
);

export default QuizAndPostcard;
