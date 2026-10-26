import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowLeft } from "lucide-react";
import ShareButtons from "@/components/blog/ShareButtons";
import ReadingProgress from "@/components/blog/ReadingProgress";
import PauseHere from "@/components/blog/PauseHere";
import NewsletterSignup from "@/components/NewsletterSignup";
import NotFound from "@/pages/NotFound";
import { CHAPTER_MARK, PAUSE_MARK, cutMidSentence, getNextPost, getPost, isMarker, readingTime, textParagraphs } from "@/data/posts";
import { getPillar, topicLabel } from "@/data/pillars";
import { canonicalUrl } from "@/lib/seo";
import { suitcase } from "@/data/suitcase";
import { SuitcasePostLine } from "@/components/suitcase/SuitcaseTeasers";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug);
  const articleRef = useRef<HTMLElement>(null);

  if (!post) {
    return <NotFound />;
  }

  const nextPost = getNextPost(post);
  // Its opening line, stopped mid-sentence. A very short opening line borrows the excerpt, which begins with it.
  const nextOpening = textParagraphs(nextPost)[0].replace(/^(##:|>>:)/, "");
  const nextFirstLine = `${cutMidSentence(nextOpening.split(/\s+/).length >= 12 ? nextOpening : nextPost.excerpt, 0.7)} —`;
  const pillar = getPillar(post.pillar);
  const shareUrl = canonicalUrl(`/blog/${post.slug}`);

  const intro = textParagraphs(post)[0];
  const bodyParagraphs = post.content;
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
      <section className="pt-10 pb-6 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
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
            <h1 className="font-serif text-2xl md:text-4.5xl leading-tight text-journal-text animate-fade-in-up font-medium">
              {post.title}
            </h1>

            {/* Hook line */}
            {post.hook && (
              <p className="text-left font-serif italic text-xl md:text-2xl leading-relaxed text-journal-text border border-journal-border/60 border-l-2 border-l-journal-champagne bg-journal-bg-secondary/30 rounded-r-[2px] px-6 py-4 animate-fade-in-delay-1">
                {post.hook}
              </p>
            )}

            {/* Intro / Excerpt */}
            <p className="text-journal-text-secondary/90 italic font-serif text-lg md:text-xl leading-relaxed max-w-xl mx-auto animate-fade-in-delay-1 pt-4 border-t border-journal-border/30">
              {intro}
            </p>
          </div>
        </div>
      </section>

      {/* Soft Divider Before Content */}
      <div className="w-16 h-[1px] bg-journal-border/50 mx-auto my-6"></div>

      {/* Post Content */}
      <section className="pb-16 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <article ref={articleRef} className="max-w-2xl mx-auto font-sans text-[17px] leading-[1.85] text-journal-text-secondary space-y-7 font-light">
            {bodyParagraphs.map((paragraph, index) => {
              if (paragraph.trim() === CHAPTER_MARK) {
                chapterCount += 1;
                return (
                  <div
                    key={index}
                    role="separator"
                    aria-label={`Chapter ${chapterCount}`}
                    className="!my-14 flex items-center justify-center gap-4 font-sans text-xs tracking-[0.3em] uppercase text-journal-gold font-medium"
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
                    className="border-l-[3px] border-journal-champagne pl-6 my-10 font-serif italic text-lg md:text-xl text-journal-gold leading-relaxed py-2 opacity-0 animate-fade-in bg-journal-bg-secondary/30 pr-4 rounded-r-[2px] whitespace-pre-line"
                    style={{ animationDelay: `${0.2 + Math.min(index, 8) * 0.05}s`, animationFillMode: "forwards" }}
                  >
                    {paragraph.replace(PULL_QUOTE_MARK, "").trim()}
                  </blockquote>
                );
              }
              return (
                <p
                  key={index}
                  className={`opacity-0 animate-fade-in whitespace-pre-line text-left ${
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
          </article>
        </div>
      </section>

      {/* Share */}
      <section className="pb-12 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <ShareButtons url={shareUrl} title={post.title} />
        </div>
      </section>

      {/* Soft Divider After Content */}
      <div className="w-16 h-[1px] bg-journal-border/50 mx-auto my-12"></div>

      {/* Newsletter */}
      <section className="pb-16 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <NewsletterSignup source="post" detail={post.slug} />
        </div>
      </section>

      {post.pillar === suitcase.pillar && (
        <section className="pb-16 bg-journal-bg">
          <div className="container mx-auto px-6 lg:px-12">
            <SuitcasePostLine />
          </div>
        </section>
      )}

      {/* Next Page */}
      <section aria-labelledby="next-page-title" className="py-16 bg-journal-bg-secondary/20 border-t border-journal-border/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">Next page</span>
            <h2 id="next-page-title" className="font-serif text-2xl md:text-3xl text-journal-text leading-snug">
              {nextPost.title}
            </h2>
            <p className="font-serif italic text-lg text-journal-text-secondary leading-relaxed">{nextFirstLine}</p>
            <div className="pt-2">
              <Link
                to={`/blog/${nextPost.slug}`}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-gold px-8 text-[11px] uppercase tracking-widest text-espresso hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-bg"
              >
                <span>Turn the page</span>
                <span aria-hidden="true">→</span>
                <span className="sr-only">: {nextPost.title}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
