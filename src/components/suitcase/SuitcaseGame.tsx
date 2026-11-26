import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { fill, suitcase, type SuitcaseIcon, type SuitcaseResult } from "@/data/suitcase";
import { getPost } from "@/data/posts";
import { ItemIcon } from "./SuitcaseIcons";
import "./suitcase.css";

// Nothing the reader chooses is stored or sent anywhere: all state lives in this component.

type Phase = "unpack" | "repack" | "done";
type DialogState = { id: SuitcaseIcon; stage: "envelope" | "opening" | "letter" } | null;

const { items } = suitcase;

// Each item's colour, shown once it is taken out (main, dark edge, soft glow)
const tone: Record<SuitcaseIcon, [string, string, string]> = {
  photo: ["#B5485D", "#8E2F44", "#F3D6DC"],
  coffee: ["#B9792A", "#8A5617", "#F5E1C2"],
  jacket: ["#2E8C86", "#1E6762", "#CFEAE6"],
  phone: ["#7B4FA0", "#5C3780", "#E5D8F0"],
  ticket: ["#C08A1E", "#8C6210", "#F4E4BC"],
  notebook: ["#8E2436", "#6E1423", "#EED3D7"],
};
const toneVars = (id: SuitcaseIcon) =>
  ({ "--c": tone[id][0], "--cd": tone[id][1], "--cs": tone[id][2] }) as CSSProperties;
const total = items.length;
const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// "A one-way ticket" -> "one-way ticket", so the hint reads "under the one-way ticket"
const withoutArticle = (name: string) => name.toLowerCase().replace(/^(a|an|my|the)\s+/, "");

const verdict = (kept: number): SuitcaseResult => {
  const { results } = suitcase;
  if (kept >= results.fullFrom) return results.full;
  if (kept <= results.lightUpTo) return results.light;
  return results.between;
};

