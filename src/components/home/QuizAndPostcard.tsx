import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { postcard, quiz, quizResult } from "@/data/quiz";
import { fill, suitcase, type SuitcaseIcon } from "@/data/suitcase";

const cardClass =
  "flex flex-col border border-journal-border bg-journal-card rounded-[3px] p-8 md:p-10 text-center shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10),0_1px_3px_rgba(0,0,0,0.04)]";
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
    <div className={cardClass} aria-live="polite">
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
          <fieldset className="space-y-3">
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

/** "Send a postcard": builds a short note with the Suitcase link and copies it. Nothing is stored or sent. */
const Postcard = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState(0);
  const [status, setStatus] = useState<"idle" | "copied" | "fallback">("idle");
  const text = fill(postcard.template, {
    name: name.trim() || "you",
    message: postcard.messages[message],
    link: postcard.link,
  });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("fallback");
    }
  };

  return (
    <div className={cardClass}>
      <span className={labelClass}>{postcard.label}</span>
      <h3 className={cn(headingClass, "mt-4")}>{postcard.heading}</h3>
      <div className="mt-5 space-y-5 text-left">
        <div>
          <label htmlFor="postcard-name" className="sr-only">
            {postcard.nameLabel}
          </label>
          <Input
            id="postcard-name"
            value={name}
            maxLength={40}
            autoComplete="off"
            placeholder={postcard.namePlaceholder}
            onChange={(e) => {
              setName(e.target.value);
              setStatus("idle");
            }}
            className="h-12 px-6 rounded-full border-journal-border bg-journal-bg text-journal-text text-center placeholder:text-journal-muted/70 focus-visible:ring-journal-champagne"
          />
        </div>
        <fieldset className="space-y-3">
          <legend className="mb-3 w-full text-center text-journal-text-secondary font-light text-sm md:text-base">{postcard.messagesLabel}</legend>
          {postcard.messages.map((option, index) => (
            <button
              key={option}
              type="button"
              aria-pressed={message === index}
              onClick={() => {
                setMessage(index);
                setStatus("idle");
              }}
              className={cn(
                choiceClass,
                message === index ? "bg-journal-gold text-journal-bg border-journal-gold shadow-sm" : choiceIdle,
              )}
            >
              {option}
            </button>
          ))}
        </fieldset>
      </div>
      {/* What will be copied */}
      <p className="mt-6 whitespace-pre-line border border-journal-border bg-journal-bg rounded-[3px] px-6 py-5 font-serif italic text-lg text-journal-text-secondary leading-relaxed">
        {text}
      </p>
      <div className="mt-6 flex flex-col items-center gap-3">
        <button type="button" onClick={copy} className={goldButton}>
          {postcard.copy}
        </button>
        <p aria-live="polite" className="text-xs text-journal-muted min-h-4">
          {status === "copied" ? postcard.copied : status === "fallback" ? postcard.copyFallback : ""}
        </p>
        {status === "fallback" && (
          <textarea
            readOnly
            value={text}
            rows={6}
            onFocus={(e) => e.currentTarget.select()}
            aria-label="Your postcard as text"
            className="w-full rounded-[3px] border border-journal-border bg-journal-bg p-4 text-sm text-journal-text"
          />
        )}
      </div>
    </div>
  );
};

/** Homepage pair after the newsletter: side by side on desktop, stacked on phones. */
const QuizAndPostcard = () => (
  <section aria-label="Which letter are you, and send a postcard" className="pt-10 md:pt-12 pb-20 md:pb-28 bg-journal-bg">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        <Quiz />
        <Postcard />
      </div>
    </div>
  </section>
);

export default QuizAndPostcard;
