import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowLeft } from "lucide-react";
import ShareButtons from "@/components/blog/ShareButtons";
import ReadingProgress from "@/components/blog/ReadingProgress";
import PauseHere from "@/components/blog/PauseHere";
import NewsletterSignup from "@/components/NewsletterSignup";
import NotFound from "@/pages/NotFound";
import { CHAPTER_MARK, PAUSE_MARK, getNextPost, getPost, isMarker, readingTime } from "@/data/posts";
import { continueWithFeeling } from "@/data/moods";
import { getPillar, topicLabel } from "@/data/pillars";
import { canonicalUrl } from "@/lib/seo";
import { suitcase } from "@/data/suitcase";
import { SuitcasePostLine } from "@/components/suitcase/SuitcaseTeasers";

const CONTINUE_BOX = "<!-- continue -->";
const LETTER_BOX = "<!-- letter -->";

const keepReadingCard =
  "group block rounded-xl border border-journal-border bg-journal-card p-5 md:p-6 hover:border-journal-champagne/60 transition-colors duration-300";
const keepReadingLabel = "block text-[10px] tracking-[0.25em] uppercase text-journal-muted font-sans font-medium";
const keepReadingTitle = "mt-2 font-serif text-xl md:text-2xl leading-snug text-journal-text group-hover:text-journal-gold transition-colors duration-300";
const keepReadingNote = "mt-1 font-sans text-xs font-light text-journal-text-secondary";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug);
  const articleRef = useRef<HTMLElement>(null);

  if (!post) {
    return <NotFound />;
  }

  const nextPost = getNextPost(post);
  const feeling = continueWithFeeling(post.slug, nextPost.slug);
  const feelingPost = feeling && getPost(feeling.slug);
  const pillar = getPillar(post.pillar);
  const shareUrl = canonicalUrl(`/blog/${post.slug}`);

  // The highlighted question shows once, in the header: a body paragraph saying the same thing is left out
  const plain = (text: string) =>
    text.replace(/^(##:|>>:)/, "").replace(/[“”"]/g, "").replace(/’/g, "'").replace(/\s+/g, " ").trim().toLowerCase();
  const bodyParagraphs = post.hook ? post.content.filter((p) => plain(p) !== plain(post.hook!)) : post.content;
  const firstTextIndex = bodyParagraphs.findIndex((p) => !isMarker(p));

  // Roman numeral for each "<!-- chapter -->" marker, counted in order
  const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  const toRoman = (n: number) => ROMAN[n - 1] ?? String(n);
  let chapterCount = 0;

  // Helper to determine if a paragraph should be styled as a pull quote (">>:" marks one by hand)
  const PULL_QUOTE_MARK = ">>:";
  const isPullQuote = (text: string) => {
    const cleaned = text.trim();
    if (cleaned.startsWith(PULL_QUOTE_MARK)) return true;
    // A line ending in a colon introduces the next one ("…begins with:"), so it stays plain text
    if (cleaned.endsWith(":")) return false;
    if (cleaned.startsWith("\u201c") && cleaned.endsWith("\u201d")) return true;
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) return true;
    if (cleaned.length > 5 && cleaned.length < 80 && !cleaned.includes(".") && !cleaned.includes(",")) return true;
    return false;
  };

  // Helper to detect section headings (prefixed with "##:")
  const isSectionHeading = (text: string) => text.startsWith("##:");

  // The Continue box goes at the first chapter break, the Letter at a later one in the middle, both before the pause
  const pauseAt = bodyParagraphs.findIndex((p) => p.trim() === PAUSE_MARK);
  const beforePause = pauseAt < 0 ? bodyParagraphs.length : pauseAt;
  const breaks = bodyParagraphs.flatMap((p, i) =>
    i > firstTextIndex && i < beforePause && (p.trim() === CHAPTER_MARK || isSectionHeading(p)) ? [i] : [],
  );
  const continueAt = breaks[0] ?? Math.min(firstTextIndex + 2, beforePause);
  const letterAt =
    breaks.length > 1
      ? breaks[Math.max(1, Math.floor(breaks.length / 2))]
      : Math.max(continueAt + 1, Math.floor((continueAt + beforePause) / 2));
  const articleParts = [
    ...bodyParagraphs.slice(0, continueAt),
    CONTINUE_BOX,
    ...bodyParagraphs.slice(continueAt, letterAt),
    LETTER_BOX,
    ...bodyParagraphs.slice(letterAt),
  ];

  return (
    <Layout>
      <ReadingProgress key={post.slug} target={articleRef} />

      {/* Back Link */}
      <section className="pt-24 lg:pt-28 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-journal-muted hover:text-journal-gold transition-colors duration-300 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-xs tracking-wider uppercase font-medium">Back to journal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Post Header */}
      <section className="pt-6 pb-4 md:pt-10 md:pb-6 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-5 md:space-y-6">
            {/* Topic & Date */}
            <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.25em] uppercase text-journal-muted animate-fade-in">
              {pillar ? (
                <Link to={`/${pillar.slug}`} className="text-journal-gold font-semibold hover:text-journal-text transition-colors">
                  {pillar.navLabel}
                </Link>
              ) : (
                <span className="text-journal-gold font-semibold">{topicLabel(post.pillar)}</span>
              )}
              <span className="text-journal-border">•</span>
              <time dateTime={post.datePublished}>{post.date}</time>
              <span className="text-journal-border">•</span>
              <span>{readingTime(post)}</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl md:text-4.5xl leading-tight text-journal-text animate-fade-in-up font-medium [text-wrap:balance]">
              {post.title}
            </h1>

            {/* Hook line */}
            {post.hook && (
              <p className="text-left font-serif italic text-lg md:text-2xl leading-relaxed text-journal-text border border-journal-border/60 border-l-2 border-l-journal-champagne bg-journal-bg-secondary/30 rounded-xl px-5 py-2.5 md:px-6 md:py-3.5 animate-fade-in-delay-1">
                {post.hook}
              </p>
            )}

          </div>
        </div>
      </section>

      {/* Soft Divider Before Content */}
      <div className="w-16 h-[1px] bg-journal-border/50 mx-auto my-4 md:my-6"></div>

      {/* Post Content */}
      <section className="pb-16 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <article ref={articleRef} className="max-w-2xl mx-auto font-sans text-[17px] leading-[1.85] text-journal-text-secondary space-y-6 md:space-y-7 font-light">
            {articleParts.map((paragraph, index) => {
              if (paragraph === CONTINUE_BOX) {
                return feeling && feelingPost ? (
                  <aside key={index} aria-label="Continue with this feeling" className="!my-8 rounded-xl border border-journal-border bg-journal-card px-5 py-4 md:px-6 md:py-5">
                    <span className="block font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-journal-muted">Continue with this feeling</span>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-journal-text">
                      If you are {feeling.feeling}, start here:{" "}
                      <Link to={`/blog/${feelingPost.slug}`} className="text-journal-gold underline underline-offset-4 hover:text-journal-text transition-colors duration-300">
                        {feelingPost.title}
                      </Link>
                    </p>
                  </aside>
                ) : null;
              }
              if (paragraph === LETTER_BOX) {
                return (
                  <NewsletterSignup
                    key={index}
                    source="post"
                    detail={post.slug}
                    split
                    compact
                    title="The longer essays, sent to you first."
                    description="One letter when a new essay is ready. Quiet, honest, yours to keep."
                    className="max-w-none !my-8"
                  />
                );
              }
              if (paragraph.trim() === CHAPTER_MARK) {
                chapterCount += 1;
                return (
                  <div
                    key={index}
                    role="separator"
                    aria-label={`Chapter ${chapterCount}`}
                    className="!my-10 md:!my-14 flex items-center justify-center gap-4 font-sans text-xs tracking-[0.3em] uppercase text-journal-gold font-medium"
                  >
                    <span className="w-8 h-px bg-journal-champagne/40" aria-hidden="true"></span>
                    <span className="pl-[0.3em]">{toRoman(chapterCount)}</span>
                    <span className="w-8 h-px bg-journal-champagne/40" aria-hidden="true"></span>
                  </div>
                );
              }
              if (paragraph.trim() === PAUSE_MARK) {
                return post.pause ? <PauseHere key={index} pause={post.pause} /> : null;
              }
              if (isSectionHeading(paragraph)) {
                return (
                  <h2
                    key={index}
                    className="font-serif text-xl md:text-2xl text-journal-text font-medium mt-14 mb-2 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${0.2 + Math.min(index, 8) * 0.05}s`, animationFillMode: "forwards" }}
                  >
                    {paragraph.replace("##:", "").trim()}
                  </h2>
                );
              }
              if (isPullQuote(paragraph)) {
                return (
                  <blockquote
                    key={index}
                    className="border-l-[3px] border-journal-champagne pl-6 my-8 md:my-10 font-serif italic text-lg md:text-xl text-journal-gold leading-relaxed py-2 opacity-0 animate-fade-in bg-journal-bg-secondary/30 pr-4 rounded-r-xl whitespace-pre-line"
                    style={{ animationDelay: `${0.2 + Math.min(index, 8) * 0.05}s`, animationFillMode: "forwards" }}
                  >
                    {paragraph.replace(PULL_QUOTE_MARK, "").trim()}
                  </blockquote>
                );
              }
              return (
                <p
                  key={index}
                  className={`opacity-0 animate-fade-in whitespace-pre-line text-left sm:text-justify ${
                    index === firstTextIndex
                      ? "first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-journal-gold first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none"
                      : ""
                  }`}
                  style={{ animationDelay: `${0.2 + Math.min(index, 8) * 0.05}s`, animationFillMode: "forwards" }}
                >
                  {paragraph}
                </p>
              );
            })}
            <footer className="!mt-10 md:!mt-12 space-y-6 md:space-y-7">
              <p>Until the next page,</p>
              <p className="font-signature text-2xl leading-snug text-journal-gold">-Miss Joo</p>
            </footer>
          </article>
        </div>
      </section>

      {/* Share */}
      <section className="pb-12 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <ShareButtons url={shareUrl} title={post.title} />
        </div>
      </section>


      {post.pillar === suitcase.pillar && (
        <section className="pb-16 bg-journal-bg">
          <div className="container mx-auto px-6 lg:px-12">
            <SuitcasePostLine />
          </div>
        </section>
      )}

      {/* Keep reading */}
      <section aria-labelledby="keep-reading-title" className="pb-16 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <h2 id="keep-reading-title" className="mb-4 text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium">
              Keep reading
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link to={`/blog/${nextPost.slug}`} className={keepReadingCard}>
                <span className={keepReadingLabel}>{topicLabel(nextPost.pillar)}</span>
                <h3 className={keepReadingTitle}>{nextPost.title}</h3>
                <p className={keepReadingNote}>{readingTime(nextPost)} →</p>
              </Link>
              <Link to="/the-suitcase" className={keepReadingCard}>
                <span className={keepReadingLabel}>The Suitcase</span>
                <h3 className={keepReadingTitle}>Open your own suitcase</h3>
                <p className={keepReadingNote}>An interactive reflection, about 3 min →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