const SuitcaseGame = () => {
  const [opened, setOpened] = useState<SuitcaseIcon[]>([]);
  const [current, setCurrent] = useState<SuitcaseIcon | null>(null);
  const [lastId, setLastId] = useState<SuitcaseIcon | null>(null);
  const [phase, setPhase] = useState<Phase>("unpack");
  const [keep, setKeep] = useState<Record<string, boolean>>({});
  const [dialog, setDialog] = useState<DialogState>(null);
  const [status, setStatus] = useState("");
  const [showCopyText, setShowCopyText] = useState(false);
  const [rendering, setRendering] = useState(false);
  // The card currently being unwrapped: "wrap" = pop, gift and unwrapping; "reveal" = item fading in
  const [unwrapping, setUnwrapping] = useState<{ id: SuitcaseIcon; stage: "wrap" | "reveal" } | null>(null);
  const unwrapTimers = useRef<number[]>([]);

  const resultRef = useRef<HTMLElement>(null);
  const noteHeadingRef = useRef<HTMLHeadingElement>(null);
  const letterRepackRef = useRef<HTMLButtonElement>(null);
  const copyTextRef = useRef<HTMLTextAreaElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const focusNoteOnClose = useRef(false);
  // The dialog has no trigger button, so remember what had focus and return it on close
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const openDialog = (next: NonNullable<DialogState>) => {
    returnFocusTo.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDialog(next);
  };

  // Envelope arrives about a second after the sixth item comes out
  useEffect(() => {
    if (!lastId) return;
    const timer = window.setTimeout(() => openDialog({ id: lastId, stage: "envelope" }), prefersReducedMotion() ? 0 : 1000);
    return () => window.clearTimeout(timer);
  }, [lastId]);

  // Seal broken: flap opens, letter slides up, then the full letter card
  useEffect(() => {
    if (dialog?.stage !== "opening") return;
    const timer = window.setTimeout(
      () => setDialog((d) => (d ? { ...d, stage: "letter" } : d)),
      prefersReducedMotion() ? 0 : 1500,
    );
    return () => window.clearTimeout(timer);
  }, [dialog?.stage]);

  useEffect(() => {
    if (dialog?.stage === "letter") letterRepackRef.current?.focus();
  }, [dialog?.stage]);

  useEffect(() => {
    if (phase === "done") {
      resultRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
  }, [phase]);

  useEffect(() => () => unwrapTimers.current.forEach((t) => window.clearTimeout(t)), []);

  // Item is out: its reflection shows in the note, and the sixth one brings the envelope
  const finishOpening = (id: SuitcaseIcon, openedBefore: SuitcaseIcon[]) => {
    setCurrent(id);
    if (!openedBefore.includes(id)) {
      const next = [...openedBefore, id];
      setOpened(next);
      if (next.length === total) setLastId(id);
    }
  };

  const openItem = (id: SuitcaseIcon) => {
    if (phase !== "unpack") return;
    // Items open straight away (the gift-unwrapping animation was removed on request)
    finishOpening(id, opened);
  };

  const startRepack = () => {
    setKeep((prev) => Object.fromEntries(items.map((it) => [it.id, prev[it.id] ?? true])));
    setPhase("repack");
  };

  const repackFromLetter = () => {
    focusNoteOnClose.current = true;
    setDialog(null);
    startRepack();
  };

  const reset = () => {
    unwrapTimers.current.forEach((t) => window.clearTimeout(t));
    setUnwrapping(null);
    setOpened([]);
    setCurrent(null);
    setLastId(null);
    setKeep({});
    setPhase("unpack");
    setStatus("");
    setShowCopyText(false);
  };

  const kept = items.filter((it) => keep[it.id]);
  const left = items.filter((it) => !keep[it.id]);
  const result = verdict(kept.length);
  const list = (arr: typeof items) =>
    arr.length ? arr.map((it) => it.name.toLowerCase()).join(", ") : suitcase.pass.nothing;
  const shareText = fill(suitcase.pass.shareText, {
    title: result.title,
    line: result.line,
    kept: list(kept),
    left: list(left),
  });

  const copyPass = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setStatus(suitcase.pass.copied);
    } catch {
      setShowCopyText(true);
      setStatus(suitcase.pass.copyFallback);
      window.setTimeout(() => {
        copyTextRef.current?.focus();
        copyTextRef.current?.select();
      }, 0);
    }
  };

  const savePass = async () => {
    setStatus(suitcase.pass.saving);
    setRendering(true);
    try {
      // Wait a frame so the off-screen story layout is mounted, and for fonts
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      await document.fonts?.ready;
      const node = storyRef.current;
      if (!node) throw new Error("story not rendered");
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(node, {
        width: 1080,
        height: 1920,
        pixelRatio: 1,
        style: { position: "static", left: "0", top: "0" },
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "the-suitcase-boarding-pass.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setStatus(suitcase.pass.saved);
    } catch {
      setStatus(suitcase.pass.saveFailed);
    } finally {
      setRendering(false);
    }
  };

  const currentItem = items.find((it) => it.id === current);
  const allOut = opened.length === total;
  const letter = dialog ? suitcase.letters[dialog.id] : null;
  const dialogItem = dialog ? items.find((it) => it.id === dialog.id) : null;

  const passMarkup = (
    <div className="sc-pass">
      <div className="sc-pass-main">
        <div className="sc-pass-top">
          <span>{suitcase.pass.label}</span>
          <span>{suitcase.pass.brand}</span>
        </div>
        <h3>{result.title}</h3>
        <p>{result.line}</p>
        <div className="sc-route">
          <div>
            <span className="sc-small">{suitcase.pass.fromLabel}</span>
            <b>{suitcase.pass.from}</b>
          </div>
          <span className="sc-arrow" aria-hidden="true">
            →
          </span>
          <div>
            <span className="sc-small">{suitcase.pass.toLabel}</span>
            <b>{suitcase.pass.to}</b>
          </div>
        </div>
        {/* Items as chips: carried ones in their own colour, left-behind ones as dashed outlines */}
        <div className="sc-fields">
          <div>
            <span className="sc-small">{suitcase.pass.carryingLabel}</span>
            <div className="sc-chips">
              {kept.length
                ? kept.map((it) => (
                    <span key={it.id} className="sc-chip" style={toneVars(it.id)}>
                      {it.name}
                    </span>
                  ))
                : <span className="sc-chip is-left">{suitcase.pass.nothing}</span>}
            </div>
          </div>
          <div>
            <span className="sc-small">{suitcase.pass.leftLabel}</span>
            <div className="sc-chips">
              {left.length
                ? left.map((it) => (
                    <span key={it.id} className="sc-chip is-left">
                      {it.name}
                    </span>
                  ))
                : <span className="sc-chip is-left">{suitcase.pass.nothing}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="sc-stub">
        <div>
          <span className="sc-small">{suitcase.pass.gateLabel}</span>
          <div className="sc-code">{suitcase.pass.gate}</div>
        </div>
        <div>
          <span className="sc-small">{suitcase.pass.seatLabel}</span>
          <div>{suitcase.pass.seat}</div>
        </div>
        <div className="sc-bars" aria-hidden="true"></div>
      </div>
    </div>
  );

  return (
    <>
      {phase === "unpack" && (
      <section className="sc-stage" aria-label="The suitcase">
        <div className="sc-case">
          <div className="sc-handle" aria-hidden="true"></div>
          <div className="sc-shell">
            <div className="sc-latches" aria-hidden="true">
              <span className="sc-latch"></span>
              <span className="sc-latch"></span>
            </div>
            <div className="sc-lining" aria-busy={unwrapping ? true : undefined}>
              {items.map((it, i) => {
                const isOut = opened.includes(it.id);
                return (
                  <button
                    key={it.id}
                    type="button"
                    className={`sc-item${isOut ? " is-out" : ""}${!isOut ? " is-closed" : ""}${current === it.id ? " is-active" : ""}`}
                    aria-label={fill(isOut ? suitcase.unpack.ariaReadAgain : suitcase.unpack.ariaTakeOut, { name: it.name })}
                    onClick={() => openItem(it.id)}
                    disabled={phase !== "unpack"}
                    style={isOut ? toneVars(it.id) : undefined}
                  >
                    <span className="sc-num" aria-hidden="true">{`0${i + 1}`}</span>
                    {isOut ? (
                      <>
                        <span className="sc-badge">
                          <ItemIcon id={it.id} />
                        </span>
                        <span>{it.name}</span>
                        <span className="sc-tag">{suitcase.unpack.unpacked}</span>
                      </>
                    ) : (
                      <>
                        <span className="sc-q" aria-hidden="true">?</span>
                        <span className="sc-tag">{suitcase.unpack.takeOut}</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="sc-steps" aria-hidden="true">
            {items.map((it) => (
              <span key={it.id} className={opened.includes(it.id) ? "is-on" : undefined} style={opened.includes(it.id) ? toneVars(it.id) : undefined} />
            ))}
          </div>
          <p className="sc-count" aria-live="polite">
            {fill(suitcase.unpack.counter, { opened: opened.length, total })}
          </p>
        </div>

        <article className="sc-note" aria-live="polite" style={currentItem ? toneVars(currentItem.id) : undefined}>
          <div key={`${phase}-${current ?? "intro"}`} className="sc-fade" style={{ display: "grid", gap: 16 }}>
            {phase === "unpack" && !currentItem && (
              <>
                <h2>{suitcase.intro.heading}</h2>
                <p>{suitcase.intro.body}</p>
                <p className="sc-sign">{suitcase.intro.sign}</p>
              </>
            )}

            {phase === "unpack" && currentItem && (
              <>
                <span className="sc-eyebrow">{currentItem.name}</span>
                <h2>{currentItem.title}</h2>
                <p className="sc-lead">{currentItem.lead}</p>
                <p>{currentItem.body}</p>
                {allOut ? (
                  <>
                    <p>
                      <b>{suitcase.unpack.emptyBold}</b> {suitcase.unpack.emptyRest}
                    </p>
                    <div className="sc-actions">
                      <button
                        type="button"
                        className="sc-btn"
                        onClick={() => lastId && openDialog({ id: lastId, stage: "letter" })}
                      >
                        {suitcase.unpack.readLetter}
                      </button>
                      <button type="button" className="sc-btn is-ghost" onClick={startRepack}>
                        {suitcase.unpack.repack}
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="sc-sign">{fill(suitcase.unpack.moreInside, { remaining: total - opened.length })}</p>
                )}
              </>
            )}

          </div>
        </article>
      </section>
      )}

      {phase === "repack" && (
        <section className="sc-screen sc-fade" aria-label={suitcase.repack.eyebrow}>
          <header className="sc-screen-head">
            <span className="sc-eyebrow">{suitcase.repack.eyebrow}</span>
            <h2 ref={noteHeadingRef} tabIndex={-1}>
              {suitcase.repack.heading}
            </h2>
            <p>{suitcase.repack.body}</p>
          </header>
          <div className="sc-shell sc-repack-shell">
            <div className="sc-lining sc-repack">
              {items.map((it) => (
                <div key={it.id} className={`sc-row${keep[it.id] ? " is-kept" : ""}`} style={toneVars(it.id)}>
                  <span className="sc-row-name">
                    <span className="sc-dot" aria-hidden="true" />
                    {it.name}
                  </span>
                  <div className="sc-toggle" role="group" aria-label={it.name}>
                    <button type="button" aria-pressed={!!keep[it.id]} onClick={() => setKeep((k) => ({ ...k, [it.id]: true }))}>
                      {suitcase.repack.carry}
                    </button>
                    <button type="button" aria-pressed={!keep[it.id]} onClick={() => setKeep((k) => ({ ...k, [it.id]: false }))}>
                      {suitcase.repack.leave}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sc-actions sc-center">
            <span className="sc-tally">{`Carrying ${items.filter((it) => keep[it.id]).length} · Leaving ${total - items.filter((it) => keep[it.id]).length}`}</span>
            <button type="button" className="sc-btn" onClick={() => setPhase("done")}>
              {suitcase.repack.done}
            </button>
          </div>
        </section>
      )}

      {phase === "done" && (
        <section ref={resultRef} aria-label={suitcase.pass.label} className="sc-screen sc-fade" style={{ scrollMarginTop: 110 }}>
          <header className="sc-screen-head">
            <span className="sc-eyebrow">{suitcase.closed.eyebrow}</span>
            <h2>{suitcase.closed.heading}</h2>
            <p>{suitcase.closed.body}</p>
          </header>
          {passMarkup}
          <div className="sc-actions sc-center">
            <button type="button" className="sc-btn is-ghost" onClick={savePass} disabled={rendering}>
              {suitcase.pass.save}
            </button>
            <button type="button" className="sc-btn is-ghost" onClick={copyPass}>
              {suitcase.pass.copy}
            </button>
            <button type="button" className="sc-btn is-ghost" onClick={reset}>
              {suitcase.closed.again}
            </button>
            <span className="sc-status" role="status">
              {status}
            </span>
          </div>
          {showCopyText && (
            <textarea ref={copyTextRef} className="sc-copytext" readOnly aria-label={suitcase.pass.copyTextLabel} value={shareText} />
          )}
          <div className="sc-links">
            <span className="sc-eyebrow" style={{ marginTop: 20 }}>
              {suitcase.keepReading.eyebrow}
            </span>
            {suitcase.keepReading.essays.map((slug) => {
              const post = getPost(slug);
              return post ? (
                <Link key={slug} to={`/blog/${slug}`}>
                  {post.title}
                </Link>
              ) : null;
            })}
          </div>

        </section>
      )}

        {phase === "done" && rendering && (
          <div ref={storyRef} className="sc-story" aria-hidden="true">
            <div className="sc-story-head">
              <span className="sc-eyebrow">{suitcase.page.eyebrow}</span>
              <p className="sc-story-title">
                {suitcase.page.titleBefore} <em>{suitcase.page.titleEmphasis}</em>
              </p>
            </div>
            {passMarkup}
            <div className="sc-story-site">{suitcase.pass.imageSite}</div>
          </div>
        )}

      <Dialog.Root
        open={dialog !== null}
        onOpenChange={(open) => {
          if (!open) setDialog(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="sc-theme sc-overlay" />
          <Dialog.Content
            className="sc-theme sc-dialog"
            aria-describedby={undefined}
            onPointerDownOutside={(event) => event.preventDefault()}
            onClick={(event) => {
              // Backdrop click: the dialog fills the screen, so a click on its own padding closes it
              if (event.target === event.currentTarget) setDialog(null);
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              const target = focusNoteOnClose.current ? noteHeadingRef.current : returnFocusTo.current;
              focusNoteOnClose.current = false;
              window.setTimeout(() => target?.focus(), 0);
            }}
          >
            {dialog && letter && dialogItem && dialog.stage !== "letter" && (
              <div className="sc-env-wrap" onClick={(event) => event.target === event.currentTarget && setDialog(null)}>
                <span className="sc-env-label">{suitcase.unpack.emptyBold.replace(/\.$/, "")}</span>
                <Dialog.Title asChild>
                  <p className="sc-env-hint">{fill(suitcase.envelope.hint, { name: withoutArticle(dialogItem.name) })}</p>
                </Dialog.Title>
                <div className={`sc-envelope${dialog.stage === "opening" ? " is-open" : ""}`}>
                  <div className="sc-env-back"></div>
                  <div className="sc-env-letter">
                    {suitcase.envelope.peekLine1}
                    <br />
                    {suitcase.envelope.peekLine2}
                  </div>
                  <div className="sc-env-front"></div>
                  <div className="sc-postmark" aria-hidden="true">
                    {suitcase.envelope.postmarkLine1}
                    <br />
                    {suitcase.envelope.postmarkLine2}
                  </div>
                  <div className="sc-env-flap"></div>
                  <button
                    type="button"
                    className="sc-seal"
                    aria-label={suitcase.envelope.sealLabel}
                    onClick={() => setDialog({ ...dialog, stage: "opening" })}
                  >
                    MJ
                  </button>
                </div>
                <p className="sc-env-hint">{suitcase.envelope.tapHint}</p>
              </div>
            )}

            {dialog && letter && dialog.stage === "letter" && (
              <article className="sc-letter">
                <Dialog.Close className="sc-close">{suitcase.letter.close}</Dialog.Close>
                <span className="sc-eyebrow">{suitcase.letter.eyebrow}</span>
                <Dialog.Title asChild>
                  <h2>{letter.title}</h2>
                </Dialog.Title>
                {letter.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="sc-ask">{letter.ask}</p>
                <p className="sc-letter-sign">
                  {suitcase.letter.signLine1}
                  <br />
                  {suitcase.letter.signLine2}
                </p>
                <div className="sc-actions">
                  <button ref={letterRepackRef} type="button" className="sc-btn" onClick={repackFromLetter}>
                    {suitcase.letter.repack}
                  </button>
                </div>
              </article>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default SuitcaseGame;
